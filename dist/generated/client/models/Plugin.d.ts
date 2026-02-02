import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PluginModel = runtime.Types.Result.DefaultSelection<Prisma.$PluginPayload>;
export type AggregatePlugin = {
    _count: PluginCountAggregateOutputType | null;
    _avg: PluginAvgAggregateOutputType | null;
    _sum: PluginSumAggregateOutputType | null;
    _min: PluginMinAggregateOutputType | null;
    _max: PluginMaxAggregateOutputType | null;
};
export type PluginAvgAggregateOutputType = {
    downloads: number | null;
};
export type PluginSumAggregateOutputType = {
    downloads: bigint | null;
};
export type PluginMinAggregateOutputType = {
    id: string | null;
    authorId: string | null;
    name: string | null;
    description: string | null;
    icon: string | null;
    downloads: bigint | null;
    isPublic: boolean | null;
    adminDisabled: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PluginMaxAggregateOutputType = {
    id: string | null;
    authorId: string | null;
    name: string | null;
    description: string | null;
    icon: string | null;
    downloads: bigint | null;
    isPublic: boolean | null;
    adminDisabled: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PluginCountAggregateOutputType = {
    id: number;
    authorId: number;
    name: number;
    description: number;
    icon: number;
    downloads: number;
    isPublic: number;
    adminDisabled: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PluginAvgAggregateInputType = {
    downloads?: true;
};
export type PluginSumAggregateInputType = {
    downloads?: true;
};
export type PluginMinAggregateInputType = {
    id?: true;
    authorId?: true;
    name?: true;
    description?: true;
    icon?: true;
    downloads?: true;
    isPublic?: true;
    adminDisabled?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PluginMaxAggregateInputType = {
    id?: true;
    authorId?: true;
    name?: true;
    description?: true;
    icon?: true;
    downloads?: true;
    isPublic?: true;
    adminDisabled?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PluginCountAggregateInputType = {
    id?: true;
    authorId?: true;
    name?: true;
    description?: true;
    icon?: true;
    downloads?: true;
    isPublic?: true;
    adminDisabled?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PluginAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginWhereInput;
    orderBy?: Prisma.PluginOrderByWithRelationInput | Prisma.PluginOrderByWithRelationInput[];
    cursor?: Prisma.PluginWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PluginCountAggregateInputType;
    _avg?: PluginAvgAggregateInputType;
    _sum?: PluginSumAggregateInputType;
    _min?: PluginMinAggregateInputType;
    _max?: PluginMaxAggregateInputType;
};
export type GetPluginAggregateType<T extends PluginAggregateArgs> = {
    [P in keyof T & keyof AggregatePlugin]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePlugin[P]> : Prisma.GetScalarType<T[P], AggregatePlugin[P]>;
};
export type PluginGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginWhereInput;
    orderBy?: Prisma.PluginOrderByWithAggregationInput | Prisma.PluginOrderByWithAggregationInput[];
    by: Prisma.PluginScalarFieldEnum[] | Prisma.PluginScalarFieldEnum;
    having?: Prisma.PluginScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PluginCountAggregateInputType | true;
    _avg?: PluginAvgAggregateInputType;
    _sum?: PluginSumAggregateInputType;
    _min?: PluginMinAggregateInputType;
    _max?: PluginMaxAggregateInputType;
};
export type PluginGroupByOutputType = {
    id: string;
    authorId: string;
    name: string;
    description: string;
    icon: string;
    downloads: bigint;
    isPublic: boolean;
    adminDisabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: PluginCountAggregateOutputType | null;
    _avg: PluginAvgAggregateOutputType | null;
    _sum: PluginSumAggregateOutputType | null;
    _min: PluginMinAggregateOutputType | null;
    _max: PluginMaxAggregateOutputType | null;
};
type GetPluginGroupByPayload<T extends PluginGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PluginGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PluginGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PluginGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PluginGroupByOutputType[P]>;
}>>;
export type PluginWhereInput = {
    AND?: Prisma.PluginWhereInput | Prisma.PluginWhereInput[];
    OR?: Prisma.PluginWhereInput[];
    NOT?: Prisma.PluginWhereInput | Prisma.PluginWhereInput[];
    id?: Prisma.StringFilter<"Plugin"> | string;
    authorId?: Prisma.StringFilter<"Plugin"> | string;
    name?: Prisma.StringFilter<"Plugin"> | string;
    description?: Prisma.StringFilter<"Plugin"> | string;
    icon?: Prisma.StringFilter<"Plugin"> | string;
    downloads?: Prisma.BigIntFilter<"Plugin"> | bigint | number;
    isPublic?: Prisma.BoolFilter<"Plugin"> | boolean;
    adminDisabled?: Prisma.BoolFilter<"Plugin"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Plugin"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Plugin"> | Date | string;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    versions?: Prisma.PluginVersionListRelationFilter;
    downloadsList?: Prisma.PluginDownloadListRelationFilter;
};
export type PluginOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    downloads?: Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    adminDisabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    author?: Prisma.UserOrderByWithRelationInput;
    versions?: Prisma.PluginVersionOrderByRelationAggregateInput;
    downloadsList?: Prisma.PluginDownloadOrderByRelationAggregateInput;
    _relevance?: Prisma.PluginOrderByRelevanceInput;
};
export type PluginWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PluginWhereInput | Prisma.PluginWhereInput[];
    OR?: Prisma.PluginWhereInput[];
    NOT?: Prisma.PluginWhereInput | Prisma.PluginWhereInput[];
    authorId?: Prisma.StringFilter<"Plugin"> | string;
    name?: Prisma.StringFilter<"Plugin"> | string;
    description?: Prisma.StringFilter<"Plugin"> | string;
    icon?: Prisma.StringFilter<"Plugin"> | string;
    downloads?: Prisma.BigIntFilter<"Plugin"> | bigint | number;
    isPublic?: Prisma.BoolFilter<"Plugin"> | boolean;
    adminDisabled?: Prisma.BoolFilter<"Plugin"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Plugin"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Plugin"> | Date | string;
    author?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    versions?: Prisma.PluginVersionListRelationFilter;
    downloadsList?: Prisma.PluginDownloadListRelationFilter;
}, "id">;
export type PluginOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    downloads?: Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    adminDisabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PluginCountOrderByAggregateInput;
    _avg?: Prisma.PluginAvgOrderByAggregateInput;
    _max?: Prisma.PluginMaxOrderByAggregateInput;
    _min?: Prisma.PluginMinOrderByAggregateInput;
    _sum?: Prisma.PluginSumOrderByAggregateInput;
};
export type PluginScalarWhereWithAggregatesInput = {
    AND?: Prisma.PluginScalarWhereWithAggregatesInput | Prisma.PluginScalarWhereWithAggregatesInput[];
    OR?: Prisma.PluginScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PluginScalarWhereWithAggregatesInput | Prisma.PluginScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Plugin"> | string;
    authorId?: Prisma.StringWithAggregatesFilter<"Plugin"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Plugin"> | string;
    description?: Prisma.StringWithAggregatesFilter<"Plugin"> | string;
    icon?: Prisma.StringWithAggregatesFilter<"Plugin"> | string;
    downloads?: Prisma.BigIntWithAggregatesFilter<"Plugin"> | bigint | number;
    isPublic?: Prisma.BoolWithAggregatesFilter<"Plugin"> | boolean;
    adminDisabled?: Prisma.BoolWithAggregatesFilter<"Plugin"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Plugin"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Plugin"> | Date | string;
};
export type PluginCreateInput = {
    id: string;
    name: string;
    description: string;
    icon: string;
    downloads?: bigint | number;
    isPublic?: boolean;
    adminDisabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutPluginsInput;
    versions?: Prisma.PluginVersionCreateNestedManyWithoutPluginInput;
    downloadsList?: Prisma.PluginDownloadCreateNestedManyWithoutPluginInput;
};
export type PluginUncheckedCreateInput = {
    id: string;
    authorId: string;
    name: string;
    description: string;
    icon: string;
    downloads?: bigint | number;
    isPublic?: boolean;
    adminDisabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    versions?: Prisma.PluginVersionUncheckedCreateNestedManyWithoutPluginInput;
    downloadsList?: Prisma.PluginDownloadUncheckedCreateNestedManyWithoutPluginInput;
};
export type PluginUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    downloads?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    adminDisabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutPluginsNestedInput;
    versions?: Prisma.PluginVersionUpdateManyWithoutPluginNestedInput;
    downloadsList?: Prisma.PluginDownloadUpdateManyWithoutPluginNestedInput;
};
export type PluginUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    downloads?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    adminDisabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    versions?: Prisma.PluginVersionUncheckedUpdateManyWithoutPluginNestedInput;
    downloadsList?: Prisma.PluginDownloadUncheckedUpdateManyWithoutPluginNestedInput;
};
export type PluginCreateManyInput = {
    id: string;
    authorId: string;
    name: string;
    description: string;
    icon: string;
    downloads?: bigint | number;
    isPublic?: boolean;
    adminDisabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PluginUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    downloads?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    adminDisabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    downloads?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    adminDisabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginListRelationFilter = {
    every?: Prisma.PluginWhereInput;
    some?: Prisma.PluginWhereInput;
    none?: Prisma.PluginWhereInput;
};
export type PluginOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PluginOrderByRelevanceInput = {
    fields: Prisma.PluginOrderByRelevanceFieldEnum | Prisma.PluginOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type PluginCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    downloads?: Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    adminDisabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PluginAvgOrderByAggregateInput = {
    downloads?: Prisma.SortOrder;
};
export type PluginMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    downloads?: Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    adminDisabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PluginMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    icon?: Prisma.SortOrder;
    downloads?: Prisma.SortOrder;
    isPublic?: Prisma.SortOrder;
    adminDisabled?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PluginSumOrderByAggregateInput = {
    downloads?: Prisma.SortOrder;
};
export type PluginScalarRelationFilter = {
    is?: Prisma.PluginWhereInput;
    isNot?: Prisma.PluginWhereInput;
};
export type PluginCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.PluginCreateWithoutAuthorInput, Prisma.PluginUncheckedCreateWithoutAuthorInput> | Prisma.PluginCreateWithoutAuthorInput[] | Prisma.PluginUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.PluginCreateOrConnectWithoutAuthorInput | Prisma.PluginCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.PluginCreateManyAuthorInputEnvelope;
    connect?: Prisma.PluginWhereUniqueInput | Prisma.PluginWhereUniqueInput[];
};
export type PluginUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.PluginCreateWithoutAuthorInput, Prisma.PluginUncheckedCreateWithoutAuthorInput> | Prisma.PluginCreateWithoutAuthorInput[] | Prisma.PluginUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.PluginCreateOrConnectWithoutAuthorInput | Prisma.PluginCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.PluginCreateManyAuthorInputEnvelope;
    connect?: Prisma.PluginWhereUniqueInput | Prisma.PluginWhereUniqueInput[];
};
export type PluginUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.PluginCreateWithoutAuthorInput, Prisma.PluginUncheckedCreateWithoutAuthorInput> | Prisma.PluginCreateWithoutAuthorInput[] | Prisma.PluginUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.PluginCreateOrConnectWithoutAuthorInput | Prisma.PluginCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.PluginUpsertWithWhereUniqueWithoutAuthorInput | Prisma.PluginUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.PluginCreateManyAuthorInputEnvelope;
    set?: Prisma.PluginWhereUniqueInput | Prisma.PluginWhereUniqueInput[];
    disconnect?: Prisma.PluginWhereUniqueInput | Prisma.PluginWhereUniqueInput[];
    delete?: Prisma.PluginWhereUniqueInput | Prisma.PluginWhereUniqueInput[];
    connect?: Prisma.PluginWhereUniqueInput | Prisma.PluginWhereUniqueInput[];
    update?: Prisma.PluginUpdateWithWhereUniqueWithoutAuthorInput | Prisma.PluginUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.PluginUpdateManyWithWhereWithoutAuthorInput | Prisma.PluginUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.PluginScalarWhereInput | Prisma.PluginScalarWhereInput[];
};
export type PluginUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.PluginCreateWithoutAuthorInput, Prisma.PluginUncheckedCreateWithoutAuthorInput> | Prisma.PluginCreateWithoutAuthorInput[] | Prisma.PluginUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.PluginCreateOrConnectWithoutAuthorInput | Prisma.PluginCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.PluginUpsertWithWhereUniqueWithoutAuthorInput | Prisma.PluginUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.PluginCreateManyAuthorInputEnvelope;
    set?: Prisma.PluginWhereUniqueInput | Prisma.PluginWhereUniqueInput[];
    disconnect?: Prisma.PluginWhereUniqueInput | Prisma.PluginWhereUniqueInput[];
    delete?: Prisma.PluginWhereUniqueInput | Prisma.PluginWhereUniqueInput[];
    connect?: Prisma.PluginWhereUniqueInput | Prisma.PluginWhereUniqueInput[];
    update?: Prisma.PluginUpdateWithWhereUniqueWithoutAuthorInput | Prisma.PluginUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.PluginUpdateManyWithWhereWithoutAuthorInput | Prisma.PluginUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.PluginScalarWhereInput | Prisma.PluginScalarWhereInput[];
};
export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number;
    increment?: bigint | number;
    decrement?: bigint | number;
    multiply?: bigint | number;
    divide?: bigint | number;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type PluginCreateNestedOneWithoutDownloadsListInput = {
    create?: Prisma.XOR<Prisma.PluginCreateWithoutDownloadsListInput, Prisma.PluginUncheckedCreateWithoutDownloadsListInput>;
    connectOrCreate?: Prisma.PluginCreateOrConnectWithoutDownloadsListInput;
    connect?: Prisma.PluginWhereUniqueInput;
};
export type PluginUpdateOneRequiredWithoutDownloadsListNestedInput = {
    create?: Prisma.XOR<Prisma.PluginCreateWithoutDownloadsListInput, Prisma.PluginUncheckedCreateWithoutDownloadsListInput>;
    connectOrCreate?: Prisma.PluginCreateOrConnectWithoutDownloadsListInput;
    upsert?: Prisma.PluginUpsertWithoutDownloadsListInput;
    connect?: Prisma.PluginWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PluginUpdateToOneWithWhereWithoutDownloadsListInput, Prisma.PluginUpdateWithoutDownloadsListInput>, Prisma.PluginUncheckedUpdateWithoutDownloadsListInput>;
};
export type PluginCreateNestedOneWithoutVersionsInput = {
    create?: Prisma.XOR<Prisma.PluginCreateWithoutVersionsInput, Prisma.PluginUncheckedCreateWithoutVersionsInput>;
    connectOrCreate?: Prisma.PluginCreateOrConnectWithoutVersionsInput;
    connect?: Prisma.PluginWhereUniqueInput;
};
export type PluginUpdateOneRequiredWithoutVersionsNestedInput = {
    create?: Prisma.XOR<Prisma.PluginCreateWithoutVersionsInput, Prisma.PluginUncheckedCreateWithoutVersionsInput>;
    connectOrCreate?: Prisma.PluginCreateOrConnectWithoutVersionsInput;
    upsert?: Prisma.PluginUpsertWithoutVersionsInput;
    connect?: Prisma.PluginWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PluginUpdateToOneWithWhereWithoutVersionsInput, Prisma.PluginUpdateWithoutVersionsInput>, Prisma.PluginUncheckedUpdateWithoutVersionsInput>;
};
export type PluginCreateWithoutAuthorInput = {
    id: string;
    name: string;
    description: string;
    icon: string;
    downloads?: bigint | number;
    isPublic?: boolean;
    adminDisabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    versions?: Prisma.PluginVersionCreateNestedManyWithoutPluginInput;
    downloadsList?: Prisma.PluginDownloadCreateNestedManyWithoutPluginInput;
};
export type PluginUncheckedCreateWithoutAuthorInput = {
    id: string;
    name: string;
    description: string;
    icon: string;
    downloads?: bigint | number;
    isPublic?: boolean;
    adminDisabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    versions?: Prisma.PluginVersionUncheckedCreateNestedManyWithoutPluginInput;
    downloadsList?: Prisma.PluginDownloadUncheckedCreateNestedManyWithoutPluginInput;
};
export type PluginCreateOrConnectWithoutAuthorInput = {
    where: Prisma.PluginWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginCreateWithoutAuthorInput, Prisma.PluginUncheckedCreateWithoutAuthorInput>;
};
export type PluginCreateManyAuthorInputEnvelope = {
    data: Prisma.PluginCreateManyAuthorInput | Prisma.PluginCreateManyAuthorInput[];
    skipDuplicates?: boolean;
};
export type PluginUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.PluginWhereUniqueInput;
    update: Prisma.XOR<Prisma.PluginUpdateWithoutAuthorInput, Prisma.PluginUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.PluginCreateWithoutAuthorInput, Prisma.PluginUncheckedCreateWithoutAuthorInput>;
};
export type PluginUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.PluginWhereUniqueInput;
    data: Prisma.XOR<Prisma.PluginUpdateWithoutAuthorInput, Prisma.PluginUncheckedUpdateWithoutAuthorInput>;
};
export type PluginUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.PluginScalarWhereInput;
    data: Prisma.XOR<Prisma.PluginUpdateManyMutationInput, Prisma.PluginUncheckedUpdateManyWithoutAuthorInput>;
};
export type PluginScalarWhereInput = {
    AND?: Prisma.PluginScalarWhereInput | Prisma.PluginScalarWhereInput[];
    OR?: Prisma.PluginScalarWhereInput[];
    NOT?: Prisma.PluginScalarWhereInput | Prisma.PluginScalarWhereInput[];
    id?: Prisma.StringFilter<"Plugin"> | string;
    authorId?: Prisma.StringFilter<"Plugin"> | string;
    name?: Prisma.StringFilter<"Plugin"> | string;
    description?: Prisma.StringFilter<"Plugin"> | string;
    icon?: Prisma.StringFilter<"Plugin"> | string;
    downloads?: Prisma.BigIntFilter<"Plugin"> | bigint | number;
    isPublic?: Prisma.BoolFilter<"Plugin"> | boolean;
    adminDisabled?: Prisma.BoolFilter<"Plugin"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"Plugin"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Plugin"> | Date | string;
};
export type PluginCreateWithoutDownloadsListInput = {
    id: string;
    name: string;
    description: string;
    icon: string;
    downloads?: bigint | number;
    isPublic?: boolean;
    adminDisabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutPluginsInput;
    versions?: Prisma.PluginVersionCreateNestedManyWithoutPluginInput;
};
export type PluginUncheckedCreateWithoutDownloadsListInput = {
    id: string;
    authorId: string;
    name: string;
    description: string;
    icon: string;
    downloads?: bigint | number;
    isPublic?: boolean;
    adminDisabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    versions?: Prisma.PluginVersionUncheckedCreateNestedManyWithoutPluginInput;
};
export type PluginCreateOrConnectWithoutDownloadsListInput = {
    where: Prisma.PluginWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginCreateWithoutDownloadsListInput, Prisma.PluginUncheckedCreateWithoutDownloadsListInput>;
};
export type PluginUpsertWithoutDownloadsListInput = {
    update: Prisma.XOR<Prisma.PluginUpdateWithoutDownloadsListInput, Prisma.PluginUncheckedUpdateWithoutDownloadsListInput>;
    create: Prisma.XOR<Prisma.PluginCreateWithoutDownloadsListInput, Prisma.PluginUncheckedCreateWithoutDownloadsListInput>;
    where?: Prisma.PluginWhereInput;
};
export type PluginUpdateToOneWithWhereWithoutDownloadsListInput = {
    where?: Prisma.PluginWhereInput;
    data: Prisma.XOR<Prisma.PluginUpdateWithoutDownloadsListInput, Prisma.PluginUncheckedUpdateWithoutDownloadsListInput>;
};
export type PluginUpdateWithoutDownloadsListInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    downloads?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    adminDisabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutPluginsNestedInput;
    versions?: Prisma.PluginVersionUpdateManyWithoutPluginNestedInput;
};
export type PluginUncheckedUpdateWithoutDownloadsListInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    downloads?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    adminDisabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    versions?: Prisma.PluginVersionUncheckedUpdateManyWithoutPluginNestedInput;
};
export type PluginCreateWithoutVersionsInput = {
    id: string;
    name: string;
    description: string;
    icon: string;
    downloads?: bigint | number;
    isPublic?: boolean;
    adminDisabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author: Prisma.UserCreateNestedOneWithoutPluginsInput;
    downloadsList?: Prisma.PluginDownloadCreateNestedManyWithoutPluginInput;
};
export type PluginUncheckedCreateWithoutVersionsInput = {
    id: string;
    authorId: string;
    name: string;
    description: string;
    icon: string;
    downloads?: bigint | number;
    isPublic?: boolean;
    adminDisabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    downloadsList?: Prisma.PluginDownloadUncheckedCreateNestedManyWithoutPluginInput;
};
export type PluginCreateOrConnectWithoutVersionsInput = {
    where: Prisma.PluginWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginCreateWithoutVersionsInput, Prisma.PluginUncheckedCreateWithoutVersionsInput>;
};
export type PluginUpsertWithoutVersionsInput = {
    update: Prisma.XOR<Prisma.PluginUpdateWithoutVersionsInput, Prisma.PluginUncheckedUpdateWithoutVersionsInput>;
    create: Prisma.XOR<Prisma.PluginCreateWithoutVersionsInput, Prisma.PluginUncheckedCreateWithoutVersionsInput>;
    where?: Prisma.PluginWhereInput;
};
export type PluginUpdateToOneWithWhereWithoutVersionsInput = {
    where?: Prisma.PluginWhereInput;
    data: Prisma.XOR<Prisma.PluginUpdateWithoutVersionsInput, Prisma.PluginUncheckedUpdateWithoutVersionsInput>;
};
export type PluginUpdateWithoutVersionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    downloads?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    adminDisabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneRequiredWithoutPluginsNestedInput;
    downloadsList?: Prisma.PluginDownloadUpdateManyWithoutPluginNestedInput;
};
export type PluginUncheckedUpdateWithoutVersionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorId?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    downloads?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    adminDisabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    downloadsList?: Prisma.PluginDownloadUncheckedUpdateManyWithoutPluginNestedInput;
};
export type PluginCreateManyAuthorInput = {
    id: string;
    name: string;
    description: string;
    icon: string;
    downloads?: bigint | number;
    isPublic?: boolean;
    adminDisabled?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PluginUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    downloads?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    adminDisabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    versions?: Prisma.PluginVersionUpdateManyWithoutPluginNestedInput;
    downloadsList?: Prisma.PluginDownloadUpdateManyWithoutPluginNestedInput;
};
export type PluginUncheckedUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    downloads?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    adminDisabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    versions?: Prisma.PluginVersionUncheckedUpdateManyWithoutPluginNestedInput;
    downloadsList?: Prisma.PluginDownloadUncheckedUpdateManyWithoutPluginNestedInput;
};
export type PluginUncheckedUpdateManyWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.StringFieldUpdateOperationsInput | string;
    icon?: Prisma.StringFieldUpdateOperationsInput | string;
    downloads?: Prisma.BigIntFieldUpdateOperationsInput | bigint | number;
    isPublic?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    adminDisabled?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginCountOutputType = {
    versions: number;
    downloadsList: number;
};
export type PluginCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    versions?: boolean | PluginCountOutputTypeCountVersionsArgs;
    downloadsList?: boolean | PluginCountOutputTypeCountDownloadsListArgs;
};
export type PluginCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginCountOutputTypeSelect<ExtArgs> | null;
};
export type PluginCountOutputTypeCountVersionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginVersionWhereInput;
};
export type PluginCountOutputTypeCountDownloadsListArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginDownloadWhereInput;
};
export type PluginSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    authorId?: boolean;
    name?: boolean;
    description?: boolean;
    icon?: boolean;
    downloads?: boolean;
    isPublic?: boolean;
    adminDisabled?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    versions?: boolean | Prisma.Plugin$versionsArgs<ExtArgs>;
    downloadsList?: boolean | Prisma.Plugin$downloadsListArgs<ExtArgs>;
    _count?: boolean | Prisma.PluginCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["plugin"]>;
export type PluginSelectScalar = {
    id?: boolean;
    authorId?: boolean;
    name?: boolean;
    description?: boolean;
    icon?: boolean;
    downloads?: boolean;
    isPublic?: boolean;
    adminDisabled?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PluginOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "authorId" | "name" | "description" | "icon" | "downloads" | "isPublic" | "adminDisabled" | "createdAt" | "updatedAt", ExtArgs["result"]["plugin"]>;
export type PluginInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    author?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    versions?: boolean | Prisma.Plugin$versionsArgs<ExtArgs>;
    downloadsList?: boolean | Prisma.Plugin$downloadsListArgs<ExtArgs>;
    _count?: boolean | Prisma.PluginCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $PluginPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Plugin";
    objects: {
        author: Prisma.$UserPayload<ExtArgs>;
        versions: Prisma.$PluginVersionPayload<ExtArgs>[];
        downloadsList: Prisma.$PluginDownloadPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        authorId: string;
        name: string;
        description: string;
        icon: string;
        downloads: bigint;
        isPublic: boolean;
        adminDisabled: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["plugin"]>;
    composites: {};
};
export type PluginGetPayload<S extends boolean | null | undefined | PluginDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PluginPayload, S>;
export type PluginCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PluginFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PluginCountAggregateInputType | true;
};
export interface PluginDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Plugin'];
        meta: {
            name: 'Plugin';
        };
    };
    findUnique<T extends PluginFindUniqueArgs>(args: Prisma.SelectSubset<T, PluginFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PluginClient<runtime.Types.Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PluginFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PluginFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PluginClient<runtime.Types.Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PluginFindFirstArgs>(args?: Prisma.SelectSubset<T, PluginFindFirstArgs<ExtArgs>>): Prisma.Prisma__PluginClient<runtime.Types.Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PluginFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PluginFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PluginClient<runtime.Types.Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PluginFindManyArgs>(args?: Prisma.SelectSubset<T, PluginFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PluginCreateArgs>(args: Prisma.SelectSubset<T, PluginCreateArgs<ExtArgs>>): Prisma.Prisma__PluginClient<runtime.Types.Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PluginCreateManyArgs>(args?: Prisma.SelectSubset<T, PluginCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PluginDeleteArgs>(args: Prisma.SelectSubset<T, PluginDeleteArgs<ExtArgs>>): Prisma.Prisma__PluginClient<runtime.Types.Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PluginUpdateArgs>(args: Prisma.SelectSubset<T, PluginUpdateArgs<ExtArgs>>): Prisma.Prisma__PluginClient<runtime.Types.Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PluginDeleteManyArgs>(args?: Prisma.SelectSubset<T, PluginDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PluginUpdateManyArgs>(args: Prisma.SelectSubset<T, PluginUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PluginUpsertArgs>(args: Prisma.SelectSubset<T, PluginUpsertArgs<ExtArgs>>): Prisma.Prisma__PluginClient<runtime.Types.Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PluginCountArgs>(args?: Prisma.Subset<T, PluginCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PluginCountAggregateOutputType> : number>;
    aggregate<T extends PluginAggregateArgs>(args: Prisma.Subset<T, PluginAggregateArgs>): Prisma.PrismaPromise<GetPluginAggregateType<T>>;
    groupBy<T extends PluginGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PluginGroupByArgs['orderBy'];
    } : {
        orderBy?: PluginGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PluginGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPluginGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PluginFieldRefs;
}
export interface Prisma__PluginClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    author<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    versions<T extends Prisma.Plugin$versionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Plugin$versionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PluginVersionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    downloadsList<T extends Prisma.Plugin$downloadsListArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Plugin$downloadsListArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PluginDownloadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PluginFieldRefs {
    readonly id: Prisma.FieldRef<"Plugin", 'String'>;
    readonly authorId: Prisma.FieldRef<"Plugin", 'String'>;
    readonly name: Prisma.FieldRef<"Plugin", 'String'>;
    readonly description: Prisma.FieldRef<"Plugin", 'String'>;
    readonly icon: Prisma.FieldRef<"Plugin", 'String'>;
    readonly downloads: Prisma.FieldRef<"Plugin", 'BigInt'>;
    readonly isPublic: Prisma.FieldRef<"Plugin", 'Boolean'>;
    readonly adminDisabled: Prisma.FieldRef<"Plugin", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"Plugin", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Plugin", 'DateTime'>;
}
export type PluginFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginSelect<ExtArgs> | null;
    omit?: Prisma.PluginOmit<ExtArgs> | null;
    include?: Prisma.PluginInclude<ExtArgs> | null;
    where: Prisma.PluginWhereUniqueInput;
};
export type PluginFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginSelect<ExtArgs> | null;
    omit?: Prisma.PluginOmit<ExtArgs> | null;
    include?: Prisma.PluginInclude<ExtArgs> | null;
    where: Prisma.PluginWhereUniqueInput;
};
export type PluginFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PluginFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PluginFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PluginCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginSelect<ExtArgs> | null;
    omit?: Prisma.PluginOmit<ExtArgs> | null;
    include?: Prisma.PluginInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PluginCreateInput, Prisma.PluginUncheckedCreateInput>;
};
export type PluginCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PluginCreateManyInput | Prisma.PluginCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PluginUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginSelect<ExtArgs> | null;
    omit?: Prisma.PluginOmit<ExtArgs> | null;
    include?: Prisma.PluginInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PluginUpdateInput, Prisma.PluginUncheckedUpdateInput>;
    where: Prisma.PluginWhereUniqueInput;
};
export type PluginUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PluginUpdateManyMutationInput, Prisma.PluginUncheckedUpdateManyInput>;
    where?: Prisma.PluginWhereInput;
    limit?: number;
};
export type PluginUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginSelect<ExtArgs> | null;
    omit?: Prisma.PluginOmit<ExtArgs> | null;
    include?: Prisma.PluginInclude<ExtArgs> | null;
    where: Prisma.PluginWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginCreateInput, Prisma.PluginUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PluginUpdateInput, Prisma.PluginUncheckedUpdateInput>;
};
export type PluginDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginSelect<ExtArgs> | null;
    omit?: Prisma.PluginOmit<ExtArgs> | null;
    include?: Prisma.PluginInclude<ExtArgs> | null;
    where: Prisma.PluginWhereUniqueInput;
};
export type PluginDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginWhereInput;
    limit?: number;
};
export type Plugin$versionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Plugin$downloadsListArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginDownloadSelect<ExtArgs> | null;
    omit?: Prisma.PluginDownloadOmit<ExtArgs> | null;
    include?: Prisma.PluginDownloadInclude<ExtArgs> | null;
    where?: Prisma.PluginDownloadWhereInput;
    orderBy?: Prisma.PluginDownloadOrderByWithRelationInput | Prisma.PluginDownloadOrderByWithRelationInput[];
    cursor?: Prisma.PluginDownloadWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PluginDownloadScalarFieldEnum | Prisma.PluginDownloadScalarFieldEnum[];
};
export type PluginDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginSelect<ExtArgs> | null;
    omit?: Prisma.PluginOmit<ExtArgs> | null;
    include?: Prisma.PluginInclude<ExtArgs> | null;
};
export {};
