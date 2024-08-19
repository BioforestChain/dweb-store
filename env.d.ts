/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  // add other environment variables here
}
