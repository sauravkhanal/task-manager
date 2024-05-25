/// <reference types="vite/client" />
// types declaration for environment variables - vite
interface ImportMetaEnv {
    readonly VITE_BACKEND_ENDPOINT: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
