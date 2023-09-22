import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Table, Row, Col } from 'react-bootstrap';
import { cloneDeep, orderBy } from 'lodash';

import useStickyHeader from 'hooks/useStickyHeader';

// Component
import {
  DropdownWithItem, Button, ModalContainer, Input, TooltipDialog,
  RadioButton, ButtonAction, ButtonWithIcon, InputWithUploadButton, LinkerWithA
} from 'components/';

// Dummy data & util
import { getWebContentFilterConfig } from 'dummy/data/gateway/data/security/web-content-filter/web-content-filter-list';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const AddModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    isProfilePath,
    policyDefinition,
    nonManagedAction,
    policyScopeDefinition,
    networkDefinition,
    filteringTypeDefinition,
    iface,
    wcfCategory,
    schedule,
    customGroup
  } = props;

  // State
  const [needSecondPage, setNeedSecondPage] = useState(false);
  const [doAddUrlKeyword, setDoAddUrlKeyword] = useState(true);
  const [form, setForm] = useState(null);
  const { tableRef, stickyStyle, setInitModal } = useStickyHeader(false, 'modal-table');

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

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
    if (!modalStatus.addConfig.status) {
      return;
    }

    //  Policy
    const policyDropdown = policyDefinition.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0 ? true : false
      }
    });

    // Non-managed action
    const nonManagedActionDropdown = nonManagedAction.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0 ? true : false
      }
    });

    // Policy scope
    const policyScopeDropdown = policyScopeDefinition.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0 ? true : false
      }
    });

    // Network
    const networkDropdown = networkDefinition.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0 ? true : false
      }
    });

    // Filtering type
    const filteringTypeDropdown = filteringTypeDefinition.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0 ? true : false
      }
    });

    // Interface
    const ifaceDropdown = iface.map((item, index) => {
      return {
        title: item.interface,
        value: item.interface,
        isActive: index === 0 ? true : false
      }
    });

    let defaultCategoryDropdown = [];
    wcfCategory.forEach(parent => {
      parent.items.forEach(child => {
        defaultCategoryDropdown.push({
          title: child,
          value: child,
          isActive: false
        });
      });
    });
    defaultCategoryDropdown = orderBy(defaultCategoryDropdown, ['label'], ['asc']);
    defaultCategoryDropdown[0].isActive = true;

    // Schedule
    const scheduleDropdown = schedule.map((item, index) => {
      return {
        title: item.title,
        value: item.title,
        isActive: index === 0 ? true : false
      }
    });

    // Custom group
    const customGroupDropdown = customGroup.map((item, index) => {
      return {
        title: item.name,
        value: item.name,
        isActive: index === 0 ? true : false
      }
    });

    const webContentFilterConfig = getWebContentFilterConfig();
    webContentFilterConfig.policyRule = policyDropdown; // Using 'policyRule instead of 'policy' to avoid unknown error(?)
    webContentFilterConfig.nonManagedAction = nonManagedActionDropdown;
    webContentFilterConfig.policyScope = policyScopeDropdown;
    webContentFilterConfig.network = networkDropdown;
    webContentFilterConfig.filteringType = filteringTypeDropdown;
    webContentFilterConfig.interface = ifaceDropdown;
    webContentFilterConfig.defaultCategory = defaultCategoryDropdown;
    webContentFilterConfig.schedule = scheduleDropdown;
    webContentFilterConfig.customGroup = customGroupDropdown;
    webContentFilterConfig.url.push('');

    setForm(webContentFilterConfig);
    setInitModal(true);

    return () => {
      setNeedSecondPage(false);
      setDoAddUrlKeyword(true);
    }
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
        <div className='title'>Add web content filter configuration</div>
      </div>
      <div className='body'>
        {
          !needSecondPage && (
            <>
              {/* Name */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title required'>Name</div>
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

              <div className='sub-title mt-4 mb-4'>Policy rule setup</div>
              {/* Policy, Schedule */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title'>Policy</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={form.policyRule.find(item => item.isActive)}
                    itemList={form.policyRule}
                    onClick={item => changeValue('policyRule', item)}
                  />
                </Col>
                <Col sm={6}>
                  <div className='modal-form-title'>Schedule</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={form.schedule.find(item => item.isActive)}
                    itemList={form.schedule}
                    onClick={item => changeValue('schedule', item)}
                  />
                </Col>
              </Row >
              {
                form.policyRule.find(item => item.isActive).title !== 'Allow' && (
                  <>
                    {/* Non-managed action, Allow override */}
                    <Row className='mt-2'>
                      <Col sm={6}>
                        <div className='modal-form-title'>Non-managed action</div>
                        <DropdownWithItem
                          type='normal'
                          selectedItem={form.nonManagedAction.find(item => item.isActive)}
                          itemList={form.nonManagedAction}
                          onClick={item => changeValue('nonManagedAction', item)}
                        />
                      </Col>
                      <Col sm={6}>
                        <div className='modal-form-title'>
                          Allow override
                          <TooltipDialog
                            className='ms-1 me-1'
                            title={ReactDOMServer.renderToString(
                              <div>
                                • Allow the sites categorized under Blocked categories.
                              </div>
                            )}
                          />
                        </div>
                        <div className='form-field--horizontal'>
                          <RadioButton
                            id='allow-override-enable'
                            name='allowOverride'
                            label='Enable'
                            hasRightMargin={true}
                            checked={form.allowOverride}
                            onChange={() => changeValue('allowOverride', true)}
                          />
                          <RadioButton
                            id='allow-override-disable'
                            name='allowOverride'
                            label='Disable'
                            checked={!form.allowOverride}
                            onChange={() => changeValue('allowOverride', false)}
                          />
                        </div>
                      </Col>
                    </Row >
                    {/* Override timeout (seconds), Update on access */}
                    {
                      form.allowOverride && (
                        <>
                          <Row className='mt-2'>
                            <Col sm={6}>
                              <div className='modal-form-title'>
                                Override timeout (seconds)
                                <TooltipDialog
                                  className='ms-1 me-1'
                                  title={ReactDOMServer.renderToString(
                                    <div>
                                      • Seconds for which all disallowed categories will be allowed.
                                    </div>
                                  )}
                                />
                              </div>
                              <Input
                                type='number'
                                value={form.overrideTimeout}
                                placeholder='60-3600'
                                onChange={e => changeValue('overrideTimeout', e.target.value)}
                                onFocus={() => { }}
                                onBlur={() => { }}
                              />
                            </Col>
                            <Col sm={6}>
                              <div className='modal-form-title'>
                                Update on access
                                <TooltipDialog
                                  className='ms-1 me-1'
                                  title={ReactDOMServer.renderToString(
                                    <div>
                                      • Restart the override timer on each new access to disallowed categories.
                                    </div>
                                  )}
                                />
                              </div>
                              <div className='form-field--horizontal'>
                                <RadioButton
                                  id='update-on-access-enable'
                                  name='updateOnAccess'
                                  label='Enable'
                                  hasRightMargin={true}
                                  checked={form.updatedOnAccess}
                                  onChange={() => changeValue('updatedOnAccess', true)}
                                />
                                <RadioButton
                                  id='update-on-access-disable'
                                  name='updateOnAccess'
                                  label='Disable'
                                  checked={!form.updatedOnAccess}
                                  onChange={() => changeValue('updatedOnAccess', false)}
                                />
                              </div>
                            </Col>
                          </Row >
                        </>
                      )
                    }
                  </>
                )
              }

              <div className='sub-title mt-4 mb-4'>Policy scope setup</div>
              {
                isProfilePath ? (
                  <Row className='mt-2'>
                    <Col sm={6}>
                      <div className='modal-form-title'>Policy scope</div>
                      Global
                    </Col>
                  </Row>
                ) : (
                  <>
                    {/* Policy scope, Network */}
                    <Row className='mt-2'>
                      <Col sm={6}>
                        <div className='modal-form-title'>Policy scope</div>
                        <DropdownWithItem
                          type='normal'
                          selectedItem={form.policyScope.find(item => item.isActive)}
                          itemList={form.policyScope}
                          onClick={item => changeValue('policyScope', item)}
                        />
                      </Col>
                      {
                        form.policyScope.find(item => item.isActive).title !== 'Global' && (
                          <>
                            <Col sm={6}>
                              <div className='modal-form-title'>Network</div>
                              <DropdownWithItem
                                type='normal'
                                selectedItem={form.network.find(item => item.isActive)}
                                itemList={form.network}
                                onClick={item => changeValue('network', item)}
                              />
                            </Col>
                          </>
                        )
                      }
                    </Row >
                    {
                      form.policyScope.find(item => item.isActive).title !== 'Global' && (
                        <>
                          {/* IP address */}
                          {
                            form.network.find(item => item.isActive).title === 'Single' && (
                              <>
                                <Row className='mt-2'>
                                  <Col sm={6}>
                                    <div className='modal-form-title required'>IP address</div>
                                    <Input
                                      type='text'
                                      value={form.ipAddress}
                                      placeholder='e.g. 192.168.100.101'
                                      onChange={e => changeValue('ipAddress', e.target.value)}
                                      onFocus={() => { }}
                                      onBlur={() => { }}
                                    />
                                  </Col>
                                </Row >
                              </>
                            )
                          }
                          {/* Starting IP address, Ending IP address */}
                          {
                            form.network.find(item => item.isActive).title === 'Range' && (
                              <>
                                <Row className='mt-2'>
                                  <Col sm={6}>
                                    <div className='modal-form-title required'>Starting IP address</div>
                                    <Input
                                      type='text'
                                      value={form.startingIpAddress}
                                      placeholder='e.g. 192.168.100.101'
                                      onChange={e => changeValue('startingIpAddress', e.target.value)}
                                      onFocus={() => { }}
                                      onBlur={() => { }}
                                    />
                                  </Col>
                                  <Col sm={6}>
                                    <div className='modal-form-title required'>Ending IP address</div>
                                    <Input
                                      type='text'
                                      value={form.endingIpAddress}
                                      placeholder='e.g. 192.168.100.200'
                                      onChange={e => changeValue('endingIpAddress', e.target.value)}
                                      onFocus={() => { }}
                                      onBlur={() => { }}
                                    />
                                  </Col>
                                </Row >
                              </>
                            )
                          }
                          {/* Interface */}
                          {
                            form.network.find(item => item.isActive).title === 'Interface' && (
                              <>
                                <Row className='mt-2'>
                                  <Col sm={6}>
                                    <div className='modal-form-title'>Interface</div>
                                    <DropdownWithItem
                                      type='normal'
                                      selectedItem={form.interface.find(item => item.isActive)}
                                      itemList={form.interface}
                                      onClick={item => changeValue('network', item)}
                                    />
                                  </Col>
                                </Row >
                              </>
                            )
                          }
                        </>
                      )
                    }
                  </>
                )
              }

              <div className='sub-title mt-4 mb-4'>Content filtering</div>
              {/* Filtering type, Default category */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title'>Filtering type</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={form.filteringType.find(item => item.isActive)}
                    itemList={form.filteringType}
                    onClick={item => changeValue('filteringType', item)}
                  />
                </Col>
                {
                  ['Default category', 'Default category + URL'].indexOf(form.filteringType.find(item => item.isActive).title) !== -1 && (
                    <>
                      <Col sm={6}>
                        <div className='modal-form-title'>Default category</div>
                        <DropdownWithItem
                          type='normal'
                          selectedItem={form.defaultCategory.find(item => item.isActive)}
                          itemList={form.defaultCategory}
                          onClick={item => changeValue('defaultCategory', item)}
                        />
                      </Col>
                    </>
                  )
                }
              </Row >
              {/* Custom group */}
              {
                form.filteringType.find(item => item.isActive).title === 'Custom group' && (
                  <>
                    <Row className='mt-2'>
                      <Col sm={6}>
                        <div className='modal-form-title'>CustomGroup</div>
                        <DropdownWithItem
                          type='normal'
                          selectedItem={form.customGroup.find(item => item.isActive)}
                          itemList={form.customGroup}
                          onClick={item => changeValue('customGroup', item)}
                        />
                      </Col>
                    </Row >
                  </>
                )
              }
            </>
          )
        }

        {/* URL */}
        <div style={{
          display: form.filteringType.find(item => item.isActive).title === 'URL' && needSecondPage ? 'block' : 'none'
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
      </div >

      <div className='footer d-flex justify-content-between'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus(modalStatus.addConfig.self, false)}
        />
        {
          (form.filteringType.find(item => item.isActive).title === 'URL' && !needSecondPage) && (
            <Button
              label='Next'
              className='btn-submit'
              onClick={() => setNeedSecondPage(true)}
            />
          )
        }
        {
          (form.filteringType.find(item => item.isActive).title === 'URL' && needSecondPage) && (
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
                onClick={() => changeModalStatus(modalStatus.addConfig.self, false)}
              />
            </div>
          )
        }
        {
          form.filteringType.find(item => item.isActive).title !== 'URL' && (
            <Button
              label='Save'
              className='btn-submit'
              onClick={() => changeModalStatus(modalStatus.addConfig.self, false)}
            />
          )
        }
      </div>
    </ModalContainer >
  );
};

export default AddModal;
