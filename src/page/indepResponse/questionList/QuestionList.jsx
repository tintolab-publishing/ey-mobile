import { useState } from 'react';
import Icon from '../../../common/component/icon/Icon';
import styles from "./QuestionList.module.css";
import Textarea from '../../../common/component/textarea/Textarea';

const QuestionList = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleTooltipClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const questionData = [
    {
        title: '[재무적 이해관계]',
        items: [
        {
            text: '1. 독립성 준수대상 회사의 지분증권 또는 채무증권 보유',
            tooltip: '[예시]\n· 본인, 배우자 또는 직계가족이 독립성 준수대상 회사의 지분증권 또는 채무증권 보유\n· EY한영 임직원의 측근가족(형제/자매 등) 본인의 순자산 5% 이상에 해당하는 독립성 준수대상 회사의 주식을 보유',
            placeholder: '지분증권권/재무증권 보유자(본인, 배우자 등)와 지분증권/채무증권 발행 회사명을 기재',
        },
        {
            text: '2. 독립성 준수대상 회사와의 채권/채무 관계 형성',
            tooltip: '[예시]\n· 본인, 배우자 또는 직계가족이 독립성 준수대상 회사의 지분증권 또는 채무증권 보유\n· EY한영 임직원의 측근가족(형제/자매 등) 본인의 순자산 5% 이상에 해당하는 독립성 준수대상 회사의 주식을 보유',
            placeholder: '채권/채무 보유자(본인, 배우자 등)와 채권/채무 관계 형성 회사명을 기재',
        },
        ],
    },
    {
        title: '[고용관계]',
        items: [
        {
            text: '3. 독립성 준수대상 회사와의 고용관계 형성',
            tooltip: '[예시]\n· 본인, 배우자 또는 직계가족이 독립성 준수대상 회사의 지분증권 또는 채무증권 보유\n· EY한영 임직원의 측근가족(형제/자매 등) 본인의 순자산 5% 이상에 해당하는 독립성 준수대상 회사의 주식을 보유',
            placeholder: '고용관계가 있는 회사명/소속 부서/직급을 기재',
        },
        ],
    },
    {
        title: '[사업관계]',
        items: [
        {
            text: '4. 독립성 준수대상 회사와의 사업관계 형성',
            tooltip: '[예시]\n· 본인, 배우자 또는 직계가족이 독립성 준수대상 회사의 지분증권 또는 채무증권 보유\n· EY한영 임직원의 측근가족(형제/자매 등) 본인의 순자산 5% 이상에 해당하는 독립성 준수대상 회사의 주식을 보유',
            placeholder: '해당 회사명과 사업관계를 기재',
        },
        ],
    },
    {
        title: '[기타]',
        items: [
        {
            text: '5. 상기 이외의 이해상종이나 독립성 훼손위험이 존재하는 경우',
            placeholder: '상세 내용을 기재',
        },
        ],
    },
];

  let tooltipIndex = 0;

  return (
    <div className={styles.questionListWrap}>
        {questionData. map((question, questionIdx) => (
            <div className={styles.questionList} key={questionIdx}>
                
                <div className={styles.questionTitle}>{question.title}</div>

                {question.items.map((item, itemIdx) => {
                    const currentIndex = tooltipIndex++;
                    return (
                        <div className={styles.questionItem} key={itemIdx}>
                            <div className={styles.questionContent}>
                                <p className={styles.question}>{item.text}</p>
                                {item.tooltip && (
                                    <div
                                        className={`tooltip-area ${activeIndex === currentIndex ? 'on' : ''}`}
                                        onClick={() => handleTooltipClick(currentIndex)}
                                    >
                                        <Icon icon="tooltip-small" />
                                        {activeIndex === currentIndex && (
                                        <div className="tooltip-text">{item.tooltip}</div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className={styles.answerOptions}>
                                <div className="radio-btn-wrap">
                                    <label className="radio-btn">
                                        <input type="radio" name={`answer-${questionIdx}-${itemIdx}`} value="yes" />
                                        <span>예</span>
                                    </label>
                                    <label className="radio-btn">
                                        <input type="radio" name={`answer-${questionIdx}-${itemIdx}`} value="no" />
                                        <span>아니오</span>
                                    </label>
                                </div>
                                {/* [예] checked 된 경우 노출 */}
                                <Textarea className="h87" placeholder={item.placeholder} style={{ whiteSpace: 'pre-wrap' }}/>
                            </div>
                        </div>
                    )
                })}
            </div>
        ))}
    </div>
  );
};

export default QuestionList;


