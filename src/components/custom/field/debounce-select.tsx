

import { Select, Spin } from "antd";
import { useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";

export interface OptionType {
    label: string;
    value: string;
}
type mode = 'multiple' | 'tags';
interface DebounceSelectProps {
    fetchOptions: (value: string) => Promise<OptionType[]>;
    debounceTimeout?: number;
    value?: OptionType[];
    onChange?: (value: OptionType[]) => void;
    placeholder?: string;
    className?: string;
    showSearch?: boolean;
    mode?: mode;
}

export function DebounceSelect({
    fetchOptions,
    debounceTimeout = 800,
    value = [],
    onChange,
    placeholder,
    className,
    showSearch,
    mode,
    ...props
}: DebounceSelectProps) {
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState<OptionType[]>([]);
    const fetchRef = useRef(0);

    const debounceFetcher = useMemo(() => {

        const loadOptions = async (value: string) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);

            console.log("asdas")

            try {
                const newOptions = await fetchOptions(value);
                if (fetchId === fetchRef.current) {
                    setOptions(newOptions.length ? newOptions : [{ label: "No results found", value: "no_results" }]);
                }
            } catch (error) {
                console.error("Error fetching options:", error);
            } finally {
                setFetching(false);
            }
        };

        return debounce(loadOptions, debounceTimeout);

    }, [fetchOptions, debounceTimeout]);

    // Fetch options when the dropdown is opened
    const handleDropdownVisibleChange = (open: boolean) => {
        if (open && options.length === 0) {
            // Trigger fetch only if no options are already loaded
            debounceFetcher("");
        }
    };


    return (
        <Select
            mode={mode}
            showSearch={showSearch}
            className={className}
            labelInValue
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={fetching ? <Spin size="small" /> : "No results"}
            {...props}
            options={options}
            value={value.map((item) => ({ label: item.label, value: item.value }))}
            onDropdownVisibleChange={handleDropdownVisibleChange} // Trigger fetch when dropdown opens
            onChange={(newValue: OptionType | OptionType[]) => {
                let updatedValues: OptionType[];
                // Handle single-select mode
                if (!Array.isArray(newValue)) {
                    updatedValues = [newValue]; // Wrap single value in an array
                } else {
                    // Handle multi-select mode
                    updatedValues = newValue;
                }

                // Transform the selected values into the desired format
                const transformedValues = updatedValues.map((item) => ({
                    label: item.label,
                    value: item.value,
                }));

                // Pass the transformed values to the parent `onChange` handler
                onChange && onChange(transformedValues);
            }}
            placeholder={placeholder || "Select options"}

        />
    );
}

export const Demo = () => {
    const [value, setValue] = useState<OptionType[]>([]);

    async function fetchUserList(username: string): Promise<OptionType[]> {
        console.log("fetching user", username);
        try {
            const response = await fetch(`https://randomuser.me/api/?results=5`);
            const body = await response.json();
            return body.results.map((user: any) => ({
                label: `${user.name.first} ${user.name.last}`,
                value: user.login.username,
            }));
        } catch (error) {
            console.error("Error fetching user list:", error);
            return [];
        }
    }


    return (
        <DebounceSelect
            // mode="multiple"
            value={value}
            placeholder="Select users"
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
        // style={{ width: "100%" }}
        />
    );
};
