import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { Table, Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Slice
import { selectUserLevel } from 'stores/slice/user';

// Component
import {
  Button, Input, ModalContainer, DropdownWithItem, MessageBoxGroup,
  TooltipDialogFixed, Icon
} from 'components/';

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

const defaultAccessPrivilegeRoleList = [
  { title: 'Admin', isActive: true },
  { title: 'Caregiver', isActive: false },
  { title: 'Family', isActive: false }
];

const dropdownAccessLevelList = [
  { title: 'Organization', isActive: true },
  { title: 'Site tag', isActive: false },
  { title: 'Site', isActive: false },
];

const dropdownAccessLevelNameList = [
  { title: 'D-Link QA', isActive: true },
];

const defaultManagedSiteTagList = [
  { title: 'ALL sites', isActive: true },
  { title: 'D-Link QA', isActive: false },
  { title: 'Starbucks', isActive: false },
  { title: 'CHT', isActive: false },
  { title: 'FET', isActive: false },
];

const defaultManagedSiteList = [
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

  // State
  const userLevel = useSelector(selectUserLevel) || localStorage.getItem('userLevel');
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [accessPrivilegeRoleList, setAccessPrivilegeRoleList] = useState(cloneDeep(defaultAccessPrivilegeRoleList));
  const [managedSiteTagList, setManagedSiteTagList] = useState(cloneDeep(defaultManagedSiteTagList));
  const [managedSiteList, setManagedSiteList] = useState(cloneDeep(defaultManagedSiteList));

  // Method
  const changeAccessPrivilegeRole = (selectedRole) => {
    const updatedAccessPrivilegeRoleList = cloneDeep(accessPrivilegeRoleList);

    for (const role of updatedAccessPrivilegeRoleList) {
      role.isActive = false;
      if (role.title === selectedRole.title) {
        role.isActive = true;
      }
    }

    setAccessPrivilegeRoleList(updatedAccessPrivilegeRoleList);

    if (updatedAccessPrivilegeRoleList[0].isActive) {
      const updatedManagedSiteTagList = cloneDeep(defaultManagedSiteTagList);
      updatedManagedSiteTagList[0].isActive = true;
      setManagedSiteTagList(updatedManagedSiteTagList);
      const updatedSiteList = cloneDeep(defaultManagedSiteList);
      updatedSiteList[0].isActive = true;
      setManagedSiteList(updatedManagedSiteTagList);
    }

    if (!updatedAccessPrivilegeRoleList[0].isActive) {
      const updatedManagedSiteTagList = cloneDeep(defaultManagedSiteTagList.filter(item => item.title !== 'ALL sites'));
      updatedManagedSiteTagList[0].isActive = true;
      setManagedSiteTagList(updatedManagedSiteTagList);
      const updatedManagedSiteList = cloneDeep(defaultManagedSiteList.filter(item => item.title !== 'All'));
      updatedManagedSiteList[0].isActive = true;
      setManagedSiteList(updatedManagedSiteList);
    }
  }

  const siteTooltipContent = () => {
    return (
      <Table hover>
        <thead>
          <tr>
            <th colSpan={2}>Current care recipient</th>
          </tr>
        </thead>
        <tbody>
          {managedSiteList.map((item, index) => (
            <tr key={item.title}>
              <td>{index + 1}</td>
              <td>{item.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  // Variable
  const nuclias = (
    <>
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
              />
            </Col>
            <Col>
              <div className="modal-form-title">&nbsp;</div>
              <DropdownWithItem
                id="license-term-dropdown"
                type="normal"
                selectedItem={dropdownAccessLevelNameList[0]}
                itemList={dropdownAccessLevelNameList}
                onClick={() => { }}
              />
            </Col>
          </Row>
        </div>
      </Row>
      <Row className="mb-2">
        <div className="modal-form-field">
          <Row className="mt-2">
            <Col>
              <div className="modal-form-title required short-block-margin">Managed site</div>
              <DropdownWithItem
                id="license-term-dropdown"
                type="normal"
                selectedItem={managedSiteTagList[0]}
                itemList={managedSiteTagList}
                onClick={() => { }}
              />
            </Col>
            <Col>
              <div className="modal-form-title">&nbsp;</div>
              <DropdownWithItem
                id="license-term-dropdown"
                type="normal"
                selectedItem={managedSiteList[0]}
                itemList={managedSiteList}
                onClick={() => { }}
              />
            </Col>
          </Row>
        </div>
      </Row>
    </>
  );

  const nttcare = (
    <>
      {/* Access privilege Role*/}
      <Row className="mb-2">
        <div className="modal-subtitle">Access privilege role</div>
      </Row>
      <Row className="mb-4">
        <div className="modal-form-field">
          <DropdownWithItem
            id="used-unused-dropdown"
            type="normal"
            selectedItem={accessPrivilegeRoleList.find(item => item.isActive)}
            itemList={accessPrivilegeRoleList}
            onClick={changeAccessPrivilegeRole}
          />
        </div>
      </Row>
      {/* Contact information */}
      <Row className="mb-2">
        <div className="modal-subtitle">Contact information</div>
      </Row>
      <Row className="mb-3">
        <div className="modal-form-field">
          <Row>
            <Col>
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
            </Col>
            <Col>
              {
                !accessPrivilegeRoleList[2].isActive && (
                  <>
                    <div className="modal-form-title required short-block-margin">Phone number</div>
                    <div className="modal-form-field">
                      <Input
                        type="text"
                        placeholder="1-32 characters"
                        onChange={e => {
                          console.log(e.target.value);
                        }}
                        value="02-6600-0123"
                        onFocus={() => { }}
                        onBlur={() => { }}
                      />
                    </div>
                  </>
                )
              }
            </Col>
          </Row>
        </div>
      </Row>
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
      {/* Managed site */}
      <Row className="mb-2">
        <div className="modal-subtitle">Managed site</div>
      </Row>
      {
        accessPrivilegeRoleList[0].isActive && (
          <Row className="mb-4">
            <Col>
              <DropdownWithItem
                id="license-term-dropdown"
                type="normal"
                selectedItem={managedSiteTagList[0]}
                itemList={managedSiteTagList}
                onClick={() => { }}
              />
            </Col>
            <Col>
              <DropdownWithItem
                id="license-term-dropdown"
                type="normal"
                selectedItem={managedSiteList[0]}
                itemList={managedSiteList}
                onClick={() => { }}
              />
            </Col>
          </Row>
        )
      }
      {
        accessPrivilegeRoleList[1].isActive && (
          <div className='form-field form-field--horizontal mb-4'>
            <div>
              <DropdownWithItem
                id="license-term-dropdown"
                type="normal"
                isMiddleSize={true}
                selectedItem={managedSiteTagList.find(item => item.isActive)}
                itemList={managedSiteTagList}
                onClick={() => { }}
              />
            </div>
            <div>
              <TooltipDialogFixed
                placement="right"
                title={ReactDOMServer.renderToString(siteTooltipContent())}
                hideIcon={true}
                tooltipsTitle={<Icon className="icon-about-purple" />}
              />
            </div>
          </div>
        )
      }
      {
        accessPrivilegeRoleList[2].isActive && (
          <Row className="mb-4">
            <Col>
              <DropdownWithItem
                id="license-term-dropdown"
                type="normal"
                selectedItem={managedSiteTagList.find(item => item.isActive)}
                itemList={managedSiteTagList}
                onClick={() => { }}
              />
            </Col>
            <Col>
              <DropdownWithItem
                id="license-term-dropdown"
                type="normal"
                selectedItem={managedSiteList.find(item => item.isActive)}
                itemList={managedSiteList}
                onClick={() => { }}
              />
            </Col>
          </Row>
        )
      }

      {/* Access level */}
      <Row className="mb-2">
        <div className="modal-subtitle">Access level</div>
      </Row>
      <Row className="mb-2">
        <Col>
          <DropdownWithItem
            id="license-term-dropdown"
            type="normal"
            selectedItem={dropdownAccessLevelList[0]}
            itemList={dropdownAccessLevelList}
            onClick={() => { }}
          />
        </Col>
        <Col>
          <DropdownWithItem
            id="license-term-dropdown"
            type="normal"
            selectedItem={dropdownAccessLevelNameList[0]}
            itemList={dropdownAccessLevelNameList}
            onClick={() => { }}
          />
        </Col>
      </Row>
    </>
  );

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
        {nuclias}
        {/* {['nuclias', 'msp'].includes(userLevel) ? nuclias : null}
        {['ntt-care', 'ntt-care-msp'].includes(userLevel) ? nttcare : null} */}
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

export default EditUserModal;
