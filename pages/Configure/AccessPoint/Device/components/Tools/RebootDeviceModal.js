// Component
import { ModalContainer, Button } from 'components/';

const RebootDeviceModal = props => {
  const {
    modalStatus,
    changeModalStatus,
  } = props;

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.rebootDevice.status}
      closeModal={() => changeModalStatus(modalStatus.rebootDevice.self, false)}
    >
      <div className="header">
        <div className="title">Reboot device</div>
      </div>
      <div className='body'>
        <p className="description">Rebooting this access point will temporarily disconnect all clients.</p>
        <p className="description">Are you sure you want to reboot?</p>
      </div>
      <div className="footer">
        <Button
          label="Cancel"
          className="btn-cancel"
          onClick={() => changeModalStatus(modalStatus.rebootDevice.self, false)}
        />
        <Button
          label="Reboot"
          className="btn-submit"
          onClick={() => changeModalStatus(modalStatus.rebootDevice.self, false)}
        />
      </div>
    </ModalContainer>
  );
};

export default RebootDeviceModal;
