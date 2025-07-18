import styles from "./PaymentBox.module.css"

const PaymentBox = ({ dataSet }) => {
    const paymentInfoData = dataSet || {};

    return (
        <div className="box line detail">
            <div className={styles.titleWrap}>
                <div className={styles.title}>{paymentInfoData.title}</div>
            </div>
            <div className={styles.infoWrap}>
                <div className={styles.infoArea}>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>지급일자</span>
                        <span className={styles.value}>{paymentInfoData.date}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>근무기간</span>
                        <span className={styles.value}>{paymentInfoData.period}</span>
                    </div>
                </div>
                <div className={`${styles.infoArea} ${styles.paymentInfo}`}>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Payment</span>
                        <span className={`${styles.value} ${styles.right}`}>₩ {paymentInfoData.payment}</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.label}>Total Amount of Deduction</span>
                        <span className={`${styles.value} ${styles.right}`}>₩ {paymentInfoData.total}</span>
                    </div>
                </div>
                <div className={styles.netAmount}>
                    <span className={styles.label}>Net Amount</span>
                    <span className={styles.value}>₩ {paymentInfoData.netAmount}</span>
                </div>
            </div>
        </div>
    );
};

export default PaymentBox;
