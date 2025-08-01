<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Sidebar from '../../components/sidebar/Sidebar.vue'
import { postsDetail, postsRelated } from '@/api'
import { useStore } from '@/store'
import { dateFormat } from '@/utils'
import { Marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark-dimmed.css'
import { message } from '@/utils/message'
import Loading from '@/components/common/Loading.vue'

const loading = ref(false)

// 处理markdown文本
const myMarked = new Marked()
const renderer = {
  heading({ tokens, depth }) {
    const text = this.parser.parseInline(tokens);
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
    return `
      <h${depth}>
        <a name="${escapedText}" class="anchor" href="#${escapedText}">
          <span class="header-link"></span>
        </a>
        ${text}
      </h${depth}>`;
  },
  code(token) {
    const { text, lang } = token
    if (lang && hljs.getLanguage(lang)) {
      const highlighted = hljs.highlight(text, { language: lang }).value
      return `<div class="code-block-wrapper" data-code="${encodeURIComponent(text)}">
        <div class="code-header">
          <div class="code-dots">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
          </div>
          <div class="code-lang">${lang}</div>
          <div class="code-copy" onclick="copyCodeContent(this)">一键复制</div>
        </div>
        <pre><code class="hljs language-${lang}">${highlighted}</code></pre>
      </div>`
    }
    return `<div class="code-block-wrapper" data-code="${encodeURIComponent(text)}">
      <div class="code-header">
        <div class="code-dots">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
        </div>
        <div class="code-copy" onclick="copyCodeContent(this)">一键复制</div>
      </div>
      <pre><code class="hljs">${text}</code></pre>
    </div>`
  },
};
myMarked.use({ renderer })

// 获取文章详情
const route = useRoute()
const store = useStore()
const postId = computed(() => route.params.id)

const posts = ref({})
const relatedPost = ref({
  prev: null,
  next: null
})
const getData = () => {
  loading.value = true
  postsDetail(postId.value).then(res => {
    const { code, data } = res
    if (code === 200) {
      posts.value = data
      document.title = `${posts.value.title} - ${store.blogInfo.title}`
    }
  }).finally(() => {
    getRelated()
    loading.value = false
  })
}

const getRelated = () => {
  postsRelated(postId.value).then(res => {
    const { code, data } = res
    if (code === 200) {
      relatedPost.value = data
    }
  })
}
getData()


// 渲染文章内容
const renderContent = computed(() => {
  return myMarked.parse(posts.value.content)
})

// 格式化日期
const formatDate = computed(() => {
  return dateFormat(posts.value.created_at, 'yyyy-MM-dd HH:mm:ss')
})

const shareRef = ref(null)
// 分享功能
const sharePost = (platform) => {
  const url = window.location.href
  const title = posts.value?.title || ''
  const shareUrls = {
    weibo: `https://service.weibo.com/share/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    wechat: '#', // 微信分享需要特殊处理
    qq: `https://connect.qq.com/widget/shareqq/index.html?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`
  }
  if (platform === 'wechat') {
    alert('请复制链接分享到微信')
    navigator.clipboard.writeText(url)
  } else if (shareUrls[platform]) {
    window.open(shareUrls[platform], '_blank')
  } else {
    const top = shareRef.value.offsetTop - 100
    window.scrollTo({
      top,
      behavior: 'smooth'
    })
  }
}

watch(() => postId.value, (newVal) => {
  if (newVal) getData()
})

// 在 onMounted 中定义全局函数
onMounted(() => {
  window.copyCodeContent = (element) => {
    const wrapper = element.closest('.code-block-wrapper')
    const code = decodeURIComponent(wrapper.dataset.code)
    navigator.clipboard.writeText(code).then(() => {
      element.textContent = '已复制'
      message.success('代码已复制到剪贴板')
      setTimeout(() => {
        element.textContent = '一键复制'
      }, 2000)
    }).catch(() => {
      message.error('复制失败，请手动复制')
    })
  }
})

onUnmounted(() => {
  window.copyCodeContent = null
})
</script>

<template>
  <div class="container">
    <div class="post-detail-page">
      <div v-if="posts" class="main-content">
        <article class="post-content">
          <Loading v-if="loading" />
          <template v-else>
            <!-- 文章头部 -->
            <header class="post-header">
              <div class="post-meta">
                <router-link v-if="posts.category" :to="`/category/${posts.category.category_id}`"
                  class="post-category">
                  {{ posts.category.name }}
                </router-link>
                <span class="post-date">{{ formatDate }}</span>
                <span class="post-read-time">{{ posts.readTime }}</span>
              </div>

              <h1 class="post-title">{{ posts.title }}</h1>

              <div class="post-info">
                <div class="author-info">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                    alt="作者头像" class="author-avatar">
                  <div class="author-details">
                    <span class="author-name">{{ posts.author_name }}</span>
                    <span class="post-stats">1 次阅读</span>
                  </div>
                </div>

                <div class="post-actions">
                  <button @click="sharePost()" class="action-btn">
                    <span>📱</span> 分享
                  </button>
                  <!-- <button class="action-btn">
                    <span>❤️</span> 点赞
                  </button>
                  <button class="action-btn">
                    <span>⭐</span> 收藏
                  </button> -->
                </div>
              </div>
            </header>

            <!-- 文章封面 -->
            <div class="post-image">
              <img :src="posts.cover" :alt="posts.title">
            </div>

            <!-- 文章内容 -->
            <div v-if="posts.content" class="post-body" v-html="renderContent"></div>

            <!-- 文章标签 -->
            <div class="post-tags">
              <span class="tags-label">标签：</span>
              <span v-for="tag in posts.tags" :key="tag" class="tag">
                {{ tag.name }}
              </span>
            </div>

            <!-- 分享按钮 -->
            <div ref="shareRef" class="post-share">
              <h4>分享这篇文章</h4>
              <div class="share-buttons">
                <button @click="sharePost('weibo')" class="share-btn weibo">微博</button>
                <button @click="sharePost('wechat')" class="share-btn wechat">微信</button>
                <button @click="sharePost('qq')" class="share-btn qq">QQ</button>
              </div>
            </div>

            <!-- 相关文章推荐 -->
            <div class="related-posts">
              <h3>相关文章</h3>
              <div class="related-list">
                <div v-if="relatedPost.prev" class="related-item">
                  <router-link :to="`/post/${relatedPost.prev.post_id}`" class="related-link">
                    <img :src="relatedPost.prev.cover" :alt="relatedPost.prev.title" class="related-image">
                    <div class="related-content">
                      <h4>{{ relatedPost.prev.title }}</h4>
                      <p class="related-excerpt">{{ relatedPost.prev.excerpt }}</p>
                      <span class="related-date">{{ dateFormat(relatedPost.prev.created_at, 'yyyy-MM-dd') }}</span>
                    </div>
                    <div class="related-actions">上一篇</div>
                  </router-link>
                </div>
                <div v-if="relatedPost.next" class="related-item">
                  <router-link :to="`/post/${relatedPost.next.post_id}`" class="related-link">
                    <img :src="relatedPost.next.cover" :alt="relatedPost.next.title" class="related-image">
                    <div class="related-content">
                      <h4>{{ relatedPost.next.title }}</h4>
                      <p class="related-excerpt">{{ relatedPost.next.excerpt }}</p>
                      <span class="related-date">{{ dateFormat(relatedPost.next.created_at, 'yyyy-MM-dd') }}</span>
                    </div>
                    <div class="related-actions">下一篇</div>
                  </router-link>
                </div>
                <div v-if="!relatedPost.prev && !relatedPost.next" class="no-related-posts">
                  <p>暂无相关文章</p>
                </div>
              </div>
            </div>
          </template>
        </article>
        <Sidebar>
        </Sidebar>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-detail-page {
  margin: 30px 0;
}

.main-content {
  display: flex;
  gap: 30px;
}

.post-content {
  flex: 2;
  background: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.catalogue {
  background-color: var(--card-background);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 25px;
  margin-bottom: 30px;
  position: sticky;
  top: 100px;
}

.post-header {
  padding: 40px 40px 0;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
  font-size: 0.9em;
}

.post-category {
  background: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  text-decoration: none;
  font-size: 0.8em;
}

.post-date,
.post-read-time {
  color: #666;
}

.post-title {
  font-size: 2.2em;
  color: var(--dark-color);
  line-height: 1.3;
  margin-bottom: 25px;
}

.post-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 25px;
  border-bottom: 1px solid var(--border-color);
}

.author-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.author-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  color: var(--dark-color);
}

.post-stats {
  font-size: 0.8em;
  color: #666;
}

.post-actions {
  display: flex;
  gap: 10px;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  background: var(--card-background);
  color: var(--text-color);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9em;

  &:hover {
    background: var(--light-color);
    border-color: var(--primary-color);
  }
}

.post-image {
  margin: 25px 0;

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
}

.post-body {
  padding: 0 40px;
  line-height: 1.8;
  color: var(--text-color);

  :deep(h2) {
    font-size: 1.5em;
    color: var(--dark-color);
    margin: 30px 0 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--primary-color);
  }

  :deep(h3) {
    font-size: 1.3em;
    color: var(--dark-color);
    margin: 25px 0 12px;
  }

  :deep(p) {
    margin-bottom: 15px;
  }

  :deep(blockquote) {
    background: var(--light-color);
    border-left: 4px solid var(--primary-color);
    padding: 15px 20px;
    margin: 20px 0;
    font-style: italic;
  }

  :deep(ul),
  :deep(ol) {
    margin: 15px 0;
    padding-left: 25px;
  }

  :deep(li) {
    margin-bottom: 8px;
  }

  :deep(pre) {
    background: var(--light-color);
    border: 1px solid var(--border-color);
    // border-radius: 6px;
    padding: 15px;
    overflow-x: auto;
    margin: 20px 0;
  }

  :deep(code) {
    background: var(--light-color);
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }
}

.post-tags {
  padding: 25px 40px;
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.tags-label {
  color: #666;
  font-weight: 600;
}

.tag {
  color: var(--text-color);
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8em;
}

.post-share {
  padding: 25px 40px;
  border-top: 1px solid var(--border-color);

  h4 {
    margin-bottom: 15px;
    color: var(--dark-color);
  }
}

.share-buttons {
  display: flex;
  gap: 10px;
}

.share-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  color: white;

  &.weibo {
    background-color: #e6162d;
  }

  &.wechat {
    background-color: #07c160;
  }

  &.qq {
    background-color: #12b7f5;
  }

  &:hover {
    opacity: 0.8;
    transform: translateY(-1px);
  }
}

.related-posts {
  padding: 30px 40px;
  border-top: 1px solid var(--border-color);

  h3 {
    margin-bottom: 20px;
    color: var(--dark-color);
  }
}

.related-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.related-item {
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: var(--card-background);
  padding: 0 12px;

  .related-excerpt {
    color: var(--text-color);
  }

  .related-date {
    color: var(--text-color);
  }

  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transform: translateY(-3px);
  }
}

.related-link {
  display: flex;
  text-decoration: none;
  color: inherit;
  position: relative;
  height: 100%;

  .related-actions {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 12px;
    background: var(--primary-color);
    color: white;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 500;
  }
}

.related-image {
  width: 120px;
  height: 80px;
  object-fit: cover;
  flex-shrink: 0;
}

.related-content {
  padding: 15px;
  width: calc(100% - 120px);

  h4 {
    font-size: 1em;
    margin-bottom: 8px;
    color: var(--dark-color);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .related-excerpt {
    font-size: 0.85em;
    color: #666;
    margin-bottom: 8px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

.related-date {
  font-size: 0.8em;
  color: #999;
}

.no-related-posts {
  grid-column: 1 / -1;
  text-align: center;
  padding: 40px 0;
  color: #666;
  font-style: italic;
}

/* 响应式优化 */
@media (max-width: 768px) {
  .related-list {
    grid-template-columns: 1fr;
  }

  .related-link {
    flex-direction: column;
  }

  .related-image {
    width: 100%;
    height: 150px;
  }

  .related-content {
    width: 100%;
  }
}


.post-not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.not-found-content {
  text-align: center;
  padding: 40px;

  .not-found-icon {
    font-size: 4em;
    margin-bottom: 20px;
  }

  h2 {
    color: var(--dark-color);
    margin-bottom: 10px;
  }

  p {
    color: #666;
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

@media (max-width: 992px) {
  .main-content {
    flex-direction: column;
  }

  .post-header,
  .post-body,
  .post-tags,
  .post-share,
  .related-posts {
    padding-left: 20px;
    padding-right: 20px;
  }

  .post-title {
    font-size: 1.8em;
  }

  .post-info {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }

  .related-link {
    flex-direction: column;
  }

  .related-image {
    width: 100%;
    height: 150px;
  }
}

// Mac 风格代码块
:deep(.code-block-wrapper) {
  margin: 20px 0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: #1e1e1e;

  &:hover {
    .code-copy {
      opacity: 1;
    }
  }
}

:deep(.code-header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 16px;
  background: #2d2d2d;
  border-bottom: 1px solid #404040;
}

:deep(.code-dots) {
  display: flex;
  gap: 8px;
}

:deep(.dot) {
  width: 12px;
  height: 12px;
  border-radius: 50%;

  &.red {
    background: #ff5f57;
  }

  &.yellow {
    background: #ffbd2e;
  }

  &.green {
    background: #28ca42;
  }
}

:deep(.code-lang) {
  color: #b8c2cf;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

:deep(.code-copy) {
  width: 4rem;
  text-align: right;
  color: #b8c2cf;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  opacity: 0;
  cursor: pointer;
}

:deep(.code-block-wrapper pre) {
  margin: 0;
  padding: 16px;
  background: #1e1e1e;
  overflow-x: auto;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
}

:deep(.code-block-wrapper code) {
  background: transparent;
  padding: 0;
  border-radius: 0;
  color: #e6edf3;
}

// 确保 highlight.js 样式不被覆盖
:deep(.code-block-wrapper code.hljs) {
  background: transparent !important;
  padding: 0;
  border-radius: 0;
  color: #e6edf3;

  // 保留语法高亮的颜色
  .hljs-keyword {
    color: #ff7b72;
  }

  .hljs-string {
    color: #a5d6ff;
  }

  .hljs-comment {
    color: #8b949e;
  }

  .hljs-function {
    color: #d2a8ff;
  }

  .hljs-variable {
    color: #ffa657;
  }
}

// 行内代码
:deep(code:not(.hljs)) {
  background: #f6f8fa;
  color: #d73a49;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'Consolas', monospace;
  font-size: 0.9em;
  border: 1px solid #e1e4e8;
}

// 表格样式
:deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:deep(th),
:deep(td) {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e1e4e8;
}

:deep(th) {
  background: #f6f8fa;
  font-weight: 600;
  color: var(--dark-color);
}

:deep(tr:hover) {
  background: #f6f8fa;
}

// 图片样式
:deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 15px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

// 链接样式
:deep(a) {
  color: var(--primary-color);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;

  &:hover {
    border-bottom-color: var(--primary-color);
  }
}
</style>
