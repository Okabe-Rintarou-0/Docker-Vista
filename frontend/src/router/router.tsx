import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../page/home";
import { TopologicalPage } from "../page/topo";

export default function AppRouter() {
    return <BrowserRouter>
        <Routes>
            <Route index element={<HomePage/>}/>
            <Route path="/topo" element={<TopologicalPage/>}/>
        </Routes>
    </BrowserRouter>
}