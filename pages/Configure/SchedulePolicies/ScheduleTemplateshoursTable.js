import mainStyle from './schedule-policies.module.scss';

import { useState } from 'react';
import { Table } from 'react-bootstrap';

// Component
import RadioButton from 'components/RadioButton'
import TimePicker from 'components/TimePicker'
import TimeLine from 'components/TimeLine'

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

const ScheduleTemplateshoursTable = ({ changeModalStatus, setIsSelectedItem }) => {
  const [enableMode1, setEnableMode1] = useState('On');
  const [enableMode2, setEnableMode2] = useState('On');
  const [enableMode3, setEnableMode3] = useState('On');
  const [enableMode4, setEnableMode4] = useState('On');
  const [enableMode5, setEnableMode5] = useState('On');
  const [enableMode6, setEnableMode6] = useState('On');
  const [enableMode7, setEnableMode7] = useState('On');

  const [sundayFromTime, setSundayFromTime] = useState('');
  const [sundayToTime, setSundayToTime] = useState('');
  const [sundayMin, setSundayMin] = useState(0);
  const [sundayMax, setSundayMax] = useState(100);
  const sundayTimelist = [{ value: sundayMin, label: sundayFromTime }, { value: sundayMax, label: sundayToTime }];

  const [MondayFromTime, setMondayFromTime] = useState('');
  const [MondayToTime, setMondayToTime] = useState('');
  const [MondayMin, setMondayMin] = useState(0);
  const [MondayMax, setMondayMax] = useState(100);
  const MondayTimelist = [{ value: MondayMin, label: MondayFromTime }, { value: MondayMax, label: MondayToTime }];

  const [TuesdayFromTime, setTuesdayFromTime] = useState('');
  const [TuesdayToTime, setTuesdayToTime] = useState('');
  const [TuesdayMin, setTuesdayMin] = useState(0);
  const [TuesdayMax, setTuesdayMax] = useState(100);
  const TuesdayTimelist = [{ value: TuesdayMin, label: TuesdayFromTime }, { value: TuesdayMax, label: TuesdayToTime }];

  const [WednesdayFromTime, setWednesdayFromTime] = useState('');
  const [WednesdayToTime, setWednesdayToTime] = useState('');
  const [WednesdayMin, setWednesdayMin] = useState(0);
  const [WednesdayMax, setWednesdayMax] = useState(100);
  const WednesdayTimelist = [{ value: WednesdayMin, label: WednesdayFromTime }, { value: WednesdayMax, label: WednesdayToTime }];

  const [ThursdayFromTime, setThursdayFromTime] = useState('');
  const [ThursdayToTime, setThursdayToTime] = useState('');
  const [ThursdayMin, setThursdayMin] = useState(0);
  const [ThursdayMax, setThursdayMax] = useState(100);
  const ThursdayTimelist = [{ value: ThursdayMin, label: ThursdayFromTime }, { value: ThursdayMax, label: ThursdayToTime }];

  const [FridayFromTime, setFridayFromTime] = useState('');
  const [FridayToTime, setFridayToTime] = useState('');
  const [FridayMin, setFridayMin] = useState(0);
  const [FridayMax, setFridayMax] = useState(100);
  const FridayTimelist = [{ value: FridayMin, label: FridayFromTime }, { value: FridayMax, label: FridayToTime }];

  const [SaturdayFromTime, setSaturdayFromTime] = useState('');
  const [SaturdayToTime, setSaturdayToTime] = useState('');
  const [SaturdayMin, setSaturdayMin] = useState(0);
  const [SaturdayMax, setSaturdayMax] = useState(100);
  const SaturdayTimelist = [{ value: SaturdayMin, label: SaturdayFromTime }, { value: SaturdayMax, label: SaturdayToTime }];

  const initSundayFromTime = (time) => {
    setSundayFromTime(time)
    let value = changeMinutes(time)
    setSundayMin(value)
  }

  const initSundayToTime = (time) => {
    setSundayToTime(time)
    let value = changeMinutes(time)
    setSundayMax(value)
  }

  const initMondayFromTime = (time) => {
    setMondayFromTime(time)
    let value = changeMinutes(time)
    setMondayMin(value)
  }

  const initMondayToTime = (time) => {
    setMondayToTime(time)
    let value = changeMinutes(time)
    setMondayMax(value)
  }

  const initTuesdayFromTime = (time) => {
    setTuesdayFromTime(time)
    let value = changeMinutes(time)
    setTuesdayMin(value)
  }

  const initTuesdayToTime = (time) => {
    setTuesdayToTime(time)
    let value = changeMinutes(time)
    setTuesdayMax(value)
  }

  const initWednesdayFromTime = (time) => {
    setWednesdayFromTime(time)
    let value = changeMinutes(time)
    setWednesdayMin(value)
  }

  const initWednesdayToTime = (time) => {
    setWednesdayToTime(time)
    let value = changeMinutes(time)
    setWednesdayMax(value)
  }

  const initThursdayFromTime = (time) => {
    setThursdayFromTime(time)
    let value = changeMinutes(time)
    setThursdayMin(value)
  }

  const initThursdayToTime = (time) => {
    setThursdayToTime(time)
    let value = changeMinutes(time)
    setThursdayMax(value)
  }

  const initFridayFromTime = (time) => {
    setFridayFromTime(time)
    let value = changeMinutes(time)
    setFridayMin(value)
  }

  const initFridayToTime = (time) => {
    setFridayToTime(time)
    let value = changeMinutes(time)
    setFridayMax(value)
  }

  const initSaturdayFromTime = (time) => {
    setSaturdayFromTime(time)
    let value = changeMinutes(time)
    setSaturdayMin(value)
  }
  const initSaturdayToTime = (time) => {
    setSaturdayToTime(time)
    let value = changeMinutes(time)
    setSaturdayMax(value)
  }

  const changeTimePickerValue = (day, type, value) => {
    let proportion = changeMinutes(value)
    if (day === 'sundayTime') {
      if (type === 'From') {
        setSundayFromTime(value)
        setSundayMin(proportion)
      } else {
        setSundayToTime(value)
        setSundayMax(proportion)
      }
    }
    if (day === 'mondayTime') {
      if (type === 'From') {
        setMondayFromTime(value)
        setMondayMin(proportion)
      } else {
        setMondayToTime(value)
        setMondayMax(proportion)
      }
    }

    if (day === 'tuesdayTime') {
      if (type === 'From') {
        setTuesdayFromTime(value)
        setTuesdayMin(proportion)
      } else {
        setTuesdayToTime(value)
        setTuesdayMax(proportion)
      }
    }

    if (day === 'wednesdayTime') {
      if (type === 'From') {
        setWednesdayFromTime(value)
        setWednesdayMin(proportion)
      } else {
        setWednesdayToTime(value)
        setWednesdayMax(proportion)
      }
    }

    if (day === 'thursdayTime') {
      if (type === 'From') {
        setThursdayFromTime(value)
        setThursdayMin(proportion)
      } else {
        setThursdayToTime(value)
        setThursdayMax(proportion)
      }
    }

    if (day === 'fridayTime') {
      if (type === 'From') {
        setFridayFromTime(value)
        setFridayMin(proportion)
      } else {
        setFridayToTime(value)
        setFridayMax(proportion)
      }
    }

    if (day === 'saturdayTime') {
      if (type === 'From') {
        setSaturdayFromTime(value)
        setSaturdayMin(proportion)
      } else {
        setSaturdayToTime(value)
        setSaturdayMax(proportion)
      }
    }

  };

  return (
    <div className="table-responsive" style={{ overflow: 'visible' }}>
      <Table
        striped
        hover
        className="table-container table-container--disable-sort mt-2"
        style={{ overflowY: 'auto' }}
      >
        <thead>
          <tr>
            {/* Day of week */}
            <th>Day of week</th>
            {/* Availability */}
            <th style={{ width: '140px' }}>Availability</th>
            {/* From */}
            <th style={{ width: '180px' }}>From</th>
            {/* - */}
            <th></th>
            {/* To */}
            <th style={{ width: '200px' }}>To</th>
            {/* Time display */}
            <th>Time display</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sunday</td>
            <td>
              <div className='form-field' style={{ display: 'flex' }}>
                <div className="me-3">
                  <RadioButton
                    id="On1"
                    name="On"
                    label="On"
                    checked={enableMode1 === 'On'}
                    onChange={() => setEnableMode1('On')}
                  />
                </div>
                <div>
                  <RadioButton
                    id="Off1"
                    name="Off"
                    label="Off"
                    checked={enableMode1 === 'Off'}
                    onChange={() => setEnableMode1('Off')}
                  />
                </div>
              </div>
            </td>
            <td className={mainStyle['time-picker-td']}>
              <TimePicker
                id="sunday-tp-from"
                type="24hours"
                defaultValue='00:00'
                onInit={initTimeValue => initSundayFromTime(initTimeValue)}
                onChangeTimePickerValue={initTimeValue =>
                  changeTimePickerValue('sundayTime', 'From', initTimeValue)
                }
              />
            </td>
            <td className="ps-1" style={{ width: '10px' }}>-</td>
            <td className={mainStyle['time-picker-td']}>
              <TimePicker
                id="sunday-tp-end"
                type="24hours"
                defaultValue='24:00'
                onInit={initTimeValue => initSundayToTime(initTimeValue)}
                onChangeTimePickerValue={initTimeValue =>
                  changeTimePickerValue('sundayTime', 'To', initTimeValue)
                }
              />
            </td>
            <td>
              <div className={mainStyle['time-line']}>
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
            <td>
              <div className='form-field' style={{ display: 'flex' }}>
                <div className="me-3">
                  <RadioButton
                    id="On2"
                    name="On2"
                    label="On"
                    checked={enableMode2 === 'On'}
                    onChange={() => setEnableMode2('On')}
                  />
                </div>
                <div>
                  <RadioButton
                    id="Off2"
                    name="Off2"
                    label="Off"
                    checked={enableMode2 === 'Off'}
                    onChange={() => setEnableMode2('Off')}
                  />
                </div>
              </div>
            </td>
            <td className={mainStyle['time-picker-td']}>
              <TimePicker
                type="24hours"
                defaultValue='00:00'
                onInit={initTimeValue => initMondayFromTime(initTimeValue)}
                onChangeTimePickerValue={initTimeValue =>
                  changeTimePickerValue('mondayTime', 'From', initTimeValue)
                }
              />
            </td>
            <td className="ps-1" style={{ width: '10px' }}>-</td>
            <td className={mainStyle['time-picker-td']}>
              <TimePicker
                type="24hours"
                defaultValue='24:00'
                onInit={initTimeValue => initMondayToTime(initTimeValue)}
                onChangeTimePickerValue={initTimeValue =>
                  changeTimePickerValue('mondayTime', 'To', initTimeValue)
                }
              />
            </td>
            <td>
              <div className={mainStyle['time-line']}>
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
            <td>
              <div className='form-field' style={{ display: 'flex' }}>
                <div className="me-3">
                  <RadioButton
                    id="On3"
                    name="On3"
                    label="On"
                    checked={enableMode3 === 'On'}
                    onChange={() => setEnableMode3('On')}
                  />
                </div>
                <div>
                  <RadioButton
                    id="Off3"
                    name="Off3"
                    label="Off"
                    checked={enableMode3 === 'Off'}
                    onChange={() => setEnableMode3('Off')}
                  />
                </div>
              </div>
            </td>
            <td className={mainStyle['time-picker-td']}>
              <TimePicker
                type="24hours"
                defaultValue='00:00'
                onInit={initTimeValue => initTuesdayFromTime(initTimeValue)}
                onChangeTimePickerValue={initTimeValue =>
                  changeTimePickerValue('tuesdayTime', 'From', initTimeValue)
                }
              />
            </td>
            <td className="ps-1" style={{ width: '10px' }}>-</td>
            <td className={mainStyle['time-picker-td']}>
              <TimePicker
                type="24hours"
                defaultValue='24:00'
                onInit={initTimeValue => initTuesdayToTime(initTimeValue)}
                onChangeTimePickerValue={initTimeValue =>
                  changeTimePickerValue('tuesdayTime', 'To', initTimeValue)
                }
              />
            </td>
            <td>
              <div className={mainStyle['time-line']}>
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
            <td>
              <div className='form-field' style={{ display: 'flex' }}>
                <div className="me-3">
                  <RadioButton
                    id="On4"
                    name="On4"
                    label="On"
                    checked={enableMode4 === 'On'}
                    onChange={() => setEnableMode4('On')}
                  />
                </div>
                <div>
                  <RadioButton
                    id="Off4"
                    name="Off4"
                    label="Off"
                    checked={enableMode4 === 'Off'}
                    onChange={() => setEnableMode4('Off')}
                  />
                </div>
              </div>
            </td>
            <td className={mainStyle['time-picker-td']}>
              <TimePicker
                type="24hours"
                defaultValue='00:00'
                onInit={initTimeValue => initWednesdayFromTime(initTimeValue)}
                onChangeTimePickerValue={initTimeValue =>
                  changeTimePickerValue('wednesdayTime', 'From', initTimeValue)
                }
              />
            </td>
            <td className="ps-1" style={{ width: '10px' }}>-</td>
            <td className={mainStyle['time-picker-td']}>
              <TimePicker
                type="24hours"
                defaultValue='24:00'
                onInit={initTimeValue => initWednesdayToTime(initTimeValue)}
                onChangeTimePickerValue={initTimeValue =>
                  changeTimePickerValue('wednesdayTime', 'To', initTimeValue)
                }
              />
            </td>
            <td>
              <div className={mainStyle['time-line']}>
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
            <td>
              <div className='form-field' style={{ display: 'flex' }}>
                <div className="me-3">
                  <RadioButton
                    id="On5"
                    name="On5"
                    label="On"
                    checked={enableMode5 === 'On'}
                    onChange={() => setEnableMode5('On')}
                  />
                </div>
                <div>
                  <RadioButton
                    id="Off5"
                    name="Off5"
                    label="Off"
                    checked={enableMode5 === 'Off'}
                    onChange={() => setEnableMode5('Off')}
                  />
                </div>
              </div>
            </td>
            <td className={mainStyle['time-picker-td']}>
              <TimePicker
                type="24hours"
                defaultValue='00:00'
                onInit={initTimeValue => initThursdayFromTime(initTimeValue)}
                onChangeTimePickerValue={initTimeValue =>
                  changeTimePickerValue('thursdayTime', 'From', initTimeValue)
                }
              />
            </td>
            <td className="ps-1" style={{ width: '10px' }}>-</td>
            <td className={mainStyle['time-picker-td']}>
              <TimePicker
                type="24hours"
                defaultValue='24:00'
                onInit={initTimeValue => initThursdayToTime(initTimeValue)}
                onChangeTimePickerValue={initTimeValue =>
                  changeTimePickerValue('thursdayTime', 'To', initTimeValue)
                }
              />
            </td>
            <td>
              <div className={mainStyle['time-line']}>
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
            <td>
              <div className='form-field' style={{ display: 'flex' }}>
                <div className="me-3">
                  <RadioButton
                    id="On6"
                    name="On6"
                    label="On"
                    checked={enableMode6 === 'On'}
                    onChange={() => setEnableMode6('On')}
                  />
                </div>
                <div>
                  <RadioButton
                    id="Off6"
                    name="Off6"
                    label="Off"
                    checked={enableMode6 === 'Off'}
                    onChange={() => setEnableMode6('Off')}
                  />
                </div>
              </div>
            </td>
            <td className={mainStyle['time-picker-td']}>
              <TimePicker
                type="24hours"
                defaultValue='00:00'
                onInit={initTimeValue => initFridayFromTime(initTimeValue)}
                onChangeTimePickerValue={initTimeValue =>
                  changeTimePickerValue('fridayTime', 'From', initTimeValue)
                }
              />
            </td>
            <td className="ps-1" style={{ width: '10px' }}>-</td>
            <td className={mainStyle['time-picker-td']}>
              <TimePicker
                type="24hours"
                defaultValue='24:00'
                onInit={initTimeValue => initFridayToTime(initTimeValue)}
                onChangeTimePickerValue={initTimeValue =>
                  changeTimePickerValue('fridayTime', 'To', initTimeValue)
                }
              />
            </td>
            <td>
              <div className={mainStyle['time-line']}>
                <TimeLine
                  type="24hours"
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
            <td>
              <div className='form-field' style={{ display: 'flex' }}>
                <div className="me-3">
                  <RadioButton
                    id="On7"
                    name="On7"
                    label="On"
                    checked={enableMode7 === 'On'}
                    onChange={() => setEnableMode7('On')}
                  />
                </div>
                <div>
                  <RadioButton
                    id="Off7"
                    name="Off7"
                    label="Off"
                    checked={enableMode7 === 'Off'}
                    onChange={() => setEnableMode7('Off')}
                  />
                </div>
              </div>
            </td>
            <td className={mainStyle['time-picker-td']}>
              <TimePicker
                type="24hours"
                defaultValue='00:00'
                onInit={initTimeValue => initSaturdayFromTime(initTimeValue)}
                onChangeTimePickerValue={initTimeValue =>
                  changeTimePickerValue('saturdayTime', 'From', initTimeValue)
                }
              />
            </td>
            <td className="ps-1" style={{ width: '10px' }}>-</td>
            <td className={mainStyle['time-picker-td']}>
              <TimePicker
                type="24hours"
                defaultValue='24:00'
                onInit={initTimeValue => initSaturdayToTime(initTimeValue)}
                onChangeTimePickerValue={initTimeValue =>
                  changeTimePickerValue('saturdayTime', 'To', initTimeValue)
                }
              />
            </td>
            <td>
              <div className={mainStyle['time-line']}>
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
    </div>
  );
};

export default ScheduleTemplateshoursTable;
