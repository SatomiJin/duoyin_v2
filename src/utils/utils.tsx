export const highlightBracketText = (text: string) => {
    const regex = /（([^）]+)）/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
        // Phần nằm trong ngoặc
        if (index % 2 === 1) {
            return (
                <span
                    key={index}
                    style={{
                        color: '#ef4444',
                        fontWeight: 600,
                    }}
                >
                    （{part}）
                </span>
            );
        }

        // Phần ngoài ngoặc
        return <span key={index}>{part}</span>;
    });
};

//chuẩn hóa dữ liệu
const normalizeText = (text: string) =>
    text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

// search 
const SEARCH_INDEXES = [2, 5, 9, 13, 17]; //index của âm đọc trong data

export const searchHanTu = (data: any, keyword: string) => {
    const key = normalizeText(keyword.trim())
    if (!key) return [];

    return data.filter((item: any) =>
        SEARCH_INDEXES.some(index => {
            if (typeof (item[index]) !== "string") return false

            return normalizeText(item[index]).includes(key)

        })
    );
}


//chuyển tới mail 
export const handleNavigateMail = () => {
    const email = import.meta.env.VITE_EMAIL
    const subject = encodeURIComponent('HỖ TRỢ VỀ CHỦ ĐỀ/ỨNG DỤNG WEB');
    const body = encodeURIComponent('Chào DUOYIN,\n\nMình cần hỗ trợ về...\n\n');

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;

    window.open(gmailUrl, '_blank');
}