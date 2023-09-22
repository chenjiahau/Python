import modalStyle from '../org-management-modal.module.scss';

import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';

import defaultSitePhoto from 'assets/img/v2/icon/ntt_care/icon_caregiver.svg';

// Slice
import { selectUserLevel } from 'stores/slice/user';

// Component
import { Button, ModalContainer, MessageBoxGroup, Icon } from 'components/';

const defaultMessages = {
  success: '',
  error: '',
  warning: ''
};

const OrgTreePreviewSite = props => {
  const { modalStatus, changeModalStatus } = props;
  const { t } = useTranslation();

  // State
  const userLevel = useSelector(selectUserLevel) || localStorage.getItem('userLevel');
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));

  // Variable
  const nuclias = (
    <table>
      <tbody>
        <tr>
          <td>Address</td>
          <td>:</td>
          <td className='ps-2'></td>
        </tr>
        <tr>
          <td>Country</td>
          <td>:</td>
          <td className='ps-2'>Japan</td>
        </tr>
        <tr>
          <td>Site tag</td>
          <td>:</td>
          <td className='ps-2'>TAG-0</td>
        </tr>
        <tr>
          <td>Time zone</td>
          <td>:</td>
          <td className='ps-2'>Asia/Tokyo(UTC+09:00, DST)</td>
        </tr>
        <tr>
          <td>NTP server 1</td>
          <td>:</td>
          <td className='ps-2'>ntp.nuclias.com</td>
        </tr>
        <tr>
          <td>NTP server 2</td>
          <td>:</td>
          <td className='ps-2'>-</td>
        </tr>
      </tbody>
      <tbody>
        <tr>
          <td colSpan="3"><br /><strong>Contact information</strong></td>
        </tr>
        <tr>
          <td>Name</td>
          <td>:</td>
          <td className='ps-2'></td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>:</td>
          <td className='ps-2'></td>
        </tr>
        <tr>
          <td>Email</td>
          <td>:</td>
          <td className='ps-2'></td>
        </tr>
      </tbody>
    </table>
  );

  const nttcare = (
    <Row>
      <Col md={3}>
        {/* has custom image */}
        {/* {
          userLevel === 'ntt-care-msp' && (
            <img className={modalStyle['site-custom-image']} src={defaultSitePhoto} alt='' />
          )
        } */}
        {/* No custom image */}
        {
          userLevel === 'ntt-care-msp' && (
            <img className={modalStyle['site-image']} src={defaultSitePhoto} alt='' />
          )
        }
      </Col>
      <Col md={9}>
        <table>
          <tbody>
            <tr>
              <td>Address</td>
              <td>:</td>
              <td className='ps-2'></td>
            </tr>
            <tr>
              <td>Country</td>
              <td>:</td>
              <td className='ps-2'>Japan</td>
            </tr>
            <tr>
              <td>Site tag</td>
              <td>:</td>
              <td className='ps-2'>TAG-0</td>
            </tr>
            <tr>
              <td>Time zone</td>
              <td>:</td>
              <td className='ps-2'>Asia/Tokyo(UTC+09:00, DST)</td>
            </tr>
            <tr>
              <td>NTP server 1</td>
              <td>:</td>
              <td className='ps-2'>ntp.nuclias.com</td>
            </tr>
            <tr>
              <td>NTP server 2</td>
              <td>:</td>
              <td className='ps-2'>-</td>
            </tr>
          </tbody>
          <tbody>
            <tr>
              <td colSpan="3"><br /><strong>Family Contact information</strong></td>
            </tr>
            <tr>
              <td>Name</td>
              <td>:</td>
              <td className='ps-2'></td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>:</td>
              <td className='ps-2'></td>
            </tr>
            <tr>
              <td>Email</td>
              <td>:</td>
              <td className='ps-2'></td>
            </tr>
          </tbody>
        </table>
      </Col>
    </Row>
  );

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.previewSite.status}
      hideClose={true}
    >
      <div className='header d-flex justify-content-between'>
        <div className='title'>{t(modalStatus.previewSite.label) + '-' + 'SITE-0'}</div>
        <div>
          <Icon
            style={{ width: '19px', height: '19px' }}
            className="icon-edit"
            onClick={() => {
              changeModalStatus('previewSite', false);
              changeModalStatus('editSite', true);
            }}
          />
          <Icon
            style={{ width: '19px', height: '19px' }}
            className="icon-trash ms-2"
            onClick={() => {
              changeModalStatus('previewSite', false);
              changeModalStatus('deleteSite', true);
            }}
          />
        </div>
      </div>
      <div className='body'>
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />
        {nuclias}
        {/* {userLevel === 'msp' && nuclias}
        {userLevel === 'ntt-care-msp' && nttcare} */}
      </div>
      <div className='footer'>
        <Button
          label='Close'
          className='btn-cancel'
          onClick={() => changeModalStatus('previewSite', false)}
        />
      </div>
    </ModalContainer>
  );
};

export default OrgTreePreviewSite;
