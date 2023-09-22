import { useState } from 'react';
import { cloneDeep } from 'lodash';

import CertificatesAndKeys from './CertificatesAndKeys';
import CertificatesAuthorities from './CertificatesAuthorities';
import LocalUserCertificates from './LocalUserCertificates';

// Components
import Breadcrumb from '../../../components/Breadcrumb';
import MessageBoxGroup from '../../../components/MessageBoxGroup';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
}

const defaultPathList = [
  { label: 'Settings', isLink: false },
  { label: 'Certificate management', isLink: false },
];

const CertificateManagement = () => {
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />
      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />

        <CertificatesAndKeys />

        <CertificatesAuthorities />

        <LocalUserCertificates />
      </div>
    </>
  );
};

export default CertificateManagement;
