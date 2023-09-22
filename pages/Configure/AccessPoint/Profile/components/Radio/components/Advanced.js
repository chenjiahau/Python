import mainStyle from '../radio.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { cloneDeep, isArray, isObject } from 'lodash';

// Component
import { RadioButton, TooltipDialog, DropdownWithItem, Input, Button } from 'components/';

// Context
import DataContext from '../../../DataContext';

// Dummy data & util
import { generateRadio } from 'dummy/data/radio';

// Default variable

const Channel = () => {
  // Faker data
  const fakerRadio = generateRadio()['profile'];

  const ctx = useContext(DataContext);

  // State
  const [form, setForm] = useState();

  // Method
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
      childData['multicastRate'] = { selected: cloneDeep(item['multicastRate']), list: cloneDeep(item['multicastRateList']) };

      data.push(childData);
    }

    setForm(data);
    ctx.updateRadioAdvanced(data);
    ctx.updateChangedRadioAdvanced(data);
  }, []);

  useEffect(() => {
    ctx.updateChangedRadioAdvanced(form);
  }, [form]);

  if (!form) {
    return
  }

  return (
    <>
      <div className="tab-container-border">
        <div className={`${mainStyle['radio-container']} ${mainStyle['radio-container--advanced']}`}>
          <div className={mainStyle['header']}></div>
          <div className={mainStyle['header']}>2.4 GHz</div>
          <div className={mainStyle['header']}>5 GHz</div>

          {/* Multicast rate */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Multicast rate</div>
          <div className={mainStyle['item']}>
            <DropdownWithItem
              id="multicast-rate-mode-0"
              type="normal"
              isMiddleSize={true}
              selectedItem={form[0].multicastRate.selected}
              itemList={form[0].multicastRate.list}
              onClick={multicastRate => changeValue(0, 'multicastRate', multicastRate)}
            />
          </div>
          <div className={mainStyle['item']}>
            <DropdownWithItem
              id="multicast-rate-mode-1"
              type="normal"
              isMiddleSize={true}
              selectedItem={form[1].multicastRate.selected}
              itemList={form[1].multicastRate.list}
              onClick={multicastRate => changeValue(1, 'multicastRate', multicastRate)}
            />
          </div>

          {/* Beacon interval */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Beacon interval</div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <Input
                type="number"
                isMiddleSize={true}
                placeholder="40-3500"
                autoComplete="new-email"
                value={form[0].beaconInterval.value}
                onChange={e => changeValue(0, 'beaconInterval', e.target.value)}
              />
              <div>milliseconds</div>
            </div>
          </div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <Input
                type="number"
                isMiddleSize={true}
                placeholder="40-3500"
                autoComplete="new-email"
                value={form[1].beaconInterval.value}
                onChange={e => changeValue(1, 'beaconInterval', e.target.value)}
              />
              <div>milliseconds</div>
            </div>
          </div>

          {/* DTIM interval */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>DTIM interval</div>
          <div className={mainStyle['item']}>
            <Input
              type="number"
              isMiddleSize={true}
              placeholder="1-255"
              autoComplete="new-email"
              value={form[0].dtimInterval.value}
              onChange={e => changeValue(0, 'dtimInterval', e.target.value)}
            />
          </div>
          <div className={mainStyle['item']}>
            <Input
              type="number"
              isMiddleSize={true}
              placeholder="1-255"
              autoComplete="new-email"
              value={form[1].dtimInterval.value}
              onChange={e => changeValue(1, 'dtimInterval', e.target.value)}
            />
          </div>

          {/* U-APSD */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>U-APSD</div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <RadioButton
                id="uapsd-0-enable"
                label="Enable"
                hasRightMargin={true}
                checked={form[0].uapsd.value}
                onChange={() => changeValue(0, 'uapsd', true)}
              />
              <RadioButton
                id="uapsd-0-disable"
                label="Enable"
                checked={!form[0].uapsd.value}
                onChange={() => changeValue(0, 'uapsd', false)}
              />
            </div>
          </div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <RadioButton
                id="uapsd-1-enable"
                label="Enable"
                hasRightMargin={true}
                checked={form[1].uapsd.value}
                onChange={() => changeValue(1, 'uapsd', true)}
              />
              <RadioButton
                id="uapsd-1-disable"
                label="Enable"
                checked={!form[1].uapsd.value}
                onChange={() => changeValue(1, 'uapsd', false)}
              />
            </div>
          </div>

          {/* Short guard interval */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Short guard interval</div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <RadioButton
                id="short-guard-interval-0-enable"
                label="Enable"
                hasRightMargin={true}
                checked={form[0].shortGuardInterval.value}
                onChange={() => changeValue(0, 'shortGuardInterval', true)}
              />
              <RadioButton
                id="short-guard-interval-0-disable"
                label="Enable"
                checked={!form[0].shortGuardInterval.value}
                onChange={() => changeValue(0, 'shortGuardInterval', false)}
              />
            </div>
          </div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <RadioButton
                id="short-guard-interval-1-enable"
                label="Enable"
                hasRightMargin={true}
                checked={form[1].shortGuardInterval.value}
                onChange={() => changeValue(1, 'shortGuardInterval', true)}
              />
              <RadioButton
                id="short-guard-interval-1-disable"
                label="Enable"
                checked={!form[1].shortGuardInterval.value}
                onChange={() => changeValue(1, 'shortGuardInterval', false)}
              />
            </div>
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
            {/* Multicast rate */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Multicast rate
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <DropdownWithItem
                    id="multicast-rate-mode-0"
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form[0].multicastRate.selected}
                    itemList={form[0].multicastRate.list}
                    onClick={multicastRate => changeValue(0, 'multicastRate', multicastRate)}
                  />
                </div>
              </td>
            </tr>
            {/* Beacon interval */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Beacon interval
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <div className='form-field form-field--horizontal'>
                    <Input
                      type="number"
                      isMiddleSize={true}
                      placeholder="40-3500"
                      autoComplete="new-email"
                      value={form[0].beaconInterval.value}
                      onChange={e => changeValue(0, 'beaconInterval', e.target.value)}
                    />
                    <div>milliseconds</div>
                  </div>
                </div>
              </td>
            </tr>
            {/* DTIM interval */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  DTIM interval
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <Input
                    type="number"
                    isMiddleSize={true}
                    placeholder="1-255"
                    autoComplete="new-email"
                    value={form[0].dtimInterval.value}
                    onChange={e => changeValue(0, 'dtimInterval', e.target.value)}
                  />
                </div>
              </td>
            </tr>
            {/* U-APSD */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  U-APSD
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="uapsd-0-enable"
                      label="Enable"
                      hasRightMargin={true}
                      checked={form[0].uapsd.value}
                      onChange={() => changeValue(0, 'uapsd', true)}
                    />
                    <RadioButton
                      id="uapsd-0-disable"
                      label="Enable"
                      checked={!form[0].uapsd.value}
                      onChange={() => changeValue(0, 'uapsd', false)}
                    />
                  </div>
                </div>
              </td>
            </tr>

            {/* Short guard interval */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Short guard interval
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="short-guard-interval-0-enable"
                      label="Enable"
                      hasRightMargin={true}
                      checked={form[0].shortGuardInterval.value}
                      onChange={() => changeValue(0, 'shortGuardInterval', true)}
                    />
                    <RadioButton
                      id="short-guard-interval-0-disable"
                      label="Enable"
                      checked={!form[0].shortGuardInterval.value}
                      onChange={() => changeValue(0, 'shortGuardInterval', false)}
                    />
                  </div>
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
            {/* Multicast rate */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Multicast rate
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <DropdownWithItem
                    id="multicast-rate-mode-0"
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form[1].multicastRate.selected}
                    itemList={form[1].multicastRate.list}
                    onClick={multicastRate => changeValue(1, 'multicastRate', multicastRate)}
                  />
                </div>
              </td>
            </tr>
            {/* Beacon interval */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Beacon interval
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <div className='form-field form-field--horizontal'>
                    <Input
                      type="number"
                      isMiddleSize={true}
                      placeholder="40-3500"
                      autoComplete="new-email"
                      value={form[1].beaconInterval.value}
                      onChange={e => changeValue(1, 'beaconInterval', e.target.value)}
                    />
                    <div>milliseconds</div>
                  </div>
                </div>
              </td>
            </tr>
            {/* DTIM interval */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  DTIM interval
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <Input
                    type="number"
                    isMiddleSize={true}
                    placeholder="1-255"
                    autoComplete="new-email"
                    value={form[1].dtimInterval.value}
                    onChange={e => changeValue(1, 'dtimInterval', e.target.value)}
                  />
                </div>
              </td>
            </tr>
            {/* U-APSD */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  U-APSD
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="uapsd-0-enable"
                      label="Enable"
                      hasRightMargin={true}
                      checked={form[1].uapsd.value}
                      onChange={() => changeValue(1, 'uapsd', true)}
                    />
                    <RadioButton
                      id="uapsd-0-disable"
                      label="Enable"
                      checked={!form[1].uapsd.value}
                      onChange={() => changeValue(1, 'uapsd', false)}
                    />
                  </div>
                </div>
              </td>
            </tr>
            {/* Short guard interval */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  Short guard interval
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="short-guard-interval-0-enable"
                      label="Enable"
                      hasRightMargin={true}
                      checked={form[1].shortGuardInterval.value}
                      onChange={() => changeValue(1, 'shortGuardInterval', true)}
                    />
                    <RadioButton
                      id="short-guard-interval-0-disable"
                      label="Enable"
                      checked={!form[1].shortGuardInterval.value}
                      onChange={() => changeValue(1, 'shortGuardInterval', false)}
                    />
                  </div>
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
    </>
  )
}

export default Channel;