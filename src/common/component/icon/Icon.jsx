import React from 'react';
import styles from './Icon.module.css';

const Icon = ({ icon, onClick, className }) => {
    return (
        <span className={`${styles.icon} ${styles[icon]} ${className}`} onClick={onClick}>
            {icon}
        </span>
    )
};

export default Icon;