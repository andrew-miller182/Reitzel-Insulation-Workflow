import React, { useState } from "react";

function CustomSelect(props) {

	const [data] = useState(props.data);
	const [selectedData, setSelectedData] = useState({});

  function onChange(event) {
    var val = data.find(d => d.id == event.target.value);
    setSelectedData(val)
    if (props.onSelectChange){
      props.onSelectChange(val);
    }
	}

  let options = data.map((d) => (
		<option key={d.id} value={d.id} data={d}>
			{d.name}
		</option>
	));

  return (
		<select
			name="customSearch"
      className="custom-search-select"
      onChange={onChange}
      placeholder="Select Item"
		>
			<option value="" >Select Item</option>
			{options}
		</select>
	);
}
export default CustomSelect;
