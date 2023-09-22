import { Table, ButtonGroup } from 'react-bootstrap';

// Components
import Button from 'components/Button';
import DropdownWithItem from 'components/DropdownWithItem';
import DropdownWithTimeframe from 'components/DropdownWithTimeframe';
import DropdownWithAdvancedSearch from 'components/DropdownWithAdvancedSearch';
import { InlineTitle, LinkerWithA, PaginationContainer } from 'components/';

const DeviceUptimeTable = ({
  dropdownSiteList
}) => {
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
      <InlineTitle label="DEVICE UPTIME AVAILABILITY"></InlineTitle>
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
                label="Device name"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Offline/Uptime"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Availability"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>DBG-X1000-001</td>
            <td>1d 0h 0m 0s / 0s</td>
            <td>80 %</td>
          </tr>
          <tr>
            <td>2</td>
            <td>AP02</td>
            <td>61d 0h 0m 0s / 0s</td>
            <td>40 %</td>
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

export default DeviceUptimeTable;
