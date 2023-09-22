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
  addOmniSSLPortalLayout: {
    status: false,
    disabled: false,
  },
  editOmniSSLPortalLayout: {
    status: false,
    disabled: false,
  },
  deleteOmniSSLPortalLayout: {
    status: false,
    disabled: false,
  }
};

const OmniSslPortalLayout = () => {
  const {
    state: {
      selectedDeviceModelName,
      openVpnUIDisplaying,
      openVpnSettings,
      omniSslPortalLayout,
    }
  } = useContext(OpenVpnContext);
  const { t } = useTranslation();
  const [list, setList] = useState([]);
  const [selectedOmniSSLPortalLayout, setSelectedOmniSSLPortalLayout] = useState(null);
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  const changeModalStatus = (type, value) => {
    setModalStatus({ ...modalStatus, [type]: { ...modalStatus[type], status: value } });
  }

  // Side effect
  useEffect(() => {
    if (!openVpnSettings || !omniSslPortalLayout) {
      return;
    }

    const updatedList = omniSslPortalLayout.map((omniSslPortalLayoutItem, index) => {
      return {
        index: index + 1,
        checked: false,
        ...omniSslPortalLayoutItem,
      }
    });

    setList(updatedList);

  }, [openVpnSettings, omniSslPortalLayout]);

  if(!openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].omniSslTable || !openVpnSettings.userBasedAuth) return <></>

  return (
    <div className='mt-3'>
      <Func
        title='OMNISSL PORTAL LAYOUT'
        placement='right'
        htmlTooltip={(
          <div>OmniSSL portal layout allows you to create a custom page for remote OmniSSL users that is presented upon authentication.</div>
        )}
      >
        <div className='mt-2' style={{marginBottom: '48px'}}>
          {/* Tool bar box */}
          <div className='d-flex justify-content-between mb-1'>
            <ButtonGroup>
              {/* Add */}
              <Button
                label={t('ec211f7c20')}
                onClick={() => changeModalStatus('addOmniSSLPortalLayout', true)}
              ></Button>

              {/* Delete */}
              <Button
                label={t('f2a6c498fb')}
                disabled = {false}
                onClick={() => changeModalStatus('deleteOmniSSLPortalLayout', true)}
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
                      id='omni-ssl-portal-layout-all'
                      type='checkbox'
                      checked={false}
                      onChange={() => {}}
                    />
                  </th>
                  <th>#</th>
                  <th>Layout name</th>
                  <th>Login page</th>
                  <th>Active</th>
                  <th className='table-action-th'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {
                  list.map((item, index) => {
                    return (
                      <tr key={'omni-ssl-portal-layout-tr-' + index}>
                        <td>
                          <Checkbox
                            id={`omni-ssl-portal-layout-${index}`}
                            type='checkbox'
                            checked={item.checked}
                            disabled={item.isDefault}
                            onChange={e => {}}
                          />
                        </td>
                        <td>{index+1}</td>
                        <td>{item.name}</td>
                        <td>{item.loginPage}</td>
                        <td className='input'>
                          <div className='d-flex'>
                            <RadioButton
                              id={`ipsec-vpn-server-enable-${index}`}
                              name={`ipsec-vpn-server-enable-${index}`}
                              label='Enable'
                              hasRightMargin={true}
                              checked={item.active}
                              onChange={() => {}}
                            />
                            <RadioButton
                              id={`ipsec-vpn-server-disable-${index}`}
                              name={`ipsec-vpn-server-disable-${index}`}
                              label='Disable'
                              checked={!item.active}
                              onChange={() => {}}
                            />
                          </div>
                        </td>
                        <td className='table-action-td'>
                          <ButtonAction
                            label='EDIT'
                            title='EDIT'
                            iconClassName='icon-edit'
                            disabled={item.isDefault}
                            onClick={() => {
                              setSelectedOmniSSLPortalLayout({...item});
                              changeModalStatus('editOmniSSLPortalLayout', true);
                            }}
                          />
                          <ButtonAction
                            label='DELETE'
                            title='DELETE'
                            iconClassName='icon-trash'
                            disabled={item.isDefault}
                            onClick={() => {
                              setSelectedOmniSSLPortalLayout({...item});
                              changeModalStatus('deleteOmniSSLPortalLayout', true);
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
      </Func>

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
          selectedOmniSSLPortalLayout,
          selectedDeviceModelName
        }}
      />

      {/* Delete modal */}
      <ConfirmationModalContainer
        modalWidthType='modal-400px'
        title='Delete'
        description='Would you like to delete selected?'
        openModal={modalStatus.deleteOmniSSLPortalLayout.status}
        closeModal={() => changeModalStatus('deleteOmniSSLPortalLayout', false)}
        onConfirm={() => changeModalStatus('deleteOmniSSLPortalLayout', false)}
      />
    </div>
  )
}

export default OmniSslPortalLayout;