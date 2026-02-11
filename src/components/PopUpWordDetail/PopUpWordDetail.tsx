import { useEffect, useState } from 'react';
import { getGifdetailTuVung } from '../../services';
import './PopUpWordDetail.scss'
type PopUpWordDetailProps = {
    props: {
        data: any;
        setShowPopUp: (data: boolean) => void;
    };
};

const PopUpWordDetail = ({ props }: PopUpWordDetailProps) => {

    const [detailTuVung, setDetailTuVung] = useState<any>([]);
    const [gifDetail, setGifDetail] = useState<string | null>(null);
    const getGifTuVung = async () => {
        if (!props?.data?.[1]) return;
        const res = await import(`../../Assets/gif/${props.data[1]}.gif`)

        if (res) {
            setGifDetail(res.default)
        }
    }
    const isPinyin = (str: string) => {
        return /^[a-zA-Zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]+$/.test(str);
    }
    const splitDetailTuVUng = () => {
        const result: string[][] = [];

        if (!props?.data) return;

        for (let i = 5; i < props.data.length; i += 4) {
            const current = props.data[i];

            // Nếu là pinyin thật
            if (current && isPinyin(current)) {
                const block = props.data.slice(i, i + 4);
                result.push(block);
            }
        }

        setDetailTuVung(result);
    }

    //tách dòng với mô tả và ví dụ có 1. 2. 3. ...
    const splitNumberedText = (text: string) => {
        if (!text) return [];

        return text
            .split('\n')     // tách theo dòng
            .map(t => t.trim())
            .filter(Boolean);
    };


    // phát âm 
    const handlePlayAudio = async (index: string) => {
        const idAudio = props.data[1] + "." + index
        const result = await import(`../../Assets/audio/${idAudio}.mp3`)
        const audio = new Audio(result.default)
        audio.play()
    }
    useEffect(() => {
        getGifTuVung()
    }, [])
    //useEffect
    useEffect(() => {
        // getGifTuVung()
        splitDetailTuVUng()
    }, [props?.data])


    return (
        <div className="popup_word_detail_container" onClick={() => props.setShowPopUp(false)}>

            <div className="popup_word_detail_content" onClick={(e) => e.stopPropagation()}>
                <div className="popup_word_detail_content_header">
                    <div className='text'>Thông tin từ vận</div>

                    <div className='btn btn-close' onClick={() => props.setShowPopUp(false)}></div>
                </div>
                <div className="popup_word_detail_content_body">
                    <div className='body_header'>
                        <div className='body_header_gif'>
                            {gifDetail && <img src={gifDetail} alt="" />}
                        </div>
                        <div className='body_header_desc'>
                            <div className='net-ve'>{props?.data[3]} Nét vẽ</div>
                            <div className='am-doc'>{props?.data[4]} Âm đọc</div>
                        </div>
                    </div>
                    <div className='body_content'>
                        <table className="table">
                            <thead>
                                <tr className='table_header_row'>
                                    <th scope="col">STT</th>
                                    <th scope="col">Phiên âm</th>
                                    <th scope="col">Từ loại</th>
                                    <th scope="col">Giải thích</th>
                                    <th scope="col">Ví dụ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detailTuVung && detailTuVung.length > 0 && detailTuVung.map((item: any, index: number) => (
                                    <tr className='table_item_row' key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td><i onClick={() => handlePlayAudio(String(index + 1))} style={{ cursor: 'pointer' }} className="fa-solid fa-volume-high"></i> {item[0]}</td>
                                        <td>{item[1]}</td>
                                        <td>
                                            {splitNumberedText(item[2]).map((text, i) => (
                                                <div key={i}>{text}</div>
                                            ))}
                                        </td>
                                        <td>
                                            {splitNumberedText(item[3]).map((text, i) => (
                                                <div key={i}>{text}</div>
                                            ))}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopUpWordDetail