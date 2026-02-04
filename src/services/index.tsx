import axios from "axios";

export const getDataSoTay = async () => {

    const res = await axios.get(`${import.meta.env.VITE_GOOGLE_SHEET_API_KEY}${import.meta.env.VITE_googleSheetId}/values/soTay?key=${import.meta.env.VITE_API_KEY}`);
    return res.data;
}