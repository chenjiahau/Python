import certificateStyle from '../certificate-management.module.scss';

// Components
import Button from '../../../../components/Button';
import ModalContainer from '../../../../components/ModalContainer';
import InputWithUploadButton from '../../../../components/InputWithUploadButton';

const UpdateCertificateAuthorityModal = props => {
  const { modalStatus, changeModalStatus } = props;
  return (
    <ModalContainer
      modalWidthType="modal-550px"
      openModal={modalStatus.update.status}
      closeModal={() => changeModalStatus('update', false)}
    >
      <div className="header">
        <div className="title">Update certificate authority</div>
      </div>
      <div className="body">
        {/* Access privilege */}
        <div className={'sub-title mb-3'}>Access privilege</div>
        <div className="mb-3">
          <div className={certificateStyle['ca-modal-text']}>
            Access level
            <div className={certificateStyle['ca-modal-access-level-label']}>
              Organization
            </div>
          </div>
        </div>
        {/* Upload CA */}
        <div className={'sub-title mb-3'}>Upload CA</div>
        <div>
          <div className={certificateStyle['ca-modal-text']}>
            Upload your unencrypted PEM format RSA private key of the
            certificate authority (CA)
            <span className={certificateStyle['ca-modal-icon-required']}>
              *
            </span>
            <InputWithUploadButton value={''} onChange={() => {}} />
          </div>
          <div className={certificateStyle['ca-modal-text']}>
            Upload your PEM format X.509 certificate of the certificate
            authority (CA)
            <span className={certificateStyle['ca-modal-icon-required']}>
              *
            </span>
            <InputWithUploadButton value={''} onChange={() => {}} />
          </div>
        </div>
      </div>
      <div className="footer">
        <Button
          label="Close"
          className="btn-cancel"
          onClick={() => {
            console.log('click close');
            changeModalStatus('update', false);
          }}
        />
        <Button
          label="Save"
          className="btn-submit"
          onClick={() => {
            console.log('click save');
            changeModalStatus('update', false);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default UpdateCertificateAuthorityModal;
