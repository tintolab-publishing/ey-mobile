/* eslint-disable react/prop-types */
import Tag from "../../../common/component/tag/Tag";
import styles from "./ApprovalBox.module.css"

const ApprovalBox = ({ index, dataSet, alwaysVisible, isRejected }) => {
    const aprData = dataSet || {};

    // 상태에 따라 배경색을 다르게 설정
    const statusColor = aprData.approvalStatusCodeName === '승인 완료' ? 'green' :
        aprData.approvalStatusCodeName === '승인 반려' ? 'light-pink' :
            alwaysVisible && aprData.approvalStatusCodeName === '' ? 'light-yellow' : 'gray-txt-wh';

    return (
        <div className={styles['approval-list']}>
            <div className="flex justify-between mb4">
                <div className="flex gap-3">
                    <p className={styles['role']}>{index}차</p>
                    <p className={styles['name']}>{aprData.approverInfo}</p>
                </div>
                <div className="flex gap-2">
                    <p>{aprData.updateDate}</p>
                    <Tag variant={statusColor} tagType="approve" text={aprData.approvalStatusCodeName || (isRejected ? '미승인' : (alwaysVisible ? '승인 진행 중' : '미승인'))} />
                </div>
            </div>
            <div className="pipe-list">
                <span className="pipe-item">{aprData.departName}</span>
                <span className="pipe-item">{aprData.positionName}</span>
            </div>
        </div>
    );
};

export default ApprovalBox;
