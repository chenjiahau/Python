import floorplansStyle from '../floor-plans.module.scss';

import { useEffect, useState, useCallback } from 'react';
import { cloneDeep } from 'lodash';
// Components
import { useTranslation } from 'react-i18next';
import ModalContainer from '../../../../components/ModalContainer';
import Button from '../../../../components/Button';
import InputWithUploadButton from '../../../../components/InputWithUploadButton';


const UploadModal = props => {
  const { t }= useTranslation();
  const { modalStatus, changeModalStatus, changeFloorImage, floorImageUrl } = props;
  console.log(props, modalStatus.upload.status);
  let fake_file = '../img/v2/default-floorplan.jpg';

  const [selectedUploadFile, setUploadFile] = useState(null);

  return (
    <div className=''>
      <ModalContainer
        modalWidthType="modal-500px"
        openModal={modalStatus.upload.status}
        closeModal={() => changeModalStatus('upload', false)}
      >
        <div className="header">
          <div className="title">{t('1f98842c35')}</div>
        </div>
        <div className='body'>
          <div className='mb-1'>{t('42c4480d88')}</div>
          <InputWithUploadButton
            value={selectedUploadFile ? selectedUploadFile.name : ''}
            onChange={e => { setUploadFile(e.target.files[0]) }}
          />
        </div>
        <div className="footer non-border-top-footer">
          <Button
            label={t('ea4788705e')}
            className="btn-cancel"
            onClick={() => {
              console.log('click Close');
              changeModalStatus('upload', false);
            }}
          />
          <Button
            label={t('91412465ea')}
            className="btn-submit"
            onClick={() => {
              console.log('click Upload');
              changeFloorImage(fake_file);
              changeModalStatus('upload', false);
            }}
          />
        </div>
      </ModalContainer>
    </div>
  );
};

export default UploadModal;
