import mainStyle from '../../settings.module.scss';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, DropdownWithAdvancedSearch, Input, LinkerWithA, PaginationContainer } from 'components/';

// Dummy data
import { generateVlanData } from 'dummy/data/switch/vlan';
import { sorting } from 'dummy/utils/sorting';

const defaultPortGroupList = [
  { title: '10 ports', isActive: true },
  { title: '28 ports', isActive: false },
  { title: '52 ports', isActive: false }
];

const defaultIgmpSnoopingStateDropdown = [
  { title: 'All', isActive: true },
  { title: 'Enable', isActive: false },
  { title: 'Disable', isActive: false }
];

const Vlan = (props) => {
  const { profile, tabList, changeTab } = props;
  const navigate = useNavigate();

  // Fake data
  const fakeData = generateVlanData();

  // State
  const [vlan, setVlan] = useState(null);
  const [portGroupDropdown, setPortGroupDropdown] = useState(cloneDeep(defaultPortGroupList));
  const [vlanDropdown, setVlanDropdown] = useState([]);
  const [igmpSnoopingStateDropdown, setIgmpSnoopingStateDropdown] = useState(cloneDeep(defaultIgmpSnoopingStateDropdown));

  // Method
  const redirectTo = (type) => {
    if (type === 'Management VLAN') {
      navigate(`/cloud/configure/switch/profile/${profile.id}?forceTab=ports`);
    } else if (type === 'Voice VLAN') {
      changeTab(tabList[0]);
    } else if (type === 'Guest VLAN') {
      changeTab(tabList[2]);
    } else {
      changeTab(tabList[3]);
    }
  }

  // Side effect
  useEffect(() => {
    const updatedVlan = [];
    const updatedVlanDropdown = [];
    for (const vlan of fakeData) {
      updatedVlan.push({
        id: vlan.id,
        type: vlan.title,
        untaggedPorts: vlan.untaggedPorts,
        taggedPorts: vlan.taggedPorts,
        imgpStatus: vlan.imgpStatus ? 'Enable' : 'Disable'
      });

      updatedVlanDropdown.push({
        title: vlan.title,
        checked: false
      })
    }

    setVlan(updatedVlan);
    setVlanDropdown(updatedVlanDropdown);
  }, []);

  if (!vlan) {
    return;
  }

  return (
    <div className={`tab-container-border ${mainStyle['vlan-container']}`}>
      <div className={mainStyle['tools']}>
        <div>
          Current / Max. rules: {vlan.length} / 256
        </div>
        <div className={mainStyle['right']}>
          <span className='form-title' style={{ paddingTop: '5px', minWidth: 'auto' }}>Ports group : </span>
          <DropdownWithItem
            id='ports-group-dropdown'
            type='normal'
            isRegularSize={true}
            selectedItem={portGroupDropdown.find(item => item.isActive === true)}
            itemList={portGroupDropdown}
            onClick={() => { }}
          />
          <DropdownWithAdvancedSearch
            value={''}
            readOnly={true}
            alignEnd={true}
            dataBsToggleOnButton={true}
            dropdownMenuStyle={{ minWidth: 371 }}
            onChange={e => console.log(e.target.value)}
          >
            <li className='mt-2'>
              <div className='form-title mb-1'>VLAN</div>
              <DropdownWithAdvancedSearch
                placeholder='1-4094'
                value=''
                alignEnd={true}
                isSelectingItem={true}
                dataBsToggleOnButton={true}
                onChange={e => { }}
              >
                {
                  vlanDropdown.map((vlanId, index) => {
                    return (
                      <li
                        key={index}
                        className={vlanId.checked ? 'active' : ''}
                        onClick={() => { }}
                      >
                        {vlanId.title}
                      </li>
                    );
                  })
                }
              </DropdownWithAdvancedSearch>
            </li>
            <li className='mt-2'>
              <div className='form-title mb-1'>IGMP Snooping</div>
              <DropdownWithItem
                id='type-dropdown'
                type='normal'
                selectedItem={igmpSnoopingStateDropdown.find(item => item.isActive === true)}
                itemList={igmpSnoopingStateDropdown}
                onClick={() => { }}
              />
            </li>
            <li className='mt-2'>
              <div className='form-title mb-1'>Untagged member port# :</div>
              <Input
                type='text'
                autoComplete='new-pasword'
                placeholder='1-52'
                onChange={e => {
                  console.log(e.target.value);
                }}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </li>
            <li className='mt-2 mb-2'>
              <div className='form-title mb-1'>Tagged member port# :</div>
              <Input
                type='text'
                autoComplete='new-pasword'
                placeholder='1-52'
                onChange={e => {
                  console.log(e.target.value);
                }}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </li>
          </DropdownWithAdvancedSearch>
        </div>
      </div>
      <Table responsive striped hover className='table-container mt-2'>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <LinkerWithA
                label='VLAN ID'
                className='text-decoration-none'
                onClick={e => sorting(e, vlan, 'id', setVlan)}
              />
            </th>
            <th>
              <LinkerWithA
                label='VLAN type'
                className='text-decoration-none'
                onClick={e => sorting(e, vlan, 'type', setVlan)}
              />
            </th>

            <th>
              <LinkerWithA
                label='Untagged member ports'
                className='text-decoration-none'
                onClick={e => sorting(e, vlan, 'untaggedPorts', setVlan)}
              />
            </th>
            <th>
              <LinkerWithA
                label='Tagged member ports'
                className='text-decoration-none'
                onClick={e => sorting(e, vlan, 'taggedPorts', setVlan)}
              />
            </th>
            <th>
              <LinkerWithA
                label='IGMP snooping status'
                className='text-decoration-none'
                onClick={e => sorting(e, vlan, 'imgpStatus', setVlan)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {
            vlan.map((vlan, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{vlan.id}</td>
                  <td>
                    <a
                      href='/#'
                      onClick={(e) => {
                        e.preventDefault();
                        redirectTo(vlan.type);
                      }}
                    >
                      {vlan.type}
                    </a>
                  </td>
                  <td>{vlan.untaggedPorts}</td>
                  <td>{vlan.taggedPorts}</td>
                  <td>
                    <a
                      href='/#'
                      onClick={(e) => {
                        e.preventDefault();
                        redirectTo();
                      }}
                    >
                      {vlan.imgpStatus}
                    </a>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>

      <div className='d-flex justify-content-end'>
        <PaginationContainer
          total={vlan.length}
          onPageChange={currentPageNum =>
            console.log('onPageChange', currentPageNum)
          }
          onEntryLimitChange={currentPageNum =>
            console.log('onEntryLimitChange', currentPageNum)
          }
        />
      </div>

    </div >
  )
}

export default Vlan;