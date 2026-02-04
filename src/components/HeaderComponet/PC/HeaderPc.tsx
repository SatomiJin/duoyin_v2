import logo from '../../../assets/logo.png'
import './HeaderPc.scss'
import language from '../../../language/language'
import { useLocation, useNavigate } from 'react-router-dom';
const HeaderPc = () => {
    const navigate = useNavigate()
    const menuItems = (data: any, index: number) => {
        return (<div key={index} className={`item ${location.pathname === data.path ? 'active' : ''}`} title={data?.desc} onClick={() => handleNavigate(data.path)}>
            <div className='icon'>{data?.icon}</div>
            <div className='text'>{data?.text}</div>
        </div>)
    }
    let location = useLocation()


    const handleNavigate = (path: string) => {
        // navigate()
        if (path === 'practice' || path === 'forum' || path === 'help') return;
        navigate(path);
    }
    return (
        <div className="header-pc_container">
            <div className="row">
                <div className="header-logo col-lg-4 col-md-2">
                    <img className='header-logo_img' src={logo} alt="logo" />
                </div>
                <div className='menu col-lg-8 col-md-10'>

                    {language && language?.map((item, index) => {
                        return menuItems(item, index)
                    })}
                </div>
            </div>
        </div>
    );
};

export default HeaderPc;