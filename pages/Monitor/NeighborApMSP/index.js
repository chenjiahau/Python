import neighborapStyle from './neighbor-ap.module.scss';

import { useEffect, useState, useCallback } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Table, ButtonGroup } from 'react-bootstrap';
import Breadcrumb from '../../../components/Breadcrumb';
import InlineTitle from '../../../components/InlineTitle';
import LinkerWithA from '../../../components/LinkerWithA';
import PaginationContainer from '../../../components/PaginationContainer';
import InputWithIcon from '../../../components/InputWithIcon';
import MessageBoxGroup from 'components/MessageBoxGroup';

const defaultPathList = [
  { label: '6ba872551f', isLink: false },
  { label: '4c8ac262ab', isLink: false },
];
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const SetAPList = (props) => {
  const tmpList = props.list;
  return (
    <tbody>
      {
        tmpList.map((item, index) => {
          return <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.status}</td>
            <td>{item.detected}</td>
            <td>{item.MAC}</td>
            <td>{item.SSID}</td>
            <td>
              {
                item.security.map((security, i) => {
                  return <>{i !== 0 && (', ')}{security}</>
                })
              }
            </td>
            <td>{item.RSSI}</td>
            <td>{item.radio}</td>
            <td>{item.channel}</td>
            <td>
              {
                item.supported.map((supported, i) => {
                  return <>{i !== 0 && (', ')}{supported}</>
                })
              }
            </td>
            <td>{item.manufacturer}</td>
          </tr>
        })
      }
    </tbody>
  )

}

const NeighborAp = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState({ ...defaultMessages });
  const sorting = e => {
    console.log('sorting event')
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  }

  const [NeighborAPList, setNeighborAPList] = useState(
    [
      {
        id: '1', status: 'UNKNOWN', detected: '9HME9RUEAH44', MAC: 'A8:63:7D:31:56:00', SSID: 'R15-55FF', security: ['WPA2', 'WPA3'],
        RSSI: '-80', radio: '2.4GHz', channel: '40', supported: ['a', 'n', 'ac', 'ax'], manufacturer: 'D-Link International'
      },
      {
        id: '2', status: 'UNKNOWN', detected: '9HME9RUEAH44', MAC: '0C:B6:D2:FA:45:70', SSID: '3F-MOMO-SRE', security: ['WPA+WPA2'],
        RSSI: '-78', radio: '2.4GHz', channel: '48', supported: ['a', 'n', 'ac'], manufacturer: 'D-Link International'
      },
      {
        id: '3', status: 'UNKNOWN', detected: '9HME9RUEAH44', MAC: 'A6:2A:95:CA:70:EA', SSID: '', security: ['WPA2'],
        RSSI: '-86', radio: '2.4GHz', channel: '44', supported: ['a', 'n', 'ac', 'ax'], manufacturer: ''
      },
      {
        id: '4', status: 'UNKNOWN', detected: '9HME9RUEAH44', MAC: '82:26:89:6E:17:40', SSID: '_dlink-C714', security: ['WPA+WPA2'],
        RSSI: '-70', radio: '5GHz', channel: '5', supported: ['g', 'n'], manufacturer: ''
      },
      {
        id: '5', status: 'UNKNOWN', detected: '9HME9RUEAH44', MAC: '04:BA:D6:FA:2B:A0', SSID: 'DIR-X1510-2.4G-T612', security: ['WPA2', 'WPA3'],
        RSSI: '-77', radio: '5GHz', channel: '5', supported: ['g', 'n'], manufacturer: 'D-Link Corporation'
      },
      {
        id: '6', status: 'UNKNOWN', detected: '9HME9RUEAH44', MAC: '24:72:60:F0:94:F4', SSID: '', security: ['OPEN'],
        RSSI: '-76', radio: '5GHz', channel: '5', supported: ['g', 'n'], manufacturer: 'IOTTECH Corp'
      }
    ]
  );


  return (
    <div className='layout-container layout-container--column layout-container--fluid'>
      <Breadcrumb pathList={defaultPathList}>
      </Breadcrumb>
      <MessageBoxGroup
        messages={messages}
        changeMessages={setMessages}
        onClose={type => setMessages({ ...messages, [type]: null })}
      />
      <InlineTitle isNonUnderline>
        <InputWithIcon
          type="search"
          placeholder={t('13348442cc')}
          iconPosition="left"
          iconClassName="icon-search"
          onChange={e => {
            console.log(e.target.value);
          }}
        />
      </InlineTitle>
      <Table responsive striped hover className='table-container'>
        <thead>
          <tr>
            <th>#</th>
            <th>
              <LinkerWithA
                label={t('ec53a8c4f0')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('f95d414ac1')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('2e25c28535')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('0d09d7b23e')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('2fae32629d')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('9c0d482467')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('1f32d2c1b4')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('781dc97dc6')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('7d71b5b35f')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
            <th>
              <LinkerWithA
                label={t('c0bd7654d5')}
                className='text-decoration-none'
                onClick={sorting}
              />
            </th>
          </tr>
        </thead>
        <SetAPList list={NeighborAPList} setList={setNeighborAPList} />
      </Table>
      <div className='d-flex justify-content-end'>
        <PaginationContainer
          total={10}
          onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
          onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
        />
      </div>
    </div>
  );
};

export default NeighborAp;
