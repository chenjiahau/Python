// Component
import Button from 'components/Button';
import ModalContainer from 'components/ModalContainer';

const ChangeModeModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    callback
  } = props;

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.changeMode.status}
      closeModal={() => changeModalStatus(modalStatus.changeMode.self, false)}
    >
      <div className='header'>
        <div className='title'>Update Profile configuration</div>
      </div>
      <div className='body'>
        Do you want to enable Profile configuration to revert all the ports of this device as the existing Profile configuration?
      </div>
      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => callback(false)}
        />
        <Button
          label='Apply'
          className='btn-submit'
          onClick={() => callback(true)}
        />
      </div>
    </ModalContainer>
  );
};

export default ChangeModeModal;
