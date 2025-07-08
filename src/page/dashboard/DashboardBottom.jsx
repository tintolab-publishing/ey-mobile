import { useState, useContext } from "react";
import CountBox from "./countBox/CountBox";
import CmnStatusModal from "../../modal/CmnStatusModal";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../common/share/AppContext";
import styles from "./Dashboard.module.css"

const DashboardBottom = ({ dataList }) => {
    const common = useContext(AppContext);
    const navigate = useNavigate();
    const countDataList = dataList || [];
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTab, setSelectedTab] = useState();
    const [selectedTitle, setSelectedTitle] = useState();

    const onCountBoxClick = (title, type) => {
        /**
         * @TODO
         * 팝업이 아닌 각 내역페이지에서 해당 필터 데이터 표출
        */
        if (type === "승인 대기") {
            if (title === "구매") {
                common.sharedData.filter = "요청";
                common.sharedData.tabType = "승인자";
                navigate('/procurement');
            }
            else if (title === "AP") {
                common.sharedData.Filter = "요청";
                common.sharedData.tabType = "승인자";
                navigate('/payment');
            }
            else if (title === "기안서") {
                common.sharedData.filter = "요청";
                common.sharedData.tabType = "승인자";
                navigate('/roundRobin');
            }
        }
        else {
            if (title === "구매") {
                common.sharedData.filter = type;
                common.sharedData.tabType = "요청자";
                navigate('/procurement');
            }
            else if (title === "AP") {
                common.sharedData.filter = type;
                common.sharedData.tabType = "요청자";
                navigate('/payment');
            }
            else if (title === "기안서") {
                common.sharedData.filter = type;
                common.sharedData.tabType = "요청자";
                navigate('/roundRobin');
            }

            setSelectedTab(type);
            setSelectedTitle(title);
            setModalOpen(true);
        }
    };

    return (
        <div>
            <div className="content-title">결재 현황</div>
            <div className="content-wrap flex flex-col gap8">
                {countDataList.map((data, index) => (
                    <div key={index} className="box wh flex">
                        <div className={`${styles["item-title"]} font-bold items-start font-medium`}>{data.title}</div>

                        <div className={`${styles["box-wrap"]} flex gap8`}>

                            <div className="flex flex-2 items-center">
                                <CountBox
                                    text="요청"
                                    count={data.requested}
                                    variant="small"
                                    bgColor="bg-lightgray"
                                    className="flex-item count-box"
                                    onClick={() => onCountBoxClick(data.title, "요청")}
                                />
                                <CountBox
                                    text="완료"
                                    count={data.completed}
                                    variant="small"
                                    bgColor="bg-lightgray"
                                    className="flex-item count-box"
                                    onClick={() => onCountBoxClick(data.title, "완료")}
                                />
                                {data.rejected &&
                                    <CountBox
                                        text="반려"
                                        count={data.rejected}
                                        variant="small"
                                        bgColor="bg-lightgray"
                                        className="flex-item count-box"
                                        onClick={() => onCountBoxClick(data.title, "반려")}
                                    />
                                }
                            </div>

                            <CountBox
                                text="승인 대기"
                                count={data.awaiting}
                                variant="small"
                                bgColor="bg-white"
                                className="flex-item count-box large line"
                                onClick={() => onCountBoxClick(data.title, "승인 대기")}
                            />
                        </div>
                    </div>
                ))}
            </div>
            {modalOpen &&
                <CmnStatusModal selectedTitle={selectedTitle} selectedTab={selectedTab} isOpen={modalOpen} onClose={() => setModalOpen(false)} />
            }
        </div>
    );
};

export default DashboardBottom;