import { useTranslation } from 'react-i18next';

// Components
import Button from '../../../../components/Button';
import ModalContainer from '../../../../components/ModalContainer';

const AddSamlRoleModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const { t } = useTranslation();

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.generate.status}
      closeModal={() => changeModalStatus('generate', false)}
    >
      <div className="header">
        <div className="title">{t('64bb7361f7')}</div>
      </div>
      <div className="body">
        <div className="mb-1">{t('ce1c61c7eb')}</div>
        <div className="mb-1">{t('d565eec532')}</div>
      </div>
      <div className="footer">
        <Button
          label={t('ea4788705e')}
          className="btn-cancel"
          onClick={() => changeModalStatus('generate', false)}
        />
        <Button
          label={t('93cba07454')}
          className="btn-submit"
          onClick={() => changeModalStatus('generate', false)}
        />
      </div>
    </ModalContainer>
  );
};

export default AddSamlRoleModal;
