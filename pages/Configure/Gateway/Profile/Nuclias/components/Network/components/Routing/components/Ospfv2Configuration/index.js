import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// UI

// Component
import {
  ButtonAction, Button, Checkbox, LinkerWithA, PaginationContainer,
  InputWithIcon, RadioButton
} from 'components/';
import Func from '../../../../../Func';

import EditConfigModal from './EditConfigModal';

// Context
import { ConfigContext } from '../../../../../../Context';
import { RoutingContext } from '../../Context';

// Dummy data
import { getChangeModalStatusFn } from 'dummy/utils/modal';

const defaultModalStatus = {
  editConfig: {
    self: 'editConfig',
    status: false
  }
};

const authenticationTypeDefinition = [
  { title: 'None', value: 'None' },
  { title: 'Simple', value: 'Simple' },
  { title: 'MD5', value: 'MD5' },
];

const Ospfv2Configuration = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: routingState } = useContext(RoutingContext);

  // Fake data

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [list, setList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeActive = (index, state) => {
    const updatedList = cloneDeep(list);
    updatedList[index].active = state;
    setList(updatedList);
  };

  // Side effect
  useEffect(() => {
    const updatedList = cloneDeep(routingState.ospfv2Configuration);
    setList(cloneDeep(updatedList));
    setProfileList(cloneDeep(updatedList));
  }, [routingState.ospfv2Configuration]);

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
      <Func title='OSPFV2 CONFIGURATION'>
        <div className='table-responsive'>
          <Table
            striped
            hover
            className='table-container table-container--disable-sort'
          >
            <thead>
              <tr>
                <th>Interface</th>
                <th>Area</th>
                <th>Priority</th>
                <th>Hello interval</th>
                <th>Dead interval</th>
                <th>Cost</th>
                <th>Authentication</th>
                <th>LAN route exchange</th>
                <th>NSSA</th>
                <th>Active</th>
                {
                  !isUseProfileConfig && (
                    <th className={'table-action-th'}>Action</th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                sourceList.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.interface}</td>
                      <td>{item.area}</td>
                      <td>{item.priority}</td>
                      <td>{item.helloInterval}</td>
                      <td>{item.deadInterval}</td>
                      <td>{item.cost}</td>
                      <td>{item.authentication}</td>
                      <td>{item.lanRouteExchange}</td>
                      <td>{item.nssa ? 'Enabled' : 'Disabled'}</td>
                      <td className='input'>
                        {
                          !isUseProfileConfig ? (
                            <>
                              <div className='d-flex'>
                                <RadioButton
                                  id={`ospfv2-config-active-${index}-enable`}
                                  name={`ospfv2ConfigActive${index}`}
                                  label='Enable'
                                  hasRightMargin={true}
                                  checked={item.active}
                                  onChange={() => changeActive(index, true)}
                                />
                                <RadioButton
                                  id={`ospfv2-config-active-${index}-disable`}
                                  name={`ospfv2ConfigActive${index}`}
                                  label='Disable'
                                  checked={!item.active}
                                  onChange={() => changeActive(index, false)}
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              {item.active ? 'Enabled' : 'Disabled'}
                            </>
                          )
                        }
                      </td>
                      {
                        !isUseProfileConfig && (
                          <td className={'table-action-td'}>
                            <ButtonAction
                              label='EDIT'
                              title='EDIT'
                              iconClassName='icon-edit'
                              onClick={() => {
                                setSelectedConfig(item);
                                changeModalStatus(modalStatus.editConfig.self, true)
                              }}
                            />
                            <ButtonAction
                              label='DELETE'
                              title='DELETE'
                              iconClassName='icon-trash'
                              onClick={() => {
                                setSelectedConfig(item);
                                changeModalStatus(modalStatus.deleteConfig.self, true)
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
      </Func >

      <EditConfigModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        authenticationTypeDefinition={authenticationTypeDefinition}
        selectedConfig={selectedConfig}
      />
    </>
  )
}

export default Ospfv2Configuration;