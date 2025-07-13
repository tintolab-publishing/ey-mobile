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
        { value: '', text: '제출필요', },
        { value: 'ALL', text: '전체', selected: true },
        { value: '', text: '미제출' },
        { value: '', text: '작성중', },
        { value: '', text: '제출완료', }
    ]);

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
                <ResponseBox />
            </div>
        </div>
    );
};

export default IndepResponse;