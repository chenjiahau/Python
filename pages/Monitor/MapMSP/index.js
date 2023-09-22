// Package
import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

// Component
import Breadcrumb from '../../../components/Breadcrumb';
import MessageBoxGroup from 'components/MessageBoxGroup';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultPathList = [
  { label: '6ba872551f', isLink: false },
  { label: '46f3ea056c', isLink: false },
];

const MapMSP = () => {
  const { t } = useTranslation();
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));

  useEffect(() => {
    // To search for and manage an Organization...
    setMultiMessages({ ...defaultMessages, error: t('ce49aa6ef6') })
  }, [])

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

export default MapMSP;
