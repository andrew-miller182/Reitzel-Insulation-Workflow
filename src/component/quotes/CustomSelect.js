import React, { useState } from "react";

function CustomSelect(props) {
	const [data] = useState(props.data);
	const [quoteDataId, setQuoteDataId] = useState(props.quoteDataId);

	function onChange(event) {
		// setQuoteDataId(event.target.value);
		if (props.onSelectChange) {
			props.onSelectChange(event.target.value);
		}
	}

	let options = data.map((d) => (
		<option key={d.id} value={d.id} data={d} >
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
			<option value="">Select Item</option>
			{options}
		</select>
	);
}
export default CustomSelect;
