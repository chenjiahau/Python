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

// Context
import { openVpnAction, OpenVpnContext } from '../../Context';

import AddModal from './AddModal';
import EditModal from './EditModal';

const defaultModalStatus = {
  addRemoteNetworks: {
    status: false,
    disabled: false,
  },
  editRemoteNetworks: {
    status: false,
    disabled: false,
  },
  deleteRemoteNetworks: {
    status: false,
    disabled: false,
  }
};

const RemoteNetworks = () => {
  const {
    state: {
      selectedDeviceModelName,
      openVpnUIDisplaying,
      openVpnSettings,
      remoteNetworks,
    },
    dispatch: openVpnDispatch
  } = useContext(OpenVpnContext);

  const { t } = useTranslation();
  const [list, setList] = useState([]);
  const [selectedRemoteNetworks, setSelectedRemoteNetworks] = useState(null);
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

  // Side effect
  useEffect(() => {
    if (!openVpnSettings || !remoteNetworks) {
      return;
    }

    const updatedList = remoteNetworks.map((remoteNetworksItem, index) => {
      return {
        index: index + 1,
        checked: false,
        ...remoteNetworksItem,
      }
    });

    setList(updatedList);

  }, [openVpnSettings, remoteNetworks]);

  if(!openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].remoteNetworks) return <></>

  return (
    <>
      <div className='form-group'>
        <div className='form-title form-title--indent ms-4'>Remote networks</div>
        <div className='form-field d-flex'>
          <RadioButton
            id={`remote-networks-enable`}
            name={`remote-networks-enable`}
            label='Enable'
            hasRightMargin={true}
            checked={openVpnSettings.RemoteNetworkEnable}
            onChange={() => changeValue({ key: 'RemoteNetworkEnable', value: true})}
          />
          <RadioButton
            id={`remote-networks-disable`}
            name={`remote-networks-disable`}
            label='Disable'
            checked={!openVpnSettings.RemoteNetworkEnable}
            onChange={() => changeValue({ key: 'RemoteNetworkEnable', value: false})}
          />
        </div>
      </div>

      {
        openVpnSettings.RemoteNetworkEnable &&
        <div className='mt-2' style={{marginBottom: '48px'}}>
          {/* Tool bar box */}
          <div className='d-flex justify-content-between mb-1'>
            <ButtonGroup>
              {/* Add */}
              <Button
                label={t('ec211f7c20')}
                onClick={() => changeModalStatus('addRemoteNetworks', true)}
              ></Button>

              {/* Delete */}
              <Button
                label={t('f2a6c498fb')}
                disabled = {false}
                onClick={() => changeModalStatus('deleteRemoteNetworks', true)}
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
                      id='remote-networks-all'
                      type='checkbox'
                      checked={false}
                      onChange={() => {}}
                    />
                  </th>
                  <th>#</th>
                  <th>
                    <LinkerWithA
                      label='Common name'
                      className='text-decoration-none'
                      onClick={() => {}}
                    />
                  </th>
                  <th>
                    <LinkerWithA
                      label='Remote networks'
                      className='text-decoration-none'
                      onClick={() => {}}
                    />
                  </th>
                  <th>
                    <LinkerWithA
                      label='Subnet mask'
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
                      <tr key={'remote-networks-tr-' + index}>
                        <td>
                          <Checkbox
                            id={`remote-networks-${index}`}
                            type='checkbox'
                            checked={item.checked}
                            onChange={e => {}}
                          />
                        </td>
                        <td>{index+1}</td>
                        <td>{item.commonName}</td>
                        <td>{item.remoteIPAddress}</td>
                        <td>{item.remoteNetmask}</td>
                        <td className='table-action-td'>
                          <ButtonAction
                            label='EDIT'
                            title='EDIT'
                            iconClassName='icon-edit'
                            onClick={() => {
                              setSelectedRemoteNetworks({...item});
                              changeModalStatus('editRemoteNetworks', true);
                            }}
                          />
                          <ButtonAction
                            label='DELETE'
                            title='DELETE'
                            iconClassName='icon-trash'
                            onClick={() => {
                              setSelectedRemoteNetworks({...item});
                              changeModalStatus('deleteRemoteNetworks', true);
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
          selectedRemoteNetworks,
          selectedDeviceModelName
        }}
      />

      {/* Delete modal */}
      <ConfirmationModalContainer
        modalWidthType='modal-400px'
        title='Delete'
        description='Would you like to delete selected?'
        openModal={modalStatus.deleteRemoteNetworks.status}
        closeModal={() => changeModalStatus('deleteRemoteNetworks', false)}
        onConfirm={() => changeModalStatus('deleteRemoteNetworks', false)}
      />
    </>
  )
}

export default RemoteNetworks;