import { useState } from 'react';
import { Table } from 'react-bootstrap';

// Components
import TimeLine from 'components/TimeLine'

const checkAvailability = (invertTime) => {
  const availabilityValue = invertTime ? 'Off' : 'On';
  return availabilityValue
}

const changeMinutes = (time) => {
  if (time !== '') {
    const hours = parseInt(time.split(':')[0]);
    const minutes = parseInt(time.split(':')[1]);
    const totalMinutes = hours * 60 + minutes;
    const proportion = totalMinutes / 1440 * 100;
    return proportion
  }
  return ''
}

const ScheduleHoursTable = ({ scheduleDayDate }) => {
  const [enableMode1, setEnableMode1] = useState(checkAvailability(scheduleDayDate[0].invertTime));
  const [enableMode2, setEnableMode2] = useState(checkAvailability(scheduleDayDate[1].invertTime));
  const [enableMode3, setEnableMode3] = useState(checkAvailability(scheduleDayDate[2].invertTime));
  const [enableMode4, setEnableMode4] = useState(checkAvailability(scheduleDayDate[3].invertTime));
  const [enableMode5, setEnableMode5] = useState(checkAvailability(scheduleDayDate[4].invertTime));
  const [enableMode6, setEnableMode6] = useState(checkAvailability(scheduleDayDate[5].invertTime));
  const [enableMode7, setEnableMode7] = useState(checkAvailability(scheduleDayDate[6].invertTime));

  const [sundayFromTime, setSundayFromTime] = useState(scheduleDayDate[0].startTime);
  const [sundayToTime, setSundayToTime] = useState(scheduleDayDate[0].endTime);
  const [sundayMin, setSundayMin] = useState(changeMinutes(sundayFromTime));
  const [sundayMax, setSundayMax] = useState(changeMinutes(sundayToTime))
  const sundayTimelist = [{ value: sundayMin, label: sundayFromTime }, { value: sundayMax, label: sundayToTime }];

  const [MondayFromTime, setMondayFromTime] = useState(scheduleDayDate[1].startTime);
  const [MondayToTime, setMondayToTime] = useState(scheduleDayDate[1].endTime);
  const [MondayMin, setMondayMin] = useState(changeMinutes(MondayFromTime));
  const [MondayMax, setMondayMax] = useState(changeMinutes(MondayToTime));
  const MondayTimelist = [{ value: MondayMin, label: MondayFromTime }, { value: MondayMax, label: MondayToTime }];

  const [TuesdayFromTime, setTuesdayFromTime] = useState(scheduleDayDate[2].startTime);
  const [TuesdayToTime, setTuesdayToTime] = useState(scheduleDayDate[2].endTime);
  const [TuesdayMin, setTuesdayMin] = useState(changeMinutes(TuesdayFromTime));
  const [TuesdayMax, setTuesdayMax] = useState(changeMinutes(TuesdayToTime));
  const TuesdayTimelist = [{ value: TuesdayMin, label: TuesdayFromTime }, { value: TuesdayMax, label: TuesdayToTime }];

  const [WednesdayFromTime, setWednesdayFromTime] = useState(scheduleDayDate[3].startTime);
  const [WednesdayToTime, setWednesdayToTime] = useState(scheduleDayDate[3].endTime);
  const [WednesdayMin, setWednesdayMin] = useState(changeMinutes(WednesdayFromTime));
  const [WednesdayMax, setWednesdayMax] = useState(changeMinutes(WednesdayToTime));
  const WednesdayTimelist = [{ value: WednesdayMin, label: WednesdayFromTime }, { value: WednesdayMax, label: WednesdayToTime }];

  const [ThursdayFromTime, setThursdayFromTime] = useState(scheduleDayDate[4].startTime);
  const [ThursdayToTime, setThursdayToTime] = useState(scheduleDayDate[4].endTime);
  const [ThursdayMin, setThursdayMin] = useState(changeMinutes(ThursdayFromTime));
  const [ThursdayMax, setThursdayMax] = useState(changeMinutes(ThursdayToTime));
  const ThursdayTimelist = [{ value: ThursdayMin, label: ThursdayFromTime }, { value: ThursdayMax, label: ThursdayToTime }];

  const [FridayFromTime, setFridayFromTime] = useState(scheduleDayDate[5].startTime);
  const [FridayToTime, setFridayToTime] = useState(scheduleDayDate[5].endTime);
  const [FridayMin, setFridayMin] = useState(changeMinutes(FridayFromTime));
  const [FridayMax, setFridayMax] = useState(changeMinutes(FridayToTime));
  const FridayTimelist = [{ value: FridayMin, label: FridayFromTime }, { value: FridayMax, label: FridayToTime }];

  const [SaturdayFromTime, setSaturdayFromTime] = useState(scheduleDayDate[6].startTime);
  const [SaturdayToTime, setSaturdayToTime] = useState(scheduleDayDate[6].endTime);
  const [SaturdayMin, setSaturdayMin] = useState(changeMinutes(SaturdayFromTime));
  const [SaturdayMax, setSaturdayMax] = useState(changeMinutes(SaturdayToTime));
  const SaturdayTimelist = [{ value: SaturdayMin, label: SaturdayFromTime }, { value: SaturdayMax, label: SaturdayToTime }];

  return (
    <Table responsive striped className="table-container mt-2">
      <thead>
        <tr>
          <th>Day of week</th>
          <th style={{ width: '100px' }}>Availability</th>
          <th style={{ width: '100px' }}>From</th>
          <th style={{ width: '100px' }}>To</th>
          <th>Time display</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sunday</td>
          <td>{enableMode1}</td>
          <td>
            {sundayFromTime}
            <span style={{ paddingLeft: 30 }}>-</span>
          </td>
          <td>{sundayToTime}</td>
          <td>
            <div className='ms-2'>
              <TimeLine
                labelData={sundayTimelist}
                min={sundayMin}
                max={sundayMax}
                availability={enableMode1}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>Monday</td>
          <td>{enableMode2}</td>
          <td>
            {MondayFromTime}
            <span style={{ paddingLeft: 30 }}>-</span>
          </td>
          <td>{MondayToTime}</td>
          <td>
            <div className='ms-2'>
              <TimeLine
                labelData={MondayTimelist}
                min={MondayMin}
                max={MondayMax}
                availability={enableMode2}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td>{enableMode3}</td>
          <td>
            {TuesdayFromTime}
            <span style={{ paddingLeft: 30 }}>-</span>
          </td>
          <td>{TuesdayToTime}</td>
          <td>
            <div className='ms-2'>
              <TimeLine
                labelData={TuesdayTimelist}
                min={TuesdayMin}
                max={TuesdayMax}
                availability={enableMode3}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>Wednesday</td>
          <td>{enableMode4}</td>
          <td>
            {WednesdayFromTime}
            <span style={{ paddingLeft: 30 }}>-</span>
          </td>
          <td>{WednesdayToTime}</td>
          <td>
            <div className='ms-2'>
              <TimeLine
                labelData={WednesdayTimelist}
                min={WednesdayMin}
                max={WednesdayMax}
                availability={enableMode4}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>Thursday</td>
          <td>{enableMode5}</td>
          <td>
            {ThursdayFromTime}
            <span style={{ paddingLeft: 30 }}>-</span>
          </td>
          <td>{ThursdayToTime}</td>
          <td>
            <div className='ms-2'>
              <TimeLine
                labelData={ThursdayTimelist}
                min={ThursdayMin}
                max={ThursdayMax}
                availability={enableMode5}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>Friday</td>
          <td>{enableMode5}</td>
          <td>
            {FridayFromTime}
            <span style={{ paddingLeft: 30 }}>-</span>
          </td>
          <td>{FridayToTime}</td>
          <td>
            <div className='ms-2'>
              <TimeLine
                labelData={FridayTimelist}
                min={FridayMin}
                max={FridayMax}
                availability={enableMode6}
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>Saturday</td>
          <td>{enableMode6}</td>
          <td>
            {SaturdayFromTime}
            <span style={{ paddingLeft: 30 }}>-</span>
          </td>
          <td>{SaturdayToTime}</td>
          <td>
            <div className='ms-2'>
              <TimeLine
                labelData={SaturdayTimelist}
                min={SaturdayMin}
                max={SaturdayMax}
                availability={enableMode7}
              />
            </div>
          </td>
        </tr>
      </tbody>
    </Table >
  );
};

export default ScheduleHoursTable;
