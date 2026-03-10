import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PluginReviewModel = runtime.Types.Result.DefaultSelection<Prisma.$PluginReviewPayload>;
export type AggregatePluginReview = {
    _count: PluginReviewCountAggregateOutputType | null;
    _avg: PluginReviewAvgAggregateOutputType | null;
    _sum: PluginReviewSumAggregateOutputType | null;
    _min: PluginReviewMinAggregateOutputType | null;
    _max: PluginReviewMaxAggregateOutputType | null;
};
export type PluginReviewAvgAggregateOutputType = {
    rating: number | null;
};
export type PluginReviewSumAggregateOutputType = {
    rating: number | null;
};
export type PluginReviewMinAggregateOutputType = {
    id: string | null;
    pluginId: string | null;
    userId: string | null;
    rating: number | null;
    content: string | null;
    authorReply: string | null;
    authorReplyById: string | null;
    authorReplyAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PluginReviewMaxAggregateOutputType = {
    id: string | null;
    pluginId: string | null;
    userId: string | null;
    rating: number | null;
    content: string | null;
    authorReply: string | null;
    authorReplyById: string | null;
    authorReplyAt: Date | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PluginReviewCountAggregateOutputType = {
    id: number;
    pluginId: number;
    userId: number;
    rating: number;
    content: number;
    authorReply: number;
    authorReplyById: number;
    authorReplyAt: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PluginReviewAvgAggregateInputType = {
    rating?: true;
};
export type PluginReviewSumAggregateInputType = {
    rating?: true;
};
export type PluginReviewMinAggregateInputType = {
    id?: true;
    pluginId?: true;
    userId?: true;
    rating?: true;
    content?: true;
    authorReply?: true;
    authorReplyById?: true;
    authorReplyAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PluginReviewMaxAggregateInputType = {
    id?: true;
    pluginId?: true;
    userId?: true;
    rating?: true;
    content?: true;
    authorReply?: true;
    authorReplyById?: true;
    authorReplyAt?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PluginReviewCountAggregateInputType = {
    id?: true;
    pluginId?: true;
    userId?: true;
    rating?: true;
    content?: true;
    authorReply?: true;
    authorReplyById?: true;
    authorReplyAt?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PluginReviewAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginReviewWhereInput;
    orderBy?: Prisma.PluginReviewOrderByWithRelationInput | Prisma.PluginReviewOrderByWithRelationInput[];
    cursor?: Prisma.PluginReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PluginReviewCountAggregateInputType;
    _avg?: PluginReviewAvgAggregateInputType;
    _sum?: PluginReviewSumAggregateInputType;
    _min?: PluginReviewMinAggregateInputType;
    _max?: PluginReviewMaxAggregateInputType;
};
export type GetPluginReviewAggregateType<T extends PluginReviewAggregateArgs> = {
    [P in keyof T & keyof AggregatePluginReview]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePluginReview[P]> : Prisma.GetScalarType<T[P], AggregatePluginReview[P]>;
};
export type PluginReviewGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginReviewWhereInput;
    orderBy?: Prisma.PluginReviewOrderByWithAggregationInput | Prisma.PluginReviewOrderByWithAggregationInput[];
    by: Prisma.PluginReviewScalarFieldEnum[] | Prisma.PluginReviewScalarFieldEnum;
    having?: Prisma.PluginReviewScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PluginReviewCountAggregateInputType | true;
    _avg?: PluginReviewAvgAggregateInputType;
    _sum?: PluginReviewSumAggregateInputType;
    _min?: PluginReviewMinAggregateInputType;
    _max?: PluginReviewMaxAggregateInputType;
};
export type PluginReviewGroupByOutputType = {
    id: string;
    pluginId: string;
    userId: string;
    rating: number;
    content: string;
    authorReply: string | null;
    authorReplyById: string | null;
    authorReplyAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
    _count: PluginReviewCountAggregateOutputType | null;
    _avg: PluginReviewAvgAggregateOutputType | null;
    _sum: PluginReviewSumAggregateOutputType | null;
    _min: PluginReviewMinAggregateOutputType | null;
    _max: PluginReviewMaxAggregateOutputType | null;
};
type GetPluginReviewGroupByPayload<T extends PluginReviewGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PluginReviewGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PluginReviewGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PluginReviewGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PluginReviewGroupByOutputType[P]>;
}>>;
export type PluginReviewWhereInput = {
    AND?: Prisma.PluginReviewWhereInput | Prisma.PluginReviewWhereInput[];
    OR?: Prisma.PluginReviewWhereInput[];
    NOT?: Prisma.PluginReviewWhereInput | Prisma.PluginReviewWhereInput[];
    id?: Prisma.StringFilter<"PluginReview"> | string;
    pluginId?: Prisma.StringFilter<"PluginReview"> | string;
    userId?: Prisma.StringFilter<"PluginReview"> | string;
    rating?: Prisma.IntFilter<"PluginReview"> | number;
    content?: Prisma.StringFilter<"PluginReview"> | string;
    authorReply?: Prisma.StringNullableFilter<"PluginReview"> | string | null;
    authorReplyById?: Prisma.StringNullableFilter<"PluginReview"> | string | null;
    authorReplyAt?: Prisma.DateTimeNullableFilter<"PluginReview"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PluginReview"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PluginReview"> | Date | string;
    plugin?: Prisma.XOR<Prisma.PluginScalarRelationFilter, Prisma.PluginWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    authorReplyBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    replies?: Prisma.PluginReviewReplyListRelationFilter;
};
export type PluginReviewOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    authorReply?: Prisma.SortOrderInput | Prisma.SortOrder;
    authorReplyById?: Prisma.SortOrderInput | Prisma.SortOrder;
    authorReplyAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    plugin?: Prisma.PluginOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    authorReplyBy?: Prisma.UserOrderByWithRelationInput;
    replies?: Prisma.PluginReviewReplyOrderByRelationAggregateInput;
    _relevance?: Prisma.PluginReviewOrderByRelevanceInput;
};
export type PluginReviewWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PluginReviewWhereInput | Prisma.PluginReviewWhereInput[];
    OR?: Prisma.PluginReviewWhereInput[];
    NOT?: Prisma.PluginReviewWhereInput | Prisma.PluginReviewWhereInput[];
    pluginId?: Prisma.StringFilter<"PluginReview"> | string;
    userId?: Prisma.StringFilter<"PluginReview"> | string;
    rating?: Prisma.IntFilter<"PluginReview"> | number;
    content?: Prisma.StringFilter<"PluginReview"> | string;
    authorReply?: Prisma.StringNullableFilter<"PluginReview"> | string | null;
    authorReplyById?: Prisma.StringNullableFilter<"PluginReview"> | string | null;
    authorReplyAt?: Prisma.DateTimeNullableFilter<"PluginReview"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PluginReview"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PluginReview"> | Date | string;
    plugin?: Prisma.XOR<Prisma.PluginScalarRelationFilter, Prisma.PluginWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    authorReplyBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    replies?: Prisma.PluginReviewReplyListRelationFilter;
}, "id">;
export type PluginReviewOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    authorReply?: Prisma.SortOrderInput | Prisma.SortOrder;
    authorReplyById?: Prisma.SortOrderInput | Prisma.SortOrder;
    authorReplyAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PluginReviewCountOrderByAggregateInput;
    _avg?: Prisma.PluginReviewAvgOrderByAggregateInput;
    _max?: Prisma.PluginReviewMaxOrderByAggregateInput;
    _min?: Prisma.PluginReviewMinOrderByAggregateInput;
    _sum?: Prisma.PluginReviewSumOrderByAggregateInput;
};
export type PluginReviewScalarWhereWithAggregatesInput = {
    AND?: Prisma.PluginReviewScalarWhereWithAggregatesInput | Prisma.PluginReviewScalarWhereWithAggregatesInput[];
    OR?: Prisma.PluginReviewScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PluginReviewScalarWhereWithAggregatesInput | Prisma.PluginReviewScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PluginReview"> | string;
    pluginId?: Prisma.StringWithAggregatesFilter<"PluginReview"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"PluginReview"> | string;
    rating?: Prisma.IntWithAggregatesFilter<"PluginReview"> | number;
    content?: Prisma.StringWithAggregatesFilter<"PluginReview"> | string;
    authorReply?: Prisma.StringNullableWithAggregatesFilter<"PluginReview"> | string | null;
    authorReplyById?: Prisma.StringNullableWithAggregatesFilter<"PluginReview"> | string | null;
    authorReplyAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PluginReview"> | Date | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PluginReview"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PluginReview"> | Date | string;
};
export type PluginReviewCreateInput = {
    id?: string;
    rating: number;
    content: string;
    authorReply?: string | null;
    authorReplyAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    plugin: Prisma.PluginCreateNestedOneWithoutReviewsInput;
    user: Prisma.UserCreateNestedOneWithoutPluginReviewsInput;
    authorReplyBy?: Prisma.UserCreateNestedOneWithoutRepliedReviewsInput;
    replies?: Prisma.PluginReviewReplyCreateNestedManyWithoutReviewInput;
};
export type PluginReviewUncheckedCreateInput = {
    id?: string;
    pluginId: string;
    userId: string;
    rating: number;
    content: string;
    authorReply?: string | null;
    authorReplyById?: string | null;
    authorReplyAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    replies?: Prisma.PluginReviewReplyUncheckedCreateNestedManyWithoutReviewInput;
};
export type PluginReviewUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plugin?: Prisma.PluginUpdateOneRequiredWithoutReviewsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPluginReviewsNestedInput;
    authorReplyBy?: Prisma.UserUpdateOneWithoutRepliedReviewsNestedInput;
    replies?: Prisma.PluginReviewReplyUpdateManyWithoutReviewNestedInput;
};
export type PluginReviewUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: Prisma.PluginReviewReplyUncheckedUpdateManyWithoutReviewNestedInput;
};
export type PluginReviewCreateManyInput = {
    id?: string;
    pluginId: string;
    userId: string;
    rating: number;
    content: string;
    authorReply?: string | null;
    authorReplyById?: string | null;
    authorReplyAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PluginReviewUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginReviewUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginReviewListRelationFilter = {
    every?: Prisma.PluginReviewWhereInput;
    some?: Prisma.PluginReviewWhereInput;
    none?: Prisma.PluginReviewWhereInput;
};
export type PluginReviewOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PluginReviewOrderByRelevanceInput = {
    fields: Prisma.PluginReviewOrderByRelevanceFieldEnum | Prisma.PluginReviewOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type PluginReviewCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    authorReply?: Prisma.SortOrder;
    authorReplyById?: Prisma.SortOrder;
    authorReplyAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PluginReviewAvgOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
};
export type PluginReviewMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    authorReply?: Prisma.SortOrder;
    authorReplyById?: Prisma.SortOrder;
    authorReplyAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PluginReviewMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    rating?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    authorReply?: Prisma.SortOrder;
    authorReplyById?: Prisma.SortOrder;
    authorReplyAt?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PluginReviewSumOrderByAggregateInput = {
    rating?: Prisma.SortOrder;
};
export type PluginReviewScalarRelationFilter = {
    is?: Prisma.PluginReviewWhereInput;
    isNot?: Prisma.PluginReviewWhereInput;
};
export type PluginReviewCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PluginReviewCreateWithoutUserInput, Prisma.PluginReviewUncheckedCreateWithoutUserInput> | Prisma.PluginReviewCreateWithoutUserInput[] | Prisma.PluginReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PluginReviewCreateOrConnectWithoutUserInput | Prisma.PluginReviewCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PluginReviewCreateManyUserInputEnvelope;
    connect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
};
export type PluginReviewCreateNestedManyWithoutAuthorReplyByInput = {
    create?: Prisma.XOR<Prisma.PluginReviewCreateWithoutAuthorReplyByInput, Prisma.PluginReviewUncheckedCreateWithoutAuthorReplyByInput> | Prisma.PluginReviewCreateWithoutAuthorReplyByInput[] | Prisma.PluginReviewUncheckedCreateWithoutAuthorReplyByInput[];
    connectOrCreate?: Prisma.PluginReviewCreateOrConnectWithoutAuthorReplyByInput | Prisma.PluginReviewCreateOrConnectWithoutAuthorReplyByInput[];
    createMany?: Prisma.PluginReviewCreateManyAuthorReplyByInputEnvelope;
    connect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
};
export type PluginReviewUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PluginReviewCreateWithoutUserInput, Prisma.PluginReviewUncheckedCreateWithoutUserInput> | Prisma.PluginReviewCreateWithoutUserInput[] | Prisma.PluginReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PluginReviewCreateOrConnectWithoutUserInput | Prisma.PluginReviewCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PluginReviewCreateManyUserInputEnvelope;
    connect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
};
export type PluginReviewUncheckedCreateNestedManyWithoutAuthorReplyByInput = {
    create?: Prisma.XOR<Prisma.PluginReviewCreateWithoutAuthorReplyByInput, Prisma.PluginReviewUncheckedCreateWithoutAuthorReplyByInput> | Prisma.PluginReviewCreateWithoutAuthorReplyByInput[] | Prisma.PluginReviewUncheckedCreateWithoutAuthorReplyByInput[];
    connectOrCreate?: Prisma.PluginReviewCreateOrConnectWithoutAuthorReplyByInput | Prisma.PluginReviewCreateOrConnectWithoutAuthorReplyByInput[];
    createMany?: Prisma.PluginReviewCreateManyAuthorReplyByInputEnvelope;
    connect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
};
export type PluginReviewUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PluginReviewCreateWithoutUserInput, Prisma.PluginReviewUncheckedCreateWithoutUserInput> | Prisma.PluginReviewCreateWithoutUserInput[] | Prisma.PluginReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PluginReviewCreateOrConnectWithoutUserInput | Prisma.PluginReviewCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PluginReviewUpsertWithWhereUniqueWithoutUserInput | Prisma.PluginReviewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PluginReviewCreateManyUserInputEnvelope;
    set?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    disconnect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    delete?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    connect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    update?: Prisma.PluginReviewUpdateWithWhereUniqueWithoutUserInput | Prisma.PluginReviewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PluginReviewUpdateManyWithWhereWithoutUserInput | Prisma.PluginReviewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PluginReviewScalarWhereInput | Prisma.PluginReviewScalarWhereInput[];
};
export type PluginReviewUpdateManyWithoutAuthorReplyByNestedInput = {
    create?: Prisma.XOR<Prisma.PluginReviewCreateWithoutAuthorReplyByInput, Prisma.PluginReviewUncheckedCreateWithoutAuthorReplyByInput> | Prisma.PluginReviewCreateWithoutAuthorReplyByInput[] | Prisma.PluginReviewUncheckedCreateWithoutAuthorReplyByInput[];
    connectOrCreate?: Prisma.PluginReviewCreateOrConnectWithoutAuthorReplyByInput | Prisma.PluginReviewCreateOrConnectWithoutAuthorReplyByInput[];
    upsert?: Prisma.PluginReviewUpsertWithWhereUniqueWithoutAuthorReplyByInput | Prisma.PluginReviewUpsertWithWhereUniqueWithoutAuthorReplyByInput[];
    createMany?: Prisma.PluginReviewCreateManyAuthorReplyByInputEnvelope;
    set?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    disconnect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    delete?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    connect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    update?: Prisma.PluginReviewUpdateWithWhereUniqueWithoutAuthorReplyByInput | Prisma.PluginReviewUpdateWithWhereUniqueWithoutAuthorReplyByInput[];
    updateMany?: Prisma.PluginReviewUpdateManyWithWhereWithoutAuthorReplyByInput | Prisma.PluginReviewUpdateManyWithWhereWithoutAuthorReplyByInput[];
    deleteMany?: Prisma.PluginReviewScalarWhereInput | Prisma.PluginReviewScalarWhereInput[];
};
export type PluginReviewUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PluginReviewCreateWithoutUserInput, Prisma.PluginReviewUncheckedCreateWithoutUserInput> | Prisma.PluginReviewCreateWithoutUserInput[] | Prisma.PluginReviewUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PluginReviewCreateOrConnectWithoutUserInput | Prisma.PluginReviewCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PluginReviewUpsertWithWhereUniqueWithoutUserInput | Prisma.PluginReviewUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PluginReviewCreateManyUserInputEnvelope;
    set?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    disconnect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    delete?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    connect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    update?: Prisma.PluginReviewUpdateWithWhereUniqueWithoutUserInput | Prisma.PluginReviewUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PluginReviewUpdateManyWithWhereWithoutUserInput | Prisma.PluginReviewUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PluginReviewScalarWhereInput | Prisma.PluginReviewScalarWhereInput[];
};
export type PluginReviewUncheckedUpdateManyWithoutAuthorReplyByNestedInput = {
    create?: Prisma.XOR<Prisma.PluginReviewCreateWithoutAuthorReplyByInput, Prisma.PluginReviewUncheckedCreateWithoutAuthorReplyByInput> | Prisma.PluginReviewCreateWithoutAuthorReplyByInput[] | Prisma.PluginReviewUncheckedCreateWithoutAuthorReplyByInput[];
    connectOrCreate?: Prisma.PluginReviewCreateOrConnectWithoutAuthorReplyByInput | Prisma.PluginReviewCreateOrConnectWithoutAuthorReplyByInput[];
    upsert?: Prisma.PluginReviewUpsertWithWhereUniqueWithoutAuthorReplyByInput | Prisma.PluginReviewUpsertWithWhereUniqueWithoutAuthorReplyByInput[];
    createMany?: Prisma.PluginReviewCreateManyAuthorReplyByInputEnvelope;
    set?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    disconnect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    delete?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    connect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    update?: Prisma.PluginReviewUpdateWithWhereUniqueWithoutAuthorReplyByInput | Prisma.PluginReviewUpdateWithWhereUniqueWithoutAuthorReplyByInput[];
    updateMany?: Prisma.PluginReviewUpdateManyWithWhereWithoutAuthorReplyByInput | Prisma.PluginReviewUpdateManyWithWhereWithoutAuthorReplyByInput[];
    deleteMany?: Prisma.PluginReviewScalarWhereInput | Prisma.PluginReviewScalarWhereInput[];
};
export type PluginReviewCreateNestedManyWithoutPluginInput = {
    create?: Prisma.XOR<Prisma.PluginReviewCreateWithoutPluginInput, Prisma.PluginReviewUncheckedCreateWithoutPluginInput> | Prisma.PluginReviewCreateWithoutPluginInput[] | Prisma.PluginReviewUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginReviewCreateOrConnectWithoutPluginInput | Prisma.PluginReviewCreateOrConnectWithoutPluginInput[];
    createMany?: Prisma.PluginReviewCreateManyPluginInputEnvelope;
    connect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
};
export type PluginReviewUncheckedCreateNestedManyWithoutPluginInput = {
    create?: Prisma.XOR<Prisma.PluginReviewCreateWithoutPluginInput, Prisma.PluginReviewUncheckedCreateWithoutPluginInput> | Prisma.PluginReviewCreateWithoutPluginInput[] | Prisma.PluginReviewUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginReviewCreateOrConnectWithoutPluginInput | Prisma.PluginReviewCreateOrConnectWithoutPluginInput[];
    createMany?: Prisma.PluginReviewCreateManyPluginInputEnvelope;
    connect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
};
export type PluginReviewUpdateManyWithoutPluginNestedInput = {
    create?: Prisma.XOR<Prisma.PluginReviewCreateWithoutPluginInput, Prisma.PluginReviewUncheckedCreateWithoutPluginInput> | Prisma.PluginReviewCreateWithoutPluginInput[] | Prisma.PluginReviewUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginReviewCreateOrConnectWithoutPluginInput | Prisma.PluginReviewCreateOrConnectWithoutPluginInput[];
    upsert?: Prisma.PluginReviewUpsertWithWhereUniqueWithoutPluginInput | Prisma.PluginReviewUpsertWithWhereUniqueWithoutPluginInput[];
    createMany?: Prisma.PluginReviewCreateManyPluginInputEnvelope;
    set?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    disconnect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    delete?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    connect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    update?: Prisma.PluginReviewUpdateWithWhereUniqueWithoutPluginInput | Prisma.PluginReviewUpdateWithWhereUniqueWithoutPluginInput[];
    updateMany?: Prisma.PluginReviewUpdateManyWithWhereWithoutPluginInput | Prisma.PluginReviewUpdateManyWithWhereWithoutPluginInput[];
    deleteMany?: Prisma.PluginReviewScalarWhereInput | Prisma.PluginReviewScalarWhereInput[];
};
export type PluginReviewUncheckedUpdateManyWithoutPluginNestedInput = {
    create?: Prisma.XOR<Prisma.PluginReviewCreateWithoutPluginInput, Prisma.PluginReviewUncheckedCreateWithoutPluginInput> | Prisma.PluginReviewCreateWithoutPluginInput[] | Prisma.PluginReviewUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginReviewCreateOrConnectWithoutPluginInput | Prisma.PluginReviewCreateOrConnectWithoutPluginInput[];
    upsert?: Prisma.PluginReviewUpsertWithWhereUniqueWithoutPluginInput | Prisma.PluginReviewUpsertWithWhereUniqueWithoutPluginInput[];
    createMany?: Prisma.PluginReviewCreateManyPluginInputEnvelope;
    set?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    disconnect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    delete?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    connect?: Prisma.PluginReviewWhereUniqueInput | Prisma.PluginReviewWhereUniqueInput[];
    update?: Prisma.PluginReviewUpdateWithWhereUniqueWithoutPluginInput | Prisma.PluginReviewUpdateWithWhereUniqueWithoutPluginInput[];
    updateMany?: Prisma.PluginReviewUpdateManyWithWhereWithoutPluginInput | Prisma.PluginReviewUpdateManyWithWhereWithoutPluginInput[];
    deleteMany?: Prisma.PluginReviewScalarWhereInput | Prisma.PluginReviewScalarWhereInput[];
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type PluginReviewCreateNestedOneWithoutRepliesInput = {
    create?: Prisma.XOR<Prisma.PluginReviewCreateWithoutRepliesInput, Prisma.PluginReviewUncheckedCreateWithoutRepliesInput>;
    connectOrCreate?: Prisma.PluginReviewCreateOrConnectWithoutRepliesInput;
    connect?: Prisma.PluginReviewWhereUniqueInput;
};
export type PluginReviewUpdateOneRequiredWithoutRepliesNestedInput = {
    create?: Prisma.XOR<Prisma.PluginReviewCreateWithoutRepliesInput, Prisma.PluginReviewUncheckedCreateWithoutRepliesInput>;
    connectOrCreate?: Prisma.PluginReviewCreateOrConnectWithoutRepliesInput;
    upsert?: Prisma.PluginReviewUpsertWithoutRepliesInput;
    connect?: Prisma.PluginReviewWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PluginReviewUpdateToOneWithWhereWithoutRepliesInput, Prisma.PluginReviewUpdateWithoutRepliesInput>, Prisma.PluginReviewUncheckedUpdateWithoutRepliesInput>;
};
export type PluginReviewCreateWithoutUserInput = {
    id?: string;
    rating: number;
    content: string;
    authorReply?: string | null;
    authorReplyAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    plugin: Prisma.PluginCreateNestedOneWithoutReviewsInput;
    authorReplyBy?: Prisma.UserCreateNestedOneWithoutRepliedReviewsInput;
    replies?: Prisma.PluginReviewReplyCreateNestedManyWithoutReviewInput;
};
export type PluginReviewUncheckedCreateWithoutUserInput = {
    id?: string;
    pluginId: string;
    rating: number;
    content: string;
    authorReply?: string | null;
    authorReplyById?: string | null;
    authorReplyAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    replies?: Prisma.PluginReviewReplyUncheckedCreateNestedManyWithoutReviewInput;
};
export type PluginReviewCreateOrConnectWithoutUserInput = {
    where: Prisma.PluginReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginReviewCreateWithoutUserInput, Prisma.PluginReviewUncheckedCreateWithoutUserInput>;
};
export type PluginReviewCreateManyUserInputEnvelope = {
    data: Prisma.PluginReviewCreateManyUserInput | Prisma.PluginReviewCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PluginReviewCreateWithoutAuthorReplyByInput = {
    id?: string;
    rating: number;
    content: string;
    authorReply?: string | null;
    authorReplyAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    plugin: Prisma.PluginCreateNestedOneWithoutReviewsInput;
    user: Prisma.UserCreateNestedOneWithoutPluginReviewsInput;
    replies?: Prisma.PluginReviewReplyCreateNestedManyWithoutReviewInput;
};
export type PluginReviewUncheckedCreateWithoutAuthorReplyByInput = {
    id?: string;
    pluginId: string;
    userId: string;
    rating: number;
    content: string;
    authorReply?: string | null;
    authorReplyAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    replies?: Prisma.PluginReviewReplyUncheckedCreateNestedManyWithoutReviewInput;
};
export type PluginReviewCreateOrConnectWithoutAuthorReplyByInput = {
    where: Prisma.PluginReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginReviewCreateWithoutAuthorReplyByInput, Prisma.PluginReviewUncheckedCreateWithoutAuthorReplyByInput>;
};
export type PluginReviewCreateManyAuthorReplyByInputEnvelope = {
    data: Prisma.PluginReviewCreateManyAuthorReplyByInput | Prisma.PluginReviewCreateManyAuthorReplyByInput[];
    skipDuplicates?: boolean;
};
export type PluginReviewUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PluginReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.PluginReviewUpdateWithoutUserInput, Prisma.PluginReviewUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PluginReviewCreateWithoutUserInput, Prisma.PluginReviewUncheckedCreateWithoutUserInput>;
};
export type PluginReviewUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PluginReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.PluginReviewUpdateWithoutUserInput, Prisma.PluginReviewUncheckedUpdateWithoutUserInput>;
};
export type PluginReviewUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PluginReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.PluginReviewUpdateManyMutationInput, Prisma.PluginReviewUncheckedUpdateManyWithoutUserInput>;
};
export type PluginReviewScalarWhereInput = {
    AND?: Prisma.PluginReviewScalarWhereInput | Prisma.PluginReviewScalarWhereInput[];
    OR?: Prisma.PluginReviewScalarWhereInput[];
    NOT?: Prisma.PluginReviewScalarWhereInput | Prisma.PluginReviewScalarWhereInput[];
    id?: Prisma.StringFilter<"PluginReview"> | string;
    pluginId?: Prisma.StringFilter<"PluginReview"> | string;
    userId?: Prisma.StringFilter<"PluginReview"> | string;
    rating?: Prisma.IntFilter<"PluginReview"> | number;
    content?: Prisma.StringFilter<"PluginReview"> | string;
    authorReply?: Prisma.StringNullableFilter<"PluginReview"> | string | null;
    authorReplyById?: Prisma.StringNullableFilter<"PluginReview"> | string | null;
    authorReplyAt?: Prisma.DateTimeNullableFilter<"PluginReview"> | Date | string | null;
    createdAt?: Prisma.DateTimeFilter<"PluginReview"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PluginReview"> | Date | string;
};
export type PluginReviewUpsertWithWhereUniqueWithoutAuthorReplyByInput = {
    where: Prisma.PluginReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.PluginReviewUpdateWithoutAuthorReplyByInput, Prisma.PluginReviewUncheckedUpdateWithoutAuthorReplyByInput>;
    create: Prisma.XOR<Prisma.PluginReviewCreateWithoutAuthorReplyByInput, Prisma.PluginReviewUncheckedCreateWithoutAuthorReplyByInput>;
};
export type PluginReviewUpdateWithWhereUniqueWithoutAuthorReplyByInput = {
    where: Prisma.PluginReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.PluginReviewUpdateWithoutAuthorReplyByInput, Prisma.PluginReviewUncheckedUpdateWithoutAuthorReplyByInput>;
};
export type PluginReviewUpdateManyWithWhereWithoutAuthorReplyByInput = {
    where: Prisma.PluginReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.PluginReviewUpdateManyMutationInput, Prisma.PluginReviewUncheckedUpdateManyWithoutAuthorReplyByInput>;
};
export type PluginReviewCreateWithoutPluginInput = {
    id?: string;
    rating: number;
    content: string;
    authorReply?: string | null;
    authorReplyAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPluginReviewsInput;
    authorReplyBy?: Prisma.UserCreateNestedOneWithoutRepliedReviewsInput;
    replies?: Prisma.PluginReviewReplyCreateNestedManyWithoutReviewInput;
};
export type PluginReviewUncheckedCreateWithoutPluginInput = {
    id?: string;
    userId: string;
    rating: number;
    content: string;
    authorReply?: string | null;
    authorReplyById?: string | null;
    authorReplyAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    replies?: Prisma.PluginReviewReplyUncheckedCreateNestedManyWithoutReviewInput;
};
export type PluginReviewCreateOrConnectWithoutPluginInput = {
    where: Prisma.PluginReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginReviewCreateWithoutPluginInput, Prisma.PluginReviewUncheckedCreateWithoutPluginInput>;
};
export type PluginReviewCreateManyPluginInputEnvelope = {
    data: Prisma.PluginReviewCreateManyPluginInput | Prisma.PluginReviewCreateManyPluginInput[];
    skipDuplicates?: boolean;
};
export type PluginReviewUpsertWithWhereUniqueWithoutPluginInput = {
    where: Prisma.PluginReviewWhereUniqueInput;
    update: Prisma.XOR<Prisma.PluginReviewUpdateWithoutPluginInput, Prisma.PluginReviewUncheckedUpdateWithoutPluginInput>;
    create: Prisma.XOR<Prisma.PluginReviewCreateWithoutPluginInput, Prisma.PluginReviewUncheckedCreateWithoutPluginInput>;
};
export type PluginReviewUpdateWithWhereUniqueWithoutPluginInput = {
    where: Prisma.PluginReviewWhereUniqueInput;
    data: Prisma.XOR<Prisma.PluginReviewUpdateWithoutPluginInput, Prisma.PluginReviewUncheckedUpdateWithoutPluginInput>;
};
export type PluginReviewUpdateManyWithWhereWithoutPluginInput = {
    where: Prisma.PluginReviewScalarWhereInput;
    data: Prisma.XOR<Prisma.PluginReviewUpdateManyMutationInput, Prisma.PluginReviewUncheckedUpdateManyWithoutPluginInput>;
};
export type PluginReviewCreateWithoutRepliesInput = {
    id?: string;
    rating: number;
    content: string;
    authorReply?: string | null;
    authorReplyAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    plugin: Prisma.PluginCreateNestedOneWithoutReviewsInput;
    user: Prisma.UserCreateNestedOneWithoutPluginReviewsInput;
    authorReplyBy?: Prisma.UserCreateNestedOneWithoutRepliedReviewsInput;
};
export type PluginReviewUncheckedCreateWithoutRepliesInput = {
    id?: string;
    pluginId: string;
    userId: string;
    rating: number;
    content: string;
    authorReply?: string | null;
    authorReplyById?: string | null;
    authorReplyAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PluginReviewCreateOrConnectWithoutRepliesInput = {
    where: Prisma.PluginReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginReviewCreateWithoutRepliesInput, Prisma.PluginReviewUncheckedCreateWithoutRepliesInput>;
};
export type PluginReviewUpsertWithoutRepliesInput = {
    update: Prisma.XOR<Prisma.PluginReviewUpdateWithoutRepliesInput, Prisma.PluginReviewUncheckedUpdateWithoutRepliesInput>;
    create: Prisma.XOR<Prisma.PluginReviewCreateWithoutRepliesInput, Prisma.PluginReviewUncheckedCreateWithoutRepliesInput>;
    where?: Prisma.PluginReviewWhereInput;
};
export type PluginReviewUpdateToOneWithWhereWithoutRepliesInput = {
    where?: Prisma.PluginReviewWhereInput;
    data: Prisma.XOR<Prisma.PluginReviewUpdateWithoutRepliesInput, Prisma.PluginReviewUncheckedUpdateWithoutRepliesInput>;
};
export type PluginReviewUpdateWithoutRepliesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plugin?: Prisma.PluginUpdateOneRequiredWithoutReviewsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPluginReviewsNestedInput;
    authorReplyBy?: Prisma.UserUpdateOneWithoutRepliedReviewsNestedInput;
};
export type PluginReviewUncheckedUpdateWithoutRepliesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginReviewCreateManyUserInput = {
    id?: string;
    pluginId: string;
    rating: number;
    content: string;
    authorReply?: string | null;
    authorReplyById?: string | null;
    authorReplyAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PluginReviewCreateManyAuthorReplyByInput = {
    id?: string;
    pluginId: string;
    userId: string;
    rating: number;
    content: string;
    authorReply?: string | null;
    authorReplyAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PluginReviewUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plugin?: Prisma.PluginUpdateOneRequiredWithoutReviewsNestedInput;
    authorReplyBy?: Prisma.UserUpdateOneWithoutRepliedReviewsNestedInput;
    replies?: Prisma.PluginReviewReplyUpdateManyWithoutReviewNestedInput;
};
export type PluginReviewUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: Prisma.PluginReviewReplyUncheckedUpdateManyWithoutReviewNestedInput;
};
export type PluginReviewUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginReviewUpdateWithoutAuthorReplyByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plugin?: Prisma.PluginUpdateOneRequiredWithoutReviewsNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPluginReviewsNestedInput;
    replies?: Prisma.PluginReviewReplyUpdateManyWithoutReviewNestedInput;
};
export type PluginReviewUncheckedUpdateWithoutAuthorReplyByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: Prisma.PluginReviewReplyUncheckedUpdateManyWithoutReviewNestedInput;
};
export type PluginReviewUncheckedUpdateManyWithoutAuthorReplyByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginReviewCreateManyPluginInput = {
    id?: string;
    userId: string;
    rating: number;
    content: string;
    authorReply?: string | null;
    authorReplyById?: string | null;
    authorReplyAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PluginReviewUpdateWithoutPluginInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPluginReviewsNestedInput;
    authorReplyBy?: Prisma.UserUpdateOneWithoutRepliedReviewsNestedInput;
    replies?: Prisma.PluginReviewReplyUpdateManyWithoutReviewNestedInput;
};
export type PluginReviewUncheckedUpdateWithoutPluginInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    replies?: Prisma.PluginReviewReplyUncheckedUpdateManyWithoutReviewNestedInput;
};
export type PluginReviewUncheckedUpdateManyWithoutPluginInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    rating?: Prisma.IntFieldUpdateOperationsInput | number;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    authorReply?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorReplyAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginReviewCountOutputType = {
    replies: number;
};
export type PluginReviewCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    replies?: boolean | PluginReviewCountOutputTypeCountRepliesArgs;
};
export type PluginReviewCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewCountOutputTypeSelect<ExtArgs> | null;
};
export type PluginReviewCountOutputTypeCountRepliesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginReviewReplyWhereInput;
};
export type PluginReviewSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    pluginId?: boolean;
    userId?: boolean;
    rating?: boolean;
    content?: boolean;
    authorReply?: boolean;
    authorReplyById?: boolean;
    authorReplyAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    plugin?: boolean | Prisma.PluginDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    authorReplyBy?: boolean | Prisma.PluginReview$authorReplyByArgs<ExtArgs>;
    replies?: boolean | Prisma.PluginReview$repliesArgs<ExtArgs>;
    _count?: boolean | Prisma.PluginReviewCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pluginReview"]>;
export type PluginReviewSelectScalar = {
    id?: boolean;
    pluginId?: boolean;
    userId?: boolean;
    rating?: boolean;
    content?: boolean;
    authorReply?: boolean;
    authorReplyById?: boolean;
    authorReplyAt?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PluginReviewOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "pluginId" | "userId" | "rating" | "content" | "authorReply" | "authorReplyById" | "authorReplyAt" | "createdAt" | "updatedAt", ExtArgs["result"]["pluginReview"]>;
export type PluginReviewInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plugin?: boolean | Prisma.PluginDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    authorReplyBy?: boolean | Prisma.PluginReview$authorReplyByArgs<ExtArgs>;
    replies?: boolean | Prisma.PluginReview$repliesArgs<ExtArgs>;
    _count?: boolean | Prisma.PluginReviewCountOutputTypeDefaultArgs<ExtArgs>;
};
export type $PluginReviewPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PluginReview";
    objects: {
        plugin: Prisma.$PluginPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
        authorReplyBy: Prisma.$UserPayload<ExtArgs> | null;
        replies: Prisma.$PluginReviewReplyPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        pluginId: string;
        userId: string;
        rating: number;
        content: string;
        authorReply: string | null;
        authorReplyById: string | null;
        authorReplyAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["pluginReview"]>;
    composites: {};
};
export type PluginReviewGetPayload<S extends boolean | null | undefined | PluginReviewDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PluginReviewPayload, S>;
export type PluginReviewCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PluginReviewFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PluginReviewCountAggregateInputType | true;
};
export interface PluginReviewDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PluginReview'];
        meta: {
            name: 'PluginReview';
        };
    };
    findUnique<T extends PluginReviewFindUniqueArgs>(args: Prisma.SelectSubset<T, PluginReviewFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PluginReviewClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PluginReviewFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PluginReviewFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PluginReviewClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PluginReviewFindFirstArgs>(args?: Prisma.SelectSubset<T, PluginReviewFindFirstArgs<ExtArgs>>): Prisma.Prisma__PluginReviewClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PluginReviewFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PluginReviewFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PluginReviewClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PluginReviewFindManyArgs>(args?: Prisma.SelectSubset<T, PluginReviewFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PluginReviewPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PluginReviewCreateArgs>(args: Prisma.SelectSubset<T, PluginReviewCreateArgs<ExtArgs>>): Prisma.Prisma__PluginReviewClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PluginReviewCreateManyArgs>(args?: Prisma.SelectSubset<T, PluginReviewCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PluginReviewDeleteArgs>(args: Prisma.SelectSubset<T, PluginReviewDeleteArgs<ExtArgs>>): Prisma.Prisma__PluginReviewClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PluginReviewUpdateArgs>(args: Prisma.SelectSubset<T, PluginReviewUpdateArgs<ExtArgs>>): Prisma.Prisma__PluginReviewClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PluginReviewDeleteManyArgs>(args?: Prisma.SelectSubset<T, PluginReviewDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PluginReviewUpdateManyArgs>(args: Prisma.SelectSubset<T, PluginReviewUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PluginReviewUpsertArgs>(args: Prisma.SelectSubset<T, PluginReviewUpsertArgs<ExtArgs>>): Prisma.Prisma__PluginReviewClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PluginReviewCountArgs>(args?: Prisma.Subset<T, PluginReviewCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PluginReviewCountAggregateOutputType> : number>;
    aggregate<T extends PluginReviewAggregateArgs>(args: Prisma.Subset<T, PluginReviewAggregateArgs>): Prisma.PrismaPromise<GetPluginReviewAggregateType<T>>;
    groupBy<T extends PluginReviewGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PluginReviewGroupByArgs['orderBy'];
    } : {
        orderBy?: PluginReviewGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PluginReviewGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPluginReviewGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PluginReviewFieldRefs;
}
export interface Prisma__PluginReviewClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    plugin<T extends Prisma.PluginDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PluginDefaultArgs<ExtArgs>>): Prisma.Prisma__PluginClient<runtime.Types.Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    authorReplyBy<T extends Prisma.PluginReview$authorReplyByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PluginReview$authorReplyByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    replies<T extends Prisma.PluginReview$repliesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PluginReview$repliesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PluginReviewReplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PluginReviewFieldRefs {
    readonly id: Prisma.FieldRef<"PluginReview", 'String'>;
    readonly pluginId: Prisma.FieldRef<"PluginReview", 'String'>;
    readonly userId: Prisma.FieldRef<"PluginReview", 'String'>;
    readonly rating: Prisma.FieldRef<"PluginReview", 'Int'>;
    readonly content: Prisma.FieldRef<"PluginReview", 'String'>;
    readonly authorReply: Prisma.FieldRef<"PluginReview", 'String'>;
    readonly authorReplyById: Prisma.FieldRef<"PluginReview", 'String'>;
    readonly authorReplyAt: Prisma.FieldRef<"PluginReview", 'DateTime'>;
    readonly createdAt: Prisma.FieldRef<"PluginReview", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PluginReview", 'DateTime'>;
}
export type PluginReviewFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewSelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewInclude<ExtArgs> | null;
    where: Prisma.PluginReviewWhereUniqueInput;
};
export type PluginReviewFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewSelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewInclude<ExtArgs> | null;
    where: Prisma.PluginReviewWhereUniqueInput;
};
export type PluginReviewFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewSelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewInclude<ExtArgs> | null;
    where?: Prisma.PluginReviewWhereInput;
    orderBy?: Prisma.PluginReviewOrderByWithRelationInput | Prisma.PluginReviewOrderByWithRelationInput[];
    cursor?: Prisma.PluginReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PluginReviewScalarFieldEnum | Prisma.PluginReviewScalarFieldEnum[];
};
export type PluginReviewFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewSelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewInclude<ExtArgs> | null;
    where?: Prisma.PluginReviewWhereInput;
    orderBy?: Prisma.PluginReviewOrderByWithRelationInput | Prisma.PluginReviewOrderByWithRelationInput[];
    cursor?: Prisma.PluginReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PluginReviewScalarFieldEnum | Prisma.PluginReviewScalarFieldEnum[];
};
export type PluginReviewFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewSelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewInclude<ExtArgs> | null;
    where?: Prisma.PluginReviewWhereInput;
    orderBy?: Prisma.PluginReviewOrderByWithRelationInput | Prisma.PluginReviewOrderByWithRelationInput[];
    cursor?: Prisma.PluginReviewWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PluginReviewScalarFieldEnum | Prisma.PluginReviewScalarFieldEnum[];
};
export type PluginReviewCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewSelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PluginReviewCreateInput, Prisma.PluginReviewUncheckedCreateInput>;
};
export type PluginReviewCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PluginReviewCreateManyInput | Prisma.PluginReviewCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PluginReviewUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewSelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PluginReviewUpdateInput, Prisma.PluginReviewUncheckedUpdateInput>;
    where: Prisma.PluginReviewWhereUniqueInput;
};
export type PluginReviewUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PluginReviewUpdateManyMutationInput, Prisma.PluginReviewUncheckedUpdateManyInput>;
    where?: Prisma.PluginReviewWhereInput;
    limit?: number;
};
export type PluginReviewUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewSelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewInclude<ExtArgs> | null;
    where: Prisma.PluginReviewWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginReviewCreateInput, Prisma.PluginReviewUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PluginReviewUpdateInput, Prisma.PluginReviewUncheckedUpdateInput>;
};
export type PluginReviewDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewSelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewInclude<ExtArgs> | null;
    where: Prisma.PluginReviewWhereUniqueInput;
};
export type PluginReviewDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginReviewWhereInput;
    limit?: number;
};
export type PluginReview$authorReplyByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type PluginReview$repliesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewReplySelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewReplyOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewReplyInclude<ExtArgs> | null;
    where?: Prisma.PluginReviewReplyWhereInput;
    orderBy?: Prisma.PluginReviewReplyOrderByWithRelationInput | Prisma.PluginReviewReplyOrderByWithRelationInput[];
    cursor?: Prisma.PluginReviewReplyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PluginReviewReplyScalarFieldEnum | Prisma.PluginReviewReplyScalarFieldEnum[];
};
export type PluginReviewDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewSelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewInclude<ExtArgs> | null;
};
export {};
