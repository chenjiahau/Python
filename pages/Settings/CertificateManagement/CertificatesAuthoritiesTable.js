import { Table } from 'react-bootstrap';

// Components
import Checkbox from '../../../components/Checkbox';
import ButtonAction from '../../../components/ButtonAction';

const CertificatesAuthoritiesTable = props => {
  const { changeModalStatus } = props;

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
          <th>Access level</th>
          <th>Expires</th>
          <th>Certificates</th>
          <th>Status</th>
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
          <td>Organization</td>
          <td>2024/12/31 17:23:01</td>
          <td>3</td>
          <td>Valid</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="VIEW"
              title="VIEW"
              iconClassName="icon-preview"
              onClick={() => {
                console.log('click view');
                changeModalStatus('view', true);
              }}
            />
            <ButtonAction
              label="UPDATE"
              title="UPDATE"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click update');
                changeModalStatus('update', true);
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
            />
          </td>
          <td>2</td>
          <td>My Company</td>
          <td>Organization</td>
          <td>2024/12/31 17:23:01</td>
          <td>1</td>
          <td>Valid</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="VIEW"
              title="VIEW"
              iconClassName="icon-preview"
              onClick={() => {
                console.log('click view');
                changeModalStatus('view', true);
              }}
            />
            <ButtonAction
              label="UPDATE"
              title="UPDATE"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click update');
                changeModalStatus('update', true);
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
export default CertificatesAuthoritiesTable;
