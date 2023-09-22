import './dropdown-with-device-checkbox.component.scss';
import { useEffect, useState, memo } from 'react';
import { useTranslation } from 'react-i18next';
import Checkbox from '../../../../components/Checkbox';

const ButtonLabel = props => {
  const { t } = useTranslation();
  const { isToggleAll, selectedCount } = props;

  let tmpButtonLabel = null;

  if (isToggleAll) {
    // All.
    tmpButtonLabel = <span>{t('b1c94ca2fb')}</span>;
  } else {
    // xxxx selected.
    tmpButtonLabel = <span>{selectedCount + ' ' + t('3c9e0c6510')}</span>;
  }

  return tmpButtonLabel;
};

const DeviceLi = ({ isActive, isAll, extendLiClassName, id, label, checked, onChange }) => {
  const { t } = useTranslation();

  return (
    <li
      className={`${isActive ? 'active' : ''} ${isAll ? 'li-border-bottom' : ''} ${
        extendLiClassName || ''
      }`}
      key={label + '-' + id}
    >
      <Checkbox id={id} label={t(label)} checked={checked} onChange={onChange} />
    </li>
  );
};

const DropdownWithDeviceCheckbox = ({
  id,
  allMode, // open All checkbox
  disabled,
  onChangeAll,
  onChange,
  isInvalid,
  customizeReportInfo,
}) => {
  const { t } = useTranslation();

  const [isToggleAll, setIsToggleAll] = useState(false);
  const [selectedCount, setSelectedCount] = useState(0);

  useEffect(() => {
    allMode && setIsToggleAll(checkSelectedAll);
    checkSelectedCheckboxCount();
  }, [customizeReportInfo]);

  const invalidClassName = !!isInvalid ? 'invalid' : '';

  const checkSelectedAll = () => {
    const apSelectedAll = customizeReportInfo?.ap.length === customizeReportInfo?.ap.filter(item => item.checked).length;
    const switchSelectedAll = customizeReportInfo?.switch.length === customizeReportInfo?.switch.filter(item => item.checked).length;
    const gatewaySelectedAll = customizeReportInfo?.gateway.length === customizeReportInfo?.gateway.filter(item => item.checked).length;
    return apSelectedAll && switchSelectedAll && gatewaySelectedAll;
  };

  const checkSelectedCheckboxCount = () => {
    const checkboxList = Object.keys(customizeReportInfo).reduce(function(res, v) {
      return res.concat(customizeReportInfo[v]);
    }, [])

    const isSelectedCheckboxCount = checkboxList.filter((item) => item.checked).length;
    setSelectedCount(isSelectedCheckboxCount);
  };

  return (
    <div className="dropdown-with-device-checkbox-container">
      <div className="dropdown">
        <button
          className={`btn btn-dropdown dropdown-toggle ${invalidClassName}`}
          type="button"
          data-bs-toggle="dropdown"
          data-bs-display="static"
          data-bs-auto-close="outside"
          aria-expanded="false"
          disabled={disabled}
        >
          <ButtonLabel isToggleAll={isToggleAll} selectedCount={selectedCount} />
        </button>
        <ul className="dropdown-menu" aria-labelledby={id}>
          {allMode && (
            <li className="li-border-bottom">
              <Checkbox
                id={id + '-all'}
                label={t('d803978b66')} // Select all
                checked={isToggleAll}
                onChange={() => !!onChangeAll && onChangeAll(!isToggleAll)}
              />
            </li>
          )}

          <hr className="dropdown-hr" />

          {/* Access point */}
          <div className="device-content">
            <ul className="p-0">
              <li className="device-info-title">{t('cb3f9a1103')}</li>
              {customizeReportInfo?.ap.map((item, index) => {
                return (
                  <DeviceLi
                    key={item.title}
                    id={item.title}
                    label={item.title}
                    checked={item.checked}
                    onChange={() => !!onChange && onChange('ap', item)}
                  />
                );
              })}
            </ul>
          </div>

          {/* Switch */}
          <div className="device-content">
            <ul className="p-0">
              <li className="device-info-title">{t('bbc155fb2b')}</li>
              {customizeReportInfo?.switch.map((item, index) => {
                return (
                  <DeviceLi
                    key={item.title}
                    id={item.title}
                    label={item.title}
                    checked={item.checked}
                    onChange={() => !!onChange && onChange('switch', item)}
                  />
                );
              })}
            </ul>
          </div>

          {/* Gateway */}
          <div className="device-content">
            <ul className="p-0">
              <li className="device-info-title">{t('926dec9494')}</li>
              {customizeReportInfo?.gateway.map((item, index) => {
                return (
                  <DeviceLi
                    key={item.title}
                    id={item.title}
                    label={item.title}
                    checked={item.checked}
                    onChange={() => !!onChange && onChange('gateway', item)}
                  />
                );
              })}
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default memo(DropdownWithDeviceCheckbox);
