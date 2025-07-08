import Tag from "../../../common/component/tag/Tag";
import styles from "./ApprovalBox.module.css"

const ApprovalBox = ({ dataObj, alwaysVisible, index }) => {
    const aprObj = dataObj || {};

    // 상태에 따라 배경색을 다르게 설정
    const statusColor = aprObj.approvalStatusCode === 'APV' || aprObj.approvalStatusCode === 'DGT' ? 'green' :
        alwaysVisible ? 'light-yellow' : 'gray-txt-wh';

    return (
        <div className={styles['approval-list']}>
            <div className="flex justify-between mb4">
                <div className="flex gap8">
                    <span className={styles['step']}>{index + 1}차</span>
                    <span className={styles['name']}>{aprObj.approvalGpnName}</span>
                </div>

                <div className="flex gap-3">
                    <p className={styles['date']}>{aprObj.updateDate}</p>
                    <Tag variant={statusColor} tagType="approve" text={aprObj.approvalStatusCodeName || (alwaysVisible ? '승인 진행 중' : '미승인')} />
                </div>
            </div>
            <div className="pipe-list">
                <span className="pipe-item">{aprObj.approvalDepart}</span>
                <span className="pipe-item">{aprObj.positionName}</span>
            </div>
        </div>
    );
};

export default ApprovalBox;
