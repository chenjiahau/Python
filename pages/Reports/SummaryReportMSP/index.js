import summaryReportStyle from './summary-report.module.scss';

import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { cloneDeep } from 'lodash';

// Modal
import GenerateModal from './modals/GenerateModal';

// Components
import Button from '../../../components/Button';
import Breadcrumb from '../../../components/Breadcrumb';
import TooltipDialog from '../../../components/TooltipDialog';
import MessageBoxGroup from '../../../components/MessageBoxGroup';
import DropdownWithTimeframe from '../../../components/DropdownWithTimeframe';

const defaultMessages = {
  success: null,
  error: null,
  warning: null,
};

const defaultModalStatus = {
  generate: {
    status: false,
  },
};

const defaultPathList = [
  { label: 'c91c7b93c2', isLink: false }, // Reports
  { label: 'd37ef8b077', isLink: false }, // Summary report
];

const SummaryReportMSP = () => {
  const { t } = useTranslation();

  const [multiMessages, setMultiMessages] = useState(cloneDeep(defaultMessages));
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  const changeModalStatus = useCallback((type, value) => {
    setModalStatus({ ...modalStatus, [type]: { status: value } });
  }, []);

  return (
    <>
      <Breadcrumb pathList={defaultPathList} />

      <MessageBoxGroup
        containerMode={true}
        messages={multiMessages}
        onClose={type => setMultiMessages({ ...multiMessages, [type]: null })}
      />
      <div className="layout-container layout-container--column layout-container--fluid">
        <div className="row">
          <div className="container">
            <div className={`${summaryReportStyle['tab-container-border']}`}>
              <span className={`${summaryReportStyle['subtitle']}`}>{t('d37ef8b077')}</span>
              <hr />
              <div className="d-inline-flex mt-2">
                <span className="form-title me-2">{t('a056c9a163')} :</span>
                <DropdownWithTimeframe
                  customTimeFrameDay={'60'}
                  customHideItem={['last60days']}
                  alignEnd={true}
                  onInit={initTimeFrame => console.log('initTimeFrame-', initTimeFrame)}
                  onChange={selectedTimeframe =>
                    console.log('selectedTimeframe-', selectedTimeframe)
                  }
                />

                <Button
                  label={t('de3e350386')}
                  className="btn-grey ms-3"
                  onClick={() => changeModalStatus('generate', true)}
                />

                <Button
                  label={t('801ab24683')}
                  className="btn-grey ms-3"
                  onClick={() => console.log('Click on download')}
                />

                <TooltipDialog
                  className="ms-3"
                  placement="right"
                  title={t('9d53acb410')}
                ></TooltipDialog>
              </div>
            </div>
          </div>
        </div>

        <GenerateModal modalStatus={modalStatus} changeModalStatus={changeModalStatus} />
      </div>
    </>
  );
};

export default SummaryReportMSP;
