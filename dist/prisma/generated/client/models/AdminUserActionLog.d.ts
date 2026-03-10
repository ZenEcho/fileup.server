import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type AdminUserActionLogModel = runtime.Types.Result.DefaultSelection<Prisma.$AdminUserActionLogPayload>;
export type AggregateAdminUserActionLog = {
    _count: AdminUserActionLogCountAggregateOutputType | null;
    _min: AdminUserActionLogMinAggregateOutputType | null;
    _max: AdminUserActionLogMaxAggregateOutputType | null;
};
export type AdminUserActionLogMinAggregateOutputType = {
    id: string | null;
    operatorId: string | null;
    targetUserId: string | null;
    action: $Enums.AdminUserActionType | null;
    detail: string | null;
    createdAt: Date | null;
};
export type AdminUserActionLogMaxAggregateOutputType = {
    id: string | null;
    operatorId: string | null;
    targetUserId: string | null;
    action: $Enums.AdminUserActionType | null;
    detail: string | null;
    createdAt: Date | null;
};
export type AdminUserActionLogCountAggregateOutputType = {
    id: number;
    operatorId: number;
    targetUserId: number;
    action: number;
    detail: number;
    createdAt: number;
    _all: number;
};
export type AdminUserActionLogMinAggregateInputType = {
    id?: true;
    operatorId?: true;
    targetUserId?: true;
    action?: true;
    detail?: true;
    createdAt?: true;
};
export type AdminUserActionLogMaxAggregateInputType = {
    id?: true;
    operatorId?: true;
    targetUserId?: true;
    action?: true;
    detail?: true;
    createdAt?: true;
};
export type AdminUserActionLogCountAggregateInputType = {
    id?: true;
    operatorId?: true;
    targetUserId?: true;
    action?: true;
    detail?: true;
    createdAt?: true;
    _all?: true;
};
export type AdminUserActionLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdminUserActionLogWhereInput;
    orderBy?: Prisma.AdminUserActionLogOrderByWithRelationInput | Prisma.AdminUserActionLogOrderByWithRelationInput[];
    cursor?: Prisma.AdminUserActionLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AdminUserActionLogCountAggregateInputType;
    _min?: AdminUserActionLogMinAggregateInputType;
    _max?: AdminUserActionLogMaxAggregateInputType;
};
export type GetAdminUserActionLogAggregateType<T extends AdminUserActionLogAggregateArgs> = {
    [P in keyof T & keyof AggregateAdminUserActionLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAdminUserActionLog[P]> : Prisma.GetScalarType<T[P], AggregateAdminUserActionLog[P]>;
};
export type AdminUserActionLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdminUserActionLogWhereInput;
    orderBy?: Prisma.AdminUserActionLogOrderByWithAggregationInput | Prisma.AdminUserActionLogOrderByWithAggregationInput[];
    by: Prisma.AdminUserActionLogScalarFieldEnum[] | Prisma.AdminUserActionLogScalarFieldEnum;
    having?: Prisma.AdminUserActionLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AdminUserActionLogCountAggregateInputType | true;
    _min?: AdminUserActionLogMinAggregateInputType;
    _max?: AdminUserActionLogMaxAggregateInputType;
};
export type AdminUserActionLogGroupByOutputType = {
    id: string;
    operatorId: string;
    targetUserId: string;
    action: $Enums.AdminUserActionType;
    detail: string | null;
    createdAt: Date;
    _count: AdminUserActionLogCountAggregateOutputType | null;
    _min: AdminUserActionLogMinAggregateOutputType | null;
    _max: AdminUserActionLogMaxAggregateOutputType | null;
};
type GetAdminUserActionLogGroupByPayload<T extends AdminUserActionLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AdminUserActionLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AdminUserActionLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AdminUserActionLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AdminUserActionLogGroupByOutputType[P]>;
}>>;
export type AdminUserActionLogWhereInput = {
    AND?: Prisma.AdminUserActionLogWhereInput | Prisma.AdminUserActionLogWhereInput[];
    OR?: Prisma.AdminUserActionLogWhereInput[];
    NOT?: Prisma.AdminUserActionLogWhereInput | Prisma.AdminUserActionLogWhereInput[];
    id?: Prisma.StringFilter<"AdminUserActionLog"> | string;
    operatorId?: Prisma.StringFilter<"AdminUserActionLog"> | string;
    targetUserId?: Prisma.StringFilter<"AdminUserActionLog"> | string;
    action?: Prisma.EnumAdminUserActionTypeFilter<"AdminUserActionLog"> | $Enums.AdminUserActionType;
    detail?: Prisma.StringNullableFilter<"AdminUserActionLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AdminUserActionLog"> | Date | string;
    operator?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    targetUser?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type AdminUserActionLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrder;
    targetUserId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    detail?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    operator?: Prisma.UserOrderByWithRelationInput;
    targetUser?: Prisma.UserOrderByWithRelationInput;
    _relevance?: Prisma.AdminUserActionLogOrderByRelevanceInput;
};
export type AdminUserActionLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AdminUserActionLogWhereInput | Prisma.AdminUserActionLogWhereInput[];
    OR?: Prisma.AdminUserActionLogWhereInput[];
    NOT?: Prisma.AdminUserActionLogWhereInput | Prisma.AdminUserActionLogWhereInput[];
    operatorId?: Prisma.StringFilter<"AdminUserActionLog"> | string;
    targetUserId?: Prisma.StringFilter<"AdminUserActionLog"> | string;
    action?: Prisma.EnumAdminUserActionTypeFilter<"AdminUserActionLog"> | $Enums.AdminUserActionType;
    detail?: Prisma.StringNullableFilter<"AdminUserActionLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AdminUserActionLog"> | Date | string;
    operator?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    targetUser?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type AdminUserActionLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrder;
    targetUserId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    detail?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AdminUserActionLogCountOrderByAggregateInput;
    _max?: Prisma.AdminUserActionLogMaxOrderByAggregateInput;
    _min?: Prisma.AdminUserActionLogMinOrderByAggregateInput;
};
export type AdminUserActionLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.AdminUserActionLogScalarWhereWithAggregatesInput | Prisma.AdminUserActionLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.AdminUserActionLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AdminUserActionLogScalarWhereWithAggregatesInput | Prisma.AdminUserActionLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AdminUserActionLog"> | string;
    operatorId?: Prisma.StringWithAggregatesFilter<"AdminUserActionLog"> | string;
    targetUserId?: Prisma.StringWithAggregatesFilter<"AdminUserActionLog"> | string;
    action?: Prisma.EnumAdminUserActionTypeWithAggregatesFilter<"AdminUserActionLog"> | $Enums.AdminUserActionType;
    detail?: Prisma.StringNullableWithAggregatesFilter<"AdminUserActionLog"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AdminUserActionLog"> | Date | string;
};
export type AdminUserActionLogCreateInput = {
    id?: string;
    action: $Enums.AdminUserActionType;
    detail?: string | null;
    createdAt?: Date | string;
    operator: Prisma.UserCreateNestedOneWithoutAdminUserActionsInput;
    targetUser: Prisma.UserCreateNestedOneWithoutAdminUserActionsTargetInput;
};
export type AdminUserActionLogUncheckedCreateInput = {
    id?: string;
    operatorId: string;
    targetUserId: string;
    action: $Enums.AdminUserActionType;
    detail?: string | null;
    createdAt?: Date | string;
};
export type AdminUserActionLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumAdminUserActionTypeFieldUpdateOperationsInput | $Enums.AdminUserActionType;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operator?: Prisma.UserUpdateOneRequiredWithoutAdminUserActionsNestedInput;
    targetUser?: Prisma.UserUpdateOneRequiredWithoutAdminUserActionsTargetNestedInput;
};
export type AdminUserActionLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    operatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumAdminUserActionTypeFieldUpdateOperationsInput | $Enums.AdminUserActionType;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminUserActionLogCreateManyInput = {
    id?: string;
    operatorId: string;
    targetUserId: string;
    action: $Enums.AdminUserActionType;
    detail?: string | null;
    createdAt?: Date | string;
};
export type AdminUserActionLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumAdminUserActionTypeFieldUpdateOperationsInput | $Enums.AdminUserActionType;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminUserActionLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    operatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    targetUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumAdminUserActionTypeFieldUpdateOperationsInput | $Enums.AdminUserActionType;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminUserActionLogListRelationFilter = {
    every?: Prisma.AdminUserActionLogWhereInput;
    some?: Prisma.AdminUserActionLogWhereInput;
    none?: Prisma.AdminUserActionLogWhereInput;
};
export type AdminUserActionLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AdminUserActionLogOrderByRelevanceInput = {
    fields: Prisma.AdminUserActionLogOrderByRelevanceFieldEnum | Prisma.AdminUserActionLogOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type AdminUserActionLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrder;
    targetUserId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    detail?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AdminUserActionLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrder;
    targetUserId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    detail?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AdminUserActionLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrder;
    targetUserId?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    detail?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AdminUserActionLogCreateNestedManyWithoutOperatorInput = {
    create?: Prisma.XOR<Prisma.AdminUserActionLogCreateWithoutOperatorInput, Prisma.AdminUserActionLogUncheckedCreateWithoutOperatorInput> | Prisma.AdminUserActionLogCreateWithoutOperatorInput[] | Prisma.AdminUserActionLogUncheckedCreateWithoutOperatorInput[];
    connectOrCreate?: Prisma.AdminUserActionLogCreateOrConnectWithoutOperatorInput | Prisma.AdminUserActionLogCreateOrConnectWithoutOperatorInput[];
    createMany?: Prisma.AdminUserActionLogCreateManyOperatorInputEnvelope;
    connect?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
};
export type AdminUserActionLogCreateNestedManyWithoutTargetUserInput = {
    create?: Prisma.XOR<Prisma.AdminUserActionLogCreateWithoutTargetUserInput, Prisma.AdminUserActionLogUncheckedCreateWithoutTargetUserInput> | Prisma.AdminUserActionLogCreateWithoutTargetUserInput[] | Prisma.AdminUserActionLogUncheckedCreateWithoutTargetUserInput[];
    connectOrCreate?: Prisma.AdminUserActionLogCreateOrConnectWithoutTargetUserInput | Prisma.AdminUserActionLogCreateOrConnectWithoutTargetUserInput[];
    createMany?: Prisma.AdminUserActionLogCreateManyTargetUserInputEnvelope;
    connect?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
};
export type AdminUserActionLogUncheckedCreateNestedManyWithoutOperatorInput = {
    create?: Prisma.XOR<Prisma.AdminUserActionLogCreateWithoutOperatorInput, Prisma.AdminUserActionLogUncheckedCreateWithoutOperatorInput> | Prisma.AdminUserActionLogCreateWithoutOperatorInput[] | Prisma.AdminUserActionLogUncheckedCreateWithoutOperatorInput[];
    connectOrCreate?: Prisma.AdminUserActionLogCreateOrConnectWithoutOperatorInput | Prisma.AdminUserActionLogCreateOrConnectWithoutOperatorInput[];
    createMany?: Prisma.AdminUserActionLogCreateManyOperatorInputEnvelope;
    connect?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
};
export type AdminUserActionLogUncheckedCreateNestedManyWithoutTargetUserInput = {
    create?: Prisma.XOR<Prisma.AdminUserActionLogCreateWithoutTargetUserInput, Prisma.AdminUserActionLogUncheckedCreateWithoutTargetUserInput> | Prisma.AdminUserActionLogCreateWithoutTargetUserInput[] | Prisma.AdminUserActionLogUncheckedCreateWithoutTargetUserInput[];
    connectOrCreate?: Prisma.AdminUserActionLogCreateOrConnectWithoutTargetUserInput | Prisma.AdminUserActionLogCreateOrConnectWithoutTargetUserInput[];
    createMany?: Prisma.AdminUserActionLogCreateManyTargetUserInputEnvelope;
    connect?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
};
export type AdminUserActionLogUpdateManyWithoutOperatorNestedInput = {
    create?: Prisma.XOR<Prisma.AdminUserActionLogCreateWithoutOperatorInput, Prisma.AdminUserActionLogUncheckedCreateWithoutOperatorInput> | Prisma.AdminUserActionLogCreateWithoutOperatorInput[] | Prisma.AdminUserActionLogUncheckedCreateWithoutOperatorInput[];
    connectOrCreate?: Prisma.AdminUserActionLogCreateOrConnectWithoutOperatorInput | Prisma.AdminUserActionLogCreateOrConnectWithoutOperatorInput[];
    upsert?: Prisma.AdminUserActionLogUpsertWithWhereUniqueWithoutOperatorInput | Prisma.AdminUserActionLogUpsertWithWhereUniqueWithoutOperatorInput[];
    createMany?: Prisma.AdminUserActionLogCreateManyOperatorInputEnvelope;
    set?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    disconnect?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    delete?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    connect?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    update?: Prisma.AdminUserActionLogUpdateWithWhereUniqueWithoutOperatorInput | Prisma.AdminUserActionLogUpdateWithWhereUniqueWithoutOperatorInput[];
    updateMany?: Prisma.AdminUserActionLogUpdateManyWithWhereWithoutOperatorInput | Prisma.AdminUserActionLogUpdateManyWithWhereWithoutOperatorInput[];
    deleteMany?: Prisma.AdminUserActionLogScalarWhereInput | Prisma.AdminUserActionLogScalarWhereInput[];
};
export type AdminUserActionLogUpdateManyWithoutTargetUserNestedInput = {
    create?: Prisma.XOR<Prisma.AdminUserActionLogCreateWithoutTargetUserInput, Prisma.AdminUserActionLogUncheckedCreateWithoutTargetUserInput> | Prisma.AdminUserActionLogCreateWithoutTargetUserInput[] | Prisma.AdminUserActionLogUncheckedCreateWithoutTargetUserInput[];
    connectOrCreate?: Prisma.AdminUserActionLogCreateOrConnectWithoutTargetUserInput | Prisma.AdminUserActionLogCreateOrConnectWithoutTargetUserInput[];
    upsert?: Prisma.AdminUserActionLogUpsertWithWhereUniqueWithoutTargetUserInput | Prisma.AdminUserActionLogUpsertWithWhereUniqueWithoutTargetUserInput[];
    createMany?: Prisma.AdminUserActionLogCreateManyTargetUserInputEnvelope;
    set?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    disconnect?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    delete?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    connect?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    update?: Prisma.AdminUserActionLogUpdateWithWhereUniqueWithoutTargetUserInput | Prisma.AdminUserActionLogUpdateWithWhereUniqueWithoutTargetUserInput[];
    updateMany?: Prisma.AdminUserActionLogUpdateManyWithWhereWithoutTargetUserInput | Prisma.AdminUserActionLogUpdateManyWithWhereWithoutTargetUserInput[];
    deleteMany?: Prisma.AdminUserActionLogScalarWhereInput | Prisma.AdminUserActionLogScalarWhereInput[];
};
export type AdminUserActionLogUncheckedUpdateManyWithoutOperatorNestedInput = {
    create?: Prisma.XOR<Prisma.AdminUserActionLogCreateWithoutOperatorInput, Prisma.AdminUserActionLogUncheckedCreateWithoutOperatorInput> | Prisma.AdminUserActionLogCreateWithoutOperatorInput[] | Prisma.AdminUserActionLogUncheckedCreateWithoutOperatorInput[];
    connectOrCreate?: Prisma.AdminUserActionLogCreateOrConnectWithoutOperatorInput | Prisma.AdminUserActionLogCreateOrConnectWithoutOperatorInput[];
    upsert?: Prisma.AdminUserActionLogUpsertWithWhereUniqueWithoutOperatorInput | Prisma.AdminUserActionLogUpsertWithWhereUniqueWithoutOperatorInput[];
    createMany?: Prisma.AdminUserActionLogCreateManyOperatorInputEnvelope;
    set?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    disconnect?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    delete?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    connect?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    update?: Prisma.AdminUserActionLogUpdateWithWhereUniqueWithoutOperatorInput | Prisma.AdminUserActionLogUpdateWithWhereUniqueWithoutOperatorInput[];
    updateMany?: Prisma.AdminUserActionLogUpdateManyWithWhereWithoutOperatorInput | Prisma.AdminUserActionLogUpdateManyWithWhereWithoutOperatorInput[];
    deleteMany?: Prisma.AdminUserActionLogScalarWhereInput | Prisma.AdminUserActionLogScalarWhereInput[];
};
export type AdminUserActionLogUncheckedUpdateManyWithoutTargetUserNestedInput = {
    create?: Prisma.XOR<Prisma.AdminUserActionLogCreateWithoutTargetUserInput, Prisma.AdminUserActionLogUncheckedCreateWithoutTargetUserInput> | Prisma.AdminUserActionLogCreateWithoutTargetUserInput[] | Prisma.AdminUserActionLogUncheckedCreateWithoutTargetUserInput[];
    connectOrCreate?: Prisma.AdminUserActionLogCreateOrConnectWithoutTargetUserInput | Prisma.AdminUserActionLogCreateOrConnectWithoutTargetUserInput[];
    upsert?: Prisma.AdminUserActionLogUpsertWithWhereUniqueWithoutTargetUserInput | Prisma.AdminUserActionLogUpsertWithWhereUniqueWithoutTargetUserInput[];
    createMany?: Prisma.AdminUserActionLogCreateManyTargetUserInputEnvelope;
    set?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    disconnect?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    delete?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    connect?: Prisma.AdminUserActionLogWhereUniqueInput | Prisma.AdminUserActionLogWhereUniqueInput[];
    update?: Prisma.AdminUserActionLogUpdateWithWhereUniqueWithoutTargetUserInput | Prisma.AdminUserActionLogUpdateWithWhereUniqueWithoutTargetUserInput[];
    updateMany?: Prisma.AdminUserActionLogUpdateManyWithWhereWithoutTargetUserInput | Prisma.AdminUserActionLogUpdateManyWithWhereWithoutTargetUserInput[];
    deleteMany?: Prisma.AdminUserActionLogScalarWhereInput | Prisma.AdminUserActionLogScalarWhereInput[];
};
export type EnumAdminUserActionTypeFieldUpdateOperationsInput = {
    set?: $Enums.AdminUserActionType;
};
export type AdminUserActionLogCreateWithoutOperatorInput = {
    id?: string;
    action: $Enums.AdminUserActionType;
    detail?: string | null;
    createdAt?: Date | string;
    targetUser: Prisma.UserCreateNestedOneWithoutAdminUserActionsTargetInput;
};
export type AdminUserActionLogUncheckedCreateWithoutOperatorInput = {
    id?: string;
    targetUserId: string;
    action: $Enums.AdminUserActionType;
    detail?: string | null;
    createdAt?: Date | string;
};
export type AdminUserActionLogCreateOrConnectWithoutOperatorInput = {
    where: Prisma.AdminUserActionLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AdminUserActionLogCreateWithoutOperatorInput, Prisma.AdminUserActionLogUncheckedCreateWithoutOperatorInput>;
};
export type AdminUserActionLogCreateManyOperatorInputEnvelope = {
    data: Prisma.AdminUserActionLogCreateManyOperatorInput | Prisma.AdminUserActionLogCreateManyOperatorInput[];
    skipDuplicates?: boolean;
};
export type AdminUserActionLogCreateWithoutTargetUserInput = {
    id?: string;
    action: $Enums.AdminUserActionType;
    detail?: string | null;
    createdAt?: Date | string;
    operator: Prisma.UserCreateNestedOneWithoutAdminUserActionsInput;
};
export type AdminUserActionLogUncheckedCreateWithoutTargetUserInput = {
    id?: string;
    operatorId: string;
    action: $Enums.AdminUserActionType;
    detail?: string | null;
    createdAt?: Date | string;
};
export type AdminUserActionLogCreateOrConnectWithoutTargetUserInput = {
    where: Prisma.AdminUserActionLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AdminUserActionLogCreateWithoutTargetUserInput, Prisma.AdminUserActionLogUncheckedCreateWithoutTargetUserInput>;
};
export type AdminUserActionLogCreateManyTargetUserInputEnvelope = {
    data: Prisma.AdminUserActionLogCreateManyTargetUserInput | Prisma.AdminUserActionLogCreateManyTargetUserInput[];
    skipDuplicates?: boolean;
};
export type AdminUserActionLogUpsertWithWhereUniqueWithoutOperatorInput = {
    where: Prisma.AdminUserActionLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.AdminUserActionLogUpdateWithoutOperatorInput, Prisma.AdminUserActionLogUncheckedUpdateWithoutOperatorInput>;
    create: Prisma.XOR<Prisma.AdminUserActionLogCreateWithoutOperatorInput, Prisma.AdminUserActionLogUncheckedCreateWithoutOperatorInput>;
};
export type AdminUserActionLogUpdateWithWhereUniqueWithoutOperatorInput = {
    where: Prisma.AdminUserActionLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.AdminUserActionLogUpdateWithoutOperatorInput, Prisma.AdminUserActionLogUncheckedUpdateWithoutOperatorInput>;
};
export type AdminUserActionLogUpdateManyWithWhereWithoutOperatorInput = {
    where: Prisma.AdminUserActionLogScalarWhereInput;
    data: Prisma.XOR<Prisma.AdminUserActionLogUpdateManyMutationInput, Prisma.AdminUserActionLogUncheckedUpdateManyWithoutOperatorInput>;
};
export type AdminUserActionLogScalarWhereInput = {
    AND?: Prisma.AdminUserActionLogScalarWhereInput | Prisma.AdminUserActionLogScalarWhereInput[];
    OR?: Prisma.AdminUserActionLogScalarWhereInput[];
    NOT?: Prisma.AdminUserActionLogScalarWhereInput | Prisma.AdminUserActionLogScalarWhereInput[];
    id?: Prisma.StringFilter<"AdminUserActionLog"> | string;
    operatorId?: Prisma.StringFilter<"AdminUserActionLog"> | string;
    targetUserId?: Prisma.StringFilter<"AdminUserActionLog"> | string;
    action?: Prisma.EnumAdminUserActionTypeFilter<"AdminUserActionLog"> | $Enums.AdminUserActionType;
    detail?: Prisma.StringNullableFilter<"AdminUserActionLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AdminUserActionLog"> | Date | string;
};
export type AdminUserActionLogUpsertWithWhereUniqueWithoutTargetUserInput = {
    where: Prisma.AdminUserActionLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.AdminUserActionLogUpdateWithoutTargetUserInput, Prisma.AdminUserActionLogUncheckedUpdateWithoutTargetUserInput>;
    create: Prisma.XOR<Prisma.AdminUserActionLogCreateWithoutTargetUserInput, Prisma.AdminUserActionLogUncheckedCreateWithoutTargetUserInput>;
};
export type AdminUserActionLogUpdateWithWhereUniqueWithoutTargetUserInput = {
    where: Prisma.AdminUserActionLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.AdminUserActionLogUpdateWithoutTargetUserInput, Prisma.AdminUserActionLogUncheckedUpdateWithoutTargetUserInput>;
};
export type AdminUserActionLogUpdateManyWithWhereWithoutTargetUserInput = {
    where: Prisma.AdminUserActionLogScalarWhereInput;
    data: Prisma.XOR<Prisma.AdminUserActionLogUpdateManyMutationInput, Prisma.AdminUserActionLogUncheckedUpdateManyWithoutTargetUserInput>;
};
export type AdminUserActionLogCreateManyOperatorInput = {
    id?: string;
    targetUserId: string;
    action: $Enums.AdminUserActionType;
    detail?: string | null;
    createdAt?: Date | string;
};
export type AdminUserActionLogCreateManyTargetUserInput = {
    id?: string;
    operatorId: string;
    action: $Enums.AdminUserActionType;
    detail?: string | null;
    createdAt?: Date | string;
};
export type AdminUserActionLogUpdateWithoutOperatorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumAdminUserActionTypeFieldUpdateOperationsInput | $Enums.AdminUserActionType;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    targetUser?: Prisma.UserUpdateOneRequiredWithoutAdminUserActionsTargetNestedInput;
};
export type AdminUserActionLogUncheckedUpdateWithoutOperatorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumAdminUserActionTypeFieldUpdateOperationsInput | $Enums.AdminUserActionType;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminUserActionLogUncheckedUpdateManyWithoutOperatorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    targetUserId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumAdminUserActionTypeFieldUpdateOperationsInput | $Enums.AdminUserActionType;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminUserActionLogUpdateWithoutTargetUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumAdminUserActionTypeFieldUpdateOperationsInput | $Enums.AdminUserActionType;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operator?: Prisma.UserUpdateOneRequiredWithoutAdminUserActionsNestedInput;
};
export type AdminUserActionLogUncheckedUpdateWithoutTargetUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    operatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumAdminUserActionTypeFieldUpdateOperationsInput | $Enums.AdminUserActionType;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminUserActionLogUncheckedUpdateManyWithoutTargetUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    operatorId?: Prisma.StringFieldUpdateOperationsInput | string;
    action?: Prisma.EnumAdminUserActionTypeFieldUpdateOperationsInput | $Enums.AdminUserActionType;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AdminUserActionLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    operatorId?: boolean;
    targetUserId?: boolean;
    action?: boolean;
    detail?: boolean;
    createdAt?: boolean;
    operator?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    targetUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["adminUserActionLog"]>;
export type AdminUserActionLogSelectScalar = {
    id?: boolean;
    operatorId?: boolean;
    targetUserId?: boolean;
    action?: boolean;
    detail?: boolean;
    createdAt?: boolean;
};
export type AdminUserActionLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "operatorId" | "targetUserId" | "action" | "detail" | "createdAt", ExtArgs["result"]["adminUserActionLog"]>;
export type AdminUserActionLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operator?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    targetUser?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $AdminUserActionLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AdminUserActionLog";
    objects: {
        operator: Prisma.$UserPayload<ExtArgs>;
        targetUser: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        operatorId: string;
        targetUserId: string;
        action: $Enums.AdminUserActionType;
        detail: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["adminUserActionLog"]>;
    composites: {};
};
export type AdminUserActionLogGetPayload<S extends boolean | null | undefined | AdminUserActionLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AdminUserActionLogPayload, S>;
export type AdminUserActionLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AdminUserActionLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AdminUserActionLogCountAggregateInputType | true;
};
export interface AdminUserActionLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AdminUserActionLog'];
        meta: {
            name: 'AdminUserActionLog';
        };
    };
    findUnique<T extends AdminUserActionLogFindUniqueArgs>(args: Prisma.SelectSubset<T, AdminUserActionLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AdminUserActionLogClient<runtime.Types.Result.GetResult<Prisma.$AdminUserActionLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AdminUserActionLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AdminUserActionLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AdminUserActionLogClient<runtime.Types.Result.GetResult<Prisma.$AdminUserActionLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AdminUserActionLogFindFirstArgs>(args?: Prisma.SelectSubset<T, AdminUserActionLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__AdminUserActionLogClient<runtime.Types.Result.GetResult<Prisma.$AdminUserActionLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AdminUserActionLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AdminUserActionLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AdminUserActionLogClient<runtime.Types.Result.GetResult<Prisma.$AdminUserActionLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AdminUserActionLogFindManyArgs>(args?: Prisma.SelectSubset<T, AdminUserActionLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AdminUserActionLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AdminUserActionLogCreateArgs>(args: Prisma.SelectSubset<T, AdminUserActionLogCreateArgs<ExtArgs>>): Prisma.Prisma__AdminUserActionLogClient<runtime.Types.Result.GetResult<Prisma.$AdminUserActionLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AdminUserActionLogCreateManyArgs>(args?: Prisma.SelectSubset<T, AdminUserActionLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends AdminUserActionLogDeleteArgs>(args: Prisma.SelectSubset<T, AdminUserActionLogDeleteArgs<ExtArgs>>): Prisma.Prisma__AdminUserActionLogClient<runtime.Types.Result.GetResult<Prisma.$AdminUserActionLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AdminUserActionLogUpdateArgs>(args: Prisma.SelectSubset<T, AdminUserActionLogUpdateArgs<ExtArgs>>): Prisma.Prisma__AdminUserActionLogClient<runtime.Types.Result.GetResult<Prisma.$AdminUserActionLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AdminUserActionLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, AdminUserActionLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AdminUserActionLogUpdateManyArgs>(args: Prisma.SelectSubset<T, AdminUserActionLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends AdminUserActionLogUpsertArgs>(args: Prisma.SelectSubset<T, AdminUserActionLogUpsertArgs<ExtArgs>>): Prisma.Prisma__AdminUserActionLogClient<runtime.Types.Result.GetResult<Prisma.$AdminUserActionLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AdminUserActionLogCountArgs>(args?: Prisma.Subset<T, AdminUserActionLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AdminUserActionLogCountAggregateOutputType> : number>;
    aggregate<T extends AdminUserActionLogAggregateArgs>(args: Prisma.Subset<T, AdminUserActionLogAggregateArgs>): Prisma.PrismaPromise<GetAdminUserActionLogAggregateType<T>>;
    groupBy<T extends AdminUserActionLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AdminUserActionLogGroupByArgs['orderBy'];
    } : {
        orderBy?: AdminUserActionLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AdminUserActionLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminUserActionLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AdminUserActionLogFieldRefs;
}
export interface Prisma__AdminUserActionLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    operator<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    targetUser<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AdminUserActionLogFieldRefs {
    readonly id: Prisma.FieldRef<"AdminUserActionLog", 'String'>;
    readonly operatorId: Prisma.FieldRef<"AdminUserActionLog", 'String'>;
    readonly targetUserId: Prisma.FieldRef<"AdminUserActionLog", 'String'>;
    readonly action: Prisma.FieldRef<"AdminUserActionLog", 'AdminUserActionType'>;
    readonly detail: Prisma.FieldRef<"AdminUserActionLog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AdminUserActionLog", 'DateTime'>;
}
export type AdminUserActionLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminUserActionLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminUserActionLogOmit<ExtArgs> | null;
    include?: Prisma.AdminUserActionLogInclude<ExtArgs> | null;
    where: Prisma.AdminUserActionLogWhereUniqueInput;
};
export type AdminUserActionLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminUserActionLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminUserActionLogOmit<ExtArgs> | null;
    include?: Prisma.AdminUserActionLogInclude<ExtArgs> | null;
    where: Prisma.AdminUserActionLogWhereUniqueInput;
};
export type AdminUserActionLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminUserActionLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminUserActionLogOmit<ExtArgs> | null;
    include?: Prisma.AdminUserActionLogInclude<ExtArgs> | null;
    where?: Prisma.AdminUserActionLogWhereInput;
    orderBy?: Prisma.AdminUserActionLogOrderByWithRelationInput | Prisma.AdminUserActionLogOrderByWithRelationInput[];
    cursor?: Prisma.AdminUserActionLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AdminUserActionLogScalarFieldEnum | Prisma.AdminUserActionLogScalarFieldEnum[];
};
export type AdminUserActionLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminUserActionLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminUserActionLogOmit<ExtArgs> | null;
    include?: Prisma.AdminUserActionLogInclude<ExtArgs> | null;
    where?: Prisma.AdminUserActionLogWhereInput;
    orderBy?: Prisma.AdminUserActionLogOrderByWithRelationInput | Prisma.AdminUserActionLogOrderByWithRelationInput[];
    cursor?: Prisma.AdminUserActionLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AdminUserActionLogScalarFieldEnum | Prisma.AdminUserActionLogScalarFieldEnum[];
};
export type AdminUserActionLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminUserActionLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminUserActionLogOmit<ExtArgs> | null;
    include?: Prisma.AdminUserActionLogInclude<ExtArgs> | null;
    where?: Prisma.AdminUserActionLogWhereInput;
    orderBy?: Prisma.AdminUserActionLogOrderByWithRelationInput | Prisma.AdminUserActionLogOrderByWithRelationInput[];
    cursor?: Prisma.AdminUserActionLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AdminUserActionLogScalarFieldEnum | Prisma.AdminUserActionLogScalarFieldEnum[];
};
export type AdminUserActionLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminUserActionLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminUserActionLogOmit<ExtArgs> | null;
    include?: Prisma.AdminUserActionLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AdminUserActionLogCreateInput, Prisma.AdminUserActionLogUncheckedCreateInput>;
};
export type AdminUserActionLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AdminUserActionLogCreateManyInput | Prisma.AdminUserActionLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AdminUserActionLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminUserActionLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminUserActionLogOmit<ExtArgs> | null;
    include?: Prisma.AdminUserActionLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AdminUserActionLogUpdateInput, Prisma.AdminUserActionLogUncheckedUpdateInput>;
    where: Prisma.AdminUserActionLogWhereUniqueInput;
};
export type AdminUserActionLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AdminUserActionLogUpdateManyMutationInput, Prisma.AdminUserActionLogUncheckedUpdateManyInput>;
    where?: Prisma.AdminUserActionLogWhereInput;
    limit?: number;
};
export type AdminUserActionLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminUserActionLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminUserActionLogOmit<ExtArgs> | null;
    include?: Prisma.AdminUserActionLogInclude<ExtArgs> | null;
    where: Prisma.AdminUserActionLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.AdminUserActionLogCreateInput, Prisma.AdminUserActionLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AdminUserActionLogUpdateInput, Prisma.AdminUserActionLogUncheckedUpdateInput>;
};
export type AdminUserActionLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminUserActionLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminUserActionLogOmit<ExtArgs> | null;
    include?: Prisma.AdminUserActionLogInclude<ExtArgs> | null;
    where: Prisma.AdminUserActionLogWhereUniqueInput;
};
export type AdminUserActionLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AdminUserActionLogWhereInput;
    limit?: number;
};
export type AdminUserActionLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AdminUserActionLogSelect<ExtArgs> | null;
    omit?: Prisma.AdminUserActionLogOmit<ExtArgs> | null;
    include?: Prisma.AdminUserActionLogInclude<ExtArgs> | null;
};
export {};
