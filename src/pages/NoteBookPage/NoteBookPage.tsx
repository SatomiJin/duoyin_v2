import * as services from '../../services'
import { useEffect, useState } from 'react'
import './NoteBookPage.scss'
import CardWord from '../../components/cardWord/cardWord'
import Loading from '../../components/animation/loading/Loading'

const NoteBookPage = () => {
    const [dataSoTay, setDataSoTay] = useState([])
    const [loading, setLoading] = useState(false)
    const getDataSoTay = async () => {
        setLoading(true)
        const res = await services.getDataSoTay()

        if (res && res?.values?.length > 0) {
            setDataSoTay(res?.values.slice(Number(import.meta.env.VITE_SOTAY_START_ROW)))
        }
    }

    useEffect(() => {
        getDataSoTay()
    }, [])
    useEffect(() => {
        if (dataSoTay && dataSoTay?.length > 0) {
            setLoading(false)
        }
    }, [dataSoTay])
    return (
        <div className='notebook_container'>
            <div className='notebook_title'>DUOYIN</div>
            <div className='notebook_search'>
                <input className='input_search' type="text" placeholder='Nhập từ cần tìm...' />
            </div>

            <div className={`notebook_content ${loading ? 'loading' : ''}`}>
                {loading ? <Loading /> : dataSoTay && dataSoTay?.length > 0 && dataSoTay?.map((item: any, index: number) => (
                    <CardWord key={index} props={{ word: item[2] }} />
                ))}
            </div>
        </div>
    )
}

export default NoteBookPage