import { useState, useCallback } from "react";
import Tab from "components/Tab";

const defaultTabList = [
  { id: 1, label: 'my profile', isActive: true },
  { id: 2, label: 'recent logins', isActive: false },
  { id: 3, label: 'api access', isActive: false },
];

const TabSample = () => {
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
      return <div>myProfileContent</div>;
    } else if (tabList[1].isActive) {
      return <div>recentLoginsContent</div>;
    } else {
      return <div>apiAccessContent </div>;
    }
  }, []);

  return (
    <div className="mb-5">
      <h3>Tab</h3>
      <Tab tabList={tabList} changeTab={changeTab} />
      {makeTabContent()}
    </div>
  )
};

export default TabSample;
