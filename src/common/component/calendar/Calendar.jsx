/* eslint-disable react/prop-types */
import { useState, useCallback, useRef, useEffect } from 'react';
import { format, addDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, isSameMonth, isSameDay, addMonths, parseISO, isAfter, isBefore, isEqual } from 'date-fns';
import { ko } from 'date-fns/locale';
import styles from './Calendar.module.css'

const Calendar = ({ onClose, onChange, startDate, endDate, range = false }) => {
    const weekRefs = useRef({});  // 각 주차별 ref를 저장할 객체

    const [visibleMonths, setVisibleMonths] = useState(() => {
        const today = new Date();
        return Array.from({ length: 11 }, (_, i) => addMonths(today, i - 9));
    });

    const [selectedRange, setSelectedRange] = useState(() => {
        if (startDate && endDate) {
            return {
                start: parseISO(startDate),
                end: parseISO(endDate)
            };
        }
        else if (endDate) {
            return {
                start: startOfWeek(parseISO(endDate), { weekStartsOn: 6 }),
                end: parseISO(endDate)
            };
        }
        else {
            const today = new Date();
            return {
                start: range ? null : startOfWeek(today, { weekStartsOn: 6 }),
                end: range ? null : endOfWeek(today, { weekStartsOn: 6 })
            };
        }
    });

    const handleDateClick = (date) => {
        let newRange;
        if (range) {
            if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
                // 시작일 선택 또는 새로운 범위 시작
                newRange = { start: date, end: null };
            } else {
                // 종료일 선택
                const start = selectedRange.start;
                const end = isAfter(date, start) ? date : start;
                newRange = { start: isAfter(date, start) ? start : date, end };
                onClose && onClose();
            }
        } else {
            // 기존의 주 단위 선택 로직
            const weekStart = startOfWeek(date, { weekStartsOn: 6 });
            const weekEnd = endOfWeek(date, { weekStartsOn: 6 });
            newRange = { start: weekStart, end: weekEnd };
        }

        setSelectedRange(newRange);

        // onChange 호출
        if (newRange.start && (newRange.end || !range)) {
            onChange && onChange({
                startDate: format(newRange.start, 'yyyy-MM-dd'),
                endDate: format(newRange.end || newRange.start, 'yyyy-MM-dd')
            });
        }
    };

    const getDaysInMonth = useCallback((date) => {
        const start = startOfWeek(startOfMonth(date), { weekStartsOn: 6 });
        const end = endOfWeek(endOfMonth(date), { weekStartsOn: 6 });
        let currentDate = start;
        const days = [];
        while (currentDate <= end) {
            days.push(currentDate);
            currentDate = addDays(currentDate, 1);
        }
        return days;
    }, []);

    const isInRange = useCallback((day) => {
        if (!selectedRange.start) return false;
        if (!selectedRange.end) return isSameDay(day, selectedRange.start);
        return (isAfter(day, selectedRange.start) || isEqual(day, selectedRange.start)) &&
            (isBefore(day, selectedRange.end) || isEqual(day, selectedRange.end));
    }, [selectedRange]);

    const handleTouchMove = (e) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (!selectedRange.end) return;
        const weekKey = format(startOfWeek(selectedRange.end, { weekStartsOn: 6 }), 'yyyy-MM-dd');

        if (weekRefs.current[weekKey]) {
            weekRefs.current[weekKey].focus();  // scrollIntoView 대신 focus() 사용
        }
    }, [selectedRange.end]);

    return (
        <>
            <div className={`${styles['calendar-area']} h-full overflow-y-auto`} onTouchMove={handleTouchMove} >

                {/*달 표시 부분*/}
                {visibleMonths.map((month, index) => (
                    <div key={index} className={`${styles['calendar']}`}>
                        <div className={`${styles['month-area']}`}>
                            <h2 className={`${styles['year']}`}>
                                {format(month, 'yyyy', { locale: ko })}
                            </h2>
                            <h2 className={`${styles['month']}`}>
                                {format(month, 'MM월', { locale: ko })}
                            </h2>
                        </div>


                        <div className={`${styles['date-area']} grid grid-cols-7`}>

                            {/*요일 표시 부분*/}
                            {['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                                <div key={day} className={`${styles['week-day']} ${day === "Sat" ? "text-blue" : day === "Sun" ? "text-red" : "text-bk"}`}>
                                    {day}
                                </div>
                            ))}

                            {/*week 표시 부분*/}
                            {getDaysInMonth(month).reduce((weeks, day, index, array) => {
                                if (index % 7 === 0) weeks.push(array.slice(index, index + 7));
                                return weeks;
                            }, []).map((week, weekIndex) => {
                                const weekKey = format(week[0], 'yyyy-MM-dd');
                                return (
                                    <div
                                        key={weekIndex}
                                        tabIndex={weekIndex}
                                        ref={el => weekRefs.current[weekKey] = el}
                                        className={`${styles['week']} col-span-7 grid grid-cols-7`}
                                    >
                                        {week.map((day, dayIndex) => {
                                            const isCurrentMonth = isSameMonth(day, month);
                                            // 이번달 날짜가 아니면 빈 div 렌더링
                                            if (!isCurrentMonth) {
                                                return <div key={dayIndex} />;
                                            }
                                            // 달력 일(day) 부분
                                            const isToday = isSameDay(day, new Date());
                                            const isSat = day.getDay() === 6;
                                            const isSun = day.getDay() === 0;
                                            const isDayInRange = isInRange(day);
                                            const isStart = isSameDay(day, selectedRange.start);
                                            const isEnd = isSameDay(day, selectedRange.end);
                                            return (
                                                <div
                                                    key={dayIndex}
                                                    onClick={() => handleDateClick(day)}
                                                    className={`
                                                    ${isToday ? 'border border-red-500' : ''} 
                                                    ${isSat ? 'text-blue' : isSun ? 'text-red' : 'text-bk'} 
                                                    ${isDayInRange ? styles['selected-date-range'] : ''}
                                                    ${isStart ? 'rounded-l-[8px]' : ''}
                                                    ${isEnd ? 'rounded-r-[8px]' : ''}
                                                `}>
                                                    <div className={`
                                                    ${styles['date']}
                                                    ${isStart ? range ? styles['selected-date'] : 'rounded-[8px]' : ''}
                                                    ${isEnd ? styles['selected-date'] : ''}
                                                `}>
                                                        {format(day, 'd')}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className={`${styles['period-area']}`}>
                <span className="bold">조회기간</span>
                <span className={`${styles['period']}`}>{`${selectedRange.start ? format(selectedRange.start, 'yyyy-MM-dd') : ''} ~ ${selectedRange.end ? format(selectedRange.end, 'yyyy-MM-dd') : ''}`}</span>
            </div>
        </>
    );
};

export default Calendar;