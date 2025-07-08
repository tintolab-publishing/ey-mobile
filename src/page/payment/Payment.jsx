import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../common/component/dropdown/Dropdown';
import EasyObj from '../../common/dataset/EasyObj';
import EasyList from '../../common/dataset/EasyList';
import Input from '../../common/component/input/Input';
import { format, startOfWeek, endOfWeek, subWeeks, subDays } from 'date-fns';
import Select from '../../common/component/select/Select';
import Button from '../../common/component/button/Button';
import Tab from "../../common/component/tab/Tab";
import PayDataBox from './payDataBox/PayDataBox';
import { AppContext } from '../../common/share/AppContext';
import Icon from '../../common/component/icon/Icon';
import CalendarModal from '../../modal/CalendarModal';

const Payment = () => {
    /**
     * 요청자 statusCd
     * DF AP작성중
     * SA  승인처리중
     * FC Finance검토중
     * FA Finance승인중
     * GC GDS검토중
     * CP 처리완료
     * CN 작성취소
     */

    /**
     * 승인자 approvalStatusCode
     * APV 승인
     * CMP 완료
     * DGT 대리승인
     * PRC 진행중
     * RTN 반려
     */

    /**
     * @TODO
     * 
     * 승인자 PRC(진행중) / CMP(완료)
     * 만 보여주면 되는것일지 문의하기
     * 
     * selectApVoucherApprovalList에 requestGPN, provisionTypeName 필요
     */

    const cmn = useContext(AppContext);
    const navigate = useNavigate();
    const [showCalendar, setShowCalendar] = useState(false);

    const payAprList = EasyList();

    const payReqList = EasyList();

    const tabList = EasyList([
        { title: "승인자", count: '0', selected: true },
        { title: "요청자", count: '0' },
    ]);

    const filterOption = EasyList([
        { value: 'ALL', text: '전체', selected: true },
        { value: 'REQ', text: '승인 진행 중' },
        { value: 'CPL', text: '승인 완료', },
    ]);

    const reqObj = EasyObj({
        startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd'),
        dateRange: `${format(subDays(new Date(), 30), 'yyyy-MM-dd')} ~ ${format(new Date(), 'yyyy-MM-dd')}`,
        voucherId: ''
    });

    const onCalendarClick = () => {
        setShowCalendar(!showCalendar);
    };

    const onDateChange = (e) => {
        reqObj.startDate = e.startDate;
        reqObj.endDate = e.endDate;
        reqObj.dateRange = `${e.startDate} ~ ${e.endDate}`;
    };

    const onPayClick = (payData, type) => {
        cmn.sharedData.tabType = tabList.find(tab => tab.selected).title;
        navigate(`/payment/detail?voucherId=${payData.voucherId}&type=${type}`);
    };

    useEffect(() => {
        console.log('loadingpayment');
        cmn.getUserInfo();
        if (cmn.sharedData.filter) {
            const filterValue = cmn.sharedData.filter === "요청" ? "REQ" : cmn.sharedData.filter === "완료" ? "CPL" : "ALL";
            filterOption.forAll((filter) => filter.selected = filter.value === filterValue);
        }
        if (cmn.sharedData.tabType) {
            const tabType = cmn.sharedData.tabType;
            tabList.forAll(tab => tab.selected = tab.title === tabType);
        }
        selectApVoucherApprovalList();
        selectApVoucherList();
    }, []);

    const onSearch = () => {
        if (tabList.find(filter => filter.selected).title === '승인자') {
            selectApVoucherApprovalList();
        }
        else if (tabList.find(filter => filter.selected).title === '요청자') {
            selectApVoucherList();
        }
    };

    // 승인자 Ap리스트
    const selectApVoucherApprovalList = async () => {
        let result = [];

        if (filterOption.find(filter => filter.selected).value === 'ALL') {
            const req = {
                url: '/payment/api/selectApVoucherApprovalList.do',
                method: 'POST',
                data: {
                    requestDateBegin: reqObj.startDate,
                    requestDateEnd: reqObj.endDate,
                    approvalStatusCode: '',
                    voucherId: reqObj.voucherId,
                    isUserGpnSearch: 'Y',
                    invoiceNo: '',
                    paymentReqDate: '',
                    paymentSchDate: '',
                    provisionType: '',
                    requestName: '',
                },
            };
            const api = await cmn.axios(req);
            result = [...result, ...api.data];
        }
        if (filterOption.find(filter => filter.selected).value === 'REQ') {
            const req = {
                url: '/payment/api/selectApVoucherApprovalList.do',
                method: 'POST',
                data: {
                    requestDateBegin: reqObj.startDate,
                    requestDateEnd: reqObj.endDate,
                    approvalStatusCode: 'PRC',
                    voucherId: reqObj.voucherId,
                    isUserGpnSearch: 'Y',
                    invoiceNo: '',
                    paymentReqDate: '',
                    paymentSchDate: '',
                    provisionType: '',
                    requestName: '',
                },
            };
            const api = await cmn.axios(req);
            result = [...result, ...api.data];
        }
        if (filterOption.find(filter => filter.selected).value === 'CPL') {
            const req = {
                url: '/payment/api/selectApVoucherApprovalList.do',
                method: 'POST',
                data: {
                    requestDateBegin: reqObj.startDate,
                    requestDateEnd: reqObj.endDate,
                    approvalStatusCode: 'CMP',
                    voucherId: reqObj.voucherId,
                },
            };
            const api = await cmn.axios(req);
            result = [...result, ...api.data];
        }
        result.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));

        const peopleInfoPromises = result.map(list => cmn.getPeopleInfo(list.requestGpn));
        const peopleInfoResults = await Promise.all(peopleInfoPromises);
        result.forEach((list, index) => {
            list.requestDepart = peopleInfoResults[index][0].DEPART_NAME;
        });

        payAprList.copy(result.filter(item => item.statusCd !== 'FC'));
        tabList.find(item => item.title === '승인자').count = payAprList.length.toString();
    };

    // 요청자 AP리스트
    const selectApVoucherList = async () => {
        let result = [];

        const req = {
            url: '/payment/api/selectApVoucherList.do',
            method: 'POST',
            data: {
                requestDateBegin: reqObj.startDate,
                requestDateEnd: reqObj.endDate,
                requestName: cmn.userInfo.KOR_NAME,
                statusCd: '',
                voucherId: reqObj.voucherId
            },
        };
        const api = await cmn.axios(req);
        result = [...result, ...api.data];

        if (filterOption.find(filter => filter.selected).value === 'REQ') {
            result = result.filter(item => item.statusCd === 'FA' || item.statusCd === 'FC' || item.statusCd === 'SA');
        }
        else if (filterOption.find(filter => filter.selected).value === 'CPL') {
            result = result.filter(item => item.statusCd === 'CP');
        }
        else if (filterOption.find(filter => filter.selected).value === 'ALL') {
            result = result.filter(item => item.statusCd === 'CP' || item.statusCd === 'FA' || item.statusCd === 'SA' || item.statusCd === 'FC');
        }
        result.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));

        const peopleInfoPromises = result.map(list => cmn.getPeopleInfo(list.requestGpn));
        const peopleInfoResults = await Promise.all(peopleInfoPromises);
        result.forEach((list, index) => {
            list.requestDepart = peopleInfoResults[index][0].DEPART_NAME;
        });

        payReqList.copy(result);
        console.log(payReqList);
        tabList.find(item => item.title === '요청자').count = payReqList.length.toString();
    };

    return (
        <div className="page-wrap">
            <div className="page-content">
                <Dropdown title="조회" desc={reqObj.dateRange}>
                    <div className="input-wrap">
                        <div className="input-area cursor-pointer" onClick={onCalendarClick} >
                            <Input readOnly dataObj={reqObj} dataKey="dateRange" />
                            <Icon icon="calendar" />
                        </div>
                        <div className="input-area">
                            <Select dataList={filterOption} className="flex-1" />
                            <Input placeholder="AP 전표번호" dataObj={reqObj} dataKey='voucherId' className="flex-2" />
                        </div>
                        <Button onClick={onSearch}>조회</Button>
                    </div>
                </Dropdown>

                <div className="tab-wrap">
                    <Tab dataList={tabList} />
                    <div className='tab-content'>
                        <div className="list-wrap flex flex-col gap16">
                            {tabList.find(tab => tab.selected).title === '승인자' ?
                                (
                                    payAprList.map((payAprObj, index) => (
                                        <PayDataBox
                                            key={index}
                                            dataObj={payAprObj}
                                            type='main'
                                            onClick={() => onPayClick(payAprObj, "apr")}
                                        />
                                    ))
                                )
                                :
                                (
                                    payReqList.map((payReqObj, index) => (
                                        <PayDataBox
                                            key={index}
                                            dataObj={payReqObj}
                                            type='main'
                                            onClick={() => onPayClick(payReqObj, "req")}
                                        />
                                    ))
                                )
                            }
                        </div>

                    </div>
                </div>
            </div>
            {showCalendar && <CalendarModal isOpen={showCalendar} onClose={() => setShowCalendar(false)} onAccept={(e) => onDateChange(e)} dataObj={reqObj} range />}
        </div>
    );
};

export default Payment;