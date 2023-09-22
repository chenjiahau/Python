import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import CaptivePortal from './components/CaptivePortal';

// Context
import { ConfigContext } from '../../../../Context';
import { captivePortalAction, CaptivePortalContext } from './Context';

// Dummy 
import { getSplashPageList } from 'dummy/data/splash-page';
import { getLocalDbList } from 'dummy/data/local-db';
import { getLdapList } from 'dummy/data/ldap';
import { getRadiusList } from 'dummy/data/radius';
import { getSmsList } from 'dummy/data/sms';
import { getWalledGardenList } from 'dummy/data/walled-garden';

import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';

const defaultFuncList = [
  { id: 1, label: 'CAPTIVE PORTAL', value: 'captivePortal', isShow: false },
];

const CP = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: captivePortalDispatch } = useContext(CaptivePortalContext);

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

    captivePortalDispatch({ type: captivePortalAction.setSplashPage, payload: getSplashPageList() });
    captivePortalDispatch({ type: captivePortalAction.setLocalDb, payload: getLocalDbList() });
    captivePortalDispatch({ type: captivePortalAction.setRadius, payload: getRadiusList() });
    captivePortalDispatch({ type: captivePortalAction.setLdap, payload: getLdapList() });
    captivePortalDispatch({ type: captivePortalAction.setSms, payload: getSmsList() });
    captivePortalDispatch({ type: captivePortalAction.setWalledGarden, payload: getWalledGardenList() });
    captivePortalDispatch({
      type: captivePortalAction.setSsidAndVlan,
      payload: new GatewayData()
        .generateNetworkInterfaces(
          modelName,
          {
            vlan: true,
            ssid: true,
          }
        )
    });

    thirdLevelFeature.captivePortal && (updatedFuncList[0].isShow = true);

    if (updatedFuncList[0].isShow) {
      captivePortalDispatch({
        type: captivePortalAction.setCp,
        payload: new GatewayData(path, modelName).generateCaptivePortal()
      });
    }

    setFuncList(updatedFuncList);
  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <CaptivePortal />}
      <div className='clear-both'></div>
    </>
  )
}

export default CP;