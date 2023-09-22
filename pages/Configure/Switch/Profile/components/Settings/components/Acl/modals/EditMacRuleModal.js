import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// Component
import {
  Button, ModalContainer, MessageBoxGroup, DropdownWithItem, Input,
  Checkbox
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

const EditMacRuleModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    selectedMacRule,
    setSelectedMacRule
  } = props;

  // Status
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [form, setForm] = useState(null);

  // Method

  // Side effect
  useEffect(() => {
    if (!selectedMacRule) {
      return;
    }

    const policyDropdown = cloneDeep(defaultPolicyDropdown);

    policyDropdown.forEach(item => {
      item.isActive = false;
      if (item.title === selectedMacRule.policy) {
        item.isActive = true;
      }
    });

    const updatedForm = {
      no: selectedMacRule.no,
      autoAssignNo: selectedMacRule.no ? true : false,
      policy: cloneDeep(defaultPolicyDropdown),
      ethernetType: selectedMacRule.ethernetType,
      sourceMac: selectedMacRule.sourceMac,
      destinationMac: selectedMacRule.destinationMac,
      cos: selectedMacRule.cos,
      vlan: selectedMacRule.vlan,
      comment: selectedMacRule.comment,
    };

    setForm(updatedForm);
  }, [selectedMacRule]);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editMacRule.status}
      closeModal={() => {
        setSelectedMacRule(null);
        changeModalStatus(modalStatus.editMacRule.self, false)
      }}
    >
      <div className='header'>
        <div className='title'>Edit a MAC ACL</div>
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
            <div className='modal-form-title required'>Ethernet type</div>
            <Input
              type='text'
              value={form.ethernetType}
              placeholder='e.g. 0x0 - 0xffff or Any'
              onChange={e => { }}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col sm={6}>
            <div className='modal-form-title required'>Source MAC</div>
            <Input
              type='text'
              value={form.sourceMac}
              placeholder='e.g. 02:00:4C:11:22:33 or Any'
              onChange={e => { }}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
          <Col sm={6}>
            <div className='modal-form-title required'>Destination MAC</div>
            <Input
              type='text'
              value={form.destinationMac}
              placeholder='e.g. 02:00:4C:11:22:33 or Any'
              onChange={e => { }}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
        </Row>

        <Row className='mb-3'>
          <Col sm={6}>
            <div className='modal-form-title required'>Cos</div>
            <Input
              type='text'
              value={form.cos}
              placeholder='e.g. 0-7 or Any'
              onChange={e => { }}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </Col>
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
        </Row>

        <Row className='mb-3'>
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
          <Col sm={6}>
          </Col>
        </Row>
      </div>

      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => {
            setSelectedMacRule(null);
            changeModalStatus(modalStatus.editMacRule.self, false);
          }}
        />
        <Button
          label='Update'
          className='btn-submit'
          onClick={() => {
            setSelectedMacRule(null);
            changeModalStatus(modalStatus.editMacRule.self, false);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default EditMacRuleModal;
