import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Table, ButtonGroup } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { cloneDeep } from 'lodash';

// UI
import AddDeviceModal from 'cloudUi/Navigator/modals/AddDeviceModal';
import ConfirmDeleteDeviceModal from 'cloudUi/Modals/ConfirmDeleteDeviceModal';

// Component
import {
  Breadcrumb, Button, MessageBoxGroup, InlineTitle, DropdownWithItem, InputWithIcon,
  DropdownWithCheckbox, Checkbox, LinkerWithA, Icon, PaginationContainer, ConnectionBar
} from 'components/';

// Dummy data & util
import { modelName, generateDevice } from 'dummy/data/device';
import { sorting } from 'dummy/utils/sorting';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';
import { changeDropdown } from 'dummy/utils/dropdown';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

// Default variable
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPathList = [
  { label: 'Configure', isLink: false },
  { label: 'Gateway', isLink: false },
  { label: 'Devices', isLink: false },
];

const defaultModalStatus = {
  addDevice: {
    self: 'addDevice',
    status: false
  },
  deleteDevice: {
    self: 'deleteDevice',
    status: false
  }
};

const defaultTimeframeList = [
  { title: 'Last 24 hours', isActive: true },
  { title: 'Last 7 days', isActive: false },
  { title: 'Last 14 days', isActive: false },
  { title: 'Last 30 days', isActive: false },
]

const defaultFieldList = [
  { title: 'All', key: 'all', checked: true, isAll: true },
  { title: 'Activation date', key: 'activationDate', checked: true },
  { title: 'Channel', key: 'channel', checked: true },
  { title: 'Channel bandwidth', key: 'channelBandwidth', checked: true },
  { title: 'Connectivity', key: 'connectivity', checked: true },
  { title: 'Current clients', key: 'currentClient', checked: true },
  { title: 'Firmware version', key: 'firmwareVersion', checked: true },
  { title: 'Default WAN IPv4', key: 'wanIpv4', checked: true },
  { title: 'Default WAN IPv6', key: 'wanIpv6', checked: true },
  { title: 'Device name', key: 'name', checked: true },
  { title: 'Device UID', key: 'deviceUid', checked: true },
  { title: 'Expiration date', key: 'expirationDate', checked: true },
  { title: 'Last seen', key: 'lastSeen', checked: true },
  { title: 'License Status', key: 'licenseStatus', checked: true },
  { title: 'Local IP', key: 'localIp', checked: true },
  { title: 'MAC address', key: 'macAddress', checked: true },
  { title: 'Management IP', key: 'managementIp', checked: true },
  { title: 'Model name', key: 'modelName', checked: true },
  { title: 'Power', key: 'power', checked: true },
  { title: 'Profile', key: 'profile', checked: true },
  { title: 'Serial number', key: 'serialNumber', checked: true },
  { title: 'Site', key: 'site', checked: true },
  { title: 'Site tag', key: 'siteTag', checked: true },
  { title: 'Status', key: 'status', checked: true },
  { title: 'Sync status', key: 'syncStatus', checked: true },
  { title: 'Usage', key: 'usage', checked: true },
];

const Nuclias = () => {
  const location = useLocation();

  // Fake API data
  const fakeDeviceList = [
    // { checked: false, ...generateDevice('GATEWAY', modelName['GATEWAY'][0], '76:15:03:9A:CE:8E', 'Online', 'DBG-2000-1') },
    { checked: false, ...generateDevice('GATEWAY', modelName['GATEWAY'][1].split('/')[0], '4D:58:E2:88:1D:41', 'Online', 'DBG-X1000-1') },
    { checked: false, ...generateDevice('GATEWAY', modelName['GATEWAY'][1].split('/')[1], '57:66:9F:E8:42:07', 'Online', 'DBG-2000-B1-1') },
    { checked: false, ...generateDevice('GATEWAY', modelName['GATEWAY'][1].split('/')[1], '1D:D7:6C:78:B2:03', 'Offline', 'DBG-2000-B1-2') },
    { checked: false, ...generateDevice('GATEWAY', modelName['GATEWAY'][2], '4A:31:DD:13:BC:3E', 'Dormant', 'DBG-800-1') },
  ];

  for (const device of fakeDeviceList) {
    for (const index in device.connectivity) {
      if (!device.connectivity[index].status) {
        device.connectivity[index].title = '88aab1e1d9'
      } else {
        device.connectivity[index].title = '74c6d4a345'
      }
    }
  }

  // State
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [timeframeList, setTimeframeList] = useState(cloneDeep(defaultTimeframeList));
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [searchValue, setSearchValue] = useState('');
  const [fieldList, setFieldList] = useState(cloneDeep(defaultFieldList));
  const [deviceList, setDeviceList] = useState(cloneDeep(fakeDeviceList));

  // Variable
  const isConfigurePath = location?.pathname.indexOf('configure') > -1 ? true : false;

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const changeField = (field) => {
    let isCheckedAll = checkedAllState(fieldList);
    const updatedFieldList = cloneDeep(fieldList);

    if (field.key === 'all') {
      for (const f of updatedFieldList) {
        f['checked'] = !isCheckedAll;
      }
    } else {
      for (const f of updatedFieldList) {
        if (f.key === field.key) {
          f.checked = !f.checked;
        }
      }
    }

    updatedFieldList[0].checked = checkedAllState(updatedFieldList);
    setFieldList(updatedFieldList);
  }

  const getVisibleFieldState = (key) => {
    let state = true;
    for (const field of fieldList) {
      if (field.key === key) {
        state = field.checked;
      }
    }

    return state;
  }

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />
      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />

        <div className="mb-5">
          <div className={`d-flex ${isConfigurePath ? 'justify-content-between' : 'justify-content-end'}`}>
            {
              isConfigurePath && (
                <>
                  <ButtonGroup>
                    <Button
                      label="Add device"
                      onClick={() => changeModalStatus(modalStatus.addDevice.self, true)}
                    />
                    <Button
                      label="Delete"
                      disabled={!checkAtleastOneChecked(deviceList)}
                      onClick={() => changeModalStatus(modalStatus.deleteDevice.self, true)}
                    />
                  </ButtonGroup>
                </>
              )
            }
            <InlineTitle isNonUnderline>
              <span className='form-title--above-table'>Time frame : </span>
              <DropdownWithItem
                id="device-timeframe-dropdown"
                type="normal"
                selectedItem={timeframeList.filter(timeframe => timeframe.isActive)[0]}
                itemList={timeframeList}
                isTruncate
                style={{ width: '150px' }}
                onClick={timeframe => changeDropdown(timeframe, timeframeList, setTimeframeList)}
              />
              <InputWithIcon
                type="search"
                iconPosition="left"
                iconClassName="icon-search"
                style={{ width: '149px' }}
                value={''}
                onChange={e => { }}
                onClick={() => { }}
                onBlur={() => { }}
              />
              <DropdownWithCheckbox
                id='device-field-dropdown'
                type='checkbox'
                isJiugonggeLabel={true}
                isLastElement={true}
                itemList={fieldList}
                onChange={item => changeField(item)}
              />
              <Button
                label=''
                title='Download as CSV'
                className='icon-download'
                style={{ border: 'none', height: 25, backgroundColor: '#fff' }}
                onClick={() => console.log('Download as CSV')}
              />
            </InlineTitle>
          </div>

          <Table responsive striped hover className="table-container mt-2" id="device-list-table" style={{ position: 'relative' }}>
            <thead>
              <tr>
                {
                  isConfigurePath && (
                    <th>
                      <Checkbox
                        id="rl-th-cb1"
                        type='checkbox'
                        checked={checkedAllState(deviceList)}
                        onChange={e => toggleCheckedAll(deviceList, setDeviceList)}
                      />
                    </th>
                  )
                }
                <th>#</th>
                {
                  getVisibleFieldState('status') && (
                    <th>
                      <LinkerWithA
                        label="Status"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'status', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('name') && (
                    <th>
                      <LinkerWithA
                        label="Device name"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'name', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('macAddress') && (
                    <th>
                      <LinkerWithA
                        label="MAC address"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'macAddress', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('managementIp') && (
                    <th>
                      <LinkerWithA
                        label="Management IP"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'managementIp', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('wanIpv4') && (
                    <th>
                      <LinkerWithA
                        label="Default WAN IPv4"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'wanIpv4', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('wanIpv6') && (
                    <th>
                      <LinkerWithA
                        label="Default WAN IPv6"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'wanIpv6', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('localIp') && (
                    <th>
                      <LinkerWithA
                        label="Local IP Address"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'localIp', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('modelName') && (
                    <th>
                      <LinkerWithA
                        label="Model name"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'modelName', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('connectivity') && (
                    <th>
                      <LinkerWithA
                        label="Connectivity"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'connectivity', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('syncStatus') && (
                    <th>
                      <LinkerWithA
                        label="Sync status"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'syncStatus', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('profile') && (
                    <th>
                      <LinkerWithA
                        label="Profile"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'profile', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('site') && (
                    <th>
                      <LinkerWithA
                        label="Site"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'site', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('siteTag') && (
                    <th>
                      <LinkerWithA
                        label="Site tag"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'siteTag', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('serialNumber') && (
                    <th>
                      <LinkerWithA
                        label="Serial number"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'serialNumber', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('firmwareVersion') && (
                    <th>
                      <LinkerWithA
                        label="Firmware version"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'firmwareVersion', setDeviceList)}
                      />
                    </th>

                  )
                }
                {
                  getVisibleFieldState('lastSeen') && (
                    <th>
                      <LinkerWithA
                        label="Last seen"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'lastSeen', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('licenseStatus') && (
                    <th>
                      <LinkerWithA
                        label="License status"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'licenseStatus', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('deviceUid') && (
                    <th>
                      <LinkerWithA
                        label="Device UID"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'deviceUid', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('activationDate') && (
                    <th>
                      <LinkerWithA
                        label="Activation date"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'activationDate', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('expirationDate') && (
                    <th>
                      <LinkerWithA
                        label="Expiration date"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'expirationDate', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('currentClient') && (
                    <th>
                      <LinkerWithA
                        label="Current clients"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'currentClient', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('usage') && (
                    <th>
                      <LinkerWithA
                        label="Usage"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'usage', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('channel') && (
                    <th>
                      <LinkerWithA
                        label="Channel"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'channel', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('power') && (
                    <th>
                      <LinkerWithA
                        label="Power"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'power', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('channelBandwidth') && (
                    <th>
                      <LinkerWithA
                        label="Channel bandwidth"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'channelBandwidth', setDeviceList)}
                      />
                    </th>
                  )
                }
              </tr>
            </thead>
            <tbody>
              {
                deviceList && deviceList.map((device, index) => {
                  return (
                    <tr key={index}>
                      {
                        isConfigurePath && (
                          <td>
                            <Checkbox
                              id={`rl-cb-${index}`}
                              type='checkbox'
                              checked={device.checked}
                              onChange={e => toggleCheckedOne(index, deviceList, setDeviceList)}
                            />
                          </td>
                        )}
                      <td>{index + 1}</td>
                      {
                        getVisibleFieldState('status') && (
                          <td>
                            {device.status === 'Online' && <Icon className={'icon-round online'} />}
                            {device.status === 'Offline' && <Icon className={'icon-round offline'} />}
                            {device.status === 'Dormant' && <Icon className={'icon-round dormant'} />}
                          </td>
                        )
                      }
                      {
                        getVisibleFieldState('name') && (
                          <td>
                            <Link to={{ pathname: `/cloud/configure/gateway/device/${index}` }}>
                              {device.name}
                            </Link>
                          </td>
                        )
                      }
                      {
                        getVisibleFieldState('macAddress') && (
                          <td>{device.macAddress}</td>
                        )
                      }
                      {
                        getVisibleFieldState('managementIp') && (
                          <td>{device.managementIp || '-'}</td>
                        )
                      }
                      {
                        getVisibleFieldState('wanIpv4') && (
                          <td>{device.publicIp || '-'}</td>
                        )
                      }
                      {
                        getVisibleFieldState('wanIpv6') && (
                          <td>{device.publicV6Ip || '-'}</td>
                        )
                      }
                      {
                        getVisibleFieldState('localIp') && (
                          <td>{device.localIp || '-'}</td>
                        )
                      }
                      {
                        getVisibleFieldState('modelName') && (
                          <td>{device.modelName}</td>
                        )
                      }
                      {
                        getVisibleFieldState('connectivity') && (
                          <td>
                            <ConnectionBar
                              progressWidth={100}
                              connectivity={device.connectivity}
                            />
                          </td>
                        )
                      }
                      {
                        getVisibleFieldState('syncStatus') && (
                          <td>{device.syncStatus}</td>
                        )
                      }
                      {
                        getVisibleFieldState('profile') && (
                          <td>{device.profile}</td>
                        )
                      }
                      {
                        getVisibleFieldState('site') && (
                          <td>{device.site}</td>
                        )
                      }
                      {
                        getVisibleFieldState('siteTag') && (
                          <td>{device.siteTag || '-'}</td>
                        )
                      }
                      {
                        getVisibleFieldState('serialNumber') && (
                          <td>{device.serialNumber}</td>
                        )
                      }
                      {
                        getVisibleFieldState('firmwareVersion') && (
                          <td>{device.firmwareVersion}</td>
                        )
                      }
                      {
                        getVisibleFieldState('lastSeen') && (
                          <td>{device.lastSeen}</td>
                        )
                      }
                      {
                        getVisibleFieldState('licenseStatus') && (
                          <td>{device.licenseStatus}</td>
                        )
                      }
                      {
                        getVisibleFieldState('deviceUid') && (
                          <td>{device.deviceUid}</td>
                        )
                      }
                      {
                        getVisibleFieldState('activationDate') && (
                          <td>{device.activationDate}</td>
                        )
                      }
                      {
                        getVisibleFieldState('expirationDate') && (
                          <td>{device.expirationDate}</td>
                        )
                      }
                      {
                        getVisibleFieldState('currentClient') && (
                          <td>{device.currentClient}</td>
                        )
                      }
                      {
                        getVisibleFieldState('usage') && (
                          <td>{device.usage}</td>
                        )
                      }
                      {
                        getVisibleFieldState('channel') && (
                          <td>{device.channel}</td>
                        )
                      }
                      {
                        getVisibleFieldState('power') && (
                          <td>{device.power || '- / -'}</td>
                        )
                      }
                      {
                        getVisibleFieldState('channelBandwidth') && (
                          <td>
                            {/* {
                              device.channelBandwidth.length > 0 && device.channelBandwidth.map((item) => {
                                return (
                                  <div key={nanoid()}>{item}</div>
                                )
                              })
                            }
                            {
                              device.channelBandwidth.length === 0 && '-'
                            } */}
                            -
                          </td>
                        )
                      }
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>

          <PaginationContainer
            total={deviceList.length}
            onPageChange={currentPageNum =>
              console.log('onPageChange', currentPageNum)
            }
            onEntryLimitChange={currentPageNum =>
              console.log('onEntryLimitChange', currentPageNum)
            }
          />
        </div>
      </div>

      <AddDeviceModal {...{ modalStatus, changeModalStatus }} />

      <ConfirmDeleteDeviceModal
        openModal={modalStatus.deleteDevice.status}
        closeModal={() => changeModalStatus(modalStatus.deleteDevice.self, false)}
        onMoveToInventory={() => changeModalStatus(modalStatus.deleteDevice.self, false)}
        onDelete={() => changeModalStatus(modalStatus.deleteDevice.self, false)}
      />
    </>
  );
}

export default Nuclias;