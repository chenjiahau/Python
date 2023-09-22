import mainStyle from '../../settings.module.scss';

import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep, set } from 'lodash';

// Component
import {
  TooltipDialog, InlineTitle, Button, DropdownWithAdvancedSearch, DropdownWithItem,
  Input, Checkbox, LinkerWithA, ButtonAction, PaginationContainer
} from 'components/';

import AddIpv4RuleModal from './modals/AddIpv4RuleModal';
import EditIpv4RuleModal from './modals/EditIpv4RuleModal';
import AddMacRuleModal from './modals/AddMacRuleModal';
import EditMacRuleModal from './modals/EditMacRuleModal';

// Fake data
import { generateAclData } from 'dummy/data/switch/acl';
import { sorting } from 'dummy/utils/sorting';
import { getChangeModalStatusFn } from 'dummy/utils/modal';
import { checkedAllState, toggleCheckedAll, toggleCheckedOne, checkAtleastOneChecked } from 'dummy/utils/checkbox';

const defaultPolicyDropdown = [
  { title: 'All', isAll: true, isActive: true },
  { title: 'Permit', isActive: false },
  { title: 'Deny', isActive: false },
];

const defaultProtocolDropdown = [
  { title: 'All', isAll: true, isActive: true },
  { title: 'Any', isActive: false },
  { title: 'TCP', isActive: false },
  { title: 'UDP', isActive: false },
];

const defaultModalStatus = {
  addIpv4Rule: {
    self: 'addIpv4Rule',
    status: false,
  },
  editIpv4Rule: {
    self: 'editIpv4Rule',
    status: false,
  },
  addMacRule: {
    self: 'addMacRule',
    status: false,
  },
  editMacRule: {
    self: 'editMacRule',
    status: false,
  },
};

const Acl = () => {

  // Fake data
  const fakeAclData = generateAclData();

  // State
  const [modalStatus, setModalStatus] = useState(cloneDeep(defaultModalStatus));
  const [aclInformation, setAclInformation] = useState(null);
  const [ipv4Rules, setIpv4Rules] = useState(null);
  const [macRules, setMacRules] = useState(null);
  const [ipv4RulesSearch, setIpv4RulesSearch] = useState({
    sequenceNo: '',
    policy: cloneDeep(defaultPolicyDropdown),
    protocol: cloneDeep(defaultProtocolDropdown),
    sourceIp: '',
    destinationIp: '',
    sourcePort: '',
    destinationPort: '',
    vlan: '',
    comment: ''
  });
  const [macRulesSearch, setMacRulesSearch] = useState({
    sequenceNo: '',
    policy: cloneDeep(defaultPolicyDropdown),
    EthernetType: '',
    sourceMac: '',
    destinationMac: '',
    cos: '',
    vlan: '',
    comment: ''
  });
  const [selectedIpv4Rule, setSelectedIpv4Rule] = useState(null);
  const [selectedMacRule, setSelectedMacRule] = useState(null);

  // Method
  const changeModalStatus = getChangeModalStatusFn(modalStatus, setModalStatus);

  // Side effect
  useEffect(() => {
    setAclInformation(cloneDeep(fakeAclData['information']));

    const updatedIpv4Rules = cloneDeep(fakeAclData['ipv4Rules']);
    const updatedMacRules = cloneDeep(fakeAclData['macRules']);

    updatedIpv4Rules.forEach((rule) => rule.checked = false);
    updatedMacRules.forEach((rule) => rule.checked = false);

    setIpv4Rules(updatedIpv4Rules);
    setMacRules(updatedMacRules);
  }, []);

  if (!aclInformation || !ipv4Rules || !macRules) {
    return;
  }

  return (
    <>
      <div className={`tab-container-border ${mainStyle['acl-container']}`}>
        <div className={mainStyle['acl-information-block']} >
          <div className='text-title-block mb-3'>
            <div className='text-title text-title-underline'>ACL INFORMATION</div>
          </div>
          <div className='form-group'>
            <div className='form-title'>Current / Max. rules</div>
            <div className='form-field'>
              {aclInformation.rule.current} / {aclInformation.rule.max}
            </div>
          </div>
          <div className='form-group form-group--align-top'>
            <div className='form-title'>
              Nuclias service rules
              <TooltipDialog
                className='ms-1 me-1'
                placement='auto'
                title='In order to ensure management connectivity with Nuclias, IP address specified for service rules are added to the User defined IPv4 ACL rules by default configuration. These rules consist of an explicit allow for all IPv4 traffic to and from the listed IP address.'
              />
            </div>
            <div className='form-field'>
              <div className={mainStyle['service-rule-table']}>
                <div className={mainStyle['header']}>
                  Nuclias management IP address
                </div>
                {
                  aclInformation.serviceRules.map((item, index) => {
                    return (
                      <div className={mainStyle['item']} key={index}>
                        <div>
                          {index + 1}
                        </div>
                        <div>
                          {item}
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </div>
        </div>

        {/* USER DEFINED IPV4 RULES */}
        <div className='mt-5'></div>
        <InlineTitle label='USER DEFINED IPV4 RULES' />
        <div className='d-flex justify-content-between mt-4 mb-1'>
          <ButtonGroup>
            <Button
              label='Add'
              className='btn-grey'
              onClick={() => changeModalStatus(modalStatus.addIpv4Rule.self, true)}
            />
            <Button
              label='Delete'
              className='btn-grey'
              onClick={() => { }}
              disabled
            />
          </ButtonGroup>

          <InlineTitle isNonUnderline>
            <DropdownWithAdvancedSearch
              value={''}
              alignEnd={true}
              dataBsToggleOnInput={true}
              dataBsToggleOnButton={true}
              dropdownMenuStyle={{ minWidth: '371px', maxHeight: '500px', overflowY: 'auto' }}
              onChange={e => console.log(e.target.value)}
            >
              <li className='mt-2'>
                <div className='form-title'>Sequence No.</div>
                <Input
                  type='number'
                  placeholder='1-65535'
                  autoComplete='new-email'
                  value={ipv4RulesSearch.sequenceNo}
                  onChange={(e) => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>Policy</div>
                <DropdownWithItem
                  id='ipv4-policy-dropdown'
                  type='normal'
                  selectedItem={ipv4RulesSearch.policy.find(item => item.isActive)}
                  itemList={ipv4RulesSearch.policy}
                  onClick={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>Protocol</div>
                <DropdownWithItem
                  id='ipv4-protocol-dropdown'
                  type='normal'
                  selectedItem={ipv4RulesSearch.protocol.find(item => item.isActive)}
                  itemList={ipv4RulesSearch.protocol}
                  onClick={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>Source IP</div>
                <Input
                  type='text'
                  placeholder='e.g. 10.90.90.90/8 or Any'
                  autoComplete='new-email'
                  value={ipv4RulesSearch.sourceIp}
                  onChange={(e) => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>Destination IP</div>
                <Input
                  type='text'
                  placeholder='e.g. 10.90.90.90/8 or Any'
                  autoComplete='new-email'
                  value={ipv4RulesSearch.destinationIp}
                  onChange={(e) => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>Source Port</div>
                <Input
                  type='text'
                  placeholder='e.g. 1-65535 or Any'
                  autoComplete='new-email'
                  value={ipv4RulesSearch.sourcePort}
                  onChange={(e) => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>Destination Port</div>
                <Input
                  type='number'
                  placeholder='e.g. 1-65535 or Any'
                  autoComplete='new-email'
                  value={ipv4RulesSearch.destinationPort}
                  onChange={(e) => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>VLAN</div>
                <Input
                  type='number'
                  placeholder='e.g. 1-4094 or Any'
                  autoComplete='new-email'
                  value={ipv4RulesSearch.vlan}
                  onChange={(e) => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>Comment</div>
                <Input
                  type='number'
                  placeholder='1-64 Characters'
                  autoComplete='new-email'
                  value={ipv4RulesSearch.comment}
                  onChange={(e) => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
            </DropdownWithAdvancedSearch>
          </InlineTitle>
        </div>
        <Table responsive striped hover className='table-container'>
          <thead>
            <tr>
              <th>
                <Checkbox
                  id='ipv4-rules-check-all'
                  type='checkbox'
                  checked={checkedAllState(ipv4Rules)}
                  onChange={e => toggleCheckedAll(ipv4Rules, setIpv4Rules)}
                />
              </th>
              <th>#</th>
              <th>
                <LinkerWithA
                  label='Sequence No.'
                  className='text-decoration-none'
                  onClick={e => sorting(e, ipv4Rules, 'no', setIpv4Rules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Policy'
                  className='text-decoration-none'
                  onClick={e => sorting(e, ipv4Rules, 'policy', setIpv4Rules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Protocol'
                  className='text-decoration-none'
                  onClick={e => sorting(e, ipv4Rules, 'protocol', setIpv4Rules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Source IP'
                  className='text-decoration-none'
                  onClick={e => sorting(e, ipv4Rules, 'sourceIp', setIpv4Rules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Source port'
                  className='text-decoration-none'
                  onClick={e => sorting(e, ipv4Rules, 'sourcePort', setIpv4Rules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Destination IP'
                  className='text-decoration-none'
                  onClick={e => sorting(e, ipv4Rules, 'destinationIp', setIpv4Rules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Destination port'
                  className='text-decoration-none'
                  onClick={e => sorting(e, ipv4Rules, 'destinationPort', setIpv4Rules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='VLAN'
                  className='text-decoration-none'
                  onClick={e => sorting(e, ipv4Rules, 'vlan', setIpv4Rules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Comment'
                  className='text-decoration-none'
                  onClick={e => sorting(e, ipv4Rules, 'comment', setIpv4Rules)}
                />
              </th>
              <th className='table-action-th'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              ipv4Rules.map((item, index) => {
                if (item.no === 0) return null;
                return (
                  <tr key={index}>
                    <td>
                      <Checkbox
                        id={`ipv4-rules-check-${index}`}
                        type='checkbox'
                        checked={item.checked}
                        onChange={e => toggleCheckedOne(index, ipv4Rules, setIpv4Rules)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{item.no}</td>
                    <td>{item.policy}</td>
                    <td>{item.protocol}</td>
                    <td>{item.sourceIp}</td>
                    <td>{item.sourcePort}</td>
                    <td>{item.destinationIp}</td>
                    <td>{item.destinationPort}</td>
                    <td>{item.vlan}</td>
                    <td>{item.comment}</td>
                    <td className='table-action-td'>
                      <ButtonAction
                        label='EDIT'
                        title='EDIT'
                        iconClassName="icon-edit"
                        onClick={() => {
                          setSelectedIpv4Rule(item);
                          changeModalStatus(modalStatus.editIpv4Rule.self, true);
                        }}
                      />
                      <ButtonAction
                        label='DELETE'
                        title='DELETE'
                        iconClassName="icon-trash"
                        onClick={() => { }}
                      />
                    </td>
                  </tr>
                );
              })
            }
            {
              ipv4Rules.map((item, index) => {
                if (item.no !== 0) return null;
                return (
                  <tr key={index}>
                    <td>
                    </td>
                    <td></td>
                    <td></td>
                    <td>{item.policy}</td>
                    <td>{item.protocol}</td>
                    <td>{item.sourceIp}</td>
                    <td>{item.sourcePort}</td>
                    <td>{item.destinationIp}</td>
                    <td>{item.destinationPort}</td>
                    <td>{item.vlan}</td>
                    <td>{item.comment}</td>
                    <td className='table-action-td'>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
        <PaginationContainer
          total={ipv4Rules.length}
          onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
          onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
        />

        {/* USER DEFINED MAC RULES */}
        <div className='mb-5'></div>
        <InlineTitle label='USER DEFINED MAC RULES' />
        <div className='d-flex justify-content-between mt-4 mb-1'>
          <ButtonGroup>
            <Button
              label='Add'
              className='btn-grey'
              onClick={() => changeModalStatus(modalStatus.addMacRule.self, true)}
            />
            <Button
              label='Delete'
              className='btn-grey'
              onClick={() => { }}
              disabled
            />
          </ButtonGroup>

          <InlineTitle isNonUnderline>
            <DropdownWithAdvancedSearch
              value={''}
              alignEnd={true}
              dataBsToggleOnInput={true}
              dataBsToggleOnButton={true}
              dropdownMenuStyle={{ minWidth: '371px', maxHeight: '500px', overflowY: 'auto' }}
              onChange={e => console.log(e.target.value)}
            >
              <li className='mt-2'>
                <div className='form-title'>Sequence No.</div>
                <Input
                  type='number'
                  placeholder='1-65535'
                  autoComplete='new-email'
                  value={macRulesSearch.sequenceNo}
                  onChange={(e) => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>Policy</div>
                <DropdownWithItem
                  id='ipv4-policy-dropdown'
                  type='normal'
                  selectedItem={macRulesSearch.policy.find(item => item.isActive)}
                  itemList={macRulesSearch.policy}
                  onClick={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>Ethernet type</div>
                <Input
                  type='text'
                  placeholder='e.g. 0x0 - 0xffff or Any'
                  autoComplete='new-email'
                  value={macRulesSearch.ethernetType}
                  onChange={(e) => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>Source MAC</div>
                <Input
                  type='text'
                  placeholder='e.g. 02:00:4C:11:22:33 or Any'
                  autoComplete='new-email'
                  value={macRulesSearch.sourceMac}
                  onChange={(e) => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>Destination MAC</div>
                <Input
                  type='text'
                  placeholder='e.g. 02:00:4C:11:22:33 or Any'
                  autoComplete='new-email'
                  value={macRulesSearch.destinationMac}
                  onChange={(e) => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>Cos</div>
                <Input
                  type='text'
                  placeholder='e.g. 0-7 or Any'
                  autoComplete='new-email'
                  value={macRulesSearch.cos}
                  onChange={(e) => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>VLAN</div>
                <Input
                  type='number'
                  placeholder='e.g. 1-4094 or Any'
                  autoComplete='new-email'
                  value={macRulesSearch.vlan}
                  onChange={(e) => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
              <li className='mt-2'>
                <div className='form-title mb-1'>Comment</div>
                <Input
                  type='number'
                  placeholder='1-64 Characters'
                  autoComplete='new-email'
                  value={macRulesSearch.comment}
                  onChange={(e) => { }}
                  onFocus={() => { }}
                  onBlur={() => { }}
                />
              </li>
            </DropdownWithAdvancedSearch>
          </InlineTitle>
        </div>
        <Table responsive striped hover className='table-container' id='device-list-table' style={{ position: 'relative' }}>
          <thead>
            <tr>
              <th>
                <Checkbox
                  id='mac-rules-check-all'
                  type='checkbox'
                  checked={checkedAllState(macRules)}
                  onChange={e => toggleCheckedAll(macRules, setMacRules)}
                />
              </th>
              <th>#</th>
              <th>
                <LinkerWithA
                  label='Sequence No.'
                  className='text-decoration-none'
                  onClick={e => sorting(e, macRules, 'no', setMacRules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Policy'
                  className='text-decoration-none'
                  onClick={e => sorting(e, macRules, 'policy', setMacRules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Ethernet type'
                  className='text-decoration-none'
                  onClick={e => sorting(e, macRules, 'ethernetType', setMacRules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Source MAC'
                  className='text-decoration-none'
                  onClick={e => sorting(e, macRules, 'sourceMac', setMacRules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Destination MAC'
                  className='text-decoration-none'
                  onClick={e => sorting(e, macRules, 'destinationMac', setMacRules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Cos'
                  className='text-decoration-none'
                  onClick={e => sorting(e, macRules, 'cos', setMacRules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='VLAN'
                  className='text-decoration-none'
                  onClick={e => sorting(e, macRules, 'vlan', setMacRules)}
                />
              </th>
              <th>
                <LinkerWithA
                  label='Comment'
                  className='text-decoration-none'
                  onClick={e => sorting(e, macRules, 'comment', setMacRules)}
                />
              </th>
              <th className='table-action-th'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {
              macRules.map((item, index) => {
                if (item.no === 0) return null;
                return (
                  <tr key={index}>
                    <td>
                      <Checkbox
                        id={`mac-rules-check-${index}`}
                        type='checkbox'
                        checked={item.checked}
                        onChange={e => toggleCheckedOne(index, macRules, setMacRules)}
                      />
                    </td>
                    <td>{index + 1}</td>
                    <td>{item.no}</td>
                    <td>{item.policy}</td>
                    <td>{item.ethernetType}</td>
                    <td>{item.sourceMac}</td>
                    <td>{item.destinationMac}</td>
                    <td>{item.cos}</td>
                    <td>{item.vlan}</td>
                    <td>{item.comment}</td>
                    <td className='table-action-td'>
                      <ButtonAction
                        label='EDIT'
                        title='EDIT'
                        iconClassName="icon-edit"
                        onClick={() => {
                          setSelectedMacRule(item);
                          changeModalStatus(modalStatus.editMacRule.self, true);
                        }}
                      />
                      <ButtonAction
                        label='DELETE'
                        title='DELETE'
                        iconClassName="icon-trash"
                        onClick={() => { }}
                      />
                    </td>
                  </tr>
                );
              })
            }
            {
              macRules.map((item, index) => {
                if (item.no !== 0) return null;
                return (
                  <tr key={index}>
                    <td>
                    </td>
                    <td></td>
                    <td></td>
                    <td>{item.policy}</td>
                    <td>{item.ethernetType}</td>
                    <td>{item.sourceMac}</td>
                    <td>{item.destinationMac}</td>
                    <td>{item.cos}</td>
                    <td>{item.vlan}</td>
                    <td>{item.comment}</td>
                    <td className='table-action-td'>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </Table>
        <div className='d-flex justify-content-end'>
          <PaginationContainer
            total={macRules.length}
            onPageChange={currentPageNum => console.log('onPageChange', currentPageNum)}
            onEntryLimitChange={currentPageNum => console.log('onEntryLimitChange', currentPageNum)}
          />
        </div>
      </div>

      <AddIpv4RuleModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <EditIpv4RuleModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        selectedIpv4Rule={selectedIpv4Rule}
        setSelectedIpv4Rule={setSelectedIpv4Rule}
      />

      <AddMacRuleModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
      />

      <EditMacRuleModal
        modalStatus={modalStatus}
        changeModalStatus={changeModalStatus}
        selectedMacRule={selectedMacRule}
        setSelectedMacRule={setSelectedMacRule}
      />
    </>
  )
}

export default Acl;