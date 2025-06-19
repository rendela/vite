import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { LogUtils } from "./logUtils.js";
import { execSync } from "child_process";
export async function startCrawler(config) {
    const executablePath = await askToInstallChromium(config);
    const browser = await chromium.launch({
        headless: true,
        executablePath,
    });
    const projectSavePath = path.join(config.buildDir, config.savePath);
    const savePath = path.join(process.cwd(), projectSavePath);
    if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath, { recursive: true });
    }
    if (config.debug) {
        LogUtils.log(`✓ ${config.pages.length ?? 0} pages to crawl in ${LogUtils.startPrintingGray()}${projectSavePath}${LogUtils.endPrintingGray()}`);
    }
    const concurrencyLimit = config.concurrencyLimit || 1;
    const pages = [...config.pages];
    while (pages.length > 0) {
        if (config.debug) {
            LogUtils.info("");
        }
        const batch = pages.splice(0, concurrencyLimit);
        await Promise.all(batch.map((url) => processPage(browser, config, url, savePath, projectSavePath)));
    }
    await browser.close();
}
async function processPage(browser, config, url, savePath, projectSavePath) {
    if (!url.url.startsWith("/")) {
        url.url = `/${url.url}`;
    }
    const html = await crawlPage(browser, config, url);
    if (html) {
        const fileName = url.url && url.url !== "/" ? url.url : "";
        const filePath = path.join(savePath, fileName);
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath, { recursive: true });
        }
        await fs.promises.writeFile(path.join(filePath, "index.html"), html);
        if (config.debug) {
            const signalPreSignal = fileName[0] === "/" ? "" : "/";
            const signalPostSignal = fileName === "" || fileName[fileName.length - 1] === "/" ? "" : "/";
            LogUtils.info(`Crawled: ${LogUtils.startPrintingGray()}${url.url}${LogUtils.endPrintingGray()} > ${LogUtils.startPrintingGray()}${projectSavePath}${signalPreSignal}${LogUtils.endPrintingGray()}${fileName}${signalPostSignal}index.html`);
        }
    }
}
async function crawlPage(browser, config, pageConfig) {
    const context = await browser.newContext();
    const page = await context.newPage();
    try {
        // Block unnecessary resources
        await page.route("**/*", (route) => {
            const resourceType = route.request().resourceType();
            if (["image", "font", "media"].includes(resourceType)) {
                route.abort();
            }
            else {
                route.continue();
            }
        });
        const timeout = config?.pageWaitTime ?? 0;
        if (config.pageTimeout) {
            page.setDefaultNavigationTimeout(timeout + config.pageTimeout);
        }
        const response = await page.goto(`http://localhost:${config.port}${pageConfig.url}`, {
            waitUntil: "networkidle",
        });
        if (response && response.status() === 404) {
            LogUtils.error(`Skipping 404: ${pageConfig.url}`);
            return null;
        }
        await page.waitForTimeout(timeout);
        const html = await page.content();
        return html;
    }
    catch (error) {
        LogUtils.error(`Error crawling ${pageConfig.url}: ${error}`);
        return null;
    }
    finally {
        await page.close();
        await context.close();
    }
}
async function askToInstallChromium(config) {
    if (config?.chromiumExecutablePath) {
        return config.chromiumExecutablePath;
    }
    let browserInstalled = false;
    let path = undefined;
    try {
        path = await chromium.executablePath(); // will throw if not installed
        // Check if the executable path exists
        if (fs.existsSync(path)) {
            browserInstalled = true;
            path = path;
        }
    }
    catch { }
    if (browserInstalled && path) {
        return path;
    }
    if (config.debug) {
        LogUtils.log("Installing Chromium...");
    }
    const packageManager = getPackageManager();
    execSync(`${packageManager} playwright install chromium`, {
        stdio: "inherit",
    });
    if (config.debug) {
        LogUtils.success("Chromium installed successfully");
    }
    return await chromium.executablePath();
}
function getPackageManager() {
    const userAgent = process.env.npm_config_user_agent || "";
    if (process.env.BUN_INSTALL === "1")
        return "bunx";
    if (userAgent.includes("pnpm"))
        return "pnpx";
    if (userAgent.includes("yarn"))
        return "yarn dlx";
    if (userAgent.includes("npm"))
        return "npx";
    return "npx";
}
//# sourceMappingURL=crawler.js.map