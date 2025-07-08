import React from 'react';
import styles from './CountBox.module.css';

// variants를 기준으로 폰트 크기 설정
const variants = {
    // 대시보드 아래쪽 현황 박스
    small: {
        wrapper: 'pd-sm',
        title: 'ft-xsm',
        subtitle: 'ft-sm',
        count: 'ft-base',
        position: 'relative'
    },
    // 대시보드 위쪽 현황 박스
    large: {
        wrapper: 'pd-lg',
        title: 'ft-sm',
        subtitle: 'ft-sm',
        count: 'ft-lg',
        radius: 'rd-8'
    },
    // 대시보드 위쪽 [승인 대기] 현황 박스
    long: {
        wrapper: '',
        title: 'ft-sm',
        subtitle: 'text-sm',
        count: 'ft-lg',
        radius: 'rd-8',
        position: 'relative'
    }
};

const CountBox = ({
    text,
    count,
    variant = 'large',
    bgColor = 'bg-lightgray',
    textColor = 'black',
    countColor = 'black',
    className = '',
    onClick
}) => {
    const styles = variants[variant];
    const isLong = variant === "long";

    /**  
     *  승인 대기박스인 경우 빨간점 표시
     *  => text==="승인 대기" && parseInt(count) > 0 인 경우 빨간점 추가
     */

    return (
        <div className={`${bgColor} ${styles.wrapper} ${styles.radius} flex ${isLong ? "items-center justify-between" : "flex-col"} ${className}`}
            onClick={onClick}>
            <div className={`${isLong ? "flex flex-col justify-center" : "self-start"}`}>
                <span className={`${styles.title} ${styles.position} ${textColor} ${isLong ? "text-left" : "block"}`}>
                    {text}
                    {text === "승인 대기" && parseInt(count) > 0 && <span className="dot"></span>}
                </span>
            </div>
            <div className={`${isLong ? "flex items-center" : "self-end"}`}>
                <div className={`${styles.count} ${countColor}`}>{count || 0}</div>
            </div>
        </div>
    );
};

export default CountBox;