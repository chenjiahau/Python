import reportLicensesStyle from './reports-licenses.module.scss';

import { useEffect, useState, useCallback } from 'react';
import { cloneDeep } from 'lodash';

import { useTranslation } from 'react-i18next';
import { Card } from 'react-bootstrap';
import Breadcrumb from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import TooltipDialog from '../../../components/TooltipDialog';
import MessageBox from 'components/MessageBox';
import MessageBoxGroup from 'components/MessageBoxGroup';
// Modal
import GenerateModal from './modals/GenerateModal';

const defaultPathList = [
  { label: 'c91c7b93c2', isLink: false },
  { label: 'f6aca2dcfe', isLink: false }
];
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const Licenses = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState({ ...defaultMessages });
  const changeMsgbox = e => {
    console.log('changeMsgbox')
    setMessages({ ...messages, error: 'Please click generate to prepare the list to download.' })
  }
  const defaultModalStatus = {
    generate: {
      status: false,
      disabled: false,
    }
  };
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });

  return (
    <div className='layout-container layout-container--column layout-container--fluid'>
      <Breadcrumb pathList={defaultPathList}></Breadcrumb>
      {/* <MessageBox
        show={!!messages.error}
        label={messages.error}
        variant="danger"
        dismissible
        onClose={() => setMessages({...messages, error: null})}
      /> */}
      <MessageBoxGroup
        messages={messages}
        changeMessages={setMessages}
        onClose={type => setMessages({ ...messages, [type]: null })}
      />
      <Card>
        <Card.Body>
          <Card.Title className={reportLicensesStyle['cd-title']}>{t('794df3791a')}</Card.Title>
          <hr />
          <Card.Text className={reportLicensesStyle['cd-content']}>
            <span className={reportLicensesStyle['cd-subtitle']}>{t('ad422cac69')}</span>
            <TooltipDialog
              className='ms-1 me-1'
              placement="right"
              title={`<div class="pb-1">${t('9d53acb410')}</div>`}
            />
            <Button
              label={t('de3e350386')}
              className={`btn-grey ${reportLicensesStyle['cd-btn']}`}
              onClick={() => changeModalStatus('generate', true)}
            />
            <Button
              label={t('801ab24683')}
              className={`btn-grey ${reportLicensesStyle['cd-btn']}`}
              onClick={e => changeMsgbox()}
            />
          </Card.Text>
        </Card.Body>
      </Card>
      {/* Generate modal */}
      <GenerateModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </div>
  )
}

export default Licenses;