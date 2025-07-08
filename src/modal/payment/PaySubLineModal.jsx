/* eslint-disable react/prop-types */
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";

const PaySubLineModal = ({ isOpen, onClose, dataObj }) => {
    const subLineObj = dataObj || {};
    const voucherTypeMap = {
        'ET': '세금계산서',
        'EN': '계산서',
        'NO': '영세',
        'NF': '영세(InterFirm)',
        'WP': '원천세(개인사업소득)',
        'WO': '원천세(기타소득)',
        'OT': '기타세금',
        'CC': '법인카드',
        'RS': '그외',
        'QQ': '상품권(기프티콘 포함)',
        'QW': '임직원 겨오사비',
        'QE': '캐디피',
    };

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="AP전표 SubLine"
            description="AP전표 SubLine"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <h2 className="popup-title">AP Voucher Sub Line</h2>
                    </div>
                </div>
                <div className="popup-body">
                    <div className="contents-wrap">
                        <div className="box info-box">
                            <div className="info-text-list-wrap">
                                <div className="info-text-list">
                                    <div className="info-text w-full">
                                        <p className="label">{"Company Code"}</p>
                                        <p className="value">{subLineObj.entity || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"No."}</p>
                                        <p className="value">{subLineObj.voucherSeq || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"Mercury Eng. ID"}</p>
                                        <p className="value">{subLineObj.mercEid || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"CostCenter ID"}</p>
                                        <p className="value">{subLineObj.mercCostCenterId || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"CostCenter ID Descr"}</p>
                                        <p className="value">{subLineObj.mercCostCenterIdDescr || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"Voucher Type"}</p>
                                        <p className="value">{voucherTypeMap[subLineObj.voucherType] || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"Currency"}</p>
                                        <p className="value">{subLineObj.currency || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"Amount"}</p>
                                        <p className="value">{subLineObj.subAmt?.toLocaleString() || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"수량"}</p>
                                        <p className="value">{subLineObj.quantity || '-'}</p>
                                    </div>
                                    <div className="info-text w-full">
                                        <p className="label">{"수량별 단위"}</p>
                                        <p className="value">{subLineObj.unitOfmeasure || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"자재그룹"}</p>
                                        <p className="value">{subLineObj.materialClassDescr || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"G/L Account"}</p>
                                        <p className="value">{subLineObj.glAccount || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"Total Billing 금액"}</p>
                                        <p className="value">{subLineObj.totPaymentAmt?.toLocaleString() || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"Total Amount (KRW)"}</p>
                                        <p className="value">{subLineObj.krwAmt?.toLocaleString() || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"Tax%"}</p>
                                        <p className="value">{Number(subLineObj.taxRatio || 0).toFixed(2)}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"FX Rate"}</p>
                                        <p className="value">{Number(subLineObj.exchangeRate || 0).toFixed(2)}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"Account Name"}</p>
                                        <p className="value">{subLineObj.glAccountDescr || '-'}</p>
                                    </div>
                                    <div className="info-text w-full">
                                        <p className="label">{"Description"}</p>
                                        <p className="value">{subLineObj.subDesc || '-'}</p>
                                    </div>
                                    <div className="info-text w-full">
                                        <p className="label">{"Allocate TO GPN"}</p>
                                        <p className="value">{subLineObj.payGpn || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"Pay CostCenter ID"}</p>
                                        <p className="value">{subLineObj.payCostCenterId || '-'}</p>
                                    </div>
                                    <div className="info-text">
                                        <p className="label">{"Pay CostCenter ID Descr"}</p>
                                        <p className="value">{subLineObj.payCostCenterIdDescr || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BottomSheet>
    );
};

export default PaySubLineModal;