interface RawCreatePluginDto {
    id?: unknown;
    name?: unknown;
    description?: unknown;
    icon?: unknown;
    version?: unknown;
    author?: unknown;
    script?: unknown;
    content?: unknown;
}
export interface NormalizedCreatePluginPayload {
    id: string;
    name: string;
    description: string;
    icon: string;
    version: string;
    content: Record<string, unknown>;
}
export declare function normalizeCreatePluginPayload(data: RawCreatePluginDto): NormalizedCreatePluginPayload;
export {};
