/* eslint-disable react/prop-types */
import { useState } from 'react';
import Tag from '../../../common/component/tag/Tag';
import Button from '../../../common/component/button/Button';
import styles from './TmsSummaryBox.module.css'
import Icon from '../../../common/component/icon/Icon';

const TmsSummaryBox = ({ disabled, dataObj, onAddClick, onDeleteClick, onCopyClick }) => {
    const summaryData = dataObj || {};

    const totalReqTimeValid = summaryData.sumTotal_A <= 40 ?
        'bg-green' :
        summaryData.sumTotal_A <= 52 ?
            'bg-yellow' :
            'bg-red';

    return (
        <div className="box bg-bk tms-summary-total">
            <div className={`${styles['summary-area']}`}>
                <div className={`${styles['total-time-wrap']}`}>
                    <div className={`${styles['text']}`}>총 승인요청시간</div>
                    <div className={`${styles['time-area']}`}>
                        <div className={`${styles['status-mark']} ${totalReqTimeValid}`} />
                        <div className={`${styles['time']}`}>
                            <span className={`${styles['approval-time']}`}>{Number(summaryData.sumTotal_A).toFixed(2)}</span>
                            <span className={`${styles['total-time']}`}>({Number(summaryData.sumTotal_R).toFixed(2)})</span>
                        </div>
                    </div>
                </div>
                {/**
                 * @TODO
                 * 각 버튼 아이콘 변경
                 */}
                <div className="btn-wrap gap8">
                    <Button disabled={disabled} variant="func" onClick={() => onAddClick()}>
                        <Icon icon="add" />
                    </Button>
                    <Button disabled={disabled} variant="func" onClick={onDeleteClick}>
                        <Icon icon="minus" />
                    </Button>
                    <Button disabled={disabled} variant="func" onClick={() => onCopyClick()}>
                        <Icon icon="copy" />
                    </Button>
                </div>
            </div>
            <div className="time-list-wrap">
                <div className="time-list">
                    <div className="time-item">
                        <div className="text blue"> {`Sat ${summaryData.dates && summaryData.dates[0]}`}</div>
                        <Tag variant="blue" tagType="time" text={Number(summaryData.sumSa_A).toFixed(2)} />
                    </div>
                    <div className="time-item">
                        <div className="text red"> {`Sun ${summaryData.dates && summaryData.dates[1]}`}</div>
                        <Tag variant='pink' tagType="time" text={Number(summaryData.sumSu_A).toFixed(2)} />
                    </div>
                    <div className="time-item">
                        <div className="text"> {`Mon ${summaryData.dates && summaryData.dates[2]}`}</div>
                        <Tag variant='gray-txt-bk' tagType="time" text={Number(summaryData.sumMo_A).toFixed(2)} />
                    </div>
                    <div className="time-item">
                        <div className="text"> {`Tue ${summaryData.dates && summaryData.dates[3]}`}</div>
                        <Tag variant='gray-txt-bk' tagType="time" text={Number(summaryData.sumTu_A).toFixed(2)} />
                    </div>
                    <div className="time-item">
                        <div className="text"> {`Wed ${summaryData.dates && summaryData.dates[4]}`}</div>
                        <Tag variant='gray-txt-bk' tagType="time" text={Number(summaryData.sumWe_A).toFixed(2)} />
                    </div>
                    <div className="time-item">
                        <div className="text"> {`Thu ${summaryData.dates && summaryData.dates[5]}`}</div>
                        <Tag variant='gray-txt-bk' tagType="time" text={Number(summaryData.sumTh_A).toFixed(2)} />
                    </div>
                    <div className="time-item">
                        <div className="text"> {`Fri ${summaryData.dates && summaryData.dates[6]}`}</div>
                        <Tag variant='gray-txt-bk' tagType="time" text={Number(summaryData.sumFr_A).toFixed(2)} />
                    </div>
                </div>
            </div>
        </div>

    );
};

export default TmsSummaryBox;