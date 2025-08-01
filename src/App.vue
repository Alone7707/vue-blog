<script setup>
import { ref, onMounted } from 'vue'
import BlogHeader from './components/layout/BlogHeader.vue'
import BlogFooter from './components/layout/BlogFooter.vue'
import Message from './components/common/Message.vue'
import { setMessageInstance } from './utils/message'

const messageRef = ref()

onMounted(() => {
  setMessageInstance(messageRef.value)
})
</script>

<template>
  <div id="app">
    <BlogHeader />
    <main>
      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" v-if="route.meta.keepAlive" />
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepAlive" />
      </router-view>
    </main>

    <BlogFooter />
    <Message ref="messageRef" />
  </div>
</template>

<style lang="scss">
:root {
  --primary-color: #3498db;
  --secondary-color: #2980b9;
  --dark-color: #3f3f3f;
  --light-color: #ecf0f1;
  --text-color: #333;
  --border-color: #ddd;
}

/* 导入主题样式 */
@import './styles/themes.css';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--background-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}

/* 完全不占用空间的滚动条 */
::-webkit-scrollbar {
  width: 8px;
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
}

/* Firefox 支持 */
* {
  scrollbar-width: none;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2);
}

/* 深色模式下的滚动条 */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);

    &:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    &:active {
      background: rgba(255, 255, 255, 0.6);
    }
  }
}

/* 针对特定容器的滚动条样式 */
.post-body {

  /* 代码块内的滚动条 */
  :deep(pre) {
    &::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 6px;

      &:hover {
        background: rgba(255, 255, 255, 0.5);
      }
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0.1);
      border-radius: 6px;
    }
  }
}

/* 侧边栏滚动条 */
.sidebar {
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.15);
    border-radius: 6px;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }
}

/* 移动端隐藏滚动条但保持滚动功能 */
@media (max-width: 768px) {
  * {
    scrollbar-width: none;
    /* Firefox */
    -ms-overflow-style: none;
    /* IE and Edge */
  }

  *::-webkit-scrollbar {
    display: none;
    /* Chrome, Safari, Opera */
  }
}

/* 平滑滚动 */
html {
  scroll-behavior: smooth;
}

/* 自定义滚动条动画 */
@keyframes scrollbar-appear {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

::-webkit-scrollbar-thumb {
  animation: scrollbar-appear 0.3s ease-out;
}
</style>
