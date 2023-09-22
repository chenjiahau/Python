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

const Basic = () => {
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
    ctx.updateRadioBasic(data);
    ctx.updateChangedRadioBasic(data);
  }, []);

  useEffect(() => {
    ctx.updateChangedRadioBasic(form);
  }, [form]);

  if (!form) {
    return
  }

  return (
    <>
      <div className="tab-container-border">
        {/* When the width of page is larger and equal to 1300px */}
        <div className={`${mainStyle['radio-container']} ${mainStyle['radio-container--basic']}`}>
          <div className={mainStyle['header']}></div>
          <div className={mainStyle['header']}>2.4 GHz</div>
          <div className={mainStyle['header']}>5 GHz</div>

          {/* Radio */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Radio</div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <RadioButton
                id="radio-0-enable"
                label="Enable"
                hasRightMargin={true}
                checked={form[0].radio.value}
                onChange={() => changeValue(0, 'radio', true)}
              />
              <RadioButton
                id="radio-0-disable"
                label="Disable"
                checked={!form[0].radio.value}
                onChange={() => changeValue(0, 'radio', false)}
              />
            </div>
          </div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <RadioButton
                id="radio-1-enable"
                label="Enable"
                hasRightMargin={true}
                checked={form[1].radio.value}
                onChange={() => changeValue(1, 'radio', true)}
              />
              <RadioButton
                id="radio-1-disable"
                label="Disable"
                checked={!form[1].radio.value}
                onChange={() => changeValue(1, 'radio', false)}
              />
            </div>
          </div>

          {/* Radio mode */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Radio mode</div>
          <div className={mainStyle['item']}>
            <DropdownWithItem
              id="radio-mode-0"
              type="normal"
              isMiddleSize={true}
              selectedItem={form[0].radioMode.selected}
              itemList={form[0].radioMode.list}
              onClick={radioMode => changeValue(0, 'radioMode', radioMode)}
            />
          </div>
          <div className={mainStyle['item']}>
            <DropdownWithItem
              id="radio-mode-1"
              type="normal"
              isMiddleSize={true}
              selectedItem={form[1].radioMode.selected}
              itemList={form[1].radioMode.list}
              onClick={radioMode => changeValue(1, 'radioMode', radioMode)}
            />
          </div>

          {/* Channels bandwidth */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Channels bandwidth</div>
          <div className={mainStyle['item']}>
            <DropdownWithItem
              id="channels-bandwidth-0"
              type="normal"
              isMiddleSize={true}
              selectedItem={form[0].channelsBandwidth.selected}
              itemList={form[0].channelsBandwidth.list}
              onClick={channelBandwidth => changeValue(0, 'channelsBandwidth', channelBandwidth)}
            />
          </div>
          <div className={mainStyle['item']}>
            <DropdownWithItem
              id="channels-bandwidth-1"
              type="normal"
              isMiddleSize={true}
              selectedItem={form[1].channelsBandwidth.selected}
              itemList={form[1].channelsBandwidth.list}
              onClick={channelBandwidth => changeValue(1, 'channelsBandwidth', channelBandwidth)}
            />
          </div>

          {/* Tx power */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']}`}>Tx power</div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <Input
                type="number"
                isMiddleSize={true}
                placeholder="2-100"
                autoComplete="new-email"
                value={form[0].txPower.value}
                onChange={e => changeValue(0, 'txPower', e.target.value)}
              />
              <div>%</div>
            </div>
          </div>
          <div className={mainStyle['item']}>
            <div className='form-field form-field--horizontal'>
              <Input
                type="number"
                isMiddleSize={true}
                placeholder="2-100"
                autoComplete="new-email"
                value={form[1].txPower.value}
                onChange={e => changeValue(1, 'txPower', e.target.value)}
              />
              <div>%</div>
            </div>
          </div>

          {/* SSID isolation */}
          <div className={`${mainStyle['item']} ${mainStyle['item-title']} ${mainStyle['last-item']}`}>SSID isolation</div>
          <div className={`${mainStyle['item']} ${mainStyle['last-item']}`}>
            <div className='form-field form-field--horizontal'>
              <RadioButton
                id="ssid-isolation-0-enable"
                label="Enable"
                hasRightMargin={true}
                checked={form[0].ssidIsolation.value}
                onChange={(e) => changeValue(0, 'ssidIsolation', true)}
              />
              <RadioButton
                id="ssid-isolation-0-disable"
                label="Disable"
                checked={!form[0].ssidIsolation.value}
                onChange={(e) => changeValue(0, 'ssidIsolation', false)}
              />
            </div>
          </div>
          <div className={`${mainStyle['item']} ${mainStyle['last-item']}`}>
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
            {/* Radio */}
            <tr className={mainStyle['tr']}>
              <td>
                <div className={mainStyle['td']} style={{ marginRight: '200px' }}>
                  Radio
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="radio-0-enable"
                      label="Enable"
                      hasRightMargin={true}
                      checked={form[0].radio.value}
                      onChange={() => changeValue(0, 'radio', true)}
                    />
                    <RadioButton
                      id="radio-0-disable"
                      label="Disable"
                      checked={!form[0].radio.value}
                      onChange={() => changeValue(0, 'radio', false)}
                    />
                  </div>
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
                  <DropdownWithItem
                    id="radio-mode-0"
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form[0].radioMode.selected}
                    itemList={form[0].radioMode.list}
                    onClick={radioMode => changeValue(0, 'radioMode', radioMode)}
                  />
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
                  <DropdownWithItem
                    id="channels-bandwidth-0"
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form[0].channelsBandwidth.selected}
                    itemList={form[0].channelsBandwidth.list}
                    onClick={channelBandwidth => changeValue(0, 'channelsBandwidth', channelBandwidth)}
                  />
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
                  <div className='form-field form-field--horizontal'>
                    <Input
                      type="number"
                      isMiddleSize={true}
                      placeholder="2-100"
                      autoComplete="new-email"
                      value={form[0].txPower.value}
                      onChange={e => changeValue(0, 'txPower', e.target.value)}
                    />
                    <div>%</div>
                  </div>
                </div>
              </td>
            </tr>
            {/* SSID isolation */}
            <tr>
              <td>
                <div className={mainStyle['td']}>
                  SSID isolation
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="ssid-isolation-0-enable"
                      label="Enable"
                      hasRightMargin={true}
                      checked={form[0].ssidIsolation.value}
                      onChange={(e) => changeValue(0, 'ssidIsolation', true)}
                    />
                    <RadioButton
                      id="ssid-isolation-0-disable"
                      label="Disable"
                      checked={!form[0].ssidIsolation.value}
                      onChange={(e) => changeValue(0, 'ssidIsolation', false)}
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
            {/* Radio */}
            <tr>
              <td>
                <div className={mainStyle['td']} style={{ marginRight: '200px' }}>
                  Radio
                </div>
              </td>
              <td>
                <div className={mainStyle['field-td']}>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="radio-1-enable"
                      label="Enable"
                      hasRightMargin={true}
                      checked={form[1].radio.value}
                      onChange={() => changeValue(1, 'radio', true)}
                    />
                    <RadioButton
                      id="radio-1-disable"
                      label="Disable"
                      checked={!form[1].radio.value}
                      onChange={() => changeValue(1, 'radio', false)}
                    />
                  </div>
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
                  <DropdownWithItem
                    id="radio-mode-1"
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form[1].radioMode.selected}
                    itemList={form[1].radioMode.list}
                    onClick={radioMode => changeValue(1, 'radioMode', radioMode)}
                  />
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
                <DropdownWithItem
                  id="channels-bandwidth-1"
                  type="normal"
                  isMiddleSize={true}
                  selectedItem={form[1].channelsBandwidth.selected}
                  itemList={form[1].channelsBandwidth.list}
                  onClick={channelBandwidth => changeValue(1, 'channelsBandwidth', channelBandwidth)}
                />
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
                  <div className='form-field form-field--horizontal'>
                    <Input
                      type="number"
                      isMiddleSize={true}
                      placeholder="2-100"
                      autoComplete="new-email"
                      value={form[1].txPower.value}
                      onChange={e => changeValue(1, 'txPower', e.target.value)}
                    />
                    <div>%</div>
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

export default Basic