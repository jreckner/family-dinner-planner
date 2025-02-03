import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Landing.jsx";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="*" element={<Landing />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;