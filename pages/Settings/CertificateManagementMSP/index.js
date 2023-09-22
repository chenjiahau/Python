import certificateManagementStyle from './certificate-management.module.scss';

import { useState } from 'react';
import { cloneDeep } from 'lodash';

// Components
import MessageBoxGroup from '../../../components/MessageBoxGroup';
import Breadcrumb from '../../../components/Breadcrumb';

const defaultMessages = {
  success: null,
  error: 'To search for and manage an Organization, type the Organization name in the Search box in the drop-down menu at the top and press Enter.',
  warning: null,
};

const defaultPathList = [
  { label: 'Settings', isLink: false },
  { label: 'Certificate management', isLink: false },
];

const CertificateManagementMSP = () => {
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />

      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />
      </div>
    </>
  );
};

export default CertificateManagementMSP;
