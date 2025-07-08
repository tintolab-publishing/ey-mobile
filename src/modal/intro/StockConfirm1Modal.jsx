/* eslint-disable react/prop-types */
import BottomSheet from '../../common/component/bottomSheet/BottomSheet';
import Textarea from '../../common/component/textarea/Textarea';
import Button from '../../common/component/button/Button';
import EasyObj from '../../common/dataset/EasyObj';
import Checkbox from '../../common/component/checkbox/Checkbox';
import Select from '../../common/component/select/Select';
import Input from '../../common/component/input/Input';
import EasyList from '../../common/dataset/EasyList';
import Icon from '../../common/component/icon/Icon';
import Dropdown from '../../common/component/dropdown/Dropdown';
import { format } from 'date-fns';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../common/share/AppContext';

const StockConfirm1Modal = ({ isOpen, onAccept, onClose }) => {
    const dataObj = isOpen || {};
    const stockObj = EasyObj(
        {
            isStockAccount: false,
            CHECK1: false,
            CHECK2: false,
            alterName: dataObj.alterName,
            stockList: []
        }
    );
    const cmn = useContext(AppContext);
    const handleSubmit = () => {
        onAccept ? onAccept(stockObj) : alert("주식거래확인서1 제출");
    };

    const stockChange = (e) => {
        if (e.target.text === '증권사 선택') {
            stockObj.stockName = '';
        }
        else {
            stockObj.stockName = e.target.text;
        }
        console.log(dataObj.securitiesCompany);
    };

    const addStock = () => {
        if (stockObj.stockName) {
            if (stockObj.stockList.find(stock => stock.text === stockObj.stockName)) {
                cmn.showAlert('이미 추가된 증권사입니다.');
            }
            else {
                stockObj.stockList.push({
                    text: stockObj.stockName,
                    value: stockObj.stockName,
                    selected: false
                });
            }
        }
        else {
            cmn.showAlert('증권사를 선택해주세요.');
        }
    };

    const removeStock = () => {
        if (stockObj.stockList.length === 0) {
            cmn.showAlert('추가된 증권사가 없습니다.');
        }
        else if (stockObj.stockList.filter(stock => stock.selected).length === 0) {
            cmn.showAlert('삭제할 증권사를 선택해주세요.');
        }
        else {
            stockObj.stockList = stockObj.stockList.filter(stock => !stock.selected);
        }
    };

    const disabled = !stockObj.CHECK1 || !stockObj.CHECK2 || (
        stockObj.isStockAccount ? false : stockObj.stockList.length === 0
    )
    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="주식거래확인서1"
            description="주식거래확인서1"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <h2 className="popup-title">주식거래확인서 (1/2)</h2>
                        <div className="sub-text">감사대상 주권상장법인 주식거래 금지 준수확인서</div>
                    </div>
                </div>
                <div className="popup-body">
                    <div className="contents-wrap border-line">
                        <div className="border-item">
                            <div className="box terms-box h-small">
                                <div className="terms-text">
                                    <span className="date">
                                        {format(new Date(), 'yyyy년 MM월 dd일')}
                                    </span>
                                    <br />
                                    <br />
                                    1.  본인(사원인 파트너 경우 그 배우자를 포함, 이하 동일)은 미공개 중요정보를 이용한 불공정거래 행위를 방지하기 위하여 EY 한영회계법인(그 국내 관계회사 포함, 이하 동일)이 제정한 정책(한영회계법인이 감사를 하는 주권상장법인의 주식거래 금지 등)을 읽었고, 이해하였으며 충분히 숙지하고 있습니다.<br />
                                    <br />
                                    2.  본인은 {dataObj.chekDate} 현재 한영회계법인이 감사하는 주권상장법인의 주식을 보유하고 있지 않습니다.<br />
                                    <br />
                                    3.  본인은 {dataObj.chekDate} 현재 소유하고 있는 모든 주식 등을 GMS에 신고 하였습니다. (단 보유주식 등이 없는 경우에는 신고 의무 없음)<br />
                                    <br />
                                    4. 본인은 본인 명의의 주식거래 계좌가 다음과 같음을 확인합니다. (휴면계좌 등을 포함하여 모든 주식거래 계좌를 신고)<br />
                                    <br />
                                    ※ 참고: 모든 임직원은 GMS상의 Other Matters를 통해 상장유가증권 이외의 사항을 신고해야 합니다. (예: 비상장회사의 주식, 사원인 파트너 및 감사참여자인 경우 감사대상회사와의 채권/채무 내역 등)
                                </div>
                            </div>
                            <Checkbox
                                label='주식거래 계좌 없음'
                                dataKey="isStockAccount" dataSet={stockObj} />

                            {!stockObj.isStockAccount && (
                                <div className='box bg-lightgray border-line'>
                                    <div className="border-item">
                                        <div className="input-wrap gap4">
                                            <span className="label">증권사명</span>
                                            <div className='input-area flex-col gap8'>
                                                <Select dataList={dataObj.securitiesCompany} textKey='commonCodeName' valueKey='commonCode' onChange={stockChange} />
                                                <Input readOnly={dataObj.securitiesCompany.find(item => item.selected)?.commonCodeName !== '증권사 선택'} dataObj={stockObj} dataKey="stockName" placeholder="검색되지 않는 증권사 기재" />
                                            </div>
                                        </div>
                                        <div className='btn-wrap gap8 right'>
                                            <Button variant="outlineGray" gap="small" size="hSmall" className="w100" onClick={() => removeStock()}>
                                                <Icon icon="minus-gray"></Icon>
                                                삭제
                                            </Button>
                                            <Button gap="small" size="hSmall" className='w100' onClick={() => addStock()}>
                                                <Icon icon="add-wh"></Icon>
                                                추가
                                            </Button>
                                        </div>

                                    </div>
                                    {stockObj.stockList.length > 0 && (
                                        <div className="border-item">
                                            {stockObj.stockList.map((stock, index) => (
                                                <div className='box box-check' key={index}>
                                                    <div className="stock-check-item">
                                                        <Checkbox dataKey="selected" dataSet={stock} />
                                                        <div className="stock-text-area">
                                                            <div className="stock-name">{stock.text}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            <Dropdown
                                className="agree-area"
                                title={
                                    <Checkbox label='개인 정보이용 동의함' dataKey="CHECK1" dataSet={stockObj} />
                                }
                            >
                                <div className="box terms-box h-small">
                                    <h2 className="terms-title">개인정보 이용 동의서</h2>
                                    <div className="terms-text">
                                        본인은 EY 한영회계법인이 시행하는 모니터링 제도의 효과적인 운영을 위하여 다음의 개인정보를 「개인정보보호법」제15조 제1항 제1호에 따라 EY 한영회계법인에 제공 하는데 동의합니다.<br />
                                        <br />
                                        [수집하는 개인정보]<br />
                                        - 본인이 보유한 주권상장법인 종목명.취득일.처분일<br />
                                        - 계좌정보통합관리서비스 계좌통합조회<br />
                                        - 증권사 거래내역<br />
                                    </div>
                                </div>
                            </Dropdown>
                        </div>
                        <div className="border-item">
                            <div className="notice-text">
                                <div className="title">* 등록 공인회계사 참고사항</div>
                                <div className="text">
                                    감사업무(TARAS, Valuation Review, ITRA, 보험계리 검토 등 포함)에 참여하는 등록 공인회계사는 공인회계사법에 의한 직무제한 규정에 따라 배우자의 보유 주식도 신고 대상에 포함되므로, 감사참여 등록 공인회계사는 본인 뿐만 아니라 배우자의 모든 주식거래 내역 GMS상 신고해야 합니다.</div>
                            </div>
                            <div className='checkbox-wrap'>
                                <Checkbox label='확인 후 동의함' dataKey="CHECK2" dataSet={stockObj} />
                            </div>
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

export default StockConfirm1Modal;
