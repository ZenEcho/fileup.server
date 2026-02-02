"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = __importStar(require("@prisma/client/runtime/client"));
const config = {
    "previewFeatures": [],
    "clientVersion": "7.3.0",
    "engineVersion": "9d6ad21cbbceab97458517b147a6a09ff43aa735",
    "activeProvider": "mysql",
    "inlineSchema": "generator client {\n  provider = \"prisma-client\"\n  output   = \"../src/generated/client\"\n}\n\ndatasource db {\n  provider = \"mysql\"\n}\n\nenum Role {\n  DEVELOPER\n  ADMIN\n}\n\nenum PluginStatus {\n  PENDING\n  APPROVED\n  REJECTED\n}\n\nmodel User {\n  id        String   @id @default(uuid())\n  githubId  String   @unique\n  username  String\n  avatar    String?\n  role      Role     @default(DEVELOPER)\n  createdAt DateTime @default(now())\n\n  plugins          Plugin[]\n  reviewedVersions PluginVersion[] // For admins who audited versions\n}\n\nmodel Plugin {\n  id            String   @id @db.VarChar(100) // e.g. org.example.plugin\n  authorId      String\n  name          String\n  description   String\n  icon          String\n  downloads     BigInt   @default(0)\n  isPublic      Boolean  @default(true)\n  adminDisabled Boolean  @default(false)\n  createdAt     DateTime @default(now())\n  updatedAt     DateTime @updatedAt\n\n  author        User             @relation(fields: [authorId], references: [id])\n  versions      PluginVersion[]\n  downloadsList PluginDownload[]\n}\n\nmodel PluginDownload {\n  id        String   @id @default(uuid())\n  pluginId  String   @db.VarChar(100)\n  ip        String   @db.VarChar(45) // IPv6 max length is 45\n  createdAt DateTime @default(now())\n\n  plugin Plugin @relation(fields: [pluginId], references: [id], onDelete: Cascade)\n\n  @@index([pluginId, ip])\n}\n\nmodel PluginVersion {\n  id        String       @id @default(uuid())\n  pluginId  String       @db.VarChar(100)\n  version   String       @db.VarChar(50) // e.g. 1.0.0\n  content   Json // Complete plugin JSON content\n  changelog String?\n  status    PluginStatus @default(PENDING)\n  auditLog  String?\n  auditorId String?\n  createdAt DateTime     @default(now())\n\n  plugin  Plugin @relation(fields: [pluginId], references: [id], onDelete: Cascade)\n  auditor User?  @relation(fields: [auditorId], references: [id])\n\n  @@unique([pluginId, version]) // Version must be unique per plugin\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"githubId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"username\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"avatar\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"role\",\"kind\":\"enum\",\"type\":\"Role\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"plugins\",\"kind\":\"object\",\"type\":\"Plugin\",\"relationName\":\"PluginToUser\"},{\"name\":\"reviewedVersions\",\"kind\":\"object\",\"type\":\"PluginVersion\",\"relationName\":\"PluginVersionToUser\"}],\"dbName\":null},\"Plugin\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"authorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"icon\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"downloads\",\"kind\":\"scalar\",\"type\":\"BigInt\"},{\"name\":\"isPublic\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"adminDisabled\",\"kind\":\"scalar\",\"type\":\"Boolean\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"updatedAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"author\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"PluginToUser\"},{\"name\":\"versions\",\"kind\":\"object\",\"type\":\"PluginVersion\",\"relationName\":\"PluginToPluginVersion\"},{\"name\":\"downloadsList\",\"kind\":\"object\",\"type\":\"PluginDownload\",\"relationName\":\"PluginToPluginDownload\"}],\"dbName\":null},\"PluginDownload\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"pluginId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"ip\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"plugin\",\"kind\":\"object\",\"type\":\"Plugin\",\"relationName\":\"PluginToPluginDownload\"}],\"dbName\":null},\"PluginVersion\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"pluginId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"version\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"content\",\"kind\":\"scalar\",\"type\":\"Json\"},{\"name\":\"changelog\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"PluginStatus\"},{\"name\":\"auditLog\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"auditorId\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"plugin\",\"kind\":\"object\",\"type\":\"Plugin\",\"relationName\":\"PluginToPluginVersion\"},{\"name\":\"auditor\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"PluginVersionToUser\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await Promise.resolve().then(() => __importStar(require('node:buffer')));
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_fast_bg.mysql.js"))),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await Promise.resolve().then(() => __importStar(require("@prisma/client/runtime/query_compiler_fast_bg.mysql.wasm-base64.js")));
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map