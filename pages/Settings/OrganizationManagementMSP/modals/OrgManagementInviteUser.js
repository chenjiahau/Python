// css
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
import MessageBoxGroup from 'components/MessageBoxGroup';

const defaultPrivilegeList = [
  { title: 'Admin', isActive: true },
  { title: 'Editor', isActive: false },
  { title: 'Monitor', isActive: false },
  { title: 'Viewer', isActive: false },
];

const defaultAccessLevelList = [
  {
    title: 'MSP',
    orgList: [
      { title: 'MSP-1', isActive: true }
    ],
    isActive: true
  },
  {
    title: 'Organization',
    orgList: [
      { title: 'ORG-1', isActive: false },
      { title: 'ORG-2', isActive: false }
    ],
    isActive: false
  }
]

const defaultTagAndSiteList = [
  {
    title: 'All sites',
    siteList: [
      { title: 'All', isActive: true },
      { title: 'SITE-1', isActive: false }
    ],
    isActive: true
  },
  {
    title: 'TAG-1',
    siteList: [
      { title: 'All', isActive: false },
      { title: 'SITE-2', isActive: false },
      { title: 'SITE-3', isActive: false }
    ],
    isActive: false
  }
];

const defaultMessages = {
  success: null,
  error: null, //Device not found.
  warning: null,
};

const OrgManagementInviteUser = props => {
  const { modalStatus, changeModalStatus } = props;
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const { t } = useTranslation();
  const inviteUserType = modalStatus.inviteUserMSP.status ? 'inviteUserMSP' : 'inviteUserORG';
  const selectedAccessLevel = inviteUserType === 'inviteUserMSP' ? defaultAccessLevelList[0] : defaultAccessLevelList[1];

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus[inviteUserType].status}
      closeModal={() => changeModalStatus(inviteUserType, false)}
    >
      <div className='header'>
        <div className='title'>{t(modalStatus[inviteUserType].label)}</div> { /* Create organization */}
      </div>
      <div className={`body ${modalStyle['invite-user-container']}`}>
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />

        {/* Name */}
        <Row className="mb-2">
          <div className='modal-form-title required short-block-margin'>{t('49ee308734')}</div>
          <div className='modal-form-field'>
            <Input
              placeholder={t('9fa545e2cd')} // 1-64 Characters
              onChange={() => { }}
            />
          </div>
        </Row>

        {/* Email address */}
        <Row className="mb-4">
          <div className='modal-form-title required short-block-margin'>{t('b357b524e7')}</div>
          <div className='modal-form-field'>
            <Input
              placeholder={t('ca5977f4f2')} // 1-128 Characters
              onChange={() => { }}
            />
          </div>
          {/* This email is for logging into Nuclias and receiving ... */}
          <div className={modalStyle['email-hint']}>{t('9d537af410')}</div>
        </Row>

        {/* Access privilege */}
        <Row className="mb-2">
          <div className='modal-subtitle'>{t('8f1bd444d2')}</div>
        </Row>

        {/* Role */}
        <Row className="mb-2">
          <div className='modal-form-title required'>{t('727b677950')}</div>
          <div className='modal-form-field'>
            <DropdownWithItem
              id="privilege-term-dropdown"
              type="normal"
              selectedItem={defaultPrivilegeList[0]}
              itemList={defaultPrivilegeList}
              onClick={() => { }}
            />
          </div>
        </Row>

        {/* Access level */}
        <Row className="mb-2">
          <div className='modal-form-title required mt-2'>{t('de88250cdc')}</div>
        </Row>

        <Row className="mb-3">
          <Row>
            <Col>
              <div className='modal-form-field'>
                <DropdownWithItem
                  id="access-level-dropdown"
                  type="normal"
                  selectedItem={selectedAccessLevel}
                  itemList={defaultAccessLevelList}
                  onClick={() => { }}
                  disabled
                />
              </div>
            </Col>
            <Col>
              <DropdownWithItem
                id="access-level-sub-dropdown"
                type="normal"
                selectedItem={selectedAccessLevel.orgList[0]}
                itemList={selectedAccessLevel.orgList}
                onClick={() => { }}
                disabled
              />
            </Col>
          </Row>
        </Row>

        {
          inviteUserType === 'inviteUserMSP' &&
          <>
            {/* Managed organization */}
            <Row className='mb-2'>
              <div className='form-title'>{t('31de740e0b')}</div>
              {/* All */}
              {t('b1c94ca2fb')}
            </Row>
          </>
        }

        {
          inviteUserType === 'inviteUserORG' &&
          <>
            <Row className='mb-2'>
              {/* Managed site */}
              <div className='form-title short-block-margin'>{t('199e0bdbbb')}</div>
              <Row>
                <Col>
                  <DropdownWithItem
                    id="manage-tag-dropdown"
                    type="normal"
                    selectedItem={defaultTagAndSiteList[0]}
                    itemList={defaultTagAndSiteList}
                    onClick={() => { }}
                  />
                </Col>
                <Col>
                  <DropdownWithItem
                    id="manage-site-dropdown"
                    type="normal"
                    selectedItem={defaultTagAndSiteList[0].siteList[0]}
                    itemList={defaultTagAndSiteList[0].siteList}
                    onClick={() => { }}
                  />
                </Col>
              </Row>
            </Row>
          </>
        }
      </div>

      <div className='footer'>
        <Button
          label='Close'
          className='btn-cancel'
          onClick={() => changeModalStatus(inviteUserType, false)}
        />
        <Button
          label='Submit'
          className='btn-submit'
          onClick={() => { }}
        />
      </div>
    </ModalContainer>
  );
};

export default OrgManagementInviteUser;
