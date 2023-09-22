import authenticationServersStyle from './authentication-servers.module.scss';

import { useState } from 'react';
import { Table } from 'react-bootstrap';
import ReactDOMServer from 'react-dom/server';

// Components
import LinkerWithA from 'components/LinkerWithA';
import ButtonAction from 'components/ButtonAction';
import TooltipDialogFixed from 'components/TooltipDialogFixed';

const accessLevelTooltipContent = () => {
  const tableAccessLevelData = [
    {
      id: 0,
      site: 'Zouying',
    },
    {
      id: 1,
      site: 'Daliao',
    },
    {
      id: 2,
      site: 'Dream Mail',
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
        {tableAccessLevelData.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.site}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const AuthenticationTable = ({ changeModalStatus, setIsSelectedItem }) => {
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
              label="Server name"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Type"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Access level"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="IP address"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Port"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Encryption"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Associated devices"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Associated profiles"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th className={'table-action-th'}>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Org Radius</td>
          <td>RADIUS</td>
          <td>Organization</td>
          <td>10.90.90.90</td>
          <td>1812</td>
          <td>-</td>
          <td>
            <span
              className="text-decoration-underline table-not-link"
              onClick={() => changeModalStatus('associatedDevices', true)}
            >
              10
            </span>
          </td>
          <td>
            <span
              className="text-decoration-underline table-not-link"
              onClick={() => changeModalStatus('associatedProfiles', true)}
            >
              3
            </span>
          </td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                setIsSelectedItem({
                  accessLevel: 'org'
                });
                changeModalStatus('editRadius', true);
              }}
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                changeModalStatus('delete', true);
              }}
            />
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>Org LDAP</td>
          <td>LDAP</td>
          <td>Organization</td>
          <td>10.90.90.90</td>
          <td>389</td>
          <td>SSL</td>
          <td>0</td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('editLdap', true);
              }}
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                changeModalStatus('delete', true);
              }}
            />
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>Org POP3</td>
          <td>POP3</td>
          <td>Organization</td>
          <td>10.90.90.90</td>
          <td>110</td>
          <td>Disable</td>
          <td>0</td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                setIsSelectedItem({
                  accessLevel: 'org'
                });
                changeModalStatus('editPop3', true);
              }}
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                changeModalStatus('delete', true);
              }}
            />
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>Org Active Directory</td>
          <td>Active Directory</td>
          <td>Organization</td>
          <td>10.90.90.90</td>
          <td>123</td>
          <td>-</td>
          <td>0</td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                setIsSelectedItem({
                  accessLevel: 'org'
                });
                changeModalStatus('editActiveDirectory', true);
              }}
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                changeModalStatus('delete', true);
              }}
            />
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td>Org NT Domain</td>
          <td>NT Domain</td>
          <td>Organization</td>
          <td>10.90.90.90</td>
          <td>-</td>
          <td>-</td>
          <td>0</td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                setIsSelectedItem({
                  accessLevel: 'org'
                });
                changeModalStatus('editNtDomain', true);
              }}
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                changeModalStatus('delete', true);
              }}
            />
          </td>
        </tr>
        <tr>
          <td>6</td>
          <td>Site RADIUS</td>
          <td>RADIUS</td>
          <td>Site (HQ)</td>
          <td>10.90.90.90</td>
          <td>1812</td>
          <td>-</td>
          <td>0</td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                setIsSelectedItem({
                  accessLevel: 'site',
                  accessLevelName: 'HQ',
                });
                changeModalStatus('editRadius', true);
              }}
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                changeModalStatus('delete', true);
              }}
            />
          </td>
        </tr>
        <tr>
          <td>7</td>
          <td>Tag RADIUS</td>
          <td>RADIUS</td>
          <td>Site tag (
            <TooltipDialogFixed
              placement="right"
              title={ReactDOMServer.renderToString(accessLevelTooltipContent())}
              hideIcon={true}
              tooltipsTitle={'Kaohsiung'}
            />
            )
          </td>
          <td>10.90.90.90</td>
          <td>1812</td>
          <td>-</td>
          <td>0</td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                setIsSelectedItem({
                  accessLevel: 'siteTag',
                  accessLevelName: 'Kaohsiung',
                });
                changeModalStatus('editRadius', true);
              }}
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                changeModalStatus('delete', true);
              }}
            />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default AuthenticationTable;
