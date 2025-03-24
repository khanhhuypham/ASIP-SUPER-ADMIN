

interface ExternalLabelTextFieldProps {
    label: string;
    name: string;
    placeholder?:string;
    value?: string | number;
    required?: boolean;
    type?: type
    prefix?: React.ReactElement;
    suffix?: React.ReactElement;
    onChange?: (value: string) => void;
    disabled?: boolean
    error?: string | false,
}

type type = 'number' | 'text' | 'password'; // Removed 'default' from SelectMode


export const ExternalLabelTextField: React.FC<ExternalLabelTextFieldProps> = ({
    label,
    name,
    placeholder,
    value,
    required = false,
    type = "text",
    prefix,
    suffix,
    onChange,
    disabled,
    error
}) => {

    return (
        <div className="focus:ring focus:ring-blue-200">

            <div className="flex justify-between items-start h-full w-full">
                <label htmlFor={name} className="w-[160px]">
                    {label}
                    {required && <span className="text-red-500"> *</span>}
                </label>

                <div className="w-full"> 
                    <input
                        placeholder={placeholder}
                        id={name}
                        name={name}
                        value={value}
                        type={type ?? "text"}
                        onChange={(e) => onChange?.(e.target.value)}
                        disabled={disabled}
                        className="disabled: bg-white h-[35px] border rounded-md w-full px-2 outline-none"
                    />
                    {error ? <div className="mt-1 text-xs text-red-500">{error}</div> : null}
                </div>


            </div>
           
        </div>
    );
}
