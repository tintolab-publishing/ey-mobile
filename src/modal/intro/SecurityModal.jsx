/* eslint-disable react/prop-types */
import BottomSheet from '../../common/component/bottomSheet/BottomSheet';
import Textarea from '../../common/component/textarea/Textarea';
import Button from '../../common/component/button/Button';
import EasyObj from '../../common/dataset/EasyObj';
import Checkbox from '../../common/component/checkbox/Checkbox';
import { useContext } from 'react';
import { AppContext } from '../../common/share/AppContext';

const SecurityModal = ({ isOpen, onAccept, onClose }) => {
    const agreeObj = EasyObj();
    const companyNm = isOpen.COMPANY || '한영회계법인';
    const cmn = useContext(AppContext);
    const handleSubmit = () => {
        if (disabled) {
            cmn.showAlert('서약서 맨 하단의 체크박스 4개 모두를 선택한 후 제출 부탁드립니다.');
            return;
        }
        // 제출 로직 구현
        onAccept ? onAccept() : alert("서약서 제출");
    };

    const disabled = !agreeObj.agree1 || !agreeObj.agree2 || !agreeObj.agree3 || !agreeObj.agree4;
    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="정보보호서약서"
            description="정보보호서약서 동의 절차"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <h2 className="popup-title">정보보호 및 시험ㆍ평가 부정행위<br />금지 의무 서약서</h2>
                    </div>
                </div>
                <div className="popup-body">
                    <div className="contents-wrap">
                        <div className="box terms-box h-small">
                            <h2 className="terms-title">본인은 {companyNm}(이하 "회사"라 함)에 직 • 간접적으로 근무하는 자(정직원, 인턴, 계약직, 파견, 하도급 등을 포함한 회사 계정이 부여된 모든 인원, 이하 "임직원")로서 다음 사항을 숙지하고 준수할 것을 서약합니다.</h2>
                            <div className="terms-text">
                                제 1 조<br />
                                (의무 사항)<br />
                                본인은 다음 각 호의 윤리의무를 준수한다.<br />
                                1. 정보보호 의무<br />
                                2. 시험ㆍ평가 부정 행위 금지 의무<br />
                                <br />
                                제 2 조<br />
                                (관련 정책)<br />
                                본인은 회사의 Global Code of Conduct <a style={{ color: 'blue' }} target='_blank' href='https://discovercontent.ey.net/pod16112u9m3tjmk'>(링크)</a>, 취업규칙<a style={{ color: 'blue' }} href='https://sites.ey.com/sites/koreapolicy/EY%20Korea/Forms/AllItems.aspx?RootFolder=%2Fsites%2Fkoreapolicy%2FEY%20Korea%2F%EC%B7%A8%EC%97%85%EA%B7%9C%EC%B9%99&FolderCTID=0x0120001590E28E2B709A4C8D0CB4F09181E259&View=%7B8CAA96BF%2DFCDF%2D4C65%2D82BD%2D7498B3FA1050%7D' target='_blank'>(링크)</a>, 내규<a style={{ color: 'blue' }} href='https://sites.ey.com/:w:/r/sites/koreapolicy/_layouts/15/Doc.aspx?sourcedoc=%7B3944848E-D654-4293-A9B2-53D7C7CA60AA%7D&file=EY%20%ED%95%9C%EC%98%81%ED%9A%8C%EA%B3%84%EB%B2%95%EC%9D%B8%20%EB%82%B4%EA%B7%9C%20(2023%EB%85%848%EC%9B%9424%EC%9D%BC%20%EA%B0%9C%EC%A0%95).docx&action=default&mobileredirect=true' target='_blank'>(링크)</a>, Global Data Protection and Confidentiality Policy<a style={{ color: 'blue' }} href='https://discovercontent.ey.net/pop23013a6l9nnl4' target='_blank'>(링크)</a>, Acceptable Use of Technology Policy<a style={{ color: 'blue' }} href='https://sites.ey.com/sites/informationsecurity/Policy Library/Acceptable_Use_Policy.pdf' target='_blank'>(링크)</a>등 정책(이하 '회사 정책')을 읽고 숙지하였음을 확인한다.<br />
                                <br />
                                제 3 조<br />
                                (기밀정보의 범위)<br />
                                본인은 다음 각 호의 정보가 기밀정보로서 보호되는 것임을 확인한다.<br />
                                1. 고객, 잠재고객, 또는 고객이 의뢰한 업무와 연관된 업체 (이하 “고객”)가 제공한 고객의 운영, 전략, 재무정보, 거래 내용 등을 포함한 정보<br />
                                2. 기밀유지 의무 하에 하도급 업체, 컨소시엄을 포함한 제3자가 제공한 제3자의 운영, 전략, 거래 내용 등을 포함한 정보<br />
                                3. 회사가 운영을 위하여 작성, 취합, 분석 또는 수정한 정보 (예: 임직원, 수익, 타임시트, 파이프라인, 마진, 신규 서비스 등)<br />
                                4. 통제구역, 잠금장치, 패스워드 등으로 접근 제한된 통제구역, 보관함, 컴퓨터시스템 등에 배치·보관·저장된 물건, 문서, 정보<br />
                                5. 그 외 회사의 영업비밀, 회사 자산 등에 영향을 미칠 수 있는 유형/무형의 정보와 기타 회사 주요 영업자산과 관련된 정보<br />
                                <br />
                                제 4 조<br />
                                (소유권)<br />
                                본인은 회사에 재직 중 얻은 기밀정보 및 자산의 모든 지적 재산권 및 권리는 특별히 명시하지 않는 한 회사 소유임을 인정한다.<br />
                                <br />
                                제 5 조<br />
                                (기밀정보 보호)<br />
                                본인은 정보보호 의무와 관련하여 회사의 기밀정보 보호를 위하여 다음 각 호의 의무를 준수한다. 아래의 의무 사항은 재직 시 뿐만 아니라 퇴사 이후에도 적용된다.<br />
                                <br />
                                1. 기밀정보를 오로지 회사의 승인을 받은 업무에만 사용하고, 다른 어떠한 목적으로도 사용하지 않는다.<br />
                                2. 기밀정보를 회사에서 본인에게 지급한 노트북 및 계정에서 본인 및 타인 소유의 개인 계정, 컴퓨터, 핸드폰 및 저장매체 등으로 이전하는 행위를 하지 않는다. 단 회사의 정책에서 허용된 경우는 제외한다.<br />
                                3. 사전 서면 동의 없이는 기밀정보를 경쟁사 등 타인에게 제공하거나 누설하지 않는다.<br />
                                4. 업무와 관련한 각종 문서 및 전자 정보, 기록 매체에 대하여 파괴, 유출, 변조, 복사 등으로부터 안전하게 보관 및 관리한다.<br />
                                5. 허가 받지 않은 정보나 시설에 접근하지 않는다.<br />
                                6. 자신에게 부여된 사용자 계정 및 비밀번호가 중요한 보안사항임을 인식하고 타인에게 누설하지 않는다.<br />
                                7. 비인가/불법 소프트웨어를 설치하지 않는다.<br />
                                8. 회사의 네트워크 망 또는 외부 인터넷 망을 이용하여 회사의 승인 없이 기밀정보를 수집하거나 접근을 시도하지 않는다.<br />
                                9. 자신 및 타인의 회사 정책 위반행위를 인지한 경우에는 지체 없이 정보보호 담당자에게 알린다.<br />
                                10. 재직 시 및 퇴사 이후 기밀정보를 사본 등 어떠한 형태로든 개인적으로 보관하지 않고, 퇴사 시 재직 중에 보유하였던 기밀정보를 회사에 반납하거나, 반납할 수 없는 것은 폐기한다.<br />
                                11. 상기 나열된 의무 외 회사 정책 또는 제반 법령이 요구하는 의무를 준수한다.<br />
                                <br />
                                제 6 조<br />
                                (부정행위 금지)<br />
                                본인은 회사 업무와 관련된 자격증 취득·유지 시험, 회사 교육 과정에서 수행하는 평가 등 회사 업무와 관련된 시험·평가에서 제3자, GenAI 등 인공지능의 도움을 받는 행위 등 부정행위를 하지 아니한다. 부정행위의 예시는 아래와 같다.<br />
                                1. 답안지를 타인과 이메일, Teams, 메신저 등을 통하여 공유하는 일체의 행위<br />
                                2. 본인이 아닌 타인에게 수강·시험·평가를 대신 수행하도록 하는 행위<br />
                                3. 한 명을 지정하여 시험·평가를 대신 수행하도록 하고 답안지를 팀 전체와 공유하는 행위<br />
                                4. GenAI 등 인공지능을 이용하여 시험·평가를 수행하는 행위<br />
                                <br />
                                제 7 조<br />
                                (회사의 모니터링)<br />
                                본인은 회사가 본인에게 지급한 노트북 또는 회사 계정에서의 문서, 파일, 이메일, 인터넷 접속 기록, 교육 이수 관련 기록 일체 등 회사 인터넷 상의 활동을 회사가 수집, 보관, 열람, 분석하여 회사의 기밀정보를 보호하고 시험·평가 부정 행위를 탐지하기 위한 모니터링 활동을 하는 것에 대하여 동의한다. 모니터링 활동은 해당 목적을 달성하기 위한 범위 내에서만 진행되고 그 예시는 다음과 같다.<br />
                                &#60;정보보호 관련&#62;<br />
                                1. 회사에 퇴사 또는 계약 종료를 통보한 자가 기밀정보를 외부로 전송하는지 여부에 대한 점검<br />
                                2. 퇴사 혹은 계약 종료 통보 여부와 상관없이 회사가 지급한 노트북 또는 회사 계정에서 기밀정보를 외부로 전송하는지 여부에 대한 점검<br />
                                &#60;시험·평가 부정 행위 탐지 관련&#62;<br />
                                1. 회사가 제공한 교육 이수 플랫폼에서의 시험/평가 시도 횟수에 대한 특이점 점검<br />
                                2. 회사가 지급한 노트북 또는 회사 계정에서 시험·평가 관련 정보를 이메일 또는 팀즈 등으로 공유했는지 여부에 대한 점검<br />
                                3. 회사가 지급한 노트북 또는 회사 계정에서 GenAI 사용 등 본인이 직접 시험·평가를 수행하지 않은 정황이 있는지 여부에 대한 점검<br />
                                4. 다수의 임직원의 답변 내역을 분석하여 유사한 패턴이 있는지 여부에 대한 점검<br />
                                본인은 회사가 상기 예시 외에도 회사의 경영 관련 법령 및 정책 (예: 취업규칙, 근로기준법, 부정경쟁방지 및 영업비밀에 관한 법률)을 준수하기 위한 비정기적 조사 활동을 하는 것에 대하여 동의한다.<br />
                                <br />
                                회사가 정보보호 및 시험·평가 부정 행위 탐지 목적을 달성을 위하여 불가피하게 수집되는 정보는 Global Retention Schedule에서 정한 기간, 또는 목적이 달성된 때까지 처리될 수 있습니다. 수집된 정보는 정보보호 및 시험·평가 부정 행위 탐지 등 관련 목적으로만 이용됩니다. 동의를 거부하게 될 경우 관련 기밀정보를 처리하는 업무 또는 관련 시험 및 평가를 수행할 수 없습니다.<br />
                            </div>
                        </div>
                        <div className="agree-check-wrap">
                            <Checkbox
                                className="agree-check"
                                label={
                                    <span>
                                        본인은 이상과 같은 <span className="bold">정보보호 관련</span> 서약사항을 숙지하여 성실히 준수할 것을 동의하고, 회사에서 수행하는 모니터링 사항에 대하여 동의합니다.
                                    </span>
                                }
                                dataKey="agree1" dataSet={agreeObj} />
                            <Checkbox
                                className="agree-check"
                                label={
                                    <span>
                                        본인은 이상과 같은 <span className="bold">시험·평가 부정 행위 탐지 관련 서약사항</span>을 숙지하여 성실히 준수할 것을 동의하고, 회사에서 수행하는 모니터링 사항에 대하여 동의합니다.
                                    </span>}
                                dataKey="agree2" dataSet={agreeObj} />
                            <Checkbox
                                className="agree-check"
                                label={
                                    <span>
                                        본인은 이상과 같은 그 외 서약사항을 숙지하여 성실히 준수할 것을 동의하고, 회사에서 수행하는 회사의 경영관련 법령 및 정책(예: 취업규칙, 근로기준법, 부정경쟁방지 및 영업비밀에 관한 법률)을 준수하기 위하여 회사에서 수행하는 모니터링 사항에 대하여 동의합니다.
                                    </span>
                                }
                                dataKey="agree3" dataSet={agreeObj} />
                            <Checkbox
                                className="agree-check"
                                label={
                                    <span>본인은 이상과 같은 서약사항을 위반할 경우 관련
                                        법령에 의한 민•형사상 책임과 회사 내부 절차에 따른
                                        징계 책임을 감수할 것을 서약합니다.</span>
                                } dataKey="agree4" dataSet={agreeObj} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="floating-btn-wrap">
                <Button disabled={disabled} className={`floating-btn primary ${disabled && 'disabled'}`} gap="small" onClick={() => handleSubmit()}>
                    제출
                </Button>
            </div>
        </BottomSheet>
    );
};

export default SecurityModal;
