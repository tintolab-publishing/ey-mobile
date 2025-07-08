
const MasterEngInfo = ({ dataSet, className }) => {
    const pcmData = dataSet || {};

    return (
        <div className={"box line shadow"}>
            <div className="box-title-wrap" >
                <span className="box-title">Master Engagement 정보</span>
            </div>
            <div className="box info-box">
                <div className="info-text-list-wrap">
                    <div className="info-text-list">
                        <div className="info-text w-full">
                            <p className="label">Name</p>
                            <p className="value">{pcmData.subcontractEngagement?.engagementName}</p>
                        </div>
                        <div className="info-text w-full">
                            <p className="label">EP</p>
                            <p className="value">{pcmData.subcontractEngagement?.createGpnEngName}</p>
                        </div>
                        <div className="info-text w-full">
                            <p className="label">용역기간</p>
                            <p className="value">{`${pcmData.subcontractCommercial?.supplierBeginDate} ~ ${pcmData.subcontractCommercial?.supplierEndDate}`}</p>
                        </div>
                        <div className="info-text">
                            <p className="label">{"NSR(TER)(Current)"}</p>
                            <p className="value">{`${Number(pcmData.subcontractEngagement?.totalEngagementRevenue).toLocaleString()}`}</p>
                        </div>
                        <div className="info-text">
                            <p className="label">{"Margin(%)"}</p>
                            <p className="value">{`${(Number(pcmData.subcontractCommercial?.supplierMargin)).toFixed(2)}%`}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MasterEngInfo;