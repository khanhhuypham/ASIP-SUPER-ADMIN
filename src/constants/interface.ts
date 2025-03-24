import { JSX } from "react";

export interface PopupInterface {
    open: boolean,
    content?: JSX.Element | undefined,
    title:string
    width?:number
}


export interface IconProps {
    className?: string;
    fill?: boolean;
    fillColor?: string;
    strokeColor?: string;
    duotone?: boolean;
}