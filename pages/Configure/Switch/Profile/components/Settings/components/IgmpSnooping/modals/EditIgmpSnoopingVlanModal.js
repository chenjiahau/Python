import { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// Component
import {
  Button, ModalContainer, MessageBoxGroup, DropdownWithItem, ButtonWithIcon,
  ButtonAction, DropdownWithAdvancedSearch, DropdownWithCheckbox
} from 'components/';
import { cloneDeep } from 'lodash';

// Dummy data & util
import { generateVlanData } from 'dummy/data/switch/vlan';

const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const defaultIgmpSnoopingStateDropdown = [
  { title: 'Enable', isActive: false },
  { title: 'Disable', isActive: false },
];

const defaultQuerierStateDropdown = [
  { title: 'Enable', isActive: false },
  { title: 'Disable', isActive: false },
];

const defaultMulticastFilteringModeDropdown = [
  { title: 'Forward unregistered', isActive: false },
  { title: 'Filter unregistered', isActive: false },
];

const EditIgmpSnoopingVlanModal = props => {
  const { modalStatus, changeModalStatus } = props;

  // Fake data
  const fakeVlanList = generateVlanData();

  // Status
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [form, setForm] = useState(null);

  // Method


  // Side effect
  useEffect(() => {
    const vlanIds = [];
    for (const vlan of fakeVlanList) {
      const item = {
        ...vlan,
        isActive: false
      }

      vlanIds.push(item);
    }
    vlanIds[0].isActive = true;

    const igmpSnoopingStateDropdown = cloneDeep(defaultIgmpSnoopingStateDropdown);
    igmpSnoopingStateDropdown[0].isActive = true;

    const querierStateDropdown = cloneDeep(defaultQuerierStateDropdown);
    querierStateDropdown[0].isActive = true;

    const multicastFilteringModeDropdown = cloneDeep(defaultMulticastFilteringModeDropdown);
    multicastFilteringModeDropdown[0].isActive = true;

    const portSetting = {
      10: Array.from({ length: 10 }, (num, i) => {
        return {
          title: `Port ${i + 1}`,
          checked: false
        };
      }),
      28: Array.from({ length: 28 }, (num, i) => {
        return {
          title: `Port ${i + 1}`,
          checked: false
        };
      }),
      52: Array.from({ length: 52 }, (num, i) => {
        return {
          title: `Port ${i + 1}`,
          checked: false
        };
      }),
    };

    const updatedForm = {
      vlanId: vlanIds,
      igmpSnooping: igmpSnoopingStateDropdown,
      querierState: querierStateDropdown,
      multicastFilteringMode: multicastFilteringModeDropdown,
      portSetting
    }

    setForm(updatedForm);
  }, []);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType='modal-500px'
      openModal={modalStatus.editIgmpSnoopingVlan.status}
      closeModal={() => changeModalStatus(modalStatus.editIgmpSnoopingVlan.self, false)}
    >
      <div className='header'>
        <div className='title'>Update IGMP snooping VLAN settings</div>
      </div>
      <div className='body'>
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />

        {/* VLAN ID, IGMP snooping */}
        <Row>
          <Col>
            <div className='form-title required mb-1'>
              VLAN ID
            </div>
            <div className='form-field'>
              <DropdownWithAdvancedSearch
                type='number'
                value={form.vlanId.find(item => item.isActive).id}
                placeholder='1-4094'
                alignEnd={true}
                hasButton={false}
                disabled={true}
                isSelectingItem={true}
                dataBsToggleOnInput={true}
                dataBsToggleOnButton={true}
                onChange={e => { }}
              >
                {
                  form.vlanId.map((item) => {
                    return (
                      <li key={item.id}>{item.id} - {item.title}</li>
                    )
                  })
                }
              </DropdownWithAdvancedSearch>
            </div>
          </Col>
          <Col>
            <div className='form-title mb-1'>
              IGMP snooping
            </div>
            <div className='form-field'>
              <DropdownWithItem
                type='normal'
                selectedItem={form.igmpSnooping.find(item => item.isActive)}
                itemList={form.igmpSnooping}
                onClick={item => { }}
              />
            </div>
          </Col>
        </Row>

        {/* Querier state, Multicast filtering mode */}
        <Row className='mt-3 mb-4'>
          <Col>
            <div className='form-title mb-1'>
              Querier state
            </div>
            <div className='form-field'>
              <DropdownWithItem
                type='normal'
                selectedItem={form.querierState.find(item => item.isActive)}
                itemList={form.querierState}
                onClick={item => { }}
              />
            </div>
          </Col>
          <Col>
            <div className='form-title mb-1'>
              Multicast filtering mode
            </div>
            <div className='form-field'>
              <DropdownWithItem
                type='normal'
                selectedItem={form.multicastFilteringMode.find(item => item.isActive)}
                itemList={form.multicastFilteringMode}
                onClick={item => { }}
              />
            </div>
          </Col>
        </Row>

        {/* Static Mrouter port settings */}
        <div className="modal-subtitle mb-2">Static Mrouter port settings</div>

        <div className='form-title mb-1'>
          <span className='space'>10 ports</span><span className='text-warning'>This VLAN ID contains no member ports.</span>
        </div>
        <div className='mb-3'>
          <DropdownWithCheckbox
            allMode={true}
            label='f3f6dbdba3'
            type='checkbox'
            itemList={form.portSetting[10]}
            onChangeAll={flag => { }}
            onChange={selectedItem => { }}
          />
        </div>

        <div className='form-title mb-1'>
          <span className='space'>28 ports</span><span className='text-warning'>This VLAN ID contains no member ports.</span>
        </div>
        <div className='mb-3'>
          <DropdownWithCheckbox
            allMode={true}
            label='f3f6dbdba3'
            type='checkbox'
            itemList={form.portSetting[28]}
            onChangeAll={flag => { }}
            onChange={selectedItem => { }}
          />
        </div>

        <div className='form-title mb-1'>
          <span className='space'>52 ports</span><span className='text-warning'>This VLAN ID contains no member ports.</span>
        </div>
        <div>
          <DropdownWithCheckbox
            allMode={true}
            label='f3f6dbdba3'
            type='checkbox'
            itemList={form.portSetting[52]}
            onChangeAll={flag => { }}
            onChange={selectedItem => { }}
          />
        </div>
      </div>

      <div className='footer'>
        <Button
          label='Close'
          className='btn-cancel'
          onClick={() => {
            changeModalStatus(modalStatus.editIgmpSnoopingVlan.self, false);
          }}
        />
        <Button
          label='Update'
          className='btn-submit'
          onClick={() => {
            changeModalStatus(modalStatus.editIgmpSnoopingVlan.self, false);
          }}
        />
      </div>
    </ModalContainer >
  );
};

export default EditIgmpSnoopingVlanModal;
