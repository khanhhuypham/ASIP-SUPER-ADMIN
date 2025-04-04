

import { Select, Spin } from "antd";
import { useEffect, useMemo, useRef, useState } from "react";
import debounce from "lodash/debounce";
import { OptionType } from "./debounce-select";
import { values } from "lodash";


type mode = 'multiple' | 'tags';
interface DebounceSelectProps {
    debounceTimeout?: number;
    options?: OptionType[];
    value?: string[] | number[];
    onSearch?: (value: string) => void;
    onScrollDown?:(value: boolean) => void;
    onChange?: (value: OptionType | OptionType[]) => void;
    placeholder?: string;
    className?: string;
    showSearch?: boolean;
    mode?: mode;
}

export function ExternalLabelDebounceSelect({
    debounceTimeout = 800,
    options,
    value,
    onSearch,
    onScrollDown,
    onChange,
    placeholder,
    className,
    showSearch,
    mode,
    ...props
}: DebounceSelectProps) {

    const [selectedOption, setSelectedOption] = useState<OptionType[]>([]);
    const [fetching, setFetching] = useState(false);
    const fetchRef = useRef(0);


    const debouncedSearch = useMemo(() => {
        const handleSearch = (searchValue: string) => {
            fetchRef.current += 1;
            setFetching(true);
            // Call the onSearch prop if provided
            if (onSearch) {
                onSearch(searchValue);
            }

            // Simulate fetching delay (remove this in real use case)
            setTimeout(() => {
                setFetching(false);
            }, 500);
        };

        return debounce(handleSearch, debounceTimeout);
    }, [onSearch, debounceTimeout]);

    const handleDropdownVisibleChange = (open: boolean) => {

    };

    useEffect(() => {
        const selected = options?.find((item) => item.value == String(value))


        setSelectedOption(selected ? [selected] : [])
    },[value])


 
    return (
        <Select
            mode={mode}
            showSearch={showSearch}
            className={className}
            labelInValue
            filterOption={false}
            notFoundContent={fetching ? <Spin size="small" /> : "No results"}
            {...props}
            options={options}
            value={selectedOption}
            onDropdownVisibleChange={handleDropdownVisibleChange} // Trigger fetch when dropdown opens
            onPopupScroll={(e: React.UIEvent<HTMLDivElement>) => {
                const target = e.currentTarget;

                if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
                    onScrollDown && onScrollDown(true)
                    console.log("Scrolled to the bottom!");
                    // You can trigger an API call here to fetch more data
                }
            }}
            onSearch={debouncedSearch} // Use debounced search
            onChange={(newValue: OptionType | OptionType[]) => {
                onChange && onChange(newValue);
            }}
            placeholder={placeholder || "Select options"}

        />
    );
}

