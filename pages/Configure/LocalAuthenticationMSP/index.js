import { useState, useCallback } from 'react';
import { cloneDeep } from 'lodash';



// Components
import Breadcrumb from 'components/Breadcrumb';
import MessageBoxGroup from 'components/MessageBoxGroup';

const defaultMessages = {
  success: null,
  error: 'To search for and manage an Organization, type the Organization name in the Search box in the drop-down menu at the top and press Enter.',
  warning: null,
};

const defaultPathList = [
  { label: 'Configure', isLink: false },
  { label: 'Authentication', isLink: false },
  { label: 'Local authentication list', isLink: false },
];


const LocalAuthenticationMSP = () => {
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />

      <div className="layout-container layout-container--column layout-container--fluid">
        <MessageBoxGroup
          messages={multiMessages}
          onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
        />

      </div>
    </>
  );
};

export default LocalAuthenticationMSP;
