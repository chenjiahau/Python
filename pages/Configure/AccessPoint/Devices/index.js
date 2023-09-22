import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep, isArray } from 'lodash';

// Const
import { deviceType } from 'const/nuclias/device';

// UI
import ConfirmDeleteDeviceModal from 'cloudUi/Modals/ConfirmDeleteDeviceModal';
import AddDeviceModal from 'cloudUi/Navigator/modals/AddDeviceModal';

// Component
import {
  Breadcrumb, Button, MessageBoxGroup, InlineTitle, DropdownWithItem, InputWithIcon,
  DropdownWithCheckbox, Checkbox, LinkerWithA, Icon, ConnectionBar, PaginationContainer
} from 'components/';

// Dummy data & util
import { generateDevice } from 'dummy/data/device';
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
  { label: 'Access Point', isLink: false },
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
  [
    { title: 'All', key: 'all', checked: true, isAll: true },
  ],
  [
    { title: 'License Status', key: 'licenseStatus', checked: true },
    { title: 'Sync status', key: 'syncStatus', checked: true },
    { title: 'Profile', key: 'profile', checked: true },
  ],
  [
    { title: 'Site tag', key: 'siteTag', checked: true },
    { title: 'Model name', key: 'modelName', checked: true },
    { title: 'LACP', key: 'lacp', checked: true },
  ],
  [
    { title: 'Expiration date', key: 'expirationDate', checked: true },
    { title: 'Activation date', key: 'activationDate', checked: true },
    { title: 'Public IP', key: 'publicIp', checked: true },
  ],
  [
    { title: 'Device UID', key: 'deviceUid', checked: true },
    { title: 'Channel', key: 'channel', checked: true },
    { title: 'Last seen', key: 'lastSeen', checked: true },
  ],
  [
    { title: 'Device name', key: 'name', checked: true },
    { title: 'Connectivity', key: 'connectivity', checked: true },
    { title: 'Site', key: 'site', checked: true },
  ],
  [
    { title: 'Current clients', key: 'currentClient', checked: true },
    { title: 'Firmware version', key: 'firmwareVersion', checked: true },
    { title: 'Usage', key: 'usage', checked: true },
  ],
  [
    { title: 'Power', key: 'power', checked: true },
    { title: 'MAC address', key: 'macAddress', checked: true },
    { title: 'Serial number', key: 'serialNumber', checked: true },
  ],
  [
    { title: 'Status', key: 'status', checked: true },
    { title: 'Hardware version', key: 'hardwareVersion', checked: true },
    { title: 'Local IP', key: 'localIp', checked: true }
  ]
];

const Devices = () => {
  const location = useLocation();

  // Fake API data
  const fakeDeviceList = [
    { checked: false, ...generateDevice(deviceType.ap, 'DBA-1210P', 'F1:4A:03:3C:02:32', 'Online') },
    { checked: false, ...generateDevice(deviceType.ap, 'DBA-1510P', '46:EA:61:96:67:B8', 'Online') },
    { checked: false, ...generateDevice(deviceType.ap, 'DBA-2320P', 'E9:A9:A8:01:B5:EE', 'Online') },
    { checked: false, ...generateDevice(deviceType.ap, 'DBA-2620P', 'E0:CD:8A:80:31:37', 'Offline') },
    { checked: false, ...generateDevice(deviceType.ap, 'DBA-1510P', 'B2:0F:73:95:25:DF', 'Dormant') },

  ];

  for (const device of fakeDeviceList) {
    for (const index in device.connectivity) {
      if (!device.connectivity[index].status) {
        device.connectivity[index].title = '88aab1e1d9'
      } else {
        device.connectivity[index].title = '5a82640760'
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

  // One row one column
  // const changeField = (field) => {
  //   let isCheckedAll = checkedAllState(fieldList);
  //   const updatedFieldList = cloneDeep(fieldList);

  //   if (field.key === 'all') {
  //     for (const f of updatedFieldList) {
  //       f['checked'] = !isCheckedAll;
  //     }
  //   } else {
  //     for (const f of updatedFieldList) {
  //       if (f.key === field.key) {
  //         f.checked = !f.checked;
  //       }
  //     }
  //   }

  //   updatedFieldList[0].checked = checkedAllState(updatedFieldList);
  //   setFieldList(updatedFieldList);
  // }

  // One row multiple column
  const changeField = (field) => {
    let isCheckedAll = checkedAllState(fieldList);
    const updatedFieldList = cloneDeep(fieldList);

    if (field.key === 'all') {
      for (const level of updatedFieldList) {
        for (const subLevel of level) {
          subLevel['checked'] = !isCheckedAll;
        }
      }
    } else {
      for (const level of updatedFieldList) {
        for (const subLevel of level) {
          if (subLevel.key === field.key) {
            subLevel.checked = !subLevel.checked;
          }
        }
      }
    }

    if (!isArray(updatedFieldList[0])) {
      updatedFieldList[0].checked = checkedAllState(updatedFieldList);
    } else {
      updatedFieldList[0][0].checked = checkedAllState(updatedFieldList);
    }

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
          <div className={`d-flex ${isConfigurePath ? 'justify-content-between' : 'justify-content-end'} mb-2`}>
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
              <div className='form-title--above-table'>Time frame : </div>
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
                isOneRowOneColumn={false}
                columnNumber={3}
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

          <Table responsive striped hover className="table-container" id="device-list-table" style={{ position: 'relative' }}>
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
                  getVisibleFieldState('publicIp') && (
                    <th>
                      <LinkerWithA
                        label="Public IP"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'publicIp', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('localIp') && (
                    <th>
                      <LinkerWithA
                        label="Local IP"
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
                  getVisibleFieldState('hardwareVersion') && (
                    <th>
                      <LinkerWithA
                        label="Hardware version"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'hardwareVersion', setDeviceList)}
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
                  getVisibleFieldState('lacp') && (
                    <th>
                      <LinkerWithA
                        label="LACP"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'lacp', setDeviceList)}
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
                            <Link
                              to={{
                                pathname: `/cloud/configure/access-point/device/${index}`,
                                search: `?i=${index}`
                              }}
                            >
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
                        getVisibleFieldState('publicIp') && (
                          <td>{device.publicIp}</td>
                        )
                      }
                      {
                        getVisibleFieldState('localIp') && (
                          <td>{device.localIp}</td>
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
                        getVisibleFieldState('deviceUid') && (
                          <td>{device.deviceUid}</td>
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
                        getVisibleFieldState('hardwareVersion') && (
                          <td>{device.hardwareVersion}</td>
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
                          <td>{device.power}</td>
                        )
                      }
                      {
                        getVisibleFieldState('lacp') && (
                          <td>{device.lacp}</td>
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

export default Devices;