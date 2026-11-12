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
    const [loading, setLoading] = useState(true)
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [dataSearch, setDataSearch] = useState([])
    const [showPopUp, setShowPopUp] = useState(false)
    const [dataPopUp, setDataPopUp] = useState([])
    const [loadError, setLoadError] = useState('')
    const getDataSoTay = async () => {
        setLoading(true)
        setLoadError('')
        try {
            const res = await services.getDataSoTay()
            if (res?.values?.length > 0) {
                // Cột STT bị đánh lại 1..20 theo từng người phụ trách, còn GIF/audio theo thứ tự toàn cục.
                // Dữ liệu có thể có hoặc không có dòng tiêu đề; GIF bắt đầu từ số 1.
                const firstRowHasHeader = !/^\d+$/.test(String(res.values[0]?.[1] ?? '').trim())
                const rows = res.values.map((row: string[], i: number) => {
                    const newRow = [...row]
                    newRow[1] = String(i + (firstRowHasHeader ? 0 : 1))
                    return newRow
                })
                setDataSoTay(rows.slice(Number(import.meta.env.VITE_SOTAY_START_ROW)))
            } else {
                setDataSoTay([])
            }
        } catch (error) {
            console.error('Không thể tải dữ liệu Sổ tay:', error)
            setDataSoTay([])
            setLoadError('Không tải được dữ liệu Sổ tay. Vui lòng kiểm tra kết nối rồi thử lại.')
        } finally {
            setLoading(false)
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
            <h1 className='notebook_title'>Sổ tay từ vựng (词汇本)</h1>
            <div className='notebook_search'>
                <input onChange={e => handleOnchangeSearch(e)} className='input_search' type="text" placeholder='Nhập từ cần tìm...' />
            </div>
            <div className={`notebook_content ${loading ? 'loading' : ''}`}>
                {loading ? <div role="status" aria-label="Đang tải dữ liệu"><Loading /></div> : loadError ? (
                    <div className="notebook_error" role="alert">
                        <p>{loadError}</p>
                        <button type="button" onClick={getDataSoTay}>Thử lại</button>
                    </div>
                ) : renderData && renderData?.length > 0 ? renderData?.map((item: any, index: number) => (
                    <CardWord onClick={() => handleShowPopUp(item)} key={index} props={{ word: item[2] }} />
                )) : <div className='notebook_no_data'>{debouncedSearch ? 'Không tìm thấy từ phù hợp.' : 'Chưa có dữ liệu từ vựng.'}</div>}
            </div>
            {showPopUp && <PopUpWordDetail props={{ data: dataPopUp, setShowPopUp: setShowPopUp }} />}
        </div>
    )
}

export default NoteBookPage