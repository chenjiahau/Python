import licenseLogStyle from './license-log.module.scss';

import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Table } from 'react-bootstrap';
import InlineTitle from '../../../../components/InlineTitle';
import LinkerWithA from '../../../../components/LinkerWithA';
import PaginationContainer from '../../../../components/PaginationContainer';
import Button from '../../../../components/Button';
import DropdownWithTimeframe, { getTimeFrameSetting, getTimeFrameKey } from '../../../../components/DropdownWithTimeframe';
import DropdownWithAdvancedSearch from '../../../../components/DropdownWithAdvancedSearch';
import Input from '../../../../components/Input';
import ModalContainer from '../../../../components/ModalContainer';
import TooltipDialog from '../../../../components/TooltipDialog';
import DropdownWithItem from '../../../../components/DropdownWithItem';

const defaultActionList = [
  { title: 'All', isActive: true },
  { title: 'Assigned', isActive: false },
  { title: 'Suspended', isActive: false },
  { title: 'Resumed', isActive: false },
  { title: 'Added', isActive: false },
  { title: 'Bound', isActive: false },
  { title: 'Unbound', isActive: false },
  { title: 'Activated', isActive: false },
  { title: 'Revoked', isActive: false },
]

const LicenseLog  = () => {
  const { t } = useTranslation();
  const sorting = e => {
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  }

  // modal
  const [isOpenGenerateModal, setOpenGenerateModal] = useState(false);

  // Get Timeframe key object.
  console.log('Timeframe key', getTimeFrameKey());

  // Customize Timeframe Setting hook example.
  const resultTimeFrame = cloneDeep(getTimeFrameSetting());
  resultTimeFrame.last24hrs.checked = false;
  resultTimeFrame.last7days.checked = true;
  resultTimeFrame.last14days.checked = false;
  resultTimeFrame.last30days.checked = false;
  resultTimeFrame.last60days.checked = false;
  resultTimeFrame.customRange.checked = false;

  return (
    <div className='layout-container layout-container--column layout-container--fluid'>

      <div className='d-flex justify-content-end'>
        <div className='d-inline-flex align-items-center' style={{gap: '10px', marginBottom: '10px'}}>
          <span style={{color: '#1c307d'}}>Time frame : </span>
          <DropdownWithTimeframe
            // customTimeFrameDay={'365'}
            // customDefaultTimeframe={resultTimeFrame}
            // customHideItem={['last60days', 'customRange']}
            alignEnd={true}
            onInit={initTimeFrame => console.log('initTimeFrame-', initTimeFrame)}
            onChange={selectedTimeframe => console.log('selectedTimeframe-', selectedTimeframe)}
          />

          <DropdownWithAdvancedSearch
            value={''}
            alignEnd={true}
            dataBsToggleOnButton={true}
            dropdownMenuStyle={{minWidth: 371}}
            onChange={e => console.log(e.target.value)}
          >
            <li>
              <div className='form-title'>Account</div>
              <div className='form-field'>
                <Input
                  type='text'
                  value={''}
                  placeholder='abc@mail.com'
                  onChange={e => {console.log(e.target.value)}}
                  onFocus={() => {}}
                  onBlur={() => {}}
                />
              </div>
            </li>
            <li>
              <div className='form-title'>Action</div>
              <DropdownWithItem
                id="action-dropdown"
                type="normal"
                selectedItem={defaultActionList[0]}
                itemList={defaultActionList}
                onClick={() => {}}
              />
            </li>
          </DropdownWithAdvancedSearch>

          <Button
            label='Generate'
            className='btn-grey'
            onClick={() => setOpenGenerateModal(true)}
          />

          <Button
            label='Download'
            className='btn-grey'
            onClick={() => {console.log('Click on download')}}
          />

          <TooltipDialog placement='left' title='Click Generate to prepare the file to download. It may take few minutes to generate the file. You will receive an email from the Nuclias Cloud team once the file is ready to download.'></TooltipDialog>
        </div>

      </div>

      <Table responsive striped hover className='table-container'>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <LinkerWithA
                label='Time'
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label='Account'
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label='License Key'
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label='Action'
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label='Details'
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>01/21/2022 10:05:00</td>
            <td>msp@email.com</td>
            <td>0070A0005478CA2DD009</td>
            <td>Added</td>
            <td>Add to [ORG] successfully</td>
          </tr>
          <tr>
            <td>2</td>
            <td>01/21/2022 10:10:00</td>
            <td>msp@email.com</td>
            <td>0070A0005478CA2DD010</td>
            <td>Assigned</td>
            <td>Assigned to [Organization] successfully</td>
          </tr>
          <tr>
            <td>3</td>
            <td>01/21/2022 10:20:00</td>
            <td>org@email.com</td>
            <td>0070A0005478CA2DD011</td>
            <td>Revoked</td>
            <td>Revoked from [ORG] successfully</td>
          </tr>
          <tr>
            <td>4</td>
            <td>01/21/2022 10:30:00</td>
            <td>org@email.com</td>
            <td>0070A0005478CA2DD012</td>
            <td>Suspended</td>
            <td>Suspended successfully</td>
          </tr>
          <tr>
            <td>5</td>
            <td>01/21/2022 10:40:00</td>
            <td>org@email.com</td>
            <td>0070A0005478CA2DD012</td>
            <td>Resumed</td>
            <td>Resumed successfully</td>
          </tr>
          <tr>
            <td>6</td>
            <td>01/21/2022 10:50:00</td>
            <td>org@email.com</td>
            <td>0070A0005478CA2DD015</td>
            <td>Co-terminated</td>
            <td>[Number] licenses are terminated and [Number] licenses are created</td>
          </tr>
          <tr>
            <td>7</td>
            <td>01/21/2022 11:00:00</td>
            <td>org@email.com</td>
            <td>0070A0005478CA2DD016</td>
            <td>Terminated</td>
            <td>Terminated</td>
          </tr>
          <tr>
            <td>8</td>
            <td>01/21/2022 11:10:00</td>
            <td>org@email.com</td>
            <td>0070A0005478CA2DD017</td>
            <td>Bound</td>
            <td>Bound to [DeviceName] successfully</td>
          </tr>
          <tr>
            <td>9</td>
            <td>01/21/2022 11:20:00</td>
            <td>org@email.com</td>
            <td>0070A0005478CA2DD018</td>
            <td>Activated</td>
            <td>Activated</td>
          </tr>
          <tr>
            <td>10</td>
            <td>01/21/2022 11:30:00</td>
            <td>org@email.com</td>
            <td>0070A0005478CA2DD019</td>
            <td>Unbound</td>
            <td>Unbound from [DeviceName] successfully</td>
          </tr>
          <tr>
            <td>11</td>
            <td>01/21/2022 11:40:00</td>
            <td>org@email.com</td>
            <td>0070A0005478CA2DD019</td>
            <td>Expired</td>
            <td>Expired</td>
          </tr>
        </tbody>
      </Table>

      <div className={licenseLogStyle['inline-bottom-group']}>
        <div>
          {/* 0 entries dating back to 2023/01/30 */}
          { t('8301d01641', {number: '0', date: '2023/01/30'}) }
        </div>
        <PaginationContainer
          total={10}
          onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
          onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
        />
      </div>

      {/* Generate modal */}
      <ModalContainer
        modalWidthType='modal-500px'
        openModal={isOpenGenerateModal}
        closeModal={() => setOpenGenerateModal(false)}
      >
        <div className='header'>
          <div className='title'>Generate the license log</div>
        </div>
        <div className='body'>
          <div className='mb-1'>Do you want to generate the license log?</div>
          <div className='mb-1'>You will receive an email to inform you the license log is ready for download after few minutes.</div>
        </div>
        <div className='footer'>
          <Button
            label='Cancel'
            className='btn-cancel'
            onClick={() => setOpenGenerateModal(false)}
          />
          <Button
            label='Yes'
            className='btn-submit'
            onClick={() => {console.log('Click on generate')}}
          />
        </div>
      </ModalContainer>

    </div>
  )
}

export default LicenseLog;