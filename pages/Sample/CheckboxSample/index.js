import Checkbox from "components/Checkbox";
import { useState } from "react";

const defaultCheckboxesStatus = {
  cb1: true,
  cb2: false,
  cb3: false,
};

const CheckboxSample = () => {
  const [checkboxesStatus, setCheckboxesStatus] = useState({ ...defaultCheckboxesStatus });

  const toggleCheckboxes = type => {
    const newCheckboxesStatus = { ...checkboxesStatus };
    newCheckboxesStatus[type] = !newCheckboxesStatus[type];
    setCheckboxesStatus(newCheckboxesStatus);
  };

  return (
    <div className="mb-5">
      <h3>Checkbox</h3>
      <Checkbox
        id="cb1"
        label="Stay logged In 1"
        checked={!!checkboxesStatus['cb1']}
        onChange={() => toggleCheckboxes('cb1')}
      />
      <Checkbox
        id="cb2"
        label="Stay logged In 2"
        checked={!!checkboxesStatus['cb2']}
        onChange={() => toggleCheckboxes('cb2')}
      />
      <Checkbox id="cb3" label="Stay logged In 3" disabled />
    </div>
  )
};

export default CheckboxSample;
