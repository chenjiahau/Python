import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import Ipv4TrafficShaping from './components/Ipv4TrafficShaping';
import Ipv6TrafficShaping from './components/Ipv6TrafficShaping';
import Ipv4SessionLimiting from './components/Ipv4SessionLimiting';
import Ipv6SessionLimiting from './components/Ipv6SessionLimiting';

// Context
import { ConfigContext } from '../../../../Context';
import { trafficManagementAction, TrafficManagementContext } from './Context';

// Dummy 
import { getSchedulePolicyList } from 'dummy/data/schedule-policy';
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';

const defaultFuncList = [
  { id: 1, label: 'IPV4 TRAFFIC SHAPING', value: 'ipv4TrafficShaping', isShow: false },
  { id: 2, label: 'IPV6 TRAFFIC SHAPING', value: 'ipv6TrafficShaping', isShow: false },
  { id: 3, label: 'IPV4 SESSION LIMITING', value: 'ipv4SessionLimiting', isShow: false },
  { id: 4, label: 'IPV6 SESSION LIMITING', value: 'ipv6SessionLimiting', isShow: false },
];

const TrafficManagement = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: trafficManagementDispatch } = useContext(TrafficManagementContext);

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

    trafficManagementDispatch({
      type: trafficManagementAction.setSchedulePolicy,
      payload: getSchedulePolicyList()
    });

    const interfaceList = new GatewayData().generateNetworkInterfaces(
      modelName,
      { wan: true, pppoe: true, dslite: true, mape: true, vlan: true, }
    )

    trafficManagementDispatch({
      type: trafficManagementAction.setWan,
      payload: interfaceList.filter(iface => iface.type !== 'vlan')
    });

    trafficManagementDispatch({
      type: trafficManagementAction.setVlan,
      payload: interfaceList.filter(iface => iface.type === 'vlan')
    });

    thirdLevelFeature.ipv4TrafficShaping && (updatedFuncList[0].isShow = true);
    thirdLevelFeature.ipv6TrafficShaping && (updatedFuncList[1].isShow = true);
    thirdLevelFeature.ipv4SessionLimiting && (updatedFuncList[2].isShow = true);
    thirdLevelFeature.ipv6SessionLimiting && (updatedFuncList[3].isShow = true);

    if (updatedFuncList[0].isShow) {
      trafficManagementDispatch({
        type: trafficManagementAction.setIpv4TrafficShaping,
        payload: new GatewayData(path, modelName).generateIpv4TrafficShaping()
      });
    }

    if (updatedFuncList[1].isShow) {
      trafficManagementDispatch({
        type: trafficManagementAction.setIpv6TrafficShaping,
        payload: new GatewayData(path, modelName).generateIpv6TrafficShaping()
      });
    }

    if (updatedFuncList[2].isShow) {
      trafficManagementDispatch({
        type: trafficManagementAction.setIpv4SessionLimiting,
        payload: new GatewayData(path, modelName).generateIpv4SessionLimiting()
      });
    }

    if (updatedFuncList[3].isShow) {
      trafficManagementDispatch({
        type: trafficManagementAction.setIpv6SessionLimiting,
        payload: new GatewayData(path, modelName).generateIpv6SessionLimiting()
      });
    }

    setFuncList(updatedFuncList);
  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <Ipv4TrafficShaping />}
      {funcList[1].isShow && <Ipv6TrafficShaping />}
      {funcList[2].isShow && <Ipv4SessionLimiting />}
      {funcList[3].isShow && <Ipv6SessionLimiting />}
      <div className='clear-both'></div>
    </>
  )
}

export default TrafficManagement;