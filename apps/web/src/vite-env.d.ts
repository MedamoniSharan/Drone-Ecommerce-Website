/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CREATE_ENV?: string;
  readonly VITE_CREATE_AUTH_PROVIDERS?: string;
  readonly VITE_CREATE_BASE_URL?: string;
  readonly VITE_CREATE_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
