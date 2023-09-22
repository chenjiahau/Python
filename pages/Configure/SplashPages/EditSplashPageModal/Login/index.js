import browserFile from 'assets/img/v2/splash_page/browseFile.png';
import freeWifi from 'assets/img/v2/splash_page/bread_shop.jpg';
import staffOnly from 'assets/img/v2/splash_page/coffee_shop.jpg';
import guestWifi from 'assets/img/v2/splash_page/shopping_mall.jpg';
import defaultBackgroundImg from './background-image';

import { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import { cloneDeep } from 'lodash';

// Component prefix definition
import cpd from './components/common-prefix-definition';

// Util
import {
  getBase64, setImg, setBackgroundImg, fetchImgFromUrl, stopPropagation,
  setBackgroundColor
} from './util';

// Component
import { DropdownWithItem, Input, Button, Icon } from 'components/';

import Header, { showBackgroundIcon, hideBackgroundIcon, initChildBlock } from './components/Common/Header';
import Logo from './components/Common/Logo';

import CommonTitle from './components/Title/Common';
import OmniSslPortalTitle from './components/Title/OmniSslPortal';
import SessionLimitTitle from './components/Title/SessionLimit';
import WebContentFilterTitle from './components/Title/WebContentFilter';

import UsernameInput from './components/Input/Username';
import PasswordInput from './components/Input/Password';
import EmailInput from './components/Input/Email';
import ConfirmEmailInput from './components/Input/ConfirmEmail';
import MobileInput from './components/Input/Mobile';
import ActivationCodeInput from './components/Input/ActivationCode';

import CommonTerms from './components/Terms/Common';
import EmailAndSmsTerms from './components/Terms/EmailAndSms';
import EmailTerms from './components/Terms/Email';
import SmsTerms from './components/Terms/Sms';
import SocialMediaTerms from './components/Terms/SocialMedia';
import OmniSslPortalTerms from './components/Terms/OmmiSslPortal';

import ContinueButton from './components/Button/Continue';
import LoginButton from './components/Button/Login';
import LoginWithEmailButton from './components/Button/LoginWithEmail';
import LoginWithSmsButton from './components/Button/LoginWithSms';
import OkButton from './components/Button/Ok';
import BackButton from './components/Button/Back';
import GetCodeButton from './components/Button/GetCode';
import SubmitButton from './components/Button/Submit';
import FacebookButton from './components/Button/Facebook';
import GoogleButton from './components/Button/Google';
import LineButton from './components/Button/Line';
import WeiboButton from './components/Button/Weibo';
import TwitterButton from './components/Button/Twitter';

import OrDivider from './components/Divider/Or';
import SupplierSelect from './components/Select/Supplier';

import SessionLimitError from './components/Error/SessionLimit';
import WebContentFilterError from './components/Error/WebContentFilter';

import WebContentFilterLink from './components/Link/WebContentFilter';

import InstructionMessage from './components/Message/Instruction';
import SuccessMessage from './components/Message/Success';
import FailureMessage from './components/Message/Failure';

import WifiTermsAndConditionsTitle from './components/Title/WifiTermsAndConditions';
import TermsTerms from './components/Terms/Terms';

// Dummy data & util
import { checkSupportedComponent, splashPageMessages } from 'dummy/data/splash-page';

const defaultLangs = ['English', '日本語'];
const defaultBackgroundImgs = [
  { title: 'Default' },
  { title: 'Free Wi-Fi', img: freeWifi, base64Img: defaultBackgroundImg.freeWifi },
  { title: 'Staff only', img: staffOnly, base64Img: defaultBackgroundImg.staffOnly },
  { title: 'Guest Wi-Fi', img: guestWifi, base64Img: defaultBackgroundImg.guestWifi },
];

const Login = (props) => {
  const {
    defaultPreviewSize,
    previewSize,
    defaultMode,
    mode,
    tabs,
    form
  } = props;

  // State
  const [pageNumber, setPageNumber] = useState(1); // For Sign-on with email authentication, SMS authentication and third party credentials
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [backgroundImgs, setBackgroundImgs] = useState([]);
  const [backgroundImgUrl, setBackgroundImgUrl] = useState('');
  const [showBackgroundPicker, setShowBackgroundPicker] = useState(false);
  const [background, setBackground] = useState('#ffffff');
  const [langs, setLangs] = useState([]);

  // Method
  const showCarouselBack = (selectedTypeId) => {
    if (selectedTypeId !== 4) return false;
    if (pageNumber === 1) return false;

    return true;
  }

  const showCarouselNext = (selectedTypeId) => {
    if (selectedTypeId !== 4) return false;
    if (pageNumber === 3) return false;

    return true;
  }

  const showCarouselBottom = (selectedTypeId) => {
    if (selectedTypeId !== 4) return false;

    return true;
  }

  const goBackwardPage = () => {
    setPageNumber(pageNumber - 1);
  }

  const goForwardPage = () => {
    setPageNumber(pageNumber + 1);
  }

  const changeBackgroundImg = backgroundImg => {
    if (backgroundImg.img) {
      setBackgroundImg('sp-dtp-block-content', backgroundImg.base64Img);
      setImg('sp-login-edit-content-img', backgroundImg.base64Img);
    } else {
      setBackgroundImg('sp-dtp-block-content');
      document.querySelector('.sp-login-edit-content-img').src = browserFile;
    }

    const updatedBackgroundImgs = [];
    backgroundImgs.forEach(item => {
      updatedBackgroundImgs.push({
        ...item,
        isActive: item.title === backgroundImg.title
      })
    });
    setBackgroundImgs(updatedBackgroundImgs);
  }

  const inputBackgroundImg = e => {
    stopPropagation(e);
    const uploadBackgroundImgDom = document.querySelector('.sp-login-upload-background-img');
    uploadBackgroundImgDom.value = '';
    uploadBackgroundImgDom.click();
  }

  const downloadBackgroundImg = e => {
    stopPropagation(e)
    fetchImgFromUrl(backgroundImgUrl, (result) => {
      setBackgroundImg('sp-dtp-block-content', result);
      setImg('sp-login-edit-content-img', result);
    });
  }

  const changeBackground = color => {
    setBackground(color.hex);
    setBackgroundColor('sp-dtp-block-content', color.hex);
  }

  // Side effect
  useEffect(() => {
    // Background
    const updatedBackgroundImgs = [];
    defaultBackgroundImgs.forEach((img, index) => {
      updatedBackgroundImgs.push({
        title: img.title,
        img: img.img,
        base64Img: img.base64Img,
        isActive: index === 0
      })
    });
    setBackgroundImgs(updatedBackgroundImgs);

    // Lang
    const updatedLangs = [];
    defaultLangs.forEach((lang, index) => {
      updatedLangs.push({
        title: lang,
        isActive: index === 0
      })
    });

    setLangs(updatedLangs);
  }, []);

  useEffect(() => {
    setPageNumber(1);
    initChildBlock();
  }, [form.type]);

  useEffect(() => {
    if (tabs[1].isActive) {
      const selectedType = form.type.find(type => type.isActive);
      const selectedTypeId = selectedType.id;

      let messages = [];
      if (selectedTypeId !== 4) {
        messages = splashPageMessages.filter(message => message.type.includes(selectedTypeId) && message.pageNumber.includes(pageNumber));
      } else {
        if (pageNumber === 1) {
          messages = [
            splashPageMessages[0], splashPageMessages[1], splashPageMessages[2], splashPageMessages[3], splashPageMessages[4]
          ];
        } else if (pageNumber === 2) {
          messages = [
            splashPageMessages[1], splashPageMessages[2], splashPageMessages[3], splashPageMessages[4],
            splashPageMessages[5], splashPageMessages[6], splashPageMessages[7], splashPageMessages[8], splashPageMessages[9],
          ];
        } else {
          messages = [
            splashPageMessages[1], splashPageMessages[2], splashPageMessages[3], splashPageMessages[4],
            splashPageMessages[10], splashPageMessages[11], splashPageMessages[12], splashPageMessages[13], splashPageMessages[14],
            splashPageMessages[15], splashPageMessages[6], splashPageMessages[17], splashPageMessages[18], splashPageMessages[19],
            splashPageMessages[20], splashPageMessages[21], splashPageMessages[22],
          ];
        }
      }

      setMessages(messages);
      setSelectedMessage(messages[0]);
    }
  }, [form.type, pageNumber, tabs]);

  useEffect(() => {
    initChildBlock();
  }, [mode]);

  if (!langs.length) {
    return;
  }

  const selectedTab = tabs.find(tab => tab.isActive);
  const selectedType = form.type.find(type => type.isActive);
  const selectedTypeId = selectedType.id;
  const isPreviewMode = mode === defaultMode.preview;
  const isPhoneSize = previewSize === defaultPreviewSize.phone;

  const loginBody = (
    <>
      {/* Background image block*/}
      <div className={`${cpd.common.backgroundImg}-edit-block`} onClick={stopPropagation}>
        <div className='sp-login-edit-title'>Background (shared)</div>
        <div className='sp-login-edit-content'>
          <input
            type='file'
            style={{ display: 'none' }}
            className='sp-login-upload-background-img'
            accept='image/*'
            onChange={e => {
              const file = e.target.files[0];
              getBase64(file)
                .then(result => {
                  setImg('sp-login-edit-content-img', result);
                  setBackgroundImg('sp-dtp-block-content', result);
                })
                .catch(err => console.log(err));
            }}
          />
          <div className='left'>
            <DropdownWithItem
              type='normal'
              selectedItem={backgroundImgs.find(img => img.isActive)}
              itemList={backgroundImgs}
              onClick={changeBackgroundImg}
            />
            <div className='sp-login-download'>
              <Input
                type='text'
                placeholder='Link from URL'
                value={backgroundImgUrl}
                onChange={e => setBackgroundImgUrl(e.target.value)}
                onClick={stopPropagation}
              />
              <Button
                label='Download'
                className='btn-grey-blue'
                onClick={downloadBackgroundImg}
              />
            </div>
            <div className='sp-login-color-picker'>
              <Button
                label={background}
                onClick={() => setShowBackgroundPicker(!showBackgroundPicker)}
                style={{ backgroundColor: background, color: background === '#ffffff' ? '#000000' : '#ffffff' }}
              />
              {
                showBackgroundPicker && (
                  <div>
                    <div onClick={() => setShowBackgroundPicker(false)} />
                    <SketchPicker onChange={changeBackground} />
                  </div>
                )
              }
            </div>
          </div>
          <div className='right'>
            <img
              className='sp-login-edit-content-img'
              src={browserFile}
              alt=''
              onClick={inputBackgroundImg}
            />
          </div>
        </div>
      </div>
      {/* Desktop block content */}
      <div className='sp-dtp-block-content'>
        <div className='sp-login-header'>
          <Header
            isPreviewMode={isPreviewMode}
            defaultPreviewSize={defaultPreviewSize}
            previewSize={previewSize}
            isPhoneSize={isPhoneSize}
            langs={langs} />
        </div>
        <div className={`sp-login-body ${selectedTab.value === 'terms' ? 'sp-login-body--terms' : ' '}`}>
          {
            selectedTab.value !== 'terms' && (
              <>
                {
                  selectedTab.id === 2 && selectedMessage && selectedMessage.position === 'instruction' && (
                    <InstructionMessage
                      isPreviewMode={isPreviewMode}
                      isPhoneSize={isPhoneSize}
                      selectedMessage={selectedMessage}
                    />
                  )
                }

                <Logo isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />

                {
                  selectedTab.id === 2 && selectedMessage && selectedMessage.position === 'success' && (
                    <SuccessMessage isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} selectedMessage={selectedMessage} />
                  )
                }
                {
                  selectedTab.id === 2 && selectedMessage && selectedMessage.position === 'failure' && (
                    <FailureMessage isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} selectedMessage={selectedMessage} />
                  )
                }

                {checkSupportedComponent('title', 'common', selectedTypeId) && <CommonTitle isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('title', 'omniSslPortal', selectedTypeId) && <OmniSslPortalTitle isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('title', 'sessionLimit', selectedTypeId) && <SessionLimitTitle isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('title', 'webContentFilter', selectedTypeId) && <WebContentFilterTitle isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}

                {checkSupportedComponent('terms', 'common', selectedTypeId) && <CommonTerms isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('terms', 'emailAndSms', selectedTypeId) && pageNumber === 1 && <EmailAndSmsTerms isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('terms', 'email', selectedTypeId) && pageNumber === 2 && <EmailTerms isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('terms', 'sms', selectedTypeId) && ((selectedTypeId === 4 && pageNumber === 3) || (selectedTypeId === 5)) && <SmsTerms isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('terms', 'socialMedia', selectedTypeId) && selectedTypeId === 6 && <SocialMediaTerms isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('terms', 'omniSslPortal', selectedTypeId) && selectedTypeId === 7 && <OmniSslPortalTerms isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}

                {checkSupportedComponent('select', 'supplier', selectedTypeId) && ((selectedTypeId === 4 && pageNumber === 3) || (selectedTypeId === 5)) && <SupplierSelect isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}

                {checkSupportedComponent('error', 'sessionLimit', selectedTypeId) && <SessionLimitError isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('error', 'webContentFilter', selectedTypeId) && <WebContentFilterError isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}

                {checkSupportedComponent('input', 'username', selectedTypeId) && <UsernameInput isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('input', 'password', selectedTypeId) && <PasswordInput isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('input', 'email', selectedTypeId) && pageNumber === 2 && <EmailInput isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('input', 'confirmEmail', selectedTypeId) && pageNumber === 2 && <ConfirmEmailInput isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('input', 'mobile', selectedTypeId) && ((selectedTypeId === 4 && pageNumber === 3) || (selectedTypeId === 5)) && <MobileInput isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('button', 'getCode', selectedTypeId) && ((selectedTypeId === 4 && pageNumber === 3) || (selectedTypeId === 5)) && <GetCodeButton isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('input', 'activationCode', selectedTypeId) && ((selectedTypeId === 4 && pageNumber === 3) || (selectedTypeId === 5)) && <ActivationCodeInput isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('button', 'submit', selectedTypeId) && ((selectedTypeId === 4 && pageNumber === 3) || (selectedTypeId === 5)) && <SubmitButton isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}

                {checkSupportedComponent('button', 'continue', selectedTypeId) && <ContinueButton isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('button', 'login', selectedTypeId) && <LoginButton isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('button', 'loginWithEmail', selectedTypeId) && pageNumber === 1 && <LoginWithEmailButton isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('button', 'loginWithSms', selectedTypeId) && pageNumber === 1 && <LoginWithSmsButton isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('button', 'ok', selectedTypeId) && pageNumber === 2 && <OkButton isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('button', 'back', selectedTypeId) && ([2, 3].includes(pageNumber)) && <BackButton isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('divider', 'or', selectedTypeId) && pageNumber === 1 && <OrDivider isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('button', 'facebook', selectedTypeId) && pageNumber === 1 && <FacebookButton isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('button', 'google', selectedTypeId) && pageNumber === 1 && <GoogleButton isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('button', 'line', selectedTypeId) && pageNumber === 1 && <LineButton isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('button', 'weibo', selectedTypeId) && pageNumber === 1 && <WeiboButton isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}
                {checkSupportedComponent('button', 'twitter', selectedTypeId) && pageNumber === 1 && <TwitterButton isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />}

                {checkSupportedComponent('link', 'webContentFilter', selectedTypeId) && <WebContentFilterLink isPreviewMode={isPreviewMode} />}
              </>
            )
          }
          {
            selectedTab.value === 'terms' && (
              <>
                <WifiTermsAndConditionsTitle isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />
                <TermsTerms isPreviewMode={isPreviewMode} isPhoneSize={isPhoneSize} />
              </>
            )
          }
        </div>
        <div className='sp-login-footer'>
          <p>Powered by D-Link Nuclias Cloud</p>
        </div>
      </div>
    </>
  )

  return (
    <>
      <div className={`sp-block ${selectedTab.value !== 'messages' ? 'sp-one-column-block' : 'sp-two-columns-block'}`}>
        {/* Messages tab */}
        {
          selectedTab.value === 'messages' && (
            <>
              <div className='sp-block-left'>
                <div className='sp-login-message-block'>
                  {
                    messages.map((message, index) => {
                      return (
                        <div
                          key={index}
                          className={`sp-login-message-item ${message.id === selectedMessage.id ? 'sp-login-message-item--active' : ''}`}
                          onClick={() => setSelectedMessage(message)}
                        >
                          <div className='sp-login-message-item-icon'>
                            <Icon className={message.id === selectedMessage.id ? 'icon-open-eye' : 'icon-close-eye'} />
                          </div>
                          <div className='sp-login-message-item-title'>
                            {message.title}
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </>
          )
        }
        {/* Login tab, Terms tab */}
        <div className='sp-block-right'>
          {/* Switch page number */}
          {
            selectedTab.value !== 'terms' && showCarouselBack(selectedTypeId) && (
              <>
                <div className='sp-login-carousel-back-icon-block' onClick={goBackwardPage}>
                  <i className='back-icon' />
                </div>
              </>
            )
          }
          {
            selectedTab.value !== 'terms' && showCarouselNext(selectedTypeId) && (
              <>
                <div className='sp-login-carousel-next-icon-block' onClick={goForwardPage}>
                  <i className='next-icon' />
                </div>
              </>
            )
          }
          {
            selectedTab.value !== 'terms' && showCarouselBottom(selectedTypeId) && (
              <>
                <div className='sp-login-carousel-bottom-block'>
                  <i
                    className={`bottom-dot ${pageNumber === 1 ? 'bottom-dot--active' : ''}`}
                    onClick={() => setPageNumber(1)}
                  />
                  <i
                    className={`bottom-dot ${pageNumber === 2 ? 'bottom-dot--active' : ''}`}
                    onClick={() => setPageNumber(2)}
                  />
                  <i
                    className={`bottom-dot ${pageNumber === 3 ? 'bottom-dot--active' : ''}`}
                    onClick={() => setPageNumber(3)}
                  />
                </div>
              </>
            )
          }
          {/* Desktop */}
          {
            previewSize === defaultPreviewSize.desktop && (
              <>
                <div
                  className='sp-desktop-block'
                  onMouseOver={showBackgroundIcon}
                  onMouseOut={hideBackgroundIcon}
                  onClick={initChildBlock}
                >
                  {loginBody}
                </div>
              </>
            )
          }
          {/* Tablet */}
          {
            previewSize === defaultPreviewSize.tablet && (
              <>
                <div
                  className='sp-tablet-block'
                  onMouseOver={showBackgroundIcon}
                  onMouseOut={hideBackgroundIcon}
                  onClick={initChildBlock}
                >
                  <div className='sp-tablet-block-background-container'>
                    <div className='sp-tablet-block-content'>
                      {loginBody}
                    </div>
                  </div>
                </div>
              </>
            )
          }
          {/* Phone */}
          {
            previewSize === defaultPreviewSize.phone && (
              <>
                <div
                  className='sp-phone-block'
                  onMouseOver={showBackgroundIcon}
                  onMouseOut={hideBackgroundIcon}
                  onClick={initChildBlock}
                >
                  <div className='sp-phone-block-background-container'>
                    <div className='sp-phone-block-content'>
                      {loginBody}
                    </div>
                  </div>
                </div>
              </>
            )
          }
        </div>
      </div >
    </>
  )
}

export default Login;