/* eslint-disable react/prop-types */
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";
import DetailProcurement from "../../page/procurement/DetailProcurement";

const PayPcmDetailodal = ({ isOpen, onClose, dataObj }) => {
    const voucherObj = dataObj || [];
    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="AP전표 구매 팝업"
            description="AP전표 구매 팝업"
        >
            <div className="popup-wrap">
                <div className="popup-body">
                    <DetailProcurement subcontractCode={voucherObj.subcontractCode} subcontractRevision='1' modal />
                </div>
            </div>
        </BottomSheet>
    );
};

export default PayPcmDetailodal;