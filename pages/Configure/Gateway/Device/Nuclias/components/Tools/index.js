import mainStyle from './tools.module.scss';

import { useState, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Context
import { ConfigContext } from '../../../../Profile/Nuclias/Context';

// Component
import { TooltipDialog, Input, Button, Icon, DropdownWithItem, InputWithUploadButton } from 'components/';
import RebootDeviceModal from './RebootDeviceModal';

// Dummy data & util
import { getChangeModalStatusFn } from 'dummy/utils/modal';

// Img
import speedTestLogoImg from 'assets/img/v2/icon/speed_test_logo.png';

// Default variable
const defaultModalStatus = {
  rebootDevice: {
    self: 'rebootDevice',
    status: false
  }
}

const Tools = () => {
  // State
  const { state: { device } } = useContext(ConfigContext);
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

              {
                device.modelName === 'DBG-2000' &&
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
              }

              {
                device.modelName !== 'DBG-2000' &&
                <>
                  <div>
                    <div className={mainStyle['operation']}>
                      <div className={mainStyle['title']}>IPv4 address/FQDN</div>
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
                  </div>

                  <div>
                    <div className={mainStyle['operation']}>
                      <div className={mainStyle['title']}>IPv6 address/FQDN</div>
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
                          label="Ping6"
                          className='btn-grey-blue'
                          onClick={() => handleSubmit(setShowPingLoading, setShowPingResult)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              }

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

              {
                device.modelName === 'DBG-2000' &&
                <>
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
                </>
              }

              {
                device.modelName !== 'DBG-2000' &&
                <>
                  <div>
                    <div className={mainStyle['operation']}>
                      <div className={mainStyle['title']}>IPv4 address/FQDN</div>
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
                  </div>
                  <div>
                    <div className={mainStyle['operation']}>
                      <div className={mainStyle['title']}>IPv6 address/FQDN</div>
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
                          label="Tractroute6"
                          className='btn-grey-blue'
                          onClick={() => handleSubmit(setShowTracerouteLoading, setShowTracerouteResult)}
                        />
                      </div>
                    </div>
                  </div>
                </>
              }

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

          {/* Wan throughput */}
          <div className={`col-block ${mainStyle['block']}`}>
            <div className={`${showTracerouteLoading && mainStyle['loading-block']}`}>
              <div className={`${showTracerouteLoading && mainStyle['loading-animation']}`}></div>

              <div className='d-flex justify-content-between'>
                <div className="form-group">
                  <div className="text-title">WAN THROUGHPUT</div>
                </div>

                <div>
                  <a href='http://www.speedtest.net/' target='_blank' rel='noreferrer'>
                    <img className={mainStyle['speed-test-logo']} src={speedTestLogoImg} alt=''/>
                  </a>
                </div>
              </div>

              <div className={`${ mainStyle['operation']} ${mainStyle['speed-test-interface-list-btn']}`}>
                <DropdownWithItem
                  type="normal"
                  selectedItem={device.speedTestInterface}
                  itemList={device.speedTestInterfaceList}
                  isMiddleSize={true}
                  onClick={item => {}}
                />
              </div>

              <div className={mainStyle['speed-test-interface-go']}>Go</div>

            </div>
          </div>

        </div>

        {/* EXPORT AND IMPORT DEVICE SETTINGS */}
        {
          device.modelName !== 'DBG-2000' &&
          <div className={`col-block ${mainStyle['block']}`}>
            <div className={`${showOtherLoading && mainStyle['loading-block']}`}>
              <div className={`${showOtherLoading && mainStyle['loading-animation']}`}></div>

              <div className="form-group mb-2">
                <div className="text-title">EXPORT AND IMPORT DEVICE SETTINGS</div>
              </div>

              <div className={mainStyle['operation']}>
                <div className={mainStyle['title']}>
                  Export settings
                </div>
                <div className={mainStyle['button']}>
                  <Button
                    label='Download'
                    className='btn-grey-blue'
                    onClick={() => {}}
                  />
                </div>
              </div>

              <div className={mainStyle['operation']}>
                <div className={mainStyle['title']} style={{whiteSpace: 'nowrap'}}>
                  Import settings
                </div>
                <div className={mainStyle['import-settings-container']}>
                  <InputWithUploadButton
                    value=''
                    onClick={e => {}}
                    onChange={e => {}}
                  />
                  <Button
                    style={{width: '135px'}}
                    label='Upload'
                    disabled
                    className='btn-grey-blue'
                    onClick={() => {}}
                  />
                </div>
              </div>
            </div>
          </div>
        }


      </div >

      <RebootDeviceModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </>
  );
}

export default Tools;