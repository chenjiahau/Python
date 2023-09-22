import mainStyle from '../../../ports.module.scss';

import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { InlineTitle, ButtonAction } from 'components/';

import EditPortModal from '../../../modals/EditPortModal';
import ViewModal from 'cloudPages/Configure/SchedulePolicies/modals/View';

// Dummy data
import { getChangeModalStatusFn } from 'dummy/utils/modal';

const fakeScheduleData = [
  { id: '1', day: "SUNDAY", endTime: "24:00", startTime: "00:00", invertTime: false, enableAllDay: true },
  { id: '2', day: "MONDAY", endTime: "24:00", startTime: "00:00", invertTime: false, enableAllDay: true },
  { id: '3', day: "TUESDAY", endTime: "24:00", startTime: "00:00", invertTime: false, enableAllDay: true },
  { id: '4', day: "WEDNESDAY", endTime: "24:00", startTime: "00:00", invertTime: false, enableAllDay: true },
  { id: '5', day: "THURSDAY", endTime: "24:00", startTime: "00:00", invertTime: false, enableAllDay: true },
  { id: '6', day: "FRIDAY", endTime: "24:00", startTime: "00:00", invertTime: false, enableAllDay: true },
  { id: '7', day: "SATURDAY", endTime: "24:00", startTime: "00:00", invertTime: false, enableAllDay: true }
]

const defaultModalStatus = {
  editPort: {
    self: 'editPort',
    status: false
  },
  viewSchedulePolicy: {
    self: 'viewSchedulePolicy',
    status: false
  },
};

const CurrentConfiguration = (props) => {
  const { isNotStandalone, selectedPort, pushToDevice } = props;

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [port, setPort] = useState(null);
  const [selectedPorts, setSelectedPorts] = useState([]);
  const [form, setForm] = useState(null);
  const [scheduleDayDate, setScheduleDayDate] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  const editPort = () => {
    setSelectedPorts([port]);
    changeModalStatus(modalStatus.editPort.self, true);
  }

  // Side effect
  useEffect(() => {
    // Schedule
    setScheduleDayDate(fakeScheduleData);

    // Port
    const updatedPort = selectedPort._port;
    setPort(updatedPort);

    // Form
    let updatedForm = {};
    updatedForm = {
      profileState: isNotStandalone ? 'Enabled' : 'Disabled',
      portState: updatedPort.portState.title,
      rstp: updatedPort.rstp.title,
      rootGuard: updatedPort.stpGuard.title,
      lbd: updatedPort.lbd.title,
      portCos: updatedPort.portCos.title,
      accessPolicy: updatedPort.accessPolicy.title,
      mirror: updatedPort.mirror,
      linkNegotiation: updatedPort.link.title,
      speedDownshift: updatedPort.speedDownshift.title,
      portSchedule: updatedPort.portSchedule.title,
      poe: updatedPort.poe.title,
      pdAlive: updatedPort.pdAlive,
      pdIpAddress: updatedPort.pdIpAddress,
      flowControl: updatedPort.flowControl.title,
      trafficSegmentation: updatedPort.trafficSegmentation.title,
      linkAggregationGroup: updatedPort.aggregate === '-' ? '-' : `The member ports of ${updatedPort.aggregate}`,
      type: updatedPort.type.title,
      nativeVlan: updatedPort.nativeVlan,
      allowVlans: updatedPort.accessVlan
    };
    setForm(updatedForm);
  }, [selectedPort]);

  if (!port || !form) {
    return;
  }

  return (
    <>
      <div className={`row-col-block ${mainStyle['space']}`} >
        <InlineTitle label='CURRENT CONFIGURATION'>
          <ButtonAction
            label="EDIT"
            title="EDIT"
            iconClassName="icon-edit"
            onClick={editPort}
          />
        </InlineTitle>

        <div className={`${mainStyle['block']}`}>
          {/* Profile configuration status */}
          <div className={mainStyle['title']}>
            Profile configuration status
          </div>
          <div>
            {form.profileState}
          </div>
        </div>

        <div className={`${mainStyle['container']}`}>
          <div>
            {/* Port state */}
            <div className={mainStyle['block']}>
              <div className={mainStyle['title']}>
                Port state
              </div>
              <div>
                {form.portState}
              </div>
            </div>
            {/* RSTP */}
            <div className={mainStyle['block']}>
              <div className={mainStyle['title']}>
                RSTP
              </div>
              <div>
                {form.rstp}
              </div>
            </div>
            {/* Root guard */}
            <div className={mainStyle['block']}>
              <div className={mainStyle['title']}>
                Root guard
              </div>
              <div>
                {form.rootGuard}
              </div>
            </div>
            {/* LBD */}
            <div className={mainStyle['block']}>
              <div className={mainStyle['title']}>
                LBD
              </div>
              <div>
                {form.lbd}
              </div>
            </div>
            {/* Port CoS */}
            <div className={mainStyle['block']}>
              <div className={mainStyle['title']}>
                Port CoS
              </div>
              <div>
                {form.portCos}
              </div>
            </div>
            {/* Access policy */}
            <div className={mainStyle['block']}>
              <div className={mainStyle['title']}>
                Access policy
              </div>
              <div>
                {form.accessPolicy}
              </div>
            </div>
            {/* Mirror */}
            <div className={mainStyle['block']}>
              <div className={mainStyle['title']}>
                Mirror
              </div>
              <div>
                {form.mirror}
              </div>
            </div>
          </div>
          <div>
            {/* Link negotiation */}
            <div className={mainStyle['block']}>
              <div className={mainStyle['title']}>
                Link negotiation
              </div>
              <div>
                {form.linkNegotiation}
              </div>
            </div>
            {/* Speed downshift */}
            <div className={mainStyle['block']}>
              <div className={mainStyle['title']}>
                Speed downshift
              </div>
              <div>
                {form.speedDownshift}
              </div>
            </div>
            {/* Port schedule */}
            <div className={mainStyle['block']}>
              <div className={mainStyle['title']}>
                Port schedule
              </div>
              <div>
                <span className='link' onClick={() => changeModalStatus(modalStatus.viewSchedulePolicy.self, true)}>{form.portSchedule}</span>
              </div>
            </div>
            {/* PoE */}
            <div className={mainStyle['block']}>
              <div className={mainStyle['title']}>
                PoE
              </div>
              <div>
                {form.poe}
              </div>
            </div>
            {/* PD alive */}
            <div className={mainStyle['block']}>
              <div className={mainStyle['title']}>
                PD alive
              </div>
              <div>
                {form.pdAlive}
              </div>
            </div>
            {/* PD IP address */}
            <div className={mainStyle['block']}>
              <div className={mainStyle['title']}>
                PD IP address
              </div>
              <div>
                {form.pdIpAddress}
              </div>
            </div>
            {/* Flow control */}
            <div className={mainStyle['block']}>
              <div className={mainStyle['title']}>
                Flow control
              </div>
              <div>
                {form.flowControl}
              </div>
            </div>
          </div>
        </div>

        {/* Traffic segmentation */}
        <div className={mainStyle['block']}>
          <div className={mainStyle['title']}>
            Traffic segmentation
          </div>
          <div>
            {form.trafficSegmentation}
          </div>
        </div>
        {/* Link aggregation group */}
        <div className={mainStyle['block']}>
          <div className={mainStyle['title']}>
            Link aggregation group
          </div>
          <div>
            {form.linkAggregationGroup}
          </div>
        </div>
        {/* Type */}
        <div className={mainStyle['block']}>
          <div className={mainStyle['title']}>
            Type
          </div>
          <div>
            {form.type}
          </div>
        </div>
        {/* Native VLAN */}
        {
          form.type === 'Trunk' && (
            <>
              <div className={mainStyle['block']}>
                <div className={mainStyle['title']}>
                  Native VLAN
                </div>
                <div>
                  {form.nativeVlan}
                </div>
              </div>
            </>
          )
        }
        {/* Allowed VLANs */}
        <div className={mainStyle['block']}>
          <div className={mainStyle['title']}>
            {form.type === 'Access' ? 'Access VLAN' : 'Allowed VLANs'}
          </div>
          <div>
            {form.allowVlans}
          </div>
        </div>
      </div>

      <EditPortModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        selectedPorts={selectedPorts}
        pushToDevice={pushToDevice}
      />

      <ViewModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        scheduleName=''
        setScheduleDayDate={setScheduleDayDate}
        scheduleDayDate={scheduleDayDate}
      />
    </>
  )
}

export default CurrentConfiguration;