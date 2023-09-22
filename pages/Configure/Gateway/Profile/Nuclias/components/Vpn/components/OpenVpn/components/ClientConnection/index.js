import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';
import { Table, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Context
import { OpenVpnContext } from '../../Context';

import Func from '../../../../../Func';

const ClientConnection = () => {
  const {
    state: {
      selectedDeviceModelName,
      openVpnUIDisplaying,
      openVpnSettings,
      clientConnection
    }
  } = useContext(OpenVpnContext);

  const { t } = useTranslation();
  const [list, setList] = useState([]);

  // Side effect
  useEffect(() => {
    if (!openVpnSettings || !clientConnection) {
      return;
    }

    const updatedList = clientConnection.map((clientConnectionItem, index) => {
      return {
        index: index + 1,
        ...clientConnectionItem,
      }
    });

    setList(updatedList);

  }, [openVpnSettings, clientConnection]);

  if(!openVpnUIDisplaying[openVpnSettings.selectedOpenVpnMode.key].clientConnectionTable) return <></>

  return (
    <div className='mt-3'>
      <Func title='CLIENT CONNECTION'>

        <div style={{marginBottom: '48px'}}>
            <Table responsive striped hover className='table-container non-first-indent-table-container'>
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Server IP</th>
                  <th>Client IP (VPN)</th>
                </tr>
              </thead>
              <tbody>
                {
                  list.map((item, index) => {
                    return (
                      <tr key={'client-connection-tr-' + index}>
                        <td>{item.status}</td>
                        <td>{item.serverIp}</td>
                        <td>{item.clientIp}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
        </div>

      </Func>

    </div>
  )
}

export default ClientConnection;