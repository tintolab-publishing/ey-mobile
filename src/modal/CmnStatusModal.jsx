import { useEffect } from "react";
import BottomSheet from "../common/component/bottomSheet/BottomSheet";
import Tab from "../common/component/tab/Tab";
import EasyList from "../common/dataset/EasyList";

const CmnStatusModal = ({ isOpen, onClose, selectedTitle = "기안서", selectedTab = "요청" }) => {

    const tabList = EasyList([
        { title: "요청", count: "2", selected: selectedTab === "요청" },
        { title: "완료", count: "3", selected: selectedTab === "완료" },
        { title: "반려", count: "4", selected: selectedTab === "반려" },
    ])

    const tmsList = EasyList([
        { status: "요청", date: "2024-08-23", title: "문서명1", approver: "승인자1" },
        { status: "요청", date: "2024-08-22", title: "문서명2", approver: "승인자2" },
        { status: "완료", date: "2024-08-21", title: "문서명3", approver: "승인자3" },
        { status: "완료", date: "2024-08-20", title: "문서명4", approver: "승인자4" },
        { status: "완료", date: "2024-08-19", title: "문서명5", approver: "승인자5" },
        { status: "반려", date: "2024-08-18", title: "문서명6", approver: "승인자6" },
        { status: "반려", date: "2024-08-17", title: "문서명7", approver: "승인자7" },
        { status: "반려", date: "2024-08-16", title: "문서명8", approver: "승인자8" },
        { status: "반려", date: "2024-08-15", title: "문서명9", approver: "승인자9" },
    ]);

    useEffect(() => {
        tabList.map((tab) => {
            tab.selected = selectedTab === tab.title
        });
    }, [selectedTab]);

    useEffect(() => {
        /**
         * @TODO
         * 현황 데이터리스트 가져오기
         */
    }, []);

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="결재 현황"
            description="결재 현황"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <h2 className="popup-title">{`${selectedTitle} 현황`}</h2>
                    </div>
                </div>
                <div className="popup-body overflow-hidden">
                    <div className="tab-wrap">
                        <Tab dataList={tabList} />
                        <div className="tab-content">
                            <div className="list-wrap">
                                {tmsList
                                    .filter((tms) => {
                                        const selectedTab = tabList.find(tab => tab.selected);
                                        return selectedTab && tms.status === selectedTab.title;
                                    })
                                    .map((tms, index) => (
                                        <div key={index} className="list-item">{tms.date}</div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </BottomSheet>
    );
};

export default CmnStatusModal;