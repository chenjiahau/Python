
import newReleasesStyle from '../newReleases.module.css';

// Components
import Button from 'components/Button';
import ModalContainer from 'components/ModalContainer';

const ReleaseNoteModal = props => {
  const { modalStatus, setModalStatus } = props;
  return (
    <ModalContainer
      modalWidthType="modal-750x"
      openModal={modalStatus}
      closeModal={() => setModalStatus(false)}
    >
      <div className="header">
        <div className="title">DBA-1210P firmware version 2.0 release note</div>
      </div>
      <div className="body">
        <div>
          <div className={`${newReleasesStyle['release-note-content']}`}>
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
            setModalStatus(false);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default ReleaseNoteModal;
