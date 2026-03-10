import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "plugin" | "pluginDownload" | "pluginVersion" | "pluginVersionActionLog" | "pluginReview" | "pluginReviewReply" | "emailVerificationToken" | "passwordResetToken" | "userOAuthAccount" | "systemMailConfig" | "systemCaptchaConfig" | "systemConfigAuditLog" | "adminUserActionLog";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Plugin: {
            payload: Prisma.$PluginPayload<ExtArgs>;
            fields: Prisma.PluginFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PluginFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PluginFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginPayload>;
                };
                findFirst: {
                    args: Prisma.PluginFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PluginFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginPayload>;
                };
                findMany: {
                    args: Prisma.PluginFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginPayload>[];
                };
                create: {
                    args: Prisma.PluginCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginPayload>;
                };
                createMany: {
                    args: Prisma.PluginCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.PluginDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginPayload>;
                };
                update: {
                    args: Prisma.PluginUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginPayload>;
                };
                deleteMany: {
                    args: Prisma.PluginDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PluginUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.PluginUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginPayload>;
                };
                aggregate: {
                    args: Prisma.PluginAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePlugin>;
                };
                groupBy: {
                    args: Prisma.PluginGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PluginGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PluginCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PluginCountAggregateOutputType> | number;
                };
            };
        };
        PluginDownload: {
            payload: Prisma.$PluginDownloadPayload<ExtArgs>;
            fields: Prisma.PluginDownloadFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PluginDownloadFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginDownloadPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PluginDownloadFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginDownloadPayload>;
                };
                findFirst: {
                    args: Prisma.PluginDownloadFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginDownloadPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PluginDownloadFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginDownloadPayload>;
                };
                findMany: {
                    args: Prisma.PluginDownloadFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginDownloadPayload>[];
                };
                create: {
                    args: Prisma.PluginDownloadCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginDownloadPayload>;
                };
                createMany: {
                    args: Prisma.PluginDownloadCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.PluginDownloadDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginDownloadPayload>;
                };
                update: {
                    args: Prisma.PluginDownloadUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginDownloadPayload>;
                };
                deleteMany: {
                    args: Prisma.PluginDownloadDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PluginDownloadUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.PluginDownloadUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginDownloadPayload>;
                };
                aggregate: {
                    args: Prisma.PluginDownloadAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePluginDownload>;
                };
                groupBy: {
                    args: Prisma.PluginDownloadGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PluginDownloadGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PluginDownloadCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PluginDownloadCountAggregateOutputType> | number;
                };
            };
        };
        PluginVersion: {
            payload: Prisma.$PluginVersionPayload<ExtArgs>;
            fields: Prisma.PluginVersionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PluginVersionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PluginVersionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionPayload>;
                };
                findFirst: {
                    args: Prisma.PluginVersionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PluginVersionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionPayload>;
                };
                findMany: {
                    args: Prisma.PluginVersionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionPayload>[];
                };
                create: {
                    args: Prisma.PluginVersionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionPayload>;
                };
                createMany: {
                    args: Prisma.PluginVersionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.PluginVersionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionPayload>;
                };
                update: {
                    args: Prisma.PluginVersionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionPayload>;
                };
                deleteMany: {
                    args: Prisma.PluginVersionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PluginVersionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.PluginVersionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionPayload>;
                };
                aggregate: {
                    args: Prisma.PluginVersionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePluginVersion>;
                };
                groupBy: {
                    args: Prisma.PluginVersionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PluginVersionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PluginVersionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PluginVersionCountAggregateOutputType> | number;
                };
            };
        };
        PluginVersionActionLog: {
            payload: Prisma.$PluginVersionActionLogPayload<ExtArgs>;
            fields: Prisma.PluginVersionActionLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PluginVersionActionLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionActionLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PluginVersionActionLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionActionLogPayload>;
                };
                findFirst: {
                    args: Prisma.PluginVersionActionLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionActionLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PluginVersionActionLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionActionLogPayload>;
                };
                findMany: {
                    args: Prisma.PluginVersionActionLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionActionLogPayload>[];
                };
                create: {
                    args: Prisma.PluginVersionActionLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionActionLogPayload>;
                };
                createMany: {
                    args: Prisma.PluginVersionActionLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.PluginVersionActionLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionActionLogPayload>;
                };
                update: {
                    args: Prisma.PluginVersionActionLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionActionLogPayload>;
                };
                deleteMany: {
                    args: Prisma.PluginVersionActionLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PluginVersionActionLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.PluginVersionActionLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginVersionActionLogPayload>;
                };
                aggregate: {
                    args: Prisma.PluginVersionActionLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePluginVersionActionLog>;
                };
                groupBy: {
                    args: Prisma.PluginVersionActionLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PluginVersionActionLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PluginVersionActionLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PluginVersionActionLogCountAggregateOutputType> | number;
                };
            };
        };
        PluginReview: {
            payload: Prisma.$PluginReviewPayload<ExtArgs>;
            fields: Prisma.PluginReviewFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PluginReviewFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PluginReviewFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewPayload>;
                };
                findFirst: {
                    args: Prisma.PluginReviewFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PluginReviewFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewPayload>;
                };
                findMany: {
                    args: Prisma.PluginReviewFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewPayload>[];
                };
                create: {
                    args: Prisma.PluginReviewCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewPayload>;
                };
                createMany: {
                    args: Prisma.PluginReviewCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.PluginReviewDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewPayload>;
                };
                update: {
                    args: Prisma.PluginReviewUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewPayload>;
                };
                deleteMany: {
                    args: Prisma.PluginReviewDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PluginReviewUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.PluginReviewUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewPayload>;
                };
                aggregate: {
                    args: Prisma.PluginReviewAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePluginReview>;
                };
                groupBy: {
                    args: Prisma.PluginReviewGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PluginReviewGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PluginReviewCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PluginReviewCountAggregateOutputType> | number;
                };
            };
        };
        PluginReviewReply: {
            payload: Prisma.$PluginReviewReplyPayload<ExtArgs>;
            fields: Prisma.PluginReviewReplyFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PluginReviewReplyFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewReplyPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PluginReviewReplyFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewReplyPayload>;
                };
                findFirst: {
                    args: Prisma.PluginReviewReplyFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewReplyPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PluginReviewReplyFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewReplyPayload>;
                };
                findMany: {
                    args: Prisma.PluginReviewReplyFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewReplyPayload>[];
                };
                create: {
                    args: Prisma.PluginReviewReplyCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewReplyPayload>;
                };
                createMany: {
                    args: Prisma.PluginReviewReplyCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.PluginReviewReplyDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewReplyPayload>;
                };
                update: {
                    args: Prisma.PluginReviewReplyUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewReplyPayload>;
                };
                deleteMany: {
                    args: Prisma.PluginReviewReplyDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PluginReviewReplyUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.PluginReviewReplyUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PluginReviewReplyPayload>;
                };
                aggregate: {
                    args: Prisma.PluginReviewReplyAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePluginReviewReply>;
                };
                groupBy: {
                    args: Prisma.PluginReviewReplyGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PluginReviewReplyGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PluginReviewReplyCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PluginReviewReplyCountAggregateOutputType> | number;
                };
            };
        };
        EmailVerificationToken: {
            payload: Prisma.$EmailVerificationTokenPayload<ExtArgs>;
            fields: Prisma.EmailVerificationTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.EmailVerificationTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.EmailVerificationTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                findFirst: {
                    args: Prisma.EmailVerificationTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.EmailVerificationTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                findMany: {
                    args: Prisma.EmailVerificationTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>[];
                };
                create: {
                    args: Prisma.EmailVerificationTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                createMany: {
                    args: Prisma.EmailVerificationTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.EmailVerificationTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                update: {
                    args: Prisma.EmailVerificationTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.EmailVerificationTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.EmailVerificationTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.EmailVerificationTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$EmailVerificationTokenPayload>;
                };
                aggregate: {
                    args: Prisma.EmailVerificationTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateEmailVerificationToken>;
                };
                groupBy: {
                    args: Prisma.EmailVerificationTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmailVerificationTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.EmailVerificationTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.EmailVerificationTokenCountAggregateOutputType> | number;
                };
            };
        };
        PasswordResetToken: {
            payload: Prisma.$PasswordResetTokenPayload<ExtArgs>;
            fields: Prisma.PasswordResetTokenFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PasswordResetTokenFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PasswordResetTokenFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                findFirst: {
                    args: Prisma.PasswordResetTokenFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PasswordResetTokenFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                findMany: {
                    args: Prisma.PasswordResetTokenFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>[];
                };
                create: {
                    args: Prisma.PasswordResetTokenCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                createMany: {
                    args: Prisma.PasswordResetTokenCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.PasswordResetTokenDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                update: {
                    args: Prisma.PasswordResetTokenUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                deleteMany: {
                    args: Prisma.PasswordResetTokenDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PasswordResetTokenUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.PasswordResetTokenUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PasswordResetTokenPayload>;
                };
                aggregate: {
                    args: Prisma.PasswordResetTokenAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePasswordResetToken>;
                };
                groupBy: {
                    args: Prisma.PasswordResetTokenGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordResetTokenGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PasswordResetTokenCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PasswordResetTokenCountAggregateOutputType> | number;
                };
            };
        };
        UserOAuthAccount: {
            payload: Prisma.$UserOAuthAccountPayload<ExtArgs>;
            fields: Prisma.UserOAuthAccountFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserOAuthAccountFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserOAuthAccountPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserOAuthAccountFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserOAuthAccountPayload>;
                };
                findFirst: {
                    args: Prisma.UserOAuthAccountFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserOAuthAccountPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserOAuthAccountFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserOAuthAccountPayload>;
                };
                findMany: {
                    args: Prisma.UserOAuthAccountFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserOAuthAccountPayload>[];
                };
                create: {
                    args: Prisma.UserOAuthAccountCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserOAuthAccountPayload>;
                };
                createMany: {
                    args: Prisma.UserOAuthAccountCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.UserOAuthAccountDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserOAuthAccountPayload>;
                };
                update: {
                    args: Prisma.UserOAuthAccountUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserOAuthAccountPayload>;
                };
                deleteMany: {
                    args: Prisma.UserOAuthAccountDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserOAuthAccountUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.UserOAuthAccountUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserOAuthAccountPayload>;
                };
                aggregate: {
                    args: Prisma.UserOAuthAccountAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUserOAuthAccount>;
                };
                groupBy: {
                    args: Prisma.UserOAuthAccountGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserOAuthAccountGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserOAuthAccountCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserOAuthAccountCountAggregateOutputType> | number;
                };
            };
        };
        SystemMailConfig: {
            payload: Prisma.$SystemMailConfigPayload<ExtArgs>;
            fields: Prisma.SystemMailConfigFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SystemMailConfigFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemMailConfigPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SystemMailConfigFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemMailConfigPayload>;
                };
                findFirst: {
                    args: Prisma.SystemMailConfigFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemMailConfigPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SystemMailConfigFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemMailConfigPayload>;
                };
                findMany: {
                    args: Prisma.SystemMailConfigFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemMailConfigPayload>[];
                };
                create: {
                    args: Prisma.SystemMailConfigCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemMailConfigPayload>;
                };
                createMany: {
                    args: Prisma.SystemMailConfigCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.SystemMailConfigDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemMailConfigPayload>;
                };
                update: {
                    args: Prisma.SystemMailConfigUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemMailConfigPayload>;
                };
                deleteMany: {
                    args: Prisma.SystemMailConfigDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SystemMailConfigUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.SystemMailConfigUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemMailConfigPayload>;
                };
                aggregate: {
                    args: Prisma.SystemMailConfigAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSystemMailConfig>;
                };
                groupBy: {
                    args: Prisma.SystemMailConfigGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SystemMailConfigGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SystemMailConfigCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SystemMailConfigCountAggregateOutputType> | number;
                };
            };
        };
        SystemCaptchaConfig: {
            payload: Prisma.$SystemCaptchaConfigPayload<ExtArgs>;
            fields: Prisma.SystemCaptchaConfigFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SystemCaptchaConfigFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemCaptchaConfigPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SystemCaptchaConfigFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemCaptchaConfigPayload>;
                };
                findFirst: {
                    args: Prisma.SystemCaptchaConfigFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemCaptchaConfigPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SystemCaptchaConfigFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemCaptchaConfigPayload>;
                };
                findMany: {
                    args: Prisma.SystemCaptchaConfigFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemCaptchaConfigPayload>[];
                };
                create: {
                    args: Prisma.SystemCaptchaConfigCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemCaptchaConfigPayload>;
                };
                createMany: {
                    args: Prisma.SystemCaptchaConfigCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.SystemCaptchaConfigDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemCaptchaConfigPayload>;
                };
                update: {
                    args: Prisma.SystemCaptchaConfigUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemCaptchaConfigPayload>;
                };
                deleteMany: {
                    args: Prisma.SystemCaptchaConfigDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SystemCaptchaConfigUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.SystemCaptchaConfigUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemCaptchaConfigPayload>;
                };
                aggregate: {
                    args: Prisma.SystemCaptchaConfigAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSystemCaptchaConfig>;
                };
                groupBy: {
                    args: Prisma.SystemCaptchaConfigGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SystemCaptchaConfigGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SystemCaptchaConfigCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SystemCaptchaConfigCountAggregateOutputType> | number;
                };
            };
        };
        SystemConfigAuditLog: {
            payload: Prisma.$SystemConfigAuditLogPayload<ExtArgs>;
            fields: Prisma.SystemConfigAuditLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.SystemConfigAuditLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemConfigAuditLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.SystemConfigAuditLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemConfigAuditLogPayload>;
                };
                findFirst: {
                    args: Prisma.SystemConfigAuditLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemConfigAuditLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.SystemConfigAuditLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemConfigAuditLogPayload>;
                };
                findMany: {
                    args: Prisma.SystemConfigAuditLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemConfigAuditLogPayload>[];
                };
                create: {
                    args: Prisma.SystemConfigAuditLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemConfigAuditLogPayload>;
                };
                createMany: {
                    args: Prisma.SystemConfigAuditLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.SystemConfigAuditLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemConfigAuditLogPayload>;
                };
                update: {
                    args: Prisma.SystemConfigAuditLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemConfigAuditLogPayload>;
                };
                deleteMany: {
                    args: Prisma.SystemConfigAuditLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.SystemConfigAuditLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.SystemConfigAuditLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$SystemConfigAuditLogPayload>;
                };
                aggregate: {
                    args: Prisma.SystemConfigAuditLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSystemConfigAuditLog>;
                };
                groupBy: {
                    args: Prisma.SystemConfigAuditLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SystemConfigAuditLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.SystemConfigAuditLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SystemConfigAuditLogCountAggregateOutputType> | number;
                };
            };
        };
        AdminUserActionLog: {
            payload: Prisma.$AdminUserActionLogPayload<ExtArgs>;
            fields: Prisma.AdminUserActionLogFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AdminUserActionLogFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminUserActionLogPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AdminUserActionLogFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminUserActionLogPayload>;
                };
                findFirst: {
                    args: Prisma.AdminUserActionLogFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminUserActionLogPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AdminUserActionLogFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminUserActionLogPayload>;
                };
                findMany: {
                    args: Prisma.AdminUserActionLogFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminUserActionLogPayload>[];
                };
                create: {
                    args: Prisma.AdminUserActionLogCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminUserActionLogPayload>;
                };
                createMany: {
                    args: Prisma.AdminUserActionLogCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                delete: {
                    args: Prisma.AdminUserActionLogDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminUserActionLogPayload>;
                };
                update: {
                    args: Prisma.AdminUserActionLogUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminUserActionLogPayload>;
                };
                deleteMany: {
                    args: Prisma.AdminUserActionLogDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AdminUserActionLogUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                upsert: {
                    args: Prisma.AdminUserActionLogUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AdminUserActionLogPayload>;
                };
                aggregate: {
                    args: Prisma.AdminUserActionLogAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAdminUserActionLog>;
                };
                groupBy: {
                    args: Prisma.AdminUserActionLogGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AdminUserActionLogGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AdminUserActionLogCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AdminUserActionLogCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
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
    readonly JsonNull: runtime.JsonNullClass;
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
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
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
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type EnumPendingEmailPurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PendingEmailPurpose'>;
export type EnumUserStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UserStatus'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type EnumPluginStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PluginStatus'>;
export type EnumPluginVersionActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PluginVersionActionType'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type EnumEmailVerificationPurposeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmailVerificationPurpose'>;
export type EnumOAuthProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OAuthProvider'>;
export type EnumMailProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MailProvider'>;
export type EnumCaptchaProviderFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CaptchaProvider'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type EnumSystemConfigAuditCategoryFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SystemConfigAuditCategory'>;
export type EnumAdminUserActionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AdminUserActionType'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    plugin?: Prisma.PluginOmit;
    pluginDownload?: Prisma.PluginDownloadOmit;
    pluginVersion?: Prisma.PluginVersionOmit;
    pluginVersionActionLog?: Prisma.PluginVersionActionLogOmit;
    pluginReview?: Prisma.PluginReviewOmit;
    pluginReviewReply?: Prisma.PluginReviewReplyOmit;
    emailVerificationToken?: Prisma.EmailVerificationTokenOmit;
    passwordResetToken?: Prisma.PasswordResetTokenOmit;
    userOAuthAccount?: Prisma.UserOAuthAccountOmit;
    systemMailConfig?: Prisma.SystemMailConfigOmit;
    systemCaptchaConfig?: Prisma.SystemCaptchaConfigOmit;
    systemConfigAuditLog?: Prisma.SystemConfigAuditLogOmit;
    adminUserActionLog?: Prisma.AdminUserActionLogOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
