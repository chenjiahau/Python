import mainStyle from './invite-alert-confirmation.module.scss';

import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

// Components
import MessageBoxGroup from 'components/MessageBoxGroup';
import Checkbox from '../../../components/Checkbox';
import Button from 'components/Button';
import InviteCard from 'components/InviteCard';
import LinkerWithA from 'components/LinkerWithA';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultUserData = {
  id: null,
  email: '',
  orgName: null,
  verifiable: true, // true: can be operated, false: cannot be operated.
  token: null,
  extraUserId: null,
  isAgreeTerms: false,
  isVerified: false
}

const VerifiableContent = ({
  multiMessages,
  setMultiMessages,
  userData,
  setUserData,
  onCheckedAgreeTerm
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className='fw-bold my-3'>dlink@dlinkcorp.com</div>

      {/* Thanks! Please read and agree to the Terms and Privacy for email verification. */}
      <div
        className='mb-4'
        style={{ color: userData.isVerified ? '#ccc' : 'inherit' }}
      >
        {t('dfa5ef3d72')}
      </div>

      <div className='mb-3 d-flex'>
        <Checkbox
          id='term_privacy_checkbox'
          labelClassName={mainStyle['term_privacy_checkbox_label']}
          checked={userData.isAgreeTerms}
          disabled={userData.isVerified}
          onChange={() => onCheckedAgreeTerm()}
        />
        <div className={`${mainStyle['term-privacy-container']} ${userData.isVerified && mainStyle['disabled']}`}>

          {/* I have read and agree to the */}
          <span
            className='me-1 pointer-cursor'
            onClick={() => onCheckedAgreeTerm()}
          >
            {t('324dcb090e')}
          </span>

          {/* Terms */}
          <LinkerWithA label={t('b5b7b6c5b5')} onClick={e => e.preventDefault()} />

          {/* and */}
          <span
            className='mx-1 pointer-cursor'
            onClick={() => onCheckedAgreeTerm()}
          >
            {t('3e9ddeb7e6')}
          </span>

          {/* Privacy */}
          <LinkerWithA label={t('c5f29bb36f')} onClick={e => e.preventDefault()} />
        </div>
      </div>

      <Button
        label={t('1b6436bc05')} // Confirm
        className={`btn-submit ${mainStyle['btn-confirm']}`}
        disabled={!userData.isAgreeTerms}
        onClick={() => {
          setMultiMessages({ ...multiMessages, success: t('2f95d2db61') }); // Your email address confirmed.
          setUserData({ ...userData, isVerified: true });
        }}
      ></Button>
    </>
  )
}

const NotVerifiableContent = () => {
  const { t } = useTranslation();

  return (
    // This invitation link is no longer valid. Please contact your admin for inquiries.
    <div>{t('8482b125ce')}</div>
  )
}

const InviteAlertConfirmation = () => {
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const [userData, setUserData] = useState(cloneDeep(defaultUserData));

  const onCheckedAgreeTerm = () => {
    const clonedUserData = cloneDeep(userData);
    clonedUserData.isAgreeTerms = !clonedUserData.isAgreeTerms;
    setUserData(clonedUserData);
  }

  return (
    <div className={mainStyle['invite-alert-confirmation-container']}>
      <InviteCard>
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />

        {!userData.verifiable && <NotVerifiableContent />}
        {
          userData.verifiable &&
          <VerifiableContent
            {...{
              multiMessages,
              setMultiMessages,
              userData,
              setUserData,
              onCheckedAgreeTerm
            }}
          />
        }

      </InviteCard>
    </div>
  );
};

export default InviteAlertConfirmation;
