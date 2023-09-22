import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import PortStatus from './components/PortStatus';
import PortConfiguration from './components/PortConfiguration';
import InterfaceConfiguration from './components/InterfaceConfiguration';
import DefaultWanConfiguration from './components/DefaultWan';
import WanModeConfiguration from './components/WanModelConfiguration';
import DynamicDns from './components/DynamicDns';
import IpAliasing from './components/IpAliasing';

// Context
import { ConfigContext } from '../../../../Context';
import { ethernetAction, EthernetContext } from './Context';

// Dummy 
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';

const defaultFuncList = [
  { id: 1, label: 'PORT STATUS', value: 'portStatus', isShow: false },
  { id: 2, label: 'PORT CONFIGURATION', value: 'portConfiguration', isShow: false },
  { id: 3, label: 'INTERFACE CONFIGURATION', value: 'interfaceConfiguration', isShow: false },
  { id: 4, label: 'DEFAULT WAN', value: 'defaultWan', isShow: false },
  { id: 5, label: 'WAN MODE CONFIGURATION', value: 'wanModeConfiguration', isShow: false },
  { id: 6, label: 'DYNAMIC DNS', value: 'dynamicDns', isShow: false },
  { id: 7, label: 'IP ALIASING', value: 'ipAliasing', isShow: false },
];

const Ethernet = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: ethernetDispatch } = useContext(EthernetContext);

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

    thirdLevelFeature.portStatus && (updatedFuncList[0].isShow = true);
    thirdLevelFeature.portConfiguration && (updatedFuncList[1].isShow = true);
    thirdLevelFeature.interfaceConfiguration && (updatedFuncList[2].isShow = true);
    thirdLevelFeature.defaultWan && (updatedFuncList[3].isShow = true);
    thirdLevelFeature.wanModeConfiguration && (updatedFuncList[4].isShow = true);
    thirdLevelFeature.dynamicDns && (updatedFuncList[5].isShow = true);
    thirdLevelFeature.ipAliasing && (updatedFuncList[6].isShow = true);

    if (updatedFuncList[1].isShow) {
      ethernetDispatch({
        type: ethernetAction.setPorts,
        payload: new GatewayData(path, modelName).generatePortConfiguration()
      });
    }

    if (updatedFuncList[2].isShow) {
      ethernetDispatch({
        type: ethernetAction.setInterfaces,
        payload: new GatewayData(path, modelName).generateInterfaceConfiguration()
      });
    }

    if (updatedFuncList[3].isShow) {
      ethernetDispatch({
        type: ethernetAction.setDefaultWan,
        payload: new GatewayData(path, modelName).generateDefaultWan()
      });
    }

    if (updatedFuncList[4].isShow) {
      ethernetDispatch({
        type: ethernetAction.setWanMode,
        payload: new GatewayData(path, modelName).generateWanMode()
      });
    }

    if (updatedFuncList[5].isShow) {
      ethernetDispatch({
        type: ethernetAction.setDynamicDns,
        payload: new GatewayData(path, modelName).generateDynamicDns()
      });
    }

    setFuncList(updatedFuncList);

  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <PortStatus />}
      {funcList[1].isShow && <PortConfiguration />}
      {funcList[2].isShow && <InterfaceConfiguration />}
      {funcList[3].isShow && <DefaultWanConfiguration />}
      {funcList[4].isShow && <WanModeConfiguration />}
      {funcList[5].isShow && <DynamicDns />}
      {funcList[6].isShow && <IpAliasing />}
      <div className='clear-both'></div>
    </>
  )
}

export default Ethernet;