/* eslint-disable react/prop-types */
import Button from '../../../common/component/button/Button';
import Dropdown from '../../../common/component/dropdown/Dropdown';
import styles from './PayInfo.module.css'

// eslint-disable-next-line no-unused-vars
const PayInfo = ({ dataObj, className, onRejectHist, onPcm, onPay, onEns, onRoundRobin, modal }) => {
    const payObj = dataObj || {};

    const onPcmClick = () => {
        onPcm && onPcm()
    };

    const onRoundRobinClick = () => {
        onRoundRobin && onRoundRobin()
    };

    const onEnsClick = () => {
        onEns && onEns()
    };

    const onPayClick = () => {
        onPay && onPay()
    };

    return (
        <div className={"box line shadow"}>
            <div className={`${styles['box-title-wrap']} cursor-pointer`} >
                <span className={`${styles['box-title']}`}>AP 기본정보</span>
                {!modal && payObj.approvalCancelList?.length > 0 &&
                    <Button className="w-xsmall" size="xsmall" variant='outlineGray' onClick={onRejectHist}>반려 이력</Button>
                }
            </div>
            <div className="info-box-wrap">
                <div className="box info-box">
                    <div className="info-text-list-wrap">
                        <div className="info-text-list">
                            <div className="info-text w-full">
                                <p className="label">Invoice No.</p>
                                <p className="value">{payObj.apVoucher?.invoiceNo || '-'}</p>
                            </div>
                            <div className="info-text">
                                <p className="label">{"Request Date"}</p>
                                <p className="value">{payObj.apVoucher?.requestDate}</p>
                            </div>
                            <div className="info-text">
                                <p className="label">{"Invoice Date"}</p>
                                <p className="value">{payObj.apVoucher?.invoiceDate}</p>
                            </div>
                            <div className="info-text w-full">
                                <p className="label">Description</p>
                                <p className="value">{payObj.apVoucher?.voucherDesc}</p>
                            </div>
                            <div className="info-text w-full">
                                <p className="label">작성자 Comment</p>
                                <p className="value">{payObj.apVoucher?.draftComment || '-'}</p>
                            </div>
                            <div className="info-text w-full">
                                <p className="label">Auto Pay (SL 해당없음, CBS용)</p>
                                <p className="value">{`${payObj.apVoucher?.autoPay === 'Y' ? '예' : '아니오'}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <Dropdown className="box info-box" title="상세정보">
                    <div className="info-text-list-wrap">
                        <div className="info-text-list">
                            <div className="info-text">
                                <p className="label">{"지급요청일"}</p>
                                <p className="value">{payObj.apVoucher?.paymentReqDate}</p>
                            </div>
                            <div className="info-text">
                                <p className="label">{"지급보류 요청"}</p>
                                <p className="value">{payObj.apVoucher?.holdingYn === 'Y' ? '예' : '아니오'}</p>
                            </div>
                            <div className="info-text w-full">
                                <p className="label">선급금 신청전표</p>
                                <p className={`value ${payObj.apVoucher?.refVoucherId && 'underline'}`} onClick={payObj.apVoucher?.refVoucherId ? () => onPayClick(payObj.apVoucher.refVoucherId) : undefined}>
                                    {payObj.apVoucher?.refVoucherId || '-'}
                                </p>
                            </div>
                            <div className="info-text">
                                <p className="label">{"Vendor ID"}</p>
                                <p className="value">{payObj.apVoucher?.vendorId}</p>
                            </div>
                            <div className="info-text">
                                <p className="label">{"Vendor Name"}</p>
                                <p className="value">{payObj.apVoucher?.vendorName}</p>
                            </div>
                            <div className="info-text w-full">
                                <p className="label">선급금 정산전표</p>
                                <p className="value">{`${payObj.apVoucher?.provisionVoucherId || '-'}`}</p>
                            </div>
                            <div className="info-text">
                                <p className="label">{"구매 계약번호(하도급"}</p>
                                <p className={`value ${payObj.apVoucher?.subcontractCode && 'underline'}`} onClick={payObj.apVoucher?.subcontractCode ? () => onPcmClick(payObj.apVoucher.subcontractCode) : undefined}>
                                    {payObj.apVoucher?.subcontractCode || '-'}
                                </p>
                            </div>
                            {/**
                             * @TODO
                             * 기안서 작업 후 팝업 연결
                             */}
                            <div className="info-text">
                                <p className="label">{"기안서 번호"}</p>
                                <p className={`value ${payObj.apVoucher?.roundRobinId && 'underline'}`} onClick={payObj.apVoucher?.roundRobinId && onRoundRobinClick || null}>
                                    {payObj.apVoucher?.roundRobinId || '-'}
                                </p>
                            </div>
                            <div className="info-text">
                                <p className="label">{"사업자 등록번호"}</p>
                                <p className="value">{payObj.apVoucher?.licenseNo}</p>
                            </div>
                            <div className="info-text">
                                <p className="label">{"ENS id"}</p>
                                <p className={`value ${payObj.apVoucher?.ensId && 'underline'}`} onClick={payObj.apVoucher?.ensId && onEnsClick || null}>
                                    {payObj.apVoucher?.ensId || '-'}
                                </p>
                            </div>
                            <div className="info-text w-full">
                                <p className="label">법인 지금은행</p>
                                <p className="value">{`${payObj.apVoucher?.paymentBankName || '-'}`}</p>
                            </div>
                            <div className="info-text">
                                <p className="label">{"사업장"}</p>
                                <p className="value">{payObj.apVoucher?.businessPlace}</p>
                            </div>
                            <div className="info-text">
                                <p className="label">{"관할세무서"}</p>
                                <p className="value">{payObj.apVoucher?.sectionCode || '-'}</p>
                            </div>
                            <div className="info-text">
                                <p className="label">{"PO/Non-PO"}</p>
                                <p className="value">{payObj.apVoucher?.mercuryPo ? 'PO' : 'Non-PO'}</p>
                            </div>
                            <div className="info-text">
                                <p className="label">{"MerCury PO"}</p>
                                <p className="value">{payObj.apVoucher?.mercuryPo || '-'}</p>
                            </div>
                        </div>
                    </div>
                </Dropdown>
            </div>
        </div>
    );
}

export default PayInfo;