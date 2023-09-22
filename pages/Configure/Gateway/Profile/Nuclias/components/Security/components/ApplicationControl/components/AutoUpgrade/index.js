import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep, set } from 'lodash';

// UI

// Component
import { RadioButton, DropdownWithItem, Input } from 'components/';
import Func from '../../../../../Func';

// Context
import { ConfigContext } from '../../../../../../Context';
import { AppCtrlContext } from '../../Context';

// Dummy data
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const typeDefinition = ['Interval', 'Schedule'];
const dayDefinition = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const timeDefinition = [
  '12:00 AM', '01:00 AM', '02:00 AM', '03:00 AM', '04:00 AM', '05:00 AM', '06:00 AM',
  '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
  '09:00 PM', '10:00 PM', '11:00 PM'
];

const AutoUpgrade = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: appCtrlState } = useContext(AppCtrlContext);
  const [version, setVersion] = useState({ last: '', current: '' });
  const [form, setForm] = useState(null);

  // Fake data

  // State

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  // Side effect
  useEffect(() => {
    setVersion({
      last: appCtrlState.appCtrl.lastPackageVersion,
      current: appCtrlState.appCtrl.currentPackageVersion
    });

    const updatedForm = cloneDeep(appCtrlState.autoUpgrade);

    // Type
    const typeDropdown = typeDefinition.map(item => {
      return {
        title: item,
        value: item,
        isActive: updatedForm.type === item
      }
    });

    // Day
    const dayDropdown = dayDefinition.map(item => {
      return {
        title: item,
        value: item,
        isActive: updatedForm.day === item
      }
    });

    // Time
    const timeDropdown = timeDefinition.map(item => {
      return {
        title: item,
        value: item,
        isActive: updatedForm.time === item
      }
    });

    updatedForm.type = typeDropdown;
    updatedForm.day = dayDropdown;
    updatedForm.time = timeDropdown;

    setForm(updatedForm);
  }, [appCtrlState.autoUpgrade]);

  if (!form) {
    return (
      <Func title='AUTO UPGRADE' />
    )
  }

  const isProfilePath = !!configState.profile;
  const isNotStandalone = configState.useProfileConfig ? true : false;
  const isUseProfileConfig = !isProfilePath && isNotStandalone;

  return (
    <>
      <Func title='AUTO UPGRADE'>
        <div className='form-groups form-group--align-top'>
          <div className='form-title'>Current package version</div>
          <div className='form-field'>{version.last}</div>
          <div className='form-title'>Latest package version</div>
          <div className='form-field'>{version.current}</div>
          <div className='form-title'>Auto upgrade</div>
          <div className='form-field form-field--horizontal'>
            {
              isUseProfileConfig ? (
                <>
                  {form.autoUpgrade ? 'Enabled' : 'Disabled'}
                </>
              ) : (
                <>
                  <RadioButton
                    id='auto-upgrade-enable'
                    name='autoUpgrade'
                    label='Enable'
                    hasRightMargin={true}
                    checked={form.autoUpgrade}
                    onChange={() => changeValue('autoUpgrade', true)}
                  />
                  <RadioButton
                    id='auto-upgrade-disable'
                    name='autoUpgrade'
                    label='Disable'
                    checked={!form.autoUpgrade}
                    onChange={() => changeValue('autoUpgrade', false)}
                  />
                </>
              )
            }
          </div>
          {
            form.autoUpgrade && (
              <>
                <div className='form-title'>Time</div>
                <div className='form-field form-field--horizontal'>
                  {
                    isUseProfileConfig ? (
                      <>
                        <div className={mainStyle['app-ctrl-text-block']}>{form.type.find(item => item.isActive).title}</div>
                        {
                          form.type.find(item => item.isActive)['title'] === 'Interval' ? (
                            <>
                              <div className={mainStyle['app-ctrl-text-block']}>{form.interval}</div>
                              <div>minutes</div>
                            </>
                          ) : (
                            <>
                              <div className={mainStyle['app-ctrl-text-block']}>{form.day.find(item => item.isActive).title}</div>
                              <div className={mainStyle['app-ctrl-text-block']}>{form.time.find(item => item.isActive).title}</div>
                            </>
                          )
                        }
                      </>
                    ) : (
                      <>
                        <DropdownWithItem
                          type='normal'
                          isMiddleSize={true}
                          selectedItem={form.type.find(item => item.isActive)}
                          itemList={form.type}
                          onClick={item => changeValue('type', item)}
                        />
                        {
                          form.type.find(item => item.isActive)['title'] === 'Interval' ? (
                            <>
                              <Input
                                type='number'
                                isMiddleSize={true}
                                placeholder='60-43200'
                                autoComplete='new-email'
                                value={form.interval}
                                onChange={(e) => changeValue('interval', e.target.value)}
                                onFocus={() => { }}
                                onBlur={() => { }}
                              />
                              <div>minutes</div>
                            </>
                          ) : (
                            <>
                              <DropdownWithItem
                                type='normal'
                                isMiddleSize={true}
                                selectedItem={form.day.find(item => item.isActive)}
                                itemList={form.day}
                                onClick={item => changeValue('day', item)}
                              />
                              <DropdownWithItem
                                type='normal'
                                isMiddleSize={true}
                                selectedItem={form.time.find(item => item.isActive)}
                                itemList={form.time}
                                onClick={item => changeValue('time', item)}
                              />
                            </>
                          )
                        }
                      </>
                    )
                  }
                </div>
              </>
            )
          }
        </div>
      </Func >
    </>
  )
}

export default AutoUpgrade;