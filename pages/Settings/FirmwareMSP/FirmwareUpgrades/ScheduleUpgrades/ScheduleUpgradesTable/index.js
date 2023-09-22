
import { useState, useCallback } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';


import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import LinkerWithA from 'components/LinkerWithA';
import PaginationContainer from 'components/PaginationContainer';
import DropdownWithAdvancedSearch from 'components/DropdownWithAdvancedSearch';
import DropdownWithItem from 'components/DropdownWithItem';

import ViewModal from './modals/ViewModal';
import ReleaseNoteModal from './modals/ReleaseNoteModal';
import ScheduleModal from './modals/ScheduleModal';

const defaultModalStatus = {
  schedule: {
    status: false,
    disabled: false,
  },
  view: {
    status: false,
    disabled: false,
  },
  releaseNote: {
    status: false,
    disabled: false,
  }
};

const defaultCheckboxlist = [
  { type: 'all', checked: false },
  { type: 'first', checked: false },
  { type: 'second', checked: false },
  { type: 'third', checked: false }
];

const dropdownDeviceTypeList = [
  { title: 'All', isActive: true },
  { title: 'Access point', isActive: false },
  { title: 'Switch', isActive: false },
  { title: 'Gateway', isActive: false },
];

const dropdownModelNameList = [
  { title: 'All', isActive: true },
  { title: 'DBA-1210P', isActive: false },
  { title: 'DBA-1210P', isActive: false },
  { title: 'DBS-2000', isActive: false },
];

const dropdownStatusList = [
  { title: 'All', isActive: true },
  { title: 'Update available', isActive: false },
  { title: 'Up to date', isActive: false },
];


const ScheduleUpgradesTable = () => {
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });
  const [checkboxlist, setCheckboxlist] = useState(defaultCheckboxlist);
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  const sorting = e => {
    // NEED TO DO : put this into public function.
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  const changeCheckbox = (type, value) => {
    const newCheckboxlist = [...checkboxlist]
    if (type === 'all') {
      for (let item of newCheckboxlist) {
        item.checked = value;
      }
      setCheckboxlist(newCheckboxlist);
    }
    else {
      for (let item of newCheckboxlist) {
        if (item.type === type) {
          item.checked = value;
        }
      }
      if (newCheckboxlist[1].checked && newCheckboxlist[2].checked && newCheckboxlist[3].checked) {
        newCheckboxlist[0].checked = true
      } else {
        newCheckboxlist[0].checked = false
      }
      setCheckboxlist(newCheckboxlist);
    }
  }
  const checkDeleteDisabeled = () => {
    const result = checkboxlist.some(item => item.checked === true);
    return !result
  }

  return (
    <div className="layout-container--column layout-container--fluid">
      <div className="mb-5">
        <div className="d-flex justify-content-between">
          <ButtonGroup>
            <Button
              label="Schedule upgrades"
              disabled={checkDeleteDisabeled()}
              onClick={() => changeModalStatus('schedule', true)}
              className="mb-2"
            ></Button>
          </ButtonGroup>
        </div>

        <Table responsive striped hover className="table-container">
          <thead>
            <tr>
              <th>
                <Checkbox
                  id="rl-th-cb1"
                  type='checkbox'
                  checked={checkboxlist[0].checked === true}
                  onChange={e => changeCheckbox('all', e.target.checked)}
                />
              </th>
              <th>#</th>
              <th>
                <LinkerWithA
                  label="Organization"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="site"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Product category"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Model name"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Devices"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Details"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Checkbox
                  id="rl-cb1"
                  type='checkbox'
                  checked={checkboxlist[1].checked === true}
                  onChange={e => changeCheckbox('first', e.target.checked)}
                />
              </td>
              <td>1</td>
              <td>nttrd_org</td>
              <td>Taipei </td>
              <td>Access point</td>
              <td>DBA-1210P</td>
              <td>1</td>
              <td><span className='table-not-link' onClick={() => changeModalStatus('view', true)}>View</span></td>
            </tr>
            <tr>
              <td>
                <Checkbox
                  id="rl-cb2"
                  type='checkbox'
                  checked={checkboxlist[2].checked === true}
                  onChange={e => changeCheckbox('second', e.target.checked)}
                />
              </td>
              <td>2</td>
              <td>nttrd_org</td>
              <td>Taipei</td>
              <td>Access point</td>
              <td>DBA-1210P</td>
              <td>2</td>
              <td><span className='table-not-link' onClick={() => changeModalStatus('view', true)}>View</span></td>
            </tr>
            <tr>
              <td>
                <Checkbox
                  id="rl-cb3"
                  checked={checkboxlist[3].checked === true}
                  onChange={e => changeCheckbox('third', e.target.checked)}
                />
              </td>
              <td>3</td>
              <td>nttrd_org</td>
              <td>Taipei</td>
              <td>Access point</td>
              <td>DBS-2000</td>
              <td>2</td>
              <td><span className='table-not-link' onClick={() => changeModalStatus('view', true)}>View</span></td>
            </tr>
          </tbody>
        </Table>

        <PaginationContainer
          total={7}
          onPageChange={currentPageNum =>
            console.log('onPageChange', currentPageNum)
          }
          onEntryLimitChange={currentPageNum =>
            console.log('onEntryLimitChange', currentPageNum)
          }
        />
      </div>
      {/* ScheduleModal modal */}
      <ScheduleModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
      {/* ReleaseNote modal */}
      <ReleaseNoteModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
      {/* device modal */}
      <ViewModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </div>
  )
}

export default ScheduleUpgradesTable;