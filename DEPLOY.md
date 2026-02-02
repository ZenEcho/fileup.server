# 后端服务部署指南

本文档提供两种将 `fileup-server` 部署到服务器的方法：使用 **PM2**（传统方式）或 **Docker**（容器化方式）。

## 准备工作

无论使用哪种方式，请确保你已经：
1. 拥有一台云服务器（Linux/Ubuntu 推荐）。
2. 将代码上传到服务器。
3. 准备好 GitHub OAuth App 的 Client ID 和 Client Secret。

---

## 方法一：使用 Docker 部署 (推荐)

这种方法最简单，环境隔离，易于管理。

### 1. 安装 Docker
如果服务器尚未安装 Docker 和 Docker Compose，请先安装。

### 2. 配置环境变量
修改 `docker-compose.yml` 文件中的环境变量，或者创建一个 `.env` 文件供 Docker 读取。
**重点修改：**
- `JWT_SECRET`: 设置一个强随机字符串。
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`: 填入你的 GitHub App 信息。
- `FRONTEND_URL`: 你的前端域名（用于 CORS 和跳转）。
- `GITHUB_CALLBACK_URL`: 回调地址 (通常是 `https://你的域名/api/auth/github/callback`，如果用了 Nginx 反代)。

### 3. 启动服务
在 `server` 目录下运行：
```bash
docker-compose up -d --build
```

### 4. 验证
查看日志：
```bash
docker-compose logs -f
```
服务默认运行在 3000 端口。

---

## 方法二：使用 PM2 部署 (传统方式)

适用于已经在服务器上安装了 Node.js 和 MySQL 的情况。

### 1. 环境安装
- Node.js (v18+)
- pnpm (`npm install -g pnpm`)
- PM2 (`npm install -g pm2`)
- MySQL 数据库

### 2. 配置数据库
确保本地或远程 MySQL 数据库已运行，并创建一个空的数据库（例如 `fileup`）。

### 3. 配置环境变量
在 `server` 目录下创建 `.env` 文件：
```env
DATABASE_URL="mysql://user:password@localhost:3306/fileup"
JWT_SECRET="your-super-secret-key"
FRONTEND_URL="https://your-domain.com"
GITHUB_CLIENT_ID="xxx"
GITHUB_CLIENT_SECRET="xxx"
GITHUB_CALLBACK_URL="https://your-domain.com/api/auth/github/callback"
PORT=3000
```

### 4. 安装依赖与构建
```bash
cd server
pnpm install
npx prisma generate
npx prisma db push  # 同步数据库结构
pnpm build
```

### 5. 启动服务
使用我们准备好的 `ecosystem.config.js`：
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 6. 查看状态
```bash
pm2 status
pm2 logs fileup-server
```

---

## 推荐：Nginx 反向代理配置

无论使用哪种方式，建议使用 Nginx 作为反向代理，并配置 HTTPS。

```nginx
server {
    listen 80;
    server_name api.your-domain.com; # 或者你的主域名下的 /api 路径

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
