import path from "path";
import fs from "fs";
export const rootPath = process.cwd();
export const configFilePath = path.join(rootPath, "rendela.config.js");
export const defaultConfig = `// @ts-check
/**
 * @type {import('@rendela/vite').RendelaConfigType}
 */
export default {
  pages: [{ url: "/" }, { url: "/signin" }, { url: "/signup" }], // list of pages to render ({url: string, filename?: string, timeout?: number})
  buildDir: "dist", // application build directory
  port: 3300, // port to run the server on when rendering
  savePath: "pages", // path to save the rendered pages
  pageWaitTime: 10, // timeout for the page to load in ms
  pageTimeout: 5000, // timeout for the page to load in ms
  debug: true, // enable debug mode
  autoStartOnBuild: true, // auto start the server on build
  concurrencyLimit: 1, // number of concurrent pages to render
  chromiumExecutablePath: undefined, // path to the chromium executable (if not provided, the crawler will install it)
};
`;
export function createDefaultConfigFile() {
    if (!fs.existsSync(configFilePath)) {
        fs.mkdirSync(path.dirname(configFilePath), { recursive: true });
        fs.writeFileSync(configFilePath, defaultConfig, "utf-8");
        return "Config file not found, creating default config";
    }
    return null;
}
export async function getConfig() {
    const configFile = await import(configFilePath);
    const loadedConfig = configFile?.default;
    return {
        buildDir: loadedConfig?.buildDir ?? "dist",
        port: loadedConfig?.port ?? 3000,
        savePath: loadedConfig?.savePath ?? "pages",
        pageWaitTime: loadedConfig?.pageWaitTime ?? 0,
        pageTimeout: loadedConfig?.pageTimeout ?? 0,
        pages: loadedConfig?.pages ?? [{ url: "/" }],
        debug: loadedConfig?.debug ?? true,
        autoStartOnBuild: loadedConfig?.autoStartOnBuild ?? true,
        chromiumExecutablePath: loadedConfig?.chromiumExecutablePath ?? undefined,
        concurrencyLimit: loadedConfig?.concurrencyLimit ?? 1,
    };
}
//# sourceMappingURL=config.js.map