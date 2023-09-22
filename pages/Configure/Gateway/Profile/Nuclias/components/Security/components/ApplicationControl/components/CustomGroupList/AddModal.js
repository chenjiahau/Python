import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  DropdownWithItem, Button, ModalContainer, Input, InputWithIcon,
  Checkbox
} from 'components/';

// Dummy data & util
import { getCustomGroupConfig } from 'dummy/data/gateway/data/security/application-control/custom-group-list';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const AddModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    appPackage,
  } = props;

  // State
  const [leftAppPackageDropdown, setLeftAppPackageDropdown] = useState([]);
  const [leftAppPackageCheckbox, setLeftAppPackageCheckbox] = useState([]);
  const [rightAppPackageCheckbox, setRightAppPackageCheckbox] = useState([]);
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  // Side effect
  useEffect(() => {
    if (!modalStatus.addConfig.status) {
      return;
    }

    const updatedLefAppPackageDropdown = [];
    const updatedLefAppPackageCheckbox = [];
    appPackage.forEach((p, index) => {
      updatedLefAppPackageDropdown.push({
        title: p.group,
        value: p.group,
        isActive: false,
      });
      updatedLefAppPackageCheckbox.push({
        title: p.group,
        checked: false,
        level: 'first',
        list: p.apps.map(item => ({
          parentTitle: p.group,
          title: item,
          level: 'second',
          checked: false,
        }))
      });
    });
    updatedLefAppPackageDropdown.unshift({
      title: 'All',
      value: 'All',
      isActive: true,
    });

    setLeftAppPackageDropdown(updatedLefAppPackageDropdown);
    setLeftAppPackageCheckbox(updatedLefAppPackageCheckbox);

    const updatedRightAppPackageCheckbox = [];
    // appPackage.forEach((p, index) => {
    //   if (index !== 4) {
    //     return;
    //   }

    //   updatedRightAppPackageCheckbox.push({
    //     title: p.group,
    //     checked: false,
    //     level: 'first',
    //     list: p.apps.map(item => ({
    //       parentTitle: p.group,
    //       title: item,
    //       level: 'second',
    //       checked: false,
    //     }))
    //   });
    // });
    // setRightAppPackageCheckbox(updatedRightAppPackageCheckbox);

    const customGroupConfig = getCustomGroupConfig();

    setForm(customGroupConfig);
  }, [modalStatus.addConfig.status]);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-550px'
      openModal={modalStatus.addConfig.status}
      closeModal={() => changeModalStatus(modalStatus.addConfig.self, false)}
    >
      <div className='header'>
        <div className='title'>Add group configuration</div>
      </div>
      <div className='body'>
        <Row className='mt-2'>
          <Col>
            <div className='modal-form-title required'>Group name</div>
            <Input
              type='text'
              value={form.groupName}
              placeholder='1-64 characters'
              onChange={e => changeValue('groupName', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row >

        <div className='sub-title mt-4 mb-4'>Application list</div>
        <div className={mainStyle['category-block']}>
          <div className={mainStyle['selector']}>
            <div>Unselected apps</div>
            <InputWithIcon
              type='search'
              placeholder='Search'
              iconPosition='left'
              iconClassName='icon-search'
              value={''}
              onChange={e => { }}
              onClick={() => { }}
              onBlur={() => { }}
            />
            <div className={mainStyle['combined-block']}>
              <DropdownWithItem
                type='normal'
                dropDownMenuStyle={{ maxHeight: '206px', overflowY: 'auto' }}
                selectedItem={leftAppPackageDropdown.find(item => item.isActive)}
                itemList={leftAppPackageDropdown}
                onClick={item => { }}
              />
              <div className={mainStyle['dropdown-block--left']}>
                {
                  leftAppPackageCheckbox.map((p, index) => {
                    return (
                      <div key={`left-app-package-${index}`} className={mainStyle['dropdown-parent-item']}>
                        <Checkbox
                          id={`left-app-package-${index}`}
                          label={p.title}
                          checked={p.checked}
                          onChange={() => { }}
                        />
                        {
                          p.list.map((item, childIndex) => {
                            return (
                              <div key={`left-app-package-${index}-${childIndex}`} className={mainStyle['dropdown-child-item']}>
                                <Checkbox
                                  id={`item-${childIndex}`}
                                  label={item.title}
                                  checked={item.checked}
                                  onChange={() => { }}
                                />
                              </div>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className='d-flex justify-content-end'>Total: 1769 items</div>
          </div>
          <div className={mainStyle['operator']}>
            <Button
              label='<<'
              onClick={() => { }}
            />
            <Button
              label='>>'
              onClick={() => { }}
            />
          </div>
          <div className={mainStyle['selector']}>
            <div>Selected apps</div>
            <InputWithIcon
              type='search'
              placeholder='Search'
              iconPosition='left'
              iconClassName='icon-search'
              value={''}
              onChange={e => { }}
              onClick={() => { }}
              onBlur={() => { }}
            />
            <div className={mainStyle['combined-block']}>
              <div className={mainStyle['dropdown-block--right']}>
                {
                  rightAppPackageCheckbox.map((p, index) => {
                    return (
                      <div key={`right-app-package-${index}`} className={mainStyle['dropdown-parent-item']}>
                        <Checkbox
                          id={`right-app-package-${index}`}
                          label={p.title}
                          checked={p.checked}
                          onChange={() => { }}
                        />
                        {
                          p.list.map((item, childIndex) => {
                            return (
                              <div key={`right-app-package-${index}-${childIndex}`} className={mainStyle['dropdown-child-item']}>
                                <Checkbox
                                  id={`item-${childIndex}`}
                                  label={item.title}
                                  checked={item.checked}
                                  onChange={() => { }}
                                />
                              </div>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className='d-flex justify-content-end'>Selected: 0 items</div>
          </div>
        </div>
      </div >

      <div className='footer d-flex justify-content-between'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus(modalStatus.addConfig.self, false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus(modalStatus.addConfig.self, false)}
        />
      </div>
    </ModalContainer >
  );
};

export default AddModal;
