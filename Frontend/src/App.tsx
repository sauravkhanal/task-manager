import { ThemeProvider } from "./components/ThemeProvider";
import NavBar from "./components/NavBar";
import AuthProvider from "./context/authContext";
import { BrowserRouter } from "react-router-dom";
import MyRoutes from "./components/Routes";
import { Toaster } from "sonner";
import { ModalProvider } from "./context/modalContext";
import { TaskFormProvider } from "./context/createTask.context";

function App() {
    return (
        <AuthProvider>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                <ModalProvider>
                    <TaskFormProvider>
                        <BrowserRouter>
                            <div className=" flex flex-col min-h-screen">
                                <NavBar className="lg:px-20" />
                                <MyRoutes />
                                <Toaster />
                                {/* <Modal /> */}
                            </div>
                        </BrowserRouter>
                    </TaskFormProvider>
                </ModalProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
