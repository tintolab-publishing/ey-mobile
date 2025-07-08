/* eslint-disable react/prop-types */
import { useEffect, useContext } from "react";
import BottomSheet from "../common/component/bottomSheet/BottomSheet";
import Tab from "../common/component/tab/Tab";
import EasyList from "../common/dataset/EasyList";
import { endOfWeek, format, startOfWeek } from 'date-fns';
import { AppContext } from "../common/share/AppContext";
import { useNavigate } from "react-router-dom";

const TmsStatusModal = ({ isOpen, onClose, selectedTab = "작성 중", dataObj }) => {
    const cmn = useContext(AppContext);
    const navigate = useNavigate();
    const tabList = EasyList([
        { title: "작성 중", count: dataObj.TSDraft?.toString() || "0", selected: selectedTab === "작성 중" },
        { title: "승인 요청", count: dataObj.TSWaiting?.toString() || "0", selected: selectedTab === "승인 요청" },
        { title: "반려", count: dataObj.TSRejected?.toString() || "0", selected: selectedTab === "반려" }
    ])

    const tmsList = EasyList();

    useEffect(() => {
        onTabChange();
    }, []);

    useEffect(() => {
        tabList.map((tab) => {
            tab.selected = selectedTab === tab.title
        });

    }, [selectedTab]);

    const selectTimeSheetList = async (code) => {
        const data = {
            code: code,
            friday: format(endOfWeek(new Date(), { weekStartsOn: 6 }), 'yyyy-MM-dd')
        };
        const req = {
            url: '/timeSheet/selectTimeSheetList.do',
            method: 'POST',
            type: 'urlEncoded',
            data: data,
        };
        const tmsApi = await cmn.axios(req);
        tmsList.copy(tmsApi.data.result.TimeSheet)
        let count = 0;
        tmsList.map(tms => count += parseInt(tms.CNT));
        tabList.find(tab => tab.selected).count = count.toString();
    };

    const onTabChange = () => {
        const currentTitle = tabList.find(tab => tab.selected).title;
        let code = '0';
        if (currentTitle === "작성 중") {
            code = '1';
        }
        else if (currentTitle === "승인 요청") {
            code = '2';
        }
        else if (currentTitle === "반려") {
            code = '3';
        }
        selectTimeSheetList(code);
    };

    const onTmsClick = (tms) => {
        navigate(`/tmsSubmit?EOW_DATE=${tms.EOW_DATE}`);
    };

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="타임시트 현황"
            description="타임시트 현황"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <h2 className="popup-title">타임시트 현황</h2>
                    </div>
                </div>
                <div className="popup-body">
                    <div className="tab-wrap">
                        <Tab dataList={tabList} onChange={onTabChange} />
                        <div className="tab-content">
                            <div className="list-wrap">
                                {tmsList.map((tms, index) => (
                                    <div key={index} className="list-item" onClick={() => onTmsClick(tms)}>{tms.EOW_DATE}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BottomSheet>
    );
};

export default TmsStatusModal;