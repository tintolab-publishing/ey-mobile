/* eslint-disable react/prop-types */
import { useContext } from "react";
import Tag from "../../../common/component/tag/Tag";
import styles from "./RrObjBox.module.css"
import { AppContext } from "../../../common/share/AppContext";

const RrObjBox = ({ dataObj, onClick, type, modal }) => {
    /**
     * @TODO
     * type: detail, main
     * type에 따라서 색 반전 필요
     * 
     * 계약명에 말줄임 처리 필요
     */
    const rrObj = dataObj || {};
    const statusMap = {
        REQ: "승인 진행 중",
        CPL: "승인 완료",
        RJT: "승인 반려"
    };
    console.log(rrObj);
    const cplTrue = type === 'detail' ? 'line-green' : 'green';
    const cplFalse = type === 'detail' ? 'line-yellow' : 'light-yellow';
    const rjtTrue = type === 'detail' ? 'line-red' : 'light-pink'
    return (
        <div className={`box line ${type ? `${type}` : ''}`} onClick={onClick}>
            <div className={`${styles['info-wrap']}`}>
                {/* 계약명 승인상태 */}
                <div className={`${styles['title-wrap']}`}>
                    <div className={`${styles['title']}`}>{rrObj.roundRobinName}</div>
                    <Tag variant={rrObj.roundRobinStatus === 'CPL' ? cplTrue : rrObj.roundRobinStatus === 'RJT' ? rjtTrue : cplFalse} tagType="approve" text={statusMap[rrObj.roundRobinStatus]} />
                </div>
                {/* 계약번호벤더명 rev */}
                <div className="pipe-list">
                    <span className="pipe-item">{`${rrObj.roundRobinId}`}</span>
                    <span className="pipe-item template-name">{`${rrObj.templateName || '-'}`}</span>
                </div>
            </div>

            {/* 금액 요청일자 */}
            <div className={`${styles['info-wrap']} flex justify-between items-start`}>
                <div className="flex flex-col">
                    <div className={`${styles['name']}`}>{`${rrObj.requestName}`}</div>
                    <div className={`${styles['sub-text-wrap']}`}><span>{rrObj.requestDept}</span></div>
                </div>
                <div className={`${styles['date-wrap']}`}>
                    <span className={`${styles['text']}`}>요청 일자</span>
                    <span>{rrObj.requestDate?.substring(0, 10) || rrObj.createDate?.substring(0, 10)}</span>
                </div>
            </div>
        </div>
    );
};

export default RrObjBox;
