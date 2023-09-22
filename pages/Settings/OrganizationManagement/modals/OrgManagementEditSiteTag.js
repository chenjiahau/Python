// css
import modalStyle from '../org-management-modal.module.scss';

import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

// Slice
import { selectUserLevel } from 'stores/slice/user';

// Component
import {
  Input, Button, ModalContainer, DropdownWithItem, MessageBoxGroup,
  DragAndDropImgContianer
} from 'components';

const defaultSiteTagList = [
  { title: 'None', isActive: true },
  { title: 'Tag1', isActive: false },
  { title: 'Tag2', isActive: false }
];

const defaultMessages = {
  success: null,
  error: null, //'Device not found.'
  warning: null,
};

const OrgManagementEditSiteTag = props => {
  const { modalStatus, changeModalStatus } = props;
  const { t } = useTranslation();

  // State
  const userLevel = useSelector(selectUserLevel) || localStorage.getItem('userLevel');
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));

  // Variable
  const nuclias = (
    <Row>
      <Col>
        {/* Tag name */}
        <div className='modal-form-title required short-block-margin'>{t('ce3f497740')}</div>
        <div className='modal-form-field'>
          <Input
            placeholder={t('7563cde047')} // 1-64 Characters
            onChange={e => { }}
          />
        </div>
      </Col>
      <Col>
        {/* Parent tag */}
        <div className='modal-form-title short-block-margin'>{t('74542af02a')}</div>
        <div className='modal-form-field'>
          <DropdownWithItem
            id="site-tag-dropdown"
            type="normal"
            selectedItem={defaultSiteTagList[0]}
            itemList={defaultSiteTagList}
            onClick={() => { }}
          />
        </div>
      </Col>
    </Row>
  )

  const nttcare = (
    <Row>
      <Col>
        <DragAndDropImgContianer
          accept='image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/tiff, image/webp'
          onDrag={params => console.log('return uploaded result - ', params)}
          title='Upload site tag image'
        />
        <div className={modalStyle['upload-image-hint']}>{t('a1ae998c44')}</div>
      </Col>
      <Col>
        <Col className='mb-2'>
          {/* Tag name */}
          <div className='modal-form-title required short-block-margin'>{t('ce3f497740')}</div>
          <div className='modal-form-field'>
            <Input
              placeholder={t('7563cde047')} // 1-64 Characters
              onChange={e => { }}
            />
          </div>
        </Col>
        <Col className='mb-2'>
          {/* Parent tag */}
          <div className='modal-form-title short-block-margin'>{t('74542af02a')}</div>
          <div className='modal-form-field'>
            <DropdownWithItem
              id="site-tag-dropdown"
              type="normal"
              selectedItem={defaultSiteTagList[0]}
              itemList={defaultSiteTagList}
              onClick={() => { }}
            />
          </div>
        </Col>
        <Col className='mb-2'>
          {/* Regional Manager's Name */}
          <div className='modal-form-title required short-block-margin required'>Regional Manager's Name</div>
          <div className='modal-form-field'>
            <Input
              placeholder={t('9fa545e2cd')} // 1-64 Characters
              onChange={() => { }}
            />
          </div>
        </Col>
        <Col>
          {/* Regional Manager's Phone Number*/}
          <div
            className='modal-form-title required short-block-margin'
            style={{ height: 'auto' }}
          >
            Regional Manager's Phone Number
          </div>
          <div className='modal-form-field'>
            <Input
              placeholder={t('284ac11dab')} // 1-32 Characters
              onChange={() => { }}
            />
          </div>
        </Col>
      </Col>
    </Row>
  )

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editSiteTag.status}
      closeModal={() => changeModalStatus('editSiteTag', false)}
    >
      <div className='header'>
        <div className='title'>{t(modalStatus.editSiteTag.label)}</div>
      </div>
      <div className={`body ${modalStyle['create-site-tag-container']}`}>
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />
        {nuclias}
        {/* {userLevel === 'nuclias' && nuclias}
        {userLevel === 'ntt-care' && nttcare} */}

        {/* The site tag you create will be a sub tag of the selected parent tag... */}
        <div
          className={`${modalStyle['site-tag-hint']} mt-3`}>{t('b8f44cfa07')}
        </div>
      </div>
      <div className='footer'>
        <Button
          label='Close'
          className='btn-cancel'
          onClick={() => changeModalStatus('editSiteTag', false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => { }}
        />
      </div>
    </ModalContainer>
  );
};

export default OrgManagementEditSiteTag;
