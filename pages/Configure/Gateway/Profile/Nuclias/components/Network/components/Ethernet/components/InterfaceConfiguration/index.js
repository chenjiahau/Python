import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep, orderBy, size } from 'lodash';

// Component
import { ButtonAction, Button, Checkbox, RadioButton } from 'components/';
import Func from '../../../../../Func';

import AddInterfaceModal from './AddInterfaceModal';
import EditInterfaceModal from './EditInterfaceModal';

// Context
import { ConfigContext } from '../../../../../../Context';
import { EthernetContext } from '../../Context';

// Dummy data
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';

const defaultModalStatus = {
  addInterface: {
    self: 'addInterface',
    status: false
  },
  editInterface: {
    self: 'editInterface',
    status: false
  },
  deleteInterface: {
    self: 'deleteInterface',
    status: false
  },
};

let protocolDefinition = {
  dhcpV4: 'DHCPv4',
  dhcpV6: 'DHCPv6',
  staticV4: 'Static IPv4',
  staticV6: 'Static IPv6',
  pppoe: 'PPPoE',
  dslite: 'DS-Lite / IPIP',
  mape: 'MAP-E'
};

const InterfaceConfiguration = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: ethernetState } = useContext(EthernetContext);

  let modelName = null;
  if (configState.profile) {
    modelName = configState.profile.modelName;
  } else {
    modelName = configState.device.modelName;
  }

  if (modelName === 'DBG-X800') {
    delete protocolDefinition['dslite'];
    delete protocolDefinition['mape'];
  }

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [interfaces, setInterfaces] = useState([]);
  const [hasV6Interfaces, setHasV6Interfaces] = useState([]);
  const [list, setList] = useState([]);
  const [selectedInterface, setSelectedInterface] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeListState = (index, state) => {
    const updatedList = cloneDeep(list);
    updatedList[index].state = state;
    setList(updatedList);
  };

  // Side effect
  useEffect(() => {
    if (size(ethernetState.interfaces) === 0) {
      return;
    }

    const updatedInterfaces = new Set();
    const updatedHasV6Interfaces = new Set();
    let updatedList = [];
    let ifaceIndex = 0;

    ethernetState.interfaces.forEach((iface) => {
      const ifaceName = iface.interface;
      const ifaceVlanId = iface.vlanId;

      ifaceIndex++;
      const ifaceObj = {
        id: ifaceIndex,
        interface: ifaceName,
        vlanId: ifaceVlanId
      };
      updatedInterfaces.add(ifaceObj);
      updatedHasV6Interfaces.add(ifaceObj);

      iface.protocols.forEach((protocol, protocolIndex) => {
        updatedList.push({
          checked: false,
          id: protocolIndex,
          interface: ifaceName,
          vlanId: ifaceVlanId,
          ...protocol
        })

        if (protocol.protocol === protocolDefinition.pppoe) {
          ifaceIndex++;
          updatedHasV6Interfaces.add({
            id: ifaceIndex,
            interface: protocol.name
          })
        }
      });
    });

    updatedList = orderBy(updatedList, ['index'], ['asc']);

    setInterfaces(Array.from(updatedInterfaces));
    setHasV6Interfaces(Array.from(updatedHasV6Interfaces));
    setList(updatedList);
  }, [ethernetState]);

  if (list.length === 0) {
    return;
  }

  const isProfilePath = !!configState.profile;
  const isNotStandalone = configState.useProfileConfig ? true : false;

  return (
    <>
      <Func title='INTERFACE CONFIGURATION'>
        {
          ((isProfilePath) || (!isProfilePath && !isNotStandalone)) && (
            <div className='mb-2'>
              <ButtonGroup>
                <Button
                  label='Add'
                  onClick={() => {
                    setSelectedInterface(null);
                    changeModalStatus(modalStatus.addInterface.self, true)
                  }}
                />
                <Button
                  label='Delete'
                  disabled={!checkAtleastOneChecked(list.filter(item => !item.isDefaultWan))}
                  onClick={() => changeModalStatus(modalStatus.deleteInterface.self, true)}
                />
              </ButtonGroup>
            </div>
          )
        }

        <div className='table-responsive'>
          <Table
            striped
            hover
            className='table-container table-container--disable-sort'
          >
            <thead>
              <tr>
                {
                  ((isProfilePath) || (!isProfilePath && !isNotStandalone)) && (
                    <th>
                      <Checkbox
                        id='interface-all'
                        type='checkbox'
                        checked={checkedAllState(list.filter(item => !item.isDefaultWan))}
                        onChange={e => toggleCheckedAll(list, setList)}
                      />
                    </th>
                  )
                }
                <th>#</th>
                <th>Display name</th>
                <th>VLAN ID</th>
                <th>Protocol</th>
                <th>IP address</th>
                <th>Gateway</th>
                <th>Protocol state</th>
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
                            {
                              !item.isDefaultWan && (
                                <Checkbox
                                  id={`interface-${item.interface}-${item.id}`}
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
                      <td>{item.protocol}</td>
                      <td>{item.ipAddress}</td>
                      <td>{item.gateway}</td>
                      <td className='input'>
                        {
                          ((isProfilePath) || (!isProfilePath && !isNotStandalone)) ? (
                            <div className='d-flex'>
                              <RadioButton
                                id={`protocol-state-enable-${item.id}-${index}`}
                                name={`protocolState${item.id}-${index}`}
                                label='Enable'
                                hasRightMargin={true}
                                checked={item.state}
                                onChange={() => changeListState(index, true)}
                              />
                              <RadioButton
                                id={`protocol-state-disable-${item.id}-${index}`}
                                name={`protocolState${item.id}-${index}`}
                                label='Disable'
                                checked={!item.state}
                                onChange={() => changeListState(index, false)}
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
                                setSelectedInterface(item);
                                changeModalStatus(modalStatus.editInterface.self, true)
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
      </Func>

      <AddInterfaceModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        protocolDefinition={protocolDefinition}
        interfaces={interfaces}
        hasV6Interfaces={hasV6Interfaces}
      />

      <EditInterfaceModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        protocolDefinition={protocolDefinition}
        interfaces={interfaces}
        hasV6Interfaces={hasV6Interfaces}
        selectedInterface={selectedInterface}
      />
    </>
  )
}

export default InterfaceConfiguration;