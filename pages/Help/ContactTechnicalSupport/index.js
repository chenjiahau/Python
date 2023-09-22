import mainStyle from './contact-technical-support.module.scss';

import { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

// Components
import MessageBoxGroup from 'components/MessageBoxGroup';
import Breadcrumb from 'components/Breadcrumb';
import InlineTitle from 'components/InlineTitle';
import Button from 'components/Button';
import DropdownWithItem from 'components/DropdownWithItem'
import Input from 'components/Input'
import EditableNameBox from 'components/EditableNameBox'
import DropdownWithAdvancedSearch from 'components/DropdownWithAdvancedSearch'
import Textarea from 'components/Textarea';
import DragAndDropImgContianer from 'components/DragAndDropImgContianer'

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultPathList = [
  { label: 'Help', isLink: false }, // Help
  { label: 'Contact technical support', isLink: false } // Bulk import devices
];

const defaultIssueCategoryListList = [
  { title: 'Please Select', value: null },
  { title: 'configuration', value: null },
  { title: 'Setup', value: null },
  { title: 'Defective device', value: null },
  { title: 'Suggestion', value: null },
  { title: 'Privacy related', value: null },
  { title: 'Others', value: null },
];

const defaultDeviceTypeList = [
  { title: 'Access point', value: null },
  { title: 'Switch', value: null },
  { title: 'Gateway', value: null },
];

const defaultDeviceList = [
  { title: 'NEWAPZZZZZZA ( MAC: 11:22:33:44:55:62 )', isActive: true },
  { title: 'NEWAPZZZZZZB ( MAC: 11:22:33:44:55:64 )', isActive: false },
  { title: 'NEWAPZZZZZZC ( MAC: 11:22:33:44:55:65 )', isActive: false }
]


const ContactTechnicalSupport = () => {
  const { t } = useTranslation();
  const [profileName, setProfileName] = useState('D-Link');
  const [originProfileName, setOriginProfileName] = useState('D-Link');
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const [selectedIssueCategory, setselectedIssueCategory] = useState({ ...defaultIssueCategoryListList[0] });
  const [selectedDeviceType, setselectedDeviceType] = useState({ ...defaultDeviceTypeList[0] });

  const referProfileName = (value) => {
    setProfileName(value);
    setOriginProfileName(value)
  }

  useEffect(() => {

  }, [])

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />

      <div className={`layout-container layout-container--column layout-container--fluid ${mainStyle['bulk-import-devices-container']}`}>

        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />

        <Card>
          <Card.Body>
            {/* CONTACT US */}
            <InlineTitle label={t('9cfc9b7498')} isShortUnderline />

            <Container style={{ margin: 0, padding: 0 }} className='mb-5'>
              <Row lg={12}>
                <Col xl={5} lg={5}>
                  <div>
                    <div className='form-group'>
                      <div className='form-title required'>Name</div>
                      <div className='form-field'>
                        <EditableNameBox
                          onClickCancelIcon={() => setOriginProfileName(profileName)}
                          inputFieldOnKeyDown={(e) => referProfileName(e.target.value)}
                          inputFieldOnChange={e => setOriginProfileName(e.target.value)}
                          value={originProfileName}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='form-title required'>E-mail</div>
                      <div className='form-field'>
                        <Input
                          type='text'
                          placeholder='1-128 characters'
                          onChange={e => { console.log(e.target.value) }}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='form-title required'>Phone</div>
                      <div className='form-field'>
                        <Input
                          type='number'
                          placeholder='1-32 characters'
                          onChange={e => { console.log(e.target.value) }}
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='form-title required'>Issue category</div>
                      <div className='form-field'>
                        <DropdownWithItem
                          id='issue-category-dropdown'
                          type='normal'
                          selectedItem={selectedIssueCategory}
                          itemList={defaultIssueCategoryListList}
                          onClick={
                            item => {
                              setselectedIssueCategory(item);
                            }
                          }
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='form-title required'>Device type</div>
                      <div className='form-field'>
                        <DropdownWithItem
                          id='issue-category-dropdown'
                          type='normal'
                          selectedItem={selectedDeviceType}
                          itemList={defaultDeviceTypeList}
                          onClick={
                            item => {
                              setselectedDeviceType(item);
                            }
                          }
                        />
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='form-title required'>Problem device</div>
                      <div className='form-field'>
                        <DropdownWithAdvancedSearch
                          value={''}
                          buttonIcon={'enter'}
                          dataBsToggleOnInput={true}
                          onChange={e => console.log(e.target.value)}
                        >
                          <div >
                          </div>
                          {defaultDeviceList.map((device, index) => {
                            return (
                              <li key={index} className="search-org-item">
                                {device.title}
                              </li>
                            );
                          })}
                        </DropdownWithAdvancedSearch>
                        <div className='mt-2'>Model : DBA-1510P</div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xl={1} lg={1}></Col>
                <Col xl={5} lg={5}>
                  <div>
                    <div className='form-group' style={{ alignItems: 'flex-start' }}>
                      <div className='form-title required'>Description</div>
                      <div className='form-field'>
                        <Textarea
                          style={{ height: 100 }}
                          className='clas-a class-b'
                          value=""
                          placeholder={t('0c55b5f5f0')} // 8-63 characters
                          onChange={e => { console.log(e.target.value) }}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </div>
                    </div>
                    <div className='form-group' style={{ alignItems: 'flex-start' }}>
                      <div className='form-title'>Attachment</div>
                      <div className='form-field form-field--horizontal'>
                        <DragAndDropImgContianer
                          accept='image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/tiff, image/webp'
                          onDrag={params => console.log('return uploaded result - ', params)}
                          title="Attach related images, each is up to 2MB."
                        />
                        <DragAndDropImgContianer
                          accept='image/png, image/jpeg, image/jpg, image/gif, image/bmp, image/tiff, image/webp'
                          onDrag={params => console.log('return uploaded result - ', params)}
                          title="Attach related images, each is up to 2MB."
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Card.Body>
        </Card>
        <div className='mt-4 d-flex justify-content-center'>
          <div>
            <Button
              label="Submit"
              className="btn-submit"
              onClick={(e) => { console.log(e.target.value) }}
              disabled={true}
            />
          </div>

        </div>
      </div>
    </>
  );
};

export default ContactTechnicalSupport;
