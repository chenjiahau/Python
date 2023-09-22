import localAuthenticationStyle from './local-authentication.module.scss';

import { useState } from 'react';
import { Table } from 'react-bootstrap';
import ReactDOMServer from 'react-dom/server';

// Components
import LinkerWithA from 'components/LinkerWithA';
import ButtonAction from 'components/ButtonAction';
import EditableNameBox from 'components/EditableNameBox';
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

const LocalAuthenticationTable = ({ changeModalStatus, setIsSelectedItem }) => {
  const [name, setName] = useState('Test_user_01');
  const [name2, setName2] = useState('Admin_user');
  const [name3, setName3] = useState('guest_test');
  const [originName, setOriginName] = useState('Test_user_01');
  const [originName2, setOriginName2] = useState('Admin_user');
  const [originName3, setOriginName3] = useState('guest_test');

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
              label="Name"
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
              label="Entries"
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
          <td>
            <EditableNameBox
              containerClassName={localAuthenticationStyle['table-editableNameBox']}
              onClickCancelIcon={() => setOriginName(name)}
              inputFieldOnKeyDown={e => setName(e.target.value)}
              inputFieldOnChange={e => setOriginName(e.target.value)}
              value={originName}
            />
          </td>
          <td>Organization</td>
          <td>1</td>
          <td>
            <span
              className="text-decoration-underline table-not-link"
              onClick={() => changeModalStatus('associatedDevices', true)}
            >
              10
            </span>
          </td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('editLocalDb', true);
                setIsSelectedItem({
                  macAclName: originName,
                  accessLevel: 'org',
                  accessLevelName: 'Organization',
                });
              }}
            />
            <ButtonAction
              label="EXPORT"
              title="EXPORT"
              iconClassName="icon-download"
              onClick={() => {
                console.log('click EXPORT');
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
        <tr>
          <td>2</td>
          <td>
            <EditableNameBox
              containerClassName={localAuthenticationStyle['table-editableNameBox']}
              onClickCancelIcon={() => setOriginName2(name2)}
              inputFieldOnKeyDown={e => setName2(e.target.value)}
              inputFieldOnChange={e => setOriginName2(e.target.value)}
              value={originName2}
            />
          </td>
          <td>
            Site (DBA-1510P BASE)
          </td>
          <td>2</td>
          <td>
            <span
              className="text-decoration-underline table-not-link"
              onClick={() => changeModalStatus('associatedDevices', true)}
            >
              10
            </span>
          </td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('editLocalDb', true);
                setIsSelectedItem({
                  macAclName: originName2,
                  accessLevel: 'site',
                  accessLevelName: 'Organization',
                });
              }}
            />
            <ButtonAction
              label="EXPORT"
              title="EXPORT"
              iconClassName="icon-download"
              onClick={() => {
                console.log('click EXPORT');
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
        <tr>
          <td>3</td>
          <td>
            <EditableNameBox
              containerClassName={localAuthenticationStyle['table-editableNameBox']}
              onClickCancelIcon={() => setOriginName3(name3)}
              inputFieldOnKeyDown={e => setName3(e.target.value)}
              inputFieldOnChange={e => setOriginName3(e.target.value)}
              value={originName3}
            />
          </td>
          <td>Site tag (
            <TooltipDialogFixed
              placement="right"
              title={ReactDOMServer.renderToString(accessLevelTooltipContent())}
              hideIcon={true}
              tooltipsTitle={'ggg'}
            />
            )
          </td>
          <td>2</td>
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
                console.log('click edit');
                changeModalStatus('editLocalDb', true);
                setIsSelectedItem({
                  macAclName: originName3,
                  accessLevel: 'siteTag',
                  accessLevelName: 'Kaohsiung',
                });
              }}
            />
            <ButtonAction
              label="EXPORT"
              title="EXPORT"
              iconClassName="icon-download"
              onClick={() => {
                console.log('click EXPORT');
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

export default LocalAuthenticationTable;
