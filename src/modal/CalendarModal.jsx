/* eslint-disable react/prop-types */
import { useContext } from 'react';
import BottomSheet from '../common/component/bottomSheet/BottomSheet';
import Button from '../common/component/button/Button';
import Calendar from '../common/component/calendar/Calendar';
import { AppContext } from '../common/share/AppContext';

const CalendarModal = ({ isOpen, onAccept, onClose, range, dataObj }) => {
    const dateObj = {};
    const cmn = useContext(AppContext);
    const onDateChange = (e) => {
        dateObj.startDate = e.startDate;
        dateObj.endDate = e.endDate;
    };

    const handleTouchMove = (e) => {
        e.stopPropagation();
    };

    const onClick = () => {
        if (!dateObj.endDate) {
            if (dataObj.reqDate) {
                dateObj.endDate = dataObj.reqDate;
            }
            else if (dataObj.endDate) {
                dateObj.startDate = dataObj.startDate;
                dateObj.endDate = dataObj.endDate;
            }
            else {
                cmn.showAlert('날짜를 선택해주세요.');
                return;
            }
            console.log(dateObj);
        }
        onAccept(dateObj);
        onClose();
    }
    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="달력"
            description="달력"
        >
            <div className="popup-wrap overflow-hidden">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <h2 className="popup-title">조회할 기간을</h2>
                        <h2 className="popup-title">선택해 주세요.</h2>
                    </div>
                </div>
                <div className="popup-body" onTouchMove={handleTouchMove}>
                    <div className="calendar-wrap">
                        <Calendar onChange={onDateChange} range={range} startDate={dataObj.startDate} endDate={dataObj.endDate || dataObj.reqDate} />
                    </div>
                </div>
            </div>
            <div className="floating-btn-wrap">
                <Button className={`floating-btn primary`} gap="small" onClick={() => onClick()}>
                    확인
                </Button>
            </div>
        </BottomSheet>
    );
};

export default CalendarModal;