import mainStyle from './external-email-alert-settings.module.scss';

import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';

import { useSelector } from 'react-redux';

// Slice
import { selectUserLevel } from 'stores/slice/user';

// sub pages
import EmailAlertSettingsMsp from './EmailAlertSettingsMsp';
import EmailAlertSettingsMspOrg from './EmailAlertSettingsMspOrg';

// Components
import MessageBoxGroup from 'components/MessageBoxGroup';
import Breadcrumb from '../../../components/Breadcrumb';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultPathList = [
  { label: '6525f0afe7', isLink: false }, // Settings
  { label: '561a6e6b06', isLink: false } // External email alert settings
];

const ExternalEmailAlertSettingsMSP = () => {
  const [searchParams] = useSearchParams();
  const userLevel = useSelector(selectUserLevel) || localStorage.getItem('userLevel');
  const { t } = useTranslation();
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));

  useEffect(() => {
    // To search for and manage an Organization, type the Organization name in the Search box in the drop-down menu at the top and press Enter.
    setMultiMessages({ ...multiMessages, error: t('ce49aa6ef6') });
  }, [])

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />

      {userLevel === 'msp' && <EmailAlertSettingsMsp />}
      {userLevel === 'msp-org' && <EmailAlertSettingsMspOrg />}
    </>
  );
};

export default ExternalEmailAlertSettingsMSP;
