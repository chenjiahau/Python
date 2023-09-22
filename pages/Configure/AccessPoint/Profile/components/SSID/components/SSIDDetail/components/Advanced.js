import { useState, useEffect, useContext } from 'react';
import { cloneDeep } from 'lodash';

// Component
import { RadioButton, Input } from 'components/';

// Context
import DataContext from '../../../../../DataContext';

// Dummy data & util
import { getChangeValueFn } from 'dummy/utils/changeValue';
import Button from "../../../../../../../../../components/Button";

const generateAdvancedData = () => {
  return cloneDeep({
    clientLimit: false,
    maxClients: 64,
    maxAllowedClientRetries: 6,
    maxUpstream: 0,
    maxDownstream: 0,
    maxClientUpstream: 0,
    maxClientDownstream: 0,
    forwardBonjourPkts: false,
    igmpSnooping: false,
    maxMulticastIngress: 0,
    rtsThreshold: 2347,
    forceRoaming: false,
    signalStrengthThreshold: -70,
    weakSignalException: true,
    weakRssiClientAssociationAttempts: false
  });
}

const Advanced = () => {
  const ctx = useContext(DataContext);

  // Faker API data
  const fakeAdvancedData = generateAdvancedData();

  // Stat
  const [form, setForm] = useState();

  // Method
  const changeValue = getChangeValueFn(form, setForm);

  // Side effect
  useEffect(() => {
    const data = {
      clientLimit: {
        value: fakeAdvancedData.clientLimit,
      },
      maxClients: {
        value: fakeAdvancedData.maxClients,
      },
      maxAllowedClientRetries: {
        value: fakeAdvancedData.maxAllowedClientRetries,
      },
      maxUpstream: {
        value: fakeAdvancedData.maxUpstream,
      },
      maxDownstream: {
        value: fakeAdvancedData.maxDownstream,
      },
      maxClientUpstream: {
        value: fakeAdvancedData.maxClientUpstream,
      },
      maxClientDownstream: {
        value: fakeAdvancedData.maxClientDownstream,
      },
      forwardBonjourPkts: {
        value: fakeAdvancedData.forwardBonjourPkts,
      },
      igmpSnooping: {
        value: fakeAdvancedData.igmpSnooping,
      },
      maxMulticastIngress: {
        value: fakeAdvancedData.maxMulticastIngress,
      },
      rtsThreshold: {
        value: fakeAdvancedData.rtsThreshold,
      },
      forceRoaming: {
        value: fakeAdvancedData.forceRoaming,
      },
      signalStrengthThreshold: {
        value: fakeAdvancedData.signalStrengthThreshold,
      },
      weakSignalException: {
        value: fakeAdvancedData.weakSignalException,
      },
      weakRssiClientAssociationAttempts: {
        value: fakeAdvancedData.weakRssiClientAssociationAttempts,
      },
    };

    setForm(data);
    ctx.updateSsidAdvanced(data);
    ctx.updateChangedSsidAdvanced(data);
  }, []);

  useEffect(() => {
    ctx.updateChangedSsidAdvanced(form);
  }, [form]);

  return (
    <>
      {
        form && (
          <div className="tab-container-border">
            <div className="form-groups">
              {/* Client limit */}
              <div className='form-title'>
                Client limit
              </div>
              <div className='form-field form-field--horizontal'>
                <RadioButton
                  id="client-limit-enable"
                  name="clientLimit"
                  label="Enable"
                  hasRightMargin={true}
                  checked={form.clientLimit.value}
                  onChange={e => changeValue(e.target.name, true)}
                />
                <RadioButton
                  id="client-limit-disable"
                  name="clientLimit"
                  label="Disable"
                  checked={!form.clientLimit.value}
                  onChange={e => changeValue(e.target.name, false)}
                />
              </div>


              {/* Max clients */}
              {
                form.clientLimit.value && (
                  <>
                    <div className='form-title form-title--indent required'>
                      Max clients
                    </div>
                    <div className='form-field form-field--horizontal'>
                      <Input
                        type="number"
                        name="maxClients"
                        isMiddleSize={true}
                        placeholder="1-64"
                        autoComplete="new-email"
                        value={form.maxClients.value}
                        onChange={e => changeValue(e.target.name, e.target.value)}
                      />
                    </div>
                  </>
                )
              }

              {/* Max allowed client retries */}
              {
                form.clientLimit.value && (
                  <>
                    <div className='form-title form-title--indent required'>
                      Max allowed client retries
                    </div>
                    <div className='form-field form-field--horizontal'>
                      <Input
                        type="number"
                        name="maxAllowedClientRetries"
                        isMiddleSize={true}
                        placeholder="0-10"
                        autoComplete="new-email"
                        value={form.maxAllowedClientRetries.value}
                        onChange={e => changeValue(e.target.name, e.target.value)}
                      />
                    </div>
                  </>
                )
              }

              {/* Max upstream */}
              <div className='form-title required'>
                Max upstream
              </div>
              <div className='form-field form-field--horizontal'>
                <Input
                  type="number"
                  name="maxUpstream"
                  isMiddleSize={true}
                  placeholder="0-900000"
                  autoComplete="new-email"
                  value={form.maxUpstream.value}
                  onChange={e => changeValue(e.target.name, e.target.value)}
                />
                <div>Kbps</div>
              </div>

              {/* Max downstream */}
              <div className='form-title required'>
                Max downstream
              </div>
              <div className='form-field form-field--horizontal'>
                <Input
                  type="number"
                  name="maxDownstream"
                  isMiddleSize={true}
                  placeholder="0-900000"
                  autoComplete="new-email"
                  value={form.maxDownstream.value}
                  onChange={e => changeValue(e.target.name, e.target.value)}
                />
                <div>Kbps</div>
              </div>

              {/* Max client upstream */}
              <div className='form-title required'>
                Max client upstream
              </div>
              <div className='form-field form-field--horizontal'>
                <Input
                  type="number"
                  name="maxClientUpstream"
                  isMiddleSize={true}
                  placeholder="0-900000"
                  autoComplete="new-email"
                  value={form.maxClientUpstream.value}
                  onChange={e => changeValue(e.target.name, e.target.value)}
                />
                <div>Kbps</div>
              </div>

              {/* Max client downstream */}
              <div
                className='form-title required'
              >
                Max client downstream
              </div>
              <div className='form-field form-field--horizontal'>
                <Input
                  type="number"
                  name="maxClientDownstream"
                  isMiddleSize={true}
                  placeholder="0-900000"
                  autoComplete="new-email"
                  value={form.maxClientDownstream.value}
                  onChange={e => changeValue(e.target.name, e.target.value)}
                />
                <div>Kbps</div>
              </div>

              {/* Forward Bonjour pkts */}
              <div className='form-title'>
                Forward Bonjour pkts
              </div>
              <div className='form-field form-field--horizontal'>
                <RadioButton
                  id="forward-bonjour-enable"
                  name="forwardBonjourPkts"
                  label="Enable"
                  hasRightMargin={true}
                  checked={form.forwardBonjourPkts.value}
                  onChange={e => changeValue(e.target.name, true)}
                />
                <RadioButton
                  id="forward-bonjour-disable"
                  name="forwardBonjourPkts"
                  label="Disable"
                  checked={!form.forwardBonjourPkts.value}
                  onChange={e => changeValue(e.target.name, false)}
                />
              </div>

              {/* IGMP snooping */}
              <div className='form-title'>
                IGMP snooping
              </div>
              <div className='form-field form-field--horizontal'>
                <RadioButton
                  id="igmp-snooping-enable"
                  name="igmpSnooping"
                  label="Enable"
                  hasRightMargin={true}
                  checked={form.igmpSnooping.value}
                  onChange={e => changeValue(e.target.name, true)}
                />
                <RadioButton
                  id="igmp-snooping-disable"
                  name="igmpSnooping"
                  label="Disable"
                  checked={!form.igmpSnooping.value}
                  onChange={e => changeValue(e.target.name, false)}
                />
              </div>

              {/* Max multicast ingress */}
              <div className='form-title required'>
                Max multicast ingress
              </div>
              <div className='form-field form-field--horizontal'>
                <Input
                  type="number"
                  name="maxMulticastIngress"
                  isMiddleSize={true}
                  placeholder="0-900000"
                  autoComplete="new-email"
                  value={form.maxMulticastIngress.value}
                  onChange={e => changeValue(e.target.name, e.target.value)}
                />
                <div>Kbps</div>
              </div>

              {/* RTS threshold */}
              <div className='form-title required'>
                RTS threshold
              </div>
              <div className='form-field form-field--horizontal'>
                <Input
                  name="rtsThreshold"
                  type="number"
                  isMiddleSize={true}
                  placeholder="256-2347"
                  autoComplete="new-email"
                  value={form.rtsThreshold.value}
                  onChange={e => changeValue(e.target.name, e.target.value)}
                />
                <div>Bytes</div>
              </div>

              {/* Force roaming */}
              <div className='form-title'>
                Force roaming
              </div>
              <div className='form-field form-field--horizontal'>
                <RadioButton
                  id="force-roaming-enable"
                  name="forceRoaming"
                  label="Enable"
                  hasRightMargin={true}
                  checked={form.forceRoaming.value}
                  onChange={e => changeValue(e.target.name, true)}
                />
                <RadioButton
                  id="force-roaming-disable"
                  name="forceRoaming"
                  label="Disable"
                  checked={!form.forceRoaming.value}
                  onChange={e => changeValue(e.target.name, false)}
                />
              </div>

              {/* Signal Strength Threshold */}
              {
                form.forceRoaming.value && (
                  <>
                    <div className='form-title form-title--indent required'>
                      Signal Strength Threshold
                    </div>
                    <div className='form-field form-field--horizontal'>
                      <Input
                        name="signalStrengthThreshold"
                        type="number"
                        isMiddleSize={true}
                        placeholder="-100-0"
                        autoComplete="new-email"
                        value={form.signalStrengthThreshold.value}
                        onChange={e => changeValue(e.target.name, e.target.value)}
                      />
                      <div>dBm</div>
                    </div>
                  </>
                )
              }

              {/* Weak Signal Exception */}
              {
                form.forceRoaming.value && (
                  <>
                    <div className='form-title form-title--indent required'>
                      Weak Signal Exception
                    </div>
                    <div className='form-field form-field--horizontal'>
                      <RadioButton
                        id="weak-signal-exception-enable"
                        name="weakSignalException"
                        label="Enable"
                        hasRightMargin={true}
                        checked={form.weakSignalException.value}
                        onChange={e => changeValue(e.target.name, true)}
                      />
                      <RadioButton
                        id="weak-signal-exception-disable"
                        name="weakSignalException"
                        label="Disable"
                        checked={!form.weakSignalException.value}
                        onChange={e => changeValue(e.target.name, false)}
                      />
                    </div>
                  </>
                )
              }

              {/* Weak RSSI Client Association Attempts */}
              {
                form.forceRoaming.value && (
                  <>
                    <div className='form-title form-title--indent required'>
                      Weak RSSI Client Association Attempts
                    </div>
                    <div className='form-field form-field--horizontal'>
                      <Input
                        name="weakRssiClientAssociationAttempts"
                        type="number"
                        isMiddleSize={true}
                        placeholder="1-10"
                        autoComplete="new-email"
                        value={form.weakRssiClientAssociationAttempts.value}
                        onChange={e => changeValue(e.target.name, e.target.value)}
                      />
                    </div>
                  </>
                )
              }
            </div>

            <div className='apply-btn-group'>
              <Button
                label='Cancel'
                className='btn-cancel me-3'
                onClick={() => { console.log('Click on Cancel') }}
              />
              <Button
                label='Save'
                className='btn-submit'
                onClick={() => { }}
              />
            </div>
          </div>
        )
      }
    </>
  );
}

export default Advanced;