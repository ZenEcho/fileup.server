import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: import("@prisma/client/runtime/client").DbNullClass;
export declare const JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
export declare const AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
export declare const ModelName: {
    readonly User: "User";
    readonly Plugin: "Plugin";
    readonly PluginDownload: "PluginDownload";
    readonly PluginVersion: "PluginVersion";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly githubId: "githubId";
    readonly username: "username";
    readonly avatar: "avatar";
    readonly role: "role";
    readonly createdAt: "createdAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const PluginScalarFieldEnum: {
    readonly id: "id";
    readonly authorId: "authorId";
    readonly name: "name";
    readonly description: "description";
    readonly icon: "icon";
    readonly downloads: "downloads";
    readonly isPublic: "isPublic";
    readonly adminDisabled: "adminDisabled";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PluginScalarFieldEnum = (typeof PluginScalarFieldEnum)[keyof typeof PluginScalarFieldEnum];
export declare const PluginDownloadScalarFieldEnum: {
    readonly id: "id";
    readonly pluginId: "pluginId";
    readonly ip: "ip";
    readonly createdAt: "createdAt";
};
export type PluginDownloadScalarFieldEnum = (typeof PluginDownloadScalarFieldEnum)[keyof typeof PluginDownloadScalarFieldEnum];
export declare const PluginVersionScalarFieldEnum: {
    readonly id: "id";
    readonly pluginId: "pluginId";
    readonly version: "version";
    readonly content: "content";
    readonly changelog: "changelog";
    readonly status: "status";
    readonly auditLog: "auditLog";
    readonly auditorId: "auditorId";
    readonly createdAt: "createdAt";
};
export type PluginVersionScalarFieldEnum = (typeof PluginVersionScalarFieldEnum)[keyof typeof PluginVersionScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const JsonNullValueInput: {
    readonly JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
};
export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const UserOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly githubId: "githubId";
    readonly username: "username";
    readonly avatar: "avatar";
};
export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum];
export declare const PluginOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly authorId: "authorId";
    readonly name: "name";
    readonly description: "description";
    readonly icon: "icon";
};
export type PluginOrderByRelevanceFieldEnum = (typeof PluginOrderByRelevanceFieldEnum)[keyof typeof PluginOrderByRelevanceFieldEnum];
export declare const PluginDownloadOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly pluginId: "pluginId";
    readonly ip: "ip";
};
export type PluginDownloadOrderByRelevanceFieldEnum = (typeof PluginDownloadOrderByRelevanceFieldEnum)[keyof typeof PluginDownloadOrderByRelevanceFieldEnum];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client/runtime/client").DbNullClass;
    readonly JsonNull: import("@prisma/client/runtime/client").JsonNullClass;
    readonly AnyNull: import("@prisma/client/runtime/client").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const PluginVersionOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly pluginId: "pluginId";
    readonly version: "version";
    readonly changelog: "changelog";
    readonly auditLog: "auditLog";
    readonly auditorId: "auditorId";
};
export type PluginVersionOrderByRelevanceFieldEnum = (typeof PluginVersionOrderByRelevanceFieldEnum)[keyof typeof PluginVersionOrderByRelevanceFieldEnum];
