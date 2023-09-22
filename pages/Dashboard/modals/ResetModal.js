import dashboardStyle from '../dashboard.module.scss';

import { useEffect, useState, useCallback } from 'react';
// Components
import { useTranslation } from 'react-i18next';
import ModalContainer from '../../../components/ModalContainer';
import Button from '../../../components/Button';


const ResetModal = props => {
  const { t } = useTranslation();
  const { modalStatus, changeModalStatus } = props;

  return (
    <div className=''>
      <ModalContainer
        modalWidthType="modal-500px"
        openModal={modalStatus.reset.status}
        closeModal={() => changeModalStatus('reset', false)}
      >
        <div className="header">
          <div className="title">{t('526d688f37')}</div>
        </div>
        <div className='body'>
          <div className='mb-1'><span>{t('ee7c577686')}</span></div>
        </div>
        <div className="footer non-border-top-footer">
          <Button
            label={t('bafd7322c6')}
            className="btn-cancel"
            onClick={() => {
              console.log('click Close');
              changeModalStatus('reset', false);
            }}
          />
          <Button
            label={t('93cba07454')}
            className="btn-delete"
            onClick={() => {
              console.log('click Delete');
              changeModalStatus('remove', false);
              props.resetSortList();
            }}
          />
        </div>
      </ModalContainer>
    </div>
  );
};

export default ResetModal;
