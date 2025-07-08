/* eslint-disable react/prop-types */
import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../common/share/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import EasyObj from "../../common/dataset/EasyObj";
import PcmObjBox from "./pcmObjBox/PcmObjBox";
import Dropdown from "../../common/component/dropdown/Dropdown";
import ApprovalBox from "./approvalBox/ApprovalBox";
import MasterEngInfo from "./pcmInfoBox/MasterEngInfo";
import SubEngInfo from "./pcmInfoBox/SubEngInfo";
import FileBox from "../../common/component/fileBox/FileBox";
import EasyList from "../../common/dataset/EasyList";
import Button from "../../common/component/button/Button";
import ApprovalModal from "../../modal/ApprovalModal";
import RejectModal from "../../modal/RejectModal";
import Icon from "../../common/component/icon/Icon";

const DetailProcurement = ({ subcontractCode, subcontractRevision, modal }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const type = searchParams.get("type");

    const cmn = useContext(AppContext);
    const [approval, setApproval] = useState(false);
    const [reject, setReject] = useState(false);
    const [tabType, settabType] = useState();

    const apprReqList = EasyList([{
        apprComment: ''
    }]);
    const rejectReqObj = EasyObj();

    useEffect(() => {
        if (cmn.sharedData.tabType) {
            settabType(cmn.sharedData.tabType);
        }
    }, [cmn.sharedData.tabType]);

    const reqData = EasyObj({
        subcontractCode: modal ? subcontractCode : searchParams.get("subcontractCode"),
        subcontractRevision: modal ? subcontractRevision : searchParams.get("subcontractRevision")
    });

    const pcmData = EasyObj();
    const attachment = EasyList();

    useEffect(() => {
        const fetchData = async () => {
            await cmn.getUserInfo();
            await selectSubcontract();
            await selectAttachFileList();
        };
        fetchData();
    }, []);

    const selectSubcontract = async () => {
        const req = {
            url: '/procurement/api/selectSubcontract.do',
            method: 'POST',
            data: reqData,
        };
        const api = await cmn.axios(req);
        api.data.subcontractMasterInfomation.subcontractStatus = api.data.subcontractMasterInfomation.subcontractStatus === 'IND' ? 'CPL' : api.data.subcontractMasterInfomation.subcontractStatus === 'APR' ? 'REQ' : 'NONE';
        api.data.subcontractMasterInfomation.companyNameKorean = api.data.subcontractCommercial.companyNameKorean;
        api.data.subcontractMasterInfomation.supplierContractValue = api.data.subcontractCommercial.supplierContractValue;
        api.data.subcontractMasterInfomation.currencyCode = api.data.subcontractCommercial.currencyCode;
        pcmData.copy(api.data);
        console.log(pcmData);
    };

    const selectAttachFileList = async () => {
        const req = {
            url: '/procurement/api/selectAttachFileList.do',
            method: 'POST',
            data: {
                attachFileId: pcmData.subcontractMasterInfomation.fileId
            },
        };
        const api = await cmn.axios(req);
        attachment.copy(api.data);
    };

    const fileDownload = async (file) => {
        const req = {
            url: `/procurement/api/fileDownload?attachFileId=${file.attachFileId}&sequence=${file.sequence}`,
            method: 'GET',
            additional: {
                responseType: 'blob'
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
    }

    const approvalSubcontract = async (comment) => {
        const req = {
            url: '/procurement/api/approvalSubcontract.do',
            method: 'POST',
            data: {
                approvalGpn: cmn.userInfo.GPN,
                delegateGpn: '',
                approvalDescription: comment,
                approvalGpnName: cmn.userInfo.KOR_NAME,
                delegateGpnName: '',
                subcontractCode: reqData.subcontractCode,
                subcontractRevision: reqData.subcontractRevision,
                sendEmailYn: 'Y'
            },
        };
        const api = await cmn.axios(req);
        if (api.data == 1) {
            cmn.showAlert("승인 처리 완료",
                () => {
                    setApproval(false);
                    cmn.sharedData.tabType = tabType;
                    navigate('/procurement');
                }
            );
        } else {
            cmn.showAlert("승인 처리 실패");
        }
    }

    const rejectApprovalSubcontract = async (comment) => {
        const req = {
            url: '/procurement/api/rejectApprovalSubcontract.do',
            method: 'POST',
            data: {
                subcontractCode: reqData.subcontractCode,
                subcontractRevision: reqData.subcontractRevision,
                approvalGpn: cmn.userInfo.GPN,
                approvalDescription: comment,
            },
        };
        const api = await cmn.axios(req);
        if (api.data == 0) {
            cmn.showAlert("반려 처리 완료",
                () => {
                    setReject(false);
                    cmn.sharedData.tabType = tabType;
                    navigate('/procurement');
                }
            );
        } else {
            cmn.showAlert("반려 처리 실패");
        }
    }

    const approvalClick = () => {
        apprReqList[0].apprComment = '';
        setApproval(true);
    }

    const rejectClick = () => {
        rejectReqObj.copy({});
        setReject(true);
    }

    const onApproval = (apprReqList) => {
        const apprReqObj = apprReqList[0];
        approvalSubcontract(apprReqObj.apprComment);
    }

    const onReject = (rejectReqObj) => {
        rejectApprovalSubcontract(rejectReqObj.rejectComment);
    }

    const remind = async () => {
        const req = {
            url: '/procurement/api/sendApprovalRemindMail.do',
            method: 'POST',
            data: {
                subcontractCode: reqData.subcontractCode,
                subcontractRevision: reqData.subcontractRevision,
                approvalDescription: "",
                gpn: cmn.userInfo.GPN,
            },
        };
        const api = await cmn.axios(req);
        cmn.showAlert('승인자 Reminder 메일이 발송되었습니다.');
    };

    const disabled = pcmData.subcontractMasterInfomation?.subcontractStatus === "REQ";

    return (
        <>
            <div className="contents-wrap">
                <PcmObjBox
                    dataObj={pcmData.subcontractMasterInfomation}
                    type="detail"
                    modal={modal}
                />
                {!modal &&
                    <Dropdown className="box line shadow" title="승인자 목록">
                        {pcmData.subcontractApprovals &&
                            pcmData.subcontractApprovals.map((approvalData, index) => (
                                <ApprovalBox key={index} dataSet={approvalData} alwaysVisible={approvalData.approvalStatusCodeName === ""} />
                            ))}
                    </Dropdown>
                }
                <MasterEngInfo dataSet={pcmData} />
                <SubEngInfo dataSet={pcmData} />
                <Dropdown className="box line shadow file-attach" title="첨부파일">
                    {attachment.map((file, index) => (
                        <FileBox key={index} title={file.attachFileName} desc={file.description} onDownload={() => fileDownload(file)} />
                    ))}
                </Dropdown>
            </div>
            {!modal && type === "apr" &&
                <div className="floating-btn-wrap">
                    <Button className="floating-btn white" onClick={() => rejectClick()}>반려</Button>
                    <Button className="floating-btn primary" onClick={() => approvalClick()}>승인</Button>
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
            {approval &&
                <ApprovalModal isOpen={approval} onAccept={(apprReqList) => onApproval(apprReqList)} onClose={() => setApproval(false)} dataList={apprReqList} />
            }
            {reject &&
                <RejectModal isOpen={reject} onAccept={(rejectReqObj) => onReject(rejectReqObj)} onClose={() => setReject(false)} dataObj={rejectReqObj} />
            }
        </>
    );
};

export default DetailProcurement;