import RadioButton from "components/RadioButton";
import { useState } from "react";

const defaultRadioStatus = {
  primary: true,
  secondary: false,
};

const RadioButtonSample = () => {
  const [radioStatus, setRadioStatus] = useState({ ...defaultRadioStatus });

  const toggleRadioStatus = (type, status) => {
    const newRadioStatus = { ...radioStatus };
    newRadioStatus[type] = status;
    setRadioStatus(newRadioStatus);
  };

  return (
    <div className="mb-5">
      <h3>Radio button</h3>
      <RadioButton
        id="rb1"
        name="primary-radio-button"
        label="Primary Enable"
        checked={!!radioStatus['primary']}
        onChange={() => toggleRadioStatus('primary', true)}
      />
      <RadioButton
        id="rb2"
        name="primary-radio-button"
        label="Primary Disable"
        checked={!radioStatus['primary']}
        onChange={() => toggleRadioStatus('primary', false)}
      />
      <RadioButton
        id="rb3"
        name="secondary-radio-button"
        label="Secondary Enable"
        checked={!!radioStatus['secondary']}
        onChange={() => toggleRadioStatus('secondary', true)}
      />
      <RadioButton
        id="rb4"
        name="secondary-radio-button"
        label="Secondary Disable"
        checked={!radioStatus['secondary']}
        onChange={() => toggleRadioStatus('secondary', false)}
      />
      <RadioButton id="rb5" label="Disabled radio button" disabled />
    </div>
  )
};

export default RadioButtonSample;
