import Tag from "../../../common/component/tag/Tag";
import styles from "./ApprovalBox.module.css"

const ApprovalBox = ({ dataSet }) => {
    const aprData = dataSet || {};

    // 상태에 따라 배경색을 다르게 설정
    const statusColor = aprData.approvalStatusCodeName === '승인' ? 'green' :
        aprData.approvalStatusCodeName === '' ? 'light-yellow' : 'gray-txt-wh';

    return (
        <div className={styles['approval-list']}>
            <div className="flex justify-between mb4">
                <p className={styles['role']}>{aprData.approvalRoleName}</p>
                <Tag variant={statusColor} tagType="approve" text={aprData.approvalStatusCodeName || '승인 진행 중'} />
            </div>
            <div className="flex justify-between">
                <p className={styles['name']}>{aprData.approvalGpnName}</p>
                <p className={styles['date']}>{aprData.updateDate}</p>
            </div>
        </div>
    );
};

export default ApprovalBox;
