


interface ExternalLabelTextAreaProps {
    label: string;
    name: string;
    value?: string | number;
    placeHolder?: string;
    required?: boolean;
    prefix?: React.ReactElement;
    suffix?: React.ReactElement;
    onChange?: (value: string) => void;
    disabled?: boolean;
    error?: string;
    rows?: number;
}

type type = 'number' | 'text';

export const ExternalLabelTextArea: React.FC<ExternalLabelTextAreaProps> = ({
    label,
    name,
    value,
    placeHolder,
    required = false,
    prefix,
    suffix,
    onChange,
    disabled,
    error,
    rows = 2
}) => {

    return (
        <div className="focus:ring focus:ring-blue-200">

            <div className="flex justify-between items-start h-full w-full">
                <label htmlFor={name} className="w-[120px] shrink-0">
                    {label}
                    {required && <span className="text-red-500"> (*)</span>}
                </label>

                <div className="w-full">
                    <textarea
                        id={name}
                        name={name}
                        value={value}
                        placeholder={placeHolder}
                        onChange={(e) => onChange?.(e.target.value)}
                        disabled={disabled}
                        rows={rows}
                        className="w-full  border rounded-md p-2 outline-none resize-y disabled:bg-white"
                    />
                    {error ? <div className="mt-1 text-xs text-red-500">{error}</div> : null}
                </div>


            </div>

        </div>
    );
}
