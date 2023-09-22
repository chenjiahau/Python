import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { cloneDeep } from 'lodash';

// Component
import { Button, TooltipDialog, DropdownWithItem, RadioButton } from 'components/';

// Context
import DataContext from '../../../../../../../DataContext';

// Dummy data & util
import { getIpAclList } from 'dummy/data/ip-acl';
import { generateIpFiltering } from 'dummy/data/access-controller';
import { getChangeValueFn } from 'dummy/utils/changeValue';

const IpFiltering = (props) => {
  const {
    modalStatus,
    changeModalStatus,
  } = props;

  const ctx = useContext(DataContext);

  // Faker API data
  const ipFiltering = generateIpFiltering();

  // State
  const [form, setForm] = useState();

  // Method
  const changeValue = getChangeValueFn(form, setForm);

  const changeIpFilterStatus = (updatedForm, field, value) => {
    updatedForm[field].value = value;

    if (value) {
      updatedForm.ipAclPolicy.value = true;
      updatedForm.ipAcl.selected = null;
      updatedForm.ipAcl.list = getIpAclList(false);
    } else {
      updatedForm.ipAclPolicy.value = false;
      updatedForm.ipAcl.selected = null;
      updatedForm.ipAcl.list = getIpAclList(false);
    }
  }

  // Side effect
  useEffect(() => {
    const data = {
      status: {
        value: ipFiltering.status
      },
      ipAclPolicy: {
        value: false
      },
      ipAcl: {
        selected: null,
        list: null
      }
    };

    setForm(data);
    ctx.updateSsidIpFiltering(data);
    ctx.updateChangedSsidIpFiltering(data);
  }, []);

  useEffect(() => {
    ctx.updateChangedSsidIpFiltering(form);
  }, [form]);

  return (
    <>
      {
        form && (
          <div className="col-block">
            <div className="form-group mb-2">
              <div className="text-title-block">
                <div className="text-title text-title-underline">IP FILTERING</div>
                <div className="text-title-tip">
                  <TooltipDialog
                    className="ms-1 me-1"
                    placement="right"
                    title="Restrict client access to external IPs."
                  />
                </div>
              </div>
            </div>

            {/* IP filtering */}
            <div className="form-group">
              <div className='form-title form-title--small-width'>
                IP filtering
              </div>
              <div className='form-field form-field--horizontal'>
                <RadioButton
                  id="ip-filtering-enable"
                  name="ipFilteringEnable"
                  label="Enable"
                  hasRightMargin={true}
                  checked={form.status.value}
                  onChange={() => changeValue('status', true, changeIpFilterStatus)}
                />
                <RadioButton
                  id="ip-filtering-disable"
                  name="ipFilteringDisable"
                  label="Disable"
                  checked={!form.status.value}
                  onChange={() => changeValue('status', false, changeIpFilterStatus)}
                />
              </div>
            </div>

            {/* IP ACL policy */}
            <div className="form-group">
              <div className='form-title form-title--small-width'>
                IP ACL policy
              </div>
              <div className='form-field form-field--horizontal'>
                <RadioButton
                  id="ip-acl-policy-enable"
                  name="ipAclPolicyEnable"
                  label="Allow"
                  disabled={!form.status.value}
                  hasRightMargin={true}
                  checked={form.ipAclPolicy.value}
                  onChange={() => changeValue('ipAclPolicy', true)}
                />
                <RadioButton
                  id="ip-acl-policy-disable"
                  name="ipAclPolicyDisable"
                  label="Allow"
                  disabled={!form.status.value}
                  checked={!form.ipAclPolicy.value}
                  onChange={() => changeValue('ipAclPolicy', false)}
                />
              </div>
            </div>

            {/* IP ACL name */}
            <div className="form-group form-group--align-top">
              <div className='form-title form-title--small-width required'>
                IP ACL name
              </div>
              <div className='form-field form-field--horizontal'>
                <DropdownWithItem
                  type="normal"
                  isMiddleSize={true}
                  disabled={!form.status.value}
                  selectedItem={form.ipAcl.selected}
                  itemList={form.ipAcl.list}
                  onClick={radius => changeValue('ipAcl', radius)}
                />
                <div>
                  <Button
                    label="Add an IP ACL"
                    disabled={!form.status.value}
                    className='btn-grey-blue'
                    onClick={() => changeModalStatus(modalStatus.addIpAcl.self, true)}
                  />
                </div>
                <div>
                  <Link to="/cloud/configure/access-point/ip-acls" className='text-decoration-underline'>IP ACL</Link>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default IpFiltering;