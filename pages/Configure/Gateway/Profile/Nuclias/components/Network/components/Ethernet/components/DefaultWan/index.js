import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { DropdownWithItem } from 'components/';

import Func from '../../../../../Func';

// Context
import { ConfigContext } from '../../../../../../Context';
import { EthernetContext } from '../../Context';

// Dummy data
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const DefaultWan = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: ethernetState } = useContext(EthernetContext);

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  // Side effect
  useEffect(() => {
    if (!ethernetState.defaultWan) {
      return;
    }

    const updatedForm = {
      ipv4: [],
      ipv6: [],
    };

    const { ipv4, ipv6 } = ethernetState.defaultWan;
    ipv4.forEach((iface, index) => {
      updatedForm.ipv4.push({
        title: iface.interface,
        isActive: iface.state,
      });
    });
    ipv6.forEach((iface, index) => {
      updatedForm.ipv6.push({
        title: iface.interface,
        isActive: iface.state,
      });
    });

    setForm(updatedForm);
  }, [ethernetState.defaultWan]);

  if (!form) {
    return (
      <Func title='DEFAULT WAN CONFIGURATION' />
    );
  }

  const isProfilePath = !!configState.profile;
  const isNotStandalone = configState.useProfileConfig ? true : false;
  const ipv4 = form.ipv4.find(item => item.isActive);
  const ipv6 = form.ipv6.find(item => item.isActive);

  return (
    <>
      <Func title='DEFAULT WAN CONFIGURATION'>
        <div className='form-groups'>
          {/* IPv4 default WAN */}
          <div className='form-title'>
            IPv4 default WAN
          </div>
          <div className='form-field form-field--dropdown-middle-width'>
            {
              ((isProfilePath) || (!isProfilePath && !isNotStandalone)) ? (
                <DropdownWithItem
                  type='normal'
                  isMiddleSize={true}
                  selectedItem={form.ipv4.find(item => item.isActive)}
                  itemList={form.ipv4}
                  onClick={item => changeValue('ipv4', item)}
                />
              ) : (
                <>
                  {ipv4.title}
                </>
              )
            }
          </div>
          {/* IPv6 default WAN */}
          <div className='form-title'>
            IPv6 default WAN
          </div>
          <div className='form-field form-field--dropdown-middle-width'>
            {
              ((isProfilePath) || (!isProfilePath && !isNotStandalone)) ? (
                <DropdownWithItem
                  type='normal'
                  isMiddleSize={true}
                  selectedItem={form.ipv6.find(item => item.isActive)}
                  itemList={form.ipv6}
                  onClick={item => changeValue('ipv6', item)}
                />
              ) : (
                <>
                  {ipv6.title}
                </>
              )
            }
          </div>
        </div>
      </Func >
    </>
  )
}

export default DefaultWan;