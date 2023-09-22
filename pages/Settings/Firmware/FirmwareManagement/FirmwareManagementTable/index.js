
import { useState, useCallback } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

import LinkerWithA from 'components/LinkerWithA';
import PaginationContainer from 'components/PaginationContainer';


const FirmwareManagementTable = () => {
  const sorting = e => {
    // NEED TO DO : put this into public function.
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  return (
    <div className="layout-container--column layout-container--fluid">
      <div className="mb-5">
        <Table responsive striped hover className="table-container">
          <thead>
            <tr>
              <th>#</th>
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
                  label="Device name"
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
                  label="Device UID"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Firmware availability"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Device current FW version"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Target version"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Upgrade schedule (Site local time)"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Auto-upgrade"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Last upgrade time (Site local time)"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Last upgraded by"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Taipei</td>
              <td>Access point</td>
              <td>DBA-1210P</td>
              <td>AP01</td>
              <td>A4:5E:60:C4:71:13</td>
              <td>TESTQAHQCAD6</td>
              <td>Update available</td>
              <td>1.00</td>
              <td>2.00</td>
              <td>2020/2/25 1:00PM</td>
              <td>Enabled</td>
              <td>2020/2/25 1:00PM</td>
              <td>demo@nuclias.com</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Taipei</td>
              <td>Access point</td>
              <td>DBA-1210P</td>
              <td>AP01</td>
              <td>A4:5E:60:C4:71:13</td>
              <td>TESTQAHQCAD7</td>
              <td>Up-to-date</td>
              <td>2.00</td>
              <td>2.00</td>
              <td>2020/2/25 1:00AM</td>
              <td>Enabled</td>
              <td>2020/2/25 1:00PM</td>
              <td>demo@nuclias.com</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Taipei</td>
              <td>Switch</td>
              <td>DBS-2000</td>
              <td>AP02</td>
              <td>A4:5E:60:C4:71:13</td>
              <td>TESTQAHQCAD8</td>
              <td>Update available	</td>
              <td>1.10.007</td>
              <td>1.20.008</td>
              <td>2020/2/25 1:00AM</td>
              <td>Enabled</td>
              <td>2020/2/25 1:00PM</td>
              <td>demo@nuclias.com</td>
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
    </div>
  )
}

export default FirmwareManagementTable;