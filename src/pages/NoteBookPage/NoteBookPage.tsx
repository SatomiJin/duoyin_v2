import * as services from '../../services'
import { useEffect, useState } from 'react'
import './NoteBookPage.scss'
import CardWord from '../../components/cardWord/cardWord'
import Loading from '../../components/animation/loading/Loading'
import { searchHanTu } from '../../utils/utils'
import PopUpWordDetail from '../../components/PopUpWordDetail/PopUpWordDetail'

const NoteBookPage = () => {
    const [dataSoTay, setDataSoTay] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [dataSearch, setDataSearch] = useState([])
    const [showPopUp, setShowPopUp] = useState(false)
    const [dataPopUp, setDataPopUp] = useState([])
    const getDataSoTay = async () => {
        setLoading(true)
        const res = await services.getDataSoTay()
        // console.log(res.values);

        if (res && res?.values?.length > 0) {
            setDataSoTay(res?.values.slice(Number(import.meta.env.VITE_SOTAY_START_ROW)))
        }
    }
    const handleOnchangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }
    const handleShowPopUp = (data: any) => {
        setShowPopUp(true)
        setDataPopUp(data)
    }

    // use effec 
    useEffect(() => {
        getDataSoTay()
    }, [])

    // console.log("dataSoTay", dataSoTay);

    useEffect(() => {
        if (dataSoTay && dataSoTay?.length > 0) {
            setLoading(false)
        }
    }, [dataSoTay])

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500); // 0.5s

        return () => clearTimeout(timer); // huỷ nếu gõ tiếp
    }, [search]);

    useEffect(() => {
        if (debouncedSearch) {
            const result = searchHanTu(dataSoTay, debouncedSearch)
            if (result && result?.length > 0) {
                setDataSearch(result)
            }
            else {
                setDataSearch([])
            }
        }
    }, [debouncedSearch, search])
    const renderData = debouncedSearch ? dataSearch : dataSoTay;


    return (
        <div className='notebook_container'>
            <div className='notebook_title'>DUOYIN</div>
            <div className='notebook_search'>
                <input onChange={e => handleOnchangeSearch(e)} className='input_search' type="text" placeholder='Nhập từ cần tìm...' />
            </div>
            <div className={`notebook_content ${loading ? 'loading' : ''}`}>
                {loading ? <Loading /> : renderData && renderData?.length > 0 ? renderData?.map((item: any, index: number) => (
                    <CardWord onClick={() => handleShowPopUp(item)} key={index} props={{ word: item[2] }} />
                )) : <div className='notebook_no_data'>Không có dữ liệu...</div>}
            </div>
            {showPopUp && <PopUpWordDetail props={{ data: dataPopUp, setShowPopUp: setShowPopUp }} />}
        </div>
    )
}

export default NoteBookPage