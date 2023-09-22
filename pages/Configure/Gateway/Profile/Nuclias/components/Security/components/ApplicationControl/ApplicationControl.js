import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import AutoUpgrade from './components/AutoUpgrade';
import CustomGroupList from './components/CustomGroupList';
import ApplicationControlList from './components/ApplicationControlList';

// Context
import { ConfigContext } from '../../../../Context';
import { appCtrlAction, AppCtrlContext } from './Context';

// Dummy 
import { getSchedulePolicyList } from 'dummy/data/schedule-policy';
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';

const defaultFuncList = [
  { id: 1, label: 'AUTO UPGRADE', value: 'autoUpgrade', isShow: false },
  { id: 2, label: 'APPLICATION CONTROL LIST', value: 'applicationControlList', isShow: false },
  { id: 3, label: 'CUSTOM GROUP LIST', value: 'customGroupList', isShow: false },
];

const ApplicationControl = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: appCtrlDispatch } = useContext(AppCtrlContext);

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

    appCtrlDispatch({
      type: appCtrlAction.setInterface,
      payload: new GatewayData()
        .generateNetworkInterfaces(
          modelName,
          {
            vlan: true,
          }
        )
    });

    appCtrlDispatch({ type: appCtrlAction.setSchedule, payload: getSchedulePolicyList() });

    appCtrlDispatch({
      type: appCtrlAction.setAppCtrl,
      payload: new GatewayData(path, modelName).generateAppCtrl(),
    });

    thirdLevelFeature.autoUpgrade && (updatedFuncList[0].isShow = true);
    thirdLevelFeature.applicationControlList && (updatedFuncList[1].isShow = true);
    thirdLevelFeature.appCtrlCustomGroupList && (updatedFuncList[2].isShow = true);

    if (updatedFuncList[0].isShow) {
      appCtrlDispatch({
        type: appCtrlAction.setAutoUpgrade,
        payload: new GatewayData(path, modelName).generateAutoUpgrade(),
      });
    }

    if (updatedFuncList[1].isShow) {
      appCtrlDispatch({
        type: appCtrlAction.setAppCtrlList,
        payload: new GatewayData(path, modelName).generateApplicationControlList(),
      });
    }

    if (updatedFuncList[2].isShow) {
      appCtrlDispatch({
        type: appCtrlAction.setCustomGroupList,
        payload: new GatewayData(path, modelName).generateAppCtrlCustomGroupList(),
      });
    }

    setFuncList(updatedFuncList);
  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <AutoUpgrade />}
      {funcList[1].isShow && <ApplicationControlList />}
      {funcList[2].isShow && <CustomGroupList />}
      <div className='clear-both'></div>
    </>
  )
}

export default ApplicationControl;