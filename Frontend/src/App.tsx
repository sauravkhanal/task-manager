import { ThemeProvider } from "./components/ThemeProvider";
import NavBar from "./components/NavBar";
import AuthProvider from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./components/Routes";

function App() {
    return (
        <AuthProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <BrowserRouter>
                    <div className=" flex flex-col min-h-screen">
                        <NavBar className="lg:px-20" />
                        <section className="lg:px-20 font-poppins grow">
                            <MyRoutes />
                        </section>
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
