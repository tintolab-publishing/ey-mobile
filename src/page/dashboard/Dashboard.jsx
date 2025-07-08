import { useEffect, useContext } from 'react';
import DashboardTop from './DashboardTop';
import DashboardBottom from './DashboardBottom';
import EasyObj from '../../common/dataset/EasyObj';
import EasyList from '../../common/dataset/EasyList';
import { format, endOfWeek, subWeeks, startOfWeek, subDays } from 'date-fns';
import { AppContext } from '../../common/share/AppContext';
import styles from './Dashboard.module.css'
import SecurityModal from '../../modal/intro/SecurityModal';
import StockConfirm1Modal from '../../modal/intro/StockConfirm1Modal';
import StockConfirm2Modal from '../../modal/intro/StockConfirm2Modal';
import Alert from '../../modal/Alert';

const Dashboard = () => {
    const cmn = useContext(AppContext);
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const nowDateFormat = format(currentDate, 'yyyy-MM-dd');

    // 각 분기의 시작일, 종료일, 체크날짜 설정
    const quarterDates = {
        first: {
            start: format(new Date(year, 0, 1), 'yyyy-MM-dd'),     // 1월 1일
            end: format(new Date(year, 1, 0), 'yyyy-MM-dd'),       // 1월 말일
            checkDate: `${year - 1}년 12월 31일`                     // 전년도 12월 말일
        },
        second: {
            start: format(new Date(year, 3, 1), 'yyyy-MM-dd'),     // 4월 1일
            end: format(new Date(year, 4, 0), 'yyyy-MM-dd'),       // 4월 말일
            checkDate: `${year}년 03월 31일`                       // 3월 말일
        },
        third: {
            start: format(new Date(year, 6, 1), 'yyyy-MM-dd'),     // 7월 1일
            end: format(new Date(year, 7, 0), 'yyyy-MM-dd'),       // 7월 말일
            checkDate: `${year}년 06월 30일`                       // 6월 말일
        },
        fourth: {
            start: format(new Date(year, 9, 1), 'yyyy-MM-dd'),     // 10월 1일
            end: format(new Date(year, 10, 0), 'yyyy-MM-dd'),      // 10월 말일
            checkDate: `${year}년 09월 30일`                       // 9월 말일
        }
    };

    // 현재 날짜에 따른 alterName과 checkDate 설정
    let alterName = '';
    let checkDate = '';

    if (quarterDates.first.start <= nowDateFormat && nowDateFormat <= quarterDates.first.end) {
        alterName = `${year - 1}년_4분기`;
        checkDate = quarterDates.first.checkDate;
    } else if (quarterDates.second.start <= nowDateFormat && nowDateFormat <= quarterDates.second.end) {
        alterName = `${year}년_1분기`;
        checkDate = quarterDates.second.checkDate;
    } else if (quarterDates.third.start <= nowDateFormat && nowDateFormat <= quarterDates.third.end) {
        alterName = `${year}년_2분기`;
        checkDate = quarterDates.third.checkDate;
    } else if (quarterDates.fourth.start <= nowDateFormat && nowDateFormat <= quarterDates.fourth.end) {
        alterName = `${year}년_3분기`;
        checkDate = quarterDates.fourth.checkDate;
    } else {
        console.log('주식거래 확인서 OFF ' + nowDateFormat);
    }
    // alterName = '2024년_3분기';
    const tmsCnt = EasyObj();

    const roundRobinCnt = EasyObj({
        title: '기안서',
        requested: '0',
        rejected: '0',
        completed: '0',
        awaiting: '0'
    });

    const expenseCnt = EasyObj({
        title: 'AP',
        requested: '0',
        completed: '0',
        awaiting: '0'
    });

    const purchaseCnt = EasyObj({
        title: '구매',
        requested: '0',
        completed: '0',
        awaiting: '0'
    });

    /**
     * @TODO
     * bottomList 정렬 필요
     * 기안-AP-구매 를 기본 정렬으로 하되
     * awaiting이 0인 경우는 가장 아래로 보내기
     */
    const bottomList = EasyList([
        roundRobinCnt,
        expenseCnt,
        purchaseCnt
    ]);

    const mobileDashboard = async () => {
        const req = {
            url: `/main/mobileDashboard.do?startDate=${format(subDays(new Date(), 30), 'yyyy-MM-dd')}&endDate=${format(new Date(), 'yyyy-MM-dd')}`,
            method: 'GET',
            type: 'urlEncoded',
            data: {}
        };
        const api = await cmn.axios(req);
        if (api.data.ispNotice) {
            cmn.introModal.security = api.data.ispNotice.SUBMIT_YN === "N" ? api.data.ispNotice : false;
        }
        if (api.data.apVoucher) {
            expenseCnt.requested = api.data.apVoucher.payment_Req_FA_Count + api.data.apVoucher.payment_Req_SA_Count + api.data.apVoucher.payment_Req_FC_Count;
            // 처리완료
            expenseCnt.completed = api.data.apVoucher.payment_Req_CP_Count;
            expenseCnt.awaiting = api.data.apVoucher.payment_Appr_PRC_Count;
        }
        if (api.data.procurement) {
            purchaseCnt.requested = api.data.procurement.approvalCount;
            purchaseCnt.completed = api.data.procurement.approvedCount;
            purchaseCnt.awaiting = api.data.procurement.waitingCount;
        }
        if (api.data.roundRobin) {
            roundRobinCnt.requested = api.data.roundRobin.userPending.length;
            roundRobinCnt.completed = api.data.roundRobin.userComplete.length;
            roundRobinCnt.rejected = api.data.roundRobin.userReject.length.toString();
            roundRobinCnt.awaiting = api.data.roundRobin.approverPending.length;
        }
    };

    const selectStatusCount = async () => {
        const req = {
            url: '/timeSheet/selectStatusCount.do',
            method: 'POST',
            type: 'urlEncoded',
            data: {
                friday: format(endOfWeek(new Date(), { weekStartsOn: 6 }), 'yyyy-MM-dd')
            },
        };
        const api = await cmn.axios(req);
        tmsCnt.copy(api.data.result);
    };

    const QRMNoticesOpenCheck = async () => {
        if (!alterName) {
            return;
        }
        const req = {
            url: '/qrmNotices/QRMNoticesOpenCheck.do',
            method: 'POST',
            type: 'urlEncoded',
            data: {
                alterName: alterName,
            }
        };
        const api = await cmn.axios(req);
        if (api.data?.QRMNoticesOpenCheck?.NoticeOpenStatus === 1) {
            const updatedData = {
                ...api.data,
                alterName: alterName,
                checkDate: checkDate
            };

            const placeholderOption = {
                commonCodeName: "증권사 선택",
                commonCode: "증권사 선택",
                placeholder: true,
                selected: true
            };

            if (updatedData.securitiesCompany) {
                updatedData.securitiesCompany = [
                    placeholderOption,
                    ...updatedData.securitiesCompany
                ];
            } else {
                updatedData.securitiesCompany = [placeholderOption];
            }

            cmn.introModal.stockConfirm1 = updatedData;
        }
    };

    const QRMNotices2OpenCheck = async () => {
        if (!alterName) {
            return;
        }

        const req = {
            url: '/qrmNotices/QRMNotices2OpenCheck.do',
            method: 'POST',
            type: 'urlEncoded',
            data: {
                alterName: alterName,
            }
        };
        const api = await cmn.axios(req);
        if (api.data?.QRMNoticesOpenCheck?.NoticeOpenStatus === 1) {
            const updatedData = {
                ...api.data,
                alterName: alterName,
                checkDate: checkDate
            };

            const placeholderOption = {
                commonCodeName: "증권사 선택",
                commonCode: "증권사 선택",
                placeholder: true,
                selected: true
            };

            if (updatedData.securitiesCompany) {
                updatedData.securitiesCompany = [
                    placeholderOption,
                    ...updatedData.securitiesCompany
                ];
            } else {
                updatedData.securitiesCompany = [placeholderOption];
            }

            cmn.introModal.stockConfirm2 = updatedData;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await cmn.getUserInfo();
            await QRMNotices2OpenCheck();
            await QRMNoticesOpenCheck();
            await selectStatusCount();
            await mobileDashboard();
        };
        fetchData();
        // After
        if (window.performance && performance.memory) {
            const memory = performance.memory;
            console.log(`Memory usage: ${Math.round(memory.usedJSHeapSize / 1024 / 1024 * 100) / 100} MB`);
        }
    }, []);

    const onAcceptStock1 = async (stockObj) => {
        const data = {
            CHECK1: stockObj.CHECK1 ? 1 : 0,
            CHECK2: stockObj.CHECK1 ? 1 : 0,
            alterName: stockObj.alterName,
            isStockAccount: stockObj.isStockAccount ? 1 : 0,
            stockList: stockObj.stockList.map(item => item.text)
        };
        const req = {
            url: '/qrmNotices/insertQRMNotices.do',
            method: 'POST',
            type: 'urlEncoded',
            data: data
        };
        const api = await cmn.axios(req);
        cmn.introModal.stockConfirm1 = false;
    }

    const onAcceptStock2 = async (stockObj) => {
        const data = {
            CHECK3: stockObj.CHECK3 ? 1 : 0,
            alterName: stockObj.alterName,
            isStockAccount: stockObj.isStockAccount ? 1 : 0,
            stockList: stockObj.stockList.map(item => item.text),
            prodList: stockObj.stockList.map(item => item.subtext)
        };
        const req = {
            url: '/qrmNotices/insertQRMNotices2.do',
            method: 'POST',
            type: 'urlEncoded',
            data: data
        };
        const api = await cmn.axios(req);
        cmn.introModal.stockConfirm2 = false;
    }

    const onAcceptSecurity = async () => {
        console.log(cmn.introModal.security);
        const data = {
            isConfirm: 'Y',
            gpn: cmn.userInfo.GPN,
            seq: cmn.introModal.security.SEQ,
            year: Number(cmn.introModal.security.YEAR)
        }
        const req = {
            url: '/ispNotices/insertISPNotices.do',
            method: 'POST',
            type: 'urlEncoded',
            data: data
        };
        const api = await cmn.axios(req);
        cmn.introModal.security = false;
    }

    return (
        <div className={styles['dashboard-wrap']}>
            <div className={styles['inner']}>
                <DashboardTop dataObj={tmsCnt} />
            </div >

            <div className={styles['inner']}>
                <DashboardBottom dataList={bottomList} />
            </div>
            {cmn.introModal.stockConfirm2 &&
                <StockConfirm2Modal isOpen={cmn.introModal.stockConfirm2} onAccept={(stockObj) => onAcceptStock2(stockObj)} onClose={() => cmn.introModal.stockConfirm2 = false} />}
            {cmn.introModal.stockConfirm1 &&
                <StockConfirm1Modal isOpen={cmn.introModal.stockConfirm1} onAccept={(stockObj) => onAcceptStock1(stockObj)} onClose={() => cmn.introModal.stockConfirm1 = false} />}
            {cmn.introModal.security &&
                <SecurityModal isOpen={cmn.introModal.security} onAccept={() => onAcceptSecurity()} onClose={() => cmn.introModal.security = false} />}
        </div>
    );
};

export default Dashboard;
