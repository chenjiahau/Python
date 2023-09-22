import reportLicensesStyle from './reports-licenses.module.scss';

import { useEffect, useState } from 'react';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';

import { Table, ButtonGroup } from 'react-bootstrap';
import Breadcrumb from '../../../components/Breadcrumb';
import Button from '../../../components/Button';
import InlineTitle from '../../../components/InlineTitle';
import LinkerWithA from '../../../components/LinkerWithA';
import PaginationContainer from '../../../components/PaginationContainer';
import InputWithIcon from '../../../components/InputWithIcon';
import MessageBoxGroup from 'components/MessageBoxGroup';

const defaultPathList = [
  { label: 'c91c7b93c2', isLink: false },
  { label: 'f6aca2dcfe', isLink: false }
];

const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const SetReportLicenseList = (props) => {
  const tmpList = props.list;
  return (
    <tbody>
      {
        tmpList.map((item, index) => {
          return <tr key={item.id}>
            <td>{index + 1}</td>
            <td>{item.organization}</td>
            <td>{item.device}</td>
            <td>{item.MAC}</td>
            <td>{item.deviceID}</td>
            <td>{item.serial}</td>
            <td>{item.modal}</td>
            <td>{item.profile}</td>
            <td>{item.reg}</td>
            <td>{item.status}</td>
            <td>{item.quantity}</td>
            <td>{item.key}</td>
            <td>{item.activation}</td>
            <td>{item.expiration}</td>
            <td>{item.lastOnline}</td>
            <td>{item.lastUnregistered}</td>
            <td>{item.firmware}</td>
          </tr>
        })
      }
    </tbody>
  )

}

const Licenses = () => {
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

  const [LicensesList, setLicensesList] = useState(
    [
      {
        id: '1', organization: 'Starbucks', device: 'AP001', MAC: '00:B5:66:54:BB:BF', deviceID: 'TESTQAHQCAD6',
        serial: 'Q2QP-BA59-PT2F', modal: 'DBA-1510P', profile: 'Profile_01', reg: 'Registered', status: 'Active',
        quantity: 3, key: 'A01AF6C48EB06B11C0A4', activation: '2020/04/16', expiration: '2020/05/16',
        lastOnline: '2020/05/13 12:33:22', lastUnregistered: '', firmware: '2.01.010'
      },
      {
        id: '2', organization: 'Starbucks', device: 'AP003', MAC: 'C6:C5:65:C2:BB:22', deviceID: 'TESTQAHQCAD7',
        serial: 'Q2QP-BA59-SWAT', modal: 'DBA-1210P', profile: 'Profile_01', reg: 'Registered', status: 'Active',
        quantity: 1, key: '47811BC90665DF777A7E', activation: '2020/04/16', expiration: '2020/05/16',
        lastOnline: '2020/05/13 12:33:22', lastUnregistered: '', firmware: '2.01.010'
      },
      {
        id: '3', organization: 'Starbucks', device: 'AP_99', MAC: '10:62:EB:03:76:59', deviceID: 'TESTQAHQCAD8',
        serial: 'Q2QP-BA59-PT2A', modal: 'DBA-1510P', profile: 'Profile_01', reg: 'Registered', status: 'Active',
        quantity: 5, key: '0F9E280595A85E5B813F', activation: '2020/04/16', expiration: '2020/05/16',
        lastOnline: '2020/05/13 12:33:22', lastUnregistered: '', firmware: '2.01.010'
      },
      {
        id: '4', organization: 'Starbucks', device: 'AP_a', MAC: '1E:22:3B:0E:66:36', deviceID: 'TESTQAHQCAD9',
        serial: 'Q2QP-BA59-PT2C', modal: 'DBA-1510P', profile: 'Profile_01', reg: 'Registered', status: 'Active',
        quantity: 3, key: '03AF717AE984E3225143', activation: '2020/04/16', expiration: '2020/05/16',
        lastOnline: '2020/05/13 12:33:22', lastUnregistered: '', firmware: '2.00.000'
      },
      {
        id: '5', organization: 'Starbucks', device: 'AP_zzu', MAC: '3B:0E:66:25:B3:5C', deviceID: 'TESTQAHQCAD0',
        serial: 'Q2QP-BA59-PT2Q', modal: 'DBA-1510P', profile: '', reg: 'Unregistered', status: 'Expired',
        quantity: 3, key: '03AF717AE984E3225145', activation: '2020/04/16', expiration: '2020/05/16',
        lastOnline: '2020/05/13 12:33:22', lastUnregistered: '', firmware: '2.00.000'
      },
      {
        id: '6', organization: 'Starbucks', device: 'SW057', MAC: '3B:0E:66:34:BF:00', deviceID: '24TGRLZFC8B1',
        serial: 'HA2C-SWAT-P2QA', modal: 'DBS-2000-28P', profile: 'Profile_a', reg: 'Registered', status: 'Active',
        quantity: 1, key: '03AF717AE984E3225143', activation: '2020/04/16', expiration: '2020/05/16',
        lastOnline: '2020/05/13 12:33:22', lastUnregistered: '', firmware: '2.00.000'
      },
      {
        id: '7', organization: 'Starbucks', device: 'SW_a', MAC: 'B1:C3:43:14:C2:55', deviceID: '24TGRLZFC8B2',
        serial: 'HA2C-SWAT-P2QB', modal: 'DBS-2000-52MP', profile: 'Profile_c', reg: 'Registered', status: 'Active',
        quantity: 1, key: '56DF4AC86911FF34AF', activation: '2020/04/16', expiration: '2020/05/16',
        lastOnline: '2020/05/13 12:33:22', lastUnregistered: '', firmware: '2.00.000'
      },
      {
        id: '8', organization: 'Starbucks', device: 'SW_c93', MAC: 'FF:CC:55:25:C5:C6	', deviceID: '24TGRLZFC8B3',
        serial: 'HA2C-SWAT-P2QC', modal: 'DBS-2000-28', profile: '', reg: 'Unregistered', status: 'Expired',
        quantity: 1, key: 'EAB4389623DDEE5643CE', activation: '2020/04/16', expiration: '2020/05/16',
        lastOnline: '2020/05/13 12:33:22', lastUnregistered: '', firmware: '2.01.000'
      },
      {
        id: '9', organization: 'Starbucks', device: 'SWITCH-67', MAC: 'B0:C5:54:77:BF:FC', deviceID: '24TGRLZFC8B4',
        serial: 'HA2C-SWAT-P2QD', modal: 'DBS-2000-28P', profile: 'Profile_a', reg: 'Registered', status: 'Active',
        quantity: 1, key: '7B89F123GF876EE93D93', activation: '2020/04/16', expiration: '2020/05/16',
        lastOnline: '2020/05/13 12:33:22', lastUnregistered: '', firmware: '2.01.000'
      },
      {
        id: '10', organization: 'Starbucks', device: 'B0:C5:54:25:B1:66', MAC: 'B0:C5:54:25:B1:66', deviceID: '24TGRLZFC8B5',
        serial: 'HA2C-SWAT-P2QE', modal: 'DBS-2000-28MP', profile: '', reg: 'Unregistered', status: 'Active',
        quantity: 1, key: '03AF717AE984E3225143', activation: '2020/05/01', expiration: '2020/06/01',
        lastOnline: '2020/05/13 12:33:22', lastUnregistered: '', firmware: '2.01.010'
      }
    ]
  );

  return (
    <>
      <div className="layout-container layout-container breadcrumb--extended">
        <div>
          <Breadcrumb full={false} pathList={defaultPathList} />
        </div>
        <div className="breadcrumb--extended-right">
          <InlineTitle isNonUnderline className="mb-1">
            <InputWithIcon
              type="search"
              placeholder={t('13348442cc')}
              iconPosition="left"
              iconClassName="icon-search"
              onChange={e => {
                console.log(e.target.value);
              }}
            />
            <Button
              label=""
              title="Download as CSV"
              className="icon-download"
              style={{ border: 'none', height: 25, backgroundColor: '#fff' }}
              onClick={() => console.log('Download as CSV')}
            />
          </InlineTitle>
        </div>
      </div>

      <div className='layout-container layout-container--column layout-container--fluid'>
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
        <Table responsive striped hover className='table-container'>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <LinkerWithA
                  label={t('05cb2cca01')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('92394ac496')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('e7f4b6ea50')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('3fbe2abbcb')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('78cf8ce506')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('402d4d2bce')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('28a9f0e91d')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('7f6e67cbc5')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('213b060157')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('c5fae2cd4d')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('5d5c4ad5db')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('65d785909f')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('4d29676394')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('7a4a3ae789')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('8a5071744b')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label={t('a940a548ba')}
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
            </tr>
          </thead>
          <SetReportLicenseList list={LicensesList} setList={setLicensesList} />
        </Table>

        <div className='d-flex justify-content-end'>
          <PaginationContainer
            total={10}
            onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
            onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
          />
        </div>
      </div>
    </>
  )
}

export default Licenses;