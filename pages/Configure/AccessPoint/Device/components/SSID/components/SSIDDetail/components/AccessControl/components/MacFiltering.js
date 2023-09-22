import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// Component
import { Button, TooltipDialog, DropdownWithItem, RadioButton } from 'components/';

// Context
import DataContext from '../../../../../../../DataContext';

// Dummy data & util
import { getRadiusList } from 'dummy/data/radius';
import { getMacAclList } from 'dummy/data/mac-acl';
import { generateMacFiltering } from 'dummy/data/access-controller';
import { getChangeValueFn } from 'dummy/utils/changeValue';

const MacFiltering = (props) => {
  const {
    modalStatus,
    changeModalStatus,
  } = props;

  const ctx = useContext(DataContext);

  // Faker API data
  const macFiltering = generateMacFiltering();

  // State
  const [form, setForm] = useState();

  // Method
  const changeValue = getChangeValueFn(form, setForm);

  const changeMacFilterStatus = (updatedForm, field, value) => {
    updatedForm[field].value = value;

    if (value) {
      updatedForm.filterMode.value = true;

      updatedForm.primaryRadius.list = cloneDeep(getRadiusList(false));
      updatedForm.primaryRadius.selected = null;
      updatedForm.secondaryRadius.list = cloneDeep(getRadiusList(true));
      updatedForm.secondaryRadius.selected = updatedForm.secondaryRadius.list[0];
      updatedForm.macAcl.list = cloneDeep(getMacAclList(false));
      updatedForm.macAcl.selected = null
    } else {
      updatedForm.filterMode.value = null;

      updatedForm.primaryRadius.list = cloneDeep(getRadiusList(false));
      updatedForm.primaryRadius.selected = null;
      updatedForm.secondaryRadius.list = cloneDeep(getRadiusList(true));
      updatedForm.secondaryRadius.selected = null;
      updatedForm.macAcl.list = cloneDeep(getMacAclList(false));
      updatedForm.macAcl.selected = null
    }
  }

  // Side effect
  useEffect(() => {
    const data = {
      status: {
        value: macFiltering.status
      },
      filterMode: {
        value: null
      },
      primaryRadius: {
        selected: null,
        list: null
      },
      secondaryRadius: {
        selected: null,
        list: null
      },
      macAclPolicy: {
        value: macFiltering.macAclPolicy,
      },
      macAcl: {
        selected: null,
        list: null
      },
    };

    setForm(data);
    ctx.updateSsidMacFiltering(data);
    ctx.updateChangedSsidMacFiltering(data);
  }, []);

  useEffect(() => {
    ctx.updateChangedSsidMacFiltering(form);
  }, [form]);

  return (
    <>
      {
        form && (
          <div className="col-block">
            <div className="form-group mb-2">
              <div className="text-title-block">
                <div className="text-title text-title-underline">MAC FILTERING</div>
                <div className="text-title-tip">
                  <TooltipDialog
                    className="ms-1 me-1"
                    placement="right"
                    title="When NAT mode is enabled, the VLAN settings will follow the Management VLAN settings."
                  />
                </div>
              </div>
            </div>

            {/* MAC filtering */}
            <div className="form-group">
              <div className='form-title'>
                MAC filtering
              </div>
              <div className='form-field form-field--horizontal'>
                <RadioButton
                  id="mac-filtering-enable"
                  name="macFilteringEnable"
                  label="Enable"
                  hasRightMargin={true}
                  checked={form.status.value}
                  onChange={() => changeValue('status', true, changeMacFilterStatus)}
                />
                <RadioButton
                  id="mac-filtering-disable"
                  name="macFilteringDisable"
                  label="Disable"
                  checked={!form.status.value}
                  onChange={() => changeValue('status', false, changeMacFilterStatus)}
                />
              </div>
            </div>

            {/* Filtering */}
            {
              !form.status.value && (
                <div className="form-group">
                  <div className='form-title'>
                    Filter
                  </div>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="filter-enable"
                      name="filterEnable"
                      label="RADIUS server"
                      hasRightMargin={true}
                      disabled={true}
                      checked={false}
                      onChange={() => { }}
                    />
                    <RadioButton
                      id="filter-disable"
                      name="filterDisable"
                      label="Disable"
                      disabled={true}
                      checked={false}
                      onChange={() => { }}
                    />
                  </div>
                </div>
              )
            }
            {
              form.status.value && (
                <div className="form-group">
                  <div className='form-title'>
                    Filter
                  </div>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="filter-enable"
                      name="filterEnable"
                      label="RADIUS server"
                      hasRightMargin={true}
                      checked={form.filterMode.value}
                      onChange={() => changeValue('filterMode', true)}
                    />
                    <RadioButton
                      id="filter-disable"
                      name="filterDisable"
                      label="MAC ACLs"
                      checked={!form.filterMode.value}
                      onChange={() => changeValue('filterMode', false)}
                    />
                  </div>
                </div>
              )
            }

            {/* RADIUS server */}
            {
              form.status.value && form.filterMode.value && (
                <>
                  <div className="form-group form-group--align-top">
                    <div className='form-title required'>
                      Primary RADIUS server
                    </div>
                    <div className='form-field form-field--horizontal'>
                      <DropdownWithItem
                        type="normal"
                        isMiddleSize={true}
                        selectedItem={form.primaryRadius.selected}
                        itemList={form.primaryRadius.list}
                        onClick={radius => changeValue('primaryRadius', radius)}
                      />
                      <div>
                        <Button
                          label="Add RADIUS server"
                          className='btn-grey-blue'
                          onClick={() => changeModalStatus(modalStatus.addRadius.self, true)}
                        />
                      </div>
                      <div>
                        <Link to="/cloud/configure/authentication/authentication-servers" className='text-decoration-underline'>RADIUS servers</Link>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className='form-title'>
                      Secondary RADIUS server
                    </div>
                    <div className='form-field form-field--dropdown-middle-width'>
                      <DropdownWithItem
                        type="normal"
                        isMiddleSize={true}
                        selectedItem={form.secondaryRadius.selected}
                        itemList={form.secondaryRadius.list}
                        onClick={radius => changeValue('secondaryRadius', radius)}
                      />
                    </div>
                  </div>
                </>
              )
            }

            {/* MAC ACL policy */}
            {
              !form.status.value && (
                <div className="form-group">
                  <div className='form-title'>
                    MAC ACL policy
                  </div>
                  <div className='form-field form-field--horizontal'>
                    <RadioButton
                      id="mac-acl-policy-enable"
                      name="macAclPolicyEnable"
                      label="Enable"
                      hasRightMargin={true}
                      disabled={true}
                      checked={false}
                      onChange={() => { }}
                    />
                    <RadioButton
                      id="mac-acl-policy-disable"
                      name="macAclPolicyDisable"
                      label="Disable"
                      disabled={true}
                      checked={true}
                      onChange={() => { }}
                    />
                  </div>
                </div>
              )
            }
            {
              form.status.value && !form.filterMode.value && (
                <>
                  <div className="form-group">
                    <div className='form-title'>
                      MAC ACL policy
                    </div>
                    <div className='form-field form-field--horizontal'>
                      <RadioButton
                        id="mac-acl-policy-enable"
                        name="macAclPolicyEnable"
                        label="Allow"
                        hasRightMargin={true}
                        checked={form.macAclPolicy.value}
                        onChange={() => changeValue('macAclPolicy', true)}
                      />
                      <RadioButton
                        id="mac-acl-policy-disable"
                        name="macAclPolicyDisable"
                        label="Deny"
                        checked={!form.macAclPolicy.value}
                        onChange={() => changeValue('macAclPolicy', false)}
                      />
                    </div>
                  </div>
                </>
              )
            }

            {/* MAC ACL name */}
            {
              form.status.value && !form.filterMode.value && (
                <div className="form-group">
                  <div className='form-title required'>
                    MAC ACL name
                  </div>
                  <div className='form-field form-field--horizontal'>
                    <DropdownWithItem
                      type="normal"
                      isMiddleSize={true}
                      selectedItem={form.macAcl.selected}
                      itemList={form.macAcl.list}
                      onClick={macAcl => changeValue('macAcl', macAcl)}
                    />
                    <div>
                      <Button
                        label="Add MAC ACL"
                        className='btn-grey-blue'
                        onClick={() => changeModalStatus(modalStatus.addMacAcl.self, true)}
                      />
                    </div>
                    <div>
                      <Link to="/cloud/configure/mac-acls" className='text-decoration-underline'>MAC ACLs</Link>
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        )
      }
    </>
  );
}

export default MacFiltering;