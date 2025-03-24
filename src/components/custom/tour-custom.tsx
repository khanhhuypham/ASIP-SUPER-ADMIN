import { useEffect, useRef, useState } from "react";

export interface Tour {
    id: number;
    label: string;
    active: boolean;
    completed: boolean;
}

export const HorizontalLineTour = ({tours, onChange}: { tours: Tour[]; onChange?: (ag0: number) => void;}) => {


    return (
        <div className="relative flex border-b border-gray-200 h-[40px] gap-2">

            {tours.map((item, index) => (
      
                <div className="flex items-center gap-2">
                    <span 
                        className={
                        `
                            rounded-full text-center leading-5 w-5 h-5  text-xs transition-colors duration-300 ease-in-out
                            ${item.active ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-400"}
                        `
                    }>
                        {index + 1}
                    </span>
                    <span key={item.id} className={`text-sm transition-colors duration-300 ease-in-out ${item.active ? "text-blue-600" : "text-gray-400"}`}>{item.label}</span>
                    
                    {
                        index != tours.length -1 &&  <span className={`w-[50px] h-[2px] transition-colors duration-300 ease-in-out ${item.active ? "bg-blue-600" : "bg-gray-400"}`}></span>
                    }
                </div>
               
            ))}

     
        </div>
    );
};
