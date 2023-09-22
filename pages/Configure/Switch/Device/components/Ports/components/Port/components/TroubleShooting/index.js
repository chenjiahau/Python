import { useState, useEffect } from 'react';

// Component
import { InlineTitle } from 'components/';

import CableTest from './components/CableTest';
import CyclePort from './components/CyclePort';

// Dummy data

const TroubleShooting = (props) => {
  const { selectedPort } = props;

  // State
  const [port, setPort] = useState(null);

  // Method

  // Side effect
  useEffect(() => {
    const updatedPort = selectedPort._port;
    setPort(updatedPort);
  }, []);

  return (
    <>
      <div className='row-col-block'>
        <InlineTitle label='TROUBLESHOOTING' />

        <div className="row-block">
          <CableTest port={port} />
          <CyclePort port={port} />
        </div>
      </div>
    </>
  )
}

export default TroubleShooting;