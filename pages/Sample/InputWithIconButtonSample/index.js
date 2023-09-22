import InputWithIconButton from "components/InputWithIconButton";
import { useState } from "react";

const defaultInputValue = {
  iconBtn1: '',
  iconBtn2: '',
};

const InputWithIconButtonSample = () => {
  const [inputValue, setInputValue] = useState({ ...defaultInputValue });
  const onChangeInputValue = (type, value) => {
    const newInputValue = { ...inputValue };
    newInputValue[type] = value;
    setInputValue(newInputValue);
  };

  return (
    <div className="mb-5">
      <h3>Search input with icon button</h3>
      <InputWithIconButton
        type="search"
        placeholder="Search"
        label="Host name"
        autoComplete="new-search1"
        buttonClassName="icon-search-enter"
        value={inputValue['iconBtn1']}
        onChange={e => onChangeInputValue('iconBtn1', e.target.value)}
        onFocus={() => {}}
        onBlur={() => {}}
        buttonOnClick={() => {
          console.log('click on icon button');
        }}
      />
      <InputWithIconButton
        type="search"
        placeholder="Search"
        label="Host name"
        autoComplete="new-search2"
        buttonClassName="icon-search-enter"
        value={inputValue['iconBtn2']}
        onChange={e => onChangeInputValue('iconBtn2', e.target.value)}
        onFocus={() => {}}
        onBlur={() => {}}
        buttonOnClick={() => {
          console.log('click on invalid icon button');
        }}
        isInvalid
      />
      <InputWithIconButton
        type="search"
        placeholder="Search"
        label="Host name"
        buttonClassName="icon-search-enter"
        disabled
      />
    </div>
  )
};

export default InputWithIconButtonSample;
