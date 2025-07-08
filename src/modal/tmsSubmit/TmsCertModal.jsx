import { useEffect } from "react";
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";
import EasyList from "../../common/dataset/EasyList";
import Button from "../../common/component/button/Button";
import EasyObj from "../../common/dataset/EasyObj";
import Checkbox from "../../common/component/checkbox/Checkbox";

const TmsCertModal = ({ isOpen, onClose, }) => {

    useEffect(() => {
        /**
         * @TODO
         * 현황 데이터리스트 가져오기
         */
    }, []);

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="Engagement 추가"
            description="Engagement 추가"
            small
        >
            <div className="popup-wrap confirm-popup !mb-16">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <h2 className="popup-title">감사(검토) 참여자 독립성 확인서가<br />미제출된 내역이 존재합니다.</h2>
                        <div className="sub-text">
                            PC로 KR Portal에 접속하여 확인서를 제출하시기 바랍니다.<br/>
                            (KR Portal 메뉴 : 독립성 확인(감사참여자) - 독립성 확인 조회)
                        </div>
                    </div>
                </div>
                <div className="popup-body">
                </div>
            </div>
            <div className="floating-btn-wrap" onClick={() => onClose()}>
                <Button className={`floating-btn white`} gap="small" >
                    닫기
                </Button>
            </div>
        </BottomSheet>
    );
};

export default TmsCertModal;