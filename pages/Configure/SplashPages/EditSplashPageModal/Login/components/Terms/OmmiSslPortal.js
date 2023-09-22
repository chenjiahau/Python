import { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import Slider from '@mui/material/Slider';

// Component prefix definition
import cpd from '../common-prefix-definition';

// Util
import { stopPropagation, controlDom, setColor, setFontSize, setFontFamily } from '../../util';

// Component
import { Input, Button, DropdownWithItem } from 'components/';
import { initChildBlock } from '../Common/Header';

const fontFamilyDefinition = [
  'Arial', 'Courier', 'Georgia', 'Helvetica', 'Times New Roman',
  'Trebuchet MS', 'Verdana'
];;

const OmmiSslPortalTerms = ({ style, isPreviewMode, isPhoneSize }) => {

  // State
  const [byText, setByText] = useState('Sign on to download OpenVPN clients and Connection Profile.');
  const [showFontColorPicker, setShowFontColorPicker] = useState(false);

  const defaultFSize = 12;
  const defaultFColor = '#5c5c5c';
  const [fSize, setFSize] = useState(defaultFSize);
  const [fColor, setFColor] = useState(defaultFColor);
  const [fFamilies, setFFamilies] = useState([]);

  // Method
  const showIconBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.terms.omniSslPortal}-icon-block`, ['sp-login-visibility']);
    controlDom(`${cpd.terms.omniSslPortal}-edit-icon`, ['sp-login-scale']);
  }

  const hideIconBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.terms.omniSslPortal}-icon-block`, ['sp-login-visibility'], false);
    controlDom(`${cpd.terms.omniSslPortal}-edit-icon`, ['sp-login-scale'], false);
  }

  const showEditBlock = e => {
    stopPropagation(e)
    initChildBlock();

    const containerDom = document.querySelector('.sp-login-omni-ssl-portal-terms-container');
    const height = containerDom.getBoundingClientRect().height;
    const editLogoDom = document.querySelector('.sp-login-omni-ssl-portal-terms-edit-block');

    containerDom.classList.add('sp-login-background');
    editLogoDom.style.top = `${height}px`;
    controlDom('sp-login-omni-ssl-portal-terms-edit-block', [isPhoneSize ? 'sp-login-phone-width-width' : 'sp-login-width', 'sp-login-opacity', 'sp-login-visibility']);
  }

  const changeColor = c => {
    setFColor(c.hex);
    setColor(`${cpd.terms.omniSslPortal}-text`, c.hex);
  }

  const changeFontSize = (e, value) => {
    setFSize(value);
    setFontSize(`${cpd.terms.omniSslPortal}-text`, value);
    showEditBlock(e);
  }

  const changeFontFamily = item => {
    const updatedFontFamilies = [];
    fFamilies.forEach(fontFamily => {
      updatedFontFamilies.push({
        ...fontFamily,
        isActive: fontFamily.title === item.title
      });
    });
    setFFamilies(updatedFontFamilies);

    setFontFamily(`${cpd.terms.omniSslPortal}-text`, item.title);
  }

  const changeText = () => {
    const dom = document.querySelector(`.${cpd.terms.omniSslPortal}-text`);
    const color = dom.style.color || defaultFColor;
    const size = dom.style.fontSize || defaultFSize;

    dom.style.color = color;
    dom.style.fontSize = `${size}px`;
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
    setFFamilies(updatedFontFamilies);
  }, []);

  return (
    <div
      className={`sp-login-text-container ${isPreviewMode ? 'sp-login-container--align-left-preview' : ''} ${cpd.terms.omniSslPortal}-container`}
      style={{ ...style }}
      onChange={() => { }}
      onMouseOver={showIconBlock}
      onMouseOut={hideIconBlock}
    >
      <div className={`sp-login-block ${isPreviewMode ? 'sp-login-block--preview sp-login-block-terms-preview' : ''}`}>
        <div className='sp-login-body-block'>
          <div
            className={`sp-login-terms ${cpd.terms.omniSslPortal}-text`}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={e => {
              changeText();
              showEditBlock(e);
            }}
          >
            <div className='pre-text'>{byText}</div>
          </div>
        </div>
        {
          !isPreviewMode && (
            <>
              <div className={`${cpd.terms.omniSslPortal}-icon-block`}>
                <i
                  className={`${cpd.terms.omniSslPortal}-edit-icon`}
                  onClick={showEditBlock}
                />
              </div>
            </>
          )
        }
        <div className={`${cpd.terms.omniSslPortal}-edit-block`} onClick={stopPropagation}>
          <div className='sp-login-edit-title'>Welcome message</div>
          <div className='sp-login-edit-content'>
            <div className='left-and-right'>
              <div className='left'>
                <div className='form-title'>Font color</div>
                <div className='sp-login-color-picker'>
                  <Button
                    label={fColor}
                    onClick={() => setShowFontColorPicker(!showFontColorPicker)}
                    style={{ backgroundColor: fColor, color: fColor === '#ffffff' ? '#000000' : '#ffffff' }}
                  />
                  {
                    showFontColorPicker && (
                      <div>
                        <div onClick={() => setShowFontColorPicker(false)} />
                        <SketchPicker color={fColor} onChange={changeColor} />
                      </div>
                    )
                  }
                </div>
              </div>
              <div className='right'>
                <div className='form-title'>Font size</div>
                <div className='sp-login-font-size'>
                  <div className='slider'>
                    <Slider
                      value={fSize}
                      step={1}
                      min={12}
                      max={64}
                      onChange={(e, value) => changeFontSize(e, value)}
                    />
                  </div>
                  <Input
                    type='text'
                    value={fSize}
                    onChange={e => setFSize(+e.target.value)}
                  />
                  <div className='unit'>px</div>
                </div>
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <div className='form-title mb-2'>Font family</div>
              <DropdownWithItem
                type='normal'
                selectedItem={fFamilies.find(fontFamily => fontFamily.isActive)}
                itemList={fFamilies}
                onClickButton={e => setShowFontColorPicker(false)}
                onClick={item => changeFontFamily(item)}
              />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default OmmiSslPortalTerms;