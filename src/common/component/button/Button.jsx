const variants = {
    primary: 'primary',
    white: 'white',
    disabled: 'disabled',
    outline: 'outline',
    outlineGray: 'outline-gray',
    icon: 'icon-btn',
    option: 'option',
    func: 'func'
};
const sizes = {
    xsmall: 'h24 ft-sm',
    hSmall: 'h40 ft-base',
    hMedium: 'h48 ft-base',
    hLarge: 'h56 ft-lg',
    hXlarge: 'h70 ft-base'
};

const gaps = {
    small: 'gap4',
    medium: 'gap10'
}

const Button = ({
    children,
    variant,
    size = 'medium',
    gap = '',
    className = '',
    type = "button",
    ...props
}) => {

    const baseClasses = 'btn';
    const variantClasses = variants[variant] || '';
    const sizeClasses = sizes[size] || '';
    const gapClasses = gaps[gap] || '';

    return (
        <button
            className={`${baseClasses} ${variantClasses} ${sizeClasses} ${gapClasses} ${className}`}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
