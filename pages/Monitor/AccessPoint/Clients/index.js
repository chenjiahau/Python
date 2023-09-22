import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { cloneDeep, isArray, orderBy } from 'lodash';

// UI
import ConfirmDeleteDeviceModal from 'cloudUi/Modals/ConfirmDeleteDeviceModal';
import AddDeviceModal from 'cloudUi/Navigator/modals/AddDeviceModal';

// Component
import {
  Breadcrumb, Button, MessageBoxGroup, InlineTitle, DropdownWithItem, InputWithIcon,
  DropdownWithCheckbox, Checkbox, LinkerWithA, Icon, ConnectionBar, PaginationContainer,
  DropdownWithTimeframe, DropdownWithAdvancedSearch, Input, EditableNameBox
} from 'components/';

// Dummy data & util
import { getClientList } from 'dummy/data/client';
import { sorting } from 'dummy/utils/sorting';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';
import { changeDropdown } from 'dummy/utils/dropdown';

// Default variable
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPathList = [
  { label: 'Monitor', isLink: false },
  { label: 'Access Point', isLink: false },
  { label: 'Clients', isLink: false },
];

const defaultTimeframeList = [
  { title: 'Last 24 hours', isActive: true },
  { title: 'Last 7 days', isActive: false },
  { title: 'Last 14 days', isActive: false },
  { title: 'Last 30 days', isActive: false },
  { title: 'Last 60 days', isActive: false },
];

const defaultDropdownStatusList = [
  { title: 'All', isActive: true },
  { title: 'Online', isActive: false },
  { title: 'Offline', isActive: false },
];

const defaultFieldList = [
  [
    { title: 'All', key: 'all', checked: true, isAll: true }
  ],
  [
    { title: 'Client name', key: 'clientName', checked: true },
    { title: 'MAC address', key: 'macAddress', checked: true },
  ],
  [
    { title: 'IPv4 address', key: 'ipv4Address', checked: true },
    { title: 'Connected to', key: 'connectedTo', checked: true },
  ],
  [
    { title: 'SSID', key: 'ssid', checked: true },
    { title: 'Channel', key: 'channel', checked: true },
  ],
  [
    { title: 'RSSI', key: 'rssi', checked: true },
    { title: 'SNR', key: 'snr', checked: true },
  ],
  [
    { title: 'Usage', key: 'usage', checked: true },
    { title: 'First seen', key: 'firstSeen', checked: true },
  ],
  [
    { title: 'Last seen', key: 'lastSeen', checked: true },
    { title: 'Manufacturer', key: 'manufacturer', checked: true },
  ],
  [
    { title: 'Capital portal', key: 'capitalPortal', checked: true },
    { title: 'User ID', key: 'userId', checked: true },
  ]
];

const Clients = () => {
  // Fake API data
  const fakeClientList = getClientList('AP');

  // State
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [timeframeList, setTimeframeList] = useState(cloneDeep(defaultTimeframeList));
  const [clientList, setClientList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [dropdownStatusList, setdropdownStatusList] = useState(cloneDeep(defaultDropdownStatusList));
  const [dropdownDeviceList, setDropdownDeviceList] = useState([]);
  const [dropdownSsidList, setDropdownSsidList] = useState([]);
  const [dropdownManufacturerList, setDropdownManufacturerList] = useState([]);
  const [fieldList, setFieldList] = useState(cloneDeep(defaultFieldList));

  // Method
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

  const changeOriginClientName = (index) => {
    const updatedClientList = cloneDeep(clientList);
    updatedClientList[index].originClientName = updatedClientList[index].clientName;
    setClientList(updatedClientList);
  }

  const changeClientName = (value, index) => {
    const updatedClientList = cloneDeep(clientList);
    updatedClientList[index].clientName = value;
    setClientList(updatedClientList);
  }

  // Side effect
  useEffect(() => {
    const updatedDropdownDeviceList = new Set();
    fakeClientList.forEach(client => {
      const device = {
        title: client.connectedTo,
        isActive: false,
      };

      !updatedDropdownDeviceList.has(JSON.stringify(device)) && updatedDropdownDeviceList.add(JSON.stringify(device));
    });
    setDropdownDeviceList([
      {
        title: 'All',
        isActive: true,
      },
      ...orderBy(Array.from(updatedDropdownDeviceList).map(device => JSON.parse(device)), ['title'], ['asc'])
    ]);

    const updatedDropdownSsidList = new Set();
    fakeClientList.forEach(client => {
      const ssid = {
        title: client.ssid,
        isActive: false,
      };

      !updatedDropdownSsidList.has(JSON.stringify(ssid)) && updatedDropdownSsidList.add(JSON.stringify(ssid));
    });
    setDropdownSsidList(
      [
        {
          title: 'All',
          isActive: true,
        },
        ...orderBy(Array.from(updatedDropdownSsidList).map(ssid => JSON.parse(ssid)), ['title'], ['asc'])
      ]
    );

    const updatedDropdownManufacturerList = new Set();
    fakeClientList.forEach(client => {
      const manufacturer = {
        title: client.manufacturer,
        isActive: false,
      };
      !updatedDropdownManufacturerList.has(JSON.stringify(manufacturer)) && updatedDropdownManufacturerList.add(JSON.stringify(manufacturer));
    });

    setDropdownManufacturerList(
      [
        {
          title: 'All',
          isActive: true,
        },
        ...orderBy(Array.from(updatedDropdownManufacturerList).map(manufacturer => JSON.parse(manufacturer)), ['title'], ['asc'])
      ]
    );

    const updatedClientList = fakeClientList.map(client => {
      return {
        ...client,
        originClientName: client.clientName
      }
    });

    setClientList(updatedClientList);
  }, []);

  if (clientList.length === 0) {
    return null;
  }

  return (
    <>
      <div className="layout-container layout-container breadcrumb--extended">
        <div>
          <Breadcrumb full={false} pathList={defaultPathList} />
        </div>
        <div className="breadcrumb--extended-right">
          <InlineTitle isNonUnderline >
            <span className="form-title" style={{ paddingTop: '4px', minWidth: 'auto' }}>Time frame : </span>
            <DropdownWithItem
              id="clients-timeframe-dropdown"
              type="normal"
              selectedItem={timeframeList.filter(timeframe => timeframe.isActive)[0]}
              itemList={timeframeList}
              isTruncate
              style={{ width: '150px' }}
              onClick={timeframe => changeDropdown(timeframe, timeframeList, setTimeframeList)}
            />

            <DropdownWithAdvancedSearch
              value={''}
              alignEnd={true}
              dataBsToggleOnButton={true}
              dropdownMenuStyle={{ minWidth: 371 }}
              onChange={e => console.log(e.target.value)}
            >
              <li className="mt-2">
                <div className="form-title">Status</div>
                <DropdownWithItem
                  id="status-dropdown"
                  type="normal"
                  selectedItem={dropdownStatusList.find(status => status.isActive)}
                  itemList={dropdownStatusList}
                  onClick={() => { }}
                />
              </li>
              <li className="mt-2">
                <div className="form-title">MAC address</div>
                <Input
                  id="mac-address-input"
                  type="text"
                  placeholder="e.g. 3C:1E:04:16:53:20"
                  onChange={e => console.log(e.target.value)}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className="mt-2">
                <div className="form-title">Connected to</div>
                <DropdownWithItem
                  id="connected-to-dropdown"
                  type="normal"
                  selectedItem={dropdownDeviceList.find(device => device.isActive)}
                  itemList={dropdownDeviceList}
                  onClick={() => { }}
                />
              </li>
              <li className="mt-2">
                <div className="form-title">SSID</div>
                <DropdownWithItem
                  id="ssid-dropdown"
                  type="normal"
                  selectedItem={dropdownSsidList.find(ssid => ssid.isActive)}
                  itemList={dropdownSsidList}
                  onClick={() => { }}
                />
              </li>
              <li className="mt-2">
                <div className="form-title">Manufacturer</div>
                <DropdownWithItem
                  id="manufacturer-dropdown"
                  type="normal"
                  selectedItem={dropdownManufacturerList.find(manufacturer => manufacturer.isActive)}
                  itemList={dropdownManufacturerList}
                  onClick={() => { }}
                />
              </li>
            </DropdownWithAdvancedSearch>
            <DropdownWithCheckbox
              id='clients-field-dropdown'
              type='checkbox'
              isOneRowOneColumn={false}
              columnNumber={2}
              isJiugonggeLabel={true}
              isLastElement={true}
              itemList={fieldList}
              onChange={item => changeField(item)}
            />
            <Button
              label=""
              title="Download as CSV"
              className="icon-download download-button"
              onClick={() => console.log('Download as CSV')}
            />
          </InlineTitle>
        </div>
      </div>

      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />

        <Table responsive striped hover className="table-container" id="device-list-table">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <LinkerWithA
                  label="Status"
                  className="text-decoration-none"
                  onClick={e => sorting(e, clientList, 'status', setClientList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Client name"
                  className="text-decoration-none"
                  onClick={e => sorting(e, clientList, 'clientName', setClientList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="MAC address"
                  className="text-decoration-none"
                  onClick={e => sorting(e, clientList, 'macAddress', setClientList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="IPv4 address"
                  className="text-decoration-none"
                  onClick={e => sorting(e, clientList, 'ipv4Address', setClientList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Connected to"
                  className="text-decoration-none"
                  onClick={e => sorting(e, clientList, 'connectedTo', setClientList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="SSID"
                  className="text-decoration-none"
                  onClick={e => sorting(e, clientList, 'ssid', setClientList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Channel"
                  className="text-decoration-none"
                  onClick={e => sorting(e, clientList, 'channel', setClientList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="RSSI"
                  className="text-decoration-none"
                  onClick={e => sorting(e, clientList, 'rssi', setClientList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="SNR"
                  className="text-decoration-none"
                  onClick={e => sorting(e, clientList, 'snr', setClientList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Usage"
                  className="text-decoration-none"
                  onClick={e => sorting(e, clientList, 'usage', setClientList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="First seen"
                  className="text-decoration-none"
                  onClick={e => sorting(e, clientList, 'firstSeen', setClientList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Manufacturer"
                  className="text-decoration-none"
                  onClick={e => sorting(e, clientList, 'manufacturer', setClientList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Captive portal"
                  className="text-decoration-none"
                  onClick={e => sorting(e, clientList, 'captivePortal', setClientList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="User ID"
                  className="text-decoration-none"
                  onClick={e => sorting(e, clientList, 'userId', setClientList)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {
              clientList.map((client, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {client.status === 'Online' && <Icon className={'icon-wireless-online'} />}
                    {client.status === 'Offline' && <Icon className={'icon-wireless-offline'} />}
                    {client.status === 'Dormant' && <Icon className={'icon-wireless-dormant'} />}
                  </td>
                  <td>
                    <EditableNameBox
                      id={index}
                      isMiddleSize={true}
                      isInvalid={false}
                      onClickCancelIcon={() => changeClientName(client.originClientName, index)}
                      inputFieldOnKeyDown={(e) => changeOriginClientName(index)}
                      inputFieldOnChange={e => changeClientName(e.target.value, index)}
                      value={client.clientName}
                    />
                  </td>
                  <td>{client.macAddress}</td>
                  <td>{client.ipv4Address}</td>
                  <td>
                    <Link to={`/cloud/configure/access-point/device/${client.connectedDeviceId}`}>{client.connectedTo}</Link>
                  </td>
                  <td>{client.ssid}</td>
                  <td>{client.channel}</td>
                  <td>{client.rssi}</td>
                  <td>{client.snr}</td>
                  <td>{client.usage}</td>
                  <td>{client.firstSeen}</td>
                  <td>{client.manufacturer}</td>
                  <td>{client.captivePortal}</td>
                  <td>{client.userId}</td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </div>
    </>
  )
}

export default Clients