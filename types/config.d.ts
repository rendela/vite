export declare const rootPath: string;
export declare const configFilePath: string;
export declare const defaultConfig = "// @ts-check\n/**\n * @type {import('@rendela/vite').RendelaConfigType}\n */\nexport default {\n  pages: [{ url: \"/\" }, { url: \"/signin\" }, { url: \"/signup\" }], // list of pages to render ({url: string, filename?: string, timeout?: number})\n  buildDir: \"dist\", // application build directory\n  port: 3300, // port to run the server on when rendering\n  savePath: \"pages\", // path to save the rendered pages\n  pageWaitTime: 10, // timeout for the page to load in ms\n  pageTimeout: 5000, // timeout for the page to load in ms\n  debug: true, // enable debug mode\n  autoStartOnBuild: true, // auto start the server on build\n  concurrencyLimit: 1, // number of concurrent pages to render\n  chromiumExecutablePath: undefined, // path to the chromium executable (if not provided, the crawler will install it)\n};\n";
export declare function createDefaultConfigFile(): "Config file not found, creating default config" | null;
export declare function getConfig(): Promise<RendelaConfigType>;
export interface RendelaConfigType {
    pages: RendelaPageType[];
    buildDir: string;
    port?: number;
    savePath?: string;
    pageWaitTime?: number;
    pageTimeout?: number;
    debug?: boolean;
    autoStartOnBuild?: boolean;
    chromiumExecutablePath?: string;
    concurrencyLimit?: number;
}
export interface RendelaPageType {
    url: string;
    filename?: string;
    timeout?: number;
}
