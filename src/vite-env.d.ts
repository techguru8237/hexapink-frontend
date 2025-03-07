/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_BACKEND_URL: string;
  VITE_STRIPE_PUBLIC_KEY; string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
