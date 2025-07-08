import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../common/component/dropdown/Dropdown';
import EasyObj from '../../common/dataset/EasyObj';
import EasyList from '../../common/dataset/EasyList';
import Calendar from '../../common/component/calendar/Calendar';
import Input from '../../common/component/input/Input';
import { format, startOfWeek, endOfWeek, subWeeks, subDays } from 'date-fns';
import Select from '../../common/component/select/Select';
import Button from '../../common/component/button/Button';
import Tab from "../../common/component/tab/Tab";
import RrObjBox from './rrObjBox/RrObjBox';
import { AppContext } from '../../common/share/AppContext';
import Icon from '../../common/component/icon/Icon';
import CalendarModal from '../../modal/CalendarModal';

const RoundRobin = () => {
    const cmn = useContext(AppContext);
    const navigate = useNavigate();
    const [showCalendar, setShowCalendar] = useState(false);

    const rrAprList = EasyList();
    const rrReqList = EasyList();

    const tabList = EasyList([
        { title: "승인자", count: '0', selected: true },
        { title: "요청자", count: '0' },
    ]);

    const filterOption = EasyList([
        { value: 'ALL', text: '전체', selected: true },
        { value: 'REQ', text: '승인 진행 중' },
        { value: 'CPL', text: '승인 완료', },
        { value: 'RJT', text: '승인 반려 ', }
    ]);

    const reqObj = EasyObj({
        startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
        endDate: format(new Date(), 'yyyy-MM-dd'),
        dateRange: `${format(subDays(new Date(), 30), 'yyyy-MM-dd')} ~ ${format(new Date(), 'yyyy-MM-dd')}`
    });

    const onCalendarClick = () => {
        setShowCalendar(!showCalendar);
    };

    const onDateChange = (e) => {
        reqObj.startDate = e.startDate;
        reqObj.endDate = e.endDate;
        reqObj.dateRange = `${e.startDate} ~ ${e.endDate}`;
    };

    const onRrClick = (rrObj, type) => {
        cmn.sharedData.tabType = tabList.find(tab => tab.selected).title;
        navigate(`/roundRobin/detail?roundRobinId=${rrObj.roundRobinId}&type=${type}`);
    };

    useEffect(() => {
        console.log('loadingRoundRobin');
        cmn.getUserInfo();
        if (cmn.sharedData.filter) {
            const filterValue = cmn.sharedData.filter === "요청" ? "REQ" : cmn.sharedData.filter === "완료" ? "CPL" : cmn.sharedData.filter === "반려" ? "RJT" : "ALL";
            filterOption.forAll((filter) => filter.selected = filter.value === filterValue);
        }
        if (cmn.sharedData.tabType) {
            const tabType = cmn.sharedData.tabType;
            tabList.forAll(tab => tab.selected = tab.title === tabType);
        }

        selectRoundRobinApprovalList();
        selectRoundRobinList();
    }, []);

    const onSearch = () => {
        if (tabList.find(filter => filter.selected).title === '승인자') {
            selectRoundRobinApprovalList();
        }
        else if (tabList.find(filter => filter.selected).title === '요청자') {
            selectRoundRobinList();
        }
    };

    const selectRoundRobinApprovalList = async () => {
        let result = [];
        if (filterOption.find(filter => filter.selected).value === 'ALL' || filterOption.find(filter => filter.selected).value === 'REQ') {
            const req = {
                url: '/roundRobin2/api/selectRoundRobinApprovalList.do',
                method: 'POST',
                data: {
                    "requestDateBegin": reqObj.startDate,
                    "requestDateEnd": reqObj.endDate,
                    "searchText": reqObj.searchText || '',
                    "statusCode": "RA",
                    "isUserGpnSearch": "Y"
                }
            };
            const api = await cmn.axios(req);
            api.data.map((data) => data.roundRobinStatus = 'REQ')
            result = [...result, ...api.data];
            console.log('reqdone');
        }
        if (filterOption.find(filter => filter.selected).value === 'ALL' || filterOption.find(filter => filter.selected).value === 'CPL') {
            const req = {
                url: '/roundRobin2/api/selectRoundRobinApprovalList.do',
                method: 'POST',
                data: {
                    "requestDateBegin": reqObj.startDate,
                    "requestDateEnd": reqObj.endDate,
                    "searchText": reqObj.searchText || '',
                    "statusCode": "RC",
                }
            };
            const api = await cmn.axios(req);
            api.data.map((data) => data.roundRobinStatus = 'CPL')
            result = [...result, ...api.data];
            console.log('cpldone');
        }
        if (filterOption.find(filter => filter.selected).value === 'ALL' || filterOption.find(filter => filter.selected).value === 'RJT') {
            const req = {
                url: '/roundRobin2/api/selectRoundRobinApprovalList.do',
                method: 'POST',
                data: {
                    "requestDateBegin": reqObj.startDate,
                    "requestDateEnd": reqObj.endDate,
                    "searchText": reqObj.searchText || '',
                    "statusCode": "RR",
                }
            };
            const api = await cmn.axios(req);
            api.data.map((data) => data.roundRobinStatus = 'RJT')
            result = [...result, ...api.data];
            console.log('RJTdone');
        }
        result.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));

        rrAprList.copy(result);
        tabList.find(item => item.title === '승인자').count = rrAprList.length.toString();
    };

    const selectRoundRobinList = async () => {
        let result = [];
        if (filterOption.find(filter => filter.selected).value === 'ALL' || filterOption.find(filter => filter.selected).value === 'REQ') {
            const req = {
                url: '/roundRobin2/api/selectRoundRobinList.do',
                method: 'POST',
                data: {
                    "requestDateBegin": reqObj.startDate,
                    "requestDateEnd": reqObj.endDate,
                    "searchText": reqObj.searchText || '',
                    "statusCd": "RA"
                }
            };
            const api = await cmn.axios(req);
            api.data.map((data) => data.roundRobinStatus = 'REQ')
            result = [...result, ...api.data];
            console.log('reqdone');
        }
        if (filterOption.find(filter => filter.selected).value === 'ALL' || filterOption.find(filter => filter.selected).value === 'CPL') {
            const req = {
                url: '/roundRobin2/api/selectRoundRobinList.do',
                method: 'POST',
                data: {
                    "requestDateBegin": reqObj.startDate,
                    "requestDateEnd": reqObj.endDate,
                    "searchText": reqObj.searchText || '',
                    "statusCd": "RC"
                },
            };
            const api = await cmn.axios(req);
            api.data.map((data) => data.roundRobinStatus = 'CPL')
            result = [...result, ...api.data];
            console.log('cpldone');
        }
        if (filterOption.find(filter => filter.selected).value === 'ALL' || filterOption.find(filter => filter.selected).value === 'RJT') {
            const req = {
                url: '/roundRobin2/api/selectRoundRobinList.do',
                method: 'POST',
                data: {
                    "requestDateBegin": reqObj.startDate,
                    "requestDateEnd": reqObj.endDate,
                    "searchText": reqObj.searchText || '',
                    "statusCd": "RR"
                },
            };
            const api = await cmn.axios(req);
            api.data.map((data) => data.roundRobinStatus = 'RJT')
            result = [...result, ...api.data];
            console.log('rjtdone');
        }
        result.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));


        rrReqList.copy(result);
        tabList.find(item => item.title === '요청자').count = rrReqList.length.toString();
    };

    return (
        <div className="page-wrap">
            <div className="page-content">
                <Dropdown title="조회" desc={reqObj.dateRange} >
                    <div className="input-wrap">
                        <div className="input-area cursor-pointer" onClick={onCalendarClick} >
                            <Input readOnly dataObj={reqObj} dataKey="dateRange" />
                            <Icon icon="calendar" />
                        </div>
                        <div className="input-area">
                            <Select dataList={filterOption} className="flex-1" />
                            <Input placeholder="기안서 제목" dataObj={reqObj} dataKey='searchText' className="flex-2" />
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
                                    rrAprList.map((rrAprObj, index) => (
                                        <RrObjBox
                                            key={index}
                                            dataObj={rrAprObj}
                                            type='main'
                                            onClick={() => onRrClick(rrAprObj, "apr")}
                                        />
                                    ))
                                )
                                :
                                (
                                    rrReqList.map((rrReqObj, index) => (
                                        <RrObjBox
                                            key={index}
                                            dataObj={rrReqObj}
                                            type='main'
                                            onClick={() => onRrClick(rrReqObj, "req")}
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

export default RoundRobin;