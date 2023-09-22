import mainStyle from './summary.module.scss';

import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import Overview from './components/Overview';
import Connectivity from './components/Connectivity';
import CpuUtilization from './components/CpuUtilization';

const Summary = (props) => {
  const { device } = props;

  return (
    <div className='layout-container layout-container--column layout-container--fluid'>
      <div className='row-col-block'>
        <Overview device={device} />
      </div>
      <div className='row-col-block'>
        <Connectivity device={device} />
      </div>
      <div className='row-col-block'>
        <CpuUtilization device={device} />
      </div>
    </div>
  )
}

export default Summary;