import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

// Component
import {
  Button, ModalContainer, MessageBoxGroup, ButtonWithIcon, ButtonAction,
  Input
} from 'components/';
import { cloneDeep } from 'lodash';

const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const AddVoiceVlanOuiModcal = props => {
  const { modalStatus, changeModalStatus } = props;

  // Status
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [list, setList] = useState([]);

  // Method
  const add = () => {
    const updatedList = cloneDeep(list);
    const newId = list[list.length - 1].id + 1;

    updatedList.push({
      id: newId,
      address: '',
      mask: '',
      description: ''
    });
    setList(updatedList);
  }

  // Side effect
  useEffect(() => {
    const updatedList = [
      {
        id: 1,
        address: '',
        mask: '',
        description: ''
      }
    ];

    setList(updatedList);
  }, []);

  if (list.length === 0) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-700px'
      openModal={modalStatus.addOui.status}
      closeModal={() => changeModalStatus(modalStatus.addOui.self, false)}
    >
      <div className='header'>
        <div className='title'>Add OUIs</div>
      </div>
      <div className='body'>
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />

        <Table
          striped
          hover
          className='table-container table-container--disable-sort'
        >
          <thead>
            <tr>
              <th width='10%'>#</th>
              <th width='25%'>OUI address</th>
              <th width='25%'>Mask</th>
              <th width='35%'>Description</th>
              <th width='5%' className={'table-action-th'}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <Input
                      type='text'
                      placeholder='00:00:00:00:00:00'
                      autoComplete='new-email'
                      value={item.address}
                      onChange={e => { }}
                      onFocus={() => { }}
                      onBlur={() => { }}
                    />
                  </td>
                  <td>
                    <Input
                      type='text'
                      placeholder='00:00:00:00:00:00'
                      autoComplete='new-email'
                      value={item.mask}
                      onChange={e => { }}
                      onFocus={() => { }}
                      onBlur={() => { }}
                    />
                  </td>
                  <td><Input
                    type='text'
                    autoComplete='new-email'
                    value={item.description}
                    onChange={e => { }}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  </td>
                  <td className={'table-action-td'}>
                    <ButtonAction
                      title='DELETE'
                      iconClassName='icon-trash'
                      onClick={() => {
                        console.log('click delete');
                        changeModalStatus('delete', true);
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <div className='mt-2'>
          <ButtonWithIcon
            label='Add'
            className='d-flex justify-content-center'
            iconClassName='icon-expand'
            onClick={add}
          />
        </div>
      </div>

      <div className='footer'>
        <Button
          label='Close'
          className='btn-cancel'
          onClick={() => {
            changeModalStatus(modalStatus.addOui.self, false);
          }}
        />
        <Button
          label='Add'
          className='btn-submit'
          onClick={() => {
            changeModalStatus(modalStatus.addOui.self, false);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default AddVoiceVlanOuiModcal;
