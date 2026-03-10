import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type PluginVersionActionLogModel = runtime.Types.Result.DefaultSelection<Prisma.$PluginVersionActionLogPayload>;
export type AggregatePluginVersionActionLog = {
    _count: PluginVersionActionLogCountAggregateOutputType | null;
    _min: PluginVersionActionLogMinAggregateOutputType | null;
    _max: PluginVersionActionLogMaxAggregateOutputType | null;
};
export type PluginVersionActionLogMinAggregateOutputType = {
    id: string | null;
    pluginId: string | null;
    operatorId: string | null;
    action: $Enums.PluginVersionActionType | null;
    fromVersion: string | null;
    toVersion: string | null;
    targetVersion: string | null;
    reason: string | null;
    createdAt: Date | null;
};
export type PluginVersionActionLogMaxAggregateOutputType = {
    id: string | null;
    pluginId: string | null;
    operatorId: string | null;
    action: $Enums.PluginVersionActionType | null;
    fromVersion: string | null;
    toVersion: string | null;
    targetVersion: string | null;
    reason: string | null;
    createdAt: Date | null;
};
export type PluginVersionActionLogCountAggregateOutputType = {
    id: number;
    pluginId: number;
    operatorId: number;
    action: number;
    fromVersion: number;
    toVersion: number;
    targetVersion: number;
    reason: number;
    createdAt: number;
    _all: number;
};
export type PluginVersionActionLogMinAggregateInputType = {
    id?: true;
    pluginId?: true;
    operatorId?: true;
    action?: true;
    fromVersion?: true;
    toVersion?: true;
    targetVersion?: true;
    reason?: true;
    createdAt?: true;
};
export type PluginVersionActionLogMaxAggregateInputType = {
    id?: true;
    pluginId?: true;
    operatorId?: true;
    action?: true;
    fromVersion?: true;
    toVersion?: true;
    targetVersion?: true;
    reason?: true;
    createdAt?: true;
};
export type PluginVersionActionLogCountAggregateInputType = {
    id?: true;
    pluginId?: true;
    operatorId?: true;
    action?: true;
    fromVersion?: true;
    toVersion?: true;
    targetVersion?: true;
    reason?: true;
    createdAt?: true;
    _all?: true;
};
export type PluginVersionActionLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginVersionActionLogWhereInput;
    orderBy?: Prisma.PluginVersionActionLogOrderByWithRelationInput | Prisma.PluginVersionActionLogOrderByWithRelationInput[];
    cursor?: Prisma.PluginVersionActionLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PluginVersionActionLogCountAggregateInputType;
    _min?: PluginVersionActionLogMinAggregateInputType;
    _max?: PluginVersionActionLogMaxAggregateInputType;
};
export type GetPluginVersionActionLogAggregateType<T extends PluginVersionActionLogAggregateArgs> = {
    [P in keyof T & keyof AggregatePluginVersionActionLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePluginVersionActionLog[P]> : Prisma.GetScalarType<T[P], AggregatePluginVersionActionLog[P]>;
};
export type PluginVersionActionLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginVersionActionLogWhereInput;
    orderBy?: Prisma.PluginVersionActionLogOrderByWithAggregationInput | Prisma.PluginVersionActionLogOrderByWithAggregationInput[];
    by: Prisma.PluginVersionActionLogScalarFieldEnum[] | Prisma.PluginVersionActionLogScalarFieldEnum;
    having?: Prisma.PluginVersionActionLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PluginVersionActionLogCountAggregateInputType | true;
    _min?: PluginVersionActionLogMinAggregateInputType;
    _max?: PluginVersionActionLogMaxAggregateInputType;
};
export type PluginVersionActionLogGroupByOutputType = {
    id: string;
    pluginId: string;
    operatorId: string;
    action: $Enums.PluginVersionActionType;
    fromVersion: string | null;
    toVersion: string | null;
    targetVersion: string | null;
    reason: string | null;
    createdAt: Date;
    _count: PluginVersionActionLogCountAggregateOutputType | null;
    _min: PluginVersionActionLogMinAggregateOutputType | null;
    _max: PluginVersionActionLogMaxAggregateOutputType | null;
};
type GetPluginVersionActionLogGroupByPayload<T extends PluginVersionActionLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PluginVersionActionLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PluginVersionActionLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PluginVersionActionLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PluginVersionActionLogGroupByOutputType[P]>;
}>>;
export type PluginVersionActionLogWhereInput = {
    AND?: Prisma.PluginVersionActionLogWhereInput | Prisma.PluginVersionActionLogWhereInput[];
    OR?: Prisma.PluginVersionActionLogWhereInput[];
    NOT?: Prisma.PluginVersionActionLogWhereInput | Prisma.PluginVersionActionLogWhereInput[];
    id?: Prisma.StringFilter<"PluginVersionActionLog"> | string;
    pluginId?: Prisma.StringFilter<"PluginVersionActionLog"> | string;
    operatorId?: Prisma.StringFilter<"PluginVersionActionLog"> | string;
    action?: Prisma.EnumPluginVersionActionTypeFilter<"PluginVersionActionLog"> | $Enums.PluginVersionActionType;
    fromVersion?: Prisma.StringNullableFilter<"PluginVersionActionLog"> | string | null;
    toVersion?: Prisma.StringNullableFilter<"PluginVersionActionLog"> | string | null;
    targetVersion?: Prisma.StringNullableFilter<"PluginVersionActionLog"> | string | null;
    reason?: Prisma.StringNullableFilter<"PluginVersionActionLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PluginVersionActionLog"> | Date | string;
    plugin?: Prisma.XOR<Prisma.PluginScalarRelationFilter, Prisma.PluginWhereInput>;
    operator?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PluginVersionActionLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    fromVersion?: Prisma.SortOrderInput | Prisma.SortOrder;
    toVersion?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetVersion?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    plugin?: Prisma.PluginOrderByWithRelationInput;
    operator?: Prisma.UserOrderByWithRelationInput;
    _relevance?: Prisma.PluginVersionActionLogOrderByRelevanceInput;
};
export type PluginVersionActionLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PluginVersionActionLogWhereInput | Prisma.PluginVersionActionLogWhereInput[];
    OR?: Prisma.PluginVersionActionLogWhereInput[];
    NOT?: Prisma.PluginVersionActionLogWhereInput | Prisma.PluginVersionActionLogWhereInput[];
    pluginId?: Prisma.StringFilter<"PluginVersionActionLog"> | string;
    operatorId?: Prisma.StringFilter<"PluginVersionActionLog"> | string;
    action?: Prisma.EnumPluginVersionActionTypeFilter<"PluginVersionActionLog"> | $Enums.PluginVersionActionType;
    fromVersion?: Prisma.StringNullableFilter<"PluginVersionActionLog"> | string | null;
    toVersion?: Prisma.StringNullableFilter<"PluginVersionActionLog"> | string | null;
    targetVersion?: Prisma.StringNullableFilter<"PluginVersionActionLog"> | string | null;
    reason?: Prisma.StringNullableFilter<"PluginVersionActionLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PluginVersionActionLog"> | Date | string;
    plugin?: Prisma.XOR<Prisma.PluginScalarRelationFilter, Prisma.PluginWhereInput>;
    operator?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type PluginVersionActionLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    fromVersion?: Prisma.SortOrderInput | Prisma.SortOrder;
    toVersion?: Prisma.SortOrderInput | Prisma.SortOrder;
    targetVersion?: Prisma.SortOrderInput | Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PluginVersionActionLogCountOrderByAggregateInput;
    _max?: Prisma.PluginVersionActionLogMaxOrderByAggregateInput;
    _min?: Prisma.PluginVersionActionLogMinOrderByAggregateInput;
};
export type PluginVersionActionLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.PluginVersionActionLogScalarWhereWithAggregatesInput | Prisma.PluginVersionActionLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.PluginVersionActionLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PluginVersionActionLogScalarWhereWithAggregatesInput | Prisma.PluginVersionActionLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PluginVersionActionLog"> | string;
    pluginId?: Prisma.StringWithAggregatesFilter<"PluginVersionActionLog"> | string;
    operatorId?: Prisma.StringWithAggregatesFilter<"PluginVersionActionLog"> | string;
    action?: Prisma.EnumPluginVersionActionTypeWithAggregatesFilter<"PluginVersionActionLog"> | $Enums.PluginVersionActionType;
    fromVersion?: Prisma.StringNullableWithAggregatesFilter<"PluginVersionActionLog"> | string | null;
    toVersion?: Prisma.StringNullableWithAggregatesFilter<"PluginVersionActionLog"> | string | null;
    targetVersion?: Prisma.StringNullableWithAggregatesFilter<"PluginVersionActionLog"> | string | null;
    reason?: Prisma.StringNullableWithAggregatesFilter<"PluginVersionActionLog"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PluginVersionActionLog"> | Date | string;
};
export type PluginVersionActionLogCreateInput = {
    id?: string;
    action: $Enums.PluginVersionActionType;
    fromVersion?: string | null;
    toVersion?: string | null;
    targetVersion?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
    plugin: Prisma.PluginCreateNestedOneWithoutVersionActionLogsInput;
    operator: Prisma.UserCreateNestedOneWithoutPluginVersionActionLogsInput;
};
export type PluginVersionActionLogUncheckedCreateInput = {
    id?: string;
    pluginId: string;
    operatorId: string;
    action: $Enums.PluginVersionActionType;
    fromVersion?: string | null;
    toVersion?: string | null;
    targetVersion?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
};
export type PluginVersionActionLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumPluginVersionActionTypeFieldUpdateOperationsInput | $Enums.PluginVersionActionType;
    fromVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plugin?: Prisma.PluginUpdateOneRequiredWithoutVersionActionLogsNestedInput;
    operator?: Prisma.UserUpdateOneRequiredWithoutPluginVersionActionLogsNestedInput;
};
export type PluginVersionActionLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    operatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumPluginVersionActionTypeFieldUpdateOperationsInput | $Enums.PluginVersionActionType;
    fromVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginVersionActionLogCreateManyInput = {
    id?: string;
    pluginId: string;
    operatorId: string;
    action: $Enums.PluginVersionActionType;
    fromVersion?: string | null;
    toVersion?: string | null;
    targetVersion?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
};
export type PluginVersionActionLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumPluginVersionActionTypeFieldUpdateOperationsInput | $Enums.PluginVersionActionType;
    fromVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginVersionActionLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    operatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumPluginVersionActionTypeFieldUpdateOperationsInput | $Enums.PluginVersionActionType;
    fromVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginVersionActionLogListRelationFilter = {
    every?: Prisma.PluginVersionActionLogWhereInput;
    some?: Prisma.PluginVersionActionLogWhereInput;
    none?: Prisma.PluginVersionActionLogWhereInput;
};
export type PluginVersionActionLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PluginVersionActionLogOrderByRelevanceInput = {
    fields: Prisma.PluginVersionActionLogOrderByRelevanceFieldEnum | Prisma.PluginVersionActionLogOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type PluginVersionActionLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    fromVersion?: Prisma.SortOrder;
    toVersion?: Prisma.SortOrder;
    targetVersion?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PluginVersionActionLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    fromVersion?: Prisma.SortOrder;
    toVersion?: Prisma.SortOrder;
    targetVersion?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PluginVersionActionLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    fromVersion?: Prisma.SortOrder;
    toVersion?: Prisma.SortOrder;
    targetVersion?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PluginVersionActionLogCreateNestedManyWithoutOperatorInput = {
    create?: Prisma.XOR<Prisma.PluginVersionActionLogCreateWithoutOperatorInput, Prisma.PluginVersionActionLogUncheckedCreateWithoutOperatorInput> | Prisma.PluginVersionActionLogCreateWithoutOperatorInput[] | Prisma.PluginVersionActionLogUncheckedCreateWithoutOperatorInput[];
    connectOrCreate?: Prisma.PluginVersionActionLogCreateOrConnectWithoutOperatorInput | Prisma.PluginVersionActionLogCreateOrConnectWithoutOperatorInput[];
    createMany?: Prisma.PluginVersionActionLogCreateManyOperatorInputEnvelope;
    connect?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
};
export type PluginVersionActionLogUncheckedCreateNestedManyWithoutOperatorInput = {
    create?: Prisma.XOR<Prisma.PluginVersionActionLogCreateWithoutOperatorInput, Prisma.PluginVersionActionLogUncheckedCreateWithoutOperatorInput> | Prisma.PluginVersionActionLogCreateWithoutOperatorInput[] | Prisma.PluginVersionActionLogUncheckedCreateWithoutOperatorInput[];
    connectOrCreate?: Prisma.PluginVersionActionLogCreateOrConnectWithoutOperatorInput | Prisma.PluginVersionActionLogCreateOrConnectWithoutOperatorInput[];
    createMany?: Prisma.PluginVersionActionLogCreateManyOperatorInputEnvelope;
    connect?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
};
export type PluginVersionActionLogUpdateManyWithoutOperatorNestedInput = {
    create?: Prisma.XOR<Prisma.PluginVersionActionLogCreateWithoutOperatorInput, Prisma.PluginVersionActionLogUncheckedCreateWithoutOperatorInput> | Prisma.PluginVersionActionLogCreateWithoutOperatorInput[] | Prisma.PluginVersionActionLogUncheckedCreateWithoutOperatorInput[];
    connectOrCreate?: Prisma.PluginVersionActionLogCreateOrConnectWithoutOperatorInput | Prisma.PluginVersionActionLogCreateOrConnectWithoutOperatorInput[];
    upsert?: Prisma.PluginVersionActionLogUpsertWithWhereUniqueWithoutOperatorInput | Prisma.PluginVersionActionLogUpsertWithWhereUniqueWithoutOperatorInput[];
    createMany?: Prisma.PluginVersionActionLogCreateManyOperatorInputEnvelope;
    set?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    disconnect?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    delete?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    connect?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    update?: Prisma.PluginVersionActionLogUpdateWithWhereUniqueWithoutOperatorInput | Prisma.PluginVersionActionLogUpdateWithWhereUniqueWithoutOperatorInput[];
    updateMany?: Prisma.PluginVersionActionLogUpdateManyWithWhereWithoutOperatorInput | Prisma.PluginVersionActionLogUpdateManyWithWhereWithoutOperatorInput[];
    deleteMany?: Prisma.PluginVersionActionLogScalarWhereInput | Prisma.PluginVersionActionLogScalarWhereInput[];
};
export type PluginVersionActionLogUncheckedUpdateManyWithoutOperatorNestedInput = {
    create?: Prisma.XOR<Prisma.PluginVersionActionLogCreateWithoutOperatorInput, Prisma.PluginVersionActionLogUncheckedCreateWithoutOperatorInput> | Prisma.PluginVersionActionLogCreateWithoutOperatorInput[] | Prisma.PluginVersionActionLogUncheckedCreateWithoutOperatorInput[];
    connectOrCreate?: Prisma.PluginVersionActionLogCreateOrConnectWithoutOperatorInput | Prisma.PluginVersionActionLogCreateOrConnectWithoutOperatorInput[];
    upsert?: Prisma.PluginVersionActionLogUpsertWithWhereUniqueWithoutOperatorInput | Prisma.PluginVersionActionLogUpsertWithWhereUniqueWithoutOperatorInput[];
    createMany?: Prisma.PluginVersionActionLogCreateManyOperatorInputEnvelope;
    set?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    disconnect?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    delete?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    connect?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    update?: Prisma.PluginVersionActionLogUpdateWithWhereUniqueWithoutOperatorInput | Prisma.PluginVersionActionLogUpdateWithWhereUniqueWithoutOperatorInput[];
    updateMany?: Prisma.PluginVersionActionLogUpdateManyWithWhereWithoutOperatorInput | Prisma.PluginVersionActionLogUpdateManyWithWhereWithoutOperatorInput[];
    deleteMany?: Prisma.PluginVersionActionLogScalarWhereInput | Prisma.PluginVersionActionLogScalarWhereInput[];
};
export type PluginVersionActionLogCreateNestedManyWithoutPluginInput = {
    create?: Prisma.XOR<Prisma.PluginVersionActionLogCreateWithoutPluginInput, Prisma.PluginVersionActionLogUncheckedCreateWithoutPluginInput> | Prisma.PluginVersionActionLogCreateWithoutPluginInput[] | Prisma.PluginVersionActionLogUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginVersionActionLogCreateOrConnectWithoutPluginInput | Prisma.PluginVersionActionLogCreateOrConnectWithoutPluginInput[];
    createMany?: Prisma.PluginVersionActionLogCreateManyPluginInputEnvelope;
    connect?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
};
export type PluginVersionActionLogUncheckedCreateNestedManyWithoutPluginInput = {
    create?: Prisma.XOR<Prisma.PluginVersionActionLogCreateWithoutPluginInput, Prisma.PluginVersionActionLogUncheckedCreateWithoutPluginInput> | Prisma.PluginVersionActionLogCreateWithoutPluginInput[] | Prisma.PluginVersionActionLogUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginVersionActionLogCreateOrConnectWithoutPluginInput | Prisma.PluginVersionActionLogCreateOrConnectWithoutPluginInput[];
    createMany?: Prisma.PluginVersionActionLogCreateManyPluginInputEnvelope;
    connect?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
};
export type PluginVersionActionLogUpdateManyWithoutPluginNestedInput = {
    create?: Prisma.XOR<Prisma.PluginVersionActionLogCreateWithoutPluginInput, Prisma.PluginVersionActionLogUncheckedCreateWithoutPluginInput> | Prisma.PluginVersionActionLogCreateWithoutPluginInput[] | Prisma.PluginVersionActionLogUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginVersionActionLogCreateOrConnectWithoutPluginInput | Prisma.PluginVersionActionLogCreateOrConnectWithoutPluginInput[];
    upsert?: Prisma.PluginVersionActionLogUpsertWithWhereUniqueWithoutPluginInput | Prisma.PluginVersionActionLogUpsertWithWhereUniqueWithoutPluginInput[];
    createMany?: Prisma.PluginVersionActionLogCreateManyPluginInputEnvelope;
    set?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    disconnect?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    delete?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    connect?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    update?: Prisma.PluginVersionActionLogUpdateWithWhereUniqueWithoutPluginInput | Prisma.PluginVersionActionLogUpdateWithWhereUniqueWithoutPluginInput[];
    updateMany?: Prisma.PluginVersionActionLogUpdateManyWithWhereWithoutPluginInput | Prisma.PluginVersionActionLogUpdateManyWithWhereWithoutPluginInput[];
    deleteMany?: Prisma.PluginVersionActionLogScalarWhereInput | Prisma.PluginVersionActionLogScalarWhereInput[];
};
export type PluginVersionActionLogUncheckedUpdateManyWithoutPluginNestedInput = {
    create?: Prisma.XOR<Prisma.PluginVersionActionLogCreateWithoutPluginInput, Prisma.PluginVersionActionLogUncheckedCreateWithoutPluginInput> | Prisma.PluginVersionActionLogCreateWithoutPluginInput[] | Prisma.PluginVersionActionLogUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginVersionActionLogCreateOrConnectWithoutPluginInput | Prisma.PluginVersionActionLogCreateOrConnectWithoutPluginInput[];
    upsert?: Prisma.PluginVersionActionLogUpsertWithWhereUniqueWithoutPluginInput | Prisma.PluginVersionActionLogUpsertWithWhereUniqueWithoutPluginInput[];
    createMany?: Prisma.PluginVersionActionLogCreateManyPluginInputEnvelope;
    set?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    disconnect?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    delete?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    connect?: Prisma.PluginVersionActionLogWhereUniqueInput | Prisma.PluginVersionActionLogWhereUniqueInput[];
    update?: Prisma.PluginVersionActionLogUpdateWithWhereUniqueWithoutPluginInput | Prisma.PluginVersionActionLogUpdateWithWhereUniqueWithoutPluginInput[];
    updateMany?: Prisma.PluginVersionActionLogUpdateManyWithWhereWithoutPluginInput | Prisma.PluginVersionActionLogUpdateManyWithWhereWithoutPluginInput[];
    deleteMany?: Prisma.PluginVersionActionLogScalarWhereInput | Prisma.PluginVersionActionLogScalarWhereInput[];
};
export type EnumPluginVersionActionTypeFieldUpdateOperationsInput = {
    set?: $Enums.PluginVersionActionType;
};
export type PluginVersionActionLogCreateWithoutOperatorInput = {
    id?: string;
    action: $Enums.PluginVersionActionType;
    fromVersion?: string | null;
    toVersion?: string | null;
    targetVersion?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
    plugin: Prisma.PluginCreateNestedOneWithoutVersionActionLogsInput;
};
export type PluginVersionActionLogUncheckedCreateWithoutOperatorInput = {
    id?: string;
    pluginId: string;
    action: $Enums.PluginVersionActionType;
    fromVersion?: string | null;
    toVersion?: string | null;
    targetVersion?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
};
export type PluginVersionActionLogCreateOrConnectWithoutOperatorInput = {
    where: Prisma.PluginVersionActionLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginVersionActionLogCreateWithoutOperatorInput, Prisma.PluginVersionActionLogUncheckedCreateWithoutOperatorInput>;
};
export type PluginVersionActionLogCreateManyOperatorInputEnvelope = {
    data: Prisma.PluginVersionActionLogCreateManyOperatorInput | Prisma.PluginVersionActionLogCreateManyOperatorInput[];
    skipDuplicates?: boolean;
};
export type PluginVersionActionLogUpsertWithWhereUniqueWithoutOperatorInput = {
    where: Prisma.PluginVersionActionLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.PluginVersionActionLogUpdateWithoutOperatorInput, Prisma.PluginVersionActionLogUncheckedUpdateWithoutOperatorInput>;
    create: Prisma.XOR<Prisma.PluginVersionActionLogCreateWithoutOperatorInput, Prisma.PluginVersionActionLogUncheckedCreateWithoutOperatorInput>;
};
export type PluginVersionActionLogUpdateWithWhereUniqueWithoutOperatorInput = {
    where: Prisma.PluginVersionActionLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.PluginVersionActionLogUpdateWithoutOperatorInput, Prisma.PluginVersionActionLogUncheckedUpdateWithoutOperatorInput>;
};
export type PluginVersionActionLogUpdateManyWithWhereWithoutOperatorInput = {
    where: Prisma.PluginVersionActionLogScalarWhereInput;
    data: Prisma.XOR<Prisma.PluginVersionActionLogUpdateManyMutationInput, Prisma.PluginVersionActionLogUncheckedUpdateManyWithoutOperatorInput>;
};
export type PluginVersionActionLogScalarWhereInput = {
    AND?: Prisma.PluginVersionActionLogScalarWhereInput | Prisma.PluginVersionActionLogScalarWhereInput[];
    OR?: Prisma.PluginVersionActionLogScalarWhereInput[];
    NOT?: Prisma.PluginVersionActionLogScalarWhereInput | Prisma.PluginVersionActionLogScalarWhereInput[];
    id?: Prisma.StringFilter<"PluginVersionActionLog"> | string;
    pluginId?: Prisma.StringFilter<"PluginVersionActionLog"> | string;
    operatorId?: Prisma.StringFilter<"PluginVersionActionLog"> | string;
    action?: Prisma.EnumPluginVersionActionTypeFilter<"PluginVersionActionLog"> | $Enums.PluginVersionActionType;
    fromVersion?: Prisma.StringNullableFilter<"PluginVersionActionLog"> | string | null;
    toVersion?: Prisma.StringNullableFilter<"PluginVersionActionLog"> | string | null;
    targetVersion?: Prisma.StringNullableFilter<"PluginVersionActionLog"> | string | null;
    reason?: Prisma.StringNullableFilter<"PluginVersionActionLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PluginVersionActionLog"> | Date | string;
};
export type PluginVersionActionLogCreateWithoutPluginInput = {
    id?: string;
    action: $Enums.PluginVersionActionType;
    fromVersion?: string | null;
    toVersion?: string | null;
    targetVersion?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
    operator: Prisma.UserCreateNestedOneWithoutPluginVersionActionLogsInput;
};
export type PluginVersionActionLogUncheckedCreateWithoutPluginInput = {
    id?: string;
    operatorId: string;
    action: $Enums.PluginVersionActionType;
    fromVersion?: string | null;
    toVersion?: string | null;
    targetVersion?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
};
export type PluginVersionActionLogCreateOrConnectWithoutPluginInput = {
    where: Prisma.PluginVersionActionLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginVersionActionLogCreateWithoutPluginInput, Prisma.PluginVersionActionLogUncheckedCreateWithoutPluginInput>;
};
export type PluginVersionActionLogCreateManyPluginInputEnvelope = {
    data: Prisma.PluginVersionActionLogCreateManyPluginInput | Prisma.PluginVersionActionLogCreateManyPluginInput[];
    skipDuplicates?: boolean;
};
export type PluginVersionActionLogUpsertWithWhereUniqueWithoutPluginInput = {
    where: Prisma.PluginVersionActionLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.PluginVersionActionLogUpdateWithoutPluginInput, Prisma.PluginVersionActionLogUncheckedUpdateWithoutPluginInput>;
    create: Prisma.XOR<Prisma.PluginVersionActionLogCreateWithoutPluginInput, Prisma.PluginVersionActionLogUncheckedCreateWithoutPluginInput>;
};
export type PluginVersionActionLogUpdateWithWhereUniqueWithoutPluginInput = {
    where: Prisma.PluginVersionActionLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.PluginVersionActionLogUpdateWithoutPluginInput, Prisma.PluginVersionActionLogUncheckedUpdateWithoutPluginInput>;
};
export type PluginVersionActionLogUpdateManyWithWhereWithoutPluginInput = {
    where: Prisma.PluginVersionActionLogScalarWhereInput;
    data: Prisma.XOR<Prisma.PluginVersionActionLogUpdateManyMutationInput, Prisma.PluginVersionActionLogUncheckedUpdateManyWithoutPluginInput>;
};
export type PluginVersionActionLogCreateManyOperatorInput = {
    id?: string;
    pluginId: string;
    action: $Enums.PluginVersionActionType;
    fromVersion?: string | null;
    toVersion?: string | null;
    targetVersion?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
};
export type PluginVersionActionLogUpdateWithoutOperatorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumPluginVersionActionTypeFieldUpdateOperationsInput | $Enums.PluginVersionActionType;
    fromVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plugin?: Prisma.PluginUpdateOneRequiredWithoutVersionActionLogsNestedInput;
};
export type PluginVersionActionLogUncheckedUpdateWithoutOperatorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumPluginVersionActionTypeFieldUpdateOperationsInput | $Enums.PluginVersionActionType;
    fromVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginVersionActionLogUncheckedUpdateManyWithoutOperatorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumPluginVersionActionTypeFieldUpdateOperationsInput | $Enums.PluginVersionActionType;
    fromVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginVersionActionLogCreateManyPluginInput = {
    id?: string;
    operatorId: string;
    action: $Enums.PluginVersionActionType;
    fromVersion?: string | null;
    toVersion?: string | null;
    targetVersion?: string | null;
    reason?: string | null;
    createdAt?: Date | string;
};
export type PluginVersionActionLogUpdateWithoutPluginInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumPluginVersionActionTypeFieldUpdateOperationsInput | $Enums.PluginVersionActionType;
    fromVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operator?: Prisma.UserUpdateOneRequiredWithoutPluginVersionActionLogsNestedInput;
};
export type PluginVersionActionLogUncheckedUpdateWithoutPluginInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    operatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumPluginVersionActionTypeFieldUpdateOperationsInput | $Enums.PluginVersionActionType;
    fromVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginVersionActionLogUncheckedUpdateManyWithoutPluginInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    operatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumPluginVersionActionTypeFieldUpdateOperationsInput | $Enums.PluginVersionActionType;
    fromVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    toVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    targetVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginVersionActionLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    pluginId?: boolean;
    operatorId?: boolean;
    action?: boolean;
    fromVersion?: boolean;
    toVersion?: boolean;
    targetVersion?: boolean;
    reason?: boolean;
    createdAt?: boolean;
    plugin?: boolean | Prisma.PluginDefaultArgs<ExtArgs>;
    operator?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pluginVersionActionLog"]>;
export type PluginVersionActionLogSelectScalar = {
    id?: boolean;
    pluginId?: boolean;
    operatorId?: boolean;
    action?: boolean;
    fromVersion?: boolean;
    toVersion?: boolean;
    targetVersion?: boolean;
    reason?: boolean;
    createdAt?: boolean;
};
export type PluginVersionActionLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "pluginId" | "operatorId" | "action" | "fromVersion" | "toVersion" | "targetVersion" | "reason" | "createdAt", ExtArgs["result"]["pluginVersionActionLog"]>;
export type PluginVersionActionLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plugin?: boolean | Prisma.PluginDefaultArgs<ExtArgs>;
    operator?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PluginVersionActionLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PluginVersionActionLog";
    objects: {
        plugin: Prisma.$PluginPayload<ExtArgs>;
        operator: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        pluginId: string;
        operatorId: string;
        action: $Enums.PluginVersionActionType;
        fromVersion: string | null;
        toVersion: string | null;
        targetVersion: string | null;
        reason: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["pluginVersionActionLog"]>;
    composites: {};
};
export type PluginVersionActionLogGetPayload<S extends boolean | null | undefined | PluginVersionActionLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PluginVersionActionLogPayload, S>;
export type PluginVersionActionLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PluginVersionActionLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PluginVersionActionLogCountAggregateInputType | true;
};
export interface PluginVersionActionLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PluginVersionActionLog'];
        meta: {
            name: 'PluginVersionActionLog';
        };
    };
    findUnique<T extends PluginVersionActionLogFindUniqueArgs>(args: Prisma.SelectSubset<T, PluginVersionActionLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PluginVersionActionLogClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionActionLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PluginVersionActionLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PluginVersionActionLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PluginVersionActionLogClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionActionLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PluginVersionActionLogFindFirstArgs>(args?: Prisma.SelectSubset<T, PluginVersionActionLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__PluginVersionActionLogClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionActionLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PluginVersionActionLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PluginVersionActionLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PluginVersionActionLogClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionActionLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PluginVersionActionLogFindManyArgs>(args?: Prisma.SelectSubset<T, PluginVersionActionLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PluginVersionActionLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PluginVersionActionLogCreateArgs>(args: Prisma.SelectSubset<T, PluginVersionActionLogCreateArgs<ExtArgs>>): Prisma.Prisma__PluginVersionActionLogClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionActionLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PluginVersionActionLogCreateManyArgs>(args?: Prisma.SelectSubset<T, PluginVersionActionLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PluginVersionActionLogDeleteArgs>(args: Prisma.SelectSubset<T, PluginVersionActionLogDeleteArgs<ExtArgs>>): Prisma.Prisma__PluginVersionActionLogClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionActionLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PluginVersionActionLogUpdateArgs>(args: Prisma.SelectSubset<T, PluginVersionActionLogUpdateArgs<ExtArgs>>): Prisma.Prisma__PluginVersionActionLogClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionActionLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PluginVersionActionLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, PluginVersionActionLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PluginVersionActionLogUpdateManyArgs>(args: Prisma.SelectSubset<T, PluginVersionActionLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PluginVersionActionLogUpsertArgs>(args: Prisma.SelectSubset<T, PluginVersionActionLogUpsertArgs<ExtArgs>>): Prisma.Prisma__PluginVersionActionLogClient<runtime.Types.Result.GetResult<Prisma.$PluginVersionActionLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PluginVersionActionLogCountArgs>(args?: Prisma.Subset<T, PluginVersionActionLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PluginVersionActionLogCountAggregateOutputType> : number>;
    aggregate<T extends PluginVersionActionLogAggregateArgs>(args: Prisma.Subset<T, PluginVersionActionLogAggregateArgs>): Prisma.PrismaPromise<GetPluginVersionActionLogAggregateType<T>>;
    groupBy<T extends PluginVersionActionLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PluginVersionActionLogGroupByArgs['orderBy'];
    } : {
        orderBy?: PluginVersionActionLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PluginVersionActionLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPluginVersionActionLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PluginVersionActionLogFieldRefs;
}
export interface Prisma__PluginVersionActionLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    plugin<T extends Prisma.PluginDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PluginDefaultArgs<ExtArgs>>): Prisma.Prisma__PluginClient<runtime.Types.Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    operator<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PluginVersionActionLogFieldRefs {
    readonly id: Prisma.FieldRef<"PluginVersionActionLog", 'String'>;
    readonly pluginId: Prisma.FieldRef<"PluginVersionActionLog", 'String'>;
    readonly operatorId: Prisma.FieldRef<"PluginVersionActionLog", 'String'>;
    readonly action: Prisma.FieldRef<"PluginVersionActionLog", 'PluginVersionActionType'>;
    readonly fromVersion: Prisma.FieldRef<"PluginVersionActionLog", 'String'>;
    readonly toVersion: Prisma.FieldRef<"PluginVersionActionLog", 'String'>;
    readonly targetVersion: Prisma.FieldRef<"PluginVersionActionLog", 'String'>;
    readonly reason: Prisma.FieldRef<"PluginVersionActionLog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PluginVersionActionLog", 'DateTime'>;
}
export type PluginVersionActionLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionActionLogSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionActionLogOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionActionLogInclude<ExtArgs> | null;
    where: Prisma.PluginVersionActionLogWhereUniqueInput;
};
export type PluginVersionActionLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionActionLogSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionActionLogOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionActionLogInclude<ExtArgs> | null;
    where: Prisma.PluginVersionActionLogWhereUniqueInput;
};
export type PluginVersionActionLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionActionLogSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionActionLogOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionActionLogInclude<ExtArgs> | null;
    where?: Prisma.PluginVersionActionLogWhereInput;
    orderBy?: Prisma.PluginVersionActionLogOrderByWithRelationInput | Prisma.PluginVersionActionLogOrderByWithRelationInput[];
    cursor?: Prisma.PluginVersionActionLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PluginVersionActionLogScalarFieldEnum | Prisma.PluginVersionActionLogScalarFieldEnum[];
};
export type PluginVersionActionLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionActionLogSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionActionLogOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionActionLogInclude<ExtArgs> | null;
    where?: Prisma.PluginVersionActionLogWhereInput;
    orderBy?: Prisma.PluginVersionActionLogOrderByWithRelationInput | Prisma.PluginVersionActionLogOrderByWithRelationInput[];
    cursor?: Prisma.PluginVersionActionLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PluginVersionActionLogScalarFieldEnum | Prisma.PluginVersionActionLogScalarFieldEnum[];
};
export type PluginVersionActionLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionActionLogSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionActionLogOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionActionLogInclude<ExtArgs> | null;
    where?: Prisma.PluginVersionActionLogWhereInput;
    orderBy?: Prisma.PluginVersionActionLogOrderByWithRelationInput | Prisma.PluginVersionActionLogOrderByWithRelationInput[];
    cursor?: Prisma.PluginVersionActionLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PluginVersionActionLogScalarFieldEnum | Prisma.PluginVersionActionLogScalarFieldEnum[];
};
export type PluginVersionActionLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionActionLogSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionActionLogOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionActionLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PluginVersionActionLogCreateInput, Prisma.PluginVersionActionLogUncheckedCreateInput>;
};
export type PluginVersionActionLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PluginVersionActionLogCreateManyInput | Prisma.PluginVersionActionLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PluginVersionActionLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionActionLogSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionActionLogOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionActionLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PluginVersionActionLogUpdateInput, Prisma.PluginVersionActionLogUncheckedUpdateInput>;
    where: Prisma.PluginVersionActionLogWhereUniqueInput;
};
export type PluginVersionActionLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PluginVersionActionLogUpdateManyMutationInput, Prisma.PluginVersionActionLogUncheckedUpdateManyInput>;
    where?: Prisma.PluginVersionActionLogWhereInput;
    limit?: number;
};
export type PluginVersionActionLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionActionLogSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionActionLogOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionActionLogInclude<ExtArgs> | null;
    where: Prisma.PluginVersionActionLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginVersionActionLogCreateInput, Prisma.PluginVersionActionLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PluginVersionActionLogUpdateInput, Prisma.PluginVersionActionLogUncheckedUpdateInput>;
};
export type PluginVersionActionLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionActionLogSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionActionLogOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionActionLogInclude<ExtArgs> | null;
    where: Prisma.PluginVersionActionLogWhereUniqueInput;
};
export type PluginVersionActionLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginVersionActionLogWhereInput;
    limit?: number;
};
export type PluginVersionActionLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginVersionActionLogSelect<ExtArgs> | null;
    omit?: Prisma.PluginVersionActionLogOmit<ExtArgs> | null;
    include?: Prisma.PluginVersionActionLogInclude<ExtArgs> | null;
};
export {};
