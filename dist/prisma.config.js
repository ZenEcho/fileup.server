"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ override: true });
const config_1 = require("prisma/config");
const dbUrl = process.env['DATABASE_URL'];
if (!dbUrl) {
    throw new Error('DATABASE_URL is not defined in environment variables');
}
exports.default = (0, config_1.defineConfig)({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    datasource: {
        url: dbUrl,
    },
});
//# sourceMappingURL=prisma.config.js.map