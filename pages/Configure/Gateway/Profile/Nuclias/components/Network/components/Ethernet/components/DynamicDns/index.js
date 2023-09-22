import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  ButtonAction, Button, Checkbox, RadioButton, LinkerWithA,
  PaginationContainer
} from 'components/';
import Func from '../../../../../Func';

import AddDynamicDnsModal from './AddDynamicDns';
import EditDynamicDnsModal from './EditDynamicDns';

// Context
import { ConfigContext } from '../../../../../../Context';
import { EthernetContext } from '../../Context';

// Dummy data
import GatewayData from 'dummy/data/gateway/data/GatewayData';
import { sorting } from 'dummy/utils/sorting';
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';

const defaultModalStatus = {
  addDDns: {
    self: 'addDDns',
    status: false
  },
  editDDns: {
    self: 'editDDns',
    status: false
  },
  deleteDDns: {
    self: 'deleteDDns',
    status: false
  },
};

const serviceProviderDefinition = [
  { title: 'Nuclias.com', value: 'nuclias', },
  { title: 'DynDNS', value: 'dynDns', },
  { title: 'FreeDNS', value: 'freeDns', },
  { title: 'NO-IP', value: 'noIp', },
  { title: '3322.org', value: '3322', },
];

const ipAddressTypeDefinition = {
  ipv4: 'IPv4',
  ipv6: 'IPv6',
}

const DynamicDns = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: ethernetState } = useContext(EthernetContext);

  // Fake API

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [interfaces, setInterfaces] = useState([]);
  const [list, setList] = useState([]);
  const [selectedDDns, setSelectedDDns] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeState = (index, state) => {
    const updatedList = cloneDeep(list);
    updatedList[index].state = state;
    setList(updatedList);
  }

  // Side effect
  useEffect(() => {
    if (!configState.device || !ethernetState.dynamicDns) {
      return;
    }

    const fakeInterfaces = new GatewayData().generateNetworkInterfaces(configState.device.modelName, { ethernet: true });
    setInterfaces(cloneDeep(fakeInterfaces));

    const updatedList = ethernetState.dynamicDns.map((ddns, index) => {
      return {
        index: index + 1,
        checked: false,
        ...ddns,
      }
    });
    setList(updatedList);
  }, [configState.device, ethernetState.dynamicDns]);

  if (!list.length === 0) {
    return;
  }

  const isProfilePath = !!configState.profile;
  const isNotStandalone = configState.useProfileConfig ? true : false;

  return (
    <>
      <Func title='DYNAMIC DNS'>
        {
          ((isProfilePath) || (!isProfilePath && !isNotStandalone)) && (
            <div className='mb-2'>
              <ButtonGroup>
                <Button
                  label='Add'
                  onClick={() => {
                    setSelectedDDns(null);
                    changeModalStatus(modalStatus.addDDns.self, true)
                  }}
                />
                <Button
                  label='Delete'
                  disabled={!checkAtleastOneChecked(list)}
                  onClick={() => changeModalStatus(modalStatus.deleteDDns.self, true)}
                />
              </ButtonGroup>
            </div>
          )
        }

        <div className='table-responsive'>
          <Table
            striped
            hover
            className='table-container'
          >
            <thead>
              <tr>
                {
                  ((isProfilePath) || (!isProfilePath && !isNotStandalone)) && (
                    <th>
                      <Checkbox
                        id='ddns-all'
                        type='checkbox'
                        checked={checkedAllState(list)}
                        onChange={e => toggleCheckedAll(list, setList)}
                      />
                    </th>
                  )
                }
                <th>
                  <LinkerWithA
                    label='Index'
                    className='text-decoration-none'
                    onClick={e => sorting(e, list, 'index', setList)}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='WAN interface'
                    className='text-decoration-none'
                    onClick={e => sorting(e, list, 'interface', setList)}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='IP address type'
                    className='text-decoration-none'
                    onClick={e => sorting(e, list, 'ipAddressType', setList)}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Service provider'
                    className='text-decoration-none'
                    onClick={e => sorting(e, list, 'serviceProvider', setList)}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Hostname'
                    className='text-decoration-none'
                    onClick={e => sorting(e, list, 'hostname', setList)}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Wildcard'
                    className='text-decoration-none'
                    onClick={e => sorting(e, list, 'wildcard', setList)}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Use public IP'
                    className='text-decoration-none'
                    onClick={e => sorting(e, list, 'usePublicIp', setList)}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Force update interval'
                    className='text-decoration-none'
                    onClick={e => sorting(e, list, 'ForceUpdateInterval', setList)}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Update status'
                    className='text-decoration-none'
                    onClick={e => sorting(e, list, 'state', setList)}
                  />
                </th>
                {
                  ((isProfilePath) || (!isProfilePath && !isNotStandalone)) && (
                    <th className={'table-action-th'}>Actions</th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                list.map((item, index) => {
                  return (
                    <tr key={index}>
                      {
                        ((isProfilePath) || (!isProfilePath && !isNotStandalone)) && (
                          <td>
                            <Checkbox
                              id={`ddns-${item.index}`}
                              type='checkbox'
                              checked={item.checked}
                              onChange={e => toggleCheckedOne(index, list, setList)}
                            />
                          </td>
                        )
                      }
                      <td>{item.index}</td>
                      <td>{item.interface}</td>
                      <td>{item.ipAddressType}</td>
                      <td>{item.serviceProvider}</td>
                      <td>{item.hostname}</td>
                      <td>{item.wildcard}</td>
                      <td>{item.usePublicIp ? 'Enabled' : 'Disabled'}</td>
                      <td>{item.forceUpdateInterval}</td>
                      <td className='input'>
                        {
                          ((isProfilePath) || (!isProfilePath && !isNotStandalone)) ? (
                            <div className='d-flex'>
                              <RadioButton
                                id={`ddns-enable-${index}`}
                                name={`ddnsState-${index}`}
                                label='Enable'
                                hasRightMargin={true}
                                checked={item.state}
                                onChange={() => changeState(index, true)}
                              />
                              <RadioButton
                                id={`ddns-state-disable-${item.id}-${index}`}
                                name={`ddnsState${item.id}-${index}`}
                                label='Disable'
                                checked={!item.state}
                                onChange={() => changeState(index, false)}
                              />
                            </div>
                          ) : (
                            <>
                              {item.state ? 'Enabled' : 'Disabled'}
                            </>
                          )
                        }
                      </td>
                      {
                        ((isProfilePath) || (!isProfilePath && !isNotStandalone)) && (
                          <td className={'table-action-td'}>
                            <ButtonAction
                              label='EDIT'
                              title='EDIT'
                              iconClassName='icon-edit'
                              onClick={() => {
                                setSelectedDDns(item);
                                changeModalStatus(modalStatus.editDDns.self, true)
                              }}
                            />
                            <ButtonAction
                              label='DELETE'
                              title='DELETE'
                              iconClassName='icon-trash'
                              onClick={() => {
                                setSelectedDDns(item);
                                changeModalStatus(modalStatus.deleteDDns.self, true)
                              }}
                            />
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
          total={list.length}
          onPageChange={currentPageNum =>
            console.log('onPageChange', currentPageNum)
          }
          onEntryLimitChange={currentPageNum =>
            console.log('onEntryLimitChange', currentPageNum)
          }
        />
      </Func >

      <AddDynamicDnsModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        interfaces={interfaces}
        serviceProviderDefinition={serviceProviderDefinition}
        ipAddressTypeDefinition={ipAddressTypeDefinition}
      />

      <EditDynamicDnsModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        interfaces={interfaces}
        serviceProviderDefinition={serviceProviderDefinition}
        ipAddressTypeDefinition={ipAddressTypeDefinition}
        selectedDDns={selectedDDns}
      />
    </>
  )
}

export default DynamicDns;