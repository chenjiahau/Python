import previewStyle from './preview.module.scss';

import { useState, useEffect } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Input, TooltipDialog } from 'components/';

const PreviewBlock = (props) => {
  const {
    defaultPreviewSize,
    previewSize,
    setPreviewSize,
    defaultMode,
    mode,
    setMode,
    form,
    changeValue,
  } = props;

  return (
    <>
      <div className={previewStyle['preview-block']}>
        {/* Splash name */}
        <div>
          <div className='modal-form-title required'>Splash name</div>
          <Input
            type='text'
            value={form.name}
            placeholder='1-64 characters'
            onChange={e => changeValue('name', e.target.value)}
            onFocus={() => { }}
            onBlur={() => { }}
          />
        </div>
        {/* Preview and edit in use case */}
        <div>
          <div className='modal-form-title'>
            Preview and edit in use case
            <TooltipDialog
              className='ms-1 me-1'
              title='Change the use case to preview the Splash Page Template showing in that case. It can preview a single branding image in different use cases, such as Captive Portal authentication method, OpenVPN profile download page (OmniSSL portal), Web content filter warning page, ...etc. Splash page template defined the same branding image, customized messages, font size, and font color in different use cases.'
            />
          </div>
          <DropdownWithItem
            type='normal'
            selectedItem={form.type.find(item => item.isActive)}
            itemList={form.type}
            onClick={item => {
              changeValue('type', item)
            }}
          />
        </div>
        {/* Operation */}
        <div className={previewStyle['operation']}>
          <div className={previewStyle['panel']}>
            {
              previewSize === defaultPreviewSize.desktop ? (
                <><i className={previewStyle['selected-desktop-icon']} /></>
              ) : (
                <>
                  <i
                    className={previewStyle['desktop-icon']}
                    onClick={() => setPreviewSize(defaultPreviewSize.desktop)} />
                </>
              )
            }
            {
              previewSize === defaultPreviewSize.tablet ? (
                <><i className={previewStyle['selected-tablet-icon']} /></>
              ) : (
                <>
                  <i
                    className={previewStyle['tablet-icon']}
                    onClick={() => setPreviewSize(defaultPreviewSize.tablet)}
                  />
                </>
              )
            }
            {
              previewSize === defaultPreviewSize.phone ? (
                <><i className={previewStyle['selected-phone-icon']} /></>
              ) : (
                <>
                  <i
                    className={previewStyle['phone-icon']}
                    onClick={() => setPreviewSize(defaultPreviewSize.phone)}
                  />
                </>
              )
            }
          </div>
          <div className={previewStyle['panel']}>
            {
              mode === defaultMode.preview ? (
                <><button className={previewStyle['selected-preview-mode']}>Preview</button></>
              ) : (
                <>
                  <button
                    className={previewStyle['preview-mode']}
                    onClick={() => setMode(defaultMode.preview)}
                  >
                    Preview
                  </button>
                </>
              )
            }
            {
              mode === defaultMode.edit ? (
                <><button className={previewStyle['selected-edit-mode']}>Edit</button></>
              ) : (
                <>
                  <button
                    className={previewStyle['edit-mode']}
                    onClick={() => setMode(defaultMode.edit)}
                  >
                    Edit
                  </button>
                </>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default PreviewBlock;