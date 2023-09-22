import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { clone, cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer, Input } from 'components/';

// Dummy data & util
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const EditModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    splashPage,
    selectedConfig,
  } = props;

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  // Side effect
  useEffect(() => {
    if (!modalStatus.editConfig.status) {
      return;
    }

    const customWarningPage = cloneDeep(selectedConfig.config);

    // Splash page
    customWarningPage.warningPage = splashPage.map(item => {
      return {
        title: item.title,
        value: item.title,
        isActive: selectedConfig.config.warningPage === item.title ? true : false,
      }
    });

    setForm(customWarningPage);
  }, [modalStatus.editConfig.status]);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-550px'
      openModal={modalStatus.editConfig.status}
      closeModal={() => changeModalStatus(modalStatus.editConfig.self, false)}
    >
      <div className='header'>
        <div className='title'>Edit Custom warning page</div>
      </div>
      <div className='body'>
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>Name</div>
            <Input
              type='text'
              value={form.name}
              placeholder='1-64 characters'
              onChange={e => changeValue('name', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>Warning page</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.warningPage.find(item => item.isActive)}
              itemList={form.warningPage}
              onClick={item => changeValue('warningPage', item)}
            />
          </Col>
        </Row>
      </div >

      <div className='footer d-flex justify-content-between'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus(modalStatus.editConfig.self, false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus(modalStatus.editConfig.self, false)}
        />
      </div>
    </ModalContainer >
  );
};

export default EditModal;
