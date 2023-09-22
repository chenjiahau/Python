import mainStyle from '../../ports.module.scss';

import React from 'react';
import { Row, Col } from 'react-bootstrap';

// Component
import PortTraffic from './components/PortTraffic';
import CurrentConfiguration from './components/CurrentConfiguration';
import Status from './components/Status';
import TroubleShooting from './components/TroubleShooting';
import OverviewPackets from './components/OverviewPackets';

const Port = (props) => {
  const { isNotStandalone, selectedPort, pushToDevice } = props;

  return (
    <>
      <div className='mb-2'>
        <PortTraffic selectedPort={selectedPort} />
      </div>

      <div className='mb-2'>
        <div className={mainStyle['container']}>
          <CurrentConfiguration
            isNotStandalone={isNotStandalone}
            selectedPort={selectedPort}
            pushToDevice={pushToDevice}
          />
          <Status selectedPort={selectedPort} />
        </div>
      </div>

      <div className='mb-2'>
        <TroubleShooting selectedPort={selectedPort} />
      </div>

      <div className='mb-2'>
        <OverviewPackets selectedPort={selectedPort} />
      </div>
    </>
  )
}

export default Port;