import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PluginDownloadModel = runtime.Types.Result.DefaultSelection<Prisma.$PluginDownloadPayload>;
export type AggregatePluginDownload = {
    _count: PluginDownloadCountAggregateOutputType | null;
    _min: PluginDownloadMinAggregateOutputType | null;
    _max: PluginDownloadMaxAggregateOutputType | null;
};
export type PluginDownloadMinAggregateOutputType = {
    id: string | null;
    pluginId: string | null;
    ip: string | null;
    createdAt: Date | null;
};
export type PluginDownloadMaxAggregateOutputType = {
    id: string | null;
    pluginId: string | null;
    ip: string | null;
    createdAt: Date | null;
};
export type PluginDownloadCountAggregateOutputType = {
    id: number;
    pluginId: number;
    ip: number;
    createdAt: number;
    _all: number;
};
export type PluginDownloadMinAggregateInputType = {
    id?: true;
    pluginId?: true;
    ip?: true;
    createdAt?: true;
};
export type PluginDownloadMaxAggregateInputType = {
    id?: true;
    pluginId?: true;
    ip?: true;
    createdAt?: true;
};
export type PluginDownloadCountAggregateInputType = {
    id?: true;
    pluginId?: true;
    ip?: true;
    createdAt?: true;
    _all?: true;
};
export type PluginDownloadAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginDownloadWhereInput;
    orderBy?: Prisma.PluginDownloadOrderByWithRelationInput | Prisma.PluginDownloadOrderByWithRelationInput[];
    cursor?: Prisma.PluginDownloadWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PluginDownloadCountAggregateInputType;
    _min?: PluginDownloadMinAggregateInputType;
    _max?: PluginDownloadMaxAggregateInputType;
};
export type GetPluginDownloadAggregateType<T extends PluginDownloadAggregateArgs> = {
    [P in keyof T & keyof AggregatePluginDownload]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePluginDownload[P]> : Prisma.GetScalarType<T[P], AggregatePluginDownload[P]>;
};
export type PluginDownloadGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginDownloadWhereInput;
    orderBy?: Prisma.PluginDownloadOrderByWithAggregationInput | Prisma.PluginDownloadOrderByWithAggregationInput[];
    by: Prisma.PluginDownloadScalarFieldEnum[] | Prisma.PluginDownloadScalarFieldEnum;
    having?: Prisma.PluginDownloadScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PluginDownloadCountAggregateInputType | true;
    _min?: PluginDownloadMinAggregateInputType;
    _max?: PluginDownloadMaxAggregateInputType;
};
export type PluginDownloadGroupByOutputType = {
    id: string;
    pluginId: string;
    ip: string;
    createdAt: Date;
    _count: PluginDownloadCountAggregateOutputType | null;
    _min: PluginDownloadMinAggregateOutputType | null;
    _max: PluginDownloadMaxAggregateOutputType | null;
};
type GetPluginDownloadGroupByPayload<T extends PluginDownloadGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PluginDownloadGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PluginDownloadGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PluginDownloadGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PluginDownloadGroupByOutputType[P]>;
}>>;
export type PluginDownloadWhereInput = {
    AND?: Prisma.PluginDownloadWhereInput | Prisma.PluginDownloadWhereInput[];
    OR?: Prisma.PluginDownloadWhereInput[];
    NOT?: Prisma.PluginDownloadWhereInput | Prisma.PluginDownloadWhereInput[];
    id?: Prisma.StringFilter<"PluginDownload"> | string;
    pluginId?: Prisma.StringFilter<"PluginDownload"> | string;
    ip?: Prisma.StringFilter<"PluginDownload"> | string;
    createdAt?: Prisma.DateTimeFilter<"PluginDownload"> | Date | string;
    plugin?: Prisma.XOR<Prisma.PluginScalarRelationFilter, Prisma.PluginWhereInput>;
};
export type PluginDownloadOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    plugin?: Prisma.PluginOrderByWithRelationInput;
    _relevance?: Prisma.PluginDownloadOrderByRelevanceInput;
};
export type PluginDownloadWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PluginDownloadWhereInput | Prisma.PluginDownloadWhereInput[];
    OR?: Prisma.PluginDownloadWhereInput[];
    NOT?: Prisma.PluginDownloadWhereInput | Prisma.PluginDownloadWhereInput[];
    pluginId?: Prisma.StringFilter<"PluginDownload"> | string;
    ip?: Prisma.StringFilter<"PluginDownload"> | string;
    createdAt?: Prisma.DateTimeFilter<"PluginDownload"> | Date | string;
    plugin?: Prisma.XOR<Prisma.PluginScalarRelationFilter, Prisma.PluginWhereInput>;
}, "id">;
export type PluginDownloadOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PluginDownloadCountOrderByAggregateInput;
    _max?: Prisma.PluginDownloadMaxOrderByAggregateInput;
    _min?: Prisma.PluginDownloadMinOrderByAggregateInput;
};
export type PluginDownloadScalarWhereWithAggregatesInput = {
    AND?: Prisma.PluginDownloadScalarWhereWithAggregatesInput | Prisma.PluginDownloadScalarWhereWithAggregatesInput[];
    OR?: Prisma.PluginDownloadScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PluginDownloadScalarWhereWithAggregatesInput | Prisma.PluginDownloadScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PluginDownload"> | string;
    pluginId?: Prisma.StringWithAggregatesFilter<"PluginDownload"> | string;
    ip?: Prisma.StringWithAggregatesFilter<"PluginDownload"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PluginDownload"> | Date | string;
};
export type PluginDownloadCreateInput = {
    id?: string;
    ip: string;
    createdAt?: Date | string;
    plugin: Prisma.PluginCreateNestedOneWithoutDownloadsListInput;
};
export type PluginDownloadUncheckedCreateInput = {
    id?: string;
    pluginId: string;
    ip: string;
    createdAt?: Date | string;
};
export type PluginDownloadUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    plugin?: Prisma.PluginUpdateOneRequiredWithoutDownloadsListNestedInput;
};
export type PluginDownloadUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginDownloadCreateManyInput = {
    id?: string;
    pluginId: string;
    ip: string;
    createdAt?: Date | string;
};
export type PluginDownloadUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginDownloadUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    pluginId?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginDownloadListRelationFilter = {
    every?: Prisma.PluginDownloadWhereInput;
    some?: Prisma.PluginDownloadWhereInput;
    none?: Prisma.PluginDownloadWhereInput;
};
export type PluginDownloadOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PluginDownloadOrderByRelevanceInput = {
    fields: Prisma.PluginDownloadOrderByRelevanceFieldEnum | Prisma.PluginDownloadOrderByRelevanceFieldEnum[];
    sort: Prisma.SortOrder;
    search: string;
};
export type PluginDownloadCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PluginDownloadMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PluginDownloadMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    pluginId?: Prisma.SortOrder;
    ip?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PluginDownloadCreateNestedManyWithoutPluginInput = {
    create?: Prisma.XOR<Prisma.PluginDownloadCreateWithoutPluginInput, Prisma.PluginDownloadUncheckedCreateWithoutPluginInput> | Prisma.PluginDownloadCreateWithoutPluginInput[] | Prisma.PluginDownloadUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginDownloadCreateOrConnectWithoutPluginInput | Prisma.PluginDownloadCreateOrConnectWithoutPluginInput[];
    createMany?: Prisma.PluginDownloadCreateManyPluginInputEnvelope;
    connect?: Prisma.PluginDownloadWhereUniqueInput | Prisma.PluginDownloadWhereUniqueInput[];
};
export type PluginDownloadUncheckedCreateNestedManyWithoutPluginInput = {
    create?: Prisma.XOR<Prisma.PluginDownloadCreateWithoutPluginInput, Prisma.PluginDownloadUncheckedCreateWithoutPluginInput> | Prisma.PluginDownloadCreateWithoutPluginInput[] | Prisma.PluginDownloadUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginDownloadCreateOrConnectWithoutPluginInput | Prisma.PluginDownloadCreateOrConnectWithoutPluginInput[];
    createMany?: Prisma.PluginDownloadCreateManyPluginInputEnvelope;
    connect?: Prisma.PluginDownloadWhereUniqueInput | Prisma.PluginDownloadWhereUniqueInput[];
};
export type PluginDownloadUpdateManyWithoutPluginNestedInput = {
    create?: Prisma.XOR<Prisma.PluginDownloadCreateWithoutPluginInput, Prisma.PluginDownloadUncheckedCreateWithoutPluginInput> | Prisma.PluginDownloadCreateWithoutPluginInput[] | Prisma.PluginDownloadUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginDownloadCreateOrConnectWithoutPluginInput | Prisma.PluginDownloadCreateOrConnectWithoutPluginInput[];
    upsert?: Prisma.PluginDownloadUpsertWithWhereUniqueWithoutPluginInput | Prisma.PluginDownloadUpsertWithWhereUniqueWithoutPluginInput[];
    createMany?: Prisma.PluginDownloadCreateManyPluginInputEnvelope;
    set?: Prisma.PluginDownloadWhereUniqueInput | Prisma.PluginDownloadWhereUniqueInput[];
    disconnect?: Prisma.PluginDownloadWhereUniqueInput | Prisma.PluginDownloadWhereUniqueInput[];
    delete?: Prisma.PluginDownloadWhereUniqueInput | Prisma.PluginDownloadWhereUniqueInput[];
    connect?: Prisma.PluginDownloadWhereUniqueInput | Prisma.PluginDownloadWhereUniqueInput[];
    update?: Prisma.PluginDownloadUpdateWithWhereUniqueWithoutPluginInput | Prisma.PluginDownloadUpdateWithWhereUniqueWithoutPluginInput[];
    updateMany?: Prisma.PluginDownloadUpdateManyWithWhereWithoutPluginInput | Prisma.PluginDownloadUpdateManyWithWhereWithoutPluginInput[];
    deleteMany?: Prisma.PluginDownloadScalarWhereInput | Prisma.PluginDownloadScalarWhereInput[];
};
export type PluginDownloadUncheckedUpdateManyWithoutPluginNestedInput = {
    create?: Prisma.XOR<Prisma.PluginDownloadCreateWithoutPluginInput, Prisma.PluginDownloadUncheckedCreateWithoutPluginInput> | Prisma.PluginDownloadCreateWithoutPluginInput[] | Prisma.PluginDownloadUncheckedCreateWithoutPluginInput[];
    connectOrCreate?: Prisma.PluginDownloadCreateOrConnectWithoutPluginInput | Prisma.PluginDownloadCreateOrConnectWithoutPluginInput[];
    upsert?: Prisma.PluginDownloadUpsertWithWhereUniqueWithoutPluginInput | Prisma.PluginDownloadUpsertWithWhereUniqueWithoutPluginInput[];
    createMany?: Prisma.PluginDownloadCreateManyPluginInputEnvelope;
    set?: Prisma.PluginDownloadWhereUniqueInput | Prisma.PluginDownloadWhereUniqueInput[];
    disconnect?: Prisma.PluginDownloadWhereUniqueInput | Prisma.PluginDownloadWhereUniqueInput[];
    delete?: Prisma.PluginDownloadWhereUniqueInput | Prisma.PluginDownloadWhereUniqueInput[];
    connect?: Prisma.PluginDownloadWhereUniqueInput | Prisma.PluginDownloadWhereUniqueInput[];
    update?: Prisma.PluginDownloadUpdateWithWhereUniqueWithoutPluginInput | Prisma.PluginDownloadUpdateWithWhereUniqueWithoutPluginInput[];
    updateMany?: Prisma.PluginDownloadUpdateManyWithWhereWithoutPluginInput | Prisma.PluginDownloadUpdateManyWithWhereWithoutPluginInput[];
    deleteMany?: Prisma.PluginDownloadScalarWhereInput | Prisma.PluginDownloadScalarWhereInput[];
};
export type PluginDownloadCreateWithoutPluginInput = {
    id?: string;
    ip: string;
    createdAt?: Date | string;
};
export type PluginDownloadUncheckedCreateWithoutPluginInput = {
    id?: string;
    ip: string;
    createdAt?: Date | string;
};
export type PluginDownloadCreateOrConnectWithoutPluginInput = {
    where: Prisma.PluginDownloadWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginDownloadCreateWithoutPluginInput, Prisma.PluginDownloadUncheckedCreateWithoutPluginInput>;
};
export type PluginDownloadCreateManyPluginInputEnvelope = {
    data: Prisma.PluginDownloadCreateManyPluginInput | Prisma.PluginDownloadCreateManyPluginInput[];
    skipDuplicates?: boolean;
};
export type PluginDownloadUpsertWithWhereUniqueWithoutPluginInput = {
    where: Prisma.PluginDownloadWhereUniqueInput;
    update: Prisma.XOR<Prisma.PluginDownloadUpdateWithoutPluginInput, Prisma.PluginDownloadUncheckedUpdateWithoutPluginInput>;
    create: Prisma.XOR<Prisma.PluginDownloadCreateWithoutPluginInput, Prisma.PluginDownloadUncheckedCreateWithoutPluginInput>;
};
export type PluginDownloadUpdateWithWhereUniqueWithoutPluginInput = {
    where: Prisma.PluginDownloadWhereUniqueInput;
    data: Prisma.XOR<Prisma.PluginDownloadUpdateWithoutPluginInput, Prisma.PluginDownloadUncheckedUpdateWithoutPluginInput>;
};
export type PluginDownloadUpdateManyWithWhereWithoutPluginInput = {
    where: Prisma.PluginDownloadScalarWhereInput;
    data: Prisma.XOR<Prisma.PluginDownloadUpdateManyMutationInput, Prisma.PluginDownloadUncheckedUpdateManyWithoutPluginInput>;
};
export type PluginDownloadScalarWhereInput = {
    AND?: Prisma.PluginDownloadScalarWhereInput | Prisma.PluginDownloadScalarWhereInput[];
    OR?: Prisma.PluginDownloadScalarWhereInput[];
    NOT?: Prisma.PluginDownloadScalarWhereInput | Prisma.PluginDownloadScalarWhereInput[];
    id?: Prisma.StringFilter<"PluginDownload"> | string;
    pluginId?: Prisma.StringFilter<"PluginDownload"> | string;
    ip?: Prisma.StringFilter<"PluginDownload"> | string;
    createdAt?: Prisma.DateTimeFilter<"PluginDownload"> | Date | string;
};
export type PluginDownloadCreateManyPluginInput = {
    id?: string;
    ip: string;
    createdAt?: Date | string;
};
export type PluginDownloadUpdateWithoutPluginInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginDownloadUncheckedUpdateWithoutPluginInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginDownloadUncheckedUpdateManyWithoutPluginInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ip?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PluginDownloadSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    pluginId?: boolean;
    ip?: boolean;
    createdAt?: boolean;
    plugin?: boolean | Prisma.PluginDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["pluginDownload"]>;
export type PluginDownloadSelectScalar = {
    id?: boolean;
    pluginId?: boolean;
    ip?: boolean;
    createdAt?: boolean;
};
export type PluginDownloadOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "pluginId" | "ip" | "createdAt", ExtArgs["result"]["pluginDownload"]>;
export type PluginDownloadInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    plugin?: boolean | Prisma.PluginDefaultArgs<ExtArgs>;
};
export type $PluginDownloadPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PluginDownload";
    objects: {
        plugin: Prisma.$PluginPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        pluginId: string;
        ip: string;
        createdAt: Date;
    }, ExtArgs["result"]["pluginDownload"]>;
    composites: {};
};
export type PluginDownloadGetPayload<S extends boolean | null | undefined | PluginDownloadDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PluginDownloadPayload, S>;
export type PluginDownloadCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PluginDownloadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PluginDownloadCountAggregateInputType | true;
};
export interface PluginDownloadDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PluginDownload'];
        meta: {
            name: 'PluginDownload';
        };
    };
    findUnique<T extends PluginDownloadFindUniqueArgs>(args: Prisma.SelectSubset<T, PluginDownloadFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PluginDownloadClient<runtime.Types.Result.GetResult<Prisma.$PluginDownloadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PluginDownloadFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PluginDownloadFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PluginDownloadClient<runtime.Types.Result.GetResult<Prisma.$PluginDownloadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PluginDownloadFindFirstArgs>(args?: Prisma.SelectSubset<T, PluginDownloadFindFirstArgs<ExtArgs>>): Prisma.Prisma__PluginDownloadClient<runtime.Types.Result.GetResult<Prisma.$PluginDownloadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PluginDownloadFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PluginDownloadFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PluginDownloadClient<runtime.Types.Result.GetResult<Prisma.$PluginDownloadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PluginDownloadFindManyArgs>(args?: Prisma.SelectSubset<T, PluginDownloadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PluginDownloadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PluginDownloadCreateArgs>(args: Prisma.SelectSubset<T, PluginDownloadCreateArgs<ExtArgs>>): Prisma.Prisma__PluginDownloadClient<runtime.Types.Result.GetResult<Prisma.$PluginDownloadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PluginDownloadCreateManyArgs>(args?: Prisma.SelectSubset<T, PluginDownloadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    delete<T extends PluginDownloadDeleteArgs>(args: Prisma.SelectSubset<T, PluginDownloadDeleteArgs<ExtArgs>>): Prisma.Prisma__PluginDownloadClient<runtime.Types.Result.GetResult<Prisma.$PluginDownloadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PluginDownloadUpdateArgs>(args: Prisma.SelectSubset<T, PluginDownloadUpdateArgs<ExtArgs>>): Prisma.Prisma__PluginDownloadClient<runtime.Types.Result.GetResult<Prisma.$PluginDownloadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PluginDownloadDeleteManyArgs>(args?: Prisma.SelectSubset<T, PluginDownloadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PluginDownloadUpdateManyArgs>(args: Prisma.SelectSubset<T, PluginDownloadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    upsert<T extends PluginDownloadUpsertArgs>(args: Prisma.SelectSubset<T, PluginDownloadUpsertArgs<ExtArgs>>): Prisma.Prisma__PluginDownloadClient<runtime.Types.Result.GetResult<Prisma.$PluginDownloadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PluginDownloadCountArgs>(args?: Prisma.Subset<T, PluginDownloadCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PluginDownloadCountAggregateOutputType> : number>;
    aggregate<T extends PluginDownloadAggregateArgs>(args: Prisma.Subset<T, PluginDownloadAggregateArgs>): Prisma.PrismaPromise<GetPluginDownloadAggregateType<T>>;
    groupBy<T extends PluginDownloadGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PluginDownloadGroupByArgs['orderBy'];
    } : {
        orderBy?: PluginDownloadGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PluginDownloadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPluginDownloadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PluginDownloadFieldRefs;
}
export interface Prisma__PluginDownloadClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    plugin<T extends Prisma.PluginDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PluginDefaultArgs<ExtArgs>>): Prisma.Prisma__PluginClient<runtime.Types.Result.GetResult<Prisma.$PluginPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PluginDownloadFieldRefs {
    readonly id: Prisma.FieldRef<"PluginDownload", 'String'>;
    readonly pluginId: Prisma.FieldRef<"PluginDownload", 'String'>;
    readonly ip: Prisma.FieldRef<"PluginDownload", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PluginDownload", 'DateTime'>;
}
export type PluginDownloadFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginDownloadSelect<ExtArgs> | null;
    omit?: Prisma.PluginDownloadOmit<ExtArgs> | null;
    include?: Prisma.PluginDownloadInclude<ExtArgs> | null;
    where: Prisma.PluginDownloadWhereUniqueInput;
};
export type PluginDownloadFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginDownloadSelect<ExtArgs> | null;
    omit?: Prisma.PluginDownloadOmit<ExtArgs> | null;
    include?: Prisma.PluginDownloadInclude<ExtArgs> | null;
    where: Prisma.PluginDownloadWhereUniqueInput;
};
export type PluginDownloadFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PluginDownloadFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PluginDownloadFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PluginDownloadCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginDownloadSelect<ExtArgs> | null;
    omit?: Prisma.PluginDownloadOmit<ExtArgs> | null;
    include?: Prisma.PluginDownloadInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PluginDownloadCreateInput, Prisma.PluginDownloadUncheckedCreateInput>;
};
export type PluginDownloadCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PluginDownloadCreateManyInput | Prisma.PluginDownloadCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PluginDownloadUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginDownloadSelect<ExtArgs> | null;
    omit?: Prisma.PluginDownloadOmit<ExtArgs> | null;
    include?: Prisma.PluginDownloadInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PluginDownloadUpdateInput, Prisma.PluginDownloadUncheckedUpdateInput>;
    where: Prisma.PluginDownloadWhereUniqueInput;
};
export type PluginDownloadUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PluginDownloadUpdateManyMutationInput, Prisma.PluginDownloadUncheckedUpdateManyInput>;
    where?: Prisma.PluginDownloadWhereInput;
    limit?: number;
};
export type PluginDownloadUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginDownloadSelect<ExtArgs> | null;
    omit?: Prisma.PluginDownloadOmit<ExtArgs> | null;
    include?: Prisma.PluginDownloadInclude<ExtArgs> | null;
    where: Prisma.PluginDownloadWhereUniqueInput;
    create: Prisma.XOR<Prisma.PluginDownloadCreateInput, Prisma.PluginDownloadUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PluginDownloadUpdateInput, Prisma.PluginDownloadUncheckedUpdateInput>;
};
export type PluginDownloadDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginDownloadSelect<ExtArgs> | null;
    omit?: Prisma.PluginDownloadOmit<ExtArgs> | null;
    include?: Prisma.PluginDownloadInclude<ExtArgs> | null;
    where: Prisma.PluginDownloadWhereUniqueInput;
};
export type PluginDownloadDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PluginDownloadWhereInput;
    limit?: number;
};
export type PluginDownloadDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PluginDownloadSelect<ExtArgs> | null;
    omit?: Prisma.PluginDownloadOmit<ExtArgs> | null;
    include?: Prisma.PluginDownloadInclude<ExtArgs> | null;
};
export {};
