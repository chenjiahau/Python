import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep, orderBy } from 'lodash';

// Component
import {
  DropdownWithItem, Button, ModalContainer, Input, TooltipDialog
} from 'components/';

// Dummy data & util
import { getApplicationControlConfig } from 'dummy/data/gateway/data/security/application-control/application-control-list';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const AddModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    isProfilePath,
    policyDefinition,
    policyScopeDefinition,
    networkDefinition,
    applicationTypeDefinition,
    interfaceList,
    scheduleList,
    appPackageList,
    packageList,
    customGroupList,
  } = props;

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  const changeAppPackage = item => {
    const updatedForm = cloneDeep(form);
    updatedForm.appPackage = updatedForm.appPackage.map(appPackage => {
      if (appPackage.value === item.value) {
        appPackage.isActive = true;
      } else {
        appPackage.isActive = false;
      }
      return appPackage;
    }
    );

    let applicationDropdown = appPackageList.find(appPackage => appPackage.title === item.title).app.map(app => {
      return {
        title: app,
        value: app,
        isActive: false
      }
    });
    applicationDropdown = orderBy(applicationDropdown, ['title'], ['asc']);
    applicationDropdown[0].isActive = true;
    updatedForm.application = applicationDropdown;

    setForm(updatedForm);
  }

  // Side effect
  useEffect(() => {
    if (!modalStatus.addConfig.status) {
      return;
    }

    // Policy
    const policyRuleDropdown = policyDefinition.map((item, index) => {
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

    // Application type
    const applicationTypeDropdown = applicationTypeDefinition.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0 ? true : false
      }
    });

    // Interface
    const interfaceDropdown = interfaceList.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0 ? true : false
      }
    });

    // Schedule
    const scheduleDropdown = scheduleList.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0 ? true : false
      }
    });

    // Package
    const packageDropdown = packageList.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0 ? true : false
      }
    });

    // App package
    let appPackageDropdown = appPackageList.map((item, index) => {
      return {
        title: item.title,
        value: item.title,
        isActive: false,
      }
    });
    appPackageDropdown = orderBy(appPackageDropdown, ['title'], ['asc']);
    appPackageDropdown[0].isActive = true;

    // Application
    let appDropdown = [];
    appPackageList.forEach(appPackage => {
      if (appPackage.title === appPackageDropdown[0].title) {
        appPackage.app.forEach(app => {
          appDropdown.push({
            title: app,
            value: app,
            isActive: false,
          })
        });
      }
    });
    appDropdown = orderBy(appDropdown, ['title'], ['asc']);
    appDropdown[0].isActive = true;

    // Custom group
    const customGroupDropdown = customGroupList.map((item, index) => {
      return {
        title: item,
        value: item,
        isActive: index === 0 ? true : false
      }
    });

    const applicationControlConfig = getApplicationControlConfig();
    applicationControlConfig.policyRule = policyRuleDropdown;
    applicationControlConfig.policyScope = policyScopeDropdown;
    applicationControlConfig.network = networkDropdown;
    applicationControlConfig.applicationType = applicationTypeDropdown;
    applicationControlConfig.interface = interfaceDropdown;
    applicationControlConfig.schedule = scheduleDropdown;
    applicationControlConfig.package = packageDropdown;
    applicationControlConfig.appPackage = appPackageDropdown;
    applicationControlConfig.application = appDropdown;
    applicationControlConfig.customGroup = customGroupDropdown;

    setForm(applicationControlConfig);
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
        <div className='title'>Add application control policy configuration</div>
      </div>
      <div className='body'>
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>Policy name</div>
            <Input
              type='text'
              value={form.policyName}
              placeholder='1-64 characters'
              onChange={e => changeValue('policyRule', e.target.value)}
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

        {/* Policy scope setup */}
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
                  <div className='modal-form-title'>
                    Policy scope
                    <TooltipDialog
                      className='ms-1 me-1'
                      title={ReactDOMServer.renderToString(
                        <div>
                          • Global policy will affect for all types of traffic matching to selected application(s).
                        </div>
                      )}
                    />
                  </div>
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
                      form.network.find(item => item.isActive).title === 'IP range' && (
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

        {/* Application control */}
        <div className='sub-title mt-4 mb-4'>Application control</div>
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>Application type</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.applicationType.find(item => item.isActive)}
              itemList={form.applicationType}
              onClick={item => changeValue('applicationType', item)}
            />
          </Col>
          {
            form.applicationType.find(item => item.isActive).title === 'Default group' && (
              <>
                <Col sm={6}>
                  <div className='modal-form-title'>Default group</div>
                  <DropdownWithItem
                    type='normal'
                    dropDownMenuStyle={{ maxHeight: '206px', overflowY: 'auto' }}
                    selectedItem={form.package.find(item => item.isActive)}
                    itemList={form.package}
                    onClick={item => changeValue('package', item)}
                  />
                </Col>
              </>
            )
          }
        </Row >
        {
          form.applicationType.find(item => item.isActive).title === 'Single application' && (
            <>
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title'>Category</div>
                  <DropdownWithItem
                    type='normal'
                    dropDownMenuStyle={{ maxHeight: '206px', overflowY: 'auto' }}
                    selectedItem={form.appPackage.find(item => item.isActive)}
                    itemList={form.appPackage}
                    onClick={item => changeAppPackage(item)}
                  />
                </Col>
                <Col sm={6}>
                  <div className='modal-form-title'>Application</div>
                  <DropdownWithItem
                    type='normal'
                    dropDownMenuStyle={{ maxHeight: '206px', overflowY: 'auto' }}
                    selectedItem={form.application.find(item => item.isActive)}
                    itemList={form.application}
                    onClick={item => changeValue('application', item)}
                  />
                </Col>
              </Row >
            </>
          )
        }
        {
          form.applicationType.find(item => item.isActive).title === 'Custom group' && (
            <>
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title'>Custom group</div>
                  <DropdownWithItem
                    type='normal'
                    dropDownMenuStyle={{ maxHeight: '206px', overflowY: 'auto' }}
                    selectedItem={form.customGroup.find(item => item.isActive)}
                    itemList={form.customGroup}
                    onClick={item => changeValue('customGroup', item)}
                  />
                </Col>
              </Row >
            </>
          )
        }
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
