import mainStyle from './event-log.module.scss';

import { useState, useEffect, forwardRef } from 'react';
import DatePicker from 'react-datepicker';
import { Table } from 'react-bootstrap';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';

// Const
import { timeFormat } from 'const/nuclias/dateFormat';

// Component
import { Button, Breadcrumb, InlineTitle, MessageBoxGroup, PaginationContainer, Icon, DropdownWithCheckbox, ButtonWithIcon, LinkerWithA, InputWithIcon, TimePickerSimply } from 'components/';

// Dummy data & util
import { getEventLogList } from 'dummy/data/event-log';
import { sorting } from 'dummy/utils/sorting';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultPathList = [
  { label: 'Monitor', isLink: false },
  { label: 'Gateway', isLink: false },
  { label: 'Event log', isLink: false },
];

const defaultSeverityList = [
  { title: 'Critical', checked: true },
  { title: 'Warning', checked: true },
  { title: 'Information', checked: true },
];

const defaultCategoryList = [
  {
    index: 1,
    parentId: 1,
    name: 'connectivity',
    checked: true,
    title: 'Connectivity',
    level: 'first',
    list: [
      { title: 'Device online', checked: true, level: 'second', customKey: 'a', parentId: 1 },
      { title: 'Device offline', checked: true, level: 'second', customKey: 'a', parentId: 1 },
      { title: 'Device registration', checked: true, level: 'second', customKey: 'a', parentId: 1 },
      { title: 'Reboot', checked: true, level: 'second', customKey: 'a', parentId: 1 },
    ],
  },
  {
    index: 2,
    parentId: 2,
    name: 'firmwareUpgrades',
    title: 'Firmware upgrades',
    checked: true,
    level: 'first',
    list: [
      { title: 'Firmware upgrade started', checked: true, level: 'second', customKey: 'b', parentId: 2 },
      { title: 'Firmware upgraded', checked: true, level: 'second', customKey: 'b', parentId: 2 },
      { title: 'Firmware upgrade failed', checked: true, level: 'second', customKey: 'b', parentId: 2 },
    ],
  },
  {
    index: 3,
    parentId: 3,
    name: 'clients',
    title: 'Clients',
    checked: true,
    level: 'first',
    list: [
      { title: 'Client association rejected', checked: true, level: 'second', customKey: 'c', parentId: 3 },
      { title: 'Client authentication succeeded', checked: true, level: 'second', customKey: 'c', parentId: 3 },
      { title: 'Client authentication failed', checked: true, level: 'second', customKey: 'c', parentId: 3 },
      { title: 'Client association', checked: true, level: 'second', customKey: 'c', parentId: 3 },
      { title: 'Client IP changed', checked: true, level: 'second', customKey: 'c', parentId: 3 },
      { title: 'Client disassociation', checked: true, level: 'second', customKey: 'c', parentId: 3 },
    ],
  },
  {
    index: 4,
    parentId: 4,
    name: 'configurationStatus',
    title: 'Configuration status',
    checked: true,
    level: 'first',
    list: [
      { title: 'IP address change', checked: true, level: 'second', customKey: 'd', parentId: 4 },
      { title: 'Channel change', checked: true, level: 'second', customKey: 'd', parentId: 4 },
      { title: 'Profile configurations change', checked: true, level: 'second', customKey: 'd', parentId: 4 },
    ],
  },
  {
    index: 5,
    parentId: 5,
    name: 'configurationStatus',
    title: 'Network status',
    checked: true,
    level: 'first',
    list: [
      { title: 'WAN mode changed', checked: true, level: 'second', customKey: 'e', parentId: 5 },
      { title: 'Dynamic DNS status', checked: true, level: 'second', customKey: 'e', parentId: 5 },
      { title: 'DHCP subnets', checked: true, level: 'second', customKey: 'e', parentId: 5 },
      { title: 'DHCP leases', checked: true, level: 'second', customKey: 'e', parentId: 5 },
      { title: 'Static IPv4', checked: true, level: 'second', customKey: 'e', parentId: 5 },
      { title: 'Ethernet port has connected', checked: true, level: 'second', customKey: 'e', parentId: 5 },
      { title: 'Ethernet port has disconnected', checked: true, level: 'second', customKey: 'e', parentId: 5 },
      { title: 'Routing', checked: true, level: 'second', customKey: 'e', parentId: 5 },
      { title: 'Traffic management', checked: true, level: 'second', customKey: 'e', parentId: 5 },
    ],
  },
  {
    index: 6,
    parentId: 6,
    name: 'configurationStatus',
    title: 'Network status',
    checked: true,
    level: 'first',
    list: [
      { title: 'IPv4 firewall rule has triggered', checked: true, level: 'second', customKey: 'f', parentId: 6 },
      { title: 'Port forwarding policy has triggered', checked: true, level: 'second', customKey: 'f', parentId: 6 },
      { title: 'Port trigger policy has triggered', checked: true, level: 'second', customKey: 'f', parentId: 6 },
      { title: '1:1 NAT policy has triggered', checked: true, level: 'second', customKey: 'f', parentId: 6 },
      { title: 'IPS/IDS has detected', checked: true, level: 'second', customKey: 'f', parentId: 6 },
      { title: 'Web content filtering policy has triggered', checked: true, level: 'second', customKey: 'f', parentId: 6 },
      { title: 'Application control policy has triggered', checked: true, level: 'second', customKey: 'f', parentId: 6 },
    ],
  },
  {
    index: 7,
    parentId: 7,
    name: 'configurationStatus',
    title: 'Network status',
    checked: true,
    level: 'first',
    list: [
      { title: 'IPsec', checked: true, level: 'second', customKey: 'g', parentId: 7 },
      { title: 'PPTP', checked: true, level: 'second', customKey: 'g', parentId: 7 },
      { title: 'L2TP', checked: true, level: 'second', customKey: 'g', parentId: 7 },
      { title: 'OpenVPN', checked: true, level: 'second', customKey: 'g', parentId: 7 },
      { title: 'GRE tunnel VPN', checked: true, level: 'second', customKey: 'g', parentId: 7 },
    ],
  },
];

const defaultDeviceList = [
  { title: '1D:D7:6C:78:B2:03', checked: true },
  { title: '4D:58:E2:88:1D:41', checked: true },
  { title: '57:66:9F:E8:42:07', checked: true },
  { title: '76:15:03:9A:CE:8E', checked: true },
];

const Nuclias = () => {
  // Fake API data
  const fakerEventLogList = getEventLogList('GATEWAY');

  // Variable
  const now = dayjs();
  const beforeHour = now.add(-1, 'hour');
  const limitDay = now.add(-60, 'day');

  // State
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [startDate, setStartDate] = useState(beforeHour);
  const [endDate, setEndDate] = useState(now);
  const [severityList, setSeverityList] = useState(cloneDeep(defaultSeverityList));
  const [categoryList, setCategoryList] = useState(cloneDeep(defaultCategoryList));
  const [selectedCategoryCount, setSelectedCategoryCount] = useState(16);
  const [isCategoryToggleAll, setIsCategoryToggleAll] = useState(true);
  const [deviceList, setDeviceList] = useState(cloneDeep(defaultDeviceList));
  const [eventLogList, setEventLogList] = useState([]);

  // Method
  const DatePickerCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <button className={mainStyle['custom-input']} onClick={onClick} ref={ref}>
      <div className="d-flex justify-content-start">
        <div>
          <Icon className={`icon-schedule ${mainStyle['custom-icon']}`} />
        </div>
        <div className={`${mainStyle['custom-text']}`}>{value}</div>
      </div>
    </button>
  ));

  // Side effect
  useEffect(() => {
    setEventLogList(cloneDeep(fakerEventLogList));
  }, []);

  useEffect(() => {
    let newList = [...categoryList[0].list, ...categoryList[1].list, ...categoryList[2].list, ...categoryList[3].list];
    const newSelectedCategoryCount = newList.filter(item => !item.isAll && item.checked).length;
    setSelectedCategoryCount(newSelectedCategoryCount);

    const newIsCategoryToggleAll = newList.every(item => item.checked === true);
    setIsCategoryToggleAll(newIsCategoryToggleAll);
  }, [categoryList]);

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />
      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup messages={messages} changeMessages={setMessages} onClose={type => setMessages({ ...messages, [type]: null })} />

        {/* Filter */}
        <div className={mainStyle['filter-container']}>
          {/* Start date */}
          <div className={mainStyle['item-group']}>
            <div className={mainStyle['item-title']}>Start date</div>
            <div className={mainStyle['item-field']}>
              <div className={mainStyle['data-picker-container']} style={{ zIndex: 2 }}>
                <DatePicker
                  selected={startDate.toDate()}
                  onChange={date => setStartDate(dayjs(date))}
                  dateFormat={timeFormat.datePickerTime}
                  minDate={limitDay.toDate()}
                  maxDate={now.toDate()}
                  customInput={<DatePickerCustomInput />}
                />
              </div>
              <div className={mainStyle['timer-picker-container']}>
                <TimePickerSimply
                  id="start-date"
                  hour={startDate.hour()}
                  minute={startDate.minute()}
                  second={startDate.second()}
                  callback={value => {
                    startDate.hour(value[0]);
                    startDate.minute(value[1]);
                    startDate.second(value[2]);
                  }}
                />
              </div>
            </div>
          </div>

          {/* End date */}
          <div className={mainStyle['item-group']}>
            <div className={mainStyle['item-title']}>End date</div>
            <div className={mainStyle['item-field']}>
              <div className={mainStyle['data-picker-container']} style={{ zIndex: 1 }}>
                <DatePicker
                  selected={endDate.toDate()}
                  onChange={date => setEndDate(dayjs(date))}
                  dateFormat={timeFormat.datePickerTime}
                  minDate={limitDay.toDate()}
                  maxDate={now.toDate()}
                  customInput={<DatePickerCustomInput />}
                />
              </div>
              <div className={mainStyle['timer-picker-container']}>
                <TimePickerSimply
                  id="end-date"
                  hour={endDate.hour()}
                  minute={endDate.minute()}
                  second={endDate.second()}
                  callback={value => {
                    endDate.hour(value[0]);
                    endDate.minute(value[1]);
                    endDate.second(value[2]);
                  }}
                />
              </div>
            </div>
          </div>

          <div className={mainStyle['item-space']}></div>

          {/* Severity */}
          <div className={mainStyle['item-group']}>
            <div className={mainStyle['item-title']}>Severity</div>
            <div className={mainStyle['item-field']}>
              <div className={mainStyle['full-width-dropdown']}>
                <DropdownWithCheckbox
                  allMode={true}
                  label="c7d0b2bf4f"
                  id="severity"
                  type="checkbox"
                  subType="right"
                  extendLiClassName="ms-4"
                  itemList={severityList}
                  onChangeAll={isToggleAll => {
                    const tmpSeverityList = cloneDeep(severityList);
                    tmpSeverityList.forEach(severity => {
                      severity.checked = isToggleAll;
                    });
                    setSeverityList(tmpSeverityList);
                  }}
                  onChange={item => {
                    const tmpSeverityList = cloneDeep(severityList);
                    tmpSeverityList.forEach(severity => {
                      if (severity.title === item.title) {
                        severity.checked = !severity.checked;
                      }
                    });
                    setSeverityList(tmpSeverityList);
                  }}
                />
              </div>
            </div>
          </div>

          {/* Category / Event type */}
          <div className={mainStyle['item-group']}>
            <div className={mainStyle['item-title']}>Category / Event type</div>
            <div className={mainStyle['item-field']}>
              <div className={mainStyle['full-width-dropdown']}>
                <DropdownWithCheckbox
                  allMode={true}
                  label="c7d0b2bf4f"
                  id="category"
                  type="checkbox"
                  itemList={categoryList}
                  dropdownType="three"
                  onChangeAll={isToggleAll => {
                    const tmpCategoryList = cloneDeep(defaultCategoryList);
                    tmpCategoryList.forEach(category => {
                      category.checked = isToggleAll;
                      category.list.forEach(item => {
                        item.checked = isToggleAll;
                      });
                    });

                    setCategoryList(tmpCategoryList);
                  }}
                  onChangeLevel1={(item, checked) => {
                    if (item.level === 'first') {
                      const tmpCategoryList = cloneDeep(categoryList);
                      tmpCategoryList.forEach((category, index) => {
                        if (category.index === item.index) {
                          category.checked = checked;
                          category.list.forEach(item => {
                            item.checked = checked;
                          });
                        }
                      });

                      setCategoryList(tmpCategoryList);
                    }

                    if (item.level === 'second') {
                      const tmpCategoryList = cloneDeep(categoryList);
                      tmpCategoryList.forEach((categoryItem, index) => {
                        if (categoryItem.parentId === item.parentId) {
                          categoryItem.list.forEach(subItem => {
                            if (subItem.title === item.title) {
                              subItem.checked = checked;
                            }
                          });

                          let newList = [...tmpCategoryList[index].list];
                          const newListAll = newList.every(item => item.checked === true);

                          if (newListAll) {
                            categoryItem.checked = true;
                          } else {
                            categoryItem.checked = false;
                          }
                        }
                      });

                      setCategoryList(tmpCategoryList);
                    }
                  }}
                  selectedTargetCount={selectedCategoryCount}
                  isTargetToggleAll={isCategoryToggleAll}
                />
              </div>
            </div>
          </div>

          {/* Device */}
          <div className={`${mainStyle['item-group']} ${mainStyle['item-group--indent']}`}>
            <div className={mainStyle['item-title']}>Device</div>
            <div className={mainStyle['item-field']}>
              <div className={mainStyle['full-width-dropdown']}>
                <DropdownWithCheckbox
                  allMode={true}
                  label="c7d0b2bf4f"
                  id="device"
                  type="checkbox"
                  subType="right"
                  extendLiClassName="ms-4"
                  isLastElement={true}
                  itemList={deviceList}
                  onChangeAll={isToggleAll => {
                    const tmpDeviceList = cloneDeep(deviceList);
                    tmpDeviceList.forEach(device => {
                      device.checked = isToggleAll;
                    });
                    setDeviceList(tmpDeviceList);
                  }}
                  onChange={item => {
                    const tmpDeviceList = cloneDeep(deviceList);
                    tmpDeviceList.forEach(device => {
                      if (device.title === item.title) {
                        device.checked = !device.checked;
                      }
                    });
                    setDeviceList(tmpDeviceList);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className={mainStyle['button-container']}>
          <Button label="Reset filters" className={mainStyle['button']} onClick={() => {}} />
          <Button label="Filter" className={`btn-indigo ${mainStyle['button']}`} onClick={() => {}} />
          <ButtonWithIcon label="Download" className={mainStyle['button']} iconClassName="icon-download" onClick={() => {}} />
        </div>

        {/* Table */}
        <div className="d-flex justify-content-end mb-2">
          <InlineTitle isNonUnderline>
            <InputWithIcon
              type="search"
              iconPosition="left"
              iconClassName="icon-search"
              placeholder="Search"
              style={{ width: '149px' }}
              value={''}
              onChange={e => {}}
              onClick={() => {}}
              onBlur={() => {}}
            />
          </InlineTitle>
        </div>

        <Table responsive striped hover className="table-container" id="event-log-table">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <LinkerWithA label="Time" className="text-decoration-none" onClick={e => sorting(e, eventLogList, 'time', setEventLogList)} />
              </th>
              <th>
                <LinkerWithA label="Gateway" className="text-decoration-none" onClick={e => sorting(e, eventLogList, 'device', setEventLogList)} />
              </th>
              <th>
                <LinkerWithA label="MAC address" className="text-decoration-none" onClick={e => sorting(e, eventLogList, 'macAddress', setEventLogList)} />
              </th>
              <th>
                <LinkerWithA label="Severity" className="text-decoration-none" onClick={e => sorting(e, eventLogList, 'severity', setEventLogList)} />
              </th>
              <th>
                <LinkerWithA label="Category" className="text-decoration-none" onClick={e => sorting(e, eventLogList, 'category', setEventLogList)} />
              </th>
              <th>
                <LinkerWithA label="Event type" className="text-decoration-none" onClick={e => sorting(e, eventLogList, 'eventType', setEventLogList)} />
              </th>
              <th>
                <LinkerWithA label="Event description" className="text-decoration-none" onClick={e => sorting(e, eventLogList, 'eventDescription', setEventLogList)} />
              </th>
            </tr>
          </thead>
          <tbody>
            {eventLogList.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.time}</td>
                  <td>{item.device}</td>
                  <td>{item.macAddress}</td>
                  <td>{item.severity}</td>
                  <td>{item.category}</td>
                  <td>{item.eventType}</td>
                  <td>
                    {item.eventDescription.map((description, descriptionIndex) => (
                      <div key={descriptionIndex}>{description}</div>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>

        <PaginationContainer
          total={deviceList.length}
          onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
          onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
        />
      </div>
    </>
  );
};

export default Nuclias;
