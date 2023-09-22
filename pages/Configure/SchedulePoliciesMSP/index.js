import { useState, useCallback } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Table & Modal

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
  { label: 'schedule Policy', isLink: false },
];


const defaultModalStatus = {
  add: {
    status: false,
  },
  edit: {
    status: false,
  },
  delete: {
    status: false,
  },
};

const SchedulePoliciesMSP = () => {
  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });

  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

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

export default SchedulePoliciesMSP;
