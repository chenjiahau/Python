import mainStyle from '../radio.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { cloneDeep, isArray, isObject } from 'lodash';

// Component
import { RadioButton, TooltipDialog, DropdownWithItem, Input, Button } from 'components/';
import RunAutoChannelModal from '../RunAutoChannelModal';

// Context
import DataContext from '../../../DataContext';

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

const Channel = () => {
  // Faker data
  const fakerRadio = generateRadio()['profile'];

  const ctx = useContext(DataContext);

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [form, setForm] = useState();

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeValue = (ratio, field, value) => {
    const updatedForm = cloneDeep(form);

    if (!updatedForm[ratio][field].hasOwnProperty('list')) {
      updatedForm[ratio][field].value = value;
    } else {
      for (const item of updatedForm[ratio][field].list) {
        if (item.title !== value.title) {
          item.hasOwnProperty('isActive') && (item.isActive = false);
        } else {
          item.hasOwnProperty('isActive') && (item.isActive = true);
          item.hasOwnProperty('checked') && (item.checked = !item.checked);
          updatedForm[ratio][field].selected = item;
        }
      }
    }

    setForm(updatedForm);
  }

  const changeEligibleChannels = (ratio, index) => {
    const updatedForm = cloneDeep(form);
    updatedForm[ratio].eligibleChannels[index].value = !updatedForm[ratio].eligibleChannels[index].value;
    setForm(updatedForm);
  }

  useEffect(() => {
    const data = [];
    for (const item of fakerRadio) {
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

      data.push(childData);
    }

    setForm(data);
    ctx.updateRadioChannel(data);
    ctx.updateChangedRadioChannel(data);
  }, []);

  useEffect(() => {
    ctx.updateChangedRadioChannel(form);
  }, [form]);

  if (!form) {
    return
  }

  return (
    <>
      <div className="tab-container-border">
        <div className={`${mainStyle['radio-container']} ${mainStyle['radio-container--channel']}`}>
          <div className={mainStyle['header']}></div>
          <div className={mainStyle['header']}>2.4 GHz</div>
          <div className={mainStyle['header']}>5 GHz</div>

          {/* Auto channel */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Auto channel</div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <RadioButton
                id="auto-channel-0-enable"
                label="Enable"
                hasRightMargin={true}
                checked={form[0].autoChannel.value}
                onChange={() => changeValue(0, 'autoChannel', true)}

              />
              <RadioButton
                id="auto-channel-0-disable"
                label="Disable"
                checked={!form[0].autoChannel.value}
                onChange={() => changeValue(0, 'autoChannel', false)}
              />
            </div>
          </div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <RadioButton
                id="auto-channel-1-enable"
                label="Enable"
                hasRightMargin={true}
                checked={form[1].autoChannel.value}
                onChange={() => changeValue(1, 'autoChannel', true)}
              />
              <RadioButton
                id="auto-channel-1-disable"
                label="Disable"
                checked={!form[1].autoChannel.value}
                onChange={() => changeValue(1, 'autoChannel', false)}
              />
            </div>
          </div>

          {/* Channel */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Channel</div>
          <div className={mainStyle['item']}>
            {
              form[0].autoChannel.value ? (
                <>
                  <div>Auto</div>
                </>
              ) : (
                <>
                  <DropdownWithItem
                    id="channels-0"
                    type="normal"
                    isMiddleSize={true}
                    disabled={form[0].autoChannel.value}
                    selectedItem={form[0].channel.selected}
                    itemList={form[0].channel.list}
                    onClick={channel => changeValue(0, 'channel', channel)}
                  />
                </>
              )
            }
          </div>
          <div className={mainStyle['item']}>
            {
              form[1].autoChannel.value ? (
                <>
                  <div>Auto</div>
                </>
              ) : (
                <>
                  <DropdownWithItem
                    id="channels-1"
                    type="normal"
                    isMiddleSize={true}
                    disabled={form[1].autoChannel.value}
                    selectedItem={form[1].channel.selected}
                    itemList={form[1].channel.list}
                    onClick={channel => changeValue(1, 'channel', channel)}
                  />
                </>
              )
            }
          </div>

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
                  form[0].eligibleChannels.map((channel, index) => {
                    return (
                      <div
                        key={`eligible-channel-0-${index}`}
                        className={`${mainStyle['box']} ${channel.value && mainStyle['selected-box']} ${!form[0].autoChannel.value && mainStyle['disabled-box']}`}
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
                  form[1].eligibleChannels.map((channel, index) => {
                    return (
                      <div
                        key={`eligible-channel-1-${index}`}
                        className={`${mainStyle['box']} ${channel.value && mainStyle['selected-box']} ${!form[1].autoChannel.value && mainStyle['disabled-box']}`}
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

          {/* Force auto channel scan */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Force auto channel scan</div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <RadioButton
                id="force-auto-channel-scan-0-enable"
                label="Enable"
                hasRightMargin={true}
                disabled={!form[0].autoChannel.value}
                checked={form[0].forceAutoChannelScan.value}
                onChange={() => changeValue(0, 'forceAutoChannelScan', true)}
              />
              <RadioButton
                id="force-auto-channel-scan-0-disable"
                label="Disable"
                disabled={!form[0].autoChannel.value}
                checked={!form[0].forceAutoChannelScan.value}
                onChange={() => changeValue(0, 'forceAutoChannelScan', false)}
              />
            </div>
          </div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <RadioButton
                id="force-auto-channel-scan-1-enable"
                label="Enable"
                hasRightMargin={true}
                disabled={!form[1].autoChannel.value}
                checked={form[1].forceAutoChannelScan.value}
                onChange={() => changeValue(1, 'forceAutoChannelScan', true)}
              />
              <RadioButton
                id="force-auto-channel-scan-1-disable"
                label="Disable"
                disabled={!form[1].autoChannel.value}
                checked={!form[1].forceAutoChannelScan.value}
                onChange={() => changeValue(1, 'forceAutoChannelScan', false)}
              />
            </div>
          </div>

          {/* Auto channel interval */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Auto channel interval</div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <Input
                type="number"
                isMiddleSize={true}
                placeholder="6-24"
                autoComplete="new-email"
                disabled={!form[0].autoChannel.value}
                value={form[0].autoChannelInterval.value}
                onChange={(e) => changeValue(0, 'autoChannelInterval', e.target.value)}
              />
              <div>hours</div>
            </div>
          </div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <Input
                type="number"
                isMiddleSize={true}
                placeholder="6-24"
                autoComplete="new-email"
                disabled={!form[1].autoChannel.value}
                value={form[1].autoChannelInterval.value}
                onChange={(e) => changeValue(1, 'autoChannelInterval', e.target.value)}
              />
              <div>hours</div>
            </div>
          </div>

          {/* Run auto channel */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']} ${mainStyle['last-item']}`}>Run auto channel</div>
          <div className={`${mainStyle['item']} ${mainStyle['last-item']}`}>
            <Button
              label="Run auto channel now"
              className='white-button'
              style={{ flexGrow: '0' }}
              disabled={!form[0].autoChannel.value}
              onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, true)}
            />
          </div>
          <div className={`${mainStyle['item']} ${mainStyle['last-item']}`}>
            <Button
              label="Run auto channel now"
              className='white-button'
              style={{ flexGrow: '0' }}
              disabled={!form[1].autoChannel.value}
              onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, true)}
            />
          </div>
        </div>

        {/* When page width is small than 1300px */}
        {/* 2.4 GHz */}
        <Table responsive hover className={`table-container overwrite-table ${mainStyle['not-full-page-content']}`}>
          <thead>
            <tr>
              <th className="th-not-sorting"></th>
              <th className="th-not-sorting">2.4 GHz</th>
            </tr>
          </thead>
          <tbody>
            {/* Auto channel */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Auto channel
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="auto-channel-0-enable"
                      label="Enable"
                      hasRightMargin={true}
                      checked={form[0].autoChannel.value}
                      onChange={() => changeValue(0, 'autoChannel', true)}

                    />
                    <RadioButton
                      id="auto-channel-0-disable"
                      label="Disable"
                      checked={!form[0].autoChannel.value}
                      onChange={() => changeValue(0, 'autoChannel', false)}
                    />
                  </div>
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
                    form[0].autoChannel.value ? (
                      <>
                        <div>Auto</div>
                      </>
                    ) : (
                      <>
                        <DropdownWithItem
                          id="channels-0"
                          type="normal"
                          isMiddleSize={true}
                          disabled={form[0].autoChannel.value}
                          selectedItem={form[0].channel.selected}
                          itemList={form[0].channel.list}
                          onClick={channel => changeValue(0, 'channel', channel)}
                        />
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
                      form[0].eligibleChannels.map((channel, index) => {
                        return (
                          <div
                            key={`eligible-channel-0-${index}`}
                            className={`${mainStyle['box']} ${channel.value && mainStyle['selected-box']} ${!form[0].autoChannel.value && mainStyle['disabled-box']}`}
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
            {/* Force auto channel scan */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Force auto channel scan
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="force-auto-channel-scan-0-enable"
                      label="Enable"
                      hasRightMargin={true}
                      disabled={!form[0].autoChannel.value}
                      checked={form[0].forceAutoChannelScan.value}
                      onChange={() => changeValue(0, 'forceAutoChannelScan', true)}
                    />
                    <RadioButton
                      id="force-auto-channel-scan-0-disable"
                      label="Disable"
                      disabled={!form[0].autoChannel.value}
                      checked={!form[0].forceAutoChannelScan.value}
                      onChange={() => changeValue(0, 'forceAutoChannelScan', false)}
                    />
                  </div>
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
                  <div className='form-field form-field--horizontal'>
                    <Input
                      type="number"
                      isMiddleSize={true}
                      placeholder="6-24"
                      autoComplete="new-email"
                      disabled={!form[0].autoChannel.value}
                      value={form[0].autoChannelInterval.value}
                      onChange={(e) => changeValue(0, 'autoChannelInterval', e.target.value)}
                    />
                    <div>hours</div>
                  </div>
                </div>
              </td>
            </tr>
            {/* Run auto channel */}
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
                    disabled={!form[0].autoChannel.value}
                    onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, true)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>

        {/* 5 GHz */}
        <Table responsive striped hover className={`table-container ${mainStyle['not-full-page-content']}`}>
          <thead>
            <tr>
              <th className="th-not-sorting"></th>
              <th className="th-not-sorting">5 GHz</th>
            </tr>
          </thead>
          <tbody>
            {/* Auto channel */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Auto channel
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="auto-channel-1-enable"
                      label="Enable"
                      hasRightMargin={true}
                      checked={form[1].autoChannel.value}
                      onChange={() => changeValue(1, 'autoChannel', true)}
                    />
                    <RadioButton
                      id="auto-channel-1-disable"
                      label="Disable"
                      checked={!form[1].autoChannel.value}
                      onChange={() => changeValue(1, 'autoChannel', false)}
                    />
                  </div>
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
                    form[1].autoChannel.value ? (
                      <>
                        <div>Auto</div>
                      </>
                    ) : (
                      <>
                        <DropdownWithItem
                          id="channels-1"
                          type="normal"
                          isMiddleSize={true}
                          disabled={form[1].autoChannel.value}
                          selectedItem={form[1].channel.selected}
                          itemList={form[1].channel.list}
                          onClick={channel => changeValue(1, 'channel', channel)}
                        />
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
                      form[1].eligibleChannels.map((channel, index) => {
                        return (
                          <div
                            key={`eligible-channel-1-${index}`}
                            className={`${mainStyle['box']} ${channel.value && mainStyle['selected-box']} ${!form[1].autoChannel.value && mainStyle['disabled-box']}`}
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
            {/* Force auto channel scan */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Force auto channel scan
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="force-auto-channel-scan-1-enable"
                      label="Enable"
                      hasRightMargin={true}
                      disabled={!form[1].autoChannel.value}
                      checked={form[1].forceAutoChannelScan.value}
                      onChange={() => changeValue(1, 'forceAutoChannelScan', true)}
                    />
                    <RadioButton
                      id="force-auto-channel-scan-1-disable"
                      label="Disable"
                      disabled={!form[1].autoChannel.value}
                      checked={!form[1].forceAutoChannelScan.value}
                      onChange={() => changeValue(1, 'forceAutoChannelScan', false)}
                    />
                  </div>
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
                  <div className='form-field form-field--horizontal'>
                    <Input
                      type="number"
                      isMiddleSize={true}
                      placeholder="6-24"
                      autoComplete="new-email"
                      disabled={!form[1].autoChannel.value}
                      value={form[1].autoChannelInterval.value}
                      onChange={(e) => changeValue(1, 'autoChannelInterval', e.target.value)}
                    />
                    <div>hours</div>
                  </div>
                </div>
              </td>
            </tr>
            {/* Run auto channel */}
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
                    disabled={!form[1].autoChannel.value}
                    onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, true)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </Table>

        <div className='apply-btn-group'>
          <Button
            label='Cancel'
            className='btn-cancel me-3'
            onClick={() => { console.log('Click on Cancel') }}
          />
          <Button
            label='Save'
            className='btn-submit'
            onClick={() => { }}
          />
        </div>
      </div>

      <RunAutoChannelModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </>
  )
}

export default Channel;