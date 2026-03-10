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
exports.AdminUserActionLogOrderByRelevanceFieldEnum = exports.SystemConfigAuditLogOrderByRelevanceFieldEnum = exports.SystemCaptchaConfigOrderByRelevanceFieldEnum = exports.SystemMailConfigOrderByRelevanceFieldEnum = exports.UserOAuthAccountOrderByRelevanceFieldEnum = exports.PasswordResetTokenOrderByRelevanceFieldEnum = exports.EmailVerificationTokenOrderByRelevanceFieldEnum = exports.PluginReviewReplyOrderByRelevanceFieldEnum = exports.PluginReviewOrderByRelevanceFieldEnum = exports.PluginVersionActionLogOrderByRelevanceFieldEnum = exports.PluginVersionOrderByRelevanceFieldEnum = exports.QueryMode = exports.JsonNullValueFilter = exports.PluginDownloadOrderByRelevanceFieldEnum = exports.PluginOrderByRelevanceFieldEnum = exports.UserOrderByRelevanceFieldEnum = exports.NullsOrder = exports.JsonNullValueInput = exports.SortOrder = exports.AdminUserActionLogScalarFieldEnum = exports.SystemConfigAuditLogScalarFieldEnum = exports.SystemCaptchaConfigScalarFieldEnum = exports.SystemMailConfigScalarFieldEnum = exports.UserOAuthAccountScalarFieldEnum = exports.PasswordResetTokenScalarFieldEnum = exports.EmailVerificationTokenScalarFieldEnum = exports.PluginReviewReplyScalarFieldEnum = exports.PluginReviewScalarFieldEnum = exports.PluginVersionActionLogScalarFieldEnum = exports.PluginVersionScalarFieldEnum = exports.PluginDownloadScalarFieldEnum = exports.PluginScalarFieldEnum = exports.UserScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = __importStar(require("@prisma/client/runtime/index-browser"));
exports.Decimal = runtime.Decimal;
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
    PluginVersion: 'PluginVersion',
    PluginVersionActionLog: 'PluginVersionActionLog',
    PluginReview: 'PluginReview',
    PluginReviewReply: 'PluginReviewReply',
    EmailVerificationToken: 'EmailVerificationToken',
    PasswordResetToken: 'PasswordResetToken',
    UserOAuthAccount: 'UserOAuthAccount',
    SystemMailConfig: 'SystemMailConfig',
    SystemCaptchaConfig: 'SystemCaptchaConfig',
    SystemConfigAuditLog: 'SystemConfigAuditLog',
    AdminUserActionLog: 'AdminUserActionLog'
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
    email: 'email',
    pendingEmail: 'pendingEmail',
    pendingEmailPurpose: 'pendingEmailPurpose',
    passwordHash: 'passwordHash',
    pendingPasswordHash: 'pendingPasswordHash',
    status: 'status',
    emailVerifiedAt: 'emailVerifiedAt',
    emailVerifyRequired: 'emailVerifyRequired',
    lastVerificationSentAt: 'lastVerificationSentAt',
    username: 'username',
    displayName: 'displayName',
    avatar: 'avatar',
    bio: 'bio',
    role: 'role',
    adminNote: 'adminNote',
    lastLoginAt: 'lastLoginAt',
    passwordUpdatedAt: 'passwordUpdatedAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PluginScalarFieldEnum = {
    id: 'id',
    authorId: 'authorId',
    name: 'name',
    description: 'description',
    icon: 'icon',
    activeVersionId: 'activeVersionId',
    downloads: 'downloads',
    isPublic: 'isPublic',
    adminDisabled: 'adminDisabled',
    lastVersionActionAt: 'lastVersionActionAt',
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
    deletedAt: 'deletedAt',
    deletedById: 'deletedById',
    deleteReason: 'deleteReason',
    createdAt: 'createdAt'
};
exports.PluginVersionActionLogScalarFieldEnum = {
    id: 'id',
    pluginId: 'pluginId',
    operatorId: 'operatorId',
    action: 'action',
    fromVersion: 'fromVersion',
    toVersion: 'toVersion',
    targetVersion: 'targetVersion',
    reason: 'reason',
    createdAt: 'createdAt'
};
exports.PluginReviewScalarFieldEnum = {
    id: 'id',
    pluginId: 'pluginId',
    userId: 'userId',
    rating: 'rating',
    content: 'content',
    authorReply: 'authorReply',
    authorReplyById: 'authorReplyById',
    authorReplyAt: 'authorReplyAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.PluginReviewReplyScalarFieldEnum = {
    id: 'id',
    reviewId: 'reviewId',
    userId: 'userId',
    content: 'content',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.EmailVerificationTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    email: 'email',
    purpose: 'purpose',
    tokenHash: 'tokenHash',
    codeHash: 'codeHash',
    expiresAt: 'expiresAt',
    consumedAt: 'consumedAt',
    sendCount: 'sendCount',
    lastSentAt: 'lastSentAt',
    createdAt: 'createdAt'
};
exports.PasswordResetTokenScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    consumedAt: 'consumedAt',
    createdByAdminId: 'createdByAdminId',
    createdAt: 'createdAt'
};
exports.UserOAuthAccountScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    provider: 'provider',
    providerUserId: 'providerUserId',
    providerEmail: 'providerEmail',
    isActive: 'isActive',
    unboundAt: 'unboundAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SystemMailConfigScalarFieldEnum = {
    id: 'id',
    provider: 'provider',
    smtpHost: 'smtpHost',
    smtpPort: 'smtpPort',
    smtpSecure: 'smtpSecure',
    smtpUser: 'smtpUser',
    smtpPassEncrypted: 'smtpPassEncrypted',
    fromEmail: 'fromEmail',
    fromName: 'fromName',
    enabled: 'enabled',
    updatedById: 'updatedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SystemCaptchaConfigScalarFieldEnum = {
    id: 'id',
    provider: 'provider',
    siteKey: 'siteKey',
    secretEncrypted: 'secretEncrypted',
    registerEnabled: 'registerEnabled',
    loginEnabled: 'loginEnabled',
    scoreThreshold: 'scoreThreshold',
    enabled: 'enabled',
    updatedById: 'updatedById',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
exports.SystemConfigAuditLogScalarFieldEnum = {
    id: 'id',
    category: 'category',
    action: 'action',
    operatorId: 'operatorId',
    success: 'success',
    detail: 'detail',
    createdAt: 'createdAt'
};
exports.AdminUserActionLogScalarFieldEnum = {
    id: 'id',
    operatorId: 'operatorId',
    targetUserId: 'targetUserId',
    action: 'action',
    detail: 'detail',
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
    email: 'email',
    pendingEmail: 'pendingEmail',
    passwordHash: 'passwordHash',
    pendingPasswordHash: 'pendingPasswordHash',
    username: 'username',
    displayName: 'displayName',
    avatar: 'avatar',
    bio: 'bio',
    adminNote: 'adminNote'
};
exports.PluginOrderByRelevanceFieldEnum = {
    id: 'id',
    authorId: 'authorId',
    name: 'name',
    description: 'description',
    icon: 'icon',
    activeVersionId: 'activeVersionId'
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
    auditorId: 'auditorId',
    deletedById: 'deletedById',
    deleteReason: 'deleteReason'
};
exports.PluginVersionActionLogOrderByRelevanceFieldEnum = {
    id: 'id',
    pluginId: 'pluginId',
    operatorId: 'operatorId',
    fromVersion: 'fromVersion',
    toVersion: 'toVersion',
    targetVersion: 'targetVersion',
    reason: 'reason'
};
exports.PluginReviewOrderByRelevanceFieldEnum = {
    id: 'id',
    pluginId: 'pluginId',
    userId: 'userId',
    content: 'content',
    authorReply: 'authorReply',
    authorReplyById: 'authorReplyById'
};
exports.PluginReviewReplyOrderByRelevanceFieldEnum = {
    id: 'id',
    reviewId: 'reviewId',
    userId: 'userId',
    content: 'content'
};
exports.EmailVerificationTokenOrderByRelevanceFieldEnum = {
    id: 'id',
    userId: 'userId',
    email: 'email',
    tokenHash: 'tokenHash',
    codeHash: 'codeHash'
};
exports.PasswordResetTokenOrderByRelevanceFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    createdByAdminId: 'createdByAdminId'
};
exports.UserOAuthAccountOrderByRelevanceFieldEnum = {
    id: 'id',
    userId: 'userId',
    providerUserId: 'providerUserId',
    providerEmail: 'providerEmail'
};
exports.SystemMailConfigOrderByRelevanceFieldEnum = {
    id: 'id',
    smtpHost: 'smtpHost',
    smtpUser: 'smtpUser',
    smtpPassEncrypted: 'smtpPassEncrypted',
    fromEmail: 'fromEmail',
    fromName: 'fromName',
    updatedById: 'updatedById'
};
exports.SystemCaptchaConfigOrderByRelevanceFieldEnum = {
    id: 'id',
    siteKey: 'siteKey',
    secretEncrypted: 'secretEncrypted',
    updatedById: 'updatedById'
};
exports.SystemConfigAuditLogOrderByRelevanceFieldEnum = {
    id: 'id',
    action: 'action',
    operatorId: 'operatorId',
    detail: 'detail'
};
exports.AdminUserActionLogOrderByRelevanceFieldEnum = {
    id: 'id',
    operatorId: 'operatorId',
    targetUserId: 'targetUserId',
    detail: 'detail'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map