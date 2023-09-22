import topOverviewStyle from '../top-overview.module.scss';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { cloneDeep } from 'lodash';

// Component
import { Icon, LinkerWithA, PaginationContainer, ModalContainer } from 'components/';

// Dummy Data & util
import { generateDevice } from 'dummy/data/device';
import { sorting } from 'dummy/utils/sorting';

const WarningTable = (props) => {
  const { deviceList, setDeviceList } = props;

  return (
    <Table responsive striped hover className='table-container'>
      <thead>
        <tr>
          <th>#</th>
          <th>
            <LinkerWithA
              label='Device name'
              className='text-decoration-none'
              onClick={e => sorting(e, deviceList, 'name', setDeviceList)}
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
              label='Last connected'
              className='text-decoration-none'
              onClick={e => sorting(e, deviceList, 'lastSeen', setDeviceList)}
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
        </tr>
      </thead>
      <tbody>
        {
          deviceList.map((device, index) => {
            return (
              <tr key={nanoid()}>
                <td>{index + 1}</td>
                {/* <td><a href='#/'>{device.name}</a></td> */}
                <td>{device.name}</td>
                <td>{device.modelName}</td>
                <td>{device.lastSeen}</td>
                <td>{device.site}</td>
                <td>{device.profile}</td>
              </tr>
            )
          })
        }
      </tbody>
    </Table>
  )
}

const WarningModal = props => {
  const { modalStatus, changeModalStatus } = props;
  const { t } = useTranslation();

  // Fake API data
  const fakeDeviceList = [
    { ...generateDevice('AP', 'DBA-1210P', 'AP0001', 'Warning'), lastSeen: '2023/05/08 05:26' },
  ];

  // State
  const [deviceList, setDeviceList] = useState(cloneDeep(fakeDeviceList));

  return (
    <div className=''>
      <ModalContainer
        modalWidthType='modal-750px'
        openModal={modalStatus.warning.status}
        closeModal={() => changeModalStatus('warning', false)}
      >
        <div className='header'>
          <div className='title'>Warning devices</div>
        </div>
        <div className='body'>
          <WarningTable deviceList={deviceList} setDeviceList={setDeviceList} />
          <div className='d-flex justify-content-between'>
            <div className={`pagination-container  form-field ${topOverviewStyle['align-place-fpc']}`}>
              07/28/2020 02:48 PM
            </div>
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

export default WarningModal;