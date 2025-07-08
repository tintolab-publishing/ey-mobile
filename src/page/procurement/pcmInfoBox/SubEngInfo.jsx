
const SubEngInfo = ({ dataSet, className }) => {
    const pcmData = dataSet || {};

    return (
        <div className={"box line shadow"}>
            <div className="box-title-wrap" >
                <span className="box-title">Subcontract Engagement</span>
            </div>
            <div className="box info-box">
                <div className="info-text-list-wrap">
                    <div className="info-text-list">
                        <div className="info-text w-full">
                            <p className="label">Supplier Name</p>
                            <p className="value">{pcmData.subcontractEngagement?.clientName || '-'}</p>
                        </div>
                        <div className="info-text w-full">
                            <p className="label">Supplier Engagement Duration</p>
                            <p className="value">{`${pcmData.subcontractEngagement?.engagementBeginDate || '-'} ~ ${pcmData.subcontractEngagement?.engagementEndDate || '-'}`}</p>
                        </div>
                        <div className="info-text w-full">
                            <p className="label">Supplier Contract Value</p>
                            <p className="value">{pcmData.subcontractCommercial?.supplierContractValue?.toLocaleString() || '-'}</p>
                        </div>
                        <div className="info-text w-full">
                            <p className="label">Margin Subcontractor</p>
                            <p className="value">{`${Number(pcmData.subcontractEngagement?.marginPct).toFixed(2) || '-'}%`}</p>
                        </div>
                        <div className="info-text w-full">
                            <p className="label">본건 하도급 비율</p>
                            <p className="value">{`${Number(pcmData.subcontractEngagement?.subcontractPercent).toFixed(2)}%`}</p>
                        </div>
                        <div className="info-text w-full">
                            <p className="label">전체 하도급 비율</p>
                            <p className="value">{`${Number(pcmData.subcontractEngagement?.totalSubcontractPercent).toFixed(2)}%`}</p>
                        </div>
                        <div className="info-text w-full">
                            <p className="label">용역 내용</p>
                            <p className="value">{pcmData.subcontractEngagement?.engagementName}</p>
                        </div>
                        <div className="info-text w-full">
                            <p className="label">수행팀 Comment</p>
                            <p className="value">{pcmData.subcontractQuality?.qualityComment || '-'}</p>
                        </div>
                        <div className="info-text w-full">
                            <p className="label">Procurement 검토의견</p>
                            <p className="value">{pcmData.subcontractCommercial?.procurementOverallComment || '-'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SubEngInfo;