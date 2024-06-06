import Loader from "react-spinners/PulseLoader";
import { useTheme } from "next-themes";

export default function LoadingIcon({
    text,
    isLoading,
    className,
    color,
    size = 8,
    children,
    ...restProps
}: {
    text?: string;
    isLoading: boolean;
    className?: string;
    color?: string;
    size?: number;
    children?: React.ReactNode;
    [key: string]: any;
}) {
    const { theme } = useTheme();
    const color1 = color ? color : theme == "dark" ? "#ffffff" : "#000000";
    const opacity = isLoading ? "opacity-0" : "";
    return (
        <div
            className={`flex justify-center items-center ${className}`}
            {...restProps}
        >
            <Loader
                loading={isLoading}
                className="absolute"
                color={color1}
                size={size}
            />

            <div className={`flex gap-1 ${opacity}`}>
                <p>{text}</p>
                {children}
            </div>
        </div>
    );
}
