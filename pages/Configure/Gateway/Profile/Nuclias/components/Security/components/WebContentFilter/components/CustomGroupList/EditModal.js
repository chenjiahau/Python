import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Table, Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

import useStickyHeader from 'hooks/useStickyHeader';

// Component
import {
  DropdownWithItem, Button, ModalContainer, Input, TooltipDialog,
  RadioButton, ButtonAction, ButtonWithIcon, InputWithIcon, Checkbox,
  InputWithUploadButton, LinkerWithA
} from 'components/';

// Dummy data & util
import { getCustomGroupListConfig } from 'dummy/data/gateway/data/security/web-content-filter/custom-group-list';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const EditModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    customFilteringTypeDefinition,
    wcfCategory,
  } = props;

  // State
  const [needSecondPage, setNeedSecondPage] = useState(false);
  const [doAddUrlKeyword, setDoAddUrlKeyword] = useState(true);
  const [leftCategoryDropdown, setLeftCategoryDropdown] = useState([]);
  const [leftCategoryCheckbox, setLeftCategoryCheckbox] = useState([]);
  const [rightCategoryCheckbox, setRightCategoryCheckbox] = useState([]);
  const [form, setForm] = useState(null);
  const { tableRef, stickyStyle, setInitModal } = useStickyHeader(false, 'modal-table');

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  const changeCustomFilteringType = item => {
    const updatedForm = cloneDeep(form);
    updatedForm.customFilteringType.forEach(item => item.isActive = false);
    updatedForm.customFilteringType[item.value].isActive = true;
    setForm(updatedForm);
    setNeedSecondPage(false);
  }

  const addUrl = () => {
    const updatedForm = cloneDeep(form);
    updatedForm.url.push('');
    setForm(updatedForm);
  }

  const deleteUrl = index => {
    const updatedForm = cloneDeep(form);
    updatedForm.url.splice(index, 1);
    setForm(updatedForm);
  }

  // Side effect
  useEffect(() => {
    if (!modalStatus.editConfig.status) {
      return;
    }

    const updatedLeftCategoryDropdown = [];
    const updatedLeftCategoryCheckbox = [];
    wcfCategory.forEach((category, index) => {
      if (index === 4) {
        return;
      }

      updatedLeftCategoryDropdown.push({
        title: category.category,
        value: category.category,
        isActive: false,
      });
      updatedLeftCategoryCheckbox.push({
        title: category.category,
        checked: false,
        level: 'first',
        list: category.items.map(item => ({
          parentTitle: category.category,
          title: item,
          level: 'second',
          checked: false,
        }))
      });
    });
    updatedLeftCategoryDropdown.unshift({
      title: 'All',
      value: 'All',
      isActive: true,
    });

    setLeftCategoryDropdown(updatedLeftCategoryDropdown);
    setLeftCategoryCheckbox(updatedLeftCategoryCheckbox);

    const updatedRightCategoryCheckbox = [];
    wcfCategory.forEach((category, index) => {
      if (index !== 4) {
        return;
      }

      updatedRightCategoryCheckbox.push({
        title: category.category,
        checked: true,
        level: 'first',
        list: category.items.map(item => ({
          parentTitle: category.category,
          title: item,
          level: 'second',
          checked: true,
        }))
      });
    });
    setRightCategoryCheckbox(updatedRightCategoryCheckbox);

    const customGroupListConfig = getCustomGroupListConfig();

    const customFilteringTypeDropdown = [];
    customFilteringTypeDefinition.forEach((item, index) => {
      customFilteringTypeDropdown.push({
        title: item,
        value: index,
        isActive: index === 0 ? true : false,
      });
    });

    customGroupListConfig.customFilteringType = customFilteringTypeDropdown;
    customGroupListConfig.url.push('');

    setForm(customGroupListConfig);
    setInitModal(true);

    return () => {
      setDoAddUrlKeyword(true);
      setNeedSecondPage(false);
    }
  }, [modalStatus.editConfig.status]);

  if (!form) {
    return;
  }

  const selectedCustomFilteringType = form.customFilteringType.find(item => item.isActive);

  return (
    <ModalContainer
      modalWidthType='modal-550px'
      openModal={modalStatus.editConfig.status}
      closeModal={() => changeModalStatus(modalStatus.editConfig.self, false)}
    >
      <div className='header'>
        <div className='title'>Edit group configuration</div>
      </div>
      <div className='body'>
        {
          !needSecondPage && (
            <>
              {/* Group name */}
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
              {/* Custom filtering type */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title'>Custom filtering type</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={form.customFilteringType.find(item => item.isActive)}
                    itemList={form.customFilteringType}
                    onClick={item => changeCustomFilteringType(item)}
                  />
                </Col>
              </Row>
            </>
          )
        }

        {/* URL */}
        <div style={{
          display: ['URL', 'URL + Category based'].indexOf(selectedCustomFilteringType.title) !== -1 && !needSecondPage ? 'block' : 'none'
        }}>
          <div className='sub-title mt-4 mb-4'>
            URL filtering
            <TooltipDialog
              className='ms-1 me-1'
              title={ReactDOMServer.renderToString(
                <div>
                  • URL filtering supports URL(HTTP/HTTPS), domain name or keyword.<br />
                  • e.g.) www.google.com, google.com, google <br />
                  • e.g.) Keyword "google" filters URLs including "google" such as "www.google.com", "google.com"
                </div>
              )}
            />
          </div>
          {/* Add URL keyword */}
          <RadioButton
            id='do-add-ur-keyword'
            name='doAddUrlKeyword'
            label='Add URL/keyword'
            labelClassName='form-title'
            hasRightMargin={true}
            checked={doAddUrlKeyword}
            onChange={() => setDoAddUrlKeyword(true)}
          />
          <div
            className={mainStyle['custom-filtering-block']}
            style={{ display: doAddUrlKeyword ? 'block' : 'none' }}
          >
            <div id='modal-table' className='table-responsive' style={{ maxHeight: '380px' }}>
              <Table
                striped
                hover
                className='table-container'
                ref={tableRef}
              >
                <thead style={stickyStyle}>
                  <tr>
                    <th>#</th>
                    <th style={{ width: '90%' }}>URLs</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    form.url.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className='input'>
                          <div className='form-field form-field--horizontal'>
                            <div className={mainStyle['input-block']}>
                              <span>https://</span>
                              <Input
                                type='text'
                                value={item}
                                onChange={e => { }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className={'table-action-td'}>
                          <ButtonAction
                            title='DELETE'
                            iconClassName='icon-trash'
                            onClick={() => deleteUrl(index)}
                          />
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </div>
            <div className='mt-2'>
              <ButtonWithIcon
                label="Add"
                className="d-flex justify-content-center"
                iconClassName="icon-expand"
                onClick={() => addUrl()}
              />
            </div>
          </div>
          <div className='mt-2'></div>
          {/* Bulk import */}
          <RadioButton
            id='bulk-import'
            name='bulkImport'
            label='Bulk import'
            labelClassName='form-title'
            hasRightMargin={true}
            checked={!doAddUrlKeyword}
            onChange={() => setDoAddUrlKeyword(false)}
          />
          {
            !doAddUrlKeyword && (
              <>
                <div className={mainStyle['custom-filtering-block']}>
                  <div className={mainStyle['bulk-import-hint']}>
                    Upload a CSV-formatted file with information you wish to add to database.
                  </div>
                  <div className={mainStyle['bulk-import-hint']}>
                    Entries are limited to a maximum of 512 URLs.
                  </div>
                  <InputWithUploadButton
                    containerClassName='my-2'
                    value={''}
                    onChange={() => { }}
                  />
                  <div className="fst-italic">
                    <span>You can download sample template file</span>
                    <LinkerWithA
                      label="here"
                      href="#"
                      className="linker-blue text-decoration-none mx-1 fw-light"
                      onClick={() => { }}
                    />
                  </div>
                </div>
              </>
            )
          }
        </div>
        {/* Category based */}
        <div style={{
          display: selectedCustomFilteringType.title === 'Category based' || needSecondPage ? 'block' : 'none'
        }}>
          <div className='sub-title mt-4 mb-4'>Category based filtering</div>
          <div className={mainStyle['category-block']}>
            <div className={mainStyle['selector']}>
              <div>Unselected items</div>
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
                  selectedItem={leftCategoryDropdown.find(item => item.isActive)}
                  itemList={leftCategoryDropdown}
                  onClick={item => { }}
                />
                <div className={mainStyle['dropdown-block--left']}>
                  {
                    leftCategoryCheckbox.map((category, index) => {
                      return (
                        <div key={`left-category-${index}`} className={mainStyle['dropdown-parent-item']}>
                          <Checkbox
                            id={`left-category-${index}`}
                            label={category.title}
                            checked={category.checked}
                            onChange={() => { }}
                          />
                          {
                            category.list.map((item, childIndex) => {
                              return (
                                <div key={`left-category-${index}-${childIndex}`} className={mainStyle['dropdown-child-item']}>
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
              <div className='d-flex justify-content-end'>Total: 25 items</div>
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
              <div>Selected items</div>
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
                    rightCategoryCheckbox.map((category, index) => {
                      return (
                        <div key={`right-category-${index}`} className={mainStyle['dropdown-parent-item']}>
                          <Checkbox
                            id={`right-category-${index}`}
                            label={category.title}
                            checked={category.checked}
                            onChange={() => { }}
                          />
                          {
                            category.list.map((item, childIndex) => {
                              return (
                                <div key={`right-category-${index}-${childIndex}`} className={mainStyle['dropdown-child-item']}>
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
              <div className='d-flex justify-content-end'>Selected: 5 items</div>
            </div>
          </div>
        </div>
      </div >

      <div className='footer d-flex justify-content-between'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus(modalStatus.editConfig.self, false)}
        />
        {
          (selectedCustomFilteringType.title === 'URL + Category based' && !needSecondPage) && (
            <Button
              label='Next'
              className='btn-submit'
              onClick={() => setNeedSecondPage(true)}
            />
          )
        }
        {
          (selectedCustomFilteringType.title === 'URL + Category based' && needSecondPage) && (
            <div>
              <Button
                label='Previous'
                className='cancel-submit'
                style={{ marginRight: '10px' }}
                onClick={() => setNeedSecondPage(false)}
              />
              <Button
                label='Save'
                className='btn-submit'
                onClick={() => changeModalStatus(modalStatus.editConfig.self, false)}
              />
            </div>
          )
        }
        {
          selectedCustomFilteringType.title !== 'URL + Category based' && (
            <Button
              label='Save'
              className='btn-submit'
              onClick={() => changeModalStatus(modalStatus.editConfig.self, false)}
            />
          )
        }
      </div>
    </ModalContainer >
  );
};

export default EditModal;
