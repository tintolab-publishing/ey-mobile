import React, { useState, useEffect } from 'react';
import Button from '../button/Button';
import Icon from '../icon/Icon';

const ModeSelector = ({
    onChange,
    dataSet,
    dataKey,
    defaultMode = 'list',
    className,
    ...props
}) => {
    const [internalMode, setInternalMode] = useState(defaultMode);

    const isDataSetControlled = dataSet && dataKey;

    useEffect(() => {
        if (isDataSetControlled) {
            const value = dataSet[dataKey];
            setInternalMode(value === 'open' ? 'open' : 'list');
        }
    }, [isDataSetControlled, dataSet, dataKey]);

    const handleModeChange = (newMode) => {
        if (!isDataSetControlled) {
            setInternalMode(newMode);
        }

        if (isDataSetControlled) {
            dataSet[dataKey] = newMode;
        }

        onChange && onChange(newMode);
    };

    const getMode = () => {
        if (isDataSetControlled) {
            return dataSet[dataKey] === 'open' ? 'open' : 'list';
        }
        return internalMode;
    };

    const mode = getMode();

    return (
        <div className={`view-toggle-wrap ${className || ''}`} {...props}>
            <Button
                variant="option"
                className={`${mode === 'list' ? 'active' : '' }`}
                onClick={() => handleModeChange('list')}
            >
                <Icon icon="view-list" />
            </Button>
            <Button
                variant="option"
                className={`${mode === 'open' ? 'active' : '' }`}
                onClick={() => handleModeChange('open')}
            >
                <Icon icon="view-open" />
            </Button>
        </div>
    );
};

export default ModeSelector;