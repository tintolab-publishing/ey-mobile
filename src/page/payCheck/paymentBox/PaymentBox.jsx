import styles from "./PaymentBox.module.css"

const PaymentBox = ({ }) => {
    /**
     * @TODO
     * type: detail, main
     * type에 따라서 색 반전 필요
     *
     */

    return (
        <div className="box line detail">
            <div className={`${styles['info-wrap']}`}>
                <div className={`${styles['title-wrap']}`}>
                    <div className={`${styles['title']}`}>HY 6월 급여 지급 명세서</div>
                </div>
            </div>
        </div>
    );
};

export default PaymentBox;
