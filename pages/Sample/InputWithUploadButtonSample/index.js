import InputWithUploadButton from "components/InputWithUploadButton";
import { useState } from "react";

const defaultInputValue = {
  uploadBtn1: '',
  uploadBtn2: '',
};

const InputWithUploadButtonSample = () => {
  const [inputValue, setInputValue] = useState({ ...defaultInputValue });

  return (
    <div className="mb-5">
      <h3>Search input with icon button</h3>
      <InputWithUploadButton
        placeholder='this is placeholder'
        value={inputValue.uploadBtn1}
        onClick={e => {}}
        onChange={e => setInputValue({...inputValue, uploadBtn1: e.target.value })}
      />
      <InputWithUploadButton
        placeholder='this is placeholder'
        value={inputValue.uploadBtn2}
        disabled
      />
    </div>
  )
};

export default InputWithUploadButtonSample;
