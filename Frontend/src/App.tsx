import { ThemeProvider } from "./components/context/theme-provider";
import { ModeToggle } from './components/mode-toggle';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center text-4xl ">
        <h1>Vite + React + Ts + Tailwind</h1>
        <p>
          Color Mode: <span className="hidden dark:inline">Dark</span>
          <span className="dark:hidden">Light</span>
        </p>
        <ModeToggle />
      </div>
    </ThemeProvider>
  );
}

export default App;
