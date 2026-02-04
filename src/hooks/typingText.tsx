import { useEffect, useState } from "react";

const TypingText = ({
    text = "DUOYIN là hệ thống ngữ liệu trực tuyến tích hợp sổ tay từ vựng và bài tập vận dụng chữ Hán đa âm. Hệ thống cung cấp các tính năng hỗ trợ người học dễ dàng tra cứu và ôn luyện kiến thức về chữ Hán đa âm.",
    speed = 30,
    className = "",
}) => {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText((prev) => prev + text[index]);
                setIndex(index + 1);
            }, speed);

            return () => clearTimeout(timeout);
        }
    }, [index, text, speed]);

    return (
        <div className={className}>
            {displayedText}
            <span className="typing-cursor">|</span>
        </div>
    );
};

export default TypingText;
