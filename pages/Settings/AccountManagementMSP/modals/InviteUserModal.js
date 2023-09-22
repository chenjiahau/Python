import accountManagementStyle from '../account-management.module.css';

import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// Components
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import ModalContainer from '../../../../components/ModalContainer';
import DropdownWithItem from '../../../../components/DropdownWithItem';
import MessageBoxGroup from '../../../../components/MessageBoxGroup';


const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const dropdownAccessRoleList = [
  { title: 'Admin', isActive: true },
  { title: 'Editor', isActive: false },
  { title: 'Monitor', isActive: false },
  { title: 'Viewer', isActive: false },
];

const dropdownAccessLevelList = [
  { title: 'MSP', isActive: true },
  { title: 'Site tag', isActive: false },
  { title: 'Site', isActive: false },
];

const dropdownAccessLevelNameList = [
  { title: 'D-Link', isActive: true },
];

const dropdownManagedSiteTagList = [
  { title: 'ALL sites', isActive: true },
  { title: 'D-Link QA', isActive: false },
  { title: 'Starbucks', isActive: false },
  { title: 'CHT', isActive: false },
  { title: 'FET', isActive: false },
];

const dropdownManagedSiteList = [
  { title: 'All', isActive: true },
  { title: 'Daliao', isActive: false },
  { title: 'Dream Mall', isActive: false },
  { title: 'HQ', isActive: false },
  { title: 'Neihu', isActive: false },
  { title: 'Neiwan', isActive: false },
  { title: 'Songshan', isActive: false },
  { title: 'Test', isActive: false },
  { title: 'Zhongzheng', isActive: false },
  { title: 'Zhudong', isActive: false },
  { title: 'Zhuzhong', isActive: false },
  { title: 'Zouying', isActive: false },
];

const InviteUserModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const [messages, setMessages] = useState({ ...defaultMessages });

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.inviteUser.status}
      closeModal={() => changeModalStatus('inviteUser', false)}
    >
      <div className="header">
        <div className="title">Invite user</div>
      </div>
      <div className="body">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
        {/* Name */}
        <Row className="mb-2">
          <div className="modal-form-title required short-block-margin">Name</div>
          <div className="modal-form-field">
            <Input
              type="text"
              placeholder="1-64 characters"
              onChange={e => {
                console.log(e.target.value);
              }}
              onFocus={() => { }}
              onBlur={() => { }}
            />

          </div>
        </Row>
        {/* Email address* */}
        <Row className="mb-4">
          <div className="modal-form-title required short-block-margin">Email address</div>
          <div className="modal-form-field">
            <Input
              type="text"
              placeholder="1-128 characters"
              onChange={e => {
                console.log(e.target.value);
              }}
              onFocus={() => { }}
              onBlur={() => { }}
            />
            <span className='modal-form-prompt'>
              This email is for logging into Nuclias and receiving updates and notifications.
            </span>
          </div>
        </Row>

        {/* Access privilege */}
        <Row className="mb-2">
          <div className="modal-subtitle">Access privilege</div>
        </Row>
        <Row className="mb-2">
          <div className="modal-form-title required short-block-margin">Role</div>
          <div className="modal-form-field">
            <DropdownWithItem
              id="used-unused-dropdown"
              type="normal"
              selectedItem={dropdownAccessRoleList[0]}
              itemList={dropdownAccessRoleList}
              onClick={() => { }}
            />
          </div>
        </Row>
        <Row className="mb-2">
          <div className="modal-form-field">
            <Row className="mt-2">
              <Col>
                <div className="modal-form-title required short-block-margin">Access level</div>
                <DropdownWithItem
                  id="license-term-dropdown"
                  type="normal"
                  selectedItem={dropdownAccessLevelList[0]}
                  itemList={dropdownAccessLevelList}
                  onClick={() => { }}
                  disabled={true}
                />
              </Col>
              <Col>
                <div className="modal-form-title">&nbsp;</div>
                <DropdownWithItem
                  id="license-term-dropdown"
                  type="normal"
                  selectedItem={dropdownAccessLevelNameList[0]}
                  itemList={dropdownAccessLevelNameList}
                  disabled={true}
                  onClick={() => {}}
                />
              </Col>
              {/* <Col className='modal-form-align-center'>
                <div className="modal-form-title">&nbsp;</div>
                <div> sp </div>
              </Col> */}
            </Row>
          </div>
        </Row>
        <Row className="mb-2">
          <div className="modal-form-field">
            <Row className="mt-2">
              <Col>
                <div className="modal-form-title required short-block-margin">Managed site</div>
                All
              </Col>
              <Col>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
      <div className="footer">
        <Button
          label="Close"
          className="btn-cancel"
          onClick={() => {
            console.log('click Close');
            changeModalStatus('inviteUser', false);
          }}
        />
        <Button
          label="Submit"
          className="btn-submit"
          onClick={() => {
            console.log('click save');
            changeModalStatus('inviteUser', false);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default InviteUserModal;
