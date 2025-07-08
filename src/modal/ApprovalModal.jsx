/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import BottomSheet from '../common/component/bottomSheet/BottomSheet';
import Textarea from '../common/component/textarea/Textarea';
import Button from '../common/component/button/Button';
import EasyObj from '../common/dataset/EasyObj';

const ApprovalModal = ({ isOpen, onAccept, onClose, dataList }) => {
    const apprReqList = dataList || [];
    const commentObj = EasyObj();

    const handleApprove = () => {
        apprReqList.forEach(appr => {
            appr.apprComment = commentObj.apprComment;
        });
        // 승인 로직 구현
        onAccept ? onAccept(apprReqList) : alert("승인처리");
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
                    <div className="popup-title-wrap">
                        <h2 className="popup-title">승인</h2>
                    </div>
                </div>
                <div className="popup-body">
                    <Textarea
                        dataSet={commentObj}
                        dataKey="apprComment"
                        className=""
                        placeholder="(선택) 승인 Comment를 입력해 주세요."
                        style={{ whiteSpace: 'pre-wrap' }}
                    />
                    <div className="bottom-btn-wrap right">
                        <Button
                            className="w-medium"
                            size="hLarge"
                            variant="primary"
                            onClick={handleApprove}>
                            승인
                        </Button>
                    </div>
                </div>
            </div>
        </BottomSheet>
    );
};

export default ApprovalModal;