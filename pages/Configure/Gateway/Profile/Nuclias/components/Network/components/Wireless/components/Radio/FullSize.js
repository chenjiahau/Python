import mainStyle from '../../../../../../../config.module.scss';

import { useState } from 'react';

// Component
import { RadioButton, DropdownWithItem, Input, TooltipDialog, Button } from 'components/';

const FullSize = (props) => {
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
    <div className={mainStyle['radio-container']}>
      <div className={mainStyle['header']}></div>
      <div className={mainStyle['header']}>2.4 GHz</div>
      <div className={mainStyle['header']}>5 GHz</div>

      {/* Radio */}
      <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Radio</div>
      <div className={mainStyle['item']}>
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
      <div className={mainStyle['item']}>
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

      {/* Radio mode */}
      <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Radio mode</div>
      <div className={mainStyle['item']}>
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
      <div className={mainStyle['item']}>
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

      {/* Channels bandwidth */}
      <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Channels bandwidth</div>
      <div className={mainStyle['item']}>
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
      <div className={mainStyle['item']}>
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

      {/* Tx power */}
      <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Tx power</div>
      <div className={mainStyle['item']}>
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
      <div className={mainStyle['item']}>
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

      {/* Auto channel */}
      <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Auto channel</div>
      <div className={mainStyle['item']}>
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
      <div className={mainStyle['item']}>
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

      {/* Channel */}
      <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Channel</div>
      <div className={mainStyle['item']}>
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
      <div className={mainStyle['item']}>
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

      {/* Eligible channels */}
      <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>
        Eligible channels
        <TooltipDialog
          className='ms-1 me-1'
          placement='right'
          title='Operating your network may require complying with local regulations. Nuclias filters your available sites to help you comply.'
        />
      </div>
      <div className={mainStyle['item']}>
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
      <div className={mainStyle['item']}>
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
                    onClick={() => !isUseProfileConfig && changeEligibleChannels('f5g', index)
                    }
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

      {/* Site country */}
      {
        !isProfilePath && (
          <>
            <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Site country</div>
            <div className={mainStyle['item']}>
              {f24gForm.country}
            </div>
            <div className={mainStyle['item']}>
              {f5gForm.country}
            </div>
          </>
        )
      }

      {/* Force auto channel scan */}
      <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Force auto channel scan</div>
      <div className={mainStyle['item']}>
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
      <div className={mainStyle['item']}>
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

      {/* Auto channel interval */}
      <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Auto channel interval</div>
      <div className={mainStyle['item']}>
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
      <div className={mainStyle['item']}>
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

      {/* Run auto channel */}
      {
        !isUseProfileConfig && (
          <>
            <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Run auto channel</div>
            <div className={mainStyle['item']}>
              <Button
                label='Run auto channel now'
                className='white-button'
                disabled={!f24gForm.autoChannel}
                onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, true)}
              />
            </div>
            <div className={mainStyle['item']}>
              <Button
                label='Run auto channel now'
                className='white-button'
                disabled={!f5gForm.autoChannel}
                onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, true)}
              />
            </div>
          </>
        )
      }


      {/* Beacon interval */}
      <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Beacon interval</div>
      <div className={mainStyle['item']}>
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
      <div className={mainStyle['item']}>
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

      {/* DTIM interval */}
      <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>DTIM interval</div>
      <div className={mainStyle['item']}>
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
      <div className={mainStyle['item']}>
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

      {/* Short guard interval */}
      <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Short guard interval</div>
      <div className={mainStyle['item']}>
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
      <div className={mainStyle['item']}>
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

      {/* U-APSD */}
      <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>U-APSD</div>
      <div className={mainStyle['item']}>
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
      <div className={mainStyle['item']}>
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

      {/* SSID isolation */}
      <div className={`${mainStyle['item']} ${mainStyle['item-title']} ${mainStyle['last-item']}`}>SSID isolation</div>
      <div className={`${mainStyle['item']} ${mainStyle['last-item']}`}>
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
      <div className={`${mainStyle['item']} ${mainStyle['last-item']}`}>
      </div>
    </div >
  )
}

export default FullSize