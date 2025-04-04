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


interface SelectWithApiProps {
    label: string;
    name: string;
    placeholder?: string;
  
    fetchData: (value: string, callback: (data: { value: string; label: string }[]) => void) => void;
    onChange?: (arg0: string[] | string | number[] | number) => void;
    required?: boolean;
    mode?: SelectMode;
    error?: string,
    allowClear?: boolean,
    showSearch?: boolean
}


export const ExternalLabelSelectWithAPI: React.FC<SelectWithApiProps> = ({
    label,
    name,
    placeholder,
    // selectedOptions,

    fetchData,
    onChange,
    required = false,
    mode, // Now mode can only be 'multiple', 'tags', or undefined
    error,
    allowClear,
    showSearch
}) => {

    const [data, setData] = useState<SelectOptionProps[]>([]);
    const [value, setValue] = useState<string>();

    const handleSearch = (newValue: string) => {
        fetchData(newValue, setData);
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return (


        <div className="focus:ring focus:ring-blue-200">

            <div className="flex items-start h-full w-full">

                <label htmlFor={name} className="w-[120px] shrink-0">
                    {label}
                    {required && <span className="text-red-500"> (*)</span>}
                </label>


                <div className="w-full">
                    <Select
                        showSearch={showSearch}
                        allowClear={allowClear}
                        mode={mode === undefined ? undefined : mode} // Handle 'default' case
                        value={value}
                        placeholder={placeholder}
                        style={{
                            width: "100%",
                            outline: "none",
                        }}
                        className="disabled:bg-gray-100 h-[35px] border rounded-md outline-none "
                        variant="borderless"
                        defaultActiveFirstOption={false}
                        filterOption={false}
                        onSearch={handleSearch}
                        onChange={handleChange}
                        onPopupScroll={(e: React.UIEvent<HTMLDivElement>) => {
                            const target = e.currentTarget;

                            if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
                                console.log("Scrolled to the bottom!");
                            }
                        }}
                        notFoundContent={null}
                        options={(data || []).map((d) => ({value: d.value,label: d.label}))}
                    />
                    {error ? <div className="mt-1 text-xs text-red-500">{error}</div> : null}
                </div>


            </div>

        </div>
    );
};

export default ExternalLabelSelectWithAPI;
