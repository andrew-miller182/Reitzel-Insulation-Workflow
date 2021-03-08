import React, {useState} from "react";

function Input(props) {
  const [inputType] = useState(props.type)
  const [inputValue, setInputValue] = useState('')

  function handleChange(event){
    setInputValue(event.target.value);
    if(props.onChange) props.onChange(inputValue)
  }
  return (
    <>
      <input type={inputType} value={inputValue} name={props.name} placeholder={props.placeholder} onChange={props.handleChange} class="ant-input"/>
    </>
  );
}
export default Input;
