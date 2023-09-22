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
import { GreTunnelContext } from '../../Context';

import AddModal from './AddModal';
import EditModal from './EditModal';

const defaultModalStatus = {
  addGreTunnel: {
    status: false,
    disabled: false,
  },
  editGreTunnel: {
    status: false,
    disabled: false,
  },
  deleteGreTunnel: {
    status: false,
    disabled: false,
  }
};

const GreTunnelConfiguration = () => {
  const { t } = useTranslation();
  const {
    state: {
      greTunnelConfiguration,
      selectedDeviceModelName
    }
  } = useContext(GreTunnelContext);
  const [list, setList] = useState([]);
  const [selectedGreTunnel, setSelectedGreTunnel] = useState(null);
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  const changeModalStatus = (type, value) => {
    setModalStatus({ ...modalStatus, [type]: { ...modalStatus[type], status: value } });
  }

  // Side effect
  useEffect(() => {
    if (!greTunnelConfiguration) {
      return;
    }

    const updatedList = greTunnelConfiguration.map((greTunnelItem, index) => {
      return {
        index: index + 1,
        checked: false,
        ...greTunnelItem,
      }
    });

    setList(updatedList);

  }, [greTunnelConfiguration]);

  return (
    <>
      <Func title='CONFIGURATION'>
        {/* Tool bar box */}
        <div className='d-flex justify-content-between mb-1'>
          <ButtonGroup>
            {/* Add */}
            <Button
              label={t('ec211f7c20')}
              onClick={() => changeModalStatus('addGreTunnel', true)}
            ></Button>

            {/* Delete */}
            <Button
              label={t('f2a6c498fb')}
              disabled = {false}
              onClick={() => changeModalStatus('deleteGreTunnel', true)}
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
                    id='server-mode-all'
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
                    label='GRE tunnel IP'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Remote IP'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>Active</th>
                <th>
                  <LinkerWithA
                    label='Status'
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
                    <tr key={'server-mode-tr-' + index}>
                      <td>
                        <Checkbox
                          id={`server-mode-${index}`}
                          type='checkbox'
                          checked={item.checked}
                          onChange={e => {}}
                        />
                      </td>
                      <td>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.interface}</td>
                      <td>{item.greTunnelIp}</td>
                      <td>{item.remoteIp}</td>
                      <td className='input'>
                        <div className='d-flex'>
                          <RadioButton
                            id={`gre-tunnel-enable-${index}`}
                            name={`gre-tunnel-enable-${index}`}
                            label='Enable'
                            hasRightMargin={true}
                            checked={item.active}
                            onChange={() => {}}
                          />
                          <RadioButton
                            id={`gre-tunnel-disable-${index}`}
                            name={`gre-tunnel-disable-${index}`}
                            label='Disable'
                            checked={!item.active}
                            onChange={() => {}}
                          />
                        </div>
                      </td>
                      <td>{item.status}</td>
                      <td className='table-action-td'>
                        <ButtonAction
                          label='EDIT'
                          title='EDIT'
                          iconClassName='icon-edit'
                          onClick={() => {
                            setSelectedGreTunnel({...item});
                            changeModalStatus('editGreTunnel', true);
                          }}
                        />
                        <ButtonAction
                          label='DELETE'
                          title='DELETE'
                          iconClassName='icon-trash'
                          onClick={() => {
                            setSelectedGreTunnel({...item});
                            changeModalStatus('deleteGreTunnel', true);
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
          selectedGreTunnel,
          selectedDeviceModelName
        }}
      />

      {/* Delete modal */}
      <ConfirmationModalContainer
        modalWidthType='modal-400px'
        title='Delete a GRE tunnel'
        description='Do you want to delete?'
        openModal={modalStatus.deleteGreTunnel.status}
        closeModal={() => changeModalStatus('deleteGreTunnel', false)}
        onConfirm={() => changeModalStatus('deleteGreTunnel', false)}
      />
    </>
  )
}

export default GreTunnelConfiguration;