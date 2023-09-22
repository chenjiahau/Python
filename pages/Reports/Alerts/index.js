import reportsAlertsStyle from './reports-alerts.module.scss';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Breadcrumb from '../../../components/Breadcrumb';
import Tab from '../../../components/Tab';
import MessageBoxGroup from 'components/MessageBoxGroup';

// Sub pages
import NotProcessed from './not-processed.js';
import Processed from './processed.js';

const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};
const defaultPathList = [
  { label: 'c91c7b93c2', isLink: false },
  { label: 'df583ae7ba', isLink: false }
];

const Alerts = () => {
  // let [searchParams] = useSearchParams();
  // const defaultTab = searchParams.get('tab');

  const defaultTabList = [
    { id: 1, breadCrumbLabel: 'not-processed', label: 'NOT PROCESSED', value: 'not-processed', isActive: true },
    { id: 2, breadCrumbLabel: 'processed', label: 'PROCESSED', value: 'processed', isActive: false }
  ];
  const [tabList, setTabList] = useState([...defaultTabList]);
  const [messages, setMessages] = useState({ ...defaultMessages });

  const changeTab = selectedTab => {
    const newTabList = [...tabList];
    const index = newTabList.findIndex(tab => tab.id === selectedTab.id);
    newTabList.map(tab => tab.isActive = false);
    newTabList[index].isActive = true;
    setTabList(newTabList);
  }

  return (
    <>
      <div className="layout-container layout-container--column layout-container--fluid">
        <Breadcrumb pathList={defaultPathList} />
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
        <Tab tabList={tabList} changeTab={changeTab} />
        {tabList[0].isActive && <NotProcessed />}
        {tabList[1].isActive && <Processed />}
      </div>
    </>
  )
}

export default Alerts;