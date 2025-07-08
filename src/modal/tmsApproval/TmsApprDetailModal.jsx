/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";
import Select from "../../common/component/select/Select";
import EasyList from "../../common/dataset/EasyList";
import Button from "../../common/component/button/Button";
import EasyObj from "../../common/dataset/EasyObj";
import Icon from "../../common/component/icon/Icon";
import Input from "../../common/component/input/Input";
import Tag from "../../common/component/tag/Tag";
import CheckButton from "../../common/component/checkButton/CheckButton";
import TmsDetailBox from "../../page/tmsApproval/tmsDetailBox/TmsDetailBox";
import ApprovalModal from "../ApprovalModal";
import RejectModal from "../RejectModal";
import { AppContext } from "../../common/share/AppContext";

const TmsApprDetailModal = ({ isOpen, onClose, dataSet, validateApprReqList, processTimeReport }) => {
    const detailData = dataSet || {};
    console.log(detailData);
    const cmn = useContext(AppContext);

    const ui = EasyObj({
        approvalModal: false,
        rejectModal: false
    });

    const apprReqList = EasyList();
    const rejectReqObj = EasyObj();

    useEffect(() => {
        /**
         * @TODO
         * 현황 데이터리스트 가져오기
         */
    }, []);

    const statusMap = {
        awaiting: {
            variant: 'yellow',
            text: 'Awaiting'
        },
        approved: {
            variant: 'gray-txt-wh',
            text: 'Approved'
        },
        rejected: {
            variant: 'red',
            text: 'Rejected'
        },
        Transfer: {
            variant: 'gray-txt-wh',
            text: 'Transfer'
        },
        unsubmitted: {
            variant: 'gray-txt-wh',
            text: 'Draft'
        },
        unknown: {
            variant: 'gray-txt-wh',
            text: 'Unknown'
        }
    };

    const onReject = () => {
        const reqList = detailData.engList.filter(eng => eng.selected);
        rejectReqObj.copy(reqList[0]);
        ui.rejectModal = true;
    };

    const onApproval = async () => {
        const reqList = detailData.engList.filter(eng => eng.selected);

        try {
            // validation 체크를 병렬로 실행
            const validationResults = await Promise.all(
                reqList.map(req => validateApprReqList(req))
            );

            // validation 결과 확인
            const failedValidation = validationResults.find(result => result.alertCd !== 'CONTINUE');
            if (failedValidation) {
                cmn.showAlert(failedValidation.alertMsg);
                return;
            }

            // 모든 validation이 통과되면 승인 진행
            apprReqList.copy(reqList);
            onApprovalDone(apprReqList);

        } catch (error) {
            cmn.showAlert('승인 처리 중 오류가 발생했습니다.');
        }
    };

    const onRejectDone = async (rejectReqObj) => {
        const result = await processTimeReport(rejectReqObj, 'decline');
        if (result.result === false && result.description) {
            cmn.showAlert(result.description);
            return;
        }
        ui.rejectModal = false;
        onClose(true);
    };

    const onApprovalDone = async (apprReqList) => {
        for (let i = 0; i < apprReqList.length; i++) {
            const result = await processTimeReport(apprReqList[i], 'approve');
            if (result.result === false && result.description) {
                cmn.showAlert(result.description);
                return;
            }
        }
        onClose(true);
    };


    const onAllCheck = () => {
        detailData.engList.map(eng => {
            if (eng.STATUS === 'requested' && parseInt(eng.Total_A) < 52) {
                eng.selected = ui.allCheck;
            }
        });
    };

    const rejectDisabled = (!detailData.engList.find(item => item.selected) || detailData.engList.filter(item => item.selected).length !== 1);
    const approvalDisabled = !detailData.engList.find(item => item.selected);

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="TMS 상세"
            description="TMS 상세"
        >
            <div className="popup-wrap eng-detail">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <div className="tag-wrap">
                            <Tag variant={statusMap[detailData.STATUS]?.variant} tagType="request" text={statusMap[detailData.STATUS]?.text} />
                        </div>
                        <div className="flex gap6">
                            <h2 className="popup-title">{detailData.ENGAGEMENT_NAME}</h2>
                        </div>
                        <span className="sub-text">{detailData.MERC_ENGAGEMENT_CODE}</span>
                    </div>
                </div>
                <div className="popup-body">
                    <div className="detail-content gap16">
                        {detailData.engList.map((eng, index) => (
                            <div className='box detail-box' key={index}>
                                <TmsDetailBox dataObj={eng} dates={detailData.dates} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="floating-btn-wrap">
                <CheckButton className={`floating-btn check-btn white`} dataSet={ui} dataKey='allCheck' onChange={(e) => onAllCheck(e)}>
                    {ui.allCheck ?
                        <Icon icon='list-check-yellow' />
                        : <Icon icon='list-check' />
                    }
                </CheckButton>
                <Button disabled={rejectDisabled} className={`floating-btn white ${rejectDisabled && 'disabled'}`} gap="small" onClick={() => onReject()}>
                    반려
                </Button>
                <Button disabled={approvalDisabled} className={`floating-btn primary ${approvalDisabled && 'disabled'}`} gap="small" onClick={() => onApproval()}>
                    승인
                </Button>
            </div>
            {ui.rejectModal &&
                <RejectModal isOpen={ui.rejectModal} onAccept={(rejectReqObj) => onRejectDone(rejectReqObj)} onClose={() => ui.rejectModal = false} dataObj={rejectReqObj} />
            }
        </BottomSheet>
    );
};

export default TmsApprDetailModal;