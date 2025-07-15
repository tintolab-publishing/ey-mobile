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
                                    <PaymentBox />
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