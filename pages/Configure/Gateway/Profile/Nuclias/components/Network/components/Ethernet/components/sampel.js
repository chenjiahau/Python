import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { ButtonAction } from 'components/';
import Func from '../../../../../Func';

// Context
import { ConfigContext } from '../../../../../../Context';

// Dummy data
import gwFeature from 'dummy/data/gateway/feature';
import GatewayData from 'dummy/data/gateway/data/GatewayData';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

const defaultModalStatus = {
  addInterface: {
    self: 'addInterface',
    status: false
  },
  editInterface: {
    self: 'editInterface',
    status: false
  },
};

const InterfaceConfiguration = () => {
  const { state } = useContext(ConfigContext);

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [interfaces, setInterfaces] = useState([]);
  const [selectedInterface, setSelectedInterface] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  // Side effect
  useEffect(() => {
    if (state.profile) {
      const updatedInterfaceConfiguration = new GatewayData(gwFeature.configPath.profile, state.profile.modelName)
        .generateInterfaceConfiguration();
    }
  }, []);

  if (interfaces.length === 0) {
    return;
  }

  return (
    <>
      <Func title='INTERFACE CONFIGURATION'>

      </Func>
    </>
  )
}

export default InterfaceConfiguration;