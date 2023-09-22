import mainStyle from './switch-ports.module.scss';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep, isArray } from 'lodash';
import { nanoid } from 'nanoid';

// UI
import PushToDeviceResultModal from 'cloudUi/Modals/PushToDeviceResultModal';

// Component
import {
  Breadcrumb, InlineTitle, DropdownWithItem, InputWithIcon, Button,
  DropdownWithAdvancedSearch, Input, DropdownWithCheckbox, Checkbox,
  LinkerWithA, PaginationContainer, TooltipDialog, MessageBoxGroup
} from 'components/';

import EditPortModal from './modals/EditPortModal';
import AggregatePortModal from './modals/AggregatePortModal';
import MirrorPortModal from './modals/MirrorPortModal';

// Dummy data & util
import { generateDevice } from 'dummy/data/device';
import { generateProfileList } from 'dummy/data/profile';
import { getSchedulePolicyList } from 'dummy/data/schedule-policy';
import { getSwitchPorts } from 'dummy/data/switch/ports';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne } from 'dummy/utils/checkbox';
import { sorting } from 'dummy/utils/sorting';
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { getPushToDeviceResult } from 'dummy/data/push';

// Default value
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPathList = [
  { label: 'Configure', isLink: false },
  { label: 'Switch', isLink: false },
  { label: 'Switch Ports', isLink: false },
];

const defaultPortGroupList = [
  { title: 'All', isActive: true, isAll: true },
  { title: '10 ports', isActive: false, isAll: false },
  { title: '28 ports', isActive: false, isAll: false },
  { title: '52 ports', isActive: false, isAll: false },
];

const defaultTypeList = [
  { title: 'All', isActive: true, isAll: true },
  { title: 'Access', isActive: false, isAll: false },
  { title: 'Trunk', isActive: false, isAll: false },
];

const defaultFieldList = [
  [
    { title: 'All', key: 'all', checked: true, isAll: true },
  ],
  [
    { title: 'Configuration', isTitle: true },
    { title: 'Switch / port', key: 'switchPort', hasIndent: true, checked: true },
    { title: 'PD alive', key: 'pdAlive', hasIndent: true, checked: true },
    { title: 'Forward port(s)', key: 'forwardPorts', hasIndent: true, checked: true },
    { title: 'Port #', key: 'portNumber', hasIndent: true, checked: true },
    { title: 'PD IP address', key: 'pdIpAddress', hasIndent: true, checked: true },
    { title: 'Flow control', key: 'flowControl', hasIndent: true, checked: true },
    { title: 'Aggregate', key: 'aggregate', hasIndent: true, checked: true },
    { title: 'RSTP', key: 'rstp', hasIndent: true, checked: true },
    { title: 'Port name', key: 'portName', hasIndent: true, checked: true },
    { title: 'Link', key: 'link', hasIndent: true, checked: true },
    { title: 'LBD', key: 'lbd', hasIndent: true, checked: true },
    { title: 'LLDP', key: 'lldp', hasIndent: true, checked: true },
    { title: 'Speed downshift', key: 'speedDownshift', hasIndent: true, checked: true },
    { title: 'Mrouter port(VLANs)', key: 'mrouterPort', hasIndent: true, checked: true },
    { title: 'Tags', key: 'tags', hasIndent: true, checked: true },
    { title: 'Type', key: 'type', hasIndent: true, checked: true },
    { title: 'Port CoS', key: 'portCos', hasIndent: true, checked: true },
    { title: 'Device name', key: 'deviceName', hasIndent: true, checked: true },
    { title: 'VLAN', key: 'vlan', hasIndent: true, checked: true },
    { title: 'Port schedule', key: 'portSchedule', hasIndent: true, checked: true },
    { title: 'Profile', key: 'profile', hasIndent: true, checked: true },
    { title: 'Allowed VLANs', key: 'allowedVlans', hasIndent: true, checked: true },
    { title: 'Access policy', key: 'accessPolicy', hasIndent: true, checked: true },
    { title: 'Profile sync state', key: 'profileSyncState', hasIndent: true, checked: true },
    { title: 'Port state', key: 'portState', hasIndent: true, checked: true },
    { title: 'Mirror', key: 'mirror', hasIndent: true, checked: true },
    { title: 'Ports group', key: 'portsGroup', hasIndent: true, checked: true },
    { title: 'Poe', key: 'poe', hasIndent: true, checked: true },
    { title: 'Traffic segmentation', key: 'trafficSegmentation', hasIndent: true, checked: true },
    { title: 'Model name', key: 'modelName', hasIndent: true, checked: true },
  ],
  [
    { title: 'Usage', isTitle: true },
    { title: 'Rx broadcast pkts', key: 'rxBroadcastPkts', hasIndent: true, checked: true },
    { title: 'Tx multicast pkts', key: 'txMulticastPkts', hasIndent: true, checked: true },
    { title: 'Sent bytes', key: 'sentBytes', hasIndent: true, checked: true },
    { title: 'Tx broadcast pkts', key: 'txBroadcastPkts', hasIndent: true, checked: true },
    { title: 'Received bytes', key: 'receivedBytes', hasIndent: true, checked: true },
    { title: 'Sent packets', key: 'sentPackets', hasIndent: true, checked: true },
    { title: 'Rx multicast pkts', key: 'rxMulticastPkts', hasIndent: true, checked: true },
    { title: 'Received packets', key: 'receivedPackets', hasIndent: true, checked: true },
    { title: 'Total bytes', key: 'totalBytes', hasIndent: true, checked: true },
  ],
  [
    { title: 'Misc', isTitle: true },
    { title: '#', key: 'number', hasIndent: true, checked: true }
  ]
];

const defaultModalStatus = {
  editPort: {
    self: 'editPort',
    status: false
  },
  aggregatePort: {
    self: 'aggregatePort',
    status: false
  },
  mirrorPort: {
    self: 'mirrorPort',
    status: false
  },
  pushToDeviceResult: {
    self: 'pushToDeviceResult',
    status: false,
  },
};

const SwitchPorts = () => {
  const navigate = useNavigate();

  // Fake API data
  const fakeDeviceList = [
    { isActive: true, title: 'All', isAll: true },
    {
      id: 1,
      isActive: false, title: 'DBS-2000-10MP', iconClass: 'icon-round online',
      ...generateDevice('SWITCH', 'DBS-2000', null, 'Online', null, false, { sw: { portGroup: 10, supportPoe: true } })
    }
  ];
  fakeDeviceList.forEach((device) => {
    !device.isAll && (device.title = device.name);
  });

  const fakeProfileList = generateProfileList('SWITCH', 5, true);
  const fakeVlanIdList = [
    { title: '1 - Management VLAN', checked: true },
    { title: '10 - Guest VLAN', checked: false },
    { title: '30 - Voice VLAN', checked: false },
  ];
  const fakeTagList = [
    { title: 'All', isActive: true },
    { title: 'LAB', isActive: false },
    { title: 'Voip', isActive: false },
  ];
  const fakeSchedulePolicyList = getSchedulePolicyList();
  const fakePortList = getSwitchPorts(fakeDeviceList);

  // State
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [portsGroupList, setPortsGroupList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [portList, setPortList] = useState([]);
  const [mirroredPortList, setMirroredPortList] = useState(null);
  const [mirrorDestinationPort, setMirrorDestinationPort] = useState(null);
  const [isUnmirror, setIsUnmirror] = useState(false);
  const [searchDeviceValue, setSearchDeviceValue] = useState('');
  const [searchPortValue, setSearchPortValue] = useState('');
  const [searchVlanIdList, setSearchVlanIdList] = useState([]);
  const [typeList, setTypeList] = useState([]);
  const [tagList, setTagList] = useState([]);
  const [schedulePolicyList, setSchedulePolicyList] = useState([]);
  const [fieldList, setFieldList] = useState(cloneDeep(defaultFieldList));
  const [selectedPortList, setSelectedPortList] = useState([]);
  const [addTag, setAddTag] = useState('');
  const [searchTag, setSearchTag] = useState('');
  const [pushResultList, setPushResultList] = useState([]);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

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

    for (const group of fieldList) {
      for (const field of group) {
        if (field.key === key) {
          state = field.checked;
        }
      }
    }

    return state;
  }

  const toggleDetail = (index, value) => {
    const detailDom = document.getElementsByClassName(`detail-${index}`)[0];
    detailDom.style.display = value;
  }

  const redirectToDevice = (port) => {
    navigate(`/cloud/config/switch/device/${port.deviceId}?tab=ports&port=${port.port}`)
  }

  const checkCheckedPortNumber = () => {
    return portList.filter((port) => port.checked).length;
  }

  const checkIsAggregatePort = () => {
    return portList.filter((port) => port.checked && port.aggregate !== '-').length;
  }

  const checkIsMirrorPort = () => {
    return portList.filter((port) => port.checked && port.mirror !== '-').length;
  }

  const editPort = (port = null) => {
    if (port) {
      const updatedPortList = cloneDeep(portList);
      updatedPortList.forEach((item) => {
        item.checked = false;
        (item.switchPort === port.switchPort) && (item.checked = true);
      });

      setPortList(updatedPortList);
      setSelectedPortList([port]);
    } else {
      setSelectedPortList(portList.filter((port) => port.checked));
    }

    changeModalStatus(modalStatus.editPort.self, true);
  }

  const aggregatePort = () => {
    setSelectedPortList(portList.filter((port) => port.checked));
    changeModalStatus(modalStatus.aggregatePort.self, true)
  }

  const mirrorPort = (doUnmirror) => {
    setIsUnmirror(doUnmirror);
    setSelectedPortList(portList.filter((port) => port.checked));
    changeModalStatus(modalStatus.mirrorPort.self, true)
  }

  const pushToDevice = () => {
    setPushResultList(getPushToDeviceResult(deviceList[1]));
    setModalStatus({
      ...modalStatus,
      [modalStatus.editPort.self]: { ...modalStatus[modalStatus.editPort.self], status: false },
      [modalStatus.aggregatePort.self]: { ...modalStatus[modalStatus.aggregatePort.self], status: false },
      [modalStatus.mirrorPort.self]: { ...modalStatus[modalStatus.mirrorPort.self], status: false },
      [modalStatus.pushToDeviceResult.self]: { ...modalStatus[modalStatus.pushToDeviceResult.self], status: true },
    });

    // Reload port list
  }

  // Side effect
  useEffect(() => {
    setPortsGroupList(cloneDeep(defaultPortGroupList));
    setDeviceList(cloneDeep(fakeDeviceList));
    setProfileList(cloneDeep([
      { title: 'All', isActive: true, isAll: true },
      ...fakeProfileList
    ]));
    setSearchVlanIdList(cloneDeep(fakeVlanIdList));
    setTypeList(cloneDeep(defaultTypeList));
    setTagList(cloneDeep(fakeTagList));
    setSchedulePolicyList(fakeSchedulePolicyList);
    setPortList(fakePortList.map((port, _) => {
      port.checked = false;
      port.switchPort = `${port.deviceName} / ${port.port}`;
      port.linkStatus = `${port.link.title} / ${port.status.title}`;
      port.vlanType = `${port.type.title} ${port.vlan}`;

      return port;
    }));
    setMirroredPortList([...fakePortList.filter((port) => port.mirror !== '-')]);
    setMirrorDestinationPort(fakePortList.find((port) => port.mirrorDestination) || null)
  }, []);

  if (
    deviceList.length === 0 ||
    profileList.length === 0 ||
    portList.length === 0
  ) {
    return null;
  }

  console.log(portList)
  return (
    <>
      <div className='layout-container breadcrumb--extended'>
        <div>
          <Breadcrumb full={false} pathList={defaultPathList} />
        </div>
        <div className='breadcrumb--extended-right'>
          <InlineTitle isNonUnderline >
            <span className='form-title' style={{ paddingTop: '5px', minWidth: 'auto' }}>Ports group : </span>
            <DropdownWithItem
              id='ports-group-dropdown'
              type='normal'
              isRegularSize={true}
              selectedItem={portsGroupList.find(item => item.isActive === true)}
              itemList={portsGroupList}
              onClick={() => { }}
            />
            <div className={`dropdown ${mainStyle['device-list-dropdown']}`}>
              <button
                className='btn btn-dropdown dropdown-toggle btn-dropdown--middle-size'
                type='button'
                id='deviceListDropdown'
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <span>{deviceList.find(device => device.isActive).title}</span>
              </button>
              <ul
                className='dropdown-menu'
                aria-labelledby='deviceListDropdown'
              >
                <InputWithIcon
                  type='search'
                  iconPosition='left'
                  iconClassName='icon-search'
                  value={searchDeviceValue}
                  style={{ margin: '0 8px 8px 8px' }}
                  onChange={e => setSearchDeviceValue(e.target.value)}
                  onBlur={() => { }}
                />
                {
                  deviceList.map((device, index) => {
                    return (
                      <li
                        key={index}
                        className={`text-truncate ${device.isActive && 'active'}`}
                      >
                        {
                          !device.isAll && (
                            <>
                              <i className={`icon icon-round ${device.status === 'Online' && 'online'} ${device.status === 'Offline' && 'offline'} ${device.status === 'Dormant' && 'dormant'}`}></i>
                            </>
                          )
                        }
                        {device.title}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </InlineTitle>
        </div>
      </div>

      <div className="layout-container">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
      </div>

      <div className='layout-container mb-2'>
        <div className={mainStyle['tools-container']}>
          <div className={mainStyle['left']}>
            <ButtonGroup>
              <Button
                label='Edit'
                disabled={checkCheckedPortNumber() === 0}
                onClick={() => editPort()}
              />
              <Button
                label='Aggregate'
                disabled={checkIsAggregatePort() > 0 || checkCheckedPortNumber() < 2}
                tooltip="Enabling Aggregate requires Trunk port type. <br/>Each device is allowed to create up to 8 groups, and up to 8 ports for each group."
                tooltipPosition='header'
                onClick={aggregatePort}
              />
              <Button
                label='Split'
                disabled={checkIsAggregatePort() === 0 || checkCheckedPortNumber() > 1}
                tooltip="Split an aggregated link <br>into the separate ports."
                onClick={() => { }}
              />
              <Button
                label='Mirror'
                disabled={checkCheckedPortNumber() === 0}
                tooltip="Select source ports from the same <br>switch for port mirroring <br>Click mirror to select a destination port <br>for the mirror or add to existing mirror."
                onClick={() => mirrorPort(false)}
              />
              <Button
                label='Unmirror'
                disabled={checkIsMirrorPort() === 0}
                tooltip="Select ports to remove from a <br>currently existing mirror. Delete <br>the entire mirror if the destination <br>port is selected."
                onClick={() => mirrorPort(true)}
              />
              <Button
                id='tag-dropdown'
                type='button'
                label='Tag'
                style={{ width: 'auto' }}
                className='btn btn-dropdown dropdown-toggle'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                disabled={checkCheckedPortNumber() === 0}
                onClick={() => { }}
              />
              <ul
                className='dropdown-menu'
                aria-labelledby='tag-dropdown'
                onClick={e => e.stopPropagation()}
              >
                <div className={mainStyle['handle-tag-container']}>
                  <div className="form-title mb-1">Add</div>
                  <div className={mainStyle['block']}>
                    <Input
                      type="text"
                      placeholder="Choose existing tags or add new tags"
                      autoComplete="new-email"
                      value={addTag}
                      onChange={(e) => setAddTag(e.target.value)}
                      onFocus={() => { }}
                      onBlur={() => { }}
                    />
                    <Button
                      label='Add'
                      disabled={true}
                      onClick={() => { }}
                    />
                  </div>
                  <div className="form-title mb-1">Edit</div>
                  <div className={mainStyle['block']}>
                    <DropdownWithAdvancedSearch
                      value={searchTag}
                      placeholder='Choose tags to remove'
                      alignEnd={true}
                      hasButton={false}
                      dataBsToggleOnInput={true}
                      dataBsToggleOnButton={true}
                      onChange={e => setSearchTag(e.target.value)}
                    >
                      {
                        tagList.map((tag, index) => {
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
            <div className={mainStyle['ports-text']}>
              {portList.length} switch ports
            </div>
          </div>
          <div className={mainStyle['right']}>
            <DropdownWithAdvancedSearch
              value={''}
              readOnly={true}
              alignEnd={true}
              dataBsToggleOnButton={true}
              dropdownMenuStyle={{ minWidth: 371 }}
              onChange={e => console.log(e.target.value)}
            >
              <li className='mt-2'>
                <div className='form-title'>Profile name</div>
                <DropdownWithItem
                  id='status-dropdown'
                  type='normal'
                  selectedItem={profileList.find(profile => profile.isActive === true)}
                  itemList={profileList}
                  onClick={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title'>Port #</div>
                <Input
                  type='text'
                  autoComplete='new-password'
                  placeholder='1-52'
                  onChange={e => {
                    console.log(e.target.value);
                  }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title'>VLAN</div>
                <DropdownWithAdvancedSearch
                  placeholder='1-4094'
                  value={searchPortValue}
                  alignEnd={true}
                  dataBsToggleOnButton={true}
                  onChange={e => setSearchPortValue(e.target.value)}
                >
                  {
                    searchVlanIdList.map((vlanId, index) => {
                      return (
                        <li
                          key={index}
                          className={`pointer ${vlanId.checked && 'active'}`}
                          onClick={() => { }}
                        >
                          {vlanId.title}
                        </li>
                      );
                    })
                  }
                </DropdownWithAdvancedSearch>
              </li>
              <li className='mt-2'>
                <div className='form-title'>Type</div>
                <DropdownWithItem
                  id='type-dropdown'
                  type='normal'
                  selectedItem={typeList.find(item => item.isActive === true)}
                  itemList={typeList}
                  onClick={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title'>Tags</div>
                <DropdownWithItem
                  id='tag-dropdown'
                  type='normal'
                  selectedItem={tagList.find(item => item.isActive === true)}
                  itemList={tagList}
                  onClick={() => { }}
                />
              </li>
              <li className='mt-2 mb-2'>
                <div className='form-title'>Port schedule</div>
                <DropdownWithItem
                  id='authentication-server-dropdown'
                  type='normal'
                  selectedItem={schedulePolicyList.find(item => item.isActive === true)}
                  itemList={schedulePolicyList}
                  onClick={schedulePolicy => { }}
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
          </div>
        </div >
      </div >

      <div className='layout-container layout-container--fluid'>
        <Table responsive striped hover className='table-container' id='switch-port-table' >
          <thead>
            <tr>
              <th>
                <Checkbox
                  id={nanoid()}
                  type='checkbox'
                  checked={checkedAllState(portList)}
                  onChange={e => toggleCheckedAll(portList, setPortList)}
                />
              </th>
              {
                getVisibleFieldState('number') && (
                  <th>#</th>
                )
              }
              {
                getVisibleFieldState('switchPort') && (
                  <th style={{ minWidth: '220px' }}>
                    <LinkerWithA
                      label='Switch / Ports'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'switchPort', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('portNumber') && (
                  <th>
                    <LinkerWithA
                      label='Port #'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'port', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('aggregate') && (
                  <th>
                    <LinkerWithA
                      label='Aggregate'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'aggregate', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('link') && (
                  <th>
                    <LinkerWithA
                      label='Link'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'linkStatus', setPortList)}
                    >
                      <TooltipDialog
                        className="ms-1 me-1"
                        placement="right"
                        title="Link configuration status <br>( Link configuration/Link status ).<br>The combo port shall dispaly both <br>RJ45 and SFP link configuration status."
                      />
                    </LinkerWithA>
                  </th>
                )
              }
              {
                getVisibleFieldState('speedDownshift') && (
                  <th>
                    <LinkerWithA
                      label='Speed downshift'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'speedDownshift.title', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('type') && (
                  <th>
                    <LinkerWithA
                      label='Type'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'type', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('vlan') && (
                  <th>
                    <LinkerWithA
                      label='VLAN'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'vlanType', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('allowedVlans') && (
                  <th>
                    <LinkerWithA
                      label='Allowed VLANs'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'allowedVlans', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('portState') && (
                  <th>
                    <LinkerWithA
                      label='Port state'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'portState', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('poe') && (
                  <th>
                    <LinkerWithA
                      label='Poe'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'poe', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('pdAlive') && (
                  <th>
                    <LinkerWithA
                      label='PD alive'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'pdAlive', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('rstp') && (
                  <th>
                    <LinkerWithA
                      label='RSTP'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'rstp', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('lbd') && (
                  <th>
                    <LinkerWithA
                      label='LBD'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'lbd', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('mrouterPort') && (
                  <th>
                    <LinkerWithA
                      label='Mrouter ports(VLANs)'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'mrouterPort', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('portCos') && (
                  <th>
                    <LinkerWithA
                      label='Port CoS'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'portCos.title', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('portSchedule') && (
                  <th>
                    <LinkerWithA
                      label='Port schedule'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'portSchedule', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('accessPolicy') && (
                  <th>
                    <LinkerWithA
                      label='Access policy'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'accessPolicy', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('mirror') && (
                  <th>
                    <LinkerWithA
                      label='Mirror'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'mirrorList', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('trafficSegmentation') && (
                  <th>
                    <LinkerWithA
                      label='Traffic segmentation'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'trafficSegmentation', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('forwardPorts') && (
                  <th>
                    <LinkerWithA
                      label='Forward port(s)'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'forwardPortList', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('flowControl') && (
                  <th>
                    <LinkerWithA
                      label='Flow control'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'flowControl', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('lldp') && (
                  <th>
                    <LinkerWithA
                      label='LLDP'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'lldp', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('tags') && (
                  <th>
                    <LinkerWithA
                      label='tags'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'tagList', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('deviceName') && (
                  <th>
                    <LinkerWithA
                      label='Device name'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'deviceName', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('rxBroadcastPkts') && (
                  <th>
                    <LinkerWithA
                      label='Rx broadcast pkts'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'rbp', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('txBroadcastPkts') && (
                  <th>
                    <LinkerWithA
                      label='Tx broadcast pkts'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'tbp', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('rxMulticastPkts') && (
                  <th>
                    <LinkerWithA
                      label='Rx multicast pkts'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'rmp', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('txMulticastPkts') && (
                  <th>
                    <LinkerWithA
                      label='Tx multicast pkts'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'tmp', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('receivedBytes') && (
                  <th>
                    <LinkerWithA
                      label='Received bytes'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'rb', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('sentBytes') && (
                  <th>
                    <LinkerWithA
                      label='Sent bytes'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'sb', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('receivedPackets') && (
                  <th>
                    <LinkerWithA
                      label='Received packets'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'rp', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('sentPackets') && (
                  <th>
                    <LinkerWithA
                      label='Sent packets'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'sp', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('totalBytes') && (
                  <th>
                    <LinkerWithA
                      label='Total bytes'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'tb', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('profile') && (
                  <th>
                    <LinkerWithA
                      label='Profile'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'profile', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('profileSyncState') && (
                  <th>
                    <LinkerWithA
                      label='Profile sync state'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'profileState', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('portsGroup') && (
                  <th>
                    <LinkerWithA
                      label='Ports group'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'portGroup', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('modelName') && (
                  <th>
                    <LinkerWithA
                      label='Model name'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'modelName', setPortList)}
                    />
                  </th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              portList.map((port, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Checkbox
                        id={`rl-cb-${index}`}
                        type='checkbox'
                        checked={port.checked}
                        onChange={e => toggleCheckedOne(index, portList, setPortList)}
                      />
                    </td>
                    {
                      getVisibleFieldState('number') && (
                        <td>{index + 1}</td>
                      )
                    }
                    {
                      getVisibleFieldState('switchPort') && (
                        <td>
                          <span
                            className={mainStyle['link']}
                            onMouseOver={e => toggleDetail(index, 'inline-block')}
                            onMouseLeave={e => toggleDetail(index, 'none')}
                            onClick={() => editPort(port)}
                          >
                            {port.switchPort}
                            <span
                              className={`detail-${index} ${mainStyle['link-detail']}`}
                              onClick={() => redirectToDevice(port)}
                            >
                              details
                            </span>
                          </span>
                        </td>
                      )
                    }
                    {
                      getVisibleFieldState('portNumber') && (
                        <td>{port.port}</td>
                      )
                    }
                    {
                      getVisibleFieldState('aggregate') && (
                        <td>{port.aggregate}</td>
                      )
                    }
                    {
                      getVisibleFieldState('link') && (
                        <td>{port.linkStatus}</td>
                      )
                    }
                    {
                      getVisibleFieldState('speedDownshift') && (
                        <td>{port.speedDownshift.title}</td>
                      )
                    }
                    {
                      getVisibleFieldState('type') && (
                        <td>{port.type.title}</td>
                      )
                    }
                    {
                      getVisibleFieldState('vlan') && (
                        <td>
                          {port.type.title === 'Access' ? '' : 'Native '}
                          {port.type.title === 'Access' ? port.accessVlan : port.nativeVlan}
                        </td>
                      )
                    }
                    {
                      getVisibleFieldState('allowedVlans') && (
                        <td>{port.allowedVlans}</td>
                      )
                    }
                    {
                      getVisibleFieldState('portState') && (
                        <td>{port.portState.title}</td>
                      )
                    }
                    {
                      getVisibleFieldState('poe') && (
                        <td>{port.poe.title}</td>
                      )
                    }
                    {
                      getVisibleFieldState('pdAlive') && (
                        <td>{port.pdAlive.title || '-'}</td>
                      )
                    }
                    {
                      getVisibleFieldState('rstp') && (
                        <td>{port.rstp.title}</td>
                      )
                    }
                    {
                      getVisibleFieldState('lbd') && (
                        <td>{port.lbd.title}</td>
                      )
                    }
                    {
                      getVisibleFieldState('mrouterPort') && (
                        <td>{port.mrouterPort}</td>
                      )
                    }
                    {
                      getVisibleFieldState('portCos') && (
                        <td>{port.portCos.title}</td>
                      )
                    }
                    {
                      getVisibleFieldState('portSchedule') && (
                        <td>{port.portSchedule.title}</td>
                      )
                    }
                    {
                      getVisibleFieldState('accessPolicy') && (
                        <td>{port.accessPolicy.title}</td>
                      )
                    }
                    {
                      getVisibleFieldState('mirror') && (
                        <td>
                          {port.mirrorDestination ? 'Mirror destination' : port.mirror}
                        </td>
                      )
                    }
                    {
                      getVisibleFieldState('trafficSegmentation') && (
                        <td>{port.trafficSegmentation.title}</td>
                      )
                    }
                    {
                      getVisibleFieldState('forwardPorts') && (
                        <td>-</td>
                      )
                    }
                    {
                      getVisibleFieldState('flowControl') && (
                        <td>{port.flowControl.title}</td>
                      )
                    }
                    {
                      getVisibleFieldState('lldp') && (
                        <td>-</td>
                      )
                    }
                    {
                      getVisibleFieldState('tags') && (
                        <td>-</td>
                      )
                    }
                    {
                      getVisibleFieldState('deviceName') && (
                        <td>{port.deviceName}</td>
                      )
                    }
                    {
                      getVisibleFieldState('rxBroadcastPkts') && (
                        <td>{port.tbp}</td>
                      )
                    }
                    {
                      getVisibleFieldState('txBroadcastPkts') && (
                        <td>{port.tbp}</td>
                      )
                    }
                    {
                      getVisibleFieldState('rxMulticastPkts') && (
                        <td>{port.rmp}</td>
                      )
                    }
                    {
                      getVisibleFieldState('txMulticastPkts') && (
                        <td>{port.tmp}</td>
                      )
                    }
                    {
                      getVisibleFieldState('receivedBytes') && (
                        <td>{port.rb}</td>
                      )
                    }
                    {
                      getVisibleFieldState('sentBytes') && (
                        <td>{port.sb}</td>
                      )
                    }
                    {
                      getVisibleFieldState('receivedPackets') && (
                        <td>{port.rp}</td>
                      )
                    }
                    {
                      getVisibleFieldState('sentPackets') && (
                        <td>{port.sp}</td>
                      )
                    }
                    {
                      getVisibleFieldState('totalBytes') && (
                        <td>{port.tb}</td>
                      )
                    }
                    {
                      getVisibleFieldState('profile') && (
                        <td>{port.profile}</td>
                      )
                    }
                    {
                      getVisibleFieldState('profileSyncState') && (
                        <td>{port.profileState}</td>
                      )
                    }
                    {
                      getVisibleFieldState('portsGroup') && (
                        <td>{port.portGroup}</td>
                      )
                    }
                    {
                      getVisibleFieldState('modelName') && (
                        <td>{port.modelName}</td>
                      )
                    }
                  </tr>
                );
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

      <EditPortModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        selectedPortList={selectedPortList}
        pushToDevice={pushToDevice}
      />

      <AggregatePortModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        selectedPortList={selectedPortList}
        pushToDevice={pushToDevice}
      />

      <MirrorPortModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        selectedPortList={selectedPortList}
        mirroredPortList={mirroredPortList}
        mirrorDestinationPort={mirrorDestinationPort}
        isUnmirror={isUnmirror}
        setIsUnmirror={setIsUnmirror}
        pushToDevice={pushToDevice}
      />

      <PushToDeviceResultModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        pushResultList={pushResultList}
      />
    </>
  )
}

export default SwitchPorts;