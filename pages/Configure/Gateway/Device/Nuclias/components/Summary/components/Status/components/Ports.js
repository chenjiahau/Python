import mainStyle from '../../../summary.module.scss';
import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';
import LinkerWithA from 'components/LinkerWithA';
// Component

const fakeData = [
  {port: 'WAN 1', type: 'wan', mac: 'F0:B4:D2:20:95:80', status: 'Link up', speed: '100mbps', duplex: 'full', sent: '869.92 MB', received: '417.04 MB', total: '1.26 GB'},
  {port: 'WAN 2', type: 'wan', mac: 'F0:B4:D2:20:95:81', status: 'Link down', speed: '', duplex: '', sent: '0 Bytes', received: '0 Bytes', total: '0 Bytes'},
  {port: '1', type: 'vlan', mac: 'F0:B4:D2:20:95:7C', status: 'Link up', speed: '1gbps', duplex: 'full', sent: '65.10 MB', received: '97.26 MB', total: '162.37 MB'},
  {port: '2', type: 'vlan', mac: 'F0:B4:D2:20:95:7D', status: 'Link down', speed: '', duplex: '', sent: '0 Bytes', received: '0 Bytes', total: '0 Bytes'},
  {port: '3', type: 'vlan', mac: 'F0:B4:D2:20:95:7E', status: 'Link down', speed: '', duplex: '', sent: '0 Bytes', received: '0 Bytes', total: '0 Bytes'},
  {port: '4', type: 'vlan', mac: 'F0:B4:D2:20:95:7F', status: 'Link down', speed: '', duplex: '', sent: '0 Bytes', received: '0 Bytes', total: '0 Bytes'}
]

const SetPortList = (props) => {
  const tmpList = props.list;

  tmpList.forEach(port => {
    port.duplex = port.duplex.toUpperCase();
    switch (port.speed) {
      case '1gbps':
        port.speed = '1 Gbps';
        break;
      case '100mbps':
        port.speed = '100 Mbps';
        break;
      default:
        break;
    }
  });

  return (
    <tbody>
      {tmpList.map((item, index) => (
        <tr key={index}>
          <td>{item.port}</td>
          <td>{item.mac}</td>
          <td>{item.status}</td>
          <td>{item.speed}</td>
          <td>{item.duplex}</td>
          <td>{item.sent}</td>
          <td>{item.received}</td>
          <td>{item.total}</td>
        </tr>
      ))}
    </tbody>
  )

}

const Ports = (props) => {
  // console.log(props.device);
  const { t } = useTranslation();

  return (
    <>
      {/* <InlineTitle isNonUnderline={true} label='Ports' /> */}
      <div className='form-title'>PORTS</div>
      <div className={`mt-3`}>
        <Table responsive striped hover className='table-container'>
          <thead>
            <tr>
              <th>
                <LinkerWithA
                  label={t('60aaf44d4b')}
                  className='text-decoration-none'
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('e7f4b6ea50')}
                  className='text-decoration-none'
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('f7ed0ae54a')}
                  className='text-decoration-none'
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('71bc686b5f')}
                  className='text-decoration-none'
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('b49aa553d0')}
                  className='text-decoration-none'
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('3c6d72f818')}
                  className='text-decoration-none'
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('ad0ac9111f')}
                  className='text-decoration-none'
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('96b0141273')}
                  className='text-decoration-none'
                />
              </th>
            </tr>
          </thead>
          <SetPortList list={fakeData}/>
        </Table>
      </div>
    </>
  )
}

export default Ports;