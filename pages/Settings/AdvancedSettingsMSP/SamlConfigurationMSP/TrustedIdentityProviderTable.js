import { Table } from 'react-bootstrap';

// Components
import Checkbox from '../../../../components/Checkbox';
import LinkerWithA from '../../../../components/LinkerWithA';
import ButtonAction from '../../../../components/ButtonAction';

const TrustedIdentityProviderTable = ({ changeModalStatus }) => {
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
          <th>
            <LinkerWithA
              label="Name"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="URL"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Issuer"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Certificate"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Logout URL"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="X.509 cert SHA1 fingerprint"
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
          <td>IdP1</td>
          <td>https://Bigip-idp/saml/idp/xxx</td>
          <td>https://Bigip-idp/saml/idp/xxx</td>
          <td>FSIDPCertificate.pem</td>
          <td>https://Bigip-idp/saml/idp/xxx</td>
          <td>43:51:43:a1:b5:fc:8b:b7:0a:3a:a9:b1:0f:66:73:a8</td>
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

export default TrustedIdentityProviderTable;
