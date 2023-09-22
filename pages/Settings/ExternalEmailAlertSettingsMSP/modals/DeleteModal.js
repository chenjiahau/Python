import modalStyle from '../external-email-alert-settings-modal.module.scss';

// Packages
import { useTranslation } from 'react-i18next';

// Components
import ConfirmationModalContainer from 'components/ConfirmationModalContainer';

const DeleteModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const { t } = useTranslation();

  return (
    <ConfirmationModalContainer
      modalWidthType="modal-400px"
      title={t(modalStatus.delete.label)}
      description={t(modalStatus.delete.description)} // All devices and licenses under this organization...
      openModal={modalStatus.delete.status}
      closeModal={() => changeModalStatus('delete', false)}
      onConfirm={() => {}}
    />
  );
};

export default DeleteModal;
