import axios from "axios";

export const getDataSoTay = async () => {

    const res = await axios.get(`${import.meta.env.VITE_GOOGLE_SHEET_API_KEY}${import.meta.env.VITE_googleSheetId}/values/soTay?key=${import.meta.env.VITE_API_KEY}`);
    return res.data;
}


export const getDataBaiTap = async () => {

    const res = await axios.get(`${import.meta.env.VITE_GOOGLE_SHEET_API_KEY}${import.meta.env.VITE_googleSheetId}/values/baiTap?key=${import.meta.env.VITE_API_KEY}`);

    return res.data;
}



export const getGifdetailTuVung = async (id: string) => {
    const wordName = `${id}.gif`;
    try {
        const res = await axios.get(
            `https://www.googleapis.com/drive/v3/files`, {
            params: {
                key: import.meta.env.VITE_API_KEY,
                q: `name='${wordName}' and '${import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID}' in parents`
            }
        }
        );
        if (res.data.files && res.data.files.length > 0) {
            return `https://lh3.googleusercontent.com/u/0/d/${res.data.files[0].id}`;
        }
        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
}