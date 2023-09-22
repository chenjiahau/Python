import containerStyle from './container.module.scss';

import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { Button, ModalContainer } from 'components/';

import PreviewBlock from './Preview';
import TabAndLang from './TabAndLang';
import Login from './Login';

// Dummy data & util
import { generateEditSplashPageDefaultData } from 'dummy/data/splash-page';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const defaultPreviewSize = {
  desktop: 'desktop',
  tablet: 'tablet',
  phone: 'phone',
};

const defaultMode = {
  preview: 'preview',
  edit: 'edit',
}

const defaultTabs = [
  { id: 1, label: 'LOGIN', value: 'login', isShow: false, isActive: false },
  { id: 2, label: 'MESSAGES', value: 'messages', isShow: false, isActive: false },
  { id: 3, label: 'TERMS', value: 'terms', isShow: false, isActive: false }
];

const EditSplashPageModal = props => {
  const {
    modalStatus,
    changeModalStatus,
  } = props;

  // State
  const [previewSize, setPreviewSize] = useState(defaultPreviewSize.desktop);
  const [mode, setMode] = useState(defaultMode.preview);
  const [tabs, setTabs] = useState([]);
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  const changeTab = selectedTab => {
    const newTabs = cloneDeep(tabs);
    const index = newTabs.findIndex(tab => tab.id === selectedTab.id);
    newTabs.map(tab => tab.isActive = false);
    newTabs[index].isActive = true;
    setTabs(newTabs);
  }

  // Side effect
  useEffect(() => {
    if (!modalStatus.editSplashPage.status) {
      return;
    }

    const updatedTabs = cloneDeep(defaultTabs);
    updatedTabs[0].isShow = true;
    updatedTabs[0].isActive = true;
    setTabs(updatedTabs);

    const updatedForm = generateEditSplashPageDefaultData();
    setForm(updatedForm);
  }, [modalStatus.editSplashPage.status]);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-90percent'
      openModal={modalStatus.editSplashPage.status}
      closeModal={() => changeModalStatus(modalStatus.editSplashPage.self, false)}
    >
      <div className='header'>
        <div className='title'>Splash page editor</div>
      </div>
      <div className='body' style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <div className={containerStyle['edit-splash-page-container']}>
          <PreviewBlock
            defaultPreviewSize={defaultPreviewSize}
            previewSize={previewSize}
            setPreviewSize={setPreviewSize}
            defaultMode={defaultMode}
            mode={mode}
            setMode={setMode}
            form={form}
            changeValue={changeValue}
          />

          <TabAndLang
            tabs={tabs}
            changeTab={changeTab}
            form={form}
          />

          <Login
            defaultPreviewSize={defaultPreviewSize}
            previewSize={previewSize}
            defaultMode={defaultMode}
            mode={mode}
            tabs={tabs}
            form={form}
          />
        </div>
      </div>

      <div className='footer' style={{ borderTop: 'none', padding: 0 }}>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus(modalStatus.editSplashPage.self, false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus(modalStatus.editSplashPage.self, false)}
        />
      </div>
    </ModalContainer >
  );
};

export default EditSplashPageModal;
