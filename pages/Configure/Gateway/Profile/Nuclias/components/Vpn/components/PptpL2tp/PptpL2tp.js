import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import ServerMode from './components/ServerMode';
import ClientMode from './components/ClientMode';

// Context
import { ConfigContext } from '../../../../Context';
import { pptpL2tpAction, PptpL2tpContext } from './Context';

// Dummy
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';

const defaultFuncList = [
  { id: 1, label: 'SERVER MODE', value: 'serverMode', isShow: false },
  { id: 2, label: 'CLIENT MODE', value: 'clientMode', isShow: false },
];

const PptpL2tp = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: pptpL2tpDispatch } = useContext(PptpL2tpContext);

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

    pptpL2tpDispatch({
      type: pptpL2tpAction.setSelectedDeviceModelName,
      payload: modelName
    });

    thirdLevelFeature.serverMode && (updatedFuncList[0].isShow = true);
    thirdLevelFeature.clientMode && (updatedFuncList[1].isShow = true);

    if (updatedFuncList[0].isShow) {
      pptpL2tpDispatch({
        type: pptpL2tpAction.setServerMode,
        payload: new GatewayData(path, modelName).generatePptpL2tpServerMode()
      });
    }

    if (updatedFuncList[1].isShow) {
      pptpL2tpDispatch({
        type: pptpL2tpAction.setClientMode,
        payload: new GatewayData(path, modelName).generatePptpL2tpClientMode()
      });
    }

    setFuncList(updatedFuncList);

  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <ServerMode />}
      {funcList[1].isShow && <ClientMode />}

      <div className='clear-both'></div>
    </>
  )
}

export default PptpL2tp;