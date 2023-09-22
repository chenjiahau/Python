import { useTranslation } from 'react-i18next';

// Components
import Button from 'components/Button';
import ModalContainer from 'components/ModalContainer';

const OrgManagementGenerateModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const { t } = useTranslation();

  return(
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.generate.status}
      closeModal={() => changeModalStatus('generate', false)}
    >
      <div className='header'>
        {/* Generate organization report */}
        <div className='title'>{t('7a981a2edd')}</div>
      </div>
      <div className='body'>
        {/* Do you want to generate the organization list? */}
        <div className='mb-1'>{t('861747d4fd')}</div>
        {/* You will receive an email to inform you the organization list is ready for download after few minutes. */}
        <div className='mb-1'>{t('2c865c4880')}</div>
      </div>
      <div className='footer non-border-top-footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus('generate', false)}
        />
        <Button
          label='Yes'
          className='btn-submit'
          onClick={() => {console.log('Click on generate')}}
        />
      </div>
    </ModalContainer>
  )
}

export default OrgManagementGenerateModal;
