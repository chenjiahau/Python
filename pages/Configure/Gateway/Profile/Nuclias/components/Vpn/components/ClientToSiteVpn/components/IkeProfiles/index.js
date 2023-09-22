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
  addIke: {
    status: false,
    disabled: false,
  },
  editIke: {
    status: false,
    disabled: false,
  },
  deleteIke: {
    status: false,
    disabled: false,
  }
};

const IkeProfiles = () => {
  const { t } = useTranslation();
  const { state: {
    ikeProfiles,
    selectedDeviceModelName
  } } = useContext(ClientToSiteVpnContext);
  const [list, setList] = useState([]);
  const [selectedIke, setSelectedIke] = useState(null);
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  const changeModalStatus = (type, value) => {
    setModalStatus({ ...modalStatus, [type]: { ...modalStatus[type], status: value } });
  }

  // Side effect
  useEffect(() => {
    if (!ikeProfiles) {
      return;
    }

    const updatedList = ikeProfiles.map((ikeItem, index) => {
      return {
        index: index + 1,
        checked: false,
        ...ikeItem,
      }
    });

    setList(updatedList);

  }, [ikeProfiles]);

  return (
    <>
      <Func
        title='IKE PROFILE'
        placement='right'
        htmlTooltip={(
          <div>
            <div>The IKE profile is the central configuration in IPSec that defines most of the IPSec parameters such as the protocol (Encapsulation Security Payload, Authentication Header), algorithms (encryption, integrity, Diffie-Hellman), SA lifetime, and key management protocol (IKEv1, IKEv2).</div>
            <br></br>
            <div>The IKE profiles contain information related to the algorithms such as encryption, authentication, and DH group for Phase I and II negotiations in auto mode.</div>
            <br></br>
            <em className='v2-modal-form-prompt'>Be sure to enter the same settings when configuring the two ends of a VPN tunnel.</em>
          </div>
        )}
      >

        {/* Tool bar box */}
        <div className='d-flex justify-content-between mb-1'>
          <ButtonGroup>
            {/* Add */}
            <Button
              label={t('ec211f7c20')}
              onClick={() => changeModalStatus('addIke', true)}
            ></Button>

            {/* Delete */}
            <Button
              label={t('f2a6c498fb')}
              disabled = {false}
              onClick={() => changeModalStatus('deleteIke', true)}
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
                    id='ike-profile-checkbox-all'
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
                    label='ikeVersion'
                    className='text-decoration-none'
                    onClick={() => {}}
                  />
                </th>
                <th>
                  <LinkerWithA
                    label='In use'
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
                    <tr key={'ike-profiles-tr-' + index}>
                      <td>
                        <Checkbox
                          id={`ike-profile-checkbox-${index}`}
                          type='checkbox'
                          checked={item.checked}
                          onChange={e => {}}
                        />
                      </td>
                      <td>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.ikeVersion}</td>
                      <td>{item.inUse}</td>
                      <td className='table-action-td'>
                        <ButtonAction
                          label='EDIT'
                          title='EDIT'
                          iconClassName='icon-edit'
                          onClick={() => {
                            setSelectedIke({...item});
                            changeModalStatus('editIke', true);
                          }}
                        />
                        <ButtonAction
                          label='DELETE'
                          title='DELETE'
                          iconClassName='icon-trash'
                          onClick={() => {
                            setSelectedIke({...item});
                            changeModalStatus('deleteIke', true);
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
          selectedIke,
          selectedDeviceModelName
        }}
      />

      {/* Delete modal */}
      <ConfirmationModalContainer
        modalWidthType='modal-400px'
        title='Delete'
        description='Would you like to delete selected?'
        openModal={modalStatus.deleteIke.status}
        closeModal={() => changeModalStatus('deleteIke', false)}
        onConfirm={() => changeModalStatus('deleteIke', false)}
      />
    </>
  )
}

export default IkeProfiles;