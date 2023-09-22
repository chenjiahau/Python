import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep, set } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer, Input, TooltipDialog } from 'components/';

// Dummy data & util
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const EditModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    policyTypeDefinition,
    managementTypeDefinition,
    priorityDefinition,
    serviceDefinition,
    trafficSelectorMatchTypeDefinition,
    wanList,
    vlanList,
    schedulePolicyList,
    selectedConfig
  } = props;

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  const changePolicyType = item => {
    const updatedForm = cloneDeep(form);
    updatedForm.policyType.forEach(policyType => {
      policyType.isActive = policyType.value === item.value;
    });

    updatedForm.wanInterface.forEach(wanInterface => {
      wanInterface.isActive = false;
    });
    updatedForm.wanInterface[0].isActive = true;

    updatedForm.vlanInterface.forEach(vlanInterface => {
      vlanInterface.isActive = false;
    });
    updatedForm.vlanInterface[0].isActive = true;

    setForm(updatedForm);
  }

  // Side effect
  useEffect(() => {
    if (!modalStatus.editConfig.status) {
      return;
    }

    const trafficShapingConfig = cloneDeep(selectedConfig.config);
    // Policy type
    const policyTypeDropdown = policyTypeDefinition.map(item => {
      return {
        title: item.title,
        value: item.value,
        isActive: trafficShapingConfig.policyType === item.value
      }
    });
    trafficShapingConfig.policyType = policyTypeDropdown;

    // Management type
    const managementTypeDropdown = managementTypeDefinition.map(item => {
      return {
        title: item.title,
        value: item.value,
        isActive: trafficShapingConfig.managementType === item.value
      }
    });
    trafficShapingConfig.managementType = managementTypeDropdown;

    // Priority
    const priorityDropdown = priorityDefinition.map(item => {
      return {
        title: item.title,
        value: item.value,
        isActive: trafficShapingConfig.priority === item.value
      }
    });
    trafficShapingConfig.priority = priorityDropdown;

    // Service
    const serviceDropdown = serviceDefinition.map(item => {
      return {
        title: item.title,
        value: item.value,
        isActive: trafficShapingConfig.service === item.value
      }
    });
    trafficShapingConfig.service = serviceDropdown

    // Traffic selector match type
    const trafficSelectorMatchTypeDropdown = trafficSelectorMatchTypeDefinition.map(item => {
      return {
        title: item.title,
        value: item.value,
        isActive: trafficShapingConfig.trafficSelectorMatchType === item.value
      }
    });
    trafficShapingConfig.trafficSelectorMatchType = trafficSelectorMatchTypeDropdown;

    // WAN
    const wanDropdown = [];
    for (const item of wanList) {
      if (!item.v4) {
        return;
      }

      wanDropdown.push({
        title: item.interface,
        value: item.interface,
        isActive: trafficShapingConfig.wanInterface === item.interface
      });
    }
    trafficShapingConfig.wanInterface = wanDropdown;

    // VLAN
    const vlanDropdown = vlanList.map(item => {
      return {
        title: item.interface,
        value: item.interface,
        isActive: trafficShapingConfig.vlanInterface === item.interface
      }
    });
    trafficShapingConfig.vlanInterface = vlanDropdown;

    // Schedule policy
    const schedulePolicyDropdown = schedulePolicyList.map(item => {
      return {
        title: item.title,
        value: item.title,
        isActive: false
      }
    });
    schedulePolicyDropdown[0].isActive = true;
    trafficShapingConfig.schedulePolicy = schedulePolicyDropdown;

    setForm(trafficShapingConfig);
  }, [modalStatus.editConfig.status]);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editConfig.status}
      closeModal={() => changeModalStatus(modalStatus.editConfig.self, false)}
    >
      <div className='header'>
        <div className='title'>Edit traffic shaping</div>
      </div>
      <div className='body'>
        {/* Name, Policy type */}
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
            <div className='modal-form-title'>Policy type</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.policyType.find(item => item.isActive)}
              itemList={form.policyType}
              onClick={item => changePolicyType(item)}
            />
          </Col>
        </Row>
        {/* WAN Interface/Interface, Management type */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>
              {form.policyType[0].isActive ? 'WAN Interface' : 'Interface'}
            </div>
            {
              form.policyType[0].isActive ? (
                <>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={form.wanInterface.find(item => item.isActive)}
                    itemList={form.wanInterface}
                    onClick={item => changeValue('wanInterface', item)}
                  />
                </>
              ) : (
                <>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={form.vlanInterface.find(item => item.isActive)}
                    itemList={form.vlanInterface}
                    onClick={item => changeValue('vlanInterface', item)}
                  />
                </>
              )}

          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>Management type</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.managementType.find(item => item.isActive)}
              itemList={form.managementType}
              onClick={item => changeValue('managementType', item)}
            />
          </Col>
        </Row>
        {/* Priority */}
        {
          form.managementType[0].isActive ? (
            <>
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title'>
                    Priority
                    <TooltipDialog
                      className='ms-1 me-1'
                      title='Possible priority values are Low(25-75 Mbps), Medium(75-150Mbps), High(150-250 Mbps).'
                    />
                  </div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={form.priority.find(item => item.isActive)}
                    itemList={form.priority}
                    onClick={item => changeValue('priority', item)}
                  />
                </Col>
              </Row>
            </>
          ) : (
            <>
              {/* Max. bandwidth rate (Kbps), Min. bandwidth rate (Kbps) */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title required'>Max. bandwidth rate (Kbps)</div>
                  <Input
                    type='number'
                    value={form.maxBandwidth}
                    placeholder='100-100000'
                    onChange={e => changeValue('maxBandwidth', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
                <Col sm={6}>
                  <div className='modal-form-title required'>Min. bandwidth rate (Kbps)</div>
                  <Input
                    type='number'
                    value={form.minBandwidth}
                    placeholder='1-100000'
                    onChange={e => changeValue('maxBandwidth', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
              </Row>
            </>
          )
        }

        <div className='sub-title mt-4 mb-4'>Traffic selector</div>
        {/* Service */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>Service</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.service.find(item => item.isActive)}
              itemList={form.service}
              onClick={item => changeValue('service', item)}
            />
          </Col>
        </Row>
        {
          form.policyType[0].isActive ? (
            <>
              {/* Traffic selector match type, IP address/MAC address/Interface */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title'>Traffic selector match type</div>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={form.trafficSelectorMatchType.find(item => item.isActive)}
                    itemList={form.trafficSelectorMatchType}
                    onClick={item => changeValue('trafficSelectorMatchType', item)}
                  />
                </Col>
                <Col sm={6}>
                  <div className={`modal-form-title ${form.trafficSelectorMatchType[2].isActive ? '' : 'required'}`}>
                    {form.trafficSelectorMatchType[0].isActive && 'IP address'}
                    {form.trafficSelectorMatchType[1].isActive && 'MAC address'}
                    {form.trafficSelectorMatchType[2].isActive && 'Interface'}
                  </div>
                  {
                    form.trafficSelectorMatchType[0].isActive && (
                      <>
                        <Input
                          type='text'
                          value={form.ipAddress}
                          placeholder='e.g. 192.168.200.101'
                          onChange={e => changeValue('ipAddress', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </>
                    )
                  }
                  {
                    form.trafficSelectorMatchType[1].isActive && (
                      <>
                        <Input
                          type='text'
                          value={form.macAddress}
                          placeholder='e.g. 00:00:00:AB:CD:12'
                          onChange={e => changeValue('macAddress', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </>
                    )
                  }
                  {
                    form.trafficSelectorMatchType[2].isActive && (
                      <>
                        <DropdownWithItem
                          type='normal'
                          selectedItem={form.vlanInterface.find(item => item.isActive)}
                          itemList={form.vlanInterface}
                          onClick={item => changeValue('vlanInterface', item)}
                        />
                      </>
                    )
                  }
                </Col>
              </Row>
              {/* Subnet mask */}
              {
                form.trafficSelectorMatchType[0].isActive && (
                  <>
                    <Row className='mt-2'>
                      <Col sm={6}>
                        <div className='modal-form-title required'>Subnet mask</div>
                        <Input
                          type='text'
                          value={form.subnetMask}
                          placeholder='e.g. 255.255.255.0'
                          onChange={e => changeValue('subnetMask', e.target.value)}
                          onFocus={() => { }}
                          onBlur={() => { }}
                        />
                      </Col>
                    </Row>
                  </>
                )
              }
            </>
          ) : (
            <>
              {/* IP address, Subnet mask */}
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title required'>IP address</div>
                  <Input
                    type='text'
                    value={form.ipAddress}
                    placeholder='e.g. 192.168.200.101'
                    onChange={e => changeValue('ipAddress', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
                <Col sm={6}>
                  <div className='modal-form-title required'>Subnet mask</div>
                  <Input
                    type='text'
                    value={form.subnetMask}
                    placeholder='e.g. 255.255.255.0'
                    onChange={e => changeValue('subnetMask', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
              </Row>
            </>
          )
        }
        {/* Schedule policy */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>Schedule policy</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.schedulePolicy.find(item => item.isActive)}
              itemList={form.schedulePolicy}
              onClick={item => changeValue('schedulePolicy', item)}
            />
          </Col>
        </Row>
      </div>

      <div className='footer'>
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
