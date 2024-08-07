import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { createContext, useContext, useState } from "react";

interface IModalContext {
    hideModal: () => void;
    showModal: (content: React.ReactNode) => void;
}

const ModalContext = createContext<IModalContext | undefined>(undefined);

export const ModalProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    const showModal = (content: React.ReactNode) => setModalContent(content);
    const hideModal = () => setModalContent(null);

    // useEffect(() => {
    //     const handleKeyDown = (event: KeyboardEvent) => {
    //         if (event.key === "Escape") {
    //             hideModal();
    //         }
    //     };

    //     window.addEventListener("keydown", handleKeyDown);

    //     return () => {
    //         window.removeEventListener("keydown", handleKeyDown);
    //     };
    // }, []);

    return (
        <ModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            {modalContent && (
                <div
                    className="absolute top-0 left-0 w-full min-h-screen backdrop-blur-md bg-black bg-opacity-5 flex justify-center items-center z-20 p-5 "
                    onClick={() => hideModal()}
                >
                    <Button
                        onClick={hideModal}
                        size="icon"
                        className="absolute top-5 right-5 z-30"
                        variant="destructive"
                        title="close"
                    >
                        <X />
                    </Button>
                    <div
                        className="flex flex-col justify-center items-center h-auto max-w-2xl min-w-[75vw] md:min-w-[50vw] hover:bg-"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {modalContent}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
};
