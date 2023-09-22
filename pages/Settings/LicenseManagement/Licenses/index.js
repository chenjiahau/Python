import licensesStyle from './licenses.module.scss';
import leftButtonGroupStyle from './licenses-left-button-group.module.scss';
import licensesModalStyle from './licenses-modal.module.scss';

import { useState, useCallback } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

// Components
import Input from '../../../../components/Input';
import Button from '../../../../components/Button';
import MessageBox from '../../../../components/MessageBox';
import InlineTitle from '../../../../components/InlineTitle';
import LinkerWithA from '../../../../components/LinkerWithA';
import DropdownWithItem from '../../../../components/DropdownWithItem';
import PaginationContainer from '../../../../components/PaginationContainer';
import DropdownWithAdvancedSearch from '../../../../components/DropdownWithAdvancedSearch';
import RadioButton from '../../../../components/RadioButton';
import Icon from '../../../../components/Icon';
import ButtonWithIcon from '../../../../components/ButtonWithIcon';
import InputWithUploadButton from '../../../../components/InputWithUploadButton';
import ModalContainer from '../../../../components/ModalContainer';

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

const defaultModalStatus = {
  addLicense: {
    status: false,
    disabled: false,
  },
};

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
              <span className={licensesStyle['number-count']}>
                112
              </span>
            </div>
          </div>

          <div className={licensesStyle['sub-status-container']}>
            <div className={licensesStyle['number-container']}>
              <div className={licensesStyle['number-title']}>Used licenses</div>
              <span className={licensesStyle['number-count']}>
                695
              </span>
            </div>
          </div>

          <div className={licensesStyle['sub-status-container']}>
            <div className={licensesStyle['number-container']}>
              <div className={licensesStyle['number-title']}>
                Unused / Inactive licenses
              </div>
              <span className={licensesStyle['number-count']}>
                10
              </span>
            </div>
          </div>

          <div className={licensesStyle['sub-status-container']}>
            <div className={licensesStyle['number-container']}>
              <div className={licensesStyle['number-title']}>
                Unused / Active licenses
              </div>
              <span className={licensesStyle['number-count']}>
                15
              </span>
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
      <Button
        label="Add licenses"
        disabled={modalStatus.addLicense.disabled}
        onClick={() => changeModalStatus('addLicense', true)}
      ></Button>
    </div>
  );
};

const LicensesToolbarBox = () => {
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
          <Input
            type="text"
            autoComplete="new-email1"
            onChange={e => {
              console.log(e.target.value);
            }}
            onFocus={() => { }}
            onBlur={() => { }}
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
          <td>1</td>
          <td>Unused</td>
          <td>Suspended</td>
          <td>042812E6013E00ECB785</td>
          <td>1 Year</td>
          <td>Access point</td>
          <td>2022/09/12 17:27:10</td>
          <td>TESTQAHQCAD6</td>
          <td>DBA-1510P</td>
          <td>A4:5E:60:C4:71:13</td>
          <td>2022/02/08</td>
          <td></td>
          <td>75 days</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Unused</td>
          <td>Active</td>
          <td>0539D9A0BA0270BB751B</td>
          <td>1 Year</td>
          <td>Switch</td>
          <td>2022/09/12 17:27:10</td>
          <td>TESTQAHQCAD7</td>
          <td>DBS-1210P</td>
          <td>A4:5E:60:BD:76:0D</td>
          <td>2021/09/12</td>
          <td>2022/09/13</td>
          <td>313 Days</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Unused</td>
          <td>Inactive</td>
          <td>0D099B18B5DF8874AE92</td>
          <td>1 Year (Free)</td>
          <td>Gateway</td>
          <td>2022/09/12 17:27:10</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>4</td>
          <td>Unused</td>
          <td>Inactive</td>
          <td>161AB67E082D4625D5EA</td>
          <td>1 Year</td>
          <td>Gateway</td>
          <td>2022/09/12 17:27:10</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>5</td>
          <td>Used</td>
          <td>Active</td>
          <td>235A66875ADA78A51AB2</td>
          <td>1 Day</td>
          <td>Switch</td>
          <td>2022/09/12 17:27:10</td>
          <td>24TGRLZFC8B4</td>
          <td>DBS-2000-28P</td>
          <td>20:18:62:22:02:14</td>
          <td>2022/09/12</td>
          <td>2022/09/13</td>
          <td>313 Days</td>
        </tr>
        <tr>
          <td>6</td>
          <td>Unused</td>
          <td>Inactive</td>
          <td>115F4F79FC40FF9FE549</td>
          <td>1 Year</td>
          <td>Access point</td>
          <td>2022/09/12 17:27:10</td>
          <td>24TGRLZFC8B2</td>
          <td>DBS-2000-52P</td>
          <td>10:BE:F5:CB:0F:E0</td>
          <td>2022/09/12</td>
          <td>2022/09/13</td>
          <td>313 Days</td>
        </tr>
        <tr>
          <td>7</td>
          <td>Used</td>
          <td>Active</td>
          <td>1949BCA376A79D325EAD</td>
          <td>8 Days</td>
          <td>Access point</td>
          <td>2022/09/12 17:27:10</td>
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
  };

  const [messages, setMessages] = useState({ ...defaultMessages });

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
        <LicensesToolbarBox changeMessages={setMessages} />
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

      <AddLicenseModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </div>
  );
};

export default Licenses;
