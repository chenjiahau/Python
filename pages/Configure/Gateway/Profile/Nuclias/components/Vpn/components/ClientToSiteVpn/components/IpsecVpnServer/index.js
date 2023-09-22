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
import { ClientToSiteVpnContext } from '../../Context';

import AddModal from './AddModal';
import EditModal from './EditModal';

const defaultModalStatus = {
  addIpSecVpnServer: {
    status: false,
    disabled: false,
  },
  editIpSecVpnServer: {
    status: false,
    disabled: false,
  },
  deleteIpSecVpnServer: {
    status: false,
    disabled: false,
  }
};

const IpsecVpnServer = () => {
  const { t } = useTranslation();
  const { state: {
    ipsecVpnServer,
    selectedDeviceModelName
  } } = useContext(ClientToSiteVpnContext);
  const [list, setList] = useState([]);
  const [selectedIpsecVpnServer, setSelectedIpsecVpnServer] = useState(null);
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  const changeModalStatus = (type, value) => {
    setModalStatus({ ...modalStatus, [type]: { ...modalStatus[type], status: value } });
  }

  // Side effect
  useEffect(() => {
    if (!ipsecVpnServer) {
      return;
    }

    const updatedList = ipsecVpnServer.map((vpnServerItem, index) => {
      return {
        index: index + 1,
        checked: false,
        ...vpnServerItem,
      }
    });

    setList(updatedList);

  }, [ipsecVpnServer]);

  return (
    <>
      <Func
        title='IPSEC VPN SERVER'
      >

        {/* Tool bar box */}
        <div className='d-flex justify-content-between mb-1'>
          <ButtonGroup>
            {/* Add */}
            <Button
              label={t('ec211f7c20')}
              onClick={() => changeModalStatus('addIpSecVpnServer', true)}
            ></Button>

            {/* Delete */}
            <Button
              label={t('f2a6c498fb')}
              disabled = {false}
              onClick={() => changeModalStatus('deleteIpSecVpnServer', true)}
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
                    id='ipsec-vpn-server-checkbox-all'
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
                    label='Interface'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Local network'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Ike profile'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Active'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th className='table-action-th'>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                list.map((item, index) => {
                  return (
                    <tr key={'ipsec-vpn-server-profiles-tr-' + index}>
                      <td>
                        <Checkbox
                          id={`ipsec-vpn-server-checkbox-${index}`}
                          type='checkbox'
                          checked={item.checked}
                          onChange={e => {}}
                        />
                      </td>
                      <td>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.interface}</td>
                      <td>{item.localNetwork}</td>
                      <td>{item.ikeProfile}</td>
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
                          onClick={() => {
                            setSelectedIpsecVpnServer({...item});
                            changeModalStatus('editIpSecVpnServer', true);
                          }}
                        />
                        <ButtonAction
                          label='DELETE'
                          title='DELETE'
                          iconClassName='icon-trash'
                          onClick={() => {
                            setSelectedIpsecVpnServer({...item});
                            changeModalStatus('deleteIpSecVpnServer', true);
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
      </Func >

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
          selectedIpsecVpnServer,
          selectedDeviceModelName
        }}
      />

      {/* Delete modal */}
      <ConfirmationModalContainer
        modalWidthType='modal-400px'
        title='Delete'
        description='Would you like to delete selected?'
        openModal={modalStatus.deleteIpSecVpnServer.status}
        closeModal={() => changeModalStatus('deleteIpSecVpnServer', false)}
        onConfirm={() => changeModalStatus('deleteIpSecVpnServer', false)}
      />
    </>
  )
}

export default IpsecVpnServer;