// Component
import { ModalContainer, Button } from 'components/';

const RunAutoChannelModal = props => {
  const {
    modalStatus,
    changeModalStatus,
  } = props;

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.runAutoChannel.status}
      closeModal={() => changeModalStatus(modalStatus.runAutoChannel.self, false)}
    >
      <div className="header">
        <div className="title">Run auto channel</div>
      </div>
      <div className='body'>
        <p className="description">Running auto-channel may cause disruption in the operation of your Wifi network.</p>
        <p className="description">Would you like to proceed?</p>
      </div>
      <div className="footer">
        <Button
          label="No"
          className="btn-cancel"
          onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, false)}
        />
        <Button
          label="Yes"
          className="btn-submit"
          onClick={() => changeModalStatus(modalStatus.runAutoChannel.self, false)}
        />
      </div>
    </ModalContainer>
  );
};

export default RunAutoChannelModal;
