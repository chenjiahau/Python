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
import { SiteToSiteVpnContext } from '../../Context';

import AddModal from './AddModal';
import EditModal from './EditModal';

const defaultModalStatus = {
  addConfig: {
    status: false,
    disabled: false,
  },
  editConfig: {
    status: false,
    disabled: false,
  },
  deleteConfig: {
    status: false,
    disabled: false,
  }
};

const ManualVpnConfiguration = () => {
  const { t } = useTranslation();
  const { state: {
      manualVpnConfiguration,
      selectedDeviceModelName
    }
  } = useContext(SiteToSiteVpnContext);
  const [list, setList] = useState([]);
  const [selectedConfig, setSelectedConfig] = useState(null);
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  const changeModalStatus = (type, value) => {
    setModalStatus({ ...modalStatus, [type]: { ...modalStatus[type], status: value } });
  }

  // Side effect
  useEffect(() => {
    if (!manualVpnConfiguration) {
      return;
    }

    const updatedList = manualVpnConfiguration.map((configItem, index) => {
      return {
        index: index + 1,
        checked: false,
        ...configItem,
      }
    });

    setList(updatedList);

  }, [manualVpnConfiguration]);

  return (
    <div className='manual-vpn-config-container'>
      <Func
        title='MANUAL VPN SETTINGS'
        htmlTooltip='Options in this section apply to this Nuclias gateway only.'
        placement='right'
      >

        <div className='d-flex align-item-center my-2 form-group'>
          <div className='form-title' style={{minWidth: 'auto'}}>Manual VPN configuration</div>
        </div>

        {/* Tool bar box */}
        <div className='d-flex justify-content-between mb-1'>
          <ButtonGroup>
            {/* Add */}
            <Button
              label={t('ec211f7c20')}
              onClick={() => changeModalStatus('addConfig', true)}
            ></Button>

            {/* Delete */}
            <Button
              label={t('f2a6c498fb')}
              disabled = {false}
              onClick={() => changeModalStatus('deleteConfig', true)}
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
                    id='manual-vpn-config-all-checkbox'
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
                    label='Remote Gateway'
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
                    label='Remote network'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='IKE profile'
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
                <th>
                  <LinkerWithA
                    label='Status'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='Actions'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {
                list.map((item, index) => {
                  return (
                    <tr key={'manual-vpn-config-tr-' + index}>
                      <td>
                        <Checkbox
                          id={`manual-vpn-config-checkbox-${index}`}
                          type='checkbox'
                          checked={item.checked}
                          onChange={e => {}}
                        />
                      </td>
                      <td>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.remoteGateway}</td>
                      <td>{item.interface}</td>
                      <td>{item.localNetwork}</td>
                      <td>{item.remoteNetwork}</td>
                      <td>{item.ikeProfile}</td>
                      <td className='input'>
                        <div className='d-flex'>
                          <RadioButton
                            id={`manual-vpn-config-enable-${index}`}
                            name={`manual-vpn-config-enable-${index}`}
                            label='Enable'
                            hasRightMargin={true}
                            checked={item.active}
                            onChange={() => {}}
                          />
                          <RadioButton
                            id={`manual-vpn-config-disable-${index}`}
                            name={`manual-vpn-config-disable-${index}`}
                            label='Disable'
                            checked={!item.active}
                            onChange={() => {}}
                          />
                        </div>
                      </td>
                      <td>{item.status}</td>
                      <td className={'table-action-td'}>
                        <ButtonAction
                          label='EDIT'
                          title='EDIT'
                          iconClassName='icon-edit'
                          onClick={() => {
                            setSelectedConfig({...item});
                            changeModalStatus('editConfig', true);
                          }}
                        />
                        <ButtonAction
                          label='DELETE'
                          title='DELETE'
                          iconClassName='icon-trash'
                          onClick={() => {
                            setSelectedConfig({...item});
                            changeModalStatus('deleteConfig', true);
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
          selectedConfig,
          selectedDeviceModelName
        }}
      />

      {/* Delete modal */}
      <ConfirmationModalContainer
        modalWidthType='modal-400px'
        title='Delete'
        description='Would you like to delete selected?'
        openModal={modalStatus.deleteConfig.status}
        closeModal={() => changeModalStatus('deleteConfig', false)}
        onConfirm={() => changeModalStatus('deleteConfig', false)}
      />

    </div>
  )
}

export default ManualVpnConfiguration;