import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PluginReviewReplyModel = runtime.Types.Result.DefaultSelection<Prisma.$PluginReviewReplyPayload>;
export type AggregatePluginReviewReply = {
    _count: PluginReviewReplyCountAggregateOutputType | null;
    _min: PluginReviewReplyMinAggregateOutputType | null;
    _max: PluginReviewReplyMaxAggregateOutputType | null;
};
export type PluginReviewReplyMinAggregateOutputType = {
    id: string | null;
    reviewId: string | null;
    userId: string | null;
    content: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PluginReviewReplyMaxAggregateOutputType = {
    id: string | null;
    reviewId: string | null;
    userId: string | null;
    content: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PluginReviewReplyCountAggregateOutputType = {
    id: number;
    reviewId: number;
    userId: number;
    content: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PluginReviewReplyMinAggregateInputType = {
    id?: true;
    reviewId?: true;
    userId?: true;
    content?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PluginReviewReplyMaxAggregateInputType = {
    id?: true;
    reviewId?: true;
    userId?: true;
    content?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PluginReviewReplyCountAggregateInputType = {
    id?: true;
    reviewId?: true;
    userId?: true;
    content?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PluginReviewReplyAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginReviewReplyWhereInput;
    orderBy?: Prisma.PluginReviewReplyOrderByWithRelationInput | Prisma.PluginReviewReplyOrderByWithRelationInput[];
    cursor?: Prisma.PluginReviewReplyWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PluginReviewReplyCountAggregateInputType;
    _min?: PluginReviewReplyMinAggregateInputType;
    _max?: PluginReviewReplyMaxAggregateInputType;
};
export type GetPluginReviewReplyAggregateType<T extends PluginReviewReplyAggregateArgs> = {
    [P in keyof T & keyof AggregatePluginReviewReply]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePluginReviewReply[P]> : Prisma.GetScalarType<T[P], AggregatePluginReviewReply[P]>;
};
export type PluginReviewReplyGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginReviewReplyWhereInput;
    orderBy?: Prisma.PluginReviewReplyOrderByWithAggregationInput | Prisma.PluginReviewReplyOrderByWithAggregationInput[];
    by: Prisma.PluginReviewReplyScalarFieldEnum[] | Prisma.PluginReviewReplyScalarFieldEnum;
    having?: Prisma.PluginReviewReplyScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PluginReviewReplyCountAggregateInputType | true;
    _min?: PluginReviewReplyMinAggregateInputType;
    _max?: PluginReviewReplyMaxAggregateInputType;
};
export type PluginReviewReplyGroupByOutputType = {
    id: string;
    reviewId: string;
    userId: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    _count: PluginReviewReplyCountAggregateOutputType | null;
    _min: PluginReviewReplyMinAggregateOutputType | null;
    _max: PluginReviewReplyMaxAggregateOutputType | null;
};
type GetPluginReviewReplyGroupByPayload<T extends PluginReviewReplyGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PluginReviewReplyGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PluginReviewReplyGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PluginReviewReplyGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PluginReviewReplyGroupByOutputType[P]>;
}>>;
export type PluginReviewReplyWhereInput = {
    AND?: Prisma.PluginReviewReplyWhereInput | Prisma.PluginReviewReplyWhereInput[];
    OR?: Prisma.PluginReviewReplyWhereInput[];
    NOT?: Prisma.PluginReviewReplyWhereInput | Prisma.PluginReviewReplyWhereInput[];
    id?: Prisma.StringFilter<"PluginReviewReply"> | string;
    reviewId?: Prisma.StringFilter<"PluginReviewReply"> | string;
    userId?: Prisma.StringFilter<"PluginReviewReply"> | string;
    content?: Prisma.StringFilter<"PluginReviewReply"> | string;
    createdAt?: Prisma.DateTimeFilter<"PluginReviewReply"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PluginReviewReply"> | Date | string;
    review?: Prisma.XOR<Prisma.PluginReviewScalarRelationFilter, Prisma.PluginReviewWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type PluginReviewReplyOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    review?: Prisma.PluginReviewOrderByWithRelationInput;
    user?: Prisma.UserOrderByWithRelationInput;
    _relevance?: Prisma.PluginReviewReplyOrderByRelevanceInput;
};
export type PluginReviewReplyWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PluginReviewReplyWhereInput | Prisma.PluginReviewReplyWhereInput[];
    OR?: Prisma.PluginReviewReplyWhereInput[];
    NOT?: Prisma.PluginReviewReplyWhereInput | Prisma.PluginReviewReplyWhereInput[];
    reviewId?: Prisma.StringFilter<"PluginReviewReply"> | string;
    userId?: Prisma.StringFilter<"PluginReviewReply"> | string;
    content?: Prisma.StringFilter<"PluginReviewReply"> | string;
    createdAt?: Prisma.DateTimeFilter<"PluginReviewReply"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PluginReviewReply"> | Date | string;
    review?: Prisma.XOR<Prisma.PluginReviewScalarRelationFilter, Prisma.PluginReviewWhereInput>;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id">;
export type PluginReviewReplyOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PluginReviewReplyCountOrderByAggregateInput;
    _max?: Prisma.PluginReviewReplyMaxOrderByAggregateInput;
    _min?: Prisma.PluginReviewReplyMinOrderByAggregateInput;
};
export type PluginReviewReplyScalarWhereWithAggregatesInput = {
    AND?: Prisma.PluginReviewReplyScalarWhereWithAggregatesInput | Prisma.PluginReviewReplyScalarWhereWithAggregatesInput[];
    OR?: Prisma.PluginReviewReplyScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PluginReviewReplyScalarWhereWithAggregatesInput | Prisma.PluginReviewReplyScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PluginReviewReply"> | string;
    reviewId?: Prisma.StringWithAggregatesFilter<"PluginReviewReply"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"PluginReviewReply"> | string;
    content?: Prisma.StringWithAggregatesFilter<"PluginReviewReply"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PluginReviewReply"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PluginReviewReply"> | Date | string;
};
export type PluginReviewReplyCreateInput = {
    id?: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    review: Prisma.PluginReviewCreateNestedOneWithoutRepliesInput;
    user: Prisma.UserCreateNestedOneWithoutPluginReviewRepliesInput;
};
export type PluginReviewReplyUncheckedCreateInput = {
    id?: string;
    reviewId: string;
    userId: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PluginReviewReplyUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    review?: Prisma.PluginReviewUpdateOneRequiredWithoutRepliesNestedInput;
    user?: Prisma.UserUpdateOneRequiredWithoutPluginReviewRepliesNestedInput;
};
export type PluginReviewReplyUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginReviewReplyCreateManyInput = {
    id?: string;
    reviewId: string;
    userId: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PluginReviewReplyUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginReviewReplyUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginReviewReplyListRelationFilter = {
    every?: Prisma.PluginReviewReplyWhereInput;
    some?: Prisma.PluginReviewReplyWhereInput;
    none?: Prisma.PluginReviewReplyWhereInput;
};
export type PluginReviewReplyOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PluginReviewReplyOrderByRelevanceInput = {
    fields: Prisma.PluginReviewReplyOrderByRelevanceFieldEnum | Prisma.PluginReviewReplyOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type PluginReviewReplyCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PluginReviewReplyMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PluginReviewReplyMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    reviewId?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PluginReviewReplyCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PluginReviewReplyCreateWithoutUserInput, Prisma.PluginReviewReplyUncheckedCreateWithoutUserInput> | Prisma.PluginReviewReplyCreateWithoutUserInput[] | Prisma.PluginReviewReplyUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PluginReviewReplyCreateOrConnectWithoutUserInput | Prisma.PluginReviewReplyCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PluginReviewReplyCreateManyUserInputEnvelope;
    connect?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
};
export type PluginReviewReplyUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.PluginReviewReplyCreateWithoutUserInput, Prisma.PluginReviewReplyUncheckedCreateWithoutUserInput> | Prisma.PluginReviewReplyCreateWithoutUserInput[] | Prisma.PluginReviewReplyUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PluginReviewReplyCreateOrConnectWithoutUserInput | Prisma.PluginReviewReplyCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.PluginReviewReplyCreateManyUserInputEnvelope;
    connect?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
};
export type PluginReviewReplyUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PluginReviewReplyCreateWithoutUserInput, Prisma.PluginReviewReplyUncheckedCreateWithoutUserInput> | Prisma.PluginReviewReplyCreateWithoutUserInput[] | Prisma.PluginReviewReplyUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PluginReviewReplyCreateOrConnectWithoutUserInput | Prisma.PluginReviewReplyCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PluginReviewReplyUpsertWithWhereUniqueWithoutUserInput | Prisma.PluginReviewReplyUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PluginReviewReplyCreateManyUserInputEnvelope;
    set?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    disconnect?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    delete?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    connect?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    update?: Prisma.PluginReviewReplyUpdateWithWhereUniqueWithoutUserInput | Prisma.PluginReviewReplyUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PluginReviewReplyUpdateManyWithWhereWithoutUserInput | Prisma.PluginReviewReplyUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PluginReviewReplyScalarWhereInput | Prisma.PluginReviewReplyScalarWhereInput[];
};
export type PluginReviewReplyUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.PluginReviewReplyCreateWithoutUserInput, Prisma.PluginReviewReplyUncheckedCreateWithoutUserInput> | Prisma.PluginReviewReplyCreateWithoutUserInput[] | Prisma.PluginReviewReplyUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.PluginReviewReplyCreateOrConnectWithoutUserInput | Prisma.PluginReviewReplyCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.PluginReviewReplyUpsertWithWhereUniqueWithoutUserInput | Prisma.PluginReviewReplyUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.PluginReviewReplyCreateManyUserInputEnvelope;
    set?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    disconnect?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    delete?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    connect?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    update?: Prisma.PluginReviewReplyUpdateWithWhereUniqueWithoutUserInput | Prisma.PluginReviewReplyUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.PluginReviewReplyUpdateManyWithWhereWithoutUserInput | Prisma.PluginReviewReplyUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.PluginReviewReplyScalarWhereInput | Prisma.PluginReviewReplyScalarWhereInput[];
};
export type PluginReviewReplyCreateNestedManyWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.PluginReviewReplyCreateWithoutReviewInput, Prisma.PluginReviewReplyUncheckedCreateWithoutReviewInput> | Prisma.PluginReviewReplyCreateWithoutReviewInput[] | Prisma.PluginReviewReplyUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.PluginReviewReplyCreateOrConnectWithoutReviewInput | Prisma.PluginReviewReplyCreateOrConnectWithoutReviewInput[];
    createMany?: Prisma.PluginReviewReplyCreateManyReviewInputEnvelope;
    connect?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
};
export type PluginReviewReplyUncheckedCreateNestedManyWithoutReviewInput = {
    create?: Prisma.XOR<Prisma.PluginReviewReplyCreateWithoutReviewInput, Prisma.PluginReviewReplyUncheckedCreateWithoutReviewInput> | Prisma.PluginReviewReplyCreateWithoutReviewInput[] | Prisma.PluginReviewReplyUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.PluginReviewReplyCreateOrConnectWithoutReviewInput | Prisma.PluginReviewReplyCreateOrConnectWithoutReviewInput[];
    createMany?: Prisma.PluginReviewReplyCreateManyReviewInputEnvelope;
    connect?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
};
export type PluginReviewReplyUpdateManyWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.PluginReviewReplyCreateWithoutReviewInput, Prisma.PluginReviewReplyUncheckedCreateWithoutReviewInput> | Prisma.PluginReviewReplyCreateWithoutReviewInput[] | Prisma.PluginReviewReplyUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.PluginReviewReplyCreateOrConnectWithoutReviewInput | Prisma.PluginReviewReplyCreateOrConnectWithoutReviewInput[];
    upsert?: Prisma.PluginReviewReplyUpsertWithWhereUniqueWithoutReviewInput | Prisma.PluginReviewReplyUpsertWithWhereUniqueWithoutReviewInput[];
    createMany?: Prisma.PluginReviewReplyCreateManyReviewInputEnvelope;
    set?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    disconnect?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    delete?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    connect?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    update?: Prisma.PluginReviewReplyUpdateWithWhereUniqueWithoutReviewInput | Prisma.PluginReviewReplyUpdateWithWhereUniqueWithoutReviewInput[];
    updateMany?: Prisma.PluginReviewReplyUpdateManyWithWhereWithoutReviewInput | Prisma.PluginReviewReplyUpdateManyWithWhereWithoutReviewInput[];
    deleteMany?: Prisma.PluginReviewReplyScalarWhereInput | Prisma.PluginReviewReplyScalarWhereInput[];
};
export type PluginReviewReplyUncheckedUpdateManyWithoutReviewNestedInput = {
    create?: Prisma.XOR<Prisma.PluginReviewReplyCreateWithoutReviewInput, Prisma.PluginReviewReplyUncheckedCreateWithoutReviewInput> | Prisma.PluginReviewReplyCreateWithoutReviewInput[] | Prisma.PluginReviewReplyUncheckedCreateWithoutReviewInput[];
    connectOrCreate?: Prisma.PluginReviewReplyCreateOrConnectWithoutReviewInput | Prisma.PluginReviewReplyCreateOrConnectWithoutReviewInput[];
    upsert?: Prisma.PluginReviewReplyUpsertWithWhereUniqueWithoutReviewInput | Prisma.PluginReviewReplyUpsertWithWhereUniqueWithoutReviewInput[];
    createMany?: Prisma.PluginReviewReplyCreateManyReviewInputEnvelope;
    set?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    disconnect?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    delete?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    connect?: Prisma.PluginReviewReplyWhereUniqueInput | Prisma.PluginReviewReplyWhereUniqueInput[];
    update?: Prisma.PluginReviewReplyUpdateWithWhereUniqueWithoutReviewInput | Prisma.PluginReviewReplyUpdateWithWhereUniqueWithoutReviewInput[];
    updateMany?: Prisma.PluginReviewReplyUpdateManyWithWhereWithoutReviewInput | Prisma.PluginReviewReplyUpdateManyWithWhereWithoutReviewInput[];
    deleteMany?: Prisma.PluginReviewReplyScalarWhereInput | Prisma.PluginReviewReplyScalarWhereInput[];
};
export type PluginReviewReplyCreateWithoutUserInput = {
    id?: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    review: Prisma.PluginReviewCreateNestedOneWithoutRepliesInput;
};
export type PluginReviewReplyUncheckedCreateWithoutUserInput = {
    id?: string;
    reviewId: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PluginReviewReplyCreateOrConnectWithoutUserInput = {
    where: Prisma.PluginReviewReplyWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginReviewReplyCreateWithoutUserInput, Prisma.PluginReviewReplyUncheckedCreateWithoutUserInput>;
};
export type PluginReviewReplyCreateManyUserInputEnvelope = {
    data: Prisma.PluginReviewReplyCreateManyUserInput | Prisma.PluginReviewReplyCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type PluginReviewReplyUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.PluginReviewReplyWhereUniqueInput;
    update: Prisma.XOR<Prisma.PluginReviewReplyUpdateWithoutUserInput, Prisma.PluginReviewReplyUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.PluginReviewReplyCreateWithoutUserInput, Prisma.PluginReviewReplyUncheckedCreateWithoutUserInput>;
};
export type PluginReviewReplyUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.PluginReviewReplyWhereUniqueInput;
    data: Prisma.XOR<Prisma.PluginReviewReplyUpdateWithoutUserInput, Prisma.PluginReviewReplyUncheckedUpdateWithoutUserInput>;
};
export type PluginReviewReplyUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.PluginReviewReplyScalarWhereInput;
    data: Prisma.XOR<Prisma.PluginReviewReplyUpdateManyMutationInput, Prisma.PluginReviewReplyUncheckedUpdateManyWithoutUserInput>;
};
export type PluginReviewReplyScalarWhereInput = {
    AND?: Prisma.PluginReviewReplyScalarWhereInput | Prisma.PluginReviewReplyScalarWhereInput[];
    OR?: Prisma.PluginReviewReplyScalarWhereInput[];
    NOT?: Prisma.PluginReviewReplyScalarWhereInput | Prisma.PluginReviewReplyScalarWhereInput[];
    id?: Prisma.StringFilter<"PluginReviewReply"> | string;
    reviewId?: Prisma.StringFilter<"PluginReviewReply"> | string;
    userId?: Prisma.StringFilter<"PluginReviewReply"> | string;
    content?: Prisma.StringFilter<"PluginReviewReply"> | string;
    createdAt?: Prisma.DateTimeFilter<"PluginReviewReply"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PluginReviewReply"> | Date | string;
};
export type PluginReviewReplyCreateWithoutReviewInput = {
    id?: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutPluginReviewRepliesInput;
};
export type PluginReviewReplyUncheckedCreateWithoutReviewInput = {
    id?: string;
    userId: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PluginReviewReplyCreateOrConnectWithoutReviewInput = {
    where: Prisma.PluginReviewReplyWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginReviewReplyCreateWithoutReviewInput, Prisma.PluginReviewReplyUncheckedCreateWithoutReviewInput>;
};
export type PluginReviewReplyCreateManyReviewInputEnvelope = {
    data: Prisma.PluginReviewReplyCreateManyReviewInput | Prisma.PluginReviewReplyCreateManyReviewInput[];
    skipDuplicates?: boolean;
};
export type PluginReviewReplyUpsertWithWhereUniqueWithoutReviewInput = {
    where: Prisma.PluginReviewReplyWhereUniqueInput;
    update: Prisma.XOR<Prisma.PluginReviewReplyUpdateWithoutReviewInput, Prisma.PluginReviewReplyUncheckedUpdateWithoutReviewInput>;
    create: Prisma.XOR<Prisma.PluginReviewReplyCreateWithoutReviewInput, Prisma.PluginReviewReplyUncheckedCreateWithoutReviewInput>;
};
export type PluginReviewReplyUpdateWithWhereUniqueWithoutReviewInput = {
    where: Prisma.PluginReviewReplyWhereUniqueInput;
    data: Prisma.XOR<Prisma.PluginReviewReplyUpdateWithoutReviewInput, Prisma.PluginReviewReplyUncheckedUpdateWithoutReviewInput>;
};
export type PluginReviewReplyUpdateManyWithWhereWithoutReviewInput = {
    where: Prisma.PluginReviewReplyScalarWhereInput;
    data: Prisma.XOR<Prisma.PluginReviewReplyUpdateManyMutationInput, Prisma.PluginReviewReplyUncheckedUpdateManyWithoutReviewInput>;
};
export type PluginReviewReplyCreateManyUserInput = {
    id?: string;
    reviewId: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PluginReviewReplyUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    review?: Prisma.PluginReviewUpdateOneRequiredWithoutRepliesNestedInput;
};
export type PluginReviewReplyUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginReviewReplyUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    reviewId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginReviewReplyCreateManyReviewInput = {
    id?: string;
    userId: string;
    content: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PluginReviewReplyUpdateWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutPluginReviewRepliesNestedInput;
};
export type PluginReviewReplyUncheckedUpdateWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginReviewReplyUncheckedUpdateManyWithoutReviewInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginReviewReplySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    reviewId?: boolean;
    userId?: boolean;
    content?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    review?: boolean | Prisma.PluginReviewDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pluginReviewReply"]>;
export type PluginReviewReplySelectScalar = {
    id?: boolean;
    reviewId?: boolean;
    userId?: boolean;
    content?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PluginReviewReplyOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "reviewId" | "userId" | "content" | "createdAt" | "updatedAt", ExtArgs["result"]["pluginReviewReply"]>;
export type PluginReviewReplyInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    review?: boolean | Prisma.PluginReviewDefaultArgs<ExtArgs>;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $PluginReviewReplyPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PluginReviewReply";
    objects: {
        review: Prisma.$PluginReviewPayload<ExtArgs>;
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        reviewId: string;
        userId: string;
        content: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["pluginReviewReply"]>;
    composites: {};
};
export type PluginReviewReplyGetPayload<S extends boolean | null | undefined | PluginReviewReplyDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PluginReviewReplyPayload, S>;
export type PluginReviewReplyCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PluginReviewReplyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PluginReviewReplyCountAggregateInputType | true;
};
export interface PluginReviewReplyDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PluginReviewReply'];
        meta: {
            name: 'PluginReviewReply';
        };
    };
    findUnique<T extends PluginReviewReplyFindUniqueArgs>(args: Prisma.SelectSubset<T, PluginReviewReplyFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PluginReviewReplyClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewReplyPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PluginReviewReplyFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PluginReviewReplyFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PluginReviewReplyClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewReplyPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PluginReviewReplyFindFirstArgs>(args?: Prisma.SelectSubset<T, PluginReviewReplyFindFirstArgs<ExtArgs>>): Prisma.Prisma__PluginReviewReplyClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewReplyPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PluginReviewReplyFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PluginReviewReplyFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PluginReviewReplyClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewReplyPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PluginReviewReplyFindManyArgs>(args?: Prisma.SelectSubset<T, PluginReviewReplyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PluginReviewReplyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PluginReviewReplyCreateArgs>(args: Prisma.SelectSubset<T, PluginReviewReplyCreateArgs<ExtArgs>>): Prisma.Prisma__PluginReviewReplyClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewReplyPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PluginReviewReplyCreateManyArgs>(args?: Prisma.SelectSubset<T, PluginReviewReplyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PluginReviewReplyDeleteArgs>(args: Prisma.SelectSubset<T, PluginReviewReplyDeleteArgs<ExtArgs>>): Prisma.Prisma__PluginReviewReplyClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewReplyPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PluginReviewReplyUpdateArgs>(args: Prisma.SelectSubset<T, PluginReviewReplyUpdateArgs<ExtArgs>>): Prisma.Prisma__PluginReviewReplyClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewReplyPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PluginReviewReplyDeleteManyArgs>(args?: Prisma.SelectSubset<T, PluginReviewReplyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PluginReviewReplyUpdateManyArgs>(args: Prisma.SelectSubset<T, PluginReviewReplyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PluginReviewReplyUpsertArgs>(args: Prisma.SelectSubset<T, PluginReviewReplyUpsertArgs<ExtArgs>>): Prisma.Prisma__PluginReviewReplyClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewReplyPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PluginReviewReplyCountArgs>(args?: Prisma.Subset<T, PluginReviewReplyCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PluginReviewReplyCountAggregateOutputType> : number>;
    aggregate<T extends PluginReviewReplyAggregateArgs>(args: Prisma.Subset<T, PluginReviewReplyAggregateArgs>): Prisma.PrismaPromise<GetPluginReviewReplyAggregateType<T>>;
    groupBy<T extends PluginReviewReplyGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PluginReviewReplyGroupByArgs['orderBy'];
    } : {
        orderBy?: PluginReviewReplyGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PluginReviewReplyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPluginReviewReplyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PluginReviewReplyFieldRefs;
}
export interface Prisma__PluginReviewReplyClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    review<T extends Prisma.PluginReviewDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PluginReviewDefaultArgs<ExtArgs>>): Prisma.Prisma__PluginReviewClient<runtime.Types.Result.GetResult<Prisma.$PluginReviewPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PluginReviewReplyFieldRefs {
    readonly id: Prisma.FieldRef<"PluginReviewReply", 'String'>;
    readonly reviewId: Prisma.FieldRef<"PluginReviewReply", 'String'>;
    readonly userId: Prisma.FieldRef<"PluginReviewReply", 'String'>;
    readonly content: Prisma.FieldRef<"PluginReviewReply", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PluginReviewReply", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PluginReviewReply", 'DateTime'>;
}
export type PluginReviewReplyFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewReplySelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewReplyOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewReplyInclude<ExtArgs> | null;
    where: Prisma.PluginReviewReplyWhereUniqueInput;
};
export type PluginReviewReplyFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewReplySelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewReplyOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewReplyInclude<ExtArgs> | null;
    where: Prisma.PluginReviewReplyWhereUniqueInput;
};
export type PluginReviewReplyFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PluginReviewReplyFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PluginReviewReplyFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PluginReviewReplyCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewReplySelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewReplyOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewReplyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PluginReviewReplyCreateInput, Prisma.PluginReviewReplyUncheckedCreateInput>;
};
export type PluginReviewReplyCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PluginReviewReplyCreateManyInput | Prisma.PluginReviewReplyCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PluginReviewReplyUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewReplySelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewReplyOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewReplyInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PluginReviewReplyUpdateInput, Prisma.PluginReviewReplyUncheckedUpdateInput>;
    where: Prisma.PluginReviewReplyWhereUniqueInput;
};
export type PluginReviewReplyUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PluginReviewReplyUpdateManyMutationInput, Prisma.PluginReviewReplyUncheckedUpdateManyInput>;
    where?: Prisma.PluginReviewReplyWhereInput;
    limit?: number;
};
export type PluginReviewReplyUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewReplySelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewReplyOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewReplyInclude<ExtArgs> | null;
    where: Prisma.PluginReviewReplyWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginReviewReplyCreateInput, Prisma.PluginReviewReplyUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PluginReviewReplyUpdateInput, Prisma.PluginReviewReplyUncheckedUpdateInput>;
};
export type PluginReviewReplyDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewReplySelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewReplyOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewReplyInclude<ExtArgs> | null;
    where: Prisma.PluginReviewReplyWhereUniqueInput;
};
export type PluginReviewReplyDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginReviewReplyWhereInput;
    limit?: number;
};
export type PluginReviewReplyDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginReviewReplySelect<ExtArgs> | null;
    omit?: Prisma.PluginReviewReplyOmit<ExtArgs> | null;
    include?: Prisma.PluginReviewReplyInclude<ExtArgs> | null;
};
export {};
