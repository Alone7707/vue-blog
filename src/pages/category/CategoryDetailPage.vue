<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import PostCard from '../../components/blog/PostCard.vue'
import Sidebar from '../../components/sidebar/Sidebar.vue'

const route = useRoute()
const categoryName = computed(() => route.params.name)

// 模拟文章数据
const allPosts = ref([
  {
    id: 1,
    title: '探索人工智能的边界：从机器学习到深度思考',
    excerpt: '在这个快速发展的数字时代，人工智能不再是科幻小说中的概念，而是我们日常生活的一部分。本文将深入探讨AI技术的发展历程...',
    date: '2024年1月15日',
    tags: ['人工智能', '机器学习', '深度学习'],
    views: 1234,
    category: '技术思考',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995'
  },
  {
    id: 2,
    title: 'Vue.js 3.0 实践心得',
    excerpt: 'Vue 3.0 带来了许多令人兴奋的新特性，包括 Composition API、更好的 TypeScript 支持等。本文分享我在实际项目中的使用经验...',
    date: '2024年1月10日',
    tags: ['Vue.js', '前端开发', 'JavaScript'],
    views: 856,
    category: '技术思考',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee'
  },
  {
    id: 3,
    title: '前端工程化的思考',
    excerpt: '随着前端项目复杂度的增加，工程化变得越来越重要。本文探讨了现代前端工程化的最佳实践...',
    date: '2024年1月5日',
    tags: ['工程化', '构建工具', 'Webpack'],
    views: 642,
    category: '技术思考',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c'
  },
  {
    id: 4,
    title: '城市漫步：发现身边的美丽',
    excerpt: '在忙碌的生活中，我们常常忽略了身边的美景。这次城市漫步让我重新发现了生活的美好...',
    date: '2024年1月12日',
    tags: ['生活', '摄影', '城市'],
    views: 423,
    category: '生活随笔',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000'
  },
  {
    id: 5,
    title: '咖啡馆里的思考时光',
    excerpt: '午后的咖啡馆，阳光透过窗户洒在桌上，这是我最喜欢的思考时光。在这里，时间仿佛慢了下来...',
    date: '2024年1月8日',
    tags: ['生活', '思考', '咖啡'],
    views: 367,
    category: '生活随笔',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb'
  },
  {
    id: 6,
    title: '《深度工作》读后感',
    excerpt: '在这个信息爆炸的时代，如何保持专注成为了一个重要课题。《深度工作》这本书给了我很多启发...',
    date: '2024年1月14日',
    tags: ['读书', '效率', '专注'],
    views: 789,
    category: '读书笔记',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570'
  }
])

// 根据分类筛选文章
const filteredPosts = computed(() => {
  return allPosts.value.filter(post => post.category === categoryName.value)
})

// 分类信息
const categoryInfo = computed(() => {
  const categoryMap = {
    '技术思考': {
      description: '关于编程、技术发展和软件工程的思考',
      color: '#3498db',
      icon: '💻'
    },
    '生活随笔': {
      description: '记录生活中的点点滴滴和感悟',
      color: '#e74c3c',
      icon: '📝'
    },
    '读书笔记': {
      description: '阅读心得和书籍推荐',
      color: '#f39c12',
      icon: '📚'
    },
    '旅行见闻': {
      description: '旅途中的见闻和摄影作品',
      color: '#27ae60',
      icon: '🌍'
    }
  }
  return categoryMap[categoryName.value] || {
    description: '分类文章',
    color: '#95a5a6',
    icon: '📄'
  }
})

// 分页相关
const currentPage = ref(1)
const postsPerPage = 5
const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const changePage = (page) => {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="container">
    <div class="category-detail-page">
      <!-- 分类头部 -->
      <div class="category-header">
        <div class="category-info">
          <div class="category-icon" :style="{ backgroundColor: categoryInfo.color }">
            {{ categoryInfo.icon }}
          </div>
          <div class="category-text">
            <h1>{{ categoryName }}</h1>
            <p>{{ categoryInfo.description }}</p>
            <div class="category-stats">
              <span>共 {{ filteredPosts.length }} 篇文章</span>
            </div>
          </div>
        </div>

        <!-- 面包屑导航 -->
        <nav class="breadcrumb">
          <router-link to="/">首页</router-link>
          <span class="separator">></span>
          <router-link to="/category">分类</router-link>
          <span class="separator">></span>
          <span class="current">{{ categoryName }}</span>
        </nav>
      </div>

      <div class="main-content">
        <div class="content-area">
          <!-- 文章列表 -->
          <div v-if="paginatedPosts.length > 0" class="posts-list">
            <PostCard v-for="post in paginatedPosts" :key="post.id" :post="post" />
          </div>

          <!-- 空状态 -->
          <div v-else class="empty-state">
            <div class="empty-icon">📝</div>
            <h3>暂无文章</h3>
            <p>该分类下还没有文章，敬请期待！</p>
            <router-link to="/" class="back-home">返回首页</router-link>
          </div>

          <!-- 分页 -->
          <div v-if="totalPages > 1" class="pagination">
            <button v-if="currentPage > 1" @click="changePage(currentPage - 1)" class="page-btn">
              ← 上一页
            </button>

            <button v-for="page in totalPages" :key="page" @click="changePage(page)"
              :class="['page-btn', { active: currentPage === page }]">
              {{ page }}
            </button>

            <button v-if="currentPage < totalPages" @click="changePage(currentPage + 1)" class="page-btn">
              下一页 →
            </button>
          </div>
        </div>

        <Sidebar />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category-detail-page {
  margin: 30px 0;
}

.category-header {
  background: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 40px;
  margin-bottom: 30px;
}

.category-info {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.category-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  color: white;
}

.category-text {
  h1 {
    font-size: 2.2em;
    color: var(--dark-color);
    margin-bottom: 8px;
  }

  p {
    color: var(--text-color);
    font-size: 1.1em;
    margin-bottom: 10px;
  }
}

.category-stats {
  span {
    background: var(--light-color);
    color: var(--text-color);
    padding: 4px 12px;
    border-radius: 15px;
    font-size: 0.9em;
  }
}

.breadcrumb {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9em;

  a {
    color: var(--primary-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .separator {
    color: #999;
  }

  .current {
    color: var(--text-color);
  }
}

.main-content {
  display: flex;
  gap: 30px;
}

.content-area {
  flex: 2;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);

  .empty-icon {
    font-size: 3em;
    margin-bottom: 20px;
  }

  h3 {
    color: var(--dark-color);
    margin-bottom: 10px;
  }

  p {
    color: var(--text-color);
    margin-bottom: 30px;
  }

  .back-home {
    display: inline-block;
    background: var(--primary-color);
    color: white;
    padding: 12px 24px;
    border-radius: 6px;
    text-decoration: none;
    transition: background-color 0.3s;

    &:hover {
      background: var(--secondary-color);
    }
  }
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
}

.page-btn {
  padding: 10px 16px;
  border: 1px solid var(--border-color);
  background: var(--card-background);
  color: var(--text-color);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }

  &.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
}

@media (max-width: 992px) {
  .main-content {
    flex-direction: column;
  }

  .category-header {
    padding: 30px 20px;
  }

  .category-info {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .pagination {
    flex-wrap: wrap;
  }
}
</style>