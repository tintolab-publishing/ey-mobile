import React, { useContext, useState } from 'react';
import BottomSheet from '../../common/component/bottomSheet/BottomSheet';;
import Textarea from '../../common/component/textarea/Textarea';
import Button from '../../common/component/button/Button';
import EasyObj from '../../common/dataset/EasyObj';
import { AppContext } from '../../common/share/AppContext';

const TmsOverModal = ({ isOpen, onAccept, onClose }) => {

    const cmn = useContext(AppContext);
    const overData = EasyObj({
        overComment: ''
    });
    const [charCount, setCharCount] = useState(0);

    const calculateCharCount = (text) => {
        const koreanChar = text.match(/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g) || [];
        const englishChar = text.match(/[a-zA-Z]/g) || [];
        return koreanChar.length + englishChar.length / 2;
    };

    const onTextChange = (e) => {
        const newText = e.target.value;
        const newCount = calculateCharCount(newText);

        if (newCount <= 100) {
            overData.overComment = newText;
            setCharCount(newCount);
        } else {
            cmn.showAlert("최대 글자 수에 도달했습니다. (한글 100자 또는 영문 200자)");
        }
    }

    const onSubmit = () => {
        onAccept(overData.overComment);
    };

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="타임시트제출"
            description="일일20시간이상"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap flex justify-between">
                        <h2 className="popup-title">일당 20시간 이상의<br />업무시간이 입력되었습니다.</h2>
                    </div>
                </div>
                <div className="popup-body">
                    <Textarea
                        className=""
                        placeholder={`사유를 입력해 주세요.\n최소 5자 이상 입력이 필요합니다.`}
                        dataSet={overData}
                        dataKey='overComment'
                        style={{ whiteSpace: 'pre-wrap' }}
                        onChange={(e) => onTextChange(e)}
                    />
                    <div className="bottom-btn-wrap right">
                        <Button
                            disabled={overData.overComment.length < 5}
                            className={`w-medium ${overData.overComment.length < 5 && 'disabled'}`}
                            size="hLarge"
                            onClick={onSubmit}>
                            제출
                        </Button>
                    </div>
                </div>
            </div>
        </BottomSheet>
    );
};

export default TmsOverModal;