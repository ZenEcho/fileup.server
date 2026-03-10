import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type PluginVersionModel = runtime.Types.Result.DefaultSelection<Prisma.$PluginVersionPayload>;
export type AggregatePluginVersion = {
    _count: PluginVersionCountAggregateOutputType | null;
    _min: PluginVersionMinAggregateOutputType | null;
    _max: PluginVersionMaxAggregateOutputType | null;
};
export type PluginVersionMinAggregateOutputType = {
    id: string | null;
    pluginId: string | null;
    version: string | null;
    changelog: string | null;
    status: $Enums.PluginStatus | null;
    auditLog: string | null;
    auditorId: string | null;
    deletedAt: Date | null;
    deletedById: string | null;
    deleteReason: string | null;
    createdAt: Date | null;
};
export type PluginVersionMaxAggregateOutputType = {
    id: string | null;
    pluginId: string | null;
    version: string | null;
    changelog: string | null;
    status: $Enums.PluginStatus | null;
    auditLog: string | null;
    auditorId: string | null;
    deletedAt: Date | null;
    deletedById: string | null;
    deleteReason: string | null;
    createdAt: Date | null;
};
export type PluginVersionCountAggregateOutputType = {
    id: number;
    pluginId: number;
    version: number;
    content: number;
    changelog: number;
    status: number;
    auditLog: number;
    auditorId: number;
    deletedAt: number;
    deletedById: number;
    deleteReason: number;
    createdAt: number;
    _all: number;
};
export type PluginVersionMinAggregateInputType = {
    id?: true;
    pluginId?: true;
    version?: true;
    changelog?: true;
    status?: true;
    auditLog?: true;
    auditorId?: true;
    deletedAt?: true;
    deletedById?: true;
    deleteReason?: true;
    createdAt?: true;
};
export type PluginVersionMaxAggregateInputType = {
    id?: true;
    pluginId?: true;
    version?: true;
    changelog?: true;
    status?: true;
    auditLog?: true;
    auditorId?: true;
    deletedAt?: true;
    deletedById?: true;
    deleteReason?: true;
    createdAt?: true;
};
export type PluginVersionCountAggregateInputType = {
    id?: true;
    pluginId?: true;
    version?: true;
    content?: true;
    changelog?: true;
    status?: true;
    auditLog?: true;
    auditorId?: true;
    deletedAt?: true;
    deletedById?: true;
    deleteReason?: true;
    createdAt?: true;
    _all?: true;
};
export type PluginVersionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginVersionWhereInput;
    orderBy?: Prisma.PluginVersionOrderByWithRelationInput | Prisma.PluginVersionOrderByWithRelationInput[];
    cursor?: Prisma.PluginVersionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PluginVersionCountAggregateInputType;
    _min?: PluginVersionMinAggregateInputType;
    _max?: PluginVersionMaxAggregateInputType;
};
export type GetPluginVersionAggregateType<T extends PluginVersionAggregateArgs> = {
    [P in keyof T & keyof AggregatePluginVersion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePluginVersion[P]> : Prisma.GetScalarType<T[P], AggregatePluginVersion[P]>;
};
export type PluginVersionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginVersionWhereInput;
    orderBy?: Prisma.PluginVersionOrderByWithAggregationInput | Prisma.PluginVersionOrderByWithAggregationInput[];
    by: Prisma.PluginVersionScalarFieldEnum[] | Prisma.PluginVersionScalarFieldEnum;
    having?: Prisma.PluginVersionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PluginVersionCountAggregateInputType | true;
    _min?: PluginVersionMinAggregateInputType;
    _max?: PluginVersionMaxAggregateInputType;
};
export type PluginVersionGroupByOutputType = {
    id: string;
    pluginId: string;
    version: string;
    content: runtime.JsonValue;
    changelog: string | null;
    status: $Enums.PluginStatus;
    auditLog: string | null;
    auditorId: string | null;
    deletedAt: Date | null;
    deletedById: string | null;
    deleteReason: string | null;
    createdAt: Date;
    _count: PluginVersionCountAggregateOutputType | null;
    _min: PluginVersionMinAggregateOutputType | null;
    _max: PluginVersionMaxAggregateOutputType | null;
};
type GetPluginVersionGroupByPayload<T extends PluginVersionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PluginVersionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PluginVersionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PluginVersionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PluginVersionGroupByOutputType[P]>;
}>>;
export type PluginVersionWhereInput = {
    AND?: Prisma.PluginVersionWhereInput | Prisma.PluginVersionWhereInput[];
    OR?: Prisma.PluginVersionWhereInput[];
    NOT?: Prisma.PluginVersionWhereInput | Prisma.PluginVersionWhereInput[];
    id?: Prisma.StringFilter<"PluginVersion"> | string;
    pluginId?: Prisma.StringFilter<"PluginVersion"> | string;
    version?: Prisma.StringFilter<"PluginVersion"> | string;
    content?: Prisma.JsonFilter<"PluginVersion">;
    changelog?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    status?: Prisma.EnumPluginStatusFilter<"PluginVersion"> | $Enums.PluginStatus;
    auditLog?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    auditorId?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"PluginVersion"> | Date | string | null;
    deletedById?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    deleteReason?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PluginVersion"> | Date | string;
    plugin?: Prisma.XOR<Prisma.PluginScalarRelationFilter, Prisma.PluginWhereInput>;
    activeForPlugins?: Prisma.PluginListRelationFilter;
    auditor?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    deletedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type PluginVersionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    changelog?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    auditLog?: Prisma.SortOrderInput | Prisma.SortOrder;
    auditorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleteReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    plugin?: Prisma.PluginOrderByWithRelationInput;
    activeForPlugins?: Prisma.PluginOrderByRelationAggregateInput;
    auditor?: Prisma.UserOrderByWithRelationInput;
    deletedBy?: Prisma.UserOrderByWithRelationInput;
    _relevance?: Prisma.PluginVersionOrderByRelevanceInput;
};
export type PluginVersionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    pluginId_version?: Prisma.PluginVersionPluginIdVersionCompoundUniqueInput;
    AND?: Prisma.PluginVersionWhereInput | Prisma.PluginVersionWhereInput[];
    OR?: Prisma.PluginVersionWhereInput[];
    NOT?: Prisma.PluginVersionWhereInput | Prisma.PluginVersionWhereInput[];
    pluginId?: Prisma.StringFilter<"PluginVersion"> | string;
    version?: Prisma.StringFilter<"PluginVersion"> | string;
    content?: Prisma.JsonFilter<"PluginVersion">;
    changelog?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    status?: Prisma.EnumPluginStatusFilter<"PluginVersion"> | $Enums.PluginStatus;
    auditLog?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    auditorId?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"PluginVersion"> | Date | string | null;
    deletedById?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    deleteReason?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PluginVersion"> | Date | string;
    plugin?: Prisma.XOR<Prisma.PluginScalarRelationFilter, Prisma.PluginWhereInput>;
    activeForPlugins?: Prisma.PluginListRelationFilter;
    auditor?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    deletedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id" | "pluginId_version">;
export type PluginVersionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    changelog?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    auditLog?: Prisma.SortOrderInput | Prisma.SortOrder;
    auditorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    deletedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    deleteReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PluginVersionCountOrderByAggregateInput;
    _max?: Prisma.PluginVersionMaxOrderByAggregateInput;
    _min?: Prisma.PluginVersionMinOrderByAggregateInput;
};
export type PluginVersionScalarWhereWithAggregatesInput = {
    AND?: Prisma.PluginVersionScalarWhereWithAggregatesInput | Prisma.PluginVersionScalarWhereWithAggregatesInput[];
    OR?: Prisma.PluginVersionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PluginVersionScalarWhereWithAggregatesInput | Prisma.PluginVersionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PluginVersion"> | string;
    pluginId?: Prisma.StringWithAggregatesFilter<"PluginVersion"> | string;
    version?: Prisma.StringWithAggregatesFilter<"PluginVersion"> | string;
    content?: Prisma.JsonWithAggregatesFilter<"PluginVersion">;
    changelog?: Prisma.StringNullableWithAggregatesFilter<"PluginVersion"> | string | null;
    status?: Prisma.EnumPluginStatusWithAggregatesFilter<"PluginVersion"> | $Enums.PluginStatus;
    auditLog?: Prisma.StringNullableWithAggregatesFilter<"PluginVersion"> | string | null;
    auditorId?: Prisma.StringNullableWithAggregatesFilter<"PluginVersion"> | string | null;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PluginVersion"> | Date | string | null;
    deletedById?: Prisma.StringNullableWithAggregatesFilter<"PluginVersion"> | string | null;
    deleteReason?: Prisma.StringNullableWithAggregatesFilter<"PluginVersion"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PluginVersion"> | Date | string;
};
export type PluginVersionCreateInput = {
    id?: string;
    version: string;
    content: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: string | null;
    status?: $Enums.PluginStatus;
    auditLog?: string | null;
    deletedAt?: Date | string | null;
    deleteReason?: string | null;
    createdAt?: Date | string;
    plugin: Prisma.PluginCreateNestedOneWithoutVersionsInput;
    activeForPlugins?: Prisma.PluginCreateNestedManyWithoutActiveVersionInput;
    auditor?: Prisma.UserCreateNestedOneWithoutReviewedVersionsInput;
    deletedBy?: Prisma.UserCreateNestedOneWithoutDeletedPluginVersionsInput;
};
export type PluginVersionUncheckedCreateInput = {
    id?: string;
    pluginId: string;
    version: string;
    content: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: string | null;
    status?: $Enums.PluginStatus;
    auditLog?: string | null;
    auditorId?: string | null;
    deletedAt?: Date | string | null;
    deletedById?: string | null;
    deleteReason?: string | null;
    createdAt?: Date | string;
    activeForPlugins?: Prisma.PluginUncheckedCreateNestedManyWithoutActiveVersionInput;
};
export type PluginVersionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plugin?: Prisma.PluginUpdateOneRequiredWithoutVersionsNestedInput;
    activeForPlugins?: Prisma.PluginUpdateManyWithoutActiveVersionNestedInput;
    auditor?: Prisma.UserUpdateOneWithoutReviewedVersionsNestedInput;
    deletedBy?: Prisma.UserUpdateOneWithoutDeletedPluginVersionsNestedInput;
};
export type PluginVersionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auditorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activeForPlugins?: Prisma.PluginUncheckedUpdateManyWithoutActiveVersionNestedInput;
};
export type PluginVersionCreateManyInput = {
    id?: string;
    pluginId: string;
    version: string;
    content: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: string | null;
    status?: $Enums.PluginStatus;
    auditLog?: string | null;
    auditorId?: string | null;
    deletedAt?: Date | string | null;
    deletedById?: string | null;
    deleteReason?: string | null;
    createdAt?: Date | string;
};
export type PluginVersionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginVersionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auditorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginVersionListRelationFilter = {
    every?: Prisma.PluginVersionWhereInput;
    some?: Prisma.PluginVersionWhereInput;
    none?: Prisma.PluginVersionWhereInput;
};
export type PluginVersionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PluginVersionNullableScalarRelationFilter = {
    is?: Prisma.PluginVersionWhereInput | null;
    isNot?: Prisma.PluginVersionWhereInput | null;
};
export type PluginVersionOrderByRelevanceInput = {
    fields: Prisma.PluginVersionOrderByRelevanceFieldEnum | Prisma.PluginVersionOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type PluginVersionPluginIdVersionCompoundUniqueInput = {
    pluginId: string;
    version: string;
};
export type PluginVersionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    changelog?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    auditLog?: Prisma.SortOrder;
    auditorId?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    deletedById?: Prisma.SortOrder;
    deleteReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PluginVersionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    changelog?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    auditLog?: Prisma.SortOrder;
    auditorId?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    deletedById?: Prisma.SortOrder;
    deleteReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PluginVersionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    version?: Prisma.SortOrder;
    changelog?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    auditLog?: Prisma.SortOrder;
    auditorId?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
    deletedById?: Prisma.SortOrder;
    deleteReason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PluginVersionCreateNestedManyWithoutAuditorInput = {
    create?: Prisma.XOR<Prisma.PluginVersionCreateWithoutAuditorInput, Prisma.PluginVersionUncheckedCreateWithoutAuditorInput> | Prisma.PluginVersionCreateWithoutAuditorInput[] | Prisma.PluginVersionUncheckedCreateWithoutAuditorInput[];
    connectOrCreate?: Prisma.PluginVersionCreateOrConnectWithoutAuditorInput | Prisma.PluginVersionCreateOrConnectWithoutAuditorInput[];
    createMany?: Prisma.PluginVersionCreateManyAuditorInputEnvelope;
    connect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
};
export type PluginVersionCreateNestedManyWithoutDeletedByInput = {
    create?: Prisma.XOR<Prisma.PluginVersionCreateWithoutDeletedByInput, Prisma.PluginVersionUncheckedCreateWithoutDeletedByInput> | Prisma.PluginVersionCreateWithoutDeletedByInput[] | Prisma.PluginVersionUncheckedCreateWithoutDeletedByInput[];
    connectOrCreate?: Prisma.PluginVersionCreateOrConnectWithoutDeletedByInput | Prisma.PluginVersionCreateOrConnectWithoutDeletedByInput[];
    createMany?: Prisma.PluginVersionCreateManyDeletedByInputEnvelope;
    connect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
};
export type PluginVersionUncheckedCreateNestedManyWithoutAuditorInput = {
    create?: Prisma.XOR<Prisma.PluginVersionCreateWithoutAuditorInput, Prisma.PluginVersionUncheckedCreateWithoutAuditorInput> | Prisma.PluginVersionCreateWithoutAuditorInput[] | Prisma.PluginVersionUncheckedCreateWithoutAuditorInput[];
    connectOrCreate?: Prisma.PluginVersionCreateOrConnectWithoutAuditorInput | Prisma.PluginVersionCreateOrConnectWithoutAuditorInput[];
    createMany?: Prisma.PluginVersionCreateManyAuditorInputEnvelope;
    connect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
};
export type PluginVersionUncheckedCreateNestedManyWithoutDeletedByInput = {
    create?: Prisma.XOR<Prisma.PluginVersionCreateWithoutDeletedByInput, Prisma.PluginVersionUncheckedCreateWithoutDeletedByInput> | Prisma.PluginVersionCreateWithoutDeletedByInput[] | Prisma.PluginVersionUncheckedCreateWithoutDeletedByInput[];
    connectOrCreate?: Prisma.PluginVersionCreateOrConnectWithoutDeletedByInput | Prisma.PluginVersionCreateOrConnectWithoutDeletedByInput[];
    createMany?: Prisma.PluginVersionCreateManyDeletedByInputEnvelope;
    connect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
};
export type PluginVersionUpdateManyWithoutAuditorNestedInput = {
    create?: Prisma.XOR<Prisma.PluginVersionCreateWithoutAuditorInput, Prisma.PluginVersionUncheckedCreateWithoutAuditorInput> | Prisma.PluginVersionCreateWithoutAuditorInput[] | Prisma.PluginVersionUncheckedCreateWithoutAuditorInput[];
    connectOrCreate?: Prisma.PluginVersionCreateOrConnectWithoutAuditorInput | Prisma.PluginVersionCreateOrConnectWithoutAuditorInput[];
    upsert?: Prisma.PluginVersionUpsertWithWhereUniqueWithoutAuditorInput | Prisma.PluginVersionUpsertWithWhereUniqueWithoutAuditorInput[];
    createMany?: Prisma.PluginVersionCreateManyAuditorInputEnvelope;
    set?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    disconnect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    delete?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    connect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    update?: Prisma.PluginVersionUpdateWithWhereUniqueWithoutAuditorInput | Prisma.PluginVersionUpdateWithWhereUniqueWithoutAuditorInput[];
    updateMany?: Prisma.PluginVersionUpdateManyWithWhereWithoutAuditorInput | Prisma.PluginVersionUpdateManyWithWhereWithoutAuditorInput[];
    deleteMany?: Prisma.PluginVersionScalarWhereInput | Prisma.PluginVersionScalarWhereInput[];
};
export type PluginVersionUpdateManyWithoutDeletedByNestedInput = {
    create?: Prisma.XOR<Prisma.PluginVersionCreateWithoutDeletedByInput, Prisma.PluginVersionUncheckedCreateWithoutDeletedByInput> | Prisma.PluginVersionCreateWithoutDeletedByInput[] | Prisma.PluginVersionUncheckedCreateWithoutDeletedByInput[];
    connectOrCreate?: Prisma.PluginVersionCreateOrConnectWithoutDeletedByInput | Prisma.PluginVersionCreateOrConnectWithoutDeletedByInput[];
    upsert?: Prisma.PluginVersionUpsertWithWhereUniqueWithoutDeletedByInput | Prisma.PluginVersionUpsertWithWhereUniqueWithoutDeletedByInput[];
    createMany?: Prisma.PluginVersionCreateManyDeletedByInputEnvelope;
    set?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    disconnect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    delete?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    connect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    update?: Prisma.PluginVersionUpdateWithWhereUniqueWithoutDeletedByInput | Prisma.PluginVersionUpdateWithWhereUniqueWithoutDeletedByInput[];
    updateMany?: Prisma.PluginVersionUpdateManyWithWhereWithoutDeletedByInput | Prisma.PluginVersionUpdateManyWithWhereWithoutDeletedByInput[];
    deleteMany?: Prisma.PluginVersionScalarWhereInput | Prisma.PluginVersionScalarWhereInput[];
};
export type PluginVersionUncheckedUpdateManyWithoutAuditorNestedInput = {
    create?: Prisma.XOR<Prisma.PluginVersionCreateWithoutAuditorInput, Prisma.PluginVersionUncheckedCreateWithoutAuditorInput> | Prisma.PluginVersionCreateWithoutAuditorInput[] | Prisma.PluginVersionUncheckedCreateWithoutAuditorInput[];
    connectOrCreate?: Prisma.PluginVersionCreateOrConnectWithoutAuditorInput | Prisma.PluginVersionCreateOrConnectWithoutAuditorInput[];
    upsert?: Prisma.PluginVersionUpsertWithWhereUniqueWithoutAuditorInput | Prisma.PluginVersionUpsertWithWhereUniqueWithoutAuditorInput[];
    createMany?: Prisma.PluginVersionCreateManyAuditorInputEnvelope;
    set?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    disconnect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    delete?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    connect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    update?: Prisma.PluginVersionUpdateWithWhereUniqueWithoutAuditorInput | Prisma.PluginVersionUpdateWithWhereUniqueWithoutAuditorInput[];
    updateMany?: Prisma.PluginVersionUpdateManyWithWhereWithoutAuditorInput | Prisma.PluginVersionUpdateManyWithWhereWithoutAuditorInput[];
    deleteMany?: Prisma.PluginVersionScalarWhereInput | Prisma.PluginVersionScalarWhereInput[];
};
export type PluginVersionUncheckedUpdateManyWithoutDeletedByNestedInput = {
    create?: Prisma.XOR<Prisma.PluginVersionCreateWithoutDeletedByInput, Prisma.PluginVersionUncheckedCreateWithoutDeletedByInput> | Prisma.PluginVersionCreateWithoutDeletedByInput[] | Prisma.PluginVersionUncheckedCreateWithoutDeletedByInput[];
    connectOrCreate?: Prisma.PluginVersionCreateOrConnectWithoutDeletedByInput | Prisma.PluginVersionCreateOrConnectWithoutDeletedByInput[];
    upsert?: Prisma.PluginVersionUpsertWithWhereUniqueWithoutDeletedByInput | Prisma.PluginVersionUpsertWithWhereUniqueWithoutDeletedByInput[];
    createMany?: Prisma.PluginVersionCreateManyDeletedByInputEnvelope;
    set?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    disconnect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    delete?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    connect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    update?: Prisma.PluginVersionUpdateWithWhereUniqueWithoutDeletedByInput | Prisma.PluginVersionUpdateWithWhereUniqueWithoutDeletedByInput[];
    updateMany?: Prisma.PluginVersionUpdateManyWithWhereWithoutDeletedByInput | Prisma.PluginVersionUpdateManyWithWhereWithoutDeletedByInput[];
    deleteMany?: Prisma.PluginVersionScalarWhereInput | Prisma.PluginVersionScalarWhereInput[];
};
export type PluginVersionCreateNestedManyWithoutPluginInput = {
    create?: Prisma.XOR<Prisma.PluginVersionCreateWithoutPluginInput, Prisma.PluginVersionUncheckedCreateWithoutPluginInput> | Prisma.PluginVersionCreateWithoutPluginInput[] | Prisma.PluginVersionUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginVersionCreateOrConnectWithoutPluginInput | Prisma.PluginVersionCreateOrConnectWithoutPluginInput[];
    createMany?: Prisma.PluginVersionCreateManyPluginInputEnvelope;
    connect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
};
export type PluginVersionCreateNestedOneWithoutActiveForPluginsInput = {
    create?: Prisma.XOR<Prisma.PluginVersionCreateWithoutActiveForPluginsInput, Prisma.PluginVersionUncheckedCreateWithoutActiveForPluginsInput>;
    connectOrCreate?: Prisma.PluginVersionCreateOrConnectWithoutActiveForPluginsInput;
    connect?: Prisma.PluginVersionWhereUniqueInput;
};
export type PluginVersionUncheckedCreateNestedManyWithoutPluginInput = {
    create?: Prisma.XOR<Prisma.PluginVersionCreateWithoutPluginInput, Prisma.PluginVersionUncheckedCreateWithoutPluginInput> | Prisma.PluginVersionCreateWithoutPluginInput[] | Prisma.PluginVersionUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginVersionCreateOrConnectWithoutPluginInput | Prisma.PluginVersionCreateOrConnectWithoutPluginInput[];
    createMany?: Prisma.PluginVersionCreateManyPluginInputEnvelope;
    connect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
};
export type PluginVersionUpdateManyWithoutPluginNestedInput = {
    create?: Prisma.XOR<Prisma.PluginVersionCreateWithoutPluginInput, Prisma.PluginVersionUncheckedCreateWithoutPluginInput> | Prisma.PluginVersionCreateWithoutPluginInput[] | Prisma.PluginVersionUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginVersionCreateOrConnectWithoutPluginInput | Prisma.PluginVersionCreateOrConnectWithoutPluginInput[];
    upsert?: Prisma.PluginVersionUpsertWithWhereUniqueWithoutPluginInput | Prisma.PluginVersionUpsertWithWhereUniqueWithoutPluginInput[];
    createMany?: Prisma.PluginVersionCreateManyPluginInputEnvelope;
    set?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    disconnect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    delete?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    connect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    update?: Prisma.PluginVersionUpdateWithWhereUniqueWithoutPluginInput | Prisma.PluginVersionUpdateWithWhereUniqueWithoutPluginInput[];
    updateMany?: Prisma.PluginVersionUpdateManyWithWhereWithoutPluginInput | Prisma.PluginVersionUpdateManyWithWhereWithoutPluginInput[];
    deleteMany?: Prisma.PluginVersionScalarWhereInput | Prisma.PluginVersionScalarWhereInput[];
};
export type PluginVersionUpdateOneWithoutActiveForPluginsNestedInput = {
    create?: Prisma.XOR<Prisma.PluginVersionCreateWithoutActiveForPluginsInput, Prisma.PluginVersionUncheckedCreateWithoutActiveForPluginsInput>;
    connectOrCreate?: Prisma.PluginVersionCreateOrConnectWithoutActiveForPluginsInput;
    upsert?: Prisma.PluginVersionUpsertWithoutActiveForPluginsInput;
    disconnect?: Prisma.PluginVersionWhereInput | boolean;
    delete?: Prisma.PluginVersionWhereInput | boolean;
    connect?: Prisma.PluginVersionWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PluginVersionUpdateToOneWithWhereWithoutActiveForPluginsInput, Prisma.PluginVersionUpdateWithoutActiveForPluginsInput>, Prisma.PluginVersionUncheckedUpdateWithoutActiveForPluginsInput>;
};
export type PluginVersionUncheckedUpdateManyWithoutPluginNestedInput = {
    create?: Prisma.XOR<Prisma.PluginVersionCreateWithoutPluginInput, Prisma.PluginVersionUncheckedCreateWithoutPluginInput> | Prisma.PluginVersionCreateWithoutPluginInput[] | Prisma.PluginVersionUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginVersionCreateOrConnectWithoutPluginInput | Prisma.PluginVersionCreateOrConnectWithoutPluginInput[];
    upsert?: Prisma.PluginVersionUpsertWithWhereUniqueWithoutPluginInput | Prisma.PluginVersionUpsertWithWhereUniqueWithoutPluginInput[];
    createMany?: Prisma.PluginVersionCreateManyPluginInputEnvelope;
    set?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    disconnect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    delete?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    connect?: Prisma.PluginVersionWhereUniqueInput | Prisma.PluginVersionWhereUniqueInput[];
    update?: Prisma.PluginVersionUpdateWithWhereUniqueWithoutPluginInput | Prisma.PluginVersionUpdateWithWhereUniqueWithoutPluginInput[];
    updateMany?: Prisma.PluginVersionUpdateManyWithWhereWithoutPluginInput | Prisma.PluginVersionUpdateManyWithWhereWithoutPluginInput[];
    deleteMany?: Prisma.PluginVersionScalarWhereInput | Prisma.PluginVersionScalarWhereInput[];
};
export type EnumPluginStatusFieldUpdateOperationsInput = {
    set?: $Enums.PluginStatus;
};
export type PluginVersionCreateWithoutAuditorInput = {
    id?: string;
    version: string;
    content: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: string | null;
    status?: $Enums.PluginStatus;
    auditLog?: string | null;
    deletedAt?: Date | string | null;
    deleteReason?: string | null;
    createdAt?: Date | string;
    plugin: Prisma.PluginCreateNestedOneWithoutVersionsInput;
    activeForPlugins?: Prisma.PluginCreateNestedManyWithoutActiveVersionInput;
    deletedBy?: Prisma.UserCreateNestedOneWithoutDeletedPluginVersionsInput;
};
export type PluginVersionUncheckedCreateWithoutAuditorInput = {
    id?: string;
    pluginId: string;
    version: string;
    content: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: string | null;
    status?: $Enums.PluginStatus;
    auditLog?: string | null;
    deletedAt?: Date | string | null;
    deletedById?: string | null;
    deleteReason?: string | null;
    createdAt?: Date | string;
    activeForPlugins?: Prisma.PluginUncheckedCreateNestedManyWithoutActiveVersionInput;
};
export type PluginVersionCreateOrConnectWithoutAuditorInput = {
    where: Prisma.PluginVersionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginVersionCreateWithoutAuditorInput, Prisma.PluginVersionUncheckedCreateWithoutAuditorInput>;
};
export type PluginVersionCreateManyAuditorInputEnvelope = {
    data: Prisma.PluginVersionCreateManyAuditorInput | Prisma.PluginVersionCreateManyAuditorInput[];
    skipDuplicates?: boolean;
};
export type PluginVersionCreateWithoutDeletedByInput = {
    id?: string;
    version: string;
    content: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: string | null;
    status?: $Enums.PluginStatus;
    auditLog?: string | null;
    deletedAt?: Date | string | null;
    deleteReason?: string | null;
    createdAt?: Date | string;
    plugin: Prisma.PluginCreateNestedOneWithoutVersionsInput;
    activeForPlugins?: Prisma.PluginCreateNestedManyWithoutActiveVersionInput;
    auditor?: Prisma.UserCreateNestedOneWithoutReviewedVersionsInput;
};
export type PluginVersionUncheckedCreateWithoutDeletedByInput = {
    id?: string;
    pluginId: string;
    version: string;
    content: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: string | null;
    status?: $Enums.PluginStatus;
    auditLog?: string | null;
    auditorId?: string | null;
    deletedAt?: Date | string | null;
    deleteReason?: string | null;
    createdAt?: Date | string;
    activeForPlugins?: Prisma.PluginUncheckedCreateNestedManyWithoutActiveVersionInput;
};
export type PluginVersionCreateOrConnectWithoutDeletedByInput = {
    where: Prisma.PluginVersionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginVersionCreateWithoutDeletedByInput, Prisma.PluginVersionUncheckedCreateWithoutDeletedByInput>;
};
export type PluginVersionCreateManyDeletedByInputEnvelope = {
    data: Prisma.PluginVersionCreateManyDeletedByInput | Prisma.PluginVersionCreateManyDeletedByInput[];
    skipDuplicates?: boolean;
};
export type PluginVersionUpsertWithWhereUniqueWithoutAuditorInput = {
    where: Prisma.PluginVersionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PluginVersionUpdateWithoutAuditorInput, Prisma.PluginVersionUncheckedUpdateWithoutAuditorInput>;
    create: Prisma.XOR<Prisma.PluginVersionCreateWithoutAuditorInput, Prisma.PluginVersionUncheckedCreateWithoutAuditorInput>;
};
export type PluginVersionUpdateWithWhereUniqueWithoutAuditorInput = {
    where: Prisma.PluginVersionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PluginVersionUpdateWithoutAuditorInput, Prisma.PluginVersionUncheckedUpdateWithoutAuditorInput>;
};
export type PluginVersionUpdateManyWithWhereWithoutAuditorInput = {
    where: Prisma.PluginVersionScalarWhereInput;
    data: Prisma.XOR<Prisma.PluginVersionUpdateManyMutationInput, Prisma.PluginVersionUncheckedUpdateManyWithoutAuditorInput>;
};
export type PluginVersionScalarWhereInput = {
    AND?: Prisma.PluginVersionScalarWhereInput | Prisma.PluginVersionScalarWhereInput[];
    OR?: Prisma.PluginVersionScalarWhereInput[];
    NOT?: Prisma.PluginVersionScalarWhereInput | Prisma.PluginVersionScalarWhereInput[];
    id?: Prisma.StringFilter<"PluginVersion"> | string;
    pluginId?: Prisma.StringFilter<"PluginVersion"> | string;
    version?: Prisma.StringFilter<"PluginVersion"> | string;
    content?: Prisma.JsonFilter<"PluginVersion">;
    changelog?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    status?: Prisma.EnumPluginStatusFilter<"PluginVersion"> | $Enums.PluginStatus;
    auditLog?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    auditorId?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    deletedAt?: Prisma.DateTimeNullableFilter<"PluginVersion"> | Date | string | null;
    deletedById?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    deleteReason?: Prisma.StringNullableFilter<"PluginVersion"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PluginVersion"> | Date | string;
};
export type PluginVersionUpsertWithWhereUniqueWithoutDeletedByInput = {
    where: Prisma.PluginVersionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PluginVersionUpdateWithoutDeletedByInput, Prisma.PluginVersionUncheckedUpdateWithoutDeletedByInput>;
    create: Prisma.XOR<Prisma.PluginVersionCreateWithoutDeletedByInput, Prisma.PluginVersionUncheckedCreateWithoutDeletedByInput>;
};
export type PluginVersionUpdateWithWhereUniqueWithoutDeletedByInput = {
    where: Prisma.PluginVersionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PluginVersionUpdateWithoutDeletedByInput, Prisma.PluginVersionUncheckedUpdateWithoutDeletedByInput>;
};
export type PluginVersionUpdateManyWithWhereWithoutDeletedByInput = {
    where: Prisma.PluginVersionScalarWhereInput;
    data: Prisma.XOR<Prisma.PluginVersionUpdateManyMutationInput, Prisma.PluginVersionUncheckedUpdateManyWithoutDeletedByInput>;
};
export type PluginVersionCreateWithoutPluginInput = {
    id?: string;
    version: string;
    content: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: string | null;
    status?: $Enums.PluginStatus;
    auditLog?: string | null;
    deletedAt?: Date | string | null;
    deleteReason?: string | null;
    createdAt?: Date | string;
    activeForPlugins?: Prisma.PluginCreateNestedManyWithoutActiveVersionInput;
    auditor?: Prisma.UserCreateNestedOneWithoutReviewedVersionsInput;
    deletedBy?: Prisma.UserCreateNestedOneWithoutDeletedPluginVersionsInput;
};
export type PluginVersionUncheckedCreateWithoutPluginInput = {
    id?: string;
    version: string;
    content: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: string | null;
    status?: $Enums.PluginStatus;
    auditLog?: string | null;
    auditorId?: string | null;
    deletedAt?: Date | string | null;
    deletedById?: string | null;
    deleteReason?: string | null;
    createdAt?: Date | string;
    activeForPlugins?: Prisma.PluginUncheckedCreateNestedManyWithoutActiveVersionInput;
};
export type PluginVersionCreateOrConnectWithoutPluginInput = {
    where: Prisma.PluginVersionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginVersionCreateWithoutPluginInput, Prisma.PluginVersionUncheckedCreateWithoutPluginInput>;
};
export type PluginVersionCreateManyPluginInputEnvelope = {
    data: Prisma.PluginVersionCreateManyPluginInput | Prisma.PluginVersionCreateManyPluginInput[];
    skipDuplicates?: boolean;
};
export type PluginVersionCreateWithoutActiveForPluginsInput = {
    id?: string;
    version: string;
    content: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: string | null;
    status?: $Enums.PluginStatus;
    auditLog?: string | null;
    deletedAt?: Date | string | null;
    deleteReason?: string | null;
    createdAt?: Date | string;
    plugin: Prisma.PluginCreateNestedOneWithoutVersionsInput;
    auditor?: Prisma.UserCreateNestedOneWithoutReviewedVersionsInput;
    deletedBy?: Prisma.UserCreateNestedOneWithoutDeletedPluginVersionsInput;
};
export type PluginVersionUncheckedCreateWithoutActiveForPluginsInput = {
    id?: string;
    pluginId: string;
    version: string;
    content: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: string | null;
    status?: $Enums.PluginStatus;
    auditLog?: string | null;
    auditorId?: string | null;
    deletedAt?: Date | string | null;
    deletedById?: string | null;
    deleteReason?: string | null;
    createdAt?: Date | string;
};
export type PluginVersionCreateOrConnectWithoutActiveForPluginsInput = {
    where: Prisma.PluginVersionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginVersionCreateWithoutActiveForPluginsInput, Prisma.PluginVersionUncheckedCreateWithoutActiveForPluginsInput>;
};
export type PluginVersionUpsertWithWhereUniqueWithoutPluginInput = {
    where: Prisma.PluginVersionWhereUniqueInput;
    update: Prisma.XOR<Prisma.PluginVersionUpdateWithoutPluginInput, Prisma.PluginVersionUncheckedUpdateWithoutPluginInput>;
    create: Prisma.XOR<Prisma.PluginVersionCreateWithoutPluginInput, Prisma.PluginVersionUncheckedCreateWithoutPluginInput>;
};
export type PluginVersionUpdateWithWhereUniqueWithoutPluginInput = {
    where: Prisma.PluginVersionWhereUniqueInput;
    data: Prisma.XOR<Prisma.PluginVersionUpdateWithoutPluginInput, Prisma.PluginVersionUncheckedUpdateWithoutPluginInput>;
};
export type PluginVersionUpdateManyWithWhereWithoutPluginInput = {
    where: Prisma.PluginVersionScalarWhereInput;
    data: Prisma.XOR<Prisma.PluginVersionUpdateManyMutationInput, Prisma.PluginVersionUncheckedUpdateManyWithoutPluginInput>;
};
export type PluginVersionUpsertWithoutActiveForPluginsInput = {
    update: Prisma.XOR<Prisma.PluginVersionUpdateWithoutActiveForPluginsInput, Prisma.PluginVersionUncheckedUpdateWithoutActiveForPluginsInput>;
    create: Prisma.XOR<Prisma.PluginVersionCreateWithoutActiveForPluginsInput, Prisma.PluginVersionUncheckedCreateWithoutActiveForPluginsInput>;
    where?: Prisma.PluginVersionWhereInput;
};
export type PluginVersionUpdateToOneWithWhereWithoutActiveForPluginsInput = {
    where?: Prisma.PluginVersionWhereInput;
    data: Prisma.XOR<Prisma.PluginVersionUpdateWithoutActiveForPluginsInput, Prisma.PluginVersionUncheckedUpdateWithoutActiveForPluginsInput>;
};
export type PluginVersionUpdateWithoutActiveForPluginsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plugin?: Prisma.PluginUpdateOneRequiredWithoutVersionsNestedInput;
    auditor?: Prisma.UserUpdateOneWithoutReviewedVersionsNestedInput;
    deletedBy?: Prisma.UserUpdateOneWithoutDeletedPluginVersionsNestedInput;
};
export type PluginVersionUncheckedUpdateWithoutActiveForPluginsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auditorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginVersionCreateManyAuditorInput = {
    id?: string;
    pluginId: string;
    version: string;
    content: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: string | null;
    status?: $Enums.PluginStatus;
    auditLog?: string | null;
    deletedAt?: Date | string | null;
    deletedById?: string | null;
    deleteReason?: string | null;
    createdAt?: Date | string;
};
export type PluginVersionCreateManyDeletedByInput = {
    id?: string;
    pluginId: string;
    version: string;
    content: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: string | null;
    status?: $Enums.PluginStatus;
    auditLog?: string | null;
    auditorId?: string | null;
    deletedAt?: Date | string | null;
    deleteReason?: string | null;
    createdAt?: Date | string;
};
export type PluginVersionUpdateWithoutAuditorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plugin?: Prisma.PluginUpdateOneRequiredWithoutVersionsNestedInput;
    activeForPlugins?: Prisma.PluginUpdateManyWithoutActiveVersionNestedInput;
    deletedBy?: Prisma.UserUpdateOneWithoutDeletedPluginVersionsNestedInput;
};
export type PluginVersionUncheckedUpdateWithoutAuditorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activeForPlugins?: Prisma.PluginUncheckedUpdateManyWithoutActiveVersionNestedInput;
};
export type PluginVersionUncheckedUpdateManyWithoutAuditorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginVersionUpdateWithoutDeletedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plugin?: Prisma.PluginUpdateOneRequiredWithoutVersionsNestedInput;
    activeForPlugins?: Prisma.PluginUpdateManyWithoutActiveVersionNestedInput;
    auditor?: Prisma.UserUpdateOneWithoutReviewedVersionsNestedInput;
};
export type PluginVersionUncheckedUpdateWithoutDeletedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auditorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activeForPlugins?: Prisma.PluginUncheckedUpdateManyWithoutActiveVersionNestedInput;
};
export type PluginVersionUncheckedUpdateManyWithoutDeletedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auditorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginVersionCreateManyPluginInput = {
    id?: string;
    version: string;
    content: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: string | null;
    status?: $Enums.PluginStatus;
    auditLog?: string | null;
    auditorId?: string | null;
    deletedAt?: Date | string | null;
    deletedById?: string | null;
    deleteReason?: string | null;
    createdAt?: Date | string;
};
export type PluginVersionUpdateWithoutPluginInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activeForPlugins?: Prisma.PluginUpdateManyWithoutActiveVersionNestedInput;
    auditor?: Prisma.UserUpdateOneWithoutReviewedVersionsNestedInput;
    deletedBy?: Prisma.UserUpdateOneWithoutDeletedPluginVersionsNestedInput;
};
export type PluginVersionUncheckedUpdateWithoutPluginInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auditorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    activeForPlugins?: Prisma.PluginUncheckedUpdateManyWithoutActiveVersionNestedInput;
};
export type PluginVersionUncheckedUpdateManyWithoutPluginInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    version?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.JsonNullValueInput | runtime.InputJsonValue;
    changelog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.EnumPluginStatusFieldUpdateOperationsInput | $Enums.PluginStatus;
    auditLog?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    auditorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    deletedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    deleteReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginVersionCountOutputType = {
    activeForPlugins: number;
};
export type PluginVersionCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    activeForPlugins?: boolean | PluginVersionCountOutputTypeCountActiveForPluginsArgs;
};
export type PluginVersionCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionCountOutputTypeSelect<ExtArgs> | null;
};
export type PluginVersionCountOutputTypeCountActiveForPluginsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginWhereInput;
};
export type PluginVersionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    pluginId?: boolean;
    version?: boolean;
    content?: boolean;
    changelog?: boolean;
    status?: boolean;
    auditLog?: boolean;
    auditorId?: boolean;
    deletedAt?: boolean;
    deletedById?: boolean;
    deleteReason?: boolean;
    createdAt?: boolean;
    plugin?: boolean | Prisma.PluginDefaultArgs<ExtArgs>;
    activeForPlugins?: boolean | Prisma.PluginVersion$activeForPluginsArgs<ExtArgs>;
    auditor?: boolean | Prisma.PluginVersion$auditorArgs<ExtArgs>;
    deletedBy?: boolean | Prisma.PluginVersion$deletedByArgs<ExtArgs>;
    _count?: boolean | Prisma.PluginVersionCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pluginVersion"]>;
export type PluginVersionSelectScalar = {
    id?: boolean;
    pluginId?: boolean;
    version?: boolean;
    content?: boolean;
    changelog?: boolean;
    status?: boolean;
    auditLog?: boolean;
    auditorId?: boolean;
    deletedAt?: boolean;
    deletedById?: boolean;
    deleteReason?: boolean;
    createdAt?: boolean;
};
export type PluginVersionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "pluginId" | "version" | "content" | "changelog" | "status" | "auditLog" | "auditorId" | "deletedAt" | "deletedById" | "deleteReason" | "createdAt", ExtArgs["result"]["pluginVersion"]>;
export type PluginVersionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plugin?: boolean | Prisma.PluginDefaultArgs<ExtArgs>;
    activeForPlugins?: boolean | Prisma.PluginVersion$activeForPluginsArgs<ExtArgs>;
    auditor?: boolean | Prisma.PluginVersion$auditorArgs<ExtArgs>;
    deletedBy?: boolean | Prisma.PluginVersion$deletedByArgs<ExtArgs>;
    _count?: boolean | Prisma.PluginVersionCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $PluginVersionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PluginVersion";
    objects: {
        plugin: Prisma.$PluginPayload<ExtArgs>;
        activeForPlugins: Prisma.$PluginPayload<ExtArgs>[];
        auditor: Prisma.$UserPayload<ExtArgs> | null;
        deletedBy: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        pluginId: string;
        version: string;
        content: runtime.JsonValue;
        changelog: string | null;
        status: $Enums.PluginStatus;
        auditLog: string | null;
        auditorId: string | null;
        deletedAt: Date | null;
        deletedById: string | null;
        deleteReason: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["pluginVersion"]>;
    composites: {};
};
export type PluginVersionGetPayload<S extends boolean | null | undefined | PluginVersionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PluginVersionPayload, S>;
export type PluginVersionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PluginVersionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PluginVersionCountAggregateInputType | true;
};
export interface PluginVersionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PluginVersion'];
        meta: {
            name: 'PluginVersion';
        };
    };
    findUnique<T extends PluginVersionFindUniqueArgs>(args: Prisma.SelectSubset<T, PluginVersionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PluginVersionClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PluginVersionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PluginVersionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PluginVersionClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PluginVersionFindFirstArgs>(args?: Prisma.SelectSubset<T, PluginVersionFindFirstArgs<ExtArgs>>): Prisma.Prisma__PluginVersionClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PluginVersionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PluginVersionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PluginVersionClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PluginVersionFindManyArgs>(args?: Prisma.SelectSubset<T, PluginVersionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PluginVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PluginVersionCreateArgs>(args: Prisma.SelectSubset<T, PluginVersionCreateArgs<ExtArgs>>): Prisma.Prisma__PluginVersionClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PluginVersionCreateManyArgs>(args?: Prisma.SelectSubset<T, PluginVersionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PluginVersionDeleteArgs>(args: Prisma.SelectSubset<T, PluginVersionDeleteArgs<ExtArgs>>): Prisma.Prisma__PluginVersionClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PluginVersionUpdateArgs>(args: Prisma.SelectSubset<T, PluginVersionUpdateArgs<ExtArgs>>): Prisma.Prisma__PluginVersionClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PluginVersionDeleteManyArgs>(args?: Prisma.SelectSubset<T, PluginVersionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PluginVersionUpdateManyArgs>(args: Prisma.SelectSubset<T, PluginVersionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PluginVersionUpsertArgs>(args: Prisma.SelectSubset<T, PluginVersionUpsertArgs<ExtArgs>>): Prisma.Prisma__PluginVersionClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PluginVersionCountArgs>(args?: Prisma.Subset<T, PluginVersionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PluginVersionCountAggregateOutputType> : number>;
    aggregate<T extends PluginVersionAggregateArgs>(args: Prisma.Subset<T, PluginVersionAggregateArgs>): Prisma.PrismaPromise<GetPluginVersionAggregateType<T>>;
    groupBy<T extends PluginVersionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PluginVersionGroupByArgs['orderBy'];
    } : {
        orderBy?: PluginVersionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PluginVersionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPluginVersionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PluginVersionFieldRefs;
}
export interface Prisma__PluginVersionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    plugin<T extends Prisma.PluginDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PluginDefaultArgs<ExtArgs>>): Prisma.Prisma__PluginClient<runtime.Types.Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    activeForPlugins<T extends Prisma.PluginVersion$activeForPluginsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PluginVersion$activeForPluginsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    auditor<T extends Prisma.PluginVersion$auditorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PluginVersion$auditorArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    deletedBy<T extends Prisma.PluginVersion$deletedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PluginVersion$deletedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PluginVersionFieldRefs {
    readonly id: Prisma.FieldRef<"PluginVersion", 'String'>;
    readonly pluginId: Prisma.FieldRef<"PluginVersion", 'String'>;
    readonly version: Prisma.FieldRef<"PluginVersion", 'String'>;
    readonly content: Prisma.FieldRef<"PluginVersion", 'Json'>;
    readonly changelog: Prisma.FieldRef<"PluginVersion", 'String'>;
    readonly status: Prisma.FieldRef<"PluginVersion", 'PluginStatus'>;
    readonly auditLog: Prisma.FieldRef<"PluginVersion", 'String'>;
    readonly auditorId: Prisma.FieldRef<"PluginVersion", 'String'>;
    readonly deletedAt: Prisma.FieldRef<"PluginVersion", 'DateTime'>;
    readonly deletedById: Prisma.FieldRef<"PluginVersion", 'String'>;
    readonly deleteReason: Prisma.FieldRef<"PluginVersion", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PluginVersion", 'DateTime'>;
}
export type PluginVersionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionInclude<ExtArgs> | null;
    where: Prisma.PluginVersionWhereUniqueInput;
};
export type PluginVersionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionInclude<ExtArgs> | null;
    where: Prisma.PluginVersionWhereUniqueInput;
};
export type PluginVersionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionInclude<ExtArgs> | null;
    where?: Prisma.PluginVersionWhereInput;
    orderBy?: Prisma.PluginVersionOrderByWithRelationInput | Prisma.PluginVersionOrderByWithRelationInput[];
    cursor?: Prisma.PluginVersionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PluginVersionScalarFieldEnum | Prisma.PluginVersionScalarFieldEnum[];
};
export type PluginVersionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionInclude<ExtArgs> | null;
    where?: Prisma.PluginVersionWhereInput;
    orderBy?: Prisma.PluginVersionOrderByWithRelationInput | Prisma.PluginVersionOrderByWithRelationInput[];
    cursor?: Prisma.PluginVersionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PluginVersionScalarFieldEnum | Prisma.PluginVersionScalarFieldEnum[];
};
export type PluginVersionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionInclude<ExtArgs> | null;
    where?: Prisma.PluginVersionWhereInput;
    orderBy?: Prisma.PluginVersionOrderByWithRelationInput | Prisma.PluginVersionOrderByWithRelationInput[];
    cursor?: Prisma.PluginVersionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PluginVersionScalarFieldEnum | Prisma.PluginVersionScalarFieldEnum[];
};
export type PluginVersionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PluginVersionCreateInput, Prisma.PluginVersionUncheckedCreateInput>;
};
export type PluginVersionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PluginVersionCreateManyInput | Prisma.PluginVersionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PluginVersionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PluginVersionUpdateInput, Prisma.PluginVersionUncheckedUpdateInput>;
    where: Prisma.PluginVersionWhereUniqueInput;
};
export type PluginVersionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PluginVersionUpdateManyMutationInput, Prisma.PluginVersionUncheckedUpdateManyInput>;
    where?: Prisma.PluginVersionWhereInput;
    limit?: number;
};
export type PluginVersionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionInclude<ExtArgs> | null;
    where: Prisma.PluginVersionWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginVersionCreateInput, Prisma.PluginVersionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PluginVersionUpdateInput, Prisma.PluginVersionUncheckedUpdateInput>;
};
export type PluginVersionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionInclude<ExtArgs> | null;
    where: Prisma.PluginVersionWhereUniqueInput;
};
export type PluginVersionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginVersionWhereInput;
    limit?: number;
};
export type PluginVersion$activeForPluginsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginSelect<ExtArgs> | null;
    omit?: Prisma.PluginOmit<ExtArgs> | null;
    include?: Prisma.PluginInclude<ExtArgs> | null;
    where?: Prisma.PluginWhereInput;
    orderBy?: Prisma.PluginOrderByWithRelationInput | Prisma.PluginOrderByWithRelationInput[];
    cursor?: Prisma.PluginWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PluginScalarFieldEnum | Prisma.PluginScalarFieldEnum[];
};
export type PluginVersion$auditorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type PluginVersion$deletedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type PluginVersionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionInclude<ExtArgs> | null;
};
export {};
