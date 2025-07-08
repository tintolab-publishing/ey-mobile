/* eslint-disable react/prop-types */
import React from 'react';
import Tag from '../../../common/component/tag/Tag';
import Button from '../../../common/component/button/Button';
import Checkbox from '../../../common/component/checkbox/Checkbox';
import Icon from '../../../common/component/icon/Icon';

const TmsEngBox = ({ disabled, dataObj, copy, onChange, onClick }) => {
    const engData = dataObj || {};
    const statusMap = {
        unsubmitted: {
            variant: 'yellow',
            text: 'Draft'
        },
        requested: {
            variant: 'gray-txt-wh',
            text: 'Requested'
        },
        submitted: {
            variant: 'gray-txt-wh',
            text: 'Approved'
        },
        rejected: {
            variant: 'red',
            text: 'Rejected'
        },
        사후검토: {
            variant: 'gray-txt-wh',
            text: '사후검토'
        }
    };

    const onSelect = (e) => {
        e.stopPropagation();
        onChange && onChange(e);
    };

    return (
        <div className="box line shadow timesheet-item border-line">
            <div className="border-item">
                <div className="subject-wrap">
                    {!disabled &&
                        <Checkbox dataSet={engData} dataKey='selected' onChange={(e) => onSelect(e)} />
                    }
                    <div className="text-area">
                        <div className="flex items-center gap6">
                            <div className="tag-wrap">
                                {!copy &&
                                    <Tag variant={statusMap[engData.STATUS]?.variant} tagType="request" text={statusMap[engData.STATUS]?.text} />
                                }
                            </div>

                            <div className="subject" onClick={onClick}>
                                <h2 className="eng-name">{engData.ENG_DESC || engData.RETAIN_ENG_DESC}</h2>

                                {!copy &&
                                    <Icon icon="arrow-right" />
                                }
                            </div>
                        </div>

                        <div className="eng-code-area">
                            <div className="pipe-list">
                                <span className="pipe-item">{`${engData.MERC_ACTUAL_ENG_CODE}`}</span>
                                <span className="pipe-item">{`${engData.STATUS === 'unsubmitted' ? engData.ACTIVITY_CODE || '0000' : engData.DEMAND_ACTIVITY_CODE || '0000'}`}</span>
                            </div>
                            <div className="time">
                                <span className="actual-time">{Number(engData.Total_A || 0).toFixed(2)}</span>
                                <span className="plan-time">({Number(engData.Total_R || 0).toFixed(2)})</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-item time-list-wrap">
                <div className="time-list">
                    <div className="time-item">
                        {/* 제출된 일자인 경우 state="submit" 추가 */}
                        <Tag variant='blue' tagType="time" state={engData.STATUS !== 'unsubmitted' && `submit`} text={Number(engData.Sa || 0).toFixed(2)} />
                    </div>
                    <div className="time-item">
                        <Tag variant='pink' tagType="time" state={engData.STATUS !== 'unsubmitted' && `submit`} text={Number(engData.Su || 0).toFixed(2)} />
                    </div>
                    <div className="time-item">
                        <Tag variant='gray-txt-bk' tagType="time" state={engData.STATUS !== 'unsubmitted' && `submit`} text={Number(engData.Mo || 0).toFixed(2)} />
                    </div>
                    <div className="time-item">
                        <Tag variant='gray-txt-bk' tagType="time" state={engData.STATUS !== 'unsubmitted' && `submit`} text={Number(engData.Tu || 0).toFixed(2)} />
                    </div>
                    <div className="time-item">
                        <Tag variant='gray-txt-bk' tagType="time" state={engData.STATUS !== 'unsubmitted' && `submit`} text={Number(engData.We || 0).toFixed(2)} />
                    </div>
                    <div className="time-item">
                        <Tag variant='gray-txt-bk' tagType="time" state={engData.STATUS !== 'unsubmitted' && `submit`} text={Number(engData.Th || 0).toFixed(2)} />
                    </div>
                    <div className="time-item">
                        <Tag variant='gray-txt-bk' tagType="time" state={engData.STATUS !== 'unsubmitted' && `submit`} text={Number(engData.Fr || 0).toFixed(2)} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TmsEngBox;