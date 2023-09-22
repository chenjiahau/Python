import floorplansStyle from '../floor-plans.module.scss';

import { useEffect, useState, useCallback } from 'react';
// Components
import { useTranslation } from 'react-i18next';
import ModalContainer from '../../../../components/ModalContainer';
import Button from '../../../../components/Button';


const RemoveModal = props => {
  const { t }= useTranslation();
  const { modalStatus, changeModalStatus, changeFloorImage, floorImageName } = props;
  console.log(props, modalStatus.remove.status);
  let selectedUploadFile = floorImageName;

  return (
    <div className=''>
      <ModalContainer
        modalWidthType="modal-500px"
        openModal={modalStatus.remove.status}
        closeModal={() => changeModalStatus('remove', false)}
      >
        <div className="header">
          <div className="title">{t('fc35ec973f')}</div>
        </div>
        <div className='body'>
          <div className='mb-1'><span>{t('f26a7bc211')}</span></div>
        </div>
        <div className="footer non-border-top-footer">
          <Button
            label={t('ea4788705e')}
            className="btn-cancel"
            onClick={() => {
              console.log('click Close');
              changeModalStatus('remove', false);
            }}
          />
          <Button
            label={t('f2a6c498fb')}
            className="btn-submit"
            onClick={() => {
              console.log('click Delete');
              changeFloorImage('');
              changeModalStatus('remove', false);
            }}
          />
        </div>
      </ModalContainer>
    </div>
  );
};

export default RemoveModal;
