interface ImportMetaEnv {
    readonly VITE_RIOT_API_KEY: string;
    readonly VITE_RIOT_GAMENAME: string;
    readonly VITE_RIOT_TAGLINE: string;
    VITE_RIOT_VERSION_LOL: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}