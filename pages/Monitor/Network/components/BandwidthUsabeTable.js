import { Table, ButtonGroup } from 'react-bootstrap';

// Components
import Button from 'components/Button';
import DropdownWithItem from 'components/DropdownWithItem';
import DropdownWithTimeframe from 'components/DropdownWithTimeframe';
import DropdownWithAdvancedSearch from 'components/DropdownWithAdvancedSearch';
import { InlineTitle, LinkerWithA, PaginationContainer } from 'components/';

import BandwidthDeviceModal from '../modal/BandwidthDeviceModal'
import { useState, useCallback } from 'react';
import { cloneDeep } from "lodash"

const defaultModalStatus = {
  bandwidthDevice: {
    self: 'bandwidthDevice',
    status: false,
  },
};

const BandwidthUsabeTable = ({
  dropdownSiteList
}) => {
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  const sorting = e => {
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { ...modalStatus[type], status: value } });
  }, []);

  return (
    <div className="mb-5">
      <InlineTitle label="BANDWIDTH USAGE"></InlineTitle>
      <div className="d-flex justify-content-between mt-4 mb-2">
        <ButtonGroup></ButtonGroup>
        <InlineTitle isNonUnderline >
          <span className="form-title" style={{ paddingTop: '4px', minWidth: 'auto' }}>Time frame : </span>
          <DropdownWithTimeframe
            customHideItem={['customRange']}
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
              <div className="form-title">Site</div>
              <DropdownWithItem
                id="status-dropdown"
                type="normal"
                selectedItem={dropdownSiteList[0]}
                itemList={dropdownSiteList}
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
                label="Site name"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Usage"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td><span
              className="text-decoration-underline table-not-link"
              onClick={() => changeModalStatus('bandwidthDevice', true)}
            >
              Test
            </span></td>
            <td>926.08 MB</td>
          </tr>
          <tr>
            <td>2</td>
            <td><span
              className="text-decoration-underline table-not-link"
              onClick={() => changeModalStatus('bandwidthDevice', true)}
            >
              HQ
            </span></td>
            <td>6.75 GB</td>
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
      <BandwidthDeviceModal {...{ modalStatus, changeModalStatus }} />
    </div>
  );
};

export default BandwidthUsabeTable;
