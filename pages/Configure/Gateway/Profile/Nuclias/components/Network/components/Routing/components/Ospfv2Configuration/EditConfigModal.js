import { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer, Input, RadioButton, TooltipDialog } from 'components/';

// Dummy data & util
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const EditConfigModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    authenticationTypeDefinition,
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

    const ospfv2Config = cloneDeep(selectedConfig.config);

    // Authentication type
    const authenticationTypeDropdown = [];
    authenticationTypeDefinition.forEach(authenticationType => {
      authenticationTypeDropdown.push({
        title: authenticationType.title,
        value: authenticationType.value,
        isActive: ospfv2Config.authenticationType === authenticationType.value
      });
    });

    ospfv2Config.authenticationType = authenticationTypeDropdown;

    setForm(ospfv2Config);
  }, [modalStatus.editConfig.status]);

  if (!form) {
    return;
  }

  const selectedAuthenticationType = form.authenticationType.find(authenticationType => authenticationType.isActive);

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editConfig.status}
      closeModal={() => changeModalStatus(modalStatus.editConfig.self, false)}
    >
      <div className='header'>
        <div className='title'>Edit OSPFV2</div>
      </div>
      <div className='body'>
        {/* Interface, NSSA */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title'>Interface</div>
            <div>{form.interface}</div>
          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>
              NSSA
              <TooltipDialog
                className='ms-1 me-1'
                title='Enable this option to allow OSPF Stub areas to carry External routes.'
              />
            </div>
            <div className='form-field--horizontal'>
              <RadioButton
                id='nssa-enable'
                name='nssaEnable'
                label='Enable'
                hasRightMargin={true}
                checked={form.nssa}
                onChange={() => changeValue('nssa', true)}
              />
              <RadioButton
                id='nssa-disable'
                name='nssaDisable'
                label='Disable'
                checked={!form.nssa}
                onChange={() => changeValue('nssa', false)}
              />
            </div>
          </Col>
        </Row>
        {/* Area, Priority */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>Area</div>
            <Input
              type='number'
              value={form.area}
              placeholder='0-200'
              onChange={e => changeValue('area', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title required'>Priority</div>
            <Input
              type='number'
              value={form.priority}
              placeholder='0-255'
              onChange={e => changeValue('priority', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>
        {/* Hello interval, Dead interval */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>Hello interval</div>
            <Input
              type='number'
              value={form.helloInterval}
              placeholder='1-65535'
              onChange={e => changeValue('helloInterval', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title required'>Dead interval</div>
            <Input
              type='number'
              value={form.deadInterval}
              placeholder='1-65535'
              onChange={e => changeValue('deadInterval', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>
        {/* Cost, Authentication type */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>Cost</div>
            <Input
              type='number'
              value={form.deadInterval}
              placeholder='1-65535'
              onChange={e => changeValue('deadInterval', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>Authentication type</div>
            <DropdownWithItem
              type='normal'
              selectedItem={selectedAuthenticationType}
              itemList={form.authenticationType}
              onClick={item => changeValue('authenticationType', item)}
            />
          </Col>
        </Row>
        {/* MD5 key ID, MD5 authentication key */}
        {
          selectedAuthenticationType.value === authenticationTypeDefinition[2].value && (
            <>
              <Row className='mt-2'>
                <Col sm={6}>
                  <div className='modal-form-title required'>MD5 key ID</div>
                  <Input
                    type='number'
                    value={form.md5KeyId}
                    placeholder='1-255'
                    onChange={e => changeValue('md5KeyId', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
                <Col sm={6}>
                  <div className='modal-form-title required'>MD5 authentication key</div>
                  <Input
                    type='text'
                    value={form.md5AuthenticationKey}
                    placeholder='1-16 characters'
                    onChange={e => changeValue('md5AuthenticationKey', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
              </Row>
            </>
          )
        }
        {/* Authentication key, LAN route exchange */}
        <Row className='mt-2'>
          {
            selectedAuthenticationType.value === authenticationTypeDefinition[1].value && (
              <>
                <Col sm={6}>
                  <div className='modal-form-title required'>Authentication key</div>
                  <Input
                    type='text'
                    value={form.authenticationKey}
                    placeholder='1-16 characters'
                    onChange={e => changeValue('authenticationKey', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </Col>
              </>
            )
          }
          <Col sm={6}>
            <div className='modal-form-title'>LAN route exchange</div>
            <div className='form-field--horizontal'>
              <RadioButton
                id='lan-route-exchange-enable'
                name='lanRouteExchangeEnable'
                label='Enable'
                hasRightMargin={true}
                checked={form.lanRouteExchange}
                onChange={() => changeValue('lanRouteExchange', true)}
              />
              <RadioButton
                id='lan-route-exchange-disable'
                name='lanRouteExchangeDisable'
                label='Disable'
                checked={!form.lanRouteExchange}
                onChange={() => changeValue('lanRouteExchange', false)}
              />
            </div>
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

export default EditConfigModal;
