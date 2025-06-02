/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_VNPAY_RETURN_URL: string;
  readonly VITE_VNPAY_TMN_CODE: string;
  readonly VITE_VNPAY_HASH_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 