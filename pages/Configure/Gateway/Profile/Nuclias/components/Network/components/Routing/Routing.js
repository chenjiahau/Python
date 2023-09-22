import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import Ipv4StaticRoute from './components/Ipv4StaticRoute';
import Ipv6StaticRoute from './components/Ipv6StaticRoute';
import Ipv4PolicyRoute from './components/Ipv4PolicyRoute';
import Ipv6PolicyRoute from './components/Ipv6PolicyRoute';
import RipConfiguration from './components/RipConfiguration';
import Ospfv2Configuration from './components/Ospfv2Configuration';

// Context
import { ConfigContext } from '../../../../Context';
import { routingAction, RoutingContext } from './Context';

// Dummy 
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';

const defaultFuncList = [
  { id: 1, label: 'IPV4 STATIC ROUTE', value: 'ipv4StaticRoute', isShow: false },
  { id: 2, label: 'IPV6 STATIC ROUTE', value: 'ipv6StaticRoute', isShow: false },
  { id: 3, label: 'IPV4 POLICY ROUTE', value: 'ipv4PolicyRoute', isShow: false },
  { id: 4, label: 'IPV6 POLICY ROUTE', value: 'ipv6PolicyRoute', isShow: false },
  { id: 5, label: 'RIP CONFIGURATION', value: 'ripConfiguration', isShow: false },
  { id: 6, label: 'OSPFV2 CONFIGURATION', value: 'ospfv2Configuration', isShow: false },
];

const Addressing = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: routingDispatch } = useContext(RoutingContext);

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

    routingDispatch({
      type: routingAction.setInterface,
      payload: new GatewayData()
        .generateNetworkInterfaces(
          modelName,
          {
            wan: true,
            pppoe: true,
            dslite: true,
            mape: true,
            vlan: true,
          }
        )
    });

    thirdLevelFeature.ipv4StaticRoute && (updatedFuncList[0].isShow = true);
    thirdLevelFeature.ipv6StaticRoute && (updatedFuncList[1].isShow = true);
    thirdLevelFeature.ipv4PolicyRoute && (updatedFuncList[2].isShow = true);
    thirdLevelFeature.ipv6PolicyRoute && (updatedFuncList[3].isShow = true);
    thirdLevelFeature.ripConfiguration && (updatedFuncList[4].isShow = true);
    thirdLevelFeature.ospfv2Configuration && (updatedFuncList[5].isShow = true);

    if (updatedFuncList[0].isShow) {
      routingDispatch({
        type: routingAction.setIpv4StaticRoute,
        payload: new GatewayData(path, modelName).generateIpv4StaticRoute()
      });
    }

    if (updatedFuncList[1].isShow) {
      routingDispatch({
        type: routingAction.setIpv6StaticRoute,
        payload: new GatewayData(path, modelName).generateIpv6StaticRoute()
      });
    }

    if (updatedFuncList[2].isShow) {
      routingDispatch({
        type: routingAction.setIpv4PolicyRoute,
        payload: new GatewayData(path, modelName).generateIpv4PolicyRoute()
      });
    }

    if (updatedFuncList[3].isShow) {
      routingDispatch({
        type: routingAction.setIpv6PolicyRoute,
        payload: new GatewayData(path, modelName).generateIpv6PolicyRoute()
      });
    }

    if (updatedFuncList[4].isShow) {
      routingDispatch({
        type: routingAction.setRipConfiguration,
        payload: new GatewayData(path, modelName).generateRipConfiguration()
      });
    }

    if (updatedFuncList[5].isShow) {
      routingDispatch({
        type: routingAction.setOspfv2Configuration,
        payload: new GatewayData(path, modelName).generateOspfv2Configuration()
      });
    }

    setFuncList(updatedFuncList);
  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <Ipv4StaticRoute />}
      {funcList[1].isShow && <Ipv6StaticRoute />}
      {funcList[2].isShow && <Ipv4PolicyRoute />}
      {funcList[3].isShow && <Ipv6PolicyRoute />}
      {funcList[4].isShow && <RipConfiguration />}
      {funcList[5].isShow && <Ospfv2Configuration />}
      <div className='clear-both'></div>
    </>
  )
}

export default Addressing;