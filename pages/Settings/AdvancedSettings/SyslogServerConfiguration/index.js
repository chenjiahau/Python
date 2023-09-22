import syslogServerConfigurationStyle from './syslog-server-configuration.module.scss';

import { useState, useCallback } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Table & Modal
import SyslogServerConfigurationTable from './SyslogServerConfigurationTable';
import AddSyslogServerSettingModal from './modals/AddSyslogServerSettingModal';
import EditSyslogServerSettingModal from './modals/EditSyslogServerSettingModal';

// Components
import Button from '../../../../components/Button';
import Breadcrumb from '../../../../components/Breadcrumb';
import MessageBoxGroup from '../../../../components/MessageBoxGroup';
import PaginationContainer from '../../../../components/PaginationContainer';
import ConfirmationModalContainer from '../../../../components/ConfirmationModalContainer';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultPathList = [
  { label: 'Settings', isLink: false },
  { label: 'Advanced settings', isLink: false },
  { label: 'Syslog server configuration', isLink: false },
];

const defaultModalStatus = {
  add: {
    status: false,
    disabled: false,
  },
  delete: {
    status: false,
    disabled: true,
  },
  edit: {
    status: false,
    disabled: false,
  },
};

const SyslogServerConfiguration = () => {
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
            <Button
              label="Add"
              className="btn-grey"
              onClick={() => {
                console.log('add');
                changeModalStatus('add', true);
              }}
            ></Button>
            <Button
              label="Delete"
              className="btn-grey"
              onClick={() => {
                console.log('delete');
                changeModalStatus('delete', true);
              }}
              disabled
            ></Button>
          </ButtonGroup>
        </div>

        <SyslogServerConfigurationTable changeModalStatus={changeModalStatus} />

        <PaginationContainer
          total={1}
          onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
          onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
        />

        {/* Add syslog server setting modal */}
        <AddSyslogServerSettingModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        {/* Edit syslog server setting modal */}
        <EditSyslogServerSettingModal
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />

        {/* Delete modal */}
        <ConfirmationModalContainer
          modalWidthType="modal-400px"
          title="Delete syslog server"
          description="Do you want to delete?"
          openModal={modalStatus.delete.status}
          closeModal={() => changeModalStatus('delete', false)}
          onConfirm={() => changeModalStatus('delete', false)}
        />
      </div>
    </>
  );
};

export default SyslogServerConfiguration;
