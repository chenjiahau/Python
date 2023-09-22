import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// UI

// Component
import {
  ButtonAction, Button, Checkbox, LinkerWithA, PaginationContainer,
  InputWithIcon
} from 'components/';
import Func from '../../../../../Func';

import AddVlanModal from './AddVlanModal';
import EditVlanModal from './EditVlanModal';

// Context
import { ConfigContext } from '../../../../../../Context';
import { AddressingContext } from '../../Context';

// Dummy data
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { sorting } from 'dummy/utils/sorting';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';

const defaultModalStatus = {
  addVlan: {
    self: 'addVlan',
    status: false
  },
  editVlan: {
    self: 'editVlan',
    status: false
  },
  deleteVlan: {
    self: 'deleteVlan',
    status: false
  },
};

const portsDefinition = [
  { title: 'LAN1', value: 1, isAll: false },
  { title: 'LAN2', value: 2, isAll: false },
  { title: 'LAN3', value: 3, isAll: false },
  { title: 'LAN4', value: 4, isAll: false },
];

const dhcpModeDefinition = [
  { title: 'None', value: 'none' },
  { title: 'DHCP server', value: 'dhcpServer' },
  { title: 'DHCP relay', value: 'dhcpRelay' },
];

const dhcpv6ModeDefinition = [
  { title: 'DHCPv6 relay', value: 'dhcpv6Relay' },
  { title: 'DHCPv6 server', value: 'dhcpv6Server' },
  { title: 'Disabled', value: 'disabled' },
];

const ipv6SuffixDefinition = [
  { title: 'EUI-64', value: 'eui64' },
  { title: 'Random', value: 'random' },
  { title: 'Manual', value: 'manual' },
]

const ipv6ACServerDefinition = [
  { title: 'SLAAC + Stateless DHCPv6', value: 'slaacSD' },
  { title: 'DHCPv6 (Stateful)', value: 'dhcpv6' },
  { title: 'SLAAC + RDNSS', value: 'slaacR' },
  { title: 'Disable', value: 'disable' },
];

const portocolDefinition = [
  { title: 'None', value: 'none' },
  { title: 'Static IPv4', value: 'staticIpv4' },
  { title: 'DHCPv4', value: 'dhcpv4' },
]

const Vlan = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: addressingState } = useContext(AddressingContext);

  // Fake data
  const modelName = configState.profile ? configState.profile.modelName : configState.device.modelName;
  const fakeCaptivePortal = new GatewayData(
    configState.profile ? gwFeature.configPath.profile : gwFeature.configPath.device,
    modelName
  ).generateCaptivePortal();
  const fakeVpnTunnel = new GatewayData()
    .generateNetworkInterfaces(modelName, { vpnTunnel: true });

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [vpnTunnels, setVpnTunnels] = useState([]);
  const [cpList, setCpList] = useState([]);
  const [list, setList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [selectedVlan, setSelectedVlan] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  // Side effect
  useEffect(() => {
    setVpnTunnels(cloneDeep(fakeVpnTunnel));
    setCpList(cloneDeep(fakeCaptivePortal));

    const updatedList = cloneDeep(addressingState.vlan);
    updatedList?.forEach((item, index) => item.index = index);
    setList(cloneDeep(updatedList));
    setProfileList(cloneDeep(updatedList));
  }, [addressingState.vlan]);

  const isProfilePath = !!configState.profile;
  const isNotStandalone = configState.useProfileConfig ? true : false;
  const isUseProfileConfig = !isProfilePath && isNotStandalone;

  let sourceList = null;
  if (isProfilePath) {
    sourceList = list;
  } else {
    sourceList = isNotStandalone ? profileList : list;
  }

  return (
    <>
      <Func title='VLAN'>
        <div className='mb-2'>
          <div className='justify-content-between d-flex'>
            <ButtonGroup>
              {
                !isUseProfileConfig && (
                  <>
                    <Button
                      label='Add'
                      onClick={() => {
                        setSelectedVlan(null);
                        changeModalStatus(modalStatus.addVlan.self, true)
                      }}
                    />
                    <Button
                      label='Delete'
                      disabled={!checkAtleastOneChecked(list.filter(item => !item.isDefault))}
                      onClick={() => changeModalStatus(modalStatus.deleteVlan.self, true)}
                    />
                  </>
                )
              }
            </ButtonGroup>
            <InputWithIcon
              type='search'
              iconPosition='left'
              iconClassName='icon-search'
              value={''}
              onChange={e => { }}
              onClick={() => { }}
              onBlur={() => { }}
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
                {
                  !isUseProfileConfig && (
                    <th>
                      <Checkbox
                        id='vlan-all'
                        type='checkbox'
                        checked={checkedAllState(list.filter(item => !item.isDefault))}
                        onChange={e => toggleCheckedAll(list, setList)}
                      />
                    </th>
                  )
                }
                <th>#</th>
                <th>
                  <LinkerWithA
                    label='Name'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'name', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'name', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='VLAN ID'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'vlanId', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'vlanId', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Untagged/tagged ports'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'tag', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'tag', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='IPv4 address'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'ipv4Address', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'ipv4Address', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='IPv6 address'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'ipv6Address', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'ipv6Address', setList);
                    }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Captive portal'
                    className='text-decoration-none'
                    onClick={e => {
                      isUseProfileConfig && sorting(e, profileList, 'cp', setProfileList);
                      !isUseProfileConfig && sorting(e, list, 'cp', setList);
                    }}
                  />
                </th>
                {
                  !isUseProfileConfig && (
                    <th className={'table-action-th'}>Actions</th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                sourceList.map((item, index) => {
                  return (
                    <tr key={index}>
                      {
                        !isUseProfileConfig && (
                          <td>
                            {
                              !item.isDefault && (
                                <Checkbox
                                  id={`vlan-${item.index}`}
                                  type='checkbox'
                                  checked={item.checked}
                                  onChange={e => toggleCheckedOne(index, list, setList)}
                                />
                              )
                            }
                          </td>
                        )
                      }
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.vlanId}</td>
                      <td>{item.tag}</td>
                      <td>{item.ipv4Address}</td>
                      <td>{item.ipv6Address}</td>
                      <td>{item.cp}</td>
                      {
                        !isUseProfileConfig && (
                          <td className={'table-action-td'}>
                            <ButtonAction
                              label='EDIT'
                              title='EDIT'
                              iconClassName='icon-edit'
                              onClick={() => {
                                setSelectedVlan(item);
                                changeModalStatus(modalStatus.editVlan.self, true)
                              }}
                            />
                            {
                              !item.isDefault && (
                                <>
                                  <ButtonAction
                                    label='DELETE'
                                    title='DELETE'
                                    iconClassName='icon-trash'
                                    onClick={() => {
                                      setSelectedVlan(item);
                                      changeModalStatus(modalStatus.deleteVlan.self, true)
                                    }}
                                  />
                                </>
                              )
                            }
                          </td>
                        )
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
        </div>

        <PaginationContainer
          total={sourceList.length}
          onPageChange={currentPageNum =>
            console.log('onPageChange', currentPageNum)
          }
          onEntryLimitChange={currentPageNum =>
            console.log('onEntryLimitChange', currentPageNum)
          }
        />
      </Func>

      <AddVlanModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        configState={configState}
        vpnTunnels={vpnTunnels}
        cpList={cpList}
        portsDefinition={portsDefinition}
        dhcpModeDefinition={dhcpModeDefinition}
        dhcpv6ModeDefinition={dhcpv6ModeDefinition}
        ipv6SuffixDefinition={ipv6SuffixDefinition}
        ipv6ACServerDefinition={ipv6ACServerDefinition}
        portocolDefinition={portocolDefinition}
      />

      <EditVlanModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        configState={configState}
        vpnTunnels={vpnTunnels}
        cpList={cpList}
        portsDefinition={portsDefinition}
        dhcpModeDefinition={dhcpModeDefinition}
        dhcpv6ModeDefinition={dhcpv6ModeDefinition}
        ipv6SuffixDefinition={ipv6SuffixDefinition}
        ipv6ACServerDefinition={ipv6ACServerDefinition}
        portocolDefinition={portocolDefinition}
        selectedVlan={selectedVlan}
      />
    </>
  )
}

export default Vlan;