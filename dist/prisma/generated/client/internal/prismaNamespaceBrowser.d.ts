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
    readonly PluginVersionActionLog: "PluginVersionActionLog";
    readonly PluginReview: "PluginReview";
    readonly PluginReviewReply: "PluginReviewReply";
    readonly EmailVerificationToken: "EmailVerificationToken";
    readonly PasswordResetToken: "PasswordResetToken";
    readonly UserOAuthAccount: "UserOAuthAccount";
    readonly SystemMailConfig: "SystemMailConfig";
    readonly SystemCaptchaConfig: "SystemCaptchaConfig";
    readonly SystemConfigAuditLog: "SystemConfigAuditLog";
    readonly AdminUserActionLog: "AdminUserActionLog";
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
    readonly email: "email";
    readonly pendingEmail: "pendingEmail";
    readonly pendingEmailPurpose: "pendingEmailPurpose";
    readonly passwordHash: "passwordHash";
    readonly pendingPasswordHash: "pendingPasswordHash";
    readonly status: "status";
    readonly emailVerifiedAt: "emailVerifiedAt";
    readonly emailVerifyRequired: "emailVerifyRequired";
    readonly lastVerificationSentAt: "lastVerificationSentAt";
    readonly username: "username";
    readonly displayName: "displayName";
    readonly avatar: "avatar";
    readonly bio: "bio";
    readonly role: "role";
    readonly adminNote: "adminNote";
    readonly lastLoginAt: "lastLoginAt";
    readonly passwordUpdatedAt: "passwordUpdatedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const PluginScalarFieldEnum: {
    readonly id: "id";
    readonly authorId: "authorId";
    readonly name: "name";
    readonly description: "description";
    readonly icon: "icon";
    readonly activeVersionId: "activeVersionId";
    readonly downloads: "downloads";
    readonly isPublic: "isPublic";
    readonly adminDisabled: "adminDisabled";
    readonly lastVersionActionAt: "lastVersionActionAt";
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
    readonly deletedAt: "deletedAt";
    readonly deletedById: "deletedById";
    readonly deleteReason: "deleteReason";
    readonly createdAt: "createdAt";
};
export type PluginVersionScalarFieldEnum = (typeof PluginVersionScalarFieldEnum)[keyof typeof PluginVersionScalarFieldEnum];
export declare const PluginVersionActionLogScalarFieldEnum: {
    readonly id: "id";
    readonly pluginId: "pluginId";
    readonly operatorId: "operatorId";
    readonly action: "action";
    readonly fromVersion: "fromVersion";
    readonly toVersion: "toVersion";
    readonly targetVersion: "targetVersion";
    readonly reason: "reason";
    readonly createdAt: "createdAt";
};
export type PluginVersionActionLogScalarFieldEnum = (typeof PluginVersionActionLogScalarFieldEnum)[keyof typeof PluginVersionActionLogScalarFieldEnum];
export declare const PluginReviewScalarFieldEnum: {
    readonly id: "id";
    readonly pluginId: "pluginId";
    readonly userId: "userId";
    readonly rating: "rating";
    readonly content: "content";
    readonly authorReply: "authorReply";
    readonly authorReplyById: "authorReplyById";
    readonly authorReplyAt: "authorReplyAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PluginReviewScalarFieldEnum = (typeof PluginReviewScalarFieldEnum)[keyof typeof PluginReviewScalarFieldEnum];
export declare const PluginReviewReplyScalarFieldEnum: {
    readonly id: "id";
    readonly reviewId: "reviewId";
    readonly userId: "userId";
    readonly content: "content";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PluginReviewReplyScalarFieldEnum = (typeof PluginReviewReplyScalarFieldEnum)[keyof typeof PluginReviewReplyScalarFieldEnum];
export declare const EmailVerificationTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly email: "email";
    readonly purpose: "purpose";
    readonly tokenHash: "tokenHash";
    readonly codeHash: "codeHash";
    readonly expiresAt: "expiresAt";
    readonly consumedAt: "consumedAt";
    readonly sendCount: "sendCount";
    readonly lastSentAt: "lastSentAt";
    readonly createdAt: "createdAt";
};
export type EmailVerificationTokenScalarFieldEnum = (typeof EmailVerificationTokenScalarFieldEnum)[keyof typeof EmailVerificationTokenScalarFieldEnum];
export declare const PasswordResetTokenScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tokenHash: "tokenHash";
    readonly expiresAt: "expiresAt";
    readonly consumedAt: "consumedAt";
    readonly createdByAdminId: "createdByAdminId";
    readonly createdAt: "createdAt";
};
export type PasswordResetTokenScalarFieldEnum = (typeof PasswordResetTokenScalarFieldEnum)[keyof typeof PasswordResetTokenScalarFieldEnum];
export declare const UserOAuthAccountScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly provider: "provider";
    readonly providerUserId: "providerUserId";
    readonly providerEmail: "providerEmail";
    readonly isActive: "isActive";
    readonly unboundAt: "unboundAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserOAuthAccountScalarFieldEnum = (typeof UserOAuthAccountScalarFieldEnum)[keyof typeof UserOAuthAccountScalarFieldEnum];
export declare const SystemMailConfigScalarFieldEnum: {
    readonly id: "id";
    readonly provider: "provider";
    readonly smtpHost: "smtpHost";
    readonly smtpPort: "smtpPort";
    readonly smtpSecure: "smtpSecure";
    readonly smtpUser: "smtpUser";
    readonly smtpPassEncrypted: "smtpPassEncrypted";
    readonly fromEmail: "fromEmail";
    readonly fromName: "fromName";
    readonly enabled: "enabled";
    readonly updatedById: "updatedById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SystemMailConfigScalarFieldEnum = (typeof SystemMailConfigScalarFieldEnum)[keyof typeof SystemMailConfigScalarFieldEnum];
export declare const SystemCaptchaConfigScalarFieldEnum: {
    readonly id: "id";
    readonly provider: "provider";
    readonly siteKey: "siteKey";
    readonly secretEncrypted: "secretEncrypted";
    readonly registerEnabled: "registerEnabled";
    readonly loginEnabled: "loginEnabled";
    readonly scoreThreshold: "scoreThreshold";
    readonly enabled: "enabled";
    readonly updatedById: "updatedById";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type SystemCaptchaConfigScalarFieldEnum = (typeof SystemCaptchaConfigScalarFieldEnum)[keyof typeof SystemCaptchaConfigScalarFieldEnum];
export declare const SystemConfigAuditLogScalarFieldEnum: {
    readonly id: "id";
    readonly category: "category";
    readonly action: "action";
    readonly operatorId: "operatorId";
    readonly success: "success";
    readonly detail: "detail";
    readonly createdAt: "createdAt";
};
export type SystemConfigAuditLogScalarFieldEnum = (typeof SystemConfigAuditLogScalarFieldEnum)[keyof typeof SystemConfigAuditLogScalarFieldEnum];
export declare const AdminUserActionLogScalarFieldEnum: {
    readonly id: "id";
    readonly operatorId: "operatorId";
    readonly targetUserId: "targetUserId";
    readonly action: "action";
    readonly detail: "detail";
    readonly createdAt: "createdAt";
};
export type AdminUserActionLogScalarFieldEnum = (typeof AdminUserActionLogScalarFieldEnum)[keyof typeof AdminUserActionLogScalarFieldEnum];
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
    readonly email: "email";
    readonly pendingEmail: "pendingEmail";
    readonly passwordHash: "passwordHash";
    readonly pendingPasswordHash: "pendingPasswordHash";
    readonly username: "username";
    readonly displayName: "displayName";
    readonly avatar: "avatar";
    readonly bio: "bio";
    readonly adminNote: "adminNote";
};
export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum];
export declare const PluginOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly authorId: "authorId";
    readonly name: "name";
    readonly description: "description";
    readonly icon: "icon";
    readonly activeVersionId: "activeVersionId";
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
    readonly deletedById: "deletedById";
    readonly deleteReason: "deleteReason";
};
export type PluginVersionOrderByRelevanceFieldEnum = (typeof PluginVersionOrderByRelevanceFieldEnum)[keyof typeof PluginVersionOrderByRelevanceFieldEnum];
export declare const PluginVersionActionLogOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly pluginId: "pluginId";
    readonly operatorId: "operatorId";
    readonly fromVersion: "fromVersion";
    readonly toVersion: "toVersion";
    readonly targetVersion: "targetVersion";
    readonly reason: "reason";
};
export type PluginVersionActionLogOrderByRelevanceFieldEnum = (typeof PluginVersionActionLogOrderByRelevanceFieldEnum)[keyof typeof PluginVersionActionLogOrderByRelevanceFieldEnum];
export declare const PluginReviewOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly pluginId: "pluginId";
    readonly userId: "userId";
    readonly content: "content";
    readonly authorReply: "authorReply";
    readonly authorReplyById: "authorReplyById";
};
export type PluginReviewOrderByRelevanceFieldEnum = (typeof PluginReviewOrderByRelevanceFieldEnum)[keyof typeof PluginReviewOrderByRelevanceFieldEnum];
export declare const PluginReviewReplyOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly reviewId: "reviewId";
    readonly userId: "userId";
    readonly content: "content";
};
export type PluginReviewReplyOrderByRelevanceFieldEnum = (typeof PluginReviewReplyOrderByRelevanceFieldEnum)[keyof typeof PluginReviewReplyOrderByRelevanceFieldEnum];
export declare const EmailVerificationTokenOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly email: "email";
    readonly tokenHash: "tokenHash";
    readonly codeHash: "codeHash";
};
export type EmailVerificationTokenOrderByRelevanceFieldEnum = (typeof EmailVerificationTokenOrderByRelevanceFieldEnum)[keyof typeof EmailVerificationTokenOrderByRelevanceFieldEnum];
export declare const PasswordResetTokenOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tokenHash: "tokenHash";
    readonly createdByAdminId: "createdByAdminId";
};
export type PasswordResetTokenOrderByRelevanceFieldEnum = (typeof PasswordResetTokenOrderByRelevanceFieldEnum)[keyof typeof PasswordResetTokenOrderByRelevanceFieldEnum];
export declare const UserOAuthAccountOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly providerUserId: "providerUserId";
    readonly providerEmail: "providerEmail";
};
export type UserOAuthAccountOrderByRelevanceFieldEnum = (typeof UserOAuthAccountOrderByRelevanceFieldEnum)[keyof typeof UserOAuthAccountOrderByRelevanceFieldEnum];
export declare const SystemMailConfigOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly smtpHost: "smtpHost";
    readonly smtpUser: "smtpUser";
    readonly smtpPassEncrypted: "smtpPassEncrypted";
    readonly fromEmail: "fromEmail";
    readonly fromName: "fromName";
    readonly updatedById: "updatedById";
};
export type SystemMailConfigOrderByRelevanceFieldEnum = (typeof SystemMailConfigOrderByRelevanceFieldEnum)[keyof typeof SystemMailConfigOrderByRelevanceFieldEnum];
export declare const SystemCaptchaConfigOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly siteKey: "siteKey";
    readonly secretEncrypted: "secretEncrypted";
    readonly updatedById: "updatedById";
};
export type SystemCaptchaConfigOrderByRelevanceFieldEnum = (typeof SystemCaptchaConfigOrderByRelevanceFieldEnum)[keyof typeof SystemCaptchaConfigOrderByRelevanceFieldEnum];
export declare const SystemConfigAuditLogOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly action: "action";
    readonly operatorId: "operatorId";
    readonly detail: "detail";
};
export type SystemConfigAuditLogOrderByRelevanceFieldEnum = (typeof SystemConfigAuditLogOrderByRelevanceFieldEnum)[keyof typeof SystemConfigAuditLogOrderByRelevanceFieldEnum];
export declare const AdminUserActionLogOrderByRelevanceFieldEnum: {
    readonly id: "id";
    readonly operatorId: "operatorId";
    readonly targetUserId: "targetUserId";
    readonly detail: "detail";
};
export type AdminUserActionLogOrderByRelevanceFieldEnum = (typeof AdminUserActionLogOrderByRelevanceFieldEnum)[keyof typeof AdminUserActionLogOrderByRelevanceFieldEnum];
