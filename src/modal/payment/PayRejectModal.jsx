import { useEffect } from "react";
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";
import EasyList from "../../common/dataset/EasyList";
import Button from "../../common/component/button/Button";
import EasyObj from "../../common/dataset/EasyObj";
import Checkbox from "../../common/component/checkbox/Checkbox";

const PayRejectModal = ({ isOpen, onClose, onTotal, onFinance, dataObj }) => {
    const payObj = dataObj || {}
    useEffect(() => {
        /**
         * @TODO
         * 현황 데이터리스트 가져오기
         */
    }, []);
    const disabled = payObj.apVoucher?.statusCd !== 'FA';
    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="AP 전표 반려 방식 선택 팝업"
            description="AP 전표 반려 방식 선택 팝업"
            small
        >
            <div className="popup-wrap bg-bk choice-popup">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <div className="popup-title">반려 방식을 선택해 주세요</div>
                    </div>
                </div>
                <div className="popup-body">
                    <div className="btn-wrap gap12">
                        <Button size="hXlarge" variant="outline" className="choice-btn" onClick={() => onTotal()} >
                            전체 반려
                            <div className="sub-text">전체 결재단계 Roll Back</div>
                        </Button>
                        <Button disabled={disabled} size="hXlarge" variant="outline" className={`choice-btn ${disabled && '!bg-bgGr !text-gray-400'}`} onClick={() => onFinance()} >
                            Finance 반려
                            <div className={`sub-text ${disabled && '!text-gray-400'}`}>Finance 승인 Roll Back</div>
                        </Button>
                    </div>
                </div>
            </div>
        </BottomSheet>
    );
};

export default PayRejectModal;