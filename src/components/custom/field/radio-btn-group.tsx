import { ErrorMessage, Field } from "formik";
import React from "react";

export interface RadioOptionProps {
    label: string;
    value: string;
}

interface RadioBtnGroupProps {
    label: string;
    name: string;
    value?: string; // Optional default value
    options: RadioOptionProps[];
    required?: boolean;
    onChange?: (selectedOption: RadioOptionProps) => void;
    error?: string,
}

export const RadioBtnGroup: React.FC<RadioBtnGroupProps> = ({
    label,
    name,
    value: defaultValue, // Rename to defaultValue for clarity
    options,
    required = false,
    onChange,
    error
}) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedValue = event.target.value;
        const selectedOption = options.find((option) => option.value === selectedValue);

        // Call the provided onChange function with the selected option
        if (selectedOption && onChange) {
            onChange(selectedOption);
        }
    };

    return (
        <div className="w-full space-y-2">
            <label htmlFor={name} className="text-base mb-0">
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>

            <div className="flex items-center space-x-4">
                {options.map((option) => (
                    <label key={option.value} className="flex items-center gap-1">
            
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={defaultValue === option.value} // Set checked state
                            onChange={handleChange}
                        />
                        <span className=" text-sm">{option.label}</span>
                    </label>
                ))}
            </div>
            {error ? <div className="mt-2 text-xs text-red-500">{error}</div> : null}
        </div>
    );
};