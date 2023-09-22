import { useState, useEffect } from 'react';
import { SketchPicker } from 'react-color';
import Slider from '@mui/material/Slider';

// Component prefix definition
import cpd from '../common-prefix-definition';

// Util
import { stopPropagation, controlDom } from '../../util';

// Component
import { Input, Button, DropdownWithItem } from 'components/';
import { initChildBlock } from '../Common/Header';

const fontFamilyDefinition = [
  'Arial', 'Courier', 'Georgia', 'Helvetica', 'Times New Roman',
  'Trebuchet MS', 'Verdana'
];

const InstructionMessage = ({ isPreviewMode, isPhoneSize, selectedMessage }) => {

  // State
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [showText3, setShowText3] = useState(false);
  const [showFontColorPicker, setShowFontColorPicker] = useState(false);

  const defaultFSize = 12;
  const defaultFColor = '#67b02c';
  const [fSize, setFSize] = useState(defaultFSize);
  const [fColor, setFColor] = useState(defaultFColor);
  const [fFamilies, setFFamilies] = useState([]);

  // Method
  const showIconBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.message.instruction}-icon-block`, ['sp-login-visibility']);
    controlDom(`${cpd.message.instruction}-edit-icon`, ['sp-login-scale']);
  }

  const hideIconBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.message.instruction}-icon-block`, ['sp-login-visibility'], false);
    controlDom(`${cpd.message.instruction}-edit-icon`, ['sp-login-scale'], false);
  }

  const showEditBlock = e => {
    stopPropagation(e)
    initChildBlock();

    const containerDom = document.querySelector('.sp-login-instruction-message-container');
    const height = containerDom.getBoundingClientRect().height;
    const editLogoDom = document.querySelector('.sp-login-instruction-message-edit-block');

    containerDom.classList.add('sp-login-background');
    editLogoDom.style.top = `${height}px`;
    controlDom('sp-login-instruction-message-edit-block', [isPhoneSize ? 'sp-login-phone-width' : 'sp-login-width', 'sp-login-opacity', 'sp-login-visibility']);
  }

  const changeColor = c => {
    setFColor(c.hex);

    const doms = document.querySelectorAll(`.${cpd.message.instruction}-text`);
    for (let i = 0; i < doms.length; i++) {
      doms[i].style.color = c.hex;
    }
  }

  const changeFontSize = (e, value) => {
    setFSize(value);

    const doms = document.querySelectorAll(`.${cpd.message.instruction}-text`);
    for (let i = 0; i < doms.length; i++) {
      doms[i].style.fontSize = `${value}px`;
    }

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

    const doms = document.querySelectorAll(`.${cpd.message.instruction}-text`);
    for (let i = 0; i < doms.length; i++) {
      doms[i].style.fontFamily = item.title;
    }
  }

  const changeText = () => {
    const doms = document.querySelectorAll(`.${cpd.message.instruction}-text`);
    const size = doms[0].style.fontSize || defaultFSize;
    const color = doms[0].style.color || defaultFColor;

    for (let i = 0; i < doms.length; i++) {
      doms[i].style.fontSize = size;
      doms[i].style.color = color;
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

  useEffect(() => {
    if (selectedMessage && selectedMessage.position === 'instruction') {
      setText1(selectedMessage.text[0]);
      setText2(selectedMessage.text[1]);
      setText3(selectedMessage.text[2]);
    }
  }, [selectedMessage]);

  return (
    <div
      className={`sp-login-container ${isPreviewMode ? 'sp-login-container--preview' : ''} ${cpd.message.instruction}-container`}
      onMouseOver={showIconBlock}
      onMouseOut={hideIconBlock}
    >
      <div className={`sp-login-block ${isPreviewMode ? 'sp-login-block--preview' : ''} sp-login-block--clear sp-login-block--no-border`}>
        <div className='sp-login-body-block sp-login-instruction-message'>
          <div
            className={`${cpd.message.instruction}-text`}
            style={{ fontSize: `${fSize}px`, color: fColor }}
            contentEditable={isPreviewMode ? false : true}
            suppressContentEditableWarning={true}
            onInput={e => {
              changeText();
              showEditBlock(e);
            }}
          >
            {text1}
            <br />
            {text2}
            <br />
          </div>
          <div
            className={`${cpd.message.instruction}-text`}
            style={{ fontSize: `${fSize}px`, color: fColor }}
          >
            [<span className='sp-login-success-message-link' onClick={() => setShowText3(!showText3)}>
              Click here for detailed instructions
            </span>]
          </div>
          {
            showText3 && (
              <>
                <br />
                <div
                  className={`${cpd.message.instruction}-text`}
                  style={{ fontSize: `${fSize}px`, color: fColor }}
                  dangerouslySetInnerHTML={{ __html: text3 }}
                />
              </>
            )
          }
        </div>
        {
          !isPreviewMode && (
            <>
              <div className={`${cpd.message.instruction}-icon-block`}>
                <i
                  className={`${cpd.message.instruction}-edit-icon`}
                  onClick={showEditBlock}
                />
              </div>
            </>
          )
        }
        <div className={`${cpd.message.instruction}-edit-block`} onClick={stopPropagation}>
          <div className='sp-login-edit-title'>{selectedMessage.title}</div>
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

export default InstructionMessage;