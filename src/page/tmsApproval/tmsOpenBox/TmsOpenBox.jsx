/* eslint-disable react/prop-types */

import React, { useContext, useEffect } from 'react';
import Icon from '../../../common/component/icon/Icon';
import Tag from '../../../common/component/tag/Tag';
import { AppContext } from '../../../common/share/AppContext';
import Checkbox from '../../../common/component/checkbox/Checkbox';
import TmsListBox from '../tmsListBox/TmsListBox';
import TmsDetailBox from '../tmsDetailBox/TmsDetailBox';

const TmsOpenBox = ({ dataObj, onChange }) => {
    const tmsObj = dataObj || {};

    const onTopChecked = () => {
        tmsObj.engList?.map(eng => {
            if (eng.STATUS === 'requested' && !eng.over52 && !(eng.isFutureWeek && eng.isAudit)) {
                eng.selected = tmsObj.selected;
            }
        });
        onChange && onChange();
    };

    const onListChecked = () => {
        const validItems = tmsObj.engList?.filter(eng =>
            eng.STATUS === 'requested' && parseInt(eng.Total_A) < 52
        );

        // 조건에 해당하는 모든 항목이 체크되어 있는지 확인
        const allChecked = validItems?.every(eng => eng.selected);

        // 상단 체크박스 상태 업데이트
        tmsObj.selected = allChecked;

        onChange && onChange();
    };

    return (
        <div className="box line shadow timesheet-item border-line">
            <TmsListBox dataObj={tmsObj} inner onChange={onTopChecked} />
            <div className="inner-item-wrap">
                {tmsObj.engList?.map((eng, index) => (
                    <div className='border-item' key={index}>
                        <div className="text-area">
                            <TmsDetailBox dataObj={eng} dates={tmsObj.dates} onChange={onListChecked} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TmsOpenBox;