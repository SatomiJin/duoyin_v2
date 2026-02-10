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
    const res = await axios.get(
        `https://www.googleapis.com/drive/v3/files` +
        `?key=${import.meta.env.VITE_API_KEY}` +
        `&q=name='${wordName}' and '${import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID}' in parents`
    );
    console.log(import.meta.env.VITE_BASE_LINK_DRIVE + res.data.files[0].id);

    return res.data.files[0].id;
}