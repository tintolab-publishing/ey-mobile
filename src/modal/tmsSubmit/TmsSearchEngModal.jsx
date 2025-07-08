import { useContext, useEffect } from "react";
import BottomSheet from "../../common/component/bottomSheet/BottomSheet";
import Select from "../../common/component/select/Select";
import Tab from "../../common/component/tab/Tab";
import EasyList from "../../common/dataset/EasyList";
import Input from "../../common/component/input/Input";
import Button from "../../common/component/button/Button";
import EasyObj from "../../common/dataset/EasyObj";
import { AppContext } from "../../common/share/AppContext";
import { format, endOfWeek, subWeeks } from 'date-fns';

const TmsSearchEngModal = ({ isOpen, onClose, onAddDone }) => {
    const cmn = useContext(AppContext);

    const tabList = EasyList([
        { title: "전체", selected: true },
        { title: "Non-chargeable", selected: false },
        { title: "직접 입력", selected: false }
    ])

    useEffect(() => {
        cmn.getUserInfo();
    }, []);

    const reqObj = EasyObj();

    const totalList = EasyList();

    const nonList = EasyList();

    const customOption = EasyList([
        {
            value: 'Engagement Type',
            text: 'Engagement Type',
            selected: false,
            placeholder: true
        },
        {
            value: 'C',
            text: 'Chargeable',
            selected: false
        },
        {
            value: 'P',
            text: 'Authorized Project',
            selected: false
        },
    ]);

    const customData = EasyObj({
        E_NM: 'Global Code'
    });

    const onTabChange = (title) => {
        console.log(title);
        totalList.forAll(item => item.selected = false);
        nonList.forAll(item => item.selected = false);
        if (title === 'Non-chargeable') {
            searchNonChEng();
        }
    };

    const onEngTypeChange = (e) => {
        if (e.target.value === "Engagement Type") {
            customData.E_TYPE = '';
            customData.E_TYPE_CLS = '';
        }
        else {
            customData.E_TYPE = e.target.value;
            customData.E_TYPE_CLS = e.target.value;
        }
        console.log(customData);
    }

    const onAddClick = () => {
        const engData = tabList.find(item => item.selected).title === '전체' ?
            totalList.find(item => item.selected) :
            tabList.find(item => item.selected).title === 'Non-chargeable' ?
                nonList.find(item => item.selected) :
                customData;
        if (engData.MERC_EID) {
            if (!/^[a-zA-Z]-\d{8}$/.test(engData.MERC_EID) && tabList.find(item => item.selected).title === '직접 입력') {
                cmn.showAlert("Engagement Code는 X-숫자 8자리 형태로만 입력할 수 있습니다.");
                return;
            }
        }
        engData.MERC_EID = engData.MERC_EID.toUpperCase();
        if (!engData.EID) {
            engData.EID = engData.MERC_EID.slice(2);
        }
        console.log(engData);
        onAddDone(engData);
        onClose();
    };

    const onSearch = () => {
        selectEngagement();
    };

    const selectEngagement = async () => {

        const req = {
            url: '/timeSheet/selectEngagement.do',
            method: 'POST',
            data: {
                searchWord: reqObj.searchWord,
                E_STAT: 'O',
                gpn: cmn.userInfo.GPN,
                eowDate: format(endOfWeek(new Date(), { weekStartsOn: 6 }), 'yyyy-MM-dd')
            },
            type: 'urlEncoded'
        };
        const api = await cmn.axios(req);
        totalList.copy(api.data.engagementList.filter(item => item.E_STAT === 'R'));
    };

    const searchNonChEng = async () => {

        const req = {
            url: '/timeSheet/searchNonChEng.do',
            method: 'POST',
            data: {
                searchWord: 'Non-Chargeable Code',
                E_STAT: 'O',
                gpn: cmn.userInfo.GPN,
                eowDate: format(endOfWeek(new Date(), { weekStartsOn: 6 }), 'yyyy-MM-dd')
            },
            type: 'urlEncoded'
        };
        const api = await cmn.axios(req);
        nonList.copy(api.data.engagementList.filter(item => item.E_STAT === 'R'));
    };


    const disabled =
        tabList.find(item => item.selected).title === '전체' ?
            !totalList.find(item => item.selected) :
            tabList.find(item => item.selected).title === 'Non-chargeable' ?
                !nonList.find(item => item.selected) :
                !customData.E_TYPE_CLS || !customData.MERC_EID

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="Engagement 추가"
            description="Engagement 추가"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <h2 className="popup-title">추가하실 Engagement의<br />정보를 검색해주세요.</h2>
                        <div className="sub-text">Name, Code, EP, EM으로 검색이 가능합니다.</div>
                    </div>
                </div>
                <div className="popup-body">
                    <div className="tab-wrap">
                        <Tab dataList={tabList} onChange={onTabChange} />

                        {tabList.find(item => item.selected).title === '전체' &&
                            <div className="tab-content">
                                <div className="input-area gap8">
                                    <Input dataObj={reqObj} dataKey='searchWord'></Input>
                                    <Button size='hSmall' className="w-small" onClick={onSearch}>조회</Button>
                                </div>
                                <div className="timesheet-list">
                                    {totalList.map((total, index) => (
                                        <div className={`box line shadow timesheet-item  border-line ${total.selected ? 'selected' : ''}`} key={index} onClick={() => { totalList.forAll((total, key) => total.selected = key === index); }}>
                                            <div className="border-item">
                                                <div className="subject-wrap">
                                                    <div className="text-area">
                                                        <div className="flex items-center gap6">
                                                            <div className="subject">
                                                                <h2 className="eng-name">{total.E_NM}</h2>
                                                            </div>
                                                        </div>
                                                        <div className="eng-code-area">
                                                            <div className="pipe-list">
                                                                <span className="pipe-item">{total.MERC_EID}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="border-item">
                                                <div className="info-list">
                                                    <div className="info-item">
                                                        <div className="label col-1">EP</div>
                                                        <div className="value col-2">{total.EP_NAME}</div>
                                                        <div className="label col-3">EM</div>
                                                        <div className="value col-4">{total.EM_NAME}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }

                        {tabList.find(item => item.selected).title === 'Non-chargeable' &&
                            <div className="tab-content">
                                <div className="timesheet-list">
                                    {nonList.map((non, index) => (
                                        <div className={`box line shadow timesheet-item ${non.selected ? 'selected' : ''}`} key={index} onClick={() => { nonList.forAll((non, key) => non.selected = key === index); }}>
                                            <div className="subject-wrap">
                                                <div className="text-area">
                                                    <div className="flex items-center gap6">
                                                        <div className="subject">
                                                            <h2 className="eng-name">{non.E_NM}</h2>
                                                        </div>
                                                    </div>
                                                    <div className="eng-code-area">
                                                        <div className="pipe-list">
                                                            <span className="pipe-item">{non.MERC_EID}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }

                        {tabList.find(item => item.selected).title === '직접 입력' &&
                            <div className="tab-content">
                                <div className="input-wrap gap16">
                                    <div className="input-area flex-col">
                                        <span className="label">Engagement Type</span>
                                        <Select dataList={customOption} onChange={(e) => onEngTypeChange(e)} />
                                    </div>
                                    <div className="input-area flex-col">
                                        <span className="label">Engagement Code</span>
                                        <Input dataObj={customData} dataKey='MERC_EID' placeholder='Engagement Code 입력' />
                                    </div>
                                </div>
                            </div>
                        }

                    </div>
                </div>
            </div>
            <div className="floating-btn-wrap">
                <Button disabled={disabled} className={`floating-btn primary ${disabled && 'disabled'}`} gap="small" onClick={() => onAddClick()} >
                    추가
                </Button>
            </div>
        </BottomSheet>
    );
};

export default TmsSearchEngModal;