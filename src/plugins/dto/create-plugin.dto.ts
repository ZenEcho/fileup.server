export interface CreatePluginDto {
  id: string;
  name: string;
  description: string;
  icon: string;
  version: string;
  kind?: 'uploader' | 'site-detector' | 'editor-adapter';
  author?: string | Record<string, unknown>;
  script?: string;
  targetDriveType?: string;
  editorType?: string;
  displayName?: string;
  detectScript?: string;
  extractScript?: string;
  injectScript?: string;
  content: Record<string, unknown>;
  changelog?: string;
}
