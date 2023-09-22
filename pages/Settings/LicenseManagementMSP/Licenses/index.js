import licensesStyle from './licenses.module.scss';
import leftButtonGroupStyle from './licenses-left-button-group.module.scss';
import licensesModalStyle from './licenses-modal.module.scss';

import { useState, useCallback } from 'react';
import { Container, Row, Col, Table, ButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Components
import Button from '../../../../components/Button';
import Checkbox from '../../../../components/Checkbox';
import MessageBox from '../../../../components/MessageBox';
import InlineTitle from '../../../../components/InlineTitle';
import LinkerWithA from '../../../../components/LinkerWithA';
import TooltipDialog from '../../../../components/TooltipDialog';
import ModalContainer from '../../../../components/ModalContainer';
import DropdownWithItem from '../../../../components/DropdownWithItem';
import InputWithIconButton from '../../../../components/InputWithIconButton';
import PaginationContainer from '../../../../components/PaginationContainer';
import DropdownWithAdvancedSearch from '../../../../components/DropdownWithAdvancedSearch';
import RadioButton from '../../../../components/RadioButton';
import Input from '../../../../components/Input';
import Icon from '../../../../components/Icon';
import ButtonWithIcon from '../../../../components/ButtonWithIcon';
import InputWithUploadButton from '../../../../components/InputWithUploadButton';
import ConfirmationModalContainer from '../../../../components/ConfirmationModalContainer';
import ResultModalContainer from '../../../../components/ResultModalContainer';
import DropdownWithCheckbox from '../../../../components/DropdownWithCheckbox';

const dropdownLicenseTypeList = [
  { title: 'All', isActive: true },
  { title: 'Unused', isActive: false },
  { title: 'Used', isActive: false },
];

const dropdownStatusList = [
  { title: 'All', isActive: true },
  { title: 'Active', isActive: false },
  { title: 'Inactive', isActive: false },
  { title: 'Suspended', isActive: false },
];

const dropdownLicenseDeviceTypeList = [
  { title: 'All', isActive: true },
  { title: 'Access point', isActive: false },
  { title: 'Switch', isActive: false },
  { title: 'Gateway', isActive: false },
];

const dropdownExpirationDateList = [
  { title: 'All', isActive: true },
  { title: 'Expires in 1 day', isActive: false },
  { title: 'Expires in 7 days', isActive: false },
  { title: 'Expires in 14 days', isActive: false },
  { title: 'Expires in 30 days', isActive: false },
  { title: 'Expires in 60 days', isActive: false },
];

const dropdownLicenseTermList = [
  { title: '1 month' },
  { title: '1 year' },
  { title: '2 years' },
  { title: '3 years' },
  { title: '4 years' },
  { title: '5 years' },
  { title: '7 years' },
];

const dropdownOrgList = [
  { title: 'org-1' },
  { title: 'org-2' },
  { title: 'org-3' },
  { title: 'org-4' },
  { title: 'org-5' },
];

const dropdownLicenseKeyList = [
  { title: 'LICDBG000000000001', suffix: '34 days', checked: false },
  { title: 'LICDBG000000000002', suffix: '312 days', checked: false },
  { title: 'LICDBG000000000003', suffix: '1300 days', checked: false },
  { title: 'LICDBG000000000004', suffix: '310 days', checked: false },
  { title: 'LICDBG000000000005', suffix: '123 days', checked: false },
];

const defaultModalStatus = {
  assignTo: {
    status: false,
    disabled: false,
  },
  addLicense: {
    status: false,
    disabled: false,
  },
  revoke: {
    status: false,
    disabled: false,
  },
  suspend: {
    status: false,
    disabled: false,
  },
  resume: {
    status: false,
    disabled: false,
  },
  result: {
    status: false,
    disabled: false,
  },
};

const defaultAssignModalStatus = {
  selectedLicense: {
    checked: true,
  },
  inactiveLicense: {
    checked: false,
  },
  activeLicense: {
    checked: false,
  },
};

const fakeResultsThList = ['ec53a8c4f0', '5d5c4ad5db', '3ec365dd53']; // Status, License key, Details

const fakeResults = [
  {
    requriedStatusType: 'success',
    status: '30ae8fff88', // Success
    target: 'LICDBG000000000001',
    details: '263c0d8725', // Successfully
  },
  {
    requriedStatusType: 'error',
    status: 'd7c8c85bf7', // Failed
    target: 'LICDBG000000000002',
    details: '59ad6a86d2' // This license key already exists. Please check and try again.
  },
];

const LicenseOverviewContainer = () => {
  return (
    <Container className={licensesStyle['devices-overview-container']}>
      <Row>
        <Col className={licensesStyle['devices-status-container']}>
          <div className={licensesStyle['sub-status-container']}>
            <div className={licensesStyle['number-container']}>
              <div className={licensesStyle['number-title']}>
                Expiring in next 60 days
              </div>
              <a href="#/" className={licensesStyle['number-count']}>
                112
              </a>
            </div>
          </div>

          <div className={licensesStyle['sub-status-container']}>
            <div className={licensesStyle['number-container']}>
              <div className={licensesStyle['number-title']}>Used licenses</div>
              <a href="#/" className={licensesStyle['number-count']}>
                695
              </a>
            </div>
          </div>

          <div className={licensesStyle['sub-status-container']}>
            <div className={licensesStyle['number-container']}>
              <div className={licensesStyle['number-title']}>
                Unused / Inactive licenses
              </div>
              <a href="#/" className={licensesStyle['number-count']}>
                10
              </a>
            </div>
          </div>

          <div className={licensesStyle['sub-status-container']}>
            <div className={licensesStyle['number-container']}>
              <div className={licensesStyle['number-title']}>
                Unused / Active licenses
              </div>
              <a href="#/" className={licensesStyle['number-count']}>
                15
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const LeftButtonGroup = props => {
  const { modalStatus, changeModalStatus } = props;

  return (
    <div
      className={`d-flex justify-content-between ${leftButtonGroupStyle['left-button-group-contianer']}`}
    >
      <ButtonGroup>
        <Button
          label="Assign to"
          disabled={modalStatus.assignTo.disabled}
          onClick={() => changeModalStatus('assignTo', true)}
        ></Button>
        <Button
          label="Add licenses"
          disabled={modalStatus.addLicense.disabled}
          onClick={() => changeModalStatus('addLicense', true)}
        ></Button>
        <Button
          label="Revoke"
          disabled={modalStatus.revoke.disabled}
          onClick={() => changeModalStatus('revoke', true)}
        ></Button>
        <Button
          label="Suspend"
          disabled={modalStatus.suspend.disabled}
          onClick={() => changeModalStatus('suspend', true)}
        ></Button>
        <Button
          label="Resume"
          disabled={modalStatus.resume.disabled}
          onClick={() => changeModalStatus('resume', true)}
        ></Button>
      </ButtonGroup>
    </div>
  );
};

const LicensesToolbarBox = props => {
  const { changeMessages, changeOpenGenerateModalStatus } = props;
  const navigation = useNavigate();

  return (
    <InlineTitle isNonUnderline>
      <Button
        label="License History"
        className="btn-grey"
        onClick={() => navigation('/cloud/settings/license/history')}
      />

      <DropdownWithAdvancedSearch
        value={''}
        alignEnd={true}
        dataBsToggleOnButton={true}
        dropdownMenuStyle={{ minWidth: 371 }}
        onChange={e => console.log(e.target.value)}
      >
        <li>
          <div className="form-title">License type :</div>
          <DropdownWithItem
            id="status-dropdown"
            type="normal"
            selectedItem={dropdownLicenseTypeList[0]}
            itemList={dropdownLicenseTypeList}
            onClick={() => { }}
          />
        </li>
        <li className="mt-2">
          <div className="form-title">Status :</div>
          <DropdownWithItem
            id="status-dropdown"
            type="normal"
            selectedItem={dropdownStatusList[0]}
            itemList={dropdownStatusList}
            onClick={() => { }}
          />
        </li>
        <li className="mt-2">
          <div className="form-title">License device type :</div>
          <DropdownWithItem
            id="status-dropdown"
            type="normal"
            selectedItem={dropdownLicenseDeviceTypeList[0]}
            itemList={dropdownLicenseDeviceTypeList}
            onClick={() => { }}
          />
        </li>
        <li className="mt-2">
          <div className="form-title">License key :</div>
          <InputWithIconButton
            type="search"
            placeholder="Search"
            autoComplete="msp-search"
            buttonClassName="icon-search-enter"
            onChange={e => console.log(e.target.value)}
            onFocus={() => console.log('Focus on icon button')}
            onBlur={() => console.log('Blur on icon button')}
            buttonOnClick={e => {
              e.stopPropagation();
              console.log('Click on icon button');
            }}
          />
        </li>
        <li className="mt-2">
          <div className="form-title">Organization :</div>
          <div className={licensesStyle['advanced-select-org-container']}>
            <DropdownWithAdvancedSearch
              value={''}
              buttonIcon={'enter'}
              dataBsToggleOnInput={true}
              onChange={e => console.log(e.target.value)}
            >
              <div className={licensesStyle['more-org']}>
                <div className={licensesStyle['show-more-info']}>
                  Showing first 10 of total 116 organizations.
                </div>
                <LinkerWithA
                  label="more"
                  href="#"
                  className="linker-blue show-more text-decoration-underline"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Click on more');
                  }}
                ></LinkerWithA>
              </div>
              {dropdownOrgList.map((org, index) => {
                return (
                  <li key={index} className="search-org-item">
                    {org.title}
                  </li>
                );
              })}
            </DropdownWithAdvancedSearch>
          </div>
        </li>
        <li className="mt-2">
          <div className="form-title">Expiration date :</div>
          <DropdownWithItem
            id="status-dropdown"
            type="normal"
            selectedItem={dropdownExpirationDateList[0]}
            itemList={dropdownExpirationDateList}
            onClick={() => { }}
          />
        </li>
      </DropdownWithAdvancedSearch>

      <Button
        label="Generate"
        className="btn-grey"
        onClick={() => changeOpenGenerateModalStatus(true)}
      />

      <Button
        label="Download"
        className="btn-grey"
        onClick={() => {
          console.log('Click on download');
          changeMessages({
            error: 'Please click generate to prepare the list to download.',
          });
        }}
      />

      <TooltipDialog
        placement="left"
        title="Click Generate to prepare the file to download. It may take few minutes to generate the file. You will receive an email from the Nuclias Cloud team once the file is ready to download."
      ></TooltipDialog>
    </InlineTitle>
  );
};

const GenerateModal = ({
  messages,
  isOpenGenerateModal,
  changeMessages,
  changeOpenGenerateModalStatus,
}) => {
  const [isFirstClickedYesBtn, setIsFirstClickedYesBtn] = useState(true);

  const handleClickYes = () => {
    console.log('Click on yes');

    if (isFirstClickedYesBtn) {
      changeMessages({
        generateError:
          "The file is still being generating. You will receive an email once it's ready to download.",
      });
    } else {
      changeOpenGenerateModalStatus(false);
    }
  };

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={isOpenGenerateModal}
      closeModal={() => changeOpenGenerateModalStatus(false)}
    >
      <div className="header">
        <div className="title">Generate inventory list</div>
      </div>
      <div className="body">
        <MessageBox
          show={!!messages.generateError}
          label={messages.generateError}
          variant="danger"
          dismissible
          onClose={() => {
            setIsFirstClickedYesBtn(false);
            changeMessages({
              generateError: null,
            });
          }}
        />

        <div className="mb-1">Do you want to generate the inventory list?</div>
        <div className="mb-1">
          You will receive an email to inform you the inventory list is ready
          for download after few minutes.
        </div>
      </div>
      <div className='footer'>
        <Button
          label="Cancel"
          className="btn-cancel"
          onClick={() => changeOpenGenerateModalStatus(false)}
        />
        <Button
          label="Yes"
          className="btn-submit"
          onClick={() => handleClickYes()}
        />
      </div>
    </ModalContainer>
  );
};

const AssignToModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const [assignToMode, setAssignToMode] = useState({
    ...defaultAssignModalStatus,
  });
  const changeAssignToMode = useCallback(type => {
    const tmpAssignToMode = { ...assignToMode };
    Object.keys(tmpAssignToMode).forEach(
      key => (tmpAssignToMode[key].checked = false)
    );
    tmpAssignToMode[type].checked = true;
    setAssignToMode(tmpAssignToMode);
  }, []);

  return (
    <div className={licensesModalStyle['assign-to-modal']}>
      <ModalContainer
        modalWidthType="modal-500px"
        openModal={modalStatus.assignTo.status}
        closeModal={() => changeModalStatus('assignTo', false)}
      >
        <div className="header">
          <div className="title">Assign license key to the organization</div>
        </div>
        <div className="body">
          {/* Assign selected license keys */}
          <div>
            <div className="modal-form-title d-inline-flex">
              <RadioButton
                id="selectedLicense"
                name="selectedLicense"
                label="Assign selected license keys"
                checked={assignToMode.selectedLicense.checked}
                labelClassName="form-title"
                onChange={() => changeAssignToMode('selectedLicense')}
              />
              <TooltipDialog
                className="ms-2"
                placement="right"
                title="The selected unused/used license keys will be assigned to the selected organization for your future use."
              ></TooltipDialog>
            </div>
          </div>

          {/* Assign selected license keys content */}
          <div
            className={`mb-1 ${licensesModalStyle['sub-content-container']} ${assignToMode.selectedLicense.checked ? 'd-block' : 'd-none'
              }`}
          >
            <div className={licensesModalStyle['selected-license-key-content']}>
              <div className="modal-form-title required">Organization</div>
              <DropdownWithAdvancedSearch
                type={'search'}
                value={''}
                buttonIcon={'enter'}
                dataBsToggleOnInput={true}
                onChange={e => console.log(e.target.value)}
              >
                <div className="more-org">
                  <div className="show-more-info">
                    Showing first 10 of total 116 organizations.
                  </div>
                  <LinkerWithA
                    label="more"
                    href="#"
                    className="linker-blue show-more text-decoration-underline"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Click on more');
                    }}
                  ></LinkerWithA>
                </div>
                {dropdownOrgList.map((org, index) => {
                  return (
                    <li key={index} className="search-org-item">
                      {org.title}
                    </li>
                  );
                })}
              </DropdownWithAdvancedSearch>
            </div>
          </div>

          {/* Inactive license keys */}
          <div className="mt-3">
            <div className="modal-form-title d-inline-flex">
              <RadioButton
                id="inactiveLicense"
                name="inactiveLicense"
                label="Inactive license keys"
                checked={assignToMode.inactiveLicense.checked}
                labelClassName="form-title"
                onChange={() => changeAssignToMode('inactiveLicense')}
              />
              <TooltipDialog
                className="ms-2"
                placement="right"
                title="You may assign the specific term and q'ty of license keys to the assigned organization."
              ></TooltipDialog>
            </div>
          </div>

          {/* Inactive license keys content */}
          <div
            className={`mb-1 ${licensesModalStyle['sub-content-container']} ${!!assignToMode.inactiveLicense.checked ? 'd-block' : 'd-none'
              }`}
          >
            <div className={licensesModalStyle['inactive-license-key-content']}>
              <div className="modal-form-title required">Organization</div>
              <DropdownWithAdvancedSearch
                type={'search'}
                value={''}
                buttonIcon={'enter'}
                dataBsToggleOnInput={true}
                onChange={e => console.log(e.target.value)}
              >
                <div className="more-org">
                  <div className="show-more-info">
                    Showing first 10 of total 116 organizations.
                  </div>
                  <LinkerWithA
                    label="more"
                    href="#"
                    className="linker-blue show-more text-decoration-underline"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      console.log('Click on more');
                    }}
                  ></LinkerWithA>
                </div>
                {dropdownOrgList.map((org, index) => {
                  return (
                    <li key={index} className="search-org-item">
                      {org.title}
                    </li>
                  );
                })}
              </DropdownWithAdvancedSearch>
            </div>

            <div className="mt-3">
              <span className="modal-form-title">Auto-assign license</span>
              <span className="ms-1">
                <TooltipDialog
                  className="ms-2"
                  placement="right"
                  title="The license keys will be automatically assigned to the selected organization for your future use."
                ></TooltipDialog>
              </span>
            </div>

            <Row className="mt-3">
              <Col>
                <div className="modal-form-title">License terms</div>
                <DropdownWithItem
                  id="license-term-dropdown"
                  type="normal"
                  selectedItem={dropdownLicenseTermList[0]}
                  itemList={dropdownLicenseTermList}
                  onClick={() => { }}
                />
              </Col>
              <Col>
                <div className="modal-form-title">Q'ty</div>
                <Input
                  type="text"
                  value="0"
                  onChange={() => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
                <div>0 inactive license</div>
              </Col>
            </Row>
          </div>

          {/* Active license keys */}
          <div className="mt-3">
            <div className="modal-form-title d-inline-flex">
              <RadioButton
                id="activeLicense"
                name="activeLicense"
                label="Active license keys"
                checked={assignToMode.activeLicense.checked}
                labelClassName="form-title"
                onChange={() => changeAssignToMode('activeLicense')}
              />
              <TooltipDialog
                className="ms-2"
                placement="right"
                title="You may select multiple used license keys to selected organization."
              ></TooltipDialog>
            </div>
          </div>

          {/* Active license keys content */}
          <div
            className={`mb-1 ${licensesModalStyle['sub-content-container']} ${assignToMode.activeLicense.checked ? 'd-block' : 'd-none'
              }`}
          >
            <Row>
              <Col>
                <div
                  className={licensesModalStyle['active-license-key-content']}
                >
                  <div className="modal-form-title required">Organization</div>
                  <DropdownWithAdvancedSearch
                    type={'search'}
                    value={''}
                    buttonIcon={'enter'}
                    dataBsToggleOnInput={true}
                    onChange={e => console.log(e.target.value)}
                  >
                    <div className="more-org">
                      <div
                        className="show-more-info"
                        style={{ width: '255px' }}
                      >
                        Showing first 10 of total 116 organizations.
                      </div>
                      <LinkerWithA
                        label="more"
                        href="#"
                        className="linker-blue show-more text-decoration-underline ps-2"
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          console.log('Click on more');
                        }}
                      ></LinkerWithA>
                    </div>
                    {dropdownOrgList.map((org, index) => {
                      return (
                        <li
                          key={index}
                          className="search-org-item"
                          onClick={() => console.log('org', org)}
                        >
                          {org.title}
                        </li>
                      );
                    })}
                  </DropdownWithAdvancedSearch>
                </div>
              </Col>

              <Col>
                <div className="modal-form-title required">License keys</div>
                <DropdownWithCheckbox
                  id="license-key-dropdown"
                  type="checkbox"
                  itemList={dropdownLicenseKeyList}
                  onChange={item => {
                    console.log('item', item);
                  }}
                />
              </Col>
            </Row>
          </div>
        </div>

        <div className='footer'>
          <Button
            label="Cancel"
            className="btn-cancel"
            disabled={false}
            onClick={() => changeModalStatus('assignTo', false)}
          />
          <Button
            label={
              assignToMode === 'existing'
                ? 'Add to existing'
                : 'Create organization and add'
            }
            className="btn-submit"
            disabled={false}
            onClick={() => { }}
          />
        </div>
      </ModalContainer>
    </div>
  );
};

const AddLicenseModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const [addLicenseMode, setAddLicenseMode] = useState('add');

  return (
    <div className={licensesModalStyle['add-licenses-modal']}>
      <ModalContainer
        modalWidthType="modal-500px"
        openModal={modalStatus.addLicense.status}
        closeModal={() => changeModalStatus('addLicense', false)}
      >
        <div className="header">
          <div className="title">Add license keys</div>
        </div>
        <div className="body">
          {/* Add licenses */}
          <div>
            <div className="modal-form-title">
              <RadioButton
                id="AddLicenseKeys"
                name="AddLicenseKeys"
                label="Add license keys"
                checked={addLicenseMode === 'add'}
                labelClassName="form-title"
                onChange={() => setAddLicenseMode('add')}
              />
            </div>
          </div>

          {/* Add license keys content */}
          <div
            className={`mb-1 ms-3 ${addLicenseMode === 'add' ? 'd-block' : 'd-none'
              }`}
          >
            <Row>
              <Col sm={6}>
                <div className="modal-form-title required">License key #1</div>
                <div className={licensesModalStyle['add-licenses-input-group']}>
                  <Input
                    type="text"
                    value=""
                    minLength={0}
                    maxLength={12}
                    onChange={e => { }}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <div className="modal-form-title required">License key #2</div>
                <div className={licensesModalStyle['add-licenses-input-group']}>
                  <Input
                    type="text"
                    value=""
                    minLength={0}
                    maxLength={12}
                    onChange={e => { }}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <Icon
                    iconTitle="delete"
                    className={`icon-close ${licensesModalStyle['icon']}`}
                    onClick={() => { }}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <div className="modal-form-title required">License key #3</div>
                <div className={licensesModalStyle['add-licenses-input-group']}>
                  <Input
                    type="text"
                    value=""
                    minLength={0}
                    maxLength={12}
                    onChange={e => { }}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <Icon
                    iconTitle="delete"
                    className={`icon-close ${licensesModalStyle['icon']}`}
                    onClick={() => { }}
                  />
                </div>
              </Col>
            </Row>
            <ButtonWithIcon
              label="Add"
              className="d-flex justify-content-center mt-4"
              iconClassName="icon-expand"
              onClick={() => { }}
            ></ButtonWithIcon>
          </div>

          {/* Bulk import */}
          <div className="mt-3">
            <div className="modal-form-title">
              <RadioButton
                id="bulkImport"
                name="bulkImport"
                label="Bulk import"
                checked={addLicenseMode === 'bulk'}
                labelClassName="form-title"
                onChange={() => {
                  setAddLicenseMode('bulk');
                }}
              />
            </div>
          </div>

          {/* Bulk import content */}
          <div
            className={`mb-1 ms-3 ${addLicenseMode === 'bulk' ? 'd-block' : 'd-none'
              }`}
          >
            <div className={`mb-1 ${licensesModalStyle['bulk-import-hint']}`}>
              Upload a CSV-formatted file with license you wish to add to
              organization.
            </div>
            <InputWithUploadButton
              containerClassName="my-2"
              value={''}
              onChange={() => { }}
            />
            <div className="fst-italic">
              <span>You can download sample template file</span>
              <LinkerWithA
                label="here"
                href="#"
                className="linker-blue text-decoration-none mx-1 fw-light"
                onClick={() => { }}
              />
            </div>
          </div>
        </div>
        <div className='footer'>
          <Button
            label="Cancel"
            className="btn-cancel"
            onClick={() => changeModalStatus('addLicense', false)}
          />
          <Button label="Add" className="btn-submit" onClick={() => { }} />
        </div>
      </ModalContainer>
    </div>
  );
};

const RevokeModal = props => {
  const { modalStatus, changeModalStatus } = props;

  return (
    <div className={licensesModalStyle['revoke-modal']}>
      <ConfirmationModalContainer
        modalWidthType="modal-400px"
        title="Revoke licenses"
        description="Would you like to revoke selected licenses?"
        openModal={modalStatus.revoke.status}
        closeModal={() => changeModalStatus('revoke', false)}
        onConfirm={() => {
          changeModalStatus('revoke', false);
          changeModalStatus('result', true);
        }}
      />
    </div>
  );
};

const SuspendModal = props => {
  const { modalStatus, changeModalStatus } = props;

  return (
    <div className={licensesModalStyle['suspend-modal']}>
      <ConfirmationModalContainer
        modalWidthType="modal-400px"
        title="Suspend licenses"
        description="Would you like to suspend selected licenses?"
        openModal={modalStatus.suspend.status}
        closeModal={() => changeModalStatus('suspend', false)}
        onConfirm={() => {
          changeModalStatus('suspend', false);
          changeModalStatus('result', true);
        }}
      />
    </div>
  );
};

const ResumeModal = props => {
  const { modalStatus, changeModalStatus } = props;

  return (
    <div className={licensesModalStyle['resume-modal']}>
      <ConfirmationModalContainer
        modalWidthType="modal-400px"
        title="Resume licenses"
        description="Would you like to resume selected licenses?"
        openModal={modalStatus.resume.status}
        closeModal={() => changeModalStatus('resume', false)}
        onConfirm={() => {
          changeModalStatus('resume', false);
          changeModalStatus('result', true);
        }}
      />
    </div>
  );
};

const ResultModal = props => {
  const { t } = useTranslation();
  const { modalStatus, changeModalStatus, results, thList } = props;

  return (
    <div className={licensesModalStyle['result-modal']}>
      <ResultModalContainer
        {...{ thList }}
        results={results}
        onDownload={() => console.log('onDownload')}
        openModal={modalStatus.result.status}
        closeModal={() => changeModalStatus('result', false)}
      />
    </div>
  );
};

const LicensesTable = () => {
  const sorting = e => {
    // NEED TO DO : put this into public function.
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  return (
    <Table responsive striped hover className="table-container">
      <thead>
        <tr>
          <th>
            <Checkbox
              id="rl-th-cb1"
              onChange={e => {
                console.log(e.target.checked);
              }}
            />
          </th>
          <th>#</th>
          <th>
            <LinkerWithA
              label="License type"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Status"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="License key"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Term"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="License device type"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Claimed at"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Previous organization"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Organization"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Organization ID"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Level"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Device UID"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Model name"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="MAC address"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Start date"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Expiration date"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
          <th>
            <LinkerWithA
              label="Time remaining"
              className="text-decoration-none"
              onClick={sorting}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <Checkbox
              id="rl-cb1"
              onChange={e => {
                console.log(e.target.checked);
              }}
            />
          </td>
          <td>1</td>
          <td>Unused</td>
          <td>Suspended</td>
          <td>042812E6013E00ECB785</td>
          <td>1 Year</td>
          <td>Access point</td>
          <td>2022/09/12 17:27:10</td>
          <td></td>
          <td>D-Link QA</td>
          <td>200002</td>
          <td>MSP</td>
          <td>TESTQAHQCAD6</td>
          <td>DBA-1510P</td>
          <td>A4:5E:60:C4:71:13</td>
          <td>2022/02/08</td>
          <td></td>
          <td>75 days</td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb2"
              onChange={e => {
                console.log(e.target.checked);
              }}
            />
          </td>
          <td>2</td>
          <td>Unused</td>
          <td>Active</td>
          <td>0539D9A0BA0270BB751B</td>
          <td>1 Year</td>
          <td>Switch</td>
          <td>2022/09/12 17:27:10</td>
          <td></td>
          <td>D-Link QA</td>
          <td>200002</td>
          <td>MSP</td>
          <td>TESTQAHQCAD7</td>
          <td>DBS-1210P</td>
          <td>A4:5E:60:BD:76:0D</td>
          <td>2021/09/12</td>
          <td>2022/09/13</td>
          <td>313 Days</td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb3"
              onChange={e => {
                console.log(e.target.checked);
              }}
            />
          </td>
          <td>3</td>
          <td>Unused</td>
          <td>Inactive</td>
          <td>0D099B18B5DF8874AE92</td>
          <td>1 Year (Free)</td>
          <td>Gateway</td>
          <td>2022/09/12 17:27:10</td>
          <td></td>
          <td>D-Link QA</td>
          <td>200002</td>
          <td>MSP</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb4"
              onChange={e => {
                console.log(e.target.checked);
              }}
            />
          </td>
          <td>4</td>
          <td>Unused</td>
          <td>Inactive</td>
          <td>161AB67E082D4625D5EA</td>
          <td>1 Year</td>
          <td>Gateway</td>
          <td>2022/09/12 17:27:10</td>
          <td>Org name</td>
          <td>D-Link QA</td>
          <td>200002</td>
          <td>MSP</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb5"
              onChange={e => {
                console.log(e.target.checked);
              }}
            />
          </td>
          <td>5</td>
          <td>Used</td>
          <td>Active</td>
          <td>235A66875ADA78A51AB2</td>
          <td>1 Day</td>
          <td>Switch</td>
          <td>2022/09/12 17:27:10</td>
          <td></td>
          <td>Starbucks</td>
          <td>20881</td>
          <td>ORG</td>
          <td>24TGRLZFC8B4</td>
          <td>DBS-2000-28P</td>
          <td>20:18:62:22:02:14</td>
          <td>2022/09/12</td>
          <td>2022/09/13</td>
          <td>313 Days</td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb6"
              onChange={e => {
                console.log(e.target.checked);
              }}
            />
          </td>
          <td>6</td>
          <td>Unused</td>
          <td>Inactive</td>
          <td>115F4F79FC40FF9FE549</td>
          <td>1 Year</td>
          <td>Access point</td>
          <td>2022/09/12 17:27:10</td>
          <td></td>
          <td>Starbucks</td>
          <td>20881</td>
          <td>ORG</td>
          <td>24TGRLZFC8B2</td>
          <td>DBS-2000-52P</td>
          <td>10:BE:F5:CB:0F:E0</td>
          <td>2022/09/12</td>
          <td>2022/09/13</td>
          <td>313 Days</td>
        </tr>
        <tr>
          <td>
            <Checkbox
              id="rl-cb7"
              onChange={e => {
                console.log(e.target.checked);
              }}
            />
          </td>
          <td>7</td>
          <td>Used</td>
          <td>Active</td>
          <td>1949BCA376A79D325EAD</td>
          <td>8 Days</td>
          <td>Access point</td>
          <td>2022/09/12 17:27:10</td>
          <td></td>
          <td>Starbucks</td>
          <td>20881</td>
          <td>ORG</td>
          <td>24TGRLZFC8B2</td>
          <td>DBS-2000-52P</td>
          <td>10:BE:F5:CB:0F:E0</td>
          <td>2022/09/12</td>
          <td>2022/09/13</td>
          <td>0 Day</td>
        </tr>
      </tbody>
    </Table>
  );
};

const Licenses = () => {
  const defaultMessages = {
    success: null,
    error: null,
    warning: null,
    generateError: null,
  };

  const [messages, setMessages] = useState({ ...defaultMessages });
  const [isOpenGenerateModal, setOpenGenerateModal] = useState(false);
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });
  const changeModalStatus = useCallback((type, status) => {
    const tmpModalStatus = { ...modalStatus };
    tmpModalStatus[type].status = status;
    setModalStatus(tmpModalStatus);
  }, []);

  return (
    <div className="layout-container layout-container--column layout-container--fluid">
      <MessageBox
        show={!!messages.success}
        label={messages.success}
        variant="success"
        dismissible
        onClose={() => { }}
      />
      <MessageBox
        show={!!messages.danger}
        label={messages.danger}
        variant="danger"
        dismissible
        onClose={() => { }}
      />
      <MessageBox
        show={!!messages.warning}
        label={messages.warning}
        variant="warning"
        dismissible
        onClose={() => { }}
      />

      <InlineTitle label="LICENSE OVERVIEW" isNonUnderline />

      <LicenseOverviewContainer />

      <div className="d-flex justify-content-between">
        <LeftButtonGroup
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />
        <LicensesToolbarBox
          changeMessages={setMessages}
          changeOpenGenerateModalStatus={setOpenGenerateModal}
        />
      </div>

      <LicensesTable />

      <PaginationContainer
        total={10}
        onPageChange={currentPageNum =>
          console.log('onPageChange', currentPageNum)
        }
        onEntryLimitChange={currentPageNum =>
          console.log('onEntryLimitChange', currentPageNum)
        }
      />

      <GenerateModal
        messages={messages}
        isOpenGenerateModal={isOpenGenerateModal}
        changeMessages={setMessages}
        changeOpenGenerateModalStatus={setOpenGenerateModal}
      />

      <AddLicenseModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <AssignToModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <RevokeModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <SuspendModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <ResumeModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <ResultModal
        thList={fakeResultsThList}
        results={fakeResults}
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </div>
  );
};

export default Licenses;
