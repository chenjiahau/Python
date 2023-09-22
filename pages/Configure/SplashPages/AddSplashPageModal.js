import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer, Input, AccessPrivilege } from 'components/';

// Dummy data & util
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const AddSplashPageModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    styleDefinition,
    authenticationDefinition,
    cloneFromDefinition,
    siteTags,
    sites,
    openEditSplashPageModal
  } = props;

  // State
  const [inputSearchValue, setInputSearchValue] = useState(null);
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  // Side effect
  useEffect(() => {
    if (!modalStatus.addSplashPage.status) {
      return;
    }

    const updatedForm = {
      name: '',
      style: [],
      authenticationType: [],
      siteTag: [],
      site: [],
      cloneFrom: [],
    };

    // Style
    const styledDropdown = styleDefinition.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0
      };
    });

    // Authentication type
    const authenticationTypeDropdown = authenticationDefinition.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0
      };
    });

    // Clone from
    const cloneFromDropdown = cloneFromDefinition.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0
      };
    });

    // Site tag
    const siteTagDropdown = siteTags.map((item, index) => {
      return {
        title: item.title,
        value: item.title,
        isActive: index === 0
      };
    });

    // Site
    const siteDropdown = sites.map((item, index) => {
      return {
        title: item.title,
        value: item.title,
        isActive: index === 0
      };
    });

    updatedForm.style = styledDropdown;
    updatedForm.authenticationType = authenticationTypeDropdown;
    updatedForm.cloneFrom = cloneFromDropdown;
    updatedForm.siteTag = siteTagDropdown;
    updatedForm.site = siteDropdown;

    setForm(updatedForm);
  }, [modalStatus.addSplashPage.status]);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addSplashPage.status}
      closeModal={() => changeModalStatus(modalStatus.addSplashPage.self, false)}
    >
      <div className='header'>
        <div className='title'>Add a splash page</div>
      </div>
      <div className='body'>
        {/* Splash name */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>Splash name</div>
            <Input
              type='text'
              value={form.name}
              placeholder='1-64 characters'
              onChange={e => changeValue('name', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>
        {/* Style, Authentication type */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>Style</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.style.find(item => item.isActive)}
              itemList={form.style}
              onClick={item => changeValue('style', item)}
            />
          </Col>
          {
            form.style.find(item => item.isActive).title === 'Classic HTML' && (
              <>
                <Col sm={6}>
                  <div className='modal-form-title'>Authentication type</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={form.authenticationType.find(item => item.isActive)}
                    itemList={form.authenticationType}
                    onClick={item => changeValue('authenticationType', item)}
                  />
                </Col>
              </>
            )
          }
        </Row>
        {/* Access level */}
        <Row className='mt-2'>
          <Col>
            <AccessPrivilege
              id="splash-page-privilege-dropdown"
              onChangeSearch={e => setInputSearchValue(e.target.value)}
              inputSearchValue={inputSearchValue}
              siteTagList={form.siteTag}
              siteList={form.site}
            />
          </Col>
        </Row>
        {/* Clone from */}
        <div className='sub-title mt-4 mb-4'>Clone from</div>
        <Row className='mt-2'>
          <Col>
            <DropdownWithItem
              type='normal'
              selectedItem={form.cloneFrom.find(item => item.isActive)}
              itemList={form.cloneFrom}
              onClick={item => changeValue('cloneFrom', item)}
            />
          </Col>
        </Row>
      </div>

      <div className='footer d-flex justify-content-between'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus(modalStatus.addSplashPage.self, false)}
        />
        <div>
          {
            form.style.find(item => item.isActive).title === 'Classic HTML' ? (
              <>
                <Button
                  label='Save'
                  className='btn-submit'
                  onClick={() => changeModalStatus(modalStatus.addSplashPage.self, false)}
                />
              </>
            ) : (
              <>
                <Button
                  label='Next'
                  className='btn-submit'
                  style={{ marginRight: '10px' }}
                  onClick={openEditSplashPageModal}
                />
              </>
            )
          }
        </div>
      </div>
    </ModalContainer >
  );
};

export default AddSplashPageModal;
