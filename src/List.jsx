import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TmsStatusModal from './modal/TmsStatusModal';
import CmnStatusModal from './modal/CmnStatusModal';
import styles from './List.module.css';

const List = () => {
    const [modalOpen1, setModalOpen1] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);

    return (
        <div className={styles.listArea}>
            <ul>
                <li>
                    <h1><Link className={styles.link} to="/component">Component</Link></h1>
                </li>
                <li>
                    {/*<h1>대쉬보드</h1>*/}
                    <ul>
                        <li>
                            <h2>대쉬보드</h2>
                            <ul>
                                <li><Link className={styles.link} to="/dashboard">대쉬보드</Link></li>
                                <li><Link className={styles.link} onClick={() => setModalOpen1(true)}>타임시트 현황 모달</Link></li>
                                <li><Link className={styles.link} onClick={() => setModalOpen2(true)}>결재 현황 모달</Link></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
            {modalOpen1 &&
                <TmsStatusModal isOpen={modalOpen1} onClose={() => setModalOpen1(false)} />
            }
            {modalOpen2 &&
                <CmnStatusModal isOpen={modalOpen2} onClose={() => setModalOpen2(false)} />
            }
        </div>
    );
}

export default List