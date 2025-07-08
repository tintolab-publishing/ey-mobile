import React, { useState } from 'react';
import Icon from '../icon/Icon';
import styles from './Dropdown.module.css'

const Dropdown = ({ title, desc, className, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    // 드롭다운 토글 함수
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    // 항상 렌더링할 요소 필터링 (alwaysVisible 속성이 있는 요소)
    const alwaysVisibleChildren = React.Children.map(children, (child) => {
        if (child.props.alwaysVisible) {
            return child;
        }
        return null;
    });

    return (
        <div className={className || `${styles['search-box']}`}>
            {/* 드롭다운 헤더 */}
            <div className={`${styles['box-title-wrap']} cursor-pointer`} onClick={toggleDropdown} >
                <span className={`${styles['box-title']}`}>
                    <span className="title">{title}</span>
                    {!className && (
                        <span className={`${styles['text']}`}>{desc}</span>
                    )}
                </span>
                <Icon icon="dropdown" className={`${isOpen ? 'rotate-180' : 'rotate-0'}`} />
            </div>

            {/* 항상 보이는 컨텐츠는 구분선 있음 */}
            {alwaysVisibleChildren && alwaysVisibleChildren.length > 0 &&
                <>
                    {/* 항상 보이는 컨텐츠 */}
                    {!isOpen &&
                        <div className={`${styles['content-area']}`}>
                            {alwaysVisibleChildren[0]}
                        </div>
                    }
                </>
            }

            {/* 드롭다운 컨텐츠 */}
            {isOpen && (
                <div className={`${styles['content-area']}`}>
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
