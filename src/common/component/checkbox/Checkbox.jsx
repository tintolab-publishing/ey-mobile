import React, { useState, useEffect } from 'react';

const Checkbox = ({
    label,
    name,
    onChange,
    dataSet,
    dataKey,
    className,
    checked: propChecked,
    defaultChecked,
    ...props
}) => {

    const [internalChecked, setInternalChecked] = useState(defaultChecked || false);

    const isControlled = propChecked !== undefined;
    const isDataSetControlled = dataSet && dataKey;

    useEffect(() => {
        if (isDataSetControlled) {
            const value = dataSet[dataKey];
            setInternalChecked([true, 'Y', 'y', '1', 1].includes(value));
        }
    }, [isDataSetControlled, dataSet, dataKey, dataSet && dataSet[dataKey]]);

    const handleChange = (e) => {
        e.stopPropagation();
        const newChecked = e.target.checked;
        if (!isControlled) {
            setInternalChecked(newChecked);
        }

        if (isDataSetControlled) {
            dataSet[dataKey] = newChecked;
        }

        onChange && onChange(e);
    };

    const getCheckedState = () => {
        if (isControlled) {
            return propChecked;
        }
        if (isDataSetControlled) {
            return [true, 'Y', 'y', '1', 1].includes(dataSet[dataKey]);
        }
        return internalChecked;
    };

    const checked = getCheckedState();

    /**
     * @TODO
     * 체크박스 스타일 조정 필요
     */
    return (
        <div className={`checkbox-area ${className || ''}`}>
            <label>
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={handleChange}
                    className="sr-only"
                    {...props}
                />
                {label ? <span className="label">{label}</span> : <span></span>}
            </label>
        </div>
    );
};

export default Checkbox;