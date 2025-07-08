/* eslint-disable react/prop-types */
import styles from './Input.module.css'

const Input = ({ filter, dataObj, dataKey, onChange, placeholder, className, mask, type, maxDigits, maxDecimals, ...props }) => {
    const isControlled = dataObj && dataKey;
    const applyMask = (value, mask) => {
        let result = '';
        let maskIndex = 0;
        let valueIndex = 0;

        while (maskIndex < mask.length && valueIndex < value.length) {
            const maskChar = mask[maskIndex];
            const valueChar = value[valueIndex];

            switch (maskChar) {
                case '#':
                    if (/\d/.test(valueChar)) {
                        result += valueChar;
                        valueIndex++;
                    }
                    maskIndex++;
                    break;
                case 'A':
                    if (/[a-zA-Z]/.test(valueChar)) {
                        result += valueChar.toUpperCase();
                        valueIndex++;
                    }
                    maskIndex++;
                    break;
                case 'a':
                    if (/[a-zA-Z]/.test(valueChar)) {
                        result += valueChar.toLowerCase();
                        valueIndex++;
                    }
                    maskIndex++;
                    break;
                case '?':
                    if (/[a-zA-Z]/.test(valueChar)) {
                        result += valueChar;
                        valueIndex++;
                    }
                    maskIndex++;
                    break;
                case '*':
                    result += valueChar;
                    valueIndex++;
                    maskIndex++;
                    break;
                default:
                    if (valueChar === maskChar) {
                        result += maskChar;
                        valueIndex++;
                    } else {
                        result += maskChar;
                    }
                    maskIndex++;
                    break;
            }
        }

        // 마스크를 초과하는 입력 처리
        while (valueIndex < value.length) {
            if (mask[mask.length - 1] === '#' && /\d/.test(value[valueIndex])) {
                result += value[valueIndex];
            } else if (mask[mask.length - 1] === 'A' && /[a-zA-Z]/.test(value[valueIndex])) {
                result += value[valueIndex].toUpperCase();
            } else if (mask[mask.length - 1] === 'a' && /[a-zA-Z]/.test(value[valueIndex])) {
                result += value[valueIndex].toLowerCase();
            } else if (mask[mask.length - 1] === '?' && /[a-zA-Z]/.test(value[valueIndex])) {
                result += value[valueIndex];
            } else if (mask[mask.length - 1] === '*') {
                result += value[valueIndex];
            } else {
                break;
            }
            valueIndex++;
        }

        return result;
    };

    const handleChange = (e) => {
        const isComposing = e.nativeEvent.isComposing;
        let value = e.target.value;

        if (!isComposing) {

            if (filter) {
                const regex = new RegExp(`[^${filter}]`, "g");
                value = value.replace(regex, "");
            }
            if (mask) {
                value = applyMask(value, mask);
            }
            if (type === 'number' && (maxDigits !== undefined || maxDecimals !== undefined)) {
                const regex = new RegExp(`^-?\\d{0,${maxDigits || 2}}(\\.\\d{0,${maxDecimals || 2}})?$`);
                if (!regex.test(value)) {
                    return;
                }
            }
        }

        if (isControlled) {
            dataObj[dataKey] = value;
        }

        const event = { ...e, target: { ...e.target, value } };
        onChange && onChange(event);
    };

    return (
        <input
            type={type}
            pattern={`${type === 'number' && '[0-9]*'}`}
            inputMode={`${type === 'number' && 'decimal'}`}
            placeholder={placeholder || mask}
            value={isControlled ? dataObj[dataKey] || "" : props.value}
            onChange={(e) => handleChange(e)}
            onCompositionEnd={(e) => handleChange(e)}
            className={`${styles['input']} ${className ? styles[className] : ''}`}
            {...props}
        />
    );
};

export default Input;
