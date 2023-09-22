import { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import Slider from '@mui/material/Slider';

// Component prefix definition
import cpd from '../common-prefix-definition';

// Util
import { stopPropagation, controlDom, setFontColor } from '../../util';

// Component
import { Input, Button, DropdownWithItem } from 'components/';
import { initChildBlock } from '../Common/Header';

const fontFamilyDefinition = [
  'Arial', 'Courier', 'Georgia', 'Helvetica', 'Times New Roman',
  'Trebuchet MS', 'Verdana'
];

const WebContentFilterError = ({ style, isPreviewMode, isPhoneSize }) => {

  // State
  const [text, setText] = useState('You have tried to access the website or content blocked to access by the system administrator. Contact the system administrator for more information.');
  const [showFontColorPicker, setShowFontColorPicker] = useState(false);

  const defaultFSize = 12;
  const defaultFColor = '#af0004';
  const [fSize, setFSize] = useState(defaultFSize);
  const [fColor, setFColor] = useState(defaultFColor);
  const [fontFamilies, setFontFamilies] = useState([]);

  // Method
  const showIconBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.error.webContentFilter}-icon-block`, ['sp-login-visibility']);
    controlDom(`${cpd.error.webContentFilter}-edit-icon`, ['sp-login-scale']);
  }

  const hideIconBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.error.webContentFilter}-icon-block`, ['sp-login-visibility'], false);
    controlDom(`${cpd.error.webContentFilter}-edit-icon`, ['sp-login-scale'], false);
  }

  const showEditBlock = e => {
    stopPropagation(e)
    initChildBlock();

    const containerDom = document.querySelector('.sp-login-web-content-filter-error-container');
    const height = containerDom.getBoundingClientRect().height;
    const editLogoDom = document.querySelector('.sp-login-web-content-filter-error-edit-block');

    containerDom.classList.add('sp-login-background');
    editLogoDom.style.top = `${height}px`;
    controlDom('sp-login-web-content-filter-error-edit-block', [isPhoneSize ? 'sp-login-phone-width' : 'sp-login-width', 'sp-login-opacity', 'sp-login-visibility']);
  }

  const changeColor = c => {
    setFColor(c.hex);
    setFontColor(`${cpd.error.webContentFilter}-text`, c.hex);

    const divDom = document.querySelectorAll(`.${cpd.error.webContentFilter}-text > div`);
    for (let i = 0; i < divDom.length; i++) {
      divDom[i].style.color = c.hex;
    }
  }

  const changeFontSize = (e, value) => {
    setFSize(value);
    document.querySelector(`.${cpd.error.webContentFilter}-text`).style.fontSize = `${value}px`;
    const divDom = document.querySelectorAll(`.${cpd.error.webContentFilter}-text > div`);

    for (let i = 0; i < divDom.length; i++) {
      divDom[i].style.fontSize = `${value}px`;
    }

    showEditBlock(e);
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
    document.querySelector(`.${cpd.error.webContentFilter}-text`).style.fontFamily = item.title;
  }

  const changeText = () => {
    const dom = document.querySelector(`.${cpd.error.webContentFilter}-text`);
    const divDom = document.querySelectorAll(`.${cpd.error.webContentFilter}-text > div`);

    const fontSize = dom.style.fontSize || defaultFSize;
    for (let i = 0; i < divDom.length; i++) {
      divDom[i].style.fontSize = `${fontSize}px`;
    }

    const color = dom.style.color || defaultFColor;
    for (let i = 0; i < divDom.length; i++) {
      divDom[i].style.color = color;
    }
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
      className={`sp-login-error-container ${isPreviewMode ? 'sp-login-container--preview' : ''} ${cpd.error.webContentFilter}-container`}
      style={{ ...style }}
      onChange={() => { }}
      onMouseOver={showIconBlock}
      onMouseOut={hideIconBlock}
    >
      <div className={`sp-login-block ${isPreviewMode ? 'sp-login-block--preview' : ''}`}>
        <div className='sp-login-body-block'>
          <h1
            className={`sp-login-error ${cpd.error.webContentFilter}-text`}
            style={{ fontSize: `${fSize}px`, color: fColor }}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={e => {
              changeText();
              showEditBlock(e);
            }}
          >
            {text}
          </h1>
        </div>
        {
          !isPreviewMode && (
            <>
              <div className={`${cpd.error.webContentFilter}-icon-block`}>
                <i
                  className={`${cpd.error.webContentFilter}-edit-icon`}
                  onClick={showEditBlock}
                />
              </div>
            </>
          )
        }
        <div className={`${cpd.error.webContentFilter}-edit-block`} onClick={stopPropagation}>
          <div className='sp-login-edit-title'>Title (shared)</div>
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
                selectedItem={fontFamilies.find(fontFamily => fontFamily.isActive)}
                itemList={fontFamilies}
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

export default WebContentFilterError;