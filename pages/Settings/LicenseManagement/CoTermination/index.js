import coTerminationStyle from './co-termination.module.scss';

import { useState } from 'react';
import { Table } from 'react-bootstrap';
import Button from '../../../../components/Button';
import LinkerWithA from '../../../../components/LinkerWithA';
import ModalContainer from '../../../../components/ModalContainer';
import Checkbox from '../../../../components/Checkbox';
import TooltipDialog from '../../../../components/TooltipDialog';

const ExpirationDateContainer  = props => {
  return (
    <div className={coTerminationStyle['expiration-date-container']}>

      {/* 1. Executed field */}
      <div className={`${coTerminationStyle['executed-container']} mb-4`}>
        <div className='sub-title mb-2'>Expiration date</div>
        <div className={coTerminationStyle['expiration-container']}>
          <div className={coTerminationStyle['expiration-r']}>
            <div><strong>Oct.1</strong></div>
            <div>2034</div>
          </div>
          <div className={coTerminationStyle['expiration-l']}>Converted on 2022/11/17</div>
        </div>
      </div>

      {/* 2. Available field */}
      {/* <div className={coTerminationStyle['available-container']}>
        <div className='sub-title mb-2'>Expiration date</div>
        <div className={coTerminationStyle['expiration-container']}>
          <div className={coTerminationStyle['expiration-r']}>
            <div><strong>N/A</strong></div>
          </div>
          <div className={coTerminationStyle['expiration-l']}>Co-termination is available</div>
        </div>
      </div> */}

      {/* 3. Unavailable field */}
      {/* <div className={coTerminationStyle['unavailable-container']}>
        <div className='sub-title mb-2'>Expiration date</div>
        <div className={coTerminationStyle['expiration-container']}>
          <div className={coTerminationStyle['expiration-r']}>
            <div><strong>N/A</strong></div>
          </div>
          <div className={coTerminationStyle['expiration-l']}>Co-termination is unavailable</div>
        </div>
      </div> */}

    </div>
  )
}

const LicenseStatusContainer  = props => {
  const { isShowRemainDateContainer, setShowRemainDateContainer } = props;

  return (
      <div className={coTerminationStyle['license-status-container']}>
        <div className='mb-2'>
          <span className='sub-title'>License status</span>
          <TooltipDialog className='ms-2' placement='right' title='Below is a summary of devices and licenses in your organization, you can calculate the expiration date of license co-termination by using Calculate license state function. After co-terminating, all devices will have the same expiration'></TooltipDialog>
        </div>
        <Table responsive className='table-container'>
          <thead>
            <tr>
              <th>#</th>
              <th>Model name</th>
              <th>Quantity</th>
              <th>Unused active licenses</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>DBA-series</td>
              <td>1</td>
              <td>0</td>
            </tr>
            <tr>
              <td>2</td>
              <td>DBS-2000</td>
              <td>0</td>
              <td>0</td>
            </tr>
            <tr>
              <td>3</td>
              <td>DBG-2000</td>
              <td>0</td>
              <td>0</td>
            </tr>
          </tbody>
        </Table>
        <div className={coTerminationStyle['co-term-button-group-container']}>
          <Button
            label='Calculate license state'
            className='btn-grey-blue'
            onClick={() => setShowRemainDateContainer(!isShowRemainDateContainer)}
          />
          <Button
            label='Download Co-termination Log'
            className='btn-grey-blue'
            onClick={() => {}}
          />
        </div>
        <div>
          <LinkerWithA
            label='License co-termination instructions'
            href='https://tutorials.nuclias.com/License-co-termination-instructions.html'
            target='_blank'
            className='linker-blue text-decoration-underline fw-normal'
          />
        </div>
      </div>
  )
}

const RemainDateContainer  = props => {
  const { isShowRemainDateContainer, setOpenRemainDateModal } = props;
  const showHideClass = isShowRemainDateContainer ? coTerminationStyle['show'] : '';

  return(
    <div className={`${coTerminationStyle['remain-date-container']} ${showHideClass}`}>
      <div>
        <div className={coTerminationStyle['remain-date-expiration']}>
          <span>Expiration : </span>
          <span>2034/10/01</span>
        </div>
        <div className={coTerminationStyle['remain-date-remaining']}>
          <span>Remaining : </span>
          <span>4332 days</span>
        </div>
        <Button
          label='License co-terminate'
          className='btn-grey-blue mt-3'
          onClick={() => setOpenRemainDateModal(true)}
        />
      </div>
    </div>
  )
}

const RemainDateModal = props => {
  const { isOpenRemainDateModal, setOpenRemainDateModal } = props;
  const defaultCheckboxesStatus = {
    'understand': false
  }
  const [ checkboxesStatus, setCheckboxesStatus ] = useState({...defaultCheckboxesStatus});

  const toggleCheckboxes = type => {
    const newCheckboxesStatus = {...checkboxesStatus};
    newCheckboxesStatus[type] = !newCheckboxesStatus[type];
    setCheckboxesStatus(newCheckboxesStatus);
  }

  return(
      <ModalContainer
        modalWidthType='modal-500px'
        openModal={isOpenRemainDateModal}
        closeModal={() => setOpenRemainDateModal(false)}
      >
        <div className='header'>
          <div className='title'>License co-termination</div>
        </div>
        <div className={`${coTerminationStyle['remain-date-modal-body']} body`}>
          <div className='mb-2'>Given the co-terminating nature of Nuclias licensing, it cannot be undone once you click Confirm.</div>
          <div className='mb-2'>After licensing co-termination, the original licenses bound on the devices would be terminated and then replaced by system-assigned license keys with the co-termination expiration date.</div>
          <div className='mb-2'>You will receive a notification email once the licensing co-termination has been applied.</div>
          <div className={coTerminationStyle['projected-date']}>
              <span>Your projected co-termination date : </span>
              <span>2022/3/11</span>
          </div>
          <Checkbox
            id="understand"
            label="I understand the terms and still wish to proceed."
            checked={!!checkboxesStatus['understand']}
            onChange={() => toggleCheckboxes('understand')}
          />
        </div>
        <div className='footer'>
          <Button
            label='Cancel'
            className='btn-cancel'
            onClick={() => setOpenRemainDateModal(false)}
          />
          <Button
            label='Confirm'
            className='btn-submit'
            disabled={!checkboxesStatus['understand']}
            onClick={() => {console.log('Click on submit')}}
          />
        </div>
      </ModalContainer>
  )
}

const CoTermination = () => {
  const [isOpenRemainDateModal, setOpenRemainDateModal] = useState(false);
  const [isShowRemainDateContainer, setShowRemainDateContainer] = useState(false);

  return (
    <div className={`${coTerminationStyle['co-term-container']} layout-container layout-container--column layout-container--fluid`}>
      <div>
        <ExpirationDateContainer />
        <LicenseStatusContainer
          isShowRemainDateContainer={isShowRemainDateContainer}
          setShowRemainDateContainer={setShowRemainDateContainer}
        />
        <RemainDateContainer
          isShowRemainDateContainer={isShowRemainDateContainer}
          setOpenRemainDateModal={setOpenRemainDateModal}
        />
        <RemainDateModal
          isOpenRemainDateModal={isOpenRemainDateModal}
          setOpenRemainDateModal={setOpenRemainDateModal}
        />
      </div>
    </div>
  )
}

export default CoTermination;