import modalStyle from '../external-email-alert-settings-modal.module.scss';

// Packages
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Row, Col } from 'react-bootstrap';

// Components
import {
  Button,
  Input,
  ModalContainer,
  MessageBoxGroup,
  DropdownWithItem
} from 'components';

const defaultMessages = {
  success: null,
  error: null,
  warning: null
};

const defaultManagedTagSiteList = [
  {
    isActive: true,
    name: 'All sites',
    title: '299287797e',
    id: null,
    storeList: [
      {
        isActive: true,
        name: 'All',
        title: 'b1c94ca2fb',
        id: null
      },
      {
        isActive: false,
        name: 'Site 1',
        title: 'Site 1',
        id: 1
      },
      {
        isActive: false,
        name: 'Site 2',
        title: 'Site 2',
        id: 2
      },
      {
        isActive: false,
        name: 'Site 3',
        title: 'Site 3',
        id: 3
      }
    ]
  },
  {
    isActive: false,
    name: 'Tag 1',
    title: 'Tag 1',
    id: 1,
    storeList: [
      {
        isActive: true,
        name: 'All',
        title: 'b1c94ca2fb',
        id: 11
      },
      {
        isActive: false,
        name: 'Site 1',
        title: 'Site 1',
        id: 12
      }
    ]
  }
]

const AddUserModal = props => {
  const { t } = useTranslation();
  const { modalStatus, changeModalStatus } = props;
  const [messages, setMessages] = useState({ ...defaultMessages });

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.addUser.status}
      closeModal={() => changeModalStatus('addUser', false)}
    >
      <div className="header">
        {/* Add user */}
        <div className="title">{t(modalStatus.addUser.label)}</div>
      </div>

      <div className="body">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />

        {/* Name */}
        <div className="mb-2">
          <div className="modal-form-title required">{t('49ee308734')}</div>
          <div className="modal-form-field">
            <Input
              type="text"
              placeholder="1-64 characters"
              onChange={e => console.log(e.target.value)}
              onFocus={() => {}}
              onBlur={() => {}}
            />

          </div>
        </div>

        {/* Email address* */}
        <div className="mb-3">
          <div className="modal-form-title required">{t('b357b524e7')}</div>
          <div className="modal-form-field">
            <Input
              type="text"
              placeholder="1-128 characters"
              onChange={e => console.log(e.target.value)}
              onFocus={() => {}}
              onBlur={() => {}}
            />
            {/* Email addresses that are not verified in 24 hours will be automatically deleted. */}
            <span className='modal-form-prompt'>{t('bff248fdc4')}</span>
          </div>
        </div>
      </div>

      <div>
        <div className='form-title my-3'>{t('199e0bdbbb')}</div>
        <Row>
          <Col>
            <DropdownWithItem
              id='manage-tag-dropdown'
              type='normal'
              selectedItem={defaultManagedTagSiteList[0]}
              itemList={defaultManagedTagSiteList}
              dropDownMenuStyle={{ maxHeight: '300px', overflow: 'auto' }}
              onClick={item => {}}
            />
          </Col>
          <Col>
            <DropdownWithItem
              id='manage-site-dropdown'
              type='normal'
              selectedItem={defaultManagedTagSiteList[0].storeList[0]}
              itemList={defaultManagedTagSiteList[0].storeList}
              dropDownMenuStyle={{ maxHeight: '300px', overflow: 'auto' }}
              onClick={item => {}}
            />
          </Col>
        </Row>
      </div>

      <div className="footer">
        <Button
          label={t('4a53b84974')} // Close
          className="btn-cancel"
          onClick={() => changeModalStatus('addUser', false)}
        />
        <Button
          label={t('c1a36d6fe6')} // Save change
          className="btn-submit"
          onClick={() => changeModalStatus('addUser', false)}
        />
      </div>
    </ModalContainer>
  );
};

export default AddUserModal;
