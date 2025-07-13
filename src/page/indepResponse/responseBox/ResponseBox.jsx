/* eslint-disable react/prop-types */
import Tag from "../../../common/component/tag/Tag";
import styles from "./ResponseBox.module.css"

const ResponseBox = ({ index, dataSet, alwaysVisible, isRejected }) => {

    const statusMap = {
        requested: {
            variant: 'red',
            text: '미제출'
        },
        submitted: {
            variant: 'yellow-txt-wh',
            text: '작성중'
        },
        rejected: {
            variant: 'gray-txt-wh',
            text: '제출완료'
        },
    };

    return (
        <div className={styles['response-list']}>
            <div className="flex justify-between mb4">
                <div className="flex gap-3">
                    <p className={styles['count']}>{index}</p>
                    <p className={styles['companyName']}>회사명</p>
                </div>
                <div className="flex gap-2">
                    <div className={styles['date-wrap']}>
                        <p>회신기한</p>
                        <p className={styles['date']}>2025-07-01</p>
                    </div>
                    <Tag variant={statusMap.variant} tagType="response" text={statusMap.text}/>
                </div>
            </div>
        </div>
    );
};

export default ResponseBox;
