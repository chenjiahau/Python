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
import { PptpL2tpContext } from '../../Context';

import AddModal from './AddModal';
import EditModal from './EditModal';

const defaultModalStatus = {
  addClientMode: {
    status: false,
    disabled: false,
  },
  editClientMode: {
    status: false,
    disabled: false,
  },
  deleteClientMode: {
    status: false,
    disabled: false,
  }
};

const ClientMode = () => {
  const { t } = useTranslation();
  const { state: {
      clientMode,
      selectedDeviceModelName
    }
  } = useContext(PptpL2tpContext);
  const [list, setList] = useState([]);
  const [selectedClientMode, setSelectedClientMode] = useState(null);
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  const changeModalStatus = (type, value) => {
    setModalStatus({ ...modalStatus, [type]: { ...modalStatus[type], status: value } });
  }

  // Side effect
  useEffect(() => {
    if (!clientMode) {
      return;
    }

    const updatedList = clientMode.map((clientModeItem, index) => {
      return {
        index: index + 1,
        checked: false,
        ...clientModeItem,
      }
    });

    setList(updatedList);

  }, [clientMode]);

  return (
    <>
      <Func title='CLIENT MODE'>
        {/* Tool bar box */}
        <div className='d-flex justify-content-between mb-1'>
          <ButtonGroup>
            {/* Add */}
            <Button
              label={t('ec211f7c20')}
              onClick={() => changeModalStatus('addClientMode', true)}
            ></Button>

            {/* Delete */}
            <Button
              label={t('f2a6c498fb')}
              disabled = {false}
              onClick={() => changeModalStatus('deleteClientMode', true)}
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
                    id='client-mode-all'
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
                    label='Username'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Client Type'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Server IP'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='IP address'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Status'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>Active</th>
                <th className='table-action-th'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                list.map((item, index) => {
                  return (
                    <tr key={'client-mode-tr-' + index}>
                      <td>
                        <Checkbox
                          id={`client-mode-${index}`}
                          type='checkbox'
                          checked={item.checked}
                          onChange={e => {}}
                        />
                      </td>
                      <td>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.userName}</td>
                      <td>{item.clientType}</td>
                      <td>{item.serverIp}</td>
                      <td>{item.ipAddress}</td>
                      <td>{item.status}</td>
                      <td className='input'>
                        <div className='d-flex'>
                          <RadioButton
                            id={`client-mode-enable-${index}`}
                            name={`client-mode-enable-${index}`}
                            label='Enable'
                            hasRightMargin={true}
                            checked={item.active}
                            onChange={() => {}}
                          />
                          <RadioButton
                            id={`client-mode-disable-${index}`}
                            name={`client-mode-disable-${index}`}
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
                            setSelectedClientMode({...item});
                            changeModalStatus('editClientMode', true);
                          }}
                        />
                        <ButtonAction
                          label='DELETE'
                          title='DELETE'
                          iconClassName='icon-trash'
                          onClick={() => {
                            setSelectedClientMode({...item});
                            changeModalStatus('deleteClientMode', true);
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
          selectedClientMode,
          selectedDeviceModelName
        }}
      />

      {/* Delete modal */}
      <ConfirmationModalContainer
        modalWidthType='modal-400px'
        title='Delete'
        description='Would you like to delete selected client mode?'
        openModal={modalStatus.deleteClientMode.status}
        closeModal={() => changeModalStatus('deleteClientMode', false)}
        onConfirm={() => changeModalStatus('deleteClientMode', false)}
      />
    </>
  )
}

export default ClientMode;