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
