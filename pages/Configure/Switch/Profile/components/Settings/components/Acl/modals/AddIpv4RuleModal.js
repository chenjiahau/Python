import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// Component
import {
  Button, ModalContainer, MessageBoxGroup, DropdownWithItem, Checkbox,
  Input
} from 'components/';
import { cloneDeep } from 'lodash';

// Dummy data & util
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultPolicyDropdown = [
  { title: 'Permit', isActive: true },
  { title: 'Deny', isActive: false },
];

const defaultProtocolDropdown = [
  { title: 'All', isAll: true, isActive: true },
  { title: 'Any', isActive: false },
  { title: 'TCP', isActive: false },
  { title: 'UDP', isActive: false },
];

const AddIpv4RuleModal = props => {
  const {
    modalStatus,
    changeModalStatus
  } = props;

  // Status
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [form, setForm] = useState(null);

  // Method

  // Side effect
  useEffect(() => {
    const updatedForm = {
      no: 20,
      autoAssignNo: true,
      policy: cloneDeep(defaultPolicyDropdown),
      protocol: cloneDeep(defaultProtocolDropdown),
      sourceIp: 'Any',
      sourcePort: 'Any',
      destinationIp: 'Any',
      destinationPort: 'Any',
      vlan: 'Any',
      comment: '',
    };

    setForm(updatedForm);
  }, []);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addIpv4Rule.status}
      closeModal={() => changeModalStatus(modalStatus.addIpv4Rule.self, false)}
    >
      <div className='header'>
        <div className='title'>Add an IPv4 ACL</div>
      </div>
      <div className='body'>
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />

        <Row className='mb-3'>
          <Col>
            <div className='modal-form-title required'>Sequence No.</div>
            <Input
              type='number'
              value={form.no}
              placeholder='1-65535'
              minLength={1}
              maxLength={64}
              disabled={form.autoAssignNo}
              onChange={e => { }}
              onFocus={() => { }}
              onBlur={() => { }}
            />
            <div className='mb-1'></div>
            <Checkbox
              label='Auto assign'
              checked={form.autoAssignNo}
              onChange={() => { }}
            />
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col sm={6}>
            <div className='modal-form-title'>Policy</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.policy.find(item => item.isActive)}
              itemList={form.policy}
              onClick={() => { }}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>Protocol</div>
            <DropdownWithItem
              type='normal'
              selectedItem={form.protocol.find(item => item.isActive)}
              itemList={form.protocol}
              onClick={() => { }}
            />
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col sm={6}>
            <div className='modal-form-title required'>Source IP</div>
            <Input
              type='text'
              value={form.sourceIp}
              placeholder='e.g 10.90.90.90/8 or Any'
              onChange={e => { }}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title required'>Destination IP</div>
            <Input
              type='text'
              value={form.destinationIp}
              placeholder='e.g 10.90.90.90/8 or Any'
              onChange={e => { }}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col sm={6}>
            <div className='modal-form-title required'>Source Port</div>
            <Input
              type='text'
              value={form.sourceIp}
              placeholder='e.g. 1-65535 or Any'
              onChange={e => { }}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title required'>Destination Port</div>
            <Input
              type='text'
              value={form.destinationIp}
              placeholder='e.g. 1-65535 or Any'
              onChange={e => { }}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col sm={6}>
            <div className='modal-form-title required'>VLAN</div>
            <Input
              type='text'
              value={form.vlan}
              placeholder='e.g. 1-4094 or Any'
              onChange={e => { }}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title'>Comment</div>
            <Input
              type='text'
              value={form.comment}
              placeholder='1-64 characters'
              onChange={e => { }}
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
          onClick={() => {
            changeModalStatus(modalStatus.addIpv4Rule.self, false);
          }}
        />
        <Button
          label='Add'
          className='btn-submit'
          onClick={() => {
            changeModalStatus(modalStatus.addIpv4Rule.self, false);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default AddIpv4RuleModal;
