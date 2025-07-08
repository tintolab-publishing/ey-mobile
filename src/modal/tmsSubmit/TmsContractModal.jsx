import React, { useState } from 'react';
import BottomSheet from '../../common/component/bottomSheet/BottomSheet';;
import Textarea from '../../common/component/textarea/Textarea';
import Button from '../../common/component/button/Button';
import EasyObj from '../../common/dataset/EasyObj';

const TmsContractModal = ({ isOpen, dataList, onClose }) => {
    const engList = dataList || [];
    console.log(dataList);
    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="계약서 미진행 ENG"
            description="계약서 미진행 ENG"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap flex justify-between">
                        <h2 className="popup-title">계약서 진행 확인</h2>
                    </div>
                </div>
                <div className="popup-body">
                    <div className='flex flex-col gap16'>
                        {engList.map((eng, index) => (
                            <div className='box bg-lightgray timesheet-item border-line' key={index}>
                                <div className="border-item">
                                    <div className="subject-wrap">
                                        <div className="text-area">
                                            <div className="flex items-center gap6">
                                                <div className="subject">
                                                    <h2 className="eng-name">{eng.enm}</h2>
                                                </div>
                                            </div>
                                            <div className="eng-code-area">
                                                <div className="pipe-list">
                                                    <span className="pipe-item">{eng.eid}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-item">
                                    <div className="text-wrap">
                                        <div className="text">{eng.desc}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div className="floating-btn-wrap">
                <Button
                    className={`floating-btn white`}
                    size="hLarge"
                    onClick={onClose}>
                    닫기
                </Button>
            </div>
        </BottomSheet>
    );
};

export default TmsContractModal;