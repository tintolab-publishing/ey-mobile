import React from 'react';
import Tag from '../../../common/component/tag/Tag';
import Input from '../../../common/component/input/Input';
import { format, endOfWeek, startOfWeek, subWeeks, subDays, eachDayOfInterval } from 'date-fns';

const EngTimeBox = ({ dataObj, onChange }) => {
    const detailObj = dataObj || {};
    const startDate = format(startOfWeek(new Date(detailObj.EOW_DATE || Date.now()), { weekStartsOn: 6 }), 'yyyy-MM-dd');
    const endDate = format(endOfWeek(new Date(detailObj.EOW_DATE || Date.now()), { weekStartsOn: 6 }), 'yyyy-MM-dd');

    const dates = eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(endDate)
    }).map(date => format(date, 'dd'));

    const days = [
        {
            text: 'Sat',
            value: 'sat',
            variant: 'blue',
            key: 'Sa',
            keyR: 'Sa_R'
        },
        {
            text: 'Sun',
            value: 'sun',
            variant: 'pink',
            key: 'Su',
            keyR: 'Su_R'
        },
        {
            text: 'Mon',
            value: 'mon',
            variant: 'gray-txt-bk',
            key: 'Mo',
            keyR: 'Mo_R'
        },
        {
            text: 'Tue',
            value: 'tue',
            variant: 'gray-txt-bk',
            key: 'Tu',
            keyR: 'Tu_R'
        },
        {
            text: 'Wed',
            value: 'wed',
            variant: 'gray-txt-bk',
            key: 'We',
            keyR: 'We_R'
        },
        {
            text: 'Thu',
            value: 'thu',
            variant: 'gray-txt-bk',
            key: 'Th',
            keyR: 'Th_R'
        },
        {
            text: 'Fri',
            value: 'fri',
            variant: 'gray-txt-bk',
            key: 'Fr',
            keyR: 'Fr_R'
        }
    ]

    return (
        <div className="box bg-lightgray">
            <span className="box-title">Actual</span>
            <div className="weekly-time-list">
                {days.map((day, index) => (
                    <div className="weekly-time-item" key={index}>
                        <div className="days-area">
                            <span className="day">{dates[index]}</span>

                            {/* 제출된 일자인 경우 state="submit" 추가 */}
                            <Tag variant={day.variant} tagType='time' rounded="true" text={day.text}></Tag>
                        </div>
                        <div className="time-area">
                            <div className="time">
                                <div className="label">Plan</div>
                                <div className="value">{Number(detailObj[day.keyR] || 0).toFixed(2)}</div>
                            </div>
                            <div className="time">
                                <span className="label">Actual</span>
                                <Input type='number' onFocus={(e) => e.target.select()} maxDigits={2} maxDecimals={2} placeholder='0.00' mask='##.##' className="number-input" dataObj={detailObj} dataKey={day.key} onChange={onChange} filter={'0-9.'} maxLength={5} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EngTimeBox;