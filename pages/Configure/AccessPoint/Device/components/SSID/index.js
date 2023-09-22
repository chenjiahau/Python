import { useState } from 'react';

// Component
import SSIDList from './components/SSIDList';
import SSIDDetail from './components/SSIDDetail';

// Context
import DataContext from '../../DataContext';

const SSID = (props) => {
  const {
    defaultMessages,
    setMessages,
    modalStatus,
    changeModalStatus,
    pushToDevice
  } = props;

  // State
  const [selectedSsid, setSelectedSsid] = useState(null);

  return (
    <>
      {
        !selectedSsid && (
          <SSIDList
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            modalStatus={modalStatus}
            changeModalStatus={changeModalStatus}
            setSelectedSsid={setSelectedSsid}
            pushToDevice={pushToDevice}
          />
        )
      }
      {
        selectedSsid && (
          <SSIDDetail
            defaultMessages={defaultMessages}
            setMessages={setMessages}
            modalStatus={modalStatus}
            changeModalStatus={changeModalStatus}
            selectedSsid={selectedSsid}
            pushToDevice={pushToDevice}
          />
        )
      }
    </>
  );
}

export default SSID;