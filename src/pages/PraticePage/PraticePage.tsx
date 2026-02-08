import './PraticePage.scss';
import { getDataBaiTap } from '../../services';
import { useEffect, useState } from 'react';
import { normalizeDataBaiTap } from '../../utils/normalizeDataBaiTap';
import practice from '../../language/practice';
const PraticePage = () => {
    const [dataBaiTap, setDataBaiTap] = useState([]);
    const [dataNormalized, setDataNormalized] = useState({});
    const [loading, setLoading] = useState(true);
    const EXPIRE_TIME = 1000 * 60 * 60 * 6; //time
    const handleGetDataBaiTap = async () => {

        const res = await getDataBaiTap();
        if (!res) return [];
        if (res && res?.values && res?.values.length > 0) {
            setDataBaiTap(res?.values.slice(Number(import.meta.env.VITE_BAITAP_START_ROW)))
            return res?.values.slice(Number(import.meta.env.VITE_BAITAP_START_ROW))
        }
    }
    const getDataBaiTapFromLocalStorage = () => {
        const cache = localStorage.getItem(`${import.meta.env.VITE_CACHE_KEY}`);
        const cacheTime = localStorage.getItem(`${import.meta.env.VITE_CACHE_TIME_KEY}`);
        if (cache && cacheTime) {
            const isExpired = Date.now() - Number(cacheTime) > EXPIRE_TIME;
            if (!isExpired) {
                setDataBaiTap(JSON.parse(cache))
                return JSON.parse(cache);
            }
        }
        const res = handleGetDataBaiTap();
        localStorage.setItem(import.meta.env.VITE_CACHE_KEY, JSON.stringify(res));
        localStorage.setItem(import.meta.env.VITE_CACHE_TIME_KEY, String(Date.now()));
        return res;
    }

    const renderItem = () => {
        return practice.map((item) => {
            return (
                <div className='option-item' key={item.type}>
                    <div className='option-item_title'>{item.title} </div>
                    {item?.titleCn && item?.titleCn !== "" && <div className='option-item_title_cn'>{item?.titleCn}</div>}
                </div>
            )
        })
    }

    useEffect(() => {
        getDataBaiTapFromLocalStorage();
    }, []);
    useEffect(() => {
        if (dataBaiTap && dataBaiTap?.length > 0) {
            const normalizedData = normalizeDataBaiTap(dataBaiTap);
            if (normalizedData) {
                setDataNormalized((prev) => ({
                    ...prev,
                    ...normalizedData
                }));
            }
        }
    }, [dataBaiTap]);


    return (
        <div className='practice-page_container'>
            <div className='practice-page_title'>
                Bài tập (练习)
            </div>
            <div className='practice-page_subtitle'>Chọn một trong số các dạng bài tập dưới đây để bắt đầu
            </div>
            <div className='practice-page_option'>
                {renderItem()}
            </div>
        </div>
    );
};

export default PraticePage;