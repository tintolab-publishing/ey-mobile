import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../../common/component/dropdown/Dropdown';
import EasyObj from '../../common/dataset/EasyObj';
import EasyList from '../../common/dataset/EasyList';
import Input from '../../common/component/input/Input';
import { format, startOfWeek, endOfWeek, subWeeks, subDays } from 'date-fns';
import Select from '../../common/component/select/Select';
import Button from '../../common/component/button/Button';
import { AppContext } from '../../common/share/AppContext';
import Icon from '../../common/component/icon/Icon';
import ResponseBox from './responseBox/ResponseBox';

const IndepResponse = () => {
    const cmn = useContext(AppContext);
    const navigate = useNavigate();

    const filterOption = EasyList([
        { value: '', text: '제출필요', selected: true },
        { value: 'ALL', text: '전체',},
        { value: '', text: '미제출' },
        { value: '', text: '작성중', },
        { value: '', text: '제출완료', }
    ]);

    const resListdata = [
        { index: 1, company: "메가스터디(주)", status: "pending", date:'2025-07-01', },
        { index: 2, company: "메가스터디교육(주)", status: "pending", date:'2025-07-01' },
        { index: 3, company: "메가커피", status: "editing", date:'2025-07-01' },
        { index: 4, company: "블루웨이브테크", status: "editing", date:'2025-07-01', },
        { index: 5, company: "(주)국산약품", status: "complete", date:'2025-07-01' },
        { index: 6, company: "스카이브릿지커머스", status: "complete", date:'2025-07-01' },
        { index: 7, company: "넥스트비전랩", status: "complete", date:'2025-07-01' },
    ];

    return (
        <div className="page-wrap">
            <div className="page-content">
                <div className="input-wrap">
                    <div className="input-area">
                        <Select dataList={filterOption} className="flex-1 w-small" />
                        <Input placeholder="회사명" dataKey='searchText' className="flex-2" />
                        <Button className="h40 w60">조회</Button>
                    </div>
                </div>
                <div className="contents-wrap">
                    <div className="status-info-area">
                        <div className="status-text">제출필요</div>
                        <div className="count">12건</div>
                    </div>
                    <div className="response-list flex flex-col">
                        {resListdata.map((data, index) => (
                            <ResponseBox
                                key={index}
                                dataSet={data}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IndepResponse;