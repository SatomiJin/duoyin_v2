import FeaturesCard from '../../components/FeaturesCard/FeaturesCard'
import TypingText from '../../hooks/typingText'
import { overviewFeatures } from '../../language/overview'
import './OverviewPage.scss'
const OverviewPage = () => {

    return (
        <div className='overview-page_container'>
            <div className='introduction'>
                <h1 className='title'>Tổng quan về DUOYIN</h1>
                <div className='desc'><TypingText /></div>
            </div>
            <div className='features-content'>
                <h2 className='features-title'>Tính năng nổi bật</h2>
                <div className='items'>
                    {overviewFeatures.map((item, index) => (
                        <div className='item' style={index % 2 === 0 ? { justifyContent: 'flex-start' } : { justifyContent: 'flex-end' }} >
                            <FeaturesCard key={index} props={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default OverviewPage