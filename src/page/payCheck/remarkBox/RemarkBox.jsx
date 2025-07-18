import styles from "./RemarkBox.module.css"

const RemarkBox = ({ dataSet }) => {
    const remarkData = dataSet || {};

    return (
        <div className={`box info-box ${styles.remarkBox}`}>
            <div className="box-title-wrap">
                <div className="box-title">Remark</div>
            </div>
            <div className={styles.infoTextList}>
                <div className={styles.infoText}>{remarkData.infoText1}</div>
                <div className={styles.infoText}>{remarkData.infoText2}</div>
            </div>
            <div class={styles.overtimeGuide}>
                <div class={styles.overtimeTitle}>시간외 근무수당 계산 방법(만근기준)</div>
                <ul class={styles.overtimeList}>
                    <li class={styles.overtimeItem}>
                        <span class={styles.label}>연장근로수당</span>
                        <span class={styles.value}>{remarkData.overtimeExtended}</span>
                    </li>
                    <li class={styles.overtimeItem}>
                        <span class={styles.label}>야간근로수당</span>
                        <span class={styles.value}>{remarkData.overtimeNight}</span>
                    </li>
                    <li class={styles.overtimeItem}>
                        <span class={styles.label}>휴일근로수당</span>
                        <span class={styles.value}>{remarkData.overtimeHoliday}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default RemarkBox;
