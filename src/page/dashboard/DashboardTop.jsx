import { useContext, useState } from 'react';
import CountBox from './countBox/CountBox';
import Button from '../../common/component/button/Button';
import Icon from '../../common/component/icon/Icon';
import { AppContext } from '../../common/share/AppContext';
import TmsStatusModal from '../../modal/TmsStatusModal';
import styles from './Dashboard.module.css'
import { useNavigate } from "react-router-dom";
import EasyObj from '../../common/dataset/EasyObj';

const DashboardTop = ({ dataObj }) => {
    const cmn = useContext(AppContext);
    const navigate = useNavigate();
    const countDataObj = dataObj || {};
    const ui = EasyObj({
        TmsStatusModal: false,
        selectedTab: null
    });

    const onWriteClick = () => {
        navigate('/tmsSubmit');
    };

    const onCountBoxClick = (type) => {
        if (type === '승인 대기') {
            navigate('/tmsApproval')
        }
        else {
            ui.selectedTab = type;
            ui.TmsStatusModal = true;
        }
    };

    return (
        <div className="box wh">
            <div className={`${styles['title-wrap']} flex justify-between items-center`}>
                <span className="title bold">이번 주 타임시트 현황</span>

                {countDataObj.ThisWeek === 'Complete' &&
                    <span className="tag gray-txt-wh progress">Complete</span>
                }
                {countDataObj.ThisWeek !== 'Complete' &&
                    <span className="tag yellow progress">Incomplete</span>
                }
            </div>
            <div className="content-wrap flex flex-col gap8">
                <div className="grid grid-cols-3 gap8">
                    <CountBox text="작성 중" count={countDataObj.TSDraft} variant="large" onClick={() => onCountBoxClick("작성 중")} />
                    <CountBox text="승인 요청" count={countDataObj.TSWaiting} variant="large" onClick={() => onCountBoxClick("승인 요청")} />
                    <CountBox text="반려" count={countDataObj.TSRejected} variant="large" onClick={() => onCountBoxClick("반려")} />
                </div>
                <div className="box line">
                    <CountBox text="승인 대기" count={countDataObj.TSConfirmWaiting} bgColor="white" variant="long" onClick={() => onCountBoxClick("승인 대기")} />
                </div>

                <Button className="w-full" onClick={() => onWriteClick()}>
                    <Icon icon="document" />
                    <span className="">타임시트 작성</span>
                </Button>
            </div>
            {ui.TmsStatusModal &&
                <TmsStatusModal selectedTab={ui.selectedTab} isOpen={ui.TmsStatusModal} onClose={() => ui.TmsStatusModal = false} dataObj={countDataObj} />
            }
        </div>
    );
};

export default DashboardTop;