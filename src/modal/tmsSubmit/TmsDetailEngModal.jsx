/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";
import Select from "../../common/component/select/Select";
import EasyList from "../../common/dataset/EasyList";
import Button from "../../common/component/button/Button";
import EasyObj from "../../common/dataset/EasyObj";
import TmsSearchEngModal from "./TmsSearchEngModal";
import TmsSearchEpModal from "./TmsSearchEpModal";
import { endOfWeek, subWeeks, getDay, subDays, format } from 'date-fns';
import Icon from "../../common/component/icon/Icon";
import Input from "../../common/component/input/Input";
import EngTimeBox from "../../page/tmsSubmit/engTimeBox/EngTimeBox";
import Tag from "../../common/component/tag/Tag";
import { AppContext } from "../../common/share/AppContext";

const TmsDetailEngModal = ({ isOpen, onClose, onSaveDone, dataObj }) => {
    const cmn = useContext(AppContext);
    const datailObj = dataObj || {};
    const modifiedObj = EasyObj();
    const activityCodeList = EasyList();
    const suvAcctivityCodeList = EasyList();
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [epModalOpen, setEpModalOpen] = useState(false);

    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
        modifiedObj.deepCopy(datailObj);
        suvAcctivityCodeList.copy(modifiedObj.cpaTypeList);
        retrieveActivityCodeList();
        /**
         * @TODO
         * 현황 데이터리스트 가져오기
         */
    }, []);

    const onSaveClick = () => {
        /**
         * @TODO
         * $.inArray(ACTIVE_EY_RANK, apprExceptionList) > -1 && ACTIVE_SERVICE_LINE != "01" 이면 독립성 체크
         */
        const today = new Date().setHours(0, 0, 0, 0);
        const currentEOW = endOfWeek(today, { weekStartsOn: 6 }).setHours(0, 0, 0, 0);
        const eowDate = new Date(modifiedObj.EOW_DATE).setHours(0, 0, 0, 0);
        if (eowDate < currentEOW) {
            cmn.showAlert('과거 주차 타임시트 변경은 웹에서 진행해주세요.');
            return;
        }
        if (!modifiedObj.Sa) modifiedObj.Sa = '0.00';
        if (!modifiedObj.Su) modifiedObj.Su = '0.00';
        if (!modifiedObj.Mo) modifiedObj.Mo = '0.00';
        if (!modifiedObj.Tu) modifiedObj.Tu = '0.00';
        if (!modifiedObj.We) modifiedObj.We = '0.00';
        if (!modifiedObj.Th) modifiedObj.Th = '0.00';
        if (!modifiedObj.Fr) modifiedObj.Fr = '0.00';

        onSaveDone(modifiedObj);
    };

    const onInputChange = () => {
        setDisabled(false);
    };

    const onActCdChange = (e) => {
        modifiedObj.ACTIVITY_CODE = e.target.value;
        if (modifiedObj.ACTIVITY_CODE === 'QRA3' || modifiedObj.ACTIVITY_CODE === 'YE03') {
            modifiedObj.SUB_ACTIVITY_CODE = 'none';
        } else {
            modifiedObj.SUB_ACTIVITY_CODE = '';
        }
        setDisabled(false);
    };

    const onSubActCdChange = (e) => {
        modifiedObj.SUB_ACTIVITY_CODE = e.target.text;
        setDisabled(false);
    };

    const onEngSearch = () => {
        if (datailObj.FIXED_ENG === 'Y' && datailObj.CR_FIXED_ENG !== 'N') {
            /**
             * @TODO
             * alert공통팝업변경
             */
            cmn.showAlert('감사보고서일이 확정되어 Engagement를 변경할 수 없습니다.')
        }
        else {
            setAddModalOpen(true);
        }
    };

    const onAddDone = (engData) => {
        console.log(modifiedObj);
        console.log(engData);
        if (modifiedObj.ENG_TYPE === 'N' && engData.E_TYPE_CLS !== 'N') {
            cmn.showAlert('Non-chargeable engagement는 Non-chargeable engagement로만 변경이 가능합니다.');
            return;
        }
        else if (modifiedObj.ENG_TYPE !== 'N' && engData.E_TYPE_CLS === 'N') {
            cmn.showAlert('chargeable 및 AP engagement는 Non-chargeable engagement로 변경할 수 없습니다.');
            return;
        }
        const newEngItem = {
            REQUEST_NO: modifiedObj.REQUEST_NO,
            EOW_DATE: modifiedObj.EOW_DATE,
            EP_NAME: engData.EP_NAME,
            EM_NAME: engData.EM_NAME,
            ENG_DESC: engData.E_NM,
            ENG_TYPE: engData.E_TYPE_CLS,
            E_TYPE: engData.E_TYPE,
            EP_GPN: engData.EP_GPN,
            EM_GPN: engData.EM_GPN,
            STATUS: 'unsubmitted',
            APPROVED: 'false',
            ACTUAL_ENG_CODE: engData.EID,
            MERC_ACTUAL_ENG_CODE: engData.MERC_EID,
            ACTIVITY_CODE: '0000',
            SUB_ACTIVITY_CODE: '',
            DEMAND_LOC1: "KR",
            DEMAND_LOC2: "KR",
            RETAIN_CONNECTION: '0',
            DESCRIPTION: '',
            GLOB_SVC_CD: engData.GLOB_SVC_CD,
            Sa_A: '0',
            Su_A: '0',
            Mo_A: '0',
            Tu_A: '0',
            We_A: '0',
            Th_A: '0',
            Fr_A: '0',
            Sa_R: '0',
            Su_R: '0',
            Mo_R: '0',
            Tu_R: '0',
            We_R: '0',
            Th_R: '0',
            Fr_R: '0',
        };
        modifiedObj.copy(newEngItem);
        retrieveActivityCodeList();
        setDisabled(false);
    };

    const onEpSearch = () => {
        // 감사코드 체크
        const isAuditCode = modifiedObj.auditGlobList?.some(item => item.VALUE === modifiedObj.GLOB_SVC_CD);
        if (isAuditCode) {
            cmn.showAlert('감사 코드는 EP를 변경할 수 없습니다.');
            return;
        }

        // non-chargeable 체크
        const isNc = modifiedObj.ENG_TYPE === 'N';
        if (isNc) {
            cmn.showAlert('Non-chargeable 코드는 EP를 설정할 수 없습니다.');
            return;
        }

        setEpModalOpen(true);
    };

    const onEpAddDone = (epData) => {
        /*
        if(!datailObj.reqExceptionList.find(item=>item.GPN === cmn.userInfo.GPN) && datailObj.AUDIT_GLOB_SVC_CD.find(item=>item.globSvcCd === datailObj.GLOV_SVC_CD)){
            //EP조회하여 조회된 EP와 선택한 EP가 다르면 EP변경불가 alert
        }*/
        modifiedObj.EP_NAME = epData.KOR_NAME;
        modifiedObj.EP_GPN = epData.GPN;
        setDisabled(false);
    };

    const retrieveActivityCodeList = async () => {
        const req = {
            url: `/timeSheet/retrieveActivityCodeList.do?eid=${modifiedObj.ACTUAL_ENG_CODE}`,
            method: 'GET'
        }
        const api = await cmn.axios(req);

        // API 응답이 비어있는 경우
        if (!api.data.result || api.data.result.length === 0) {
            // input으로 표시되도록 플래그 설정
            modifiedObj.showActivityCodeAsInput = true;
            modifiedObj.ACTIVITY_CODE = modifiedObj.ACTIVITY_CODE || '0000';
            return;
        }

        // 기존 로직
        api.data.result.map(item => {
            item.ACIVITY_DESC = `(${item.ACTIVITY_CODE})${item.ACTIVITY_NAME}`;
        });

        const defaultOption = {
            ACIVITY_DESC: 'Activity Code 선택',
            ACTIVITY_CODE: '----',
            placeholder: true
        };

        const newData = [defaultOption, ...api.data.result];
        activityCodeList.copy(newData);

        if (!modifiedObj.ACTIVITY_CODE) {
            const isAuditCode = modifiedObj.auditGlobList?.some(item => item.VALUE === modifiedObj.GLOB_SVC_CD);
            if (isAuditCode) {
                modifiedObj.ACTIVITY_CODE = activityCodeList[0].ACTIVITY_CODE;
            }
            else {
                activityCodeList.map(item => item.selected = item.ACTIVITY_CODE === '0000');
                modifiedObj.ACTIVITY_CODE = '0000';
            }
        }
        else {
            console.log(modifiedObj.ACTIVITY_CODE);
            const actCode = modifiedObj.STATUS === 'unsubmitted' ? modifiedObj.ACTIVITY_CODE : modifiedObj.DEMAND_ACTIVITY_CODE;
            const subActCode = modifiedObj.STATUS === 'unsubmitted' ? modifiedObj.SUB_ACTIVITY_CODE : modifiedObj.DEMAND_SUB_ACTIVITY_CODE;
            modifiedObj.ACTIVITY_CODE = actCode;
            modifiedObj.SUB_ACTIVITY_CODE = subActCode;
            activityCodeList.map(item => {
                item.selected = item.ACTIVITY_CODE === modifiedObj.ACTIVITY_CODE;
            })
            if (modifiedObj.ACTIVITY_CODE === 'QRA3' || modifiedObj.ACTIVITY_CODE === 'YE03') {
                suvAcctivityCodeList.map(item => {
                    item.selected = item.CPA_TYPE === (modifiedObj.SUB_ACTIVITY_CODE || 'none');
                })
            }
        }
    };

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="Engagement 상세"
            description="Engagement 상세"
        >
            <div className="popup-wrap eng-detail">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        {modifiedObj.STATUS === 'rejected' &&
                            <Tag variant='red' tagType="request" text='Rejected' />
                        }
                        <div className="flex gap6">
                            <h2 className="popup-title">{modifiedObj.ENG_DESC || modifiedObj.RETAIN_ENG_DESC}</h2>
                            <Button variant="icon" onClick={onEngSearch}>
                                <Icon icon="search-gray" />
                            </Button>
                        </div>
                        <span className="sub-text">{modifiedObj.MERC_ACTUAL_ENG_CODE}</span>
                    </div>
                </div>
                <div className="popup-body">
                    <div className="detail-content gap10">
                        <div className="name-wrap">
                            <div className="name">
                                <p className="bold">EP</p>
                                <p>{modifiedObj.EP_NAME}</p>
                            </div>
                            <Button variant="icon" onClick={onEpSearch}>
                                <Icon icon="search-gray" />
                            </Button>
                        </div>
                        <div className="detail-wrap">
                            {modifiedObj.STATUS === 'rejected' &&
                                <div className="box warning-box">
                                    <div className="box-title">Rejected 사유</div>
                                    <div className="text-area">
                                        <div className="text">{modifiedObj.APPR_DESCRIPTION}</div>
                                    </div>
                                </div>
                            }
                            <div className="input-field">
                                <div className="input-wrap">
                                    <div className="input-area flex-col">
                                        <span className="label">Description</span>
                                        <Input placeholder='Description' dataObj={modifiedObj} dataKey='DESCRIPTION' onChange={onInputChange} />
                                    </div>
                                </div>
                                <div className="input-wrap flex-row">
                                    <div className="input-area flex-col">
                                        <span className="label">Activity Code</span>
                                        {modifiedObj.showActivityCodeAsInput ? (
                                            <Input
                                                value={modifiedObj.ACTIVITY_CODE}
                                                onChange={(e) => {
                                                    modifiedObj.ACTIVITY_CODE = e.target.value.toUpperCase();
                                                    onInputChange();
                                                }}
                                                style={{ textTransform: 'uppercase' }}
                                            />
                                        ) : (
                                            <Select
                                                dataList={activityCodeList}
                                                valueKey='ACTIVITY_CODE'
                                                textKey='ACIVITY_DESC'
                                                onChange={onActCdChange}
                                            />
                                        )}
                                    </div>
                                    {modifiedObj.ACTIVITY_CODE !== '0000' && (modifiedObj.ACTIVITY_CODE === 'QRA3' || modifiedObj.ACTIVITY_CODE === 'YE03') &&
                                        <div className="input-area flex-col">
                                            <span className="label">Sub Activity Code</span>
                                            <Select dataList={suvAcctivityCodeList} valueKey='CPA_TYPE' textKey='CPA_TYPE' onChange={onSubActCdChange} />
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="weekly-time-wrap submit-time-wrap">
                                <EngTimeBox dataObj={modifiedObj} onChange={onInputChange} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="floating-btn-wrap">
                <Button disabled={disabled} className={`floating-btn primary ${disabled && 'disabled'}`} gap="small" onClick={() => onSaveClick()}>
                    {modifiedObj.STATUS === 'requested' || modifiedObj.STATUS === 'rejected' || modifiedObj.STATUS === 'submitted' ?
                        '승인요청' :
                        '저장'
                    }
                </Button>
            </div>
            {addModalOpen &&
                <TmsSearchEngModal isOpen={addModalOpen} onClose={() => setAddModalOpen(false)} onAddDone={(engData) => onAddDone(engData)} />
            }
            {epModalOpen &&
                <TmsSearchEpModal isOpen={epModalOpen} onClose={() => setEpModalOpen(false)} onAddDone={(epData) => onEpAddDone(epData)} />
            }
        </BottomSheet>
    );
};

export default TmsDetailEngModal;
