import mainStyle from '../basic.module.scss';

import { useState, useCallback, useContext } from 'react';
import { Table } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Context
import { ConfigContext } from '../../../../../Profile/Nuclias/Context';

// Component
import {
  InlineTitle,
  RadioButton,
  Input
} from 'components'

const DefaultWan = props => {
  const {
    form,
    changeValue
  } = props;

  const { state: { device } } = useContext(ConfigContext);

  return (
    <>
      <div>
        <InlineTitle label='DEFAULT WAN' />
          <Table responsive style={{overflowX: 'auto'}}>
            <thead>
              <tr>
                <th style={{whiteSpace: 'nowrap', paddingRight: '30px', paddingLeft: '10px'}}>Protocol</th>
                <th style={{whiteSpace: 'nowrap', paddingRight: '30px', paddingLeft: '10px'}}>IP address</th>
                <th style={{whiteSpace: 'nowrap', paddingRight: '30px', paddingLeft: '10px'}}>Gateway</th>
                <th style={{whiteSpace: 'nowrap', paddingRight: '30px', paddingLeft: '10px'}}>DNS server #1</th>
                <th style={{whiteSpace: 'nowrap', paddingRight: '30px', paddingLeft: '10px'}}>DNS server #2</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{whiteSpace: 'nowrap'}}>DHCPv4</td>
                <td style={{whiteSpace: 'nowrap'}}>10.33.22.116/24</td>
                <td style={{whiteSpace: 'nowrap'}}>10.33.22.1</td>
                <td style={{whiteSpace: 'nowrap'}}>10.33.22.1</td>
                <td style={{whiteSpace: 'nowrap'}}>-</td>
              </tr>
              <tr>
                <td style={{whiteSpace: 'nowrap'}}>PPPoE (IPv4)</td>
                <td style={{whiteSpace: 'nowrap'}}>10.101.64.115/32</td>
                <td style={{whiteSpace: 'nowrap'}}>10.101.64.1</td>
                <td style={{whiteSpace: 'nowrap'}}>10.32.87.2</td>
                <td style={{whiteSpace: 'nowrap'}}>-</td>
              </tr>
            </tbody>
          </Table>
      </div>
    </>
  );
}

export default DefaultWan;