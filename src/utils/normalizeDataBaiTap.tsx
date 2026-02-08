const extractOptions = (text = '') => {
    // Lấy các option A-D
    const optionRegex = /[A-D]\.\s.*?(?=\n[A-D]\.|$)/gs;
    const options = text.match(optionRegex)?.map(i => i.trim()) || [];

    // Loại bỏ options khỏi text để lấy câu hỏi
    let question = text;
    options.forEach(opt => {
        question = question.replace(opt, '');
    });

    question = question.trim();

    return {
        question,
        options
    };
};
export const normalizeDataBaiTap = (rows: any[]) => {
    const baiTap1: any[] = []; //Điền âm tương ứng
    const baiTap2: any[] = []; // Chọn phiên âm tương ứng
    const baiTap3: any[] = []; // Chọn nghĩa tương ứng
    const baiTap4: any[] = []; // Phán đoán đúng sai

    rows.forEach(row => {

        const id = `${row[1]}-${Number(row[0])}`;
        const word = row[1];

        // TYPE 1 – điền phiên âm

        baiTap1.push({
            type: 'baiTap1',
            id,
            word,
            question: row[2]?.trim(),
            answer: row[3]?.trim()
        });

        // TYPE 2 – trắc nghiệm
        baiTap2.push({
            type: 'baiTap2',
            id,
            word,
            question: extractOptions(row[4]).question,
            options: extractOptions(row[4]).options,
            answer: row[5]?.trim()
        });

        // TYPE 3 – trắc nghiệm
        baiTap3.push({
            type: 'baiTap3',
            id,
            word,
            question: extractOptions(row[6]).question,
            options: extractOptions(row[6]).options,
            answer: row[7]?.trim()
        });

        // TYPE 4 – đúng sai
        baiTap4.push({
            type: 'baiTap4',
            id,
            word,
            question: row[8]?.trim(),
            // 错: sai, 对: đúng
            answer: row[9] === '对'
        });
    });

    return { baiTap1, baiTap2, baiTap3, baiTap4 };
};
