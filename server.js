import path from "path";
import http from "http";
import fs from "fs";
import { startCrawler } from "./crawler.js";
import { LogUtils } from "./logUtils.js";
import { createDefaultConfigFile, getConfig } from "./config.js";
const fileExtensionRegex = /\.[a-zA-Z0-9]+$/;
export async function startServer(isCli = false) {
    const message = createDefaultConfigFile();
    const startTime = Date.now();
    const config = await getConfig();
    if (!isCli && !config.autoStartOnBuild) {
        return;
    }
    if (config.debug) {
        LogUtils.info("");
        LogUtils.info("");
        LogUtils.info("------------------------------------");
        LogUtils.info("       Welcome to Rendela    ");
        LogUtils.info("------------------------------------");
        if (message) {
            LogUtils.error(message);
            LogUtils.info("");
        }
        LogUtils.warn("Starting pre-rendering the pages...");
    }
    const server = http.createServer((req, res) => {
        if (!req.url) {
            return return404(res);
        }
        const isAsset = req.url.startsWith("/assets") || fileExtensionRegex.test(req.url);
        const distDir = path.resolve(process.cwd(), config.buildDir);
        const filePath = path.join(distDir, isAsset ? req.url : "index.html");
        const exists = fs.existsSync(filePath);
        if (!exists) {
            return return404(res);
        }
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 Internal Server Error");
                return;
            }
            const extname = path.extname(filePath);
            let contentType = contentTypeMap[extname] || "text/html";
            res.writeHead(200, { "Content-Type": contentType });
            res.end(data);
        });
    });
    const port = config.port ?? 3000;
    server.listen(port, () => {
        if (config.debug) {
            LogUtils.warn(`The server to crawl the pages is running at http://localhost:${port}`);
            LogUtils.info("");
        }
        setTimeout(async () => {
            await startCrawler(config);
            server.close();
            const endTime = Date.now();
            const duration = endTime - startTime;
            LogUtils.success(`✓ Pre-rendered in ${(duration / 1000).toFixed(2)}s`);
        }, 1000);
    });
}
function return404(res) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
}
const contentTypeMap = {
    ".js": "application/javascript",
    ".mjs": "application/javascript",
    ".cjs": "application/javascript",
    ".ts": "application/typescript",
    ".tsx": "application/typescript",
    ".css": "text/css",
    ".json": "application/json",
    ".csv": "text/csv",
    ".txt": "text/plain",
    ".html": "text/html",
    ".htm": "text/html",
    ".xhtml": "application/xhtml+xml",
    ".md": "text/markdown",
    ".yaml": "application/x-yaml",
    ".yml": "application/x-yaml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".bmp": "image/bmp",
    ".tiff": "image/tiff",
    ".tif": "image/tiff",
    ".webp": "image/webp",
    ".pdf": "application/pdf",
    ".xml": "application/xml",
    ".zip": "application/zip",
    ".tar": "application/x-tar",
    ".rar": "application/vnd.rar",
    ".7z": "application/x-7z-compressed",
    ".mp4": "video/mp4",
    ".m4v": "video/x-m4v",
    ".webm": "video/webm",
    ".mov": "video/quicktime",
    ".avi": "video/x-msvideo",
    ".wmv": "video/x-ms-wmv",
    ".flv": "video/x-flv",
    ".mp3": "audio/mpeg",
    ".wav": "audio/wav",
    ".ogg": "audio/ogg",
    ".flac": "audio/flac",
    ".aac": "audio/aac",
    ".midi": "audio/midi",
    ".mid": "audio/midi",
    ".opus": "audio/opus",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".eot": "application/vnd.ms-fontobject",
    ".otf": "font/otf",
};
//# sourceMappingURL=server.js.map