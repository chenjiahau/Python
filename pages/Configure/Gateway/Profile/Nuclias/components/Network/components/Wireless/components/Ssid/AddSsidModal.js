import { Row } from 'react-bootstrap';
import { useState } from 'react';
import { cloneDeep } from 'lodash';

// Components
import { MessageBoxGroup, Input, Button, Checkbox, ModalContainer } from 'components/';

// Default variable
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const AddSsidModal = props => {
  const {
    modalStatus,
    changeModalStatus
  } = props;

  // State
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.addSsid.status}
      closeModal={() => changeModalStatus(modalStatus.addSsid.self, false)}
    >
      <div className='header'>
        <div className='title'>Add SSID</div>
      </div>
      <div className='body'>
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
        <Row className='mb-2'>
          <div className='modal-form-title required short-block-margin'>SSID Name</div>
          <div className='modal-form-field'>
            <Input
              type='text'
              placeholder='1-32 characters'
              onChange={e => {
                console.log(e.target.value);
              }}
              onFocus={() => { }}
              onBlur={() => { }}
            />
          </div>
        </Row>
        <Row className='mb-2'>
          <div className='modal-form-title required short-block-margin'>Band selection</div>
          <div className='modal-form-field form-field--horizontal'>
            <Checkbox
              id='ck-24ghz'
              type='checkbox'
              label='2.4 GHz'
              checked={true}
              onChange={e => { }}
            />
            <Checkbox
              id='ck-24ghz'
              type='checkbox'
              label='5 GHz'
              checked={false}
              onChange={e => { }}
            />
          </div>
        </Row>
      </div>
      <div className='footer'>
        <Button
          label='Cancel'
          className='btn-cancel'
          onClick={() => changeModalStatus(modalStatus.addSsid.self, false)}
        />
        <Button
          label='Save'
          className='btn-submit'
          onClick={() => changeModalStatus(modalStatus.addSsid.self, false)}
        />
      </div>
    </ModalContainer>
  );
};

export default AddSsidModal;
