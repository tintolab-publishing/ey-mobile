import { useEffect, useState, useContext } from 'react';
import TmsSearchEngModal from '../../modal/tmsSubmit/TmsSearchEngModal';
import TmsCopyEngModal from '../../modal/tmsSubmit/TmsCopyEngModal';
import TmsDetailEngModal from '../../modal/tmsSubmit/TmsDetailEngModal';
import TmsAuditModal from '../../modal/tmsSubmit/TmsAuditModal';
import TmsCertModal from '../../modal/tmsSubmit/TmsCertModal';
import TmsOverModal from '../../modal/tmsSubmit/TmsOverModal';
import TmsModifyModal from '../../modal/tmsSubmit/TmsModifyModal';
import TmsContractModal from '../../modal/tmsSubmit/TmsContractModal';
import { useLocation, useNavigate } from 'react-router-dom';
import EasyObj from '../../common/dataset/EasyObj';
import EasyList from '../../common/dataset/EasyList';
import CalendarModal from '../../modal/CalendarModal';
import Input from '../../common/component/input/Input';
import { format, startOfDay, endOfWeek, eachDayOfInterval, getDay, subDays, parseISO, addWeeks } from 'date-fns';
import Button from '../../common/component/button/Button';
import { AppContext } from '../../common/share/AppContext';
import Icon from '../../common/component/icon/Icon';
import TmsSummaryBox from './tmsSummaryBox/TmsSummaryBox';
import TmsEngBox from './tmsEngBox/TmsEngBox';
import CheckButton from '../../common/component/checkButton/CheckButton';

const TmsSubmit = () => {
    const cmn = useContext(AppContext);
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const eowDate = searchParams.get('EOW_DATE');

    const [showCalendar, setShowCalendar] = useState(false);

    const ui = EasyObj({
        allCheck: false,
        add: false,
        dupl: false,
        detail: false,
        audit: false,
        cert: false,
        over: false,
        modify: false,
        contract: false,
        submit: false
    })

    const reqObj = EasyObj({
        reqDate: eowDate ? eowDate : format(endOfWeek(new Date(), { weekStartsOn: 6 }), 'yyyy-MM-dd'),
    });

    const detailObj = EasyObj();
    const submitList = EasyList();
    const contractList = EasyList();
    const auditList = EasyList();
    const summaryObj = EasyObj()
    const engList = EasyList();
    const reqExceptionList = EasyList();
    const cpaTypeList = EasyList();
    const auditGlobList = EasyList();
    const workingHourObj = EasyObj();
    const upperEyRank = [
        {
            value: '11',
            DESCRIPTION: 'PARTNER'
        },
        {
            value: '13',
            DESCRIPTION: 'ED(상무)'
        },
        {
            value: '04',
            DESCRIPTION: 'NULL'
        },
        {
            value: '05',
            DESCRIPTION: '경영자문위원'
        },
        {
            value: '61',
            DESCRIPTION: 'Regional Talent Leader / Director'
        },
    ];

    const nonEDRankValues = upperEyRank
        .filter(rank => rank.DESCRIPTION !== 'ED(상무)')
        .map(rank => rank.value);

    const onCalendarClick = () => {
        setShowCalendar(!showCalendar);
    };

    useEffect(() => {
        const fetchData = async () => {
            await cmn.getUserInfo();
            await selectReqExceptionList();
            await selectCpaType();
            await retrieveMercuryCodeOptions();
            await retrieveWorkingHours();
            await retrieveTimeReport();
            if (reqObj.aicNonFlag === 'Y') {
                ui.cert = true;
            }
        }
        fetchData();
    }, []);

    const onDateChange = (e) => {
        reqObj.reqDate = e.endDate;
    };

    const onAddClick = () => {
        ui.add = true;
    }

    const onCopyClick = () => {
        ui.dupl = true;
    }

    const onAddDone = (engData) => {
        const newEngItem = {
            REQUEST_NO: '',
            EOW_DATE: reqObj.reqDate,
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
            ACTIVITY_CODE: '',
            SUB_ACTIVITY_CODE: '',
            DEMAND_LOC1: "KR",
            DEMAND_LOC2: "KR",
            RETAIN_CONNECTION: '0',
            DESCRIPTION: '',
            GLOB_SVC_CD: engData.GLOB_SVC_CD,
            Sa: '0',
            Su: '0',
            Mo: '0',
            Tu: '0',
            We: '0',
            Th: '0',
            Fr: '0',
            Sa_R: '0',
            Su_R: '0',
            Mo_R: '0',
            Tu_R: '0',
            We_R: '0',
            Th_R: '0',
            Fr_R: '0',
        };
        engList.unshift(newEngItem);
        calcTotalTime();
        onEngClick(newEngItem, 0)
    };

    const onDeleteClick = () => {
        const list = [];
        const listBeforeSave = [];
        let hasRetain = false;
        engList.filter(item => item.selected).map(eng => {
            if (eng.RETAIN_CONNECTION === 1) {
                eng.selected = false;
                hasRetain = true;
            }
            else {
                if (eng.REQUEST_NO) {
                    const data = {
                        gpn: cmn.userInfo.GPN,
                        keyEngagementCode: eng.ACTUAL_ENG_CODE,
                        requestNo: eng.REQUEST_NO
                    }
                    list.push(data);
                }
            }
        });
        if (list.length === 0 && hasRetain) {
            cmn.showAlert('Plan이 입력된 engagement는 삭제할 수 없습니다.');
            return;
        }
        else if (hasRetain) {
            if (!confirm('Plan이 입력된 engagement를 제외하고 삭제 처리됩니다. 진행하시겠습니까?')) {
                return;
            }
        }

        removeTimeReport(list);
    };

    const onCopyDone = (engCopyList) => {
        const newItems = engCopyList.map(item => ({
            ...item,
            STATUS: 'unsubmitted',
            APPROVED: 'false',
            selected: false,
            Sa_R: '',
            Su_R: '',
            Mo_R: '',
            Tu_R: '',
            We_R: '',
            Th_R: '',
            Fr_R: '',
            RETAIN_CONNECTION: 0,
            EOW_DATE: reqObj.reqDate,
            REQUEST_NO: ''
        }));

        engList.unshift(...newItems);
        const validation = validateTime(newItems, 'save');
        if (!validation.result) {
            cmn.showAlert(validation.msg);
            return false;
        }
        const newSubmitList = newItems.map(item => makeTmsObj(item));
        saveTimeReport(newSubmitList);
    };

    const onEngClick = (engData, index) => {
        engData.index = index;
        detailObj.copy(engData);
        detailObj.reqExceptionList = reqExceptionList;
        detailObj.cpaTypeList = cpaTypeList;
        detailObj.auditGlobList = auditGlobList;
        ui.detail = true;
    };

    const onSaveDone = (engData) => {
        const saveList = [];
        saveList.push(engData);
        const validation = validateTime(saveList, 'save');
        if (!validation.result) {
            cmn.showAlert(validation.msg);
            return false;
        }
        const index = engList.findIndex(item => item.REQUEST_NO === engData.REQUEST_NO);
        if (index !== -1) {
            engList[index] = engData;
        }
        const data = makeTmsObj(engData);
        ui.detail = false;
        // 비감사 서비스라인 파트너의 경우 saveTimeReport로 처리
        if (cmn.userInfo.SERVICE_LINE !== '01' && upperEyRank.some(rank => rank.value === cmn.userInfo.EY_RANK)) {
            onSubmit([engData]);
        }
        else if (engData.STATUS === 'requested' || engData.STATUS === 'rejected' || engData.STATUS === 'submitted') {
            onSubmit([engData]);
        }
        else {
            saveTimeReport([data]);
        }
    };

    const onSubmit = (engData = null) => {
        if (!engData) {
            submitList.copy(engList.filter(item => item.selected));
        }
        else {
            submitList.copy(engData);
        }

        const isFirst = engList.every(item => item.STATUS === 'unsubmitted');

        if (isFirst && submitList.length < engList.length) {
            cmn.showAlert("모든 Engagement의 상태가 Draft일 경우 일괄 승인요청만 가능합니다.");
            return false;
        }

        contractList.length = 0;
        auditList.length = 0;
        calcTotalTime();
        if (!engData) {
            const validation = validateTime(submitList, 'submit');
            if (!validation.result) {
                cmn.showAlert(validation.msg);
                return false;
            }
        }
        // 비감사 서비스라인 파트너의 경우 saveTimeReport로 처리
        if (cmn.userInfo.SERVICE_LINE !== '01' && upperEyRank.some(rank => rank.value === cmn.userInfo.EY_RANK)) {
            checkSumit_save();
            return;
        }

        if (submitList.find(item => item.STATUS === 'submitted')) {
            ui.modify = true;
        }

        if ((submitList.find(item => Number(item.Sa) > 0) && Number(summaryObj.sumSa_A) >= 20) ||
            (submitList.find(item => Number(item.Su) > 0) && Number(summaryObj.sumSu_A) >= 20) ||
            (submitList.find(item => Number(item.Mo) > 0) && Number(summaryObj.sumMo_A) >= 20) ||
            (submitList.find(item => Number(item.Tu) > 0) && Number(summaryObj.sumTu_A) >= 20) ||
            (submitList.find(item => Number(item.We) > 0) && Number(summaryObj.sumWe_A) >= 20) ||
            (submitList.find(item => Number(item.Th) > 0) && Number(summaryObj.sumTh_A) >= 20) ||
            (submitList.find(item => Number(item.Fr) > 0) && Number(summaryObj.sumFr_A) >= 20)) {
            ui.over = true;
        }
        else {
            summaryObj.over20hReason = null;
        }

        submitList.map(item => {
            if (auditGlobList.some(audit => audit.VALUE === item.GLOB_SVC_CD) && item.SIGSIGNATURECHECK == 0) {
                auditList.push(item);
            }
        });

        if (auditList.length > 0) {
            ui.audit = true;
        }

        checkSubmit();
    };

    const checkSubmit = () => {
        for (let key in ui) {
            if (key === 'allCheck') {
                continue;
            }
            if (ui[key] === true) {
                return;
            }
        }
        ui.submit = true;
    };

    const checkSumit_save = () => {
        for (let key in ui) {
            if (key === 'allCheck') {
                continue;
            }
            if (ui[key] === true) {
                return;
            }
        }
        ui.submit_save = true;
    };

    useEffect(() => {
        const handleSubmit = async () => {
            if (ui.submit === true) {
                ui.submit = false;
                const newSubmitList = submitList.map(item => makeTmsObj(item));
                await requestTimeReport(newSubmitList);
                await manualSubmit();
                await retrieveEarlyEngList();
                await retrieveTimeReport();
            }
        };

        handleSubmit();
    }, [ui.submit]);

    useEffect(() => {
        const handleSubmit = async () => {
            if (ui.submit_save === true) {
                ui.submit_save = false;
                const newSubmitList = submitList.map(item => makeTmsObj(item));
                newSubmitList.map(item => {
                    item.apprStatus = 'submitted';
                    item.approved = true;
                });
                await saveTimeReport(newSubmitList);
            }
        };

        handleSubmit();
    }, [ui.submit_save]);

    const onOverDone = (comment) => {
        summaryObj.over20hReason = comment;
        ui.over = false;
        checkSubmit();
    };

    const onModifyDone = (comment) => {
        engList.filter(eng => eng.status !== 'unsubmitted')
            .map(eng => {
                eng.trDescription = comment || '';
            })
        ui.modify = false;
        checkSubmit();
    };

    const onSearch = () => {
        setShowCalendar(false);
        retrieveTimeReport();
    }

    const onAllCheck = (e) => {
        engList.map(item => item.selected = e.target.value);
    };

    const onEngSelected = (e) => {
        if (e.target.checked) {
            const allSelected = engList.every(item => item.selected === true);
            if (allSelected) {
                ui.allCheck = true;
            }
        }
        else {
            ui.allCheck = false;
        }
    };

    const validateTime = (submitList, type) => {
        let totalHours = 0;
        let totalOvertime = 0;
        let totalChargeableHours = 0;    // C 타입
        let totalAuthorizedHours = 0;    // P 타입
        let isZeroValue = false;         // 0시간 체크

        // 기존 제출/요청된 시간 가져오기
        const existingSa = parseFloat(summaryObj.sumSa_S || 0);
        const existingSu = parseFloat(summaryObj.sumSu_S || 0);
        const existingMo = parseFloat(summaryObj.sumMo_S || 0);
        const existingTu = parseFloat(summaryObj.sumTu_S || 0);
        const existingWe = parseFloat(summaryObj.sumWe_S || 0);
        const existingTh = parseFloat(summaryObj.sumTh_S || 0);
        const existingFr = parseFloat(summaryObj.sumFr_S || 0);

        // 총 시간에 기존 시간 합산
        let totalSa = existingSa;
        let totalSu = existingSu;
        let totalMo = existingMo;
        let totalTu = existingTu;
        let totalWe = existingWe;
        let totalTh = existingTh;
        let totalFr = existingFr;
        console.log('기존시간');
        console.log(totalFr);

        // 근무제 타입 확인
        const workingType = workingHourObj.WORKING_TYPE?.trim();

        for (let i = 0; i < submitList.length; i++) {
            const submitObj = submitList[i];
            let msg = '';
            // 감사코드 여부
            const isAudit = auditGlobList.some(audit => audit.VALUE === submitObj.GLOB_SVC_CD);

            // Activity Code 검증
            // 20241106 감사코드가 아니면 activitycode 필수 아님
            if (isAudit && (!submitObj.ACTIVITY_CODE || submitObj.ACTIVITY_CODE === "----")) {
                msg = 'Activity Code를 선택해 주세요.';
                return { result: false, msg };
            }

            // Activity Code 형식 검증 - 영문, 숫자, &+@ 만 허용 (3-4자리)
            if (submitObj.ACTIVITY_CODE && !(/^[A-Z0-9&+@]{3,4}$/).test(submitObj.ACTIVITY_CODE)) {
                msg = 'Activity Code는 3자리 혹은 4자리의 영문과 숫자로 입력해주세요.\n*특수문자는 \'&\', \'+\', \'@\'만 가능';
                return { result: false, msg };
            }

            // Sub Activity Code 검증
            if (submitObj.SUB_ACTIVITY_CODE === "none") {
                msg = 'Sub Activity Code를 선택해 주세요.';
                return { result: false, msg };
            }

            if (!submitObj.Sa || !submitObj.Su || !submitObj.Mo || !submitObj.Tu || !submitObj.We || !submitObj.Th || !submitObj.Fr) {
                msg = '업무시간을 입력해주세요.';
                return {
                    result: false,
                    msg: msg
                };
            }

            if (submitObj.ENG_TYPE === 'C' && !submitObj.EP_GPN) {
                msg = 'EP는 필수 입력사항입니다.';
                return {
                    result: false,
                    msg: msg
                };
            }

            totalHours += parseFloat(submitObj.Sa) + parseFloat(submitObj.Su) +
                parseFloat(submitObj.Mo) + parseFloat(submitObj.Tu) +
                parseFloat(submitObj.We) + parseFloat(submitObj.Th) +
                parseFloat(submitObj.Fr);

            // 0시간 체크
            const weekActualHours = parseFloat(submitObj.Sa) + parseFloat(submitObj.Su) +
                parseFloat(submitObj.Mo) + parseFloat(submitObj.Tu) +
                parseFloat(submitObj.We) + parseFloat(submitObj.Th) +
                parseFloat(submitObj.Fr);

            // C, P 타입별 시간 합산
            if (submitObj.ENG_TYPE === 'C') {
                totalChargeableHours += weekActualHours;
            } else if (submitObj.ENG_TYPE === 'P') {
                totalAuthorizedHours += weekActualHours;
            }

            totalHours += weekActualHours;

            // 하루 평일 시간 합산
            totalSa += parseFloat(submitObj.Sa || 0);
            totalSu += parseFloat(submitObj.Su || 0);
            totalMo += parseFloat(submitObj.Mo || 0);
            totalTu += parseFloat(submitObj.Tu || 0);
            totalWe += parseFloat(submitObj.We || 0);
            totalTh += parseFloat(submitObj.Th || 0);
            totalFr += parseFloat(submitObj.Fr || 0);
            console.log('제출시간+');
            console.log(totalFr);
            if (submitObj.STATUS === 'requested' || submitObj.STATUS === 'submitted') {
                totalSa -= parseFloat(submitObj.Sa_A || 0);
                totalSu -= parseFloat(submitObj.Su_A || 0);
                totalMo -= parseFloat(submitObj.Mo_A || 0);
                totalTu -= parseFloat(submitObj.Tu_A || 0);
                totalWe -= parseFloat(submitObj.We_A || 0);
                totalTh -= parseFloat(submitObj.Th_A || 0);
                totalFr -= parseFloat(submitObj.Fr_A || 0);
                totalHours -= parseFloat(submitObj.Total_A || 0);
                totalChargeableHours -= parseFloat(submitObj.Total_A || 0);
            }
            console.log('제출된거 뺀시간');
            console.log(totalFr);

            if (parseFloat(totalMo) > 24.0 || parseFloat(totalTu) > 24.0 || parseFloat(totalWe) > 24.0 || parseFloat(totalTh) > 24.0 || parseFloat(totalFr) > 24.0 || parseFloat(totalSa) > 24.0 || parseFloat(totalSu) > 24.0) {
                msg = '하루에 24시간을 초과하여 입력할 수 없습니다.';
                return {
                    result: false,
                    msg: msg
                };
            }

            // 제출자가 경영자문위원인 경우 actual time 체크 안함
            if (cmn.userInfo.EY_RANK === '04' || cmn.userInfo.EY_RANK === '05') {
                return {
                    result: true,
                    msg: ''
                }
            }

            // 일 누적 연장근무 시간 계산 (standard 또는 flexibility 근무제인 경우)
            if (cmn.userInfo.SERVICE_LINE !== '01' && !nonEDRankValues.includes(cmn.userInfo.EY_RANK) && (workingType === 'standard' || workingType === 'flexibility')) {
                const isNonChargeable = submitObj.ACTIVITY_CODE === 'NPHR' || submitObj.ENG_TYPE === 'N';
                if (!isNonChargeable) {
                    // 각 요일별 오버타임 합산
                    const dailyOvertimes = [
                        Math.max(0, parseFloat(submitObj.Sa) - 8),
                        Math.max(0, parseFloat(submitObj.Su) - 8),
                        Math.max(0, parseFloat(submitObj.Mo) - 8),
                        Math.max(0, parseFloat(submitObj.Tu) - 8),
                        Math.max(0, parseFloat(submitObj.We) - 8),
                        Math.max(0, parseFloat(submitObj.Th) - 8),
                        Math.max(0, parseFloat(submitObj.Fr) - 8)
                    ];

                    totalOvertime = dailyOvertimes.reduce((sum, overtime) => sum + parseFloat(overtime.toFixed(2)), 0);

                    if (totalOvertime > 12.00) {
                        msg = '일 누적 연장근무 총 시간이 12시간을 초과할 수 없습니다.';
                        return { result: false, msg };
                    }
                }
            }

            if (weekActualHours === 0) {
                isZeroValue = true;
            }
        }

        // 0시간 입력 확인
        if (isZeroValue) {
            if (!confirm('제출한 Engagement 중 Actual이 0시간인 승인요청 건이 있습니다. 진행하시겠습니까?')) {
                return { result: false, msg: '' };
            }
        }

        // 기존 C, P 타입 시간 합산
        const existingTotal = parseFloat(summaryObj.sumTotal_S || 0);
        totalChargeableHours += existingTotal;  // 정확한 구분이 없으므로 일단 Chargeable로 처리
        const totalCPHours = totalChargeableHours + totalAuthorizedHours;
        totalHours += existingTotal;
        console.log(totalFr);
        // 이번주일 경우
        if (type === 'submit' && reqObj.reqDate === format(endOfWeek(new Date(), { weekStartsOn: 6 }), 'yyyy-MM-dd')) {
            const dayOfWeek = getDay(new Date());
            switch (dayOfWeek) {
                case 1: // 월요일
                    if (totalMo < 8.0) {
                        return {
                            result: false,
                            msg: '평일은 각 8시간 이상 입력해주세요.'
                        };
                    }
                    break;
                case 2: // 화요일
                    if (totalMo < 8.0 || totalTu < 8.0) {
                        return {
                            result: false,
                            msg: '평일은 각 8시간 이상 입력해주세요.'
                        };
                    }
                    break;
                case 3: // 수요일
                    if (totalMo < 8.0 || totalTu < 8.0 || totalWe < 8.0) {
                        return {
                            result: false,
                            msg: '평일은 각 8시간 이상 입력해주세요.'
                        };
                    }
                    break;
                case 4: // 목요일
                    if (totalMo < 8.0 || totalTu < 8.0 || totalWe < 8.0 || totalTh < 8.0) {
                        return {
                            result: false,
                            msg: '평일은 각 8시간 이상 입력해주세요.'
                        };
                    }
                    break;
                case 5: // 금요일
                    if (totalMo < 8.0 || totalTu < 8.0 || totalWe < 8.0 || totalTh < 8.0 || totalFr < 8.0) {
                        return {
                            result: false,
                            msg: '평일은 각 8시간 이상 입력해주세요.'
                        };
                    }
                    if ((totalMo + totalTu + totalWe + totalTh + totalFr) < 40.0) {
                        return {
                            result: false,
                            msg: '총 40시간 이상 입력해주세요.'
                        };
                    }
                    break;
            }
        }
        // 과거일 경우
        else if (reqObj.reqDate < endOfWeek(new Date(), { weekStartsOn: 6 })) {
            if (totalMo < 8.0 || totalTu < 8.0 || totalWe < 8.0 || totalTh < 8.0 || totalFr < 8.0) {
                return {
                    result: false,
                    msg: '평일은 각 8시간 이상 입력해주세요.'
                };
            }
            if ((totalMo + totalTu + totalWe + totalTh + totalFr) < 40.0) {
                return {
                    result: false,
                    msg: '총 40시간 이상 입력해주세요.'
                };
            }
        }

        // 근무제별 시간 체크
        if (cmn.userInfo.SERVICE_LINE !== '01' && totalCPHours > 52 && !nonEDRankValues.includes(cmn.userInfo.EY_RANK)) {
            switch (workingType) {
                case 'standard':  // 준수
                    return { result: false, msg: '주 52시간을 초과할 수 없습니다. (준수)' };

                case 'flexibility':  // 탄력(13주)
                    if (totalCPHours > 64) {
                        return { result: false, msg: '주 64시간을 초과할 수 없습니다. (탄력13주)' };
                    }
                    break;

                case 'flexibility2':  // 탄력(2주)
                    if (totalCPHours > 60) {
                        return { result: false, msg: '주 60시간을 초과할 수 없습니다. (탄력2주)' };
                    }
                    break;

                case 'discretion':  // 재량
                    if (totalCPHours > 168) {
                        return { result: false, msg: '주 168시간을 초과할 수 없습니다. (재량)' };
                    }
                    break;

                default:  // 그 외 (선택 등)
                    if (totalCPHours > 52 && !confirm('주 52시간을 초과하여 입력하였습니다. 진행하시겠습니까?')) {
                        return { result: false, msg: '' };
                    }
            }
        }

        if (totalHours > 168) {  // 주 168시간(7일 * 24시간) 초과 불가            
            return { result: false, msg: '주간 총 시간이 168시간을 초과할 수 없습니다.' };
        }

        return { result: true, msg: '' };
    };

    const makeTmsObj = (engData) => {
        const eowDate = engData.EOW_DATE ? format(new Date(engData.EOW_DATE), 'yyyy-MM-dd') : reqObj.reqDate;
        return {
            activityCode: engData.ACTIVITY_CODE || '0000',
            actualTimeFri: engData.Fr,
            actualTimeMon: engData.Mo,
            actualTimeSat: engData.Sa,
            actualTimeSun: engData.Su,
            actualTimeThu: engData.Th,
            actualTimeTue: engData.Tu,
            actualTimeWed: engData.We,
            apprStatus: engData.ENG_TYPE === 'N' ? 'submitted' : engData.STATUS,
            approved: engData.ENG_TYPE === 'N' ? 'true' : engData.APPROVED,
            description: engData.DESCRIPTION || '',
            eType: engData.E_TYPE || '',
            engagementName: engData.ENG_DESC || engData.RETAIN_ENG_DESC || '',
            engagementType: engData.ENG_TYPE || engData.RET_ENG_TYPE || '',
            eowDate: eowDate,
            epGpn: engData.EP_GPN || '-',
            gpn: cmn.userInfo.GPN,
            keyEngagementCode: engData.ACTUAL_ENG_CODE,
            loc1: "KR",
            loc2: "KR",
            mercKeyEngagementCode: engData.MERC_ACTUAL_ENG_CODE,
            requestNo: engData.REQUEST_NO,
            retEngCode: engData.ACTUAL_ENG_CODE,
            retainConnection: engData.RETAIN_CONNECTION,
            subActivityCode: engData.SUB_ACTIVITY_CODE,
            trDescription: engData.trDescription,
            updateUser: cmn.userInfo.GPN
        };
    };

    const calcTotalTime = () => {
        let sumTotal_A = 0;
        let sumTotal_R = 0;
        let sumTotal_S = 0;

        let sumSa_A = 0;
        let sumSu_A = 0;
        let sumMo_A = 0;
        let sumTu_A = 0;
        let sumWe_A = 0;
        let sumTh_A = 0;
        let sumFr_A = 0;

        let sumSa_S = 0;
        let sumSu_S = 0;
        let sumMo_S = 0;
        let sumTu_S = 0;
        let sumWe_S = 0;
        let sumTh_S = 0;
        let sumFr_S = 0;

        // 오버타임 계산을 위한 기준시간 설정
        let maximumGeneralAcPerDay;
        const workingType = workingHourObj.WORKING_TYPE?.trim();

        switch (workingType) {
            case 'flexibility':   // 탄력
            case 'flexibility2':  // 탄력(2주)
                maximumGeneralAcPerDay = 12;
                break;
            case 'standard':      // 준수
            case 'selection':     // 선택
            case 'discretion':    // 재량
                maximumGeneralAcPerDay = 8;
                break;
            default:
                maximumGeneralAcPerDay = 8;
        }

        engList.map(item => {
            item.Total_A = Number(item.Sa) + Number(item.Su) + Number(item.Mo) + Number(item.Tu) + Number(item.We) + Number(item.Th) + Number(item.Fr);
            item.Total_R = Number(item.Sa_R) + Number(item.Su_R) + Number(item.Mo_R) + Number(item.Tu_R) + Number(item.We_R) + Number(item.Th_R) + Number(item.Fr_R);

            // NPHR 코드인 경우 비차저블 시간으로 계산
            const isNonChargeable = item.ACTIVITY_CODE === 'NPHR';

            // 각 요일별 오버타임 계산
            item.Over_Sa = isNonChargeable ? 0 : Math.max(0, Number(item.Sa) - maximumGeneralAcPerDay);
            item.Over_Su = isNonChargeable ? 0 : Math.max(0, Number(item.Su) - maximumGeneralAcPerDay);
            item.Over_Mo = isNonChargeable ? 0 : Math.max(0, Number(item.Mo) - maximumGeneralAcPerDay);
            item.Over_Tu = isNonChargeable ? 0 : Math.max(0, Number(item.Tu) - maximumGeneralAcPerDay);
            item.Over_We = isNonChargeable ? 0 : Math.max(0, Number(item.We) - maximumGeneralAcPerDay);
            item.Over_Th = isNonChargeable ? 0 : Math.max(0, Number(item.Th) - maximumGeneralAcPerDay);
            item.Over_Fr = isNonChargeable ? 0 : Math.max(0, Number(item.Fr) - maximumGeneralAcPerDay);

            sumTotal_A += item.Total_A;
            sumTotal_R += item.Total_R;
            sumSa_A += Number(item.Sa);
            sumSu_A += Number(item.Su);
            sumMo_A += Number(item.Mo);
            sumTu_A += Number(item.Tu);
            sumWe_A += Number(item.We);
            sumTh_A += Number(item.Th);
            sumFr_A += Number(item.Fr);

            if (item.STATUS === 'submitted' || item.STATUS === 'requested') {
                sumTotal_S += item.Total_A;
                sumSa_S += Number(item.Sa);
                sumSu_S += Number(item.Su);
                sumMo_S += Number(item.Mo);
                sumTu_S += Number(item.Tu);
                sumWe_S += Number(item.We);
                sumTh_S += Number(item.Th);
                sumFr_S += Number(item.Fr);
            }
        });

        summaryObj.sumTotal_A = sumTotal_A.toString();
        summaryObj.sumTotal_R = sumTotal_R.toString();
        summaryObj.sumTotal_S = sumTotal_S.toString();
        summaryObj.sumSa_A = sumSa_A.toString();
        summaryObj.sumSu_A = sumSu_A.toString();
        summaryObj.sumMo_A = sumMo_A.toString();
        summaryObj.sumTu_A = sumTu_A.toString();
        summaryObj.sumWe_A = sumWe_A.toString();
        summaryObj.sumTh_A = sumTh_A.toString();
        summaryObj.sumFr_A = sumFr_A.toString();

        summaryObj.sumSa_S = sumSa_S.toString();
        summaryObj.sumSu_S = sumSu_S.toString();
        summaryObj.sumMo_S = sumMo_S.toString();
        summaryObj.sumTu_S = sumTu_S.toString();
        summaryObj.sumWe_S = sumWe_S.toString();
        summaryObj.sumTh_S = sumTh_S.toString();
        summaryObj.sumFr_S = sumFr_S.toString();
    };

    // 타임시트 목록 조회 api
    const retrieveTimeReport = async () => {
        const data = reqObj.aicNonFlag ? {
            APPROVED: false,
            gpn: cmn.userInfo.GPN,
            selectedWeekEnding: reqObj.reqDate,
            aicNonFlag: reqObj.aicNonFlag
        } :
            {
                APPROVED: false,
                gpn: cmn.userInfo.GPN,
                selectedWeekEnding: reqObj.reqDate,
            };

        const req = {
            url: '/timeSheet/retrieveTimeReport.do',
            method: 'POST',
            data: data,
            type: 'urlEncoded',
        };
        const api = await cmn.axios(req);

        api.data.result.map(item => {
            item.EOW_DATE = item.EOW_DATE ? format(new Date(item.EOW_DATE), 'yyyy-MM-dd') : reqObj.reqDate;
            item.Sa_R = Number(item.Sa_R).toFixed(2);
            item.Su_R = Number(item.Su_R).toFixed(2);
            item.Mo_R = Number(item.Mo_R).toFixed(2);
            item.Tu_R = Number(item.Tu_R).toFixed(2);
            item.We_R = Number(item.We_R).toFixed(2);
            item.Th_R = Number(item.Th_R).toFixed(2);
            item.Fr_R = Number(item.Fr_R).toFixed(2);

            if (!item.REQUEST_NO && item.RETAIN_CONNECTION === 1) {
                item.Sa = item.Sa_R;
                item.Su = item.Su_R;
                item.Mo = item.Mo_R;
                item.Tu = item.Tu_R;
                item.We = item.We_R;
                item.Th = item.Th_R;
                item.Fr = item.Fr_R;
            }
            else {
                item.Sa = Number(item.STATUS === 'unsubmitted' ? item.Sa_A : item.Sa_D).toFixed(2);
                item.Su = Number(item.STATUS === 'unsubmitted' ? item.Su_A : item.Su_D).toFixed(2);
                item.Mo = Number(item.STATUS === 'unsubmitted' ? item.Mo_A : item.Mo_D).toFixed(2);
                item.Tu = Number(item.STATUS === 'unsubmitted' ? item.Tu_A : item.Tu_D).toFixed(2);
                item.We = Number(item.STATUS === 'unsubmitted' ? item.We_A : item.We_D).toFixed(2);
                item.Th = Number(item.STATUS === 'unsubmitted' ? item.Th_A : item.Th_D).toFixed(2);
                item.Fr = Number(item.STATUS === 'unsubmitted' ? item.Fr_A : item.Fr_D).toFixed(2);
            }

            item.Total_A = Number(item.Sa) + Number(item.Su) + Number(item.Mo) + Number(item.Tu) + Number(item.We) + Number(item.Th) + Number(item.Fr);
            item.Total_R = Number(item.Sa_R) + Number(item.Su_R) + Number(item.Mo_R) + Number(item.Tu_R) + Number(item.We_R) + Number(item.Th_R) + Number(item.Fr_R);
            if (item.E_TYPE === 'P_L&D' && item.STATUS === 'submitted') {
                item.STATUS = '사후검토';
            }
        });

        api.data.dates = eachDayOfInterval({
            start: new Date(api.data.FIRSTDATE),
            end: new Date(api.data.ENDDATE)
        }).map(date => format(date, 'dd'))

        api.data.result.sort((a, b) => {
            // STATUS 비교 (unsubmitted가 앞으로)
            if (a.STATUS === 'unsubmitted' && b.STATUS !== 'unsubmitted') return -1;
            if (a.STATUS !== 'unsubmitted' && b.STATUS === 'unsubmitted') return 1;

            // 날짜 비교 (최신 날짜가 앞으로)
            return new Date(b.APPR_DATE) - new Date(a.APPR_DATE);
        });

        summaryObj.copy(api.data);
        engList.copy(api.data.result);
        calcTotalTime();

        if (summaryObj.aicNonFlag) {
            reqObj.aicNonFlag = summaryObj.aicNonFlag;
        }
    };

    const manualSubmit = async () => {
        if (auditList.length > 0) {
            const manualSubmitList = auditList.map(item => {
                return {
                    eid: item.ACTUAL_ENG_CODE,
                    gpn: cmn.userInfo.GPN,
                    eowDate: reqObj.reqDate
                }
            });
            const req = {
                url: '/aic/manualSubmit.do',
                method: 'POST',
                data: {
                    manualSubmitList: manualSubmitList
                }
            }
            const api = await cmn.axios(req);
        }
    };

    // 관리자목록 api
    const selectReqExceptionList = async () => {
        const req = {
            url: '/timeSheet/selectReqExceptionList.do',
            method: 'POST'
        }
        const api = await cmn.axios(req);
        reqExceptionList.copy(api.data.result);
    };

    // 타임시트 제출 api
    const requestTimeReport = async (list) => {
        const sendData = {};
        sendData['timeReportList'] = list;
        sendData['over20hReason'] = summaryObj.over20hReason;
        const req = {
            url: '/timeSheet/requestTimeReport.do',
            method: 'POST',
            data: sendData,
            headers: {
                'Content-Type': 'application/json',
            },
            onError: (error) => onRequestTimeReportError(error)
        };
        const api = await cmn.axios(req);
    };

    const onRequestTimeReportError = (error) => {
        const msg = error.message;
        if (msg === '-주 64시간 초과(탄력)') {
            const showMsg = <span>{msg}<br />위와 같은 사유로 승인요청 할 수 없습니다. 관련하여 RPM팀에 연락 바랍니다.</span>;
            cmn.showAlert(showMsg);
        }
        else if (msg === '-현 근무제의 정산기간 내 근무시간 평균이 주 52시간을 초과') {
            const showMsg = <span>{msg}합니다. 담당 RPM팀에게 문의해주세요.</span>;
            cmn.showAlert(showMsg);
        }
        else {
            const showMsg = (
                <div className='flex flex-col'>
                    {msg.split('\n').map((item, index) => {
                        const newItem = item.replace('더 궁금하신 사항은', '');
                        return (
                            <span key={index}>
                                {newItem}
                            </span>
                        );
                    })}
                </div>
            );
            cmn.showAlert(showMsg);
        }
    }

    // 계약건 조회
    const retrieveEarlyEngList = async () => {
        const req = {
            url: `/timeSheet/retrieveEarlyEngList.do?eowDate=${reqObj.reqDate}`,
            method: 'GET'
        }
        const api = await cmn.axios(req);
        contractList.copy(api.data.earlyEngList)
        if (contractList.length > 0) {
            ui.contract = true;
        }
    };

    // subActivityCode api
    const selectCpaType = async () => {
        const req = {
            url: `/timeSheet/selectCpaType.do?activeUser=${cmn.userInfo.GPN}`,
            method: 'GET'
        }
        const api = await cmn.axios(req);

        const defaultOption = {
            CPA_TYPE: 'Sub Activity Code 선택',
            COMPETNCY: 'none',
            placeholder: true
        };

        const newData = [defaultOption, ...api.data.result];
        cpaTypeList.copy(newData);
    }

    // 타임시트 저장 api
    const saveTimeReport = async (list) => {
        const sendData = {};
        sendData['timeReportList'] = list;
        const req = {
            url: '/timeSheet/saveTimeReport.do',
            method: 'POST',
            data: sendData,
            headers: {
                'Content-Type': 'application/json',
            },
            onError: (error) => onRequestTimeReportError(error)
        };
        const api = await cmn.axios(req);
        retrieveTimeReport();
    };

    // 타임시트 삭제 api
    const removeTimeReport = async (list) => {
        if (list.length > 0) {
            const sendData = {};
            sendData['timeReportList'] = list;
            const req = {
                url: '/timeSheet/removeTimeReport.do',
                method: 'POST',
                data: sendData,
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const api = await cmn.axios(req);
        }
        retrieveTimeReport();
    };

    const retrieveMercuryCodeOptions = async () => {
        const req = {
            url: `/timeSheet/retrieveMercuryCodeOptions.do?name=AUDIT_GLOB_SVC_CD`,
            method: 'GET'
        }
        const api = await cmn.axios(req);
        auditGlobList.copy(api.data.result);
    };

    const retrieveWorkingHours = async () => {
        const req = {
            url: `/timeSheet/retrieveWorkingHours.do`,
            method: 'POST',
            type: 'urlEncoded',
            data: {
                actualDate: format(subDays(parseISO(reqObj.reqDate), 7), 'yyyy-MM-dd'),
                workingTypeDate: reqObj.reqDate,
                gpn: cmn.userInfo.GPN
            }
        }
        const api = await cmn.axios(req);
        workingHourObj.copy(api.data.result ? api.data.message[0] : {});
    };

    const isPast = startOfDay(new Date(reqObj.reqDate)) < startOfDay(endOfWeek(new Date(), { weekStartsOn: 6 }));
    const isFuture = startOfDay(new Date(reqObj.reqDate)) >= startOfDay(addWeeks(endOfWeek(new Date(), { weekStartsOn: 6 }), 4));
    const disabled = !engList.find(item => item.selected) || isPast || isFuture;

    return (
        <div className="page-wrap">
            <div className="page-content">
                <div className="input-wrap search-input">
                    <div className="input-area flex-1 cursor-pointer" onClick={onCalendarClick} >
                        <Input className="" readOnly dataObj={reqObj} dataKey="reqDate" />
                        <Icon icon="calendar" />
                    </div>
                    <Button className="search-btn rounded-l-none" size="hSmall" onClick={onSearch}>
                        <Icon icon="search" />
                    </Button>
                </div>
                <TmsSummaryBox disabled={isPast || isFuture} dataObj={summaryObj} onAddClick={() => onAddClick()} onDeleteClick={onDeleteClick} onCopyClick={() => onCopyClick()} />
                <div className="timesheet-list">
                    {engList.map((eng, index) => (
                        <TmsEngBox disabled={isPast || isFuture} key={index} dataObj={eng} onClick={() => onEngClick(eng, index)} onChange={(e) => onEngSelected(e)} />
                    ))}

                    {/* 등록된 TimeSheet가 없는 경우 노출 */}
                    {engList.length === 0 &&
                        <div className="empty-list">
                            <div className="text">등록된 TimeSheet가 없습니다.</div>
                        </div>
                    }
                </div>
            </div>
            <div className="floating-btn-wrap">
                {!(isPast || isFuture) &&
                    <CheckButton className={`floating-btn check-btn white`} dataSet={ui} dataKey='allCheck' onChange={(e) => onAllCheck(e)}>
                        {ui.allCheck ?
                            <Icon icon='list-check-yellow' />
                            : <Icon icon='list-check' />
                        }
                    </CheckButton>
                }
                <Button disabled={disabled} className={`floating-btn primary ${disabled && 'disabled'}`}
                    gap="small" onClick={() => onSubmit()}>
                    승인요청
                </Button>
            </div>
            {ui.cert &&
                <TmsCertModal isOpen={ui.cert} onClose={() => ui.cert = false} />
            }
            {ui.add &&
                <TmsSearchEngModal isOpen={ui.add} onClose={() => ui.add = false} onAddDone={(engData) => onAddDone(engData)} />
            }
            {ui.dupl &&
                <TmsCopyEngModal isOpen={ui.dupl} onClose={() => ui.dupl = false} onCopyDone={(engData) => onCopyDone(engData)} />
            }
            {ui.detail &&
                <TmsDetailEngModal dataObj={detailObj} isOpen={ui.detail} onClose={() => ui.detail = false} onSaveDone={(engData) => onSaveDone(engData)} />
            }
            {ui.contract &&
                <TmsContractModal dataList={contractList} isOpen={ui.contract} onClose={() => ui.contract = false} />
            }
            {ui.audit &&
                <TmsAuditModal dataList={auditList} isOpen={ui.audit} onClose={() => ui.audit = false} onAccept={() => { ui.audit = false; checkSubmit(); }} />
            }
            {ui.over &&
                <TmsOverModal isOpen={ui.over} onClose={() => ui.over = false} onAccept={(comment) => onOverDone(comment)} />
            }
            {ui.modify &&
                <TmsModifyModal isOpen={ui.modify} onClose={() => ui.modify = false} onAccept={(comment) => onModifyDone(comment)} />
            }
            {showCalendar &&
                <CalendarModal isOpen={showCalendar} onClose={() => setShowCalendar(false)} onAccept={(e) => { onDateChange(e); onSearch(); }} dataObj={reqObj} />
            }
        </div>
    );
};

export default TmsSubmit;
