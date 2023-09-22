import { Table, ButtonGroup } from 'react-bootstrap';

// Components
import Button from 'components/Button';

import {
  InlineTitle,
  LinkerWithA,
  PaginationContainer,
  DropdownWithCheckbox
} from 'components/';

import { useState, useEffect } from 'react';
import { cloneDeep } from "lodash"

const defaultDeviceList = [
  {
    index: 1,
    parentId: 1,
    name: 'Test',
    checked: true,
    title: 'Test',
    level: 'first',
    list: [
      { title: 'AP01', checked: true, level: 'second', customKey: 'a', parentId: 1 },
    ],
  },
  {
    index: 2,
    parentId: 2,
    name: 'HQ',
    title: 'Site02',
    checked: false,
    level: 'first',
    list: [
      { title: 'AP02', checked: false, level: 'second', customKey: 'b', parentId: 2 },

    ],
  },
  {
    index: 2,
    parentId: 2,
    name: 'Test01',
    title: 'Site02',
    checked: false,
    level: 'first',
    list: [
      { title: 'DBG-X1000-001', checked: false, level: 'second', customKey: 'b', parentId: 2 },

    ],
  },
];

const ChannelOverviewTable = () => {

  const [deviceList, setDeviceList] = useState(cloneDeep(defaultDeviceList))

  const sorting = e => {
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  return (
    <div className="mb-5">
      <InlineTitle label="CHANNEL OVERVIEW"></InlineTitle>
      <div className="d-flex justify-content-between mt-4 mb-2">
        <ButtonGroup></ButtonGroup>
        <InlineTitle isNonUnderline >
          <span className="form-title" style={{ paddingTop: '4px', minWidth: 'auto' }}>Device : </span>
          <div style={{ width: '180px' }}>
            <DropdownWithCheckbox
              allMode={true}
              label='AP01'
              id='category'
              type='checkbox'
              itemList={deviceList}
              dropdownType='three'
              searchButton={true}
              onChangeAll={isToggleAll => {
                const tmpList = cloneDeep(defaultDeviceList);
                tmpList.forEach(tmp => {
                  tmp.checked = isToggleAll;
                  tmp.list.forEach(item => {
                    item.checked = isToggleAll
                  });
                });
                setDeviceList(tmpList);
              }}

              onChangeLevel1={(item, checked) => {
              }}
              // selectedTargetCount={selectedCategoryCount}
              // isTargetToggleAll={isCategoryToggleAll}
              searchOnClick={(e) => console.log('searchOnClick')}
            />
          </div>
          <Button
            label=""
            title="Download as CSV"
            className="icon-download"
            style={{ border: 'none', height: 25, backgroundColor: '#fff' }}
            onClick={() => console.log('Download as CSV')}
          />
        </InlineTitle>
      </div>

      <Table
        responsive
        striped
        hover
        className="table-container table-container--disable-sort"
      >
        <thead>
          <tr>
            <th>#</th>
            <th>
              <LinkerWithA
                label="Device name"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Interference"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Using"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>2</td>
            <td>20</td>
            <td>AP01</td>
          </tr>
          <tr>
            <td>2</td>
            <td>3</td>
            <td>26</td>
            <td>-</td>
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

  );
};

export default ChannelOverviewTable;
