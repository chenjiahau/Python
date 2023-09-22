import { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';

// Component prefix definition
import cpd from '../common-prefix-definition';

// Util
import { stopPropagation, controlDom, setFontColor, setBackgroundColor } from '../../util';

// Component
import { Button, DropdownWithItem, Input } from 'components/';
import { initChildBlock } from '../Common/Header';

const fontFamilyDefinition = [
  'Arial', 'Courier', 'Georgia', 'Helvetica', 'Times New Roman',
  'Trebuchet MS', 'Verdana'
];

const WebContentFilterButton = ({ style, isPreviewMode, isPhoneSize }) => {

  const text = 'Set the button to link to';

  // State
  const [url, setUrl] = useState('');
  const [showFontColorPicker, setShowFontColorPicker] = useState(false);
  const [showBtnColorPicker, setShowBtnColorPicker] = useState(false);

  const defaultFColor = '#ffffff';
  const defaultBtnColor = '#172664';
  const [fColor, setFColor] = useState(defaultFColor);
  const [btnColor, setBtnColor] = useState(defaultBtnColor);
  const [fontFamilies, setFontFamilies] = useState([]);

  // Method
  const showIconBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.link.webContentFilter}-icon-block`, ['sp-login-visibility']);
    controlDom(`${cpd.link.webContentFilter}-delete-icon`, ['sp-login-scale']);
    controlDom(`${cpd.link.webContentFilter}-edit-icon`, ['sp-login-scale']);
  }

  const hideIconBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.link.webContentFilter}-icon-block`, ['sp-login-visibility'], false);
    controlDom(`${cpd.link.webContentFilter}-delete-icon`, ['sp-login-scale'], false);
    controlDom(`${cpd.link.webContentFilter}-edit-icon`, ['sp-login-scale'], false);
  }

  const deleteUrl = e => {
    stopPropagation(e);
    setUrl('');
    setFColor(defaultFColor);
    setBtnColor(defaultBtnColor);
  }

  const showEditBlock = e => {
    stopPropagation(e);
    initChildBlock();

    const containerDom = document.querySelector('.sp-login-web-content-filter-link-container');
    const height = containerDom.getBoundingClientRect().height;
    const editLogoDom = document.querySelector('.sp-login-web-content-filter-link-edit-block');

    containerDom.classList.add('sp-login-background');
    editLogoDom.style.top = `${height}px`;
    controlDom('sp-login-web-content-filter-link-edit-block', [isPhoneSize ? 'sp-login-phone-width' : 'sp-login-width', 'sp-login-opacity', 'sp-login-visibility']);
  }

  const changeFontColor = c => {
    setFColor(c.hex);
    setFontColor(`${cpd.link.webContentFilter}-text`, c.hex);
  }

  const changeButtonColor = c => {
    setBtnColor(c.hex);
    setBackgroundColor(`${cpd.link.webContentFilter}-text`, c.hex);
  }

  const changeFontFamily = item => {
    const updatedFontFamilies = [];
    fontFamilies.forEach(fontFamily => {
      updatedFontFamilies.push({
        ...fontFamily,
        isActive: fontFamily.title === item.title
      });
    });
    setFontFamilies(updatedFontFamilies);
    document.querySelector(`.${cpd.link.webContentFilter}-text`).style.fontFamily = item.title;
  }

  // Side effect
  useEffect(() => {
    const updatedFontFamilies = [];
    fontFamilyDefinition.forEach((fontFamily, index) => {
      updatedFontFamilies.push({
        title: fontFamily,
        isActive: index === 0
      });
    });
    setFontFamilies(updatedFontFamilies);
  }, []);

  return (
    <div
      className={`sp-login-button-container ${isPreviewMode ? 'sp-login-container--preview' : ''} ${cpd.link.webContentFilter}-container`}
      style={{ ...style }}
      onChange={() => { }}
      onMouseOver={showIconBlock}
      onMouseOut={hideIconBlock}
    >
      <div className={`sp-login-block ${isPreviewMode ? 'sp-login-block--preview' : ''} sp-login-block--clear sp-login-block--no-border`}>
        <div className='sp-login-full-body-block'>
          {
            url ? (
              <>
                <div
                  className={`sp-login-button ${cpd.link.webContentFilter}-text`}
                  style={{ backgroundColor: `${btnColor}px`, color: fColor }}
                  contentEditable={true}
                  suppressContentEditableWarning={true}
                // onInput={e => showEditBlock(e)}
                >
                  Button
                </div>
              </>
            ) : (
              <>
                <div className='text-center'>{text}</div>
              </>
            )
          }
        </div>
        {
          !isPreviewMode && (
            <>
              <div className={`${cpd.link.webContentFilter}-icon-block`}>
                <i
                  className={`${cpd.link.webContentFilter}-delete-icon`}
                  onClick={deleteUrl}
                />
                <i
                  className={`${cpd.link.webContentFilter}-edit-icon`}
                  onClick={showEditBlock}
                />
              </div>
            </>
          )
        }
        <div className={`${cpd.link.webContentFilter}-edit-block`} onClick={stopPropagation}>
          <div className='sp-login-edit-title'>Action button</div>
          <div className='sp-login-edit-content'>
            <div className='left-and-right'>
              <div className='left'>
                <div className='form-title'>Font color</div>
                <div className='sp-login-color-picker'>
                  <Button
                    label={fColor}
                    onClick={() => setShowFontColorPicker(!showFontColorPicker)}
                    style={{ backgroundColor: fColor, fontColor: fColor === '#ffffff' ? '#000000' : '#ffffff' }}
                  />
                  {
                    showFontColorPicker && (
                      <div>
                        <div onClick={() => setShowFontColorPicker(false)} />
                        <SketchPicker color={fColor} onChange={changeFontColor} />
                      </div>
                    )
                  }
                </div>
              </div>
              <div className='right'>
                <div className='form-title'>Button color</div>
                <div className='sp-login-color-picker'>
                  <Button
                    label={btnColor}
                    onClick={() => setShowBtnColorPicker(!showBtnColorPicker)}
                    style={{ backgroundColor: btnColor, buttonColor: btnColor === '#ffffff' ? '#000000' : '#ffffff' }}
                  />
                  {
                    showBtnColorPicker && (
                      <div>
                        <div onClick={() => setShowBtnColorPicker(false)} />
                        <SketchPicker color={btnColor} onChange={changeButtonColor} />
                      </div>
                    )
                  }
                </div>
              </div>
            </div>
            <div className='mt-2 mb-2' style={{ position: 'relative' }}>
              <div className='form-title mb-2'>Font family</div>
              <DropdownWithItem
                type='normal'
                selectedItem={fontFamilies.find(fontFamily => fontFamily.isActive)}
                itemList={fontFamilies}
                onClickButton={e => setShowFontColorPicker(false)}
                onClick={item => changeFontFamily(item)}
              />
            </div>
            <div style={{ position: 'relative' }}>
              <div className='form-title mb-2 required'>URL</div>
              <div className='d-flex align-items-center'>
                <div>https://</div>
                <div className='space'></div>
                <Input
                  type='text'
                  value={url}
                  style={{ width: '100%' }}
                  placeholder='example.com'
                  onChange={e => {
                    setUrl(e.target.value);
                    showEditBlock(e);
                  }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default WebContentFilterButton;