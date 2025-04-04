import React, { useState } from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { hotelService } from '../../../service/hotel-service/hotel-service';
import { toast } from 'react-toastify';

let timeout: ReturnType<typeof setTimeout> | null;


const fetchData = (value: string, callback: (data: { value: string; text: string }[]) => void) => {

    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    const getHotelList = () => {

        hotelService.list({ search_key:value,page: 1, limit: 10 }).then((res) => {
            if (res.status == 200) {
                callback((res.data.list ?? []).map((hotel) => ({ value: hotel.id.toString(), text: hotel.name })));
            } else {
                toast.error(res.message)
            }
        })
    }
    timeout = setTimeout(getHotelList, 300);
    // if (value) {
    //     timeout = setTimeout(getHotelList, 300);
    // } else {
    //     callback([]);
    // }
};

interface SelectWithApiProps {
    placeholder?: string;
    style?: React.CSSProperties;
}

export const SelectWithApi: React.FC<SelectWithApiProps> = (props) => {

    const [data, setData] = useState<SelectProps['options']>([]);
    const [value, setValue] = useState<string>();

    const handleSearch = (newValue: string) => {
        fetchData(newValue, setData);
    };

    const handleChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <Select
            showSearch
            value={value}
            placeholder={props.placeholder}
            style={props.style}
            defaultActiveFirstOption={false}
            suffixIcon={null}
            filterOption={false}
            onSearch={handleSearch}
            onChange={handleChange}
            onPopupScroll={(e: React.UIEvent<HTMLDivElement>) => {
                const target = e.currentTarget;

                if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
    
                    console.log("Scrolled to the bottom!");
                    // You can trigger an API call here to fetch more data
                }
            }}
            notFoundContent={null}
            options={(data || []).map((d) => ({
                value: d.value,
                label: d.text,
            }))}
        />
    );
}