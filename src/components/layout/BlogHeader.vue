<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

const route = useRoute()
const store = useStore()
const isMenuOpen = ref(false)
const isDarkMode = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const menuItems = store.routeList

// 根据当前路由判断激活状态
const isActive = (path) => {
  return route.path === path
}

const blogTitle = computed(() => {
  return store.blogInfo && store.blogInfo.title
})

// 切换夜间模式
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark-mode', isDarkMode.value)
  localStorage.setItem('darkMode', isDarkMode.value)
}

// 检查本地存储中的夜间模式设置
onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode === 'true') {
    isDarkMode.value = true
    document.body.classList.add('dark-mode')
  }
})

// 清理
onBeforeUnmount(() => {
  localStorage.removeItem('darkMode')
})
</script>

<template>
  <header>
    <div class="container">
      <nav class="navbar">
        <router-link to="/" class="logo">{{blogTitle}}</router-link>
        <button class="menu-toggle" @click="toggleMenu">☰</button>
        <ul class="nav-menu" :class="{ active: isMenuOpen }">
          <li v-for="item in menuItems" :key="item.name">
            <router-link 
              :to="item.path" 
              :class="{ active: isActive(item.path) }"
              @click="closeMenu"
            >
              {{ item.name }}
            </router-link>
          </li>
          <li class="dark-mode-toggle">
            <button @click="toggleDarkMode" class="dark-mode-button">
              {{ isDarkMode ? '☀️' : '🌙' }}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  background-color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  position: relative;
}

.logo {
  font-size: 1.8em;
  font-weight: bold;
  color: var(--dark-color);
  text-decoration: none;
  z-index: 101;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  z-index: 101;
}

.nav-menu {
  display: flex;
  list-style: none;

  li {
    margin-left: 30px;
  }

  a {
    color: var(--dark-color);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s;

    &:hover {
      color: var(--primary-color);
    }

    &.active {
      color: var(--primary-color);
      border-bottom: 2px solid var(--primary-color);
      padding-bottom: 5px;
    }
  }

  .dark-mode-toggle {
    margin-left: 30px;
    display: flex;
    align-items: center;
  }

  .dark-mode-button {
    background: none;
    border: none;
    font-size: 1.2em;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
    transition: background-color 0.3s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: block;
  }
  
  .nav-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: white;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: translateY(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 100;

    &.active {
      transform: translateY(0);
    }
    
    li {
      margin: 15px 0;
    }
    
    a {
      font-size: 1.2em;

      &.active {
        border-bottom: none;
        padding-bottom: 0;
      }
    }

    .dark-mode-toggle {
      margin: 15px 0;
    }

    .dark-mode-button {
      font-size: 1.5em;
    }
  }
}
</style>
