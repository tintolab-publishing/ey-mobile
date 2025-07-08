/* eslint-disable react/prop-types */
import React from 'react';

const Tab = ({ dataList, onChange }) => {

    const handleTabClick = (title) => {
        dataList.forAll((data) => {
            data.selected = data.title === title;
        });
        onChange && onChange(title);
    };

    return (
        <div className="tab-head">
            {dataList.map((tab, index) => (
                <div
                    key={index}
                    onClick={() => handleTabClick(tab.title)}
                    className={`tab ${tab.selected
                        ? 'selected'
                        : ''
                        }`}
                >
                    <div className="flex gap6">
                        <span>
                            {tab.title}
                        </span>
                        {tab.count &&
                            <span className={`tag ${tab.selected ? 'yellow' : 'gray-txt-wh'} count`}>
                                {tab.count || ''}
                            </span>
                        }
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Tab;