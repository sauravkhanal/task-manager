import { Route, Routes, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import NavBar from "./components/NavBar";

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/verify" element={<VerifyOTP />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
