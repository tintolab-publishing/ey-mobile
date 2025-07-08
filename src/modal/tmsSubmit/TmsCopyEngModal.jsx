/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";
import Select from "../../common/component/select/Select";
import EasyList from "../../common/dataset/EasyList";
import Button from "../../common/component/button/Button";
import EasyObj from "../../common/dataset/EasyObj";
import Checkbox from "../../common/component/checkbox/Checkbox";
import TmsEngBox from "../../page/tmsSubmit/tmsEngBox/TmsEngBox";
import { subWeeks, getDay, subDays, format, endOfWeek } from 'date-fns';
import { AppContext } from "../../common/share/AppContext";

const TmsCopyEngModal = ({ isOpen, onClose, onCopyDone }) => {
    const cmn = useContext(AppContext);
    const dateList = EasyList();
    const eowDate = endOfWeek(new Date(), { weekStartsOn: 6 });
    const selectAllState = EasyObj({
        selected: false
    });

    useEffect(() => {
        dateList.length = 0;
        for (let i = 1; i < 5; i++) {
            let targetDate = subWeeks(eowDate, i);
            const dayOfWeek = getDay(targetDate);
            const daysToSubtract = dayOfWeek === 5 ? 0 : (dayOfWeek < 5 ? dayOfWeek + 2 : dayOfWeek - 5);
            const friday = subDays(targetDate, daysToSubtract);

            const formattedDate = format(friday, 'yyyy-MM-dd');
            dateList.unshift(
                {
                    text: formattedDate,
                    value: formattedDate,
                    selected: i === 1
                }
            );
        }
        retrieveTimeReport();
    }, []);

    const engList = EasyList();

    const onSelectAllChange = (e) => {
        const isChecked = e.target.checked;
        selectAllState.selected = isChecked;
        engList.forAll(item => {
            item.selected = isChecked;
        });
    };

    const onSelectChange = (engData) => {
        // 모든 항목이 선택되었는지 확인
        const allSelected = engList.every(item => item.selected);
        selectAllState.selected = allSelected;
    };

    const onAddClick = () => {
        onCopyDone(engList.filter(item => item.selected));
        onClose();
    };


    const onDateChange = () => {
        retrieveTimeReport();
    }

    // 타임시트 목록 조회 api
    const retrieveTimeReport = async () => {

        const req = {
            url: '/timeSheet/retrieveTimeReport.do',
            method: 'POST',
            data: {
                APPROVED: false,
                gpn: cmn.userInfo.GPN,
                selectedWeekEnding: dateList.find(item => item.selected).value
            },
            type: 'urlEncoded'
        };
        const api = await cmn.axios(req);

        api.data.result.map(item => {
            item.Sa_R = 0;
            item.Su_R = 0;
            item.Mo_R = 0;
            item.Tu_R = 0;
            item.We_R = 0;
            item.Th_R = 0;
            item.Fr_R = 0;

            item.Sa = Number(item.Sa_A).toFixed(2);
            item.Su = Number(item.Su_A).toFixed(2);
            item.Mo = Number(item.Mo_A).toFixed(2);
            item.Tu = Number(item.Tu_A).toFixed(2);
            item.We = Number(item.We_A).toFixed(2);
            item.Th = Number(item.Th_A).toFixed(2);
            item.Fr = Number(item.Fr_A).toFixed(2);
            item.SIGSIGNATURECHECK = 0;
            item.Total_A = Number(item.Sa) + Number(item.Su) + Number(item.Mo) + Number(item.Tu) + Number(item.We) + Number(item.Th) + Number(item.Fr);
            item.Total_R = 0;
        });

        engList.copy(api.data.result);
    };

    const disabled = !engList.find(item => item.selected);
    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="Engagement 복사"
            description="Engagement 복사"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap"></div>
                </div>
                <div className="popup-body">
                    <Select dataList={dateList} onChange={onDateChange} />
                    <Checkbox label='전체선택' dataSet={selectAllState} dataKey='selected' onChange={onSelectAllChange} className="all-check" />
                    <div className="timesheet-list">
                        {engList.map((eng, index) => (
                            <TmsEngBox copy dataObj={eng} key={index} onChange={() => onSelectChange(eng)} />
                        ))}
                    </div>
                </div>
            </div>
            <div className="floating-btn-wrap">
                <Button disabled={disabled} className={`floating-btn primary ${disabled && 'disabled'}`} gap="small" onClick={() => onAddClick()}>
                    추가
                </Button>
            </div>
        </BottomSheet>
    );
};

export default TmsCopyEngModal;