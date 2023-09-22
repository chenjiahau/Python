import { Table } from 'react-bootstrap';

// Components
import Checkbox from '../../../components/Checkbox';
import ButtonAction from '../../../components/ButtonAction';

const CertificatesAndKeysTable = props => {
  const { changeModalStatus, getName, getType } = props;

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
          <th>Name</th>
          <th>Contents</th>
          <th>Access level</th>
          <th>Alternative name</th>
          <th>Issuer (Authority)</th>
          <th>Expires</th>
          <th>Used by</th>
          <th>Status</th>
          <th>Renewal schedule</th>
          <th className={'table-action-th'}>Actions</th>
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
          <td>Default</td>
          <td>Certificate(s) and Private key</td>
          <td>Organization</td>
          <td>-</td>
          <td>D-Link</td>
          <td>2023/12/31 23:59:59</td>
          <td>OoenVPN(3), LDAP(1)</td>
          <td>Valid</td>
          <td>2022/09/15 00:00:00(Auto)</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="VIEW"
              title="VIEW"
              iconClassName="icon-preview"
              onClick={() => {
                console.log('click view');
                changeModalStatus('view', true);
                getName('Default');
                getType(); // CERT & KEY
              }}
            />
            <ButtonAction
              label="UPDATE"
              title="UPDATE"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click update');
                changeModalStatus('update', true);
                getName('Default');
                getType(); // CERT & KEY
              }}
              disabled
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                console.log('click delete');
                changeModalStatus('delete', true);
              }}
              disabled
            />
            <ButtonAction
              label="DOWNLOAD"
              title="DOWNLOAD"
              iconClassName="icon-download"
              onClick={() => console.log('click download')}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb2"
              onChange={e => console.log(e.target.checked)}
              disabled
            />
          </td>
          <td>2</td>
          <td>Default</td>
          <td>Private Key</td>
          <td>Organization</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>Valid</td>
          <td>-</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="VIEW"
              title="VIEW"
              iconClassName="icon-preview"
              onClick={() => {
                console.log('click view');
                changeModalStatus('view', true);
                getName('Default');
                getType('KEY');
              }}
            />
            <ButtonAction
              label="UPDATE"
              title="UPDATE"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click update');
                changeModalStatus('update', true);
                getName('Default');
                getType('KEY');
              }}
              disabled
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                console.log('click delete');
                changeModalStatus('delete', true);
              }}
              disabled
            />
            <ButtonAction
              label="DOWNLOAD"
              title="DOWNLOAD"
              iconClassName="icon-download"
              onClick={() => console.log('click download')}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb3"
              onChange={e => console.log(e.target.checked)}
              disabled
            />
          </td>
          <td>3</td>
          <td>myvpn.store.com</td>
          <td>Certificate(s)</td>
          <td>Site tag (Taiwan)</td>
          <td>-</td>
          <td>Nuclias</td>
          <td>2023/12/31 23:59:59</td>
          <td>-</td>
          <td>Pending</td>
          <td>-</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="VIEW"
              title="VIEW"
              iconClassName="icon-preview"
              onClick={() => {
                console.log('click view');
                changeModalStatus('view', true);
                getName('myvpn.store.com');
                getType('CERT');
              }}
              disabled
            />
            <ButtonAction
              label="UPDATE"
              title="UPDATE"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click update');
                changeModalStatus('update', true);
                getName('myvpn.store.com');
                getType('CERT');
              }}
              disabled
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                console.log('click delete');
                changeModalStatus('delete', true);
              }}
              disabled
            />
            <ButtonAction
              label="DOWNLOAD"
              title="DOWNLOAD"
              iconClassName="icon-download"
              onClick={() => console.log('click download')}
              disabled
            />
          </td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb4"
              onChange={e => console.log(e.target.checked)}
              disabled
            />
          </td>
          <td>4</td>
          <td>openvpn.company.com</td>
          <td>Certificate(s) and Private key</td>
          <td>Organization</td>
          <td>-</td>
          <td>GlobalSign</td>
          <td>2023/12/31 23:59:59</td>
          <td>OpenVPN(3), LDAP(1)</td>
          <td>Valid</td>
          <td>-</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="VIEW"
              title="VIEW"
              iconClassName="icon-preview"
              onClick={() => {
                console.log('click view');
                changeModalStatus('view', true);
                getName('openvpn.company.com');
                getType(); // CERT & KEY
              }}
            />
            <ButtonAction
              label="UPDATE"
              title="UPDATE"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click update');
                changeModalStatus('update', true);
                getName('openvpn.company.com');
                getType(); // CERT & KEY
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
              disabled
            />
            <ButtonAction
              label="DOWNLOAD"
              title="DOWNLOAD"
              iconClassName="icon-download"
              onClick={() => console.log('click download')}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb5"
              onChange={e => console.log(e.target.checked)}
            />
          </td>
          <td>5</td>
          <td>DLINK-CLIENT2</td>
          <td>Certificate(s)</td>
          <td>Organization</td>
          <td>-</td>
          <td>DLINK-CA</td>
          <td>2020/07/19 12:06:25</td>
          <td>-</td>
          <td>Expired</td>
          <td>-</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="VIEW"
              title="VIEW"
              iconClassName="icon-preview"
              onClick={() => {
                console.log('click view');
                changeModalStatus('view', true);
                getName('DLINK-CLIENT2');
                getType('CERT');
              }}
            />
            <ButtonAction
              label="UPDATE"
              title="UPDATE"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click update');
                changeModalStatus('update', true);
                getName('DLINK-CLIENT2');
                getType('CERT');
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
            <ButtonAction
              label="DOWNLOAD"
              title="DOWNLOAD"
              iconClassName="icon-download"
              onClick={() => console.log('click download')}
              disabled
            />
          </td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb6"
              onChange={e => console.log(e.target.checked)}
            />
          </td>
          <td>6</td>
          <td>privatekey</td>
          <td>Private Key</td>
          <td>Organization</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>Valid</td>
          <td>-</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="VIEW"
              title="VIEW"
              iconClassName="icon-preview"
              onClick={() => {
                console.log('click view');
                changeModalStatus('view', true);
                getName('privatekey');
                getType('KEY');
              }}
            />
            <ButtonAction
              label="UPDATE"
              title="UPDATE"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click update');
                changeModalStatus('update', true);
                getName('privatekey');
                getType('KEY');
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
            <ButtonAction
              label="DOWNLOAD"
              title="DOWNLOAD"
              iconClassName="icon-download"
              onClick={() => console.log('click download')}
            />
          </td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb7"
              onChange={e => console.log(e.target.checked)}
            />
          </td>
          <td>7</td>
          <td>My OpenVPN Server</td>
          <td>Certificate(s) and Private key</td>
          <td>Organization</td>
          <td>-</td>
          <td>-</td>
          <td>2023/12/31 23:59:59</td>
          <td>OpenVPN</td>
          <td>Valid</td>
          <td>-</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="VIEW"
              title="VIEW"
              iconClassName="icon-preview"
              onClick={() => {
                console.log('click view');
                changeModalStatus('view', true);
                getName('My OpenVPN Server');
                getType();
              }}
            />
            <ButtonAction
              label="UPDATE"
              title="UPDATE"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click update');
                changeModalStatus('update', true);
                getName('My OpenVPN Server');
                getType();
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
            <ButtonAction
              label="DOWNLOAD"
              title="DOWNLOAD"
              iconClassName="icon-download"
              onClick={() => console.log('click download')}
            />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CertificatesAndKeysTable;
