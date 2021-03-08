import { useState } from "react";

export const useInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    return {
        value,
        setValue,
        reset: () => setValue(""),

        assignValue: (value) => setValue(value),

        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        }
    };
};
