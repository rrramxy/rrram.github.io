---
title: Docker 容器化 Node.js 应用：从零到生产级部署
date: 2026-05-13
category: 技术
tags:
  - Docker
  - Node.js
  - 容器化
  - DevOps
  - 后端开发
cover: https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80
description: 手把手带你把第一个 Node.js 应用装进 Docker 容器，涵盖 Dockerfile 写法、多阶段构建、生产环境优化，以及新手最容易踩的 5 个坑。
---

## 引言

不知道你有没有过这种经历：本地跑得好好的 Node.js 项目，换了一台机器部署就报一堆奇奇怪怪的错误——Node 版本不对、依赖没装上、环境变量丢了……Docker 就是来解决这个问题的。

简单说，Docker 容器把应用和它运行所需的一切（代码、运行时、系统工具、库）全部打包在一起，无论在哪里启动，行为完全一致。本文用一篇实战，带你从零把一个 Node.js 应用容器化，顺便聊聊最佳实践和常见坑。

---

## 核心概念

在动手之前，先把几个关键概念说清楚，理解它们能让你少走很多弯路。

### 镜像（Image） vs 容器（Container）

**镜像**是一个只读的模板，你可以理解成应用的"快照"；**容器**是镜像的运行实例。你可以基于同一个镜像创建多个容器，它们之间互相隔离。

打个比方：镜像是一张菜谱，容器是按这张菜谱做出来的菜。做多少份都行，互不影响。

### Dockerfile

Dockerfile 是构建镜像的配方文件，里面写清楚了从哪个基础镜像开始、需要安装什么依赖、复制哪些文件、启动命令是什么。把它提交到代码仓库，团队成员就能一键构建出完全一致的环境。

### 多阶段构建（Multi-stage Build）

生产环境其实不需要源代码和完整的开发依赖。多阶段构建允许你用"构建阶段"来编译和打包，然后用"运行阶段"只把最终产物复制过来，镜像体积能缩小 80% 以上。

---

## 实战：从零构建一个 Docker 化 Node.js 应用

### 准备工作：一个简单的 Node.js 项目

为了方便演示，我们从一个最基本的 Express 项目开始：

```javascript
// app.js
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello，Docker 世界！');
});

app.listen(PORT, () => {
  console.log(`服务运行在端口 ${PORT}`);
});
```

```json
// package.json
{
  "name": "dockerized-app",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

项目结构如下：

```
my-node-app/
├── app.js
├── package.json
└── Dockerfile
```

---

### 第一步：写 Dockerfile

在项目根目录创建 `Dockerfile`，内容如下：

```dockerfile
# 阶段一：构建阶段
FROM node:20-alpine AS builder

WORKDIR /app

# 先复制依赖清单，安装依赖（利用 Docker 缓存层）
COPY package*.json ./
RUN npm ci

# 再复制源代码
COPY . .

# 阶段二：运行阶段
FROM node:20-alpine AS production

WORKDIR /app

# 只复制必要的文件（不包含 node_modules，因为生产环境不需要）
COPY package*.json ./

# npm ci 比 npm install 更适合 CI/CD 场景：
# 它严格按 package-lock.json 安装，不会自动修改锁文件版本
RUN npm ci --omit=dev && npm cache clean --force

# 复制构建产物
COPY --from=builder /app/dist ./dist  # 如果有构建步骤的话
COPY --from=builder /app/app.js ./

# 使用非 root 用户运行，提升安全性
USER node

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "app.js"]
```

**几个关键点说明：**

- **`node:20-alpine`**：`alpine` 是极简 Linux 发行版，镜像只有 50MB 左右，比标准 `node` 镜像小得多，适合追求轻量的场景。
- **先复制 `package*.json` 再 `RUN npm ci`**：这是经典的 Docker 层缓存优化。修改代码不会触发依赖重新安装，除非 `package.json` 变了。
- **`USER node`**：默认容器以 root 运行，但生产环境应该用非特权用户。Node 官方镜像默认创建了一个 `node` 用户，直接用就行。
- **`npm ci --omit=dev`**：跳过 `devDependencies`，只安装生产依赖，镜像更小。

---

### 第二步：创建 .dockerignore

就像 `.gitignore` 一样，`.dockerignore` 告诉 Docker 忽略哪些文件，不把它们复制到镜像里：

```
node_modules
npm-debug.log
.env
.env.*
.git
.gitignore
README.md
dist
coverage
.nyc_output
```

`node_modules` 绝对不能进镜像——依赖应该在容器内通过 `npm ci` 安装，否则容易出现本地系统库和容器内不兼容的问题。

---

### 第三步：构建和运行

```bash
# 在项目根目录执行，构建镜像
docker build -t my-node-app:latest .

# 查看构建好的镜像
docker images | grep my-node-app

# 启动容器
docker run -d \
  --name my-node-app \
  -p 3000:3000 \
  -e NODE_ENV=production \
  my-node-app:latest

# 验证服务是否正常运行
curl http://localhost:3000
# 输出：Hello，Docker 世界！
```

如果一切正常，你应该能看到返回的字符串。

---

### 第四步：用 Docker Compose 管理多容器（可选）

生产环境经常需要数据库、Redis 等配套服务。`docker-compose.yml` 可以一键启动整个环境：

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      target: production
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DB_HOST=db
      - DB_PASSWORD=${DB_PASSWORD}
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U myuser -d myapp"]
      interval: 10s
      timeout: 5s
      retries: 5

volumes:
  postgres_data:
```

然后一行命令启动全部服务：

```bash
docker compose up -d
```

---

## 最佳实践

### 1. 善用层缓存

Docker 镜像按层构建，每一层都会缓存。把不常变化的操作（如依赖安装）放在前面，频繁变化的操作（如复制源代码）放在后面。这样改代码后重新构建，大多数层可以直接用缓存，速度快很多。

### 2. 生产环境用非 root 用户

容器内的 root 和宿主机 root 是同一个用户组，如果容器被攻破可能影响宿主机。用 `USER node` 切换到非特权用户，能有效限制攻击面。

### 3. 使用健康检查（HEALTHCHECK）

给长时间运行的服务加上健康检查，Docker 会自动监控容器状态：

```dockerfile
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1
```

### 4. 使用多阶段构建精简镜像

前端有构建步骤（如 React/Vue）的项目，第二阶段只复制构建产物即可。前端代码和构建工具都不用装进最终镜像。

### 5. 管理好标签，不要用 `latest`

镜像打标签时指定明确版本：

```bash
docker build -t my-node-app:1.0.0 -t my-node-app:latest .
```

用 `latest` 容易出现"上次拉取的就是这个版本"的认知偏差，导致生产环境跑的还是旧代码。

---

## 常见坑

### 坑一：`node_modules` 误进镜像

这是新人最容易踩的。如果在 Dockerfile 里直接 `COPY . ./`，而 `.dockerignore` 又没配好，`node_modules` 会被复制进去。这会导致两个问题：镜像体积膨胀，以及本地依赖和容器环境不兼容。

**解法**：务必写好 `.dockerignore`，并用 `npm ci` 在容器内重新安装依赖。

### 坑二：`NODE_ENV=production` 没设置

Node.js 在生产模式下会跳过大量开发专用的检查和日志，性能有明显提升。如果容器启动时没设置这个环境变量，性能可能比预期低 2-3 倍。

**解法**：Dockerfile 中显式设置 `ENV NODE_ENV=production`，或在 `docker run` 时用 `-e` 参数传入。

### 坑三：端口映射错了

在 Dockerfile 里用 `EXPOSE 3000` 声明了容器端口，但如果 `docker run` 时用了错误的映射（如 `-p 8080:8080`），访问 `localhost:8080` 是访问不到服务的。

**解法**：确保映射的右侧端口和 EXPOSE 的一致——`EXPOSE` 是文档用途，`docker run -p` 才是实际绑定。

### 坑四：直接在容器内修改文件

有些新手会用 `docker exec -it <container> npm install xxx` 手动装包，这会导致一个问题：**改动没有记录在 Dockerfile 里**，重建镜像时改动就丢了，容器也不可复现。

**解法**：所有变更都要写进 Dockerfile 和 package.json，然后重新构建镜像。

### 坑五：忽略了容器退出码

容器进程退出（代码报错或未捕获异常），容器会立即停止。如果你看到 `docker ps` 里找不到容器，用 `docker ps -a` 查看——容器可能已经退出了。

**解法**：启动命令加上 `restart: unless-stopped`（Docker Compose），或在 Dockerfile 里用 `CMD ["node", "app.js"]` 而非 shell 形式 `CMD node app.js`，这样 Node.js 的信号处理更完善。

---

## 总结

容器化 Node.js 应用并不复杂，核心就三步：写 Dockerfile、加 .dockerignore、构建运行。掌握好多阶段构建、环境变量配置、非 root 用户运行这些要点，你的镜像就已经达到生产级标准了。

最重要的习惯是：**所有环境变更都进 Dockerfile**，不要在容器里手动操作。这样每次 `docker build` 出来的镜像行为完全一致，团队协作和部署都会轻松很多。

如果遇到问题，记住三板斧：`docker logs <container>` 看日志、`docker exec -it <container> sh` 进容器排查、`docker inspect <container>` 看完整配置。大部分问题都能从中找到答案。

有问题欢迎留言交流，祝你的容器之旅顺利！ 🚀
