import { Select, Space, Spin, Tag } from "antd";
import { ErrorMessage } from "formik";
import React, { useState, useRef, useEffect } from "react";
import { SelectOption } from "../../../constants/interface";

type SelectMode = 'multiple' | 'tags'; // Removed 'default' from SelectMode



export interface APIParameterOfSelect {
    data: SelectOption[];
    search_key: string;
    page: number;
    limit: number;
    total_record: number;
    loading?: boolean
}


interface SelectWithApiProps {
    label: string;
    name: string;
    placeholder?: string;
    value?: SelectOption[] | SelectOption;
    fetchData: (param: APIParameterOfSelect, setParam: ((param: APIParameterOfSelect) => void)) => void;
    onChange?: (arg0: SelectOption[] | SelectOption) => void;
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
    value,
    fetchData,
    onChange,
    required = false,
    mode, // Now mode can only be 'multiple', 'tags', or undefined
    error,
    allowClear,
    showSearch
}) => {


    const [selectedData, setSelectedData] = useState<SelectOption[] | SelectOption | undefined>(undefined);
    // const [defaultData, setDefaultData] = useState<SelectOption[] | SelectOption | undefined>(undefined);
    const [param, setParam] = useState<APIParameterOfSelect>({
        data: [],
        loading: false,
        search_key: "",
        page: 1,
        limit: 10,
        total_record: 0
    });


    const handleSearch = (newValue: string) => {
        callFetchData({ ...param, search_key: newValue, page: 1, data: [] });
    };


    const handleChange = (value: SelectOption[] | SelectOption) => {
        setSelectedData(value);
        onChange && onChange(value);
    };

    const handleDropdownVisibleChange = (open: boolean) => {
        if (open && param.data.length === 0) {
            callFetchData({ ...param, page: 1, data: [] });

        }
    };

    const callFetchData = (param: APIParameterOfSelect) => {
        setParam((prev) => ({ ...prev, loading: true }));
        fetchData(param, setParam);
    };

     useEffect(() => {
        if (!value) {
            setSelectedData(undefined);
            return;
        }


        setSelectedData(value);


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
                        mode={mode === undefined ? undefined : mode} // Handle 'default' case
                        value={selectedData}
           
                        labelInValue

                        placeholder={placeholder}
                        style={{
                            width: "100%",
                            outline: "none",
                        }}
                        className="disabled:bg-gray-100 h-[35px] border rounded-md outline-none "
                        variant="borderless"

                        // defaultActiveFirstOption={true}
                        // filterOption={true}
                        onSearch={handleSearch}
                        onChange={handleChange}
                        onPopupScroll={(e: React.UIEvent<HTMLDivElement>) => {
                            const target = e.currentTarget;

                            if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
                                if (param.data.length < param.total_record) {
                                    callFetchData({ ...param, page: param.page + 1 });
                                }
                            }
                        }}
                        onDropdownVisibleChange={handleDropdownVisibleChange} // Trigger fetch when dropdown opens
                        notFoundContent={param.loading ? <Spin size="small" /> : "No results"}
                        // loading={param.loading}
                        options={param.data.map((d) => ({ value: d.value, label: d.label }))}

                    />
                    {error ? <div className="mt-1 text-xs text-red-500">{error}</div> : null}
                </div>


            </div>

        </div>
    );
};

export default ExternalLabelSelectWithAPI;
