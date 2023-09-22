import mainStyle from '../../../ssid.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// Component
import {
  Button, Input, Checkbox, RadioButton, DropdownWithCheckbox, DropdownWithItem,
  TooltipDialog
} from 'components/';

// Context
import DataContext from '../../../../../DataContext';

// Dummy data & util
import { getSplashPageList } from 'dummy/data/splash-page';
import { getLocalDbList } from 'dummy/data/local-db';
import { getRadiusList } from 'dummy/data/radius';
import { getLdapList } from 'dummy/data/ldap';
import { getWalledGardenList } from 'dummy/data/walled-garden';
import { getSmsList } from 'dummy/data/sms';
import { getSupportedSettingId, generateCaptivePortal } from 'dummy/data/capital-portal';
import { getChangeValueFn } from 'dummy/utils/changeValue';

const CaptivePortal = (props) => {
  const {
    modalStatus,
    changeModalStatus,
    pushToDevice
  } = props;

  const navigate = useNavigate();
  const ctx = useContext(DataContext);

  // Faker API data
  const captivePortal = generateCaptivePortal();

  // State
  const [form, setForm] = useState();

  // Method
  const checkSupportedSetting = (title) => {
    return form?.userAuthentication.selected.supportedSettingList.includes(getSupportedSettingId(title));
  }

  const changeValue = getChangeValueFn(form, setForm);

  const changeUserAuthentication = (updatedForm, field, value) => {
    for (const item of updatedForm[field].list) {
      if (item.title !== value.title) {
        item.isActive = false;
      } else {
        item.isActive = true;
        updatedForm[field].selected = item;
      }
    }

    const splashPageList = getSplashPageList();
    splashPageList[0].isActive = true;

    updatedForm.splashPage.list.length = 0;
    updatedForm.splashPage.list.push(splashPageList[0]);
    updatedForm.splashPage.list = [
      splashPageList[0],
      ...splashPageList.filter(splashPage => {
        if (
          splashPage.type === updatedForm.userAuthentication.selected.title ||
          splashPage.type === 'Template'
        ) {
          return splashPage;
        }
      })
    ];
  }

  // Side effect
  useEffect(() => {
    const splashPageList = getSplashPageList();
    splashPageList[0].isActive = true;

    const data = {
      userAuthentication: {
        selected: captivePortal.userAuthenticationList.filter(item => item.isActive)[0],
        list: captivePortal.userAuthenticationList
      },
      splashPage: {
        selected: splashPageList[0],
        list: []
      },
      sessionTimeout: {
        value: captivePortal.sessionTimeout
      },
      idleTimeout: {
        value: captivePortal.idleTimeout
      },
      sessionLimited: {
        selected: captivePortal.sessionLimitedList.filter(item => item.isActive)[0],
        list: captivePortal.sessionLimitedList
      },
      trafficLimited: {
        value: captivePortal.trafficLimited
      },
      urlRedirection: {
        value: captivePortal.urlRedirection
      },
      urlForRedirection: {
        value: captivePortal.urlForRedirection
      },
      redirectionInterval: {
        selected: captivePortal.redirectionIntervalList.filter(item => item.isActive)[0],
        list: captivePortal.redirectionIntervalList
      },
      basicLoginPage: {
        selected: captivePortal.basicLoginPageList.filter(item => item.isActive)[0],
        list: captivePortal.basicLoginPageList
      },
      localDb: {
        selected: null,
        list: getLocalDbList(false)
      },
      primaryRadius: {
        selected: null,
        list: getRadiusList(false)
      },
      secondaryRadius: {
        selected: getRadiusList(true)[0],
        list: getRadiusList(true),
      },
      primaryLdap: {
        selected: null,
        list: getLdapList(false)
      },
      secondaryLdap: {
        selected: getLdapList(true)[0],
        list: getLdapList(true)
      },
      simultaneousLogin: {
        value: captivePortal.simultaneousLogin
      },
      facebook: {
        value: true
      },
      google: {
        value: true
      },
      line: {
        value: true
      },
      weibo: {
        value: true
      },
      twitter: {
        value: true
      },
      sms: {
        selected: null,
        list: getSmsList()
      },
      walledGarden: {
        selected: captivePortal.wallGarden,
        list: getWalledGardenList(false)
      },
      gracePeriod: {
        selected: captivePortal.gracePeriodList.filter(item => item.isActive)[0],
        list: captivePortal.gracePeriodList
      },
      authenicationTimes: {
        selected: captivePortal.authenicationTimesList.filter(item => item.isActive)[0],
        list: captivePortal.authenicationTimesList
      },
      deinalPeriodLimit: {
        value: captivePortal.deinalPeriodLimit

      },
      macAuthenication: {
        value: captivePortal.macAuthenication
      }
    };

    data.splashPage.list = splashPageList.filter(splashPage => splashPage.type === data.authenicationTimes.selected.title);

    setForm(data);
    ctx.updateSsidCaptivePortal(data);
    ctx.updateChangedSsidCaptivePortal(data);
  }, []);

  useEffect(() => {
    ctx.updateChangedSsidCaptivePortal(form);
  }, [form]);

  return (
    <>
      <div className="tab-container-border">
        {/* User authentication */}
        <div className="form-group form-group--align-top">
          <div className='form-title'>User authentication</div>
          <div className='form-field'>
            {
              form?.userAuthentication.list.map((userAuthentication, index) => {
                return (
                  <div className={`mb-2 ${mainStyle['user-authentication-right']}`} key={`user-authentication-${index}`}>
                    <RadioButton
                      id={`user-authentication-${index}`}
                      name={`userAuthentication${index}`}
                      label={userAuthentication.title}
                      checked={userAuthentication.isActive}
                      onChange={() => changeValue('userAuthentication', userAuthentication, changeUserAuthentication)}
                    />
                    {
                      userAuthentication.id === form.userAuthentication.selected.id &&
                      [2, 3, 4, 5, 6, 7].includes(userAuthentication.id) && (
                        <>
                          <div className={mainStyle['dropdown-button']}>
                            <DropdownWithItem
                              type="normal"
                              isMiddleSize={true}
                              style={{ width: '220px' }}
                              dropDownMenuStyle={{ width: 'auto' }}
                              isTruncate={true}
                              selectedItem={form.splashPage.list.filter(item => item.isActive)[0]}
                              itemList={form.splashPage.list}
                              onClick={splashPage => changeValue('splashPage', splashPage)}
                            />
                          </div>
                          <Button
                            label="Splash page editor"
                            className={`btn-grey-blue ${mainStyle['goto-splash-page-editor']}`}
                            onClick={() => navigate('/cloud/configure/splash-page')}
                          />
                        </>
                      )
                    }
                    {
                      userAuthentication.id === 9 && (
                        <>
                          <div style={{ marginLeft: '2px' }}></div>
                          <TooltipDialog
                            className="ms-1 me-1"
                            placement="right"
                            title="For requiring user to check in Facebook Page before to be granted to access Internet, click the Configure button to open the Facebook Wi-Fi Setting page to connect with a Facebook Page"
                          />
                        </>
                      )
                    }
                  </div>
                );
              })
            }

          </div>
        </div>
        {/* Basic login page */}
        {
          checkSupportedSetting('Basic login page') && (
            <>
              <div className="form-group">
                <div className='form-title required'>
                  Basic login page
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id="localdb-enable"
                    name="localdbEnable"
                    label="Local authentication"
                    hasRightMargin={true}
                    checked={form.basicLoginPage.list[0].isActive}
                    onChange={() => changeValue('basicLoginPage', form.basicLoginPage.list[0])}
                  />
                  <RadioButton
                    id="radius-enable"
                    name="radiusEnable"
                    label="RADIUS server"
                    hasRightMargin={true}
                    checked={form.basicLoginPage.list[1].isActive}
                    onChange={() => changeValue('basicLoginPage', form.basicLoginPage.list[1])}
                  />
                  <RadioButton
                    id="ldap-enable"
                    name="ldapEnable"
                    label="LDAP server"
                    checked={form.basicLoginPage.list[2].isActive}
                    onChange={() => changeValue('basicLoginPage', form.basicLoginPage.list[2])}
                  />
                </div>
              </div>
              {
                form.basicLoginPage.list[0].isActive && (
                  <div className="form-group form-group--align-top">
                    <div className='form-title form-title--indent required'>
                      Local authentication
                    </div>
                    <div
                      className='form-field form-field--horizontal'
                      style={{ flexWrap: 'wrap' }}
                    >
                      <DropdownWithItem
                        type="normal"
                        isMiddleSize={true}
                        selectedItem={form.localDb.selected}
                        itemList={form.localDb.list}
                        onClick={authMethod => changeValue('localDb', authMethod)}
                      />
                      <div>
                        <Button
                          label="Add authentication users"
                          className='btn-grey-blue'
                          onClick={() => changeModalStatus(modalStatus.addLocalDb.self, true)}
                        />
                      </div>
                      <div>
                        <Link to="/cloud/configure/authentication/local-authentication-list" className='text-decoration-underline'>Local authentication list</Link>
                      </div>
                    </div>
                  </div>
                )
              }
              {
                form.basicLoginPage.list[1].isActive && (
                  <>
                    <div className="form-group form-group--align-top">
                      <div className='form-title form-title--indent required'>
                        Primary RADIUS server
                      </div>
                      <div
                        className='form-field form-field--horizontal'
                        style={{ flexWrap: 'wrap' }}
                      >
                        <DropdownWithItem
                          type="normal"
                          isMiddleSize={true}
                          selectedItem={form.primaryRadius.selected}
                          itemList={form.primaryRadius.list}
                          onClick={authMethod => changeValue('primaryRadius', authMethod)}
                        />
                        <div>
                          <Button
                            label="Add a RADIUS server"
                            className='btn-grey-blue'
                            onClick={() => changeModalStatus(modalStatus.addRadius.self, true)}
                          />
                        </div>
                        <div>
                          <Link to="/cloud/configure/authentication/authentication-servers" className='text-decoration-underline'>RADIUS servers</Link>
                        </div>
                      </div>
                    </div>
                    <div className="form-group form-group--align-top">
                      <div className='form-title form-title--indent'>
                        Secondary RADIUS server
                      </div>
                      <div
                        className='form-field form-field--horizontal'
                        style={{ flexWrap: 'wrap' }}
                      >
                        <DropdownWithItem
                          type="normal"
                          isMiddleSize={true}
                          selectedItem={form.secondaryRadius.selected}
                          itemList={form.secondaryRadius.list}
                          onClick={authMethod => changeValue('secondaryRadius', authMethod)}
                        />
                      </div>
                    </div>
                  </>
                )
              }
              {
                form.basicLoginPage.list[2].isActive && (
                  <>
                    <div className="form-group form-group--align-top">
                      <div className='form-title form-title--indent required'>
                        Primary LDAP server
                      </div>
                      <div
                        className='form-field form-field--horizontal'
                        style={{ flexWrap: 'wrap' }}
                      >
                        <DropdownWithItem
                          type="normal"
                          isMiddleSize={true}
                          selectedItem={form.primaryLdap.selected}
                          itemList={form.primaryLdap.list}
                          onClick={authMethod => changeValue('primaryLdap', authMethod)}
                        />
                        <div>
                          <Button
                            label="Add a LDAP server"
                            className='btn-grey-blue'
                            onClick={() => changeModalStatus(modalStatus.addLdap.self, true)}
                          />
                        </div>
                        <div>
                          <Link to="/cloud/configure/authentication/authentication-servers" className='text-decoration-underline'>LDAP servers</Link>
                        </div>
                      </div>
                    </div>
                    <div className="form-group form-group--align-top">
                      <div className='form-title form-title--indent'>
                        Secondary LDAP server
                      </div>
                      <div
                        className='form-field form-field--horizontal'
                        style={{ flexWrap: 'wrap' }}
                      >
                        <DropdownWithItem
                          type="normal"
                          isMiddleSize={true}
                          selectedItem={form.secondaryLdap.selected}
                          itemList={form.secondaryLdap.list}
                          onClick={authMethod => changeValue('secondaryLdap', authMethod)}
                        />
                      </div>
                    </div>
                  </>
                )
              }
            </>
          )
        }
        {/* E-mail authentication */}
        {
          checkSupportedSetting('E-mail authentication') && (
            <>
              <div className="form-group">
                <div className='form-title'>
                  E-mail authentication
                  <TooltipDialog
                    className="ms-1 me-1"
                    placement="right"
                    title="By enabling this feature, your guest users would receive an email with authentication link sent by Nuclias cloud to continue the use of Wi-Fi."
                  />
                </div>
              </div>
              <div className="form-group">
                <div className='form-title form-title--indent'>
                  Grace period
                  <TooltipDialog
                    className="ms-1 me-1"
                    placement="right"
                    title="Grace period is the time limit for your guest users to verify email."
                  />
                </div>
                <div className='form-field form-field--horizontal'>
                  <DropdownWithItem
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form.gracePeriod.selected}
                    itemList={form.gracePeriod.list}
                    onClick={gracePeriod => changeValue('gracePeriod', gracePeriod)}
                  />
                  <div>minutes</div>
                </div>
              </div>
              <div className="form-group">
                <div className='form-title form-title--indent'>
                  Authentication times
                  <TooltipDialog
                    className="ms-1 me-1"
                    placement="right"
                    title="You may limit the Email authentication times for the same guest user in one day."
                  />
                </div>
                <div className='form-field form-field--horizontal'>
                  <DropdownWithItem
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form.authenicationTimes.selected}
                    itemList={form.authenicationTimes.list}
                    onClick={authenicationTime => changeValue('authenicationTimes', authenicationTime)}
                  />
                  <div>times</div>
                </div>
              </div>
              <div className="form-group">
                <div className='form-title form-title--indent required'>
                  Denial period
                  <TooltipDialog
                    className="ms-1 me-1"
                    placement="right"
                    title="You may set up the time limits for guest users to request another Email authentication if they failed and/or the grace period is expired."
                  />
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type="number"
                    isMiddleSize={true}
                    placeholder="1-180"
                    autoComplete="new-email"
                    value={form.deinalPeriodLimit.value}
                    onChange={(e) => changeValue('deinalPeriodLimit', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>minutes</div>
                </div>
              </div>
            </>
          )
        }
        {/* SMS configuration */}
        {
          checkSupportedSetting('SMS configuration') && (
            <>
              <div className="form-group">
                <div className='form-title required'>
                  SMS configuration
                  <TooltipDialog
                    className="ms-1 me-1"
                    placement="right"
                    title="To enable SMS authentication at least required one set of SMS account settings. Nuclias use Twilio service to send SMS text messages, please create an account on Twilio and subscribe their Programmable SMS service to get an Account SID and Auth Token to set up in the SMS configuration."
                  />
                </div>
                <div
                  className='form-field form-field--horizontal'
                  style={{ flexWrap: 'wrap' }}
                >
                  <DropdownWithItem
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form.sms.selected}
                    itemList={form.sms.list}
                    onClick={sms => changeValue('sms', sms)}
                  />
                  <div>
                    <Button
                      label="Add Twilio SMS settings"
                      className='btn-grey-blue'
                      onClick={() => changeModalStatus(modalStatus.addSms.self, true)}
                    />
                  </div>
                  <div>
                    <Link to="/cloud/settings/advanced-settings/sms-configuration" className='text-decoration-underline'>SMS configurationt</Link>
                  </div>
                </div>
              </div>
            </>
          )
        }
        {/* 3rd party credentials */}
        {
          checkSupportedSetting('3rd party credentials') && (
            <>
              <div className="form-group">
                <div className='form-title'>
                  3rd party credentials
                </div>
                <div className='form-field form-field--horizontal'>
                  <Checkbox
                    id="third-pary-facebook"
                    htmlFor="third-pary-facebook"
                    type="checkbox"
                    label="Facebook"
                    checked={form.facebook.value}
                    onChange={() => changeValue('facebook', !form.facebook.value)}
                  />
                  <Checkbox
                    id="third-pary-google"
                    htmlFor="third-pary-google"
                    type="checkbox"
                    label="Google"
                    checked={form.google.value}
                    onChange={() => changeValue('google', !form.google.value)}
                  />
                  <Checkbox
                    id="third-pary-line"
                    htmlFor="third-pary-line"
                    type="checkbox"
                    label="Line"
                    checked={form.line.value}
                    onChange={() => changeValue('line', !form.line.value)}
                  />
                  <Checkbox
                    id="third-pary-weibo"
                    htmlFor="third-pary-weibo"
                    type="checkbox"
                    label="wWeibo"
                    checked={form.weibo.value}
                    onChange={() => changeValue('weibo', !form.weibo.value)}
                  />
                  <Checkbox
                    id="third-pary-twitter"
                    htmlFor="third-pary-twitter"
                    type="checkbox"
                    label="Twitter"
                    checked={form.twitter.value}
                    onChange={() => changeValue('twitter', !form.twitter.value)}
                  />
                </div>
              </div>
            </>
          )
        }
        {/* Simultaneous login */}
        {
          checkSupportedSetting('Simultaneous login') && (
            <>
              <div className="form-group">
                <div
                  className='form-title'
                >
                  Simultaneous login
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id="simultaneous-login-enable"
                    name="simultaneousLoginEnable"
                    label="Enable"
                    hasRightMargin={true}
                    checked={form.simultaneousLogin.value}
                    onChange={() => changeValue('simultaneousLogin', true)}
                  />
                  <RadioButton
                    id="simultaneous-login-disable"
                    name="simultaneousLoginDisable"
                    label="Disable"
                    checked={!form.simultaneousLogin.value}
                    onChange={() => changeValue('simultaneousLogin', false)}
                  />
                </div>
              </div>
            </>
          )
        }
        {/* Option */}
        {
          checkSupportedSetting('Option') && (
            <>
              <div className="form-group">
                <div className='form-title'>Option</div>
                <div className='form-field'>
                  Custom External Captive Portal
                </div>
              </div>
            </>
          )
        }
        {/* Splash page URL */}
        {
          checkSupportedSetting('Splash page URL') && (
            <>
              <div className="form-group">
                <div className='form-title required'>
                  Splash page URL
                </div>
                <div className='form-field form-field--horizontal'>
                  <div>
                    http://
                  </div>
                  <Input
                    type="text"
                    autoComplete="new-email"
                    value={form.splashPage.value}
                    style={{ flexGrow: '1' }}
                    onChange={e => changeValue('splashPage', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </div>
              </div>
            </>
          )
        }
        {/* RADIUS server */}
        {
          checkSupportedSetting('RADIUS server') && (
            <>
              <div className="form-group">
                <div
                  className='form-title'
                >
                  RADIUS server
                </div>
              </div>
              <div className="form-group form-group--align-top">
                <div className='form-title form-title--indent required'>
                  Primary RADIUS server
                </div>
                <div
                  className='form-field form-field--horizontal'
                  style={{ flexWrap: 'wrap' }}
                >
                  <DropdownWithItem
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form.primaryRadius.selected}
                    itemList={form.primaryRadius.list}
                    onClick={authMethod => changeValue('primaryRadius', authMethod)}
                  />
                  <div>
                    <Button
                      label="Add a RADIUS server"
                      className='btn-grey-blue'
                      onClick={() => changeModalStatus(modalStatus.addRadius.self, true)}
                    />
                  </div>
                  <div>
                    <Link to="/cloud/configure/authentication/authentication-servers" className='text-decoration-underline'>RADIUS servers</Link>
                  </div>
                </div>
              </div>
              <div className="form-group form-group--align-top">
                <div className='form-title form-title--indent'>
                  Secondary RADIUS server
                </div>
                <div
                  className='form-field form-field--horizontal'
                  style={{ flexWrap: 'wrap' }}
                >
                  <DropdownWithItem
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form.secondaryRadius.selected}
                    itemList={form.secondaryRadius.list}
                    onClick={authMethod => changeValue('secondaryRadius', authMethod)}
                  />
                </div>
              </div>
            </>
          )
        }
        {/* MAC authentication */}
        {
          checkSupportedSetting('MAC authentication') && (
            <>
              <div className="form-group">
                <div className='form-title'>
                  MAC authentication
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id="mac-authentication-enable"
                    name="macAuthenticationbEnable"
                    label="Enable"
                    hasRightMargin={true}
                    checked={form.macAuthenication.value}
                    onChange={() => changeValue('macAuthenication', true)}
                  />
                  <RadioButton
                    id="mac-authentication-disable"
                    name="macAuthenticationbDisable"
                    label="Disable"
                    checked={!form.macAuthenication.value}
                    onChange={() => changeValue('macAuthenication', false)}
                  />
                </div>
              </div>
            </>
          )
        }
        {/* Session timeout */}
        {
          checkSupportedSetting('Session timeout') && (
            <>
              <div className="form-group">
                <div className='form-title required'>
                  Session timeout
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type="number"
                    isMiddleSize={true}
                    placeholder="2-1440"
                    autoComplete="new-email"
                    value={form.sessionTimeout.value}
                    onChange={(e) => changeValue('sessionTimeout', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>minutes</div>
                </div>
              </div>
            </>
          )
        }
        {/* Idle timeout */}
        {
          checkSupportedSetting('Idle timeout') && (
            <>
              <div className="form-group">
                <div className='form-title required'>
                  Idle timeout
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type="number"
                    isMiddleSize={true}
                    placeholder="1-1439"
                    autoComplete="new-email"
                    value={form.idleTimeout.value}
                    onChange={(e) => changeValue('idleTimeout', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>minutes</div>
                </div>
              </div>
            </>
          )
        }
        {/* Session limited */}
        {
          checkSupportedSetting('Session limited') && (
            <>
              <div className="form-group">
                <div
                  className='form-title'
                >
                  Session limited
                </div>
                <div className='form-field form-field--dropdown-middle-width'>
                  <DropdownWithItem
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form.sessionLimited.selected}
                    itemList={form.sessionLimited.list}
                    onClick={item => changeValue('sessionLimited', item,)}
                  />
                </div>
              </div>
            </>
          )
        }
        {/* Traffic limited */}
        {
          checkSupportedSetting('Traffic limited') && (
            <>
              <div className="form-group">
                <div className='form-title'>
                  Traffic limited
                  <TooltipDialog
                    className="ms-1 me-1"
                    placement="right"
                    title="Limit the amount of data each client can transfer in a session. 0 means unlimited."
                  />
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type="number"
                    isMiddleSize={true}
                    placeholder="0-100000"
                    autoComplete="new-email"
                    value={form.trafficLimited.value}
                    onChange={(e) => changeValue('trafficLimited', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>MB/session</div>
                </div>
              </div>
            </>
          )
        }
        {/* Walled garden */}
        {
          checkSupportedSetting('Walled garden') && (
            <>
              <div className="form-group">
                <div className='form-title'>
                  Walled garden
                </div>
                <div
                  className='form-field form-field--horizontal'
                  style={{ flexWrap: 'wrap' }}
                >
                  <DropdownWithCheckbox
                    id='walled-garden-dropdown'
                    type='checkbox'
                    isMiddleSize={true}
                    itemList={form.walledGarden.list}
                    onChange={walledGarden => changeValue('walledGarden', walledGarden)}
                  />
                  <div>
                    <Button
                      label="Add walled garden"
                      className='btn-grey-blue'
                      onClick={() => changeModalStatus(modalStatus.addWalledGarden.self, true)}
                    />
                  </div>
                  <div>
                    <Link to="/cloud/configure/walled-garden" className='text-decoration-underline'>
                      Walled garden
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )
        }
        {/* URL Redirection */}
        {
          checkSupportedSetting('URL redirection') && (
            <>
              <div className="form-group">
                <div
                  className='form-title'
                >
                  URL Redirection
                  <TooltipDialog
                    className="ms-1 me-1"
                    placement="right"
                    title="Users will be redirected to this URL after successful authentication and every periodic of minutes."
                  />
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id="url-redirection-enable"
                    name="urlRedirectionEnable"
                    label="Enable"
                    hasRightMargin={true}
                    checked={form.urlRedirection.value}
                    onChange={() => changeValue('urlRedirection', true)}
                  />
                  <RadioButton
                    id="url-redirection-disable"
                    name="urlRedirectionDisable"
                    label="Disable"
                    checked={!form.urlRedirection.value}
                    onChange={() => changeValue('urlRedirection', false)}
                  />
                </div>
              </div>
            </>
          )
        }
        {/* Facebook Wi-Fi Settings */}
        {/* {
          checkSupportedSetting('Facebook Wi-Fi Settings') && (
            <>
              <div className="form-group">
                <div className='form-title'>
                  Facebook Wi-Fi Settings
                </div>
                <div className='form-field'>
                  <Button
                    label="Configure"
                    className='btn-grey-blue'
                    onClick={() => { }}
                  />
                </div>
              </div>
            </>
          )
        } */}
        {/* Facebook Page */}
        {/* {
          checkSupportedSetting('Facebook Page') && (
            <>
              <div className="form-group">
                <div className='form-title'>
                  Facebook Page
                </div>
                <div className='form-field'>
                  Not connected
                </div>
              </div>
            </>
          )
        } */}

        <div className='apply-btn-group'>
          <Button
            label='Cancel'
            className='btn-cancel me-3'
            onClick={() => { console.log('Click on Cancel') }}
          />
          <Button
            label='Apply'
            className='btn-submit'
            onClick={() => pushToDevice()}
          />
        </div>
      </div>
    </>
  );
}

export default CaptivePortal;