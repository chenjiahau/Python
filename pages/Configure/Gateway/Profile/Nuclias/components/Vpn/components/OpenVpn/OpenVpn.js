import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import OpenVpnSettings from './components/OpenVpnSettings';
import ServerPolicies from './components/ServerPolicies';
import RemoteNetworks from './components/RemoteNetworks';
import LocalNetworks from './components/LocalNetworks';
import ClientList from './components/ClientList';
import ClientConnection from './components/ClientConnection';
import AccessServerClientConnection from './components/AccessServerClientConnection';
import OmniSslPortalLayout from './components/OmniSslPortalLayout';

// Context
import { ConfigContext } from '../../../../Context';
import { openVpnAction, OpenVpnContext } from './Context';

// Dummy
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';
import { getOpenVpnUIDisplaying } from 'dummy/data/gateway/data/vpn/open-vpn/open-vpn-settings';

const defaultFuncList = [
  { id: 1, label: 'OPEN VPN SETTINGS', value: 'openVpnSettings', isShow: false },
  { id: 2, label: 'SERVER POLICIES', value: 'serverPolicies', isShow: false },
  { id: 3, label: 'REMOTE NETWORKS', value: 'remoteNetworks', isShow: false },
  { id: 4, label: 'LOCAL NETWORKS', value: 'localNetworks', isShow: false },
  { id: 5, label: 'CLIENT LIST', value: 'clientList', isShow: false },
  { id: 6, label: 'CLIENT CONNECT', value: 'clientConnect', isShow: false },
  { id: 7, label: 'ACCESS SERVER CLIENT CONNECT', value: 'accessServerClientConnect', isShow: false },
  { id: 8, label: 'OMNISSL PORTAL LAYOUT', value: 'omniSslPortalLayout', isShow: false },
];

const OpenVpn = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: openVpnDispatch } = useContext(OpenVpnContext);

  // State
  const [funcList, setFuncList] = useState([]);

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

    thirdLevelFeature.openVpnSettings && (updatedFuncList[0].isShow = true);
    thirdLevelFeature.serverPolicies && modelName === gwFeature.model.dbg2000 && (updatedFuncList[1].isShow = true);
    thirdLevelFeature.remoteNetworks && (updatedFuncList[2].isShow = true);
    thirdLevelFeature.localNetworks && (updatedFuncList[3].isShow = true);
    thirdLevelFeature.clientList && (updatedFuncList[4].isShow = true);
    thirdLevelFeature.clientConnection && (updatedFuncList[5].isShow = true);
    thirdLevelFeature.accessServerClientConnection && (updatedFuncList[6].isShow = true);
    thirdLevelFeature.omniSslPortalLayout && (updatedFuncList[7].isShow = true);

    openVpnDispatch({
      type: openVpnAction.setSelectedDeviceModelName,
      payload: modelName
    });

    openVpnDispatch({
      type: openVpnAction.setOpenVpnUIDisplaying,
      payload: getOpenVpnUIDisplaying()
    });

    if (updatedFuncList[0].isShow) {
      openVpnDispatch({
        type: openVpnAction.setOpenVpnSettings,
        payload: new GatewayData(path, modelName).generateOpenVpn()
      });
    }

    if (updatedFuncList[1].isShow) {
      openVpnDispatch({
        type: openVpnAction.setServerPolicies,
        payload: new GatewayData(path, modelName).generateServerPolicies()
      });
    }

    if (updatedFuncList[2].isShow) {
      openVpnDispatch({
        type: openVpnAction.setRemoteNetworks,
        payload: new GatewayData(path, modelName).generateRemoteNetworks()
      });
    }

    if (updatedFuncList[3].isShow) {
      openVpnDispatch({
        type: openVpnAction.setLocalNetworks,
        payload: new GatewayData(path, modelName).generateLocalNetworks()
      });
    }

    if (updatedFuncList[4].isShow) {
      openVpnDispatch({
        type: openVpnAction.setClientList,
        payload: new GatewayData(path, modelName).generateClientList()
      });

      const list = new GatewayData(path, modelName).generateImportClientList()

      openVpnDispatch({
        type: openVpnAction.setImportClientList,
        payload: list
      });
    }

    if (updatedFuncList[5].isShow) {
      openVpnDispatch({
        type: openVpnAction.setClientConnection,
        payload: new GatewayData(path, modelName).generateClientConnection()
      });
    }

    if (updatedFuncList[6].isShow) {
      openVpnDispatch({
        type: openVpnAction.setAccessServerClientConnection,
        payload: new GatewayData(path, modelName).generateAccessServerClientConnection()
      });
    }

    if (updatedFuncList[7].isShow) {
      openVpnDispatch({
        type: openVpnAction.setOmniSslPortalLayout,
        payload: new GatewayData(path, modelName).generateOmniSslPortalLayout()
      });
    }

    setFuncList(updatedFuncList);

  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <OpenVpnSettings />}
      {funcList[1].isShow && <ServerPolicies />}
      {funcList[2].isShow && <RemoteNetworks />}
      {funcList[3].isShow && <LocalNetworks />}
      {funcList[4].isShow && <ClientList />}
      {funcList[5].isShow && <ClientConnection />}
      {funcList[6].isShow && <AccessServerClientConnection />}
      {funcList[7].isShow && <OmniSslPortalLayout />}

      <div className='clear-both'></div>
    </>
  )
}

export default OpenVpn;