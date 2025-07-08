import { useContext, useEffect, useState } from "react";
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";
import EasyList from "../../common/dataset/EasyList";
import Button from "../../common/component/button/Button";
import EasyObj from "../../common/dataset/EasyObj";
import Checkbox from "../../common/component/checkbox/Checkbox";
import Icon from "../../common/component/icon/Icon"
import { AppContext } from "../../common/share/AppContext";
import { format } from "date-fns";

const TmsAuditModal = ({ isOpen, onClose, dataList, onAccept }) => {
    const auditList = dataList || [];
    const cmn = useContext(AppContext)
    useEffect(() => {
        /**
         * @TODO
         * 현황 데이터리스트 가져오기
         */
    }, []);

    const onSubmit = () => {
        onAccept();
    };

    const obj = EasyObj();

    const disabled = !obj.confirm;

    // 각 submit에 대한 상태를 저장하는 배열
    const [activeIndex, setActiveIndex] = useState(null);

    // 클릭 핸들러 함수
    const handleTooltipClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    console.log(auditList);
    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="감사 Engagement 확인"
            description="감사 Engagement 확인"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <h2 className="popup-title">감사(검토) 참여자 독립성 확인서</h2>
                        <div className="submit-info-list">
                            {auditList.map((audit, index) => (
                                <div className="submit-info-item" key={index}>
                                    <span className="info-text">{audit.ACTUAL_ENG_CODE} {audit.ENG_DESC || audit.RETAIN_ENG_DESC}</span>
                                    <div
                                        className={`tooltip-area ${activeIndex === index ? 'on' : ''}`}
                                        onClick={() => handleTooltipClick(index)}
                                    >
                                        <Icon icon="tooltip" />
                                        <div className="tooltip-text">{audit.ACTUAL_ENG_CODE} {audit.ENG_DESC || audit.RETAIN_ENG_DESC}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <div className="jsutify-between">
                            <span>E-1212121 2014(12)/홍길동/외감</span>
                            <span>#</span>
                        </div> */}
                    </div>
                </div>
                <div className="popup-body">
                    <div className="box terms-box">
                        <div className="terms-text">
                            본인은 해당 Timesheet 제출 주 전체 기간에 대해<br />
                            다음 사항을 확인합니다.<br />
                            <br />
                            본인은 국내 공인회계사법과 공인회계사윤리기준 및 EYG Independence Policy에서 요구하는 아래에 요약된 독립성 요 구사항에 관한 법인의 정책을 충분히 숙지하고 있습니다.<br />
                            본인(배우자 및 부양직계가족 포함)은
                            {auditList.map((item, index) => {
                                const clientName = (item.ENG_DESC || item.RETAIN_ENG_DESC)?.split("/");
                                return <span key={index}>[{clientName[clientName.length - 1]}]</span>
                            })}뿐만 아니라 그 종속회사들 및 중요한 관계회사들 (이하 독립성준수대상회사", <a href="https://gis.ey.net/home/dashboard/search" target="_blank" className="link">EY.GIS.Web</a>)에 대하여 독립성 준수 대상 기간 (감사대상 회계연도 개시일로부터 감사보고서 발행일까지)동안 이러한 독립성 요구 정책을 준수하고 있습니다.
                            <br />
                            <br />
                            1. 독립성준수대상회사의 감사 (검토) 잠여자로서
                            <br />
                            a) 본인은 독립성준수대상회사에 대해 어떠한 재무적 이해관계가 없음. 특히 본인은 독립성준   수대상회사의 주식 또는 출자지분을 소유하지 않으며 당해 감사대상회사(관계회사 제외)와 3천만원 이상의 채권 (예금자보호법에 따라 보호되는 금액 한도 이내 채권 제외) 또는 채무 관계가 있지 않음.<br />
                            b) 본인은 독립성준수대상회사 및 그 경영자 또는 그 지배주주와의 공통투자 등 사업관계가 없음.<br />
                            c) 본인은 독립성준수대상회사의 임직원으로 근무하지 아니하였음. 또한 본인이 독립성준수대상 회사와 고용협상을 하는 경우 시작하기 전에 감사담당파트너에게 보고할 것임.<br />
                            d) 본인의 배우자 및 부양 직계가족 또는 상기 1.a)항 내지 1.c)항을 모두 준수하고 있으며, 상기 독립성준수대상회사와 고용관계를 유지하고 있지 않음.
                            <br />
                            <br />
                            2. 본인은 EY Global Code of Conduct 및 Confidentiality Policy에 따라 감사(검토)과정 또는 감사(검토)를 수행한 결과 지득한 독립성준수대상회사의 비밀과 미공개정보(회사제출자료, 감사(검토)조서, 감사의견 등)를 보호할 것이며, 정당한 사유없이 타인에게 누설하지 않을 것임. 또한 본인은 Insider Trading Policy에 따라 자신 또는 타인의 사적 이익을 위해 비밀과 미공개정보를 사용하지 않을 것임.
                            <br />
                            <br />
                            다음에 기재된 사항을 제외하고는 본 확인서에 기재된 모든 내용은 사실이고 정확합니다.
                        </div>
                    </div>
                    <div className="signature-wrap">
                        <Checkbox label='확인 후 서명' dataSet={obj} dataKey='confirm' />
                        <div className="signature-info-wrap">
                            <div className="date">{format(new Date(), 'yyyy-MM-dd')}</div>
                            <div className="name">{cmn.userInfo.KOR_NAME}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="floating-btn-wrap">
                <Button disabled={disabled} className={`floating-btn primary ${disabled && 'disabled'}`} gap="small" onClick={() => onSubmit()} >
                    제출
                </Button>
            </div>
        </BottomSheet>
    );
};

export default TmsAuditModal;