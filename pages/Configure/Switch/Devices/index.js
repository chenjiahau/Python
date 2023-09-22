import mainStyle from 'cloudPages/Configure/Switch/SwitchPorts/switch-ports.module.scss';

import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep, isArray, set } from 'lodash';

// Const
import { deviceType } from 'const/nuclias/device';

// UI
import ConfirmDeleteDeviceModal from 'cloudUi/Modals/ConfirmDeleteDeviceModal';
import AddDeviceModal from 'cloudUi/Navigator/modals/AddDeviceModal';

// Component
import {
  Breadcrumb, Button, MessageBoxGroup, InlineTitle, DropdownWithItem, InputWithIcon,
  DropdownWithCheckbox, Checkbox, LinkerWithA, Icon, ConnectionBar, PaginationContainer,
  DropdownWithAdvancedSearch, Input
} from 'components/';

// Dummy data & util
import { swModelList, generateDevice } from 'dummy/data/device';
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
  { label: 'Switch', isLink: false },
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
];

const defaultStatusDropdown = [
  { title: 'All', isActive: true },
  { title: 'Online', isActive: false },
  { title: 'Offline', isActive: false },
  { title: 'Offline over 7days', isActive: false },
];

const defaultFieldList = [
  [
    { title: 'All', key: 'all', checked: true, isAll: true },
  ],
  [
    { title: 'Sync status', key: 'syncStatus', checked: true },
    { title: 'Connectivity', key: 'connectivity', checked: true },
    { title: 'Profile', key: 'profile', checked: true },
  ],
  [
    { title: 'Device name', key: 'name', checked: true },
    { title: 'Device UID', key: 'deviceUid', checked: true },
    { title: 'Firmware version', key: 'firmwareVersion', checked: true },
  ],
  [
    { title: 'Hardware version', key: 'hardwareVersion', checked: true },
    { title: 'Last seen', key: 'lastSeen', checked: true },
    { title: 'License Status', key: 'licenseStatus', checked: true },
  ],
  [
    { title: 'Expiration date', key: 'expirationDate', checked: true },
    { title: 'Activation date', key: 'activationDate', checked: true },
    { title: 'Local IP', key: 'localIp', checked: true },
  ],
  [
    { title: 'MAC address', key: 'macAddress', checked: true },
    { title: 'Model name', key: 'modelName', checked: true },
    { title: 'Power budget', key: 'powerBudget', checked: true },
  ],
  [
    { title: '#Ports', key: 'ports', checked: true },
    { title: 'Public IP', key: 'publicIp', checked: true },
    { title: 'Serial number', key: 'serialNumber', checked: true },
  ],
  [
    { title: 'Status', key: 'status', checked: true },
    { title: 'Site', key: 'site', checked: true },
    { title: 'Site tag', key: 'siteTag', checked: true },
  ],
  [
    { title: 'Tags', key: 'tags', checked: true },
  ],
];

const Devices = () => {
  const location = useLocation();

  // Fake API data
  const fakeDeviceList = [
    { checked: false, ...generateDevice(deviceType.switch, 'DBS-2000', 'EA:E0:0C:14:87:A7', 'Online', null, false, { sw: { portGroup: 10, supportPoe: false } }) },
    { checked: false, ...generateDevice(deviceType.switch, 'DBS-2000', '39:8A:AF:9E:F7:01', 'Online', null, false, { sw: { portGroup: 52, supportPoe: true } }) },
    { checked: false, ...generateDevice(deviceType.switch, 'DBS-2000', 'A8:77:AE:19:5A:A5', 'Online', null, false, { sw: { portGroup: 28, supportPoe: false } }) },
    { checked: false, ...generateDevice(deviceType.switch, 'DBS-2000', 'FD:E9:71:AE:8F:83', 'Offline', null, false, { sw: { portGroup: 10, supportPoe: true } }) },
    { checked: false, ...generateDevice(deviceType.switch, 'DBS-2000', '5C:B6:9F:20:1D:E7	', 'Dormant', null, false, { sw: { portGroup: 52, supportPoe: false } }) },
  ];

  console.log(fakeDeviceList);
  for (const device of fakeDeviceList) {
    for (const index in device.connectivity) {
      if (!device.connectivity[index].status) {
        device.connectivity[index].title = '88aab1e1d9'; // No connectivity
      } else {
        device.connectivity[index].title = 'abfb254e1f'; // Connected switch
      }
    }
  }

  // State
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [timeframeList, setTimeframeList] = useState(cloneDeep(defaultTimeframeList));
  const [deviceName, setDeviceName] = useState('');
  const [statusDropdown, setStatusDropdown] = useState(cloneDeep(defaultStatusDropdown));
  const [siteTagDropdown, setSiteTagDropdown] = useState([]);
  const [tagDropdown, setTagDropdown] = useState([]);
  const [modelNameDropdown, setModelNameDropdown] = useState([]);
  const [fieldList, setFieldList] = useState(cloneDeep(defaultFieldList));
  const [deviceList, setDeviceList] = useState([]);


  // Variable
  const isConfigurePath = location?.pathname.indexOf('configure') > -1 ? true : false;

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const checkCheckedDeviceListNumber = () => {
    return deviceList.filter((device) => device.checked).length;
  }

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

  // Side effect
  useEffect(() => {
    const updatedDeviceList = cloneDeep(fakeDeviceList);
    setDeviceList(updatedDeviceList);

    const siteTagList = [];
    const tagList = [];
    for (const device of updatedDeviceList) {
      if (siteTagList.indexOf(device.siteTag) === -1) {
        siteTagList.push(device.siteTag);
      }

      device.tags = device.tagList.join(', ');
      for (const tag of device.tagList) {
        if (tagList.indexOf(tag) === -1) {
          tagList.push(tag);
        }
      }

      device.ports = device.portGroup;
    }

    siteTagList.sort();
    const updatedSiteTagDropdown = [{ title: 'All', isActive: true }];
    for (const siteTag of siteTagList) {
      updatedSiteTagDropdown.push({ title: siteTag, isActive: false });
    }
    setSiteTagDropdown(updatedSiteTagDropdown);

    tagList.sort();
    const updatedTagDropdown = [{ title: 'All', isActive: true }];
    for (const tag of tagList) {
      updatedTagDropdown.push({ title: tag, isActive: false });
    }
    setTagDropdown(updatedTagDropdown);

    const updatedModelNameDropdown = [{ title: 'All', isActive: true }];
    for (const modelName of swModelList) {
      updatedModelNameDropdown.push({ title: modelName, isActive: false });
    }
    setModelNameDropdown(updatedModelNameDropdown);
  }, []);

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
          <div className={`d-flex ${isConfigurePath ? 'justify-content-between' : 'justify-content-end'} mb-1`}>
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
                    <Button
                      id='tag-dropdown'
                      type='button'
                      label='Tag'
                      style={{ width: 'auto' }}
                      className='btn btn-dropdown dropdown-toggle'
                      data-bs-toggle='dropdown'
                      aria-expanded='false'
                      disabled={checkCheckedDeviceListNumber() === 0}
                      onClick={() => { }}
                    />
                    <ul
                      className='dropdown-menu'
                      aria-labelledby='tag-dropdown'
                      style={{ width: '430px' }}
                      onClick={e => e.stopPropagation()}
                    >
                      <div className={mainStyle['handle-tag-container']}>
                        <div className="form-title mb-1">Add</div>
                        <div className={mainStyle['block']}>
                          <DropdownWithAdvancedSearch
                            value=''
                            noIcon={true}
                            alignEnd={true}
                            hasButton={false}
                            dataBsToggleOnInput={true}
                            dataBsToggleOnButton={true}
                            onChange={e => { }}
                          >
                            {
                              tagDropdown.filter(tag => tag.title !== 'All').map((tag, index) => {
                                return (
                                  <li
                                    key={index}
                                    className={`text-truncate ${tag.isActive && 'active'}`}
                                  >
                                    {tag.title}
                                  </li>
                                );
                              })
                            }
                          </DropdownWithAdvancedSearch>
                          <Button
                            label='Add'
                            disabled={true}
                            onClick={() => { }}
                          />
                        </div>
                        <div className="form-title mb-1">Edit</div>
                        <div className={mainStyle['block']}>
                          <DropdownWithAdvancedSearch
                            value=''
                            noIcon={true}
                            alignEnd={true}
                            hasButton={false}
                            dataBsToggleOnInput={true}
                            dataBsToggleOnButton={true}
                            onChange={e => { }}
                          >
                            {
                              tagDropdown.filter(tag => tag.title !== 'All').map((tag, index) => {
                                return (
                                  <li
                                    key={index}
                                    className={`text-truncate ${tag.isActive && 'active'}`}
                                  >
                                    {tag.title}
                                  </li>
                                );
                              })
                            }
                          </DropdownWithAdvancedSearch>
                          <Button
                            label='Delete'
                            disabled={true}
                            onClick={() => { }}
                          />
                        </div>
                      </div>
                    </ul>
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
              <DropdownWithAdvancedSearch
                value={''}
                readOnly={true}
                alignEnd={true}
                dataBsToggleOnButton={true}
                dropdownMenuStyle={{ minWidth: 371 }}
                onChange={e => console.log(e.target.value)}
              >
                <li className='mt-2'>
                  <div className='form-title mb-1'>Device name:</div>
                  <Input
                    type='text'
                    value={deviceName}
                    autoComplete='new-password'
                    onChange={e => {
                      console.log(e.target.value);
                    }}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </li>
                <li className='mt-2'>
                  <div className='form-title mb-1'>Status:</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={statusDropdown.find(item => item.isActive)}
                    itemList={statusDropdown}
                    onClick={() => { }}
                  />
                </li>
                <li className='mt-2'>
                  <div className='form-title mb-1'>Site tag:</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={siteTagDropdown.find(item => item.isActive)}
                    itemList={siteTagDropdown}
                    onClick={() => { }}
                  />
                </li>
                <li className='mt-2'>
                  <div className='form-title mb-1'>Tags:</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={tagDropdown.find(item => item.isActive)}
                    itemList={tagDropdown}
                    onClick={() => { }}
                  />
                </li>
                <li className='mt-2'>
                  <div className='form-title mb-1'>Model name:</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={modelNameDropdown.find(item => item.isActive)}
                    itemList={modelNameDropdown}
                    onClick={() => { }}
                  />
                </li>
              </DropdownWithAdvancedSearch>
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

          <Table responsive striped hover className="table-container" style={{ position: 'relative' }}>
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
                  getVisibleFieldState('powerDelivered') && (
                    <th>
                      <LinkerWithA
                        label="Power delivered"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'powerDelivered', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('powerBudget') && (
                    <th>
                      <LinkerWithA
                        label="Power budget"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'powerBudget', setDeviceList)}
                      />
                    </th>
                  )
                }
                {
                  getVisibleFieldState('tags') && (
                    <th>
                      <LinkerWithA
                        label="Tags"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'tags', setDeviceList)}
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
                  getVisibleFieldState('portGroup') && (
                    <th>
                      <LinkerWithA
                        label="#Port"
                        className="text-decoration-none"
                        onClick={e => sorting(e, deviceList, 'portGroup', setDeviceList)}
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
                                pathname: `/cloud/configure/switch/device/${index}`,
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
                              progressWidth={100}
                              connectivity={device.connectivity}
                            />
                          </td>
                        )
                      }
                      {
                        getVisibleFieldState('powerDelivered') && (
                          <td>{device.powerDelivered}</td>
                        )
                      }
                      {
                        getVisibleFieldState('powerBudget') && (
                          <td>{device.powerBudget}</td>
                        )
                      }
                      {
                        getVisibleFieldState('tags') && (
                          <td>{device.tags}</td>
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
                        getVisibleFieldState('deviceUid') && (
                          <td>{device.deviceUid}</td>
                        )
                      }

                      {
                        getVisibleFieldState('serialNumber') && (
                          <td>{device.serialNumber}</td>
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
                        getVisibleFieldState('ports') && (
                          <td>{device.ports}</td>
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