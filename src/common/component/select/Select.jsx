/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import selectArrow from '../../../assets/images/common/icon/icon_dropdown.svg';
import styles from './Select.module.css'

const Select = ({
    dataList = [],
    valueKey = 'value',
    textKey = 'text',
    onChange,
    className,
    ...props
}) => {
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        const selectedItem = dataList.find(item => item.selected);
        setSelectedValue(selectedItem ? selectedItem[valueKey] : '');
    }, [dataList.find(item => item.selected)]);

    const handleChange = (e) => {
        const selectedValue = e.target.value;
        const selectedText = e.target.options[e.target.selectedIndex].text;
        setSelectedValue(selectedValue);

        if (dataList.forAll) {
            dataList.forAll(item => {
                item.selected = item[valueKey] === selectedValue;
            });
        }
        else {
            dataList.forEach(item => {
                item.selected = item[valueKey] === selectedValue;
            });
        }

        if (onChange) {
            const modifiedEvent = { ...e, target: { ...e.target, text: selectedText, value: selectedValue } };
            onChange(modifiedEvent);
        }
    };

    const placeholderOption = dataList.find(item => item.placeholder);
    const isPlaceholderSelected = placeholderOption && (selectedValue === '' || selectedValue === placeholderOption?.[valueKey]);

    return (
        <select
            value={selectedValue}
            onChange={handleChange}
            className={`${styles.select} ${className} ${isPlaceholderSelected ? 'text-gray-300' : 'text-black'}`}
            {...props}
        >
            {dataList.map((item, index) => (
                <option key={index} value={item[valueKey]} className={item.placeholder ? 'text-gray-300' : 'text-black'}>
                    {item[textKey]}
                </option>
            ))}
        </select>
    );
};

export default Select;