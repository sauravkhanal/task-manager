import { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "../ui/button";

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    goBack = () => {
        window.history.back();
    };

    logoutHandler = () => {
        const theme = localStorage.getItem("vite-ui-theme");
        localStorage.clear();
        localStorage.setItem("vite-ui-theme", theme!);
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col gap-10 justify-center items-center h-screen bg-bgColor1">
                    <p className="font-bold text-2xl text-text1">
                        Something went wrong
                    </p>
                    <span className="flex gap-5 my-5">
                        <Button disabled>Go Back</Button>
                        <Button>
                            <a href="/">Home</a>
                        </Button>
                        <Button onClick={this.logoutHandler}>
                            <a href="/">Logout</a>
                        </Button>
                        <Button disabled>Report</Button>
                    </span>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
