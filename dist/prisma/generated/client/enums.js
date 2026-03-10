"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginVersionActionType = exports.PluginStatus = exports.SystemConfigAuditCategory = exports.CaptchaProvider = exports.MailProvider = exports.OAuthProvider = exports.PendingEmailPurpose = exports.EmailVerificationPurpose = exports.AdminUserActionType = exports.UserStatus = exports.Role = void 0;
exports.Role = {
    DEVELOPER: 'DEVELOPER',
    ADMIN: 'ADMIN'
};
exports.UserStatus = {
    ACTIVE: 'ACTIVE',
    DISABLED: 'DISABLED'
};
exports.AdminUserActionType = {
    UPDATE_PROFILE: 'UPDATE_PROFILE',
    UPDATE_ROLE: 'UPDATE_ROLE',
    UPDATE_STATUS: 'UPDATE_STATUS',
    RESEND_VERIFICATION: 'RESEND_VERIFICATION',
    RESET_PASSWORD: 'RESET_PASSWORD',
    FORCE_UNBIND_OAUTH: 'FORCE_UNBIND_OAUTH'
};
exports.EmailVerificationPurpose = {
    REGISTER: 'REGISTER',
    EMAIL_CHANGE: 'EMAIL_CHANGE',
    LOCAL_BIND: 'LOCAL_BIND'
};
exports.PendingEmailPurpose = {
    EMAIL_CHANGE: 'EMAIL_CHANGE',
    LOCAL_BIND: 'LOCAL_BIND'
};
exports.OAuthProvider = {
    GITHUB: 'GITHUB',
    GOOGLE: 'GOOGLE'
};
exports.MailProvider = {
    SMTP: 'SMTP'
};
exports.CaptchaProvider = {
    TURNSTILE: 'TURNSTILE',
    RECAPTCHA: 'RECAPTCHA'
};
exports.SystemConfigAuditCategory = {
    MAIL: 'MAIL',
    CAPTCHA: 'CAPTCHA'
};
exports.PluginStatus = {
    PENDING: 'PENDING',
    APPROVED: 'APPROVED',
    REJECTED: 'REJECTED'
};
exports.PluginVersionActionType = {
    ROLLBACK: 'ROLLBACK',
    DELETE: 'DELETE'
};
//# sourceMappingURL=enums.js.map