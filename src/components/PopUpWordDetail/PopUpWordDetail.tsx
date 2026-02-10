import { useEffect } from 'react';
import { getGifdetailTuVung } from '../../services';
import './PopUpWordDetail.scss'
type PopUpWordDetailProps = {
    props: {
        data: any;
        setShowPopUp: (data: boolean) => void;
    };
};

const PopUpWordDetail = ({ props }: PopUpWordDetailProps) => {
    console.log(props.data[2]);

    const getGifTuVung = async () => {
        const res = await getGifdetailTuVung(props.data[1])
        console.log(res);
    }
    useEffect(() => {
        getGifTuVung()
    }, [])
    return (
        <div className="popup_word_detail_container" onClick={() => props.setShowPopUp(false)}>
            <div className="popup_word_detail_content" onClick={(e) => e.stopPropagation()}>
                <div className="popup_word_detail_content_header">
                    <div className='text'>Thông tin từ vận</div>
                    <div className='btn btn-close'></div>
                </div>
                <div className="popup_word_detail_content_body">

                </div>
            </div>
        </div>
    )
}

export default PopUpWordDetail