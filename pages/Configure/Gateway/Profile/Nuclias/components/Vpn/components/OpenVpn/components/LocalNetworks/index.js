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
  addLocalNetworks: {
    status: false,
    disabled: false,
  },
  editLocalNetworks: {
    status: false,
    disabled: false,
  },
  deleteLocalNetworks: {
    status: false,
    disabled: false,
  }
};

const LocalNetworks = () => {
  const {
    state: {
      selectedDeviceModelName,
      openVpnUIDisplaying,
      openVpnSettings,
      localNetworks,
    },
    dispatch: openVpnDispatch
  } = useContext(OpenVpnContext);

  const { t } = useTranslation();
  const [list, setList] = useState([]);
  const [selectedLocalNetworks, setSelectedLocalNetworks] = useState(null);
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
    if (!openVpnSettings || !localNetworks) {
      return;
    }

    const updatedList = localNetworks.map((localNetworksItem, index) => {
      return {
        index: index + 1,
        checked: false,
        ...localNetworksItem,
      }
    });

    setList(updatedList);

  }, [openVpnSettings, localNetworks]);

  if(!openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].localNetworks || openVpnSettings.selectedTunnelType.value !== 'SPLIT_TUNNEL') return <></>

  return (
    <>
      <div className='form-group'>
        <div className='form-title form-title--indent ms-4'>Local networks</div>
        <div className='form-field d-flex'>
          <RadioButton
            id={`local-networks-enable`}
            name={`local-networks-enable`}
            label='Enable'
            hasRightMargin={true}
            checked={openVpnSettings.LocalNetworkEnable}
            onChange={() => changeValue({ key: 'LocalNetworkEnable', value: true})}
          />
          <RadioButton
            id={`local-networks-disable`}
            name={`local-networks-disable`}
            label='Disable'
            checked={!openVpnSettings.LocalNetworkEnable}
            onChange={() => changeValue({ key: 'LocalNetworkEnable', value: false})}
          />
        </div>
      </div>

      {
        openVpnSettings.LocalNetworkEnable &&
        <div className='mt-2' style={{marginBottom: '48px'}}>
          {/* Tool bar box */}
          <div className='d-flex justify-content-between mb-1'>
            <ButtonGroup>
              {/* Add */}
              <Button
                label={t('ec211f7c20')}
                onClick={() => changeModalStatus('addLocalNetworks', true)}
              ></Button>

              {/* Delete */}
              <Button
                label={t('f2a6c498fb')}
                disabled = {false}
                onClick={() => changeModalStatus('deleteLocalNetworks', true)}
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
                      id='local-networks-all'
                      type='checkbox'
                      checked={false}
                      onChange={() => {}}
                    />
                  </th>
                  <th>#</th>
                  <th>
                    <LinkerWithA
                      label='Local networks'
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
                      <tr key={'local-networks-tr-' + index}>
                        <td>
                          <Checkbox
                            id={`local-networks-${index}`}
                            type='checkbox'
                            checked={item.checked}
                            onChange={e => {}}
                          />
                        </td>
                        <td>{index+1}</td>
                        <td>{item.localIPAddress}</td>
                        <td>{item.localSubnetmask}</td>
                        <td className='table-action-td'>
                          <ButtonAction
                            label='EDIT'
                            title='EDIT'
                            iconClassName='icon-edit'
                            onClick={() => {
                              setSelectedLocalNetworks({...item});
                              changeModalStatus('editLocalNetworks', true);
                            }}
                          />
                          <ButtonAction
                            label='DELETE'
                            title='DELETE'
                            iconClassName='icon-trash'
                            onClick={() => {
                              setSelectedLocalNetworks({...item});
                              changeModalStatus('deleteLocalNetworks', true);
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
          selectedLocalNetworks,
          selectedDeviceModelName
        }}
      />

      {/* Delete modal */}
      <ConfirmationModalContainer
        modalWidthType='modal-400px'
        title='Delete'
        description='Would you like to delete selected?'
        openModal={modalStatus.deleteLocalNetworks.status}
        closeModal={() => changeModalStatus('deleteLocalNetworks', false)}
        onConfirm={() => changeModalStatus('deleteLocalNetworks', false)}
      />
    </>
  )
}

export default LocalNetworks;