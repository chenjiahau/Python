import mainStyle from '../../../ports.module.scss';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// Component
import { InlineTitle } from 'components/';

// Dummy data

const Status = (props) => {
  const { selectedPort } = props;
  const navigate = useNavigate();

  // State
  const [port, setPort] = useState(null);
  const [form, setForm] = useState(null);

  // Method
  const redirectToAuthentication = () => {
    navigate(`/cloud/configure/switch/device/1?i=0&tab=authenticationSession`);
  }

  // Side effect
  useEffect(() => {
    // Port
    const updatedPort = selectedPort._port;
    setPort(updatedPort);

    // Form
    let updatedForm = {};
    let description = ''
    if (updatedPort.type === 'Access') {
      description = `${updatedPort.type.title} Port using access VLAN:${updatedPort.accessVlan}`;
    } else {
      description = `${updatedPort.type.title} Port using native VLAN:${updatedPort.nativeVlan}; allowed VLANs:${updatedPort.allowedVlans}`;
    }

    updatedForm = {
      usage: updatedPort.currentTraffic.total === 0.0 ? 'None' : updatedPort.currentTraffic.total,
      portState: updatedPort.portState.title,
      description,
      rstp: updatedPort.rstpState,
      lbd: updatedPort.lbdState,
      poe: updatedPort.poeState,
      linkNegotiation: updatedPort.linkNegotiationState,
      authentication: updatedPort.authenticationState === 'Disabled' ? '-' : (
        <a className='link' href='#' onClick={() => redirectToAuthentication()}>View the detail information</a>
      ),
    };
    setForm(updatedForm);
  }, [selectedPort]);

  if (!port || !form) {
    return;
  }

  return (
    <>
      <div className={`row-col-block ${mainStyle['space']}`} >
        <InlineTitle label='Status' />

        {/* Usage */}
        <div className={mainStyle['block']}>
          <div className={mainStyle['title']}>
            Profile configuration status
          </div>
          <div>
            {form.usage}
          </div>
        </div>
        {/* Port state */}
        <div className={mainStyle['block']}>
          <div className={mainStyle['title']}>
            Port state
          </div>
          <div>
            {form.portState}
          </div>
        </div>
        {/* Description */}
        <div className={mainStyle['block']}>
          <div className={mainStyle['title']}>
            Description
          </div>
          <div>
            {form.description}
          </div>
        </div>
        {/* RSTP */}
        <div className={mainStyle['block']}>
          <div className={mainStyle['title']}>
            RSTP
          </div>
          <div>
            {form.rstp}
          </div>
        </div>
        {/* LBD */}
        <div className={mainStyle['block']}>
          <div className={mainStyle['title']}>
            LBD
          </div>
          <div>
            {form.lbd}
          </div>
        </div>
        {/* PoE */}
        <div className={mainStyle['block']}>
          <div className={mainStyle['title']}>
            PoE
          </div>
          <div>
            {form.poe}
          </div>
        </div>
        {/* Link negotiation */}
        <div className={mainStyle['block']}>
          <div className={mainStyle['title']}>
            Link negotiation
          </div>
          <div>
            {form.linkNegotiation}
          </div>
        </div>
        {/* 802.1x authentication state */}
        <div className={mainStyle['block']}>
          <div className={mainStyle['title']}>
            802.1x authentication state
          </div>
          <div>
            {form.authentication}
          </div>
        </div>
      </div>
    </>
  )
}

export default Status;