import { useState, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem, Button, ModalContainer, Input, TooltipDialog } from 'components/';

// Dummy data & util
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const EditModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    protocolDefinition,
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

    const portTriggeringConfig = cloneDeep(selectedConfig.config);

    // Protocol
    const protocolDropdown = [];
    protocolDefinition.forEach(item => {
      protocolDropdown.push({
        title: item,
        value: item,
        isActive: item === selectedConfig.protocol
      });
    });

    portTriggeringConfig.protocol = protocolDropdown;

    setForm(portTriggeringConfig);
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
        <div className='title'>Edit port triggering</div>
      </div>
      <div className='body'>
        {/* Name, Protocol*/}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>
              Name
            </div>
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
            <div className='modal-form-title'>Protocol</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.protocol.find(item => item.isActive)}
              itemList={form.protocol}
              onClick={item => changeValue('protocol', item)}
            />
          </Col>
        </Row>
        {/* Outgoing trigger port, Incoming trigger port */}
        <Row className='mt-2'>
          <Col sm={6}>
            <div className='modal-form-title required'>
              Outgoing trigger port
              <TooltipDialog
                className='ms-1 me-1'
                title={ReactDOMServer.renderToString(
                  <div>
                    • A single port. <br />
                    • A port range.
                  </div>
                )}
              />
            </div>
            <Input
              type='text'
              value={form.outgoingTriggerPort}
              placeholder='1-65535'
              onChange={e => changeValue('outgoingTriggerPort', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title required'>
              Incoming trigger port
              <TooltipDialog
                className='ms-1 me-1'
                title={ReactDOMServer.renderToString(
                  <div>
                    • A single port. <br />
                    • A port range.
                  </div>
                )}
              />
            </div>
            <Input
              type='text'
              value={form.incomingTriggerPort}
              placeholder='1-65535'
              onChange={e => changeValue('incomingTriggerPort', e.target.value)}
              onFocus={() => { }}
              onBlur={() => { }}
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
