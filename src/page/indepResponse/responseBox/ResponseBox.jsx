/* eslint-disable react/prop-types */
import Tag from "../../../common/component/tag/Tag";
import styles from "./ResponseBox.module.css"

const ResponseBox = ({ index, company, status, date }) => {

    const statusMap = {
        pending: {
            variant: 'light-pink',
            text: '미제출'
        },
        editing: {
            variant: 'light-yellow',
            text: '작성중'
        },
        complete: {
            variant: 'gray-txt-wh',
            text: '제출완료'
        },
    };

     const currentStatus = statusMap[status] || statusMap.pending;

    return (
        <div className="response-item box line shadow">
            <div className="flex flex-col">
                <div className={styles.companyWrap}>
                    <p className={styles.count}>{index}</p>
                    <p className={styles.companyName}>{company}</p>
                </div>
                <div className="flex justify-between">
                    <div className={styles.dateWrap}>
                        <p>회신기한</p>
                        <p className={styles.date}>{date}</p>
                    </div>
                    <Tag variant={currentStatus.variant} tagType="approve" text={currentStatus.text} />
                </div>
            </div>
        </div>
    );
};

export default ResponseBox;
