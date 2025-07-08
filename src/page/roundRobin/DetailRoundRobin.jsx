/* eslint-disable react/prop-types */
import { useState, useContext, useEffect } from "react";
import { AppContext } from "../../common/share/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import EasyObj from "../../common/dataset/EasyObj";
import Dropdown from "../../common/component/dropdown/Dropdown";
import RrObjBox from "./rrObjBox/RrObjBox";
import FileBox from "../../common/component/fileBox/FileBox";
import EasyList from "../../common/dataset/EasyList";
import Button from "../../common/component/button/Button";
import ApprovalBox from "./approvalBox/ApprovalBox";
import ApprovalModal from "../../modal/ApprovalModal";
import RejectModal from "../../modal/RejectModal";
import Icon from "../../common/component/icon/Icon";

const HtmlContent = ({ html, className = "" }) => {

    return (
        <div
            className={className}
            style={{ overflow: 'hidden' }}
        >
            <div
                style={{
                    width: '100%',
                    maxHeight: '400px',
                    overflow: 'auto'
                }}
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </div>
    );
};

const DetailRoundRobin = ({ roundRobinId, modal }) => {
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

    useEffect(() => {
        const fetchData = async () => {
            await cmn.getUserInfo();
            await selectRoundRobinApproval();
            await selectApprovals();
            await selectAttachFileList();
        };
        fetchData();
    }, []);

    const reqData = EasyObj({
        roundRobinId: modal ? roundRobinId : searchParams.get("roundRobinId"),
    });

    const rrObj = EasyObj();
    const approvalList = EasyList();
    const attachment = EasyList();

    const selectRoundRobinApproval = async () => {
        const req = {
            url: '/roundRobin2/api/selectRoundRobinApproval.do',
            method: 'POST',
            data: reqData,
        };
        const api = await cmn.axios(req);
        api.data.roundRobinStatus = api.data.statusCode === 'RC' ? 'CPL' : api.data.statusCode === 'RA' ? 'REQ' : api.data.statusCode === 'RR' ? 'RJT' : 'NONE';
        rrObj.copy(api.data);
    };

    const selectApprovals = async () => {
        const req = {
            url: '/roundRobin2/api/selectApprovals.do',
            method: 'POST',
            data: reqData,
        };
        const api = await cmn.axios(req);

        const apprInfoPromises = api.data.map(list => list.gpn ? cmn.getPeopleInfo(list.gpn) : []);
        const apprInfoResults = await Promise.all(apprInfoPromises);
        api.data.forEach((list, index) => {
            if (apprInfoResults[index].length > 0) {
                list.departName = apprInfoResults[index][0].DEPART_NAME;
                list.positionName = apprInfoResults[index][0].POSITION_NAME;
            }
        });

        approvalList.copy(api.data);
    };

    const selectAttachFileList = async () => {
        if (rrObj.fileId) {
            const req = {
                url: '/roundRobin2/api/selectAttachFileList.do',
                method: 'POST',
                data: {
                    fileId: rrObj.fileId
                },
            };
            const api = await cmn.axios(req);
            attachment.copy(api.data);
        }
    };

    const fileDownload = async (file) => {
        const req = {
            url: `/roundRobin2/api/fileDownload?fileId=${file.fileId}&fileSeq=${file.fileSeq}`,
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
    }
    // const fileDownload = (file) => {
    //     window.open(`/api/roundRobin2/api/fileDownload?fileId=${file.fileId}&fileSeq=${file.fileSeq}`);
    // };

    const approvalRoundRobin = async (comment) => {
        const req = {
            url: '/roundRobin2/api/approvalRoundRobin.do',
            method: 'POST',
            data: {
                approvalGpn: cmn.userInfo.GPN,
                roundRobinId: reqData.roundRobinId,
                approvalDesc: comment
            },
        };
        const api = await cmn.axios(req);
        if (api.data == 1) {
            cmn.showAlert("승인 처리 완료", () => {
                setApproval(false);
                cmn.sharedData.tabType = tabType;
                navigate('/roundRobin');
            });
        } else {
            cmn.showAlert("승인 처리 실패");
        }
    }

    const rejectApprovalRoundRobin = async (comment) => {
        const req = {
            url: '/roundRobin2/api/rejectApprovalRoundRobin.do',
            method: 'POST',
            data: {
                approvalGpn: cmn.userInfo.GPN,
                roundRobinId: reqData.roundRobinId,
                approvalDesc: comment
            },
        };
        const api = await cmn.axios(req);
        if (api.data == 1) {
            cmn.showAlert("반려 처리 완료",
                () => {
                    setReject(false);
                    cmn.sharedData.tabType = tabType;
                    navigate('/roundRobin');
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
        approvalRoundRobin(apprReqObj.apprComment);
    }

    const onReject = (rejectReqObj) => {
        rejectApprovalRoundRobin(rejectReqObj.rejectComment);
    }

    const remind = async () => {
        const req = {
            url: '/roundRobin2/api/remindRoundRobin.do',
            method: 'POST',
            data: {
                roundRobinId: reqData.roundRobinId,
            },
        };
        const api = await cmn.axios(req);
        cmn.showAlert('승인자 Reminder 메일이 발송되었습니다.');
    };

    const disabled = rrObj.approvalCheck != 1;
    /**
     * @TODO
     * 승인자 Reminder 메일 발송 버튼 아이콘 변경 필요
     */
    return (
        <>
            <div className="contents-wrap">
                <RrObjBox
                    dataObj={rrObj}
                    type="detail"
                    modal={modal}
                />
                {!modal &&
                    <Dropdown className="box line shadow" title="승인자 목록">
                        {approvalList.map((approvalData, index) => {
                            const isFirstEmptyStatus = approvalList.findIndex(item => item.approvalStatusCodeName === '') === index;
                            return (
                                <ApprovalBox
                                    key={index}
                                    index={index + 1}
                                    dataSet={approvalData}
                                    alwaysVisible={approvalList.find(item => item.approvalStatusCode === 'REJECTED') ? approvalList.find(item => item.approvalStatusCode === 'REJECTED').approvalSeq === approvalData.approvalSeq : isFirstEmptyStatus}
                                    isRejected={rrObj.roundRobinStatus === 'RJT'}
                                />
                            );
                        })}
                    </Dropdown>
                }
                <div className="box line">
                    <div className="box-title-wrap">
                        <div className="box-title">기안서 내용</div>
                    </div>
                    {rrObj.templateType === 'FREE' && rrObj.roundRobinContent?.length > 0 && (
                        <HtmlContent
                            html={rrObj.roundRobinContent[0].objectValue}
                            className="box info-box template"
                        />
                    )}
                    {rrObj.templateType === 'FORM' &&
                        <div className="box info-box">
                            <div className="info-text-list-wrap">
                                <div className="info-text-list">
                                    {rrObj.roundRobinContent?.length > 0 &&
                                        rrObj.roundRobinContent.map((rr, index) => (
                                            rr.bind !== 'editor1' &&
                                            <div className="info-text" key={index}>
                                                <p className="label">{rr.label}</p>
                                                <p className="value">{rr.value}</p>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            {rrObj.roundRobinContent?.length > 0 &&
                                rrObj.roundRobinContent.map((rr, index) => (
                                    rr.bind === 'editor1' &&
                                    <HtmlContent
                                        key={index}
                                        html={rr.value}
                                        className="mt-[10px]"
                                    />
                                ))}
                        </div>
                    }
                </div>
                <Dropdown className="box line shadow file-attach" title="첨부파일">
                    {attachment.map((file, index) => (
                        <FileBox key={index} title={file.attachFileName} desc={file.description} onDownload={() => fileDownload(file)} />
                    ))}
                </Dropdown>
            </div>
            {!modal && type === "apr" &&
                <div className="floating-btn-wrap">
                    <Button disabled={disabled} className={`floating-btn white ${disabled && 'disabled'}`} onClick={() => rejectClick()}>반려</Button>
                    <Button disabled={disabled} className={`floating-btn primary ${disabled && 'disabled'}`} onClick={() => approvalClick()}>승인</Button>
                </div>
            }
            {!modal && type === "req" &&
                <div className="floating-btn-wrap">
                    <Button disabled={rrObj.roundRobinStatus !== 'REQ'} className={`floating-btn primary ${rrObj.roundRobinStatus !== 'REQ' && 'disabled'}`} gap="small" onClick={() => remind()}>
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

export default DetailRoundRobin;
