import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type SystemCaptchaConfigModel = runtime.Types.Result.DefaultSelection<Prisma.$SystemCaptchaConfigPayload>;
export type AggregateSystemCaptchaConfig = {
    _count: SystemCaptchaConfigCountAggregateOutputType | null;
    _avg: SystemCaptchaConfigAvgAggregateOutputType | null;
    _sum: SystemCaptchaConfigSumAggregateOutputType | null;
    _min: SystemCaptchaConfigMinAggregateOutputType | null;
    _max: SystemCaptchaConfigMaxAggregateOutputType | null;
};
export type SystemCaptchaConfigAvgAggregateOutputType = {
    scoreThreshold: number | null;
};
export type SystemCaptchaConfigSumAggregateOutputType = {
    scoreThreshold: number | null;
};
export type SystemCaptchaConfigMinAggregateOutputType = {
    id: string | null;
    provider: $Enums.CaptchaProvider | null;
    siteKey: string | null;
    secretEncrypted: string | null;
    registerEnabled: boolean | null;
    loginEnabled: boolean | null;
    scoreThreshold: number | null;
    enabled: boolean | null;
    updatedById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SystemCaptchaConfigMaxAggregateOutputType = {
    id: string | null;
    provider: $Enums.CaptchaProvider | null;
    siteKey: string | null;
    secretEncrypted: string | null;
    registerEnabled: boolean | null;
    loginEnabled: boolean | null;
    scoreThreshold: number | null;
    enabled: boolean | null;
    updatedById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SystemCaptchaConfigCountAggregateOutputType = {
    id: number;
    provider: number;
    siteKey: number;
    secretEncrypted: number;
    registerEnabled: number;
    loginEnabled: number;
    scoreThreshold: number;
    enabled: number;
    updatedById: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SystemCaptchaConfigAvgAggregateInputType = {
    scoreThreshold?: true;
};
export type SystemCaptchaConfigSumAggregateInputType = {
    scoreThreshold?: true;
};
export type SystemCaptchaConfigMinAggregateInputType = {
    id?: true;
    provider?: true;
    siteKey?: true;
    secretEncrypted?: true;
    registerEnabled?: true;
    loginEnabled?: true;
    scoreThreshold?: true;
    enabled?: true;
    updatedById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SystemCaptchaConfigMaxAggregateInputType = {
    id?: true;
    provider?: true;
    siteKey?: true;
    secretEncrypted?: true;
    registerEnabled?: true;
    loginEnabled?: true;
    scoreThreshold?: true;
    enabled?: true;
    updatedById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SystemCaptchaConfigCountAggregateInputType = {
    id?: true;
    provider?: true;
    siteKey?: true;
    secretEncrypted?: true;
    registerEnabled?: true;
    loginEnabled?: true;
    scoreThreshold?: true;
    enabled?: true;
    updatedById?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SystemCaptchaConfigAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SystemCaptchaConfigWhereInput;
    orderBy?: Prisma.SystemCaptchaConfigOrderByWithRelationInput | Prisma.SystemCaptchaConfigOrderByWithRelationInput[];
    cursor?: Prisma.SystemCaptchaConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SystemCaptchaConfigCountAggregateInputType;
    _avg?: SystemCaptchaConfigAvgAggregateInputType;
    _sum?: SystemCaptchaConfigSumAggregateInputType;
    _min?: SystemCaptchaConfigMinAggregateInputType;
    _max?: SystemCaptchaConfigMaxAggregateInputType;
};
export type GetSystemCaptchaConfigAggregateType<T extends SystemCaptchaConfigAggregateArgs> = {
    [P in keyof T & keyof AggregateSystemCaptchaConfig]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSystemCaptchaConfig[P]> : Prisma.GetScalarType<T[P], AggregateSystemCaptchaConfig[P]>;
};
export type SystemCaptchaConfigGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SystemCaptchaConfigWhereInput;
    orderBy?: Prisma.SystemCaptchaConfigOrderByWithAggregationInput | Prisma.SystemCaptchaConfigOrderByWithAggregationInput[];
    by: Prisma.SystemCaptchaConfigScalarFieldEnum[] | Prisma.SystemCaptchaConfigScalarFieldEnum;
    having?: Prisma.SystemCaptchaConfigScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SystemCaptchaConfigCountAggregateInputType | true;
    _avg?: SystemCaptchaConfigAvgAggregateInputType;
    _sum?: SystemCaptchaConfigSumAggregateInputType;
    _min?: SystemCaptchaConfigMinAggregateInputType;
    _max?: SystemCaptchaConfigMaxAggregateInputType;
};
export type SystemCaptchaConfigGroupByOutputType = {
    id: string;
    provider: $Enums.CaptchaProvider;
    siteKey: string | null;
    secretEncrypted: string | null;
    registerEnabled: boolean;
    loginEnabled: boolean;
    scoreThreshold: number;
    enabled: boolean;
    updatedById: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: SystemCaptchaConfigCountAggregateOutputType | null;
    _avg: SystemCaptchaConfigAvgAggregateOutputType | null;
    _sum: SystemCaptchaConfigSumAggregateOutputType | null;
    _min: SystemCaptchaConfigMinAggregateOutputType | null;
    _max: SystemCaptchaConfigMaxAggregateOutputType | null;
};
type GetSystemCaptchaConfigGroupByPayload<T extends SystemCaptchaConfigGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SystemCaptchaConfigGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SystemCaptchaConfigGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SystemCaptchaConfigGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SystemCaptchaConfigGroupByOutputType[P]>;
}>>;
export type SystemCaptchaConfigWhereInput = {
    AND?: Prisma.SystemCaptchaConfigWhereInput | Prisma.SystemCaptchaConfigWhereInput[];
    OR?: Prisma.SystemCaptchaConfigWhereInput[];
    NOT?: Prisma.SystemCaptchaConfigWhereInput | Prisma.SystemCaptchaConfigWhereInput[];
    id?: Prisma.StringFilter<"SystemCaptchaConfig"> | string;
    provider?: Prisma.EnumCaptchaProviderFilter<"SystemCaptchaConfig"> | $Enums.CaptchaProvider;
    siteKey?: Prisma.StringNullableFilter<"SystemCaptchaConfig"> | string | null;
    secretEncrypted?: Prisma.StringNullableFilter<"SystemCaptchaConfig"> | string | null;
    registerEnabled?: Prisma.BoolFilter<"SystemCaptchaConfig"> | boolean;
    loginEnabled?: Prisma.BoolFilter<"SystemCaptchaConfig"> | boolean;
    scoreThreshold?: Prisma.FloatFilter<"SystemCaptchaConfig"> | number;
    enabled?: Prisma.BoolFilter<"SystemCaptchaConfig"> | boolean;
    updatedById?: Prisma.StringNullableFilter<"SystemCaptchaConfig"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SystemCaptchaConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SystemCaptchaConfig"> | Date | string;
    updatedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type SystemCaptchaConfigOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    siteKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    secretEncrypted?: Prisma.SortOrderInput | Prisma.SortOrder;
    registerEnabled?: Prisma.SortOrder;
    loginEnabled?: Prisma.SortOrder;
    scoreThreshold?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    updatedBy?: Prisma.UserOrderByWithRelationInput;
    _relevance?: Prisma.SystemCaptchaConfigOrderByRelevanceInput;
};
export type SystemCaptchaConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SystemCaptchaConfigWhereInput | Prisma.SystemCaptchaConfigWhereInput[];
    OR?: Prisma.SystemCaptchaConfigWhereInput[];
    NOT?: Prisma.SystemCaptchaConfigWhereInput | Prisma.SystemCaptchaConfigWhereInput[];
    provider?: Prisma.EnumCaptchaProviderFilter<"SystemCaptchaConfig"> | $Enums.CaptchaProvider;
    siteKey?: Prisma.StringNullableFilter<"SystemCaptchaConfig"> | string | null;
    secretEncrypted?: Prisma.StringNullableFilter<"SystemCaptchaConfig"> | string | null;
    registerEnabled?: Prisma.BoolFilter<"SystemCaptchaConfig"> | boolean;
    loginEnabled?: Prisma.BoolFilter<"SystemCaptchaConfig"> | boolean;
    scoreThreshold?: Prisma.FloatFilter<"SystemCaptchaConfig"> | number;
    enabled?: Prisma.BoolFilter<"SystemCaptchaConfig"> | boolean;
    updatedById?: Prisma.StringNullableFilter<"SystemCaptchaConfig"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SystemCaptchaConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SystemCaptchaConfig"> | Date | string;
    updatedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type SystemCaptchaConfigOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    siteKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    secretEncrypted?: Prisma.SortOrderInput | Prisma.SortOrder;
    registerEnabled?: Prisma.SortOrder;
    loginEnabled?: Prisma.SortOrder;
    scoreThreshold?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SystemCaptchaConfigCountOrderByAggregateInput;
    _avg?: Prisma.SystemCaptchaConfigAvgOrderByAggregateInput;
    _max?: Prisma.SystemCaptchaConfigMaxOrderByAggregateInput;
    _min?: Prisma.SystemCaptchaConfigMinOrderByAggregateInput;
    _sum?: Prisma.SystemCaptchaConfigSumOrderByAggregateInput;
};
export type SystemCaptchaConfigScalarWhereWithAggregatesInput = {
    AND?: Prisma.SystemCaptchaConfigScalarWhereWithAggregatesInput | Prisma.SystemCaptchaConfigScalarWhereWithAggregatesInput[];
    OR?: Prisma.SystemCaptchaConfigScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SystemCaptchaConfigScalarWhereWithAggregatesInput | Prisma.SystemCaptchaConfigScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SystemCaptchaConfig"> | string;
    provider?: Prisma.EnumCaptchaProviderWithAggregatesFilter<"SystemCaptchaConfig"> | $Enums.CaptchaProvider;
    siteKey?: Prisma.StringNullableWithAggregatesFilter<"SystemCaptchaConfig"> | string | null;
    secretEncrypted?: Prisma.StringNullableWithAggregatesFilter<"SystemCaptchaConfig"> | string | null;
    registerEnabled?: Prisma.BoolWithAggregatesFilter<"SystemCaptchaConfig"> | boolean;
    loginEnabled?: Prisma.BoolWithAggregatesFilter<"SystemCaptchaConfig"> | boolean;
    scoreThreshold?: Prisma.FloatWithAggregatesFilter<"SystemCaptchaConfig"> | number;
    enabled?: Prisma.BoolWithAggregatesFilter<"SystemCaptchaConfig"> | boolean;
    updatedById?: Prisma.StringNullableWithAggregatesFilter<"SystemCaptchaConfig"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SystemCaptchaConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"SystemCaptchaConfig"> | Date | string;
};
export type SystemCaptchaConfigCreateInput = {
    id?: string;
    provider?: $Enums.CaptchaProvider;
    siteKey?: string | null;
    secretEncrypted?: string | null;
    registerEnabled?: boolean;
    loginEnabled?: boolean;
    scoreThreshold?: number;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    updatedBy?: Prisma.UserCreateNestedOneWithoutUpdatedCaptchaConfigsInput;
};
export type SystemCaptchaConfigUncheckedCreateInput = {
    id?: string;
    provider?: $Enums.CaptchaProvider;
    siteKey?: string | null;
    secretEncrypted?: string | null;
    registerEnabled?: boolean;
    loginEnabled?: boolean;
    scoreThreshold?: number;
    enabled?: boolean;
    updatedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SystemCaptchaConfigUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumCaptchaProviderFieldUpdateOperationsInput | $Enums.CaptchaProvider;
    siteKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secretEncrypted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    registerEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loginEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    scoreThreshold?: Prisma.FloatFieldUpdateOperationsInput | number;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedBy?: Prisma.UserUpdateOneWithoutUpdatedCaptchaConfigsNestedInput;
};
export type SystemCaptchaConfigUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumCaptchaProviderFieldUpdateOperationsInput | $Enums.CaptchaProvider;
    siteKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secretEncrypted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    registerEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loginEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    scoreThreshold?: Prisma.FloatFieldUpdateOperationsInput | number;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemCaptchaConfigCreateManyInput = {
    id?: string;
    provider?: $Enums.CaptchaProvider;
    siteKey?: string | null;
    secretEncrypted?: string | null;
    registerEnabled?: boolean;
    loginEnabled?: boolean;
    scoreThreshold?: number;
    enabled?: boolean;
    updatedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SystemCaptchaConfigUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumCaptchaProviderFieldUpdateOperationsInput | $Enums.CaptchaProvider;
    siteKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secretEncrypted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    registerEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loginEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    scoreThreshold?: Prisma.FloatFieldUpdateOperationsInput | number;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemCaptchaConfigUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumCaptchaProviderFieldUpdateOperationsInput | $Enums.CaptchaProvider;
    siteKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secretEncrypted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    registerEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loginEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    scoreThreshold?: Prisma.FloatFieldUpdateOperationsInput | number;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemCaptchaConfigListRelationFilter = {
    every?: Prisma.SystemCaptchaConfigWhereInput;
    some?: Prisma.SystemCaptchaConfigWhereInput;
    none?: Prisma.SystemCaptchaConfigWhereInput;
};
export type SystemCaptchaConfigOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SystemCaptchaConfigOrderByRelevanceInput = {
    fields: Prisma.SystemCaptchaConfigOrderByRelevanceFieldEnum | Prisma.SystemCaptchaConfigOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type SystemCaptchaConfigCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    siteKey?: Prisma.SortOrder;
    secretEncrypted?: Prisma.SortOrder;
    registerEnabled?: Prisma.SortOrder;
    loginEnabled?: Prisma.SortOrder;
    scoreThreshold?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SystemCaptchaConfigAvgOrderByAggregateInput = {
    scoreThreshold?: Prisma.SortOrder;
};
export type SystemCaptchaConfigMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    siteKey?: Prisma.SortOrder;
    secretEncrypted?: Prisma.SortOrder;
    registerEnabled?: Prisma.SortOrder;
    loginEnabled?: Prisma.SortOrder;
    scoreThreshold?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SystemCaptchaConfigMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    siteKey?: Prisma.SortOrder;
    secretEncrypted?: Prisma.SortOrder;
    registerEnabled?: Prisma.SortOrder;
    loginEnabled?: Prisma.SortOrder;
    scoreThreshold?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SystemCaptchaConfigSumOrderByAggregateInput = {
    scoreThreshold?: Prisma.SortOrder;
};
export type SystemCaptchaConfigCreateNestedManyWithoutUpdatedByInput = {
    create?: Prisma.XOR<Prisma.SystemCaptchaConfigCreateWithoutUpdatedByInput, Prisma.SystemCaptchaConfigUncheckedCreateWithoutUpdatedByInput> | Prisma.SystemCaptchaConfigCreateWithoutUpdatedByInput[] | Prisma.SystemCaptchaConfigUncheckedCreateWithoutUpdatedByInput[];
    connectOrCreate?: Prisma.SystemCaptchaConfigCreateOrConnectWithoutUpdatedByInput | Prisma.SystemCaptchaConfigCreateOrConnectWithoutUpdatedByInput[];
    createMany?: Prisma.SystemCaptchaConfigCreateManyUpdatedByInputEnvelope;
    connect?: Prisma.SystemCaptchaConfigWhereUniqueInput | Prisma.SystemCaptchaConfigWhereUniqueInput[];
};
export type SystemCaptchaConfigUncheckedCreateNestedManyWithoutUpdatedByInput = {
    create?: Prisma.XOR<Prisma.SystemCaptchaConfigCreateWithoutUpdatedByInput, Prisma.SystemCaptchaConfigUncheckedCreateWithoutUpdatedByInput> | Prisma.SystemCaptchaConfigCreateWithoutUpdatedByInput[] | Prisma.SystemCaptchaConfigUncheckedCreateWithoutUpdatedByInput[];
    connectOrCreate?: Prisma.SystemCaptchaConfigCreateOrConnectWithoutUpdatedByInput | Prisma.SystemCaptchaConfigCreateOrConnectWithoutUpdatedByInput[];
    createMany?: Prisma.SystemCaptchaConfigCreateManyUpdatedByInputEnvelope;
    connect?: Prisma.SystemCaptchaConfigWhereUniqueInput | Prisma.SystemCaptchaConfigWhereUniqueInput[];
};
export type SystemCaptchaConfigUpdateManyWithoutUpdatedByNestedInput = {
    create?: Prisma.XOR<Prisma.SystemCaptchaConfigCreateWithoutUpdatedByInput, Prisma.SystemCaptchaConfigUncheckedCreateWithoutUpdatedByInput> | Prisma.SystemCaptchaConfigCreateWithoutUpdatedByInput[] | Prisma.SystemCaptchaConfigUncheckedCreateWithoutUpdatedByInput[];
    connectOrCreate?: Prisma.SystemCaptchaConfigCreateOrConnectWithoutUpdatedByInput | Prisma.SystemCaptchaConfigCreateOrConnectWithoutUpdatedByInput[];
    upsert?: Prisma.SystemCaptchaConfigUpsertWithWhereUniqueWithoutUpdatedByInput | Prisma.SystemCaptchaConfigUpsertWithWhereUniqueWithoutUpdatedByInput[];
    createMany?: Prisma.SystemCaptchaConfigCreateManyUpdatedByInputEnvelope;
    set?: Prisma.SystemCaptchaConfigWhereUniqueInput | Prisma.SystemCaptchaConfigWhereUniqueInput[];
    disconnect?: Prisma.SystemCaptchaConfigWhereUniqueInput | Prisma.SystemCaptchaConfigWhereUniqueInput[];
    delete?: Prisma.SystemCaptchaConfigWhereUniqueInput | Prisma.SystemCaptchaConfigWhereUniqueInput[];
    connect?: Prisma.SystemCaptchaConfigWhereUniqueInput | Prisma.SystemCaptchaConfigWhereUniqueInput[];
    update?: Prisma.SystemCaptchaConfigUpdateWithWhereUniqueWithoutUpdatedByInput | Prisma.SystemCaptchaConfigUpdateWithWhereUniqueWithoutUpdatedByInput[];
    updateMany?: Prisma.SystemCaptchaConfigUpdateManyWithWhereWithoutUpdatedByInput | Prisma.SystemCaptchaConfigUpdateManyWithWhereWithoutUpdatedByInput[];
    deleteMany?: Prisma.SystemCaptchaConfigScalarWhereInput | Prisma.SystemCaptchaConfigScalarWhereInput[];
};
export type SystemCaptchaConfigUncheckedUpdateManyWithoutUpdatedByNestedInput = {
    create?: Prisma.XOR<Prisma.SystemCaptchaConfigCreateWithoutUpdatedByInput, Prisma.SystemCaptchaConfigUncheckedCreateWithoutUpdatedByInput> | Prisma.SystemCaptchaConfigCreateWithoutUpdatedByInput[] | Prisma.SystemCaptchaConfigUncheckedCreateWithoutUpdatedByInput[];
    connectOrCreate?: Prisma.SystemCaptchaConfigCreateOrConnectWithoutUpdatedByInput | Prisma.SystemCaptchaConfigCreateOrConnectWithoutUpdatedByInput[];
    upsert?: Prisma.SystemCaptchaConfigUpsertWithWhereUniqueWithoutUpdatedByInput | Prisma.SystemCaptchaConfigUpsertWithWhereUniqueWithoutUpdatedByInput[];
    createMany?: Prisma.SystemCaptchaConfigCreateManyUpdatedByInputEnvelope;
    set?: Prisma.SystemCaptchaConfigWhereUniqueInput | Prisma.SystemCaptchaConfigWhereUniqueInput[];
    disconnect?: Prisma.SystemCaptchaConfigWhereUniqueInput | Prisma.SystemCaptchaConfigWhereUniqueInput[];
    delete?: Prisma.SystemCaptchaConfigWhereUniqueInput | Prisma.SystemCaptchaConfigWhereUniqueInput[];
    connect?: Prisma.SystemCaptchaConfigWhereUniqueInput | Prisma.SystemCaptchaConfigWhereUniqueInput[];
    update?: Prisma.SystemCaptchaConfigUpdateWithWhereUniqueWithoutUpdatedByInput | Prisma.SystemCaptchaConfigUpdateWithWhereUniqueWithoutUpdatedByInput[];
    updateMany?: Prisma.SystemCaptchaConfigUpdateManyWithWhereWithoutUpdatedByInput | Prisma.SystemCaptchaConfigUpdateManyWithWhereWithoutUpdatedByInput[];
    deleteMany?: Prisma.SystemCaptchaConfigScalarWhereInput | Prisma.SystemCaptchaConfigScalarWhereInput[];
};
export type EnumCaptchaProviderFieldUpdateOperationsInput = {
    set?: $Enums.CaptchaProvider;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type SystemCaptchaConfigCreateWithoutUpdatedByInput = {
    id?: string;
    provider?: $Enums.CaptchaProvider;
    siteKey?: string | null;
    secretEncrypted?: string | null;
    registerEnabled?: boolean;
    loginEnabled?: boolean;
    scoreThreshold?: number;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SystemCaptchaConfigUncheckedCreateWithoutUpdatedByInput = {
    id?: string;
    provider?: $Enums.CaptchaProvider;
    siteKey?: string | null;
    secretEncrypted?: string | null;
    registerEnabled?: boolean;
    loginEnabled?: boolean;
    scoreThreshold?: number;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SystemCaptchaConfigCreateOrConnectWithoutUpdatedByInput = {
    where: Prisma.SystemCaptchaConfigWhereUniqueInput;
    create: Prisma.XOR<Prisma.SystemCaptchaConfigCreateWithoutUpdatedByInput, Prisma.SystemCaptchaConfigUncheckedCreateWithoutUpdatedByInput>;
};
export type SystemCaptchaConfigCreateManyUpdatedByInputEnvelope = {
    data: Prisma.SystemCaptchaConfigCreateManyUpdatedByInput | Prisma.SystemCaptchaConfigCreateManyUpdatedByInput[];
    skipDuplicates?: boolean;
};
export type SystemCaptchaConfigUpsertWithWhereUniqueWithoutUpdatedByInput = {
    where: Prisma.SystemCaptchaConfigWhereUniqueInput;
    update: Prisma.XOR<Prisma.SystemCaptchaConfigUpdateWithoutUpdatedByInput, Prisma.SystemCaptchaConfigUncheckedUpdateWithoutUpdatedByInput>;
    create: Prisma.XOR<Prisma.SystemCaptchaConfigCreateWithoutUpdatedByInput, Prisma.SystemCaptchaConfigUncheckedCreateWithoutUpdatedByInput>;
};
export type SystemCaptchaConfigUpdateWithWhereUniqueWithoutUpdatedByInput = {
    where: Prisma.SystemCaptchaConfigWhereUniqueInput;
    data: Prisma.XOR<Prisma.SystemCaptchaConfigUpdateWithoutUpdatedByInput, Prisma.SystemCaptchaConfigUncheckedUpdateWithoutUpdatedByInput>;
};
export type SystemCaptchaConfigUpdateManyWithWhereWithoutUpdatedByInput = {
    where: Prisma.SystemCaptchaConfigScalarWhereInput;
    data: Prisma.XOR<Prisma.SystemCaptchaConfigUpdateManyMutationInput, Prisma.SystemCaptchaConfigUncheckedUpdateManyWithoutUpdatedByInput>;
};
export type SystemCaptchaConfigScalarWhereInput = {
    AND?: Prisma.SystemCaptchaConfigScalarWhereInput | Prisma.SystemCaptchaConfigScalarWhereInput[];
    OR?: Prisma.SystemCaptchaConfigScalarWhereInput[];
    NOT?: Prisma.SystemCaptchaConfigScalarWhereInput | Prisma.SystemCaptchaConfigScalarWhereInput[];
    id?: Prisma.StringFilter<"SystemCaptchaConfig"> | string;
    provider?: Prisma.EnumCaptchaProviderFilter<"SystemCaptchaConfig"> | $Enums.CaptchaProvider;
    siteKey?: Prisma.StringNullableFilter<"SystemCaptchaConfig"> | string | null;
    secretEncrypted?: Prisma.StringNullableFilter<"SystemCaptchaConfig"> | string | null;
    registerEnabled?: Prisma.BoolFilter<"SystemCaptchaConfig"> | boolean;
    loginEnabled?: Prisma.BoolFilter<"SystemCaptchaConfig"> | boolean;
    scoreThreshold?: Prisma.FloatFilter<"SystemCaptchaConfig"> | number;
    enabled?: Prisma.BoolFilter<"SystemCaptchaConfig"> | boolean;
    updatedById?: Prisma.StringNullableFilter<"SystemCaptchaConfig"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SystemCaptchaConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SystemCaptchaConfig"> | Date | string;
};
export type SystemCaptchaConfigCreateManyUpdatedByInput = {
    id?: string;
    provider?: $Enums.CaptchaProvider;
    siteKey?: string | null;
    secretEncrypted?: string | null;
    registerEnabled?: boolean;
    loginEnabled?: boolean;
    scoreThreshold?: number;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SystemCaptchaConfigUpdateWithoutUpdatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumCaptchaProviderFieldUpdateOperationsInput | $Enums.CaptchaProvider;
    siteKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secretEncrypted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    registerEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loginEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    scoreThreshold?: Prisma.FloatFieldUpdateOperationsInput | number;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemCaptchaConfigUncheckedUpdateWithoutUpdatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumCaptchaProviderFieldUpdateOperationsInput | $Enums.CaptchaProvider;
    siteKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secretEncrypted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    registerEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loginEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    scoreThreshold?: Prisma.FloatFieldUpdateOperationsInput | number;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemCaptchaConfigUncheckedUpdateManyWithoutUpdatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumCaptchaProviderFieldUpdateOperationsInput | $Enums.CaptchaProvider;
    siteKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    secretEncrypted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    registerEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    loginEnabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    scoreThreshold?: Prisma.FloatFieldUpdateOperationsInput | number;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemCaptchaConfigSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    provider?: boolean;
    siteKey?: boolean;
    secretEncrypted?: boolean;
    registerEnabled?: boolean;
    loginEnabled?: boolean;
    scoreThreshold?: boolean;
    enabled?: boolean;
    updatedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    updatedBy?: boolean | Prisma.SystemCaptchaConfig$updatedByArgs<ExtArgs>;
}, ExtArgs["result"]["systemCaptchaConfig"]>;
export type SystemCaptchaConfigSelectScalar = {
    id?: boolean;
    provider?: boolean;
    siteKey?: boolean;
    secretEncrypted?: boolean;
    registerEnabled?: boolean;
    loginEnabled?: boolean;
    scoreThreshold?: boolean;
    enabled?: boolean;
    updatedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SystemCaptchaConfigOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "provider" | "siteKey" | "secretEncrypted" | "registerEnabled" | "loginEnabled" | "scoreThreshold" | "enabled" | "updatedById" | "createdAt" | "updatedAt", ExtArgs["result"]["systemCaptchaConfig"]>;
export type SystemCaptchaConfigInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    updatedBy?: boolean | Prisma.SystemCaptchaConfig$updatedByArgs<ExtArgs>;
};
export type $SystemCaptchaConfigPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SystemCaptchaConfig";
    objects: {
        updatedBy: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        provider: $Enums.CaptchaProvider;
        siteKey: string | null;
        secretEncrypted: string | null;
        registerEnabled: boolean;
        loginEnabled: boolean;
        scoreThreshold: number;
        enabled: boolean;
        updatedById: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["systemCaptchaConfig"]>;
    composites: {};
};
export type SystemCaptchaConfigGetPayload<S extends boolean | null | undefined | SystemCaptchaConfigDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SystemCaptchaConfigPayload, S>;
export type SystemCaptchaConfigCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SystemCaptchaConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SystemCaptchaConfigCountAggregateInputType | true;
};
export interface SystemCaptchaConfigDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SystemCaptchaConfig'];
        meta: {
            name: 'SystemCaptchaConfig';
        };
    };
    findUnique<T extends SystemCaptchaConfigFindUniqueArgs>(args: Prisma.SelectSubset<T, SystemCaptchaConfigFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SystemCaptchaConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemCaptchaConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SystemCaptchaConfigFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SystemCaptchaConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SystemCaptchaConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemCaptchaConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SystemCaptchaConfigFindFirstArgs>(args?: Prisma.SelectSubset<T, SystemCaptchaConfigFindFirstArgs<ExtArgs>>): Prisma.Prisma__SystemCaptchaConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemCaptchaConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SystemCaptchaConfigFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SystemCaptchaConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SystemCaptchaConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemCaptchaConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SystemCaptchaConfigFindManyArgs>(args?: Prisma.SelectSubset<T, SystemCaptchaConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SystemCaptchaConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SystemCaptchaConfigCreateArgs>(args: Prisma.SelectSubset<T, SystemCaptchaConfigCreateArgs<ExtArgs>>): Prisma.Prisma__SystemCaptchaConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemCaptchaConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SystemCaptchaConfigCreateManyArgs>(args?: Prisma.SelectSubset<T, SystemCaptchaConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends SystemCaptchaConfigDeleteArgs>(args: Prisma.SelectSubset<T, SystemCaptchaConfigDeleteArgs<ExtArgs>>): Prisma.Prisma__SystemCaptchaConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemCaptchaConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SystemCaptchaConfigUpdateArgs>(args: Prisma.SelectSubset<T, SystemCaptchaConfigUpdateArgs<ExtArgs>>): Prisma.Prisma__SystemCaptchaConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemCaptchaConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SystemCaptchaConfigDeleteManyArgs>(args?: Prisma.SelectSubset<T, SystemCaptchaConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SystemCaptchaConfigUpdateManyArgs>(args: Prisma.SelectSubset<T, SystemCaptchaConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends SystemCaptchaConfigUpsertArgs>(args: Prisma.SelectSubset<T, SystemCaptchaConfigUpsertArgs<ExtArgs>>): Prisma.Prisma__SystemCaptchaConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemCaptchaConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SystemCaptchaConfigCountArgs>(args?: Prisma.Subset<T, SystemCaptchaConfigCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SystemCaptchaConfigCountAggregateOutputType> : number>;
    aggregate<T extends SystemCaptchaConfigAggregateArgs>(args: Prisma.Subset<T, SystemCaptchaConfigAggregateArgs>): Prisma.PrismaPromise<GetSystemCaptchaConfigAggregateType<T>>;
    groupBy<T extends SystemCaptchaConfigGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SystemCaptchaConfigGroupByArgs['orderBy'];
    } : {
        orderBy?: SystemCaptchaConfigGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SystemCaptchaConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemCaptchaConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SystemCaptchaConfigFieldRefs;
}
export interface Prisma__SystemCaptchaConfigClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    updatedBy<T extends Prisma.SystemCaptchaConfig$updatedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SystemCaptchaConfig$updatedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SystemCaptchaConfigFieldRefs {
    readonly id: Prisma.FieldRef<"SystemCaptchaConfig", 'String'>;
    readonly provider: Prisma.FieldRef<"SystemCaptchaConfig", 'CaptchaProvider'>;
    readonly siteKey: Prisma.FieldRef<"SystemCaptchaConfig", 'String'>;
    readonly secretEncrypted: Prisma.FieldRef<"SystemCaptchaConfig", 'String'>;
    readonly registerEnabled: Prisma.FieldRef<"SystemCaptchaConfig", 'Boolean'>;
    readonly loginEnabled: Prisma.FieldRef<"SystemCaptchaConfig", 'Boolean'>;
    readonly scoreThreshold: Prisma.FieldRef<"SystemCaptchaConfig", 'Float'>;
    readonly enabled: Prisma.FieldRef<"SystemCaptchaConfig", 'Boolean'>;
    readonly updatedById: Prisma.FieldRef<"SystemCaptchaConfig", 'String'>;
    readonly createdAt: Prisma.FieldRef<"SystemCaptchaConfig", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"SystemCaptchaConfig", 'DateTime'>;
}
export type SystemCaptchaConfigFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemCaptchaConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemCaptchaConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemCaptchaConfigInclude<ExtArgs> | null;
    where: Prisma.SystemCaptchaConfigWhereUniqueInput;
};
export type SystemCaptchaConfigFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemCaptchaConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemCaptchaConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemCaptchaConfigInclude<ExtArgs> | null;
    where: Prisma.SystemCaptchaConfigWhereUniqueInput;
};
export type SystemCaptchaConfigFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemCaptchaConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemCaptchaConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemCaptchaConfigInclude<ExtArgs> | null;
    where?: Prisma.SystemCaptchaConfigWhereInput;
    orderBy?: Prisma.SystemCaptchaConfigOrderByWithRelationInput | Prisma.SystemCaptchaConfigOrderByWithRelationInput[];
    cursor?: Prisma.SystemCaptchaConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SystemCaptchaConfigScalarFieldEnum | Prisma.SystemCaptchaConfigScalarFieldEnum[];
};
export type SystemCaptchaConfigFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemCaptchaConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemCaptchaConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemCaptchaConfigInclude<ExtArgs> | null;
    where?: Prisma.SystemCaptchaConfigWhereInput;
    orderBy?: Prisma.SystemCaptchaConfigOrderByWithRelationInput | Prisma.SystemCaptchaConfigOrderByWithRelationInput[];
    cursor?: Prisma.SystemCaptchaConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SystemCaptchaConfigScalarFieldEnum | Prisma.SystemCaptchaConfigScalarFieldEnum[];
};
export type SystemCaptchaConfigFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemCaptchaConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemCaptchaConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemCaptchaConfigInclude<ExtArgs> | null;
    where?: Prisma.SystemCaptchaConfigWhereInput;
    orderBy?: Prisma.SystemCaptchaConfigOrderByWithRelationInput | Prisma.SystemCaptchaConfigOrderByWithRelationInput[];
    cursor?: Prisma.SystemCaptchaConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SystemCaptchaConfigScalarFieldEnum | Prisma.SystemCaptchaConfigScalarFieldEnum[];
};
export type SystemCaptchaConfigCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemCaptchaConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemCaptchaConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemCaptchaConfigInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SystemCaptchaConfigCreateInput, Prisma.SystemCaptchaConfigUncheckedCreateInput>;
};
export type SystemCaptchaConfigCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SystemCaptchaConfigCreateManyInput | Prisma.SystemCaptchaConfigCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SystemCaptchaConfigUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemCaptchaConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemCaptchaConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemCaptchaConfigInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SystemCaptchaConfigUpdateInput, Prisma.SystemCaptchaConfigUncheckedUpdateInput>;
    where: Prisma.SystemCaptchaConfigWhereUniqueInput;
};
export type SystemCaptchaConfigUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SystemCaptchaConfigUpdateManyMutationInput, Prisma.SystemCaptchaConfigUncheckedUpdateManyInput>;
    where?: Prisma.SystemCaptchaConfigWhereInput;
    limit?: number;
};
export type SystemCaptchaConfigUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemCaptchaConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemCaptchaConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemCaptchaConfigInclude<ExtArgs> | null;
    where: Prisma.SystemCaptchaConfigWhereUniqueInput;
    create: Prisma.XOR<Prisma.SystemCaptchaConfigCreateInput, Prisma.SystemCaptchaConfigUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SystemCaptchaConfigUpdateInput, Prisma.SystemCaptchaConfigUncheckedUpdateInput>;
};
export type SystemCaptchaConfigDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemCaptchaConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemCaptchaConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemCaptchaConfigInclude<ExtArgs> | null;
    where: Prisma.SystemCaptchaConfigWhereUniqueInput;
};
export type SystemCaptchaConfigDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SystemCaptchaConfigWhereInput;
    limit?: number;
};
export type SystemCaptchaConfig$updatedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type SystemCaptchaConfigDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemCaptchaConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemCaptchaConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemCaptchaConfigInclude<ExtArgs> | null;
};
export {};
