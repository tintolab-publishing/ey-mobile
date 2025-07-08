/* eslint-disable react/prop-types */
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";
import DetailPayment from "../../page/payment/DetailPayment";

const PayDetailModal = ({ isOpen, onClose, dataObj }) => {
    const voucherObj = dataObj || [];
    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="AP 신청전표 팝업"
            description="AP 신청전표 구매 팝업"
        >
            <div className="popup-wrap">
                <div className="popup-body">
                    <DetailPayment refVoucherId={voucherObj.refVoucherId} modal />
                </div>
            </div>
        </BottomSheet>
    );
};

export default PayDetailModal;