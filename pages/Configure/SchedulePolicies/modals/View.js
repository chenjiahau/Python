import { Row, Col, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useState, useCallback, useEffect } from 'react';

import ScheduleHoursTable from '../ScheduleHoursTable';
import ScheduleModulationTable from '../ScheduleModulationTable.js'

// Components
import Button from 'components/Button';
import ModalContainer from 'components/ModalContainer';

const defaultTabList = [
  { id: 1, label: '24 HOURS', isActive: true },
  { id: 2, label: 'AM/PM', isActive: false },
];

const ViewModal = props => {
  const { t } = useTranslation();

  const [is24Hours, setIs24Hours] = useState(true);
  const { modalStatus, changeModalStatus, scheduleName, setScheduleDayDate, scheduleDayDate } = props;
  const [tabList, setTabList] = useState([...defaultTabList]);

  const changeTab = useCallback(selectedTab => {
    const newTabList = [...tabList];
    const index = newTabList.findIndex(tab => tab.id === selectedTab.id);

    newTabList.map(tab => (tab.isActive = false));
    newTabList[index].isActive = true;
    setTabList(newTabList);
  }, []);


  useEffect(() => {
    if (scheduleDayDate) {
      setScheduleDayDate(scheduleDayDate)
    }
  }, [scheduleDayDate, setScheduleDayDate]);


  const makeTabContent = useCallback(() => {
    if (tabList[0].isActive) {
      return <div className="layout-container--column layout-container--fluid">
        <ScheduleHoursTable
          scheduleDayDate={scheduleDayDate}
        />
      </div>;
    } else if (tabList[1].isActive) {
      return <div className="layout-container--column layout-container--fluid">
        <ScheduleModulationTable
          scheduleDayDate={scheduleDayDate}
        />
      </div>;
    }
  }, [scheduleDayDate, tabList]);


  return (
    <ModalContainer
      modalWidthType="modal-1000px"
      openModal={modalStatus.viewSchedulePolicy.status}
      closeModal={() => changeModalStatus('viewSchedulePolicy', false)}
    >
      <div className="header">
        <div className="title">Schedule</div>
      </div>
      <div className="body">
        <div>
          <Row className="mb-2">
            <Col sm={4}>
              {/* Server name */}
              <div className="modal-form-title">Name : {scheduleName}</div>
            </Col>
          </Row>
        </div>
        <Row className="mb-2">
          <Col sm={12}>
            <div className="mb-1" style={{ textAlign: 'right' }}>
              {/* Time type */}
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

            {/* Detail */}
            {
              is24Hours && (
                <>
                  <div className="layout-container--column layout-container--fluid">
                    <ScheduleHoursTable
                      scheduleDayDate={scheduleDayDate}
                    />
                  </div>
                </>
              )
            }
            {
              !is24Hours && (
                <>
                  <div className="layout-container--column layout-container--fluid">
                    <ScheduleModulationTable
                      scheduleDayDate={scheduleDayDate}
                    />
                  </div>
                </>
              )
            }
          </Col>
        </Row>
      </div>
    </ModalContainer >
  );
};

export default ViewModal;
