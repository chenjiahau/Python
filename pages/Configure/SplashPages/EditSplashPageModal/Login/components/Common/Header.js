import browserFile from 'assets/img/v2/splash_page/browseFile.png';
import langIcon from 'assets/img/v2/icon/icon_language_normal.png';

import { useState } from 'react';


// Component prefix definition
import cpd from '../common-prefix-definition';

// Util
import { getBase64, controlDom, setImg, setBackgroundImg, fetchImgFromUrl, stopPropagation } from '../../util';

// Component
import { DropdownWithItem } from 'components/';

export const showBackgroundIcon = e => {
  controlDom(`${cpd.common.backgroundImg}-edit-icon`, ['sp-login-scale']);
  controlDom(`${cpd.common.backgroundImg}-delete-icon`, ['sp-login-scale']);
}

export const hideBackgroundIcon = e => {
  controlDom(`${cpd.common.backgroundImg}-edit-icon`, ['sp-login-scale'], false);
  controlDom(`${cpd.common.backgroundImg}-delete-icon`, ['sp-login-scale'], false);
}

export const initChildBlock = e => {
  const containers = [
    'sp-login-logo-container',
    'sp-login-common-title-container',
    'sp-login-omni-ssl-portal-title-container',
    'sp-login-session-limit-title-container',
    'sp-login-web-content-filter-title-container',
    'sp-login-common-terms-container',
    'sp-login-email-and-sms-terms-container',
    'sp-login-email-terms-container',
    'sp-login-sms-terms-container',
    'sp-login-social-media-terms-container',
    "sp-login-omni-ssl-portal-terms-container",
    'sp-login-continue-button-container',
    'sp-login-login-button-container',
    'sp-login-login-with-email-button-container',
    'sp-login-login-with-sms-button-container',
    'sp-login-ok-button-container',
    'sp-login-back-button-container',
    'sp-login-get-code-button-container',
    'sp-login-submit-button-container',
    'sp-login-or-divider-container',
    'sp-login-session-limit-error-container',
    'sp-login-web-content-filter-error-container',
    'sp-login-web-content-filter-link-container',
    'sp-login-instruction-message-container',
    'sp-login-success-message-container',
    'sp-login-failure-message-container',
    'sp-login-wifi-terms-and-conditions-title-container',
    'sp-login-terms-terms-container',
  ];

  const iconBlock = [
    'sp-login-logo-icon-block',
    'sp-login-common-title-icon-block',
    'sp-login-omni-ssl-portal-title-icon-block',
    'sp-login-session-limit-title-icon-block',
    'sp-login-web-content-filter-title-icon-block',
    'sp-login-common-terms-icon-block',
    'sp-login-email-and-sms-terms-icon-block',
    'sp-login-email-terms-icon-block',
    'sp-login-sms-terms-icon-block',
    'sp-login-social-media-terms-icon-block',
    'sp-login-omni-ssl-portal-terms-icon-block',
    'sp-login-continue-button-icon-block',
    'sp-login-login-button-icon-block',
    'sp-login-login-with-email-button-icon-block',
    'sp-login-login-with-sms-button-icon-block',
    'sp-login-ok-button-icon-block',
    'sp-login-back-button-icon-block',
    'sp-login-get-code-button-icon-block',
    'sp-login-submit-button-icon-block',
    'sp-login-or-divider-icon-block',
    'sp-login-session-limit-error-icon-block',
    'sp-login-web-content-filter-error-icon-block',
    'sp-login-web-content-filter-link-icon-block',
    'sp-login-instruction-message-icon-block',
    'sp-login-success-message-icon-block',
    'sp-login-failure-message-icon-block',
    'sp-login-wifi-terms-and-conditions-title-icon-block',
    'sp-login-terms-terms-icon-block',
  ];

  const editBlocks = [
    'sp-login-background-img-edit-block',
    'sp-login-logo-edit-block',
    'sp-login-common-title-edit-block',
    'sp-login-omni-ssl-portal-title-edit-block',
    'sp-login-session-limit-title-edit-block',
    'sp-login-web-content-filter-title-edit-block',
    'sp-login-common-terms-edit-block',
    'sp-login-email-and-sms-terms-edit-block',
    'sp-login-email-terms-edit-block',
    'sp-login-sms-terms-edit-block',
    'sp-login-social-media-terms-edit-block',
    'sp-login-omni-ssl-portal-terms-edit-block',
    'sp-login-continue-button-edit-block',
    'sp-login-login-button-edit-block',
    'sp-login-login-with-email-button-edit-block',
    'sp-login-login-with-sms-button-edit-block',
    'sp-login-ok-button-edit-block',
    'sp-login-back-button-edit-block',
    'sp-login-get-code-button-edit-block',
    'sp-login-submit-button-edit-block',
    'sp-login-or-divider-edit-block',
    'sp-login-session-limit-error-edit-block',
    'sp-login-web-content-filter-error-edit-block',
    'sp-login-web-content-filter-link-edit-block',
    'sp-login-instruction-message-edit-block',
    'sp-login-success-message-edit-block',
    'sp-login-failure-message-edit-block',
    'sp-login-wifi-terms-and-conditions-title-edit-block',
    'sp-login-terms-terms-edit-block',
  ];

  containers.forEach(container => {
    controlDom(container, ['sp-login-background'], false);
  });

  iconBlock.forEach(icon => {
    controlDom(icon, ['sp-login-visibility'], false);
  });

  editBlocks.forEach(editBlock => {
    controlDom(editBlock, ['sp-login-opacity', 'sp-login-width', 'sp-login-visibility'], false);
  });
}

const Header = (props) => {
  const { isPreviewMode, isPhoneSize, defaultPreviewSize, previewSize, langs } = props;

  // Method
  const showBackgroundEditBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.common.backgroundImg}-edit-block`, [isPhoneSize ? 'sp-login-phone-width' : 'sp-login-width', 'sp-login-opacity', 'sp-login-visibility']);
  }

  const initBackgroundImg = e => {
    stopPropagation(e);
    setBackgroundImg('sp-dtp-block-content');
    document.querySelector('.sp-login-edit-content-img').src = browserFile;
  }

  return (
    <>
      <div className={`${cpd.common.backgroundImg}-block`}>
        {
          !isPreviewMode && (
            <>
              <i
                className={`${cpd.common.backgroundImg}-edit-icon`}
                onClick={showBackgroundEditBlock}
              />
              <i
                className={`${cpd.common.backgroundImg}-delete-icon`}
                onClick={initBackgroundImg}
              />
            </>
          )
        }
      </div>
      <div className='sp-login-lang-block'>
        {
          previewSize === defaultPreviewSize.desktop && (
            <>
              <img
                src={langIcon}
                className="icon btn-dropdown"
                id="langDropdown"
                data-bs-toggle="dropdown"
                alt={langs.find(lang => lang.isActive).title}
              />
              <DropdownWithItem
                extendClassName='btn-dropdown-no-border'
                selectedItem={langs.find(lang => lang.isActive)}
                itemList={langs}
                onClick={item => { }}
              />
            </>
          )
        }
        {
          previewSize === defaultPreviewSize.tablet && (
            <div>
              <DropdownWithItem
                id="lang-dropdown"
                type="icon"
                extendClassName="icon-language"
                selectedItem={langs.find(lang => lang.isActive)}
                itemList={langs}
                onClick={item => { }}
              />
            </div>
          )
        }
        {
          previewSize === defaultPreviewSize.phone && (
            <div>
              <DropdownWithItem
                id="lang-dropdown"
                type="icon"
                extendClassName="icon-language"
                selectedItem={langs.find(lang => lang.isActive)}
                itemList={langs}
                onClick={item => { }}
              />
            </div>
          )
        }
      </div>
    </>
  )
}

export default Header;