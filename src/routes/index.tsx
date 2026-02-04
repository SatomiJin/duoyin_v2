import DefaultLayout from "../layout/DefaultLayout/DefaultLayout";
import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import NoteBookPage from "../pages/NoteBookPage/NoteBookPage";
import OverviewPage from "../pages/OverviewPage/OverviewPage";

export default function AppRoutes() {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/notebook" element={<NoteBookPage />} />
                <Route path="/overview" element={<OverviewPage />} />
            </Route>


        </Routes>
    );
}

