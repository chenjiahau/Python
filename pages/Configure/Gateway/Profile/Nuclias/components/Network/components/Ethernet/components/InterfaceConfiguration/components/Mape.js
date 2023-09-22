import { useState } from 'react';
import { Row, Col } from 'react-bootstrap';

// Component
import { DropdownWithItem, Input, TooltipDialog, RadioButton } from 'components/';

// Dummy data & util
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const Mape = (props) => {
  const { form, setForm, changeMapeServiceProvider } = props;
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  return (
    <>
      <div className='sub-title mt-4 mb-4'>MAP-E configuration</div>
      {/* Service provider */}
      <div>
        <div className='modal-form-title'>
          Service provider
          <TooltipDialog
            className='ms-1 me-1'
            title='Please note that some service providers are only available in specific countries.'
          />
        </div>
        <DropdownWithItem
          type='normal'
          selectedItem={form.serviceProvider.find(item => item.isActive)}
          itemList={form.serviceProvider}
          onClick={item => changeMapeServiceProvider(item)}
        />
      </div>

      {/* IPv4 address mode */}
      {
        form.serviceProvider[1].isActive && (
          <>
            <div className='mt-2'>
              <div className='modal-form-title'>IPv4 address mode</div>
              <div className='form-field--horizontal'>
                <RadioButton
                  id='ipv4-address-mode-enable'
                  name='ipv4AddressModelEnable'
                  label='Dynamic IP'
                  hasRightMargin={true}
                  checked={form.dynamicIPv4Address}
                  onChange={() => changeValue('dynamicIPv4Address', true)}
                />
                <RadioButton
                  id='ipv4-address-mode-disable'
                  name='ipv4AddressModelDisable'
                  label='Fixed'
                  checked={!form.dynamicIPv4Address}
                  onChange={() => changeValue('dynamicIPv4Address', false)}
                />
              </div>
            </div>
            {
              !form.dynamicIPv4Address && (
                <div className='mt-2'>
                  <div className='modal-form-title required'>Global IPv4 address</div>
                  <Input
                    type='text'
                    value={form.globalIpv4Address}
                    placeholder='e.g. 1.1.1.1'
                    onChange={e => changeValue('globalIpv4Address', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                </div>
              )
            }
          </>
        )
      }
    </>
  )
}

export default Mape;