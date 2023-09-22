import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// UI

// Component
import { RadioButton, DropdownWithCheckbox } from 'components/';
import Func from '../../../../../Func';

// Context
import { ConfigContext } from '../../../../../../Context';
import { IpsContext } from '../../Context';

// Dummy data
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const Ips = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: ipsState } = useContext(IpsContext);

  // Fake data

  // State
  const [vlans, setVlans] = useState([]);
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  // Side effect
  useEffect(() => {
    setVlans(ipsState.vlans);
    const vlanDropdown = [];
    ipsState.vlans.forEach(vlan => {
      vlanDropdown.push({
        title: vlan.interface,
        value: vlan.interface,
        checked: ipsState.ips.wanAndSelectedVlan.indexOf(vlan.interface) > -1,
      })
    });

    const updatedIps = cloneDeep(ipsState.ips);
    updatedIps.wanAndSelectedVlan = vlanDropdown;
    setForm(updatedIps);
  }, [ipsState.ips]);

  if (!form) {
    return <Func title='IPS' />;
  }

  const isProfilePath = !!configState.profile;
  const isNotStandalone = configState.useProfileConfig ? true : false;
  const isUseProfileConfig = !isProfilePath && isNotStandalone;

  return (
    <>
      <Func title='IPS'>
        <div className='sub-title mt-4 mb-4'>Intrusion detection / prevention</div>
        <div className='form-group'>
          <div className='form-title form-title--large-width form-title--indent'>Intrusion detection</div>
          <div className='form-field form-field--horizontal'>
            {
              isUseProfileConfig ? (
                <>
                  {form.intrusionDetection ? 'Enable' : 'Disable'}
                </>
              ) : (
                <>
                  <RadioButton
                    id='intrusion-detection-enable'
                    name='intrusionDetection'
                    label='Enable'
                    hasRightMargin={true}
                    checked={form.intrusionDetection}
                    onChange={() => changeValue('intrusionDetection', true)}
                  />
                  <RadioButton
                    id='intrusion-detection-disable'
                    name='intrusionDetection'
                    label='Disable'
                    hasRightMargin={true}
                    checked={!form.intrusionDetection}
                    onChange={() => changeValue('intrusionDetection', false)}
                  />
                </>
              )
            }
          </div>
        </div>
        <div className='form-group'>
          <div className='form-title form-title--large-width form-title--indent'>Intrusion prevention</div>
          <div className='form-field form-field--horizontal'>
            {
              isUseProfileConfig ? (
                <>
                  {form.intrusionPrevention ? 'Enable' : 'Disable'}
                </>
              ) : (
                <>
                  <RadioButton
                    id='intrusion-prevention-enable'
                    name='intrusionPrevention'
                    label='Enable'
                    hasRightMargin={true}
                    checked={form.intrusionPrevention}
                    onChange={() => changeValue('intrusionPrevention', true)}
                  />
                  <RadioButton
                    id='intrusion-prevention-disable'
                    name='intrusionPrevention'
                    label='Disable'
                    hasRightMargin={true}
                    checked={!form.intrusionPrevention}
                    onChange={() => changeValue('intrusionPrevention', false)}
                  />
                </>
              )
            }
          </div>
        </div>
        <div className='sub-title mt-4 mb-4'>IPS / IDS checks active between</div>
        <div className='form-group form-group--align-top'>
          <div className='form-title form-title--large-width form-title--indent'>WAN and selected VLAN</div>
          <div className='form-field'>
            {
              isUseProfileConfig ? (
                <>
                  {
                    form.wanAndSelectedVlan
                      .filter(item => item.checked)
                      .map((item, index) => (
                        <div key={index} className='small-block-margin'>
                          {item.title}
                        </div>
                      ))
                  }
                </>
              ) : (
                <>
                  <DropdownWithCheckbox
                    id='wan-and-selected-vlan-dropdown'
                    type='checkbox'
                    isMiddleSize={true}
                    itemList={form.wanAndSelectedVlan}
                    onChange={walledGarden => changeValue('wanAndSelectedVlan', walledGarden)}
                  />
                </>
              )
            }
          </div>
        </div>
        {
          !isProfilePath && (
            <>
              <div className='sub-title mt-4 mb-4'>IPS status</div>
              <div className='form-group form-title--large-width'>
                <div className='form-title form-title--large-width form-title--indent'>Number of signatures loaded</div>
                <div className='form-field'>
                  {
                    isUseProfileConfig ? (
                      <>
                        {form.numberOfSignaturesLoaded}
                      </>
                    ) : (
                      <>
                        {form.numberOfSignaturesLoaded}
                      </>
                    )
                  }
                </div>
              </div>
            </>
          )
        }
      </Func >
    </>
  )
}

export default Ips;