import mainStyle from './tools.module.scss';

import { useState } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { TooltipDialog, Input, Button, Icon } from 'components/';
import RebootDeviceModal from './RebootDeviceModal';

// Dummy data & util
import { getChangeModalStatusFn } from 'dummy/utils/modal';

// Default variable
const defaultModalStatus = {
  rebootDevice: {
    self: 'rebootDevice',
    status: false
  }
}

const Tools = () => {
  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [pingInput, setPingInput] = useState('');
  const [tracerouteInput, setTracerouteInput] = useState('');
  const [showPingLoading, setShowPingLoading] = useState(false);
  const [showPingResult, setShowPingResult] = useState(false);
  const [showTracerouteLoading, setShowTracerouteLoading] = useState(false);
  const [showTracerouteResult, setShowTracerouteResult] = useState(false);
  const [showOtherLoading, setShowOtherLoading] = useState(false);
  const [showBlinkLedResult, setShowBlinkLedResult] = useState(false);
  const [showRebootDeviceResult, setShowRebootDeviceResult] = useState(false);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const handleSubmit = (showLoading, showResult = null) => {
    showLoading(true);
    showResult(false);

    setTimeout(() => {
      showLoading(false);
      showResult && showResult(true);
    }, 1000);
  }

  return (
    <>
      <div className="layout-container layout-container--column layout-container--fluid">
        <div className={mainStyle['row-block']}>
          {/* Ping */}
          <div className={`col-block ${mainStyle['block']}`}>
            <div className={`${showPingLoading && mainStyle['loading-block']}`}>
              <div className={`${showPingLoading && mainStyle['loading-animation']}`}></div>
              <div className="form-group mb-2">
                <div className="text-title">PING</div>
              </div>

              <div className={mainStyle['operation']}>
                <div className={mainStyle['title']}>IP address/FQDN</div>
                <div className={mainStyle['input']}>
                  <Input
                    type="text"
                    autoComplete="new-email"
                    value={pingInput}
                    onChange={(e) => setPingInput(e.target.value)}
                  />
                </div>
                <div className={mainStyle['button']}>
                  <Button
                    label="Ping"
                    className='btn-grey-blue'
                    onClick={() => handleSubmit(setShowPingLoading, setShowPingResult)}
                  />
                </div>
              </div>
              {
                showPingResult && (
                  <div className={mainStyle['result']}>
                    <div className={mainStyle['header']}>
                      <div className={mainStyle['title']}>Result</div>
                      {/* <div className={mainStyle['error-message']}>
                        <Icon className={'icon-message-error'} />
                        Device unreachable.
                      </div> */}
                      <div className={mainStyle['clear']}>
                        <Icon className={'icon-close-small'} onClick={() => setShowPingResult(false)} />
                      </div>
                    </div>
                    <div className={mainStyle['content']}>
                      <p>[1] Reply from 10.73.99.100, time=0ms</p>
                      <p>[2] Reply from 10.73.99.100, time=0ms</p>
                      <p>[3] Reply from 10.73.99.100, time=0ms</p>
                      <p>[4] Reply from 10.73.99.100, time=0ms</p>
                      <p>[5] Reply from 10.73.99.100, time=0ms</p>
                      <p>[6] Reply from 10.73.99.100, time=0ms</p>
                      <p>Ping Statistics for 10.73.99.100</p>
                      <p>Packet: Sent =6, Received =6, Lost =0</p>
                    </div>
                  </div>
                )
              }
            </div>
          </div>

          {/* Traceroute */}
          <div className={`col-block ${mainStyle['block']}`}>
            <div className={`${showTracerouteLoading && mainStyle['loading-block']}`}>
              <div className={`${showTracerouteLoading && mainStyle['loading-animation']}`}></div>

              <div className="form-group mb-2">
                <div className="text-title">TRACEROUTE</div>
              </div>

              <div className={mainStyle['operation']}>
                <div className={mainStyle['title']}>IP address/FQDN</div>
                <div className={mainStyle['input']}>
                  <Input
                    type="text"
                    autoComplete="new-email"
                    value={tracerouteInput}
                    onChange={(e) => setTracerouteInput(e.target.value)}
                  />
                </div>
                <div className={mainStyle['button']}>
                  <Button
                    label="Tractroute"
                    className='btn-grey-blue'
                    onClick={() => handleSubmit(setShowTracerouteLoading, setShowTracerouteResult)}
                  />
                </div>
              </div>

              {
                showTracerouteResult && (
                  <div className={mainStyle['result']}>
                    <div className={mainStyle['header']}>
                      <div className={mainStyle['title']}>Result</div>
                      {/* <div className={mainStyle['error-message']}>
                        <Icon className={'icon-message-error'} />
                        Device unreachable.
                      </div> */}
                      <div className={mainStyle['clear']}>
                        <Icon className={'icon-close-small'} onClick={() => setShowTracerouteResult(false)} />
                      </div>
                    </div>
                    <div className={mainStyle['content']}>
                      <p>[1] Reply from 10.73.99.100, time=0ms</p>
                      <p>[2] Reply from 10.73.99.100, time=0ms</p>
                      <p>[3] Reply from 10.73.99.100, time=0ms</p>
                      <p>[4] Reply from 10.73.99.100, time=0ms</p>
                      <p>[5] Reply from 10.73.99.100, time=0ms</p>
                      <p>[6] Reply from 10.73.99.100, time=0ms</p>
                      <p>Ping Statistics for 10.73.99.100</p>
                      <p>Packet: Sent =6, Received =6, Lost =0</p>
                    </div>
                  </div>
                )
              }
            </div>
          </div>

          {/* Others */}
          <div className={`col-block ${mainStyle['block']}`}>
            <div className={`${showOtherLoading && mainStyle['loading-block']}`}>
              <div className={`${showOtherLoading && mainStyle['loading-animation']}`}></div>

              <div className="form-group mb-2">
                <div className="text-title">OTHERS</div>
              </div>

              <div className={mainStyle['operation']}>
                <div className={mainStyle['title']}>
                  Blink LEDs
                  <TooltipDialog
                    className="ms-1 me-1"
                    placement="right"
                    title="Press “Start” to Blink LEDs on the device, “Stop” to stop the blinking."
                  />
                </div>
                <div className={mainStyle['button']}>
                  <Button
                    label="Stop"
                    className='btn-grey-blue'
                    onClick={() => handleSubmit(setShowOtherLoading, setShowBlinkLedResult)}
                  />
                </div>
                {
                  showBlinkLedResult && (
                    <div className={mainStyle['error-message']}>
                      <Icon className={'icon-message-error'} />
                      Device unreachable.
                    </div>
                  )
                }
              </div>

              <div className={mainStyle['operation']}>
                <div className={mainStyle['title']}>
                  Reboot device
                </div>
                <div className={mainStyle['button']}>
                  <Button
                    label="Reboot"
                    className='btn-grey-blue'
                    onClick={() => changeModalStatus(modalStatus.rebootDevice.self, true)}
                  />
                </div>
                {/* <div className={mainStyle['success-message']}>
                  <Icon className={'icon-message-successful'} />
                  Reboot Successfully
                </div> */}
                {/* <div className={mainStyle['error-message']}>
                  <Icon className={'icon-message-error'} />
                  Device unreachable.
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div >

      <RebootDeviceModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </>
  );
}

export default Tools;