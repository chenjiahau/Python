// Component
import Button from "components/Button";
import ModalContainer from "components/ModalContainer";

const ChangeConnectionTypeModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    callback
  } = props;

  const handleClick = (state) => {
    changeModalStatus('changeConnectionType', false);
    callback(state);
  }

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.changeConnectionType.status}
      closeModal={() => changeModalStatus('changeConnectionType', false)}
    >
      <div className="header">
        <div className="title">IP connection change</div>
      </div>
      <div className='body'>
        Change IP connection to DHCP or Static IP may disrupt device connection to Nuclias. This device may not be able to connect to Nuclias. Would you like to proceed ?
      </div>
      <div className="footer">
        <Button
          label="No"
          className="btn-cancel"
          onClick={() => handleClick(false)}
        />
        <Button
          label="Yes"
          className="btn-submit"
          onClick={() => handleClick(true)}
        />
      </div>
    </ModalContainer>
  );
};

export default ChangeConnectionTypeModal;
