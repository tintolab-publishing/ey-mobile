/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import BottomSheet from '../../common/component/bottomSheet/BottomSheet';;
import Textarea from '../../common/component/textarea/Textarea';
import Button from '../../common/component/button/Button';
import EasyObj from '../../common/dataset/EasyObj';
import { AppContext } from '../../common/share/AppContext';

const TmsModifyModal = ({ isOpen, onAccept, onClose }) => {
    const cmn = useContext(AppContext);
    const modifyData = EasyObj({
        modifyComment: ''
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
            modifyData.modifyComment = newText;
            setCharCount(newCount);
        } else {
            cmn.showAlert("최대 글자 수에 도달했습니다. (한글 100자 또는 영문 200자)");
        }
    }

    const onSubmit = () => {
        onAccept(modifyData.modifyComment);
    };

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="타임시트 변경"
            description="변경 사유"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap flex justify-between">
                        <h2 className="popup-title">타임시트를 변경하는<br />사유를 입력해 주세요.</h2>
                    </div>
                </div>
                <div className="popup-body">
                    <Textarea
                        className=""
                        placeholder={`사유를 입력해 주세요.`}
                        dataSet={modifyData}
                        dataKey='modifyComment'
                        style={{ whiteSpace: 'pre-wrap' }}
                        onChange={(e) => onTextChange(e)}
                    />
                    <div className="bottom-btn-wrap right">
                        <Button
                            className={`w-medium`}
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

export default TmsModifyModal;