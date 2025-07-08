// Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../icon/Icon';
import SlideMenu from '../slideMenu/SlideMenu';
import styles from './Header.module.css';
import logo from '../../../assets/images/common/logo.svg';
import logoKoreaPortal from '../../../assets/images/common/logo_KoreaPortal.svg';

const Header = ({ name }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <>
            <header className="flex justify-between items-end">
                <div className={`${styles['title-wrap']}`}>
                    <div className={`${styles['logo-area']} flex items-end gap5`} onClick={() => navigate('/dashboard')}>
                        <img src={logo} alt="EY" className="" />
                        {name === '대쉬보드' && <img src={logoKoreaPortal} alt="Korea Portal" className="" />}
                    </div>
                    <div className={`${styles['title']}`}>{name !== '대쉬보드' && name}</div>
                </div>
                <div className="flex gap12 mr2">
                    {/*<Icon icon='alert' onClick={() => alert("알람 표출")} />*/}
                    <Icon icon='moMenu' onClick={toggleMenu} />
                </div>
            </header>
            <SlideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        </>
    );
};

export default Header;
