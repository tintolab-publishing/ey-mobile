import React, { useContext } from 'react';
import Tag from '../../../common/component/tag/Tag';
import Input from '../../../common/component/input/Input';
import Checkbox from '../../../common/component/checkbox/Checkbox';
import EngTimeBox from '../../tmsSubmit/engTimeBox/EngTimeBox';
import { format, startOfWeek, endOfWeek, isWithinInterval, parseJSON } from 'date-fns';
import { AppContext } from '../../../common/share/AppContext';

const TmsDetailBox = ({ dataObj, dates, onChange }) => {
    const timeObj = dataObj || {};
    const AUDIT_EP_GPN = [
        {
            value: 'KR010000688',
            DESCRIPTION: 'RM 이동근 대표님'
        },
        {
            value: 'KR010012715',
            DESCRIPTION: 'CBS 이복한 본부장님'
        }
    ];
    const cmn = useContext(AppContext);

    const statusMap = {
        requested: {
            variant: 'yellow',
            text: 'Awaiting'
        },
        submitted: {
            variant: 'gray-txt-wh',
            text: 'Approved'
        },
        rejected: {
            variant: 'red',
            text: 'Rejected'
        },
        Transfer: {
            variant: 'gray-txt-wh',
            text: 'Transfer'
        },
        unsubmitted: {
            variant: 'gray-txt-wh',
            text: 'Draft'
        },
        사후검토: {
            variant: 'gray-txt-wh',
            text: '사후검토'
        }
    };

    const days = [
        {
            text: 'Sat',
            value: 'sat',
            variant: 'blue',
            keyR: 'Sa_R',
            keyA: 'Sa'
        },
        {
            text: 'Sun',
            value: 'sun',
            variant: 'pink',
            keyR: 'Su_R',
            keyA: 'Su'
        },
        {
            text: 'Mon',
            value: 'mon',
            variant: 'gray-txt-bk',
            keyR: 'Mo_R',
            keyA: 'Mo'
        },
        {
            text: 'Tue',
            value: 'tue',
            variant: 'gray-txt-bk',
            keyR: 'Tu_R',
            keyA: 'Tu'
        },
        {
            text: 'Wed',
            value: 'wed',
            variant: 'gray-txt-bk',
            keyR: 'We_R',
            keyA: 'We'
        },
        {
            text: 'Thu',
            value: 'thu',
            variant: 'gray-txt-bk',
            keyR: 'Th_R',
            keyA: 'Th'
        },
        {
            text: 'Fri',
            value: 'fri',
            variant: 'gray-txt-bk',
            keyR: 'Fr_R',
            keyA: 'Fr'
        }
    ];

    const onListChecked = () => {
        // if (timeObj.STATUS === 'requested' && parseInt(timeObj.Total_A) < 52 && !timeObj.selected) {
        //     timeObj.selected = true;
        // } else {
        //     timeObj.selected = false;
        // }
        onChange && onChange()
    };

    const over52 = timeObj.over52;
    // Checkbox 표시 여부 결정
    const showCheckbox = !(timeObj.isAudit && timeObj.isFutureWeek);

    // EOW_DATE 기준으로 해당 주의 연도와 월을 가져옴
    const eowDate = new Date(timeObj.EOW_DATE);
    const year = eowDate.getFullYear();
    const month = eowDate.getMonth(); // 0-based month

    // dates 배열의 날짜를 완전한 Date 객체로 변환
    const getFullDate = (day) => {
        return new Date(year, month, parseInt(day));
    };

    const isCurrentWeek = timeObj.EOW_DATE &&
        format(new Date(timeObj.EOW_DATE), 'yyyy-MM-dd') ===
        format(endOfWeek(new Date(), { weekStartsOn: 6 }), 'yyyy-MM-dd');

    const partialApprovalPeriod = timeObj.isAudit && timeObj.STATUS === 'requested' && timeObj.APPR_DATE && isCurrentWeek ? {
        start: startOfWeek(new Date(), { weekStartsOn: 6 }),
        end: new Date(timeObj.APPR_DATE)
    } : null;

    const getTagVariant = (day, index) => {
        if (partialApprovalPeriod && Number(timeObj[day.keyA]) > 0) {
            const currentDate = getFullDate(dates[index]);
            const isInApprovalPeriod = isWithinInterval(currentDate, partialApprovalPeriod);
            if (isInApprovalPeriod) {
                return 'black';
            }
        }
        return day.variant;
    };

    return (
        <>
            <div className="subject-wrap">
                {timeObj.STATUS === 'requested' && showCheckbox &&
                    <Checkbox dataSet={timeObj} dataKey='selected' onChange={onListChecked} />
                }
                <div className="text-area">
                    <div className="flex items-center gap6">
                        <div className="tag-wrap">
                            <Tag variant={statusMap[timeObj.STATUS]?.variant} tagType="request" text={statusMap[timeObj.STATUS]?.text} />
                        </div>
                        <div className="subject">
                            <h2 className="eng-name">{timeObj.GPN_NM}</h2>
                        </div>
                    </div>
                    <div className="eng-code-area">
                        <div className="pipe-list">
                            <span className="pipe-item">{timeObj.GPN_GRADE}</span>
                            <span className="pipe-item">{timeObj.GPN_SL}</span>
                            <span className="pipe-item">{timeObj.GPN_SSL}</span>
                            <span className="pipe-item">{timeObj.W_TYPE}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="reason-box-wrap">
                {
                    timeObj.STATUS === 'rejected' &&
                    <div className='box warning-box'>
                        <div className="box-title">Rejected 사유</div>
                        <div className="text-area">
                            <div className="text">{timeObj.APPR_DESCRIPTION}</div>
                        </div>
                    </div>
                }
                {
                    timeObj.TR_DESCRIPTION &&
                    <div className='box reason-box'>
                        <div className="box-title">Timesheet 수정 또는 지연제출 사유</div>
                        <div className="text-area">
                            <div className="text">{timeObj.TR_DESCRIPTION}</div>
                        </div>
                    </div>
                }
            </div>
            <div className="weekly-time-wrap">
                <div className={`box ${over52 ? 'bg-red' : 'bg-lightgray'}`}>
                    <div className="weekly-time-list">
                        {days.map((day, index) => (
                            <div className='weekly-time-item' key={index}>
                                <div className="days-area">
                                    <span className="day">{dates[index]}</span>
                                    <Tag
                                        variant={getTagVariant(day, index)}
                                        tagType='time'
                                        rounded="true"
                                        text={day.text}
                                    />
                                </div>
                                <div className="time-area">
                                    <div className="time">
                                        <div className="label">Plan</div>
                                        <div className="value">{Number(timeObj[day.keyR]).toFixed(2)}</div>
                                    </div>
                                    <div className="time">
                                        <div className="label">Actual</div>
                                        <div className="value">{Number(timeObj[day.keyA]).toFixed(2)}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className='weekly-time-item total-time'>
                            <div className="days-area">
                                <span className="day">Total</span>
                            </div>
                            <div className="time-area">
                                <div className="time">
                                    <div className="label">Plan</div>
                                    <div className="value">{Number(timeObj.Total_R).toFixed(2)}</div>
                                </div>
                                <div className="time">
                                    <div className="label">Actual</div>
                                    <div className="value">{Number(timeObj.Total_A).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="activity-code-list">
                <div className='code-item'>
                    <span className='label'>Activity</span>
                    <span className='value'>{timeObj.DEMAND_ACTIVITY_CODE}</span>
                </div>
                <div className='code-item'>
                    <span className='label'>Sub Activity</span>
                    <span className='value'>{timeObj.DEMAND_SUB_ACTIVITY_CODE}</span>
                </div>
            </div>
            <div className="approval-desc-wrap">
                <div className="text">{timeObj.DESCRIPTION}</div>
            </div>
        </>
    );
};

export default TmsDetailBox;