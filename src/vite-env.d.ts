/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_BASE_URL: string
	readonly VITE_APP_VERSION: string
	readonly VITE_EVENTOS_API_URL: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}