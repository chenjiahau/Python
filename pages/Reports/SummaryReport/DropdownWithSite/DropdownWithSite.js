import './dropdown-with-site.component.scss';

import { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import { cloneDeep } from 'lodash';

// Components
import RadioButton from '../../../../components/RadioButton';

const defaultSiteRadioButtonList = [
  {
    key: 'aSingleSite',
    label: '8861405e7c',
    checked: false,
  },
  {
    key: 'sitesWithASiteTag',
    label: 'b0947d2aff',
    checked: false,
  },
  {
    key: 'allSites',
    label: '299287797e',
    checked: true,
  },
];

const defaultSiteSubList = [
  {
    id: 0,
    label: 'Site 1',
    isActive: false,
  },
  {
    id: 1,
    label: 'Site 2',
    isActive: false,
  },
  {
    id: 2,
    label: 'Site 3',
    isActive: false,
  },
];

const DropdownWithSite = ({ isInvalid, disabled, checkDisabledPreviteBtn }) => {
  const { t } = useTranslation();
  const [siteRadioButtonList, setSiteRadioButtonList] = useState(
    cloneDeep(defaultSiteRadioButtonList)
  );
  const [siteSubList, setSiteSubList] = useState(cloneDeep(defaultSiteSubList));
  const [isSearchValue, setIsSearchValue] = useState('');
  const [isSiteDropdownBtnName, setIsSiteDropdownBtnName] = useState('');

  useEffect(() => {
    if ((siteRadioButtonList[0].checked || siteRadioButtonList[1].checked) && isSiteDropdownBtnName?.length === 0) {
      checkDisabledPreviteBtn(true);
    } else {
      checkDisabledPreviteBtn(false);
    }
  }, [siteRadioButtonList, isSiteDropdownBtnName]);

  useEffect(() => {
    checkSiteDropdownBtnName();
  }, [siteSubList]);

  const isInvalidClassName = isInvalid ? 'isInvalid' : '';

  const changeRadioSiteItem = tmpKey => {
    let newSiteRadioButtonList = cloneDeep(siteRadioButtonList);
    newSiteRadioButtonList.forEach(item => {
      if (item.key === tmpKey) {
        item.checked = true;
      } else {
        item.checked = false;
      }
    });
    setSiteRadioButtonList(newSiteRadioButtonList);

    // When user change site radio button should reset subList info.
    setSiteSubList(defaultSiteSubList);
    setIsSearchValue('');
  };

  const changeSubListItem = data => {
    let tmpSiteSubList = cloneDeep(siteSubList);
    tmpSiteSubList.forEach(item => {
      if (item.id === data.id) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });
    setSiteSubList(tmpSiteSubList);
  };

  const checkSiteDropdownBtnName = () => {
    let tmpSiteSubList = cloneDeep(siteSubList);
    let siteDropdownBtnName = null;

    tmpSiteSubList.forEach(item => {
      if (item.isActive) {
        siteDropdownBtnName = item.label;
      }
    });

    setIsSiteDropdownBtnName(siteDropdownBtnName ? siteDropdownBtnName : '');
  };

  return (
    <div className="dropdown-site-container">
      <button
        className={`btn btn-dropdown dropdown-toggle ${isInvalidClassName}`}
        type="button"
        id={'dropdown-site'}
        data-bs-toggle="dropdown"
        disabled={!!disabled}
        aria-expanded="false"
      >
        {siteRadioButtonList[0].checked ||
        siteRadioButtonList[1].checked ||
        isSiteDropdownBtnName?.length > 0 ? (
          <span className="dropdown-button-others">{isSiteDropdownBtnName}</span>
        ) : (
          <span className="dropdown-button-all-sites">{t('299287797e')}</span>
        )}
      </button>
      <ul
        className="dropdown-menu p-0"
        aria-labelledby={'dropdown-site'}
        onClick={e => e.stopPropagation()}
      >
        <div className="main-content">
          {siteRadioButtonList.map(item => (
            <li key={`site-li-${item.key}`}>
              <RadioButton
                key={`site-radio-button-${item.key}`}
                id={`site-radio-button-${item.key}`}
                name={t(item.label)}
                label={t(item.label)}
                checked={item.checked}
                disabled={disabled}
                onChange={() => changeRadioSiteItem(item.key)}
              />
            </li>
          ))}
        </div>
        {(siteRadioButtonList[0].checked || siteRadioButtonList[1].checked) && (
          <div className="sub-content">
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={isSearchValue}
              onChange={e => {
                console.log(e.target.value);
                setIsSearchValue(e.target.value);
              }}
            />
            <ul>
              {siteSubList.map(item => (
                <li
                  key={`sub-li-${item.id}`}
                  className={`${item.isActive ? 'active' : ''}`}
                  onClick={() => changeSubListItem(item)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </ul>
    </div>
  );
};

export default memo(DropdownWithSite);
