import mainStyle from './alert-settings.module.scss';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Components
import {
  MessageBoxGroup,
  Breadcrumb,
  DropdownWithItem,
  Checkbox,
  Input,
  Button
} from 'components';

const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPathList = [
  { label: '6525f0afe7', isLink: false }, // Settings
  { label: '5cfe7a6558', isLink: false } // Alert settings
];

const delayTimeList = [
  { title: 5, value: 5, isActive: false },
  { title: 10, value: 10, isActive: false },
  { title: 15, value: 15, isActive: false },
  { title: 30, value: 30, isActive: false },
  { title: 60, value: 60, isActive: false }
]

export const defaultAllowedAlertType = {
  email: true, // show
  app: false // hide
}

const defaultAlertSettings = {
  notifyDeviceUnregistry: {
    id: {
      tr: 's_eas_device_registry_tr',
      title: 's_eas_device_registry',
      email: 's_eas_device_registry_email',
      app: 's_eas_device_registry_app',
    },
    type: 'site-wide',
    label: 'd5dcad557a', // Device registry
    checked: { email: false, app: false }
  },
  notifyFWUpgradeSuccess: {
    id: {
      tr: 's_eas_fw_upgrade_success_tr',
      title: 's_eas_fw_upgrade_success',
      email: 's_eas_fw_upgrade_success_email',
      app: 's_eas_fw_upgrade_success_app',
    },
    type: 'site-wide',
    label: '906d4b8da4', // Device firmware has upgraded successfully
    checked: { email: false, app: false }
  },
  notifyFWUpgradeFail: {
    id: {
      tr: 's_eas_fw_upgrade_failed_tr',
      title: 's_eas_fw_upgrade_failed',
      email: 's_eas_fw_upgrade_failed_email',
      app: 's_eas_fw_upgrade_failed_app',
    },
    type: 'site-wide',
    label: 'a5c2483514', // Device firmware upgrade has failed
    checked: { email: false, app: false }
  },
  notifyDeviceChangeProfile: {
    id: {
      tr: 's_eas_profile_updated_tr',
      title: 's_eas_profile_updated',
      email: 's_eas_profile_updated_email',
      app: 's_eas_profile_updated_app',
    },
    type: '',
    label: '93a2c04265', // Device Site and/or Profile has been updated ( same with notifyDeviceChangeSite )
    checked: { email: false, app: false }
  },
  notifyDeviceChangeSite: {
    id: {
      tr: 's_eas_site_updated_tr',
      title: 's_eas_site_updated',
      email: 's_eas_site_updated_email',
      app: 's_eas_site_updated_app',
    },
    type: 'site-wide',
    label: '93a2c04265', // Device Site and/or Profile has been updated ( same with notifyDeviceChangeProfile )
    checked: { email: false, app: false }
  },
  notifyDeviceOnline: {
    id: {
      tr: 's_eas_device_connected_success_tr',
      title: 's_eas_device_connected_success',
      email: 's_eas_device_connected_success_email',
      app: 's_eas_device_connected_success_app',
    },
    type: 'site-wide',
    label: '65d3b23f5a', // Device has connected to the Nuclias cloud successfully
    checked: { email: false, app: false }
  },
  notifyConfigApplySuccess: {
    id: {
      tr: 's_eas_apply_success_tr',
      title: 's_eas_apply_success',
      email: 's_eas_apply_success_email',
      app: 's_eas_apply_success_app',
    },
    type: 'site-wide',
    label: 'b238fedd3f', // Device Profile configuration has been applied successfully
    checked: { email: false, app: false }
  },
  notifyConfigApplyFail: {
    id: {
      tr: 's_eas_apply_failed_tr',
      title: 's_eas_apply_failed',
      email: 's_eas_apply_failed_email',
      app: 's_eas_apply_failed_app',
    },
    type: 'site-wide',
    label: '290f7e7934', // Device Profile configuration update has failed
    checked: { email: false, app: false }
  },
  notifyApOffline: {
    id: {
      tr: 's_eas_ap_offline_tr',
      title: 's_eas_ap_offline',
      email: 's_eas_ap_offline_email',
      app: 's_eas_ap_offline_app',
    },
    type: 'access-point',
    label: '7826518179', // Access point has been offline for xxx
    unit: '26fba427f3', // minutes
    checked: { email: false, app: false },
    delay: null,
    delayList: cloneDeep(delayTimeList)
  },
  notifySwitchOffline: {
    id: {
      tr: 's_eas_sw_offline_tr',
      title: 's_eas_sw_offline',
      email: 's_eas_sw_offline_email',
      app: 's_eas_sw_offline_app',
    },
    type: 'switch',
    label: '1483196d3c', // Switch has been offline for xxxx
    unit: '26fba427f3', // minutes
    checked: { email: false, app: false },
    delay: null,
    delayList: cloneDeep(delayTimeList)
  },
  notifySwitchPortOffline: {
    id: {
      tr: 's_eas_sw_port_offline_tr',
      title: 's_eas_sw_port_offline',
      email: 's_eas_sw_port_offline_email',
      app: 's_eas_sw_port_offline_app',
    },
    type: 'switch',
    label: 'c8aa302ebf', // xxx has been down for more than xxxx
    unit: '26fba427f3', // minutes
    checked: { email: false, app: false },
    selectedPort: null, // object
    port: null, // only value
    portList: [
      { title: '19a2738012', name: 'any', isActive: false }, // default option
      { title: 'tag-01', name: 'tag-01', isActive: false },
      { title: 'tag-02', name: 'tag-02', isActive: false },
      { title: 'tag-03', name: 'tag-03', isActive: false }
    ],
    delay: null,
    delayList: cloneDeep(delayTimeList)
  },
  notifyGatewayOffline: {
    id: {
      tr: 's_eas_gw_offline_tr',
      title: 's_eas_gw_offline',
      email: 's_eas_gw_offline_email',
      app: 's_eas_gw_offline_app',
    },
    type: 'geteway',
    label: 'a1dbad1dd7', // Gateway has been offline for
    unit: '26fba427f3', // minutes
    checked: { email: false, app: false },
    delay: null,
    delayList: cloneDeep(delayTimeList)
  },
  notifyGatewayDHCPLeasePoolExhaust: {
    id: {
      tr: 's_eas_gw_dhcp_exhaust_tr',
      title: 's_eas_gw_dhcp_exhaust',
      email: 's_eas_gw_dhcp_exhaust_email',
      app: 's_eas_gw_dhcp_exhaust_app',
    },
    type: 'geteway',
    label: '26b8190cc6', // A DHCP lease pool falls below 10%
    checked: { email: false, app: false }
  },
  notifyGatewayIPsecVPNConnConnect: {
    id: {
      tr: 's_eas_gw_ipsec_connect_tr',
      title: 's_eas_gw_ipsec_connect',
      email: 's_eas_gw_ipsec_connect_email',
      app: 's_eas_gw_ipsec_connect_app',
    },
    type: 'geteway',
    label: '843c17efb6', // An IPsec tunnel is connected
    checked: { email: false, app: false }
  },
  notifyGatewayIPsecVPNConnDisconnect: {
    id: {
      tr: 's_eas_gw_ipsec_disconnect_tr',
      title: 's_eas_gw_ipsec_disconnect',
      email: 's_eas_gw_ipsec_disconnect_email',
      app: 's_eas_gw_ipsec_disconnect_app',
    },
    type: 'geteway',
    label: '622f6bcf51', // An IPsec tunnel is disconnected
    checked: { email: false, app: false }
  },
  notifyGatewayWANConnConnect: {
    id: {
      tr: 's_eas_gw_wan_connect_tr',
      title: 's_eas_gw_wan_connect',
      email: 's_eas_gw_wan_connect_email',
      app: 's_eas_gw_wan_connect_app',
    },
    type: 'geteway',
    label: 'd0cc92e1e8', // A WAN port is connected
    checked: { email: false, app: false }
  },
  notifyGatewayWANConnDisconnect: {
    id: {
      tr: 's_eas_gw_wan_disconnect_tr',
      title: 's_eas_gw_wan_disconnect',
      email: 's_eas_gw_wan_disconnect_email',
      app: 's_eas_gw_wan_disconnect_app',
    },
    type: 'geteway',
    label: '78594fd41a', // A WAN port is disconnected
    checked: { email: false, app: false }
  },
  notifyGatewayNetworkUsageExceed: {
    id: {
      tr: 's_eas_gw_usage_exceed_tr',
      title: 's_eas_gw_usage_exceed',
      email: 's_eas_gw_usage_exceed_email',
      app: 's_eas_gw_usage_exceed_app',
    },
    type: 'geteway',
    label: 'c0a5b1ecac', // Network usage exceeds
    checked: { email: false, app: false },
    quantity: 60,
    selectedUnit: null,
    unit: null,
    unitList: [
      { title: 'ea6e721298', name: 'KB', isActive: false },
      { title: '3468c9e4d1', name: 'MB', isActive: false },
      { title: 'fad7aa65f9', name: 'GB', isActive: false },
      { title: 'bca21bf72d', name: 'TB', isActive: false }
    ],
    selectedTimeRange: null,
    timeRange: null,
    timeRangeList: [
      { title: '8f488b252b', name: '30 minutes', value: 30, isActive: false },
      { title: '95fc4bab98', name: '1 hour', value: 60, isActive: false },
      { title: 'e4c25cf626', name: '2 hours', value: 120, isActive: false },
      { title: '07e04c153c', name: '4 hours', value: 240, isActive: false },
      { title: '5b83ca9299', name: '1 day', value: 1440, isActive: false }
    ]
  }
};

const AlertSettings = () => {
  const { t } = useTranslation();
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const [alertSettings, setAlertSettings] = useState(cloneDeep(defaultAlertSettings));

  const toggleCheckboxes = (key, type) => {
    const newAlertSettings = cloneDeep(alertSettings);
    newAlertSettings[key].checked[type] = !newAlertSettings[key].checked[type];
    setAlertSettings(newAlertSettings);
  }

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />
      <div className={`layout-container layout-container--column layout-container--fluid ${mainStyle['alert-settings-container']}`}>

        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />
        <Row>
          <Col xl>
            <Card>
              <Card.Body>

                {/* SITE-WIDE */}
                <div className={mainStyle['alert-title-container']}>{t('f988dc6e0b')}</div>
                <table className={mainStyle['alert-table-container']}>
                  <thead>
                    <tr>
                      <th></th>

                      {/* Email */}
                      {
                        defaultAllowedAlertType.email &&
                        <th className={mainStyle['alert-thead']}>{t('ce8ae9da5b')}</th>
                      }

                      {/* App */}
                      {
                        defaultAllowedAlertType.app &&
                        <th className={mainStyle['alert-thead']}>{t('aa8f431b4d')}</th>
                      }

                    </tr>
                  </thead>
                  <tbody>
                    {
                      Object.keys(alertSettings).map(key => {
                        return (
                          alertSettings[key].type === 'site-wide' &&
                          <tr key={alertSettings[key].id.tr}>
                            <td key={alertSettings[key].id.title}>
                              {t(alertSettings[key].label)}
                            </td>

                            {
                              defaultAllowedAlertType.email &&
                              <td>
                                <Checkbox
                                  id={alertSettings[key].id.email}
                                  checked={alertSettings[key].checked.email}
                                  onChange={() => toggleCheckboxes(key, 'email')}
                                />
                              </td>
                            }

                            {
                              defaultAllowedAlertType.app &&
                              <td>
                                <Checkbox
                                  id={alertSettings[key].id.app}
                                  checked={alertSettings[key].checked.app}
                                  onChange={() => toggleCheckboxes(key, 'app')}
                                />
                              </td>
                            }

                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>

              </Card.Body>
            </Card>
          </Col>

          <Col xl>
            <Card>
              <Card.Body>
                {/* ACCESS POINT */}
                <div className={mainStyle['alert-title-container']}>{t('47382efedf')}</div>
                <table className={mainStyle['alert-table-container']}>
                  <thead>
                    <tr>
                      <th></th>

                      {/* Email */}
                      {
                        defaultAllowedAlertType.email &&
                        <th className={mainStyle['alert-thead']}>{t('ce8ae9da5b')}</th>
                      }

                      {/* App */}
                      {
                        defaultAllowedAlertType.app &&
                        <th className={mainStyle['alert-thead']}>{t('aa8f431b4d')}</th>
                      }

                    </tr>
                  </thead>
                  <tbody>
                    {
                      Object.keys(alertSettings).map(key => {
                        return (
                          alertSettings[key].type === 'access-point' &&
                          <tr key={alertSettings[key].id.tr}>
                            <td key={alertSettings[key].id.title} className={mainStyle['delay-container']}>
                              <div>{t(alertSettings[key].label)}</div>
                              <DropdownWithItem
                                selectedItem={alertSettings[key].delayList[0]}
                                itemList={alertSettings[key].delayList}
                                onClick={e => { }}
                              />
                              <div>{t(alertSettings[key].unit)}</div>
                            </td>

                            {
                              defaultAllowedAlertType.email &&
                              <td>
                                <Checkbox
                                  id={alertSettings[key].id.email}
                                  checked={alertSettings[key].checked.email}
                                  onChange={() => toggleCheckboxes(key, 'email')}
                                />
                              </td>
                            }

                            {
                              defaultAllowedAlertType.app &&
                              <td>
                                <Checkbox
                                  id={alertSettings[key].id.app}
                                  checked={alertSettings[key].checked.app}
                                  onChange={() => toggleCheckboxes(key, 'app')}
                                />
                              </td>
                            }
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>

              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xl>
            <Card>
              <Card.Body>

                {/* SWITCH */}
                <div className={mainStyle['alert-title-container']}>{t('8ced34b8bd')}</div>
                <table className={mainStyle['alert-table-container']}>
                  <thead>
                    <tr>
                      <th></th>

                      {/* Email */}
                      {
                        defaultAllowedAlertType.email &&
                        <th className={mainStyle['alert-thead']}>{t('ce8ae9da5b')}</th>
                      }

                      {/* App */}
                      {
                        defaultAllowedAlertType.app &&
                        <th className={mainStyle['alert-thead']}>{t('aa8f431b4d')}</th>
                      }

                    </tr>
                  </thead>
                  <tbody>
                    {
                      Object.keys(alertSettings).map(key => {
                        if (key === 'notifySwitchPortOffline') return null; // notifySwitchPortOffline temporarily hidden.

                        return (
                          alertSettings[key].type === 'switch' &&
                          <tr key={alertSettings[key].id.tr}>
                            <td key={alertSettings[key].id.title} className={mainStyle['delay-container']}>
                              {
                                key === 'notifySwitchPortOffline' &&
                                <DropdownWithItem
                                  selectedItem={alertSettings[key].portList[3]}
                                  itemList={alertSettings[key].portList}
                                  onClick={e => { }}
                                />
                              }
                              <div className='text-nowrap'>{t(alertSettings[key].label)}</div>
                              <DropdownWithItem
                                selectedItem={alertSettings[key].delayList[3]}
                                itemList={alertSettings[key].delayList}
                                onClick={e => { }}
                              />
                              <div>{t(alertSettings[key].unit)}</div>
                            </td>

                            {
                              defaultAllowedAlertType.email &&
                              <td>
                                <Checkbox
                                  id={alertSettings[key].id.email}
                                  checked={alertSettings[key].checked.email}
                                  onChange={() => toggleCheckboxes(key, 'email')}
                                />
                              </td>
                            }

                            {
                              defaultAllowedAlertType.app &&
                              <td>
                                <Checkbox
                                  id={alertSettings[key].id.app}
                                  checked={alertSettings[key].checked.app}
                                  onChange={() => toggleCheckboxes(key, 'app')}
                                />
                              </td>
                            }

                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>

              </Card.Body>
            </Card>
          </Col>

          <Col xl>
            <Card>
              <Card.Body>
                {/* GATEWAY */}
                <div className={mainStyle['alert-title-container']}>{t('cabe71bfd9')}</div>
                <table className={mainStyle['alert-table-container']}>
                  <thead>
                    <tr>
                      <th></th>

                      {/* Email */}
                      {
                        defaultAllowedAlertType.email &&
                        <th className={mainStyle['alert-thead']}>{t('ce8ae9da5b')}</th>
                      }

                      {/* App */}
                      {
                        defaultAllowedAlertType.app &&
                        <th className={mainStyle['alert-thead']}>{t('aa8f431b4d')}</th>
                      }

                    </tr>
                  </thead>
                  <tbody>
                    {
                      Object.keys(alertSettings).map(key => {
                        return (
                          alertSettings[key].type === 'geteway' &&
                          <tr key={alertSettings[key].id.tr}>
                            <td key={alertSettings[key].id.title} >

                              {
                                key === 'notifyGatewayOffline' &&
                                <div className={`text-nowrap ${mainStyle['delay-container']}`}>
                                  <div>{t(alertSettings[key].label)}</div>
                                  <DropdownWithItem
                                    selectedItem={alertSettings[key].delayList[0]}
                                    itemList={alertSettings[key].delayList}
                                    onClick={e => { }}
                                  />
                                  <div>{t(alertSettings[key].unit)}</div>
                                </div>
                              }

                              {
                                key === 'notifyGatewayNetworkUsageExceed' &&
                                <div className={mainStyle['usage-container']}>
                                  <div className='text-nowrap'>{t(alertSettings[key].label)}</div>
                                  <Input
                                    type="number"
                                    placeholder="1-999"
                                    value={t(alertSettings[key].quantity)}
                                    onChange={() => { }}
                                    onFocus={() => { }}
                                    onBlur={() => { }}
                                  />
                                  <DropdownWithItem
                                    selectedItem={alertSettings[key].unitList[0]}
                                    itemList={alertSettings[key].unitList}
                                    onClick={e => { }}
                                  />
                                  <div className='mx-1'>{t('ba8d2b9408')}</div> { /* in */}
                                  <DropdownWithItem
                                    selectedItem={alertSettings[key].timeRangeList[0]}
                                    itemList={alertSettings[key].timeRangeList}
                                    onClick={e => { }}
                                  />
                                </div>
                              }

                              {
                                key !== 'notifyGatewayOffline' && key !== 'notifyGatewayNetworkUsageExceed' &&
                                <div className='text-nowrap'>{t(alertSettings[key].label)}</div>
                              }

                            </td>

                            {
                              defaultAllowedAlertType.email &&
                              <td>
                                <Checkbox
                                  id={alertSettings[key].id.email}
                                  checked={alertSettings[key].checked.email}
                                  onChange={() => toggleCheckboxes(key, 'email')}
                                />
                              </td>
                            }

                            {
                              defaultAllowedAlertType.app &&
                              <td>
                                <Checkbox
                                  id={alertSettings[key].id.app}
                                  checked={alertSettings[key].checked.app}
                                  onChange={() => toggleCheckboxes(key, 'app')}
                                />
                              </td>
                            }

                          </tr>
                        )
                      })
                    }
                  </tbody>
                </table>

              </Card.Body>
            </Card>
          </Col>
        </Row>

        <div className={mainStyle['apply-btn-group']}>
          <Button
            label='Cancel'
            className='btn-cancel me-3'
            onClick={() => { console.log('Click on Cancel') }}
          />
          <Button
            label='Save'
            className='btn-submit'
            onClick={() => { console.log('Click on Save') }}
          />
        </div>

      </div>

    </>
  );
};

export default AlertSettings;
