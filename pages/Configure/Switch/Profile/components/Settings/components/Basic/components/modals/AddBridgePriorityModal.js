import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';

// Component
import {
  Button, ModalContainer, MessageBoxGroup, ButtonWithIcon, DropdownWithItem,
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

const defaultBridgePriorityList = [
  { title: '0-likedly root', isActive: false },
  { title: '4096', isActive: false },
  { title: '8192', isActive: false },
  { title: '12288', isActive: false },
  { title: '16384', isActive: false },
  { title: '20480', isActive: false },
  { title: '24576', isActive: false },
  { title: '28672', isActive: false },
  { title: '32768-default', isActive: false },
  { title: '36864', isActive: false },
  { title: '40960', isActive: false },
  { title: '45056', isActive: false },
  { title: '49152', isActive: false },
  { title: '53248', isActive: false },
  { title: '57344', isActive: false },
  { title: '61440', isActive: false },
];

const AddBridgePriorityModal = props => {
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
      priority: {
        selected: null,
        list: cloneDeep(defaultBridgePriorityList)
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
        priority: {
          selected: null,
          list: []
        }
      }
    ];

    const copiedDevice = cloneDeep(updatedDeviceList);
    const copiedBridgePriorityList = cloneDeep(defaultBridgePriorityList);
    copiedDevice[0].isActive = true;
    copiedBridgePriorityList[0].isActive = true;

    updatedList[0].switch.selected = cloneDeep(copiedDevice[0]);
    updatedList[0].switch.list = cloneDeep(copiedDevice);
    updatedList[0].priority.selected = cloneDeep(copiedBridgePriorityList[0]);
    updatedList[0].priority.list = cloneDeep(copiedBridgePriorityList);

    setList(updatedList);
  }, []);

  if (list.length === 0 || deviceList.length === 0) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType="modal-700px"
      openModal={modalStatus.addPriority.status}
      closeModal={() => changeModalStatus(modalStatus.addPriority.self, false)}
    >
      <div className="header">
        <div className="title">Set the bridge priority for switches</div>
      </div>
      <div className="body">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />

        <Table
          striped
          hover
          className="table-container table-container--disable-sort"
          style={{ overflowY: 'auto' }}
        >
          <thead>
            <tr>
              <th width='10%'>#</th>
              <th width='50%'>Switch</th>
              <th width='35%'>Bridge Priority</th>
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
                      type="normal"
                      selectedItem={item.switch.selected}
                      itemList={item.switch.list}
                      onClick={item => { }}
                    />
                  </td>
                  <td>
                    <DropdownWithItem
                      type="normal"
                      selectedItem={item.priority.selected}
                      itemList={item.priority.list}
                      onClick={item => { }}
                    />
                  </td>
                  <td className={'table-action-td'}>
                    <ButtonAction
                      title="DELETE"
                      iconClassName="icon-trash"
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
            label="Add"
            className="d-flex justify-content-center"
            iconClassName="icon-expand"
            onClick={add}
          />
        </div>
      </div>

      <div className="footer">
        <Button
          label="Close"
          className="btn-cancel"
          onClick={() => {
            changeModalStatus(modalStatus.addPriority.self, false);
          }}
        />
        <Button
          label="Add"
          className="btn-submit"
          onClick={() => {
            changeModalStatus(modalStatus.addPriority.self, false);
          }}
        />
      </div>
    </ModalContainer>
  );
};

export default AddBridgePriorityModal;
