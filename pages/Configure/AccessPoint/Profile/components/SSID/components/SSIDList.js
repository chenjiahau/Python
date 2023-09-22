import mainStyle from '../ssid.module.scss';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Dummy data
import { generateSsidList } from 'dummy/data/ssid';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';
import { sorting } from 'dummy/utils/sorting';

// UI
import ConfirmDeleteModal from 'cloudUi/Modals/ConfirmDeleteModal';

// Component
import { RadioButton, Button, Checkbox, LinkerWithA, Icon, PaginationContainer } from 'components/';

import AddSsidModal from '../modals/AddSsidModal';

const SSIDList = (props) => {
  const {
    defaultMessages,
    setMessages,
    modalStatus,
    changeModalStatus,
    setSelectedSsid
  } = props;

  // Fake API data
  const fakeDataList = generateSsidList('profile');

  // State
  const [ssidList, setSsidList] = useState(cloneDeep(fakeDataList));

  // Method
  const selectSsid = (ssid) => {
    setSelectedSsid(ssid);
    setMessages(cloneDeep(defaultMessages));
  }

  const toggleValue = (type, index) => {
    const updatedSsidLit = cloneDeep(ssidList);
    updatedSsidLit[index][type] = !updatedSsidLit[index][type];
    setSsidList(updatedSsidLit);
  }

  const deleteSsid = () => {
    let updatedSsidLit = cloneDeep(ssidList);
    updatedSsidLit = updatedSsidLit.filter(item => !item.checked);
    setSsidList(updatedSsidLit);
    changeModalStatus(modalStatus.deleteSsid.self, false);
  }

  return (
    <>
      <div className="layout-container layout-container--column layout-container--fluid">
        <div className="mb-2">
          <ButtonGroup>
            <Button
              label="Add SSID"
              onClick={() => changeModalStatus(modalStatus.addSsid.self, true)}
            />
            <Button
              label="Delete"
              disabled={!checkAtleastOneChecked(ssidList)}
              onClick={() => changeModalStatus(modalStatus.deleteSsid.self, true)}
            />
          </ButtonGroup>
        </div>

        <Table responsive striped hover className="table-container" id="device-list-table" style={{ position: 'relative' }}>
          <thead>
            <tr>
              <th>
                <Checkbox
                  id="rl-th-cb1"
                  type='checkbox'
                  checked={checkedAllState(ssidList)}
                  onChange={e => toggleCheckedAll(ssidList, setSsidList)}
                />
              </th>
              <th>#</th>
              <th>
                <LinkerWithA
                  label="SSID"
                  className="text-decoration-none"
                  onClick={e => sorting(e, ssidList, 'name', setSsidList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="2.4GHz"
                  className="text-decoration-none"
                  onClick={e => sorting(e, ssidList, 'speed24Ghz', setSsidList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="5GHz"
                  className="text-decoration-none"
                  onClick={e => sorting(e, ssidList, 'speed5Ghz', setSsidList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Broadcast SSID"
                  className="text-decoration-none"
                  onClick={e => sorting(e, ssidList, 'broadcast', setSsidList)}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Security"
                  className="text-decoration-none"
                  onClick={e => sorting(e, ssidList, 'security', setSsidList)}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {
              ssidList && ssidList.map((ssid, index) => {
                return (
                  <tr key={index}>
                    <td>
                      <Checkbox
                        id={`rl-cb-${index}`}
                        type='checkbox'
                        checked={ssid.checked}
                        onChange={e => toggleCheckedOne(index, ssidList, setSsidList)}
                      />
                    </td>
                    <td>
                      {index + 1}
                    </td>
                    <td>
                      <span
                        className="text-decoration-underline table-not-link"
                        onClick={() => selectSsid(ssid)}
                      >
                        {ssid.name}
                      </span>
                    </td>
                    <td>
                      <Checkbox
                        id={`rl-cb-24ghz-${index}`}
                        type='checkbox'
                        checked={ssid.speed24Ghz}
                        onChange={() => toggleValue('speed24Ghz', index)}
                      />
                    </td>
                    <td>
                      <Checkbox
                        id={`rl-cb-5ghz-${index}`}
                        type='checkbox'
                        checked={ssid.speed5Ghz}
                        onChange={() => toggleValue('speed5Ghz', index)}
                      />
                    </td>
                    <td>
                      <Checkbox
                        id={`rl-cb-broadcast-${index}`}
                        type='checkbox'
                        checked={ssid.broadcast}
                        onChange={() => toggleValue('broadcast', index)}
                      />
                    </td>
                    <td>
                      {ssid.security}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>

        <PaginationContainer
          total={ssidList.length}
          onPageChange={currentPageNum =>
            console.log('onPageChange', currentPageNum)
          }
          onEntryLimitChange={currentPageNum =>
            console.log('onEntryLimitChange', currentPageNum)
          }
        />
      </div>

      <AddSsidModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <ConfirmDeleteModal
        modalKey={modalStatus.deleteSsid.self}
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        title='Delete SSIDs'
        description='Are you sure you want to delete the selected SSIDs?'
        execute={() => { console.log('Write down your execution code') }}
        successCallback={() => deleteSsid()}
      />
    </>
  );
}

export default SSIDList;