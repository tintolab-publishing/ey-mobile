/* eslint-disable react/prop-types */
import { useContext, useEffect } from "react";
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";
import Select from "../../common/component/select/Select";
import EasyList from "../../common/dataset/EasyList";
import Input from "../../common/component/input/Input";
import Button from "../../common/component/button/Button";
import EasyObj from "../../common/dataset/EasyObj";
import { AppContext } from "../../common/share/AppContext";

const TmsSearchEpModal = ({ isOpen, onClose, onAddDone }) => {
    const cmn = useContext(AppContext);

    const reqObj = new EasyObj({
        searchWord: ''
    });

    const epList = EasyList();

    const onAddClick = () => {
        onAddDone(epList.find(item => item.selected));
        onClose();
    };

    const onSearch = async () => {
        const epData = await cmn.getPeopleInfo(reqObj.searchWord);
        console.log(epData);
        epList.copy(epData);
    };

    const disabled = !epList.find(item => item.selected);
    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="EP 검색"
            description="EP 검색"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <h2 className="popup-title">결재 승인권자의<br />정보를 검색해주세요.</h2>
                        <span className="sub-text">이름, 부서, EMAIL, GPN, GUI로 검색이 가능합니다.</span>
                    </div>
                </div>
                <div className="popup-body">
                    <div className="ep-search-wrap">
                        <div className="input-area gap8">
                            <Input dataObj={reqObj} dataKey="searchWord"></Input>
                            <Button size='hSmall' className="w-small" onClick={onSearch}>조회</Button>
                        </div>
                        <div className="timesheet-list">
                            {epList.map((ep, index) => (
                                <div className={`box line shadow timesheet-item  border-line ${ep.selected ? 'selected' : ''}`}
                                    key={index} onClick={() => { epList.forAll((ep, key) => ep.selected = key === index); }}>
                                    <div className="border-item">
                                        <div className="subject-wrap">
                                            <div className="text-area">
                                                <div className="flex items-center gap6">
                                                    <div className="subject">
                                                        <h2 className="eng-name">{ep.KOR_NAME}</h2>
                                                    </div>
                                                </div>
                                                <div className="eng-code-area">
                                                    <div className="pipe-list">
                                                        <span className="pipe-item">{ep.DEPART_NAME}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-item">
                                        <div className="info-list">
                                            <div className="info-item">
                                                <div className="label col-1">EMAIL</div>
                                                <div className="value col-2 colend-4">{ep.E_MAIL}</div>
                                                <div className="label col-1">GPN</div>
                                                <div className="value col-2">{ep.GPN}</div>
                                                <div className="label col-3">GUI</div>
                                                <div className="value col-4">{ep.GUI}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="floating-btn-wrap">
                <Button disabled={disabled} className={`floating-btn primary ${disabled && 'disabled'}`} gap="small" onClick={() => onAddClick()} >
                    확인
                </Button>
            </div>
        </BottomSheet>
    );
};

export default TmsSearchEpModal;