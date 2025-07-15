import { useEffect } from "react";
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";
import EasyList from "../../common/dataset/EasyList";
import Button from "../../common/component/button/Button";
import EasyObj from "../../common/dataset/EasyObj";
import Checkbox from "../../common/component/checkbox/Checkbox";

const IndepResSaveModal = ({ isOpen, onClose, }) => {

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
            small
        >
            <div className="popup-wrap confirm-popup !mb-16">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <h2 className="popup-title">답변이 저장되었습니다.</h2>
                        <div className="sub-text">
                            작성 중인 답변이 임시로 저장되었습니다.<br/>
                            페이지를 이동하시거나, 이어서 계속 작성하실 수 있습니다.
                        </div>
                    </div>
                </div>
                <div className="popup-body"></div>
            </div>
            <div className="floating-btn-wrap" onClick={() => onClose()}>
                <Button className={`floating-btn white`} gap="small" >
                    닫기
                </Button>
            </div>
        </BottomSheet>
    );
};

export default IndepResSaveModal;