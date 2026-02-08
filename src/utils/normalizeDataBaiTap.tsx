const extractOptions = (text = '') => {
    const matches = text.match(/[A-D]\.\s.*?(?=\n[A-D]\.|$)/gs);
    return matches ? matches.map(i => i.trim()) : [];
};

export const normalizeDataBaiTap = (rows: any[]) => {
    const baiTap1: any[] = []; //Điền âm tương ứng
    const baiTap2: any[] = []; // Chọn phiên âm tương ứng
    const baiTap3: any[] = []; // Chọn nghĩa tương ứng
    const baiTap4: any[] = []; // Phán đoán đúng sai

    rows.forEach(row => {

        const id = Number(row[0]);
        const word = row[1];
        if (!word || !id) return;
        // TYPE 1 – điền phiên âm

        baiTap1.push({
            id,
            word,
            question: row[2]?.trim(),
            answer: row[3]?.trim()
        });

        // TYPE 2 – trắc nghiệm
        baiTap2.push({
            id,
            word,
            question: row[4]?.trim(),
            options: extractOptions(row[4]),
            answer: row[5]?.trim()
        });

        // TYPE 3 – trắc nghiệm
        baiTap3.push({
            id,
            word,
            question: row[6]?.trim(),
            options: extractOptions(row[6]),
            answer: row[7]?.trim()
        });

        // TYPE 4 – đúng sai
        baiTap4.push({
            id,
            word,
            question: row[8]?.trim(),
            // 错: sai, 对: đúng
            answer: row[9] === '对'
        });
    });

    return { baiTap1, baiTap2, baiTap3, baiTap4 };
};
