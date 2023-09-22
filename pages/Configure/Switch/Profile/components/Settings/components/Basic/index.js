import mainStyle from '../../settings.module.scss';

import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import Vlan from './components/Vlan';
import Rstp from './components/Rstp';
import DhcpServerScreen from './components/DhcpServerScreen';
import VoiceVlan from './components/VoiceVlan';
import JumboFrame from './components/JumboFrame';
import QualityOfService from './components/QualityOfService';
import Snmp from './components/Snmp';

const Basic = (props) => {
  const {
    profile
  } = props;

  return (
    <div className='tab-container-border'>
      <div className={mainStyle['basic-container']}>
        <div className={mainStyle['child-item']}>
          <Vlan profile={profile} />
        </div>
        <div className={mainStyle['child-item']}>
          <Rstp />
        </div>
        <div className={mainStyle['child-item']}>
          <DhcpServerScreen />
        </div>
        <div className={mainStyle['child-item']}>
          <VoiceVlan />
        </div>
        <div className={mainStyle['child-item']}>
          <JumboFrame />
        </div>
        <div className={mainStyle['child-item']}>
          <QualityOfService />
        </div>
        <div className={mainStyle['child-item']}>
          <Snmp />
        </div>
      </div>
    </div >
  )
}

export default Basic;