import mainStyle from './dashboard.module.scss';

import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Table } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  Breadcrumb, Button, MessageBoxGroup, InlineTitle,
  DropdownWithCheckbox, Checkbox, LinkerWithA, Icon, PaginationContainer,
  DropdownWithItem, InputWithIcon, ModalContainer, DropdownWithSearch,
  TooltipDialogFixed, ButtonAction
} from 'components/';

// Dummy data & util
import { generateDevice } from 'dummy/data/device';
import { sorting } from 'dummy/utils/sorting';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

const typeDefinition = ['All', 'Nuclias connect', 'Connect hub'];
const statusDefinition = ['All', 'Online', 'Offline'];

const fakeDevice = [
  { status: true, name: 'DNK-100_A5C4', host: '61.222.33.54', 'sites': 1, networks: 1, devices: 1, clients: 88, version: '0.00b13' }
]

const Connect = () => {

  // State
  const [typeDropdown, setTypeDropdown] = useState([]);
  const [statusDropdown, setStatusDropdown] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [devices, setDevices] = useState(cloneDeep(fakeDevice));

  const tooltip = (
    <>
      <div className={`d-flex justify-content-between`} >
        <div className={mainStyle['connect-tooltip']}>
          <div className={mainStyle['left']}>
            <Icon className='online icon-round' />
          </div>
          <p>Online : Online controller</p>
        </div>
      </div>
      <div className={`d-flex justify-content-between`} >
        <div className={mainStyle['connect-tooltip']}>
          <div className={mainStyle['left']}>
            <Icon className='offline icon-round' />
          </div>
          <p>
            Offline : Offline controller is disconnected from cloud. You may need to check internet connection to retrieve connectivity.
          </p>
        </div>
      </div>
      <div className={`d-flex justify-content-between`} >
        <div className={mainStyle['connect-tooltip']}>
          <div className={mainStyle['left']}>
            <Icon className='dormant icon-round' />
          </div>
          <p>
            Dormant: Controllers have been offline more than 30 days. Please note that Single Sign-on (SSO) option will be automatically disabled. You are required to connect to this controller itself to enable Single Sign-on (SSO) option and login Nuclias account again to retrieve the connectivity.
          </p>
        </div>
      </div>
    </>
  );

  // Method

  // Side effect
  useEffect(() => {
    const updatedTypeDropdown = typeDefinition.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0,
      }
    });

    const updatedStatusDropdown = statusDefinition.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0,
      }
    });

    setTypeDropdown(updatedTypeDropdown);
    setStatusDropdown(updatedStatusDropdown);
  }, []);

  return (
    <div>
      <div className='d-flex justify-content-end mb-2'>
        <div className='d-flex' style={{ gap: '8px' }}>
          <span className='form-title--above-table'>Type: </span>
          <DropdownWithItem
            type="normal"
            selectedItem={typeDropdown.find(item => item.isActive)}
            itemList={typeDropdown}
            isTruncate
            style={{ width: '150px' }}
            onClick={item => { }}
          />
          <span className='form-title--above-table'>Status: </span>
          <DropdownWithItem
            type="normal"
            selectedItem={statusDropdown.find(item => item.isActive)}
            itemList={statusDropdown}
            isTruncate
            style={{ width: '150px' }}
            onClick={item => { }}
          />
          <InputWithIcon
            type="search"
            placeholder="Search"
            iconPosition="left"
            iconClassName="icon-search"
            style={{ width: '149px' }}
            value={''}
            onChange={e => { }}
            onClick={() => { }}
            onBlur={() => { }}
          />
          <TooltipDialogFixed
            placement="bottom"
            title={ReactDOMServer.renderToString(tooltip)}
            hideIcon={false}
          // tooltipsTitle={'test'}
          />
        </div>
      </div>

      <div className='table-responsive'>
        <Table
          striped
          hover
          className='table-container'
        >
          <thead>
            <tr>
              <th>#</th>
              <th>
                <LinkerWithA
                  label='Name'
                  className='text-decoration-none'
                  onClick={e => sorting(e, devices, 'name', setDevices)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Host'
                  className='text-decoration-none'
                  onClick={e => sorting(e, devices, 'host', setDevices)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Sites'
                  className='text-decoration-none'
                  onClick={e => sorting(e, devices, 'sites', setDevices)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Networks'
                  className='text-decoration-none'
                  onClick={e => sorting(e, devices, 'networks', setDevices)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Devices'
                  className='text-decoration-none'
                  onClick={e => sorting(e, devices, 'devices', setDevices)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Clients'
                  className='text-decoration-none'
                  onClick={e => sorting(e, devices, 'clients', setDevices)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Version'
                  className='text-decoration-none'
                  onClick={e => sorting(e, devices, 'version', setDevices)}
                />
              </th>
              <th className={'table-action-th'}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              devices.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.host}</td>
                    <td>{item.sites}</td>
                    <td>{item.networks}</td>
                    <td>{item.devices}</td>
                    <td>{item.clients}</td>
                    <td>{item.version}</td>
                    <td className={'table-action-td'}>
                      <ButtonAction
                        label='LAUNCH'
                        title='LAUNCH'
                        iconClassName='icon-launch'
                        onClick={() => { }}
                      />
                      <ButtonAction
                        label='DELETE'
                        title='DELETE'
                        iconClassName='icon-trash'
                        onClick={() => { }}
                      />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div>

      <PaginationContainer
        total={devices.length}
        onPageChange={currentPageNum =>
          console.log('onPageChange', currentPageNum)
        }
        onEntryLimitChange={currentPageNum =>
          console.log('onEntryLimitChange', currentPageNum)
        }
      />

    </div>
  );
};

export default Connect;