import mainStyle from './bulk-import-devices.module.scss';

import { useEffect, useState } from 'react';
import { Col, Card } from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

// Components
import MessageBoxGroup from 'components/MessageBoxGroup';
import Breadcrumb from 'components/Breadcrumb';
import InlineTitle from 'components/InlineTitle';
import InputWithUploadButton from 'components/InputWithUploadButton';
import LinkerWithA from 'components/LinkerWithA';
import Button from 'components/Button';
import Hr from 'components/Hr';
import Textarea from 'components/Textarea';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultPathList = [
  { label: '6525f0afe7', isLink: false }, // Settings
  { label: 'de8f8e95a9', isLink: false } // Bulk import devices
];

const defaultInlineMsgs = {
  hasMsg: false, // normal msg.
  hasErrorMsg: false, // error msg.
  hasSuccessMsg: false,  // successful msg.
  msg: ''
}

const fakeErrorMsgs = `VALIDATING_FAIL:
Upload data amount:
Organizations: 1, Profiles: 0, Devices: 3, Licenses: 0
Failed data:
An error occurred at line 2 of the excel file: UID is not available. UID: FFFFEEEE0001
An error occurred at line 2 of the excel file: The country of this device doesn't match the store. UID: FFFFEEEE0001
An error occurred at line 3 of the excel file: UID is not available. UID: FFFFEEEE0001
An error occurred at line 3 of the excel file: The country of this device doesn't match the store. UID: FFFFEEEE0001
An error occurred at line 4 of the excel file: Invalid organization name. Organization name in different modes. Organization: D-Link
An error occurred at line 4 of the excel file: UID is not available. UID: FFFFEEEE0002
An error occurred at line 4 of the excel file: The country of this device doesn't match the store. UID: FFFFEEEE0002
An error occurred at line 5 of the excel file: Invalid organization name. Organization name in different modes. Organization: D-Link
An error occurred at line 5 of the excel file: UID is not available. UID: FFFFEEEE0003
An error occurred at line 5 of the excel file: The country of this device doesn't match the store. UID: FFFFEEEE0003
Valid data account:
Organizations: 1, Profiles: 0, Devices: 0, Licenses: 0
======================================`

const BulkImportDevicesMSP = () => {
  const { t } = useTranslation();
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const [uploadValue, setUploadValue] = useState('');
  const [newInlineMsgs, setInlineMsgs] = useState(cloneDeep(defaultInlineMsgs));

  const onUpload = () => {
    // Fake error.
    const tmpMsgs = cloneDeep(newInlineMsgs);
    tmpMsgs.hasErrorMsg = true;
    tmpMsgs.msg = fakeErrorMsgs;
    setInlineMsgs(tmpMsgs);
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

            {/* BULK IMPORT DEVICES */}
            <InlineTitle label={t('de8f8e95a9')} isShortUnderline />
            <div className={`mt-3 ${mainStyle['bulk-import-devices-notification']}`}>
              <div>{t('0ed45c9167')}</div> { /* Upload a xls-formatted or xlsx-formatted file to... */}
              <div>{t('c2203cd1ab')}</div> { /* (Mode, UID , Organization, Site, TimeZone are required... */}
              <div>{t('7a6aa2a9d0')}</div> { /* If user doesn’t enter profile name... */}
              <div>{t('34d1ea952a')}</div> { /* If user doesn’t enter license, system will automatically... */}
              <div>{t('8cc0651f0c')}</div> { /* Please refresh this page for the updated information... */}
            </div>

            <Col md={5}>
              <InputWithUploadButton
                containerClassName='my-3'
                value={uploadValue}
                onClick={e => { }}
                onChange={e => {
                  const fileName = e.target.files[0]?.name;
                  setUploadValue(fileName);
                }}
              />
            </Col>

            <div className="fst-italic">
              {/* You can download sample template file for cloud-managed... */}
              <span>{t('9e8ac12150')}</span>
              <LinkerWithA
                label="here"
                href="#"
                className="linker-blue text-decoration-none ms-1 fw-light"
                onClick={() => { }}
              />
            </div>

            {/* Upload */}
            <Button
              label={t('91412465ea')}
              className='px-4 my-4 btn-grey-blue'
              disabled={!uploadValue}
              onClick={() => onUpload()}
            />

            {
              (!!newInlineMsgs.hasMsg || !!newInlineMsgs.hasSuccessMsg || newInlineMsgs.hasErrorMsg) &&
              <>
                <div className={mainStyle['prompt-msg']}>Last modified by dlinkcorp@gmail.com</div>

                <Hr className="my-4" />

                <div className={mainStyle['inline-msg-group-container']}>
                  {newInlineMsgs.hasMsg && <div className='inline-msg'>File validation has failed. Please upload a modified file.</div>}
                  {newInlineMsgs.hasSuccessMsg && <div className='inline-msg successful'>File validation has failed. Please upload a modified file.</div>}
                  {newInlineMsgs.hasErrorMsg && <div className='inline-msg error'>File validation has failed. Please upload a modified file.</div>}

                  <Button
                    label=""
                    title="Download as CSV"
                    className="icon-download"
                    style={{ border: 'none', width: 20, height: 25, backgroundColor: '#fff' }}
                    onClick={() => console.log('Download as CSV')}
                  />
                </div>

                <Textarea
                  style={{ minHeight: '172px' }}
                  value={newInlineMsgs.msg}
                  onChange={e => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </>
            }

          </Card.Body>
        </Card>

      </div>
    </>
  );
};

export default BulkImportDevicesMSP;
