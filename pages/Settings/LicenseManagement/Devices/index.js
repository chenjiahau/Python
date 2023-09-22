import devicesStyle from './devices.module.scss';
import leftButtonGroupStyle from './devices-left-button-group.module.scss';
import devicesModalStyle from './devices-modal.module.scss';

import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Table, ButtonGroup } from 'react-bootstrap';

// Components
import Icon from '../../../../components/Icon';
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import Checkbox from '../../../../components/Checkbox';
import MessageBox from '../../../../components/MessageBox';
import InlineTitle from '../../../../components/InlineTitle';
import LinkerWithA from '../../../../components/LinkerWithA';
import RadioButton from '../../../../components/RadioButton';
import TooltipDialog from '../../../../components/TooltipDialog';
import ModalContainer from '../../../../components/ModalContainer';
import ButtonWithIcon from '../../../../components/ButtonWithIcon';
import DropdownWithItem from '../../../../components/DropdownWithItem';
import PaginationContainer from '../../../../components/PaginationContainer';
import InputWithUploadButton from '../../../../components/InputWithUploadButton';
import DropdownWithAdvancedSearch from '../../../../components/DropdownWithAdvancedSearch';
import DeleteDeviceModalContainer from '../../../../components/DeleteDeviceModalContainer';

// Icon
import deviceApIcon from '../../../../assets/img/v2/icon/device_ap.png';
import deviceSwitchIcon from '../../../../assets/img/v2/icon/device_switch.png';
import deviceGatewayIcon from '../../../../assets/img/v2/icon/device_gateway.png';

const dropdownStatusList = [
  { title: 'All', isActive: true },
  { title: 'Online', isActive: false },
  { title: 'Offline', isActive: false },
  { title: 'Dormant', isActive: false },
];

const dropdownProductCategoryList = [
  { title: 'All', isActive: true },
  { title: 'Access point', isActive: false },
  { title: 'Switch', isActive: false },
  { title: 'Gateway', isActive: false },
];

const dropdownModelNameList = [
  { title: 'All', isActive: true },
  { title: 'DBA-1210P', isActive: false },
  { title: 'DBA-1510P', isActive: false },
  { title: 'DBA-1520P', isActive: false },
  { title: 'DBA-2520P', isActive: false },
  { title: 'DBA-2720P', isActive: false },
  { title: 'DBA-2820P', isActive: false },
  { title: 'DBA-3621P', isActive: false },
  { title: 'DBA-X1230P', isActive: false },
  { title: 'DBS-2000', isActive: false },
  { title: 'DBG-2000', isActive: false },
  { title: 'DBG-2000(B1)', isActive: false },
  { title: 'DBG-X1000', isActive: false },

  { title: 'DBG-2000(B1)', isActive: false },
  { title: 'DBG-X1000', isActive: false },
  { title: 'DBG-2000(B1)', isActive: false },
  { title: 'DBG-X1000', isActive: false },

  { title: 'DBG-2000(B1)', isActive: false },
  { title: 'DBG-X1000', isActive: false },

  { title: 'DBG-2000(B1)', isActive: false },
  { title: 'DBG-X1000', isActive: false },
  { title: 'DBG-2000(B1)', isActive: false },
  { title: 'DBG-X1000', isActive: false },


];

const dropdownUsedUnusedList = [
  { title: 'Both', isActive: true },
  { title: 'Used', isActive: false },
  { title: 'Unused', isActive: false },
];

const dropdownExpirationDateList = [
  { title: 'All', isActive: true },
  { title: 'Expires in 1 day', isActive: false },
  { title: 'Expires in 7 days', isActive: false },
  { title: 'Expires in 14 days', isActive: false },
  { title: 'Expires in 30 days', isActive: false },
  { title: 'Expires in 60 days', isActive: false },
];

const defaultModalStatus = {
  addDevice: {
    status: false,
    disabled: false,
  },
  deleteDevice: {
    status: false,
    disabled: false,
  },
  assignTo: {
    status: false,
    disabled: false,
  },
  assignLicense: {
    status: false,
    disabled: false,
  },
};

const fakeSiteList = [
  { title: 'site-1' },
  { title: 'site-2' },
  { title: 'site-3' },
  { title: 'site-4' },
  { title: 'site-5' },
];

const fakeProfileList = [
  { title: 'profile-1' },
  { title: 'profile-2' },
  { title: 'profile-3' },
  { title: 'profile-4' },
  { title: 'profile-5' },
];

const fakeDeivceStatusList = [{ title: 'Unused' }, { title: 'Used' }];

const fakeLicenseTermList = [
  { title: '1 month' },
  { title: '1 year' },
  { title: '3 years' },
  { title: '5 years' },
];

const fakeCountryList = [
  {
    title: 'Afghanistan',
    timeZone: [{ title: 'Asia/Kabul(UTC+04:30, DST)' }],
  },
  {
    title: 'Aland Islands',
    timeZone: [{ title: 'Europe/Mariehamn(UTC+02:00, DST)' }],
  },
  {
    title: 'Albania',
    timeZone: [{ title: 'Europe/Tirane(UTC+01:00, DST)' }],
  },
  {
    title: 'Antarctica',
    timeZone: [
      { title: 'Antarctica/Casey(UTC+11:00, DST)' },
      { title: 'Antarctica/Davis(UTC+07:00, DST)' },
      { title: 'Antarctica/DumontDUrville(UTC+10:00, DST)' },
    ],
  },
];

const fakeAssignLicenseTermList = [
  { title: '1 year' },
  { title: '2 years' },
  { title: '3 years' },
  { title: '4 years' },
  { title: '5 years' },
  { title: '7 years' },
];

const DevicesOverviewContainer = () => {
  return (
    <Container className={devicesStyle['devices-overview-container']}>
      <Row>
        <Col className={devicesStyle['devices-status-container']}>
          <div className={devicesStyle['sub-status-container']}>
            <div className={devicesStyle['number-container']}>
              <div className={devicesStyle['number-title']}>Total devices</div>
              <span className={devicesStyle['number-count']}>
                1058
              </span>
            </div>
          </div>

          <div className={devicesStyle['sub-status-container']}>
            <div>
              <img
                className="mx-3"
                src={deviceApIcon}
                alt=""
                width={65}
              />
            </div>
            <div className={devicesStyle['number-container']}>
              <div className={devicesStyle['number-title']}>Access points</div>
              <span className={devicesStyle['number-count']}>
                938
              </span>
            </div>
          </div>

          <div className={devicesStyle['sub-status-container']}>
            <div>
              <img
                className="mx-3"
                src={deviceSwitchIcon}
                alt=""
                width={65}
              />
            </div>
            <div className={devicesStyle['number-container']}>
              <div className={devicesStyle['number-title']}>Switches</div>
              <span className={devicesStyle['number-count']}>
                100
              </span>
            </div>
          </div>

          <div className={devicesStyle['sub-status-container']}>
            <div>
              <img
                className="mx-3"
                src={deviceGatewayIcon}
                alt=""
                width={65}
              />
            </div>
            <div className={devicesStyle['number-container']}>
              <div className={devicesStyle['number-title']}>Gateways</div>
              <span className={devicesStyle['number-count']}>
                20
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const AddDeviceModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const [addDeviceMode, setAddDeviceMode] = useState('add');

  return (
    <div className={devicesModalStyle['inventory-add-device-modal']}>
      <ModalContainer
        modalWidthType="modal-500px"
        openModal={modalStatus.addDevice.status}
        closeModal={() => changeModalStatus('addDevice', false)}
      >
        <div className="header">
          <div className="title">Add device to inventory</div>
        </div>
        <div className="body">
          {/* Add device */}
          <div>
            <div className="modal-form-title">
              <RadioButton
                id="AddDevice"
                name="AddDevice"
                label="Add device"
                checked={addDeviceMode === 'add'}
                labelClassName="form-title"
                onChange={() => setAddDeviceMode('add')}
              />
            </div>
          </div>

          {/* Add device content */}
          <div
            className={`mb-1 ms-3 ${addDeviceMode === 'add' ? 'd-block' : 'd-none'
              }`}
          >
            <Row>
              <Col sm={6}>
                <div className="modal-form-title required">Device UID #1</div>
                <div className={devicesModalStyle['add-device-input-group']}>
                  <Input
                    type="text"
                    value={'NTTRDDBG0001'}
                    minLength={0}
                    maxLength={12}
                    onChange={e => { }}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <div className="modal-form-title required">Device UID #2</div>
                <div className={devicesModalStyle['add-device-input-group']}>
                  <Input
                    type="text"
                    value={'NTTRDDBG0002'}
                    minLength={0}
                    maxLength={12}
                    onChange={e => { }}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <Icon
                    iconTitle="delete"
                    className={`icon-close ${devicesModalStyle['icon']}`}
                    onClick={() => { }}
                  />
                </div>
              </Col>
              <Col sm={6}>
                <div className="modal-form-title required">Device UID #2</div>
                <div className={devicesModalStyle['add-device-input-group']}>
                  <Input
                    type="text"
                    value={'NTTRDDBG0003'}
                    minLength={0}
                    maxLength={12}
                    onChange={e => { }}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <Icon
                    iconTitle="delete"
                    className={`icon-close ${devicesModalStyle['icon']}`}
                    onClick={() => { }}
                  />
                </div>
              </Col>
            </Row>
            <div
              className={`mt-2 mb-3 ${devicesModalStyle['add-device-hint']}`}
            >
              UID format : XXXX-XXXX-XXXX or XXXXXXXXXXXX
            </div>
            <ButtonWithIcon
              label="Add"
              className="d-flex justify-content-center"
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
                checked={addDeviceMode === 'bulk'}
                labelClassName="form-title"
                onChange={() => {
                  setAddDeviceMode('bulk');
                }}
              />
            </div>
          </div>

          {/* Bulk import content */}
          <div
            className={`mb-1 ms-3 ${addDeviceMode === 'bulk' ? 'd-block' : 'd-none'
              }`}
          >
            <div className={`mb-1 ${devicesModalStyle['bulk-import-hint']}`}>
              Upload a CSV-formatted file with device UID you wish to add to
              inventory.
            </div>
            <InputWithUploadButton
              containerClassName="my-2"
              value={''}
              onChange={() => { }}
            />
            <div className="fst-italic">
              <span>You can download sample template file here</span>
              <LinkerWithA
                label="here"
                href="#"
                className="linker-blue text-decoration-none mx-1 fw-light"
                onClick={() => { }}
              />
            </div>
          </div>
        </div>
        <div className="footer">
          <Button
            label="Cancel"
            className="btn-cancel"
            onClick={() => changeModalStatus('addDevice', false)}
          />
          <Button label="Add" className="btn-submit" onClick={() => { }} />
        </div>
      </ModalContainer>
    </div>
  );
};

const DeleteDeviceModal = props => {
  const { modalStatus, changeModalStatus } = props;

  return (
    <DeleteDeviceModalContainer
      openModal={modalStatus.deleteDevice.status}
      closeModal={() => changeModalStatus('deleteDevice', false)}
      modalWidthType="modal-500px"
      title="Delete devices"
      description="You may delete the selected devices from this organization permanently or move the selected devices to Inventory as Unused devices."
      onMoveToInventory={() => {
        console.log('Mov to Inventory');
      }}
      onDelete={() => {
        console.log('Delete from Organization');
      }}
    />
  );
};

const AssignToModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const [assignToMode, setAssignToMode] = useState('existing');

  return (
    <div className={devicesModalStyle['inventory-assign-to-modal']}>
      <ModalContainer
        modalWidthType="modal-500px"
        openModal={modalStatus.assignTo.status}
        closeModal={() => changeModalStatus('assignTo', false)}
      >
        <div className="header">
          <div className="title">Assign to the site</div>
        </div>
        <div className="body">
          {/* Existing site and profile */}
          <div>
            <div className="modal-form-title d-inline-flex">
              <RadioButton
                id="existingOrg"
                name="existingOrg"
                label="Existing organization, site, and profile"
                checked={assignToMode === 'existing'}
                labelClassName="form-title"
                onChange={() => setAssignToMode('existing')}
              />
              <TooltipDialog
                className="ms-2"
                placement="right"
                title="You may assign multiple devices to the organization, site, and profile for quick setup. <br>You need to create the organization, site, and profile with valid license keys before quick setup."
              ></TooltipDialog>
            </div>
          </div>

          {/* Existing site and profile content */}
          <div
            className={`mb-1 ms-3 ${devicesModalStyle['existing-org-container']
              } ${assignToMode === 'existing' ? 'd-block' : 'd-none'}`}
          >
            <Row>
              <Col sm={6}>
                <div className="modal-form-title required">Site</div>
                <DropdownWithItem
                  id="site-dropdown"
                  type="normal"
                  selectedItem={fakeSiteList[0]}
                  itemList={fakeSiteList}
                  onClick={() => { }}
                />
              </Col>
            </Row>

            <Row>
              <Col sm={6}>
                <div className="modal-form-title required mt-3">Profile</div>
                <DropdownWithItem
                  id="profile-dropdown"
                  type="normal"
                  selectedItem={fakeProfileList[0]}
                  itemList={fakeProfileList}
                  onClick={() => { }}
                />
              </Col>
            </Row>

            <div className="mt-3">
              <span className="modal-form-title">Auto-assign license</span>
              <span className="ms-1">
                <TooltipDialog
                  className="ms-2"
                  placement="right"
                  title="License keys will be automatically assigned to the selected devices from your available licenses. Please select the appropriate license terms. Device assignment may fail if there are not enough available licenses in your pool."
                ></TooltipDialog>
              </span>
            </div>

            <div className="modal-form-title required mt-3">License terms</div>
            <Row>
              <Col>
                <DropdownWithItem
                  id="licese-status-dropdown"
                  type="normal"
                  selectedItem={fakeDeivceStatusList[0]}
                  itemList={fakeDeivceStatusList}
                  onClick={() => { }}
                />
              </Col>
              <Col>
                <DropdownWithItem
                  id="license-term-dropdown"
                  type="normal"
                  selectedItem={fakeLicenseTermList[0]}
                  itemList={fakeLicenseTermList}
                  onClick={() => { }}
                />
              </Col>
            </Row>
          </div>

          {/* New organization, site, and profile */}
          <div className="mt-3">
            <div className="modal-form-title d-inline-flex">
              <RadioButton
                id="newOrg"
                name="newOrg"
                label="New organization, site, and profile"
                checked={assignToMode === 'new'}
                labelClassName="form-title"
                onChange={() => {
                  setAssignToMode('new');
                }}
              />
              <TooltipDialog
                className="ms-2"
                placement="right"
                title="You may assign multiple devices to an new created organization and site. <br>Nuclias cloud will use the default configuration as your default profile. <br>You may modify profile configuration in the organization later."
              ></TooltipDialog>
            </div>
          </div>

          {/* New organization, site, and profile content */}
          <div
            className={`mb-1 ms-3 ${devicesModalStyle['new-org-container']} ${assignToMode === 'new' ? 'd-block' : 'd-none'
              } mt-1`}
          >
            <Row>
              <Col sm={6}>
                <div className="modal-form-title required">Site</div>
                <Input
                  type="text"
                  value={''}
                  onChange={() => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </Col>
            </Row>
            <Row className="d-flex align-items-end mt-1">
              <Col>
                <div className="modal-form-title">
                  Country and local time zone
                </div>
                <DropdownWithItem
                  id="country-dropdown"
                  type="normal"
                  selectedItem={fakeCountryList[0]}
                  itemList={fakeCountryList}
                  onClick={() => { }}
                />
              </Col>
              <Col>
                <DropdownWithItem
                  id="time-zone-dropdown"
                  type="normal"
                  selectedItem={fakeCountryList[0].timeZone[0]}
                  itemList={fakeCountryList[0].timeZone}
                  onClick={() => { }}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col>
                <div className="modal-form-title">Address</div>
                <textarea></textarea>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col>
                <div className="modal-form-title">Profile</div>
                <div className={devicesModalStyle['profile-hint']}>
                  Use default configuration
                </div>
              </Col>
            </Row>

            <div className="mt-3">
              <span className="modal-form-title">Auto-assign license</span>
              <span className="ms-1">
                <TooltipDialog
                  className="ms-2"
                  placement="right"
                  title="License keys will be automatically assigned to the selected devices from your available licenses. Please select the appropriate license terms. Device assignment may fail if there are not enough available licenses in your pool."
                ></TooltipDialog>
              </span>
            </div>

            <div className="modal-form-title required mt-3">License terms</div>
            <Row>
              <Col>
                <DropdownWithItem
                  id="licese-status-dropdown"
                  type="normal"
                  selectedItem={fakeDeivceStatusList[0]}
                  itemList={fakeDeivceStatusList}
                  onClick={() => { }}
                />
              </Col>
              <Col>
                <DropdownWithItem
                  id="license-term-dropdown"
                  type="normal"
                  selectedItem={fakeLicenseTermList[0]}
                  itemList={fakeLicenseTermList}
                  onClick={() => { }}
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className="footer">
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

const AssignLicenseModal = props => {
  const { modalStatus, changeModalStatus } = props;

  return (
    <div className={devicesModalStyle['inventory-assign-license-modal']}>
      <ModalContainer
        modalWidthType="modal-500px"
        openModal={modalStatus.assignLicense.status}
        closeModal={() => changeModalStatus('assignLicense', false)}
      >
        <div className="header">
          <div className="title">Assign licenses</div>
        </div>
        <div className="body">
          <div className={devicesModalStyle['device-count-container']}>
            <span>You have selected</span>
            <span className="mx-1">0</span>
            <span>AP(s)</span>
            <span>,</span>
            <span className="mx-1">0</span>
            <span>switch(es)</span>
            <span>,</span>
            <span className="mx-1">1</span>
            <span>gateway(s)</span>
            <span>.</span>
          </div>

          {/* AP */}
          <div className={devicesModalStyle['license-term-container']}>
            <div className={devicesModalStyle['title-container']}>
              Access point
            </div>
            <div className={devicesModalStyle['license-container']}>
              {/* can loop this div */}
              <div>
                <div className={devicesModalStyle['term-container']}>
                  <DropdownWithItem
                    id="ap-term-dropdown"
                    type="normal"
                    selectedItem={fakeAssignLicenseTermList[0]}
                    itemList={fakeAssignLicenseTermList}
                    disabled
                    onClick={() => { }}
                  />
                  <div
                    className={`mt-1 ${devicesModalStyle['remain-count']}`}
                    disabled
                  >
                    <span>Remaining</span>
                    <span className="mx-1">0</span>
                  </div>
                </div>
                <div className={devicesModalStyle['add-container']}>
                  <ButtonWithIcon
                    label="Add"
                    className="d-flex justify-content-center"
                    iconClassName="icon-expand"
                    disabled
                    onClick={() => { }}
                  ></ButtonWithIcon>
                </div>
              </div>
            </div>
          </div>

          {/* SW */}
          <div className={devicesModalStyle['license-term-container']}>
            <div className={devicesModalStyle['title-container']}>Switch</div>
            <div className={devicesModalStyle['license-container']}>
              {/* can loop this div */}
              <div>
                <div className={devicesModalStyle['term-container']}>
                  <DropdownWithItem
                    id="sw-term-dropdown"
                    type="normal"
                    selectedItem={fakeAssignLicenseTermList[0]}
                    itemList={fakeAssignLicenseTermList}
                    onClick={() => { }}
                  />
                  <div className={`mt-1 ${devicesModalStyle['remain-count']}`}>
                    <span className={devicesModalStyle['insufficient']}>
                      Insufficient Licenses
                    </span>
                  </div>
                </div>
                <div className={devicesModalStyle['add-container']}>
                  <ButtonWithIcon
                    label="Add"
                    className="d-flex justify-content-center"
                    iconClassName="icon-expand"
                    disabled
                    onClick={() => { }}
                  ></ButtonWithIcon>
                </div>
              </div>
            </div>
          </div>

          {/* GW */}
          <div className={devicesModalStyle['license-term-container']}>
            <div className={devicesModalStyle['title-container']}>Gateway</div>
            <div className={devicesModalStyle['license-container']}>
              {/* can loop this div */}
              <div>
                <div className={devicesModalStyle['term-container']}>
                  <DropdownWithItem
                    id="gw-term-dropdown"
                    type="normal"
                    selectedItem={fakeAssignLicenseTermList[0]}
                    itemList={fakeAssignLicenseTermList}
                    onClick={() => { }}
                  />
                  <div className={`mt-1 ${devicesModalStyle['remain-count']}`}>
                    <span>Remaining</span>
                    <span className="mx-1">10</span>
                  </div>
                </div>
                <div className={devicesModalStyle['add-container']}>
                  <ButtonWithIcon
                    label="Add"
                    className="d-flex justify-content-center"
                    iconClassName="icon-expand"
                    onClick={() => { }}
                  ></ButtonWithIcon>
                </div>
              </div>

              {/* can loop this div */}
              <div>
                <div className={devicesModalStyle['term-container']}>
                  <DropdownWithItem
                    id="gw-term-dropdown"
                    type="normal"
                    selectedItem={fakeAssignLicenseTermList[0]}
                    itemList={fakeAssignLicenseTermList}
                    onClick={() => { }}
                  />
                  <div className={`mt-1 ${devicesModalStyle['remain-count']}`}>
                    <span>Remaining</span>
                    <span className="mx-1">9</span>
                  </div>
                </div>
                <div className={devicesModalStyle['add-container']}>
                  <Icon
                    iconTitle="delete"
                    className={`icon-close ${devicesModalStyle['icon']}`}
                    onClick={() => { }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Button
            label="Cancel"
            className="btn-cancel"
            onClick={() => changeModalStatus('assignLicense', false)}
          />
          <Button label="Assign" className="btn-submit" onClick={() => { }} />
        </div>
      </ModalContainer>
    </div>
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
          label="Add device"
          disabled={modalStatus.addDevice.disabled}
          onClick={() => changeModalStatus('addDevice', true)}
        ></Button>
        <Button
          label="Delete"
          disabled={modalStatus.deleteDevice.disabled}
          onClick={() => changeModalStatus('deleteDevice', true)}
        ></Button>
        <Button
          label="Assign to"
          disabled={modalStatus.assignTo.disabled}
          onClick={() => changeModalStatus('assignTo', true)}
        ></Button>
        <Button
          label="Assign license"
          disabled={modalStatus.assignLicense.disabled}
          onClick={() => changeModalStatus('assignLicense', true)}
        ></Button>
      </ButtonGroup>
    </div>
  );
};

const DevicesToolbarBox = () => {
  return (
    <InlineTitle isNonUnderline>
      <DropdownWithAdvancedSearch
        value={''}
        alignEnd={true}
        readOnly
        dataBsToggleOnInput={true}
        dataBsToggleOnButton={true}
        dropdownMenuStyle={{ minWidth: 371 }}
        onChange={e => console.log(e.target.value)}
      >
        <li>
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
          <div className="form-title">Product category :</div>
          <DropdownWithItem
            id="status-dropdown"
            type="normal"
            selectedItem={dropdownProductCategoryList[0]}
            itemList={dropdownProductCategoryList}
            onClick={() => { }}
          />
        </li>
        <li className="mt-2">
          <div className="form-title">Model name :</div>
          <DropdownWithItem
            id="status-dropdown"
            type="normal"
            selectedItem={dropdownModelNameList[0]}
            itemList={dropdownModelNameList}
            onClick={() => { }}
          />
        </li>
        <li className="mt-2">
          <div className="form-title">Used/Unused :</div>
          <DropdownWithItem
            id="status-dropdown"
            type="normal"
            selectedItem={dropdownUsedUnusedList[0]}
            itemList={dropdownUsedUnusedList}
            onClick={() => { }}
          />
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
        <li className="mt-2">
          <div className="form-title">MAC :</div>
          <Input
            type="text"
            placeholder="e.g. 3C:1E:04:16:53:20"
            autoComplete="new-email1"
            onChange={e => {
              console.log(e.target.value);
            }}
            onFocus={() => { }}
            onBlur={() => { }}
          />
        </li>
        <li className="mt-2">
          <div className="form-title">Device UID :</div>
          <Input
            type="text"
            placeholder="e.g. AABBCCDDEEFF"
            autoComplete="new-email1"
            onChange={e => {
              console.log(e.target.value);
            }}
            onFocus={() => { }}
            onBlur={() => { }}
          />
        </li>
        <li className="mt-2">
          <div className="form-title">Serial number :</div>
          <Input
            type="text"
            placeholder="e.g. AA1B1CC000001"
            autoComplete="new-email1"
            onChange={e => {
              console.log(e.target.value);
            }}
            onFocus={() => { }}
            onBlur={() => { }}
          />
        </li>
      </DropdownWithAdvancedSearch>

      <Button
        label=""
        title="Download as CSV"
        className="icon-download"
        style={{ border: 'none', height: 25, backgroundColor: '#fff' }}
        onClick={() => console.log('Download as CSV')}
      />
    </InlineTitle>
  );
};

const Devices = () => {
  const defaultMessages = {
    success: null,
    error: null,
    warning: null,
    generateError: null,
  };

  const [messages, setMessages] = useState({ ...defaultMessages });
  const [isOpenGenerateModal, setOpenGenerateModal] = useState(false);
  const [isFirstClickedYesBtn, setIsFirstClickedYesBtn] = useState(true);

  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });
  const changeModalStatus = useCallback((type, status) => {
    const tmpModalStatus = { ...modalStatus };
    tmpModalStatus[type].status = status;
    setModalStatus(tmpModalStatus);
  }, []);

  const sorting = e => {
    // NEED TO DO : put this into public function.
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  const handleClickYes = () => {
    console.log('Click on yes');

    if (isFirstClickedYesBtn) {
      setMessages({
        generateError:
          "The file is still being generating. You will receive an email once it's ready to download.",
      });
    } else {
      setOpenGenerateModal(false);
    }
  };

  return (
    <div className="layout-container layout-container--column layout-container--fluid">

      <InlineTitle label="DEVICE OVERVIEW" isNonUnderline />

      <DevicesOverviewContainer />

      <div className="d-flex justify-content-between">
        <LeftButtonGroup
          modalStatus={modalStatus}
          changeModalStatus={changeModalStatus}
        />
        <DevicesToolbarBox />
      </div>

      <Table responsive striped hover className="table-container">
        <thead>
          <tr>
            <th>
              <Checkbox
                id="rl-th-cb1"
                onChange={e => console.log(e.target.checked)}
              />
            </th>
            <th>#</th>
            <th>
              <LinkerWithA
                label="Status"
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
                label="Device UID"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Serial number"
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
                label="Device name"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Site"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Profile"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="License status"
                className="text-decoration-none"
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label="Activation date"
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
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Checkbox
                id="rl-cb1"
                onChange={e => console.log(e.target.checked)}
              />
            </td>
            <td>1</td>
            <td style={{ paddingLeft: '24px' }}>
              <Icon className={'icon-round dormant'} />
            </td>
            <td>A4:5E:60:C4:71:13</td>
            <td>TESTQAHQCAD6</td>
            <td>Q2QP-BA59-PT2F</td>
            <td>DBA-1510P</td>
            <td>
              <Link to="/cloud/configure/access-point/device/12345">AP011</Link>
            </td>
            <td>Zhudong</td>
            <td>Profile_01</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <Checkbox
                id="rl-cb2"
                onChange={e => console.log(e.target.checked)}
              />
            </td>
            <td>2</td>
            <td style={{ paddingLeft: '24px' }}>
              <Icon className={'icon-round dormant'} />
            </td>
            <td></td>
            <td>TESTQAHQCAD7</td>
            <td>Q2QP-BA59-SWAT</td>
            <td>DBA-1210P</td>
            <td>AP003</td>
            <td>Zouying</td>
            <td>Profile_02</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <Checkbox
                id="rl-cb3"
                onChange={e => console.log(e.target.checked)}
              />
            </td>
            <td>3</td>
            <td style={{ paddingLeft: '24px' }}>
              <Icon className={'icon-round dormant'} />
            </td>
            <td>48:4B:AA;AA:3C:82</td>
            <td>TESTQAHQCAD8</td>
            <td>Q2QP-BA59-PT2AF</td>
            <td>DBA-1510P</td>
            <td>AP_99</td>
            <td>Test</td>
            <td>Profile_01</td>
            <td>5F2CCA4B6FB0C2D7B1Q</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <Checkbox
                id="rl-cb4"
                onChange={e => console.log(e.target.checked)}
              />
            </td>
            <td>4</td>
            <td style={{ paddingLeft: '24px' }}>
              <Icon className={'icon-round dormant'} />
            </td>
            <td></td>
            <td>TESTQAHQCAD9</td>
            <td>Q2QP-BA59-PT2C</td>
            <td>DBA-1510P</td>
            <td>AP_a</td>
            <td>Songshan</td>
            <td>Profile_01</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <Checkbox
                id="rl-cb5"
                onChange={e => console.log(e.target.checked)}
              />
            </td>
            <td>5</td>
            <td style={{ paddingLeft: '24px' }}>
              <Icon className={'icon-round dormant'} />
            </td>
            <td>20:18:62:22:02:14</td>
            <td>24TGRLZFC8B1</td>
            <td>HA2C-SWAT-P2QA</td>
            <td>DBS-2000-28P</td>
            <td>
              <Link to="/cloud/configure/switch/device/12345">SW057</Link>
            </td>
            <td>Zhuzhong</td>
            <td>Profile_a</td>
            <td>HYJG8FCXHA9DPPXNT5</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <Checkbox
                id="rl-cb6"
                onChange={e => console.log(e.target.checked)}
              />
            </td>
            <td>6</td>
            <td style={{ paddingLeft: '24px' }}>
              <Icon className={'icon-round dormant'} />
            </td>
            <td>00:11:22:33:44:55</td>
            <td>24TGRLZFC8B2</td>
            <td>HA2C-SWAT-P2QB</td>
            <td>DBS-2000-52MP</td>
            <td>SW_a</td>
            <td>Zhongzheng</td>
            <td>Profile_c</td>
            <td>5DDE471789F384C2112F</td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>
              <Checkbox
                id="rl-cb7"
                onChange={e => console.log(e.target.checked)}
              />
            </td>
            <td>7</td>
            <td style={{ paddingLeft: '24px' }}>
              <Icon className={'icon-round offline'} />
            </td>
            <td>20:18:62:22:02:14</td>
            <td>24TGRLZFC8B4</td>
            <td>HA2C-SWAT-P2QD</td>
            <td>DBS-2000-28P</td>
            <td>SWITCH-67</td>
            <td>Dream Mail</td>
            <td>Profile_a</td>
            <td>8IJZHTTLH8IR7MKFNDQ2</td>
            <td>2022/12/01</td>
            <td>2023/12/01</td>
          </tr>
          <tr>
            <td>
              <Checkbox
                id="rl-cb8"
                onChange={e => console.log(e.target.checked)}
              />
            </td>
            <td>8</td>
            <td style={{ paddingLeft: '24px' }}>
              <Icon className={'icon-round online'} />
            </td>
            <td>00:18:0A:C8:93:D5</td>
            <td>TESTQAHABES2</td>
            <td>Q2QP-BA59-AACC</td>
            <td>DBG-2000</td>
            <td>Gateway001</td>
            <td>Test</td>
            <td>Profile_01</td>
            <td>D6D71806FDB956C509A9</td>
            <td>2022/12/01</td>
            <td>2023/12/01</td>
          </tr>
        </tbody>
      </Table>

      <PaginationContainer
        total={8}
        onPageChange={currentPageNum =>
          console.log('onPageChange', currentPageNum)
        }
        onEntryLimitChange={currentPageNum =>
          console.log('onEntryLimitChange', currentPageNum)
        }
      />

      {/* Generate modal */}
      <ModalContainer
        modalWidthType="modal-500px"
        openModal={isOpenGenerateModal}
        closeModal={() => setOpenGenerateModal(false)}
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
              setMessages({
                generateError: null,
              });
            }}
          />

          <div className="mb-1">
            Do you want to generate the inventory list?
          </div>
          <div className="mb-1">
            You will receive an email to inform you the inventory list is ready
            for download after few minutes.
          </div>
        </div>
        <div className="footer">
          <Button
            label="Cancel"
            className="btn-cancel"
            onClick={() => setOpenGenerateModal(false)}
          />
          <Button
            label="Yes"
            className="btn-submit"
            onClick={() => handleClickYes()}
          />
        </div>
      </ModalContainer>

      {/* Modals */}
      <AddDeviceModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
      <DeleteDeviceModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
      <AssignToModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
      <AssignLicenseModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </div>
  );
};

export default Devices;
