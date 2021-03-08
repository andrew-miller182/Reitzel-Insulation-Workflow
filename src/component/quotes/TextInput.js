import React, {useState} from "react";

function TextInput(props) {
  const [inputType] = useState(props.type)
  const [inputValue, setInputValue] = useState('')

  function handleChange(event){
    setInputValue(event.target.value);
    if(props.onChange) props.onChange(inputValue)
  }
  return (
    <>
      <input type={inputType} onFocusout={props.onFocusout} value={inputValue} name={props.name} placeholder={props.placeholder} onChange={handleChange} className="inputclass"/>
    </>
  );
}
export default TextInput;
