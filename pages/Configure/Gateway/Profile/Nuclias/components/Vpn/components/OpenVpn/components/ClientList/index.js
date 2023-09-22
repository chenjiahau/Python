import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import ReactDOMServer from 'react-dom/server';
import { cloneDeep } from 'lodash';
import { Table, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Component
import {
  Hr,
  Button,
  TooltipDialog,
  Checkbox,
  LinkerWithA,
  InputWithIcon,
  ButtonAction,
  PaginationContainer,
  ConfirmationModalContainer
} from 'components/';

// Context
import { openVpnAction, OpenVpnContext } from '../../Context';

// Modal
import ImportModal from './ImportModal';
import ViewModal from './ViewModal';
import AddLocalAuthenticationModal from 'cloudUi/Modals/LocalAuthenticationModal/AddLocalAuthenticationModal';

const defaultModalStatus = {
  importClientList: {
    status: false,
    disabled: false,
  },
  resumeClientList: {
    status: false,
    disabled: false,
  },
  viewClientList: {
    status: false,
    disabled: false,
  },
  addLocalDb: {
    status: false,
    disabled: false,
  }
};

const ClientList = () => {
  const {
    state: {
      selectedDeviceModelName,
      openVpnUIDisplaying,
      openVpnSettings,
      clientList,
      importClientList
    }
  } = useContext(OpenVpnContext);

  const { t } = useTranslation();
  const [list, setList] = useState([]);
  const [selectedClientList, setSelectedClientList] = useState(null);
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  const changeModalStatus = (type, value) => {
    setModalStatus({ ...modalStatus, [type]: { ...modalStatus[type], status: value } });
  }

  const changeMultipleModalStatus = (newModalStatus) => {
    const clonedModalStatus = cloneDeep(modalStatus);
    Object.keys(newModalStatus).forEach(modalKey => { if (clonedModalStatus[modalKey] !== undefined) clonedModalStatus[modalKey].status = newModalStatus[modalKey] });
    setModalStatus(clonedModalStatus);
  }

  // Side effect
  useEffect(() => {
    if (!openVpnSettings || !clientList) {
      return;
    }

    const updatedList = clientList.map((clientListItem, index) => {
      return {
        index: index + 1,
        checked: false,
        ...clientListItem,
      }
    });

    setList(updatedList);

  }, [openVpnSettings, clientList]);

  if (!openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].clientListTable) return <></>

  return (
    <>
      <div className='d-flex align-items-center mt-3'>
        <div className='d-flex align-items-center inline-upper-case-title'>CLIENT LIST</div>
        <div className='d-flex align-items-center' style={{ marginLeft: '10px' }} >
          <TooltipDialog
            title={ReactDOMServer.renderToString(<div>OpenVPN client supports version from OpenVPN 2.5.0.</div>)}
            placement={'right'}
          />
        </div>
      </div>
      <div className='mt-1 modal-warning-color'>(Since the selected OpenVPN server certificate does not have CA private key, this function is disabled.)</div>
      <Hr className='mb-3' />

      <div className='mt-2' style={{ marginBottom: '48px' }}>
        {/* Tool bar box */}
        <div className='d-flex justify-content-between mb-1'>
          <ButtonGroup>
            {/* Import */}
            <Button
              label={t('aee2225ad1')}
              onClick={() => changeModalStatus('importClientList', true)}
            ></Button>

            {/* Revoke */}
            <Button
              label={t('64c2406bee')}
              disabled={false}
              onClick={() => { }}
            ></Button>

            {/* Resume */}
            <Button
              label={t('dae71d5bb9')}
              disabled={false}
              onClick={() => changeModalStatus('resumeClientList', true)}
            ></Button>

            {/* Download */}
            <Button
              label={t('801ab24683')}
              disabled={false}
              onClick={() => { }}
            ></Button>

          </ButtonGroup>

          {/* Search */}
          <InputWithIcon
            type='Search'
            iconPosition='left'
            placeholder={t('13348442cc')}
            value={''}
            onChange={e => { }}
            onFocus={() => { }}
            onBlur={() => { }}
            iconClassName='icon-search'
            iconOnClick={() => { }}
          />
        </div>

        <div>
          <Table responsive striped hover className='table-container'>
            <thead>
              <tr>
                <th>
                  <Checkbox
                    id='client-list-all'
                    type='checkbox'
                    checked={false}
                    onChange={() => { }}
                  />
                </th>
                <th>#</th>
                <th>
                  <LinkerWithA
                    label='Username'
                    className='text-decoration-none'
                    onClick={() => { }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Local authentication pool name'
                    className='text-decoration-none'
                    onClick={() => { }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Status'
                    className='text-decoration-none'
                    onClick={() => { }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Import at'
                    className='text-decoration-none'
                    onClick={() => { }}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Update at'
                    className='text-decoration-none'
                    onClick={() => { }}
                  />
                </th>
                <th className='table-action-th'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                list.map((item, index) => {
                  return (
                    <tr key={'client-list-tr-' + index}>
                      <td>
                        <Checkbox
                          id={`client-list-${index}`}
                          type='checkbox'
                          checked={item.checked}
                          onChange={e => { }}
                        />
                      </td>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.localdbClassName}</td>
                      <td>{item.status}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.updatedAt}</td>
                      <td className='table-action-td'>
                        <ButtonAction
                          label='VIEW'
                          title='VIEW'
                          iconClassName='icon-edit'
                          onClick={() => {
                            setSelectedClientList({ ...item });
                            changeModalStatus('viewClientList', true);
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
            onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
            onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
          />

        </div>
      </div>

      <ImportModal
        {...{
          modalStatus,
          changeModalStatus,
          changeMultipleModalStatus,
          selectedDeviceModelName,
          importClientList
        }}
      />

      <ViewModal
        {...{
          modalStatus,
          changeModalStatus,
          selectedClientList,
          selectedDeviceModelName
        }}
      />

      {/* Resume modal */}
      <ConfirmationModalContainer
        modalWidthType='modal-400px'
        title='Resume user certificate'
        description='Would you like to resume selected certificate?'
        openModal={modalStatus.resumeClientList.status}
        closeModal={() => changeModalStatus('resumeClientList', false)}
        onConfirm={() => changeModalStatus('resumeClientList', false)}
      />

      <AddLocalAuthenticationModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        callback={() => {
          changeMultipleModalStatus({
            importClientList: true,
            addLocalDb: false
          });
        }}
      />

    </>
  )
}

export default ClientList;