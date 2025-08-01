# 主题样式系统使用说明

## 概述

本项目采用统一的CSS变量管理系统来处理日夜模式切换，所有主题相关的样式变量都定义在 `themes.css` 文件中。

## 文件结构

```
src/styles/
├── themes.css     # 主题变量和基础样式
└── README.md      # 使用说明文档
```

## 主题变量

在 `themes.css` 中，我们定义了两套CSS变量：

1. 默认（日间）模式变量
2. 夜间模式变量（在 `.dark-mode` 类下定义）

### 可用变量列表

- `--primary-color`: 主色调
- `--secondary-color`: 次要颜色
- `--dark-color`: 深色
- `--light-color`: 浅色
- `--text-color`: 文本颜色
- `--border-color`: 边框颜色
- `--background-color`: 背景颜色
- `--card-background`: 卡片背景色
- `--header-background`: 头部背景色
- `--sidebar-background`: 侧边栏背景色

## 使用方法

### 在组件中使用主题变量

直接在组件的CSS中使用CSS变量：

```css
.my-component {
  background-color: var(--card-background);
  color: var(--text-color);
  border: 1px solid var(--border-color);
}
```

### 夜间模式适配

夜间模式的样式已经全局定义，组件中只需确保使用了CSS变量，无需额外添加 `.dark-mode` 前缀。

对于特殊样式需求，可以在组件中添加：

```css
.dark-mode .my-component {
  /* 夜间模式下的特殊样式 */
}
```

## 添加新的主题变量

如果需要添加新的主题变量，请按以下步骤操作：

1. 在 `themes.css` 的 `:root` 选择器中添加默认值
2. 在 `.dark-mode` 选择器中添加夜间模式的值
3. 在组件中使用新定义的变量

## 维护建议

1. 避免在组件中硬编码颜色值，尽量使用主题变量
2. 当需要添加组件特定的日夜模式样式时，确保在组件的样式部分添加
3. 定期检查和整理不再使用的主题变量