import './HeaderMobile.scss'
import logo from '../../../Assets/logo.png'


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
            <div className="mobile-header_top row">
                <div className='top_left col-6'>
                    <img src={logo} alt="logo" className='logo' />
                </div>
                <div className='top_right col-6'>
                    <div className="name">DUOYIN</div>
                </div>
            </div>
        </div>
    )
}

export const HeaderMobileBottom = () => {
    return (
        <div className="header-mobile">
            <div className="mobile-header_bottom">
                <div className="menu-items">
                    {menu.map((item, index) => {
                        return (
                            <div key={index} className={`item ${item.path}`} title={item.text} >
                                <div className="icon">{item.icon}</div>
                            </div>
                        )
                    })}
                    <div className='item btn-group dropup'>
                        <div className='icon' title="更多操作" data-bs-toggle="dropdown" aria-expanded="false">
                            <i className="fa-solid fa-ellipsis"></i>
                        </div>
                        <ul className="dropdown-menu">
                            {subMenu.map((item, index) => {
                                return (
                                    <li className="dropdown-item" key={index}>
                                        <div className='icon'>{item.icon}</div>
                                        <div className='text'>{item.text}</div>
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