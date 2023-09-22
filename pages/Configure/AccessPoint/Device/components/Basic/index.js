import mainStyle from './basic.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { Button } from 'components/';

import Information from './components/Information';
import Location from './components/Location';
import IPConnection from './components/IPConnection';
import SiteAndProfile from './components/SiteAndProfile';

// Context
import DataContext from '../../DataContext';

// Dummy data & util
import { getChangeValueFn } from 'dummy/utils/changeValue';

const Basic = (props) => {
  const {
    device,
    pushToDevice
  } = props;

  const ctx = useContext(DataContext);

  // State
  const [form, setForm] = useState();

  // Method
  const changeValue = getChangeValueFn(form, setForm);

  useEffect(() => {
    const data = {
      deviceName: {
        value: device.name,
        isValid: true,
      },
      connectionType: {
        value: true
      },
      localIp: {
        value: device.localIp,
        isValid: true
      },
      subnetMask: {
        value: device.subnetMask,
        isValid: true
      },
      gateway: {
        value: device.gateway,
        isValid: true
      },
      dnsServer1: {
        value: device.dnsServer1,
        isValid: true
      },
      dnsServer2: {
        value: device.dnsServer2,
        isValid: true
      },
      dnsServer3: {
        value: device.dnsServer3,
        isValid: true
      },
      site: {
        selected: device.siteList.filter(site => site.isActive)[0],
        list: device.siteList
      },
      profile: {
        selected: device.profileList.filter(profile => profile.isActive)[0],
        list: device.profileList
      }
    };

    setForm(data);
    ctx.updateBasic(data);
    ctx.updateChangedBasic(data);
  }, [device]);

  useEffect(() => {
    ctx.updateChangedBasic(form);
  }, [form]);

  return (
    <>
      {
        form && (
          <div className="layout-container layout-container--column layout-container--fluid device-basic-container">
            <Row className={mainStyle['row']}>
              <Col xl={6} className={mainStyle['block']}>
                <Information
                  device={device}
                  form={form}
                  changeValue={changeValue}
                />
              </Col>
              <Col xl={6} className={mainStyle['block']}>
                <Location />
              </Col>
            </Row>
            <Row className={mainStyle['row']}>
              <Col xl={6} className={mainStyle['block']}>
                <IPConnection device={device} form={form} changeValue={changeValue} />
              </Col>
              <Col xl={6} className={mainStyle['block']}>
                <SiteAndProfile device={device} form={form} changeValue={changeValue} />
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
        )
      }
    </>
  );
}

export default Basic;