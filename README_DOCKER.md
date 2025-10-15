# Docker 部署指南

本文档介绍如何使用 Docker 构建和部署博客前端应用。

## 📋 前置要求

- Docker 20.10+
- Docker Compose 1.29+ (可选)
- GitHub 账号 (用于 GitHub Actions)

## 🚀 快速开始

### 方式一: 使用 Docker Compose (推荐)

```bash
# 构建并启动容器
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止容器
docker-compose down
```

### 方式二: 使用 Docker 命令

```bash
# 构建镜像
docker build -t blog-frontend:latest .

# 运行容器
docker run -d -p 80:80 --name blog-frontend blog-frontend:latest

# 查看日志
docker logs -f blog-frontend

# 停止容器
docker stop blog-frontend

# 删除容器
docker rm blog-frontend
```

## 🤖 GitHub Actions 自动化部署

本项目提供了两个 GitHub Actions 工作流:

### 1. Docker Hub 部署 (docker-build.yml)

推送到 Docker Hub 镜像仓库。

**配置步骤:**

1. 在 [Docker Hub](https://hub.docker.com/) 创建账号
2. 创建 Access Token: `Account Settings` -> `Security` -> `New Access Token`
3. 在 GitHub 仓库设置 Secrets:
   - 进入仓库 `Settings` -> `Secrets and variables` -> `Actions`
   - 添加以下 secrets:
     - `DOCKERHUB_USERNAME`: Docker Hub 用户名
     - `DOCKERHUB_TOKEN`: Docker Hub Access Token

**使用方式:**

```bash
# 推送代码到 main/master 分支时自动构建
git push origin main

# 或者创建版本标签触发构建
git tag v1.0.0
git push origin v1.0.0
```

**拉取镜像:**

```bash
docker pull <你的用户名>/blog-frontend:latest
docker run -d -p 80:80 <你的用户名>/blog-frontend:latest
```

### 2. GitHub Container Registry 部署 (docker-build-ghcr.yml)

推送到 GitHub Container Registry (无需额外配置)。

**使用方式:**

```bash
# 推送代码到 main/master 分支时自动构建
git push origin main

# 镜像自动推送到: ghcr.io/<你的用户名>/<仓库名>:latest
```

**拉取镜像:**

```bash
# 如果镜像是公开的
docker pull ghcr.io/<你的用户名>/blog:latest

# 如果镜像是私有的,需要先登录
echo $GITHUB_TOKEN | docker login ghcr.io -u <你的用户名> --password-stdin
docker pull ghcr.io/<你的用户名>/blog:latest
```

**设置镜像为公开:**

1. 进入 GitHub 个人主页 -> `Packages`
2. 找到对应的包
3. `Package settings` -> `Change visibility` -> `Public`

## 📝 配置说明

### Dockerfile

- **构建阶段**: 使用 Node.js 20 Alpine 镜像编译前端代码
- **运行阶段**: 使用 Nginx Alpine 镜像托管静态文件
- **优化**: 多阶段构建,最终镜像体积小

### nginx.conf

- ✅ Gzip 压缩
- ✅ 静态资源缓存
- ✅ SPA 路由支持
- ✅ 安全头配置

### .dockerignore

排除不必要的文件,减小构建上下文大小。

## 🔧 本地测试

```bash
# 构建镜像
docker build -t blog-frontend:test .

# 运行容器
docker run -d -p 8080:80 --name blog-test blog-frontend:test

# 访问 http://localhost:8080 测试

# 清理
docker stop blog-test
docker rm blog-test
docker rmi blog-frontend:test
```

## 🌐 生产部署

### 使用 Docker Compose 部署

```bash
# 拉取最新代码
git pull

# 重新构建并启动
docker-compose up -d --build

# 或者使用已构建的镜像
docker-compose pull
docker-compose up -d
```

### 使用 Nginx 反向代理

如果需要配置域名和 HTTPS,可以在宿主机上配置 Nginx 反向代理:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:80;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 📊 监控和日志

```bash
# 查看容器状态
docker ps

# 查看实时日志
docker logs -f blog-frontend

# 查看资源使用
docker stats blog-frontend

# 进入容器
docker exec -it blog-frontend sh
```

## 🛠️ 故障排查

### 容器无法启动

```bash
# 查看详细错误日志
docker logs blog-frontend

# 检查端口是否被占用
netstat -tlnp | grep 80

# 检查镜像是否构建成功
docker images | grep blog-frontend
```

### 构建失败

```bash
# 清理 Docker 缓存
docker builder prune

# 重新构建
docker build --no-cache -t blog-frontend:latest .
```

### 修改 Nginx 配置后需要重启

```bash
# 重启容器
docker restart blog-frontend

# 或者重新加载 Nginx 配置
docker exec blog-frontend nginx -s reload
```

## 🔄 更新部署

```bash
# 方式一: 使用 docker-compose
docker-compose pull  # 拉取最新镜像
docker-compose up -d  # 重新创建容器

# 方式二: 手动更新
docker pull <镜像名>:latest
docker stop blog-frontend
docker rm blog-frontend
docker run -d -p 80:80 --name blog-frontend <镜像名>:latest
```

## 📚 其他资源

- [Docker 官方文档](https://docs.docker.com/)
- [Nginx 官方文档](https://nginx.org/en/docs/)
- [GitHub Actions 文档](https://docs.github.com/en/actions)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request!

## 📄 许可证

MIT License

