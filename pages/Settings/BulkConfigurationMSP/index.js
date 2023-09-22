import mainStyle from './bulk-import-devices.module.scss';

import { useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';
import { useLocation } from 'react-router-dom';
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
  { label: 'ada806c830', isLink: false }, // Bulk configuration
  { label: '', isLink: false }
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
An error occurred at line 2 of the excel file: Mandatory fields are required.: Mode
An error occurred at line 3 of the excel file: Mandatory fields are required.: Mode
An error occurred at line 4 of the excel file: Mandatory fields are required.: Mode
======================================`

const configurationLabels = {
  ap: {
    title: '296abcd440', // ACCESS POINT BULK CONFIGURATION
    descriptions: [
      'b979465df0', // Upload a xls-formatted or xlsx-formatted file to configure...
      'cc92a43e74', // (Mode, Organization, Site, TimeZone, ModelName, and Profile...
      '8cc0651f0c', // Please refresh this page for the updated...
      'fbe407fc06' // This feature is currently available only for cloud-managed...
    ],
    prompt: '9e8ac12150', // You can download sample template file for cloud-managed...
    exampleLink: '#'
  },
  gw: {
    title: 'e815d5bd80', // GATEWAY BULK CONFIGURATION
    descriptions: [
      'd2d6d7cc51', // Upload a ZIP archive file that contains comma-separated values (CSV)...
      '8cc0651f0c', // Please refresh this page for the updated...
      'f9a725c93b' // This feature is currently available only for cloud-managed...
    ],
    prompt: 'f7f31b61b0', // You can download sample template ZIP file for cloud-managed...
    exampleLink: '#'
  }
}

const BulkConfigurationMSP = () => {
  const { t } = useTranslation();
  const bulkType = useLocation().pathname.includes('/bulk-configuration-gw') ? 'gw' : 'ap';
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [newPathList, setPathList] = useState(cloneDeep(defaultPathList));
  const [uploadValue, setUploadValue] = useState('');
  const [newInlineMsgs, setInlineMsgs] = useState(cloneDeep(defaultInlineMsgs));

  const initBreadcrumbByUrl = () => {
    const tmpPathList = [...defaultPathList];
    tmpPathList[tmpPathList.length - 1].label = bulkType === 'gw' ? '926dec9494' : '93f3450afb'; // Gateway or Access Point
    setPathList(tmpPathList);
  }

  const onUpload = () => {
    // Fake error.
    const tmpMsgs = cloneDeep(newInlineMsgs);
    tmpMsgs.hasErrorMsg = true;
    tmpMsgs.msg = fakeErrorMsgs;
    setInlineMsgs(tmpMsgs);
  }

  useEffect(() => {
    initBreadcrumbByUrl();
  }, [bulkType])

  return (
    <>
      <Breadcrumb pathList={newPathList} />

      <div className={`layout-container layout-container--column layout-container--fluid ${mainStyle['bulk-import-devices-container']}`}>

        <MessageBoxGroup
          {...{ messages }}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />

        <Card>
          <Card.Body>

            <InlineTitle label={t(configurationLabels[bulkType].title)} isShortUnderline />
            <div className={`mt-3 ${mainStyle['bulk-import-devices-notification']}`}>
              {configurationLabels[bulkType].descriptions.map((descriptItem, index) => (<div key={bulkType + '-descriptions-' + index}>{t(descriptItem)}</div>))}
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
              <span>{t(configurationLabels[bulkType].prompt)}</span>
              <LinkerWithA
                label="here"
                href={configurationLabels[bulkType].exampleLink}
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
                {/* Last modified by xxxxx */}
                <div className={mainStyle['prompt-msg']}>{t('2e6d1c99ad', { mail: 'dlinkcorp@gmail.com' })}</div>

                <Hr className="my-4" />

                <div className={mainStyle['inline-msg-group-container']}>
                  {/* File validation has failed. Please upload a modified file. */}
                  {newInlineMsgs.hasMsg && <div className='inline-msg'>{t('2e79bc6c0a')}</div>}
                  {newInlineMsgs.hasSuccessMsg && <div className='inline-msg successful'>{t('2e79bc6c0a')}</div>}
                  {newInlineMsgs.hasErrorMsg && <div className='inline-msg error'>{t('2e79bc6c0a')}</div>}

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

export default BulkConfigurationMSP;
