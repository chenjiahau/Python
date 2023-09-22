import './dropdown-with-download.component.scss';
import summaryReportStyle from './summary-report.module.scss';

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { cloneDeep } from 'lodash';

// Modal & Tables
import EmailModal from './modals/EmailModal';
import SummaryReportTables from './SummaryReportTables';

// Custom components
import DropdownWithSite from './DropdownWithSite/DropdownWithSite';
import DropdownWithDeviceCheckbox from './DropdownWithDeviceCheckbox/DropdownWithDeviceCheckbox';

// Common components
import Hr from '../../../components/Hr';
import Icon from '../../../components/Icon';
import Button from '../../../components/Button';
import Breadcrumb from '../../../components/Breadcrumb';
import ButtonWithIcon from '../../../components/ButtonWithIcon';
import ModalContainer from '../../../components/ModalContainer';
import MessageBoxGroup from '../../../components/MessageBoxGroup';
import DropdownWithItem from '../../../components/DropdownWithItem';
import DropdownWithCheckbox from '../../../components/DropdownWithCheckbox';
import DropdownWithTimeframe from '../../../components/DropdownWithTimeframe';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultModalStatus = {
  email: {
    status: false,
  },
  downloadReportArchive: {
    status: false,
  },
};

const defaultPathList = [
  { label: 'c91c7b93c2', isLink: false }, // Reports
  { label: 'd37ef8b077', isLink: false }, // Summary report
];

const defaultProductCategoryList = [
  { title: 'cb3f9a1103', checked: true }, // Access point
  { title: 'bbc155fb2b', checked: true }, // Switch
  { title: '926dec9494', checked: true }, // Gateway
];

const defaultCustomizeReportInfo = {
  ap: [
    { title: 'dc5fa582f0', checked: true }, // Most active access points
    { title: '6964557195', checked: true }, // Most active SSIDs
    { title: 'ab3346e59c', checked: true }, // Most active Wi-Fi clients
  ],
  switch: [
    { title: 'fe339916bd', checked: true }, // Highest CPU utilization (> 50%)
    { title: '7dd6c4d9b5', checked: true }, // Highest port utilization (> 50%)
    { title: '5081769724', checked: true }, // Most power consumption​
    { title: '1ba1b70394', checked: true }, // Top uplink ports by usage (Transmitted packets)​
    { title: '9dd6db3a27', checked: true }, // Top uplink ports by usage (Received packets)​​
    { title: 'fa1cb67033', checked: true }, // Top devices by usage (Received packets)​
    { title: 'fd5d0769da', checked: true }, // Top ports by usage (Transmitted packets)​
    { title: '5781e62e56', checked: true }, // Top ports by usage (Received packets)
    { title: '431f7f5768', checked: true }, // Top ports by multicast usage (Received packets)​
    { title: 'b6c7394ac1', checked: true }, // Top ports by broadcast usage (Received packets)​
    { title: 'f3e9a04875', checked: true }, // Top ports by error usage (Received packets)​
    { title: '93aa694212', checked: true }, // Top ports by discard usage (Received packets)​
    { title: '4d867ed5f8', checked: true }, // Switch Total traffic by usage (Transmitted and received bytes)​​
    { title: 'd6805e354f', checked: true }, // Switch Total traffic by usage (Transmitted and received packets)​
  ],
  gateway: [
    { title: '4eb921c7c3', checked: true }, // Top usage by device
    { title: 'b20672f94b', checked: true }, // Most clients per device
    { title: 'd0b885d22a', checked: true }, // Top service ports by usage
    { title: '294e9d2857', checked: true }, // Top web categories
    { title: '1c22bfc8ce', checked: true }, // Top application categories
    { title: 'bb43f30192', checked: true }, // Top applications
  ],
};

const dropdownShowTopResultsList = [
  { title: '1', isActive: false },
  { title: '5', isActive: true },
  { title: '10', isActive: false },
  { title: '20', isActive: false },
  { title: '50', isActive: false },
];

const downloadReportArchiveList = [
  { title: 'Aug 2023', isActive: true },
  { title: 'Jul 2023', isActive: false },
  { title: 'Jun 2023', isActive: false },
  { title: 'May 2023', isActive: false },
  { title: 'Apr 2023', isActive: false },
];

const SummaryReport = () => {
  const { t } = useTranslation();

  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const [preview, setPreview] = useState(false);
  const [disabledPreviteBtn, setDisabledPreviteBtn] = useState(false);
  const [productCategoryList, setProductCategoryList] = useState(cloneDeep(defaultProductCategoryList));
  const [customizeReportInfo, setCustomizeReportInfo] = useState(cloneDeep(defaultCustomizeReportInfo));
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  const clickCustomizeReportSelectedAll = isToggleAll => {
    const tmpCustomizeReportInfo = cloneDeep(customizeReportInfo);
    tmpCustomizeReportInfo?.ap.forEach(apItem => {
      apItem.checked = isToggleAll;
    });
    tmpCustomizeReportInfo?.switch.forEach(switchItem => {
      switchItem.checked = isToggleAll;
    });
    tmpCustomizeReportInfo?.gateway.forEach(gatewayItem => {
      gatewayItem.checked = isToggleAll;
    });
    setCustomizeReportInfo(tmpCustomizeReportInfo);
  };

  const clickCustomizeReportSelectedItem = (key, selectedItem) => {
    const tmpCustomizeReportInfo = cloneDeep(customizeReportInfo);
    tmpCustomizeReportInfo[key].forEach(item => {
      if (item?.title === selectedItem?.title) {
        item.checked = !selectedItem.checked;
      }
    });
    setCustomizeReportInfo(tmpCustomizeReportInfo);
  };

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />

      <MessageBoxGroup
        messages={multiMessages}
        onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
      />

      <div className="layout-container layout-container--column layout-container--fluid">
        {/* Time frame title */}
        <div
          className={`mt-2 mb-4 ${summaryReportStyle['time-frame-title']}`}
          style={{ display: preview ? 'block' : 'none' }}
        >
          Summary report from the{' '}
          <span className={`${summaryReportStyle['data-show']}`}>last 24 hours</span>
        </div>
        <div>
          {/* Site */}
          <div className={`form-group me-2 ${summaryReportStyle['tool-content']}`}>
            <div className={`form-title ${summaryReportStyle['form-title']}`}>
              {t('a7d6475ec8')} :
            </div>
            <div className="form-field">
              <DropdownWithSite checkDisabledPreviteBtn={value => setDisabledPreviteBtn(value)} />
            </div>
          </div>

          {/* Product category */}
          <div className={`form-group me-2 ${summaryReportStyle['tool-content']}`}>
            <div className={`form-title ${summaryReportStyle['form-title']}`}>
              {t('cecd547f56')} :
            </div>
            <div className="form-field">
              <DropdownWithCheckbox
                allMode={true}
                label="c7d0b2bf4f"
                id="product-category-dropdown"
                extendLiClassName="ms-4"
                type="checkbox"
                subType="right"
                itemList={productCategoryList}
                onChangeAll={isToggleAll => {
                  const tmpProductCategoryList = cloneDeep(productCategoryList);
                  tmpProductCategoryList.forEach(portItem => {
                    portItem.checked = isToggleAll;
                  });
                  setProductCategoryList(tmpProductCategoryList);
                }}
                onChange={item => {
                  const tmpProductCategoryList = cloneDeep(productCategoryList);
                  tmpProductCategoryList.forEach(portItem => {
                    if (portItem.title === item.title) {
                      portItem.checked = !portItem.checked;
                    }
                  });
                  setProductCategoryList(tmpProductCategoryList);
                }}
              />
            </div>
          </div>

          {/* Customize report */}
          <div className={`form-group me-2 ${summaryReportStyle['tool-content']}`}>
            <div className={`form-title ${summaryReportStyle['form-title']}`}>
              {t('4028bc3bbb')} :
            </div>
            <div className="form-field">
              <DropdownWithDeviceCheckbox
                id="customize-report-dropdown"
                type="checkbox"
                allMode={true}
                customizeReportInfo={customizeReportInfo}
                onChangeAll={isToggleAll => clickCustomizeReportSelectedAll(isToggleAll)}
                onChange={(key, item) => clickCustomizeReportSelectedItem(key, item)}
              />
            </div>
          </div>

          {/* Show top results */}
          <div className={`form-group me-2 ${summaryReportStyle['tool-content']}`}>
            <div className={`form-title ${summaryReportStyle['form-title']}`}>
              {t('f42692faa4')} :
            </div>
            <div className="form-field">
              <DropdownWithItem
                id="show-top-results-dropdown"
                type="normal"
                selectedItem={dropdownShowTopResultsList[1]}
                itemList={dropdownShowTopResultsList}
                onClick={() => { }}
              />
            </div>
          </div>

          {/* Time frame */}
          <div className={`form-group me-2 ${summaryReportStyle['tool-content']} ${summaryReportStyle['tool-content-timeframe']}`}>
            <div className={`form-title ${summaryReportStyle['form-title']}`}>
              {t('a056c9a163')} :
            </div>
            <div className="form-field">
              <DropdownWithTimeframe
                customTimeFrameDay={'60'}
                customHideItem={['last60days']}
                alignEnd={true}
                onInit={initTimeFrame => console.log('initTimeFrame-', initTimeFrame)}
                onChange={selectedTimeframe => console.log('selectedTimeframe-', selectedTimeframe)}
              />
            </div>
          </div>

          {/* Preview button */}
          <ButtonWithIcon
            label={t('31fde7b05a')}
            iconClassName="icon-preview"
            className="me-2"
            onClick={() => setPreview(true)}
            disabled={disabledPreviteBtn}
          />

          {/* Email button */}
          <ButtonWithIcon
            label={t('ce8ae9da5b')}
            iconClassName="icon-email"
            className="me-2"
            onClick={() => changeModalStatus('email', true)}
          />

          {/* Dropdown with download */}
          <button
            className={`btn btn-container btn-dropdown dropdown-toggle btn-dropdown-download`}
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <Icon className="icon-download"></Icon>
            <div>{t('801ab24683')}</div>
          </button>
          <ul className="dropdown-menu" aria-labelledby="downloadDropdown">
            <li onClick={() => console.log('Click on Download report')}>{t('84f0d17d49')}</li>
            <li onClick={() => changeModalStatus('downloadReportArchive', true)}>{t('30fc4a9d72')}</li>
          </ul>
        </div>

        <Hr className="mt-4" />

        <SummaryReportTables preview={preview} />

        <EmailModal modalStatus={modalStatus} changeModalStatus={changeModalStatus} />

        {/* Download report archive modal */}
        <ModalContainer
          modalWidthType="modal-400px"
          openModal={modalStatus.downloadReportArchive.status}
          closeModal={() => changeModalStatus('downloadReportArchive', false)}
        >
          <div className="header">
            {/* Download report archive */}
            <div className="title">{t('125e429da8')}</div>
          </div>
          <div className="body">
            <div className="mb-4">{t('c9541e0ee8')}</div>
            <div className="form-group">
              <div className="form-title" style={{ minWidth: 100 }}>
                {t('a056c9a163')}
              </div>
              <div className="form-field">
                <DropdownWithItem
                  id="download-report-archive-timeframe-dropdown"
                  type="normal"
                  selectedItem={downloadReportArchiveList[0]}
                  itemList={downloadReportArchiveList}
                  onClick={() => { }}
                />
              </div>
            </div>
          </div>
          <div className="footer non-border-top-footer">
            <Button
              label={t('801ab24683')}
              className="btn-submit"
              onClick={() => changeModalStatus('downloadReportArchive', false)}
            />
          </div>
        </ModalContainer>
      </div>
    </>
  );
};

export default SummaryReport;
