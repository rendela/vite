import { startServer } from "./server.js";
export default function rendela() {
    return {
        name: "rendela",
        apply: "build",
        closeBundle() {
            process.nextTick(() => {
                setImmediate(() => {
                    startServer();
                });
            });
        },
    };
}
export * from "./server.js";
export * from "./config.js";
export * from "./crawler.js";
export * from "./logUtils.js";
//# sourceMappingURL=index.js.map