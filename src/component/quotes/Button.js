// ./components/Button.js
import React, { useState } from "react";
function Button(props) {
  // const [size] = useState(props.size);
  // const [variant] = useState(props.variant);
  return (
    <button class={`ant-btn ant-btn-${props.variant} ant-btn-${props.size}`} onClick={props.onClick}>{props.children}</button>
  );
}
export default Button;
