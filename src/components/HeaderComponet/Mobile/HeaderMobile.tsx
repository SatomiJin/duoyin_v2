import './HeaderMobile.scss'
import logo from '../../../Assets/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
import { handleNavigateMail } from '../../../utils/utils'



const menu = [
    {
        text: "概述", icon: <i className="fa-solid fa-circle-user"></i>,
        desc: "Tổng quan",
        path: "overview"
    },
    {
        text: "笔记本", icon: <i className="fa-solid fa-book-bookmark"></i>,
        desc: "Sổ tay",
        path: "notebook"
    },
    {
        text: "主页", icon: <i className="fa-solid fa-house-user"></i>,
        desc: "Trang chủ",
        path: "home"
    },
    {
        text: "练习", icon: <i className="fa-solid fa-file-pen"></i>,
        desc: "Luyện tập",
        path: "practice"
    }
]

const subMenu = [
    {
        text: "视频", icon: <i className="fa-solid fa-circle-play"></i>,
        desc: "Video",
        path: "video"
    },
    {
        text: "论坛", icon: <i className="fa-solid fa-user-group"></i>,
        desc: "Diễn đàn",
        path: "forum"
    },
    {
        text: "帮助", icon: <i className="fa-solid fa-envelope"></i>,
        desc: "Hỗ trợ",
        path: "help"
    }
]




export const HeaderMobileTop = () => {
    return (
        <div className="header-mobile">
            <div className="mobile-header_top">
                <div className='top_left'>
                    <img src={logo} alt="logo" className='logo' />
                </div>
                <div className='top_right'>
                    <h1 className="name">DUOYIN</h1>
                </div>
            </div>
        </div>
    )
}

export const HeaderMobileBottom = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleNavigate = (path: string) => {
        if (path === 'home') navigate('/');
        else navigate(`/${path}`);
    }
    const handleNavigateSub = (path: string) => {

        if (path === 'video') {
            navigate(`/${path}`);
        }
        if (path === 'forum') {
            window.location.href = 'https://www.facebook.com/profile.php?id=61557907629340&sk=about'
        }
        if (path === 'help') {
            handleNavigateMail()
        }        // alert("Chức năng đang phát triển")

    }
    return (
        <div className="header-mobile">
            <div className="mobile-header_bottom">
                <div className="menu-items">
                    {menu.map((item) => {
                        const isActive = location.pathname === (item.path === 'home' ? '/' : `/${item.path}`)

                        return (
                            <button
                                key={item.path}
                                type="button"
                                className={`item ${item.path}${isActive ? ' active' : ''}`}
                                title={item.desc}
                                aria-label={item.desc}
                                aria-current={isActive ? 'page' : undefined}
                                onClick={() => handleNavigate(item.path)}
                            >
                                <span className="icon">{item.icon}</span>
                                {item.path !== 'home' && <span className="nav-label">{item.desc}</span>}
                            </button>
                        )
                    })}
                    <div className='item btn-group dropup'>
                        <button
                            type="button"
                            className='icon more-trigger'
                            title="Thêm lựa chọn"
                            aria-label="Thêm lựa chọn"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="fa-solid fa-ellipsis"></i>
                            <span className="nav-label">Thêm</span>
                        </button>
                        <ul className="dropdown-menu">
                            {subMenu.map((item) => {
                                return (
                                    <li key={item.path}>
                                        <button type="button" className="dropdown-item" onClick={() => handleNavigateSub(item.path)}>
                                            <span className='icon'>{item.icon}</span>
                                            <div className='text'>{item.text}</div>
                                        </button>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}