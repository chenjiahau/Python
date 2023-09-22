import smsConfigurationStyle from './sms-configuration.module.scss';

import { useState } from 'react';
import { Table } from 'react-bootstrap';
import ReactDOMServer from 'react-dom/server';

// Component
import LinkerWithA from '../../../../components/LinkerWithA';
import ButtonAction from '../../../../components/ButtonAction';
import EditableNameBox from '../../../../components/EditableNameBox';
import TooltipDialogFixed from '../../../../components/TooltipDialogFixed';

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

const SmsConfigurationTable = ({ changeModalStatus }) => {
  const [name, setName] = useState('D-Link SMS');
  const [name2, setName2] = useState('BCPDD SMS');
  const [name3, setName3] = useState('SMS-3');
  const [originName, setOriginName] = useState('D-Link SMS');
  const [originName2, setOriginName2] = useState('BCPDD SMS');
  const [originName3, setOriginName3] = useState('SMS-3');

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
              label="Twilio account SID"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="From number"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Resend after"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Maximum resend"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Maximum request"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Denial period"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="OTP expires in"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Allowed phone prefix"
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
              containerClassName={smsConfigurationStyle['table-editableNameBox']}
              onClickCancelIcon={() => setOriginName(name)}
              inputFieldOnKeyDown={e => setName(e.target.value)}
              inputFieldOnChange={e => setOriginName(e.target.value)}
              value={originName}
            />
          </td>
          <td>Organization</td>
          <td>AC57062e3e627aafe37c8957a97fl2eafe</td>
          <td>+866266000123</td>
          <td>2 minutes</td>
          <td>3 times</td>
          <td>3 times</td>
          <td>120 minutes</td>
          <td>10 minutes</td>
          <td>+81,+91,+866</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('editSms', true);
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
              containerClassName={smsConfigurationStyle['table-editableNameBox']}
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
          <td>AC57062e3e627aafe37c8957a97fl2eafe</td>
          <td>+866266000123</td>
          <td>2 minutes</td>
          <td>3 times</td>
          <td>3 times</td>
          <td>120 minutes</td>
          <td>10 minutes</td>
          <td>+866</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('editSms', true);
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
              containerClassName={smsConfigurationStyle['table-editableNameBox']}
              onClickCancelIcon={() => setOriginName3(name3)}
              inputFieldOnKeyDown={e => setName3(e.target.value)}
              inputFieldOnChange={e => setOriginName3(e.target.value)}
              value={originName3}
            />
          </td>
          <td>Site ( Dream Mail )</td>
          <td>AC57062e3e627aafe37c8957a97fl2eafe</td>
          <td>+866266000123</td>
          <td>2 minutes</td>
          <td>3 times</td>
          <td>3 times</td>
          <td>120 minutes</td>
          <td>10 minutes</td>
          <td>*</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('editSms', true);
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

export default SmsConfigurationTable;
