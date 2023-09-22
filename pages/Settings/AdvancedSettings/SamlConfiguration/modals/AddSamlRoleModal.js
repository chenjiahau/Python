import samlConfigurationStyle from '../saml-configuration.module.scss';

import { Row, Col } from 'react-bootstrap';

// Components
import Input from '../../../../../components/Input';
import Button from '../../../../../components/Button';
import ModalContainer from '../../../../../components/ModalContainer';
import DropdownWithItem from '../../../../../components/DropdownWithItem';

const dropdownRoleList = [
  { title: 'Admin', isActive: true },
  { title: 'Editor', isActive: false },
  { title: 'Monitor', isActive: false },
  { title: 'Viewer', isActive: false },
];

const dropdownManagedSiteTagList = [
  { title: 'All sites', isActive: true },
  { title: 'Hsinchu', isActive: false },
  { title: 'Kaohsiung', isActive: false },
  { title: 'Taipei', isActive: false },
];

const dropdownManagedSiteList = [
  { title: 'All', isActive: true },
  { title: 'Daliao', isActive: false },
  { title: 'Dream Mail', isActive: false },
  { title: 'HQ', isActive: false },
  { title: 'Neihu', isActive: false },
  { title: 'Songshan', isActive: false },
];

const AddSamlRoleModal = props => {
  const { modalStatus, changeModalStatus } = props;
  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.add.status}
      closeModal={() => changeModalStatus('add', false)}
    >
      <div className="header">
        <div className="title">Add a SAML role</div>
      </div>
      <div className="body">
        {/* Name */}
        <div className="mb-3">
          <div className="modal-form-title required">Name</div>
          <Input
            type="text"
            value=""
            placeholder="1-64 Characters"
            minLength={1}
            maxLength={64}
            onChange={e => {}}
            onFocus={() => {}}
            onBlur={() => {}}
          />
        </div>

        {/* Access privilege */}
        <div className={'sub-title mb-3'}>Access privilege</div>
        <div className="mb-3">
          <div className="modal-form-title required">Role</div>
          <DropdownWithItem
            id="used-unused-dropdown"
            type="normal"
            selectedItem={dropdownRoleList[0]}
            itemList={dropdownRoleList}
            onClick={() => {}}
          />
        </div>
        <Row>
          <Col sm={6}>
            <div className={`mb-3 ${samlConfigurationStyle['modal-text']}`}>
              Access level
              <div
                className={samlConfigurationStyle['modal-access-level-label']}
              >
                Organization
              </div>
            </div>
          </Col>
          <Col sm={6}>
            <div className={`mb-3 ${samlConfigurationStyle['modal-text']}`}>
              <div style={{ marginTop: 18 }}></div>
              <div
                className={samlConfigurationStyle['modal-access-level-label']}
              >
                Org name
              </div>
            </div>
          </Col>
        </Row>

        <div>
          <div className="modal-form-title required">Managed site</div>
          <Row>
            <Col sm={6}>
              <DropdownWithItem
                id="managed-siteTag-dropdown"
                type="normal"
                selectedItem={dropdownManagedSiteTagList[0]}
                itemList={dropdownManagedSiteTagList}
                onClick={() => {}}
              />
            </Col>
            <Col sm={6}>
              <DropdownWithItem
                id="managed-site-dropdown"
                type="normal"
                selectedItem={dropdownManagedSiteList[0]}
                itemList={dropdownManagedSiteList}
                onClick={() => {}}
              />
            </Col>
          </Row>
        </div>
      </div>
      <div className="footer">
        <Button
          label="Close"
          className="btn-cancel"
          onClick={() => {
            console.log('click close');
            changeModalStatus('add', false);
          }}
        />
        <Button
          label="Save"
          className="btn-submit"
          onClick={() => {
            console.log('click save');
            changeModalStatus('add', false);
          }}
          disabled
        />
      </div>
    </ModalContainer>
  );
};

export default AddSamlRoleModal;
