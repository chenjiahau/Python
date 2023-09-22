import changeLogStyle from './change-log.module.scss';

import { useState } from 'react';
import { cloneDeep } from 'lodash';

// Table & Modal
import ChangeLogTable from './ChangeLogTable';

// Components
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import Breadcrumb from '../../../components/Breadcrumb';
import InlineTitle from '../../../components/InlineTitle';
import MessageBoxGroup from '../../../components/MessageBoxGroup';
import DropdownWithItem from '../../../components/DropdownWithItem';
import PaginationContainer from '../../../components/PaginationContainer';
import DropdownWithTimeframe from '../../../components/DropdownWithTimeframe';
import DropdownWithAdvancedSearch from '../../../components/DropdownWithAdvancedSearch';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultPathList = [
  { label: 'Reports', isLink: false },
  { label: 'Change log', isLink: false },
];

const dropdownSiteList = [
  { title: 'All', isActive: true },
  { title: 'Test', isActive: false },
  { title: 'HQ', isActive: false },
  { title: 'Neiwan', isActive: false },
  { title: 'Daliao', isActive: false },
  { title: 'Dream Mail', isActive: false },
  { title: 'Neihu', isActive: false },
  { title: 'Songshan', isActive: false },
];

const dropdownSsidList = [{ title: 'All', isActive: true }];

const dropdownPageList = [
  { title: 'All', isActive: true },
  { title: 'Access policies', isActive: false },
  { title: 'Switch settings', isActive: false },
  { title: 'Port Schedules', isActive: false },
];

const dropdownLabelList = [
  { title: 'All', isActive: true },
  { title: 'Guest VLAN', isActive: false },
  { title: 'IGMP Snooping', isActive: false },
  { title: 'MTU', isActive: false },
  { title: 'Port Schedule', isActive: false },
  { title: 'RADIUS servers', isActive: false },
];

const ChangeLog = () => {
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));

  return (
    <>
      <div className="layout-container layout-container breadcrumb--extended">
        <div>
          <Breadcrumb full={false} pathList={defaultPathList} />
        </div>
        <div className="breadcrumb--extended-right">
          <InlineTitle isNonUnderline >
            <span className="form-title" style={{ paddingTop: '4px', minWidth: 'auto' }}>Time frame : </span>
            <DropdownWithTimeframe
              customTimeFrameDay={'120'}
              alignEnd={true}
              onInit={initTimeFrame =>
                console.log('initTimeFrame-', initTimeFrame)
              }
              onChange={selectedTimeframe =>
                console.log('selectedTimeframe-', selectedTimeframe)
              }
            />

            <DropdownWithAdvancedSearch
              value={''}
              alignEnd={true}
              dataBsToggleOnButton={true}
              dropdownMenuStyle={{ minWidth: 371 }}
              onChange={e => console.log(e.target.value)}
            >
              <li>
                <div className="form-title">Account</div>
                <Input
                  type="text"
                  style={{ margin: 0 }}
                  onChange={e => console.log(e.target.value)}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className="mt-2">
                <div className="form-title">Site</div>
                <DropdownWithItem
                  id="status-dropdown"
                  type="normal"
                  selectedItem={dropdownSiteList[0]}
                  itemList={dropdownSiteList}
                  onClick={() => { }}
                />
              </li>
              <li className="mt-2">
                <div className="form-title">SSID</div>
                <DropdownWithItem
                  id="status-dropdown"
                  type="normal"
                  selectedItem={dropdownSsidList[0]}
                  itemList={dropdownSsidList}
                  onClick={() => { }}
                />
              </li>
              <li className="mt-2">
                <div className="form-title">Page</div>
                <DropdownWithItem
                  id="status-dropdown"
                  type="normal"
                  selectedItem={dropdownPageList[0]}
                  itemList={dropdownPageList}
                  onClick={() => { }}
                />
              </li>
              <li className="mt-2">
                <div className="form-title">Label</div>
                <DropdownWithItem
                  id="status-dropdown"
                  type="normal"
                  selectedItem={dropdownLabelList[0]}
                  itemList={dropdownLabelList}
                  onClick={() => { }}
                />
              </li>
            </DropdownWithAdvancedSearch>

            <Button
              label=""
              title="Download as CSV"
              className="icon-download"
              style={{ border: 'none', height: 25, backgroundColor: '#fff' }}
              onClick={() => console.log('Download as CSV')}
            />
          </InlineTitle>
        </div>
      </div>

      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />

        <ChangeLogTable />

        <div className="d-flex justify-content-between">
          <div className={`${changeLogStyle['entries-dating']}`}>
            5 entries dating back to 2023/01/29
          </div>
          <PaginationContainer
            total={5}
            onPageChange={currentPageNum =>
              console.log('onPageChange', currentPageNum)
            }
            onEntryLimitChange={currentPageNum =>
              console.log('onEntryLimitChange', currentPageNum)
            }
          />
        </div>
      </div>
    </>
  );
};

export default ChangeLog;
