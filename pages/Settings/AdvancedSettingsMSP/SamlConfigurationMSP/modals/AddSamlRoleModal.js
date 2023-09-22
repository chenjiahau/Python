import samlConfigurationStyle from '../saml-configuration.module.scss';

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

const dropdownManagedOrganizationList = [{ title: 'All', isActive: true }];

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
        <div className={`mb-3 ${samlConfigurationStyle['modal-text']}`}>
          Access level
          <div className={samlConfigurationStyle['modal-access-level-label']}>
            MSP
          </div>
        </div>
        <div>
          <div className="modal-form-title required">Managed Organization</div>
          <DropdownWithItem
            id="managed-organization-dropdown"
            type="normal"
            selectedItem={dropdownManagedOrganizationList[0]}
            itemList={dropdownManagedOrganizationList}
            onClick={() => {}}
            disabled
          />
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
