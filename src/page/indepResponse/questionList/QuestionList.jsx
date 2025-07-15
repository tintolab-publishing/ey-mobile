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
            tooltip: '예: 상장회사 주식 보유, 회사채 보유 등',
        },
        {
            text: '2. 독립성 준수대상 회사와의 채권/채무 관계 형성',
            tooltip: '예: 돈을 빌리거나 빌려준 관계',
        },
        ],
    },
    {
        title: '[고용관계]',
        items: [
        {
            text: '3. 독립성 준수대상 회사와의 고용관계 형성',
            tooltip: '예: 해당 회사의 정규직, 계약직 등으로 재직 중인 경우',
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
                                    <label class="radio-btn">
                                        <input type="radio" name="answer" value="yes" />
                                        <span>예</span>
                                    </label>
                                    <label class="radio-btn">
                                        <input type="radio" name="answer" value="no" />
                                        <span>아니오</span>
                                    </label>
                                </div>
                                {/* [예] checked 된 경우 노출 */}
                                <Textarea className="h87" placeholder="지분증권권/재무증권 보유자(본인, 배우자 등)와 지분증권/채무증권 발행 회사명을 기재" style={{ whiteSpace: 'pre-wrap' }}/>
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


