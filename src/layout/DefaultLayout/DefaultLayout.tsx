import { Outlet } from "react-router-dom";
import HeaderPc from "../../components/HeaderComponet/PC/HeaderPc";
import { HeaderMobileTop, HeaderMobileBottom } from "../../components/HeaderComponet/Mobile/HeaderMobile";
import './DefaultLayout.scss';

const DefaultLayout = () => {

    return <div className="default-layout_container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="default-layout_header" style={{ zIndex: 1000 }}>
            <HeaderPc />
            <HeaderMobileTop />
        </div>
        <div
            className="default-layout_content"
            id="scroll-container"
            style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', backgroundColor: 'rgba(210, 55, 63, 0.8)' }}
        >
            <Outlet />
        </div>
        <div className="default-layout_footer">
            <HeaderMobileBottom />
        </div>
    </div >;
}

export default DefaultLayout;