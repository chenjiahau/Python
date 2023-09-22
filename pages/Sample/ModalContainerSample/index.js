import { useState, useCallback } from 'react';
import { clone, cloneDeep } from 'lodash';
import { ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Button from 'components/Button';
import ModalContainer from 'components/ModalContainer';
import ConfirmationModalContainer from 'components/ConfirmationModalContainer';
import ResultModalContainer from 'components/ResultModalContainer';
import DeleteDeviceModalContainer from 'components/DeleteDeviceModalContainer';

const defaultModalStatus = {
  normal: {
    status: false
  },
  deleteDevice: {
    status: false
  },
  confirmation: {
    status: false
  },
  revoke: {
    status: false
  },
  result: {
    status: false
  },
}

const fakeResultsThList = ['ec53a8c4f0', '5d5c4ad5db', '3ec365dd53']; // Status, License key, Details

const fakeResults = [
  {
    requriedStatusType: 'success',
    status: '30ae8fff88', // 'Success'
    target: 'LICDBG000000000001',
    details: '263c0d8725', //'Successfully'
  },
  {
    requriedStatusType: 'error',
    status: 'd7c8c85bf7', // 'Failed'
    target: 'LICDBG000000000002',
    details: '59ad6a86d2' // 'This license key already exists. Please check and try again.'
  },
];

const defaultMessages = {
  success: '263c0d8725', // Successfully
  error: '267bdded37', // Device not found.
  warning: 'd0204603f7' // Changing the profile will re-configure all device settings. This may disconnect all currently connected clients
};

const defaultMessageTypes = {
  success: 'i18n',
  error: 'i18n',
  warning: 'i18n'
};

const ModalContainerSample = () => {
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const { t } = useTranslation();
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus( {...modalStatus, [type]: { ...modalStatus[type], status: value }} );
  }, []);

  return (
    <div className='mb-5'>
      <h3>Modal</h3>
      <ButtonGroup className='mb-5'>
        <Button
          label='Normal modal'
          className='btn-grey'
          onClick={() => changeModalStatus('normal', true)}
        />

        <Button
          label='Delete device modal'
          className='btn-grey'
          onClick={() => changeModalStatus('deleteDevice', true)}
        />

        <Button
          label='Confirmation modal'
          className='btn-grey'
          onClick={() => changeModalStatus('revoke', true)}
        />

        <Button
          label='Result modal'
          className='btn-grey'
          onClick={() => changeModalStatus('result', true)}
        />
      </ButtonGroup>

      <ModalContainer
        modalWidthType='modal-500px'
        openModal={modalStatus.normal.status}
        closeModal={() => changeModalStatus('normal', false)}
      >
        <div className='header'>
          <div className='title'>Delete account</div>
        </div>
        <div className='body'>
          <div>Are you sure you want to delete the selected account?</div>
        </div>
        <div className='footer'>
          <Button
            label='Cancel'
            className='btn-cancel'
            onClick={() => changeModalStatus('normal', false)}
          />
          <Button
            label='Yes'
            className='btn-submit'
            onClick={() => {}}
          />
        </div>
      </ModalContainer>

      <DeleteDeviceModalContainer
        openModal={modalStatus.deleteDevice.status}
        closeModal={() => changeModalStatus('deleteDevice', false)}
        modalWidthType="modal-500px"
        title="Delete devices"
        description="You may delete the selected devices from this organization permanently or move the selected devices to Inventory as Unused devices."
        onMoveToInventory={() => console.log('Move to Inventory')}
        onDelete={() => console.log('Delete from Organization')}
      />

      <ConfirmationModalContainer
        modalWidthType='modal-400px'
        messages={cloneDeep(defaultMessages)}
        messagesTypes={defaultMessageTypes}
        title='Revoke licenses'
        description='Would you like to revoke selected licenses?'
        openModal={modalStatus.revoke.status}
        closeModal={() => changeModalStatus('revoke', false)}
        onConfirm={() => {
          changeModalStatus('revoke', false);
          changeModalStatus('result', true);
        }}
      />

      <ResultModalContainer
        thList={fakeResultsThList}
        results={fakeResults}
        onDownload={() => {}}
        openModal={modalStatus.result.status}
        closeModal={() => changeModalStatus('result', false)}
      />

    </div>
  );
};

export default ModalContainerSample;
