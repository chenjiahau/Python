import mainStyle from './radio.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { cloneDeep, isArray, isObject } from 'lodash';

// Component
import { RadioButton, TooltipDialog, DropdownWithItem, Input, Button } from 'components/';
import RunAutoChannelModal from './RunAutoChannelModal';

// Context
import DataContext from '../../DataContext';

// Dummy data & util
import { generateRadio } from 'dummy/data/radio';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

// Default variable
const defaultModalStatus = {
  runAutoChannel: {
    self: 'runAutoChannel',
    status: false
  }
}

const Radio = (props) => {
  const {
    pushToDevice
  } = props;

  const ctx = useContext(DataContext);
  let [searchParams] = useSearchParams();

  // Faker data
  let tband = searchParams.get('tband') ? true : false;
  const fakerRadio = generateRadio(tband);

  // State
  const [isNotStandalone, setIsNotStandalone] = useState(true);
  const [form, setForm] = useState();
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeValue = (ratio, field, value) => {
    const updatedForm = cloneDeep(form);

    if (!updatedForm['device'][ratio][field].hasOwnProperty('list')) {
      updatedForm['device'][ratio][field].value = value;
    } else {
      for (const item of updatedForm['device'][ratio][field].list) {
        if (item.title !== value.title) {
          item.hasOwnProperty('isActive') && (item.isActive = false);
        } else {
          item.hasOwnProperty('isActive') && (item.isActive = true);
          item.hasOwnProperty('checked') && (item.checked = !item.checked);
          updatedForm['device'][ratio][field].selected = item;
        }
      }
    }

    setForm(updatedForm);
  }

  const changeMode = (isNotStandalone) => {
    setIsNotStandalone(isNotStandalone);
  };

  const changeEligibleChannels = (ratio, index) => {
    if (isNotStandalone || !form['device'][ratio].autoChannel.value) {
      return;
    }

    const updatedForm = cloneDeep(form);
    updatedForm['device'][ratio].eligibleChannels[index].value = !updatedForm['device'][ratio].eligibleChannels[index].value;
    setForm(updatedForm);
  }

  // Side effect
  useEffect(() => {
    const data = {};
    for (const sourceKey in fakerRadio) {
      data[sourceKey] = [];

      for (const item of fakerRadio[sourceKey]) {
        const childData = {};
        for (const childItemKey in item) {
          if (!isArray(item[childItemKey]) && !isObject(item[childItemKey])) {
            childData[childItemKey] = {};
            childData[childItemKey].value = item[childItemKey];
          }
        }

        childData['channel'] = { selected: cloneDeep(item['channel']), list: cloneDeep(item['channelList']) };
        childData['radioMode'] = { selected: cloneDeep(item['radioMode']), list: cloneDeep(item['radioModeList']) };
        childData['channelsBandwidth'] = { selected: cloneDeep(item['channelsBandwidth']), list: cloneDeep(item['channelsBandwidthList']) };
        childData['eligibleChannels'] = item.eligibleChannels;

        data[sourceKey].push(childData);
      }

    }
    console.log(data);
    setForm(data);
    ctx.updateRadio(data);
    ctx.updateChangedRadio(data);
  }, []);

  useEffect(() => {
    ctx.updateChangedRadio(form);
  }, [form]);

  if (!form) {
    return
  }

  return (
    <>
      <div className="layout-container layout-container--column layout-container--fluid">
        <div className="d-flex justify-content-between align-item-center">
          <div className="form-group">
            <div className={`'form-title ${mainStyle['field']}`}>Use Profile configurations</div>
            <div className='form-field form-field--horizontal'>
              <RadioButton
                id="Enable"
                name="Enable"
                label="Enable"
                checked={isNotStandalone}
                onChange={() => changeMode(true)}
              />
              <div style={{ width: '20px' }}></div>
              <RadioButton
                id="Disable"
                name="Disable"
                label="Disable"
                checked={!isNotStandalone}
                onChange={() => changeMode(false)}
              />
            </div>
          </div>
          <div className="form-group">
            <Link to='/cloud/configure/access-point/profile/145280?radio' className={mainStyle['link']}>
              View profile configuration
            </Link>
          </div>
        </div>

        {/* When the width of page is larger and equal to 1300px */}
        <div className={`${mainStyle['radio-container']} ${tband ? mainStyle['radio-container--tband'] : ''}`}>
          <div className={mainStyle['header']}></div>
          <div className={mainStyle['header']}>2.4 GHz</div>
          <div className={mainStyle['header']}>5 GHz</div>
          {tband && (<div className={mainStyle['header']}>52 GHz</div>)}

          {/* Radio */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Radio</div>
          <div className={mainStyle['item']}>
            {
              isNotStandalone ? (
                <>
                  <div>{form['profile'][0].radio ? 'Enable' : 'Disable'}</div>
                </>
              ) : (
                <>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="radio-0-enable"
                      label="Enable"
                      hasRightMargin={true}
                      checked={form['device'][0].radio.value}
                      onChange={() => changeValue(0, 'radio', true)}
                    />
                    <RadioButton
                      id="radio-0-disable"
                      label="Disable"
                      checked={!form['device'][0].radio.value}
                      onChange={() => changeValue(0, 'radio', false)}
                    />
                  </div>
                </>
              )
            }
          </div>
          <div className={mainStyle['item']}>
            {
              isNotStandalone ? (
                <>
                  <div>{form['profile'][1].radio ? 'Enabled' : 'Disabled'}</div>
                </>
              ) : (
                <>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="radio-1-enable"
                      label="Enable"
                      hasRightMargin={true}
                      checked={form['device'][1].radio.value}
                      onChange={() => changeValue(1, 'radio', true)}
                    />
                    <RadioButton
                      id="radio-1-disable"
                      label="Disable"
                      checked={!form['device'][1].radio.value}
                      onChange={() => changeValue(1, 'radio', false)}
                    />
                  </div>
                </>
              )
            }
          </div>
          {tband && (<>-</>)}

          {/* Radio mode */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Radio mode</div>
          <div className={mainStyle['item']}>
            {
              isNotStandalone ? (
                <>
                  <div>{form['profile'][0].radioMode.selected.title}</div>
                </>
              ) : (
                <>
                  <DropdownWithItem
                    id="radio-mode-0"
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form['device'][0].radioMode.selected}
                    itemList={form['device'][0].radioMode.list}
                    onClick={radioMode => changeValue(0, 'radioMode', radioMode)}
                  />
                </>
              )
            }
          </div>
          <div className={mainStyle['item']}>
            {
              isNotStandalone ? (
                <>
                  <div>{form['profile'][1].radioMode.selected.title}</div>
                </>
              ) : (
                <>
                  <DropdownWithItem
                    id="radio-mode-1"
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form['device'][1].radioMode.selected}
                    itemList={form['device'][1].radioMode.list}
                    onClick={radioMode => changeValue(1, 'radioMode', radioMode)}
                  />
                </>
              )
            }
          </div>
          {tband && (<>-</>)}

          {/* Channels bandwidth */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Channels bandwidth</div>
          <div className={mainStyle['item']}>{
            isNotStandalone ? (
              <>
                <div>{form['profile'][0].channelsBandwidth.selected.title}</div>
              </>
            ) : (
              <>
                <DropdownWithItem
                  id="channels-bandwidth-0"
                  type="normal"
                  isMiddleSize={true}
                  selectedItem={form['device'][0].channelsBandwidth.selected}
                  itemList={form['device'][0].channelsBandwidth.list}
                  onClick={channelBandwidth => changeValue(0, 'channelsBandwidth', channelBandwidth)}
                />
              </>
            )
          }
          </div>
          <div className={mainStyle['item']}>
            {
              isNotStandalone ? (
                <>
                  <div>{form['profile'][1].channelsBandwidth.selected.title}</div>
                </>
              ) : (
                <>
                  <DropdownWithItem
                    id="channels-bandwidth-1"
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form['device'][1].channelsBandwidth.selected}
                    itemList={form['device'][1].channelsBandwidth.list}
                    onClick={channelBandwidth => changeValue(1, 'channelsBandwidth', channelBandwidth)}
                  />
                </>
              )
            }
          </div>
          {tband && (<>-</>)}

          {/* Tx power */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Tx power</div>
          <div className={mainStyle['item']}>
            {
              isNotStandalone ? (
                <>
                  <div>{form['profile'][0].txPower.value} %</div>
                </>
              ) : (
                <>
                  <div className='form-field form-field--horizontal'>
                    <Input
                      type="number"
                      isMiddleSize={true}
                      placeholder="2-100"
                      autoComplete="new-email"
                      value={form['device'][0].txPower.value}
                      onChange={e => changeValue(0, 'txPower', e.target.value)}
                    />
                    <div>%</div>
                  </div>
                </>
              )
            }
          </div>
          <div className={mainStyle['item']}>
            {
              isNotStandalone ? (
                <>
                  <div>{form['profile'][1].txPower.value} %</div>
                </>
              ) : (
                <>
                  <div className='form-field form-field--horizontal'>
                    <Input
                      type="number"
                      isMiddleSize={true}
                      placeholder="2-100"
                      autoComplete="new-email"
                      value={form['device'][1].txPower.value}
                      onChange={e => changeValue(1, 'txPower', e.target.value)}
                    />
                    <div>%</div>
                  </div>

                </>
              )
            }
          </div>
          {tband && (<>-</>)}

          {/* Auto channel */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Auto channel</div>
          <div className={mainStyle['item']}>
            {
              isNotStandalone ? (
                <>
                  <div>{form['profile'][0].autoChannel.value ? 'Enabled' : 'Disabled'}</div>
                </>
              ) : (
                <>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="auto-channel-0-enable"
                      label="Enable"
                      hasRightMargin={true}
                      checked={form['device'][0].autoChannel.value}
                      onChange={() => changeValue(0, 'autoChannel', true)}

                    />
                    <RadioButton
                      id="auto-channel-0-disable"
                      label="Disable"
                      checked={!form['device'][0].autoChannel.value}
                      onChange={() => changeValue(0, 'autoChannel', false)}
                    />
                  </div>
                </>
              )
            }
          </div>
          <div className={mainStyle['item']}>
            {
              isNotStandalone ? (
                <>
                  <div>{form['profile'][1].autoChannel.value ? 'Enabled' : 'Disabled'}</div>
                </>
              ) : (
                <>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="auto-channel-1-enable"
                      label="Enable"
                      hasRightMargin={true}
                      checked={form['device'][1].autoChannel.value}
                      onChange={() => changeValue(1, 'autoChannel', true)}
                    />
                    <RadioButton
                      id="auto-channel-1-disable"
                      label="Disable"
                      checked={!form['device'][1].autoChannel.value}
                      onChange={() => changeValue(1, 'autoChannel', false)}
                    />
                  </div>
                </>
              )
            }
          </div>
          {tband && (<>-</>)}

          {/* Channel */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Channel</div>
          <div className={mainStyle['item']}>
            {
              isNotStandalone ? (
                <>
                  <div>
                    {
                      form['profile'][0].autoChannel.value ? (
                        <>
                          <div>Auto</div>
                        </>
                      ) : (
                        <>
                          <div>{form['device'][0].channel.selected.title}</div>
                        </>
                      )
                    }
                  </div>
                </>
              ) : (
                <>
                  {
                    form['device'][0].autoChannel.value ? (
                      <>
                        <div>Auto</div>
                      </>
                    ) : (
                      <>
                        <DropdownWithItem
                          id="channels-0"
                          type="normal"
                          isMiddleSize={true}
                          disabled={form['device'][0].autoChannel.value}
                          selectedItem={form['device'][0].channel.selected}
                          itemList={form['device'][0].channel.list}
                          onClick={channel => changeValue(0, 'channel', channel)}
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
              isNotStandalone ? (
                <>
                  <div>
                    {
                      form['profile'][1].autoChannel.value ? (
                        <>
                          <div>Auto</div>
                        </>
                      ) : (
                        <>
                          <div>{form['device'][1].channel.selected.title}</div>
                        </>
                      )
                    }
                  </div>
                </>
              ) : (
                <>
                  {
                    form['device'][1].autoChannel.value ? (
                      <>
                        <div>Auto</div>
                      </>
                    ) : (
                      <>
                        <DropdownWithItem
                          id="channels-1"
                          type="normal"
                          isMiddleSize={true}
                          disabled={form['device'][1].autoChannel.value}
                          selectedItem={form['device'][1].channel.selected}
                          itemList={form['device'][1].channel.list}
                          onClick={channel => changeValue(1, 'channel', channel)}
                        />
                      </>
                    )
                  }
                </>
              )
            }
          </div>
          {tband && (<>-</>)}

          {/* Eligible channels */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>
            Eligible channels
            <TooltipDialog
              className="ms-1 me-1"
              placement="right"
              title="Operating your network may require complying with local regulations. Nuclias filters your available sites to help you comply."
            />
          </div>
          <div className={mainStyle['item']}>
            <div className={`${mainStyle['field-td']} ${mainStyle['td--eligible-channel']}`}>
              <div className={mainStyle['top']}>
                {
                  isNotStandalone && form['profile'][0].eligibleChannels.map((channel, index) => {
                    return (
                      <div
                        key={`eligible-channel-0-${index}`}
                        className={`
                            ${mainStyle['box']}
                            ${!isNotStandalone && channel.value && mainStyle['selected-box']}
                            ${(isNotStandalone || !form['profile'][0].autoChannel.value) && mainStyle['disabled-box']}
                          `}
                      >
                        {channel.channel}
                      </div>
                    )
                  })
                }
                {
                  !isNotStandalone && form['device'][0].eligibleChannels.map((channel, index) => {
                    return (
                      <div
                        key={`eligible-channel-0-${index}`}
                        className={`
                            ${mainStyle['box']}
                            ${!isNotStandalone && channel.value && mainStyle['selected-box']}
                            ${(isNotStandalone || !form['device'][0].autoChannel.value) && mainStyle['disabled-box']}
                          `}
                        onClick={() => changeEligibleChannels(0, index)}
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
                  isNotStandalone && form['profile'][1].eligibleChannels.map((channel, index) => {
                    return (
                      <div
                        key={`eligible-channel-1-${index}`}
                        className={`
                            ${mainStyle['box']}
                            ${!isNotStandalone && channel.value && mainStyle['selected-box']}
                            ${(isNotStandalone || !form['profile'][1].autoChannel.value) && mainStyle['disabled-box']}
                          `}
                      >
                        {channel.channel}
                      </div>
                    )
                  })
                }
                {
                  !isNotStandalone && form['device'][1].eligibleChannels.map((channel, index) => {
                    return (
                      <div
                        key={`eligible-channel-1-${index}`}
                        className={`
                            ${mainStyle['box']}
                            ${!isNotStandalone && channel.value && mainStyle['selected-box']}
                            ${(isNotStandalone || !form['device'][1].autoChannel.value) && mainStyle['disabled-box']}
                          `}
                        onClick={() => changeEligibleChannels(1, index)}
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
          {tband && (<>-</>)}

          {/* Site country */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Site country</div>
          <div className={mainStyle['item']}>
            {form['profile'][0].siteCountry.value}
          </div>
          <div className={mainStyle['item']}>
            {form['profile'][1].siteCountry.value}
          </div>
          {tband && (<>-</>)}

          {/* Force auto channel scan */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Force auto channel scan</div>
          <div className={mainStyle['item']}>
            {
              isNotStandalone ? (
                <>
                  {form['profile'][0].forceAutoChannelScan.value ? 'Enabled' : 'Disabled'}
                </>
              ) : (
                <>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="force-auto-channel-scan-0-enable"
                      label="Enable"
                      hasRightMargin={true}
                      disabled={!form['device'][0].autoChannel.value}
                      checked={form['device'][0].forceAutoChannelScan.value}
                      onChange={() => changeValue(0, 'forceAutoChannelScan', true)}
                    />
                    <RadioButton
                      id="force-auto-channel-scan-0-disable"
                      label="Disable"
                      disabled={!form['device'][0].autoChannel.value}
                      checked={!form['device'][0].forceAutoChannelScan.value}
                      onChange={() => changeValue(0, 'forceAutoChannelScan', false)}
                    />
                  </div>
                </>
              )
            }
          </div>
          <div className={mainStyle['item']}>
            {
              isNotStandalone ? (
                <>
                  {form['profile'][1].forceAutoChannelScan.value ? 'Enabled' : 'Disabled'}
                </>
              ) : (
                <>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="force-auto-channel-scan-1-enable"
                      label="Enable"
                      hasRightMargin={true}
                      disabled={!form['device'][1].autoChannel.value}
                      checked={form['device'][1].forceAutoChannelScan.value}
                      onChange={() => changeValue(1, 'forceAutoChannelScan', true)}
                    />
                    <RadioButton
                      id="force-auto-channel-scan-1-disable"
                      label="Disable"
                      disabled={!form['device'][1].autoChannel.value}
                      checked={!form['device'][1].forceAutoChannelScan.value}
                      onChange={() => changeValue(1, 'forceAutoChannelScan', false)}
                    />
                  </div>
                </>
              )
            }
          </div>
          {tband && (<>-</>)}

          {/* Auto channel interval */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Auto channel interval</div>
          <div className={mainStyle['item']}>
            {
              isNotStandalone ? (
                <>
                  {form['profile'][0].autoChannelInterval.value} hours
                </>
              ) : (
                <>
                  <div className='form-field form-field--horizontal'>
                    <Input
                      type="number"
                      isMiddleSize={true}
                      placeholder="6-24"
                      autoComplete="new-email"
                      disabled={!form['device'][0].autoChannel.value}
                      value={form['device'][0].autoChannelInterval.value}
                      onChange={(e) => changeValue(0, 'autoChannelInterval', e.target.value)}
                    />
                    <div>hours</div>
                  </div>
                </>
              )
            }
          </div>
          <div className={mainStyle['item']}>
            {
              isNotStandalone ? (
                <>
                  {form['profile'][1].autoChannelInterval.value} hours
                </>
              ) : (
                <>
                  <div className='form-field form-field--horizontal'>
                    <Input
                      type="number"
                      isMiddleSize={true}
                      placeholder="6-24"
                      autoComplete="new-email"
                      disabled={!form['device'][1].autoChannel.value}
                      value={form['device'][1].autoChannelInterval.value}
                      onChange={(e) => changeValue(1, 'autoChannelInterval', e.target.value)}
                    />
                    <div>hours</div>
                  </div>
                </>
              )
            }
          </div>
          {tband && (<>-</>)}

          {/* Run auto channel */}
          {
            !isNotStandalone && (
              <>
                <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Run auto channel</div>
                <div className={mainStyle['item']}>
                  <Button
                    label="Run auto channel now"
                    className='white-button'
                    onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, true)}
                  />
                </div>
                <div className={mainStyle['item']}>
                  <Button
                    label="Run auto channel now"
                    className='white-button'
                    onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, true)}
                  />
                </div>
                {tband && (<>-</>)}
              </>
            )
          }

          {/* SSID isolation */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']} ${mainStyle['last-item']}`}>SSID isolation</div>
          <div className={`${mainStyle['item']} ${mainStyle['last-item']}`}>
            {
              isNotStandalone ? (
                <>
                  {form['profile'][0].ssidIsolation.value ? 'Enabled' : 'Disabled'}
                </>
              ) : (
                <>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="ssid-isolation-0-enable"
                      label="Enable"
                      hasRightMargin={true}
                      checked={form['device'][0].ssidIsolation.value}
                      onChange={(e) => changeValue(0, 'ssidIsolation', true)}
                    />
                    <RadioButton
                      id="ssid-isolation-0-disable"
                      label="Disable"
                      checked={!form['device'][0].ssidIsolation.value}
                      onChange={(e) => changeValue(0, 'ssidIsolation', false)}
                    />
                  </div>
                </>
              )
            }
          </div>
          <div className={`${mainStyle['item']} ${mainStyle['last-item']}`}>
          </div>
          {tband && (<>-</>)}
        </div>

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
                <div className={mainStyle['td']} style={{ marginRight: '200px' }}>
                  Radio
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        <div>{form['profile'][0].radio ? 'Enable' : 'Disable'}</div>
                      </>
                    ) : (
                      <>
                        <div className='form-field form-field--horizontal'>
                          <RadioButton
                            id="radio-0-enable"
                            label="Enable"
                            hasRightMargin={true}
                            checked={form['device'][0].radio.value}
                            onChange={() => changeValue(0, 'radio', true)}
                          />
                          <RadioButton
                            id="radio-0-disable"
                            label="Disable"
                            checked={!form['device'][0].radio.value}
                            onChange={() => changeValue(0, 'radio', false)}
                          />
                        </div>
                      </>
                    )
                  }
                </div>
              </td>
            </tr>
            {/* Radio mode */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Radio mode
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        <div>{form['profile'][0].radioMode.selected.title}</div>
                      </>
                    ) : (
                      <>
                        <DropdownWithItem
                          id="radio-mode-0"
                          type="normal"
                          isMiddleSize={true}
                          selectedItem={form['device'][0].radioMode.selected}
                          itemList={form['device'][0].radioMode.list}
                          onClick={radioMode => changeValue(0, 'radioMode', radioMode)}
                        />
                      </>
                    )
                  }
                </div>
              </td>
            </tr>
            {/* Channels bandwidth */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Channels bandwidth
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        <div>{form['profile'][0].channelsBandwidth.selected.title}</div>
                      </>
                    ) : (
                      <>
                        <DropdownWithItem
                          id="channels-bandwidth-0"
                          type="normal"
                          isMiddleSize={true}
                          selectedItem={form['device'][0].channelsBandwidth.selected}
                          itemList={form['device'][0].channelsBandwidth.list}
                          onClick={channelBandwidth => changeValue(0, 'channelsBandwidth', channelBandwidth)}
                        />
                      </>
                    )
                  }
                </div>
              </td>
            </tr>
            {/* Tx power */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Tx power
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        <div>{form['profile'][0].txPower.value} %</div>
                      </>
                    ) : (
                      <>
                        <div className='form-field form-field--horizontal'>
                          <Input
                            type="number"
                            isMiddleSize={true}
                            placeholder="2-100"
                            autoComplete="new-email"
                            value={form['device'][0].txPower.value}
                            onChange={e => changeValue(0, 'txPower', e.target.value)}
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
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Auto channel
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        <div>{form['profile'][0].autoChannel.value ? 'Enabled' : 'Disabled'}</div>
                      </>
                    ) : (
                      <>
                        <div className='form-field form-field--horizontal'>
                          <RadioButton
                            id="auto-channel-0-enable"
                            label="Enable"
                            hasRightMargin={true}
                            checked={form['device'][0].autoChannel.value}
                            onChange={() => changeValue(0, 'autoChannel', true)}

                          />
                          <RadioButton
                            id="auto-channel-0-disable"
                            label="Disable"
                            checked={!form['device'][0].autoChannel.value}
                            onChange={() => changeValue(0, 'autoChannel', false)}
                          />
                        </div>
                      </>
                    )
                  }
                </div>
              </td>
            </tr>
            {/* Channel */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Channel
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        <div>
                          {
                            form['profile'][0].autoChannel.value ? (
                              <>
                                <div>Auto</div>
                              </>
                            ) : (
                              <>
                                <div>{form['device'][0].channel.selected.title}</div>
                              </>
                            )
                          }
                        </div>
                      </>
                    ) : (
                      <>
                        {
                          form['device'][0].autoChannel.value ? (
                            <>
                              <div>Auto</div>
                            </>
                          ) : (
                            <>
                              <DropdownWithItem
                                id="channels-0"
                                type="normal"
                                isMiddleSize={true}
                                disabled={form['device'][0].autoChannel.value}
                                selectedItem={form['device'][0].channel.selected}
                                itemList={form['device'][0].channel.list}
                                onClick={channel => changeValue(0, 'channel', channel)}
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
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Eligible channels
                  <TooltipDialog
                    className="ms-1 me-1"
                    placement="right"
                    title="Operating your network may require complying with local regulations. Nuclias filters your available sites to help you comply."
                  />
                </div>
              </td>
              <td style={{ verticalAlign: 'text-bottom' }}>
                <div className={`${mainStyle['field-td']} ${mainStyle['td--eligible-channel']}`}>
                  <div className={mainStyle['top']}>
                    {
                      isNotStandalone && form['profile'][0].eligibleChannels.map((channel, index) => {
                        return (
                          <div
                            key={`eligible-channel-0-${index}`}
                            className={`
                                    ${mainStyle['box']}
                                    ${!isNotStandalone && channel.value && mainStyle['selected-box']}
                                    ${(isNotStandalone || !form['profile'][0].autoChannel.value) && mainStyle['disabled-box']}
                                  `}
                          >
                            {channel.channel}
                          </div>
                        )
                      })
                    }
                    {
                      !isNotStandalone && form['device'][0].eligibleChannels.map((channel, index) => {
                        return (
                          <div
                            key={`eligible-channel-0-${index}`}
                            className={`
                                    ${mainStyle['box']}
                                    ${!isNotStandalone && channel.value && mainStyle['selected-box']}
                                    ${(isNotStandalone || !form['device'][0].autoChannel.value) && mainStyle['disabled-box']}
                                  `}
                            onClick={() => changeEligibleChannels(0, index)}
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
              </td>
            </tr>
            {/* Site country */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Site country
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {form['profile'][0].siteCountry.value}
                </div>
              </td>
            </tr>
            {/* Force auto channel scan */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Force auto channel scan
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        {form['profile'][0].forceAutoChannelScan.value ? 'Enabled' : 'Disabled'}
                      </>
                    ) : (
                      <>
                        <div className='form-field form-field--horizontal'>
                          <RadioButton
                            id="force-auto-channel-scan-0-enable"
                            label="Enable"
                            hasRightMargin={true}
                            disabled={!form['device'][0].autoChannel.value}
                            checked={form['device'][0].forceAutoChannelScan.value}
                            onChange={() => changeValue(0, 'forceAutoChannelScan', true)}
                          />
                          <RadioButton
                            id="force-auto-channel-scan-0-disable"
                            label="Disable"
                            disabled={!form['device'][0].autoChannel.value}
                            checked={!form['device'][0].forceAutoChannelScan.value}
                            onChange={() => changeValue(0, 'forceAutoChannelScan', false)}
                          />
                        </div>
                      </>
                    )
                  }
                </div>
              </td>
            </tr>
            {/* Auto channel interval */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Auto channel interval
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        {form['profile'][0].autoChannelInterval.value} hours
                      </>
                    ) : (
                      <>
                        <div className='form-field form-field--horizontal'>
                          <Input
                            type="number"
                            isMiddleSize={true}
                            placeholder="6-24"
                            autoComplete="new-email"
                            disabled={!form['device'][0].autoChannel.value}
                            value={form['device'][0].autoChannelInterval.value}
                            onChange={(e) => changeValue(0, 'autoChannelInterval', e.target.value)}
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
              !isNotStandalone && (
                <tr>
                  <td>
                    <div className={mainStyle['td']}>
                      Run auto channel
                    </div>
                  </td>
                  <td>
                    <div className={mainStyle['field-td']}>
                      <Button
                        label="Run auto channel now"
                        className='white-button'
                        style={{ flexGrow: '0' }}
                        onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, true)}
                      />
                    </div>
                  </td>
                </tr>
              )
            }
            {/* SSID isolation */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  SSID isolation
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        {form['profile'][0].ssidIsolation.value ? 'Enabled' : 'Disabled'}
                      </>
                    ) : (
                      <>
                        <div className='form-field form-field--horizontal'>
                          <RadioButton
                            id="ssid-isolation-0-enable"
                            label="Enable"
                            hasRightMargin={true}
                            checked={form['device'][0].ssidIsolation.value}
                            onChange={(e) => changeValue(0, 'ssidIsolation', true)}
                          />
                          <RadioButton
                            id="ssid-isolation-0-disable"
                            label="Disable"
                            checked={!form['device'][0].ssidIsolation.value}
                            onChange={(e) => changeValue(0, 'ssidIsolation', false)}
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
        <Table responsive hover className={`table-container ${mainStyle['not-full-page-content']}`}>
          <thead>
            <tr>
              <th className="th-not-sorting"></th>
              <th className="th-not-sorting">5 GHz</th>
            </tr>
          </thead>
          <tbody>
            {/* Radio */}
            <tr>
              <td>
                <div className={mainStyle['td']} style={{ marginRight: '200px' }}>
                  Radio
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        <div>{form['profile'][1].radio ? 'Enabled' : 'Disabled'}</div>
                      </>
                    ) : (
                      <>
                        <div className='form-field form-field--horizontal'>
                          <RadioButton
                            id="radio-1-enable"
                            label="Enable"
                            hasRightMargin={true}
                            checked={form['device'][1].radio.value}
                            onChange={() => changeValue(1, 'radio', true)}
                          />
                          <RadioButton
                            id="radio-1-disable"
                            label="Disable"
                            checked={!form['device'][1].radio.value}
                            onChange={() => changeValue(1, 'radio', false)}
                          />
                        </div>
                      </>
                    )
                  }
                </div>
              </td>
            </tr>
            {/* Radio mode */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Radio mode
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        <div>{form['profile'][1].radioMode.selected.title}</div>
                      </>
                    ) : (
                      <>
                        <DropdownWithItem
                          id="radio-mode-1"
                          type="normal"
                          isMiddleSize={true}
                          selectedItem={form['device'][1].radioMode.selected}
                          itemList={form['device'][1].radioMode.list}
                          onClick={radioMode => changeValue(1, 'radioMode', radioMode)}
                        />
                      </>
                    )
                  }
                </div>
              </td>
            </tr>
            {/* Channels bandwidth */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Channels bandwidth
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        <div>{form['profile'][1].channelsBandwidth.selected.title}</div>
                      </>
                    ) : (
                      <>
                        <DropdownWithItem
                          id="channels-bandwidth-1"
                          type="normal"
                          isMiddleSize={true}
                          selectedItem={form['device'][1].channelsBandwidth.selected}
                          itemList={form['device'][1].channelsBandwidth.list}
                          onClick={channelBandwidth => changeValue(1, 'channelsBandwidth', channelBandwidth)}
                        />
                      </>
                    )
                  }
                </div>
              </td>
            </tr>
            {/* Tx power */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Tx power
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        <div>{form['profile'][1].txPower.value} %</div>
                      </>
                    ) : (
                      <>
                        <div className='form-field form-field--horizontal'>
                          <Input
                            type="number"
                            isMiddleSize={true}
                            placeholder="2-100"
                            autoComplete="new-email"
                            value={form['device'][1].txPower.value}
                            onChange={e => changeValue(1, 'txPower', e.target.value)}
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
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Auto channel
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        <div>{form['profile'][1].autoChannel.value ? 'Enabled' : 'Disabled'}</div>
                      </>
                    ) : (
                      <>
                        <div className='form-field form-field--horizontal'>
                          <RadioButton
                            id="auto-channel-1-enable"
                            label="Enable"
                            hasRightMargin={true}
                            checked={form['device'][1].autoChannel.value}
                            onChange={() => changeValue(1, 'autoChannel', true)}
                          />
                          <RadioButton
                            id="auto-channel-1-disable"
                            label="Disable"
                            checked={!form['device'][1].autoChannel.value}
                            onChange={() => changeValue(1, 'autoChannel', false)}
                          />
                        </div>
                      </>
                    )
                  }
                </div>
              </td>
            </tr>
            {/* Channel */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Channel
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        <div>
                          {
                            form['profile'][1].autoChannel.value ? (
                              <>
                                <div>Auto</div>
                              </>
                            ) : (
                              <>
                                <div>{form['device'][1].channel.selected.title}</div>
                              </>
                            )
                          }
                        </div>
                      </>
                    ) : (
                      <>
                        {
                          form['device'][1].autoChannel.value ? (
                            <>
                              <div>Auto</div>
                            </>
                          ) : (
                            <>
                              <DropdownWithItem
                                id="channels-1"
                                type="normal"
                                isMiddleSize={true}
                                disabled={form['device'][1].autoChannel.value}
                                selectedItem={form['device'][1].channel.selected}
                                itemList={form['device'][1].channel.list}
                                onClick={channel => changeValue(1, 'channel', channel)}
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
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Eligible channels
                  <TooltipDialog
                    className="ms-1 me-1"
                    placement="right"
                    title="Operating your network may require complying with local regulations. Nuclias filters your available sites to help you comply."
                  />
                </div>
              </td>
              <td style={{ verticalAlign: 'text-bottom' }}>
                <div className={`${mainStyle['field-td']} ${mainStyle['td--eligible-channel']}`}>
                  <div className={mainStyle['top']}>
                    {
                      isNotStandalone && form['profile'][1].eligibleChannels.map((channel, index) => {
                        return (
                          <div
                            key={`eligible-channel-1-${index}`}
                            className={`
                                    ${mainStyle['box']}
                                    ${!isNotStandalone && channel.value && mainStyle['selected-box']}
                                    ${(isNotStandalone || !form['profile'][1].autoChannel.value) && mainStyle['disabled-box']}
                                  `}
                          >
                            {channel.channel}
                          </div>
                        )
                      })
                    }
                    {
                      !isNotStandalone && form['device'][1].eligibleChannels.map((channel, index) => {
                        return (
                          <div
                            key={`eligible-channel-1-${index}`}
                            className={`
                                    ${mainStyle['box']}
                                    ${!isNotStandalone && channel.value && mainStyle['selected-box']}
                                    ${(isNotStandalone || !form['device'][1].autoChannel.value) && mainStyle['disabled-box']}
                                  `}
                            onClick={() => changeEligibleChannels(1, index)}
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
              </td>
            </tr>
            {/* Site country */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Site country
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {form['profile'][1].siteCountry.value}
                </div>
              </td>
            </tr>
            {/* Force auto channel scan */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Force auto channel scan
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        {form['profile'][1].forceAutoChannelScan.value ? 'Enabled' : 'Disabled'}
                      </>
                    ) : (
                      <>
                        <div className='form-field form-field--horizontal'>
                          <RadioButton
                            id="force-auto-channel-scan-1-enable"
                            label="Enable"
                            hasRightMargin={true}
                            disabled={!form['device'][1].autoChannel.value}
                            checked={form['device'][1].forceAutoChannelScan.value}
                            onChange={() => changeValue(1, 'forceAutoChannelScan', true)}
                          />
                          <RadioButton
                            id="force-auto-channel-scan-1-disable"
                            label="Disable"
                            disabled={!form['device'][1].autoChannel.value}
                            checked={!form['device'][1].forceAutoChannelScan.value}
                            onChange={() => changeValue(1, 'forceAutoChannelScan', false)}
                          />
                        </div>
                      </>
                    )
                  }
                </div>
              </td>
            </tr>
            {/* Auto channel interval */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Auto channel interval
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  {
                    isNotStandalone ? (
                      <>
                        {form['profile'][1].autoChannelInterval.value} hours
                      </>
                    ) : (
                      <>
                        <div className='form-field form-field--horizontal'>
                          <Input
                            type="number"
                            isMiddleSize={true}
                            placeholder="6-24"
                            autoComplete="new-email"
                            disabled={!form['device'][1].autoChannel.value}
                            value={form['device'][1].autoChannelInterval.value}
                            onChange={(e) => changeValue(1, 'autoChannelInterval', e.target.value)}
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
              !isNotStandalone && (
                <tr>
                  <td>
                    <div className={mainStyle['td']}>
                      Run auto channel
                    </div>
                  </td>
                  <td>
                    <div className={mainStyle['field-td']}>
                      <Button
                        label="Run auto channel now"
                        style={{ flexGrow: '0' }}
                        className='white-button'
                        onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, true)}
                      />
                    </div>
                  </td>
                </tr>
              )
            }
          </tbody>
        </Table>

        {
          tband && (
            <>
              {/* 5-2 GHz */}
              <Table responsive hover className={`table-container ${mainStyle['not-full-page-content']}`}>
                <thead>
                  <tr>
                    <th className="th-not-sorting"></th>
                    <th className="th-not-sorting">5-2 GHz</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Radio */}
                  <tr>
                    <td>
                      <div className={mainStyle['td']} style={{ marginRight: '200px' }}>
                        Radio
                      </div>
                    </td>
                    <td>
                      <div className={mainStyle['field-td']}>
                        {
                          isNotStandalone ? (
                            <>
                              <div>{form['profile'][1].radio ? 'Enabled' : 'Disabled'}</div>
                            </>
                          ) : (
                            <>
                              <div className='form-field form-field--horizontal'>
                                <RadioButton
                                  id="radio-1-enable"
                                  label="Enable"
                                  hasRightMargin={true}
                                  checked={form['device'][1].radio.value}
                                  onChange={() => changeValue(1, 'radio', true)}
                                />
                                <RadioButton
                                  id="radio-1-disable"
                                  label="Disable"
                                  checked={!form['device'][1].radio.value}
                                  onChange={() => changeValue(1, 'radio', false)}
                                />
                              </div>
                            </>
                          )
                        }
                      </div>
                    </td>
                  </tr>
                  {/* Radio mode */}
                  <tr>
                    <td>
                      <div className={mainStyle['td']}>
                        Radio mode
                      </div>
                    </td>
                    <td>
                      <div className={mainStyle['field-td']}>
                        {
                          isNotStandalone ? (
                            <>
                              <div>{form['profile'][1].radioMode.selected.title}</div>
                            </>
                          ) : (
                            <>
                              <DropdownWithItem
                                id="radio-mode-1"
                                type="normal"
                                isMiddleSize={true}
                                selectedItem={form['device'][1].radioMode.selected}
                                itemList={form['device'][1].radioMode.list}
                                onClick={radioMode => changeValue(1, 'radioMode', radioMode)}
                              />
                            </>
                          )
                        }
                      </div>
                    </td>
                  </tr>
                  {/* Channels bandwidth */}
                  <tr>
                    <td>
                      <div className={mainStyle['td']}>
                        Channels bandwidth
                      </div>
                    </td>
                    <td>
                      <div className={mainStyle['field-td']}>
                        {
                          isNotStandalone ? (
                            <>
                              <div>{form['profile'][1].channelsBandwidth.selected.title}</div>
                            </>
                          ) : (
                            <>
                              <DropdownWithItem
                                id="channels-bandwidth-1"
                                type="normal"
                                isMiddleSize={true}
                                selectedItem={form['device'][1].channelsBandwidth.selected}
                                itemList={form['device'][1].channelsBandwidth.list}
                                onClick={channelBandwidth => changeValue(1, 'channelsBandwidth', channelBandwidth)}
                              />
                            </>
                          )
                        }
                      </div>
                    </td>
                  </tr>
                  {/* Tx power */}
                  <tr>
                    <td>
                      <div className={mainStyle['td']}>
                        Tx power
                      </div>
                    </td>
                    <td>
                      <div className={mainStyle['field-td']}>
                        {
                          isNotStandalone ? (
                            <>
                              <div>{form['profile'][1].txPower.value} %</div>
                            </>
                          ) : (
                            <>
                              <div className='form-field form-field--horizontal'>
                                <Input
                                  type="number"
                                  isMiddleSize={true}
                                  placeholder="2-100"
                                  autoComplete="new-email"
                                  value={form['device'][1].txPower.value}
                                  onChange={e => changeValue(1, 'txPower', e.target.value)}
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
                  <tr>
                    <td>
                      <div className={mainStyle['td']}>
                        Auto channel
                      </div>
                    </td>
                    <td>
                      <div className={mainStyle['field-td']}>
                        {
                          isNotStandalone ? (
                            <>
                              <div>{form['profile'][1].autoChannel.value ? 'Enabled' : 'Disabled'}</div>
                            </>
                          ) : (
                            <>
                              <div className='form-field form-field--horizontal'>
                                <RadioButton
                                  id="auto-channel-1-enable"
                                  label="Enable"
                                  hasRightMargin={true}
                                  checked={form['device'][1].autoChannel.value}
                                  onChange={() => changeValue(1, 'autoChannel', true)}
                                />
                                <RadioButton
                                  id="auto-channel-1-disable"
                                  label="Disable"
                                  checked={!form['device'][1].autoChannel.value}
                                  onChange={() => changeValue(1, 'autoChannel', false)}
                                />
                              </div>
                            </>
                          )
                        }
                      </div>
                    </td>
                  </tr>
                  {/* Channel */}
                  <tr>
                    <td>
                      <div className={mainStyle['td']}>
                        Channel
                      </div>
                    </td>
                    <td>
                      <div className={mainStyle['field-td']}>
                        {
                          isNotStandalone ? (
                            <>
                              <div>
                                {
                                  form['profile'][1].autoChannel.value ? (
                                    <>
                                      <div>Auto</div>
                                    </>
                                  ) : (
                                    <>
                                      <div>{form['device'][1].channel.selected.title}</div>
                                    </>
                                  )
                                }
                              </div>
                            </>
                          ) : (
                            <>
                              {
                                form['device'][1].autoChannel.value ? (
                                  <>
                                    <div>Auto</div>
                                  </>
                                ) : (
                                  <>
                                    <DropdownWithItem
                                      id="channels-1"
                                      type="normal"
                                      isMiddleSize={true}
                                      disabled={form['device'][1].autoChannel.value}
                                      selectedItem={form['device'][1].channel.selected}
                                      itemList={form['device'][1].channel.list}
                                      onClick={channel => changeValue(1, 'channel', channel)}
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
                  <tr>
                    <td>
                      <div className={mainStyle['td']}>
                        Eligible channels
                        <TooltipDialog
                          className="ms-1 me-1"
                          placement="right"
                          title="Operating your network may require complying with local regulations. Nuclias filters your available sites to help you comply."
                        />
                      </div>
                    </td>
                    <td style={{ verticalAlign: 'text-bottom' }}>
                      <div className={`${mainStyle['field-td']} ${mainStyle['td--eligible-channel']}`}>
                        <div className={mainStyle['top']}>
                          {
                            isNotStandalone && form['profile'][1].eligibleChannels.map((channel, index) => {
                              return (
                                <div
                                  key={`eligible-channel-1-${index}`}
                                  className={`
                                    ${mainStyle['box']}
                                    ${!isNotStandalone && channel.value && mainStyle['selected-box']}
                                    ${(isNotStandalone || !form['profile'][1].autoChannel.value) && mainStyle['disabled-box']}
                                  `}
                                >
                                  {channel.channel}
                                </div>
                              )
                            })
                          }
                          {
                            !isNotStandalone && form['device'][1].eligibleChannels.map((channel, index) => {
                              return (
                                <div
                                  key={`eligible-channel-1-${index}`}
                                  className={`
                                    ${mainStyle['box']}
                                    ${!isNotStandalone && channel.value && mainStyle['selected-box']}
                                    ${(isNotStandalone || !form['device'][1].autoChannel.value) && mainStyle['disabled-box']}
                                  `}
                                  onClick={() => changeEligibleChannels(1, index)}
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
                    </td>
                  </tr>
                  {/* Site country */}
                  <tr>
                    <td>
                      <div className={mainStyle['td']}>
                        Site country
                      </div>
                    </td>
                    <td>
                      <div className={mainStyle['field-td']}>
                        {form['profile'][1].siteCountry.value}
                      </div>
                    </td>
                  </tr>
                  {/* Force auto channel scan */}
                  <tr>
                    <td>
                      <div className={mainStyle['td']}>
                        Force auto channel scan
                      </div>
                    </td>
                    <td>
                      <div className={mainStyle['field-td']}>
                        {
                          isNotStandalone ? (
                            <>
                              {form['profile'][1].forceAutoChannelScan.value ? 'Enabled' : 'Disabled'}
                            </>
                          ) : (
                            <>
                              <div className='form-field form-field--horizontal'>
                                <RadioButton
                                  id="force-auto-channel-scan-1-enable"
                                  label="Enable"
                                  hasRightMargin={true}
                                  disabled={!form['device'][1].autoChannel.value}
                                  checked={form['device'][1].forceAutoChannelScan.value}
                                  onChange={() => changeValue(1, 'forceAutoChannelScan', true)}
                                />
                                <RadioButton
                                  id="force-auto-channel-scan-1-disable"
                                  label="Disable"
                                  disabled={!form['device'][1].autoChannel.value}
                                  checked={!form['device'][1].forceAutoChannelScan.value}
                                  onChange={() => changeValue(1, 'forceAutoChannelScan', false)}
                                />
                              </div>
                            </>
                          )
                        }
                      </div>
                    </td>
                  </tr>
                  {/* Auto channel interval */}
                  <tr>
                    <td>
                      <div className={mainStyle['td']}>
                        Auto channel interval
                      </div>
                    </td>
                    <td>
                      <div className={mainStyle['field-td']}>
                        {
                          isNotStandalone ? (
                            <>
                              {form['profile'][1].autoChannelInterval.value} hours
                            </>
                          ) : (
                            <>
                              <div className='form-field form-field--horizontal'>
                                <Input
                                  type="number"
                                  isMiddleSize={true}
                                  placeholder="6-24"
                                  autoComplete="new-email"
                                  disabled={!form['device'][1].autoChannel.value}
                                  value={form['device'][1].autoChannelInterval.value}
                                  onChange={(e) => changeValue(1, 'autoChannelInterval', e.target.value)}
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
                    !isNotStandalone && (
                      <tr>
                        <td>
                          <div className={mainStyle['td']}>
                            Run auto channel
                          </div>
                        </td>
                        <td>
                          <div className={mainStyle['field-td']}>
                            <Button
                              label="Run auto channel now"
                              style={{ flexGrow: '0' }}
                              className='white-button'
                              onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, true)}
                            />
                          </div>
                        </td>
                      </tr>
                    )
                  }
                </tbody>
              </Table>
            </>
          )
        }

        <div className='apply-btn-group'>
          {
            !isNotStandalone && (
              <Button
                label='Cancel'
                className='btn-cancel me-3'
                onClick={() => { console.log('Click on Cancel') }}
              />
            )
          }
          <Button
            label='Apply'
            className='btn-submit'
            onClick={() => pushToDevice()}
          />
        </div>
      </div >

      <RunAutoChannelModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </>
  );
}

export default Radio;