import accountManagementStyle from '../account-management.module.css';

// Components
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import ModalContainer from '../../../../components/ModalContainer';


const ResendModal = props => {
  const { modalStatus, changeModalStatus } = props;

  return (
    <ModalContainer
      modalWidthType="modal-400px"
      openModal={modalStatus.resend.status}
      closeModal={() => changeModalStatus('resend', false)}
    >
      <div className="header">
        <div className="title">Resend Invitation</div>
      </div>
      <div className="body">
        {/* Email address* */}
        <div className="mb-3">
        <div className="modal-form-group pt-2">
          <div className="modal-form-title required me-3">Email</div>
          <div className="modal-form-field">
            <Input
              type="text"
              placeholder="1-64 characters"
              value="D-Link"
              onChange={e => {
                console.log(e.target.value);
              }}
              onFocus={() => {}}
              onBlur={() => {}}
            />

          </div>
        </div>
        </div>
      </div>
      <div className="footer">
        <Button
          label="Cancel"
          className="btn-cancel"
          onClick={() => {
            console.log('click Close');
            changeModalStatus('resend', false);
          }}
        />
        <Button
          label="Resend"
          className="btn-submit"
          onClick={() => {
            console.log('click save');
            changeModalStatus('resend', false);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default ResendModal;
