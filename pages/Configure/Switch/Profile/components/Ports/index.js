import mainStyle from './ports.module.scss';

import { useState, useEffect } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep, isArray } from 'lodash';
import { nanoid } from 'nanoid';

// Component
import {
  DropdownWithItem, Button,
  DropdownWithAdvancedSearch, Input, DropdownWithCheckbox, Checkbox,
  LinkerWithA, PaginationContainer
} from 'components/';

import EditPortModal from './modals/EditPortModal';
import AggregatePortModal from './modals/AggregatePortModal';
import MirrorPortModal from './modals/MirrorPortModal';

// Dummy data & util
import { getSchedulePolicyList } from 'dummy/data/schedule-policy';
import { getProfilePorts } from 'dummy/data/switch/ports';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne } from 'dummy/utils/checkbox';
import { sorting } from 'dummy/utils/sorting';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

// Default value
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
    { title: 'Ports group / port', key: 'portsGroupPort', checked: true },
    { title: 'PD IP address', key: 'pdIpAddress', checked: true },
    { title: 'Ports group', key: 'portsGroup', checked: true },
    { title: 'RSTP', key: 'rstp', checked: true },
    { title: 'Port #', key: 'portNumber', checked: true },
    { title: 'LBD', key: 'lbd', checked: true },
    { title: 'Aggregate', key: 'aggregate', checked: true },
    { title: 'Mrouter port(VLANs)', key: 'mrouterPort', checked: true },
    { title: 'Link', key: 'link', checked: true },
    { title: 'Port CoS', key: 'portCos', checked: true },
    { title: 'Speed downshift', key: 'speedDownshift', checked: true },
    { title: 'Port schedule', key: 'portSchedule', checked: true },
    { title: 'Type', key: 'type', checked: true },
    { title: 'Mirror', key: 'mirror', checked: true },
    { title: 'VLAN', key: 'vlan', checked: true },
    { title: 'Traffic segmentation', key: 'trafficSegmentation', checked: true },
    { title: 'Allowed VLANs', key: 'allowedVlans', checked: true },
    { title: 'Forward port(s)', key: 'forwardPorts', checked: true },
    { title: 'Access policy', key: 'accessPolicy', checked: true },
    { title: 'Flow control', key: 'flowControl', checked: true },
    { title: 'Port state', key: 'portState', checked: true },
    { title: 'Tags', key: 'tags', checked: true },
    { title: 'Poe', key: 'poe', checked: true },
    { title: 'Port name', key: 'portName', checked: true },
    { title: 'PD alive', key: 'pdAlive', checked: true },
    { title: '#', key: 'number', checked: true }
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

const Ports = (props) => {
  const { profile } = props;

  // Fake API data
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
  const fakePortList = getProfilePorts();

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [portsGroupList, setPortsGroupList] = useState([]);
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
        (item.portGroupPort === port.portGroupPort) && (item.checked = true);
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

  // Side effect
  useEffect(() => {
    setPortsGroupList(cloneDeep(defaultPortGroupList));
    setSearchVlanIdList(cloneDeep(fakeVlanIdList));
    setTypeList(cloneDeep(defaultTypeList));
    setTagList(cloneDeep(fakeTagList));
    setSchedulePolicyList(fakeSchedulePolicyList);

    // Only display 10 ports, because pagination is not implemented
    const a = fakePortList
      .map((port, _) => {
        port.checked = false;
        port.portGroupPort = `${port.portGroup} ports / ${port.port}`;
        port.linkStatus = port.link.title;
        port.vlanType = `${port.type.title} ${port.vlan}`;

        return port;
      })
    setPortList(a.filter(port => port.portGroup === 10));

    setMirroredPortList([...fakePortList.filter((port) => port.mirror !== '-')]);
    setMirrorDestinationPort(fakePortList.find((port) => port.mirrorDestination) || null)
  }, []);

  if (portList.length === 0) {
    return null;
  }

  return (
    <>
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
            <span className='form-title' style={{ paddingTop: '5px', minWidth: 'auto' }}>Ports group : </span>
            <DropdownWithItem
              id='ports-group-dropdown'
              type='normal'
              isRegularSize={true}
              selectedItem={portsGroupList.find(item => item.isActive === true)}
              itemList={portsGroupList}
              onClick={() => { }}
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
                <div className='form-title mb-1'>Port #</div>
                <Input
                  type='text'
                  autoComplete='new-pasword'
                  placeholder='1-52'
                  onChange={e => {
                    console.log(e.target.value);
                  }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>VLAN</div>
                <DropdownWithAdvancedSearch
                  placeholder='1-4094'
                  value={searchPortValue}
                  alignEnd={true}
                  isSelectingItem={true}
                  dataBsToggleOnButton={true}
                  onChange={e => setSearchPortValue(e.target.value)}
                >
                  {
                    searchVlanIdList.map((vlanId, index) => {
                      return (
                        <li
                          key={index}
                          className={vlanId.checked ? 'active' : ''}
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
                <div className='form-title mb-1'>Type</div>
                <DropdownWithItem
                  id='type-dropdown'
                  type='normal'
                  selectedItem={typeList.find(item => item.isActive === true)}
                  itemList={typeList}
                  onClick={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>Tags</div>
                <DropdownWithItem
                  id='tag-dropdown'
                  type='normal'
                  selectedItem={tagList.find(item => item.isActive === true)}
                  itemList={tagList}
                  onClick={() => { }}
                />
              </li>
              <li className='mt-2 mb-2'>
                <div className='form-title mb-1'>Port schedule</div>
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
              columnNumber={2}
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
                getVisibleFieldState('portsGroupPort') && (
                  <th style={{ minWidth: '220px' }}>
                    <LinkerWithA
                      label='Ports group / Port'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'portGroupPort', setPortList)}
                    />
                  </th>
                )
              }
              {
                getVisibleFieldState('portGroup') && (
                  <th>
                    <LinkerWithA
                      label='Ports group #'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'portGroup', setPortList)}
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
                    />
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
                      onClick={e => sorting(e, portList, 'type.title', setPortList)}
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
                getVisibleFieldState('portName') && (
                  <th>
                    <LinkerWithA
                      label='Port name'
                      className='text-decoration-none'
                      onClick={e => sorting(e, portList, 'portName', setPortList)}
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
                      getVisibleFieldState('portsGroupPort') && (
                        <td>
                          <div
                            className={mainStyle['link']}
                            onClick={() => editPort(port)}
                          >
                            {port.portGroupPort}
                          </div>
                        </td>
                      )
                    }
                    {
                      getVisibleFieldState('portsGroup') && (
                        <td>{port.portGroup}</td>
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
                      getVisibleFieldState('tags') && (
                        <td>-</td>
                      )
                    }
                    {
                      getVisibleFieldState('portName') && (
                        <td>{port.portName}</td>
                      )
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </Table>

        <PaginationContainer
          total={portList.length}
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
      />

      <AggregatePortModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        selectedPortList={selectedPortList}
      />

      <MirrorPortModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        selectedPortList={selectedPortList}
        mirroredPortList={mirroredPortList}
        mirrorDestinationPort={mirrorDestinationPort}
        isUnmirror={isUnmirror}
        setIsUnmirror={setIsUnmirror}
      />
    </>
  )
}

export default Ports;