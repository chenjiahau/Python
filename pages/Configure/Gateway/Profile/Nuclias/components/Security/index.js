import mainStyle from '../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { RadioButton, TabSubTab } from 'components/';

import Firewall from './components/Firewall';
import Ips from './components/Ips';
import WebContentFilter from './components/WebContentFilter';
import ApplicationControl from './components/ApplicationControl';

// Context
import { configAction, ConfigContext } from '../../Context';

// Dummy 
import gwFeature from 'dummy/data/gateway/feature';

const defaultTabList = [
  { id: 1, label: 'FIREWALL', value: 'firewall', isShow: false, isActive: false },
  { id: 2, label: 'IPS', value: 'ips', isShow: false, isActive: false },
  { id: 3, label: 'WEB CONTENT FILTER', value: 'webContentFilter', isShow: false, isActive: false },
  { id: 4, label: 'APPLICATION CONTROL', value: 'applicationControl', isShow: false, isActive: false }
];

const Security = () => {
  const { state, dispatch } = useContext(ConfigContext);

  // State
  const [tabList, setTabList] = useState([]);

  // Method
  const changeMode = (state) => {
    dispatch({
      type: configAction.setUseProfileConfig,
      payload: state
    });
  }

  const changeTab = selectedTab => {
    const newTabList = cloneDeep(tabList);
    const index = newTabList.findIndex(tab => tab.id === selectedTab.id);

    newTabList.map(tab => tab.isActive = false);
    newTabList[index].isActive = true;
    setTabList(newTabList);
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

    secondaryLevelFeature.firewall && (updatedTabList[0].isShow = true);
    secondaryLevelFeature.ips && (updatedTabList[1].isShow = true);
    secondaryLevelFeature.webContentFilter && (updatedTabList[2].isShow = true);
    secondaryLevelFeature.applicationControl && (updatedTabList[3].isShow = true);

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
                    disabled={true}
                    checked={isNotStandalone}
                    onChange={() => changeMode(true)}
                  />
                  <div style={{ width: '20px' }}></div>
                  <RadioButton
                    id='Disable'
                    name='Disable'
                    label='Disable'
                    disabled={true}
                    checked={!isNotStandalone}
                    onChange={() => changeMode(false)}
                  />
                </div>
              </div>
            </div>
          )
        }

        <TabSubTab tabList={tabList.filter(tab => tab.isShow)} changeTab={changeTab} />

        {tabList[0].isShow && tabList[0].isActive && <Firewall />}
        {tabList[1].isShow && tabList[1].isActive && <Ips />}
        {tabList[2].isShow && tabList[2].isActive && <WebContentFilter />}
        {tabList[3].isShow && tabList[3].isActive && <ApplicationControl />}
      </div>
    </>
  )
}

export default Security;