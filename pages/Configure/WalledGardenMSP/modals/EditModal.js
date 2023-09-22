import walledgardenStyle from '../walled-garden.module.scss';

import { useEffect, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Table, ButtonGroup } from 'react-bootstrap';
import Button from '../../../../components/Button';
import LinkerWithA from '../../../../components/LinkerWithA';
import ButtonAction from '../../../../components/ButtonAction';
import Checkbox from '../../../../components/Checkbox';
import Input from '../../../../components/Input';
import TooltipDialog from '../../../../components/TooltipDialog';

// Components
import ModalContainer from '../../../../components/ModalContainer';

const defaultCheckboxlist = [
  { type: 'all' , id: 0, checked:false, value:'' },
  { type: '1th' , id: 1, checked:false, value:'123-321' },
  { type: '2th' , id: 2, checked:false, value:'' }
];
const SetRangeList = (props) =>{
  return (
    <tbody>
      {
        props.list.map((item, index) => {
          return <>
            {item.type !== 'all' && (<tr key={item.id} >
              <td>
                <Checkbox
                  id={'wg-cb'+index}
                  type='checkbox'
                  checked={item.checked === true}
                  onChange={e => {
                  props.changeCheckbox(item.type, e.target.checked);
                  console.log(item)
                  }}/>
              </td>
              <td>{index}</td>
              <td className={walledgardenStyle['tb-input']}>
                <Input
                  type="text"
                  value={item.value}
                  placeholder={props.t('047428012a')}
                  onChange={e => {
                    console.log(e.target.value);
                  }}
                  onFocus={() => {}}
                  onBlur={() => {}}
                />
              </td>
              <td className={'table-action-td'}>
                <ButtonAction
                  label={props.t('ce64bbe3ba')}
                  title="DELETE"
                  iconClassName="icon-trash"
                  onClick={() => {
                    props.deleteRangeItem(item, props.list);
                  }}
                />
              </td>
            </tr>)}
          </>
          
        })
      }
    </tbody>
  )
}

const EditModal = props => {
  const { t }= useTranslation();
  const { modalStatus, changeModalStatus } = props;
  console.log(props, modalStatus.edit.status);

  const sorting = e => {
    console.log('sorting event')
    e.preventDefault();
    const isAscExsist = e.target.classList.contains('is-asc');
    const lastClassName = isAscExsist ? 'is-asc' : 'is-desc';
    const newClassName = isAscExsist ? 'is-desc' : 'is-asc';
    e.target.classList.add(newClassName);
    e.target.classList.remove(lastClassName);
  }
  const [checkboxlist, setCheckboxlist] = useState(defaultCheckboxlist);
  const changeCheckbox = (type, value) => {
    const newCheckboxlist = [...checkboxlist]
    if (type === 'all') {
      for (let item of newCheckboxlist) {
        item.checked = value;
      }    
      setCheckboxlist(newCheckboxlist);
    }
    else {
      for (let item of newCheckboxlist) {
        if (item.type === type) {
          item.checked = value;
        }
      }
      let ifAllchecked = true;
      for (let i = 1; i < newCheckboxlist.length; i++) {
        if(!newCheckboxlist[i].checked){
          ifAllchecked = false;
        }
      }
      newCheckboxlist[0].checked = ifAllchecked;
      setCheckboxlist(newCheckboxlist);
    }
    // checkbox
    if (value){ //enable
      setCheckBtn(false);
    }else{ //disable
      updateCheckBtn();
    }
  }

  const [CheckBtn, setCheckBtn] = useState(true);
  const updateCheckBtn = (list) =>{
    setCheckBtn(true);
    let tmpCheckboxlist = list ? list : checkboxlist;
    for (let item of tmpCheckboxlist) {
      if (item.checked === true) {
        setCheckBtn(false);
        break;
      }
    }
  }

  const deleteRangeList = (list) =>{
    if(list[0].checked === true){
      list[0].checked = false;
      updateRangeList(list.filter(item => item.type === 'all'));
    }else{
      updateRangeList(list.filter(item => item.checked !== true));
    }
  }
  const updateRangeList = (list) =>{
    if(list.length === 1){
      list[0].checked = false;
      setCheckBtn(true);
    }else{
      updateCheckBtn(list);
    }
    setCheckboxlist(list);
      
  }
  const addRangeItem = (list) =>{
    let newItem = {type: list[list.length -1].id+'th', id: list[list.length -1].id +1, checked:false, value:'' };
    let newList = [...list, newItem];
    newList[0].checked = false;
    updateRangeList(newList)
  }
  const deleteRangeItem = (item, list) =>{
    let target = item.id;
    let newList = [...list];
    updateRangeList(newList.filter(item => item.id !== target));
  }

  return (
    <div className={walledgardenStyle['walled-garden-edit-modal']}>
      <ModalContainer
        modalWidthType="modal-750px"
        openModal={modalStatus.edit.status}
        closeModal={() => changeModalStatus('edit', false)}
      >
        <div className="header">
          <div className="title">{t('5f4d2f18a4')}</div>
        </div>
        <div className='body'>
          
          <div className='d-flex justify-content-between mb-2'>
            <ButtonGroup>
              <Button
                label={t('ec211f7c20')}
                onClick={() => {
                  console.log('click Addd btn');
                  addRangeItem(checkboxlist);
                }}
              ></Button>
              <Button
                label={t('f2a6c498fb')}
                disabled = {CheckBtn}
                onClick={() => {
                  deleteRangeList(checkboxlist);
                }}
              ></Button>
            </ButtonGroup>
          </div>
          <Table responsive striped hover className='table-container'>
            <thead className={`${walledgardenStyle['th-with-tip']}`}>
              <tr>
                <th>
                  <Checkbox
                    id="rl-th-cb1"
                    type='checkbox'
                    checked={checkboxlist[0].checked === true}
                    onChange={e => changeCheckbox('all', e.target.checked)}
                  />
                </th>
                <th>#</th>
                <th>
                  <div className='d-flex justify-content-start'>
                    {t('244d1ce297')}
                    <TooltipDialog
                      className='ms-1'
                      placement='right'
                      title="A walled garden is a secure environment where you can control and restrict the captive portal user's access to the Internet until they are fully authenticated.<br>They are able to access up to 20 selected whitelisted websites or IP addresses.<br>eg<br>192.168.10.100/32 or 10.90.0.0/16<br>google.com or dlink.com"
                    ></TooltipDialog>
                  </div>
                </th>
                <th className={'table-action-th'}>{t('06df33001c')}</th>
              </tr>
            </thead>
            <SetRangeList list={checkboxlist} deleteRangeItem={deleteRangeItem} changeCheckbox={changeCheckbox} t={t}/>
          </Table> 
        </div>
        <div className="footer">
          <Button
            label={t('ea4788705e')}
            className="btn-cancel"
            onClick={() => {
              console.log('click Close');
              changeModalStatus('edit', false);
            }}
          />
          <Button
            label={t('9639e32cab')}
            className="btn-submit"
            onClick={() => {
              console.log('click save');
              changeModalStatus('edit', false);
            }}
          />
        </div>
      </ModalContainer>
    </div>
  );
};

export default EditModal;
