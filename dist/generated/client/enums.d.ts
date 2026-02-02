export declare const Role: {
    readonly DEVELOPER: "DEVELOPER";
    readonly ADMIN: "ADMIN";
};
export type Role = (typeof Role)[keyof typeof Role];
export declare const PluginStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type PluginStatus = (typeof PluginStatus)[keyof typeof PluginStatus];
