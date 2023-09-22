import myProfileStyle from './my-profile.module.scss';

import { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import {
  ButtonWithIcon,
  InlineTitle,
  Input,
  InputWithIcon,
  InputWithUploadButton,
  DropdownWithItem,
  Checkbox,
  RadioButton,
  Button,
  LinkerWithA,
  MessageBox,
  EditableNameBox,
  ModalContainer,
  Hr
} from 'components';

import userImg from '../../../assets/img/v2/icon/icon_dlink.png';

const MyProfile = () => {
  const defaultTwoFactorAuthList = [
    { title: 'Disable', value: null },
    { title: 'Email authentication', value: 'email' },
    { title: 'Google authenticator', value: 'google' }
  ];

  const defaultLoginReferenceList = [
    { title: 'No default login preference' },
    { title: 'Set Cloud Portal as default' },
    { title: 'Set Connect Portal as default' }
  ];

  const defaultMessages = {
    success: null,
    error: null,
    warning: null,
  }

  const messageWordings = {
    twoFactorAuth: 'In order to make sure "Google Authenticator of two-factor authentication" works successfully, please add your Nuclias account to Google Authenticator and verify the authentication via "Test Two-factor authentication code".'
  }

  const defaultCheckboxesStatus = {
    'promotional': false
  }

  const [messages, setMessages] = useState({ ...defaultMessages });
  const [profileName, setProfileName] = useState('D-Link');
  const [originProfileName, setOriginProfileName] = useState('D-Link');
  const [isVerify, setVerify] = useState(false);
  const [selectedTwoFactorAuth, setSelectedTwoFactorAuth] = useState({ ...defaultTwoFactorAuthList[0] });
  const [isManuallyCode, setIsManuallyCode] = useState(false);
  const [selectedLoginReference, setLoginReference] = useState({ ...defaultLoginReferenceList[0] });
  const [selectedUploadFile, setUploadFile] = useState(null);
  const [checkboxesStatus, setCheckboxesStatus] = useState({ ...defaultCheckboxesStatus });

  // Modal
  const [isOpenDeleteAccountModal, setOpenDeleteAccountModal] = useState(false);
  const [isOpenUploadImgModal, setOpenUploadImgModal] = useState(false);
  const [isRemoveImgModal, setRemoveImgModal] = useState(false);

  const referProfileName = (value) => {
    setProfileName(value);
    setOriginProfileName(value)
  }

  const toggleCheckboxes = type => {
    const newCheckboxesStatus = { ...checkboxesStatus };
    newCheckboxesStatus[type] = !newCheckboxesStatus[type];
    setCheckboxesStatus(newCheckboxesStatus);
  }

  return (
    <div className="layout-container layout-container--column layout-container--fluid">
      <MessageBox show={!!messages.success} label={messages.success} variant='success' dismissible onClose={() => { }} />
      <MessageBox show={!!messages.danger} label={messages.danger} variant='danger' dismissible onClose={() => { }} />
      <MessageBox show={!!messages.warning} label={messages.warning} variant='warning' dismissible onClose={() => { }} />

      <div className='d-flex justify-content-between'>
        <div className='inline-upper-case-title'>MY PROFILE</div>
        <div className='d-flex'>
          <ButtonWithIcon
            label='Email this page'
            className={myProfileStyle['email-this-page-btn']}
            iconClassName='icon-email'
            onClick={() => { console.log('email this page') }}
          ></ButtonWithIcon>

          <ButtonWithIcon
            label='Delete account'
            style={{marginLeft: '13px'}}
            className={myProfileStyle['delete-account-btn']}
            iconClassName='icon-trash'
            onClick={() => { setOpenDeleteAccountModal(true) }}
          ></ButtonWithIcon>
        </div>
      </div>
      <Hr></Hr>

      <Container style={{ margin: 0, padding: 0 }} className='mb-5'>
        <Row lg={8}>
          <Col xl={7} lg={8}>
            <div className={myProfileStyle['user-info-container']}>

              <div className='form-group'>
                <div className='form-title'>Name</div>
                <div className='form-field'>
                  <EditableNameBox
                    onClickCancelIcon={() => setOriginProfileName(profileName)}
                    inputFieldOnKeyDown={(e) => referProfileName(e.target.value)}
                    inputFieldOnChange={e => setOriginProfileName(e.target.value)}
                    value={originProfileName}
                  />
                </div>

              </div>

              <div className='form-group'>
                <div className='form-title'>E-mail</div>
                <div className='form-field'>dlink@dlinkcorp.com</div>
              </div>

              <div className='form-group'>
                <div className='form-title'>Current password</div>
                <div className='form-field'>
                  <InputWithIcon
                    type='password'
                    placeholder='8-64 ACSII characters'
                    autoComplete='current-password'
                    onChange={e => { console.log(e.target.value) }}
                    iconTitle='Show password'
                    iconClassName='icon-open-eye'
                    iconOnClick={() => { console.log('click on icon') }}
                  />
                </div>
              </div>

              <div className='form-group'>
                <div className='form-title'>New password</div>
                <div className='form-field'>
                  <InputWithIcon
                    type='password'
                    placeholder='8-64 ACSII characters'
                    autoComplete='new-password'
                    onChange={e => { console.log(e.target.value) }}
                    iconTitle='Show password'
                    iconClassName='icon-open-eye'
                    iconOnClick={() => { console.log('click on icon') }}
                  />
                </div>
              </div>

              <div className='form-group'>
                <div className='form-title'>Confirm password</div>
                <div className='form-field'>
                  <InputWithIcon
                    type='password'
                    placeholder='8-64 ACSII characters'
                    autoComplete='confirm-password'
                    onChange={e => { console.log(e.target.value) }}
                    iconTitle='Show password'
                    iconClassName='icon-open-eye'
                    iconOnClick={() => { console.log('click on icon') }}
                  />
                </div>
              </div>

              <div className='form-group'>
                <div className='form-title'>Two-factor authentication</div>
                <DropdownWithItem
                  id='two-factor-auth-dropdown'
                  type='normal'
                  containerStyle={{ flexGrow: '1' }}
                  selectedItem={selectedTwoFactorAuth}
                  itemList={defaultTwoFactorAuthList}
                  onClick={
                    item => {
                      const msg = item.value === 'google' ? messageWordings['twoFactorAuth'] : null;
                      messages.warning = msg;
                      setMessages({ ...messages });
                      setSelectedTwoFactorAuth(item);
                    }
                  }
                />
              </div>

              <div className={`form-group ${myProfileStyle['google-auth-container']} ${selectedTwoFactorAuth.value === 'google' ? 'inherit' : 'd-none'}`}>
                <div className='form-title'></div>
                <div className='form-field'>
                  <ul>
                    <li>Add your Nuclias account to Google Authenticator:</li>
                    <li className='list-style-type-none'><span>In Google Authenticator, press the plus (+) icon and scan the QR code below:</span></li>
                    <li className={`mt-2 ${myProfileStyle['qrcode-icon']}`}></li>
                    <li className='list-style-type-none'>
                      <LinkerWithA
                        label="Can't scan the QR code?"
                        href='#'
                        className='linker-blue linker-blue-hover text-decoration-underline list-style-type-none'
                        onClick={
                          e => {
                            e.preventDefault();
                            setIsManuallyCode(!isManuallyCode);
                          }
                        }
                      />
                    </li>
                    <div className={`${!!isManuallyCode ? 'inherit' : 'd-none'}`}>
                      <li className='list-style-type-none'>Manually enter a code:</li>
                      <ol className={myProfileStyle['manually-code-list']}>
                        <li>In Google Authenticator,  press the plus (+) icon and choose "Time Based".</li>
                        <li>Enter <span>franny.huang@dlinkcorp.com/Nulcias</span> for the accout name</li>
                        <li>Enter this for the key (spaces don't matter): <br />
                          <span>vt3o cwvd 2357 g6fb</span></li>
                        <li>Choose "Time Based" for the type of key.</li>
                        <li>Press Done.</li>
                      </ol>
                    </div>
                    <li className='v2-two-factor-title mt-2'>Test Two-factor authentication code:</li>
                    <li className='list-style-type-none'>Click "Verify" button to verify the code that is provided by Google</li>
                    <li className='list-style-type-none'>Authenticator on your mobile device.</li>
                    <li className={`list-style-type-none ${myProfileStyle['manually-code-container']}`}>
                      <span className='me-1'>Code:</span>
                      <Input
                        type='text'
                        autoComplete='manuallly-code'
                        onChange={e => { console.log(e.target.value) }}
                      />
                      <Button
                        label='Verify'
                        className='btn-indigo ms-2'
                        onClick={() => setVerify(true)}
                      />

                      <div className={`ms-1 ${myProfileStyle['small-input-successful']} ${!!isVerify ? 'inherit' : 'd-none'}`}>Successful verification.</div>
                      <div className={`ms-1 ${myProfileStyle['small-input-error']}`} style={{ display: 'none' }}>Invalid authentication code.</div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className='form-group'>
                <div className='form-title'>Automatic logout time limit</div>
                <div className='form-field'>
                  <Input
                    type='number'
                    placeholder='1-60'
                    autoComplete='automatic-logout-time-limit'
                    onChange={e => { console.log(e.target.value) }}
                  />
                </div>
                <div className='form-unit'>minutes</div>
              </div>

              <div className='form-group'>
                <div className='form-title'>Login preference</div>
                <DropdownWithItem
                  id='login-preference-dropdown'
                  type='normal'
                  selectedItem={selectedLoginReference}
                  itemList={defaultLoginReferenceList}
                  onClick={item => setLoginReference({ ...item })}
                />
              </div>

              <div className='form-group'>
                <div className='form-title'></div>
                <Checkbox
                  id={myProfileStyle['receive-promotion-cb']}
                  htmlFor={myProfileStyle['receive-promotion-cb']}
                  label='I would like to receive promotional and product updates from D-Link.'
                  checked={checkboxesStatus['promotional']}
                  onChange={() => toggleCheckboxes('promotional')}
                />
              </div>
            </div>
          </Col>
          <Col xl={3} lg={2}>
            <div className={myProfileStyle['user-img-container']}>

              <img className={myProfileStyle['user-img']} src={userImg} alt='' />
              <div>You may upload a png, jpeg, jpg image of up to 1MB in size.</div>

              <div className={myProfileStyle['user-img-button-group']}>

                <Button
                  label='Upload Image'
                  className='btn-indigo'
                  onClick={() => setOpenUploadImgModal(true)}
                />

                <Button
                  label='Remove image'
                  className='btn-indigo'
                  onClick={() => setRemoveImgModal(true)}
                />

              </div>

            </div>
          </Col>
        </Row>
      </Container>

      <InlineTitle label='ACCESS PRIVILEGE'></InlineTitle>
      <div className={myProfileStyle['access-privilege-container']}>
        <div className='form-group'>
          <div className='form-title'>Access level</div>
          <div className='form-field'>Operator</div>
        </div>

        <div className='form-group'>
          <div className='form-title'>Role</div>
          <div className='form-field'>Admin</div>
        </div>

        <div className='form-group'>
          <div className='form-title'>Organization</div>
          <ButtonWithIcon
            label='Download'
            className={myProfileStyle['download-btn']}
            iconClassName='icon-download'
            onClick={() => { }}
          ></ButtonWithIcon>
        </div>
      </div>

      <div className={myProfileStyle['apply-btn-group']}>
        <Button
          label='Cancel'
          className='btn-cancel me-3'
          onClick={() => { console.log('Click on Cancel') }}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => { console.log('Click on Save') }}
        />
      </div>

      {/* Delet account modal */}
      <ModalContainer
        modalWidthType='modal-500px'
        openModal={isOpenDeleteAccountModal}
        closeModal={() => setOpenDeleteAccountModal(false)}
      >
        <div className='header'>
          <div className='title'>Delete user</div>
        </div>
        <div className='body'>
          <div className='mb-3 modal-warning-color'>Your account will be removed from Nuclias, and all the related data will be wiped from our cloud server. We will not be able to recover this account again. Please enter your password to proceed.</div>
          <div className="modal-form-group">
            <div className='modal-form-title required me-3'>Password</div>
            <div className='modal-form-field'>
              <InputWithIcon
                type="password"
                placeholder="Password"
                autoComplete="delete-account-password"
                onChange={e => { console.log(e.target.value) }}
                onFocus={() => { }}
                onBlur={() => { }}
                iconTitle="Show password"
                iconClassName="icon-open-eye"
                iconOnClick={() => { console.log("click on icon") }}
              />
            </div>
          </div>
        </div>
        <div className='footer non-border-top-footer'>
          <Button
            label='Cancel'
            className='btn-cancel'
            onClick={() => setOpenDeleteAccountModal(false)}
          />
          <Button
            label='Revoke'
            className='btn-delete'
            onClick={() => { console.log('Click on revoke') }}
          />
        </div>
      </ModalContainer>

      {/* Upload img modal */}
      <ModalContainer
        modalWidthType='modal-500px'
        openModal={isOpenUploadImgModal}
        closeModal={() => setOpenUploadImgModal(false)}
      >
        <div className='header'>
          <div className='title'>Upload image</div>
        </div>
        <div className='body'>
          <div className='mb-1'>You may upload PNG,GIF,BMP,TIFF,JPEG,JPG images up to 1MB.</div>
          <InputWithUploadButton
            value={selectedUploadFile ? selectedUploadFile.name : ''}
            onChange={e => { setUploadFile(e.target.files[0]) }}
          />
        </div>
        <div className='footer non-border-top-footer'>
          <Button
            label='Cancel'
            className='btn-cancel'
            onClick={() => setOpenUploadImgModal(false)}
          />
          <Button
            label='Upload'
            className='btn-submit'
            onClick={() => { console.log('Click on upload') }}
          />
        </div>
      </ModalContainer>

      {/* Remove img modal */}
      <ModalContainer
        modalWidthType='modal-500px'
        openModal={isRemoveImgModal}
        closeModal={() => setRemoveImgModal(false)}
      >
        <div className='header'>
          <div className='title'>Remove image</div>
        </div>
        <div className='body'>
          <div>Would you like to remove?</div>
        </div>
        <div className='footer non-border-top-footer'>
          <Button
            label='Cancel'
            className='btn-cancel'
            onClick={() => setRemoveImgModal(false)}
          />
          <Button
            label='Delete'
            className='btn-delete'
            onClick={() => { console.log('Click on delete') }}
          />
        </div>
      </ModalContainer>

    </div>
  )
}

export default MyProfile;