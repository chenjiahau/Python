import tabAndLangStyle from './tab-and-lang.module.scss';

import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { Tab } from 'components/';

import MultipleLangModal from '../MultipleLangModal';

// Dummy data & util
import { getChangeModalStatusFn } from 'dummy/utils/modal';

const defaultModalStatus = {
  multipleLang: {
    self: 'multipleLang',
    status: false,
  },
};

const TabAndLang = (props) => {
  const {
    tabs,
    changeTab,
    form
  } = props;

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  // Side effect

  const selectedType = form.type.find(type => type.isActive === true);

  return (
    <>
      <div className={tabAndLangStyle['tab-and-lang-block']}>
        {
          selectedType.isLoginPage ? (
            <>
              <Tab
                tabAlignLeft={true}
                noMarginBottom={true}
                tabList={tabs}
                changeTab={changeTab}
              />
            </>
          ) : (
            <><Tab noMarginBottom={true} /></>
          )
        }
        <div className={tabAndLangStyle['multiple-languages-block']}>
          <button
            className={tabAndLangStyle['btn']}
            style={{ textWrap: 'nowrap' }}
            onClick={() => changeModalStatus(modalStatus.multipleLang.self, true)}
          >
            MULTIPLE LANGUAGES
          </button>
        </div>
      </div >

      <MultipleLangModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </>
  )
}

export default TabAndLang;