import { Outlet } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../share/AppContext";
import Header from "../component/header/Header";
import selectArrow from '../../assets/images/common/icon/select_arrow.png';
import { useNavigate } from "react-router-dom";
import Icon from "../component/icon/Icon";

const DetailLayout = ({ name, children, parentPath }) => {
    const navigate = useNavigate();
    const common = useContext(AppContext);
    const [tabType, settabType] = useState();

    useEffect(() => {
        if (common.sharedData.tabType) {
            settabType(common.sharedData.tabType);
        }
    }, [common.sharedData.tabType]);

    const onBack = () => {
        common.sharedData.tabType = tabType;
        navigate(parentPath);
    }
    return (
        <div className="flex bg-bgBk flex-col max-w-full overflow-x-hidden wrapper">
            <div className="flex flex-col overflow-hidden detail-page-wrap">
                {/* 상단 네비게이션 바 */}
                <div className="detail-page-header" onClick={() => onBack()}>
                    <Icon icon="arrow-left-md" />
                    <span className="detail-page-title">{name}</span>
                </div>

                {/* 아래 children이 들어갈 영역 */}
                <div className="detail-page-contents overflow-y-auto overscroll-contain">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default DetailLayout;