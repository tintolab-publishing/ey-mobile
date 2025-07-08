/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import Icon from '../../../common/component/icon/Icon';
import Tag from '../../../common/component/tag/Tag';
import { AppContext } from '../../../common/share/AppContext';
import Checkbox from '../../../common/component/checkbox/Checkbox';

const TmsListBox = ({ dataObj, inner, onChange, onClick }) => {
    const tmsObj = dataObj || {};

    const statusMap = {
        awaiting: {
            variant: 'yellow',
            text: 'Awaiting'
        },
        approved: {
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
        unknown: {
            variant: 'gray-txt-wh',
            text: 'Unknown'
        }
    };

    const over52 = tmsObj.OVER_52HOURS_PERSONS > 0;

    return (
        <div className={`${!inner ? 'box line shadow timesheet-item' : 'border-item'}`} onClick={inner ? null : () => onClick(tmsObj)}>
            <div className="subject-wrap">
                {inner &&
                    <Checkbox disabled={tmsObj.STATUS === 'Transfer'} dataSet={tmsObj} dataKey='selected' onChange={onChange} />
                }
                <div className="text-area">
                    <div className="flex items-center gap6">
                        <div className="tag-wrap">
                            <Tag variant={statusMap[tmsObj.STATUS]?.variant} tagType="request" text={statusMap[tmsObj.STATUS]?.text} />
                        </div>
                        <div className="subject">
                            <h2 className="eng-name">{tmsObj.ENGAGEMENT_NAME}</h2>
                        </div>
                    </div>

                    <div className="eng-code-area">
                        <div className="pipe-list">
                            <span className="pipe-item">{`${tmsObj.MERC_ENGAGEMENT_CODE}`}</span>
                            {tmsObj.FIXED_REPORT_DATE &&
                                <span className="pipe-item">
                                    <span className="bold">{`감사보고서일 `}</span>
                                    <span className={tmsObj.FIXED_ENG === 'Y' && 'bold black'}>
                                        {`${tmsObj.FIXED_REPORT_DATE}`}
                                        <span>{tmsObj.FIXED_ENG === 'Y' ? ' (확정)' : ' (미확정)'}</span>
                                    </span>
                                </span>
                            }
                        </div>
                    </div>
                </div>
                {!inner &&
                    <Icon icon="arrow-right" />}
            </div>
            <div className={`box time-info-wrap ${over52 ? 'bg-red' : ''}`}>
                <div className="time-info-list">
                    <div className="time-info-item">
                        <div className="label">금주 예상시간</div>
                        <div className="value"><span className="num">{tmsObj.PLANNED_HOURS?.toLocaleString()}</span> hr / <span className="num">{tmsObj.PLANNED_PERSONS}</span> 명</div>
                    </div>
                    <div className="time-info-item">
                        <div className="label">Eng.총 예상시간</div>
                        <div className="value"><span className="num">{tmsObj.INIT_PLAN_TIME?.toLocaleString()}</span> hr (최초) / <span className="num">{tmsObj.PROJECT_ESTIMATED_HOURS}</span> hr (수정)</div>
                    </div>
                </div>
                <div className="time-info-list">
                    <div className="time-info-item">
                        <div className="label">금주 요청시간</div>
                        <div className="value"><span className="num">{tmsObj.ACTUAL_HOURS?.toLocaleString()}</span> hr / <span className="num">{tmsObj.ACTUAL_PERSONS}</span> 명</div>
                    </div>
                    <div className="time-info-item">
                        <div className="label">Eng.총 실제시간</div>
                        <div className="value">
                            <span className="num">{tmsObj.PROJECT_ACCUMULATED_HOURS?.toLocaleString()}</span> hr (최초) / 진행률 <span className="num">{tmsObj.PROJECT_ACCUMULATED_HOURS && tmsObj.PROJECT_ESTIMATED_HOURS ? `${tmsObj.PROJECT_ACCUMULATED_HOURS / tmsObj.PROJECT_ESTIMATED_HOURS * 100}%` : '-'}</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TmsListBox;