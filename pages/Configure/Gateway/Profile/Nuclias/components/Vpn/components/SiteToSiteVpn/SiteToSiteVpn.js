import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import QuickVpn from './components/QuickVpn';
import QuickVpnSettings from './components/QuickVpnSettings';
import ManualVpnConfiguration from './components/ManualVpnConfiguration';
import IkeProfiles from './components/IkeProfiles';

// Context
import { ConfigContext } from '../../../../Context';
import { siteToSiteVpnAction, SiteToSiteVpnContext } from './Context';

// Dummy
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';

const defaultFuncList = [
  { id: 1, label: 'QUICK VPN', value: 'quickVpn', isShow: false },
  { id: 2, label: 'QUICK VPN SETTINGS', value: 'quickVpnSettings', isShow: false },
  { id: 3, label: 'MANUAL VPN CONFIGURATION', value: 'manualVpnConfiguration', isShow: false },
  { id: 4, label: 'IKE PROFILES', value: 'ikeProfiles', isShow: false },
];

const SiteToSiteVpn = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: siteToSiteVpnDispatch } = useContext(SiteToSiteVpnContext);

  // State
  const [funcList, setFuncList] = useState([]);

  // Method

  // Side effect
  useEffect(() => {
    const updatedFuncList = cloneDeep(defaultFuncList);

    let instancedModel = null;
    let thirdLevelFeature = null;
    let path = null;
    let modelName = null;

    if (state.profile) {
      path = gwFeature.configPath.profile;
      modelName = state.profile.modelName;
      instancedModel = gwFeature.getProfileModelInstance(modelName);
      thirdLevelFeature = instancedModel.getThirdLevelFeature(path);
    } else {
      path = gwFeature.configPath.device;
      modelName = state.device.modelName;
      instancedModel = gwFeature.getDeviceModelInstance(modelName);
      thirdLevelFeature = instancedModel.getThirdLevelFeature(path);
    }

    siteToSiteVpnDispatch({
      type: siteToSiteVpnAction.setSelectedDeviceModelName,
      payload: modelName
    });

    thirdLevelFeature.quickVpn && (updatedFuncList[0].isShow = true);
    thirdLevelFeature.quickVpnSettings && (updatedFuncList[1].isShow = true);
    thirdLevelFeature.manualVpnConfiguration && (updatedFuncList[2].isShow = true);
    thirdLevelFeature.ikeProfiles && (updatedFuncList[3].isShow = true);

    if (updatedFuncList[0].isShow) {
      siteToSiteVpnDispatch({
        type: siteToSiteVpnAction.setQuickVpn,
        payload: new GatewayData(path, modelName).generateQuickVpn()
      });
    }

    if (updatedFuncList[1].isShow) {
      siteToSiteVpnDispatch({
        type: siteToSiteVpnAction.setQuickVpnSettings,
        payload: new GatewayData(path, modelName).generateQuickVpnSettings()
      });
    }

    if (updatedFuncList[2].isShow) {
      siteToSiteVpnDispatch({
        type: siteToSiteVpnAction.setManualVpnConfiguration,
        payload: new GatewayData(path, modelName).generateManualVpnConfiguration()
      });
    }

    if (updatedFuncList[3].isShow) {
      siteToSiteVpnDispatch({
        type: siteToSiteVpnAction.setIkeProfiles,
        payload: new GatewayData(path, modelName).generateSiteIkeProfiles()
      });
    }

    setFuncList(updatedFuncList);

  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <QuickVpn />}
      {funcList[1].isShow && <QuickVpnSettings />}
      {funcList[2].isShow && <ManualVpnConfiguration />}
      {funcList[3].isShow && <IkeProfiles />}

      <div className='clear-both'></div>
    </>
  )
}

export default SiteToSiteVpn;