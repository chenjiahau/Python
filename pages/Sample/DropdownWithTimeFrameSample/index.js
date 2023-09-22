import { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

import DropdownWithTimeframe, { getTimeFrameSetting, getTimeFrameKey } from 'components/DropdownWithTimeframe';

const DropdownWithTimeFrameSample = () => {
  const defaultTimeFrame = getTimeFrameSetting(); // get timeframe object.
  const newTimeFrameKey = getTimeFrameKey(); // get all timeframe keys
  const [newTimeFrame, setNewTimeFrame] = useState(cloneDeep(defaultTimeFrame));

  useEffect(() => {
    const tmpTimeframe = cloneDeep(newTimeFrame);
    tmpTimeframe.last24hrs.checked = false;
    tmpTimeframe.last7days.checked = true;
    setNewTimeFrame(tmpTimeframe);
  }, []);
  return (
    <div className='mb-5'>
      <h3>DropdownWithTimeFrame</h3>
      <Row className='mb-5'>
        <Col>
          <h5>Custom Timeframe + force render</h5>
          <DropdownWithTimeframe
            customDefaultTimeframe={newTimeFrame}
            forceRerenderObject={{}}
            onInit={initTimeFrame => console.log('initTimeFrame-1-', initTimeFrame)}
            onChange={selectedTimeframe => console.log('selectedTimeframe-1-', selectedTimeframe)}
          />
        </Col>
        <Col>
          <h5>Custom day + alignEnd</h5>
          <DropdownWithTimeframe
            customTimeFrameDay={'123'}
            alignEnd={true}
            onInit={initTimeFrame => console.log('initTimeFrame-1-', initTimeFrame)}
            onChange={selectedTimeframe => console.log('selectedTimeframe-1-', selectedTimeframe)}
          />
        </Col>
        <Col>
          <h5>Hide items + isInvalid</h5>
          <DropdownWithTimeframe
            customHideItem={['last7days', 'last60days', 'customRange']}
            isInvalid
            onInit={initTimeFrame => console.log('initTimeFrame-3-', initTimeFrame)}
            onChange={selectedTimeframe => console.log('selectedTimeframe-3-', selectedTimeframe)}
          />
        </Col>
        <Col>
          <h5>disabled</h5>
          <DropdownWithTimeframe
            disabled
          />
        </Col>
      </Row>
    </div>
  )
};

export default DropdownWithTimeFrameSample;
