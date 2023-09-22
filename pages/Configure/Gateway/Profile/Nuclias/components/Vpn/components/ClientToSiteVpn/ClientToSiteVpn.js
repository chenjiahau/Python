import mainStyle from '../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import IpsecVpnServer from './components/IpsecVpnServer';
import IkeProfiles from './components/IkeProfiles';

// Context
import { ConfigContext } from '../../../../Context';
import { clientToSiteVpnAction, ClientToSiteVpnContext } from './Context';

// Dummy
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';

const defaultFuncList = [
  { id: 1, label: 'IPSEC VPN SERVER', value: 'ipsecVpnServer', isShow: false },
  { id: 2, label: 'IKE PROFILES', value: 'ikeProfiles', isShow: false },
];

const ClientToSiteVpn = () => {
  const { state } = useContext(ConfigContext);
  const { dispatch: clientToSiteVpnDispatch } = useContext(ClientToSiteVpnContext);

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

    clientToSiteVpnDispatch({
      type: clientToSiteVpnAction.setSelectedDeviceModelName,
      payload: modelName
    });

    thirdLevelFeature.ipsecVpnServer && (updatedFuncList[0].isShow = true);
    thirdLevelFeature.ikeProfiles && (updatedFuncList[1].isShow = true);

    if (updatedFuncList[0].isShow) {
      clientToSiteVpnDispatch({
        type: clientToSiteVpnAction.setIpsecVpnServer,
        payload: new GatewayData(path, modelName).generateIpsecVpnServer()
      });
    }

    if (updatedFuncList[1].isShow) {
      clientToSiteVpnDispatch({
        type: clientToSiteVpnAction.setIkeProfiles,
        payload: new GatewayData(path, modelName).generateClientIkeProfiles()
      });
    }

    setFuncList(updatedFuncList);

  }, []);

  if (!funcList.length) {
    return;
  }

  return (
    <>
      {funcList[0].isShow && <IpsecVpnServer />}
      {funcList[1].isShow && <IkeProfiles />}

      <div className='clear-both'></div>
    </>
  )
}

export default ClientToSiteVpn;