/* eslint-disable react/prop-types */
import Tag from "../../../common/component/tag/Tag";
import styles from "./PayDataBox.module.css"

const PayDataBox = ({ dataObj, onClick, type }) => {
    const payObj = dataObj || {};
    const statusMap = {
        SA: "승인 진행 중",
        FA: "승인 진행 중",
        FC: "승인 진행 중",
        CP: "승인 완료",
    };

    const cplTrue = type === 'detail' ? 'line-green' : 'green';
    const cplFalse = type === 'detail' ? 'line-yellow' : 'light-yellow';

    return (
        <div className={`box line ${type ? `${type}` : ''}`} onClick={onClick}>
            <div className={`${styles['info-wrap']}`}>
                {/* AP전표명 요청일자 */}
                <div className={`${styles['title-wrap']}`}>
                    <div className={`${styles['title']}`}>{payObj.voucherId}</div>
                    <div className={`${styles['date-wrap']}`}>
                        <span className={`${styles['text']}`}>요청 일자</span>
                        <span>{payObj.requestDate || payObj.createDate}</span>
                    </div>
                </div>
                {/* 승인상태 금액 */}
                <div className="flex justify-between">
                    <Tag variant={payObj.statusCd === 'CP' ? cplTrue : cplFalse} tagType="approve" text={statusMap[payObj.statusCd] || payObj.statusCdName} />
                    <div className={`${styles['amount-list']}`}>
                        <div className={`${styles['amount-area']}`}>
                            <span className={`${styles['text']}`}>Amount</span>
                            <span>{payObj.currency} {payObj.totPaymentAmt?.toLocaleString()}</span>
                        </div>
                        {type === 'detail' &&
                            <>
                                <div className={`${styles['amount-area']}`}>
                                    <span className={`${styles['text']}`}>Tax Amount</span>
                                    <span>{payObj.currency} {payObj.totTaxAmt?.toLocaleString()}</span>
                                </div>
                                <div className={`${styles['amount-area']}`}>
                                    <span className={`${styles['text']}`}>Total Amount</span>
                                    <span>{payObj.currency} {payObj.totAmt?.toLocaleString()}</span>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>

            {/* 요청자 */}
            <div className={`${styles['info-wrap']}`}>
                <div className={`${styles['name-wrap']}`}>
                    <span>{`${payObj.requestName}`}</span>
                    <span>{`${payObj.provisionTypeName}`}</span>
                </div>
                <div className={`${styles['sub-text-wrap']}`}>
                    <div className={`${styles['text']}`}>{`${payObj.requestDepart}`}</div>
                </div>
            </div>
        </div>
    );
};

export default PayDataBox;
