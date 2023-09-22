import firmwareUpgradesStyle from '../firmware-upgrades.module.css';
import "react-datepicker/dist/react-datepicker.css";

import { forwardRef, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import DatePicker from "react-datepicker";

import { timeFormat } from 'const/nuclias/dateFormat';

// Components
import Button from 'components/Button';
import RadioButton from 'components/RadioButton';
import ModalContainer from 'components/ModalContainer';
import DropdownWithItem from 'components/DropdownWithItem';
import LinkerWithA from 'components/LinkerWithA';
import PaginationContainer from 'components/PaginationContainer';
import Icon from 'components/Icon';


const apList = [
  { title: '1.00', isActive: false },
  { title: '2.00 (Latest)', isActive: true },
];

const switchList = [
  { title: '1.20.008', isActive: false },
  { title: '1.30.001 (Latest)', isActive: true },
];

const dayList = [
  { title: 'SUNDAY', isActive: true },
  { title: 'MONDAY', isActive: false },
  { title: 'TUESDAY', isActive: false },
  { title: 'WEDNESDAY', isActive: false },
  { title: 'THURSDAY', isActive: false },
  { title: 'FRIDAY', isActive: false },
  { title: 'SATURDAY', isActive: false },
];

const timeList = [
  { title: '00:00', isActive: true },
  { title: '01:00', isActive: false },
  { title: '02:00', isActive: false },
  { title: '03:00', isActive: false },
  { title: '04:00', isActive: false },
  { title: '05:00', isActive: false },
  { title: '06:00', isActive: false },
  { title: '07:00', isActive: false },
  { title: '08:00', isActive: false },
  { title: '09:00', isActive: false },
  { title: '10:00', isActive: false },
  { title: '11:00', isActive: false },
  { title: '12:00', isActive: false },
  { title: '13:00', isActive: false },
  { title: '14:00', isActive: false },
  { title: '15:00', isActive: false },
  { title: '16:00', isActive: false },
  { title: '17:00', isActive: false },
  { title: '18:00', isActive: false },
  { title: '19:00', isActive: false },
  { title: '20:00', isActive: false },
  { title: '21:00', isActive: false },
  { title: '22:00', isActive: false },
  { title: '23:00', isActive: false },
];

const ScheduleModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const [addMode, setAddMode] = useState('scheduleAutoUpgradeKey');
  const [pageState, setPageState] = useState('firstPage');
  const [startDate, setStartDate] = useState(new Date());

  const sorting = e => {
    // NEED TO DO : put this into public function.
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  const DatePickerCustomInput = forwardRef(({ value, onClick, onChange }, ref) => (
    <button
      className={`${firmwareUpgradesStyle['custom-input']}`}
      onClick={onClick}
      ref={ref}>
      <div className='d-flex justify-content-start'>
        <div>
          <Icon className={` icon-schedule ${firmwareUpgradesStyle['custom-icon']}`} />
        </div>
        <div className={`${firmwareUpgradesStyle['custom-text']}`}>
          {value}
        </div>
      </div>
    </button>
  ));

  return (
    <ModalContainer
      modalWidthType="modal-750px"
      openModal={modalStatus.schedule.status}
      closeModal={() => changeModalStatus('schedule', false)}
      className={`${pageState === 'firstPage' ? 'd-block' : 'd-none'}`}
    >
      <div className="header">
        <div className={`title ${pageState === 'firstPage' ? 'd-block' : 'd-none'}`} >Schedule firmware change</div>
        <div className={`title ${pageState === 'secondPage' ? 'd-block' : 'd-none'}`} >Bulk edit firmware versions</div>
        <div className={`title ${pageState === 'ResultPage' ? 'd-block' : 'd-none'}`} >Result</div>
      </div>
      <div className={`body ${pageState === 'firstPage' ? 'd-block' : 'd-none'}`}>
        <div className='mb-2'>
          Upgrade times may be staggered depending on the number of devices changing firmware.
        </div>

        {/* schedule auto-upgrade key  */}
        <div className="mt-3">
          <div className="modal-form-title">
            <RadioButton
              id="scheduleAutoUpgradeKey"
              name="scheduleAutoUpgradeKey"
              label="Schedule auto-upgrade for:"
              checked={addMode === 'scheduleAutoUpgradeKey'}
              labelClassName="form-title"
              onChange={() => setAddMode('scheduleAutoUpgradeKey')}
            />
          </div>
        </div>
        {/* schedule auto-upgrade content */}
        <div className="mb-1 ms-4">
          <Row>
            <Col sm={6}>
              <div>
                <DropdownWithItem
                  id="used-unused-dropdown"
                  type="normal"
                  selectedItem={dayList[0]}
                  itemList={dayList}
                  onClick={() => {}}
                />
              </div>
            </Col>
            <Col sm={3}>
              <div>
                <DropdownWithItem
                  id="used-unused-dropdown"
                  type="time"
                  selectedItem={timeList[0]}
                  itemList={timeList}
                  onClick={() => {}}
                  dropDownMenuStyle={{position: 'absolute' , maxHeight:'400px', overflowY:'auto'}}
                />
              </div>
            </Col>
            <Col sm={2}>
              <div>
                (Site local time)
              </div>
            </Col>
          </Row>
        </div>

        {/* Schedule the upgrade key  */}
        <div className="mt-3">
          <div className="modal-form-title">
            <RadioButton
              id="scheduleUpgradeKey"
              name="scheduleUpgradeKey"
              label="Schedule the upgrade for:"
              checked={addMode === 'scheduleUpgradeKey'}
              labelClassName="form-title"
              onChange={() => setAddMode('scheduleUpgradeKey')}
            />
          </div>
        </div>
        {/* schedule the upgrade content */}
        <div className="mb-1 ms-4">
          <Row>
            <Col sm={6}>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat={timeFormat.datePickerTime}
                customInput={<DatePickerCustomInput />}
              />
            </Col>
            <Col sm={3}>
              <div>
                <DropdownWithItem
                  id="used-unused-dropdown"
                  type="time"
                  selectedItem={timeList[0]}
                  itemList={timeList}
                  onClick={() => {}}
                  dropDownMenuStyle={{position: 'absolute' , maxHeight:'400px',overflowY:'auto'}}
                />
              </div>
            </Col>
            <Col sm={2}>
              <div>
                (Site local time)
              </div>
            </Col>
          </Row>
        </div>

        {/* Perform the upgrade now. */}
        {/* <div className="mt-3">
          <div className="modal-form-title">
            <RadioButton
              id="AddDevice"
              name="AddDevice"
              label="Perform the upgrade now."
              checked={addMode === 'importPrivateKey'}
              labelClassName="form-title"
              onChange={() => setAddMode('importPrivateKey')}
            />
          </div>
        </div> */}
      </div>
      <div className={`body ${pageState === 'secondPage' ? '' : 'd-none'}`}>
        <Table striped hover className={`table-container ${firmwareUpgradesStyle['table-container-over']} `}>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <LinkerWithA
                  label="site"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Product category"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Model name"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Current FW version"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Target FW version"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Taipei</td>
              <td>Access point</td>
              <td>DBA-1210P</td>
              <td>2.00</td>
              <td>
                <DropdownWithItem
                  id="used-unused-dropdown"
                  type="normal"
                  selectedItem={apList[1]}
                  itemList={apList}
                  onClick={() => {}}
                />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Taipei</td>
              <td>Access point</td>
              <td>DBA-1210P</td>
              <td>2.00</td>
              <td>
                <DropdownWithItem
                  id="used-unused-dropdown"
                  type="normal"
                  selectedItem={apList[1]}
                  itemList={apList}
                  onClick={() => {}}
                />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>Taipei</td>
              <td>Switch</td>
              <td>DBS-2000</td>
              <td>1.10.007</td>
              <td>
                <DropdownWithItem
                  id="used-unused-dropdown"
                  type="normal"
                  selectedItem={switchList[1]}
                  itemList={switchList}
                  onClick={() => {}}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <div style={{height:'50px'}}>
          <PaginationContainer
            total={7}
            onPageChange={currentPageNum =>
              console.log('onPageChange', currentPageNum)
            }
            onEntryLimitChange={currentPageNum =>
              console.log('onEntryLimitChange', currentPageNum)
            }
          />
        </div>
      </div>
      <div className={`body ${pageState === 'ResultPage' ? 'd-block' : 'd-none'}`}>
        <div className='form-group' style={{justifyContent:'flex-end'}}>
          <Icon
            iconTitle='Download'
            className="icon-download"
            style={{ width: 21, height: 21 }}
          />
        </div>
        <Table responsive striped hover className="table-container">
          <thead>
            <tr>
              <th>#</th>
              <th>
                <LinkerWithA
                  label="Status"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="site"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Product category"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Model name"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Current FW version"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label="Target FW version"
                  className="text-decoration-none"
                  onClick={sorting}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><span className='text-success'>Success</span></td>
              <td>Taipei</td>
              <td>Access point</td>
              <td>DBA-1210P</td>
              <td>2.00</td>
              <td>2.00</td>
            </tr>
            <tr>
              <td>2</td>
              <td><span className='failed-word'>Failed</span></td>
              <td>Taipei</td>
              <td>Access point</td>
              <td>DBA-1210P</td>
              <td>2.00</td>
              <td>2.00</td>
            </tr>
            <tr>
              <td>3</td>
              <td><span className='text-success'>Success</span></td>
              <td>Taipei</td>
              <td>Switch</td>
              <td>DBS-2000</td>
              <td>1.10.007</td>
              <td>1.30.001</td>
            </tr>
          </tbody>
        </Table>
        <div style={{height:'50px'}}>
          <PaginationContainer
            total={7}
            onPageChange={currentPageNum =>
              console.log('onPageChange', currentPageNum)
            }
            onEntryLimitChange={currentPageNum =>
              console.log('onEntryLimitChange', currentPageNum)
            }
          />
        </div>
      </div>
      <div className={`footer footer-relative ${!!(pageState === 'ResultPage') ? "none" : ""}`}>
        <ul className={`dots-box  ${pageState === 'firstPage' ? '' : 'd-none'}`}>
          <li className='dots dots-active'></li>
          <li className='dots'></li>
        </ul>
        <ul className={`dots-box  ${pageState === 'secondPage' ? '' : 'd-none'}`}>
          <li className='dots'></li>
          <li className='dots dots-active'></li>
        </ul>
        <Button
          label="Close"
          className={`btn-cancel  ${pageState === 'firstPage' ? '' : 'd-none'}`}
          onClick={() => {
            console.log('click save');
            changeModalStatus('schedule', false);
          }}
        />
        <Button
          label="Next"
          className={`btn-submit  ${pageState === 'firstPage' ? '' : 'd-none'}`}
          onClick={() => {
            console.log('click save');
            setPageState('secondPage');
          }}
        />
        <Button
          label="Back"
          className={`btn-cancel  ${pageState === 'secondPage' ? 'd-block' : 'd-none'}`}
          onClick={() => {
            console.log('click save');
            setPageState('firstPage');
          }}
        />
        <Button
          label="Schedule changes"
          className={`btn-submit  ${pageState === 'secondPage' ? 'd-block' : 'd-none'}`}
          onClick={() => {
            console.log('click save');
            setPageState('ResultPage');
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default ScheduleModal;
