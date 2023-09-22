import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';
import { Table, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Component
import {
  Checkbox,
  Button,
  LinkerWithA,
  InputWithIcon,
  RadioButton,
  ButtonAction,
  PaginationContainer,
  ConfirmationModalContainer
} from 'components/';

import Func from '../../../../../Func';

// Context
import { openVpnAction, OpenVpnContext } from '../../Context';

import AddModal from './AddModal';
import EditModal from './EditModal';

const defaultModalStatus = {
  addServerPolicies: {
    status: false,
    disabled: false,
  },
  editServerPolicies: {
    status: false,
    disabled: false,
  },
  deleteServerPolicies: {
    status: false,
    disabled: false,
  }
};

const ServerPolicies = () => {
  const {
    state: {
      selectedDeviceModelName,
      openVpnUIDisplaying,
      openVpnSettings,
      serverPolicies,
    },
    dispatch: openVpnDispatch
  } = useContext(OpenVpnContext);

  const { t } = useTranslation();
  const [list, setList] = useState([]);
  const [selectedServerPolicies, setSelectedServerPolicies] = useState(null);
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  const changeModalStatus = (type, value) => {
    setModalStatus({ ...modalStatus, [type]: { ...modalStatus[type], status: value } });
  }

  const changeValue = ({
    key,
    value
  }) => {
    const clonedOpenVpn = cloneDeep(openVpnSettings);
    clonedOpenVpn[key] = value;

    openVpnDispatch({
      type: openVpnAction.setOpenVpnSettings,
      payload: clonedOpenVpn
    });
  }

  useEffect(() => {
    if (!openVpnSettings || !serverPolicies) {
      return;
    }

    const updatedList = serverPolicies.map((serverPoliciesItem, index) => {
      return {
        index: index + 1,
        checked: false,
        ...serverPoliciesItem,
      }
    });

    setList(updatedList);

  }, [openVpnSettings, serverPolicies, openVpnSettings.selectedOpenVpnMode]);

  if(!openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].serverPolicies) return <></>

  return (
    <>
      <div className='form-group'>
        <div className='form-title form-title--indent ms-4'>Server policies</div>
        <div className='form-field d-flex'>
          <RadioButton
            id={`server-policies-enable`}
            name={`server-policies-enable`}
            label='Enable'
            hasRightMargin={true}
            checked={openVpnSettings.ServerPolicyEnable}
            onChange={() => changeValue({ key: 'ServerPolicyEnable', value: true})}
          />
          <RadioButton
            id={`server-policies-disable`}
            name={`server-policies-disable`}
            label='Disable'
            checked={!openVpnSettings.ServerPolicyEnable}
            onChange={() => changeValue({ key: 'ServerPolicyEnable', value: false})}
          />
        </div>
      </div>

      {
        openVpnSettings.ServerPolicyEnable &&
        <div className='mt-2' style={{marginBottom: '48px'}}>
          {/* Tool bar box */}
          <div className='d-flex justify-content-between mb-1'>
            <ButtonGroup>
              {/* Add */}
              <Button
                label={t('ec211f7c20')}
                onClick={() => changeModalStatus('addServerPolicies', true)}
              ></Button>

              {/* Delete */}
              <Button
                label={t('f2a6c498fb')}
                disabled = {false}
                onClick={() => changeModalStatus('deleteServerPolicies', true)}
              ></Button>
            </ButtonGroup>

            {/* Search */}
            <InputWithIcon
              type='Search'
              iconPosition='left'
              placeholder={t('13348442cc')}
              value={''}
              onChange={e => {}}
              onFocus={() => {}}
              onBlur={() => {}}
              iconClassName='icon-search'
              iconOnClick={() => {}}
            />
          </div>

          {/* Table */}
          <div>
            <Table responsive striped hover className='table-container'>
              <thead>
                <tr>
                  <th>
                    <Checkbox
                      id='server-policies-all'
                      type='checkbox'
                      checked={false}
                      onChange={() => {}}
                    />
                  </th>
                  <th>#</th>
                  <th>
                    <LinkerWithA
                      label='Name'
                      className='text-decoration-none'
                      onClick={() => {}}
                    />
                  </th>
                  <th>
                    <LinkerWithA
                      label='Policy'
                      className='text-decoration-none'
                      onClick={() => {}}
                    />
                  </th>
                  <th>
                    <LinkerWithA
                      label='Scope'
                      className='text-decoration-none'
                      onClick={() => {}}
                    />
                  </th>
                  <th>
                    <LinkerWithA
                      label='Destination'
                      className='text-decoration-none'
                      onClick={() => {}}
                    />
                  </th>
                  <th>
                    <LinkerWithA
                      label='Port'
                      className='text-decoration-none'
                      onClick={() => {}}
                    />
                  </th>
                  <th className='table-action-th'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  list.map((item, index) => {
                    return (
                      <tr key={'server-policies-tr-' + index}>
                        <td>
                          <Checkbox
                            id={`server-policies-${index}`}
                            type='checkbox'
                            checked={item.checked}
                            onChange={e => {}}
                          />
                        </td>
                        <td>{index+1}</td>
                        <td>{item.policyName}</td>
                        <td>{item.selectedPermission.title}</td>
                        <td>{item.selectedSelectedPolicyType?.title}</td>
                        <td>{item.ipAddress}</td>
                        {!item.endPort && <td>{item.startPort}</td> }
                        {!!item.endPort && <td>{item.startPort + '-' + item.endPort}</td> }
                        <td className='table-action-td'>
                          <ButtonAction
                            label='EDIT'
                            title='EDIT'
                            iconClassName='icon-edit'
                            onClick={() => {
                              setSelectedServerPolicies({...item});
                              changeModalStatus('editServerPolicies', true);
                            }}
                          />
                          <ButtonAction
                            label='DELETE'
                            title='DELETE'
                            iconClassName='icon-trash'
                            onClick={() => {
                              setSelectedServerPolicies({...item});
                              changeModalStatus('deleteServerPolicies', true);
                            }}
                          />
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>

            <PaginationContainer
              total={7}
              onPageChange={currentPageNum => console.log('onPageChange', currentPageNum) }
              onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum) }
            />

          </div>
        </div >
      }

      <AddModal
        {...{
          modalStatus,
          changeModalStatus,
          selectedDeviceModelName
        }}
      />

      <EditModal
        {...{
          modalStatus,
          changeModalStatus,
          selectedServerPolicies,
          selectedDeviceModelName
        }}
      />

      {/* Delete modal */}
      <ConfirmationModalContainer
        modalWidthType='modal-400px'
        title='Delete'
        description='Would you like to delete selected?'
        openModal={modalStatus.deleteServerPolicies.status}
        closeModal={() => changeModalStatus('deleteServerPolicies', false)}
        onConfirm={() => changeModalStatus('deleteServerPolicies', false)}
      />
    </>
  )
}

export default ServerPolicies;