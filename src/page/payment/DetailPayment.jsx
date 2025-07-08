/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../common/share/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import EasyObj from "../../common/dataset/EasyObj";
import PayDataBox from "./payDataBox/PayDataBox";
import Dropdown from "../../common/component/dropdown/Dropdown";
import ApprovalBox from "./approvalBox/ApprovalBox";
import PayInfo from "./payInfoBox/PayInfo";
import FileBox from "../../common/component/fileBox/FileBox";
import EasyList from "../../common/dataset/EasyList";
import Button from "../../common/component/button/Button";
import ApprovalModal from "../../modal/ApprovalModal";
import RejectModal from "../../modal/RejectModal";
import Icon from "../../common/component/icon/Icon";
import Tab from "../../common/component/tab/Tab";
import PayRejectHistModal from "../../modal/payment/PayRejectHistModal";
import PaySubLineModal from "../../modal/payment/PaySubLineModal";
import PayPcmDetailodal from "../../modal/payment/PayPcmDetailodal";
import PayDetailModal from "../../modal/payment/PayDetailModal";
import PayEnsDetailModal from "../../modal/payment/PayEnsDetailModal";
import PayRejectModal from "../../modal/payment/PayRejectModal";
import PayRoundRobinDetailModal from "../../modal/payment/PayRoundRobinDetailModal";

const DetailPayment = ({ refVoucherId, modal }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type");
    const cmn = useContext(AppContext);

    const payObj = EasyObj();
    const attachList = EasyList();
    const subLineObj = EasyObj();

    const [tabType, settabType] = useState();

    const modalObj = EasyObj({
        approval: false,
        reject1: false,
        reject2: false,
        rejectHist: false,
        pcm: false,
        pay: false,
        ens: false
    });

    const tabList = EasyList([
        { title: "Voucher 정보", selected: true },
        { title: "승인 정보" },
    ]);

    useEffect(() => {
        if (cmn.sharedData.tabType) {
            settabType(cmn.sharedData.tabType);
        }
    }, [cmn.sharedData.tabType]);

    const reqData = EasyObj({
        voucherId: modal ? refVoucherId : searchParams.get("voucherId"),
    });

    useEffect(() => {
        const fetch = async () => {
            await selectSubcontract();
            await selectAttachFileList();
        };
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onApproval = (apprReqList) => {
        const apprReqObj = apprReqList[0];
        approvalApVoucher(apprReqObj.apprComment);
    }

    const onReject = (rejectReqObj) => {
        rejectApprovalApVoucher(rejectReqObj.rejectComment);
    }

    const approvalApVoucher = async (comment) => {
        const req = {
            url: '/payment/api/approvalApVoucher.do',
            method: 'POST',
            data: {
                voucherId: reqData.voucherId,
                approvalDesc: comment
            },
        };
        const api = await cmn.axios(req);
        if (api.data == 1) {
            cmn.showAlert("승인 처리 완료",
                () => {
                    modalObj.approval = false;
                    cmn.sharedData.tabType = tabType;
                    navigate('/payment');
                }
            );
        } else {
            cmn.showAlert("승인 처리 실패");
        }
    }

    const rejectApprovalApVoucher = async (comment) => {
        const req = {
            url: '/payment/api/rejectApprovalApVoucher.do',
            method: 'POST',
            data: {
                voucherId: reqData.voucherId,
                approvalDesc: comment,
                approvalGpn: cmn.userInfo.GPN,
                financeReject: payObj.rejectType === 'finance' ? "Y" : "N"
            },
        };
        const api = await cmn.axios(req);
        if (api.data == 1) {
            cmn.showAlert("반려 처리 완료", () => {
                modalObj.reject2 = false;
                cmn.sharedData.tabType = tabType;
                navigate('/payment');
            });
        } else {
            cmn.showAlert("반려 처리 실패");
        }
    }

    const onRejectHistClick = () => {
        modalObj.rejectHist = true;
    };

    const onSubLineClick = (voucher) => {
        subLineObj.copy(voucher);
        subLineObj.totPaymentAmt = payObj.apVoucher.totPaymentAmt;
        modalObj.subLine = true;
    };

    const onPcmClick = () => {
        modalObj.pcm = true;
    };

    const onPayClick = () => {
        modalObj.pay = true;
    };

    const onEnsClick = () => {
        modalObj.ens = true;
    };

    const onRoundRobinClick = () => {
        modalObj.roundRobin = true;
    }

    // AP전표 상세 api
    const selectSubcontract = async () => {
        const req = {
            url: '/payment/api/selectApVoucherResponse.do',
            method: 'POST',
            data: reqData,
        };
        const api = await cmn.axios(req);

        const requestInfo = await cmn.getPeopleInfo(api.data.apVoucher.requestGpn);
        api.data.apVoucher.requestDepart = requestInfo[0].DEPART_NAME;

        const rejecterInfoPromises = api.data.approvalCancelList.map(list => cmn.getPeopleInfo(list.approvalGpn));
        const rejecterInfoResults = await Promise.all(rejecterInfoPromises);
        api.data.approvalCancelList.forEach((list, index) => {
            list.approvalDepart = rejecterInfoResults[index][0].DEPART_NAME;
        });

        const approvalInfoPromises = api.data.approvalsList.map(list => cmn.getPeopleInfo(list.approvalGpn));
        const approvalInfoResults = await Promise.all(approvalInfoPromises);
        api.data.approvalsList.forEach((list, index) => {
            list.approvalDepart = approvalInfoResults[index][0].DEPART_NAME;
            list.positionName = approvalInfoResults[index][0].POSITION_NAME;
        });

        const financeApprovalInfoPromises = api.data.financeApprovalsList.map(list => cmn.getPeopleInfo(list.approvalGpn));
        const financeApprovalInfoResults = await Promise.all(financeApprovalInfoPromises);
        api.data.financeApprovalsList.forEach((list, index) => {
            list.approvalDepart = financeApprovalInfoResults[index]?.[0]?.DEPART_NAME;
            list.positionName = financeApprovalInfoResults[index]?.[0]?.POSITION_NAME;
        });

        payObj.copy(api.data);
        console.log(payObj);
    };

    // AP전표 첨부파일리스트 api
    const selectAttachFileList = async () => {
        const req = {
            url: '/payment/api/selectAttachFileList.do',
            method: 'POST',
            data: {
                fileId: payObj.apVoucher.fileId,
            }
        };
        const api = await cmn.axios(req);
        attachList.copy(api.data);
    };

    // 첨부파일 다운로드
    const onDownload = async (file) => {
        if (cmn.APP_ENV === 'PUB') {
            alert('파일다운로드');
            return;
        }
        else {
            const req = {
                url: `/payment/api/fileDownload?fileId=${payObj.apVoucher.fileId}&fileSeq=${file.fileSeq}`,
                method: 'GET',
                additional: {
                    responseType: 'blob',
                }
            };
            const api = await cmn.axios(req);
            const url = window.URL.createObjectURL(new Blob([api.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', file.attachFileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            return;
            // window.open(`/api/payment/api/fileDownload?fileId=${payObj.apVoucher.fileId}&fileSeq=${fileSeq}`);
        }
    };

    const remind = async () => {
        const req = {
            url: '/payment/api/sendEmailReminderMobile.do',
            method: 'POST',
            data: {
                voucherId: reqData.voucherId,
            },
        };
        const api = await cmn.axios(req);
        cmn.showAlert('승인자 Reminder 메일이 발송되었습니다.');
    };

    const disabled = !['FA', 'SA'].includes(payObj.apVoucher?.statusCd);
    console.log(payObj.apVoucher?.statusCd);
    return (
        <>
            <div className="contents-wrap">
                <PayDataBox
                    dataObj={payObj.apVoucher}
                    type="detail"
                />
                <div className="tab-wrap">
                    {!modal &&
                        <Tab dataList={tabList} />
                    }
                    <div className="tab-content">
                        <div className="list-wrap flex flex-col gap16">
                            {tabList.find(item => item.selected).title === 'Voucher 정보' &&
                                <>
                                    <PayInfo dataObj={payObj} onRejectHist={onRejectHistClick} onPcm={onPcmClick} onPay={onPayClick} onEns={onEnsClick} onRoundRobin={onRoundRobinClick} modal={modal} />
                                    {!modal &&
                                        <>
                                            <Dropdown className="box line shadow" title="AP Voucher Sub Line">
                                                <div className="flex flex-col gap12">
                                                    {payObj.apVouchersList?.map((voucher, index) => (
                                                        <div className="box sub-info-box" key={index} onClick={() => onSubLineClick(voucher)}>
                                                            <div className='box-title-wrap' >
                                                                <div className='box-title' >{voucher.glAccountDescr}</div>
                                                            </div>
                                                            <div className="info-text-list-wrap">
                                                                <div className="info-text-list">
                                                                    <div className="info-text">
                                                                        <p className="label">{"Material Code"}</p>
                                                                        <p className="value">{voucher.materialClass}</p>
                                                                    </div>
                                                                    <div className="info-text">
                                                                        <p className="label">{"G/L Account"}</p>
                                                                        <p className="value">{voucher.glAccount}</p>
                                                                    </div>
                                                                    <div className="info-text">
                                                                        <p className="label">{"Total Amount"}</p>
                                                                        <p className="value">{voucher.currency} {voucher.totAmt?.toLocaleString()}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </Dropdown>
                                            <Dropdown className="box line shadow file-attach" title="첨부파일">
                                                {attachList.map((file, index) => (
                                                    <FileBox key={index} title={file.attachFileName} desc={file.description} onDownload={() => onDownload(file)} />
                                                ))}
                                            </Dropdown>
                                        </>
                                    }
                                </>
                            }

                            {tabList.find(item => item.selected).title === '승인 정보' &&
                                <>
                                    <Dropdown className="box line shadow" title="승인자 목록">
                                        {payObj.approvalsList &&
                                            payObj.approvalsList.map((approvalData, index) => (
                                                <ApprovalBox key={index} dataObj={approvalData}
                                                    index={index}
                                                    alwaysVisible={payObj.approvalsList.find(item => item.approvalStatusCode === 'REJECTED') ? payObj.approvalsList.find(item => item.approvalStatusCode === 'REJECTED').approvalSeq === approvalData.approvalSeq : payObj.approvalsList.find(item => !item.approvalStatusCode)?.approvalSeq === approvalData.approvalSeq} />
                                            ))}
                                    </Dropdown>
                                    <Dropdown className="box line shadow" title="Finance 승인 정보">
                                        {payObj.financeApprovalsList &&
                                            payObj.financeApprovalsList.map((approvalData, index) => (
                                                <ApprovalBox key={index} dataObj={approvalData}
                                                    index={index}
                                                    alwaysVisible={payObj.financeApprovalsList.find(item => item.approvalStatusCode === 'REJECTED') ? payObj.financeApprovalsList.find(item => item.approvalStatusCode === 'REJECTED').approvalSeq === approvalData.approvalSeq : payObj.financeApprovalsList.find(item => !item.approvalStatusCode)?.approvalSeq === approvalData.approvalSeq} />
                                            ))}
                                    </Dropdown>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            {!modal && type === "apr" &&
                <div className="floating-btn-wrap">
                    <Button className="floating-btn white" onClick={() => modalObj.reject1 = true}>반려</Button>
                    <Button className="floating-btn primary" onClick={() => modalObj.approval = true}>승인</Button>
                </div>
            }
            {!modal && type === "req" &&
                <div className="floating-btn-wrap">
                    <Button disabled={disabled} className={`floating-btn primary ${disabled ? 'disabled' : ''}`} gap="small" onClick={() => remind()}>
                        <Icon icon="send" />
                        승인자 Reminder 메일 발송
                    </Button>
                </div>
            }
            {modalObj.ens &&
                <PayEnsDetailModal isOpen={modalObj.ens} onClose={() => modalObj.ens = false} dataObj={payObj.apVoucher} />
            }
            {modalObj.pay &&
                <PayDetailModal isOpen={modalObj.pay} onClose={() => modalObj.pay = false} dataObj={payObj.apVoucher} />
            }
            {modalObj.pcm &&
                <PayPcmDetailodal isOpen={modalObj.pcm} onClose={() => modalObj.pcm = false} dataObj={payObj.apVoucher} />
            }
            {modalObj.roundRobin &&
                <PayRoundRobinDetailModal isOpen={modalObj.roundRobin} onClose={() => modalObj.roundRobin = false} dataObj={payObj.apVoucher} />
            }
            {modalObj.subLine &&
                <PaySubLineModal isOpen={modalObj.subLine} onClose={() => modalObj.subLine = false} dataObj={subLineObj} />
            }
            {modalObj.rejectHist &&
                <PayRejectHistModal isOpen={modalObj.rejectHist} onClose={() => modalObj.rejectHist = false} dataList={payObj.approvalCancelList} />
            }
            {modalObj.approval &&
                <ApprovalModal isOpen={modalObj.approval} onAccept={(apprReqList) => onApproval(apprReqList)} onClose={() => modalObj.approval = false} dataList={[payObj]} />
            }
            {modalObj.reject1 &&
                <PayRejectModal isOpen={modalObj.reject1} onClose={() => modalObj.reject1 = false}
                    dataObj={payObj}
                    onTotal={() => { payObj.rejectType = 'total'; modalObj.reject1 = false; modalObj.reject2 = true; }}
                    onFinance={() => { payObj.rejectType = 'finance'; modalObj.reject1 = false; modalObj.reject2 = true; }} />
            }
            {modalObj.reject2 &&
                <RejectModal isOpen={modalObj.reject2} onAccept={(rejectReqObj) => onReject(rejectReqObj)} onClose={() => modalObj.reject2 = false} dataObj={payObj} />
            }
        </>
    );
};

export default DetailPayment;