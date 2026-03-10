"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCreatePluginPayload = normalizeCreatePluginPayload;
const common_1 = require("@nestjs/common");
function isRecord(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}
function cloneJson(value) {
    return JSON.parse(JSON.stringify(value));
}
function readString(value, field, options = {}) {
    const { required = false, defaultValue = '' } = options;
    if (value === undefined || value === null) {
        if (required) {
            throw new common_1.BadRequestException(`${field} is required`);
        }
        return defaultValue;
    }
    if (typeof value !== 'string') {
        throw new common_1.BadRequestException(`${field} must be a string`);
    }
    const trimmed = value.trim();
    if (required && trimmed.length === 0) {
        throw new common_1.BadRequestException(`${field} is required`);
    }
    return trimmed;
}
function validateStringArray(value, field) {
    if (value === undefined) {
        return;
    }
    if (!Array.isArray(value) ||
        !value.every((item) => typeof item === 'string')) {
        throw new common_1.BadRequestException(`${field} must be an array of strings`);
    }
}
function validateCondition(value, field) {
    if (value === undefined) {
        return;
    }
    if (!isRecord(value)) {
        throw new common_1.BadRequestException(`${field} must be an object`);
    }
    if (value.all !== undefined) {
        if (!Array.isArray(value.all) ||
            !value.all.every((item) => isRecord(item))) {
            throw new common_1.BadRequestException(`${field}.all must be an array of condition objects`);
        }
    }
    if (value.any !== undefined) {
        if (!Array.isArray(value.any) ||
            !value.any.every((item) => isRecord(item))) {
            throw new common_1.BadRequestException(`${field}.any must be an array of condition objects`);
        }
    }
}
function validateDataSource(value, field) {
    if (value === undefined) {
        return;
    }
    if (!isRecord(value)) {
        throw new common_1.BadRequestException(`${field} must be an object`);
    }
    readString(value.script, `${field}.script`, { required: true });
    validateStringArray(value.watch, `${field}.watch`);
    validateStringArray(value.required, `${field}.required`);
    if (value.manual !== undefined && typeof value.manual !== 'boolean') {
        throw new common_1.BadRequestException(`${field}.manual must be a boolean`);
    }
    if (value.actionLabel !== undefined) {
        readString(value.actionLabel, `${field}.actionLabel`);
    }
}
function validateInput(value, index) {
    if (!isRecord(value)) {
        throw new common_1.BadRequestException(`content.inputs[${index}] must be an object`);
    }
    readString(value.name, `content.inputs[${index}].name`, { required: true });
    if (value.label !== undefined) {
        readString(value.label, `content.inputs[${index}].label`);
    }
    if (value.type !== undefined) {
        readString(value.type, `content.inputs[${index}].type`);
    }
    if (value.options !== undefined && !Array.isArray(value.options)) {
        throw new common_1.BadRequestException(`content.inputs[${index}].options must be an array`);
    }
    validateCondition(value.visibleWhen, `content.inputs[${index}].visibleWhen`);
    validateCondition(value.disabledWhen, `content.inputs[${index}].disabledWhen`);
    validateDataSource(value.dataSource, `content.inputs[${index}].dataSource`);
}
function normalizeContent(data, normalized) {
    if (!isRecord(data.content)) {
        throw new common_1.BadRequestException('content must be a JSON object');
    }
    const content = cloneJson(data.content);
    if (!isRecord(content)) {
        throw new common_1.BadRequestException('content must be a JSON object');
    }
    if (content.inputs === undefined) {
        content.inputs = [];
    }
    if (!Array.isArray(content.inputs)) {
        throw new common_1.BadRequestException('content.inputs must be an array');
    }
    const topLevelAuthor = typeof data.author === 'string' && data.author.trim().length > 0
        ? data.author.trim()
        : undefined;
    const topLevelScript = typeof data.script === 'string' && data.script.trim().length > 0
        ? data.script
        : undefined;
    if (topLevelAuthor) {
        content.author = topLevelAuthor;
    }
    if (topLevelScript) {
        content.script = topLevelScript;
    }
    readString(content.script, 'content.script', { required: true });
    content.inputs.forEach((input, index) => validateInput(input, index));
    content.id = normalized.id;
    content.name = normalized.name;
    content.version = normalized.version;
    content.description = normalized.description;
    content.icon = normalized.icon;
    return content;
}
function normalizeCreatePluginPayload(data) {
    const normalized = {
        id: readString(data.id, 'id', { required: true }),
        name: readString(data.name, 'name', { required: true }),
        description: readString(data.description, 'description'),
        icon: readString(data.icon, 'icon'),
        version: readString(data.version, 'version', { required: true }),
    };
    return {
        ...normalized,
        content: normalizeContent(data, normalized),
    };
}
//# sourceMappingURL=plugin-payload.js.map