import browserFile from 'assets/img/v2/splash_page/browseFile.png';

import { useState } from 'react';

// Component prefix definition
import cpd from '../common-prefix-definition';

// Util
import { getBase64, controlDom, setImg, fetchImgFromUrl, stopPropagation } from '../../util';

// Component
import { Input, Button } from 'components/';
import { initChildBlock } from './Header';

const Logo = ({ isPreviewMode, isPhoneSize }) => {

  // State
  const [imgUrl, setImgUrl] = useState('');

  // Method
  const inputLogo = e => {
    if (isPreviewMode) return;
    stopPropagation(e);
    initChildBlock();
    const uploadLogoDom = document.querySelector('.sp-login-upload-logo');
    uploadLogoDom.value = '';
    uploadLogoDom.click();
  }

  const downloadImg = e => {
    stopPropagation(e)
    fetchImgFromUrl(imgUrl, (result) => {
      setImg(`${cpd.common.logo}-img-block img`, result);
      hideEditBlock(e);
    });
  }

  const showIconBlock = e => {
    stopPropagation(e)
    controlDom(`${cpd.common.logo}-icon-block`, ['sp-login-visibility']);
    controlDom(`${cpd.common.logo}-edit-icon`, ['sp-login-scale']);
    controlDom(`${cpd.common.logo}-delete-icon`, ['sp-login-scale']);
  }

  const hideIconBlock = e => {
    stopPropagation(e)
    controlDom(`${cpd.common.logo}-icon-block`, ['sp-login-visibility'], false);
    controlDom(`${cpd.common.logo}-edit-icon`, ['sp-login-scale'], false);
    controlDom(`${cpd.common.logo}-delete-icon`, ['sp-login-scale'], false);
  }

  const initEditBlock = e => {
    stopPropagation(e)
    setImg(`${cpd.common.logo}-img-block img`, browserFile);
    controlDom(`${cpd.common.logo}-icon-block`, [isPhoneSize ? 'sp-login-phone-width' : 'sp-login-width', 'sp-login-opacity', 'sp-login-visibility'], false);
  }

  const showEditBlock = e => {
    stopPropagation(e)
    initChildBlock();

    const containerDom = document.querySelector('.sp-login-logo-container');
    const height = containerDom.getBoundingClientRect().height;
    const editLogoDom = document.querySelector('.sp-login-logo-edit-block');

    containerDom.classList.add('sp-login-background');
    editLogoDom.style.top = `${height}px`;
    controlDom('sp-login-logo-edit-block', [isPhoneSize ? 'sp-login-phone-width' : 'sp-login-width', 'sp-login-opacity', 'sp-login-visibility']);
  }

  const hideEditBlock = e => {
    stopPropagation(e)
    controlDom('sp-login-logo-edit-block', [isPhoneSize ? 'sp-login-phone-width' : 'sp-login-width', 'sp-login-opacity', 'sp-login-visibility'], false);
  }

  return (
    <div
      className={`sp-login-container ${isPreviewMode ? 'sp-login-container--preview' : ''} ${cpd.common.logo}-container`}
      onClick={inputLogo}
      onMouseOver={showIconBlock}
      onMouseOut={hideIconBlock}
    >
      <div className={`sp-login-block ${isPreviewMode ? 'sp-login-block--preview' : ''}`}>
        <div className='sp-login-body-block'>
          <div className={`${cpd.common.logo}-img-block`}>
            <img src={browserFile} alt='' />
          </div>
          <input
            type='file'
            style={{ display: 'none' }}
            className='sp-login-upload-logo'
            accept='image/*'
            onChange={e => {
              const file = e.target.files[0];
              getBase64(file)
                .then(result => setImg(`${cpd.common.logo}-img-block img`, result))
                .catch(err => console.log(err));
            }}
          />
        </div>
        {
          !isPreviewMode && (
            <>
              <div className={`${cpd.common.logo}-icon-block`}>
                <i
                  className={`${cpd.common.logo}-delete-icon`}
                  onClick={initEditBlock}
                />
                <i
                  className={`${cpd.common.logo}-edit-icon`}
                  onClick={showEditBlock}
                />
              </div>
            </>
          )
        }
        <div className={`${cpd.common.logo}-edit-block`} onClick={stopPropagation}>
          <div className='sp-login-edit-title'>Logo (shared)</div>
          <div className='sp-login-edit-content'>
            <div className='sp-login-download'>
              <Input
                type='text'
                value={imgUrl}
                onChange={e => setImgUrl(e.target.value)}
                onClick={stopPropagation}
              />
              <Button
                label='Download'
                className='btn-grey-blue'
                onClick={downloadImg}
              />
            </div>
            <div className='sp-login-tip mt-2'>Maximum upload image size: 100 KB.</div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Logo;