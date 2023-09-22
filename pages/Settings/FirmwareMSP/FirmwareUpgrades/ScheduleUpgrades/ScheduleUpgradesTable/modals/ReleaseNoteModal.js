
import firmwareUpgradesStyle from '../firmware-upgrades.module.css';

// Components
import Button from 'components/Button';
import ModalContainer from 'components/ModalContainer';

const ReleaseNoteModal = props => {
  const { modalStatus, changeModalStatus } = props;
  return (
    <ModalContainer
      modalWidthType="modal-750x"
      openModal={modalStatus.releaseNote.status}
      closeModal={() => changeModalStatus('releaseNote', false)}
    >
      <div className="header">
        <div className="title">DBA-1210P firmware version 2.0 release note</div>
      </div>
      <div className="body">
        <div>
          <div className={`${firmwareUpgradesStyle['release-note-content']}`}>
            test
          </div>
        </div>
      </div>
      <div className="footer">
        <Button
          label="Close"
          className="btn-cancel"
          onClick={() => {
            console.log('click save');
            changeModalStatus('releaseNote', false);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default ReleaseNoteModal;
