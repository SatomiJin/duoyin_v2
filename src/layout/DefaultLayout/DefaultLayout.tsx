import { Outlet } from "react-router-dom";
import HeaderPc from "../../components/HeaderComponet/PC/HeaderPc";
import { HeaderMobileTop, HeaderMobileBottom } from "../../components/HeaderComponet/Mobile/HeaderMobile";
import './DefaultLayout.scss';
import FooterComponent from "../../components/FooterComponent/FooterComponent";

const DefaultLayout = () => {

    return (
        <div className="default-layout_container">
            <div className="default-layout_header">
                <HeaderPc />
                <HeaderMobileTop />
            </div>
            <div
                className="default-layout_content"
                id="scroll-container"
            >
                <Outlet />
            </div>
            <div className="default-layout_footer">
                <FooterComponent />
                <HeaderMobileBottom />
            </div>
        </div>
    );
}

export default DefaultLayout;