import mapStyle from './monitor-map.module.scss';

// Package
import { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import { cloneDeep } from 'lodash';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Slice
import { selectUserLevel } from 'stores/slice/user';

// Compoent
import {
  Breadcrumb,
  InlineTitle,
  InputWithIcon,
  TooltipDialogFixed,
  Icon
} from 'components';

const defaultPathList = [
  { label: '6ba872551f', isLink: false },
  { label: '46f3ea056c', isLink: false },
];

const defaultOrgObj = {
  org: 'Starbucks',
  id: '123456',
  siteList: [
    {
      id: 's1',
      name: 'Songshan',
      location: 'Taipei',
      status: 'online',
      style: { position: 'absolute', left: '480px', top: '240px' },
      isOpen: false,
      ap: { online: 1, offline: 0, dormant: 0 },
      switch: { online: 1, offline: 0, dormant: 0 },
      gateway: { online: 1, offline: 0, dormant: 0 }
    },
    {
      id: 's2',
      name: "Da'an",
      location: 'Taipei',
      status: 'offline',
      style: { position: 'absolute', left: '600px', top: '390px' },
      isOpen: false,
      ap: { online: 0, offline: 1, dormant: 0 },
      switch: { online: 0, offline: 1, dormant: 0 },
      gateway: { online: 0, offline: 0, dormant: 0 }
    },
    {
      id: 's3',
      name: 'Neihu',
      location: 'Taipei',
      status: 'no-device',
      style: { position: 'absolute', left: '380px', top: '300px' },
      isOpen: false,
      ap: { online: 0, offline: 0, dormant: 1 },
      switch: { online: 0, offline: 0, dormant: 0 },
      gateway: { online: 0, offline: 0, dormant: 1 }
    }
  ],
  careGiverList: [
    {
      id: 'c1',
      name: 'Allen',
      familyList: [
        "Daimatsu's home",
        "Takamatsu's home",
        "Hoya's home"
      ],
      phoneNumber: '090-1234-5678',
      style: { position: 'absolute', left: '480px', top: '350px' },
      isOpen: false,
      location: '〒105-0011 東京都港区芝公園2丁目4-1, Shiba Park Building, 1F',
      lastUpdate: '5'
    },
    {
      id: 'c2',
      name: 'Masashi',
      familyList: [
        "Suzuki's home",
        "Honda's home",
        "Yakou's home"
      ],
      phoneNumber: '090-1234-5678',
      style: { position: 'absolute', left: '650px', top: '360px' },
      isOpen: false,
      location: '〒102-1115 Chrome-2-8 Shibakoen, Minato City, Tokyo',
      lastUpdate: '5'
    },
    {
      id: 'c3',
      name: 'Toyo',
      familyList: [
        "Aikiwa's home",
        "Miyata's home",
        "Uchikoshi's home"
      ],
      phoneNumber: '090-1234-5678',
      style: { position: 'absolute', left: '330px', top: '380px' },
      isOpen: false,
      location: '〒106-0044 東京都港区東麻布1丁目28-13',
      lastUpdate: '5'
    },
  ]
};

const tooltipSampleData = (t) => {
  return (
    <div>
      <div className={`pb-1 ${mapStyle['tooltip-title']}`}>{t('a7d6475ec8')}</div>
      <div className={`d-flex justify-content-between`} >
        <InlineTitle isNonUnderline>
          <Icon className={`${mapStyle['icon-site-online']} ${mapStyle['tooltip-anchor']}`} />
          <div className="pb-1">{t('dbd77de82e')}</div>
        </InlineTitle>
      </div>
      <div className={`d-flex justify-content-between`} >
        <InlineTitle isNonUnderline>
          <Icon className={`${mapStyle['icon-site-offline']} ${mapStyle['tooltip-anchor']}`} />
          <div className="pb-1">{t('a4a2c3fb7c')}</div>
        </InlineTitle>
      </div>
      <div className={`d-flex justify-content-between`} >
        <InlineTitle isNonUnderline>
          <Icon className={`${mapStyle['icon-site-no-device']} ${mapStyle['tooltip-anchor']}`} />
          <div className="pb-1">{t('17e81ff33c')}</div>
        </InlineTitle>
      </div>
      <hr className="hr-container"></hr>
      <div className={`pb-1 ${mapStyle['tooltip-title']}`}>{t('c03ca67dda')}</div>
      <div className={`d-flex justify-content-between`} >
        <InlineTitle isNonUnderline>
          <Icon className={`icon-round online ${mapStyle['tooltip-status']}`} />
          <div className="pb-1">{t('615468941c')}</div>
        </InlineTitle>
      </div>
      <div className={`d-flex justify-content-between`} >
        <InlineTitle isNonUnderline>
          <Icon className={`icon-round offline ${mapStyle['tooltip-status']}`} />
          <div className="pb-1">{t('e491b4f553')}</div>
        </InlineTitle>
      </div>
      <div className={`d-flex justify-content-between`} >
        <InlineTitle isNonUnderline>
          <Icon className={`icon-round dormant ${mapStyle['tooltip-status']}`} />
          <div className="pb-1">{t('02c58c0456')}</div>
        </InlineTitle>
      </div>
    </div>
  );
};

const SiteMakers = ({
  siteItem,
  orgObj,
  setOrgObj
}) => {
  const { t } = useTranslation();

  return (
    <div style={siteItem.style} className='map-infobox-anchor'>
      <div className={`icon ${mapStyle['map-anchor-icon']} ${mapStyle['icon-site-' + siteItem.status + '-large']}`}
        onClick={() => {
          const clonedOrgObj = cloneDeep(orgObj);
          clonedOrgObj.siteList.forEach(item => item.isOpen = item.id === siteItem.id);
          setOrgObj(clonedOrgObj);
        }}>
      </div>
      <div className={`${!!siteItem.isOpen ? 'd-block' : 'd-none'} ${mapStyle['map-infobox-anchor']} ${mapStyle['site-modal']}`}>
        <div className={`d-flex justify-content-between ${mapStyle['map-infobox-title']}`} >
          <InlineTitle isNonUnderline>
            <Icon className={`${mapStyle['icon-site-online']} ${mapStyle['colbox-status']}`} />
            <span>
              <Link
                className='text-decoration-none fw-normal dashboard-link'
                to="/cloud/dashboard"
              >
                {siteItem.name}
              </Link>
            </span>
            <span className={`${mapStyle['icon-close']}`} onClick={() => {
              const clonedOrgObj = cloneDeep(orgObj);
              clonedOrgObj.siteList.forEach(item => item.isOpen = false);
              setOrgObj(clonedOrgObj);
            }}>×</span>
          </InlineTitle>
        </div>

        <div className={`d-flex justify-content-between ${mapStyle['map-infobox-title']}`} >
          <span>{siteItem.location}</span>
        </div>

        <div className='map-infobox-content-floor-map map-infobox-title'>
          {/* Floor plans */}
          <Link
            className='text-decoration-none'
            to="/cloud/monitor/floor-plans"
          >
            {t('52600791cd')}
          </Link>
        </div>

        <div>
          <div className={`d-flex justify-content-between ${mapStyle['map-infobox-content']}`} >
            <InlineTitle isNonUnderline>
              <Icon className={`${mapStyle['mapinfo-icon-ap']} ${mapStyle['colbox-status']}`} />
              <Icon className={`icon-round online ${mapStyle['mapinfo-icon-status']}`} />
              <span>{siteItem.ap.online}</span>
              <Icon className={`icon-round offline ${mapStyle['mapinfo-icon-status']}`} />
              <span>{siteItem.ap.offline}</span>
              <Icon className={`icon-round dormant ${mapStyle['mapinfo-icon-status']}`} />
              <span>{siteItem.ap.dormant}</span>
            </InlineTitle>
          </div>
        </div>
        <div>
          <div className={`d-flex justify-content-between ${mapStyle['map-infobox-content']}`} >
            <InlineTitle isNonUnderline>
              <Icon className={`${mapStyle['mapinfo-icon-switch']} ${mapStyle['colbox-status']}`} />
              <div className={mapStyle['infobox-content-middle']}>
                <InlineTitle isNonUnderline>
                  <Icon className={`icon-round online ${mapStyle['mapinfo-icon-status']}`} />
                  <span>{siteItem.switch.online}</span>
                  <Icon className={`icon-round offline ${mapStyle['mapinfo-icon-status']}`} />
                  <span>{siteItem.switch.offline}</span>
                  <Icon className={`icon-round dormant ${mapStyle['mapinfo-icon-status']}`} />
                  <span>{siteItem.switch.dormant}</span>
                </InlineTitle>
              </div>
            </InlineTitle>
          </div>
        </div>
        <div>
          <div className={`d-flex justify-content-between ${mapStyle['map-infobox-content']}`} >
            <InlineTitle isNonUnderline>
              <Icon className={`${mapStyle['mapinfo-icon-gateway']} ${mapStyle['colbox-status']}`} />
              <Icon className={`icon-round online ${mapStyle['mapinfo-icon-status']}`} />
              <span>{siteItem.gateway.online}</span>
              <Icon className={`icon-round offline ${mapStyle['mapinfo-icon-status']}`} />
              <span>{siteItem.gateway.offline}</span>
              <Icon className={`icon-round dormant ${mapStyle['mapinfo-icon-status']}`} />
              <span>{siteItem.gateway.dormant}</span>
            </InlineTitle>
          </div>
        </div>
      </div>
    </div>
  )
}

const CareGiverMakers = ({
  careGiverItem,
  orgObj,
  setOrgObj
}) => {
  const { t } = useTranslation();

  return (
    <div style={careGiverItem.style}>
      <Icon
        className={`icon ${careGiverItem.isOpen ? 'icon_ntt_care_map_caregiver_selected' : 'icon_ntt_care_map_caregiver'} ${mapStyle['icon_map_caregiver']}`}
        onClick={() => {
          const clonedOrgObj = cloneDeep(orgObj);
          clonedOrgObj.careGiverList.forEach(item => item.isOpen = item.id === careGiverItem.id);
          setOrgObj(clonedOrgObj);
        }}
      />
      <div className={`care-giver-map-infobox-anchor ${!!careGiverItem.isOpen ? 'd-block' : 'd-none'} ${mapStyle['map-infobox-anchor']} ${mapStyle['care-giver-modal']}`}>
        <div className={`d-flex justify-content-between ${mapStyle['map-infobox-title']}`} >
          <InlineTitle isNonUnderline>
            <Icon className={`icon_ntt_care_caregiver map-info-giver-photo ${mapStyle['colbox-status']}`} />
            <span>{careGiverItem.name}</span>
            <span
              className={`${mapStyle['icon-close']}`}
              onClick={() => {
                const clonedOrgObj = cloneDeep(orgObj);
                clonedOrgObj.careGiverList.forEach(item => item.isOpen = false);
                setOrgObj(clonedOrgObj);
              }}
            >
              ×
            </span>
          </InlineTitle>
        </div>
        <div className={`${mapStyle['map-infobox-container']} ${mapStyle['map-infobox-recipient-container']}`} >
          <div>{t('8b89e6a6f4')}:</div>
          <ul className={mapStyle['map-infobox-recipient-ul']}>
            {careGiverItem.familyList.map(familyItem => <li className='fw-bold'>{familyItem}</li>)}
          </ul>
        </div>

        <div className={mapStyle['map-infobox-container']}>
          {/* Phone number: */}
          <div>{t('2f4df173d6')}:</div>
          <div className='fw-bold'>{careGiverItem.phoneNumber}</div>
        </div>

        <div className={mapStyle['map-infobox-container']}>
          {/* Reference location: */}
          <div>{t('ab7ec06e66')}:</div>
          <div className='fw-bold'>{careGiverItem.location}</div>
        </div>

        {/* Last update: */}
        <div className={mapStyle['map-infobox-container']}>
          <div>{t('8c27774700')}:</div>
          <div className='fw-bold'>
            <span>{careGiverItem.lastUpdate}</span>
            <span>{t('9e8fbacbbf')}</span> {/* minutes ago */}
          </div>
        </div>
      </div>
    </div>
  )
}

const Map = () => {
  const { t } = useTranslation();
  const userlevel = useSelector(selectUserLevel) || localStorage.getItem('userLevel');

  const [orgObj, setOrgObj] = useState(cloneDeep(defaultOrgObj));

  const [hideListBox, setHideListBox] = useState(true);
  const clickBoxTag = e => {
    let display = !hideListBox;
    setHideListBox(display);
  }
  const checkBoxPosition = hideListBox ? mapStyle['list-hide'] : mapStyle['list-show'];

  const [searchMsg, setsearchMsg] = useState('');
  const changeSearch = e => {
    let text = e;
    setsearchMsg(text);
  }
  const [showListCol, setShowListCol] = useState(true);
  const clickOrg = e => {
    let display = !showListCol;
    setShowListCol(display);
  }
  const checkArrow = showListCol ? 'icon-up-arrow' : 'icon-down-arrow';
  function checkStatus (status) {
    let result = '';
    switch (status) {
      case 'online':
        result = mapStyle['icon-site-online'];
        break;
      case 'offline':
        result = mapStyle['icon-site-offline'];
        break;
      case 'no-device':
        result = mapStyle['icon-site-no-device'];
        break;
      default:
        result = mapStyle['icon-site-no-device'];
        break;
    }
    return result;
  }

  return (
    <>
      <div className='layout-container layout-container breadcrumb--extended'>
        <div>
          <Breadcrumb full={false} pathList={defaultPathList} />
        </div>
        <div className="breadcrumb--extended-right">
          <InlineTitle isNonUnderline className="mb-1">
            <div className={mapStyle['map-tooltip']}>
              <TooltipDialogFixed
                placement="bottom"
                title={ReactDOMServer.renderToString(tooltipSampleData(t))}
                hideIcon={false}
              // tooltipsTitle={'test'}
              />
            </div>
          </InlineTitle>
        </div>
      </div>

      <div className="layout-container layout-container--column layout-container--fluid">
        <div className={mapStyle['map-box']}>
          <div className={`${checkBoxPosition} ${mapStyle['map-listbox']}`}>
            <div className={mapStyle['list-tag']} onClick={clickBoxTag}>
              {(userlevel === 'ntt-care' || userlevel === 'ntt-care-msp-org') ? 'Caregiver List' : t('0a88ffc585')}
            </div>
            <div className={mapStyle['list-box']}>
              <div className={mapStyle['list-search']}>
                <InlineTitle isNonUnderline>
                  <span className={mapStyle['search-site']}>{t('3faa64303d')} </span>
                  <div className={mapStyle['search-site-input']}>
                    <InputWithIcon
                      type="search"
                      placeholder={t('13348442cc')}
                      iconPosition="left"
                      iconClassName="icon-search"
                      value={searchMsg}
                      onChange={e => {
                        changeSearch(e.target.value);
                      }}
                    />
                  </div>
                </InlineTitle>
              </div>
              <div className="list-colbox">
                <div>
                  <div id={orgObj.id} className={`d-flex justify-content-between ${mapStyle['colbox-orgname']}`} onClick={clickOrg} >
                    <InlineTitle isNonUnderline>
                      <div className={`icon ${mapStyle['colbox-icon']} ${mapStyle['icon-siteorg']}`}></div>
                      <span>{orgObj.org} </span>
                      <span className={`${checkArrow} ${mapStyle['icon-arrow']}`}></span>
                    </InlineTitle>
                  </div>
                  <div className={`${showListCol === true ? 'd-block' : 'd-none'}`}>
                    {
                      (userlevel === 'ntt-care' || userlevel === 'ntt-care-msp-org') &&
                      orgObj.careGiverList.map((list, index) => (
                        list.name.indexOf(searchMsg) !== -1
                          ?
                          (<div key={index} className={`d-flex justify-content-between ${mapStyle['colbox-sitelist']}`}>
                            <InlineTitle isNonUnderline>
                              <div className={`icon icon_ntt_care_caregiver ${mapStyle['colbox-status']}`}></div>
                              <span>{list.name}</span>
                            </InlineTitle>
                          </div>)
                          :
                          null
                      ))
                    }
                    {
                      userlevel !== 'ntt-care' && userlevel !== 'ntt-care-msp-org' &&
                      orgObj.siteList.map((list, index) => (
                        list.name.indexOf(searchMsg) !== -1
                          ?
                          (<div key={index} className={`d-flex justify-content-between ${mapStyle['colbox-sitelist']}`}>
                            <InlineTitle isNonUnderline>
                              <div className={`icon ${mapStyle['colbox-status']} ${checkStatus(list.status)}`}></div>
                              <span>{list.name}</span>
                            </InlineTitle>
                          </div>)
                          : null
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={mapStyle['map-container']}>
            {
              (userlevel === 'ntt-care' || userlevel === 'ntt-care-msp-org') &&
              orgObj.careGiverList.map((careGiverItem, index) => (
                <CareGiverMakers
                  {...{
                    key: 'care-giver-makers-' + index,
                    careGiverItem,
                    orgObj,
                    setOrgObj
                  }}
                />
              ))
            }

            {
              userlevel !== 'ntt-care' && userlevel !== 'ntt-care-msp-org' &&
              orgObj.siteList.map((siteItem, index) => (
                <SiteMakers
                  {...{
                    key: 'site-makers-' + index,
                    siteItem,
                    orgObj,
                    setOrgObj
                  }}
                />
              ))
            }

            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14455.947545499312!2d121.58834710000002!3d25.0684336!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1szh-TW!2stw!4v1528790465830" width="100%" allowFullScreen></iframe>

          </div>

        </div>
      </div>
    </>

  );
};

export default Map;
