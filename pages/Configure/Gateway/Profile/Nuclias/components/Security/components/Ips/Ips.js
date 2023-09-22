import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import Ips from './components/Ips';
import AttackChecks from './components/AttackChecks';

// Context
import { ConfigContext } from '../../../../Context';
import { ipsAction, IpsContext } from './Context';

// Dummy 
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';

const defaultFuncList = [
  { id: 1, label: 'IPS', value: 'ips', isShow: false },
  { id: 2, label: 'ATTACK CHECKS', value: 'attackChecks', isShow: false },
];

const Addressing = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: ipsDispatch } = useContext(IpsContext);

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

    ipsDispatch({
      type: ipsAction.setVlans,
      payload: new GatewayData()
        .generateNetworkInterfaces(
          modelName,
          {
            vlan: true,
          }
        )
    });

    thirdLevelFeature.ips && (updatedFuncList[0].isShow = true);
    thirdLevelFeature.attackChecks && (updatedFuncList[1].isShow = true);

    if (updatedFuncList[0].isShow) {
      ipsDispatch({
        type: ipsAction.setIps,
        payload: new GatewayData(path, modelName).generateIps()
      });
    }

    if (updatedFuncList[1].isShow) {
      ipsDispatch({
        type: ipsAction.setAttackChecks,
        payload: new GatewayData(path, modelName).generateAttackChecks()
      });
    }

    setFuncList(updatedFuncList);
  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <Ips />}
      {funcList[1].isShow && <AttackChecks />}
      <div className='clear-both'></div>
    </>
  )
}

export default Addressing;