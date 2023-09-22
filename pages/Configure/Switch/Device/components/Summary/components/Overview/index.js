import mainStyle from '../../summary.module.scss';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// Component
import { InlineTitle, Icon } from 'components/';
import PortGroup10 from './components/Portgroup10';
import PortGroup28 from './components/Portgroup28';
import PortGroup52 from './components/Portgroup52';

// Dummy data
import { getSwitchPorts } from 'dummy/data/switch/ports';

const Overview = (props) => {
  const { device } = props;
  const { portGroup } = device;

  // Fake data
  const fakePortData = getSwitchPorts([{ ...device, isActive: true }], true);

  // State
  const [ports, setPorts] = useState([]);
  const [fullPorts, setFullPorts] = useState([]);

  // Side effect
  useEffect(() => {
    // Aggregated ports
    const updatedPorts = [];

    for (const port of fakePortData) {
      const portNumber = port.port;
      const aggregate = port.aggregate;

      let link = port.link.title;
      if (port.connectionStatus === 'Link up') {
        if (link === 'Auto') {
          link += ' / 1Gbps full duplex master';
        } else {
          link += ` / ${link}`;
        }
      } else {
        link += ' / Link down';
      }

      const currentTraffic = port.currentTraffic;
      const cumulativeBytes = port.cumulativeBytes;
      const usedPower = port.usedPower;
      const lldp = port.lldp;
      const type = port.type.title;
      const authenticationState = port.authenticationState;
      const rstp = port.rstp.title;
      const rstpState = port.rstpState;
      const lbd = port.lbd.title;
      const lbdState = port.lbdState;
      const portName = port.portName;

      let vlan = '';
      if (type === 'Trunk') {
        vlan = `Native ${port.accessVlan}`;
      } else {
        vlan = port.accessVlan;
      }

      const updatedPort = {
        portNumber,
        aggregate,
        link,
        currentTraffic,
        cumulativeBytes,
        usedPower,
        lldp,
        vlan,
        type,
        authenticationState,
        rstp,
        rstpState,
        lbd,
        lbdState,
        portName,
        _port: port
      };

      updatedPorts.push(updatedPort);
    }

    setPorts(updatedPorts);

    // No aggregated ports
    const updatedFullPorts = [];
    for (const updatedPort of updatedPorts) {
      if (updatedPort.aggregate === '-') {
        updatedFullPorts.push(updatedPort);
      } else {
        const portNumbers = updatedPort.portNumber.split(', ');
        for (const portNumber of portNumbers) {
          const thisPort = {
            ...updatedPort,
            portNumber: +portNumber,
            _port: {
              ...updatedPort._port,
              port: portNumber
            }
          }

          updatedFullPorts.push(thisPort);
        }
      }
    }
    setFullPorts(updatedFullPorts);
  }, []);

  return (
    <>
      <InlineTitle label='OVERVIEW'>
        <Link className='redirect-to' to='/cloud/configure/switch/switch-ports'>
          Configure ports on the switch
        </Link>
      </InlineTitle>

      <div className={mainStyle['overview-container']}>
        <div className={mainStyle['icon-panel']}>
          <div className={mainStyle['item']}>
            <Icon className={`icon-port-1gbps ${mainStyle['round-icon']}`} />
            <span>1Gbps</span>
          </div>
          <div className={mainStyle['item']}>
            <Icon className={`icon-port-100mbps ${mainStyle['round-icon']}`} />
            <span>10/100 Mbps</span>
          </div>
          <div className={mainStyle['item']}>
            <Icon className={`icon-port-disconnected ${mainStyle['round-icon']}`} />
            <span>Disconnected</span>
          </div>
          <div className={mainStyle['item']}>
            <Icon className={`icon-port-disabled ${mainStyle['round-icon']}`} />
            <span>Disabled</span>
          </div>
          <div className={mainStyle['item']}>
            <Icon className={`icon-port-error ${mainStyle['round-icon']}`} />
            <span>Error</span>
          </div>
          <div className={mainStyle['item']}>
            <Icon className={`icon-port-poe ${mainStyle['icon']}`} />
            <span>PoE</span>
          </div>
          <div className={mainStyle['item']}>
            <Icon className={`icon-port-mirror ${mainStyle['icon']}`} />
            <span>Mirror</span>
          </div>
          <div className={mainStyle['item']}>
            <Icon className={`icon-port-uplink ${mainStyle['icon']}`} />
            <span>Uplink</span>
          </div>
        </div>
        <div className={mainStyle['port-panel']}>
          {portGroup === 10 && <PortGroup10 ports={fullPorts} />}
          {portGroup === 28 && <PortGroup28 ports={fullPorts} />}
          {portGroup === 52 && <PortGroup52 ports={fullPorts} />}
        </div>
      </div>
    </>
  )
}

export default Overview