/// <reference types="vite/client" />

/**
 *  @external https://vitejs.dev/guide/env-and-mode.html
 */
interface ImportMetaEnv {
  readonly VITE_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_BING_MAPS_API_KEY: string;
  readonly VITE_BING_MAPS_API_URL: string;

}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
