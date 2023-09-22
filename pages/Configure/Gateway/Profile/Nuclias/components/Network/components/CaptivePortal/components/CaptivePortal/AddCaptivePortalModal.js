import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// Component
import {
  DropdownWithItem, Button, ModalContainer, Input, RadioButton,
  DropdownWithCheckbox, TooltipDialog, Checkbox
} from 'components/';

// Dummy data & util
import { getCaptivePortalConfig } from 'dummy/data/gateway/data/network/captive-portal/captive-portal';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const AddCaptivePortalModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    addCommonPool,
    supportedSettingDefinition,
    captivePortalDefinition,
    authenticationServerDefinition,
    sessionLimitedDefinition,
    gracePeriodDefinition,
    authenticationTimesDefinition,
    redirectionIntervalDefinition,
    splashPage,
    localDb,
    radius,
    ldap,
    sms,
    walledGarden,
    ssidAndVlan,
  } = props;

  const navigate = useNavigate();

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  const changeSplashPage = (captivePortalType, splashPage) => {
    const updatedForm = cloneDeep(form);
    updatedForm.splashPage[captivePortalType].forEach(item => {
      item.isActive = item.type === splashPage.type;
    });
    setForm(updatedForm);
  };

  const checkSupportedSetting = (title) => {
    const selectedCaptivePortal = form.captivePortal.find(item => item.isActive);
    const supportedId = supportedSettingDefinition.find(item => item.title === title).id;
    return selectedCaptivePortal.supportedSettings.includes(supportedId);
  }

  // Side effect
  useEffect(() => {
    if (!modalStatus.addCp.status) {
      return;
    }

    const cpConfig = getCaptivePortalConfig();

    // Captive portal
    const captivePortalDropdown = captivePortalDefinition.map(item => {
      return {
        title: item.title,
        value: item.title,
        type: item.title,
        supportedSettings: item.supportedSettings,
        isActive: false
      }
    });
    captivePortalDropdown[0].isActive = true;

    // Splash page
    const splashPageType = {};
    for (const captivePortal of captivePortalDropdown) {
      const copiedSplashPage = cloneDeep(splashPage);
      if (captivePortal.type !== 'None') {
        splashPageType[captivePortal.type] = copiedSplashPage.filter(item => {
          if (
            item.type === '' ||
            item.type === captivePortal.type ||
            item.type === 'Template'
          ) {
            return item;
          }

          return null;
        });
        splashPageType[captivePortal.type][0].isActive = true;
      }
    }

    // Authentication server
    const authenticationServerDropdown = authenticationServerDefinition.map(item => {
      return {
        title: item,
        value: item,
        isActive: false
      }
    });
    authenticationServerDropdown[0].isActive = true;

    // Local authentication
    const localDbDropdown = localDb.map(item => {
      return {
        title: item.title,
        value: item.title,
        isActive: false
      }
    });
    localDbDropdown[0].isActive = true;

    // RADIUS
    const primaryRadiusDropdown = radius.map(item => {
      return {
        title: item.title,
        value: item.title,
        isActive: false
      }
    });
    const secondaryRadiusDropdown = cloneDeep(primaryRadiusDropdown);
    secondaryRadiusDropdown.unshift({
      title: 'Select',
      value: 'Select',
      isActive: false
    });
    primaryRadiusDropdown[0].isActive = true;
    secondaryRadiusDropdown[0].isActive = true;

    // LDAP
    const primaryLdapDropdown = ldap.map(item => {
      return {
        title: item.title,
        value: item.title,
        isActive: false
      }
    });
    const secondaryLdapDropdown = cloneDeep(primaryLdapDropdown);
    secondaryLdapDropdown.unshift({
      title: 'Select',
      value: 'Select',
      isActive: false
    });
    primaryLdapDropdown[0].isActive = true;
    secondaryLdapDropdown[0].isActive = true;

    // Session limited
    const sessionLimitedDropdown = sessionLimitedDefinition.map(item => {
      return {
        title: item,
        value: item,
        isActive: false
      }
    });
    sessionLimitedDropdown[0].isActive = true;

    // Grace period
    const gracePeriodDropdown = gracePeriodDefinition.map(item => {
      return {
        title: item,
        value: item,
        isActive: false
      }
    });
    gracePeriodDropdown[1].isActive = true;

    // Authentication times
    const authenticationTimesDropdown = authenticationTimesDefinition.map(item => {
      return {
        title: item,
        value: item,
        isActive: false
      }
    });
    authenticationTimesDropdown[authenticationTimesDropdown.length - 1].isActive = true;

    // SMS configuration
    const smsConfigurationDropdown = sms.map(item => {
      return {
        title: item.title,
        value: item.title,
        isActive: false
      }
    });
    smsConfigurationDropdown.unshift({
      title: 'Select',
      value: 'Select',
      isActive: false
    });
    smsConfigurationDropdown[0].isActive = true;

    // Walled garden
    const walledGardenDropdown = walledGarden.map(item => {
      return {
        title: item.title,
        value: item.title,
        checked: false
      }
    });

    // Redirection interval
    const redirectionIntervalDropdown = redirectionIntervalDefinition.map(item => {
      return {
        title: item,
        value: item,
        isActive: false
      }
    });
    redirectionIntervalDropdown[0].isActive = true;

    // SSID / VLAN
    const ssidAndVlanDropdown = ssidAndVlan.map(item => {
      return {
        title: item.interface,
        value: item.interface,
        checked: false
      }
    });

    cpConfig.captivePortal = captivePortalDropdown;
    cpConfig.splashPage = splashPageType;
    cpConfig.authenticationServer = authenticationServerDropdown;
    cpConfig.localAuthentication = localDbDropdown;
    cpConfig.primaryRadiusServer = primaryRadiusDropdown;
    cpConfig.secondaryRadiusServer = secondaryRadiusDropdown;
    cpConfig.primaryLdapServer = primaryLdapDropdown;
    cpConfig.secondaryLdapServer = secondaryLdapDropdown;
    cpConfig.sessionLimited = sessionLimitedDropdown;
    cpConfig.gracePeriod = gracePeriodDropdown;
    cpConfig.authenticationTimes = authenticationTimesDropdown;
    cpConfig.smsConfiguration = smsConfigurationDropdown;
    cpConfig.walledGarden = walledGardenDropdown;
    cpConfig.redirectionInterval = redirectionIntervalDropdown;
    cpConfig.ssidAndVlan = ssidAndVlanDropdown;

    setForm(cpConfig);
  }, [modalStatus.addCp.status]);

  if (!form) {
    return;
  }

  const selectedCaptivePortal = form.captivePortal.find(item => item.isActive);

  return (
    <ModalContainer
      modalWidthType='modal-1400px'
      openModal={modalStatus.addCp.status}
      closeModal={() => changeModalStatus(modalStatus.addCp.self, false)}
    >
      <div className='header'>
        <div className='title'>Add captive portal</div>
      </div>
      <div className='body'>
        {/* Name */}
        <div className='form-group'>
          <div className='form-title required'>Name</div>
          <div className='form-field'>
            <Input
              type='text'
              isMiddleSize={true}
              placeholder='1-64 characters'
              autoComplete='new-email'
              value={form.name}
              onChange={(e) => changeValue('name', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </div>
        </div>
        {/* Captive portal */}
        <div className='form-group form-group--align-top'>
          <div className='form-title'>Captive portal</div>
          <div className='form-field'>
            {
              form.captivePortal.map((captivePortal, index) => {
                return (
                  <div className={`mb-2 ${mainStyle['user-authentication-right']}`} key={`captive-portal-${index}`}>
                    <RadioButton
                      id={`captive-portal-${captivePortal.title}`}
                      key={captivePortal.title}
                      label={captivePortal.title}
                      checked={captivePortal.isActive}
                      onChange={() => changeValue('captivePortal', captivePortal)}
                    />
                    {
                      (
                        selectedCaptivePortal.type === captivePortal.type && captivePortal.value !== 'None'
                      ) && (
                        <>
                          <div className={mainStyle['dropdown-button']}>
                            <DropdownWithItem
                              type='normal'
                              isMiddleSize={true}
                              style={{ width: '220px' }}
                              dropDownMenuStyle={{ width: 'auto' }}
                              isTruncate={true}
                              selectedItem={form.splashPage[captivePortal.type].find(item => item.isActive)}
                              itemList={form.splashPage[captivePortal.type]}
                              onClick={splashPage => changeSplashPage(captivePortal.type, splashPage)}
                            />
                          </div>
                          <Button
                            label='Splash page editor'
                            className={`btn-grey-blue ${mainStyle['goto-splash-page-editor']}`}
                            onClick={() => navigate('/cloud/configure/splash-page')}
                          />
                        </>
                      )
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* Basic login page */}
        {
          checkSupportedSetting('Basic login page') && (
            <>
              <div className='form-group'>
                <div className='form-title'>Basic login page</div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id='localdb-enable'
                    name='localdbEnable'
                    label='Local authentication'
                    hasRightMargin={true}
                    checked={form.basicLoginPage}
                    onChange={() => changeValue('basicLoginPage', true)}
                  />
                  <RadioButton
                    id='authentication-enable'
                    name='authenticationEnable'
                    label='Authentication server'
                    hasRightMargin={true}
                    checked={!form.basicLoginPage}
                    onChange={() => changeValue('basicLoginPage', false)}
                  />
                </div>
              </div>
              {
                form.basicLoginPage ? (
                  <>
                    {/* Local authentication */}
                    <div className='form-group'>
                      <div className='form-title form-title--indent'>Local authentication</div>
                      <div
                        className='form-field form-field--horizontal'
                        style={{ flexWrap: 'wrap' }}
                      >
                        <DropdownWithItem
                          type='normal'
                          isMiddleSize={true}
                          selectedItem={form.localAuthentication.find(item => item.isActive)}
                          itemList={form.localAuthentication}
                          onClick={authMethod => {
                            changeValue('localAuthentication', authMethod)
                          }}
                        />
                        <div>
                          <Button
                            label="Add authentication users"
                            className='btn-grey-blue'
                            onClick={() => addCommonPool('addCp', 'addLocalDb')}
                          />
                        </div>
                        <div>
                          <Link to="/cloud/configure/authentication/local-authentication-list" className='text-decoration-underline'>Local authentication list</Link>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Authentication server */}
                    <div className='form-group form-group--align-top'>
                      <div className='form-title form-title--indent'>Authentication server</div>
                      <div className='form-field form-field--horizontal'>
                        <div
                          className='form-field form-field--horizontal'
                          style={{ flexWrap: 'wrap' }}
                        >
                          {
                            form.authenticationServer.find(item => item.isActive).title === 'RADIUS' ? (
                              <>
                                <DropdownWithItem
                                  type='normal'
                                  isMiddleSize={true}
                                  selectedItem={form.authenticationServer.find(item => item.isActive)}
                                  itemList={form.authenticationServer}
                                  onClick={authMethod => changeValue('authenticationServer', authMethod)}
                                />
                                <div>
                                  <Button
                                    label='Add a RADIUS server'
                                    className='btn-grey-blue'
                                    onClick={() => addCommonPool('addCp', 'addRadius')}
                                  />
                                </div>
                                <div>
                                  <Link to='/cloud/configure/authentication/authentication-servers' className='text-decoration-underline'>RADIUS servers</Link>
                                </div>
                              </>
                            ) : (
                              <>
                                <DropdownWithItem
                                  type='normal'
                                  isMiddleSize={true}
                                  selectedItem={form.authenticationServer.find(item => item.isActive)}
                                  itemList={form.authenticationServer}
                                  onClick={authMethod => changeValue('authenticationServer', authMethod)}
                                />
                                <div>
                                  <Button
                                    label='Add a LDAP server'
                                    className='btn-grey-blue'
                                    onClick={() => addCommonPool('addCp', 'addLdap')}
                                  />
                                </div>
                                <div>
                                  <Link to='/cloud/configure/authentication/authentication-servers' className='text-decoration-underline'>LDAP servers</Link>
                                </div>
                              </>
                            )
                          }
                        </div>
                      </div>
                    </div>
                    {
                      form.authenticationServer.find(item => item.isActive).title === 'RADIUS' ? (
                        <>
                          {/* Primary RADIUS server */}
                          <div className='form-group'>
                            <div className='form-title form-title--indent'>Primary RADIUS server</div>
                            <div className='form-field form-field--dropdown-middle-width'>
                              <DropdownWithItem
                                type='normal'
                                isMiddleSize={true}
                                selectedItem={form.primaryRadiusServer.find(item => item.isActive)}
                                itemList={form.primaryRadiusServer}
                                onClick={authMethod => changeValue('primaryRadiusServer', authMethod)}
                              />
                            </div>
                          </div>
                          {/* Secondary RADIUS server */}
                          <div className='form-group'>
                            <div className='form-title form-title--indent'>Secondary RADIUS server</div>
                            <div className='form-field form-field--dropdown-middle-width'>
                              <DropdownWithItem
                                type='normal'
                                isMiddleSize={true}
                                selectedItem={form.secondaryRadiusServer.find(item => item.isActive)}
                                itemList={form.secondaryRadiusServer}
                                onClick={authMethod => changeValue('secondaryRadiusServer', authMethod)}
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Primary LDAP server */}
                          <div className='form-group'>
                            <div className='form-title form-title--indent'>Primary LDAP server</div>
                            <div className='form-field form-field--dropdown-middle-width'>
                              <DropdownWithItem
                                type='normal'
                                isMiddleSize={true}
                                selectedItem={form.primaryLdapServer.find(item => item.isActive)}
                                itemList={form.primaryLdapServer}
                                onClick={authMethod => changeValue('primaryLdapServer', authMethod)}
                              />
                            </div>
                          </div>
                          {/* Secondary LDAP server */}
                          <div className='form-group'>
                            <div className='form-title form-title--indent'>Secondary LDAP server</div>
                            <div className='form-field form-field--dropdown-middle-width'>
                              <DropdownWithItem
                                type='normal'
                                isMiddleSize={true}
                                selectedItem={form.secondaryLdapServer.find(item => item.isActive)}
                                itemList={form.secondaryLdapServer}
                                onClick={authMethod => changeValue('secondaryLdapServer', authMethod)}
                              />
                            </div>
                          </div>
                        </>
                      )
                    }
                  </>
                )
              }
            </>
          )
        }
        {/* Email authentication */}
        {
          checkSupportedSetting('E-mail authentication') && (
            <>
              <div className='form-group mt-2'>
                <div className='form-title'>
                  Email authentication
                  <TooltipDialog
                    className='ms-1 me-1'
                    title='By enabling this feature, your guest users would receive an email with authentication link sent by Nuclias cloud to continue the use of Wi-Fi.'
                  />
                </div>
              </div>
              {/* Grace period */}
              <div className='form-group'>
                <div className='form-title form-title--indent'>
                  Grace period
                  <TooltipDialog
                    className='ms-1 me-1'
                    title='Grace period is the time limit of Wi-Fi access for your guest users to verify email to continue the use of Wi-Fi.'
                  />
                </div>
                <div className='form-field form-field--dropdown-middle-width'>
                  <DropdownWithItem
                    type='normal'
                    isMiddleSize={true}
                    selectedItem={form.gracePeriod.find(item => item.isActive)}
                    itemList={form.gracePeriod}
                    onClick={authMethod => changeValue('gracePeriod', authMethod)}
                  />
                </div>
              </div>
              {/* Authentication times */}
              <div className='form-group'>
                <div className='form-title form-title--indent'>
                  Authentication times
                  <TooltipDialog
                    className='ms-1 me-1'
                    title='You may limit the Email authentication times for the same guest user in one day.'
                  />
                </div>
                <div className='form-field form-field--dropdown-middle-width'>
                  <DropdownWithItem
                    type='normal'
                    isMiddleSize={true}
                    selectedItem={form.authenticationTimes.find(item => item.isActive)}
                    itemList={form.authenticationTimes}
                    onClick={authMethod => changeValue('authenticationTimes', authMethod)}
                  />
                </div>
              </div>
              {/* Denial period limit */}
              <div className='form-group'>
                <div className='form-title form-title--indent required'>
                  Denial period limit
                  <TooltipDialog
                    className='ms-1 me-1'
                    title='You may set up the time limits for guest users to request another Email authentication if they failed and/or the grace period is expired.'
                  />
                </div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type='number'
                    isMiddleSize={true}
                    placeholder='0-180'
                    autoComplete='new-email'
                    value={form.denialPeriodLimit}
                    onChange={(e) => changeValue('denialPeriodLimit', e.target.value)}
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
              <div className='form-group'>
                <div className='form-title required'>
                  SMS configuration
                  <TooltipDialog
                    className='ms-1 me-1'
                    placement='right'
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
                    selectedItem={form.smsConfiguration.find(item => item.isActive)}
                    itemList={form.smsConfiguration}
                    onClick={sms => changeValue('smsConfiguration', sms)}
                  />
                  <div>
                    <Button
                      label="Add Twilio SMS settings"
                      className='btn-grey-blue'
                      onClick={() => addCommonPool('addCp', 'addSms')}
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
              <div className='form-group form-group--align-top'>
                <div className='form-title'>
                  3rd party credentials
                  <TooltipDialog
                    className='ms-1 me-1'
                    title="Due to the 3rd party\'s security policy, if the log-in WebView is not pop up automatically, please open the browser to log in to Wi-Fi."
                  />
                </div>
                <div className='form-field form-field--horizontal'>
                  <Checkbox
                    id='third-party-facebook'
                    htmlFor='third-party-facebook'
                    type='checkbox'
                    label='Facebook'
                    checked={form.facebook}
                    onChange={() => changeValue('facebook', !form.facebook)}
                  />
                  <Checkbox
                    id='third-party-google'
                    htmlFor='third-party-google'
                    type='checkbox'
                    label='Google'
                    checked={form.google}
                    onChange={() => changeValue('google', !form.google)}
                  />
                  <Checkbox
                    id='third-party-line'
                    htmlFor='third-party-line'
                    type='checkbox'
                    label='Line'
                    checked={form.line}
                    onChange={() => changeValue('line', !form.line)}
                  />
                  <Checkbox
                    id='third-party-weibo'
                    htmlFor='third-party-weibo'
                    type='checkbox'
                    label='wWeibo'
                    checked={form.weibo}
                    onChange={() => changeValue('weibo', !form.weibo)}
                  />
                  <Checkbox
                    id='third-party-twitter'
                    htmlFor='third-party-twitter'
                    type='checkbox'
                    label='Twitter'
                    checked={form.twitter}
                    onChange={() => changeValue('twitter', !form.twitter)}
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
              <div className='form-group'>
                <div className='form-title'>Simultaneous login</div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id='simultaneous-login-enable'
                    name='simultaneousLoginEnable'
                    label='Enable'
                    hasRightMargin={true}
                    checked={form.simultaneousLogin}
                    onChange={() => changeValue('simultaneousLogin', true)}
                  />
                  <RadioButton
                    id='simultaneous-login-disable'
                    name='simultaneousLoginDisable'
                    label='Disable'
                    checked={!form.simultaneousLogin}
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
              <div className='form-group'>
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
              <div className='form-group'>
                <div className='form-title required'>
                  Splash page URL
                </div>
                <div className='form-field form-field--horizontal'>
                  <div>
                    http://
                  </div>
                  <Input
                    type='text'
                    autoComplete='new-email'
                    value={form.splashPageUrl}
                    style={{ flexGrow: '1' }}
                    onChange={e => changeValue('splashPageUrl', e.target.value)}
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
              <div className='form-group'>
                <div className='form-title'>RADIUS server</div>
              </div>
              <div className='form-group form-group--align-top'>
                <div className='form-title form-title--indent required'>Primary RADIUS server</div>
                <div
                  className='form-field form-field--horizontal'
                  style={{ flexWrap: 'wrap' }}
                >
                  <DropdownWithItem
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form.primaryRadiusServer.find(item => item.isActive)}
                    itemList={form.primaryRadiusServer}
                    onClick={authMethod => changeValue('primaryRadiusServer', authMethod)}
                  />
                  <div>
                    <Button
                      label="Add a RADIUS server"
                      className='btn-grey-blue'
                      onClick={() => addCommonPool('addCp', 'addRadius')}
                    />
                  </div>
                  <div>
                    <Link to="/cloud/configure/authentication/authentication-servers" className='text-decoration-underline'>RADIUS servers</Link>
                  </div>
                </div>
              </div>
              <div className='form-group form-group--align-top'>
                <div className='form-title form-title--indent'>Secondary RADIUS server</div>
                <div
                  className='form-field form-field--horizontal'
                  style={{ flexWrap: 'wrap' }}
                >
                  <DropdownWithItem
                    type="normal"
                    isMiddleSize={true}
                    selectedItem={form.secondaryRadiusServer.find(item => item.isActive)}
                    itemList={form.secondaryRadiusServer}
                    onClick={authMethod => changeValue('secondaryRadiusServer', authMethod)}
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
              <div className='form-group'>
                <div className='form-title'>MAC authentication
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id="mac-authentication-enable"
                    name="macAuthenticationEnable"
                    label="Enable"
                    hasRightMargin={true}
                    checked={form.macAuthentication}
                    onChange={() => changeValue('macAuthentication', true)}
                  />
                  <RadioButton
                    id="mac-authentication-disable"
                    name="macAuthenticationDisable"
                    label="Disable"
                    checked={!form.macAuthentication}
                    onChange={() => changeValue('macAuthentication', false)}
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
              <div className='form-group'>
                <div className='form-title required'>Session timeout</div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type='number'
                    isMiddleSize={true}
                    placeholder='2-1440'
                    autoComplete='new-email'
                    value={form.sessionTimeout}
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
        {/* Session limited */}
        {
          checkSupportedSetting('Session limited') && (
            <>
              <div className='form-group'>
                <div className='form-title'>Session limited</div>
                <div className='form-field form-field--dropdown-middle-width'>
                  <DropdownWithItem
                    type='normal'
                    isMiddleSize={true}
                    selectedItem={form.sessionLimited.find(item => item.isActive)}
                    itemList={form.sessionLimited}
                    onClick={authMethod => changeValue('sessionLimited', authMethod)}
                  />
                </div>
              </div>
            </>
          )
        }
        {/* Idle timeout */}
        {
          checkSupportedSetting('Idle timeout') && (
            <>
              <div className='form-group'>
                <div className='form-title required'>Session timeout</div>
                <div className='form-field form-field--horizontal'>
                  <Input
                    type='number'
                    isMiddleSize={true}
                    placeholder='1-1439'
                    autoComplete='new-email'
                    value={form.idleTimeout}
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
        {/* Walled garden (optional) */}
        {
          checkSupportedSetting('Walled garden (optional)') && (
            <>
              <div className='form-group form-group--align-top'>
                <div className='form-title'>Walled garden (optional)</div>
                <div
                  className='form-field form-field--horizontal'
                  style={{ flexWrap: 'wrap' }}
                >
                  <DropdownWithCheckbox
                    id='walled-garden-dropdown'
                    type='checkbox'
                    isMiddleSize={true}
                    itemList={form.walledGarden}
                    onChange={walledGarden => changeValue('walledGarden', walledGarden)}
                  />
                  <div>
                    <Button
                      label='Add walled garden'
                      className='btn-grey-blue'
                      onClick={() => addCommonPool('addCp', 'addWalledGarden')}
                    />
                  </div>
                  <div>
                    <Link to='/cloud/configure/walled-garden' className='text-decoration-underline'>
                      Walled garden
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )
        }
        {/* URL redirection */}
        {
          checkSupportedSetting('URL redirection') && (
            <>

              <div className='form-group'>
                <div className='form-title'>
                  URL redirection
                  <TooltipDialog
                    className='ms-1 me-1'
                    title='Users will be redirected to this URL after successful authentication and every periodic of minutes.'
                  />
                </div>
                <div className='form-field form-field--horizontal'>
                  <RadioButton
                    id='url-redirection-enable'
                    name='urlRedirectionEnable'
                    label='Enable'
                    hasRightMargin={true}
                    checked={form.urlRedirection}
                    onChange={() => changeValue('urlRedirection', true)}
                  />
                  <RadioButton
                    id='url-redirection-disable'
                    name='urlRedirectionDisable'
                    label='Disable'
                    checked={!form.urlRedirection}
                    onChange={() => changeValue('urlRedirection', false)}
                  />
                </div>
              </div>
              {
                form.urlRedirection && (
                  <>

                    {/* URL for redirection */}
                    <div className='form-group'>
                      <div className='form-title form-title--indent required'>URL for redirection</div>
                      <div className='form-field'>
                        <Input
                          type='text'
                          autoComplete='new-email'
                          placeholder='http:// or https://'
                          value={form.urlForRedirect.value}
                          style={{ flexGrow: '1' }}
                          onChange={e => changeValue('urlForRedirect', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </div>
                    </div>
                    {/* Redirection interval */}
                    <div className='form-group'>
                      <div className='form-title form-title--indent'>Redirection interval</div>
                      <div className='form-field form-field--dropdown-middle-width'>
                        <DropdownWithItem
                          type='normal'
                          isMiddleSize={true}
                          selectedItem={form.redirectionInterval.find(item => item.isActive)}
                          itemList={form.redirectionInterval}
                          onClick={authMethod => changeValue('redirectionInterval', authMethod)}
                        />
                      </div>
                    </div>
                  </>
                )
              }
            </>
          )
        }
        {/* SSID / VLAN */}
        {
          checkSupportedSetting('SSID / VLAN') && (
            <>
              <div className='form-group'>
                <div className='form-title'>SSID / VLAN</div>
                <div className='form-field'>
                  <DropdownWithCheckbox
                    allMode={true}
                    label='c7d0b2bf4f'
                    id='interface-dropdown'
                    isMiddleSize={true}
                    type='checkbox'
                    itemList={form.ssidAndVlan}
                    onChangeAll={isToggleAll => {
                      const tmpSsidAndVlan = cloneDeep(form.ssidAndVlan);
                      tmpSsidAndVlan.forEach(item => {
                        item.checked = isToggleAll;
                      });

                      const updatedForm = cloneDeep(form);
                      updatedForm.ssidAndVlan = tmpSsidAndVlan;
                      setForm(updatedForm);
                    }}
                    onChange={item => {
                      const tmpSsidAndVlan = cloneDeep(form.ssidAndVlan);
                      tmpSsidAndVlan.forEach(ssidAndVlan => {
                        if (ssidAndVlan.title === item.title) {
                          ssidAndVlan.checked = !ssidAndVlan.checked;
                        }
                      });

                      const updatedForm = cloneDeep(form);
                      updatedForm.ssidAndVlan = tmpSsidAndVlan;
                      setForm(updatedForm);
                    }}
                  />
                </div>
              </div>
            </>
          )
        }
      </div>

      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus(modalStatus.addCp.self, false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus(modalStatus.addCp.self, false)}
        />
      </div>
    </ModalContainer >
  );
};

export default AddCaptivePortalModal;
