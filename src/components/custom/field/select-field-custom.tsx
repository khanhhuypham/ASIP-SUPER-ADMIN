import { Select, Space, Tag } from "antd";
import { ErrorMessage } from "formik";
import React, { useState, useRef, useEffect } from "react";

type SelectMode = 'multiple' | 'tags'; // Removed 'default' from SelectMode

interface SelectOptionProps {
    label: string;
    value: string | number;
    disabled?: boolean;
    options?: SelectOptionProps[];
}

interface SelectFieldCustomProps {
    label: string;
    name: string;
    selectedOptions?: string[] | number[];
    options: SelectOptionProps[];
    onChange?: (arg0: string[] | string | number[] | number) => void;
    required?: boolean;
    mode?: SelectMode; // Removed 'default' from the type
    error?: string,
    allowClear?: boolean,
    showSearch?: boolean
}

export const SelectFieldCustom: React.FC<SelectFieldCustomProps> = ({
    label,
    name,
    selectedOptions,
    options = [],
    onChange,
    required = false,
    mode, // Now mode can only be 'multiple', 'tags', or undefined
    error,
    allowClear,
    showSearch
}) => {
    const [active, setActive] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [defaultOptions, setDefaultOptions] = useState<string[] | number[] | null | undefined>(undefined);
    // const selectRef = useRef<any>(null);

    useEffect(() => {

        if (selectedOptions && selectedOptions.length > 0) {
            setDefaultOptions(selectedOptions);
            setActive(true);
        } else {
            setActive(false);
            setDefaultOptions(undefined);
        }

    }, [selectedOptions]);



    return (
        <div className="h-[48px] flex items-center w-full border rounded-md shadow  focus:ring focus:ring-blue-200" >
            <div className="h-full w-full">
                <div className="h-full w-full">
            
                        <button
                            className={`block mb-0 transition-all duration-300 pl-3 w-full text-start
                                ${active
                                ? "text-xs font-normal text-gray-400 translate-y-1"
                                : "cursor-pointer text-base h-full flex items-center"}`
                            }
                            onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            setDropdownVisible(true);
                            setActive(true);
                        }}>
                            {label}
                            {required && <span className="text-red-500"> *</span>}
                        </button>

                    {(active) &&
                        <Select
                            showSearch={showSearch}
                            allowClear={allowClear}
                            style={{
                                width: "100%",
                                height: 30, // Example fixed height (adjust as needed)
                                outline: "none",
                            }}
                            // ref={selectRef}
                            id={name}
                            mode={mode === undefined ? undefined : mode} // Handle 'default' case
                            className="w-full h-full"
                            placeholder="select one country"
                            variant="borderless"
                            defaultValue={defaultOptions}
                            onChange={(value) => {
                                console.log(value)
                                if (value === undefined) {
                                    setActive(false)
                                }
                                setDropdownVisible(false)
                                onChange && onChange(value == undefined ? "" : value);
                            }}
                            options={options}
                            open={dropdownVisible}
                            onDropdownVisibleChange={(visible) => {
                             
                                if (visible == false && defaultOptions === undefined) {
                                    setActive(false)
                                }
                                setDropdownVisible(visible)
                            }}
                        />
                    }
                </div>

            </div>
            {error ? <div className="mt-2 text-xs text-red-500">{error}</div> : null}

        </div>
    );
};

export default SelectFieldCustom;