import { useContext } from "react";
import Tag from "../../../common/component/tag/Tag";
import styles from "./PcmObjBox.module.css"
import { AppContext } from "../../../common/share/AppContext";

const pcmObjBox = ({ dataObj, onClick, type, modal }) => {
    /**
     * @TODO
     * type: detail, main
     * type에 따라서 색 반전 필요
     * 
     * 계약명에 말줄임 처리 필요
     */
    const pcmObj = dataObj || {};
    const statusMap = {
        REQ: "승인 진행 중",
        CPL: "승인 완료",
    };

    const cplTrue = type === 'detail' ? 'line-green' : 'green';
    const cplFalse = type === 'detail' ? 'line-yellow' : 'light-yellow';

    return (
        <div className={`box line ${type ? `${type}` : ''}`} onClick={onClick}>
            <div className={`${styles['info-wrap']}`}>
                {/* 계약명 승인상태 */}
                <div className={`${styles['title-wrap']}`}>
                    <div className={`${styles['title']}`}>{pcmObj.projectDescription}</div>
                    {modal ?
                        <Tag variant='black-txt-wh' tagType="rev" text={`Rev.${pcmObj.subcontractRevision}`} />
                        :
                        <Tag variant={pcmObj.subcontractStatus === 'CPL' ? cplTrue : cplFalse} tagType="approve" text={statusMap[pcmObj.subcontractStatus]} />
                    }
                </div>
                {/* 계약번호벤더명 rev */}
                <div className={`${styles['sub-text-wrap']} flex justify-between`}>
                    <div className="flex items-center">
                        <span>{`${pcmObj.subcontractCode}`}</span>
                        <span className={`${styles['line']}`}></span>
                        <span>{`${pcmObj.companyNameKorean}`}</span>
                    </div>
                    {!modal &&
                        <div>Rev.{pcmObj.subcontractRevision}</div>
                    }
                </div>
            </div>

            {/* 금액 요청일자 */}
            <div className={`${styles['info-wrap']} flex justify-between items-center`}>
                <div className={`${styles['amount']}`}>{`${pcmObj.currencyCode || 'KRW'} ${pcmObj.supplierContractValue && pcmObj.supplierContractValue.toLocaleString() || ''}`}</div>
                <div className={`${styles['date-wrap']}`}>
                    <span className={`${styles['text']}`}>요청 일자</span>
                    <span>{pcmObj.requestDate?.substring(0, 10) || pcmObj.createDate?.substring(0, 10)}</span>
                </div>
            </div>
        </div>
    );
};

export default pcmObjBox;
