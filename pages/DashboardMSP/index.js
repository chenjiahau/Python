import dashboardMSPStyle from './dashboard-msp.module.scss';

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Table } from 'react-bootstrap';
import ReactDOMServer from 'react-dom/server';
import { useSelector } from 'react-redux';

// Slice
import { selectUserLevel } from 'stores/slice/user';

// component
import {
  Breadcrumb, LinkerWithA, TooltipDialogFixed, PaginationContainer,
  DropdownWithAdvancedSearch, InputWithIconButton, InlineTitle, Icon,
  Button
} from 'components/';

import OnlineModal from './modals/OnlineModal';
import OfflineModal from './modals/OfflineModal';
import DormantModal from './modals/DormantModal';

const defaultMessages = {
  success: '',
  error: '',
  warning:'',
};

const defaultPathList = [
  { label: 'Dashboard', isLink: false },
  { label: 'Network', isLink: false },
];

const defaultModalStatus = {
  online: {
    status: false,
    disabled: false,
  },
  offline: {
    status: false,
    disabled: false,
  },
  dormant: {
    status: false,
    disabled: false,
  },
};

const getSiteContent = () => {
  const siteData = [
    {
      id: 0,
      status: true,
      siteName: 'Daliao',
      device: { ap: 1, sw: 1, gw: 0 },
      ap: { online: 1, offline: 0, dormant: 0 },
      sw: { online: 0, offline: 1, dormant: 0 },
      gw: { online: 0, offline: 0, dormant: 0 },
    },
    {
      id: 1,
      status: true,
      siteName: 'Dream Mall',
      device: { ap: 1, sw: 0, gw: 1 },
      ap: { online: 1, offline: 0, dormant: 0 },
      sw: { online: 0, offline: 0, dormant: 0 },
      gw: { online: 0, offline: 0, dormant: 1 },
    },
    {
      id: 1,
      status: true,
      siteName: 'HQ',
      device: { ap: 1, sw: 0, gw: 1 },
      ap: { online: 1, offline: 0, dormant: 0 },
      sw: { online: 0, offline: 0, dormant: 0 },
      gw: { online: 0, offline: 0, dormant: 1 },
    },
    {
      id: 1,
      status: true,
      siteName: 'Neihu',
      device: { ap: 1, sw: 0, gw: 1 },
      ap: { online: 1, offline: 0, dormant: 0 },
      sw: { online: 0, offline: 0, dormant: 0 },
      gw: { online: 0, offline: 0, dormant: 1 },
    },
    {
      id: 1,
      status: true,
      siteName: 'Neiwan',
      device: { ap: 1, sw: 0, gw: 1 },
      ap: { online: 1, offline: 0, dormant: 0 },
      sw: { online: 0, offline: 0, dormant: 0 },
      gw: { online: 0, offline: 0, dormant: 1 },
    },
    {
      id: 1,
      status: true,
      siteName: 'Songshan',
      device: { ap: 1, sw: 0, gw: 1 },
      ap: { online: 1, offline: 0, dormant: 0 },
      sw: { online: 0, offline: 0, dormant: 0 },
      gw: { online: 0, offline: 0, dormant: 1 },
    },
    {
      id: 1,
      status: true,
      siteName: 'Test',
      device: { ap: 1, sw: 0, gw: 1 },
      ap: { online: 1, offline: 0, dormant: 0 },
      sw: { online: 0, offline: 0, dormant: 0 },
      gw: { online: 0, offline: 0, dormant: 1 },
    },
    {
      id: 1,
      status: true,
      siteName: 'Zhongzheng',
      device: { ap: 1, sw: 0, gw: 1 },
      ap: { online: 1, offline: 0, dormant: 0 },
      sw: { online: 0, offline: 0, dormant: 0 },
      gw: { online: 0, offline: 0, dormant: 1 },
    },
    {
      id: 1,
      status: true,
      siteName: 'Zhudong',
      device: { ap: 1, sw: 0, gw: 1 },
      ap: { online: 1, offline: 0, dormant: 0 },
      sw: { online: 0, offline: 0, dormant: 0 },
      gw: { online: 0, offline: 0, dormant: 1 },
    },
    {
      id: 1,
      status: true,
      siteName: 'Zhuzhong',
      device: { ap: 1, sw: 0, gw: 1 },
      ap: { online: 1, offline: 0, dormant: 0 },
      sw: { online: 0, offline: 0, dormant: 0 },
      gw: { online: 0, offline: 0, dormant: 1 },
    },
    {
      id: 1,
      status: true,
      siteName: 'Zouying',
      device: { ap: 1, sw: 0, gw: 1 },
      ap: { online: 1, offline: 0, dormant: 0 },
      sw: { online: 0, offline: 0, dormant: 0 },
      gw: { online: 0, offline: 0, dormant: 1 },
    },
  ];

  return (
    <Table responsive hover className={dashboardMSPStyle['table']}>
      <thead>
        <tr>
          <th className='px-2'>#</th>
          <th className='px-2'>Status</th>
          <th className='px-2'>Site</th>
          <th className='px-2'>Total Device</th>
          <th className='px-2'>Access point</th>
          <th className='px-2'>Switch</th>
          <th className='px-2'>Gateway</th>
        </tr>
      </thead>
      <tbody>
        {siteData.map((item, index) => (
          <tr key={item.id}>
            <td>{index + 1}</td>
            <td>
              <Icon className='icon-selected-red' />
            </td>
            <td>
              <div>{item.siteName}</div>
            </td>
            <td>
              <div className={dashboardMSPStyle['device-info-container']}>
                <Icon className={'icon-round online'} />
                <div className={dashboardMSPStyle['device-count']}>
                  {item.device.ap}
                </div>
                <Icon className={'icon-round offline'} />
                <div className={dashboardMSPStyle['device-count']}>
                  {item.device.sw}
                </div>
                <Icon className={'icon-round dormant'} />
                <div className={dashboardMSPStyle['device-count']}>
                  {item.device.gw}
                </div>
              </div>
            </td>
            <td>
              <div className={dashboardMSPStyle['device-info-container']}>
                <Icon className={'icon-round online'} />
                <div className={dashboardMSPStyle['device-count']}>
                  {item.ap.online}
                </div>
                <Icon className={'icon-round offline'} />
                <div className={dashboardMSPStyle['device-count']}>
                  {item.ap.offline}
                </div>
                <Icon className={'icon-round dormant'} />
                <div className={dashboardMSPStyle['device-count']}>
                  {item.ap.dormant}
                </div>
              </div>
            </td>
            <td>
              <div className={dashboardMSPStyle['device-info-container']}>
                <Icon className={'icon-round online'} />
                <div className={dashboardMSPStyle['device-count']}>
                  {item.sw.online}
                </div>
                <Icon className={'icon-round offline'} />
                <div className={dashboardMSPStyle['device-count']}>
                  {item.sw.offline}
                </div>
                <Icon className={'icon-round dormant'} />
                <div className={dashboardMSPStyle['device-count']}>
                  {item.sw.dormant}
                </div>
              </div>
            </td>
            <td>
              <div className={dashboardMSPStyle['device-info-container']}>
                <Icon className={'icon-round online'} />
                <div className={dashboardMSPStyle['device-count']}>
                  {item.gw.online}
                </div>
                <Icon className={'icon-round offline'} />
                <div className={dashboardMSPStyle['device-count']}>
                  {item.gw.offline}
                </div>
                <Icon className={'icon-round dormant'} />
                <div className={dashboardMSPStyle['device-count']}>
                  {item.gw.dormant}
                </div>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

const DashboardMSP = () => {
  const { t } = useTranslation();
  const userLevel = useSelector(selectUserLevel);

  // State
  const [messages, setMessages] = useState({ ...defaultMessages });
  const [modalStatus, setModalStatus] = useState({ ...defaultModalStatus });

  const tooltipSampleData = (t) => {
    return (
      <div>
        <div className={`pb-1 ${dashboardMSPStyle['tooltip-title']}`}>{t('a7d6475ec8')}</div>
        <div className='d-flex justify-content-between'>
          <InlineTitle isNonUnderline>
            <Icon className={`${dashboardMSPStyle['icon-device-online']} ${dashboardMSPStyle['tooltip-anchor']}`} />
            <div className='pb-1'>{t('dbd77de82e')}</div>
          </InlineTitle>
        </div>
        <div className='d-flex justify-content-between'>
          <InlineTitle isNonUnderline>
            <Icon className={`${dashboardMSPStyle['icon-device-offline']} ${dashboardMSPStyle['tooltip-anchor']}`} />
            <div className='pb-1'>{t('a4a2c3fb7c')}</div>
          </InlineTitle>
        </div>
        <div className='d-flex justify-content-between'>
          <InlineTitle isNonUnderline>
            <Icon className={`${dashboardMSPStyle['icon-device-dormant']} ${dashboardMSPStyle['tooltip-anchor']}`} />
            <div className='pb-1'>{t('17e81ff33c')}</div>
          </InlineTitle>
        </div>
        <hr className='hr-container'></hr>
        <div className={`pb-1 ${dashboardMSPStyle['tooltip-title']}`}>{t('c03ca67dda')}</div>
        <div className={`d-flex justify-content-between`} >
          <InlineTitle isNonUnderline>
            <Icon className={`icon-round online ${dashboardMSPStyle['tooltip-status']}`} />
            <div className='pb-1'>{t('615468941c')}</div>
          </InlineTitle>
        </div>
        <div className={`d-flex justify-content-between`} >
          <InlineTitle isNonUnderline>
            <Icon className={`icon-round offline ${dashboardMSPStyle['tooltip-status']}`} />
            <div className='pb-1'>{t('e491b4f553')}</div>
          </InlineTitle>
        </div>
        <div className={`d-flex justify-content-between`} >
          <InlineTitle isNonUnderline>
            <Icon className={`icon-round dormant ${dashboardMSPStyle['tooltip-status']}`} />
            <div className='pb-1'>{t('02c58c0456')}</div>
          </InlineTitle>
        </div>
      </div>
    );
  };

  // Method
  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  const sorting = (e) => {
    // NEED TO DO : put this into public function.
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  };

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />
      <div className='layout-container layout-container--column layout-container--fluid'>

        {
          userLevel === 'msp' && (
            <>
              <InlineTitle label='OVERVIEW' isNonUnderline={false} />
              <div className={dashboardMSPStyle['display-style']}>
                {/* online */}
                <div className={dashboardMSPStyle['overview-status']}>
                  <div className={`${dashboardMSPStyle['online-round']} ${dashboardMSPStyle['online-color']}`} ></div>
                  {' '}
                  <span style={{ verticalAlign: 'text-top' }}>
                    Online
                  </span>
                  <span
                    style={{ verticalAlign: 'text-top' }}
                    className={`${dashboardMSPStyle['overview-digit-style-online']}`}
                    onClick={() => changeModalStatus('online', true)}
                  >
                    5
                  </span>
                </div>

                {/* offline */}
                <div className={` ${dashboardMSPStyle['overview-status']} `}>
                  <div className={`${dashboardMSPStyle['online-round']} ${dashboardMSPStyle['offline-color']}`}></div>
                  {' '}
                  <span style={{ verticalAlign: 'top' }} >
                    Offline
                  </span>
                  <span
                    style={{ verticalAlign: 'top' }}
                    className={` ${dashboardMSPStyle['overview-digit-style-offline']}`}
                    onClick={() => changeModalStatus('offline', true)}
                  >
                    3
                  </span>
                </div>

                {/* Dormant */}
                <div className={`${dashboardMSPStyle['overview-status']}`}>
                  <div className={`${dashboardMSPStyle['online-round']} ${dashboardMSPStyle['dormant-color']}`}></div>
                  {' '}
                  <span style={{ verticalAlign: 'text-top' }}>Dormant</span>
                  <span
                    style={{ verticalAlign: 'text-top' }}
                    className={` ${dashboardMSPStyle['overview-digit-style-dormant']} `}
                    onClick={() => changeModalStatus('dormant', true)}
                  >
                    2
                  </span>
                </div>
              </div>
            </>
          )
        }

        <InlineTitle label='TOTAL ORGANIZATIONS' isNonUnderline={false} />
        <div className={`${dashboardMSPStyle['total-status']}`}>
          <span className={`${dashboardMSPStyle['overview-digit-font']} ${dashboardMSPStyle['table-box']}`}>
            5
          </span>
        </div>

        <div className={`${dashboardMSPStyle['toolbar']}`}>
          <div className='form-group'>
            <Button
              label='Generate'
              onClick={() => { }}
            />
          </div>

          <div className='form-group'>
            <Button
              label='Download'
              onClick={() => { }}
            />
          </div>

          <div className='form-group'>
            <DropdownWithAdvancedSearch
              value={''}
              alignEnd={true}
              dataBsToggleOnInput={true}
              dataBsToggleOnButton={true}
              dropdownMenuStyle={{ minWidth: 371 }}
              onChange={(e) => console.log(e.target.value)}
            >
              <li>
                <div className='form-title'>Organization name:</div>
                <InputWithIconButton
                  type='search'
                  placeholder='Search'
                  buttonClassName='icon-search-enter'
                  onChange={(e) => { }}
                  onFocus={(e) => { }}
                  onBlur={(e) => { }}
                  buttonOnClick={(e) => { }}
                />
              </li>
              <li>
                <div className='form-title'>Site name:</div>
                <InputWithIconButton
                  type='search'
                  placeholder='Search'
                  buttonClassName='icon-search-enter'
                  onChange={(e) => { }}
                  onFocus={(e) => { }}
                  onBlur={(e) => { }}
                  buttonOnClick={(e) => { }}
                />
              </li>
            </DropdownWithAdvancedSearch>
          </div>
          <div className='form-group'>
            <TooltipDialogFixed
              placement='left'
              title={ReactDOMServer.renderToString(tooltipSampleData(t))}
              hideIcon={false}
            />
          </div>

        </div>

        <Table responsive striped hover className='table-container'>
          <thead>
            <tr>
              <th>#</th>
              <th>
                <LinkerWithA
                  label='Status'
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Organization'
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Organization ID'
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Type'
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Site tag'
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Site'
                  className='text-decoration-none'
                  onClick={sorting}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>
                <Icon className='icon-selected' />
              </td>
              <td>D-Link</td>
              <td>200001</td>
              <td>ORG</td>
              <td>3</td>
              <td>
                <TooltipDialogFixed
                  placement='left'
                  title={ReactDOMServer.renderToString(getSiteContent())}
                  hideIcon={true}
                  tooltipsTitle={'11'}
                />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                <Icon className='icon-selected' />
              </td>
              <td>Macchiato</td>
              <td>200002</td>
              <td>ORG</td>
              <td>3</td>
              <td>
                <TooltipDialogFixed
                  placement='left'
                  title={ReactDOMServer.renderToString(getSiteContent())}
                  hideIcon={true}
                  tooltipsTitle={'11'}
                />
              </td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                <Icon className='icon-selected' />
              </td>
              <td>Starbucks</td>
              <td>200003</td>
              <td>ORG</td>
              <td>3</td>
              <td>
                <TooltipDialogFixed
                  placement='left'
                  title={ReactDOMServer.renderToString(getSiteContent())}
                  hideIcon={true}
                  tooltipsTitle={'11'}
                />
              </td>
            </tr>
            <tr>
              <td>4</td>
              <td>
                <Icon className='icon-selected-red' />
              </td>
              <td>CHT</td>
              <td>200004</td>
              <td>ORG</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                <Icon className='icon-selected-gray' />
              </td>
              <td>FET</td>
              <td>200005</td>
              <td>ORG</td>
              <td></td>
              <td></td>
            </tr>
          </tbody>
        </Table>

        <PaginationContainer
          total={7}
          onPageChange={(currentPageNum) =>
            console.log('onPageChange', currentPageNum)
          }
          onEntryLimitChange={(currentPageNum) =>
            console.log('onEntryLimitChange', currentPageNum)
          }
        />

      </div >

      <OnlineModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <OfflineModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <DormantModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </>
  );
};

export default DashboardMSP;
