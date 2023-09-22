import mainStyle from './summary.module.scss';
import { useState, useEffect, useContext } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';
// Component
import { TabSubTab } from 'components/';
import Status from './components/Status';
import Statistics from './components/Statistics';
import DHCP from './components/DHCP';
import VPNStatus from './components/VPNStatus';
// Dummy
import { modelName, generateDevice } from 'dummy/data/device';

const defaultTabList = [
  { id: 1, label: 'STATUS', value: 'status', isShow: true, isActive: false },
  { id: 2, label: 'STATISTICS', value: 'statictics', isShow: true, isActive: false },
  { id: 3, label: 'DHCP', value: 'dhcp', isShow: true, isActive: false },
  { id: 4, label: 'VPN STATUS', value: 'vpnstatus', isShow: true, isActive: false },
];

const Summary = () => {

  let [searchParams, setSearchParams] = useSearchParams();
  const { id: deviceId } = useParams();
  // Fake API data
  let i = +searchParams.get('i') || 0;
  const fakeDevices = [
    {
      isActive: false, iconClass: 'icon-round online',
      ...generateDevice('GATEWAY', modelName['GATEWAY'][0], '76:15:03:9A:CE:8E', 'Online', 'DBG-2000-1')
    },
    {
      isActive: false, iconClass: 'icon-round online',
      ...generateDevice('GATEWAY', modelName['GATEWAY'][1].split('/')[0], '4D:58:E2:88:1D:41', 'Online', 'DBG-X1000-1')
    },
    {
      isActive: false, iconClass: 'icon-round online',
      ...generateDevice('GATEWAY', modelName['GATEWAY'][1].split('/')[1], '57:66:9F:E8:42:07', 'Online', 'DBG-2000-B1-1')
    },
    {
      isActive: false, iconClass: 'icon-round offline',
      ...generateDevice('GATEWAY', modelName['GATEWAY'][1].split('/')[1], '1D:D7:6C:78:B2:03', 'Offline', 'DBG-2000-B1-2')
    },
    {
      isActive: false, iconClass: 'icon-round dormant',
      ...generateDevice('GATEWAY', modelName['GATEWAY'][2], '4A:31:DD:13:BC:3E', 'Dormant', 'DBG-X800-1')
    },
  ];

  // State
  const [device, setDevice] = useState([]);
  const [tabList, setTabList] = useState([]);
  const changeTab = selectedTab => {
    const newTabList = cloneDeep(tabList);
    const index = newTabList.findIndex(tab => tab.id === selectedTab.id);

    newTabList.map(tab => tab.isActive = false);
    newTabList[index].isActive = true;
    setTabList(newTabList);
  }

  useEffect(() => {
    const fakeDevice = { ...fakeDevices[deviceId] };
    // fakeDevices[deviceId].isActive = true;
    setDevice(fakeDevice);
  
    const updatedTabList = cloneDeep(defaultTabList);
    updatedTabList[0].isActive = true;
    setTabList(updatedTabList);
  }, []);

  if (tabList.length === 0) {
    return;
  }

  return (
    <div>
      <div className='layout-container layout-container--column layout-container--fluid'>
        <TabSubTab tabList={tabList.filter(tab => tab.isShow)} changeTab={changeTab} />
        {tabList[0].isShow && tabList[0].isActive && <Status device={device}/>}
        {tabList[1].isShow && tabList[1].isActive && <Statistics device={device}/>}
        {tabList[2].isShow && tabList[2].isActive && <DHCP device={device}/>}
        {tabList[3].isShow && tabList[3].isActive && <VPNStatus device={device}/>}
      </div>
    </div>
  )
}

export default Summary;