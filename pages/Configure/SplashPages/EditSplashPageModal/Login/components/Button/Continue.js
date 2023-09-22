import { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';

// Component prefix definition
import cpd from '../common-prefix-definition';

// Util
import { stopPropagation, controlDom, setColor, setFontFamily, setBackgroundColor } from '../../util';

// Component
import { Button, DropdownWithItem } from 'components/';
import { initChildBlock } from '../Common/Header';

const fontFamilyDefinition = [
  'Arial', 'Courier', 'Georgia', 'Helvetica', 'Times New Roman',
  'Trebuchet MS', 'Verdana'
];

const ContinueButton = ({ style, isPreviewMode, isPhoneSize }) => {

  // State
  const [text, setText] = useState('Continue');
  const [showFontColorPicker, setShowFontColorPicker] = useState(false);
  const [showBtnColorPicker, setShowBtnColorPicker] = useState(false);

  const defaultFColor = '#ffffff'
  const defaultBtnColor = '#172664';
  const [fColor, setFColor] = useState(defaultFColor);
  const [btnColor, setBtnColor] = useState(defaultBtnColor);
  const [fFamilies, setFFamilies] = useState([]);

  // Method
  const showIconBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.button.continue}-icon-block`, ['sp-login-visibility']);
    controlDom(`${cpd.button.continue}-edit-icon`, ['sp-login-scale']);
  }

  const hideIconBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.button.continue}-icon-block`, ['sp-login-visibility'], false);
    controlDom(`${cpd.button.continue}-edit-icon`, ['sp-login-scale'], false);
  }

  const showEditBlock = e => {
    stopPropagation(e);
    initChildBlock();

    const containerDom = document.querySelector('.sp-login-continue-button-container');
    const height = containerDom.getBoundingClientRect().height;
    const editLogoDom = document.querySelector('.sp-login-continue-button-edit-block');

    containerDom.classList.add('sp-login-background');
    editLogoDom.style.top = `${height}px`;
    controlDom('sp-login-continue-button-edit-block', [isPhoneSize ? 'sp-login-phone-width' : 'sp-login-width', 'sp-login-opacity', 'sp-login-visibility']);
  }

  const changeFontColor = c => {
    setFColor(c.hex);
    setColor(`${cpd.button.continue}-text`, c.hex);
  }

  const changeButtonColor = c => {
    setBtnColor(c.hex);
    setBackgroundColor(`${cpd.button.continue}-text`, c.hex);
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
    setFontFamily(`${cpd.button.continue}-text`, item.title);
  }

  const changeText = () => {
    const dom = document.querySelector(`.${cpd.button.continue}-text`);
    const btnColor = dom.style.backgroundColor || defaultBtnColor;
    const fColor = dom.style.color || defaultFColor;

    dom.style.color = fColor;
    dom.style.backgroundColor = btnColor;
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
      className={`sp-login-button-container ${isPreviewMode ? 'sp-login-container--preview' : ''} ${cpd.button.continue}-container`}
      style={{ ...style }}
      onChange={() => { }}
      onMouseOver={showIconBlock}
      onMouseOut={hideIconBlock}
    >
      <div className={`sp-login-block ${isPreviewMode ? 'sp-login-block--preview' : ''} sp-login-block--clear`}>
        <div className='sp-login-full-body-block'>
          <div
            className={`sp-login-button ${cpd.button.continue}-text`}
            style={{ color: fColor, backgroundColor: btnColor }}
            contentEditable={isPreviewMode ? false : true}
            suppressContentEditableWarning={true}
            onInput={e => {
              changeText();
              showEditBlock(e);
            }}
          >
            {text}
          </div>
        </div>
        {
          !isPreviewMode && (
            <>
              <div className={`${cpd.button.continue}-icon-block`}>
                <i
                  className={`${cpd.button.continue}-edit-icon`}
                  onClick={showEditBlock}
                />
              </div>
            </>
          )
        }
        <div className={`${cpd.button.continue}-edit-block`} onClick={stopPropagation}>
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

export default ContinueButton;