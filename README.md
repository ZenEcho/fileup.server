# FileUp Server

## Tech Stack / 技术栈

### Core Runtime & Framework / 核心运行时与框架

- **Runtime**: Node.js (Docker image uses Node.js 20; local dev requires Node.js 18+) / 运行时（Docker 使用 Node.js 20，本地开发要求 Node.js 18+）
- **Language**: TypeScript 5 / 开发语言：TypeScript 5
- **Backend Framework**: NestJS 11 (`@nestjs/core`, `@nestjs/platform-express`) / 后端框架：NestJS 11
- **Architecture**: Modular Nest architecture (Auth, Users, Plugins, Prisma modules) / 模块化架构（Auth、Users、Plugins、Prisma 模块）
- **API Style**: REST API with global prefix `/api` / REST API（全局前缀 `/api`）
- **Static Serving**: `@nestjs/serve-static` serving `public/` / 静态资源服务（`public/` 目录）

### Data Layer / 数据层

- **Database**: MySQL 8 / 数据库：MySQL 8
- **ORM**: Prisma 7 (`@prisma/client`, `prisma`) / ORM：Prisma 7
- **DB Driver/Adapter**: `mariadb` + `@prisma/adapter-mariadb` / 数据库驱动与适配器
- **Schema & Migrations**: `prisma/schema.prisma` + Prisma migrations / Schema 与迁移管理
- **Generated Client**: Prisma Client generated to `src/generated/client` / Prisma 客户端生成目录：`src/generated/client`

### Authentication & Security / 认证与安全

- **Auth Framework**: Passport (`@nestjs/passport`, `passport`) / 认证框架：Passport
- **Token Auth**: JWT (`@nestjs/jwt`, `passport-jwt`) / JWT 鉴权
- **OAuth Login**: GitHub OAuth2 (`passport-github2`) / GitHub OAuth2 登录
- **Config Management**: `@nestjs/config` + `.env` / 配置管理

### Dev Tooling & Quality / 工程化与质量保障

- **Package Manager**: pnpm / 包管理器：pnpm
- **Build Toolchain**: Nest CLI + TypeScript compiler / 构建工具链：Nest CLI + TypeScript
- **Lint & Format**: ESLint 9 + `typescript-eslint` + Prettier / 代码规范：ESLint + Prettier
- **Testing**: Jest + ts-jest + Supertest (unit + e2e) / 测试：Jest + Supertest（单元与端到端）

### Deployment & Operations / 部署与运维

- **Process Manager**: PM2 (`ecosystem.config.js`) / 进程管理：PM2
- **Containerization**: Docker multi-stage build (`Dockerfile`) / 容器化：Docker 多阶段构建
- **Orchestration**: Docker Compose (`docker-compose.yml`) / 编排：Docker Compose

## Directory Structure / 目录文件作用说明

```text
.
├── prisma/                 # 数据库 Schema 定义、Prisma Client 生成代码及迁移记录
├── public/                 # 运行时对外直接提供访问的公开静态资源目录
├── src/                    # 核心源代码工作目录
│   ├── auth/               # 认证模块（包含 OAuth、JWT 及登录权限核心逻辑）
│   ├── common/             # 公共抽象模块（全局守卫、过滤器、装饰器、工具等）
│   ├── plugins/            # 插件业务控制模块（处理插件分发、包上传、状态验证等）
│   ├── system-settings/    # 系统及平台设置模块（站内配置等全局状态管理）
│   ├── users/              # 用户业务模块（涉及用户实体信息及查询变更）
│   ├── prisma/             # 服务端 Prisma ORM 依赖注入模块及客户端封装
│   ├── app.module.ts       # NestJS 根模块，装载各功能模块及全局服务
│   └── main.ts             # 服务端启动主入口的引导程序，启动侦听
├── test/                   # 端到端（E2E）测试集及其测试用例夹具
├── .env                    # 环境私密配置文件（如数据库 URL 及关键 Token，未提交配置）
├── Dockerfile              # Docker 镜像生产级多阶段应用构建配置文件
├── docker-compose.yml      # Docker Compose 服务配置容器管理配置文件
├── ecosystem.config.js     # PM2 生产时度量配置管理系统设置
├── eslint.config.mjs       # ESLint 9 + TypeScript 统一编码类型验证分析规范配置
├── nest-cli.json           # NestJS 路由引擎全局脚本脚手架生成构建的预配置文件
├── package.json            # NPM 项目执行坐标依赖、脚本文档定义列表与基本执行库
├── pnpm-lock.yaml          # pnpm 版本安全解析库依赖结构锁
├── prisma.config.ts        # Prisma Studio 配置脚本设置
└── README.md               # 项目开发者系统手册、技术架构介绍及操作指南
```

## Prisma Directory / 目录解析

`prisma` 目录管理整个应用程序的数据模型、强类型客户端代码生成以及数据库版本迁移控制。

```text
prisma/
├── schema.prisma               # Prisma 核心配置文件。定义数据库连接信息、生成器及所有业务数据模型（Data Models），是整个应用数据的单一真实来源（SSOT）。
├── migrations/                 # 数据库迁移历史版本目录（由 Prisma Migrate 生成）
│   ├── 2026..._migration_name/ # 单次增量迁移记录（时间戳及操作名命名）
│   │   └── migration.sql       # 转换的直接可执行原生 SQL 脚本，描述 DDL 变更细节
│   └── migration_lock.toml     # 迁移锁文件，防御多人协作下的迁移历史篡改，保证多库同步安全
└── generated/                  # 自定义的强类型客户端生成目标目录（由 schema.prisma 配置）
    └── client/                 # 根据数据模型自动化构建出的完整 TypeScript 客户端
        ├── client.ts           # 核心 API 入口，提供全量 `PrismaClient` 类及各个表模型的底层增删改查方法
        ├── browser.ts          # 用于无 Node.js 原生 API 的边缘运行时（Edge Runtime）或浏览器的轻量适配代码
        ├── enums.ts            # 读取 Prisma 定义的 MySQL Enums 结构并转化为 TypeScript 枚举
        ├── models.ts           # 单独解耦业务表的 TypeScript 实体 Interfaces，供业务侧 Service 显式定义返回类型
        ├── commonInputTypes.ts # 生成查询过滤、排序组合、嵌套连接（Includes/Select）等高级复合操作的类型定义
        ├── internal/           # Prisma Query Engine (Rust) 及通信代理的内部运行时逻辑（对外不暴露）
        └── models/             # 单个表的链式查询、聚合等具体逻辑抽象的输出目录
```

## Prerequisites / 前置要求

Before you begin, ensure you have met the following requirements:
在开始之前，请确保你已经满足以下要求：

- **Node.js**: v18 or later / v18 或更高版本
- **pnpm**: Package manager / 包管理器
- **MySQL**: Database / 数据库

## Usage Guide / 使用教程

### 1) Installation / 安装

```bash
pnpm install
```

### 2) Configuration / 配置

在项目根目录创建 `.env`：

```env
DATABASE_URL="mysql://user:password@localhost:3306/fileup"
JWT_SECRET="your-super-secret-key"
FRONTEND_URL="https://your-domain.com"
GITHUB_CLIENT_ID="xxx"
GITHUB_CLIENT_SECRET="xxx"
GITHUB_CALLBACK_URL="https://your-domain.com/api/auth/github/callback"
GOOGLE_CLIENT_ID="xxx"
GOOGLE_CLIENT_SECRET="xxx"
GOOGLE_CALLBACK_URL="https://your-domain.com/api/auth/google/callback"
SETTINGS_ENCRYPTION_KEY="your-32-byte-base64-or-64-char-hex-key"
EMAIL_VERIFY_TOKEN_TTL_MINUTES=30
EMAIL_VERIFY_RESEND_COOLDOWN_SECONDS=60
PORT=3000
```

### 3) Database / 数据库

本地开发：

```bash
pnpm prisma generate
pnpm prisma db push
```

生产环境：

```bash
pnpm prisma generate
pnpm prisma migrate deploy
```

如生产首次接入且遇到 `P3005`（数据库非空），先做 baseline：

```bash
mysqldump -uroot -p fileup > /root/fileup_backup_$(date +%F_%H%M%S).sql
for m in $(ls -1 prisma/migrations | grep -v migration_lock.toml); do pnpm prisma migrate resolve --applied "$m"; done
pnpm prisma migrate status
pnpm prisma migrate deploy
```

### 4) Run / 启动

本地开发：

```bash
pnpm run start
pnpm run start:dev
```

生产启动：

```bash
pnpm build
pnpm run start:prod
```
