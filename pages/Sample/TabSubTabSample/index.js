import { useState, useCallback } from "react";
import TabSubTab from "components/TabSubTab";

const defaultTabList = [
  { id: 1, label: 'my profile', isActive: true },
  { id: 2, label: 'recent logins', isActive: false },
  { id: 3, label: 'api access', isActive: false },
];

const TabSubTabSample = () => {
  const [tabList, setTabList] = useState([...defaultTabList]);
  const changeTab = useCallback(selectedTab => {
    const newTabList = [...tabList];
    const index = newTabList.findIndex(tab => tab.id === selectedTab.id);

    newTabList.map(tab => (tab.isActive = false));
    newTabList[index].isActive = true;
    setTabList(newTabList);
  }, []);

  const makeTabContent = useCallback(() => {
    if (tabList[0].isActive) {
      return <div className="layout-container layout-container--column layout-container--fluid tab-container-border">myProfileContent</div>;
    } else if (tabList[1].isActive) {
      return <div className="layout-container layout-container--column layout-container--fluid tab-container-border">recentLoginsContent</div>;
    } else {
      return <div className="layout-container layout-container--column layout-container--fluid tab-container-border">apiAccessContent </div>;
    }
  }, []);

  return (
    <div className="mb-5">
      <h3 className="mb-3">TabSubTab</h3>
      <TabSubTab tabList={tabList} changeTab={changeTab} />
        {makeTabContent()}
    </div>
  )
};

export default TabSubTabSample;
