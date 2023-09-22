import { useState } from 'react';
import { Table } from 'react-bootstrap';

// Components
import TimeLine from 'components/TimeLine'

const checkAvailability = (invertTime) => {
  const availabilityValue = invertTime ? 'Off' : 'On';
  return availabilityValue
}

const changeModalStatus = (time) => {
  const [hours, minutes] = time.split(':');
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  let formattedTime = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  return formattedTime

}
const changeModulationMinutes = (time, type) => {
  if (time !== '') {
    const hours = parseInt(time.split(':')[0]); // get hours
    const minutes = parseInt(time.split(':')[1]); // get minutes
    const arr = time.split(" ");
    const modulation = arr[arr.length - 1].slice(-2); //get AM or PM
    const totalMinutes = modulation === 'AM' ? hours * 60 + minutes : (hours + 12) * 60 + minutes // get totalMinutes
    let proportion = totalMinutes / 1440 * 100; // get time proportion
    if (time === '12:00 AM') {
      if (type === 'From') {
        proportion = 0
      } else {
        proportion = 100
      }
    }
    return proportion
  }
  return ''
}

const ScheduleModulationTable = ({ scheduleDayDate }) => {
  const [enableMode1, setEnableMode1] = useState(checkAvailability(scheduleDayDate[0].invertTime));
  const [enableMode2, setEnableMode2] = useState(checkAvailability(scheduleDayDate[1].invertTime));
  const [enableMode3, setEnableMode3] = useState(checkAvailability(scheduleDayDate[2].invertTime));
  const [enableMode4, setEnableMode4] = useState(checkAvailability(scheduleDayDate[3].invertTime));
  const [enableMode5, setEnableMode5] = useState(checkAvailability(scheduleDayDate[4].invertTime));
  const [enableMode6, setEnableMode6] = useState(checkAvailability(scheduleDayDate[5].invertTime));
  const [enableMode7, setEnableMode7] = useState(checkAvailability(scheduleDayDate[6].invertTime));


  const [sundayFromTime, setSundayFromTime] = useState(changeModalStatus(scheduleDayDate[0].startTime));
  const [sundayToTime, setSundayToTime] = useState(changeModalStatus(scheduleDayDate[0].endTime));
  const [sundayMin, setSundayMin] = useState(changeModulationMinutes(sundayFromTime, 'From'));
  const [sundayMax, setSundayMax] = useState(changeModulationMinutes(sundayToTime, 'To'))
  const sundayTimelist = [{ value: sundayMin, label: sundayFromTime }, { value: sundayMax, label: sundayToTime }
  ];

  const [MondayFromTime, setMondayFromTime] = useState(changeModalStatus(scheduleDayDate[1].startTime));
  const [MondayToTime, setMondayToTime] = useState(changeModalStatus(scheduleDayDate[1].endTime));
  const [MondayMin, setMondayMin] = useState(changeModulationMinutes(MondayFromTime, 'From'));
  const [MondayMax, setMondayMax] = useState(changeModulationMinutes(MondayToTime, 'To'));
  const MondayTimelist = [{ value: MondayMin, label: MondayFromTime }, { value: MondayMax, label: MondayToTime }
  ];

  const [TuesdayFromTime, setTuesdayFromTime] = useState(changeModalStatus(scheduleDayDate[2].startTime));
  const [TuesdayToTime, setTuesdayToTime] = useState(changeModalStatus(scheduleDayDate[2].endTime));
  const [TuesdayMin, setTuesdayMin] = useState(changeModulationMinutes(TuesdayFromTime, 'From'));
  const [TuesdayMax, setTuesdayMax] = useState(changeModulationMinutes(TuesdayToTime, 'To'));
  const TuesdayTimelist = [{ value: TuesdayMin, label: TuesdayFromTime }, { value: TuesdayMax, label: TuesdayToTime }
  ];

  const [WednesdayFromTime, setWednesdayFromTime] = useState(changeModalStatus(scheduleDayDate[3].startTime));
  const [WednesdayToTime, setWednesdayToTime] = useState(changeModalStatus(scheduleDayDate[3].endTime));
  const [WednesdayMin, setWednesdayMin] = useState(changeModulationMinutes(WednesdayFromTime, 'From'));
  const [WednesdayMax, setWednesdayMax] = useState(changeModulationMinutes(WednesdayToTime, 'To'));
  const WednesdayTimelist = [{ value: WednesdayMin, label: WednesdayFromTime }, { value: WednesdayMax, label: WednesdayToTime }
  ];

  const [ThursdayFromTime, setThursdayFromTime] = useState(changeModalStatus(scheduleDayDate[4].startTime));
  const [ThursdayToTime, setThursdayToTime] = useState(changeModalStatus(scheduleDayDate[4].endTime));
  const [ThursdayMin, setThursdayMin] = useState(changeModulationMinutes(ThursdayFromTime, 'From'));
  const [ThursdayMax, setThursdayMax] = useState(changeModulationMinutes(ThursdayToTime, 'To'));
  const ThursdayTimelist = [{ value: ThursdayMin, label: ThursdayFromTime }, { value: ThursdayMax, label: ThursdayToTime }
  ];

  const [FridayFromTime, setFridayFromTime] = useState(changeModalStatus(scheduleDayDate[5].startTime));
  const [FridayToTime, setFridayToTime] = useState(changeModalStatus(scheduleDayDate[5].endTime));
  const [FridayMin, setFridayMin] = useState(changeModulationMinutes(FridayFromTime, 'From'));
  const [FridayMax, setFridayMax] = useState(changeModulationMinutes(FridayToTime, 'To'));
  const FridayTimelist = [{ value: FridayMin, label: FridayFromTime }, { value: FridayMax, label: FridayToTime }
  ];

  const [SaturdayFromTime, setSaturdayFromTime] = useState(changeModalStatus(scheduleDayDate[6].startTime));
  const [SaturdayToTime, setSaturdayToTime] = useState(changeModalStatus(scheduleDayDate[6].endTime));
  const [SaturdayMin, setSaturdayMin] = useState(changeModulationMinutes(SaturdayFromTime, 'From'));
  const [SaturdayMax, setSaturdayMax] = useState(changeModulationMinutes(SaturdayToTime, 'To'));
  const SaturdayTimelist = [{ value: SaturdayMin, label: SaturdayFromTime }, { value: SaturdayMax, label: SaturdayToTime }
  ];

  return (
    <Table responsive striped className="table-container table-container--disable-sort mt-2">
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
            <span style={{ paddingLeft: 20 }}>-</span>
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
            <span style={{ paddingLeft: 20 }}>-</span>
          </td>
          <td>{MondayToTime}</td>
          <td>
            <div className='ms-2'>
              <TimeLine
                defaultValue='12:00 AM'
                type="AM/PM"
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
            <span style={{ paddingLeft: 20 }}>-</span>
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
            <span style={{ paddingLeft: 20 }}>-</span>
          </td>
          <td>{WednesdayFromTime}</td>
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
            <span style={{ paddingLeft: 20 }}>-</span>
          </td>
          <td>{ThursdayFromTime}</td>
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
            <span style={{ paddingLeft: 20 }}>-</span>
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
            <span style={{ paddingLeft: 20 }}>-</span>
          </td>
          <td>{SaturdayToTime} </td>
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
    </Table>
  )
}

export default ScheduleModulationTable;
