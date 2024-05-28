import AuthProvider from "./context/authContext";
import { ModalProvider } from "./context/modalContext";
import { ThemeProvider } from "./components/ThemeProvider";
import { DataProvider } from "./context/dataContext";

import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./components/Routes";
import ErrorBoundary from "./components/ErrorBoundary";

import NavBar from "./components/NavBar";
import { Toaster } from "sonner";

function App() {
    return (
        <ErrorBoundary>
            <AuthProvider>
                <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                    <DataProvider>
                        <ModalProvider>
                            <BrowserRouter>
                                <div className=" flex flex-col min-h-screen">
                                    <NavBar className="lg:px-20" />
                                    <MyRoutes />
                                    <Toaster />
                                    {/* <Modal /> */}
                                </div>
                            </BrowserRouter>
                        </ModalProvider>
                    </DataProvider>
                </ThemeProvider>
            </AuthProvider>
        </ErrorBoundary>
    );
}

export default App;
