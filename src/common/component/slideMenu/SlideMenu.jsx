import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../share/AppContext';
import Img from '../img/Img';
import { useNavigate } from 'react-router-dom';
import Icon from '../icon/Icon';
import EasyObj from '../../dataset/EasyObj';
import Input from '../input/Input';
import Button from '../button/Button';
import EasyList from '../../dataset/EasyList';
import Dropdown from '../dropdown/Dropdown';

const SlideMenu = ({ isOpen, onClose }) => {
    const cmn = useContext(AppContext);
    const navigate = useNavigate();
    const [search, setSearch] = useState(false);
    const searchObj = EasyObj();
    const peopleList = EasyList();
    const common = useContext(AppContext);

    useEffect(() => {
        cmn.getUserInfo();
    }, [])

    const onMenuClick = (index) => {
        switch (index) {
            case 0:
                navigate('/dashboard');
                onClose();
                return;
            case 1:
                navigate('/tmsSubmit');
                onClose();
                return;
            case 2:
                navigate('/tmsApproval');
                onClose();
                return;
            case 3:
                common.sharedData.filter = "요청";
                common.sharedData.tabType = "승인자";
                navigate('/roundRobin');
                onClose();
                return;
            case 4:
                common.sharedData.filter = "요청";
                common.sharedData.tabType = "승인자";
                navigate('/procurement');
                onClose();
                return;
            case 5:
                common.sharedData.Filter = "요청";
                common.sharedData.tabType = "승인자";
                navigate('/payment');
                onClose();
                return;
            case 6:
                setSearch(true);
                return;
            default:
                return;
        }
    };

    const onSearch = async () => {
        const resultList = await cmn.getPeopleInfo(searchObj.searchWord);
        peopleList.copy(resultList);
    };

    const onSearchBack = () => {
        searchObj.searchWord = '';
        setSearch(false);
        peopleList.length = 0;
    };

    return (
        <div className={`slide-menu-wrap ${isOpen ? 'open' : ''} ${search ? 'people-search-wrap' : ''}`}>
            {search ?
                /* 직원 검색*/
                <div className="flex flex-col overflow-hidden detail-page-wrap">
                    <div className="detail-page-header">
                        <Icon icon="arrow-left-md" onClick={() => onSearchBack()} />
                        <span className="detail-page-title">People Search</span>
                    </div>
                    <div className="detail-page-contents">
                        <div className="input-area gap8">
                            <Input placeholder='검색어를 입력해주세요.' dataObj={searchObj} dataKey='searchWord'></Input>
                            <Button size='hSmall' className="w-small" onClick={onSearch}>검색</Button>
                        </div>
                        <div className="contents-wrap overflow-y-auto overscroll-contain">
                            <div className="people-list-wrap">
                                {peopleList.map((people, index) => (
                                    <div className='people-list' key={index}>
                                        <div className='profile-box'>
                                            <div className="profile-img-area">
                                                <Img src={people.IMG ? `data:image/jpg;base64, ${people.IMG}` : ''} defaultSrc='people' className="profile-img" />
                                            </div>
                                            <div className='profile-info-area'>
                                                <p className="name">{people.KOR_NAME || people.ENG_NAME}</p>
                                                <p className="position"><span>{people.POSITION_NAME || '-'}</span><span>{people.DEPART_NAME || '-'}</span></p>
                                            </div>
                                        </div>
                                        <div className='detail-info-area'>
                                            <div className="info-text-list-wrap">
                                                <div className="info-text-list">
                                                    <div className="info-text w-full select-none">
                                                        <p className="label">전화번호</p>
                                                        <p className="value cursor-pointer active:opacity-60"
                                                            onClick={() => people.EXT_NO && people.EXT_NO !== '-' && (window.location.href = `tel:${people.EXT_NO}`)}>
                                                            {people.EXT_NO || '-'}
                                                        </p>
                                                    </div>
                                                    <div className="info-text w-full select-none" >
                                                        <p className="label">휴대폰번호</p>
                                                        <p className="value cursor-pointer active:opacity-60"
                                                            onClick={() => people.CEL_PHONE && people.CEL_PHONE !== '-' && (window.location.href = `tel:${people.CEL_PHONE}`)}>
                                                            {people.CEL_PHONE || '-'}
                                                        </p>
                                                    </div>
                                                    <div className="info-text w-full select-none">
                                                        <p className="label">email</p>
                                                        <p className="value cursor-pointer active:opacity-60"
                                                            onClick={() => people.E_MAIL && people.E_MAIL !== '-' && (window.location.href = `mailto:${people.E_MAIL}`)}>
                                                            {people.E_MAIL || '-'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {people.ASSISTANT_NAME &&
                                            <div className="assistant-info-wrap">
                                                <Dropdown className='box info-box' title='Assistant'>
                                                    <div className="info-text-list-wrap">
                                                        <div className='assistant-name'>
                                                            {people.ASSISTANT_NAME}
                                                        </div>
                                                        <div className="info-text-list">
                                                            <div className="info-text w-full">
                                                                <p className="label">{"전화번호"}</p>
                                                                <p className="value cursor-pointer active:opacity-60"
                                                                    onClick={() => people.ASSISTANT_EXT_NO && people.ASSISTANT_EXT_NO !== '-' && (window.location.href = `tel:${people.ASSISTANT_EXT_NO}`)}>
                                                                    {people.ASSISTANT_EXT_NO || '-'}
                                                                </p>
                                                            </div>
                                                            <div className="info-text w-full">
                                                                <p className="label">{"휴대폰번호"}</p>
                                                                <p className="value cursor-pointer active:opacity-60"
                                                                    onClick={() => people.ASSISTANT_CEL_PHONE && people.ASSISTANT_CEL_PHONE !== '-' && (window.location.href = `tel:${people.ASSISTANT_CEL_PHONE}`)}>
                                                                    {people.ASSISTANT_CEL_PHONE || '-'}
                                                                </p>
                                                            </div>
                                                            <div className="info-text w-full">
                                                                <p className="label">{"eMail"}</p>
                                                                <p className="value cursor-pointer active:opacity-60"
                                                                    onClick={() => people.ASSISTANT_INTERNET_ADDR && people.ASSISTANT_INTERNET_ADDR !== '-' && (window.location.href = `mailto:${people.ASSISTANT_INTERNET_ADDR}`)}>
                                                                    {people.ASSISTANT_INTERNET_ADDR || '-'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Dropdown>
                                            </div>

                                        }
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                :
                /* 메뉴 */
                <>
                    <div className='flex justify-end'>
                        <Button variant="icon" onClick={onClose}>
                            <Icon icon="close" />
                        </Button>
                    </div>
                    <div className="menu-area">
                        <div className="box profile-box">
                            <div className="profile-img-area">
                                {/** 
                                 * Img 컴포넌트 내부에서 디폴트 이미지 변경 필요
                                */}
                                <Img src={cmn.userInfo.IMG ? `data:image/jpg;base64, ${cmn.userInfo.IMG}` : ''} defaultSrc='people' className="profile-img" />
                            </div>
                            <div className='profile-info-area'>
                                <p className="name">{cmn.userInfo.KOR_NAME || cmn.userInfo.ENG_NAME}</p>
                                <p className="position"><span>{cmn.userInfo.POSITION_NAME || '-'}</span><span>{cmn.userInfo.DEPART_NAME || '-'}</span></p>
                            </div>
                        </div>
                        <nav className="nav">
                            <ul className="menu-list">
                                <li className="memu-item" onClick={() => onMenuClick(0)}>
                                    <Icon icon="menu01" />
                                    <div className="menu">Main</div>
                                </li>
                                <li className="memu-item" onClick={() => onMenuClick(1)}>
                                    <Icon icon="menu02" />
                                    <div className="menu">TimeSheet 작성</div>
                                </li>
                                <li className="memu-item" onClick={() => onMenuClick(2)}>
                                    <Icon icon="menu03" />
                                    <div className="menu">TimeSheet 승인</div>
                                </li>
                                <li className="memu-item" onClick={() => onMenuClick(3)}>
                                    <Icon icon="menu04" />
                                    <div className="menu">기안서 승인</div>
                                </li>
                                <li className="memu-item" onClick={() => onMenuClick(4)}>
                                    <Icon icon="menu05" />
                                    <div className="menu">구매 승인</div>
                                </li>
                                <li className="memu-item" onClick={() => onMenuClick(5)}>
                                    <Icon icon="menu06" />
                                    <div className="menu">AP 승인</div>
                                </li>
                                <li className="memu-item" onClick={() => onMenuClick(6)}>
                                    <Icon icon="menu07" />
                                    <div className="menu">People Search</div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </>
            }
        </div >
    );
};

export default SlideMenu;
