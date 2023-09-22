import mainStyle from './ports.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// UI
import PushToDeviceResultModal from 'cloudUi/Modals/PushToDeviceResultModal';

// Component
import { RadioButton } from 'components/';

import ChangeModeModal from './modals/ChangeModeModal';
import PortsInformation from './components/PortsInformation';
import Port from './components/Port';

// Context
import { DeviceContext } from '../../Context';

// Dummy data
import { getSwitchPorts } from 'dummy/data/switch/ports';
import { getPushToDeviceResult } from 'dummy/data/push';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

const defaultModalStatus = {
  changeMode: {
    self: 'changeMode',
    status: false
  },
  pushToDeviceResult: {
    self: 'pushToDeviceResult',
    status: false,
  },
}

const Ports = (props) => {
  const { device, pushToDevice } = props;
  const { state } = useContext(DeviceContext);

  // Fake data

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [isNotStandalone, setIsNotStandalone] = useState(true);
  const [pushResultList, setPushResultList] = useState([]);
  const [ports, setPorts] = useState([]);
  const [fullPorts, setFullPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeModeCallback = (status) => {
    if (status) {
      setPushResultList(getPushToDeviceResult(device));
      setModalStatus({
        ...modalStatus,
        changeMode: { ...modalStatus.changeMode, status: false },
        pushToDeviceResult: { ...modalStatus.pushToDeviceResult, status: true }
      });
    } else {
      setModalStatus({
        ...modalStatus,
        changeMode: { ...modalStatus.changeMode, status: false }
      });
      setIsNotStandalone(!isNotStandalone);
    }
  }

  // Side effect
  useEffect(() => {
    const fakePortData = getSwitchPorts([{ ...device, isActive: true }], true);

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

  useEffect(() => {
    selectedPort && setSelectedPort(null);
  }, [state.tabChangeTime]);

  return (
    <>
      <div className='layout-container layout-container--column layout-container--fluid'>
        {/* <div className='d-flex mb-4'>
          {
            fullPorts.map((port, index) => {
              const { portNumber } = port;

              return (
                <div
                  key={index}
                  className='d-flex justify-content-center align-items-center'
                  style={{ padding: '5px', border: '1px solid #000', cursor: 'pointer' }}
                  onClick={() => setSelectedPort(port)}
                >
                  {portNumber}
                </div>
              )
            })
          }
        </div> */}
        {
          !selectedPort ? (
            <>
              <div className='mb-2'>
                <div className='form-group'>
                  <div className='form-title'>Use Profile configuration</div>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id='Enable'
                      name='Enable'
                      label='Enable'
                      checked={isNotStandalone}
                      onChange={() => {
                        setIsNotStandalone(true);
                        changeModalStatus(modalStatus.changeMode.self, true)
                      }}
                    />
                    <div style={{ width: '20px' }}></div>
                    <RadioButton
                      id='Disable'
                      name='Disable'
                      label='Disable'
                      checked={!isNotStandalone}
                      onChange={() => {
                        setIsNotStandalone(false);
                        changeModalStatus(modalStatus.changeMode.self, true)
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className='row-col-block'>
                <PortsInformation
                  device={device}
                  originPorts={ports}
                  originFullPorts={fullPorts}
                />
              </div>
            </>
          ) : (
            <Port
              isNotStandalone={isNotStandalone}
              selectedPort={selectedPort}
              pushToDevice={pushToDevice}
            />
          )
        }
      </div >

      <ChangeModeModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        callback={(status) => changeModeCallback(status)}
      />

      <PushToDeviceResultModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        pushResultList={pushResultList}
      />
    </>
  )
}

export default Ports;