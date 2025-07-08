/* eslint-disable react/prop-types */
import React, { useContext, useEffect } from "react";
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";
import { AppContext } from "../../common/share/AppContext";
import EasyObj from "../../common/dataset/EasyObj";
import Dropdown from "../../common/component/dropdown/Dropdown";
import EasyList from "../../common/dataset/EasyList";
import FileBox from "../../common/component/fileBox/FileBox";

const PayEnsDetailModal = ({ isOpen, onClose, dataObj }) => {
    const voucherObj = dataObj || {};
    const cmn = useContext(AppContext);

    const ensObj = EasyObj();
    const attachList = EasyList();

    useEffect(() => {
        selectExpertNetworkList();
        expertNetworkApprovalFile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 첨부파일 다운로드
    const onDownload = async (fileSeq) => {
        if (cmn.APP_ENV === 'PUB') {
            alert('파일다운로드');
            return;
        }
        else {
            const req = {
                url: `/payment/api/fileDownload?fileId=${ensObj.attachFileId}&fileSeq=${fileSeq}`,
                method: 'GET',
            };
            await cmn.axios(req);
            return;
        }
    };

    const selectExpertNetworkList = async () => {
        const req = {
            url: '/payment/api/selectExpertNetworkList.do',
            method: 'POST',
            data: {
                ensIdSequence: voucherObj.ensId
            }
        }
        const api = await cmn.axios(req);
        ensObj.copy(api.data[0]);
    }

    const expertNetworkApprovalFile = async () => {
        const req = {
            url: '/payment/api/expertNetworkApprovalFile.do',
            method: 'POST',
            data: {
                ensIdSequence: voucherObj.ensId
            }
        }
        const api = await cmn.axios(req);
        attachList.copy(api.data);
    }

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="ENS 팝업"
            description="ENS 상세 정보"
        >
            <div className="popup-wrap">
                <div className="popup-body">
                    <div className="contents-wrap">
                        <div className="box line detail border-line">
                            <div className="border-item info-wrap">
                                <div className="subject-wrap">
                                    <h3 className="subject bold">{ensObj.ensIdSequence}</h3>
                                </div>
                            </div>

                            {/* 요청자 */}
                            <div className="border-item">
                                <div className="text-wrap">
                                    <div className="text flex justify-between items-center">
                                        <span className="label">{`예상 인터뷰 Credit`}</span>
                                        <span className="value">{`총 ${ensObj.interviewCount}건 / ${ensObj.consultationsHours}건`}</span>
                                    </div>
                                    <div className="text flex justify-between items-center">
                                        <span className="label">{`인터뷰 일정`}</span>
                                        <span className="value">{ensObj.interviewDate}</span>
                                    </div>
                                    <div className="text flex justify-between items-center">
                                        <span className="label">{`예상 발생 비용`}</span>
                                        <span className="value">{ensObj.currency} {ensObj.interviewPrice?.toLocaleString()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={"box line shadow"}>
                            <div className='box-title-wrap' >
                                <span className='box-title'>ENS 기본정보</span>
                            </div>
                            <div className="box info-box">
                                <div className="info-text-list-wrap">
                                    <div className="info-text-list">
                                        <div className="info-text w-full">
                                            <p className="label">요청 ID</p>
                                            <p className="value">{ensObj.ensId || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Agency</p>
                                            <p className="value">{ensObj.vendorKoreanName || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">예상 인터뷰 시간</p>
                                            <p className="value">{ensObj.interviewCount || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Subject</p>
                                            <p className="value">{ensObj.subject || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Outline</p>
                                            <p className="value">{ensObj.outline || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Specific Requirement</p>
                                            <p className="value">{ensObj.specificRequirement || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Dropdown className="box line shadow file-attach" title="증빙자료">
                            {attachList.map((file, index) => (
                                <FileBox key={index} gubun={file.subCategory} date={file.fileCreateDate} title={file.attachFileName} desc={file.description} onDownload={() => onDownload(file.fileSequence)} />
                            ))}
                        </Dropdown>

                        <div className={"box line shadow"}>
                            <div className='box-title-wrap' >
                                <span className='box-title'>Target Expert requirement details</span>
                            </div>
                            <div className="box info-box">
                                <div className="info-text-list-wrap">
                                    <div className="info-text-list">
                                        <div className="info-text w-full">
                                            <p className="label">Field of expertise and Experience</p>
                                            <p className="value">{ensObj.expertiseField || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Preferred Position</p>
                                            <p className="value">{ensObj.preferredPosition || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Years of Experience</p>
                                            <p className="value">{ensObj.experienceYears ? `${ensObj.experienceYears}년 이상` : '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">To include expert currently holding the position</p>
                                            <p className="value">{ensObj.holdingPositionYn || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Preferred Interview Schedule</p>
                                            <p className="value">{ensObj.interviewDate || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">No of Consultation / Hours</p>
                                            <p className="value">{ensObj.consultationsHours || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Type of Consultation</p>
                                            <p className="value">{ensObj.consultationType || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Target Area / Region / Country</p>
                                            <p className="value">{ensObj.targetArea || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"box line shadow"}>
                            <div className='box-title-wrap' >
                                <span className='box-title'>Questionnaires</span>
                            </div>
                            <div className="box info-box">
                                <div className="info-text-list-wrap">
                                    <div className="info-text-list">
                                        <div className="info-text w-full">
                                            <p className="value">
                                                {ensObj.questionnaires ?
                                                    ensObj.questionnaires.split('\r\n').map((line, index) => (
                                                        <React.Fragment key={index}>
                                                            {line}
                                                            <br />
                                                        </React.Fragment>
                                                    ))
                                                    : '-'
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"box line shadow"}>
                            <div className='box-title-wrap' >
                                <span className='box-title'>Target Company</span>
                            </div>
                            <div className="box info-box">
                                <div className="info-text-list-wrap">
                                    <div className="info-text-list">
                                        <div className="info-text w-full">
                                            <p className="label">Priority 1</p>
                                            <p className="value">{ensObj.targetCompany1 || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Priority 2</p>
                                            <p className="value">{ensObj.targetCompany2 || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Priority 3</p>
                                            <p className="value">{ensObj.targetCompany3 || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Priority 4</p>
                                            <p className="value">{ensObj.targetCompany4 || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Priority 5</p>
                                            <p className="value">{ensObj.targetCompany5 || '-'}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={"box line shadow"}>
                            <div className='box-title-wrap' >
                                <span className='box-title'>Requires translarot? Select Languages</span>
                            </div>
                            <div className="box info-box">
                                <div className="info-text-list-wrap">
                                    <div className="info-text-list">
                                        <div className="info-text w-full">
                                            <p className="label">Select Language</p>
                                            <p className="value">{ensObj.transLanguage1 || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Select Language</p>
                                            <p className="value">{ensObj.transLanguage2 || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Select Language</p>
                                            <p className="value">{ensObj.transLanguage3 || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Recording</p>
                                            <p className="value">{ensObj.recordingYn || '-'}</p>
                                        </div>
                                        <div className="info-text w-full">
                                            <p className="label">Transcript</p>
                                            <p className="value">{ensObj.transcriptYn || '-'}</p>
                                        </div>
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

export default PayEnsDetailModal;