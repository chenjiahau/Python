import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { cloneDeep, set, size } from 'lodash';

// Component
import { ButtonAction } from 'components/';
import Func from '../../../../../Func';
import EditPortModal from './EditPortModal';

// Context
import { ConfigContext } from '../../../../../../Context';
import { EthernetContext } from '../../Context';

// Dummy data
import gwFeature from 'dummy/data/gateway/feature';
import { getChangeModalStatusFn } from 'dummy/utils/modal';

const defaultModalStatus = {
  editPort: {
    self: 'editPort',
    status: false
  },
};

const PortConfiguration = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: ethernetState } = useContext(EthernetContext);

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [ports, setPorts] = useState([]);
  const [profilePorts, setProfilePorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  // Side effect
  useEffect(() => {
    if (size(ethernetState?.ports) === 0) {
      return;
    }

    setPorts(cloneDeep(ethernetState.ports));
  }, [ethernetState.ports]);

  if (ports.length === 0) {
    return;
  }

  const isProfilePath = !!configState.profile;
  const isNotStandalone = configState.useProfileConfig ? true : false;
  const disablePort2 = (portId) => {
    if (
      configState.profile
      && configState.profile.modelName.indexOf(gwFeature.model.dbg2000b1) > -1
      && portId === 2
    ) {
      return true;
    }

    return false;
  }

  return (
    <>
      <Func title='PORT CONFIGURATION'>
        <Table
          striped
          hover
          className='table-container table-container--disable-sort'
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Port</th>
              <th>Link state</th>
              <th>Port state</th>
              {
                ((isProfilePath) || (!isProfilePath && !isNotStandalone)) && (
                  <th className={'table-action-th'}>Action</th>
                )
              }
            </tr>
          </thead>
          <tbody>
            {
              ports.map((port, index) => {
                return (
                  <tr key={index} className={`${!disablePort2(port.id) ? '' : 'disabled'}`}>
                    <td>{index + 1}</td>
                    <td>{port.port}</td>
                    <td>{port.linkState}</td>
                    <td>{port.portState}</td>
                    {
                      ((isProfilePath) || (!isProfilePath && !isNotStandalone)) && (
                        <td className={'table-action-td'}>
                          <ButtonAction
                            label='EDIT'
                            title='EDIT'
                            disabled={disablePort2(port.id)}
                            iconClassName='icon-edit'
                            onClick={() => {
                              setSelectedPort(port);
                              changeModalStatus(modalStatus.editPort.self, true);
                            }}
                          />
                        </td>
                      )
                    }
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </Func>

      <EditPortModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        selectedPort={selectedPort}
      />
    </>
  )
}

export default PortConfiguration;