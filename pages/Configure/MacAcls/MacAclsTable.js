import macAclsStyle from './mac-acls.module.scss';

import { useState } from 'react';
import { Table } from 'react-bootstrap';
import ReactDOMServer from 'react-dom/server';

// Components
import LinkerWithA from '../../../components/LinkerWithA';
import ButtonAction from '../../../components/ButtonAction';
import EditableNameBox from '../../../components/EditableNameBox';
import TooltipDialogFixed from '../../../components/TooltipDialogFixed';

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

const MacAclsTable = ({ changeModalStatus, setIsSelectedItem }) => {
  const [name, setName] = useState('MAC ACL-1');
  const [name2, setName2] = useState('MAC ACL-2');
  const [name3, setName3] = useState('MAC ACL-3');
  const [name4, setName4] = useState('MAC ACL-4');
  const [name5, setName5] = useState('MAC ACL-5');
  const [originName, setOriginName] = useState('MAC ACL-1');
  const [originName2, setOriginName2] = useState('MAC ACL-2');
  const [originName3, setOriginName3] = useState('MAC ACL-3');
  const [originName4, setOriginName4] = useState('MAC ACL-4');
  const [originName5, setOriginName5] = useState('MAC ACL-5');

  const sorting = e => {
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  return (
    <Table responsive striped hover className="table-container table-container--disable-sort">
      <thead>
        <tr>
          <th>#</th>
          <th>
            <LinkerWithA label="Name" className="text-decoration-none" onClick={sorting} />
          </th>
          <th>
            <LinkerWithA label="Access level" className="text-decoration-none" onClick={sorting} />
          </th>
          <th>
            <LinkerWithA label="Enties" className="text-decoration-none" onClick={sorting} />
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
              containerClassName={macAclsStyle['table-editableNameBox']}
              onClickCancelIcon={() => setOriginName(name)}
              inputFieldOnKeyDown={e => setName(e.target.value)}
              inputFieldOnChange={e => setOriginName(e.target.value)}
              value={originName}
            />
          </td>
          <td>Organization</td>
          <td>2</td>
          <td>
            <span
              className="text-decoration-underline table-not-link"
              onClick={() => changeModalStatus('associatedDevices', true)}
            >
              1
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
                changeModalStatus('editMacAcl', true);
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
              onClick={() => console.log('click export')}
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                console.log('click delete');
                changeModalStatus('delete', true);
                setIsSelectedItem({
                  macAclName: originName,
                  accessLevel: 'org',
                  accessLevelName: 'Organization',
                });
              }}
            />
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <EditableNameBox
              containerClassName={macAclsStyle['table-editableNameBox']}
              onClickCancelIcon={() => setOriginName2(name2)}
              inputFieldOnKeyDown={e => setName2(e.target.value)}
              inputFieldOnChange={e => setOriginName2(e.target.value)}
              value={originName2}
            />
          </td>
          <td>
            Site tag (
            <TooltipDialogFixed
              placement="right"
              title={ReactDOMServer.renderToString(accessLevelTooltipContent())}
              hideIcon={true}
              tooltipsTitle={'Kaohsiung'}
            />
            )
          </td>
          <td>2</td>
          <td>0</td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('editMacAcl', true);
                setIsSelectedItem({
                  macAclName: originName2,
                  accessLevel: 'siteTag',
                  accessLevelName: 'Kaohsiung',
                });
              }}
            />
            <ButtonAction
              label="EXPORT"
              title="EXPORT"
              iconClassName="icon-download"
              onClick={() => console.log('click export')}
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                console.log('click delete');
                changeModalStatus('delete', true);
                setIsSelectedItem({
                  macAclName: originName2,
                  accessLevel: 'siteTag',
                  accessLevelName: 'Kaohsiung',
                });
              }}
            />
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            <EditableNameBox
              containerClassName={macAclsStyle['table-editableNameBox']}
              onClickCancelIcon={() => setOriginName3(name3)}
              inputFieldOnKeyDown={e => setName3(e.target.value)}
              inputFieldOnChange={e => setOriginName3(e.target.value)}
              value={originName3}
            />
          </td>
          <td>Organization</td>
          <td>2</td>
          <td>0</td>
          <td>
            <span
              className="text-decoration-underline table-not-link"
              onClick={() => changeModalStatus('associatedProfiles', true)}
            >
              1
            </span>
          </td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('editMacAcl', true);
                setIsSelectedItem({
                  macAclName: originName3,
                  accessLevel: 'org',
                  accessLevelName: 'Organization',
                });
              }}
            />
            <ButtonAction
              label="EXPORT"
              title="EXPORT"
              iconClassName="icon-download"
              onClick={() => console.log('click export')}
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                console.log('click delete');
                changeModalStatus('delete', true);
                setIsSelectedItem({
                  macAclName: originName3,
                  accessLevel: 'org',
                  accessLevelName: 'Organization',
                });
              }}
            />
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>
            <EditableNameBox
              containerClassName={macAclsStyle['table-editableNameBox']}
              onClickCancelIcon={() => setOriginName4(name4)}
              inputFieldOnKeyDown={e => setName4(e.target.value)}
              inputFieldOnChange={e => setOriginName4(e.target.value)}
              value={originName4}
            />
          </td>
          <td>Site ( Dream Mail )</td>
          <td>2</td>
          <td>0</td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('editMacAcl', true);
                setIsSelectedItem({
                  macAclName: originName4,
                  accessLevel: 'site',
                  accessLevelName: 'Dream Mail',
                });
              }}
            />
            <ButtonAction
              label="EXPORT"
              title="EXPORT"
              iconClassName="icon-download"
              onClick={() => console.log('click export')}
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                console.log('click delete');
                changeModalStatus('delete', true);
                setIsSelectedItem({
                  macAclName: originName4,
                  accessLevel: 'site',
                  accessLevelName: 'Dream Mail',
                });
              }}
            />
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td>
            <EditableNameBox
              containerClassName={macAclsStyle['table-editableNameBox']}
              onClickCancelIcon={() => setOriginName5(name5)}
              inputFieldOnKeyDown={e => setName5(e.target.value)}
              inputFieldOnChange={e => setOriginName5(e.target.value)}
              value={originName5}
            />
          </td>
          <td>Site ( HQ )</td>
          <td>2</td>
          <td>0</td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('editMacAcl', true);
                setIsSelectedItem({
                  macAclName: originName5,
                  accessLevel: 'site',
                  accessLevelName: 'HQ',
                });
              }}
            />
            <ButtonAction
              label="EXPORT"
              title="EXPORT"
              iconClassName="icon-download"
              onClick={() => console.log('click export')}
            />
            <ButtonAction
              label="DELETE"
              title="DELETE"
              iconClassName="icon-trash"
              onClick={() => {
                console.log('click delete');
                changeModalStatus('delete', true);
                setIsSelectedItem({
                  macAclName: originName5,
                  accessLevel: 'site',
                  accessLevelName: 'HQ',
                });
              }}
            />
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default MacAclsTable;
