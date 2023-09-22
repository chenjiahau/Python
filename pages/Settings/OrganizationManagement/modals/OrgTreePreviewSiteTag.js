import modalStyle from '../org-management-modal.module.scss';

import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import defaultSiteTagPhoto from 'assets/img/v2/icon/ntt_care/icon_location_pin.svg';
import updloadedSiteTagImg from 'assets/img/v2/icon/icon_dlink.png';

// Slice
import { selectUserLevel } from 'stores/slice/user';

// Component
import { Button, ModalContainer, MessageBoxGroup, Icon } from 'components/';

const defaultMessages = {
  success: '',
  error: '',
  warning: ''
};

const OrgTreePreviewSiteTag = props => {
  const { modalStatus, changeModalStatus } = props;
  const { t } = useTranslation();

  // State
  const userLevel = useSelector(selectUserLevel) || localStorage.getItem('userLevel');
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.previewTag.status}
      hideClose={true}
    >
      <div className='header d-flex justify-content-between'>
        <div className='title'>{t(modalStatus.previewTag.label) + '-' + 'TAG-0'}</div>
        <div>
          <Icon
            style={{ width: '19px', height: '19px' }}
            className="icon-edit"
            onClick={() => {
              changeModalStatus('previewTag', false);
              changeModalStatus('editSiteTag', true);
            }}
          />
          <Icon
            style={{ width: '19px', height: '19px' }}
            className="icon-trash ms-2"
            onClick={() => {
              changeModalStatus('previewTag', false);
              changeModalStatus('deleteSiteTag', true);
            }}
          />
        </div>
      </div>
      <div className='body'>
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />
        {/* has custom image */}
        {
          userLevel === 'ntt-care' && (
            <img className={modalStyle['sitetag-custom-image']} src={updloadedSiteTagImg} alt='' />
          )
        }
        {/* No custom image */}
        {/* {
          userLevel === 'ntt-care' && (
            <img className={modalStyle['sitetag-image']} src={defaultSiteTagPhoto} alt='' />
          )
        } */}
      </div>
      <div className='footer non-border-top-footer'>
        <Button
          label='Close'
          className='btn-cancel'
          onClick={() => changeModalStatus('previewTag', false)}
        />
      </div>
    </ModalContainer >
  );
};

export default OrgTreePreviewSiteTag;
