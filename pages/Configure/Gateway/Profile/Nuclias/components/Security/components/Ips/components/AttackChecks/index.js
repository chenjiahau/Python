import mainStyle from '../../../../../../../config.module.scss';

import { useState, useEffect, useContext } from 'react';
import { Table, ButtonGroup } from 'react-bootstrap';
import { cloneDeep } from 'lodash';

// UI

// Component
import { Input, RadioButton } from 'components/';
import Func from '../../../../../Func';

// Context
import { ConfigContext } from '../../../../../../Context';
import { IpsContext } from '../../Context';

// Dummy data
import { getChangeValueEnhanceFn } from 'dummy/utils/changeValue';

const AttackChecks = () => {
  const { state: configState } = useContext(ConfigContext);
  const { state: ipsState } = useContext(IpsContext);

  // Fake data

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueEnhanceFn(form, setForm);

  // Side effect
  useEffect(() => {
    setForm(cloneDeep(ipsState.attackChecks));
  }, [ipsState.attackChecks]);

  if (!form) {
    return <Func title='ATTACK CHECKS' />;
  }

  const isProfilePath = !!configState.profile;
  const isNotStandalone = configState.useProfileConfig ? true : false;
  const isUseProfileConfig = !isProfilePath && isNotStandalone;

  return (
    <>
      <Func title='ATTACK CHECKS'>
        <div className='sub-title mt-4 mb-4'>WAN security checks</div>
        <div className='form-group'>
          <div className='form-title form-title--large-width form-title--indent'>Intrusion detection</div>
          <div className='form-field form-field--horizontal'>
            {
              isUseProfileConfig ? (
                <>
                  {form.stealthMode ? 'Enable' : 'Disable'}
                </>
              ) : (
                <>
                  <RadioButton
                    id='stealth-mode-enable'
                    name='stealthMode'
                    label='Enable'
                    hasRightMargin={true}
                    checked={form.stealthMode}
                    onChange={() => changeValue('stealthMode', true)}
                  />
                  <RadioButton
                    id='stealth-mode-disable'
                    name='stealthMode'
                    label='Disable'
                    hasRightMargin={true}
                    checked={!form.stealthMode}
                    onChange={() => changeValue('stealthMode', false)}
                  />
                </>
              )
            }
          </div>
        </div>
        <div className='sub-title mt-4 mb-4'>LAN security checks</div>
        <div className='form-group form-group--align-top'>
          <div className='form-title  form-title--large-width form-title--indent'>Block UDP flood</div>
          <div className='form-field form-field--horizontal'>
            {
              isUseProfileConfig ? (
                <>
                  {form.blockUdpFlood ? 'Enable' : 'Disable'}
                </>
              ) : (
                <>
                  <RadioButton
                    id='block-udp-flood-enable'
                    name='blockUdpFlood'
                    label='Enable'
                    hasRightMargin={true}
                    checked={form.blockUdpFlood}
                    onChange={() => changeValue('blockUdpFlood', true)}
                  />
                  <RadioButton
                    id='block-udp-flood-disable'
                    name='blockUdpFlood'
                    label='Disable'
                    hasRightMargin={true}
                    checked={!form.blockUdpFlood}
                    onChange={() => changeValue('blockUdpFlood', false)}
                  />
                </>
              )
            }
          </div>
        </div>
        <div className='sub-title mt-4 mb-4'>DoS Attacks</div>
        <div className='form-group form-group--align-top'>
          <div className='form-title  form-title--large-width form-title--indent'>SYN flood detect rate</div>
          <div className='form-field form-field--horizontal'>
            {
              isUseProfileConfig ? (
                <>
                  {form.synFloodDetectRate} max / sec
                </>
              ) : (
                <>
                  <Input
                    type='number'
                    isMiddleSize={true}
                    placeholder='1-10000'
                    autoComplete='new-email'
                    value={form.synFloodDetectRate}
                    onChange={(e) => changeValue('synFloodDetectRate', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>max / sec</div>
                </>
              )
            }
          </div>
        </div>
        <div className='form-group form-group--align-top'>
          <div className='form-title  form-title--large-width form-title--indent'>Echo storm</div>
          <div className='form-field form-field--horizontal'>
            {
              isUseProfileConfig ? (
                <>
                  {form.echoStorm} Ping pkts. / sec
                </>
              ) : (
                <>
                  <Input
                    type='number'
                    isMiddleSize={true}
                    placeholder='1-10000'
                    autoComplete='new-email'
                    value={form.echoStorm}
                    onChange={(e) => changeValue('echoStorm', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>Ping pkts. / sec</div>
                </>
              )
            }
          </div>
        </div>
        <div className='form-group form-group--align-top'>
          <div className='form-title  form-title--large-width form-title--indent'>ICMP flood</div>
          <div className='form-field form-field--horizontal'>
            {
              isUseProfileConfig ? (
                <>
                  {form.icmpFlood} ICMP pkts. / sec
                </>
              ) : (
                <>
                  <Input
                    type='number'
                    isMiddleSize={true}
                    placeholder='1-10000'
                    autoComplete='new-email'
                    value={form.icmpFlood}
                    onChange={(e) => changeValue('icmpFlood', e.target.value)}
                    onFocus={() => { }}
                    onBlur={() => { }}
                  />
                  <div>ICMP pkts. / sec</div>
                </>
              )
            }
          </div>
        </div>
      </Func >
    </>
  )
}

export default AttackChecks;