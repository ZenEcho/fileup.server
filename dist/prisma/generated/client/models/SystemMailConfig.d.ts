import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type SystemMailConfigModel = runtime.Types.Result.DefaultSelection<Prisma.$SystemMailConfigPayload>;
export type AggregateSystemMailConfig = {
    _count: SystemMailConfigCountAggregateOutputType | null;
    _avg: SystemMailConfigAvgAggregateOutputType | null;
    _sum: SystemMailConfigSumAggregateOutputType | null;
    _min: SystemMailConfigMinAggregateOutputType | null;
    _max: SystemMailConfigMaxAggregateOutputType | null;
};
export type SystemMailConfigAvgAggregateOutputType = {
    smtpPort: number | null;
};
export type SystemMailConfigSumAggregateOutputType = {
    smtpPort: number | null;
};
export type SystemMailConfigMinAggregateOutputType = {
    id: string | null;
    provider: $Enums.MailProvider | null;
    smtpHost: string | null;
    smtpPort: number | null;
    smtpSecure: boolean | null;
    smtpUser: string | null;
    smtpPassEncrypted: string | null;
    fromEmail: string | null;
    fromName: string | null;
    enabled: boolean | null;
    updatedById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SystemMailConfigMaxAggregateOutputType = {
    id: string | null;
    provider: $Enums.MailProvider | null;
    smtpHost: string | null;
    smtpPort: number | null;
    smtpSecure: boolean | null;
    smtpUser: string | null;
    smtpPassEncrypted: string | null;
    fromEmail: string | null;
    fromName: string | null;
    enabled: boolean | null;
    updatedById: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type SystemMailConfigCountAggregateOutputType = {
    id: number;
    provider: number;
    smtpHost: number;
    smtpPort: number;
    smtpSecure: number;
    smtpUser: number;
    smtpPassEncrypted: number;
    fromEmail: number;
    fromName: number;
    enabled: number;
    updatedById: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type SystemMailConfigAvgAggregateInputType = {
    smtpPort?: true;
};
export type SystemMailConfigSumAggregateInputType = {
    smtpPort?: true;
};
export type SystemMailConfigMinAggregateInputType = {
    id?: true;
    provider?: true;
    smtpHost?: true;
    smtpPort?: true;
    smtpSecure?: true;
    smtpUser?: true;
    smtpPassEncrypted?: true;
    fromEmail?: true;
    fromName?: true;
    enabled?: true;
    updatedById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SystemMailConfigMaxAggregateInputType = {
    id?: true;
    provider?: true;
    smtpHost?: true;
    smtpPort?: true;
    smtpSecure?: true;
    smtpUser?: true;
    smtpPassEncrypted?: true;
    fromEmail?: true;
    fromName?: true;
    enabled?: true;
    updatedById?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type SystemMailConfigCountAggregateInputType = {
    id?: true;
    provider?: true;
    smtpHost?: true;
    smtpPort?: true;
    smtpSecure?: true;
    smtpUser?: true;
    smtpPassEncrypted?: true;
    fromEmail?: true;
    fromName?: true;
    enabled?: true;
    updatedById?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type SystemMailConfigAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SystemMailConfigWhereInput;
    orderBy?: Prisma.SystemMailConfigOrderByWithRelationInput | Prisma.SystemMailConfigOrderByWithRelationInput[];
    cursor?: Prisma.SystemMailConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SystemMailConfigCountAggregateInputType;
    _avg?: SystemMailConfigAvgAggregateInputType;
    _sum?: SystemMailConfigSumAggregateInputType;
    _min?: SystemMailConfigMinAggregateInputType;
    _max?: SystemMailConfigMaxAggregateInputType;
};
export type GetSystemMailConfigAggregateType<T extends SystemMailConfigAggregateArgs> = {
    [P in keyof T & keyof AggregateSystemMailConfig]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSystemMailConfig[P]> : Prisma.GetScalarType<T[P], AggregateSystemMailConfig[P]>;
};
export type SystemMailConfigGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SystemMailConfigWhereInput;
    orderBy?: Prisma.SystemMailConfigOrderByWithAggregationInput | Prisma.SystemMailConfigOrderByWithAggregationInput[];
    by: Prisma.SystemMailConfigScalarFieldEnum[] | Prisma.SystemMailConfigScalarFieldEnum;
    having?: Prisma.SystemMailConfigScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SystemMailConfigCountAggregateInputType | true;
    _avg?: SystemMailConfigAvgAggregateInputType;
    _sum?: SystemMailConfigSumAggregateInputType;
    _min?: SystemMailConfigMinAggregateInputType;
    _max?: SystemMailConfigMaxAggregateInputType;
};
export type SystemMailConfigGroupByOutputType = {
    id: string;
    provider: $Enums.MailProvider;
    smtpHost: string | null;
    smtpPort: number | null;
    smtpSecure: boolean;
    smtpUser: string | null;
    smtpPassEncrypted: string | null;
    fromEmail: string | null;
    fromName: string | null;
    enabled: boolean;
    updatedById: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: SystemMailConfigCountAggregateOutputType | null;
    _avg: SystemMailConfigAvgAggregateOutputType | null;
    _sum: SystemMailConfigSumAggregateOutputType | null;
    _min: SystemMailConfigMinAggregateOutputType | null;
    _max: SystemMailConfigMaxAggregateOutputType | null;
};
type GetSystemMailConfigGroupByPayload<T extends SystemMailConfigGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SystemMailConfigGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SystemMailConfigGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SystemMailConfigGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SystemMailConfigGroupByOutputType[P]>;
}>>;
export type SystemMailConfigWhereInput = {
    AND?: Prisma.SystemMailConfigWhereInput | Prisma.SystemMailConfigWhereInput[];
    OR?: Prisma.SystemMailConfigWhereInput[];
    NOT?: Prisma.SystemMailConfigWhereInput | Prisma.SystemMailConfigWhereInput[];
    id?: Prisma.StringFilter<"SystemMailConfig"> | string;
    provider?: Prisma.EnumMailProviderFilter<"SystemMailConfig"> | $Enums.MailProvider;
    smtpHost?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    smtpPort?: Prisma.IntNullableFilter<"SystemMailConfig"> | number | null;
    smtpSecure?: Prisma.BoolFilter<"SystemMailConfig"> | boolean;
    smtpUser?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    smtpPassEncrypted?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    fromEmail?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    fromName?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    enabled?: Prisma.BoolFilter<"SystemMailConfig"> | boolean;
    updatedById?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SystemMailConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SystemMailConfig"> | Date | string;
    updatedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type SystemMailConfigOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    smtpHost?: Prisma.SortOrderInput | Prisma.SortOrder;
    smtpPort?: Prisma.SortOrderInput | Prisma.SortOrder;
    smtpSecure?: Prisma.SortOrder;
    smtpUser?: Prisma.SortOrderInput | Prisma.SortOrder;
    smtpPassEncrypted?: Prisma.SortOrderInput | Prisma.SortOrder;
    fromEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    fromName?: Prisma.SortOrderInput | Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    updatedBy?: Prisma.UserOrderByWithRelationInput;
    _relevance?: Prisma.SystemMailConfigOrderByRelevanceInput;
};
export type SystemMailConfigWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SystemMailConfigWhereInput | Prisma.SystemMailConfigWhereInput[];
    OR?: Prisma.SystemMailConfigWhereInput[];
    NOT?: Prisma.SystemMailConfigWhereInput | Prisma.SystemMailConfigWhereInput[];
    provider?: Prisma.EnumMailProviderFilter<"SystemMailConfig"> | $Enums.MailProvider;
    smtpHost?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    smtpPort?: Prisma.IntNullableFilter<"SystemMailConfig"> | number | null;
    smtpSecure?: Prisma.BoolFilter<"SystemMailConfig"> | boolean;
    smtpUser?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    smtpPassEncrypted?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    fromEmail?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    fromName?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    enabled?: Prisma.BoolFilter<"SystemMailConfig"> | boolean;
    updatedById?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SystemMailConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SystemMailConfig"> | Date | string;
    updatedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type SystemMailConfigOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    smtpHost?: Prisma.SortOrderInput | Prisma.SortOrder;
    smtpPort?: Prisma.SortOrderInput | Prisma.SortOrder;
    smtpSecure?: Prisma.SortOrder;
    smtpUser?: Prisma.SortOrderInput | Prisma.SortOrder;
    smtpPassEncrypted?: Prisma.SortOrderInput | Prisma.SortOrder;
    fromEmail?: Prisma.SortOrderInput | Prisma.SortOrder;
    fromName?: Prisma.SortOrderInput | Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.SystemMailConfigCountOrderByAggregateInput;
    _avg?: Prisma.SystemMailConfigAvgOrderByAggregateInput;
    _max?: Prisma.SystemMailConfigMaxOrderByAggregateInput;
    _min?: Prisma.SystemMailConfigMinOrderByAggregateInput;
    _sum?: Prisma.SystemMailConfigSumOrderByAggregateInput;
};
export type SystemMailConfigScalarWhereWithAggregatesInput = {
    AND?: Prisma.SystemMailConfigScalarWhereWithAggregatesInput | Prisma.SystemMailConfigScalarWhereWithAggregatesInput[];
    OR?: Prisma.SystemMailConfigScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SystemMailConfigScalarWhereWithAggregatesInput | Prisma.SystemMailConfigScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SystemMailConfig"> | string;
    provider?: Prisma.EnumMailProviderWithAggregatesFilter<"SystemMailConfig"> | $Enums.MailProvider;
    smtpHost?: Prisma.StringNullableWithAggregatesFilter<"SystemMailConfig"> | string | null;
    smtpPort?: Prisma.IntNullableWithAggregatesFilter<"SystemMailConfig"> | number | null;
    smtpSecure?: Prisma.BoolWithAggregatesFilter<"SystemMailConfig"> | boolean;
    smtpUser?: Prisma.StringNullableWithAggregatesFilter<"SystemMailConfig"> | string | null;
    smtpPassEncrypted?: Prisma.StringNullableWithAggregatesFilter<"SystemMailConfig"> | string | null;
    fromEmail?: Prisma.StringNullableWithAggregatesFilter<"SystemMailConfig"> | string | null;
    fromName?: Prisma.StringNullableWithAggregatesFilter<"SystemMailConfig"> | string | null;
    enabled?: Prisma.BoolWithAggregatesFilter<"SystemMailConfig"> | boolean;
    updatedById?: Prisma.StringNullableWithAggregatesFilter<"SystemMailConfig"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SystemMailConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"SystemMailConfig"> | Date | string;
};
export type SystemMailConfigCreateInput = {
    id?: string;
    provider?: $Enums.MailProvider;
    smtpHost?: string | null;
    smtpPort?: number | null;
    smtpSecure?: boolean;
    smtpUser?: string | null;
    smtpPassEncrypted?: string | null;
    fromEmail?: string | null;
    fromName?: string | null;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    updatedBy?: Prisma.UserCreateNestedOneWithoutUpdatedMailConfigsInput;
};
export type SystemMailConfigUncheckedCreateInput = {
    id?: string;
    provider?: $Enums.MailProvider;
    smtpHost?: string | null;
    smtpPort?: number | null;
    smtpSecure?: boolean;
    smtpUser?: string | null;
    smtpPassEncrypted?: string | null;
    fromEmail?: string | null;
    fromName?: string | null;
    enabled?: boolean;
    updatedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SystemMailConfigUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumMailProviderFieldUpdateOperationsInput | $Enums.MailProvider;
    smtpHost?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    smtpPort?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    smtpSecure?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    smtpUser?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    smtpPassEncrypted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fromEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fromName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedBy?: Prisma.UserUpdateOneWithoutUpdatedMailConfigsNestedInput;
};
export type SystemMailConfigUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumMailProviderFieldUpdateOperationsInput | $Enums.MailProvider;
    smtpHost?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    smtpPort?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    smtpSecure?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    smtpUser?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    smtpPassEncrypted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fromEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fromName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemMailConfigCreateManyInput = {
    id?: string;
    provider?: $Enums.MailProvider;
    smtpHost?: string | null;
    smtpPort?: number | null;
    smtpSecure?: boolean;
    smtpUser?: string | null;
    smtpPassEncrypted?: string | null;
    fromEmail?: string | null;
    fromName?: string | null;
    enabled?: boolean;
    updatedById?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SystemMailConfigUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumMailProviderFieldUpdateOperationsInput | $Enums.MailProvider;
    smtpHost?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    smtpPort?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    smtpSecure?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    smtpUser?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    smtpPassEncrypted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fromEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fromName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemMailConfigUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumMailProviderFieldUpdateOperationsInput | $Enums.MailProvider;
    smtpHost?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    smtpPort?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    smtpSecure?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    smtpUser?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    smtpPassEncrypted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fromEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fromName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    updatedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemMailConfigListRelationFilter = {
    every?: Prisma.SystemMailConfigWhereInput;
    some?: Prisma.SystemMailConfigWhereInput;
    none?: Prisma.SystemMailConfigWhereInput;
};
export type SystemMailConfigOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SystemMailConfigOrderByRelevanceInput = {
    fields: Prisma.SystemMailConfigOrderByRelevanceFieldEnum | Prisma.SystemMailConfigOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type SystemMailConfigCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    smtpHost?: Prisma.SortOrder;
    smtpPort?: Prisma.SortOrder;
    smtpSecure?: Prisma.SortOrder;
    smtpUser?: Prisma.SortOrder;
    smtpPassEncrypted?: Prisma.SortOrder;
    fromEmail?: Prisma.SortOrder;
    fromName?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SystemMailConfigAvgOrderByAggregateInput = {
    smtpPort?: Prisma.SortOrder;
};
export type SystemMailConfigMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    smtpHost?: Prisma.SortOrder;
    smtpPort?: Prisma.SortOrder;
    smtpSecure?: Prisma.SortOrder;
    smtpUser?: Prisma.SortOrder;
    smtpPassEncrypted?: Prisma.SortOrder;
    fromEmail?: Prisma.SortOrder;
    fromName?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SystemMailConfigMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    provider?: Prisma.SortOrder;
    smtpHost?: Prisma.SortOrder;
    smtpPort?: Prisma.SortOrder;
    smtpSecure?: Prisma.SortOrder;
    smtpUser?: Prisma.SortOrder;
    smtpPassEncrypted?: Prisma.SortOrder;
    fromEmail?: Prisma.SortOrder;
    fromName?: Prisma.SortOrder;
    enabled?: Prisma.SortOrder;
    updatedById?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type SystemMailConfigSumOrderByAggregateInput = {
    smtpPort?: Prisma.SortOrder;
};
export type SystemMailConfigCreateNestedManyWithoutUpdatedByInput = {
    create?: Prisma.XOR<Prisma.SystemMailConfigCreateWithoutUpdatedByInput, Prisma.SystemMailConfigUncheckedCreateWithoutUpdatedByInput> | Prisma.SystemMailConfigCreateWithoutUpdatedByInput[] | Prisma.SystemMailConfigUncheckedCreateWithoutUpdatedByInput[];
    connectOrCreate?: Prisma.SystemMailConfigCreateOrConnectWithoutUpdatedByInput | Prisma.SystemMailConfigCreateOrConnectWithoutUpdatedByInput[];
    createMany?: Prisma.SystemMailConfigCreateManyUpdatedByInputEnvelope;
    connect?: Prisma.SystemMailConfigWhereUniqueInput | Prisma.SystemMailConfigWhereUniqueInput[];
};
export type SystemMailConfigUncheckedCreateNestedManyWithoutUpdatedByInput = {
    create?: Prisma.XOR<Prisma.SystemMailConfigCreateWithoutUpdatedByInput, Prisma.SystemMailConfigUncheckedCreateWithoutUpdatedByInput> | Prisma.SystemMailConfigCreateWithoutUpdatedByInput[] | Prisma.SystemMailConfigUncheckedCreateWithoutUpdatedByInput[];
    connectOrCreate?: Prisma.SystemMailConfigCreateOrConnectWithoutUpdatedByInput | Prisma.SystemMailConfigCreateOrConnectWithoutUpdatedByInput[];
    createMany?: Prisma.SystemMailConfigCreateManyUpdatedByInputEnvelope;
    connect?: Prisma.SystemMailConfigWhereUniqueInput | Prisma.SystemMailConfigWhereUniqueInput[];
};
export type SystemMailConfigUpdateManyWithoutUpdatedByNestedInput = {
    create?: Prisma.XOR<Prisma.SystemMailConfigCreateWithoutUpdatedByInput, Prisma.SystemMailConfigUncheckedCreateWithoutUpdatedByInput> | Prisma.SystemMailConfigCreateWithoutUpdatedByInput[] | Prisma.SystemMailConfigUncheckedCreateWithoutUpdatedByInput[];
    connectOrCreate?: Prisma.SystemMailConfigCreateOrConnectWithoutUpdatedByInput | Prisma.SystemMailConfigCreateOrConnectWithoutUpdatedByInput[];
    upsert?: Prisma.SystemMailConfigUpsertWithWhereUniqueWithoutUpdatedByInput | Prisma.SystemMailConfigUpsertWithWhereUniqueWithoutUpdatedByInput[];
    createMany?: Prisma.SystemMailConfigCreateManyUpdatedByInputEnvelope;
    set?: Prisma.SystemMailConfigWhereUniqueInput | Prisma.SystemMailConfigWhereUniqueInput[];
    disconnect?: Prisma.SystemMailConfigWhereUniqueInput | Prisma.SystemMailConfigWhereUniqueInput[];
    delete?: Prisma.SystemMailConfigWhereUniqueInput | Prisma.SystemMailConfigWhereUniqueInput[];
    connect?: Prisma.SystemMailConfigWhereUniqueInput | Prisma.SystemMailConfigWhereUniqueInput[];
    update?: Prisma.SystemMailConfigUpdateWithWhereUniqueWithoutUpdatedByInput | Prisma.SystemMailConfigUpdateWithWhereUniqueWithoutUpdatedByInput[];
    updateMany?: Prisma.SystemMailConfigUpdateManyWithWhereWithoutUpdatedByInput | Prisma.SystemMailConfigUpdateManyWithWhereWithoutUpdatedByInput[];
    deleteMany?: Prisma.SystemMailConfigScalarWhereInput | Prisma.SystemMailConfigScalarWhereInput[];
};
export type SystemMailConfigUncheckedUpdateManyWithoutUpdatedByNestedInput = {
    create?: Prisma.XOR<Prisma.SystemMailConfigCreateWithoutUpdatedByInput, Prisma.SystemMailConfigUncheckedCreateWithoutUpdatedByInput> | Prisma.SystemMailConfigCreateWithoutUpdatedByInput[] | Prisma.SystemMailConfigUncheckedCreateWithoutUpdatedByInput[];
    connectOrCreate?: Prisma.SystemMailConfigCreateOrConnectWithoutUpdatedByInput | Prisma.SystemMailConfigCreateOrConnectWithoutUpdatedByInput[];
    upsert?: Prisma.SystemMailConfigUpsertWithWhereUniqueWithoutUpdatedByInput | Prisma.SystemMailConfigUpsertWithWhereUniqueWithoutUpdatedByInput[];
    createMany?: Prisma.SystemMailConfigCreateManyUpdatedByInputEnvelope;
    set?: Prisma.SystemMailConfigWhereUniqueInput | Prisma.SystemMailConfigWhereUniqueInput[];
    disconnect?: Prisma.SystemMailConfigWhereUniqueInput | Prisma.SystemMailConfigWhereUniqueInput[];
    delete?: Prisma.SystemMailConfigWhereUniqueInput | Prisma.SystemMailConfigWhereUniqueInput[];
    connect?: Prisma.SystemMailConfigWhereUniqueInput | Prisma.SystemMailConfigWhereUniqueInput[];
    update?: Prisma.SystemMailConfigUpdateWithWhereUniqueWithoutUpdatedByInput | Prisma.SystemMailConfigUpdateWithWhereUniqueWithoutUpdatedByInput[];
    updateMany?: Prisma.SystemMailConfigUpdateManyWithWhereWithoutUpdatedByInput | Prisma.SystemMailConfigUpdateManyWithWhereWithoutUpdatedByInput[];
    deleteMany?: Prisma.SystemMailConfigScalarWhereInput | Prisma.SystemMailConfigScalarWhereInput[];
};
export type EnumMailProviderFieldUpdateOperationsInput = {
    set?: $Enums.MailProvider;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type SystemMailConfigCreateWithoutUpdatedByInput = {
    id?: string;
    provider?: $Enums.MailProvider;
    smtpHost?: string | null;
    smtpPort?: number | null;
    smtpSecure?: boolean;
    smtpUser?: string | null;
    smtpPassEncrypted?: string | null;
    fromEmail?: string | null;
    fromName?: string | null;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SystemMailConfigUncheckedCreateWithoutUpdatedByInput = {
    id?: string;
    provider?: $Enums.MailProvider;
    smtpHost?: string | null;
    smtpPort?: number | null;
    smtpSecure?: boolean;
    smtpUser?: string | null;
    smtpPassEncrypted?: string | null;
    fromEmail?: string | null;
    fromName?: string | null;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SystemMailConfigCreateOrConnectWithoutUpdatedByInput = {
    where: Prisma.SystemMailConfigWhereUniqueInput;
    create: Prisma.XOR<Prisma.SystemMailConfigCreateWithoutUpdatedByInput, Prisma.SystemMailConfigUncheckedCreateWithoutUpdatedByInput>;
};
export type SystemMailConfigCreateManyUpdatedByInputEnvelope = {
    data: Prisma.SystemMailConfigCreateManyUpdatedByInput | Prisma.SystemMailConfigCreateManyUpdatedByInput[];
    skipDuplicates?: boolean;
};
export type SystemMailConfigUpsertWithWhereUniqueWithoutUpdatedByInput = {
    where: Prisma.SystemMailConfigWhereUniqueInput;
    update: Prisma.XOR<Prisma.SystemMailConfigUpdateWithoutUpdatedByInput, Prisma.SystemMailConfigUncheckedUpdateWithoutUpdatedByInput>;
    create: Prisma.XOR<Prisma.SystemMailConfigCreateWithoutUpdatedByInput, Prisma.SystemMailConfigUncheckedCreateWithoutUpdatedByInput>;
};
export type SystemMailConfigUpdateWithWhereUniqueWithoutUpdatedByInput = {
    where: Prisma.SystemMailConfigWhereUniqueInput;
    data: Prisma.XOR<Prisma.SystemMailConfigUpdateWithoutUpdatedByInput, Prisma.SystemMailConfigUncheckedUpdateWithoutUpdatedByInput>;
};
export type SystemMailConfigUpdateManyWithWhereWithoutUpdatedByInput = {
    where: Prisma.SystemMailConfigScalarWhereInput;
    data: Prisma.XOR<Prisma.SystemMailConfigUpdateManyMutationInput, Prisma.SystemMailConfigUncheckedUpdateManyWithoutUpdatedByInput>;
};
export type SystemMailConfigScalarWhereInput = {
    AND?: Prisma.SystemMailConfigScalarWhereInput | Prisma.SystemMailConfigScalarWhereInput[];
    OR?: Prisma.SystemMailConfigScalarWhereInput[];
    NOT?: Prisma.SystemMailConfigScalarWhereInput | Prisma.SystemMailConfigScalarWhereInput[];
    id?: Prisma.StringFilter<"SystemMailConfig"> | string;
    provider?: Prisma.EnumMailProviderFilter<"SystemMailConfig"> | $Enums.MailProvider;
    smtpHost?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    smtpPort?: Prisma.IntNullableFilter<"SystemMailConfig"> | number | null;
    smtpSecure?: Prisma.BoolFilter<"SystemMailConfig"> | boolean;
    smtpUser?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    smtpPassEncrypted?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    fromEmail?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    fromName?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    enabled?: Prisma.BoolFilter<"SystemMailConfig"> | boolean;
    updatedById?: Prisma.StringNullableFilter<"SystemMailConfig"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SystemMailConfig"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"SystemMailConfig"> | Date | string;
};
export type SystemMailConfigCreateManyUpdatedByInput = {
    id?: string;
    provider?: $Enums.MailProvider;
    smtpHost?: string | null;
    smtpPort?: number | null;
    smtpSecure?: boolean;
    smtpUser?: string | null;
    smtpPassEncrypted?: string | null;
    fromEmail?: string | null;
    fromName?: string | null;
    enabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type SystemMailConfigUpdateWithoutUpdatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumMailProviderFieldUpdateOperationsInput | $Enums.MailProvider;
    smtpHost?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    smtpPort?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    smtpSecure?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    smtpUser?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    smtpPassEncrypted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fromEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fromName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemMailConfigUncheckedUpdateWithoutUpdatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumMailProviderFieldUpdateOperationsInput | $Enums.MailProvider;
    smtpHost?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    smtpPort?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    smtpSecure?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    smtpUser?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    smtpPassEncrypted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fromEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fromName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemMailConfigUncheckedUpdateManyWithoutUpdatedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    provider?: Prisma.EnumMailProviderFieldUpdateOperationsInput | $Enums.MailProvider;
    smtpHost?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    smtpPort?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    smtpSecure?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    smtpUser?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    smtpPassEncrypted?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fromEmail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fromName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    enabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemMailConfigSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    provider?: boolean;
    smtpHost?: boolean;
    smtpPort?: boolean;
    smtpSecure?: boolean;
    smtpUser?: boolean;
    smtpPassEncrypted?: boolean;
    fromEmail?: boolean;
    fromName?: boolean;
    enabled?: boolean;
    updatedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    updatedBy?: boolean | Prisma.SystemMailConfig$updatedByArgs<ExtArgs>;
}, ExtArgs["result"]["systemMailConfig"]>;
export type SystemMailConfigSelectScalar = {
    id?: boolean;
    provider?: boolean;
    smtpHost?: boolean;
    smtpPort?: boolean;
    smtpSecure?: boolean;
    smtpUser?: boolean;
    smtpPassEncrypted?: boolean;
    fromEmail?: boolean;
    fromName?: boolean;
    enabled?: boolean;
    updatedById?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type SystemMailConfigOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "provider" | "smtpHost" | "smtpPort" | "smtpSecure" | "smtpUser" | "smtpPassEncrypted" | "fromEmail" | "fromName" | "enabled" | "updatedById" | "createdAt" | "updatedAt", ExtArgs["result"]["systemMailConfig"]>;
export type SystemMailConfigInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    updatedBy?: boolean | Prisma.SystemMailConfig$updatedByArgs<ExtArgs>;
};
export type $SystemMailConfigPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SystemMailConfig";
    objects: {
        updatedBy: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        provider: $Enums.MailProvider;
        smtpHost: string | null;
        smtpPort: number | null;
        smtpSecure: boolean;
        smtpUser: string | null;
        smtpPassEncrypted: string | null;
        fromEmail: string | null;
        fromName: string | null;
        enabled: boolean;
        updatedById: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["systemMailConfig"]>;
    composites: {};
};
export type SystemMailConfigGetPayload<S extends boolean | null | undefined | SystemMailConfigDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SystemMailConfigPayload, S>;
export type SystemMailConfigCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SystemMailConfigFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SystemMailConfigCountAggregateInputType | true;
};
export interface SystemMailConfigDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SystemMailConfig'];
        meta: {
            name: 'SystemMailConfig';
        };
    };
    findUnique<T extends SystemMailConfigFindUniqueArgs>(args: Prisma.SelectSubset<T, SystemMailConfigFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SystemMailConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemMailConfigPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SystemMailConfigFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SystemMailConfigFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SystemMailConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemMailConfigPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SystemMailConfigFindFirstArgs>(args?: Prisma.SelectSubset<T, SystemMailConfigFindFirstArgs<ExtArgs>>): Prisma.Prisma__SystemMailConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemMailConfigPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SystemMailConfigFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SystemMailConfigFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SystemMailConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemMailConfigPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SystemMailConfigFindManyArgs>(args?: Prisma.SelectSubset<T, SystemMailConfigFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SystemMailConfigPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SystemMailConfigCreateArgs>(args: Prisma.SelectSubset<T, SystemMailConfigCreateArgs<ExtArgs>>): Prisma.Prisma__SystemMailConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemMailConfigPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SystemMailConfigCreateManyArgs>(args?: Prisma.SelectSubset<T, SystemMailConfigCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends SystemMailConfigDeleteArgs>(args: Prisma.SelectSubset<T, SystemMailConfigDeleteArgs<ExtArgs>>): Prisma.Prisma__SystemMailConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemMailConfigPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SystemMailConfigUpdateArgs>(args: Prisma.SelectSubset<T, SystemMailConfigUpdateArgs<ExtArgs>>): Prisma.Prisma__SystemMailConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemMailConfigPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SystemMailConfigDeleteManyArgs>(args?: Prisma.SelectSubset<T, SystemMailConfigDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SystemMailConfigUpdateManyArgs>(args: Prisma.SelectSubset<T, SystemMailConfigUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends SystemMailConfigUpsertArgs>(args: Prisma.SelectSubset<T, SystemMailConfigUpsertArgs<ExtArgs>>): Prisma.Prisma__SystemMailConfigClient<runtime.Types.Result.GetResult<Prisma.$SystemMailConfigPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SystemMailConfigCountArgs>(args?: Prisma.Subset<T, SystemMailConfigCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SystemMailConfigCountAggregateOutputType> : number>;
    aggregate<T extends SystemMailConfigAggregateArgs>(args: Prisma.Subset<T, SystemMailConfigAggregateArgs>): Prisma.PrismaPromise<GetSystemMailConfigAggregateType<T>>;
    groupBy<T extends SystemMailConfigGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SystemMailConfigGroupByArgs['orderBy'];
    } : {
        orderBy?: SystemMailConfigGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SystemMailConfigGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemMailConfigGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SystemMailConfigFieldRefs;
}
export interface Prisma__SystemMailConfigClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    updatedBy<T extends Prisma.SystemMailConfig$updatedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SystemMailConfig$updatedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SystemMailConfigFieldRefs {
    readonly id: Prisma.FieldRef<"SystemMailConfig", 'String'>;
    readonly provider: Prisma.FieldRef<"SystemMailConfig", 'MailProvider'>;
    readonly smtpHost: Prisma.FieldRef<"SystemMailConfig", 'String'>;
    readonly smtpPort: Prisma.FieldRef<"SystemMailConfig", 'Int'>;
    readonly smtpSecure: Prisma.FieldRef<"SystemMailConfig", 'Boolean'>;
    readonly smtpUser: Prisma.FieldRef<"SystemMailConfig", 'String'>;
    readonly smtpPassEncrypted: Prisma.FieldRef<"SystemMailConfig", 'String'>;
    readonly fromEmail: Prisma.FieldRef<"SystemMailConfig", 'String'>;
    readonly fromName: Prisma.FieldRef<"SystemMailConfig", 'String'>;
    readonly enabled: Prisma.FieldRef<"SystemMailConfig", 'Boolean'>;
    readonly updatedById: Prisma.FieldRef<"SystemMailConfig", 'String'>;
    readonly createdAt: Prisma.FieldRef<"SystemMailConfig", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"SystemMailConfig", 'DateTime'>;
}
export type SystemMailConfigFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemMailConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemMailConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemMailConfigInclude<ExtArgs> | null;
    where: Prisma.SystemMailConfigWhereUniqueInput;
};
export type SystemMailConfigFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemMailConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemMailConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemMailConfigInclude<ExtArgs> | null;
    where: Prisma.SystemMailConfigWhereUniqueInput;
};
export type SystemMailConfigFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemMailConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemMailConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemMailConfigInclude<ExtArgs> | null;
    where?: Prisma.SystemMailConfigWhereInput;
    orderBy?: Prisma.SystemMailConfigOrderByWithRelationInput | Prisma.SystemMailConfigOrderByWithRelationInput[];
    cursor?: Prisma.SystemMailConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SystemMailConfigScalarFieldEnum | Prisma.SystemMailConfigScalarFieldEnum[];
};
export type SystemMailConfigFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemMailConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemMailConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemMailConfigInclude<ExtArgs> | null;
    where?: Prisma.SystemMailConfigWhereInput;
    orderBy?: Prisma.SystemMailConfigOrderByWithRelationInput | Prisma.SystemMailConfigOrderByWithRelationInput[];
    cursor?: Prisma.SystemMailConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SystemMailConfigScalarFieldEnum | Prisma.SystemMailConfigScalarFieldEnum[];
};
export type SystemMailConfigFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemMailConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemMailConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemMailConfigInclude<ExtArgs> | null;
    where?: Prisma.SystemMailConfigWhereInput;
    orderBy?: Prisma.SystemMailConfigOrderByWithRelationInput | Prisma.SystemMailConfigOrderByWithRelationInput[];
    cursor?: Prisma.SystemMailConfigWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SystemMailConfigScalarFieldEnum | Prisma.SystemMailConfigScalarFieldEnum[];
};
export type SystemMailConfigCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemMailConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemMailConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemMailConfigInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SystemMailConfigCreateInput, Prisma.SystemMailConfigUncheckedCreateInput>;
};
export type SystemMailConfigCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SystemMailConfigCreateManyInput | Prisma.SystemMailConfigCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SystemMailConfigUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemMailConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemMailConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemMailConfigInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SystemMailConfigUpdateInput, Prisma.SystemMailConfigUncheckedUpdateInput>;
    where: Prisma.SystemMailConfigWhereUniqueInput;
};
export type SystemMailConfigUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SystemMailConfigUpdateManyMutationInput, Prisma.SystemMailConfigUncheckedUpdateManyInput>;
    where?: Prisma.SystemMailConfigWhereInput;
    limit?: number;
};
export type SystemMailConfigUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemMailConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemMailConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemMailConfigInclude<ExtArgs> | null;
    where: Prisma.SystemMailConfigWhereUniqueInput;
    create: Prisma.XOR<Prisma.SystemMailConfigCreateInput, Prisma.SystemMailConfigUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SystemMailConfigUpdateInput, Prisma.SystemMailConfigUncheckedUpdateInput>;
};
export type SystemMailConfigDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemMailConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemMailConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemMailConfigInclude<ExtArgs> | null;
    where: Prisma.SystemMailConfigWhereUniqueInput;
};
export type SystemMailConfigDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SystemMailConfigWhereInput;
    limit?: number;
};
export type SystemMailConfig$updatedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type SystemMailConfigDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemMailConfigSelect<ExtArgs> | null;
    omit?: Prisma.SystemMailConfigOmit<ExtArgs> | null;
    include?: Prisma.SystemMailConfigInclude<ExtArgs> | null;
};
export {};
