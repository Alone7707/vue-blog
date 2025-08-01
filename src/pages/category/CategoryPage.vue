<script setup>
import { ref } from 'vue'
import { allCategories } from '@/api'
import Loading from '@/components/common/Loading.vue'
import { dateFormat } from '@/utils'

const loading = ref(false)
const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#16a085']
const categories = ref([
  // {
  //   id: 1,
  //   name: '技术思考',
  //   description: '关于编程、技术发展和软件工程的思考',
  //   count: 24,
  //   color: '#3498db',
  //   icon: '💻',
  //   posts: [
  //     { title: '探索人工智能的边界', date: '2024年1月15日' },
  //     { title: 'Vue.js 3.0 实践心得', date: '2024年1月10日' },
  //     { title: '前端工程化的思考', date: '2024年1月5日' }
  //   ]
  // },
])
const getData = () => {
  loading.value = true
  allCategories().then(res => {
    const { code, data } = res
    if (code === 200) {
      categories.value = data
    }
  }).finally(() => {
    loading.value = false
  })
}

getData()
</script>

<template>
  <div class="container">
    <div class="category-page">
      <div class="page-header">
        <h1>文章分类</h1>
        <p>按主题浏览所有文章</p>
      </div>

      <div class="categories-grid">
        <Loading v-if="loading" />
        <div v-for="(category, index) in categories" :key="category.id" class="category-card">
          <router-link :to="`/category/${category.category_id}`" class="category-header"
            :style="{ backgroundColor: colors[index] }">
            <div class="category-info">
              <h3 class="category-name">{{ category.name }}</h3>
              <div class="category-count">{{ category.count }} 篇文章</div>
            </div>
          </router-link>

          <div class="category-posts">
            <h4>最新文章</h4>
            <ul class="post-list">
              <li v-for="post in category.latestPosts" :key="post.title" class="post-item">
                <router-link :to="`/post/${post.post_id}`" class="post-link">
                  <span class="post-title">{{ post.title }}</span>
                  <span class="post-date">{{ dateFormat(post.created_at) }}</span>
                </router-link>
              </li>
            </ul>
            <router-link :to="`/category/${category.category_id}`" class="view-all">
              查看全部 →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.category-page {
  margin: 30px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;

  h1 {
    font-size: 2.5em;
    color: var(--dark-color);
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1em;
    color: #666;
  }
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.category-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
}

.category-header {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 30px;
  color: white;
  text-decoration: none;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  }
}

.category-info {
  flex: 1;
}

.category-name {
  font-size: 1.5em;
  margin-bottom: 8px;
}

.category-count {
  font-size: 0.9em;
  opacity: 0.8;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 4px 12px;
  border-radius: 15px;
  display: inline-block;
}

.category-posts {
  padding: 25px;

  h4 {
    color: var(--dark-color);
    margin-bottom: 15px;
    font-size: 1.1em;
  }
}

.post-list {
  list-style: none;
  margin-bottom: 20px;
}

.post-item {
  margin-bottom: 12px;
}

.post-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  text-decoration: none;
  color: var(--text-color);
  border-bottom: 1px solid #f0f0f0;
  transition: color 0.3s;

  &:hover {
    color: var(--primary-color);

    .post-title {
      color: var(--primary-color);
    }
  }
}

.post-title {
  flex: 1;
  font-size: 0.95em;
  transition: color 0.3s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.post-date {
  font-size: 0.85em;
  color: #999;
  margin-left: 15px;
}

.view-all {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95em;

  &:hover {
    text-decoration: underline;
  }
}

/* 夜间模式样式 */
.dark-mode .category-card {
  background-color: #3f3f3f;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.dark-mode .page-header p {
  color: var(--text-color);
}

.dark-mode .category-posts h4 {
  color: var(--dark-color);
}

.dark-mode .post-link {
  color: var(--text-color);
  border-bottom: 1px solid var(--border-color);
}

.dark-mode .post-date {
  color: var(--text-color);
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }

  .category-header {
    padding: 20px;
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .category-posts {
    padding: 20px;
  }

  .post-link {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }

  .post-date {
    margin-left: 0;
  }
}

@media (max-width: 1200px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
</style>
