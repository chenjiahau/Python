import mainStyle from 'cloudPages/Configure/Switch/SwitchPorts/switch-ports.module.scss';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// Components
import {
  MessageBoxGroup, ModalContainer, Button, Input, DropdownWithItem,
  DropdownWithCheckbox, Textarea, TooltipDialog
} from 'components/';

// Default variable
const defaultMessages = {
  success: '',
  error: '',
  warning: '',
};

const EditPortModal = props => {
  const {
    modalStatus,
    changeModalStatus,
    selectedPorts = [],
    pushToDevice = () => { }
  } = props;

  // Varible
  const multipleValue = {
    placeholder: 'Multiple values',
    dropdownOption: { title: 'Multiple values', isActive: true, checked: true }
  }
  const errorMessage = {
    rstpAndLbd: 'Loopback detection(LBD) and RSTP cannot be enabled at the same time.'
  }

  // State
  const [messages, setMessages] = useState(cloneDeep(defaultMessages));
  const [form, setForm] = useState(null);
  const [newTag, setNewTag] = useState('');

  // Method
  const renderPortMacAddress = () => {
    return selectedPorts.reduce((rows, key, index) => {
      return (index % 2 === 0 ? rows.push([key])
        : rows[rows.length - 1].push(key)) && rows;
    }, []);
  }

  const changeDropdown = (field, selectedItem) => {
    const updatedForm = cloneDeep(form);

    updatedForm[field].list.forEach(item => {
      if (item.title === selectedItem.title) {
        updatedForm[field].selected = item;
        item.isActive = true;
      }
      else {
        item.isActive = false;
      }
    });

    setForm(updatedForm);
  }

  const changeInput = (field, value) => {
    const updatedForm = cloneDeep(form);
    updatedForm[field].value = value;
    setForm(updatedForm);
  }

  // Side effect
  useEffect(() => {
    const form = {
      portName: { value: '', },
      portTag: { list: [] },
      portState: { selected: {}, list: [] },
      link: { selected: {}, list: [] },
      rstp: { selected: {}, list: [] },
      speedDownshift: { selected: {}, list: [] },
      stpGuard: { selected: {}, list: [] },
      poe: { selected: {}, list: [] },
      lbd: { selected: {}, list: [] },
      pdAlive: { selected: {}, list: [] },
      portCos: { selected: {}, list: [] },
      pdIpAddress: { value: '' },
      type: { selected: {}, list: [] },
      portSchedule: { selected: {}, list: [] },
      nativeVlan: { value: 0 },
      accessVlan: { value: '' },
      allowedVlan: { value: '' },
      trafficSegmentation: { selected: {}, list: [] },
      accessPolicy: { selected: {}, list: [] },
      forwardPort: { list: [] },
      flowControl: { selected: {}, list: [] },
      staticWhitelistedMac: { value: '' },
      dynamicWhitelistSizeLimit: { value: '' },
      dynamicWhitelistedMac: { value: '' }
    };

    if (selectedPorts.length === 1) {
      const port = cloneDeep(selectedPorts[0]);

      form.portName.value = port.portName;
      form.portTag.list = port.tags;
      form.portState.selected = port.portState;
      form.portState.list = port.portStateList;
      form.link.selected = port.link;
      form.link.list = port.linkList;
      form.rstp.selected = port.rstp;
      form.rstp.list = port.rstpList;
      form.speedDownshift.selected = port.speedDownshift;
      form.speedDownshift.list = port.speedDownshiftList;
      form.stpGuard.selected = port.stpGuard;
      form.stpGuard.list = port.stpGuardList;
      form.poe.selected = port.poe;
      form.poe.list = port.poeList;
      form.lbd.selected = port.lbd;
      form.lbd.list = port.lbdList;
      form.pdAlive.selected = port.pdAlive;
      form.pdAlive.list = port.pdAliveList;
      form.portCos.selected = port.portCos;
      form.portCos.list = port.portCosList;
      form.pdIpAddress.value = port.pdIpAddress;
      form.type.selected = port.type;
      form.type.list = port.typeList;
      form.portSchedule.selected = port.portSchedule;
      form.portSchedule.list = port.portScheduleList;
      form.accessVlan.value = port.accessVlan;
      form.nativeVlan.value = port.nativeVlan;
      form.allowedVlan.value = port.allowedVlan;
      form.trafficSegmentation.selected = port.trafficSegmentation;
      form.trafficSegmentation.list = port.trafficSegmentationList;
      form.accessPolicy.selected = port.accessPolicy;
      form.accessPolicy.list = port.accessPolicyList;
      form.forwardPort.list = port.forwardPortList;
      form.flowControl.selected = port.flowControl;
      form.flowControl.list = port.flowControlList;
      form.staticWhitelistedMac.value = port.staticWhitelistedMacList.join('\n');
      form.dynamicWhitelistSizeLimit.value = port.dynamicWhitelistSizeLimit;
      form.dynamicWhitelistedMac.value = port.dynamicWhitelistedMacList.join('\n');
    }

    if (selectedPorts.length > 1) {
      // Have to check the value of each filed between each ports
      // If they are different, value has change to 'Multiple' and placeholder has change to 'Multiple'
      // selectedPorts.forEach((port, index) => {
      //   console.log(port)
      // })
    }

    setForm(form)
  }, [selectedPorts]);

  useEffect(() => {
    if (!form) {
      return;
    }

    if (form.rstp.selected.title === 'Enabled' && form.lbd.selected.title === 'Enabled') {
      setMessages({ ...messages, error: errorMessage.rstpAndLbd });
    }
  }, [form]);

  if (!form) {
    return;
  }

  return (
    <ModalContainer
      modalWidthType="modal-500px"
      openModal={modalStatus.editPort.status}
      closeModal={() => changeModalStatus(modalStatus.editPort.self, false)}
    >
      <div className="header">
        <div className="title">
          Update {selectedPorts.length} {selectedPorts.length === 1 ? 'port' : 'ports'}
        </div>
      </div>
      <div className="body">
        <MessageBoxGroup
          messages={messages}
          changeMessages={setMessages}
          onClose={type => setMessages({ ...messages, [type]: null })}
        />
        {/* Switch ports */}
        <Row className="mb-2">
          <Col>
            <div className="modal-form-title short-block-margin">Switch ports</div>
            <div className={mainStyle['port-mac-address-field']}>
              {
                renderPortMacAddress().map((port, index) => {
                  return (
                    <div
                      key={`mac-address-${index}`}
                      className={mainStyle['item']}
                    >
                      <div >{port[0].deviceName} / Port{port[0].port}</div>
                      {
                        port[1] && (
                          <div>{port[1].deviceName} / Port{port[1].port}</div>
                        )
                      }
                    </div>
                  );
                })
              }
            </div>
          </Col>
        </Row>

        {/* Port name */}
        <Row className="mb-2">
          <Col>
            <div className="modal-form-title short-block-margin">Port name</div>
            <div className="modal-form-field">
              <Input
                type="text"
                value=""
                placeholder="1-64 Characters"
                minLength={1}
                maxLength={64}
                onChange={e => { }}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
          </Col>
        </Row>

        {/* Tags */}
        <Row className="mb-2">
          <Col>
            <div className="modal-form-title short-block-margin">Tag</div>
            <div className="modal-form-field">
              <div
                className={`${mainStyle['tag-field']}`}
                id='addTagDropdown'
                data-bs-toggle='dropdown'
              >
                <input
                  type="text"
                  placeholder="eg.'email-alerts phone'"
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                />
                <div
                  className={`dropdown-menu ${mainStyle['menu']}`}
                  aria-labelledby='addTagDropdown'
                >
                  <div>No result match "{newTag}"</div>
                  <div><span className={mainStyle['add-link']}>Add option</span> "{newTag}"</div>
                </div>
                <div className={mainStyle['tag-list']}>
                  {
                    form.portTag.list.map((tag, index) => {
                      return (
                        <span
                          key={`tag-${index}`}
                          className={mainStyle['tag']}
                        >
                          <span className={mainStyle['left']}>{tag}</span>
                          <span className={mainStyle['right']}>x</span>
                        </span>
                      );
                    }
                    )
                  }
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Port state, Link (RJ45) */}
        <Row className="mb-2">
          <Col>
            <div className="modal-form-title short-block-margin">Port state</div>
            <div className="modal-form-field">
              <DropdownWithItem
                id="port-state-dropdown"
                type="normal"
                selectedItem={form.portState.selected}
                itemList={form.portState.list}
                onClick={item => changeDropdown('portState', item)}
              />
            </div>
          </Col>
          <Col>
            <div className="modal-form-title">Link (RJ45)</div>
            <div className="modal-form-field">
              <DropdownWithItem
                id="link-rj45-dropdown"
                type="normal"
                selectedItem={form.link.selected}
                itemList={form.link.list}
                onClick={item => changeDropdown('link', item)}
              />
            </div>
          </Col>
        </Row>

        {/* RSTP, Speed downshift */}
        <Row className="mb-2">
          <Col>
            <div className="modal-form-title short-block-margin">RSTP</div>
            <div className="modal-form-field">
              <DropdownWithItem
                id="rstp-dropdown"
                type="normal"
                selectedItem={form.rstp.selected}
                itemList={form.rstp.list}
                onClick={item => changeDropdown('rstp', item)}
              />
            </div>
          </Col>
          <Col>
            <div className="modal-form-title short-block-margin">Speed downshift</div>
            <div className="modal-form-field">
              <DropdownWithItem
                id="speed-downshift-dropdown"
                type="normal"
                selectedItem={form.speedDownshift.selected}
                itemList={form.speedDownshift.list}
                onClick={item => changeDropdown('speedDownshift', item)}
              />
            </div>
          </Col>
        </Row>

        {/* STP guard, PoE */}
        <Row className="mb-2">
          <Col>
            <div className="modal-form-title short-block-margin">STP guard</div>
            <div className="modal-form-field">
              <DropdownWithItem
                id="stp-guard-dropdown"
                type="normal"
                disabled={form.rstp.selected.title === 'Disabled'}
                selectedItem={form.stpGuard.selected}
                itemList={form.stpGuard.list}
                onClick={item => changeDropdown('stpGuard', item)}
              />
            </div>
          </Col>
          <Col>
            <div className="modal-form-title short-block-margin">PoE</div>
            <div className="modal-form- field">
              <DropdownWithItem
                id="poe-dropdown"
                type="normal"
                selectedItem={form.poe.selected}
                itemList={form.poe.list}
                onClick={item => changeDropdown('poe', item)}
              />
            </div>
          </Col>
        </Row>

        {/* LBD, PD alive */}
        <Row className="mb-2">
          <Col>
            <div className="modal-form-title short-block-margin">LBD</div>
            <div className="modal-form-field">
              <DropdownWithItem
                id="lbd-dropdown"
                type="normal"
                selectedItem={form.lbd.selected}
                itemList={form.lbd.list}
                onClick={item => changeDropdown('lbd', item)}
              />
            </div>
          </Col>
          <Col>
            <div className="modal-form-title short-block-margin">PD alive</div>
            <div className="modal-form-field">
              <DropdownWithItem
                id="pd-alive-dropdown"
                type="normal"
                disabled={form.poe.selected.title === 'Disabled'}
                selectedItem={form.pdAlive.selected}
                itemList={form.pdAlive.list}
                onClick={item => changeDropdown('pdAlive', item)}
              />
            </div>
          </Col>
        </Row>

        {/* Port CoS, PD IP address */}
        <Row className="mb-2">
          <Col>
            <div className="modal-form-title short-block-margin">Port CoS</div>
            <div className="modal-form-field">
              <DropdownWithItem
                id="port-cos-dropdown"
                type="normal"
                selectedItem={form.portCos.selected}
                itemList={form.portCos.list}
                onClick={item => changeDropdown('portCos', item)}
              />
            </div>
          </Col>
          <Col>
            <div className="modal-form-title short-block-margin">PD IP address</div>
            <div className="modal-form-field">
              <Input
                type="text"
                placeholder="e.g. 10.90.90.90"
                value={form.pdIpAddress.value}
                disabled={form.pdAlive.selected.title === 'Disabled'}
                onChange={e => changeInput('pdIpAddress', e.target.value)}
                onFocus={() => { }}
                onBlur={() => { }}
              />
            </div>
          </Col>
        </Row>

        {/* Type, Port schedule */}
        <Row className="mb-2">
          <Col>
            <div className="modal-form-title short-block-margin">Type</div>
            <div className="modal-form-field">
              <DropdownWithItem
                id="type-dropdown"
                type="normal"
                selectedItem={form.type.selected}
                itemList={form.type.list}
                onClick={item => changeDropdown('type', item)}
              />
            </div>
          </Col>
          <Col>
            <div className="modal-form-title short-block-margin">
              Port schedule
              <Link className={mainStyle['link']} to="/cloud/configure/schedule-policies">Schedule policy</Link>
            </div>
            <div className="modal-form-field">
              <DropdownWithItem
                id="port-schedule-dropdown"
                type="normal"
                selectedItem={form.portSchedule.selected}
                itemList={form.portSchedule.list}
                onClick={item => changeDropdown('portSchedule', item)}
              />
            </div>
          </Col>
        </Row>

        {/* Native VLAN, Traffic segmentation */}
        <Row className="mb-2">
          <Col>
            {
              form.type.selected.title === 'Access' && (
                <>
                  <div className="modal-form-title short-block-margin">Access VLAN</div>
                  <div className="modal-form-field">
                    <Input
                      type="number"
                      placeholder="1-4094"
                      value={form.accessVlan.value}
                      onChange={e => changeInput('accessVlan', e.target.value)}
                      onFocus={() => { }}
                      onBlur={() => { }}
                    />
                  </div>
                </>
              )
            }
            {
              form.type.selected.title === 'Trunk' && (
                <>
                  <div className="modal-form-title short-block-margin">Native VLAN</div>
                  <div className="modal-form-field">
                    <Input
                      type="number"
                      placeholder="1-4094"
                      value={form.nativeVlan.value}
                      onChange={e => changeInput('nativeVlan', e.target.value)}
                      onFocus={() => { }}
                      onBlur={() => { }}
                    />
                  </div>
                </>
              )
            }
          </Col>
          <Col>
            <div className="modal-form-title short-block-margin">Traffic segmentation</div>
            <div className="modal-form-field">
              <DropdownWithItem
                id="traffic-segmentation-dropdown"
                type="normal"
                selectedItem={form.trafficSegmentation.selected}
                itemList={form.trafficSegmentation.list}
                onClick={item => changeDropdown('trafficSegmentation', item)}
              />
            </div>
          </Col>
        </Row>

        {/* Allowed VLANs, Forward ports */}
        <Row className="mb-2">
          <Col sm={6}>
            {
              form.type.selected.title === 'Access' && (
                <>
                  <div className="modal-form-title short-block-margin">Access policy</div>
                  <div className="modal-form-field">
                    <DropdownWithItem
                      id="access-policy-dropdown"
                      type="normal"
                      selectedItem={form.accessPolicy.selected}
                      itemList={form.accessPolicy.list}
                      onClick={item => changeDropdown('accessPolicy', item)}
                    />
                  </div>
                </>
              )
            }
            {
              form.type.selected.title === 'Trunk' && (
                <>
                  <div className="modal-form-title short-block-margin">Allowed VLANs</div>
                  <div className="modal-form-field">
                    <Input
                      type="text"
                      placeholder="e.g. 1-3, 5, 9-40 (max. 256 VLANs)"
                      value={form.nativeVlan.value}
                      onChange={e => changeInput('nativeVlan', e.target.value)}
                      onFocus={() => { }}
                      onBlur={() => { }}
                    />
                  </div>
                </>
              )
            }
          </Col>
          <Col sm={6}>
            <div className="modal-form-title short-block-margin">Forward port(s)</div>
            <div className="modal-form-field">
              <DropdownWithCheckbox
                allMode={true}
                label='f3f6dbdba3'
                id='forward-ports-dropdown'
                type='checkbox'
                disabled={form.trafficSegmentation.selected.title === 'Disabled'}
                itemList={form.forwardPort.list}
                onChangeAll={flag => {
                  const updatedForm = cloneDeep(form);
                  updatedForm.forwardPort.list.forEach(item => item.checked = flag);
                  setForm(updatedForm);
                }}
                onChange={selectedItem => {
                  const updatedForm = cloneDeep(form);
                  updatedForm.forwardPort.list.forEach(item => {
                    if (item.title === selectedItem.title) {
                      item.checked = !item.checked;
                    }
                  });
                  setForm(updatedForm);
                }}
              />
            </div>
          </Col>
        </Row>

        {/* Flow control */}
        <Row className="mb-2">
          <Col>
            <div className="modal-form-title short-block-margin"></div>
            <div className="modal-form-field">
            </div>
          </Col>
          <Col>
            <div className="modal-form-title short-block-margin">Flow control </div>
            <div className="modal-form-field">
              <DropdownWithItem
                id="flow-control-dropdown"
                type="normal"
                selectedItem={form.flowControl.selected}
                itemList={form.flowControl.list}
                onClick={item => changeDropdown('flowControl', item)}
              />
            </div>
          </Col>
        </Row>

        {/* Static whitelisted MACs */}
        {
          form.accessPolicy.selected.title !== 'Disabled' && (
            <>
              <Row className="mb-2">
                <Col>
                  <div className="modal-form-title short-block-margin">
                    Static whitelisted MACs
                    <TooltipDialog
                      className="ms-1 me-1"
                      placement="bottom"
                      title="Limit this port to only specific mac addresses. Formation should be AA:BB:CC:DD:EE:FF. If entering multiple MAC address, use one per line."
                    />
                  </div>
                  <div className="modal-form-field">
                    <Textarea
                      style={{ height: 100 }}
                      value={form.staticWhitelistedMac.value}
                      onChange={e => changeInput('staticWhitelistedMac', e.target.value)}
                      onFocus={() => { }}
                      onBlur={() => { }}
                    />
                  </div>
                </Col>
              </Row>
            </>
          )
        }

        {/* Dynamic whitelist size limit */}
        {
          form.accessPolicy.selected.title !== 'Disabled' &&
          form.accessPolicy.selected.title !== 'MAC whitelist' && (
            <>
              <Row className="mb-2">
                <Col>
                  <div className="modal-form-title short-block-margin">
                    Dynamic whitelist size limit
                  </div>
                  <div className="modal-form-field">
                    <Input
                      type="number"
                      placeholder="1-32"
                      value={form.dynamicWhitelistSizeLimit.value}
                      onChange={e => changeInput('dynamicWhitelistSizeLimit', e.target.value)}
                      onFocus={() => { }}
                      onBlur={() => { }}
                    />
                  </div>
                </Col>
              </Row>

              {/* Dynamic whitelisted MACs */}
              <Row className="mb-2">
                <Col>
                  <div className="modal-form-title short-block-margin">
                    Dynamic whitelisted MACs
                  </div>
                  <div className="modal-form-field">
                    <Textarea
                      style={{ height: 100 }}
                      value={form.dynamicWhitelistedMac.value}
                      onChange={e => changeInput('dynamicWhitelistedMac', e.target.value)}
                      onFocus={() => { }}
                      onBlur={() => { }}
                    />
                  </div>
                </Col>
              </Row>
            </>
          )
        }
      </div >
      <div className="footer">
        <Button
          label="Cancel"
          className="btn-cancel"
          onClick={() => changeModalStatus(modalStatus.editPort.self, false)}
        />
        <Button
          label="Save"
          className="btn-submit"
          onClick={() => {
            changeModalStatus(modalStatus.editPort.self, false);
            pushToDevice();
          }}
        />
      </div>
    </ModalContainer >
  );
};

export default EditPortModal;
