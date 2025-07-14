import React from 'react'
import Dropdown from '../../common/component/dropdown/Dropdown'
import Button from '../../common/component/button/Button'
import Company from './detailItem/Company'
import Executive from './detailItem/Executive'

const DetailIndepResponse = () => {
    const companyList = [
        { ko: '리뉴에너지경기(주)', en: 'renewenergy Gyeonggi Co.,Ltd.' },
        { ko: '일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십', en: 'abcdefghijklmnopqrstuvwxyz' },
        { ko: '리뉴원(주)', en: 'Renewone Co.,Ltd.' },
        { ko: '리뉴에너지경기(주)', en: 'renewenergy Gyeonggi Co.,Ltd.' },
        { ko: '리뉴에너지경인(주)', en: 'renewenergy Gyeonin Co.,Ltd.' },
        { ko: '리뉴로지스인더(주)', en: 'renew Logis In The Co.,Ltd..' },
        { ko: '리뉴원(주)', en: 'Renewone Co.,Ltd.' },
        { ko: '리뉴원(주)', en: 'Renewone Co.,Ltd.' },
        { ko: '리뉴에너지경기(주)', en: 'renewenergy Gyeonggi Co.,Ltd.' },
        { ko: '리뉴에너지경인(주)', en: 'renewenergy Gyeonin Co.,Ltd.' },
        { ko: '리뉴로지스인더(주)', en: 'renew Logis In The Co.,Ltd..' },
    ]

    const executiveList = [
        { name: '최태원', ownershipType: '최대주주', position: '회장' },
        { name: '최기원', ownershipType: '5% 이상 주주', position: '' },
        { name: '조대식', ownershipType: '', position: '부회장' },
        { name: '장동현', ownershipType: '', position: '부회장' },
        { name: '박정호', ownershipType: '', position: '부회장' },
        { name: '조대식', ownershipType: '', position: '부회장' },
        { name: '장동현', ownershipType: '', position: '부회장' },
        { name: '박정호', ownershipType: '', position: '부회장' },
        { name: '조대식', ownershipType: '', position: '부회장' },
        { name: '장동현', ownershipType: '', position: '부회장' },
        { name: '박정호', ownershipType: '', position: '부회장' },
    ]


    return (
        <>
        <div className="contents-wrap">
            <div className="contents-title-area">
                <div className="title">
                    [주식회사 비상교육]<br />
                    감사 수입을 위한 독립성 확인 절차
                </div>
                <p className="text">
                    EY한영은 [회사명]에 대한 2024~2025년도 감사 수임을 추진하고 있어 아래 내용에 따라 7월 9일(수요일)까지 답변을 제출하여 주시기 바랍니다.
                </p>
            </div>
            <div className="list-wrap flex flex-col gap16">
                <Dropdown className="box line shadow" title="독립성 준수대상 회사 목록">
                    {companyList && (
                        <div className="company-list">
                            {companyList.map((company, index) => (
                                <Company key={index} index={index} dataSet={company} />
                            ))}
                        </div>
                    )}
                </Dropdown>
                <Dropdown className="box line shadow" title="감사대상 회사의 주요 주주 및 임원 목록">
                    {executiveList && (
                        <table className="executive-table">
                            <tr>
                                <th>성명</th>
                                <th>관계</th>
                                <th>직위</th>
                            </tr>
                            {executiveList.map((executive, index) => (
                                <Executive key={index} dataSet={executive} />
                            ))}
                        </table>
                    )}
                </Dropdown>
                <div className="box line shadow">
                    예 아니오
                </div>
            </div>
        </div>
        <div className="floating-btn-wrap">
            <Button className="floating-btn white">임시저장</Button>
            <Button className="floating-btn primary">제출</Button>
        </div>
        </>
    )
}

export default DetailIndepResponse