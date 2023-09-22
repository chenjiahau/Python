import mainStyle from './basic.module.scss';

import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { Button } from 'components/';

import Information from './components/Information';
import Location from './components/Location';
import IPConnection from './components/IPConnection';
import SiteAndProfile from './components/SiteAndProfile';

const Basic = (props) => {
  const {
    device,
    pushToDevice
  } = props;

  return (
    <div className='layout-container layout-container--column layout-container--fluid device-basic-container'>
      <Row className={mainStyle['row']}>
        <Col xl={6} className={mainStyle['block']}>
          <Information
            device={device}
          />
        </Col>
        <Col xl={6} className={mainStyle['block']}>
          <Location />
        </Col>
      </Row>
      <Row className={mainStyle['row']}>
        <Col xl={6} className={mainStyle['block']}>
          <IPConnection device={device} />
        </Col>
        <Col xl={6} className={mainStyle['block']}>
          <SiteAndProfile device={device} />
        </Col>
      </Row>
      <div className='apply-btn-group'>
        <Button
          label='Cancel'
          className='btn-cancel me-3'
          onClick={() => { console.log('Click on Cancel') }}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => pushToDevice()}
        />
      </div>
    </div>
  );
}

export default Basic;