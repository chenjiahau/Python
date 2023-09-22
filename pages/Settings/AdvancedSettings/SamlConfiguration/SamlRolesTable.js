import { Table } from 'react-bootstrap';

// Components
import Checkbox from '../../../../components/Checkbox';
import LinkerWithA from '../../../../components/LinkerWithA';
import ButtonAction from '../../../../components/ButtonAction';
import TooltipDialogFixed from '../../../../components/TooltipDialogFixed';

const SamlRolesTable = ({ changeModalStatus }) => {
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
              label="Role"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Managed site"
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
          <td>nuclias-admin</td>
          <td>Admin</td>
          <td>
            <TooltipDialogFixed
              placement="left"
              tooltipsTitle={'5'}
              title={`
                <div class="pb-1">Daliao</div>
                <div class="pb-1">Dream Mail</div>
                <div class="pb-1">HQ</div>
                <div class="pb-1">Neihu</div>
                <div>Songshan</div>
              `}
              hideIcon={true}
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

export default SamlRolesTable;
