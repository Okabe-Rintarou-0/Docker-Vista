import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../page/home";

export default function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route index element={<HomePage/>}/>
        </Routes>
    </BrowserRouter>
}