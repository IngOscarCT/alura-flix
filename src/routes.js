import NuevoVideo from "pages/NuevoVideo/NuevoVideo";

const { default: Home } = require("pages/Home");
const { BrowserRouter, Routes, Route} = require("react-router-dom");

function AppRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/NuevoVideo" element={<NuevoVideo/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default  AppRoutes;