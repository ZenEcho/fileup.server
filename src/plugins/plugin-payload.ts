import { BadRequestException } from '@nestjs/common';

type PluginKind = 'uploader' | 'site-detector';

const UPLOADER_INPUT_TYPES = new Set([
  'text',
  'password',
  'checkbox',
  'select',
  'textarea',
  'number',
  'switch',
  'kv-pairs',
]);

const DETECTOR_ACTION_FORM_TYPES = new Set([
  'text',
  'password',
  'checkbox',
  'select',
  'textarea',
  'number',
  'switch',
]);

const SITE_DETECTOR_PRESENTATION_FIELDS = [
  'title',
  'description',
  'actionText',
  'ignoreText',
  'successText',
  'dismissText',
  'failureText',
] as const;

interface RawCreatePluginDto {
  id?: unknown;
  name?: unknown;
  description?: unknown;
  icon?: unknown;
  version?: unknown;
  kind?: unknown;
  author?: unknown;
  script?: unknown;
  targetDriveType?: unknown;
  detectScript?: unknown;
  extractScript?: unknown;
  content?: unknown;
}

export interface NormalizedCreatePluginPayload {
  id: string;
  name: string;
  description: string;
  icon: string;
  version: string;
  kind: PluginKind;
  content: Record<string, unknown>;
}

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function cloneJson<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function hasOwnKey(record: JsonRecord, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function readString(
  value: unknown,
  field: string,
  options: { required?: boolean; defaultValue?: string } = {},
) {
  const { required = false, defaultValue = '' } = options;

  if (value === undefined || value === null) {
    if (required) {
      throw new BadRequestException(`${field} is required`);
    }
    return defaultValue;
  }

  if (typeof value !== 'string') {
    throw new BadRequestException(`${field} must be a string`);
  }

  const trimmed = value.trim();
  if (required && trimmed.length === 0) {
    throw new BadRequestException(`${field} is required`);
  }

  return trimmed;
}

function validateStringArray(value: unknown, field: string) {
  if (value === undefined) {
    return;
  }

  if (
    !Array.isArray(value) ||
    !value.every((item) => typeof item === 'string')
  ) {
    throw new BadRequestException(`${field} must be an array of strings`);
  }
}

function validateBoolean(value: unknown, field: string) {
  if (value === undefined) {
    return;
  }

  if (typeof value !== 'boolean') {
    throw new BadRequestException(`${field} must be a boolean`);
  }
}

function validateCondition(value: unknown, field: string) {
  if (value === undefined) {
    return;
  }

  if (!isRecord(value)) {
    throw new BadRequestException(`${field} must be an object`);
  }

  if (value.all !== undefined) {
    if (
      !Array.isArray(value.all) ||
      !value.all.every((item) => isRecord(item))
    ) {
      throw new BadRequestException(
        `${field}.all must be an array of condition objects`,
      );
    }
  }

  if (value.any !== undefined) {
    if (
      !Array.isArray(value.any) ||
      !value.any.every((item) => isRecord(item))
    ) {
      throw new BadRequestException(
        `${field}.any must be an array of condition objects`,
      );
    }
  }
}

function validateDataSource(value: unknown, field: string) {
  if (value === undefined) {
    return;
  }

  if (!isRecord(value)) {
    throw new BadRequestException(`${field} must be an object`);
  }

  readString(value.script, `${field}.script`, { required: true });
  validateStringArray(value.watch, `${field}.watch`);
  validateStringArray(value.required, `${field}.required`);

  if (value.manual !== undefined && typeof value.manual !== 'boolean') {
    throw new BadRequestException(`${field}.manual must be a boolean`);
  }

  if (value.actionLabel !== undefined) {
    readString(value.actionLabel, `${field}.actionLabel`);
  }
}

function readPluginKind(value: unknown, field: string): PluginKind {
  const normalized = readString(value, field, { required: true });
  if (normalized !== 'uploader' && normalized !== 'site-detector') {
    throw new BadRequestException(
      `${field} must be either "uploader" or "site-detector"`,
    );
  }

  return normalized;
}

function validateUploaderInput(
  value: unknown,
  index: number,
  fieldPath = 'content.uploader.inputs',
) {
  if (!isRecord(value)) {
    throw new BadRequestException(`${fieldPath}[${index}] must be an object`);
  }

  readString(value.name, `${fieldPath}[${index}].name`, { required: true });

  if (value.label !== undefined) {
    readString(value.label, `${fieldPath}[${index}].label`);
  }

  if (value.type !== undefined) {
    const inputType = readString(value.type, `${fieldPath}[${index}].type`);
    if (!UPLOADER_INPUT_TYPES.has(inputType)) {
      throw new BadRequestException(
        `${fieldPath}[${index}].type must be one of: ${Array.from(
          UPLOADER_INPUT_TYPES,
        ).join(', ')}`,
      );
    }
  }

  validateBoolean(value.required, `${fieldPath}[${index}].required`);
  validateBoolean(value.filterable, `${fieldPath}[${index}].filterable`);
  validateBoolean(value.clearable, `${fieldPath}[${index}].clearable`);
  validateBoolean(value.tag, `${fieldPath}[${index}].tag`);
  validateBoolean(value.multiple, `${fieldPath}[${index}].multiple`);

  if (value.placeholder !== undefined) {
    readString(value.placeholder, `${fieldPath}[${index}].placeholder`);
  }

  if (value.help !== undefined) {
    readString(value.help, `${fieldPath}[${index}].help`);
  }

  if (value.options !== undefined && !Array.isArray(value.options)) {
    throw new BadRequestException(
      `${fieldPath}[${index}].options must be an array`,
    );
  }

  validateCondition(value.visibleWhen, `${fieldPath}[${index}].visibleWhen`);
  validateCondition(value.disabledWhen, `${fieldPath}[${index}].disabledWhen`);
  validateDataSource(value.dataSource, `${fieldPath}[${index}].dataSource`);
}

function validateSiteDetectorMatch(value: unknown, field: string) {
  if (value === undefined) {
    return;
  }

  if (!isRecord(value)) {
    throw new BadRequestException(`${field} must be an object`);
  }

  validateStringArray(value.domains, `${field}.domains`);
  validateStringArray(value.domainSuffixes, `${field}.domainSuffixes`);
  validateStringArray(value.pathnameEquals, `${field}.pathnameEquals`);
  validateStringArray(value.pathnameIncludes, `${field}.pathnameIncludes`);
  validateStringArray(value.urlPatterns, `${field}.urlPatterns`);
}

function validateSiteDetectorPresentation(value: unknown, field: string) {
  if (value === undefined) {
    return;
  }

  if (!isRecord(value)) {
    throw new BadRequestException(`${field} must be an object`);
  }

  SITE_DETECTOR_PRESENTATION_FIELDS.forEach((key) => {
    if (value[key] !== undefined) {
      readString(value[key], `${field}.${key}`);
    }
  });
}

function validateDetectorActionField(
  value: unknown,
  index: number,
  fieldPath = 'content.detector.actionForm',
) {
  if (!isRecord(value)) {
    throw new BadRequestException(`${fieldPath}[${index}] must be an object`);
  }

  readString(value.name, `${fieldPath}[${index}].name`, {
    required: true,
  });

  if (value.label !== undefined) {
    readString(value.label, `${fieldPath}[${index}].label`);
  }

  if (value.type !== undefined) {
    const inputType = readString(value.type, `${fieldPath}[${index}].type`);
    if (!DETECTOR_ACTION_FORM_TYPES.has(inputType)) {
      throw new BadRequestException(
        `${fieldPath}[${index}].type must be one of: ${Array.from(
          DETECTOR_ACTION_FORM_TYPES,
        ).join(', ')}`,
      );
    }
  }

  validateBoolean(value.required, `${fieldPath}[${index}].required`);
  validateBoolean(value.filterable, `${fieldPath}[${index}].filterable`);
  validateBoolean(value.clearable, `${fieldPath}[${index}].clearable`);
  validateBoolean(value.multiple, `${fieldPath}[${index}].multiple`);

  if (value.placeholder !== undefined) {
    readString(value.placeholder, `${fieldPath}[${index}].placeholder`);
  }

  if (value.help !== undefined) {
    readString(value.help, `${fieldPath}[${index}].help`);
  }

  if (value.options !== undefined && !Array.isArray(value.options)) {
    throw new BadRequestException(
      `${fieldPath}[${index}].options must be an array`,
    );
  }

  if (value.tag !== undefined) {
    throw new BadRequestException(
      `${fieldPath}[${index}].tag is not supported for site-detector`,
    );
  }

  if (value.visibleWhen !== undefined || value.disabledWhen !== undefined) {
    throw new BadRequestException(
      `${fieldPath}[${index}] does not support visibleWhen/disabledWhen`,
    );
  }

  if (value.dataSource !== undefined) {
    throw new BadRequestException(
      `${fieldPath}[${index}] does not support dataSource`,
    );
  }
}

function validateDetectorActionForm(value: unknown, field: string) {
  if (value === undefined) {
    return;
  }

  if (!Array.isArray(value)) {
    throw new BadRequestException(`${field} must be an array`);
  }

  value.forEach((item, index) => {
    validateDetectorActionField(item, index, field);
  });
}

function normalizeUploaderRuntime(
  content: JsonRecord,
  topLevelScript?: string,
) {
  if (content.uploader !== undefined && !isRecord(content.uploader)) {
    throw new BadRequestException('content.uploader must be an object');
  }

  const uploader = isRecord(content.uploader) ? content.uploader : {};
  const normalizedUploader: JsonRecord = { ...uploader };

  const rawInputs =
    normalizedUploader.inputs !== undefined
      ? normalizedUploader.inputs
      : content.inputs;

  if (rawInputs === undefined) {
    normalizedUploader.inputs = [];
  } else if (Array.isArray(rawInputs)) {
    normalizedUploader.inputs = rawInputs;
  } else {
    throw new BadRequestException('content.uploader.inputs must be an array');
  }

  const rawScript =
    normalizedUploader.script !== undefined
      ? normalizedUploader.script
      : content.script;

  if (
    topLevelScript &&
    (typeof rawScript !== 'string' || rawScript.trim().length === 0)
  ) {
    normalizedUploader.script = topLevelScript;
  } else {
    normalizedUploader.script = rawScript;
  }

  readString(normalizedUploader.script, 'content.uploader.script', {
    required: true,
  });

  content.uploader = normalizedUploader;
  delete content.inputs;
  delete content.script;

  return normalizedUploader;
}

function normalizeSiteDetectorRuntime(
  content: JsonRecord,
  topLevelTargetDriveType?: string,
  topLevelDetectScript?: string,
  topLevelExtractScript?: string,
) {
  if (content.detector !== undefined && !isRecord(content.detector)) {
    throw new BadRequestException('content.detector must be an object');
  }

  const detector = isRecord(content.detector) ? content.detector : {};
  const normalizedDetector: JsonRecord = { ...detector };

  const targetDriveType =
    normalizedDetector.targetDriveType !== undefined
      ? normalizedDetector.targetDriveType
      : content.targetDriveType;
  const detectScript =
    normalizedDetector.detectScript !== undefined
      ? normalizedDetector.detectScript
      : content.detectScript;
  const extractScript =
    normalizedDetector.extractScript !== undefined
      ? normalizedDetector.extractScript
      : content.extractScript;

  normalizedDetector.targetDriveType =
    typeof targetDriveType === 'string' ? targetDriveType : '';
  normalizedDetector.detectScript =
    typeof detectScript === 'string' ? detectScript : '';
  normalizedDetector.extractScript =
    typeof extractScript === 'string' ? extractScript : '';

  if (
    topLevelTargetDriveType &&
    (typeof normalizedDetector.targetDriveType !== 'string' ||
      normalizedDetector.targetDriveType.trim().length === 0)
  ) {
    normalizedDetector.targetDriveType = topLevelTargetDriveType;
  }

  if (
    topLevelDetectScript &&
    (typeof normalizedDetector.detectScript !== 'string' ||
      normalizedDetector.detectScript.trim().length === 0)
  ) {
    normalizedDetector.detectScript = topLevelDetectScript;
  }

  if (
    topLevelExtractScript &&
    (typeof normalizedDetector.extractScript !== 'string' ||
      normalizedDetector.extractScript.trim().length === 0)
  ) {
    normalizedDetector.extractScript = topLevelExtractScript;
  }

  if (!hasOwnKey(normalizedDetector, 'match') && content.match !== undefined) {
    normalizedDetector.match = content.match;
  }
  if (
    !hasOwnKey(normalizedDetector, 'presentation') &&
    content.presentation !== undefined
  ) {
    normalizedDetector.presentation = content.presentation;
  }
  if (
    !hasOwnKey(normalizedDetector, 'priority') &&
    content.priority !== undefined
  ) {
    normalizedDetector.priority = content.priority;
  }
  if (
    !hasOwnKey(normalizedDetector, 'actionForm') &&
    content.actionForm !== undefined
  ) {
    normalizedDetector.actionForm = content.actionForm;
  }

  readString(
    normalizedDetector.targetDriveType,
    'content.detector.targetDriveType',
    {
      required: true,
    },
  );
  readString(normalizedDetector.detectScript, 'content.detector.detectScript', {
    required: true,
  });
  readString(
    normalizedDetector.extractScript,
    'content.detector.extractScript',
    {
      required: true,
    },
  );

  content.detector = normalizedDetector;
  delete content.targetDriveType;
  delete content.detectScript;
  delete content.extractScript;
  delete content.match;
  delete content.presentation;
  delete content.priority;
  delete content.actionForm;

  return normalizedDetector;
}

function normalizeContent(
  data: RawCreatePluginDto,
  normalized: Omit<NormalizedCreatePluginPayload, 'content' | 'kind'>,
) {
  if (!isRecord(data.content)) {
    throw new BadRequestException('content must be a JSON object');
  }

  const content = cloneJson(data.content);
  if (!isRecord(content)) {
    throw new BadRequestException('content must be a JSON object');
  }

  const kindSource = content.kind !== undefined ? content.kind : data.kind;
  const normalizedKind: PluginKind =
    kindSource === undefined || kindSource === null
      ? 'uploader'
      : readPluginKind(kindSource, 'content.kind');
  content.kind = normalizedKind;

  const topLevelAuthor =
    typeof data.author === 'string' && data.author.trim().length > 0
      ? data.author.trim()
      : undefined;
  const topLevelScript =
    typeof data.script === 'string' && data.script.trim().length > 0
      ? data.script
      : undefined;
  const topLevelTargetDriveType =
    typeof data.targetDriveType === 'string' &&
    data.targetDriveType.trim().length > 0
      ? data.targetDriveType.trim()
      : undefined;
  const topLevelDetectScript =
    typeof data.detectScript === 'string' && data.detectScript.trim().length > 0
      ? data.detectScript
      : undefined;
  const topLevelExtractScript =
    typeof data.extractScript === 'string' &&
    data.extractScript.trim().length > 0
      ? data.extractScript
      : undefined;

  if (topLevelAuthor) {
    content.author = topLevelAuthor;
  }

  if (normalizedKind === 'uploader') {
    const uploader = normalizeUploaderRuntime(content, topLevelScript);
    const inputs = uploader.inputs;
    if (Array.isArray(inputs)) {
      inputs.forEach((input, index) =>
        validateUploaderInput(input, index, 'content.uploader.inputs'),
      );
    }
  } else {
    const detector = normalizeSiteDetectorRuntime(
      content,
      topLevelTargetDriveType,
      topLevelDetectScript,
      topLevelExtractScript,
    );

    if (
      detector.priority !== undefined &&
      (typeof detector.priority !== 'number' ||
        !Number.isFinite(detector.priority))
    ) {
      throw new BadRequestException(
        'content.detector.priority must be a finite number',
      );
    }

    validateSiteDetectorMatch(detector.match, 'content.detector.match');
    validateSiteDetectorPresentation(
      detector.presentation,
      'content.detector.presentation',
    );
    validateDetectorActionForm(
      detector.actionForm,
      'content.detector.actionForm',
    );
  }

  content.id = normalized.id;
  content.name = normalized.name;
  content.version = normalized.version;
  content.description = normalized.description;
  content.icon = normalized.icon;

  return content;
}

export function normalizeCreatePluginPayload(
  data: RawCreatePluginDto,
): NormalizedCreatePluginPayload {
  const normalized = {
    id: readString(data.id, 'id', { required: true }),
    name: readString(data.name, 'name', { required: true }),
    description: readString(data.description, 'description'),
    icon: readString(data.icon, 'icon'),
    version: readString(data.version, 'version', { required: true }),
  };

  const content = normalizeContent(data, normalized);
  const kind = readPluginKind(content.kind, 'content.kind');

  return {
    ...normalized,
    kind,
    content,
  };
}
