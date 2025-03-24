interface ButtonCustomProps {
    type?: "button" | "submit" | "reset";
    className?: string;
    text?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    disabled?: boolean;
    isLoading?: boolean;
    style?: React.CSSProperties;
}

export const ButtonCustom = ({
    type = "button",
    className = "bg-[#E3ECF5] text-[#1462B0] hover:bg-[#1462B0] hover:text-white",
    onClick,
    text = "Thêm mới",
    icon,
    iconPosition = 'left',
    disabled = false,
    isLoading = false,
    style
}: ButtonCustomProps) => {
    return (
        <button
            disabled={disabled || isLoading}
            type={type}
            className={`btn uppercase font-bold ${className}`}
            onClick={onClick}
            style={style}
        >
            <div className={`flex items-center justify-center gap-2 ${icon && iconPosition === 'left' ? 'flex-row' : 'flex-row-reverse'}`}>
                {icon && <span className="flex-shrink-0">{icon}</span>}
                <span>{text}</span>
            </div>
            {isLoading && (
                <span
                    className="inline-block w-5 h-5 ml-2 border-2 border-white rounded-full animate-spin border-l-transparent"
                    aria-label="Loading"
                ></span>
            )}
        </button>
    );
};
