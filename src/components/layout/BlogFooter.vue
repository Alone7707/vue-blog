<script setup>
import { ref, onMounted } from 'vue'
import { useStore } from '@/store';
import { computed } from 'vue'
import { usePostStore } from '@/store/posts'

const store = useStore()
const postStore = usePostStore()
const currentYear = new Date().getFullYear()

const socialLinks = computed(() => [
  { name: 'GitHub', url: store.blogInfo?.github || '#', icon: '🐙' },
  { name: '微博', url: '#', icon: '📱' },
  { name: '邮箱', url: 'mailto:' + (store.blogInfo?.mail || ''), icon: '📧' }
])

const posts = ref([])

const quickLinks = store.routeList

onMounted(async () => {
  posts.value = await postStore.getNewPosts
})
</script>

<template>
  <footer class="blog-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>{{ store.blogInfo?.title }}</h3>
          <p>记录技术成长，分享生活感悟</p>
          <div class="social-links">
            <a v-for="link in socialLinks" :key="link.name" :href="link.url" class="social-link">
              <span class="social-icon">{{ link.icon }}</span>
              <span>{{ link.name }}</span>
            </a>
          </div>
        </div>

        <div class="footer-section">
          <h3>快速导航</h3>
          <ul class="quick-links">
            <li v-for="link in quickLinks" :key="link.name">
              <router-link :to="link.path">{{ link.name }}</router-link>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>最新文章</h3>
          <ul class="recent-posts">
            <li v-for="post in posts" :key="post.post_id">
              <router-link :to="'/post/' + post.post_id">{{ post.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="copyright">
          <p>&copy; {{ currentYear }} {{ store.blogInfo?.title }}. 保留所有权利.</p>
        </div>
        <div class="footer-links">
          <a href="#">隐私政策</a>
          <a href="#">使用条款</a>
          <a href="#">RSS订阅</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.blog-footer {
  background-color: var(--dark-color);
  color: white;
  margin-top: auto;
}

.dark-mode .blog-footer {
  background-color: #3f3f3f;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  padding: 50px 0 30px;
}

.footer-section {
  h3 {
    font-size: 1.3em;
    margin-bottom: 20px;
    color: white;
  }

  p {
    color: #bdc3c7;
    line-height: 1.6;
    margin-bottom: 20px;
  }
}

.social-links {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #bdc3c7;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: var(--primary-color);
  }
}

.social-icon {
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2em;
}

.quick-links,
.recent-posts {
  list-style: none;

  li {
    margin-bottom: 10px;
  }

  a {
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: var(--primary-color);
    }
  }
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid #34495e;
  margin-top: 30px;
}

.copyright {
  color: #95a5a6;
  font-size: 0.9em;
}

.footer-links {
  display: flex;
  gap: 20px;

  a {
    color: #95a5a6;
    text-decoration: none;
    font-size: 0.9em;
    transition: color 0.3s;

    &:hover {
      color: var(--primary-color);
    }
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 40px 0 20px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 15px;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
  }
}
</style>

