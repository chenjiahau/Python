import { Table, ButtonGroup } from 'react-bootstrap';

// Components
import Button from 'components/Button';
import DropdownWithItem from 'components/DropdownWithItem';
import DropdownWithTimeframe from 'components/DropdownWithTimeframe';
import DropdownWithAdvancedSearch from 'components/DropdownWithAdvancedSearch';
import { Icon, InlineTitle, LinkerWithA, PaginationContainer } from 'components/';

const tableList = [
  {
    status: 'online', clientName: '3C:22:FB:20:CD:36', siteName: 'Test', mac: '3C:22:FB:20:CD:36', ipv4: '192.166.22.106', conned: 'DBG-X800', usage: '5.5 GB', rssi: -61, snr: 34
  },
  {
    status: 'offline', clientName: '42:23:9F:11:22:66', siteName: 'HQ', mac: '42:23:9F:11:22:66', ipv4: '192.166.22.102', conned: 'AP02', usage: '250.2 MB', rssi: 11, snr: -22
  },
  {
    status: 'dormant', clientName: '42:23:9F:11:22:77', siteName: 'HQ', mac: '42:23:9F:11:22:77', ipv4: '	192.166.22.106', conned: 'AP02', usage: '0 byte', rssi: -33, snr: -21
  },
  {
    status: 'offline', clientName: 'EA:B3:24:EC:C1:5F', siteName: 'HQ', mac: 'EA:B3:24:EC:C1:5F', ipv4: '10.33.36.119', conned: 'AP02', usage: '3.2 GB', rssi: 22, snr: 60
  }
]

const ClientOverviewTable = ({
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
      <InlineTitle label="CLIENTS OVERVIEW"></InlineTitle>
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
                label="Type"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Client name"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Site"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="MAC address"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="IPv4 address"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Connected to"
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
            <th>
              <LinkerWithA
                label="RSSI"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="SNR"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {tableList.map((item, index) => {
            return (
              <tr key={`network-client${index}`}>
                <td>{1 + index}</td>
                <td>
                  <Icon className={`icon-wireless-${item.status}`} />
                </td>
                <td>{item.clientName}</td>
                <td>{item.siteName}</td>
                <td>{item.mac} </td>
                <td>{item.ipv4}</td>
                <td>{item.conned}</td>
                <td>{item.usage}</td>
                <td>{item.rssi} </td>
                <td> {item.snr}</td>
              </tr>
            )
          })}

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

export default ClientOverviewTable;
