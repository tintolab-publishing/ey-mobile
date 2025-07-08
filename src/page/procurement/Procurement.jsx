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
import PcmObjBox from './pcmObjBox/PcmObjBox';
import { AppContext } from '../../common/share/AppContext';
import Icon from '../../common/component/icon/Icon';
import CalendarModal from '../../modal/CalendarModal';

const Procurement = () => {
    const cmn = useContext(AppContext);
    const navigate = useNavigate();
    const [showCalendar, setShowCalendar] = useState(false);

    const pcmAprList = EasyList();

    const pcmReqList = EasyList();

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
        startDate: '',
        endDate: '',
        dateRange: ''
    });

    const onCalendarClick = () => {
        setShowCalendar(!showCalendar);
    };

    const onDateChange = (e) => {
        reqObj.startDate = e.startDate;
        reqObj.endDate = e.endDate;
        reqObj.dateRange = `${e.startDate} ~ ${e.endDate}`;
    };

    const onPcmClick = (pcmData, type) => {
        cmn.sharedData.tabType = tabList.find(tab => tab.selected).title;
        navigate(`/procurement/detail?subcontractCode=${pcmData.subcontractCode}&subcontractRevision=${pcmData.subcontractRevision}&type=${type}`);
    };

    useEffect(() => {
        console.log('loadingprocurement');
        const fetchData = async () => {
            cmn.getUserInfo();
            if (cmn.sharedData.filter) {
                const filterValue = cmn.sharedData.filter === "요청" ? "REQ" : cmn.sharedData.filter === "완료" ? "CPL" : "ALL";
                filterOption.forAll((filter) => filter.selected = filter.value === filterValue);
            }
            if (cmn.sharedData.tabType) {
                const tabType = cmn.sharedData.tabType;
                tabList.forAll(tab => tab.selected = tab.title === tabType);
            }
            const title = tabList.find(item => item.selected).title;
            if (title === '요청자') {
                reqObj.startDate = format(subDays(new Date(), 30), 'yyyy-MM-dd');
                reqObj.endDate = format(new Date(), 'yyyy-MM-dd');
                reqObj.dateRange = `${format(subDays(new Date(), 30), 'yyyy-MM-dd')} ~ ${format(new Date(), 'yyyy-MM-dd')}`;
            }
            selectSubcontractApprovalList();
            selectSubcontractList();
        }
        fetchData();

    }, []);

    useEffect(() => {
        const title = tabList.find(item => item.selected).title;
        if (title === '승인자') {
            reqObj.startDate = '';
            reqObj.endDate = '';
            reqObj.dateRange = '';
        }
        else if (title === '요청자') {
            if (!reqObj.startDate) {
                reqObj.startDate = format(subDays(new Date(), 30), 'yyyy-MM-dd');
            }
            if (!reqObj.endDate) {
                reqObj.endDate = format(new Date(), 'yyyy-MM-dd');
            }
            if (!reqObj.dateRange) {
                reqObj.dateRange = `${format(subDays(new Date(), 30), 'yyyy-MM-dd')} ~ ${format(new Date(), 'yyyy-MM-dd')}`;
            }
        }
    }, [tabList.find(item => item.selected).title])

    const onSearch = () => {
        if (tabList.find(filter => filter.selected).title === '승인자') {
            selectSubcontractApprovalList();
        }
        else if (tabList.find(filter => filter.selected).title === '요청자') {
            selectSubcontractList();
        }
    };

    const selectSubcontractApprovalList = async () => {
        let result = [];
        if (filterOption.find(filter => filter.selected).value === 'ALL' || filterOption.find(filter => filter.selected).value === 'REQ') {
            const req = {
                url: '/procurement/api/selectSubcontractApprovalList.do',
                method: 'POST',
                data: {
                    approvalStatusCode: 'PROCESSING',
                    createBeginDate: reqObj.startDate,
                    createEndDate: reqObj.endDate,
                    engagementName: reqObj.engagementName || '',
                    subcontractCode: "",
                    userGpn: cmn.userInfo.GPN,
                    // userGpn: 'KR010014224'
                },
            };
            const api = await cmn.axios(req);
            api.data.map((data) => {
                data.subcontractStatus = 'REQ';
                data.currencyCode = data.currency;
            });
            result = [...result, ...api.data.filter(data => data.approvalGpn === cmn.userInfo.GPN)];
            console.log('reqdone');
        }
        if (filterOption.find(filter => filter.selected).value === 'ALL' || filterOption.find(filter => filter.selected).value === 'CPL') {
            const req = {
                url: '/procurement/api/selectSubcontractApprovalList.do',
                method: 'POST',
                data: {
                    approvalStatusCode: 'COMPLETE',
                    createBeginDate: reqObj.startDate,
                    createEndDate: reqObj.endDate,
                    engagementName: reqObj.engagementName || '',
                    subcontractCode: "",
                    userGpn: cmn.userInfo.GPN,
                    // userGpn: 'KR010014224'
                },
            };
            const api = await cmn.axios(req);
            api.data.map((data) => {
                data.subcontractStatus = 'CPL';
                data.currencyCode = data.currency;
            });
            result = [...result, ...api.data];
            console.log('cpldone');
        }
        result.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));

        pcmAprList.copy(result);
        console.log(pcmAprList);
        tabList.find(item => item.title === '승인자').count = pcmAprList.length.toString();
    };

    const selectSubcontractList = async () => {
        let result = [];
        const startDate = reqObj.startDate || format(subDays(new Date(), 30), 'yyyy-MM-dd');
        const endDate = reqObj.endDate || format(new Date(), 'yyyy-MM-dd');
        if (filterOption.find(filter => filter.selected).value === 'ALL' || filterOption.find(filter => filter.selected).value === 'REQ') {
            const req = {
                url: '/procurement/api/selectSubcontractList.do',
                method: 'POST',
                data: {
                    subcontractStatus: 'APR',
                    engagementName: reqObj.engagementName,
                    createNameOrPartnerName: cmn.userInfo.KOR_NAME
                },
            };
            const api = await cmn.axios(req);
            api.data.map((data) => data.subcontractStatus = 'REQ')
            result = [...result, ...api.data];
            console.log('reqdone');
        }
        if (filterOption.find(filter => filter.selected).value === 'ALL' || filterOption.find(filter => filter.selected).value === 'CPL') {
            const req = {
                url: '/procurement/api/selectSubcontractList.do',
                method: 'POST',
                data: {
                    subcontractStatus: 'IND',
                    engagementName: reqObj.engagementName,
                    createNameOrPartnerName: cmn.userInfo.KOR_NAME
                },
            };
            const api = await cmn.axios(req);
            api.data.map((data) => data.subcontractStatus = 'CPL')
            result = [...result, ...api.data];
            console.log('cpldone');
        }
        result.sort((a, b) => new Date(b.requestDate) - new Date(a.requestDate));
        pcmReqList.copy(result.filter(item => {
            const itemDate = new Date(item.createDate);
            const start = new Date(startDate);
            const end = new Date(endDate);
            return itemDate >= start && itemDate <= end;
        }));
        tabList.find(item => item.title === '요청자').count = pcmReqList.length.toString();
    };

    return (
        <div className="page-wrap">
            <div className="page-content">
                <Dropdown title="조회" desc={reqObj.dateRange} >
                    <div className="input-wrap">
                        <div className="input-area cursor-pointer" onClick={onCalendarClick} >
                            <Input readOnly placeholder='조회 기간을 선택해주세요.' dataObj={reqObj} dataKey="dateRange" />
                            <Icon icon="calendar" />
                        </div>
                        <div className="input-area">
                            <Select dataList={filterOption} className="flex-1" />
                            <Input placeholder="계약명" dataObj={reqObj} dataKey='engagementName' className="flex-2" />
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
                                    pcmAprList.map((pcmAprObj, index) => (
                                        <PcmObjBox
                                            key={index}
                                            dataObj={pcmAprObj}
                                            type='main'
                                            onClick={() => onPcmClick(pcmAprObj, "apr")}
                                        />
                                    ))
                                )
                                :
                                (
                                    pcmReqList.map((pcmReqObj, index) => (
                                        <PcmObjBox
                                            key={index}
                                            dataObj={pcmReqObj}
                                            type='main'
                                            onClick={() => onPcmClick(pcmReqObj, "req")}
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

export default Procurement;