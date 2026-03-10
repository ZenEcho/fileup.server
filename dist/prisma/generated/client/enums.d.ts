export declare const Role: {
    readonly DEVELOPER: "DEVELOPER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const UserStatus: {
    readonly ACTIVE: "ACTIVE";
    readonly DISABLED: "DISABLED";
};
export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];
export declare const AdminUserActionType: {
    readonly UPDATE_PROFILE: "UPDATE_PROFILE";
    readonly UPDATE_ROLE: "UPDATE_ROLE";
    readonly UPDATE_STATUS: "UPDATE_STATUS";
    readonly RESEND_VERIFICATION: "RESEND_VERIFICATION";
    readonly RESET_PASSWORD: "RESET_PASSWORD";
    readonly FORCE_UNBIND_OAUTH: "FORCE_UNBIND_OAUTH";
};
export type AdminUserActionType = (typeof AdminUserActionType)[keyof typeof AdminUserActionType];
export declare const EmailVerificationPurpose: {
    readonly REGISTER: "REGISTER";
    readonly EMAIL_CHANGE: "EMAIL_CHANGE";
    readonly LOCAL_BIND: "LOCAL_BIND";
};
export type EmailVerificationPurpose = (typeof EmailVerificationPurpose)[keyof typeof EmailVerificationPurpose];
export declare const PendingEmailPurpose: {
    readonly EMAIL_CHANGE: "EMAIL_CHANGE";
    readonly LOCAL_BIND: "LOCAL_BIND";
};
export type PendingEmailPurpose = (typeof PendingEmailPurpose)[keyof typeof PendingEmailPurpose];
export declare const OAuthProvider: {
    readonly GITHUB: "GITHUB";
    readonly GOOGLE: "GOOGLE";
};
export type OAuthProvider = (typeof OAuthProvider)[keyof typeof OAuthProvider];
export declare const MailProvider: {
    readonly SMTP: "SMTP";
};
export type MailProvider = (typeof MailProvider)[keyof typeof MailProvider];
export declare const CaptchaProvider: {
    readonly TURNSTILE: "TURNSTILE";
    readonly RECAPTCHA: "RECAPTCHA";
};
export type CaptchaProvider = (typeof CaptchaProvider)[keyof typeof CaptchaProvider];
export declare const SystemConfigAuditCategory: {
    readonly MAIL: "MAIL";
    readonly CAPTCHA: "CAPTCHA";
};
export type SystemConfigAuditCategory = (typeof SystemConfigAuditCategory)[keyof typeof SystemConfigAuditCategory];
export declare const PluginStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type PluginStatus = (typeof PluginStatus)[keyof typeof PluginStatus];
export declare const PluginVersionActionType: {
    readonly ROLLBACK: "ROLLBACK";
    readonly DELETE: "DELETE";
};
export type PluginVersionActionType = (typeof PluginVersionActionType)[keyof typeof PluginVersionActionType];
