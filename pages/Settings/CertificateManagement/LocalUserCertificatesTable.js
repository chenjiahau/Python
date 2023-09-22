import { Table } from 'react-bootstrap';
import ReactDOMServer from 'react-dom/server';

// Components
import Checkbox from '../../../components/Checkbox';
import TooltipDialogFixed from '../../../components/TooltipDialogFixed';

const usedByTooltipContent1 = () => {
  const tableUsedByData = [
    {
      id: 0,
      deviceName: 'Gateway 001',
      certificateAuthority: 'organizationUID.nuclias.com',
      status: 'Pending',
    },
    {
      id: 1,
      deviceName: 'Gateway 002',
      certificateAuthority: 'openvpn.company.com',
      status: 'Pending',
    },
  ];
  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Device name</th>
          <th>Certificate authority</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tableUsedByData.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.deviceName}</td>
            <td>{item.certificateAuthority}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
const usedByTooltipContent2 = () => {
  const tableUsedByData = [
    {
      id: 0,
      deviceName: 'Gateway 001',
      certificateAuthority: 'organizationUID.nuclias.com',
      status: 'Valid',
    },
    {
      id: 1,
      deviceName: 'Gateway 002',
      certificateAuthority: 'openvpn.company.com',
      status: 'Valid',
    },
  ];
  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Device name</th>
          <th>Certificate authority</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tableUsedByData.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.deviceName}</td>
            <td>{item.certificateAuthority}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
const usedByTooltipContent3 = () => {
  const tableUsedByData = [
    {
      id: 0,
      deviceName: 'Gateway 001',
      certificateAuthority: 'organizationUID.nuclias.com',
      status: 'Invalid',
    },
    {
      id: 1,
      deviceName: 'Gateway 002',
      certificateAuthority: 'openvpn.company.com',
      status: 'Invalid',
    },
  ];
  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Device name</th>
          <th>Certificate authority</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tableUsedByData.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.deviceName}</td>
            <td>{item.certificateAuthority}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
const usedByTooltipContent4 = () => {
  const tableUsedByData = [
    {
      id: 0,
      deviceName: 'Gateway 001',
      certificateAuthority: 'organizationUID.nuclias.com',
      status: 'Valid',
    },
    {
      id: 1,
      deviceName: 'Gateway 002',
      certificateAuthority: 'openvpn.company.com',
      status: 'Invalid',
    },
  ];
  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Device name</th>
          <th>Certificate authority</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {tableUsedByData.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.deviceName}</td>
            <td>{item.certificateAuthority}</td>
            <td>{item.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const LocalUserCertificatesTable = () => {
  return (
    <Table
      responsive
      striped
      hover
      className="table-container table-container--disable-sort"
    >
      <thead>
        <tr>
          <th>
            <Checkbox
              id="rl-th-cb1"
              onChange={e => console.log(e.target.checked)}
            />
          </th>
          <th>#</th>
          <th>Username</th>
          <th>Local authentication pool name</th>
          <th>Status</th>
          <th>Used by</th>
          <th>Import at</th>
          <th>Update at</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Checkbox
              id="rl-cb1"
              onChange={e => console.log(e.target.checked)}
              disabled
            />
          </td>
          <td>1</td>
          <td>Charlie</td>
          <td>Nuclias</td>
          <td>Pending</td>
          <td>
            OpenVPN (
            <TooltipDialogFixed
              placement="top"
              title={ReactDOMServer.renderToString(usedByTooltipContent1())}
              hideIcon={true}
              tooltipsTitle={'2'}
            />
            )
          </td>
          <td>2022/12/30 10:25:13</td>
          <td>2022/12/30 10:25:13</td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb2"
              onChange={e => console.log(e.target.checked)}
            />
          </td>
          <td>2</td>
          <td>Patty</td>
          <td>Nuclias</td>
          <td>Invalid</td>
          <td>
            OpenVPN (
            <TooltipDialogFixed
              placement="top"
              title={ReactDOMServer.renderToString(usedByTooltipContent2())}
              hideIcon={true}
              tooltipsTitle={'2'}
            />
            )
          </td>
          <td>2023/04/01 12:23:01</td>
          <td>2023/04/01 12:23:01</td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb3"
              onChange={e => console.log(e.target.checked)}
            />
          </td>
          <td>3</td>
          <td>Beethoven</td>
          <td>D-Link</td>
          <td>Invalid</td>
          <td>
            OpenVPN (
            <TooltipDialogFixed
              placement="top"
              title={ReactDOMServer.renderToString(usedByTooltipContent3())}
              hideIcon={true}
              tooltipsTitle={'2'}
            />
            )
          </td>
          <td>2023/01/18 15:17:01</td>
          <td>2023/01/18 15:17:01</td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb4"
              onChange={e => console.log(e.target.checked)}
            />
          </td>
          <td>4</td>
          <td>Tommy</td>
          <td>D-Link</td>
          <td>Valid</td>
          <td>
            OpenVPN (
            <TooltipDialogFixed
              placement="top"
              title={ReactDOMServer.renderToString(usedByTooltipContent4())}
              hideIcon={true}
              tooltipsTitle={'2'}
            />
            )
          </td>
          <td>2023/01/18 15:17:01</td>
          <td>2023/01/18 15:17:01</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default LocalUserCertificatesTable;
