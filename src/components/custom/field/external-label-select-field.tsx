import { Select, Space, Tag } from "antd";
import { ErrorMessage } from "formik";
import React, { useState, useRef, useEffect } from "react";
import { SelectOption } from "../../../constants/interface";

type SelectMode = 'multiple' | 'tags'; // Removed 'default' from SelectMode

interface SelectOptionProps {
    label: string;
    value: string | number;
    disabled?: boolean;
    options?: SelectOptionProps[];
}

interface SelectFieldProps {
    label: string;
    name: string;
    placeholder?: string;
    value?: SelectOption | SelectOption[];
    options: SelectOptionProps[];
    onChange?: (arg0: SelectOption | SelectOption[]) => void;
    required?: boolean;
    mode?: SelectMode; // Removed 'default' from the type
    error?: string | false,
    allowClear?: boolean,
    showSearch?: boolean
}

export const ExternalLabelSelectField: React.FC<SelectFieldProps> = ({
    label,
    name,
    placeholder,
    value,
    options = [],
    onChange,
    required = false,
    mode, // Now mode can only be 'multiple', 'tags', or undefined
    error,
    allowClear,
    showSearch
}) => {


    const [defaultOptions, setDefaultOptions] = useState<SelectOption | SelectOption[] | undefined>(undefined);


    useEffect(() => {

        if (value != undefined){

            if (Array.isArray(value)) {
                // Check if the array is empty
                // If empty, set defaultOptions to undefined
                // If not empty, set defaultOptions to the value
                setDefaultOptions(value.length > 0 ? value : undefined);
            } else {
                setDefaultOptions(value);
            }

        }else{
            setDefaultOptions(undefined);
        }

    
    }, [value]);



    return (


        <div className="focus:ring focus:ring-blue-200">

            <div className="flex items-start h-full w-full">

            <label htmlFor={name} className="w-[140px] shrink-0">
                    {label}
                    {required && <span className="text-red-500"> (*)</span>}
                </label>


                <div className="w-full">
                    <Select
                        showSearch={showSearch}
                        allowClear={allowClear}
                        style={{
                            width: "100%",
                            outline: "none",
                        }}
                        id={name}
                        mode={mode === undefined ? undefined : mode} // Handle 'default' case
                       
                        className="disabled:bg-gray-100 h-[35px] border rounded-md outline-none "
                        placeholder={placeholder}
                        variant="borderless"
                        value={defaultOptions}
                
                        onChange={(value) => {
                            onChange && onChange(value);
                        }}
                        options={options}
               
                    />
                    {error ? <div className="mt-1 text-xs text-red-500">{error}</div> : null}
                </div>


            </div>

        </div>
    );
};

export default ExternalLabelSelectField;

