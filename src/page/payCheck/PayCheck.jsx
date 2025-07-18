import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../common/component/dropdown/Dropdown';
import EasyObj from '../../common/dataset/EasyObj';
import EasyList from '../../common/dataset/EasyList';
import Select from '../../common/component/select/Select';
import Button from '../../common/component/button/Button';
import { AppContext } from '../../common/share/AppContext';
import Tab from '../../common/component/tab/Tab';
import PaymentBox from './paymentBox/PaymentBox';
import RemarkBox from './remarkBox/RemarkBox';

const PayCheck = () => {
    const cmn = useContext(AppContext);
    const navigate = useNavigate();

    const yearfilterOption = EasyList([
        { value: '', text: '2025', selected: true },
        { value: '', text: '2024',},
        { value: '', text: '2023' },
        { value: '', text: '2022', },
        { value: '', text: '2021', }
    ]);
    const monthfilterOption = EasyList([
        { value: '', text: '6', selected: true },
        { value: '', text: '5',},
        { value: '', text: '4' },
        { value: '', text: '3', },
        { value: '', text: '2', }
    ]);

    const tabList = EasyList([
        {
            title: "HY",
            selected: true,
        },
        { title: "법인2", },
    ]);

    const paymenInfoItems = [
        {
            title: 'HY 6월 급여 지급 명세서',
            date: '2025-06-25',
            period: '2025-06-01~2025-06-30',
            payment: '5,000,000,000',
            total: '11,000,000',
            netAmount: '4,989,000,000'
        }
    ]
    const remarkList = [
        {
            infoText1: '시간외 근무수당에는 연장 월 52h(휴일근로 포함)에 대한 150%의 연장근로수당과 야간 및 휴일근로 각 월 20h의 50%를 가산한 야간 및 휴일근로 가산수당이 포함되어 있음',
            infoText2: '통상임금은 기본급과 식대보조비, 자녀보육수당, 계리자격수당을 합산한 금액에 월 통상임금산정 기준시간 수(209h)로 나눈 금액',
            overtimeExtended: '52h x 통상임금 x 1.5',
            overtimeNight: '20h x 통상임금 x 0.5',
            overtimeHoliday: '20h x 통상임금 x 0.5',
        }
    ]

    return (
        <div className="page-wrap">
            <div className="page-content">
                <div className="input-filter-wrap">
                    <div className="input-area gap-[16px]">
                        <div className="input-inner gap-[8px]">
                            <Select dataList={yearfilterOption} className="w-small" />
                            <span className="date-unit">년</span>
                        </div>
                        <div className="input-inner gap-[8px]">
                            <Select dataList={monthfilterOption} className="w-small" />
                            <span className="date-unit">월</span>
                        </div>
                    </div>
                    <Button className="w-small h40">조회</Button>
                </div>

                <div className="tab-wrap">
                    <Tab dataList={tabList} />
                    <div className='tab-content'>
                        <div className="list-wrap flex flex-col gap16">
                            {tabList[0].selected &&
                                <>
                                    <div className="btn-wrap">
                                        <button type="button" className="btn">급여</button>
                                        <button type="button" className="btn">상여금</button>
                                    </div>
                                    {paymenInfoItems.map((paymentInfo, index) => (
                                        <PaymentBox key={index} dataSet={paymentInfo}/>
                                    ))}
                                    {remarkList.map((remark, index) => (
                                        <RemarkBox key={index} dataSet={remark} />
                                    ))}
                                </>
                            }
                            {tabList[1].selected &&
                                <>
                                    <div>bbbb</div>
                                </>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayCheck;