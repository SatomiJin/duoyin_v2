import { Outlet } from "react-router-dom";
import HeaderPc from "../../components/HeaderComponet/PC/HeaderPc";
import HeaderMobile from "../../components/HeaderComponet/Mobile/HeaderMobile";

const DefaultLayout = () => {

    return <div className="default-layout_container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="default-layout_header" style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <HeaderPc />
            <HeaderMobile />
        </div>
        <div
            className="default-layout_content"
            id="scroll-container"
            style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', backgroundColor: 'var(--bg-light)' }}
        >
            <Outlet />
        </div>
        <div className="default-layout_footer"></div>
    </div >;
}

export default DefaultLayout;