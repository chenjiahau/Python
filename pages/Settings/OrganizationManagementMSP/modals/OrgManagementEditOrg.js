import modalStyle from '../org-management-modal.module.scss';

import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Components
import Input from 'components/Input';
import Button from 'components/Button';
import ModalContainer from 'components/ModalContainer';
import DropdownWithItem from 'components/DropdownWithItem';
import DragAndDropImgContianer from 'components/DragAndDropImgContianer';
import MessageBoxGroup from 'components/MessageBoxGroup';

const defaultOrgList = [
  { title: 'MSP', isActive: true },
  { title: 'Organization', isActive: false }
];

const defaultCountryList = [
  { title: 'Afghanistan', isActive: true },
  { title: 'Aland Islands', isActive: false },
  { title: 'Albania', isActive: false },
  { title: 'Algeria', isActive: false }
]

const defaultMessages = {
  success: null, //Successfully
  error: null, //Device not found.
  warning: null,
};

const OrgManagementEditOrg = props => {
  const { modalStatus, changeModalStatus } = props;
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const { t } = useTranslation();
  const statusType = modalStatus.editMsp && modalStatus.editMsp.status ? 'editMsp' : 'editOrg';

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus[statusType].status}
      closeModal={() => changeModalStatus(statusType, false)}
    >
      <div className='header'>
        <div className='title'>{t(modalStatus[statusType].label)}</div> {/* Edit xxxxx */}
      </div>
      <div className={`body ${modalStyle['create-org-container']}`}>
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />
        <Row className='mb-4'>
          <Col>
            <DragAndDropImgContianer
              accept='image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/tiff, image/webp'
              onDrag={params => console.log('return uploaded result - ', params)}
            />
            <div className={modalStyle['upload-image-hint']}>{t('a1ae998c44')}</div>
          </Col>
          <Col>
            <Row>
              {/* Organization name */}
              <div className='modal-form-title required small-block-margin'>{t('05cb2cca01')}</div>
              <div className='modal-form-field'>
                <Input
                  placeholder={t('7563cde047')} // 1-64 Characters
                  autoComplete='automatic-logout-time-limit'
                  onChange={e => { }}
                />
              </div>
            </Row>
          </Col>
        </Row>
        <Row className="mb-2">
          {/* Contact information */}
          <div className='modal-subtitle'>{t('7b30c410c4')}</div>
        </Row>
        <Row>
          <Col>
            <Row className='mb-2'>
              {/* Name */}
              <div className='modal-form-title small-block-margin'>{t('49ee308734')}</div>
              <div className='modal-form-field'>
                <Input
                  placeholder={t('7563cde047')} // 1-64 Characters
                  autoComplete='automatic-logout-time-limit'
                  onChange={e => { }}
                />
              </div>
            </Row>
          </Col>
          <Col>
            <Row>
              {/* Phone */}
              <div className='modal-form-title small-block-margin'>{t('bcc254b55c')}</div>
              <div className='modal-form-field'>
                <Input
                  placeholder={t('284ac11dab')} // 1-32 Characters
                  autoComplete='automatic-logout-time-limit'
                  onChange={e => { }}
                />
              </div>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              {/* Email address */}
              <div className='modal-form-title small-block-margin'>{t('b357b524e7')}</div>
              <div className='modal-form-field'>
                <Input
                  placeholder={t('ca5977f4f2')} // 1-128 Characters
                  autoComplete='automatic-logout-time-limit'
                  onChange={e => { }}
                />
              </div>
            </Row>
          </Col>
        </Row>
      </div>
      <div className='footer'>
        <Button
          label='Close'
          className='btn-cancel'
          onClick={() => changeModalStatus(statusType, false)}
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

export default OrgManagementEditOrg;
