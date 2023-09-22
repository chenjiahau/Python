import mainStyle from '../../../summary.module.scss';
import { useState } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';
import LinkerWithA from 'components/LinkerWithA';
// Component

const fakeData = [
  {port: 'WAN 1', vlanid: '', protocal: 'DHCPv4', ip: '10.33.14.164/24', gateway: '10.33.14.1', dns1:'10.33.14.1', dns2: '', isp: 'HINET-NET', ispConnection: ''},
  {port: 'WAN 1', vlanid: '', protocal: 'DHCPv6', ip: '', gateway: '', dns1:'', dns2: '', isp: '', ispConnection: ''},
  {port: 'WAN 1', vlanid: '', protocal: 'PPPoE', ip: '', gateway: '', dns1:'', dns2: '', isp: '', ispConnection: 'Disconnected'},
  {port: 'WAN 2', vlanid: '', protocal: 'DHCPv4', ip: '', gateway: '', dns1:'', dns2: '', isp: '', ispConnection: ''},
  {port: 'WAN 2', vlanid: '', protocal: 'DHCPv6', ip: '', gateway: '', dns1:'', dns2: '', isp: '', ispConnection: ''},
  {port: 'WAN 1.64', vlanid: '', protocal: 'DHCPv4', ip: '', gateway: '', dns1:'', dns2: '', isp: '', ispConnection: ''},
  {port: 'WAN 1.64', vlanid: '', protocal: 'DHCPv6', ip: '', gateway: '', dns1:'', dns2: '', isp: '', ispConnection: ''},
]

const SetInterfaceList = (props) => {
  const tmpList = props.list;

  return (
    <tbody>
      {tmpList.map((item, index) => (
        <tr key={index}>
          <td>{item.port}</td>
          <td>{item.vlanid}</td>
          <td>{item.protocal}</td>
          <td>{item.ip}</td>
          <td>{item.gateway}</td>
          <td>{item.dns1}</td>
          <td>{item.dns2}</td>
          <td>{item.isp}</td>
          <td>{item.ispConnection}</td>
        </tr>
      ))}
    </tbody>
  )
}

const WanInterfaces = (props) => {
  const { t } = useTranslation();
  // console.log(props.device);
  return (
    <>
      {/* <InlineTitle isNonUnderline={true} label='Ports' /> */}
      <div className='form-title'>WAN INTERFACES</div>
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
                  label={t('36bd7f7eb7')}
                  className='text-decoration-none'
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('888a77f5ac')}
                  className='text-decoration-none'
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('5b8c99dad1')}
                  className='text-decoration-none'
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('926dec9494')}
                  className='text-decoration-none'
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('895c4a3897')+'#1'}
                  className='text-decoration-none'
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('895c4a3897')+'#2'}
                  className='text-decoration-none'
                />
              </th>
              <th>
                <LinkerWithA
                  label='ISP'
                  className='text-decoration-none'
                />
              </th>
              <th>
                <LinkerWithA
                  label='ISP connection'
                  className='text-decoration-none'
                />
              </th>
            </tr>
          </thead>
          <SetInterfaceList list={fakeData}/>
        </Table>
      </div>
    </>
  )
}

export default WanInterfaces;