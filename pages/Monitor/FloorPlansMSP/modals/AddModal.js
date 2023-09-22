import floorplansStyle from '../floor-plans.module.scss';

import { useEffect, useState, useCallback } from 'react';
// Components
import { useTranslation } from 'react-i18next';
import ModalContainer from '../../../../components/ModalContainer';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import DropdownWithItem from '../../../../components/DropdownWithItem';


const AddModal = props => {
  const { t }= useTranslation();
  const { modalStatus, changeModalStatus } = props;
  console.log(props, modalStatus.add.status);
  
  const dropdownAccessRoleList = [
    { title: 'HQ', isActive: true },
    { title: 'Songshan', isActive: false },
    { title: 'Daliao', isActive: false },
    { title: 'Neiwan', isActive: false },
  ];

  return (
    <div className=''>
      <ModalContainer
        modalWidthType="modal-500px"
        openModal={modalStatus.add.status}
        closeModal={() => changeModalStatus('add', false)}
      >
        <div className="header">
          <div className="title">{t('2c5fc81151')}</div>
        </div>
        <div className='body'>
          <div className="mb-2">
            <div className="modal-form-group">
              <div className={`modal-form-title required me-3 ${floorplansStyle['modal-col-title']}`}>{t('49ee308734')}</div>
              <div className='modal-form-field'>
                <Input
                  type="text"
                  placeholder={t('7563cde047')}
                  onChange={e => {
                    console.log(e.target.value);
                  }}
                  onFocus={() => {}}
                  onBlur={() => {}}
                />
              </div>
            </div>
          </div>
          <div className="mb-2">
            <div className="modal-form-group">
              <div className={`modal-form-title me-3 ${floorplansStyle['modal-col-title']}`}>{t('a7d6475ec8')}</div>
              <div className="modal-form-field">
                <DropdownWithItem
                  id="used-unused-dropdown"
                  type="normal"
                  selectedItem={dropdownAccessRoleList[0]}
                  itemList={dropdownAccessRoleList}
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="footer non-border-top-footer">
          <Button
            label={t('ea4788705e')}
            className="btn-cancel"
            onClick={() => {
              console.log('click Close');
              changeModalStatus('add', false);
            }}
          />
          <Button
            label={t('c9cc8cce24')}
            className="btn-submit"
            onClick={() => {
              console.log('click save');
              changeModalStatus('add', false);
            }}
          />
        </div>
      </ModalContainer>
    </div>
  );
};

export default AddModal;
