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
exports.defineExtension = exports.PluginVersionOrderByRelevanceFieldEnum = exports.QueryMode = exports.JsonNullValueFilter = exports.PluginDownloadOrderByRelevanceFieldEnum = exports.PluginOrderByRelevanceFieldEnum = exports.UserOrderByRelevanceFieldEnum = exports.NullsOrder = exports.JsonNullValueInput = exports.SortOrder = exports.PluginVersionScalarFieldEnum = exports.PluginDownloadScalarFieldEnum = exports.PluginScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.prismaVersion = exports.getExtensionContext = exports.Decimal = exports.Sql = exports.raw = exports.join = exports.empty = exports.sql = exports.PrismaClientValidationError = exports.PrismaClientInitializationError = exports.PrismaClientRustPanicError = exports.PrismaClientUnknownRequestError = exports.PrismaClientKnownRequestError = void 0;
const runtime = __importStar(require("@prisma/client/runtime/client"));
exports.PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
exports.PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
exports.PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
exports.PrismaClientInitializationError = runtime.PrismaClientInitializationError;
exports.PrismaClientValidationError = runtime.PrismaClientValidationError;
exports.sql = runtime.sqltag;
exports.empty = runtime.empty;
exports.join = runtime.join;
exports.raw = runtime.raw;
exports.Sql = runtime.Sql;
exports.Decimal = runtime.Decimal;
exports.getExtensionContext = runtime.Extensions.getExtensionContext;
exports.prismaVersion = {
    client: "7.3.0",
    engine: "9d6ad21cbbceab97458517b147a6a09ff43aa735"
};
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    User: 'User',
    Plugin: 'Plugin',
    PluginDownload: 'PluginDownload',
    PluginVersion: 'PluginVersion'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.UserScalarFieldEnum = {
    id: 'id',
    githubId: 'githubId',
    username: 'username',
    avatar: 'avatar',
    role: 'role',
    createdAt: 'createdAt'
};
exports.PluginScalarFieldEnum = {
    id: 'id',
    authorId: 'authorId',
    name: 'name',
    description: 'description',
    icon: 'icon',
    downloads: 'downloads',
    isPublic: 'isPublic',
    adminDisabled: 'adminDisabled',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PluginDownloadScalarFieldEnum = {
    id: 'id',
    pluginId: 'pluginId',
    ip: 'ip',
    createdAt: 'createdAt'
};
exports.PluginVersionScalarFieldEnum = {
    id: 'id',
    pluginId: 'pluginId',
    version: 'version',
    content: 'content',
    changelog: 'changelog',
    status: 'status',
    auditLog: 'auditLog',
    auditorId: 'auditorId',
    createdAt: 'createdAt'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.JsonNullValueInput = {
    JsonNull: exports.JsonNull
};
exports.NullsOrder = {
    first: 'first',
    last: 'last'
};
exports.UserOrderByRelevanceFieldEnum = {
    id: 'id',
    githubId: 'githubId',
    username: 'username',
    avatar: 'avatar'
};
exports.PluginOrderByRelevanceFieldEnum = {
    id: 'id',
    authorId: 'authorId',
    name: 'name',
    description: 'description',
    icon: 'icon'
};
exports.PluginDownloadOrderByRelevanceFieldEnum = {
    id: 'id',
    pluginId: 'pluginId',
    ip: 'ip'
};
exports.JsonNullValueFilter = {
    DbNull: exports.DbNull,
    JsonNull: exports.JsonNull,
    AnyNull: exports.AnyNull
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
exports.PluginVersionOrderByRelevanceFieldEnum = {
    id: 'id',
    pluginId: 'pluginId',
    version: 'version',
    changelog: 'changelog',
    auditLog: 'auditLog',
    auditorId: 'auditorId'
};
exports.defineExtension = runtime.Extensions.defineExtension;
//# sourceMappingURL=prismaNamespace.js.map