import { Select, Space, Spin, Tag } from "antd";
import { ErrorMessage } from "formik";
import React, { useState, useRef, useEffect } from "react";
import { SelectOption } from "../../constants/interface";
import { APIParameterOfSelect } from "./field/external-label-select-with-api";


type SelectMode = 'multiple' | 'tags'; // Removed 'default' from SelectMode





interface DebounceSelectWithApiProps {
    placeholder?: string;
    value?: string | number | string[] | number[];
    defaultValue?: SelectOption[] | SelectOption;
    fetchData: (param: APIParameterOfSelect, setParam: ((param: APIParameterOfSelect) => void)) => void;
    onChange?: (arg0: SelectOption[] | SelectOption) => void;
    mode?: SelectMode;
    allowClear?: boolean,
    showSearch?: boolean
    className?: string
}


const SelectWithAPi: React.FC<DebounceSelectWithApiProps> = ({
    placeholder,
    value,
    defaultValue,
    fetchData,
    onChange,
    mode, // Now mode can only be 'multiple', 'tags', or undefined
    allowClear,
    showSearch,
    className
}) => {


    const [selectedData, setSelectedData] = useState<SelectOption[] | SelectOption | undefined>();
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
    }
    ;
    useEffect(() => {



        if (!value) {
            setSelectedData(undefined);
            return;
        }
        
    
        if (Array.isArray(value)) {
            const data = value.map(v => param.data.find(d => d.value === v) || { value: v, label: String(v) });
            setSelectedData(data);
        } else {
            const data = param.data.find(d => d.value === value) || { value: value, label: String(value) };
            setSelectedData(data);
        }
    }, [value]);



    return (

        <Select
            showSearch={showSearch}
            allowClear={allowClear}
            mode={mode === undefined ? undefined : mode} // Handle 'default' case
            value={selectedData}
            defaultValue={defaultValue}
            labelInValue
            placeholder={placeholder}
            style={{
                outline: "none",
                border: "1px solid #d1d5db",
                borderRadius: "0.375rem"
            }}
            className={className}
            variant="borderless"

            onSearch={handleSearch}
            onChange={(_, option) => {

                if (!option) return;

                const data = Array.isArray(option)
                    ? option.map(({ value, label }) => ({ value: value as string | number, label }))
                    : { value: option.value as string | number, label: option.label };

                handleChange(data);


            }}
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
            options={param.data.map((d) => ({ value: d.value, label: d.label }))}
        />


    );
};

export default SelectWithAPi;
