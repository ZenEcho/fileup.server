import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type SystemConfigAuditLogModel = runtime.Types.Result.DefaultSelection<Prisma.$SystemConfigAuditLogPayload>;
export type AggregateSystemConfigAuditLog = {
    _count: SystemConfigAuditLogCountAggregateOutputType | null;
    _min: SystemConfigAuditLogMinAggregateOutputType | null;
    _max: SystemConfigAuditLogMaxAggregateOutputType | null;
};
export type SystemConfigAuditLogMinAggregateOutputType = {
    id: string | null;
    category: $Enums.SystemConfigAuditCategory | null;
    action: string | null;
    operatorId: string | null;
    success: boolean | null;
    detail: string | null;
    createdAt: Date | null;
};
export type SystemConfigAuditLogMaxAggregateOutputType = {
    id: string | null;
    category: $Enums.SystemConfigAuditCategory | null;
    action: string | null;
    operatorId: string | null;
    success: boolean | null;
    detail: string | null;
    createdAt: Date | null;
};
export type SystemConfigAuditLogCountAggregateOutputType = {
    id: number;
    category: number;
    action: number;
    operatorId: number;
    success: number;
    detail: number;
    createdAt: number;
    _all: number;
};
export type SystemConfigAuditLogMinAggregateInputType = {
    id?: true;
    category?: true;
    action?: true;
    operatorId?: true;
    success?: true;
    detail?: true;
    createdAt?: true;
};
export type SystemConfigAuditLogMaxAggregateInputType = {
    id?: true;
    category?: true;
    action?: true;
    operatorId?: true;
    success?: true;
    detail?: true;
    createdAt?: true;
};
export type SystemConfigAuditLogCountAggregateInputType = {
    id?: true;
    category?: true;
    action?: true;
    operatorId?: true;
    success?: true;
    detail?: true;
    createdAt?: true;
    _all?: true;
};
export type SystemConfigAuditLogAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SystemConfigAuditLogWhereInput;
    orderBy?: Prisma.SystemConfigAuditLogOrderByWithRelationInput | Prisma.SystemConfigAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.SystemConfigAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | SystemConfigAuditLogCountAggregateInputType;
    _min?: SystemConfigAuditLogMinAggregateInputType;
    _max?: SystemConfigAuditLogMaxAggregateInputType;
};
export type GetSystemConfigAuditLogAggregateType<T extends SystemConfigAuditLogAggregateArgs> = {
    [P in keyof T & keyof AggregateSystemConfigAuditLog]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSystemConfigAuditLog[P]> : Prisma.GetScalarType<T[P], AggregateSystemConfigAuditLog[P]>;
};
export type SystemConfigAuditLogGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SystemConfigAuditLogWhereInput;
    orderBy?: Prisma.SystemConfigAuditLogOrderByWithAggregationInput | Prisma.SystemConfigAuditLogOrderByWithAggregationInput[];
    by: Prisma.SystemConfigAuditLogScalarFieldEnum[] | Prisma.SystemConfigAuditLogScalarFieldEnum;
    having?: Prisma.SystemConfigAuditLogScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SystemConfigAuditLogCountAggregateInputType | true;
    _min?: SystemConfigAuditLogMinAggregateInputType;
    _max?: SystemConfigAuditLogMaxAggregateInputType;
};
export type SystemConfigAuditLogGroupByOutputType = {
    id: string;
    category: $Enums.SystemConfigAuditCategory;
    action: string;
    operatorId: string | null;
    success: boolean;
    detail: string | null;
    createdAt: Date;
    _count: SystemConfigAuditLogCountAggregateOutputType | null;
    _min: SystemConfigAuditLogMinAggregateOutputType | null;
    _max: SystemConfigAuditLogMaxAggregateOutputType | null;
};
type GetSystemConfigAuditLogGroupByPayload<T extends SystemConfigAuditLogGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SystemConfigAuditLogGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SystemConfigAuditLogGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SystemConfigAuditLogGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SystemConfigAuditLogGroupByOutputType[P]>;
}>>;
export type SystemConfigAuditLogWhereInput = {
    AND?: Prisma.SystemConfigAuditLogWhereInput | Prisma.SystemConfigAuditLogWhereInput[];
    OR?: Prisma.SystemConfigAuditLogWhereInput[];
    NOT?: Prisma.SystemConfigAuditLogWhereInput | Prisma.SystemConfigAuditLogWhereInput[];
    id?: Prisma.StringFilter<"SystemConfigAuditLog"> | string;
    category?: Prisma.EnumSystemConfigAuditCategoryFilter<"SystemConfigAuditLog"> | $Enums.SystemConfigAuditCategory;
    action?: Prisma.StringFilter<"SystemConfigAuditLog"> | string;
    operatorId?: Prisma.StringNullableFilter<"SystemConfigAuditLog"> | string | null;
    success?: Prisma.BoolFilter<"SystemConfigAuditLog"> | boolean;
    detail?: Prisma.StringNullableFilter<"SystemConfigAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SystemConfigAuditLog"> | Date | string;
    operator?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
};
export type SystemConfigAuditLogOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    success?: Prisma.SortOrder;
    detail?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    operator?: Prisma.UserOrderByWithRelationInput;
    _relevance?: Prisma.SystemConfigAuditLogOrderByRelevanceInput;
};
export type SystemConfigAuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SystemConfigAuditLogWhereInput | Prisma.SystemConfigAuditLogWhereInput[];
    OR?: Prisma.SystemConfigAuditLogWhereInput[];
    NOT?: Prisma.SystemConfigAuditLogWhereInput | Prisma.SystemConfigAuditLogWhereInput[];
    category?: Prisma.EnumSystemConfigAuditCategoryFilter<"SystemConfigAuditLog"> | $Enums.SystemConfigAuditCategory;
    action?: Prisma.StringFilter<"SystemConfigAuditLog"> | string;
    operatorId?: Prisma.StringNullableFilter<"SystemConfigAuditLog"> | string | null;
    success?: Prisma.BoolFilter<"SystemConfigAuditLog"> | boolean;
    detail?: Prisma.StringNullableFilter<"SystemConfigAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SystemConfigAuditLog"> | Date | string;
    operator?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
}, "id">;
export type SystemConfigAuditLogOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    success?: Prisma.SortOrder;
    detail?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SystemConfigAuditLogCountOrderByAggregateInput;
    _max?: Prisma.SystemConfigAuditLogMaxOrderByAggregateInput;
    _min?: Prisma.SystemConfigAuditLogMinOrderByAggregateInput;
};
export type SystemConfigAuditLogScalarWhereWithAggregatesInput = {
    AND?: Prisma.SystemConfigAuditLogScalarWhereWithAggregatesInput | Prisma.SystemConfigAuditLogScalarWhereWithAggregatesInput[];
    OR?: Prisma.SystemConfigAuditLogScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SystemConfigAuditLogScalarWhereWithAggregatesInput | Prisma.SystemConfigAuditLogScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"SystemConfigAuditLog"> | string;
    category?: Prisma.EnumSystemConfigAuditCategoryWithAggregatesFilter<"SystemConfigAuditLog"> | $Enums.SystemConfigAuditCategory;
    action?: Prisma.StringWithAggregatesFilter<"SystemConfigAuditLog"> | string;
    operatorId?: Prisma.StringNullableWithAggregatesFilter<"SystemConfigAuditLog"> | string | null;
    success?: Prisma.BoolWithAggregatesFilter<"SystemConfigAuditLog"> | boolean;
    detail?: Prisma.StringNullableWithAggregatesFilter<"SystemConfigAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"SystemConfigAuditLog"> | Date | string;
};
export type SystemConfigAuditLogCreateInput = {
    id?: string;
    category: $Enums.SystemConfigAuditCategory;
    action: string;
    success?: boolean;
    detail?: string | null;
    createdAt?: Date | string;
    operator?: Prisma.UserCreateNestedOneWithoutSystemConfigAuditLogsInput;
};
export type SystemConfigAuditLogUncheckedCreateInput = {
    id?: string;
    category: $Enums.SystemConfigAuditCategory;
    action: string;
    operatorId?: string | null;
    success?: boolean;
    detail?: string | null;
    createdAt?: Date | string;
};
export type SystemConfigAuditLogUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumSystemConfigAuditCategoryFieldUpdateOperationsInput | $Enums.SystemConfigAuditCategory;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    operator?: Prisma.UserUpdateOneWithoutSystemConfigAuditLogsNestedInput;
};
export type SystemConfigAuditLogUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumSystemConfigAuditCategoryFieldUpdateOperationsInput | $Enums.SystemConfigAuditCategory;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    operatorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemConfigAuditLogCreateManyInput = {
    id?: string;
    category: $Enums.SystemConfigAuditCategory;
    action: string;
    operatorId?: string | null;
    success?: boolean;
    detail?: string | null;
    createdAt?: Date | string;
};
export type SystemConfigAuditLogUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumSystemConfigAuditCategoryFieldUpdateOperationsInput | $Enums.SystemConfigAuditCategory;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemConfigAuditLogUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumSystemConfigAuditCategoryFieldUpdateOperationsInput | $Enums.SystemConfigAuditCategory;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    operatorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemConfigAuditLogListRelationFilter = {
    every?: Prisma.SystemConfigAuditLogWhereInput;
    some?: Prisma.SystemConfigAuditLogWhereInput;
    none?: Prisma.SystemConfigAuditLogWhereInput;
};
export type SystemConfigAuditLogOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SystemConfigAuditLogOrderByRelevanceInput = {
    fields: Prisma.SystemConfigAuditLogOrderByRelevanceFieldEnum | Prisma.SystemConfigAuditLogOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type SystemConfigAuditLogCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    detail?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SystemConfigAuditLogMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    detail?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SystemConfigAuditLogMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    category?: Prisma.SortOrder;
    action?: Prisma.SortOrder;
    operatorId?: Prisma.SortOrder;
    success?: Prisma.SortOrder;
    detail?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SystemConfigAuditLogCreateNestedManyWithoutOperatorInput = {
    create?: Prisma.XOR<Prisma.SystemConfigAuditLogCreateWithoutOperatorInput, Prisma.SystemConfigAuditLogUncheckedCreateWithoutOperatorInput> | Prisma.SystemConfigAuditLogCreateWithoutOperatorInput[] | Prisma.SystemConfigAuditLogUncheckedCreateWithoutOperatorInput[];
    connectOrCreate?: Prisma.SystemConfigAuditLogCreateOrConnectWithoutOperatorInput | Prisma.SystemConfigAuditLogCreateOrConnectWithoutOperatorInput[];
    createMany?: Prisma.SystemConfigAuditLogCreateManyOperatorInputEnvelope;
    connect?: Prisma.SystemConfigAuditLogWhereUniqueInput | Prisma.SystemConfigAuditLogWhereUniqueInput[];
};
export type SystemConfigAuditLogUncheckedCreateNestedManyWithoutOperatorInput = {
    create?: Prisma.XOR<Prisma.SystemConfigAuditLogCreateWithoutOperatorInput, Prisma.SystemConfigAuditLogUncheckedCreateWithoutOperatorInput> | Prisma.SystemConfigAuditLogCreateWithoutOperatorInput[] | Prisma.SystemConfigAuditLogUncheckedCreateWithoutOperatorInput[];
    connectOrCreate?: Prisma.SystemConfigAuditLogCreateOrConnectWithoutOperatorInput | Prisma.SystemConfigAuditLogCreateOrConnectWithoutOperatorInput[];
    createMany?: Prisma.SystemConfigAuditLogCreateManyOperatorInputEnvelope;
    connect?: Prisma.SystemConfigAuditLogWhereUniqueInput | Prisma.SystemConfigAuditLogWhereUniqueInput[];
};
export type SystemConfigAuditLogUpdateManyWithoutOperatorNestedInput = {
    create?: Prisma.XOR<Prisma.SystemConfigAuditLogCreateWithoutOperatorInput, Prisma.SystemConfigAuditLogUncheckedCreateWithoutOperatorInput> | Prisma.SystemConfigAuditLogCreateWithoutOperatorInput[] | Prisma.SystemConfigAuditLogUncheckedCreateWithoutOperatorInput[];
    connectOrCreate?: Prisma.SystemConfigAuditLogCreateOrConnectWithoutOperatorInput | Prisma.SystemConfigAuditLogCreateOrConnectWithoutOperatorInput[];
    upsert?: Prisma.SystemConfigAuditLogUpsertWithWhereUniqueWithoutOperatorInput | Prisma.SystemConfigAuditLogUpsertWithWhereUniqueWithoutOperatorInput[];
    createMany?: Prisma.SystemConfigAuditLogCreateManyOperatorInputEnvelope;
    set?: Prisma.SystemConfigAuditLogWhereUniqueInput | Prisma.SystemConfigAuditLogWhereUniqueInput[];
    disconnect?: Prisma.SystemConfigAuditLogWhereUniqueInput | Prisma.SystemConfigAuditLogWhereUniqueInput[];
    delete?: Prisma.SystemConfigAuditLogWhereUniqueInput | Prisma.SystemConfigAuditLogWhereUniqueInput[];
    connect?: Prisma.SystemConfigAuditLogWhereUniqueInput | Prisma.SystemConfigAuditLogWhereUniqueInput[];
    update?: Prisma.SystemConfigAuditLogUpdateWithWhereUniqueWithoutOperatorInput | Prisma.SystemConfigAuditLogUpdateWithWhereUniqueWithoutOperatorInput[];
    updateMany?: Prisma.SystemConfigAuditLogUpdateManyWithWhereWithoutOperatorInput | Prisma.SystemConfigAuditLogUpdateManyWithWhereWithoutOperatorInput[];
    deleteMany?: Prisma.SystemConfigAuditLogScalarWhereInput | Prisma.SystemConfigAuditLogScalarWhereInput[];
};
export type SystemConfigAuditLogUncheckedUpdateManyWithoutOperatorNestedInput = {
    create?: Prisma.XOR<Prisma.SystemConfigAuditLogCreateWithoutOperatorInput, Prisma.SystemConfigAuditLogUncheckedCreateWithoutOperatorInput> | Prisma.SystemConfigAuditLogCreateWithoutOperatorInput[] | Prisma.SystemConfigAuditLogUncheckedCreateWithoutOperatorInput[];
    connectOrCreate?: Prisma.SystemConfigAuditLogCreateOrConnectWithoutOperatorInput | Prisma.SystemConfigAuditLogCreateOrConnectWithoutOperatorInput[];
    upsert?: Prisma.SystemConfigAuditLogUpsertWithWhereUniqueWithoutOperatorInput | Prisma.SystemConfigAuditLogUpsertWithWhereUniqueWithoutOperatorInput[];
    createMany?: Prisma.SystemConfigAuditLogCreateManyOperatorInputEnvelope;
    set?: Prisma.SystemConfigAuditLogWhereUniqueInput | Prisma.SystemConfigAuditLogWhereUniqueInput[];
    disconnect?: Prisma.SystemConfigAuditLogWhereUniqueInput | Prisma.SystemConfigAuditLogWhereUniqueInput[];
    delete?: Prisma.SystemConfigAuditLogWhereUniqueInput | Prisma.SystemConfigAuditLogWhereUniqueInput[];
    connect?: Prisma.SystemConfigAuditLogWhereUniqueInput | Prisma.SystemConfigAuditLogWhereUniqueInput[];
    update?: Prisma.SystemConfigAuditLogUpdateWithWhereUniqueWithoutOperatorInput | Prisma.SystemConfigAuditLogUpdateWithWhereUniqueWithoutOperatorInput[];
    updateMany?: Prisma.SystemConfigAuditLogUpdateManyWithWhereWithoutOperatorInput | Prisma.SystemConfigAuditLogUpdateManyWithWhereWithoutOperatorInput[];
    deleteMany?: Prisma.SystemConfigAuditLogScalarWhereInput | Prisma.SystemConfigAuditLogScalarWhereInput[];
};
export type EnumSystemConfigAuditCategoryFieldUpdateOperationsInput = {
    set?: $Enums.SystemConfigAuditCategory;
};
export type SystemConfigAuditLogCreateWithoutOperatorInput = {
    id?: string;
    category: $Enums.SystemConfigAuditCategory;
    action: string;
    success?: boolean;
    detail?: string | null;
    createdAt?: Date | string;
};
export type SystemConfigAuditLogUncheckedCreateWithoutOperatorInput = {
    id?: string;
    category: $Enums.SystemConfigAuditCategory;
    action: string;
    success?: boolean;
    detail?: string | null;
    createdAt?: Date | string;
};
export type SystemConfigAuditLogCreateOrConnectWithoutOperatorInput = {
    where: Prisma.SystemConfigAuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.SystemConfigAuditLogCreateWithoutOperatorInput, Prisma.SystemConfigAuditLogUncheckedCreateWithoutOperatorInput>;
};
export type SystemConfigAuditLogCreateManyOperatorInputEnvelope = {
    data: Prisma.SystemConfigAuditLogCreateManyOperatorInput | Prisma.SystemConfigAuditLogCreateManyOperatorInput[];
    skipDuplicates?: boolean;
};
export type SystemConfigAuditLogUpsertWithWhereUniqueWithoutOperatorInput = {
    where: Prisma.SystemConfigAuditLogWhereUniqueInput;
    update: Prisma.XOR<Prisma.SystemConfigAuditLogUpdateWithoutOperatorInput, Prisma.SystemConfigAuditLogUncheckedUpdateWithoutOperatorInput>;
    create: Prisma.XOR<Prisma.SystemConfigAuditLogCreateWithoutOperatorInput, Prisma.SystemConfigAuditLogUncheckedCreateWithoutOperatorInput>;
};
export type SystemConfigAuditLogUpdateWithWhereUniqueWithoutOperatorInput = {
    where: Prisma.SystemConfigAuditLogWhereUniqueInput;
    data: Prisma.XOR<Prisma.SystemConfigAuditLogUpdateWithoutOperatorInput, Prisma.SystemConfigAuditLogUncheckedUpdateWithoutOperatorInput>;
};
export type SystemConfigAuditLogUpdateManyWithWhereWithoutOperatorInput = {
    where: Prisma.SystemConfigAuditLogScalarWhereInput;
    data: Prisma.XOR<Prisma.SystemConfigAuditLogUpdateManyMutationInput, Prisma.SystemConfigAuditLogUncheckedUpdateManyWithoutOperatorInput>;
};
export type SystemConfigAuditLogScalarWhereInput = {
    AND?: Prisma.SystemConfigAuditLogScalarWhereInput | Prisma.SystemConfigAuditLogScalarWhereInput[];
    OR?: Prisma.SystemConfigAuditLogScalarWhereInput[];
    NOT?: Prisma.SystemConfigAuditLogScalarWhereInput | Prisma.SystemConfigAuditLogScalarWhereInput[];
    id?: Prisma.StringFilter<"SystemConfigAuditLog"> | string;
    category?: Prisma.EnumSystemConfigAuditCategoryFilter<"SystemConfigAuditLog"> | $Enums.SystemConfigAuditCategory;
    action?: Prisma.StringFilter<"SystemConfigAuditLog"> | string;
    operatorId?: Prisma.StringNullableFilter<"SystemConfigAuditLog"> | string | null;
    success?: Prisma.BoolFilter<"SystemConfigAuditLog"> | boolean;
    detail?: Prisma.StringNullableFilter<"SystemConfigAuditLog"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"SystemConfigAuditLog"> | Date | string;
};
export type SystemConfigAuditLogCreateManyOperatorInput = {
    id?: string;
    category: $Enums.SystemConfigAuditCategory;
    action: string;
    success?: boolean;
    detail?: string | null;
    createdAt?: Date | string;
};
export type SystemConfigAuditLogUpdateWithoutOperatorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumSystemConfigAuditCategoryFieldUpdateOperationsInput | $Enums.SystemConfigAuditCategory;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemConfigAuditLogUncheckedUpdateWithoutOperatorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumSystemConfigAuditCategoryFieldUpdateOperationsInput | $Enums.SystemConfigAuditCategory;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemConfigAuditLogUncheckedUpdateManyWithoutOperatorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    category?: Prisma.EnumSystemConfigAuditCategoryFieldUpdateOperationsInput | $Enums.SystemConfigAuditCategory;
    action?: Prisma.StringFieldUpdateOperationsInput | string;
    success?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    detail?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SystemConfigAuditLogSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    category?: boolean;
    action?: boolean;
    operatorId?: boolean;
    success?: boolean;
    detail?: boolean;
    createdAt?: boolean;
    operator?: boolean | Prisma.SystemConfigAuditLog$operatorArgs<ExtArgs>;
}, ExtArgs["result"]["systemConfigAuditLog"]>;
export type SystemConfigAuditLogSelectScalar = {
    id?: boolean;
    category?: boolean;
    action?: boolean;
    operatorId?: boolean;
    success?: boolean;
    detail?: boolean;
    createdAt?: boolean;
};
export type SystemConfigAuditLogOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "category" | "action" | "operatorId" | "success" | "detail" | "createdAt", ExtArgs["result"]["systemConfigAuditLog"]>;
export type SystemConfigAuditLogInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    operator?: boolean | Prisma.SystemConfigAuditLog$operatorArgs<ExtArgs>;
};
export type $SystemConfigAuditLogPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "SystemConfigAuditLog";
    objects: {
        operator: Prisma.$UserPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        category: $Enums.SystemConfigAuditCategory;
        action: string;
        operatorId: string | null;
        success: boolean;
        detail: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["systemConfigAuditLog"]>;
    composites: {};
};
export type SystemConfigAuditLogGetPayload<S extends boolean | null | undefined | SystemConfigAuditLogDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SystemConfigAuditLogPayload, S>;
export type SystemConfigAuditLogCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SystemConfigAuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SystemConfigAuditLogCountAggregateInputType | true;
};
export interface SystemConfigAuditLogDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['SystemConfigAuditLog'];
        meta: {
            name: 'SystemConfigAuditLog';
        };
    };
    findUnique<T extends SystemConfigAuditLogFindUniqueArgs>(args: Prisma.SelectSubset<T, SystemConfigAuditLogFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SystemConfigAuditLogClient<runtime.Types.Result.GetResult<Prisma.$SystemConfigAuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends SystemConfigAuditLogFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SystemConfigAuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SystemConfigAuditLogClient<runtime.Types.Result.GetResult<Prisma.$SystemConfigAuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends SystemConfigAuditLogFindFirstArgs>(args?: Prisma.SelectSubset<T, SystemConfigAuditLogFindFirstArgs<ExtArgs>>): Prisma.Prisma__SystemConfigAuditLogClient<runtime.Types.Result.GetResult<Prisma.$SystemConfigAuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends SystemConfigAuditLogFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SystemConfigAuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SystemConfigAuditLogClient<runtime.Types.Result.GetResult<Prisma.$SystemConfigAuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends SystemConfigAuditLogFindManyArgs>(args?: Prisma.SelectSubset<T, SystemConfigAuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SystemConfigAuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends SystemConfigAuditLogCreateArgs>(args: Prisma.SelectSubset<T, SystemConfigAuditLogCreateArgs<ExtArgs>>): Prisma.Prisma__SystemConfigAuditLogClient<runtime.Types.Result.GetResult<Prisma.$SystemConfigAuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends SystemConfigAuditLogCreateManyArgs>(args?: Prisma.SelectSubset<T, SystemConfigAuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends SystemConfigAuditLogDeleteArgs>(args: Prisma.SelectSubset<T, SystemConfigAuditLogDeleteArgs<ExtArgs>>): Prisma.Prisma__SystemConfigAuditLogClient<runtime.Types.Result.GetResult<Prisma.$SystemConfigAuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends SystemConfigAuditLogUpdateArgs>(args: Prisma.SelectSubset<T, SystemConfigAuditLogUpdateArgs<ExtArgs>>): Prisma.Prisma__SystemConfigAuditLogClient<runtime.Types.Result.GetResult<Prisma.$SystemConfigAuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends SystemConfigAuditLogDeleteManyArgs>(args?: Prisma.SelectSubset<T, SystemConfigAuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends SystemConfigAuditLogUpdateManyArgs>(args: Prisma.SelectSubset<T, SystemConfigAuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends SystemConfigAuditLogUpsertArgs>(args: Prisma.SelectSubset<T, SystemConfigAuditLogUpsertArgs<ExtArgs>>): Prisma.Prisma__SystemConfigAuditLogClient<runtime.Types.Result.GetResult<Prisma.$SystemConfigAuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends SystemConfigAuditLogCountArgs>(args?: Prisma.Subset<T, SystemConfigAuditLogCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SystemConfigAuditLogCountAggregateOutputType> : number>;
    aggregate<T extends SystemConfigAuditLogAggregateArgs>(args: Prisma.Subset<T, SystemConfigAuditLogAggregateArgs>): Prisma.PrismaPromise<GetSystemConfigAuditLogAggregateType<T>>;
    groupBy<T extends SystemConfigAuditLogGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SystemConfigAuditLogGroupByArgs['orderBy'];
    } : {
        orderBy?: SystemConfigAuditLogGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SystemConfigAuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSystemConfigAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: SystemConfigAuditLogFieldRefs;
}
export interface Prisma__SystemConfigAuditLogClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    operator<T extends Prisma.SystemConfigAuditLog$operatorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.SystemConfigAuditLog$operatorArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface SystemConfigAuditLogFieldRefs {
    readonly id: Prisma.FieldRef<"SystemConfigAuditLog", 'String'>;
    readonly category: Prisma.FieldRef<"SystemConfigAuditLog", 'SystemConfigAuditCategory'>;
    readonly action: Prisma.FieldRef<"SystemConfigAuditLog", 'String'>;
    readonly operatorId: Prisma.FieldRef<"SystemConfigAuditLog", 'String'>;
    readonly success: Prisma.FieldRef<"SystemConfigAuditLog", 'Boolean'>;
    readonly detail: Prisma.FieldRef<"SystemConfigAuditLog", 'String'>;
    readonly createdAt: Prisma.FieldRef<"SystemConfigAuditLog", 'DateTime'>;
}
export type SystemConfigAuditLogFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemConfigAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.SystemConfigAuditLogOmit<ExtArgs> | null;
    include?: Prisma.SystemConfigAuditLogInclude<ExtArgs> | null;
    where: Prisma.SystemConfigAuditLogWhereUniqueInput;
};
export type SystemConfigAuditLogFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemConfigAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.SystemConfigAuditLogOmit<ExtArgs> | null;
    include?: Prisma.SystemConfigAuditLogInclude<ExtArgs> | null;
    where: Prisma.SystemConfigAuditLogWhereUniqueInput;
};
export type SystemConfigAuditLogFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemConfigAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.SystemConfigAuditLogOmit<ExtArgs> | null;
    include?: Prisma.SystemConfigAuditLogInclude<ExtArgs> | null;
    where?: Prisma.SystemConfigAuditLogWhereInput;
    orderBy?: Prisma.SystemConfigAuditLogOrderByWithRelationInput | Prisma.SystemConfigAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.SystemConfigAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SystemConfigAuditLogScalarFieldEnum | Prisma.SystemConfigAuditLogScalarFieldEnum[];
};
export type SystemConfigAuditLogFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemConfigAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.SystemConfigAuditLogOmit<ExtArgs> | null;
    include?: Prisma.SystemConfigAuditLogInclude<ExtArgs> | null;
    where?: Prisma.SystemConfigAuditLogWhereInput;
    orderBy?: Prisma.SystemConfigAuditLogOrderByWithRelationInput | Prisma.SystemConfigAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.SystemConfigAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SystemConfigAuditLogScalarFieldEnum | Prisma.SystemConfigAuditLogScalarFieldEnum[];
};
export type SystemConfigAuditLogFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemConfigAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.SystemConfigAuditLogOmit<ExtArgs> | null;
    include?: Prisma.SystemConfigAuditLogInclude<ExtArgs> | null;
    where?: Prisma.SystemConfigAuditLogWhereInput;
    orderBy?: Prisma.SystemConfigAuditLogOrderByWithRelationInput | Prisma.SystemConfigAuditLogOrderByWithRelationInput[];
    cursor?: Prisma.SystemConfigAuditLogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SystemConfigAuditLogScalarFieldEnum | Prisma.SystemConfigAuditLogScalarFieldEnum[];
};
export type SystemConfigAuditLogCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemConfigAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.SystemConfigAuditLogOmit<ExtArgs> | null;
    include?: Prisma.SystemConfigAuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SystemConfigAuditLogCreateInput, Prisma.SystemConfigAuditLogUncheckedCreateInput>;
};
export type SystemConfigAuditLogCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.SystemConfigAuditLogCreateManyInput | Prisma.SystemConfigAuditLogCreateManyInput[];
    skipDuplicates?: boolean;
};
export type SystemConfigAuditLogUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemConfigAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.SystemConfigAuditLogOmit<ExtArgs> | null;
    include?: Prisma.SystemConfigAuditLogInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.SystemConfigAuditLogUpdateInput, Prisma.SystemConfigAuditLogUncheckedUpdateInput>;
    where: Prisma.SystemConfigAuditLogWhereUniqueInput;
};
export type SystemConfigAuditLogUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.SystemConfigAuditLogUpdateManyMutationInput, Prisma.SystemConfigAuditLogUncheckedUpdateManyInput>;
    where?: Prisma.SystemConfigAuditLogWhereInput;
    limit?: number;
};
export type SystemConfigAuditLogUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemConfigAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.SystemConfigAuditLogOmit<ExtArgs> | null;
    include?: Prisma.SystemConfigAuditLogInclude<ExtArgs> | null;
    where: Prisma.SystemConfigAuditLogWhereUniqueInput;
    create: Prisma.XOR<Prisma.SystemConfigAuditLogCreateInput, Prisma.SystemConfigAuditLogUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.SystemConfigAuditLogUpdateInput, Prisma.SystemConfigAuditLogUncheckedUpdateInput>;
};
export type SystemConfigAuditLogDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemConfigAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.SystemConfigAuditLogOmit<ExtArgs> | null;
    include?: Prisma.SystemConfigAuditLogInclude<ExtArgs> | null;
    where: Prisma.SystemConfigAuditLogWhereUniqueInput;
};
export type SystemConfigAuditLogDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SystemConfigAuditLogWhereInput;
    limit?: number;
};
export type SystemConfigAuditLog$operatorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type SystemConfigAuditLogDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.SystemConfigAuditLogSelect<ExtArgs> | null;
    omit?: Prisma.SystemConfigAuditLogOmit<ExtArgs> | null;
    include?: Prisma.SystemConfigAuditLogInclude<ExtArgs> | null;
};
export {};
