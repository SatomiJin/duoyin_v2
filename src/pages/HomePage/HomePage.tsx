import './HomePage.scss'
import DUOTINMOBILE from '../../Assets/DUOTINMOBILE.jpeg'
import DUOTINPC from '../../Assets/DUOYIN.png'
const HomePage = () => {
    return (
        <div className="home_page_container">
            <img className='mobile' src={DUOTINMOBILE} alt="    mobile" />
            <img className='pc' src={DUOTINPC} alt="pc" />
        </div>
    );
};

export default HomePage;   