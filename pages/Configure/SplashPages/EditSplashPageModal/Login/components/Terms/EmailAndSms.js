import { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import Slider from '@mui/material/Slider';

// Component prefix definition
import cpd from '../common-prefix-definition';

// Util
import { stopPropagation, controlDom, setFontSize, setFontFamily } from '../../util';

// Component
import { Input, Button, DropdownWithItem } from 'components/';
import { initChildBlock } from '../Common/Header';

const fontFamilyDefinition = [
  'Arial', 'Courier', 'Georgia', 'Helvetica', 'Times New Roman',
  'Trebuchet MS', 'Verdana'
];;

const EmailAndSmsTerms = ({ isPreviewMode, isPhoneSize }) => {

  // State
  const [byText, setByText] = useState('By logging in to my social media account or signing up with my email to receive an authentication link for accessing Wi-Fi.');
  const [text, setText] = useState('I have read and agree to the');
  const [linkText, setLinkText] = useState('Terms and Conditions');
  const [showFontColorPicker, setShowFontColorPicker] = useState(false);

  const defaultFSize = 12;
  const defaultFColor = '#5c5c5c';
  const [fSize, setFSize] = useState(defaultFSize);
  const [fColor, setFColor] = useState(defaultFColor);
  const [fFamilies, setFFamilies] = useState([]);

  // Method
  const showIconBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.terms.emailAndSms}-icon-block`, ['sp-login-visibility']);
    controlDom(`${cpd.terms.emailAndSms}-edit-icon`, ['sp-login-scale']);
  }

  const hideIconBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.terms.emailAndSms}-icon-block`, ['sp-login-visibility'], false);
    controlDom(`${cpd.terms.emailAndSms}-edit-icon`, ['sp-login-scale'], false);
  }

  const showEditBlock = e => {
    stopPropagation(e)
    initChildBlock();

    const containerDom = document.querySelector('.sp-login-email-and-sms-terms-container');
    const height = containerDom.getBoundingClientRect().height;
    const editLogoDom = document.querySelector('.sp-login-email-and-sms-terms-edit-block');

    containerDom.classList.add('sp-login-background');
    editLogoDom.style.top = `${height}px`;
    controlDom('sp-login-email-and-sms-terms-edit-block', [isPhoneSize ? 'sp-login-phone-width-width' : 'sp-login-width', 'sp-login-opacity', 'sp-login-visibility']);
  }

  const changeColor = c => {
    setFColor(c.hex);

    const doms = document.querySelectorAll(`.${cpd.terms.emailAndSms}-text`);
    for (let i = 0; i < doms.length; i++) {
      doms[i].style.color = c.hex;
    }
  }

  const changeFontSize = (e, value) => {
    setFSize(value);

    const doms = document.querySelectorAll(`.${cpd.terms.emailAndSms}-text`);
    for (let i = 0; i < doms.length; i++) {
      doms[i].style.fontSize = `${value}px`;
    }

    setFontSize(`${cpd.terms.emailAndSms}-link-text`, value);
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

    setFontFamily(`${cpd.terms.emailAndSms}-text`, item.title);
    setFontFamily(`${cpd.terms.emailAndSms}-link-text`, item.title);
  }

  const changeText = () => {
    const doms = document.querySelectorAll(`.${cpd.terms.emailAndSms}-text`);
    const color = doms[0].style.color || defaultFColor;
    const size = doms[0].style.fontSize || defaultFSize;

    for (let i = 0; i < doms.length; i++) {
      doms[i].style.color = color;
      doms[i].style.fontSize = `${size}px`;
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
    setFFamilies(updatedFontFamilies);
  }, []);

  return (
    <div
      className={`sp-login-text-container ${isPreviewMode ? 'sp-login-container--align-left-preview' : ''} ${cpd.terms.emailAndSms}-container`}
      onChange={() => { }}
      onMouseOver={showIconBlock}
      onMouseOut={hideIconBlock}
    >
      <div className={`sp-login-block ${isPreviewMode ? 'sp-login-block--preview sp-login-block-terms-preview' : ''}`}>
        <div className='sp-login-body-block'>
          <div
            className={`sp-login-terms ${cpd.terms.emailAndSms}-text`}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={e => {
              changeText();
              showEditBlock(e);
            }}
          >
            <div className='pre-text'>{byText}</div>
          </div>
          <span
            className={`sp-login-terms ${cpd.terms.emailAndSms}-text`}
            contentEditable={true}
            suppressContentEditableWarning={true}
            onInput={e => {
              changeText();
              showEditBlock(e);
            }}
          >
            <span className='pre-text'>{text}</span>
          </span>
          <span className={`sp-login-terms ${cpd.terms.emailAndSms}-link-text`}>
            <span className='link-text text'>{linkText}</span>
          </span>
        </div>
        {
          !isPreviewMode && (
            <>
              <div className={`${cpd.terms.emailAndSms}-icon-block`}>
                <i
                  className={`${cpd.terms.emailAndSms}-edit-icon`}
                  onClick={showEditBlock}
                />
              </div>
            </>
          )
        }
        <div className={`${cpd.terms.emailAndSms}-edit-block`} onClick={stopPropagation}>
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

export default EmailAndSmsTerms;