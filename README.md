# Vue 3 博客项目

这是一个基于 Vue 3 + Vite 构建的现代化博客系统，具有响应式设计和夜间模式支持。

## 功能特性

- **现代化技术栈**：Vue 3 + Vite + Pinia + Vue Router
- **响应式设计**：适配各种设备屏幕尺寸
- **夜间模式**：支持日间/夜间模式切换，保护用户视力
- **博客功能**：
  - 文章列表展示
  - 文章详情页
  - 分类浏览
  - 标签云
  - 归档功能
  - 关于页面
  - 联系页面
- **3D标签云**：使用 Three.js 实现的交互式3D标签云
- **代码高亮**：集成 highlight.js 实现代码语法高亮
- **Markdown支持**：使用 marked.js 解析Markdown格式文章

## 项目结构

```
src/
├── api/          # API接口
├── assets/       # 静态资源
├── components/   # 组件
│   ├── blog/     # 博客相关组件
│   ├── common/   # 通用组件
│   ├── layout/   # 布局组件
│   └── sidebar/  # 侧边栏组件
├── pages/        # 页面组件
├── router/       # 路由配置
├── store/        # 状态管理
├── utils/        # 工具函数
└── App.vue       # 根组件
```

## 开发环境

### 依赖

- Node.js (推荐版本 16+)
- pnpm (推荐使用pnpm管理依赖)

### 安装依赖

```bash
pnpm install
```

### 启动开发服务器

```bash
pnpm dev
```

### 构建生产版本

```bash
pnpm build:prod
```

### 预览生产构建

```bash
pnpm preview
```

## 技术栈

- **Vue 3**：采用 `<script setup>` 语法糖的单文件组件
- **Vite**：极速的构建工具
- **Pinia**：Vue 3 的状态管理库
- **Vue Router**：官方路由管理器
- **Sass**：CSS 预处理器
- **Three.js**：3D图形库，用于实现标签云
- **highlight.js**：代码语法高亮
- **marked.js**：Markdown 解析器
- **Axios**：HTTP 客户端

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 许可证

MIT
