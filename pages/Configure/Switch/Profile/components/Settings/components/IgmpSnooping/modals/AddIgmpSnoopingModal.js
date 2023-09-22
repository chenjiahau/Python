import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

// Component
import {
  Button, ModalContainer, MessageBoxGroup, DropdownWithItem, ButtonWithIcon,
  ButtonAction
} from 'components/';
import { cloneDeep } from 'lodash';

// Dummy data & util
import { generateDevice } from 'dummy/data/device';

const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultIgmpSnoopingStateDropdown = [
  { title: 'Enable', isActive: false },
  { title: 'Disable', isActive: false },
];

const AddIgmpSnoopingModal = props => {
  const { modalStatus, changeModalStatus } = props;

  // Fake API data
  const fakeDeviceList = [
    {
      id: 1,
      isActive: false, title: 'DBS-2000-10MP', iconClass: 'icon-round online',
      ...generateDevice('SWITCH', 'DBS-2000', null, 'Online', null, false, { sw: { portGroup: 10, supportPoe: true } })
    },
    {
      id: 2,
      isActive: false, title: 'DBS-2000-10MP', iconClass: 'icon-round online',
      ...generateDevice('SWITCH', 'DBS-2000', null, 'Online', null, false, { sw: { portGroup: 10, supportPoe: true } })
    },
    {
      id: 2,
      isActive: false, title: 'DBS-2000-52', iconClass: 'icon-round online',
      ...generateDevice('SWITCH', 'DBS-2000', null, 'Online', null, false, { sw: { portGroup: 10, supportPoe: true } })
    }
  ];

  // Status
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [deviceList, setDeviceList] = useState([]);
  const [list, setList] = useState([]);

  // Method
  const add = () => {
    const updatedList = cloneDeep(list);
    const newId = list[list.length - 1].id + 1;

    updatedList.push({
      id: newId,
      switch: {
        selected: null,
        list: cloneDeep(deviceList)
      },
      state: {
        selected: null,
        list: cloneDeep(defaultIgmpSnoopingStateDropdown)
      }
    });
    setList(updatedList);
  }

  // Side effect
  useEffect(() => {
    const updatedDeviceList = [
      ...fakeDeviceList.map(item => ({
        id: item.id,
        title: item.name,
        isActive: false
      }))];
    setDeviceList(updatedDeviceList);

    const updatedList = [
      {
        id: 1,
        switch: {
          selected: null,
          list: []
        },
        state: {
          selected: null,
          list: []
        }
      }
    ];

    const copiedDevice = cloneDeep(updatedDeviceList);
    const copiedStateDropdown = cloneDeep(defaultIgmpSnoopingStateDropdown);
    copiedDevice[0].isActive = true;
    copiedStateDropdown[0].isActive = true;

    updatedList[0].switch.selected = null;
    updatedList[0].switch.list = cloneDeep(copiedDevice);
    updatedList[0].state.selected = null;
    updatedList[0].state.list = copiedStateDropdown;

    setList(updatedList);
  }, []);

  if (list.length === 0 || deviceList.length === 0) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-700px'
      openModal={modalStatus.addIgmpSnooping.status}
      closeModal={() => changeModalStatus(modalStatus.addIgmpSnooping.self, false)}
    >
      <div className='header'>
        <div className='title'>Add IGMP snooping settings for switches</div>
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
          style={{ overflowY: 'auto' }}
        >
          <thead>
            <tr>
              <th width='10%'>#</th>
              <th width='50%'>Switch</th>
              <th width='35%'>IGMP snooping</th>
              <th width='5%' className={'table-action-th'}>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <DropdownWithItem
                      type='normal'
                      selectedItem={item.switch.selected}
                      itemList={item.switch.list}
                      onClick={item => { }}
                    />
                  </td>
                  <td>
                    <DropdownWithItem
                      type='normal'
                      selectedItem={item.state.selected}
                      itemList={item.state.list}
                      onClick={item => { }}
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
            changeModalStatus(modalStatus.addIgmpSnooping.self, false);
          }}
        />
        <Button
          label='Add'
          className='btn-submit'
          onClick={() => {
            changeModalStatus(modalStatus.addIgmpSnooping.self, false);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default AddIgmpSnoopingModal;
