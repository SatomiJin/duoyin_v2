import { handleNavigateMail } from '../../utils/utils';
import './FooterComponent.scss'
const FooterComponent = () => {
    const handleNavigate = (item: string) => {
        if (item === 'facebook') {
            window.location.href = import.meta.env.VITE_FACEBOOK_GROUP_LINK
        }
        if (item === 'gmail') {
            handleNavigateMail()
        }
    }
    return (
        <div className="footer-component_container">
            <div className="footer-component_copyright">
                <div className='title'>Bản quyền</div>
                <div className='content'>
                    © 2026 Nhóm sinh viên nghiên cứu đề tài “Thiết kế và xây dựng hệ thống ngữ liệu trực tuyến chữ Hán đa âm”.
                    <br />Technical implementation by Jin.
                </div>
            </div>
            <div className='footer-component_contact'>
                <div className='item' onClick={() => handleNavigate('gmail')}>
                    <i className="fa-solid fa-envelope"></i>
                    <div className='text'>{import.meta.env.VITE_EMAIL}</div>
                </div>
                <div className='item' onClick={() => handleNavigate('facebook')}>
                    <i className="fa-brands fa-facebook"></i>
                    <div className='text'>Duoyin - Hệ thống ngữ liệu trực tuyến chữ Hán đa âm </div>
                </div>
            </div>
        </div>
    );
};

export default FooterComponent; 