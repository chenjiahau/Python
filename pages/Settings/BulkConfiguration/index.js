import mainStyle from './bulk-import-devices.module.scss';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cloneDeep } from 'lodash';

// Components
import MessageBoxGroup from 'components/MessageBoxGroup';
import Breadcrumb from 'components/Breadcrumb';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultPathList = [
  { label: '6525f0afe7', isLink: false }, // Settings
  { label: 'ada806c830', isLink: false }, // Bulk configuration
  { label: '', isLink: false }
];

const BulkConfiguration = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [newPathList, setPathList] = useState(cloneDeep(defaultPathList));
  const isGWBulkType = useLocation().pathname.includes('/bulk-configuration-gw');

  const initMessage = () => {
    const tmpMessages = { ...messages, error: t('320e2b856d') }; // Please change the access level to the MSP level...
    setMessages(tmpMessages);
  }

  const initBreadcrumbByUrl = () => {
    const tmpPathList = [...defaultPathList];
    tmpPathList[tmpPathList.length - 1].label = isGWBulkType ? '926dec9494' : '93f3450afb'; // Gateway or Access Point
    setPathList(tmpPathList);
  }

  useEffect(() => {
    initMessage();
  }, [])

  useEffect(() => {
    initBreadcrumbByUrl();
  }, [isGWBulkType])

  return (
    <>
      <Breadcrumb pathList={newPathList} />

      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          {...{ messages }}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
      </div>
    </>
  );
};

export default BulkConfiguration;
