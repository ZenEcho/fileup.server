export interface CreatePluginDto {
  id: string;
  name: string;
  description: string;
  icon: string;
  version: string;
  author?: string | Record<string, unknown>;
  script?: string;
  content: Record<string, any>;
  changelog?: string;
}
