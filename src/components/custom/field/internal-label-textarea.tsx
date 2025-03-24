import { useEffect, useRef, useState } from "react";

interface InternalLabelTextAreaProps {
    label: string;
    name: string;
    value?: string | number;
    required?: boolean;
    prefix?: React.ReactElement;
    suffix?: React.ReactElement;
    onChange?: (value: string) => void;
    disabled?: boolean;
    error?: string;
    rows?: number;
}

type type = 'number' | 'text';

export const InternalLabelTextArea: React.FC<InternalLabelTextAreaProps> = ({
    label,
    name,
    value,
    required = false,
    prefix,
    suffix,
    onChange,
    disabled,
    error,
    rows = 2
}) => {
    const [isActive, setIsActive] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    const handleLabelClick = () => {
        setIsActive(true);
        textareaRef.current?.focus();
    };

    useEffect(() => {
        setIsActive(value ? true : false)
    
    }, [value]);

    return (
        <div className="flex items-center min-h-[48px] border rounded-md shadow px-2 py-1">
            {/* {prefix && <div className="absolute left-2 top-1/2 -translate-y-1/2">{prefix}</div>} */}
            <div className={`w-full ${prefix ? 'pl-6' : ''} ${suffix ? 'pr-6' : ''}`}>
                <label
                    htmlFor={name}
                    className={`block transition-all duration-300 ${
                        isActive
                        ? "text-xs font-normal text-gray-400 pt-1"
                        : "cursor-pointer text-base h-full flex items-center"
                    }`}
                    onClick={!isActive ? handleLabelClick : undefined}
                >
                    {label}
                    {required && <span className="text-red-500"> *</span>}
                </label>

                {isActive && (
                    <textarea
                        id={name}
                        name={name}
                        ref={textareaRef}
                        value={value}
                        onChange={(e) => onChange?.(e.target.value)}
                        disabled={disabled}
                        rows={rows}
                        className="w-full outline-none resize-y disabled:bg-white"
                    />
                )}
                {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
            </div>
            {/* {suffix && <div className="absolute right-2 top-1/2 -translate-y-1/2">{suffix}</div>} */}
        </div>
    );
};