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
];

const defaultText = `
This agreement sets out the terms and conditions on the wireless internet access ("the Service") is provided to you, a guest, vendor, or employee of the owner and/or provider of this network.<br />
<br />
By using our internet service, you hereby expressly acknowledge and agree that there are significant security, privacy and confidentiality risks inherent in accessing or transmitting information through the internet, whether the connection is facilitated through wired or wireless technology. Security issues include, without limitation, interception of transmissions, loss of data, and the introduction or viruses and other programs that can corrupt or damage your computer.<br />
<br />
Accordingly, you agree that the owner and/or provider of this network is NOT liable for any interception or transmissions, computer worms or viruses, loss of data, file corruption, hacking or damage to your computer or other devices that result from the transmission or download of information or materials through the internet service provided.<br />
<br />
Use of the wireless network is subject to the general restrictions outlined below. If abnormal, illegal, or unauthorized behavior is detected, including heavy consumption of bandwidth, the network provider reserves the right to permanently disconnect the offending device from the wireless network.<br />
<br />
IF YOU DO NOT AGREE WITH THESE TERMS,<br />
INCLUDING CHANGES THERETO, DO NOT ACCESS OR USE THE SERVICE.<br />
<br />
1. UNACCEPTABLE ILLEGAL USES<br />
<br />
1.1 Spamming and invasion of privacy - Sending of unsolicited bulk and/or commercial messages over the Internet using the Service or using the Service for activities that invade another's privacy.<br />
<br />
1.2 Intellectual property right violations - Engaging in any activity that infringes or misappropriates the intellectual property rights of others, including patents, copyrights, trademarks, service marks, trade secrets, or any other proprietary right of any third party.<br />
<br />
1.3 Accessing illegally or without authorization computers, accounts, equipment or networks belonging to another party, or attempting to penetrate/circumvent security measures of another system. This includes any activity that may be used as a precursor to an attempted system penetration, including, but not limited to, port scans, stealth scans, or other information gathering activity<br />
<br />
1.4 The transfer of technology, software, or other materials in violation of applicable export laws and regulations.<br />
<br />
1.5 Export Control Violations<br />
<br />
1.6 Using the Service in violation of applicable law and regulation, including, but not limited to, advertising, transmitting, or otherwise making available ponzi schemes, pyramid schemes, fraudulently charging credit cards, pirating software, or making fraudulent offers to sell or buy products, items, or services.<br />
<br />
1.7 Uttering threats;<br />
<br />
1.8 Distribution of pornographic materials to minors; and Child pornography.<br />
<br />
2. UNACCEPTABLE USES<br />
<br />
2.1 High bandwidth operations, such as large file transfers and media sharing with peer-to-peer programs (i.e.torrents)<br />
<br />
2.2 Obscene or indecent speech or materials<br />
<br />
2.3 Defamatory or abusive language<br />
<br />
2.4 Using the Service to transmit, post, upload, or otherwise making available defamatory, harassing, abusive, or threatening material or language that encourages bodily harm, destruction of property or harasses another.<br />
<br />
2.5 Forging or misrepresenting message headers, whether in whole or in part, to mask the originator of the message.<br />
<br />
2.6 Facilitating a Violation of these Terms of Use<br />
<br />
2.7 Hacking<br />
<br />
2.8 Distribution of Internet viruses, Trojan horses, or other destructive activities<br />
<br />
2.9 Distributing information regarding the creation of and sending Internet viruses, worms, Trojan horses, pinging, flooding, mail-bombing, or denial of service attacks. Also, activities that disrupt the use of or interfere with the ability of others to effectively use the node or any connected network, system, service, or equipment.<br />
<br />
2.10 Advertising, transmitting, or otherwise making available any software product, product, or service that is designed to violate these Terms of Use, which includes the facilitation of the means to spam, initiation of pinging, flooding, mail-bombing, denial of service attacks, and piracy of software.<br />
<br />
2.11 The sale, transfer, or rental of the Service to customers, clients or other third parties, either directly or as part of a service or product created for resale.<br />
<br />
2.12 Seeking information on passwords or data belonging to another user.<br />
<br />
2.13 Making unauthorized copies of proprietary software, or offering unauthorized copies of proprietary software to others.<br />
<br />
2.14 Intercepting or examining the content of messages, files or communications in transit on a data network.<br />
<br />
3. CRIMINAL ACTIVITY<br />
<br />
3.1 You must not use the Service to engage in any activity which constitutes or is capable of constituting a criminal offence in any country throughout the world.<br />
<br />
3.2 You agree and acknowledge that we may be required to provide assistance and information to law enforcement, governmental agencies and other authorities.<br />
<br />
3.3 You agree and acknowledge that we will monitor your activity while you use this service and keep a log of the Internet Protocol ("IP") addresses of any devices with Mac Address which access the Service, the times when they have accessed the Service and the activity associated with that IP address and Mac Address.<br />
<br />
3.4 You further agree we are entitled to co-operate with law enforcement authorities and rights-holders in the investigation of any suspected or alleged illegal activity by you which may include, but is not limited to, disclosure of such information as we have (whether pursuant to clause 3.3 or otherwise), and are entitled to provide by law, to law enforcement authorities or rights-holders.<br />
<br />
By agreeing to the terms of service, I confirm that I accept these terms and conditions as the basis of my use of the wireless internet access provided.<br />
`;

const TermsTerms = ({ style, isPreviewMode, isPhoneSize }) => {

  // State
  const [text, setText] = useState(defaultText);
  const [showFontColorPicker, setShowFontColorPicker] = useState(false);

  const defaultFSize = 12;
  const defaultFColor = '#333333';
  const [fSize, setFSize] = useState(defaultFSize);
  const [fColor, setFColor] = useState(defaultFColor);
  const [fFamilies, setFFamilies] = useState([]);

  // Method
  const showIconBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.terms.terms}-icon-block`, ['sp-login-visibility']);
    controlDom(`${cpd.terms.terms}-edit-icon`, ['sp-login-scale']);
  }

  const hideIconBlock = e => {
    stopPropagation(e);
    controlDom(`${cpd.terms.terms}-icon-block`, ['sp-login-visibility'], false);
    controlDom(`${cpd.terms.terms}-edit-icon`, ['sp-login-scale'], false);
  }

  const showEditBlock = e => {
    stopPropagation(e)
    initChildBlock();

    const containerDom = document.querySelector('.sp-login-terms-terms-container');
    const editLogoDom = document.querySelector('.sp-login-terms-terms-edit-block');

    containerDom.classList.add('sp-login-background');
    editLogoDom.style.top = '30px';
    controlDom('sp-login-terms-terms-edit-block', [isPhoneSize ? 'sp-login-phone-width-width' : 'sp-login-width', 'sp-login-opacity', 'sp-login-visibility']);
  }

  const changeColor = c => {
    setFColor(c.hex);
    setColor(`${cpd.terms.terms}-text`, c.hex);
  }

  const changeFontSize = (e, value) => {
    setFSize(value);
    setFontSize(`${cpd.terms.terms}-text`, value);
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
    setFontFamily(`${cpd.terms.terms}-text`, item.title);
  }

  const changeText = () => {
    const dom = document.querySelector(`.${cpd.terms.terms}-text`);
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
      className={`sp-login-terms-container ${isPreviewMode ? 'sp-login-container--align-left-preview' : ''} ${cpd.terms.terms}-container`}
      style={{ ...style }}
      onChange={() => { }}
      onMouseOver={showIconBlock}
      onMouseOut={hideIconBlock}
    >
      <div className={`sp-login-block ${isPreviewMode ? 'sp-login-block--preview' : ''}`}>
        <div
          className={`sp-login-body-block sp-login-terms ${cpd.terms.terms}-text`}
          style={{ fontSize: `${fSize}px`, color: fColor }}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={e => { changeText(); }}
          dangerouslySetInnerHTML={{ __html: text }}
        >
        </div>
        {
          !isPreviewMode && (
            <>
              <div className={`${cpd.terms.terms}-icon-block`}>
                <i
                  className={`${cpd.terms.terms}-edit-icon`}
                  onClick={showEditBlock}
                />
              </div>
            </>
          )
        }
        <div className={`${cpd.terms.terms}-edit-block`} onClick={stopPropagation}>
          <div className='sp-login-edit-title'>Terms and Conditions Title (shared)</div>
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

export default TermsTerms;