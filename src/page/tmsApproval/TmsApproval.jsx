import { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import Dropdown from '../../common/component/dropdown/Dropdown';
import EasyObj from '../../common/dataset/EasyObj';
import EasyList from '../../common/dataset/EasyList';
import Calendar from '../../common/component/calendar/Calendar';
import Input from '../../common/component/input/Input';
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';
import Select from '../../common/component/select/Select';
import Button from '../../common/component/button/Button';
import Tab from "../../common/component/tab/Tab";
import { AppContext } from '../../common/share/AppContext';
import Icon from '../../common/component/icon/Icon';
import ModeSelector from '../../common/component/modeSelector/ModeSelector';
import TmsListBox from './tmsListBox/TmsListBox';
import TmsOpenBox from './tmsOpenBox/TmsOpenBox';
import CheckButton from '../../common/component/checkButton/CheckButton';
import TmsApprDetailModal from '../../modal/tmsApproval/TmsApprDetailModal';
import ApprovalModal from '../../modal/ApprovalModal';
import RejectModal from '../../modal/RejectModal';
import CalendarModal from '../../modal/CalendarModal';

const TmsApproval = () => {
    const cmn = useContext(AppContext);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const auditGlobList = EasyList();
    const eowDate = searchParams.get('EOW_DATE');
    const ui = EasyObj(
        {
            mode: 'list',
            allCheck: false,
            detailModal: false,
            approvalModal: false,
            rejectModal: false,
        }
    )

    const reqObj = EasyObj({
        reqDate: eowDate ? eowDate : format(endOfWeek(new Date(), { weekStartsOn: 6 }), 'yyyy-MM-dd'),
    });

    const detailData = EasyObj();

    const tabList = EasyList([
        { title: "미승인건", count: '', selected: true },
        { title: "전체", count: '', },
    ]);

    const eowList = EasyList();
    const unApprObj = EasyObj();
    const apprList = EasyList();
    const apprReqList = EasyList();
    const rejectReqObj = EasyObj();

    useEffect(() => {
        const fetchData = async () => {
            await cmn.getUserInfo();
            await Promise.all([
                selectUnApprList(),
                selectApprList()
            ]);
        }
        fetchData();
    }, []);

    const onCheckChange = () => {
        if (tabList[0].selected) {
            if (Object.values(unApprObj).flatMap(tmsDay =>
                tmsDay.flatMap(eng =>
                    eng.engList.filter(eng => eng.selected)
                )
            ).length === 0) {
                ui.allCheck = false;
            } else {
                ui.allCheck = true;
            }
        }
        else if (tabList[1].selected) {
            if (apprList.find(tms => !tms.selected)) {
                ui.allCheck = false;
            } else {
                ui.allCheck = true;
            }
        }
    };

    const onAllCheck = (e) => {
        if (tabList[0].selected) {
            unApprObj.forAll(tms => {
                tms.selected = e.target.value;
                tms.map(tmsDay => {
                    tmsDay.selected = e.target.value;
                    tmsDay.engList.map(eng => {
                        if (e.target.value === true) {
                            if (eng.STATUS === 'requested' && !eng.over52 && !(eng.isFutureWeek && eng.isAudit)) {
                                eng.selected = true;
                            }
                        }
                        else {
                            eng.selected = false;
                        }
                    });
                });
            });
        }
        else if (tabList[1].selected) {
            apprList.forAll(tms => {
                tms.selected = e.target.value;
                tms.engList.map(eng => {
                    if (e.target.value === true) {
                        if (eng.STATUS === 'requested' && !eng.over52 && !(eng.isFutureWeek && eng.isAudit)) {
                            eng.selected = true;
                        }
                    }
                    else {
                        eng.selected = false;
                    }
                });
            });
        }
    };

    const onDateChange = (e) => {
        reqObj.reqDate = e.endDate;
    };

    const onCalendarClick = () => {
        setShowCalendar(!showCalendar);
    };

    const onListClick = (tmsData) => {
        detailData.copy(tmsData);
        ui.detailModal = true;
    };

    const onReject = () => {
        const reqList = isUnApprTab ?
            Object.values(unApprObj).flatMap(tmsDay =>
                tmsDay.flatMap(eng =>
                    eng.engList.filter(eng => eng.selected)
                )
            )
            : apprList.flatMap(appr =>
                appr.engList.filter(eng => eng.selected)
            );

        rejectReqObj.copy(reqList[0]);
        ui.rejectModal = true;
    };

    const onApproval = async () => {
        const reqList = isUnApprTab ?
            Object.values(unApprObj).flatMap(tmsDay =>
                tmsDay.flatMap(eng =>
                    eng.engList.filter(eng => eng.selected)
                )
            )
            : apprList.flatMap(appr =>
                appr.engList.filter(eng => eng.selected)
            );

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
        // isUnApprTab ? selectUnApprList() : selectApprList();
        await Promise.all([
            selectUnApprList(),
            selectApprList()
        ]);
    };

    const onApprovalDone = async (apprReqList) => {
        for (let i = 0; i < apprReqList.length; i++) {
            const result = await processTimeReport(apprReqList[i], 'approve');
            if (result.result === false && result.description) {
                cmn.showAlert(result.description);
                return;
            }
        }
        // isUnApprTab ? selectUnApprList() : selectApprList();
        await Promise.all([
            selectUnApprList(),
            selectApprList()
        ]);
    };

    const onSearch = () => {
        selectApprList();
    };

    const onTabChange = (tab) => {
        unApprObj.forAll(tms => {
            tms.selected = false;
            tms.map(tmsDay => {
                tmsDay.selected = false;
                tmsDay.engList.map(eng => {
                    eng.selected = false;
                });
            });
        });
        apprList.forAll(tms => {
            tms.selected = false;
            tms.engList.map(eng => {
                eng.selected = false;
            });
        });
    };

    const onDetailClose = async (refresh) => {
        ui.detailModal = false;
        if (refresh) {
            await Promise.all([
                selectUnApprList(),
                selectApprList()
            ]);
        }
    };

    const processTimeReport = async (reqObj, type) => {
        const data = {
            REQUEST_NO: reqObj.REQUEST_NO,
            TYPE: type,
            APPR_DESCRIPTION: reqObj.rejectComment || '',
            EP_TYPE: reqObj.EP_GPN === reqObj.DEMAND_EP_GPN ? 'default' : reqObj.EP_GPN === cmn.userInfo.GPN ? 'former' : 'follower',
            FOLLOWER_EP: reqObj.DEMAND_EP_GPN,
            approveReqList: '',
            DELEGAOR_GPN: '',
            EP_NAME: cmn.userInfo.KOR_NAME,
            activeEpGpn: cmn.userInfo.GPN,
            eowDate: format(new Date(reqObj.EOW_DATE), 'yyyy-MM-dd'),
            ENG_CODE: reqObj.ACTUAL_ENG_CODE,
        };

        const req = {
            url: '/timeSheet/processTimeReport.do',
            method: 'POST',
            type: 'urlEncoded',
            data: data
        };
        const api = await cmn.axios(req);
        console.log(api);
        return api.data;
    }

    const validateApprReqList = async (reqObj) => {
        const data = {
            apprReqList: [reqObj.REQUEST_NO]
        };

        const req = {
            url: '/timeSheet/validateApprReqList.do',
            method: 'POST',
            type: 'urlEncoded',
            data: data
        };
        const api = await cmn.axios(req);
        return api.data.alertInfo;
    };

    const selectApprList = async () => {
        // 1. 먼저 engagement 리스트를 가져옴
        await retrieveEngagementList();

        // 2. 모든 상세 정보를 병렬로 가져옴
        await Promise.all(
            apprList.map(tmsObj =>
                retrieveTimeReportByEngagement(tmsObj)
            )
        );
    };

    const retrieveEngagementList = async () => {
        const req = {
            url: '/timeSheet/retrieveEngagementList.do',
            method: 'POST',
            type: 'urlEncoded',
            data: {
                startDate: format(startOfWeek(new Date(reqObj.reqDate), { weekStartsOn: 6 }), 'yyyy-MM-dd'),
                endDate: reqObj.reqDate,
                epGpn: cmn.userInfo.GPN,
            }
        };
        const api = await cmn.axios(req);
        api.data.result.map(item => {
            item.STATUS = item.TOTAL_REPORT <= (item.APPROVED_REPORT + item.REJECTED_REPORT) ? 'approved' : 'unsubmitted';
            item.STATUS = item.REQUESTED_REPORT > 0 ? 'awaiting' : item.STATUS;
        })
        // STATUS 기준으로 정렬
        const sortOrder = {
            'awaiting': 1,
            'unsubmitted': 2,
            'approved': 3
        };
        api.data.result.sort((a, b) => sortOrder[a.STATUS] - sortOrder[b.STATUS]);
        apprList.copy(api.data.result);
    };

    const retrieveTimeReportByEngagement = async (tmsObj) => {
        const req = {
            url: '/timeSheet/retrieveTimeReportByEngagement.do',
            method: 'POST',
            type: 'urlEncoded',
            data: {
                engCode: tmsObj.ENGAGEMENT_CODE,
                startDate: format(startOfWeek(new Date(reqObj.reqDate), { weekStartsOn: 6 }), 'yyyy-MM-dd'),
                endDate: reqObj.reqDate,
                eng_owner_gpn: tmsObj.ENGAGEMENT_OWNER_GPN
            }
        };
        const api = await cmn.axios(req);
        // 조건에 맞는 항목만 필터링
        api.data.result = api.data.result.filter(item => {
            // 첫 번째 조건: DEMAND_EP_GPN이나 EP_GPN이 현재 사용자와 일치
            const isUserMatch = cmn.userInfo.GPN === item.DEMAND_EP_GPN || cmn.userInfo.GPN === item.EP_GPN;
            // 두 번째 조건: RETAIN 관련 조건
            const isRetainValid = tmsObj.ENGAGEMENT_CODE === item.RETAIN_ENG_CODE &&
                cmn.userInfo.GPN === tmsObj.ENGAGEMENT_OWNER_GPN &&
                item.RETAIN_CONNECTION != 0;
            // 두 조건 중 하나라도 true면 유지
            return isUserMatch || isRetainValid;
        });

        api.data.result.map(item => {

            item.Sa_A = Number(item.Sa_A).toFixed(2);
            item.Mo_A = Number(item.Mo_A).toFixed(2);
            item.Tu_A = Number(item.Tu_A).toFixed(2);
            item.We_A = Number(item.We_A).toFixed(2);
            item.Th_A = Number(item.Th_A).toFixed(2);
            item.Fr_A = Number(item.Fr_A).toFixed(2);
            item.Su_A = Number(item.Su_A).toFixed(2);

            item.Sa_R = Number(item.Sa_R).toFixed(2);
            item.Su_R = Number(item.Su_R).toFixed(2);
            item.Mo_R = Number(item.Mo_R).toFixed(2);
            item.Tu_R = Number(item.Tu_R).toFixed(2);
            item.We_R = Number(item.We_R).toFixed(2);
            item.Th_R = Number(item.Th_R).toFixed(2);
            item.Fr_R = Number(item.Fr_R).toFixed(2);

            item.Sa = Number(item.STATUS === 'unsubmitted' ? item.Sa_A : item.Sa_D).toFixed(2);
            item.Su = Number(item.STATUS === 'unsubmitted' ? item.Su_A : item.Su_D).toFixed(2);
            item.Mo = Number(item.STATUS === 'unsubmitted' ? item.Mo_A : item.Mo_D).toFixed(2);
            item.Tu = Number(item.STATUS === 'unsubmitted' ? item.Tu_A : item.Tu_D).toFixed(2);
            item.We = Number(item.STATUS === 'unsubmitted' ? item.We_A : item.We_D).toFixed(2);
            item.Th = Number(item.STATUS === 'unsubmitted' ? item.Th_A : item.Th_D).toFixed(2);
            item.Fr = Number(item.STATUS === 'unsubmitted' ? item.Fr_A : item.Fr_D).toFixed(2);

            item.Total_A = Number(item.Sa) + Number(item.Su) + Number(item.Mo) + Number(item.Tu) + Number(item.We) + Number(item.Th) + Number(item.Fr);
            item.Total_R = Number(item.Sa_R) + Number(item.Su_R) + Number(item.Mo_R) + Number(item.Tu_R) + Number(item.We_R) + Number(item.Th_R) + Number(item.Fr_R);

            let W_TYPE = (item.WORKING_TYPE === "WS0001" ? "재량" : item.WORKING_TYPE);
            W_TYPE = (item.WORKING_TYPE === "WS0002" ? "선택" : W_TYPE);
            W_TYPE = (item.WORKING_TYPE === "WS0003" ? "탄력" : W_TYPE);
            W_TYPE = (item.WORKING_TYPE === "WS0004" || !item.WORKING_TYPE ? "준수" : W_TYPE);
            W_TYPE = (item.WORKING_TYPE === "WS0005" ? "탄력(2주)" : W_TYPE);
            item.W_TYPE = W_TYPE;

            item.isAudit = cmn.userInfo.SERVICE_LINE === '01';
            item.isFutureWeek = item.EOW_DATE && format(new Date(item.EOW_DATE), 'yyyy-MM-dd') > format(endOfWeek(new Date(), { weekStartsOn: 6 }), 'yyyy-MM-dd');
            item.over52 = tmsObj.OVER_52HOURS_LIST?.some(overItem => overItem.GPN === item.GPN);

            if (item.STATUS === 'requested' && item.TRANSFER_YN === 'Y') {
                item.STATUS = 'Transfer';
            }
        });

        const startDate = startOfWeek(new Date(reqObj.reqDate), { weekStartsOn: 6 });
        const endDate = new Date(reqObj.reqDate);

        api.data.dates = eachDayOfInterval({
            start: startDate,
            end: endDate
        }).map(date => format(date, 'dd'));

        const sortOrder = {
            'requested': 1,
            'unsubmitted': 2,
            'submitted': 3
        };
        api.data.result.sort((a, b) => sortOrder[a.STATUS] - sortOrder[b.STATUS]);

        tmsObj.engList = api.data.result;
        tmsObj.dates = api.data.dates;
    }

    const selectUnApprList = async () => {
        await selectUnApprEowList();
        unApprObj.copy({});
        tabList[0].tempCount = 0;

        // 1. engagement 리스트들을 병렬로 가져옴
        await Promise.all(
            eowList.map(eow =>
                retrieveUnApprEngagementList(eow.EOW_DATE)
            )
        );

        // 2. 모든 상세 정보를 병렬로 가져옴
        await Promise.all(
            eowList.flatMap(eow =>
                unApprObj[eow.EOW_DATE].map(obj =>
                    retrieveTimeUnApprReportByEngagement(obj, eow.EOW_DATE)
                )
            )
        );

        tabList[0].count = tabList[0].tempCount.toString();
    };

    const selectUnApprEowList = async () => {
        const req = {
            url: '/timeSheet/selectUnApprEowList.do',
            method: 'POST',
            type: 'urlEncoded',
            data: {
                code: '4',
                friday: format(endOfWeek(new Date(), { weekStartsOn: 6 }), 'yyyy-MM-dd'),
                epGpn: cmn.userInfo.GPN,
            }
        };
        const api = await cmn.axios(req);
        eowList.copy(api.data.result.eowDateList);
    };

    const retrieveUnApprEngagementList = async (EOW_DATE) => {
        const req = {
            url: '/timeSheet/retrieveUnApprEngagementList.do',
            method: 'POST',
            type: 'urlEncoded',
            data: {
                startDate: format(startOfWeek(new Date(EOW_DATE), { weekStartsOn: 6 }), 'yyyy-MM-dd'),
                endDate: EOW_DATE,
                epGpn: cmn.userInfo.GPN,
                type: 'unAppr'
            }
        };
        const api = await cmn.axios(req);
        api.data.result.map(item => {
            item.STATUS = item.TOTAL_REPORT <= (item.APPROVED_REPORT + item.REJECTED_REPORT) ? 'approved' : 'unsubmitted';
            item.STATUS = item.REQUESTED_REPORT > 0 ? 'awaiting' : item.STATUS;
        })
        unApprObj[EOW_DATE] = api.data.result;
    };

    const retrieveTimeUnApprReportByEngagement = async (tmsObj, EOW_DATE) => {
        const req = {
            url: '/timeSheet/retrieveUnApprTimeReportByEngagement.do',
            method: 'POST',
            type: 'urlEncoded',
            data: {
                engCode: tmsObj.ENGAGEMENT_CODE,
                startDate: format(startOfWeek(new Date(EOW_DATE), { weekStartsOn: 6 }), 'yyyy-MM-dd'),
                endDate: EOW_DATE,
                eng_owner_gpn: tmsObj.ENGAGEMENT_OWNER_GPN
            }
        };
        const api = await cmn.axios(req);
        // 조건에 맞는 항목만 필터링
        api.data.result = api.data.result.filter(item => {
            // 첫 번째 조건: DEMAND_EP_GPN이나 EP_GPN이 현재 사용자와 일치
            const isUserMatch = cmn.userInfo.GPN === item.DEMAND_EP_GPN || cmn.userInfo.GPN === item.EP_GPN;
            // 두 번째 조건: RETAIN 관련 조건
            const isRetainValid = tmsObj.ENGAGEMENT_CODE === item.RETAIN_ENG_CODE &&
                cmn.userInfo.GPN === tmsObj.ENGAGEMENT_OWNER_GPN &&
                item.RETAIN_CONNECTION != 0;
            // 두 조건 중 하나라도 true면 유지
            return isUserMatch || isRetainValid;
        });

        // 필터링된 배열에 대해 기존 매핑 작업 수행
        api.data.result.map(item => {
            item.Sa_A = Number(item.Sa_A).toFixed(2);
            item.Mo_A = Number(item.Mo_A).toFixed(2);
            item.Tu_A = Number(item.Tu_A).toFixed(2);
            item.We_A = Number(item.We_A).toFixed(2);
            item.Th_A = Number(item.Th_A).toFixed(2);
            item.Fr_A = Number(item.Fr_A).toFixed(2);
            item.Su_A = Number(item.Su_A).toFixed(2);

            item.Sa_R = Number(item.Sa_R).toFixed(2);
            item.Su_R = Number(item.Su_R).toFixed(2);
            item.Mo_R = Number(item.Mo_R).toFixed(2);
            item.Tu_R = Number(item.Tu_R).toFixed(2);
            item.We_R = Number(item.We_R).toFixed(2);
            item.Th_R = Number(item.Th_R).toFixed(2);
            item.Fr_R = Number(item.Fr_R).toFixed(2);

            item.Sa = Number(item.STATUS === 'unsubmitted' ? item.Sa_A : item.Sa_D).toFixed(2);
            item.Su = Number(item.STATUS === 'unsubmitted' ? item.Su_A : item.Su_D).toFixed(2);
            item.Mo = Number(item.STATUS === 'unsubmitted' ? item.Mo_A : item.Mo_D).toFixed(2);
            item.Tu = Number(item.STATUS === 'unsubmitted' ? item.Tu_A : item.Tu_D).toFixed(2);
            item.We = Number(item.STATUS === 'unsubmitted' ? item.We_A : item.We_D).toFixed(2);
            item.Th = Number(item.STATUS === 'unsubmitted' ? item.Th_A : item.Th_D).toFixed(2);
            item.Fr = Number(item.STATUS === 'unsubmitted' ? item.Fr_A : item.Fr_D).toFixed(2);

            item.Total_A = Number(item.Sa) + Number(item.Su) + Number(item.Mo) + Number(item.Tu) + Number(item.We) + Number(item.Th) + Number(item.Fr);
            item.Total_R = Number(item.Sa_R) + Number(item.Su_R) + Number(item.Mo_R) + Number(item.Tu_R) + Number(item.We_R) + Number(item.Th_R) + Number(item.Fr_R);

            let W_TYPE = (item.WORKING_TYPE === "WS0001" ? "재량" : item.WORKING_TYPE);
            W_TYPE = (item.WORKING_TYPE === "WS0002" ? "선택" : W_TYPE);
            W_TYPE = (item.WORKING_TYPE === "WS0003" ? "탄력" : W_TYPE);
            W_TYPE = (item.WORKING_TYPE === "WS0004" || !item.WORKING_TYPE ? "준수" : W_TYPE);
            W_TYPE = (item.WORKING_TYPE === "WS0005" ? "탄력(2주)" : W_TYPE);
            item.W_TYPE = W_TYPE;

            item.isAudit = cmn.userInfo.SERVICE_LINE === '01';
            item.isFutureWeek = item.EOW_DATE && format(new Date(item.EOW_DATE), 'yyyy-MM-dd') > format(endOfWeek(new Date(), { weekStartsOn: 6 }), 'yyyy-MM-dd');
            item.over52 = tmsObj.OVER_52HOURS_LIST?.some(overItem => overItem.GPN === item.GPN);

            if (item.STATUS === 'requested' && item.TRANSFER_YN === 'Y') {
                item.STATUS = 'Transfer';
            }
        });

        const startDate = startOfWeek(new Date(EOW_DATE), { weekStartsOn: 6 });
        const endDate = new Date(EOW_DATE);

        api.data.dates = eachDayOfInterval({
            start: startDate,
            end: endDate
        }).map(date => format(date, 'dd'));

        tmsObj.engList = api.data.result;
        tmsObj.dates = api.data.dates;
        tabList[0].tempCount += api.data.result.length;
    }

    const [showCalendar, setShowCalendar] = useState(false);

    const isUnApprTab = tabList.find(item => item.selected).title === '미승인건';

    const rejectDisabled = ui.mode === 'open' && (
        isUnApprTab
            ? Object.values(unApprObj).flatMap(tmsDay =>
                tmsDay.flatMap(eng =>
                    eng.engList?.filter(eng => eng.selected)
                )
            ).length !== 1
            : apprList.flatMap(appr =>
                appr.engList?.filter(eng => eng.selected)
            ).length !== 1
    );

    const approvalDisabled = ui.mode === 'open' && (
        isUnApprTab
            ? Object.values(unApprObj).flatMap(tmsDay =>
                tmsDay.flatMap(eng =>
                    eng.engList?.filter(eng => eng.selected)
                )
            ).length === 0
            : apprList.flatMap(appr =>
                appr.engList?.filter(eng => eng.selected)
            ).length === 0
    );

    return (
        <div className="page-wrap">
            <div className="page-content">
                <div className="tab-wrap">
                    <Tab dataList={tabList} onChange={onTabChange} />
                    <div className="tab-content">
                        {tabList.find(item => item.selected).title === '전체' &&
                            <div className="input-wrap search-input">
                                <div className="input-area" onClick={onCalendarClick} >
                                    <Input className="" readOnly dataObj={reqObj} dataKey="reqDate" />
                                    <Icon icon="calendar" />
                                </div>
                                <Button className="search-btn rounded-l-none" size="hSmall" onClick={onSearch}>
                                    <Icon icon="search" />
                                </Button>
                            </div>
                        }
                        <ModeSelector onChange={(newMode) => ui.mode = newMode} />
                        {tabList[0].selected &&
                            <>
                                <div className={`approval-timesheet-wrap ${tabList[1].selected ? 'all' : ''}`}>
                                    {eowList.map((date, index) => (
                                        <div key={index} className="timesheet-list">
                                            <h2 className="list-title">{cmn.formatDate(date.EOW_DATE, 'YYYY.MM.DD')}</h2>
                                            {
                                                unApprObj[date.EOW_DATE]
                                                    ?.map((tms, index) => (
                                                        ui.mode === 'list' ?
                                                            <TmsListBox key={index} dataObj={tms} onClick={(tmsData) => onListClick(tmsData)} />
                                                            : <TmsOpenBox key={index} dataObj={tms} onChange={() => onCheckChange()} />
                                                    ))
                                            }
                                        </div>
                                    ))}
                                </div>
                                {Object.values(unApprObj).every(list => list.length === 0) &&
                                    <div className="empty-list">
                                        <div className="text">미승인된 TimeSheet가 없습니다.</div>
                                    </div>
                                }
                            </>
                        }
                        {tabList[1].selected &&
                            <>
                                <div className={`approval-timesheet-wrap ${tabList[1].selected ? 'all' : ''}`}>
                                    <div className="timesheet-list">
                                        {apprList.map((tms, index) => (
                                            ui.mode === 'list' ?
                                                <TmsListBox key={index} dataObj={tms} onClick={(tmsData) => onListClick(tmsData)} />
                                                : <TmsOpenBox key={index} dataObj={tms} onChange={() => onCheckChange()} />
                                        ))
                                        }
                                    </div>
                                </div>
                                {apprList.length === 0 &&
                                    <div className="empty-list">
                                        <div className="text">승인요청된 TimeSheet가 없습니다.</div>
                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
            </div>
            {
                ui.mode === 'open' &&
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
            }
            {
                ui.detailModal &&
                <TmsApprDetailModal dataSet={detailData} isOpen={ui.detailModal} onClose={(refresh) => onDetailClose(refresh)}
                    validateApprReqList={validateApprReqList} processTimeReport={processTimeReport}
                />
            }
            {
                ui.rejectModal &&
                <RejectModal isOpen={ui.rejectModal} onAccept={(rejectReqObj) => onRejectDone(rejectReqObj)} onClose={() => ui.rejectModal = false} dataObj={rejectReqObj} />
            }
            {showCalendar &&
                <CalendarModal isOpen={showCalendar} onClose={() => setShowCalendar(false)} onAccept={(e) => { onDateChange(e); onSearch(); }} dataObj={reqObj} />
            }
        </div >
    );
};

export default TmsApproval;