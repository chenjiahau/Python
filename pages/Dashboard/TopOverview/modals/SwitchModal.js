import topOverviewStyle from '../top-overview.module.scss';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { cloneDeep } from 'lodash';

// Component
import { Icon, LinkerWithA, PaginationContainer, ModalContainer } from 'components/';
import img_device_gateway from 'assets/img/v2/icon/device_switch.png';

// Dummy Data & util
import { generateDevice } from 'dummy/data/device';
import { sorting } from 'dummy/utils/sorting';

const SwitchList = (props) => {
  const { deviceList, setDeviceList } = props;

  return (
    <Table responsive striped hover className='table-container'>
      <thead>
        <tr>
          <th>#</th>
          <th>
            <LinkerWithA
              label='Status'
              className='text-decoration-none'
              onClick={e => sorting(e, deviceList, 'status', setDeviceList)}
            />
          </th>
          <th>
            <LinkerWithA
              label='Device name'
              className='text-decoration-none'
              onClick={e => sorting(e, deviceList, 'name', setDeviceList)}
            />
          </th>
          <th>
            <LinkerWithA
              label='MAC address'
              className='text-decoration-none'
              onClick={e => sorting(e, deviceList, 'macAddress', setDeviceList)}
            />
          </th>
          <th>
            <LinkerWithA
              label='Model name'
              className='text-decoration-none'
              onClick={e => sorting(e, deviceList, 'modelName', setDeviceList)}
            />
          </th>
          <th>
            <LinkerWithA
              label='Public IPv4 address'
              className='text-decoration-none'
              onClick={e => sorting(e, deviceList, 'publicIp', setDeviceList)}
            />
          </th>
          <th>
            <LinkerWithA
              label='Local IP address'
              className='text-decoration-none'
              onClick={e => sorting(e, deviceList, 'localIp', setDeviceList)}
            />
          </th>
          <th>
            <LinkerWithA
              label='Site'
              className='text-decoration-none'
              onClick={e => sorting(e, deviceList, 'site', setDeviceList)}
            />
          </th>
          <th>
            <LinkerWithA
              label='Profile'
              className='text-decoration-none'
              onClick={e => sorting(e, deviceList, 'profile', setDeviceList)}
            />
          </th>
          <th>
            <LinkerWithA
              label='Last connected'
              className='text-decoration-none'
              onClick={e => sorting(e, deviceList, 'lastSeen', setDeviceList)}
            />
          </th>
        </tr>
      </thead>
      <tbody>
        {
          deviceList.map((device, index) => {
            return <tr key={nanoid()}>
              <td>{index + 1}</td>
              <td>
                {device.status === 'Online' && <Icon className={'icon-round online'} />}
                {device.status === 'Offline' && <Icon className={'icon-round offline'} />}
                {device.status === 'Dormant' && <Icon className={'icon-round dormant'} />}
              </td>
              <td><a href={`#/cloud/configure/switch/device/${index}`}>{device.name}</a></td>
              <td>{device.macAddress}</td>
              <td>{device.modelName}</td>
              <td>{device.publicIp}</td>
              <td>{device.localIp}</td>
              <td>{device.site}</td>
              <td>{device.profile}</td>
              <td>{device.lastSeen}</td>
            </tr>
          })
        }
      </tbody>
    </Table>
  )
}

const SwitchModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const { t } = useTranslation();

  // Fake API data
  const fakeDeviceList = [
    { ...generateDevice('SWITCH', 'DBS-2000', 'SW001', 'Online') },
    { ...generateDevice('SWITCH', 'DBS-2000', 'SW002', 'Offline', null, 'Active') },
    { ...generateDevice('SWITCH', 'DBS-2000', 'SW003', 'Offline', null, 'Active') }
  ];

  // State
  const [deviceList, setDeviceList] = useState(cloneDeep(fakeDeviceList));

  return (
    <div className=''>
      <ModalContainer
        modalWidthType="modal-1000px"
        openModal={modalStatus.switch.status}
        closeModal={() => changeModalStatus('switch', false)}
      >
        <div className={`header ${topOverviewStyle['align-place-header']}`}>
          <div>
            <img className='mx-3' src={img_device_gateway} alt="" width={65} />
          </div>
          <div className="title">Switches</div>
        </div>
        <div className='body'>
          <SwitchList deviceList={deviceList} setDeviceList={setDeviceList} />
          <div className='d-flex justify-content-end'>
            <PaginationContainer
              total={10}
              onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
              onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
            />
          </div>
        </div>
      </ModalContainer>
    </div>
  );
};

export default SwitchModal;