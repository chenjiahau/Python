import { useState } from 'react';
import { cloneDeep } from 'lodash';

import Input from 'components/Input';
import LinkerWithA from 'components/LinkerWithA';
import DropdownWithItem from 'components/DropdownWithItem';

const defaultInputValue = {
  normal1: '',
  normal2: '',
  normal3: '',
  normal4: ''
};

const defaultDeviceList = [
  { title: 'DEVICEUID001', isActive: true },
  { title: 'DEVICEUID002', isActive: false },
  { title: 'DEVICEUID003', isActive: false }
]

const InputSample = () => {
  const [inputValue, setInputValue] = useState(cloneDeep(defaultInputValue));
  const [deviceList, setDeviceList] = useState(cloneDeep(defaultDeviceList));

  const onChangeInputValue = (type, value) => {
    const newInputValue = { ...inputValue };
    newInputValue[type] = value;
    setInputValue(newInputValue);
  };

  const onChangeDropdownValue = (type, device) => {
    const newDeviceList = cloneDeep(deviceList);
    newDeviceList.forEach(deviceItem => {
      deviceItem.isActive = deviceItem.title === device.title;
    })
    setDeviceList(newDeviceList);

    const newInputValue = { ...inputValue };
    newInputValue[type] = device.title;
    setInputValue(newInputValue);
  };

  return (
    <div className='mb-5'>
      <h3>Normal input</h3>
      <div className='form-group'>
        <div className='form-title'>Normal</div>
        <div className='form-field'>
          <Input
            type='text'
            placeholder='Email'
            value={inputValue['normal1']}
            onChange={e => onChangeInputValue('normal1', e.target.value)}
            onFocus={() => {}}
            onBlur={() => {}}
          />
        </div>
      </div>

      <div className='form-group'>
        <div className='form-title'>IsInvalid</div>
        <div className='form-field'>
          <Input
            type='text'
            placeholder='Email'
            value={inputValue['normal2']}
            onChange={e => onChangeInputValue('normal2', e.target.value)}
            onFocus={() => {}}
            onBlur={() => {}}
            isInvalid
          />
        </div>
      </div>

      <div className='form-group'>
        <div className='form-title'>Disabled</div>
        <div className='form-field'>
          <Input
            type='text'
            placeholder='Email'
            disabled
          />
        </div>
      </div>

      <div className='form-group'>
        <div className='form-title'>Dropdown 1</div>
        <div className='form-field'>
          <Input
            type='text'
            placeholder='Device UID'
            dataBsToggleOnInput={true}
            value={inputValue.normal3}
            onChange={e => onChangeInputValue('normal3', e.target.value)}
            dropdownMenuStyle={{minWidth: '300px'}}
            subContainerOnClick={() => {}}
          >
            <>
              {
                deviceList.map((device, index) => {
                  return (
                    <li
                      key={device.title +'-' + index}
                      onClick={() => onChangeDropdownValue('normal3', device)}
                    >
                      {device.title}
                    </li>
                  );
                })
              }
            </>
          </Input>
        </div>
      </div>

      <div className='form-group'>
        <div className='form-title'>Dropdown 2</div>
        <div className='form-field'>
          <Input
            type='text'
            placeholder='Device UID'
            value={inputValue.normal4}
            onChange={e => onChangeInputValue('normal4', e.target.value)}
            dataBsToggleOnInput={true}
            subContainerOnClick={() => {}}
          >
            <>
              <div className='more-content'>
                <div className='show-more-info'>
                  Showing first 10 of total 116 organizations.
                </div>
                <LinkerWithA
                  label="more"
                  href="#"
                  className="linker-blue show-more-btn text-decoration-underline"
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Click on more');
                  }}
                ></LinkerWithA>
              </div>
              {
                deviceList.map((device, index) => {
                  return (
                    <li
                      key={device.title +'-' + index}
                      onClick={() => onChangeDropdownValue('normal4', device)}
                    >
                      {device.title}
                    </li>
                  );
                })
              }
            </>
          </Input>
        </div>
      </div>

    </div>
  )
};

export default InputSample;
