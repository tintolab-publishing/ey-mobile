/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import BottomSheet from '../common/component/bottomSheet/BottomSheet';
import Textarea from '../common/component/textarea/Textarea';
import Button from '../common/component/button/Button';
import EasyObj from '../common/dataset/EasyObj';
import { AppContext } from '../common/share/AppContext';

const RejectModal = ({ isOpen, onAccept, onClose, dataObj }) => {

    const rejectReqObj = dataObj || {};
    const cmn = useContext(AppContext);
    const commentObj = EasyObj({
        rejectComment: ''
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
            commentObj.rejectComment = newText;
            setCharCount(newCount);
        } else {
            cmn.showAlert("최대 글자 수에 도달했습니다. (한글 100자 또는 영문 200자)");
        }
    }

    const handleApprove = () => {
        rejectReqObj.rejectComment = commentObj.rejectComment;
        // 승인 로직 구현
        onAccept ? onAccept(rejectReqObj) : alert("반려처리");
    };

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="승인"
            description="승인 절차"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap flex justify-between">
                        <h2 className="popup-title">반려</h2>
                        <div className="guide-text-wrap">
                            <div>반려 사유는 한글 100자(영문200글자)</div>
                            <div className="text-right">이내로 작성해주시기 바랍니다.</div>
                        </div>
                    </div>
                </div>
                <div className="popup-body">
                    <Textarea
                        className=""
                        placeholder={`(필수) 승인 Comment를 입력해 주세요.\n최소 5자 이상 입력이 필요합니다.`}
                        dataSet={commentObj}
                        dataKey='rejectComment'
                        style={{ whiteSpace: 'pre-wrap' }}
                        onChange={(e) => onTextChange(e)}
                    />
                    <div className="bottom-btn-wrap right">
                        <Button
                            disabled={commentObj.rejectComment.length < 5}
                            className={`w-medium ${commentObj.rejectComment.length < 5 && 'disabled'}`}
                            size="hLarge"
                            onClick={handleApprove}>
                            반려
                        </Button>
                    </div>
                </div>
            </div>
        </BottomSheet>
    );
};

export default RejectModal;