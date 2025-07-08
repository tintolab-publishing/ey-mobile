/* eslint-disable react/prop-types */
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";
import DetailRoundRobin from "../../page/roundRobin/DetailRoundRobin";

const PayRoundRobinDetailModal = ({ isOpen, onClose, dataObj }) => {
    const voucherObj = dataObj || [];
    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="기안서 팝업"
            description="기안서 팝업"
        >
            <div className="popup-wrap">
                <div className="popup-body">
                    <DetailRoundRobin roundRobinId={voucherObj.roundRobinId} modal />
                </div>
            </div>
        </BottomSheet>
    );
};

export default PayRoundRobinDetailModal;