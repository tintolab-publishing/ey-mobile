import React from 'react'
import styles from './Company.module.css'

const Company = ({ index, dataSet }) => {
  const companyData = dataSet || {};
  return (
    <div className={styles.companyItem}>
      <em>{index+1}</em>
      <em>{companyData.ko}</em>
      <span>
        (<span>{companyData.en}</span>)
      </span>
    </div>
  )
}

export default Company