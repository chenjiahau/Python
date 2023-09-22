import { useState } from 'react';
import { cloneDeep } from 'lodash';

import Breadcrumb from 'components/Breadcrumb';
import MessageBoxGroup from 'components/MessageBoxGroup';

const defaultMessages = {
  success: null,
  error: 'To search for and manage an Organization, type the Organization name in the Search box in the drop-down menu at the top and press Enter.',
  warning: null,
};

const defaultPathList = [
  { label: 'Configure', isLink: false },
  { label: 'Access Point', isLink: false },
  { label: 'Profiles', isLink: false },
];

const ProfileMSP = () => {
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />
      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
      </div>
    </>
  );
}

export default ProfileMSP;