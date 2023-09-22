import { Table } from 'react-bootstrap';

// Components
import LinkerWithA from '../../../components/LinkerWithA';

const ChangeLogTable = () => {
  const sorting = e => {
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  return (
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
              label="Time"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Account"
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
              label="Profile"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="SSID"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Page"
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
              label="Label"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Old value"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="New value"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>2023/01/30 13:40:52</td>
          <td>testuserSP_p_m@teamf1.com</td>
          <td>HQ</td>
          <td>Profile_01</td>
          <td></td>
          <td>Port Schedules</td>
          <td></td>
          <td>Port Schedule</td>
          <td>Action: added</td>
          <td>FAE</td>
        </tr>
        <tr>
          <td>2</td>
          <td>2023/01/30 13:40:00</td>
          <td>testuserSP_p_m@teamf1.com</td>
          <td>Songshan</td>
          <td>Profile_01</td>
          <td></td>
          <td>Access policies</td>
          <td></td>
          <td>Guest VLAN</td>
          <td>2</td>
          <td>23/77 tyg</td>
        </tr>
        <tr>
          <td>3</td>
          <td>2023/01/30 12:00:40</td>
          <td>dlink@dlinkcorp.com</td>
          <td>Test</td>
          <td>Profile_01</td>
          <td></td>
          <td>Access policies</td>
          <td></td>
          <td>RADIUS servers</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>4</td>
          <td>2023/01/30 10:48:52</td>
          <td>testuserSP_p_m@teamf1.com</td>
          <td>Daliao</td>
          <td>Profile_b</td>
          <td></td>
          <td>Switch settings</td>
          <td></td>
          <td>MTU</td>
          <td>1500</td>
          <td>1600</td>
        </tr>
        <tr>
          <td>5</td>
          <td>2023/01/30 10:47:29</td>
          <td>dlink@dlinkcorp.com</td>
          <td>Neihu</td>
          <td>Profile_d</td>
          <td></td>
          <td>Switch settings</td>
          <td></td>
          <td>IGMP Snooping</td>
          <td>disabled</td>
          <td>enabled</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ChangeLogTable;
