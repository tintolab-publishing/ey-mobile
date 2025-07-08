import React, { useEffect, useRef } from 'react'
import Button from '../common/component/button/Button'
import styles from './Alert.module.css'

const Alert = ({ text, onClick }) => {

  const alertRef = useRef(null);

  const handleSubmit = (e) => {
    e.stopPropagation();
    onClick(e);
  };

  useEffect(() => {
    if (alertRef.current) {
      alertRef.current.focus();
    }
  }, [])

  return (
    <div
      ref={alertRef}
      tabIndex={0}
      className={styles.modalContainer}
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.modalInner}>
        <div className={styles.scrollContainer}>
          <div>
            {text}
          </div>
        </div>
        <div className={styles.btnWrap}>
          <Button className={`btn white`} gap="small" onClick={handleSubmit}>
            확인
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Alert