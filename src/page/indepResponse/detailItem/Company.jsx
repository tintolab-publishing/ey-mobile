import React, { useEffect, useRef, useState } from 'react'
import styles from './Company.module.css'

const Company = ({ index, dataSet }) => {
  const companyData = dataSet || {};
  const cntrRef = useRef(null);
  const koRef = useRef(null);
  const [koWidth, setKoWidth] = useState(0);
  const [cntrWidth, setCntrWidth] = useState(0);
  const [isFontSmall, setIsFontSmall] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      if (cntrRef.current) {
        setCntrWidth(cntrRef.current.offsetWidth);
      }
      if (koRef.current) {
        setKoWidth(koRef.current.offsetWidth);
      }
    });

    return () => cancelAnimationFrame(frame);
  }, [companyData]);

  useEffect(() => {
    if(cntrWidth && koWidth) {
      if(cntrWidth - 42 <= koWidth) {
        setIsFontSmall(true);
      } else {
        setIsFontSmall(false);
      }
    }
  }, [koWidth, cntrWidth]);


  return (
    <div ref={cntrRef} className={`${styles.companyItem} ${isFontSmall?styles.small:''}`}>
      <em className={styles.num}>{index+1}</em>
      <em ref={koRef}>{companyData.ko}</em>
      <span>
        (<span>{companyData.en}</span>)
      </span>
    </div>
  )
}

export default Company