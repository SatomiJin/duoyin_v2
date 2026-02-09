import { useEffect, useState } from 'react';
import './PopUpExerciseComponent.scss';
import { highlightBracketText } from '../../utils/utils';

interface PopUpExerciseComponentProps {
    data: any;
    type: string;
    setIsOpenPopUp: (value: boolean) => void;
}

const PopUpExerciseComponent = ({ data, type, setIsOpenPopUp }: PopUpExerciseComponentProps) => {
    const [questionData, setQuestionData] = useState<any>([]);
    const [answerUser, setAnswerUser] = useState<any>([]);
    const USED_KEY = 'USED_QUESTION';

    // get danh sách câu hỏi đã làm và lưu câu hỏi đã làm vào local storage
    const getUserQuestion = () => {
        const userQuestion = localStorage.getItem(`${USED_KEY}_${type}`);
        if (userQuestion) {
            return JSON.parse(userQuestion);
        }
        return [];
    }

    const saveUsedIds = (ids: string[], type: string) => {
        localStorage.setItem(`${USED_KEY}_${type}`, JSON.stringify(ids));
    };
    //reset câu hỏi đã làm
    // const resetIfDoneAll = (totalQuestions: number) => {
    //     const usedIds = getUserQuestion();
    //     if (usedIds.length >= totalQuestions) {
    //         localStorage.removeItem(`${USED_KEY}_${type}`);
    //         return true; // đã reset
    //     }
    //     return false;
    // };
    //lấy random 20 câu hỏi 
    const getRandomQuestions = (allQuestions: any[], count = 20) => {
        let usedIds = getUserQuestion();

        // Nếu đã làm hết → reset
        if (usedIds.length >= allQuestions.length) {
            localStorage.removeItem(`${USED_KEY}_${type}`);
            usedIds = [];
        }

        // Lọc câu chưa làm
        const available = allQuestions.filter(
            q => !usedIds.includes(q.id)
        );

        // Shuffle 
        const shuffled = [...available].sort(() => Math.random() - 0.5);

        // Lấy 20 câu
        const selected = shuffled.slice(0, count);

        // Lưu id đã dùng
        saveUsedIds(
            [...usedIds, ...selected.map(q => q.id)],
            type
        );

        return selected;
    };
    //onchange user option 
    const handleSelectAnswer = (questionId: string, option: string) => {
        setAnswerUser((prev: any[]) => {
            const existed = prev.find((a: any) => String(a.questionId) === String(questionId));

            if (existed) {
                if (type === 'baiTap2' || type === 'baiTap3') {
                    return prev.map((a: any) =>
                        String(a.questionId) === String(questionId)
                            ? { ...a, answer: option.split('.')[0] }
                            : a
                    );
                }
                return prev.map((a: any) =>
                    String(a.questionId) === String(questionId)
                        ? { ...a, answer: option }
                        : a
                );
            }

            return [
                ...prev,
                {
                    questionId: questionId,
                    answer:
                        type === 'baiTap2' || type === 'baiTap3'
                            ? option.split('.')[0]
                            : option
                }
            ];
        });
    };

    // submit 
    const getUnansweredQuestions = () => {
        return questionData.filter(
            (q: any) =>
                !answerUser.some((a: any) => a.questionId === q.id)
        );
    };
    const handleSubmit = () => {
        let correct = 0;
        const unanswered = getUnansweredQuestions();
        console.log(answerUser);

        if (answerUser.length !== questionData.length) {
            alert(
                `Bạn chưa trả lời các câu hỏi: ${unanswered
                    .map((q: any) => q.order || questionData.indexOf(q) + 1)
                    .join(', ')} trong dề bài`
            );
            return;
        }
        questionData.forEach((q: any) => {

            const userAns = answerUser?.find(
                (a: any) => a.questionId === q.id
            );

            if (userAns?.answer === q.correctAnswer) {
                correct++;
            }
        });
        alert(`Bạn đúng ${correct}/${questionData.length} câu.`);
        setAnswerUser([]);
    };

    // use effect
    useEffect(() => {
        if (data && data?.length > 0) {
            const questions = getRandomQuestions(data, 20);
            setQuestionData(questions);
        }
    }, [data, type]);


    return (
        <div className="pop-up_container" onClick={() => setIsOpenPopUp(false)}>
            <div className='pop-up' onClick={(e) => e.stopPropagation()}>
                <div className="pop-up_header">
                    <div className='submit' onClick={() => handleSubmit()}>Nộp bài</div>
                    <div className='title'>Điền phiên âm đúng</div>
                    <div className='btn btn-close' onClick={() => setIsOpenPopUp(false)}></div>
                </div>
                <div className="pop-up_content">
                    {questionData.map((item: any, index: number) => (
                        <div key={index} className="question-item_select">
                            <div className="question-item_title">{index + 1}. {highlightBracketText(item.question)}</div>
                            < div className="question-item_answer">
                                {type && (type === 'baiTap2' || type === 'baiTap3') && item && item?.options && item?.options.length > 0 && item?.options.map((option: any, optionIndex: number) => (
                                    <div key={optionIndex} className="option-item">
                                        {type && (type === 'baiTap2' || type === 'baiTap3') && <>
                                            <input
                                                type="radio"
                                                id={option}
                                                name={item.id}
                                                checked={
                                                    answerUser.find((a: any) => a.questionId === item.id)?.answer ===
                                                    (type === 'baiTap2' || type === 'baiTap3'
                                                        ? option.split('.')[0]
                                                        : option)
                                                }
                                                onChange={() => handleSelectAnswer(item.id, option)}
                                            />
                                            <label htmlFor={option}>{option}</label></>}
                                    </div>
                                ))}
                                {/* Bài tập dạng input */}
                                {type && type === 'baiTap1' && <>
                                    <input
                                        type="text"
                                        className='input_answer'
                                        name={item.id}
                                        value={
                                            answerUser.find((a: any) => a.questionId === item.id)?.answer || ''
                                        }
                                        onChange={(e) => handleSelectAnswer(item.id, e.target.value)}
                                    />
                                </>}
                                {/* Bài dập dạng select dropdown */}
                                {type && type === 'baiTap4' && <>
                                    <select
                                        className='select_answer'
                                        name={item.id}
                                        value={
                                            answerUser.find((a: any) => a.questionId === item.id)?.answer || ''
                                        }
                                        onChange={(e) => handleSelectAnswer(item.id, e.target.value)}
                                    >
                                        {/* // 错: sai, 对: đúng */}
                                        <option value="">Chọn đáp án</option>
                                        <option value="错">错</option>
                                        <option value="对">对</option>

                                    </select>
                                </>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default PopUpExerciseComponent;