import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import Ipv4FirewallRules from './componetns/Ipv4FirewallRules';
import PortForwarding from './componetns/PortForwardinging';
import PortTriggering from './componetns/PortTriggering';
import OneCOneNat from './componetns/OneCOneNat';
import Ipv6FirewallRules from './componetns/Ipv6FirewallRules';

// Context
import { ConfigContext } from '../../../../Context';
import { firewallAction, FirewallContext } from './Context';

// Dummy 
import { getSchedulePolicyList } from 'dummy/data/schedule-policy';
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';

const defaultFuncList = [
  { id: 1, label: 'IPV4 FIREWALL', value: 'ipv4Firewall', isShow: false },
  { id: 2, label: 'PORT FORWARDING', value: 'portForward', isShow: false },
  { id: 3, label: 'PORT TRIGGERING', value: 'portTriggering', isShow: false },
  { id: 4, label: '1:1 NAT', value: 'oneCOneNat', isShow: false },
  { id: 5, label: 'IPV6 FIREWALL RULES', value: 'ipv6FirewallRules', isShow: false },
];

const CP = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: firewallDispatch } = useContext(FirewallContext);

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

    firewallDispatch({
      type: firewallAction.setSchedulePolicies,
      payload: getSchedulePolicyList()
    });

    firewallDispatch({
      type: firewallAction.setInterfaces,
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

    thirdLevelFeature.ipv4FirewallRules && (updatedFuncList[0].isShow = true);
    thirdLevelFeature.portForwarding && (updatedFuncList[1].isShow = true);
    thirdLevelFeature.oneCOneNat && (updatedFuncList[2].isShow = true);
    thirdLevelFeature.portTriggering && (updatedFuncList[3].isShow = true);
    thirdLevelFeature.ipv6FirewallRules && (updatedFuncList[4].isShow = true);

    if (updatedFuncList[0].isShow) {
      firewallDispatch({
        type: firewallAction.setIpv4FirewallRules,
        payload: new GatewayData(path, modelName).generateIpv4FirewallRules()
      });
    }

    if (updatedFuncList[1].isShow) {
      firewallDispatch({
        type: firewallAction.setPortForwarding,
        payload: new GatewayData(path, modelName).generatePortForwarding()
      });
    }

    if (updatedFuncList[2].isShow) {
      firewallDispatch({
        type: firewallAction.setPortTriggering,
        payload: new GatewayData(path, modelName).generatePortTriggering()
      });
    }

    if (updatedFuncList[3].isShow) {
      firewallDispatch({
        type: firewallAction.setOneCOneNat,
        payload: new GatewayData(path, modelName).generateOneCOneNat()
      });
    }

    if (updatedFuncList[4].isShow) {
      firewallDispatch({
        type: firewallAction.setIpv6FirewallRules,
        payload: new GatewayData(path, modelName).generateIpv6FirewallRules()
      });
    }

    setFuncList(updatedFuncList);
  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <Ipv4FirewallRules />}
      {funcList[1].isShow && <PortForwarding />}
      {funcList[2].isShow && <PortTriggering />}
      {funcList[3].isShow && <OneCOneNat />}
      {funcList[4].isShow && <Ipv6FirewallRules />}
      <div className='clear-both'></div>
    </>
  )
}

export default CP;