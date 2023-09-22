import mainStyle from '../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { TabSubTab, RadioButton } from 'components/';

import Ethernet from './components/Ethernet';
import Wireless from './components/Wireless';
import Addressing from './components/Addressing';
import Routing from './components/Routing';
import Services from './components/Services';
import TrafficManagement from './components/TrafficManagement';
import CaptivePortal from './components/CaptivePortal';
import HighAvailability from './components/HighAvailability';

// Context
import { configAction, ConfigContext } from '../../Context';

// Dummy 
import gwFeature from 'dummy/data/gateway/feature';

const defaultTabList = [
  { id: 1, label: 'ETHERNET', value: 'ethernet', isShow: false, isActive: false },
  { id: 2, label: 'WIRELESS', value: 'wireless', isShow: false, isActive: false },
  { id: 3, label: 'ADDRESSING', value: 'addressing', isShow: false, isActive: false },
  { id: 4, label: 'ROUTING', value: 'routing', isShow: false, isActive: false },
  { id: 5, label: 'SERVICES', value: 'services', isShow: false, isActive: false },
  { id: 6, label: 'TRAFFIC MANAGEMENT', value: 'trafficManagement', isShow: false, isActive: false },
  { id: 7, label: 'CAPTIVE PORTAL', value: 'captivePortal', isShow: false, isActive: false },
  { id: 8, label: 'HIGH AVAILABILITY', value: 'highAvailability', isShow: false, isActive: false },
];

const Network = () => {
  const { state, dispatch } = useContext(ConfigContext);

  // State
  const [tabList, setTabList] = useState([]);

  // Method
  const changeTab = selectedTab => {
    const newTabList = cloneDeep(tabList);
    const index = newTabList.findIndex(tab => tab.id === selectedTab.id);

    newTabList.map(tab => tab.isActive = false);
    newTabList[index].isActive = true;
    setTabList(newTabList);
  }

  const changeMode = (state) => {
    dispatch({
      type: configAction.setUseProfileConfig,
      payload: state
    });
  }

  // Side effect
  useEffect(() => {
    const updatedTabList = cloneDeep(defaultTabList);
    let instancedModel = null;
    let secondaryLevelFeature = null;

    if (state.profile) {
      instancedModel = gwFeature.getProfileModelInstance(state.profile.modelName);
      secondaryLevelFeature = instancedModel.getSecondaryLevelFeature(gwFeature.configPath.profile);
    } else {
      instancedModel = gwFeature.getDeviceModelInstance(state.device.modelName);
      secondaryLevelFeature = instancedModel.getSecondaryLevelFeature(gwFeature.configPath.device);
    }

    secondaryLevelFeature.ethernet && (updatedTabList[0].isShow = true);
    secondaryLevelFeature.wireless && (updatedTabList[1].isShow = true);
    secondaryLevelFeature.addressing && (updatedTabList[2].isShow = true);
    secondaryLevelFeature.routing && (updatedTabList[3].isShow = true);
    secondaryLevelFeature.services && (updatedTabList[4].isShow = true);
    secondaryLevelFeature.trafficManagement && (updatedTabList[5].isShow = true);
    secondaryLevelFeature.captivePortal && (updatedTabList[6].isShow = true);
    secondaryLevelFeature.highAvailability && (updatedTabList[7].isShow = true);

    updatedTabList[0].isActive = true;
    setTabList(updatedTabList);
  }, []);

  if (tabList.length === 0) {
    return;
  }

  const isNotStandalone = state.useProfileConfig ? true : false;

  return (
    <>
      <div className='layout-container layout-container--column layout-container--fluid'>
        {
          state.device && (
            <div className='layout-container'>
              <div className='form-group'>
                <div className={`'form-title ${mainStyle['field']}`}>Use Profile configurations</div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id='Enable'
                    name='Enable'
                    label='Enable'
                    checked={isNotStandalone}
                    onChange={() => changeMode(true)}
                  />
                  <div style={{ width: '20px' }}></div>
                  <RadioButton
                    id='Disable'
                    name='Disable'
                    label='Disable'
                    checked={!isNotStandalone}
                    onChange={() => changeMode(false)}
                  />
                </div>
              </div>
            </div>
          )
        }

        <TabSubTab tabList={tabList.filter(tab => tab.isShow)} changeTab={changeTab} />

        {tabList[0].isShow && tabList[0].isActive && <Ethernet />}
        {tabList[1].isShow && tabList[1].isActive && <Wireless />}
        {tabList[2].isShow && tabList[2].isActive && <Addressing />}
        {tabList[3].isShow && tabList[3].isActive && <Routing />}
        {tabList[4].isShow && tabList[4].isActive && <Services />}
        {tabList[5].isShow && tabList[5].isActive && <TrafficManagement />}
        {tabList[6].isShow && tabList[6].isActive && <CaptivePortal />}
        {tabList[7].isShow && tabList[7].isActive && <HighAvailability />}
      </div>
    </>
  )
}

export default Network;