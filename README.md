# FileUp Server

A NestJS based backend server for FileUp application.
基于 NestJS 的 FileUp 后端服务。

## Prerequisites / 前置要求

Before you begin, ensure you have met the following requirements:
在开始之前，请确保你已经满足以下要求：

*   **Node.js**: v18 or later / v18 或更高版本
*   **pnpm**: Package manager / 包管理器
*   **MySQL**: Database / 数据库

## Installation / 安装

```bash
$ pnpm install
```

## Configuration / 配置

Create a `.env` file in the root directory based on the following template:
在根目录下创建一个 `.env` 文件，参考以下模板：

```env
DATABASE_URL="mysql://user:password@localhost:3306/fileup"
JWT_SECRET="your-super-secret-key"
FRONTEND_URL="https://your-domain.com"
GITHUB_CLIENT_ID="xxx"
GITHUB_CLIENT_SECRET="xxx"
GITHUB_CALLBACK_URL="https://your-domain.com/api/auth/github/callback"
PORT=3000
```

> **Note**: Replace the placeholders with your actual configuration.
> **注意**: 请将占位符替换为你实际的配置信息。

## Database Setup / 数据库设置

After configuring the `.env` file, generate the Prisma client and push the schema to your database:
配置好 `.env` 文件后，生成 Prisma 客户端并将结构同步到数据库：

```bash
# Generate Prisma Client / 生成 Prisma 客户端
$ npx prisma generate

# Push schema to database / 同步数据库结构
$ npx prisma db push
```

## Running the app / 运行应用

```bash
# development / 开发模式
$ pnpm run start

# watch mode / 监听模式
$ pnpm run start:dev

# production mode / 生产模式
$ pnpm run start:prod
```

## Deployment / 部署

### Build / 构建

First, build the project for production:
首先，构建生产环境代码：

```bash
$ pnpm build
```

The build artifacts will be stored in the `dist/` directory.
构建产物将存储在 `dist/` 目录下。

### Deploy with PM2 / 使用 PM2 部署

We recommend using PM2 for process management in production.
推荐在生产环境中使用 PM2 进行进程管理。

1.  **Install PM2 / 安装 PM2**:
    ```bash
    $ npm install -g pm2
    ```

2.  **Start the application / 启动应用**:
    ```bash
    $ pm2 start ecosystem.config.js
    ```

3.  **Monitor / 监控**:
    ```bash
    $ pm2 status
    $ pm2 logs fileup-server
    ```

### Deploy with Docker / 使用 Docker 部署

Alternatively, you can deploy using Docker.
或者，你也可以使用 Docker 进行部署。

1.  **Build and start / 构建并启动**:
    ```bash
    $ docker-compose up -d --build
    ```

2.  **View logs / 查看日志**:
    ```bash
    $ docker-compose logs -f
    ```

## License

[MIT licensed](LICENSE).
