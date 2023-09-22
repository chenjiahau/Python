import { Table } from 'react-bootstrap';
import ReactDOMServer from 'react-dom/server';

// Components
import Checkbox from '../../../../components/Checkbox';
import LinkerWithA from '../../../../components/LinkerWithA';
import ButtonAction from '../../../../components/ButtonAction';
import TooltipDialogFixed from '../../../../components/TooltipDialogFixed';

const siteTooltipContent = () => {
  const tableSiteData = [
    {
      id: 0,
      site: 'Japan',
    },
    {
      id: 1,
      site: 'Singapore',
    },
  ];
  return (
    <Table hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Site</th>
        </tr>
      </thead>
      <tbody>
        {tableSiteData.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.site}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const SyslogServerConfigurationTable = ({ changeModalStatus }) => {
  const sorting = e => {
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  return (
    <Table responsive striped hover className="table-container">
      <thead>
        <tr>
          <th>
            <Checkbox
              id="rl-th-cb1"
              onChange={e => console.log(e.target.checked)}
            />
          </th>
          <th>#</th>
          <th>
            <LinkerWithA
              label="Name"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Syslog server"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Syslog server port"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Protocol"
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
          <th className={'table-action-th'}>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Checkbox
              id="rl-cb1"
              onChange={e => console.log(e.target.checked)}
            />
          </td>
          <td>1</td>
          <td>Dlink_syslog_sever_1</td>
          <td>1.33.24.233</td>
          <td>514</td>
          <td>TCP</td>
          <td>
            <TooltipDialogFixed
              placement="right"
              title={ReactDOMServer.renderToString(siteTooltipContent())}
              hideIcon={true}
              tooltipsTitle={'2'}
            />
          </td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('edit', true);
              }}
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                console.log('click delete');
                changeModalStatus('delete', true);
              }}
            />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default SyslogServerConfigurationTable;
