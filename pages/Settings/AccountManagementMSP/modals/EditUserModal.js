import accountManagementStyle from '../account-management.module.css';

import { Row, Col } from 'react-bootstrap';

// Components
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import ModalContainer from '../../../../components/ModalContainer';
import DropdownWithItem from '../../../../components/DropdownWithItem';

const dropdownAccessRoleList = [
  { title: 'Admin', isActive: true },
  { title: 'Editor', isActive: false },
  { title: 'Monitor', isActive: false },
  { title: 'Viewer', isActive: false },
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

const EditUserModal = props => {
  const { modalStatus, changeModalStatus } = props;

  return (
    <ModalContainer
      modalWidthType="modal-400px"
      openModal={modalStatus.edit.status}
      closeModal={() => changeModalStatus('inviteUser', false)}
    >
      <div className="header">
        <div className="title">Edit User</div>
      </div>
      <div className="body">
        {/* Name */}
        <Row className="mb-2">
          <div className="modal-form-title required short-block-margin">Name</div>
          <div className="modal-form-field">
            <Input
              type="text"
              placeholder="1-64 characters"
              value="D-Link"
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
            dlink@dlinkcorp.com
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
              disabled={true}
            />
          </div>
        </Row>
        <Row className="mb-2">
          <div className="modal-form-field">
            <Row className="mt-2">
              <Col>
                <div className="modal-form-title required short-block-margin">Access level</div>
                MSP
              </Col>
              <Col>
                <div className="modal-form-title">&nbsp;</div>
                D-Link
              </Col>
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
          label="Save change"
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

export default EditUserModal;
