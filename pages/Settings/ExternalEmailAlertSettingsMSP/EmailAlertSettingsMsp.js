import mainStyle from './external-email-alert-settings.module.scss';

import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

// Components
import { MessageBoxGroup } from 'components';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const EmailAlertSettingsMsp = () => {
  const { t } = useTranslation();
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));

  useEffect(() => {
    // To search for and manage an Organization, type the Organization name in the Search box in the drop-down menu at the top and press Enter.
    setMultiMessages({...multiMessages, error: t('ce49aa6ef6')});
  }, [])

  return (
    <div className="layout-container layout-container--column layout-container--fluid">
      <MessageBoxGroup
        messages={multiMessages}
        onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
      />
    </div>
  );
};

export default EmailAlertSettingsMsp;
