import React, { useState, useEffect } from 'react';
import Button from '../button/Button';
import Icon from '../icon/Icon';

const CheckButton = ({
    children,
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
        const newChecked = !getCheckedState();

        if (!isControlled) {
            setInternalChecked(newChecked);
        }

        if (isDataSetControlled) {
            dataSet[dataKey] = newChecked;
        }

        onChange && onChange({ ...e, target: { ...e.target, value: newChecked } });
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

    return (
        <Button className={`${className} ${checked
            ? '!bg-bgBk'
            : '!bg-white'
            }`} onClick={(e) => handleChange(e)}>
            <label>
                <input
                    type="checkbox"
                    name={name}
                    checked={checked}
                    onChange={(e) => handleChange(e)}
                    className="sr-only"
                    {...props}
                />
                {children}
            </label>
        </Button>
    );
};

export default CheckButton;