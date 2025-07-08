/* eslint-disable react/prop-types */
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";

const PayRejectHistModal = ({ isOpen, onClose, dataList }) => {
    const rejectList = dataList || [];

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="AP전표 반려 이력"
            description="AP전표 반려 이력"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <h2 className="popup-title">반려 이력</h2>
                    </div>
                </div>
                <div className="popup-body">
                    <div className="contents-wrap">
                        {rejectList.map((reject, index) => (
                            <div className='box bg-lightgray border-line' key={index}>
                                <div className="border-item">
                                    <div className="person-info-wrap">
                                        <div className="person-info">
                                            <h2 className="name">{reject.approvalGpnName}</h2>
                                            <div className="date">{reject.cancelDate?.substring(0, 10)}</div>
                                            <div className="part">{reject.approvalDepart}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-item">
                                    <div className="text-wrap">
                                        <div className="text">{reject.cancelDesc}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                </div>
            </div>
        </BottomSheet>
    );
};

export default PayRejectHistModal;