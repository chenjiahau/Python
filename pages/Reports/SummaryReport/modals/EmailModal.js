import summaryReportStyle from '../summary-report.module.scss';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Components
import Button from '../../../../components/Button';
import Textarea from '../../../../components/Textarea';
import ModalContainer from '../../../../components/ModalContainer';
const EmailModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const { t } = useTranslation();
  const [textAreaValue, setTextAreaValue] = useState('');

  return (
    <ModalContainer
      modalWidthType="modal-750px"
      openModal={modalStatus.email.status}
      closeModal={() => changeModalStatus('email', false)}
    >
      <div className="header">
        <div className="title">{t('f483e3d912')}</div>
      </div>
      <div className="body">
        <div>
          {/* Email this report */}
          <div className={`mb-2 ${summaryReportStyle['email-modal-font-size']}`}>
            {t('253fdba53e')} - {t('a056c9a163')} (2023/02/15 04:56 PM - 2023/02/16 04:56 PM)
          </div>
          {/* Email address */}
          <div className={`modal-form-title ${summaryReportStyle['email-modal-font-size']}`}>
            {t('b357b524e7')}
          </div>
          <div className="modal-form-field">
            <Textarea
              style={{ height: 100 }}
              value={textAreaValue}
              onChange={e => setTextAreaValue(e.target.value)}
              onFocus={() => {}}
              onBlur={() => {}}
            />
            <div className={`modal-form-prompt ${summaryReportStyle['email-modal-font-size']}`}>
              {t('d41d8cd98f')}
              <br />
              {t('aaa1b569e1')}
            </div>
          </div>
        </div>
      </div>
      <div className="footer non-border-top-footer">
        <Button
          label={t('fa27c9d4b1')}
          className="btn-submit"
          onClick={() => changeModalStatus('email', false)}
          disabled={!textAreaValue}
        />
      </div>
    </ModalContainer>
  );
};

export default EmailModal;
