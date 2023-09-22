import walledgardenStyle from '../walled-garden.module.scss';

import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
// Components
import { Row, Col } from 'react-bootstrap';
import ModalContainer from '../../../../components/ModalContainer';
import Button from '../../../../components/Button';
import Input from '../../../../components/Input';
import Icon from '../../../../components/Icon';
import ButtonWithIcon from "components/ButtonWithIcon";

const SetPrivilegeList = (props) =>{
  return (
    <div>
      <Row className="mt-2" >
        {props.list.map((item, index) => (
          <Col sm={6} key={item.id}>
            <div className="modal-form-title required">{props.t('3ac4062a04')} #{index+1}</div>
            <div className={walledgardenStyle['add-range-input-group']}>
              <Input type="text" placeholder={props.t('047428012a')} value = {item.value}
                onChange={() => {}} onFocus={() => {}} onBlur={() => {}} />
              {index !== 0 && (
                <Icon
                iconTitle="delete"
                className={`icon-close ${walledgardenStyle['icon']}`}
                onClick={() => {
                  props.deleteRangeItem(item, props.list);
                }}/>
              )}
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

const AddModal = props => {
  const { t }= useTranslation();
  const { modalStatus, changeModalStatus } = props;
  console.log(props, modalStatus.add.status);
  
  const AddRangeItem = (list) =>{
    let newItem = {id: list[list.length -1].id +1,val:''};
    let newList = [...list, newItem];
    updateRangeList(newList)
  }
  const updateRangeList = (list) =>{
    setRangeList(list);
  }
  const deleteRangeItem = (item, list) =>{
    let target = item.id;
    let newList = [...list];
    updateRangeList(newList.filter(item => item.id !== target));
  }

  const defaultList = [ {id:1, value:'test.QQ'}, {id:2, value:''} ];
  const [RangeList, setRangeList] = useState(defaultList);

  return (
    <div className={walledgardenStyle['walled-garden-add-modal']}>
      <ModalContainer
        modalWidthType="modal-500px"
        openModal={modalStatus.add.status}
        closeModal={() => changeModalStatus('add', false)}
      >
        <div className="header">
          <div className="title">{t('14df9b075b')}</div>
        </div>
        <div className='body'>
          <div className="mb-2">
            <div className="modal-form-title required">{t('b36ddbee16')}</div>
            <div className="modal-form-field">
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
          <div className="mb-2 mt-3">
            <div className="modal-subtitle">{t('8f1bd444d2')}</div>
          </div>
          <div className="mb-2">
            <div className="modal-form-field">
              <SetPrivilegeList list={RangeList} deleteRangeItem={deleteRangeItem} t={t}/>
            </div>
          </div>
          <ButtonWithIcon
            label={t('ec211f7c20')}
            className="d-flex justify-content-center mt-4"
            iconClassName="icon-expand"
            onClick={() => {
              console.log('click Addd btn');
              AddRangeItem(RangeList);
            }}
          ></ButtonWithIcon>
        </div>
        <div className="footer">
          <Button
            label={t('ea4788705e')}
            className="btn-cancel"
            onClick={() => {
              console.log('click Close');
              updateRangeList(defaultList);
              changeModalStatus('add', false);
            }}
          />
          <Button
            label={t('c9cc8cce24')}
            className="btn-submit"
            onClick={() => {
              console.log('click save');
              updateRangeList(defaultList);
              changeModalStatus('add', false);
            }}
          />
        </div>
      </ModalContainer>
    </div>
  );
};

export default AddModal;
