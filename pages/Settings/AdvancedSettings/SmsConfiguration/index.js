import smsConfigurationStyle from './sms-configuration.module.scss';

import { useState, useCallback } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Table & Modal
import SmsConfigurationTable from './SmsConfigurationTable';

// UI
import AddSmsConfigurationModal from "cloudUi/Modals/SmsConfigurationModal/AddSmsConfigurationModal";
import EditSmsConfigurationModal from "cloudUi/Modals/SmsConfigurationModal/EditSmsConfigurationModal";

// Components
import Breadcrumb from '../../../../components/Breadcrumb';
import ButtonWithIcon from '../../../../components/ButtonWithIcon';
import MessageBoxGroup from '../../../../components/MessageBoxGroup';
import DropdownWithItem from '../../../../components/DropdownWithItem';
import PaginationContainer from '../../../../components/PaginationContainer';
import DropdownWithAdvancedSearch from '../../../../components/DropdownWithAdvancedSearch';
import ConfirmationModalContainer from '../../../../components/ConfirmationModalContainer';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultPathList = [
  { label: 'Settings', isLink: false },
  { label: 'Advanced settings', isLink: false },
  { label: 'SMS configuration', isLink: false },
];

const dropdownSiteTagList = [
  { title: 'All', isActive: true },
  { title: 'Hsinchu', isActive: false },
  { title: 'Kaohsiung', isActive: false },
  { title: 'Taipei', isActive: false },
];

const dropdownSiteList = [
  { title: 'All', isActive: true },
  { title: 'Test', isActive: false },
  { title: 'HQ', isActive: false },
  { title: 'Neiwan', isActive: false },
  { title: 'Daliao', isActive: false },
  { title: 'Dream Mail', isActive: false },
  { title: 'Neihu', isActive: false },
  { title: 'Songshan', isActive: false },
];

const defaultModalStatus = {
  addSms: {
    status: false,
  },
  editSms: {
    status: false,
  },
  delete: {
    status: false,
  },
};

const SmsConfiguration = () => {
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });

  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />

      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />

        <div className="d-flex justify-content-between mb-2">
          <ButtonGroup>
            <ButtonWithIcon
              label="Add SMS account"
              iconClassName="icon-expand"
              onClick={() => changeModalStatus('addSms', true)}
            ></ButtonWithIcon>
          </ButtonGroup>

          <DropdownWithAdvancedSearch
            value={''}
            alignEnd={true}
            dataBsToggleOnInput={true}
            dataBsToggleOnButton={true}
            readOnly
            dropdownMenuStyle={{ minWidth: 371 }}
            onChange={e => console.log(e.target.value)}
          >
            <li>
              <div className="form-title">Site tag</div>
              <DropdownWithItem
                id="status-dropdown"
                type="normal"
                selectedItem={dropdownSiteTagList[0]}
                itemList={dropdownSiteTagList}
                onClick={() => { }}
              />
            </li>
            <li className="mt-2">
              <div className="form-title">Site</div>
              <DropdownWithItem
                id="status-dropdown"
                type="normal"
                selectedItem={dropdownSiteList[0]}
                itemList={dropdownSiteList}
                onClick={() => { }}
              />
            </li>
          </DropdownWithAdvancedSearch>
        </div>

        <SmsConfigurationTable changeModalStatus={changeModalStatus} />

        <PaginationContainer
          total={3}
          onPageChange={currentPageNum =>
            console.log('onPageChange', currentPageNum)
          }
          onEntryLimitChange={currentPageNum =>
            console.log('onEntryLimitChange', currentPageNum)
          }
        />

        {/* Add SMS account modal */}
        <AddSmsConfigurationModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        {/* Edit modal */}
        <EditSmsConfigurationModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        {/* Delete modal */}
        <ConfirmationModalContainer
          modalWidthType="modal-400px"
          title="Delete a SMS configuration"
          description="Do you want to delete this SMS configuration?"
          openModal={modalStatus.delete.status}
          closeModal={() => changeModalStatus('delete', false)}
          onConfirm={() => changeModalStatus('delete', false)}
        />
      </div>
    </>
  );
};

export default SmsConfiguration;
