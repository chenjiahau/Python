import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer, Input } from 'components/';

// Dummy data & util
import { getIpv6SessionLimitingConfig } from 'dummy/data/gateway/data/network/traffic-management/ipv6-session-limiting';
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const AddModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    sourceTypeDefinition,
    vlanList,
    schedulePolicyList
  } = props;

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  // Side effect
  useEffect(() => {
    if (!modalStatus.addConfig.status) {
      return;
    }

    const sessionLimitingConfig = getIpv6SessionLimitingConfig();

    // Source type
    const sourceTypeDropdown = sourceTypeDefinition.map(item => {
      return {
        title: item.title,
        value: item.title,
        isActive: false
      }
    });
    sourceTypeDropdown[0].isActive = true;
    sessionLimitingConfig.sourceType = sourceTypeDropdown;

    // WAN
    const vlanDropdown = [];
    for (const item of vlanList) {
      vlanDropdown.push({
        title: item.interface,
        value: item.interface,
        isActive: false
      });
    }
    vlanDropdown[0].isActive = true;
    sessionLimitingConfig.interface = vlanDropdown;

    // Schedule policy
    const schedulePolicyDropdown = schedulePolicyList.map(item => {
      return {
        title: item.title,
        value: item.title,
        isActive: false
      }
    });
    schedulePolicyDropdown[0].isActive = true;
    sessionLimitingConfig.schedulePolicy = schedulePolicyDropdown;

    setForm(sessionLimitingConfig);
  }, [modalStatus.addConfig.status]);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addConfig.status}
      closeModal={() => changeModalStatus(modalStatus.addConfig.self, false)}
    >
      <div className='header'>
        <div className='title'>Add session limiting</div>
      </div>
      <div className='body'>
        {/* Name, Source type */}
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
            <div className='modal-form-title'>Source type</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.sourceType.find(item => item.isActive)}
              itemList={form.sourceType}
              onClick={item => changeValue('sourceType', item)}
            />
          </Col>
        </Row>
        {/* IP address/Interface */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className={`modal-form-title ${form.sourceType[1].isActive ? '' : 'required'}`}>
              {form.sourceType[0].isActive && 'IP address'}
              {form.sourceType[1].isActive && 'Interface'}
            </div>
            {
              form.sourceType[0].isActive && (
                <>
                  <Input
                    type='text'
                    value={form.ipAddress}
                    placeholder='e.g. 2001:db8:abcd::1'
                    onChange={e => changeValue('ipAddress', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </>
              )
            }
            {
              form.sourceType[1].isActive && (
                <>
                  <DropdownWithItem
                    type='normal'
                    selectedItem={form.interface.find(item => item.isActive)}
                    itemList={form.interface}
                    onClick={item => changeValue('interface', item)}
                  />
                </>
              )
            }
          </Col>
        </Row>
        {/* Maximum sessions */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>Maximum sessions</div>
            <Input
              type='number'
              value={form.maximumSessions}
              placeholder='1-999'
              onChange={e => changeValue('maximumSessions', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>
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
