import modalStyle from '../org-management-modal.module.scss';

import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

// Slice
import { selectUserLevel } from 'stores/slice/user';

// Component
import {
  Input, Button, ModalContainer, DropdownWithItem, MessageBoxGroup,
  InputWithIcon, DragAndDropImgContianer
} from 'components/';


const defaultSiteTagList = [
  { title: 'None', isActive: true },
  { title: 'Tag1', isActive: false },
  { title: 'Tag2', isActive: false }
];

const defaultCountryList = [
  {
    title: 'Afghanistan',
    timeZone: [
      { title: 'Asia/Kabul(UTC+04:30, DST)', isActive: true }
    ],
    isActive: true
  },
  {
    title: 'Aland Islands',
    timeZone: [
      { title: 'Europe/Mariehamn(UTC+02:00, DST)', isActive: false }
    ],
    isActive: false
  },
  {
    title: 'Albania',
    timeZone: [
      { title: 'Europe/Tirane(UTC+01:00, DST)', isActive: false }
    ],
    isActive: false
  },
  {
    title: 'Antarctica',
    timeZone: [
      { title: 'Antarctica/Casey(UTC+11:00, DST)', isActive: false },
      { title: 'Antarctica/Davis(UTC+07:00, DST)', isActive: false },
      { title: 'Antarctica/DumontDUrville(UTC+10:00, DST)', isActive: false },
    ],
    isActive: false
  }
]

const defaultMessages = {
  success: null,
  error: null, //Device not found.
  warning: null,
};

const OrgManagementEditSite = props => {
  const { modalStatus, changeModalStatus } = props;
  const { t } = useTranslation();

  // State
  const userLevel = useSelector(selectUserLevel) || localStorage.getItem('userLevel');
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));

  // Variable
  const nuclias = (
    <>
      {/* Site name */}
      <Row>
        <Col>
          <Row className='mb-2'>
            <div className='modal-form-title required short-block-margin'>{t('668445f09d')}</div>
            <div className='modal-form-field'>
              <Input
                placeholder={t('9fa545e2cd')}
                onChange={() => { }}
              />
            </div>
          </Row>
        </Col>
        <Col>
          <Row className='mb-2'>
            {/* Site tag */}
            <div className='modal-form-title short-block-margin'>{t('3039a00fca')}</div>
            <div className='modal-form-field'>
              <DropdownWithItem
                id="site-tag-dropdown"
                type="normal"
                selectedItem={defaultSiteTagList[0]}
                itemList={defaultSiteTagList}
                onClick={() => { }}
              />
            </div>
          </Row>
        </Col>
      </Row>
      {/* Country, local time zone */}
      <Row className="d-flex align-items-end">
        <Col sm={6}>
          <Row>

            <div className='modal-form-title required short-block-margin'>{t('e7d89871c4')}</div>
            <DropdownWithItem
              id="country-dropdown"
              type="normal"
              selectedItem={defaultCountryList[0]}
              itemList={defaultCountryList}
              onClick={() => { }}
            />
          </Row>
        </Col>
        <Col sm={6}>
          <DropdownWithItem
            id="time-zone-dropdown"
            type="normal"
            isTruncate={true}
            selectedItem={defaultCountryList[0].timeZone[0]}
            itemList={defaultCountryList[0].timeZone}
            onClick={() => { }}
          />
        </Col>
      </Row>
      {/* Address */}
      <div className={modalStyle['time-zone-hint']}>{t('8fcf451959')}</div>
      <Row className='mt-3'>
        <div>
          <div className='modal-form-title short-block-margin'>{t('dd7bf230fd')}</div>
          <textarea></textarea>
        </div>
      </Row>
      {/* Devices credentials */}
      <Row className='mt-3 mb-3'>
        <div className='modal-subtitle mb-2'>{t('2abec3ad4f')}</div>
        <div className={modalStyle['device-credentials-hint']}>{t('7db7c037f6')}</div>
      </Row>
      {/* Username, password */}
      <Row>
        <Col>
          <Row className='mb-2'>

            <div className='modal-form-title short-block-margin'>{t('92f1b1481f')}</div>
            <div className='modal-form-field'>
              <div>Admin</div>
            </div>
          </Row>
        </Col>
        <Col>
          <Row className='mb-2'>
            <div className='modal-form-title required short-block-margin'>{t('dc647eb65e')}</div>
            <div className='modal-form-field'>
              <InputWithIcon
                type="password"
                placeholder={t('39a871a0f7')} // 8-64 Characters
                autoComplete="new-password"
                value=''
                onChange={e => { }}
                onFocus={() => { }}
                onBlur={() => { }}
                iconTitle="Show password"
                iconClassName="icon-open-eye"
                iconOnClick={() => {
                  console.log('click on icon');
                }}
              />
            </div>
          </Row>
        </Col>
      </Row>
      {/* NTP information */}
      <Row className='mt-2 mb-2'>
        <div className='modal-subtitle'>{t('f58b2f55c2')}</div>
      </Row>
      <Row>
        <Col>
          <Row className='mb-2'>
            {/* NTP server 1 */}
            <div className='modal-form-title required short-block-margin'>{t('94ecb80600')}</div>
            <div className='modal-form-field'>
              <Input
                placeholder='ntp.nuclias.com'
                onChange={() => { }}
              />
            </div>
          </Row>
        </Col>
        <Col>
          <Row className='mb-2'>
            {/* NTP server 2 */}
            <div className='modal-form-title short-block-margin'>{t('4a85af30a7')}</div>
            <div className='modal-form-field'>
              <Input
                onChange={() => { }}
              />
            </div>
          </Row>
        </Col>
      </Row>
      {/* Contact information */}
      <Row>
        <div className='modal-subtitle my-2'>{t('7b30c410c4')}</div>
      </Row>
      <Row>
        <Col>
          <Row className='mb-2'>
            {/* Name */}
            <div className='modal-form-title short-block-margin'>{t('49ee308734')}</div>
            <div className='modal-form-field'>
              <Input
                placeholder={t('9fa545e2cd')} // 1-64 Characters
                onChange={() => { }}
              />
            </div>
          </Row>

        </Col>
        <Col>
          <Row className='mb-2'>
            {/* Phone */}
            <div className='modal-form-title short-block-margin'>{t('bcc254b55c')}</div>
            <div className='modal-form-field'>
              <Input
                placeholder={t('284ac11dab')} // 1-32 Characters
                onChange={() => { }}
              />
            </div>
          </Row>

        </Col>
      </Row>

      {/* Email address */}
      <Row className='mb-2'>
        <div className='modal-form-title short-block-margin'>{t('b357b524e7')}</div>
        <div className='modal-form-field'>
          <Input
            placeholder={t('ca5977f4f2')} // 1-128 Characters
            onChange={() => { }}
          />
        </div>
      </Row>
    </>
  );

  const nttcare = (
    <>
      <Row className='mb-3'>
        {/* Site name, site tag */}
        <Col>
          <DragAndDropImgContianer
            accept='image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/tiff, image/webp'
            onDrag={params => console.log('return uploaded result - ', params)}
            title='Upload site image'
          />
          <div className={modalStyle['upload-image-hint']}>{t('a1ae998c44')}</div>
        </Col>
        <Col>
          <Col>
            <Row className='mb-2'>
              <div className='modal-form-title required short-block-margin'>{t('668445f09d')}</div>
              <div className='modal-form-field'>
                <Input
                  placeholder={t('9fa545e2cd')}
                  onChange={() => { }}
                />
              </div>
            </Row>
          </Col>
          <Col>
            <Row className='mb-2'>
              <div className='modal-form-title short-block-margin'>{t('3039a00fca')}</div>
              <div className='modal-form-field'>
                <DropdownWithItem
                  id="site-tag-dropdown"
                  type="normal"
                  selectedItem={defaultSiteTagList[0]}
                  itemList={defaultSiteTagList}
                  onClick={() => { }}
                />
              </div>
            </Row>
          </Col>
        </Col>
      </Row>
      {/* Country, local time zone */}
      <Row className="d-flex align-items-end">
        <Col sm={6}>
          <Row>

            <div className='modal-form-title required short-block-margin'>{t('e7d89871c4')}</div>
            <DropdownWithItem
              id="country-dropdown"
              type="normal"
              selectedItem={defaultCountryList[0]}
              itemList={defaultCountryList}
              onClick={() => { }}
            />
          </Row>
        </Col>
        <Col sm={6}>
          <DropdownWithItem
            id="time-zone-dropdown"
            type="normal"
            isTruncate={true}
            selectedItem={defaultCountryList[0].timeZone[0]}
            itemList={defaultCountryList[0].timeZone}
            onClick={() => { }}
          />
        </Col>
      </Row>
      {/* Address */}
      <div className={modalStyle['time-zone-hint']}>{t('8fcf451959')}</div>
      <Row className='mt-3'>
        <div>
          <div className='modal-form-title short-block-margin'>{t('dd7bf230fd')}</div>
          <textarea></textarea>
        </div>
      </Row>
      {/* Devices credentials */}
      <Row className='mt-3 mb-3'>
        <div className='modal-subtitle mb-2'>{t('2abec3ad4f')}</div>
        <div className={modalStyle['device-credentials-hint']}>{t('7db7c037f6')}</div>
      </Row>
      {/* Username, password */}
      <Row>
        <Col>
          <Row className='mb-2'>

            <div className='modal-form-title short-block-margin'>{t('92f1b1481f')}</div>
            <div className='modal-form-field'>
              <div>Admin</div>
            </div>
          </Row>
        </Col>
        <Col>
          <Row className='mb-2'>
            <div className='modal-form-title required short-block-margin'>{t('dc647eb65e')}</div>
            <div className='modal-form-field'>
              <InputWithIcon
                type="password"
                placeholder={t('39a871a0f7')} // 8-64 Characters
                autoComplete="new-password"
                value=''
                onChange={e => { }}
                onFocus={() => { }}
                onBlur={() => { }}
                iconTitle="Show password"
                iconClassName="icon-open-eye"
                iconOnClick={() => {
                  console.log('click on icon');
                }}
              />
            </div>
          </Row>
        </Col>
      </Row>
      {/* NTP information */}
      <Row className='mt-2 mb-2'>
        <div className='modal-subtitle'>{t('f58b2f55c2')}</div>
      </Row>
      <Row>
        <Col>
          <Row className='mb-2'>
            {/* NTP server 1 */}
            <div className='modal-form-title required short-block-margin'>{t('94ecb80600')}</div>
            <div className='modal-form-field'>
              <Input
                placeholder='ntp.nuclias.com'
                onChange={() => { }}
              />
            </div>
          </Row>
        </Col>
        <Col>
          <Row className='mb-2'>
            {/* NTP server 2 */}
            <div className='modal-form-title short-block-margin'>{t('4a85af30a7')}</div>
            <div className='modal-form-field'>
              <Input
                onChange={() => { }}
              />
            </div>
          </Row>
        </Col>
      </Row>
      {/* Contact information */}
      <Row>
        <div className='modal-subtitle my-2'>Primary Contact Information</div>
      </Row>
      <Row>
        <Col>
          <Row className='mb-2'>
            {/* Name */}
            <div className='modal-form-title short-block-margin required'>Primary Contact Person Name</div>
            <div className='modal-form-field'>
              <Input
                placeholder={t('9fa545e2cd')}
                onChange={() => { }}
              />
            </div>
          </Row>
        </Col>
        <Col>
          <Row className='mb-2'>
            {/* Phone */}
            <div className='modal-form-title short-block-margin required'>Primary Contact Person Phone</div>
            <div className='modal-form-field'>
              <Input
                placeholder={t('284ac11dab')}
                onChange={() => { }}
              />
            </div>
          </Row>

        </Col>
      </Row>

      {/* Email address */}
      <Row className='mb-2'>
        <div className='modal-form-title short-block-margin'>{t('b357b524e7')}</div>
        <div className='modal-form-field'>
          <Input
            placeholder={t('ca5977f4f2')} // 1-128 Characters
            onChange={() => { }}
          />
        </div>
      </Row>
    </>
  );

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editSite.status}
      closeModal={() => changeModalStatus('editSite', false)}
    >
      <div className='header'>
        <div className='title'>{t(modalStatus.createSite.label)}</div>
      </div>
      <div className={`body ${modalStyle['create-site-container']}`}>
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
          onClick={() => changeModalStatus('createSite', false)}
        />
        <Button
          label='Apply'
          className='btn-submit'
          onClick={() => { }}
        />
      </div>
    </ModalContainer>
  );
};

export default OrgManagementEditSite;
