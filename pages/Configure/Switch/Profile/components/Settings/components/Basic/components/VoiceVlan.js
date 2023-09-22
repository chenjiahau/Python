import mainStyle from '../../../settings.module.scss';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Component
import {
  TooltipDialog, RadioButton, Button, DropdownWithItem, ButtonAction,
  DropdownWithAdvancedSearch, Checkbox
} from 'components/';

import AddVoiceVlanOuiModal from './modals/AddVoiceVlanOuiModal';

// Fake data
import { generateVoiceVlanData } from 'dummy/data/switch/basic/voice-vlan';
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';
import { getChangeValueFn } from 'dummy/utils/changeValue';

// Util
import { calculateHeightOfMaskContainer } from 'utils/dom';

const defaultModalStatus = {
  addOui: {
    self: 'addOui',
    status: false,
  }
};

const defaultCosList = Array.from({ length: 8 }).map((item, index) => {
  return {
    title: index,
    isActive: false
  };
});

const VoiceVlan = (props) => {
  const { profile } = props;
  const navigate = useNavigate();

  // Fake data
  const fakeVoiceVlanData = generateVoiceVlanData();

  // State
  const [modalStatus, setModalStatus] = useState(defaultModalStatus);
  const [form, setForm] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);
  const changeValue = getChangeValueFn(form, setForm);

  const redirectToProfilePorts = (vlanId) => {
    navigate(`/cloud/configure/switch/profile/${profile.id}/?forceTab=ports&vlan=${vlanId}`);
  }

  // Side effect
  useEffect(() => {
    const voiceVlanCosList = cloneDeep(defaultCosList);
    voiceVlanCosList.forEach(item => {
      if (item.title === fakeVoiceVlanData.cos) {
        item.isActive = true;
      }
    })

    const voiceVlanOuiList = cloneDeep(fakeVoiceVlanData.ouiList);
    voiceVlanOuiList.forEach(item => {
      item.checked = false;
    })

    const updatedForm = {
      state: {
        value: fakeVoiceVlanData.state,
      },
      id: {
        value: fakeVoiceVlanData.id,
      },
      cos: {
        selected: voiceVlanCosList.find(item => item.title === fakeVoiceVlanData.cos),
        list: voiceVlanCosList
      },
      oui: {
        list: voiceVlanOuiList,
      }
    };
    setForm(updatedForm);
  }, []);

  useEffect(() => {
    if (!form) {
      return;
    }

    const maskDom = document.querySelector('#voice-vlan-oui-mask-container-parent');
    const tableDom = document.querySelector('#voice-vlan-oui-table');

    // Calculate height of mask container
    calculateHeightOfMaskContainer(maskDom, tableDom, 34);
  }, [form]);

  if (!form) {
    return;
  }

  return (
    <>
      <div className='text-title-block'>
        <div className='text-title'>
          VOICE VLAN CONFIGURATION
        </div>
        <div className='text-title-tip'>
          <TooltipDialog
            className='ms-1 me-1'
            placement='bottom'
            title="Voice VLAN is a VLAN used to carry voice traffic from IP phone. Because the sound quality of an IP phone call will be deteriorated if the data is unevenly sent, the quality of service (QoS) for voice traffic shall be configured to ensure the transmission priority of voice packet is higher than normal traffic. The cloud switches determine whether a received packet is a voice packet by checking its source MAC address. If the source MAC addresses of packets comply with the organizationally unique identifier (OUI) addresses configured by the system, the packets are determined as voice packets and transmitted in voice VLAN."
          />
        </div>
      </div>
      <div className={mainStyle['detail']} >
        {/* Voice VLAN */}
        <div>
          <div className='form-title'>
            Voice VLAN
            <TooltipDialog
              className='ms-1 me-1'
              placement='bottom'
              title="When Voice VLAN is enabled, Voice VLAN only works in ports with “Access” type. The port captures a voice device through the device's OUI, it will join the voice VLAN as an untagged member automatically. When the voice device sends tagged packets , the switch will change its priority. When the voice device sends untagged packets, it will forward them in voice VLAN."
            />
          </div>
        </div>
        <div>
          <div className={`${mainStyle['block']} ${mainStyle['two-column-block']}`}>
            <div className='form-field--horizontal'>
              <RadioButton
                id='enableVoiceVlan'
                name='voiceVlanState'
                label="Enable"
                checked={form.state.value}
                onChange={() => changeValue('state', true)}
              />
              <div style={{ width: '20px' }}></div>
              <RadioButton
                id='disableVoiceVlan'
                name='voiceVlanState'
                label="Disable"
                checked={!form.state.value}
                onChange={() => changeValue('state', false)}
              />
            </div>
          </div>
        </div>

        {/* Voice VLAN id */}
        <div className='mask-parent mt-1'>
          <div className={`${form.state.value ? '' : 'mask-container'}`}>
            <div className='form-title required'>Voice VLAN ID</div>
          </div>
          {!form.state.value && <div className='mask-container-overlay'></div>}
        </div>
        <div className='mask-parent'>
          <div className={`${form.state.value ? '' : 'mask-container'}`}>
            <div className={`${mainStyle['two-column-block']}`}>
              <DropdownWithAdvancedSearch
                type='number'
                value={form.id.value}
                noIcon={true}
                placeholder='1-4094'
                alignEnd={true}
                hasButton={false}
                isSelectingItem={true}
                dataBsToggleOnInput={true}
                dataBsToggleOnButton={true}
                onChange={e => { }}
              >
                <li>1-Management VLAN</li>
                <li>2-Voice VLAN</li>
              </DropdownWithAdvancedSearch>
              {
                form.state.value && !form.id.value && (
                  <div className='text-error'>The range should be from 2 to 4094</div>
                )
              }
            </div>
            <div className={mainStyle['block']}>
              {
                form.state.value && (
                  <div className='mt-2'>
                    <span className='redirect-to' onClick={() => redirectToProfilePorts(form.id.value)}>0</span> member ports belonging to this voice VLAN currently.
                  </div>
                )
              }
            </div>
          </div>
          {!form.state.value && <div className='mask-container-overlay'></div>}
        </div>

        {/* Voice VLAN Cos */}
        <div className='mask-parent mt-1'>
          <div className={`${form.state.value ? '' : 'mask-container'}`}>
            <div className='form-title'>Voice VLAN Cos</div>
          </div>
          {!form.state.value && <div className='mask-container-overlay'></div>}
        </div>
        <div className='mask-parent'>
          <div className={`${form.state.value ? '' : 'mask-container'}`}>
            <div className={`${mainStyle['block']} ${mainStyle['two-column-block']}`}>
              <DropdownWithItem
                id="action-dropdown"
                type="normal"
                selectedItem={form.cos.selected}
                itemList={form.cos.list}
                onClick={() => { }}
              />
            </div>
          </div>
          {!form.state.value && <div className='mask-container-overlay'></div>}
        </div>

        {/* Voice VLAN Oui */}
        <div className='mask-parent mt-1'>
          <div className={`${form.state.value ? '' : 'mask-container'}`}>
            <div className='form-title'>Voice VLAN Oui</div>
          </div>
          {!form.state.value && <div className='mask-container-overlay'></div>}
        </div>
        <div id="voice-vlan-oui-mask-container-parent" className='mask-parent'>
          <div className={`${form.state.value ? '' : 'mask-container'}`}>
            <div className={`${mainStyle['two-column-block']} mb-2`}>
              <ButtonGroup>
                <Button
                  label='Add'
                  disabled={!form.state.value}
                  onClick={() => changeModalStatus(modalStatus.addOui.self, true)}
                />
                <Button
                  label='Delete'
                  disabled={!form.state.value || !checkAtleastOneChecked(form.oui.list.filter(oui => !oui.isDefault))}
                  onClick={() => { }}
                />
              </ButtonGroup>
            </div>
            <div className={mainStyle['block']}>
              <div id="voice-vlan-oui-table" className="table-responsive" style={{ maxHeight: '400px' }}>
                <Table
                  striped
                  hover
                  className="table-container table-container--disable-sort"
                  style={{ overflowY: 'auto' }}
                >
                  <thead>
                    <tr>
                      <th width='5%'>
                        <Checkbox
                          id='checkall-priority'
                          type='checkbox'
                          checked={checkedAllState(form.oui.list.filter(oui => !oui.isDefault))}
                          onChange={e => { }}
                        />
                      </th>
                      <th width='20%'>OUI Address</th>
                      <th width='20%'>Mask</th>
                      <th width='40%'>Description</th>
                      <th width='15%' className={'table-action-th'}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      form.oui.list.map((oui, index) => {
                        return (
                          <tr key={`voice-vlan-oui-${index}`}>
                            <td>
                              {
                                !oui.isDefault && (
                                  <Checkbox
                                    id={`check-voice-lan-oui-${index}`}
                                    type='checkbox'
                                    checked={oui.checked}
                                    onChange={e => { }}
                                  />
                                )
                              }
                            </td>
                            <td>{oui.address}</td>
                            <td>{oui.mask}</td>
                            <td>{oui.description}</td>
                            <td className={'table-action-td'}>
                              {
                                !oui.isDefault && (
                                  <ButtonAction
                                    label="DELETE"
                                    title="DELETE"
                                    iconClassName="icon-trash"
                                    onClick={() => { }}
                                  />
                                )
                              }
                            </td>
                          </tr>
                        )
                      })
                    }
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
          {!form.state.value && <div className='mask-container-overlay'></div>}
        </div>
      </div >

      <AddVoiceVlanOuiModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />
    </>
  )
}

export default VoiceVlan;