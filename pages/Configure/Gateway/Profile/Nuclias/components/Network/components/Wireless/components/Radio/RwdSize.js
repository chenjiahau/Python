import mainStyle from '../../../../../../../config.module.scss';

import { useState } from 'react';
import { Table } from 'react-bootstrap';

// Component
import { RadioButton, DropdownWithItem, Input, TooltipDialog, Button } from 'components/';

const RwdSize = (props) => {
  const {
    modalStatus,
    changeModalStatus,
    isProfilePath,
    isUseProfileConfig,
    f24gForm,
    f5gForm,
    changeF24gValue,
    changeF5gValue,
    changeRadioMode,
    changeEligibleChannels,
  } = props;

  return (
    <>
      {/* When page width is small than 1300px */}
      {/* 2.4 GHz */}
      <Table
        responsive
        hover
        className={`table-container overwrite-table ${mainStyle['not-full-page-content']}`}
        style={{ marginBottom: '4px' }}
      >
        <thead>
          <tr>
            <th className="th-not-sorting"></th>
            <th className="th-not-sorting">2.4 GHz</th>
          </tr>
        </thead>
        <tbody>
          {/* Radio */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Radio</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f24gForm.radio ? (<>Enable</>) : (<>Disable</>)}
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <RadioButton
                          id='radio-0-enable'
                          label='Enable'
                          hasRightMargin={true}
                          checked={f24gForm.radio}
                          onChange={() => changeF24gValue('radio', true)}
                        />
                        <RadioButton
                          id='radio-0-disable'
                          label='Disable'
                          checked={!f24gForm.radio}
                          onChange={() => changeF24gValue('radio', false)}
                        />
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Radio mode */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Radio mode</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f24gForm.radioMode.find(item => item.isActive).title}
                    </>
                  ) : (
                    <>
                      <DropdownWithItem
                        id='radio-mode-0'
                        type='normal'
                        isMiddleSize={true}
                        selectedItem={f24gForm.radioMode.find(item => item.isActive)}
                        itemList={f24gForm.radioMode}
                        onClick={radioMode => changeRadioMode('f24g', radioMode)}
                      />
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Channels bandwidth */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Channels bandwidth</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f24gForm.channelBandwidth.find(item => item.isActive).title}
                    </>
                  ) : (
                    <>
                      <DropdownWithItem
                        id='channels-bandwidth-0'
                        type='normal'
                        isMiddleSize={true}
                        selectedItem={f24gForm.channelBandwidth.find(item => item.isActive)}
                        itemList={f24gForm.channelBandwidth}
                        onClick={channelBandwidth => changeF24gValue('channelBandwidth', channelBandwidth)}
                      />
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Tx power */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Tx power</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f24gForm.txPower} %
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <Input
                          type='number'
                          isMiddleSize={true}
                          placeholder='2-100'
                          autoComplete='new-email'
                          value={f24gForm.txPower}
                          onChange={e => changeF24gValue('txPower', e.target.value)}
                        />
                        <div>%</div>
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Auto channel */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Auto channel</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f24gForm.autoChannel ? (<>Enable</>) : (<>Disable</>)}
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <RadioButton
                          id='auto-channel-0-enable'
                          label='Enable'
                          hasRightMargin={true}
                          checked={f24gForm.autoChannel}
                          onChange={() => changeF24gValue('autoChannel', true)}

                        />
                        <RadioButton
                          id='auto-channel-0-disable'
                          label='Disable'
                          checked={!f24gForm.autoChannel}
                          onChange={() => changeF24gValue('autoChannel', false)}
                        />
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Channel */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Channel</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {
                        f24gForm.autoChannel ? (
                          <>
                            <div>Auto</div>
                          </>
                        ) : (
                          <>
                            {f24gForm.channel.find(item => item.isActive).title}
                          </>
                        )
                      }
                    </>
                  ) : (
                    <>
                      {
                        f24gForm.autoChannel ? (
                          <>
                            <div>Auto</div>
                          </>
                        ) : (
                          <>
                            <DropdownWithItem
                              id='channels-0'
                              type='normal'
                              isMiddleSize={true}
                              disabled={f24gForm.autoChannel}
                              selectedItem={f24gForm.channel.find(item => item.isActive)}
                              itemList={f24gForm.channel}
                              onClick={channel => changeF24gValue('channel', channel)}
                            />
                          </>
                        )
                      }
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Eligible channels */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>
                Eligible channels
                <TooltipDialog
                  className='ms-1 me-1'
                  placement='right'
                  title='Operating your network may require complying with local regulations. Nuclias filters your available sites to help you comply.'
                />
              </div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                <div className={`${mainStyle['field-td']} ${mainStyle['td--eligible-channel']}`}>
                  <div className={mainStyle['top']}>
                    {
                      f24gForm.eligibleChannels.map((channel, index) => {
                        return (
                          <div
                            key={`eligible-channel-0-${index}`}
                            className={`
                              ${mainStyle['box']}
                              ${channel.state && mainStyle['selected-box']}
                              ${!f24gForm.autoChannel && mainStyle['disabled-box']}
                            `}
                            onClick={() => !isUseProfileConfig && changeEligibleChannels('f24g', index)}
                          >
                            {channel.channel}
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className={mainStyle['bottom']}>
                    <div className={mainStyle['sample']}>
                      <div className={mainStyle['sample-box']}></div>
                      <div>Unselected</div>
                    </div>
                    <div className={mainStyle['sample']}>
                      <div className={`${mainStyle['sample-box']} ${mainStyle['selected-box']}`}></div>
                      <div>Selected</div>
                    </div>
                    <div className={mainStyle['sample']}>
                      <div className={`${mainStyle['sample-box']} ${mainStyle['synced-box']}`}></div>
                      <div>Selected(Unsynchronized with profile)</div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          {/* Site country */}
          {
            !isProfilePath && (
              <>
                <tr className={mainStyle['tr']}>
                  <td>
                    <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Site country</div>
                  </td>
                  <td>
                    <div className={mainStyle['field-td']}>
                      {f24gForm.country}
                    </div>
                  </td>
                </tr>
              </>
            )
          }
          {/* Force auto channel scan */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Force auto channel scan</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f24gForm.forceAutoChannelScan ? (<>Enable</>) : (<>Disable</>)}
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <RadioButton
                          id='force-auto-channel-scan-0-enable'
                          label='Enable'
                          hasRightMargin={true}
                          disabled={!f24gForm.autoChannel}
                          checked={f24gForm.forceAutoChannelScan}
                          onChange={() => changeF24gValue('forceAutoChannelScan', true)}
                        />
                        <RadioButton
                          id='force-auto-channel-scan-0-disable'
                          label='Disable'
                          disabled={!f24gForm.autoChannel}
                          checked={!f24gForm.forceAutoChannelScan}
                          onChange={() => changeF24gValue('forceAutoChannelScan', false)}
                        />
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Auto channel interval */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Auto channel interval</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f24gForm.autoChannelInterval} hours
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <Input
                          type='number'
                          isMiddleSize={true}
                          placeholder='6-24'
                          autoComplete='new-email'
                          disabled={!f24gForm.autoChannel}
                          value={f24gForm.autoChannelInterval}
                          onChange={(e) => changeF24gValue('autoChannelInterval', e.target.value)}
                        />
                        <div>hours</div>
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Run auto channel */}
          {
            !isUseProfileConfig && (
              <>
                <tr className={mainStyle['tr']}>
                  <td>
                    <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Run auto channel</div>
                  </td>
                  <td>
                    <div className={mainStyle['field-td']}>
                      <Button
                        label='Run auto channel now'
                        className='white-button'
                        disabled={!f5gForm.autoChannel}
                        onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, true)}
                      />
                    </div>
                  </td>
                </tr>
              </>
            )
          }
          {/* Beacon interval */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Beacon interval</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f24gForm.beaconInterval} Milliseconds
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <Input
                          type='number'
                          isMiddleSize={true}
                          placeholder='40-3500'
                          autoComplete='new-email'
                          value={f24gForm.beaconInterval}
                          onChange={(e) => changeF24gValue('beaconInterval', e.target.value)}
                        />
                        <div>Milliseconds</div>
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* DTIM interval */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>DTIM interval</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f24gForm.dtimInterval}
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <Input
                          type='number'
                          isMiddleSize={true}
                          placeholder='1-255'
                          autoComplete='new-email'
                          value={f24gForm.dtimInterval}
                          onChange={(e) => changeF24gValue('dtimInterval', e.target.value)}
                        />
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Short guard interval */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Short guard interval</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f24gForm.shortGuardInterval ? (<>Enable</>) : (<>Disable</>)}
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <RadioButton
                          id='short-guard-interval-0-enable'
                          label='Enable'
                          hasRightMargin={true}
                          checked={f24gForm.shortGuardInterval}
                          onChange={() => changeF24gValue('shortGuardInterval', true)}
                        />
                        <RadioButton
                          id='short-guard-interval-0-disable'
                          label='Disable'
                          checked={!f24gForm.shortGuardInterval}
                          onChange={() => changeF24gValue('shortGuardInterval', false)}
                        />
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* U-APSD */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>U-APSD</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f24gForm.uapsd ? (<>Enable</>) : (<>Disable</>)}
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <RadioButton
                          id='uapsd-0-enable'
                          label='Enable'
                          hasRightMargin={true}
                          checked={f24gForm.uapsd}
                          onChange={() => changeF24gValue('uapsd', true)}
                        />
                        <RadioButton
                          id='uapsd-0-disable'
                          label='Disable'
                          checked={!f24gForm.uapsd}
                          onChange={() => changeF24gValue('uapsd', false)}
                        />
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* SSID isolation */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>SSID isolation</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f24gForm.ssidIsolation ? (<>Enable</>) : (<>Disable</>)}
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <RadioButton
                          id='ssid-isolation-0-enable'
                          label='Enable'
                          hasRightMargin={true}
                          checked={f24gForm.ssidIsolation}
                          onChange={(e) => changeF24gValue('ssidIsolation', true)}
                        />
                        <RadioButton
                          id='ssid-isolation-0-disable'
                          label='Disable'
                          checked={!f24gForm.ssidIsolation}
                          onChange={(e) => changeF24gValue('ssidIsolation', true)}
                        />
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
      {/* 5 GHz */}
      <Table hover className={`table-container overwrite-table ${mainStyle['not-full-page-content']}`}>
        <thead>
          <tr>
            <th className="th-not-sorting"></th>
            <th className="th-not-sorting">5 GHz</th>
          </tr>
        </thead>
        <tbody>
          {/* Radio */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Radio</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f5gForm.radio ? (<>Enable</>) : (<>Disable</>)}
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <RadioButton
                          id='radio-1-enable'
                          label='Enable'
                          hasRightMargin={true}
                          checked={f5gForm.radio}
                          onChange={() => changeF5gValue('radio', true)}
                        />
                        <RadioButton
                          id='radio-1-disable'
                          label='Disable'
                          checked={!f5gForm.radio}
                          onChange={() => changeF5gValue('radio', false)}
                        />
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Radio mode */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Radio mode</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f5gForm.radioMode.find(item => item.isActive).title}
                    </>
                  ) : (
                    <>
                      <DropdownWithItem
                        id='radio-mode-1'
                        type='normal'
                        isMiddleSize={true}
                        selectedItem={f5gForm.radioMode.find(item => item.isActive)}
                        itemList={f5gForm.radioMode}
                        onClick={radioMode => changeRadioMode('f5g', radioMode)}
                      />
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Channels bandwidth */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Channels bandwidth</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f5gForm.channelBandwidth.find(item => item.isActive).title}
                    </>
                  ) : (
                    <>
                      <DropdownWithItem
                        id='channels-bandwidth-1'
                        type='normal'
                        isMiddleSize={true}
                        selectedItem={f5gForm.channelBandwidth.find(item => item.isActive)}
                        itemList={f5gForm.channelBandwidth}
                        onClick={channelBandwidth => changeF5gValue('channelBandwidth', channelBandwidth)}
                      />
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Tx power */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Tx power</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f5gForm.txPower} %
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <Input
                          type='number'
                          isMiddleSize={true}
                          placeholder='2-100'
                          autoComplete='new-email'
                          value={f5gForm.txPower}
                          onChange={e => changeF5gValue('txPower', e.target.value)}
                        />
                        <div>%</div>
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Auto channel */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Auto channel</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f5gForm.autoChannel ? (<>Enable</>) : (<>Disable</>)}
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <RadioButton
                          id='auto-channel-1-enable'
                          label='Enable'
                          hasRightMargin={true}
                          checked={f5gForm.autoChannel}
                          onChange={() => changeF5gValue('autoChannel', true)}
                        />
                        <RadioButton
                          id='auto-channel-1-disable'
                          label='Disable'
                          checked={!f5gForm.autoChannel}
                          onChange={() => changeF5gValue('autoChannel', false)}
                        />
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Channel */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Channel</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {
                        f5gForm.autoChannel ? (
                          <>
                            <div>Auto</div>
                          </>
                        ) : (
                          <>
                            {f5gForm.channel.find(item => item.isActive).title}
                          </>
                        )
                      }
                    </>
                  ) : (
                    <>
                      {
                        f5gForm.autoChannel ? (
                          <>
                            <div>Auto</div>
                          </>
                        ) : (
                          <>
                            <DropdownWithItem
                              id='channels-1'
                              type='normal'
                              isMiddleSize={true}
                              disabled={f5gForm.autoChannel}
                              selectedItem={f5gForm.channel.find(item => item.isActive)}
                              itemList={f5gForm.channel}
                              onClick={channel => changeF5gValue('channel', channel)}
                            />
                          </>
                        )
                      }
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Eligible channels */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>
                Eligible channels
                <TooltipDialog
                  className='ms-1 me-1'
                  placement='right'
                  title='Operating your network may require complying with local regulations. Nuclias filters your available sites to help you comply.'
                />
              </div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                <div className={`${mainStyle['field-td']} ${mainStyle['td--eligible-channel']}`}>
                  <div className={mainStyle['top']}>
                    {
                      f5gForm.eligibleChannels.map((channel, index) => {
                        return (
                          <div
                            key={`eligible-channel-1-${index}`}
                            className={`
                              ${mainStyle['box']}
                              ${channel.state && mainStyle['selected-box']}
                              ${!f5gForm.autoChannel && mainStyle['disabled-box']}
                            `}
                            onClick={() => !isUseProfileConfig && changeEligibleChannels('f5g', index)}
                          >
                            {channel.channel}
                          </div>
                        )
                      })
                    }
                  </div>
                  <div className={mainStyle['bottom']}>
                    <div className={mainStyle['sample']}>
                      <div className={mainStyle['sample-box']}></div>
                      <div>Unselected</div>
                    </div>
                    <div className={mainStyle['sample']}>
                      <div className={`${mainStyle['sample-box']} ${mainStyle['selected-box']}`}></div>
                      <div>Selected</div>
                    </div>
                    <div className={mainStyle['sample']}>
                      <div className={`${mainStyle['sample-box']} ${mainStyle['synced-box']}`}></div>
                      <div>Selected(Unsynchronized with profile)</div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
          {/* Site country */}
          {
            !isProfilePath && (
              <>
                <tr className={mainStyle['tr']}>
                  <td>
                    <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Site country</div>
                  </td>
                  <td>
                    <div className={mainStyle['field-td']}>
                      {f5gForm.country}
                    </div>
                  </td>
                </tr>
              </>
            )
          }
          {/* Force auto channel scan */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Force auto channel scan</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f5gForm.forceAutoChannelScan ? (<>Enable</>) : (<>Disable</>)}
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <RadioButton
                          id='force-auto-channel-scan-1-enable'
                          label='Enable'
                          hasRightMargin={true}
                          disabled={!f5gForm.autoChannel}
                          checked={f5gForm.forceAutoChannelScan}
                          onChange={() => changeF5gValue('forceAutoChannelScan', true)}
                        />
                        <RadioButton
                          id='force-auto-channel-scan-1-disable'
                          label='Disable'
                          disabled={!f5gForm.autoChannel}
                          checked={!f5gForm.forceAutoChannelScan}
                          onChange={() => changeF5gValue('forceAutoChannelScan', false)}
                        />
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Auto channel interval */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>
                Auto channel interval
              </div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f5gForm.autoChannelInterval} hours
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <Input
                          type='number'
                          isMiddleSize={true}
                          placeholder='6-24'
                          autoComplete='new-email'
                          disabled={!f5gForm.autoChannel}
                          value={f5gForm.autoChannelInterval}
                          onChange={(e) => changeF5gValue('autoChannelInterval', e.target.value)}
                        />
                        <div>hours</div>
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Run auto channel */}
          {
            !isUseProfileConfig && (
              <>
                <tr className={mainStyle['tr']}>
                  <td>
                    <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Run auto channel</div>
                  </td>
                  <td>
                    <div className={mainStyle['field-td']}>
                      <Button
                        label='Run auto channel now'
                        className='white-button'
                        disabled={!f5gForm.autoChannel}
                        onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, true)}
                      />
                    </div>
                  </td>
                </tr>
              </>
            )
          }
          {/* Beacon interval */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Beacon interval</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f5gForm.beaconInterval} Milliseconds
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <Input
                          type='number'
                          isMiddleSize={true}
                          placeholder='40-3500'
                          autoComplete='new-email'
                          value={f5gForm.beaconInterval}
                          onChange={(e) => changeF5gValue('beaconInterval', e.target.value)}
                        />
                        <div>Milliseconds</div>
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* DTIM interval */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>DTIM interval</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f5gForm.dtimInterval}
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <Input
                          type='number'
                          isMiddleSize={true}
                          placeholder='1-255'
                          autoComplete='new-email'
                          value={f5gForm.dtimInterval}
                          onChange={(e) => changeF5gValue('dtimInterval', e.target.value)}
                        />
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* Short guard interval */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>Short guard interval</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f5gForm.shortGuardInterval ? (<>Enable</>) : (<>Disable</>)}
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <RadioButton
                          id='short-guard-interval-1-enable'
                          label='Enable'
                          hasRightMargin={true}
                          checked={f5gForm.shortGuardInterval}
                          onChange={() => changeF5gValue('shortGuardInterval', true)}
                        />
                        <RadioButton
                          id='short-guard-interval-1-disable'
                          label='Disable'
                          checked={!f5gForm.shortGuardInterval}
                          onChange={() => changeF5gValue('shortGuardInterval', false)}
                        />
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
          {/* U-APSD */}
          <tr className={mainStyle['tr']}>
            <td>
              <div className={mainStyle['td']} style={{ marginRight: '200px' }}>U-APSD</div>
            </td>
            <td>
              <div className={mainStyle['field-td']}>
                {
                  isUseProfileConfig ? (
                    <>
                      {f5gForm.uapsd ? (<>Enable</>) : (<>Disable</>)}
                    </>
                  ) : (
                    <>
                      <div className='form-field form-field--horizontal'>
                        <RadioButton
                          id='uapsd-1-enable'
                          label='Enable'
                          hasRightMargin={true}
                          checked={f5gForm.uapsd}
                          onChange={() => changeF5gValue('uapsd', true)}
                        />
                        <RadioButton
                          id='uapsd-1-disable'
                          label='Disable'
                          checked={!f5gForm.uapsd}
                          onChange={() => changeF5gValue('uapsd', false)}
                        />
                      </div>
                    </>
                  )
                }
              </div>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  )
}

export default RwdSize