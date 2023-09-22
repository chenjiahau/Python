import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import Vlan from './components/Vlan';
import IpManagementList from './components/IpManagementList';

// Context
import { ConfigContext } from '../../../../Context';
import { addressingAction, AddressingContext } from './Context';

// Dummy 
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';

const defaultFuncList = [
  { id: 1, label: 'VLAN', value: 'vlan', isShow: false },
  { id: 2, label: 'IP MANAGEMENT LIST', value: 'ipManagementList', isShow: false },
];

const Addressing = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: addressingDispatch } = useContext(AddressingContext);

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

    thirdLevelFeature.vlan && (updatedFuncList[0].isShow = true);
    thirdLevelFeature.radio && (updatedFuncList[1].isShow = true);

    if (updatedFuncList[0].isShow) {
      addressingDispatch({
        type: addressingAction.setVlan,
        payload: new GatewayData(path, modelName).generateVlan()
      });
    }

    if (updatedFuncList[1].isShow) {
      addressingDispatch({
        type: addressingAction.setIpManagementList,
        payload: new GatewayData(path, modelName).generateIpManagementList()
      });
    }

    setFuncList(updatedFuncList);
  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <Vlan />}
      {funcList[1].isShow && <IpManagementList />}
      <div className='clear-both'></div>
    </>
  )
}

export default Addressing;