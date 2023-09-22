import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import Ssid from './components/Ssid';
import Radio from './components/Radio';

// Context
import { ConfigContext } from '../../../../Context';
import { wirelessAction, WirelessContext } from './Context';

// Dummy 
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';

const defaultFuncList = [
  { id: 1, label: 'SSID', value: 'ssid', isShow: false },
  { id: 2, label: 'RADIO', value: 'radio', isShow: false },
];

const Wireless = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: wirelessDispatch } = useContext(WirelessContext);

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

    thirdLevelFeature.ssid && (updatedFuncList[0].isShow = true);
    thirdLevelFeature.radio && (updatedFuncList[1].isShow = true);

    if (updatedFuncList[0].isShow) {
      wirelessDispatch({
        type: wirelessAction.setSsids,
        payload: new GatewayData(path, modelName).generateSSid()
      });
    }

    if (updatedFuncList[1].isShow) {
      wirelessDispatch({
        type: wirelessAction.setRadio,
        payload: new GatewayData(path, modelName).generateRadio()
      });
    }

    setFuncList(updatedFuncList);
  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <Ssid />}
      {funcList[1].isShow && <Radio />}
    </>
  )
}

export default Wireless;