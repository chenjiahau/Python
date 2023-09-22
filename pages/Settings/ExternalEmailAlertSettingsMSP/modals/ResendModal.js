import modalStyle from '../external-email-alert-settings-modal.module.scss';

import { useTranslation } from 'react-i18next';

// Components
import {
  Button,
  Input,
  ModalContainer
} from 'components';


const ResendModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const { t } = useTranslation();

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.resend.status}
      closeModal={() => changeModalStatus('resend', false)}
    >
      <div className="header">
        <div className="title">{t(modalStatus.resend.label)}</div>
      </div>
      <div className="body">
        {/* Email */}
        <div className="mb-3">
        <div className="modal-form-group pt-2">
          <div className="modal-form-title required me-3">{t('ce8ae9da5b')}</div>
          <div className="modal-form-field">
            <Input
              type="text"
              placeholder="1-64 characters"
              value="bizcloud@dlinkcorp.com"
              onChange={e => console.log(e.target.value)}
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
          onClick={() => changeModalStatus('resend', false)}
        />
        <Button
          label="Resend"
          className="btn-submit"
          onClick={() => changeModalStatus('resend', false)}
        />
      </div>
    </ModalContainer>
  );
};

export default ResendModal;
