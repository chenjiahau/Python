import mainStyle from '../../../ssid.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ButtonGroup, Table } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, TimeLine } from 'components/';

// Context
import DataContext from '../../../../../DataContext';

// Dummy data
import { getSchedulePolicyList } from 'dummy/data/schedule-policy';

const ScheduleAvailability = (props) => {
  const {
    modalStatus,
    changeModalStatus
  } = props;

  const ctx = useContext(DataContext);

  // Faker API
  const fakerSchedulePolicyList = getSchedulePolicyList();

  // State
  const [schedulePolicyList, setSchedulePolicyList] = useState();
  const [is24Hours, setIs24Hours] = useState(true);

  // Variable
  const schedulePolicy = schedulePolicyList?.filter(schedulePolicy => schedulePolicy.isActive)[0];

  // Method
  const changeToMinute = (time) => {
    if (time !== '') {
      const hours = parseInt(time.split(':')[0]);
      const minutes = parseInt(time.split(':')[1]);
      const totalMinutes = hours * 60 + minutes;
      const proportion = totalMinutes / 1440 * 100;
      return proportion
    }
    return ''
  }

  const changeSchedulePolicy = (schedulePolicy) => {
    const updatedSchedulePolicyList = cloneDeep(schedulePolicyList);

    for (const item of updatedSchedulePolicyList) {
      item.isActive = (item.id === schedulePolicy.id);
    }

    setSchedulePolicyList(updatedSchedulePolicyList);
  }

  // Side effect
  useEffect(() => {
    const data = cloneDeep(fakerSchedulePolicyList);
    setSchedulePolicyList(data);
    ctx.updateSsidScheduleAvailability(data);
    ctx.updateChangedSsidScheduleAvailability(data);
  }, []);

  useEffect(() => {
    ctx.updateChangedSsidScheduleAvailability(schedulePolicyList);
  }, [schedulePolicyList]);

  return (
    <>
      {
        schedulePolicyList && (
          <>
            <div className="tab-container-border">
              <div className={mainStyle['schedule-top']}>
                <div className={`mb-2 ${mainStyle['schedule-top-left']}`}>
                  <div className={mainStyle['schedule-top-title']}>Schedule policy: </div>
                  <div>
                    <DropdownWithItem
                      id='authentication-server-dropdown'
                      type='normal'
                      isMiddleSize={true}
                      selectedItem={schedulePolicyList.filter(schedulePolicy => schedulePolicy.isActive)[0]}
                      itemList={schedulePolicyList}
                      onClick={schedulePolicy => changeSchedulePolicy(schedulePolicy)}
                    />
                  </div>
                  <div>
                    <Button
                      className="btn-grey-blue"
                      label="Add schedule policy"
                      onClick={() => changeModalStatus(modalStatus.addSchedulePolicy.self, true)}
                    />
                  </div>
                  <div>
                    <Link to="/cloud/configure/schedule-policies" className='text-decoration-underline'>Schedule policy</Link>
                  </div>
                </div>
                <div className={`mb-2 justify-content-end ${mainStyle['schedule-top-right']}`}>
                  <ButtonGroup>
                    <Button
                      label="24 HOURS"
                      className={`${is24Hours && 'light-blue-button'}`}
                      onClick={() => setIs24Hours(true)}
                    />
                    <Button
                      label="AM/PM"
                      className={`${!is24Hours && 'light-blue-button'}`}
                      onClick={() => setIs24Hours(false)}
                    />
                  </ButtonGroup>
                </div>
              </div>

              <div className={mainStyle['schedule-body']}>
                <Table responsive striped hover className="table-container" id="schedule-policy-table">
                  <thead>
                    <tr>
                      <th className="th-not-sorting">Day of week</th>
                      <th className="th-not-sorting">Availability</th>
                      <th className="th-not-sorting">From</th>
                      <th className="th-not-sorting">To</th>
                      <th className="th-not-sorting">Time display</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      schedulePolicy && schedulePolicy.days.map((day, index) => {
                        return (
                          <tr key={index}>
                            <td>{day.title}</td>
                            <td width={100}>{day.availability}</td>
                            <td width={100}>{day.from}</td>
                            <td width={100}>{day.to}</td>
                            <td>
                              <TimeLine
                                labelData={day.timeList}
                                min={changeToMinute(day.from)}
                                max={changeToMinute(day.to)}
                                availability={day.availability}
                              />
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </div>
            </div >
          </>
        )
      }
    </>
  );
}

export default ScheduleAvailability;