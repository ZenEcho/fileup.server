export interface CreatePluginDto {
  id: string;
  name: string;
  description: string;
  icon: string;
  version: string;
  kind?: 'uploader' | 'site-detector';
  author?: string | Record<string, unknown>;
  script?: string;
  targetDriveType?: string;
  detectScript?: string;
  extractScript?: string;
  content: Record<string, unknown>;
  changelog?: string;
}
