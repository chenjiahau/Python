import mainStyle from '../../../settings.module.scss';

import { useState, useEffect } from 'react';

// Component
import { RadioButton } from 'components/';

// Fake data
import { generateJumbFrameData } from 'dummy/data/switch/basic/jumbo-frame';
import { getChangeValueFn } from 'dummy/utils/changeValue';

const JumboFrame = () => {
  // Fake data
  const fakeJumbFrame = generateJumbFrameData();

  // State
  const [form, setForm] = useState(null);

  // Method
  const changeValue = getChangeValueFn(form, setForm);

  // Side effect
  useEffect(() => {
    const updatedForm = {
      state: {
        value: fakeJumbFrame.enable
      }
    };
    setForm(updatedForm);
  }, []);

  if (!form) {
    return;
  }

  return (
    <>
      <div className='text-title'>JUMBO FRAME CONFIGURATION</div>
      <div className={mainStyle['detail']} >
        <div>
          <div className='form-title'>Jumbo Frame</div>
        </div>
        <div>
          <div className={`${mainStyle['block']} ${mainStyle['two-column-block']}`}>
            <div className='form-field--horizontal'>
              <RadioButton
                id='enableJumbFrame'
                name='jumpFrameState'
                label="Enable"
                checked={form.state.value}
                onChange={() => changeValue('state', true)}
              />
              <div style={{ width: '20px' }}></div>
              <RadioButton
                id='disableJumbFrame'
                name='jumpFrameState'
                label="Disable"
                checked={!form.state.value}
                onChange={() => changeValue('state', false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JumboFrame;