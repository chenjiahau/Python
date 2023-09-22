import ReactDOMServer from 'react-dom/server';
import { Table } from 'react-bootstrap';
import { cloneDeep } from 'lodash';


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


const dayDate = [
  { id: '1', day: "SUNDAY", endTime: "24:00", startTime: "00:00", invertTime: false, enableAllDay: true },
  { id: '2', day: "MONDAY", endTime: "24:00", startTime: "00:00", invertTime: false, enableAllDay: true },
  { id: '3', day: "TUESDAY", endTime: "24:00", startTime: "00:00", invertTime: false, enableAllDay: true },
  { id: '4', day: "WEDNESDAY", endTime: "24:00", startTime: "00:00", invertTime: false, enableAllDay: true },
  { id: '5', day: "THURSDAY", endTime: "24:00", startTime: "00:00", invertTime: false, enableAllDay: true },
  { id: '6', day: "FRIDAY", endTime: "24:00", startTime: "00:00", invertTime: false, enableAllDay: true },
  { id: '7', day: "SATURDAY", endTime: "24:00", startTime: "00:00", invertTime: false, enableAllDay: true }
]




const SchedulePolicyTable = ({ changeModalStatus, setIsSelectedItem, setScheduleName, setScheduleDayDate }) => {
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
              label="Schedule name"
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
              label="Schedule"
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
          <td>Custom policy 1</td>
          <td>Organization</td>
          <td>
            <span
              className="text-decoration-underline table-not-link"
              onClick={() => {
                setScheduleName('yun')
                setScheduleDayDate(cloneDeep(dayDate))
                changeModalStatus('viewSchedulePolicy', true)
              }}
            >
              View
            </span>
          </td>
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
                changeModalStatus('editSchedulePolicy', true);
                setIsSelectedItem({
                  accessLevel: 'org',
                  accessLevelName: 'Kaohsiung',
                });
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
          <td>Custom policy 2</td>
          <td>Organization</td>
          <td>
            <span
              className="text-decoration-underline table-not-link"
              onClick={() => {
                setScheduleName('yun')
                changeModalStatus('viewSchedulePolicy', true)
              }}
            >
              View
            </span>
          </td>
          <td>0</td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('editSchedulePolicy', true);
                setIsSelectedItem({
                  accessLevel: 'org',
                  accessLevelName: 'Kaohsiung',
                });
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
          <td>8 to 5 daily</td>
          <td>Organization</td>
          <td>
            <span
              className="text-decoration-underline table-not-link"
              onClick={() => {
                setScheduleName('yun')
                changeModalStatus('viewSchedulePolicy', true)
              }}
            >
              View
            </span>
          </td>
          <td>0</td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                changeModalStatus('editSchedulePolicy', true);
                setIsSelectedItem({
                  accessLevel: 'org',
                  accessLevelName: 'Kaohsiung',
                });
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
          <td>4</td>
          <td>8 to 5 weekdays only</td>
          <td>Organization</td>
          <td>
            <span
              className="text-decoration-underline table-not-link"
              onClick={() => {
                setScheduleName('yun')
                changeModalStatus('view', true)
              }}
            >
              View
            </span>
          </td>
          <td>0</td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('editSchedulePolicy', true);
                setIsSelectedItem({
                  accessLevel: 'org',
                  accessLevelName: 'Kaohsiung',
                });
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
          <td>5</td>
          <td>Weekdays only</td>
          <td>Organization</td>
          <td>
            <span
              className="text-decoration-underline table-not-link"
              onClick={() => {
                setScheduleName('yun')
                changeModalStatus('view', true)
              }}
            >
              View
            </span>
          </td>
          <td>0</td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('editSchedulePolicy', true);
                setIsSelectedItem({
                  accessLevel: 'org',
                  accessLevelName: 'Kaohsiung',
                });
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
          <td>6</td>
          <td>Always on</td>
          <td>Site (HQ)</td>
          <td>
            <span
              className="text-decoration-underline table-not-link"
              onClick={() => {
                setScheduleName('yun')
                changeModalStatus('view', true)
              }}
            >
              View
            </span>
          </td>
          <td>0</td>
          <td>0</td>
          <td className={'table-action-td'}>
            <ButtonAction
              label="EDIT"
              title="EDIT"
              iconClassName="icon-edit"
              onClick={() => {
                console.log('click edit');
                changeModalStatus('editSchedulePolicy', true);
                setIsSelectedItem({
                  accessLevel: 'site',
                  accessLevelName: 'HQ',
                });
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

export default SchedulePolicyTable;
