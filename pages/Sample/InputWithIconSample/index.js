import { useState } from "react";
import { cloneDeep } from "lodash";

import InputWithIcon from "components/InputWithIcon";

const defaultInputValue = {
  icon1: '',
  icon2: '',
  icon3: ''
};

const defaultDeviceList = [
  { title: 'DEVICEUID001', isActive: true },
  { title: 'DEVICEUID002', isActive: false },
  { title: 'DEVICEUID003', isActive: false }
]

const InputWithIconSample = () => {
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
    <div className="mb-5">
      <h3>Icon input with icon</h3>
      <div className='form-group'>
        <div className='form-title'>Normal</div>
        <div className='form-field'>
          <InputWithIcon
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={inputValue['icon1']}
            onChange={e => onChangeInputValue('icon1', e.target.value)}
            onFocus={() => {}}
            onBlur={() => {}}
            iconTitle="Show password"
            iconClassName="icon-open-eye"
            iconOnClick={() => {
              console.log('click on icon');
            }}
          />
        </div>
      </div>

      <div className='form-group'>
        <div className='form-title'>isInvalid</div>
        <div className='form-field'>
          <InputWithIcon
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            value={inputValue['icon2']}
            onChange={e => onChangeInputValue('icon2', e.target.value)}
            onFocus={() => {}}
            onBlur={() => {}}
            iconTitle="Show password"
            iconClassName="icon-open-eye"
            iconOnClick={() => {
              console.log('click on invalid icon');
            }}
            isInvalid
          />
        </div>
      </div>

      <div className='form-group'>
        <div className='form-title'>disabled</div>
        <div className='form-field'>
          <InputWithIcon
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            disabled
          />
        </div>
      </div>

      <div className='form-group'>
        <div className='form-title'>dropdown 1</div>
        <div className='form-field'>
          <InputWithIcon
            type="text"
            placeholder='Device UID'
            dataBsToggleOnInput={true}
            value={inputValue['icon3']}
            dropdownMenuStyle={{minWidth: '300px'}}
            subContainerOnClick={() => {}}
            onChange={e => onChangeInputValue('icon3', e.target.value)}
          >
            <>
              {
                deviceList.map((device, index) => {
                  return (
                    <li
                      key={device.title +'-' + index}
                      onClick={() => onChangeDropdownValue('icon3', device)}
                    >
                      {device.title}
                    </li>
                  );
                })
              }
            </>
          </InputWithIcon>
        </div>
      </div>

    </div>
  )
};

export default InputWithIconSample;
