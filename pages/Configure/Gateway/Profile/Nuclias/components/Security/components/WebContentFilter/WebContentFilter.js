import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import WebContentFilterList from './components/WebContentFilterList';
import CustomWarningPage from './components/CustomWarningPage';
import CustomGroupList from './components/CustomGroupList';

// Context
import { ConfigContext } from '../../../../Context';
import { wcfAction, WcfContext } from './Context';

// Dummy 
import { getSchedulePolicyList } from 'dummy/data/schedule-policy';
import { getSplashPageList } from 'dummy/data/splash-page';
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';

const defaultFuncList = [
  { id: 1, label: 'WEB CONTENT FILTER LIST', value: 'wcfList', isShow: false },
  { id: 2, label: 'CUSTOM WARNING PAGE', value: 'customWarningPage', isShow: false },
  { id: 3, label: 'CUSTOM GROUP LIST', value: 'customGroupList', isShow: false },
];

const WebContentFilter = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: wcfDispatch } = useContext(WcfContext);

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

    wcfDispatch({
      type: wcfAction.setInterface,
      payload: new GatewayData()
        .generateNetworkInterfaces(
          modelName,
          {
            vlan: true,
          }
        )
    });
    wcfDispatch({ type: wcfAction.setSplashPage, payload: getSplashPageList() });
    wcfDispatch({ type: wcfAction.setSchedule, payload: getSchedulePolicyList() });
    wcfDispatch({ type: wcfAction.setWcfCategory, payload: new GatewayData().generateWcfCategory() });

    thirdLevelFeature.webContentFilterList && (updatedFuncList[0].isShow = true);
    thirdLevelFeature.customWarningPage && (updatedFuncList[1].isShow = true);
    thirdLevelFeature.wcfCustomGroupList && (updatedFuncList[2].isShow = true);

    if (updatedFuncList[0].isShow) {
      wcfDispatch({
        type: wcfAction.setWebContentFilterList,
        payload: new GatewayData(path, modelName).generateWebContentFilterList()
      });
    }

    if (updatedFuncList[1].isShow) {
      wcfDispatch({
        type: wcfAction.setCustomWarningPage,
        payload: new GatewayData(path, modelName).generateCustomWarningPage()
      });
    }

    if (updatedFuncList[2].isShow) {
      wcfDispatch({
        type: wcfAction.setCustomGroupList,
        payload: new GatewayData(path, modelName).generateCustomGroupList()
      });
    }

    setFuncList(updatedFuncList);
  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <WebContentFilterList />}
      {funcList[1].isShow && <CustomWarningPage />}
      {funcList[2].isShow && <CustomGroupList />}
      <div className='clear-both'></div>
    </>
  )
}

export default WebContentFilter;