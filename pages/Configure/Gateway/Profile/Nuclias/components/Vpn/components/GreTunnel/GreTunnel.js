import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import GreTunnelConfiguration from './components/GreTunnelConfiguration';

// Context
import { ConfigContext } from '../../../../Context';
import { greTunnelAction, GreTunnelContext } from './Context';

// Dummy
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';

const defaultFuncList = [
  { id: 1, label: 'CONFIGURATION', value: 'greTunnelconfiguration', isShow: false },
];

const GreTunnel = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: greTunnelDispatch } = useContext(GreTunnelContext);

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

    greTunnelDispatch({
      type: greTunnelAction.setSelectedDeviceModelName,
      payload: modelName
    });

    thirdLevelFeature.greTunnelConfiguration && (updatedFuncList[0].isShow = true);

    if (updatedFuncList[0].isShow) {
      greTunnelDispatch({
        type: greTunnelAction.setGreTunnelConfiguration,
        payload: new GatewayData(path, modelName).generateGreTunnelConfiguration()
      });
    }

    setFuncList(updatedFuncList);

  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <GreTunnelConfiguration />}

      <div className='clear-both'></div>
    </>
  )
}

export default GreTunnel;