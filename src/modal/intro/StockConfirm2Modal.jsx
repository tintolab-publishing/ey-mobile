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
import { format } from 'date-fns';
import { useContext } from 'react';
import { AppContext } from '../../common/share/AppContext';

const StockConfirm2Modal = ({ isOpen, onAccept, onClose }) => {
    const dataObj = isOpen || {};
    const cmn = useContext(AppContext);

    const stockObj = EasyObj(
        {
            isStockAccount: false,
            CHECK3: false,
            alterName: dataObj.alterName,
            stockList: [],
            prodList: []
        }
    );

    const handleSubmit = () => {
        // 제출 로직 구현        
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
        if (!stockObj.stockName) {
            cmn.showAlert('증권사를 선택해주세요.');
            return;
        }
        if (!stockObj.stockSubName) {
            cmn.showAlert('개인 자산종합관리 상품명을 입력해주세요.');
            return;
        }
        const newStock = `${stockObj.stockName}`;
        const newStockSubName = `${stockObj.stockSubName}`;
        if (newStock) {
            if (stockObj.stockList.find(stock => stock.text === newStock) && stockObj.stockList.find(stock => stock.subtext === newStockSubName)) {
                cmn.showAlert('이미 추가된 상품입니다.');
            }
            else {
                stockObj.stockList.push({
                    text: newStock,
                    subtext: newStockSubName,
                    value: newStock,
                    selected: false
                });
            }
        }
        else {
            cmn.showAlert('개인 자산종합관리 상품명을 입력해주세요.');
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

    const disabled = !stockObj.CHECK3 || (
        stockObj.isStockAccount ? false : stockObj.stockList.length === 0
    )

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title="주식거래확인서2"
            description="주식거래확인서2"
        >
            <div className="popup-wrap">
                <div className="popup-header">
                    <div className="popup-title-wrap">
                        <h2 className="popup-title">주식거래확인서 (2/2)</h2>
                        <div className="sub-text">개인 자산종합관리 상품 투자 관련 독립성 확인서</div>
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
                                    본인은 상기 개인 자산종합관리 상품(랩어카운트 또는 MMT 등)을 통해 투자함에 있어 국내 공인회계사법과 공인회계사윤리기준 및 EYG Independence Policy (US SEC Independence rules 포함) 등에서 요구하는 독립성 요구사항에 관한 EY한영의 정책을 충분히 숙지하고 있습니다. 이에 본인(배우자 및 부양 직계가족 포함)은 다음의 개인 자산종합관리 상품을 통한 투자 시 EY한영의 피감사회사 뿐만 아니라 그 종속회사들 및 중요한 관계회사들(이하 "독립성준수대상회사")에 대한 주식 등의 지분증권 및 독립성준수대상회사 발행 사채 등의 채무증권을 소유하지 않을 것을 확인하며 다음의 사항을 준수하겠습니다.<br />
                                    <br />
                                    (i) 본인은 개인 자산종합관리 상품을 통하여 취득하는 모든 개별 내재자산에 대하여 취득전에 독립성 제한 여부를 확인하겠습니다.<br />
                                    <br />
                                    (ii) 본인은 개인 자산종합관리 상품을 통하여 취득하는 모든 개별 내재자산에 대하여 GMS에 적시에 신고하겠습니다.<br />
                                    <br />
                                    본인은 개인 자산종합관리 상품을 통한 투자로 인하여 발생하는 독립성 관련 법규위반, 법인정책 위반에 따라 발생하는 EY한영 내부 및 외부의 어떠한 조치도 수용함을 서명합니다.
                                </div>
                            </div>
                            <Checkbox
                                label='개인 자산종합관리 상품이 없음'
                                dataKey="isStockAccount" dataSet={stockObj} />
                            {!stockObj.isStockAccount && (
                                <div className='box bg-lightgray border-line'>
                                    <div className="border-item">
                                        <div className="input-wrap gap4">
                                            <span className="label">개인 자산종합관리 상품명</span>
                                            <div className='input-area flex-col gap8'>
                                                <Select dataList={dataObj.securitiesCompany} textKey='commonCodeName' valueKey='commonCode' onChange={stockChange} />
                                                <Input readOnly={dataObj.securitiesCompany.find(item => item.selected)?.commonCodeName !== '증권사 선택'} dataObj={stockObj} dataKey="stockName" placeholder="검색되지 않는 증권사 기재" />
                                                <Input dataObj={stockObj} dataKey="stockSubName" placeholder="상품명 기재" />
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
                                                            <div className="product-name">{stock.subtext}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                            <div className='checkbox-wrap'>
                                <Checkbox label='확인 후 동의함' dataKey="CHECK3" dataSet={stockObj} />
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

export default StockConfirm2Modal;
