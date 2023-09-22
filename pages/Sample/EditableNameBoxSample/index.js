import { useState } from 'react';
import EditableNameBox from 'components/EditableNameBox';

const EditableNameBoxSample = () => {
  const [profileName, setProfileName] = useState('D-Link');

  return (
    <div className='mb-5'>
      <h3>Edit name box</h3>
      <div className='form-group'>
        <div className='form-title'>Name</div>
        <div className='form-field'>
          <EditableNameBox
            value={profileName}
            inputFieldOnKeyDown={e => setProfileName(e.target.value)}
            inputFieldOnChange={e => console.log(e.target.value)}
            inputFieldOnClick={() => console.log('input click')}
          />
        </div>
      </div>

      <div className='form-group'>
        <div className='form-title'>Name disabled</div>
        <div className='form-field'>
          <EditableNameBox
            value={profileName}
            inputFieldOnKeyDown={e => setProfileName(e.target.value)}
            inputFieldOnChange={e => console.log(e.target.value)}
            inputFieldOnClick={() => {}}
            disabled
          />
        </div>
      </div>
    </div>
  )
};

export default EditableNameBoxSample;
