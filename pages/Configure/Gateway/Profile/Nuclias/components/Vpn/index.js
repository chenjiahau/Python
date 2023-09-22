import mainStyle from '../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { TabSubTab, RadioButton } from 'components/';

import SiteToSiteVpn from './components/SiteToSiteVpn';
import ClientToSiteVpn from './components/ClientToSiteVpn';
import PptpL2tp from './components/PptpL2tp';
import OpenVpn from './components/OpenVpn';
import GreTunnel from './components/GreTunnel';

// Context
import { configAction, ConfigContext } from '../../Context';

// Dummy
import gwFeature from 'dummy/data/gateway/feature';

const defaultTabList = [
  { id: 1, label: 'SITE TO SITE VPN', value: 'siteToSiteVpn', isShow: false, isActive: false },
  { id: 2, label: 'CLIENT TO SITE VPN', value: 'clientToSiteVpn', isShow: false, isActive: false },
  { id: 3, label: 'PPTP L2TP', value: 'pptpL2tp', isShow: false, isActive: false },
  { id: 4, label: 'OPEN VPN', value: 'openVpn', isShow: false, isActive: false },
  { id: 5, label: 'GRE TUNNEL', value: 'greTunnel', isShow: false, isActive: false },
];

const Vpn = () => {
  const { state, dispatch } = useContext(ConfigContext);

  // State
  const [tabList, setTabList] = useState([]);

  // Method
  const changeTab = selectedTab => {
    const newTabList = cloneDeep(tabList);
    const index = newTabList.findIndex(tab => tab.id === selectedTab.id);

    newTabList.map(tab => tab.isActive = false);
    newTabList[index].isActive = true;
    setTabList(newTabList);
  }

  const changeMode = (state) => {
    dispatch({
      type: configAction.setUseProfileConfig,
      payload: state
    });
  }

  // Side effect
  useEffect(() => {
    const updatedTabList = cloneDeep(defaultTabList);
    let instancedModel = null;
    let secondaryLevelFeature = null;

    if (state.profile) {
      instancedModel = gwFeature.getProfileModelInstance(state.profile.modelName);
      secondaryLevelFeature = instancedModel.getSecondaryLevelFeature(gwFeature.configPath.profile);
    } else {
      instancedModel = gwFeature.getDeviceModelInstance(state.device.modelName);
      secondaryLevelFeature = instancedModel.getSecondaryLevelFeature(gwFeature.configPath.device);
    }

    secondaryLevelFeature.siteToSiteVpn && (updatedTabList[0].isShow = true);
    secondaryLevelFeature.clientToSiteVpn && (updatedTabList[1].isShow = true);
    secondaryLevelFeature.pptpL2tp && (updatedTabList[2].isShow = true);
    secondaryLevelFeature.openVpn && (updatedTabList[3].isShow = true);
    secondaryLevelFeature.greTunnel && (updatedTabList[4].isShow = true);

    updatedTabList[0].isActive = true;
    setTabList(updatedTabList);
  }, []);

  if (tabList.length === 0) {
    return;
  }

  return (
    <>
      <div className='layout-container layout-container--column layout-container--fluid'>

        <TabSubTab tabList={tabList.filter(tab => tab.isShow)} changeTab={changeTab} />

        {tabList[0].isShow && tabList[0].isActive && <SiteToSiteVpn />}
        {tabList[1].isShow && tabList[1].isActive && <ClientToSiteVpn />}
        {tabList[2].isShow && tabList[2].isActive && <PptpL2tp />}
        {tabList[3].isShow && tabList[3].isActive && <OpenVpn />}
        {tabList[4].isShow && tabList[4].isActive && <GreTunnel />}
      </div>
    </>
  )
}

export default Vpn;