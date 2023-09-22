import mainStyle from './invite-alert-cancellation.module.scss';

import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

// Components
import MessageBoxGroup from 'components/MessageBoxGroup';
import Button from 'components/Button';
import InviteCard from 'components/InviteCard';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultUserData = {
  id: null,
  email: '',
  orgName: 'ORG-1', // fake org.
  verifiable: true, // true: can be operated, false: cannot be operated.
  token: null,
  extraUserId: null,
  isAgreeTerms: false,
  isVerified: false
}

const VerifiableContent  = ({
  multiMessages,
  setMultiMessages,
  userData,
  setUserData
}) => {
  const { t } = useTranslation();

  return (
    <>
      <div className='fw-bold my-3'>dlink@dlinkcorp.com</div>

      {/* Your email address will be removed from {{org}}, and all the related data will be erased from our cloud server... */}
      <div
        className='mb-4'
        style={{ color: userData.isVerified ? '#ccc' : 'inherit' }}
      >
        { t('c0f81345f7', {org: 'ORG-1'}) }
      </div>

      <Button
        label={t('1b6436bc05')} // Confirm
        className={`btn-submit ${mainStyle['btn-confirm']}`}
        disabled={userData.isVerified}
        onClick={() => {
          setMultiMessages({...multiMessages, success: t('0bc2499f6e')}); // Your email address removed.
          setUserData({...userData, isVerified : true });
        }}
      ></Button>
    </>
  )
}

const NotVerifiableContent = () => {
  const { t } = useTranslation();

  return(
    // This invitation link is no longer valid. Please contact your admin for inquiries.
    <div>{t('8482b125ce')}</div>
  )
}

const InviteAlertCancellation = () => {
  const [multiMessages, setMultiMessages] = useState( cloneDeep(defaultMessages));
  const [userData, setUserData] = useState( cloneDeep(defaultUserData));

  return (
    <div className={mainStyle['invite-alert-cancellation-container']}>
      <InviteCard>
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({...multiMessages, [type]: null})}
        />

        { !userData.verifiable && <NotVerifiableContent/> }
        { userData.verifiable && <VerifiableContent {...{multiMessages}} {...{setMultiMessages}} {...{userData}} {...{setUserData}} /> }

      </InviteCard>
    </div>
  );
};

export default InviteAlertCancellation;
