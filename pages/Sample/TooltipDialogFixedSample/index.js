import { Table } from 'react-bootstrap';
import ReactDOMServer from 'react-dom/server';
import TooltipDialogFixed from 'components/TooltipDialogFixed';

const tmpContent = [
  {
    id: 0,
    status: 'online',
    site: 'AAA',
    totalDevices: 5,
    apCount: 1,
    switchCount: 2,
    gatewayCount: 2,
  },
  {
    id: 1,
    status: 'offline',
    site: 'BBB',
    totalDevices: 10,
    apCount: 1,
    switchCount: 2,
    gatewayCount: 2,
  },
  {
    id: 2,
    status: 'online',
    site: 'CCC',
    totalDevices: 15,
    apCount: 5,
    switchCount: 5,
    gatewayCount: 5,
  },
  {
    id: 3,
    status: 'offline',
    site: 'DDD',
    totalDevices: 20,
    apCount: 10,
    switchCount: 5,
    gatewayCount: 5,
  },
  {
    id: 4,
    status: 'online',
    site: 'EEE',
    totalDevices: 25,
    apCount: 15,
    switchCount: 5,
    gatewayCount: 5,
  },
  {
    id: 5,
    status: 'offline',
    site: 'FFF',
    totalDevices: 25,
    apCount: 10,
    switchCount: 10,
    gatewayCount: 5,
  },
  {
    id: 6,
    status: 'online',
    site: 'GGG',
    totalDevices: 30,
    apCount: 10,
    switchCount: 10,
    gatewayCount: 10,
  },
  {
    id: 7,
    status: 'offline',
    site: 'HHH',
    totalDevices: 35,
    apCount: 15,
    switchCount: 10,
    gatewayCount: 10,
  },
  {
    id: 8,
    status: 'online',
    site: 'III',
    totalDevices: 40,
    apCount: 15,
    switchCount: 15,
    gatewayCount: 10,
  },
  {
    id: 9,
    status: 'offline',
    site: 'JJJ',
    totalDevices: 45,
    apCount: 15,
    switchCount: 15,
    gatewayCount: 15,
  },
  {
    id: 10,
    status: 'online',
    site: 'KKK',
    totalDevices: 50,
    apCount: 20,
    switchCount: 15,
    gatewayCount: 15,
  },
  {
    id: 11,
    status: 'offline',
    site: 'LLL',
    totalDevices: 55,
    apCount: 20,
    switchCount: 20,
    gatewayCount: 15,
  },
  {
    id: 12,
    status: 'online',
    site: 'MMM',
    totalDevices: 60,
    apCount: 20,
    switchCount: 20,
    gatewayCount: 20,
  },
  {
    id: 13,
    status: 'offline',
    site: 'NNN',
    totalDevices: 65,
    apCount: 25,
    switchCount: 20,
    gatewayCount: 20,
  },
  {
    id: 14,
    status: 'online',
    site: '一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四五六七八九十一二三四',
    totalDevices: 70,
    apCount: 25,
    switchCount: 25,
    gatewayCount: 20,
  },
];

const tooltipSampleData = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Status</th>
          <th>Site</th>
          <th>Total devices</th>
          <th>Access Points</th>
          <th>Switches</th>
          <th>Gateways</th>
        </tr>
      </thead>
      <tbody>
        {tmpContent.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.status}</td>
            <td>{item.site}</td>
            <td>{item.totalDevices}</td>
            <td>{item.apCount}</td>
            <td>{item.switchCount}</td>
            <td>{item.gatewayCount}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const TooltipDialogFixedSample = () => {
  return (
    <div className="mb-5">
      <h3>TooltipDialogFixed</h3>
      <p>Custom tooltips can touch content.</p>

      {/* Remember to add class="pb-1". */}
      <TooltipDialogFixed
        // placement="top"
        hideIcon={true}
        tooltipsTitle={'Example 01 (Text)'}
        title={`
          <div class="pb-1">AAA</div>
          <div class="pb-1">BBB</div>
          <div class="pb-1">CCC</div>
          <div class="pb-1">DDD</div>
          <div class="pb-1">EEE</div>
          <div class="pb-1">FFF</div>
          <div class="pb-1">GGG</div>
          <div class="pb-1">HHH</div>
          <div class="pb-1">III</div>
          <div class="pb-1">JJJ</div>
          <div class="pb-1">KKK</div>
          <div class="pb-1">LLL</div>
          <div class="pb-1">MMM</div>
          <div class="pb-1">NNN</div>
          <div class="pb-1">OOO</div>
          <div class="pb-1">PPP</div>
          <div class="pb-1">QQQ</div>
          <div class="pb-1">RRR</div>
          <div class="pb-1">SSS</div>
          <div class="pb-1">TTT</div>
          <div class="pb-1">UUU</div>
          <div class="pb-1">VVV</div>
          <div class="pb-1">WWW</div>
          <div class="pb-1">XXX</div>
          <div class="pb-1">YYY</div>
          <div>ZZZ</div>
        `}
      />
      <br />
      <br />
      <TooltipDialogFixed
        // placement="top"
        hideIcon={true}
        tooltipsTitle={'Example 02 (Table)'}
        title={ReactDOMServer.renderToString(tooltipSampleData())}
      />
    </div>
  );
};

export default TooltipDialogFixedSample;
