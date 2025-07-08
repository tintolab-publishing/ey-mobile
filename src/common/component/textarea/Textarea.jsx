import React from 'react';
import styles from './Textarea.module.css'

const Textarea = ({ filter, dataSet, dataKey, onChange, placeholder, className, rows = 3, ...props }) => {
    const isControlled = dataSet && dataKey;

    const handleChange = (e) => {
        const isComposing = e.nativeEvent.isComposing;
        let value = e.target.value;

        if (!isComposing && filter) {
            const regex = new RegExp(`[^${filter}]`, "g");
            value = value.replace(regex, "");
        }

        if (isControlled) {
            dataSet[dataKey] = value;
        }

        const event = { ...e, target: { ...e.target, value } };
        onChange && onChange(event);
    };

    return (
        <textarea
            placeholder={placeholder}
            value={isControlled ? dataSet[dataKey] || "" : props.value}
            onChange={handleChange}
            onCompositionEnd={handleChange}
            className={`${styles.textarea} ${className}`}
            rows={rows}
            {...props}
        />
    );
};

export default Textarea;