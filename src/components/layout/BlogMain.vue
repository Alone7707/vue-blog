<script setup>
import PostCard from '../blog/PostCard.vue'
import Sidebar from '../sidebar/Sidebar.vue'

const posts = [
  {
    id: 1,
    title: '人工智能时代的个人成长',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    date: '2025年7月15日',
    tags: ['人工智能', '个人成长'],
    views: 1245,
    excerpt: '在这篇文章中，我探讨了在AI技术飞速发展的今天，个人如何保持竞争力并实现持续成长。从学习策略到心态调整，分享我的实践心得...'
  },
  {
    id: 2,
    title: '城市漫步：发现身边的美丽',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df',
    date: '2025年6月28日',
    tags: ['城市探索', '生活随笔'],
    views: 892,
    excerpt: '记录我在城市中的漫步经历，那些被忽略的角落和意外的发现。有时候，最美的风景就在我们身边，只是需要放慢脚步去发现...'
  },
  {
    id: 3,
    title: '数字极简主义实践',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3',
    date: '2025年6月10日',
    tags: ['数字生活', '效率'],
    views: 1532,
    excerpt: '分享我尝试数字极简主义三个月来的体验，如何减少数字干扰，找回专注力和生活品质。从通知管理到应用筛选，详细记录我的实践过程...'
  }
]
</script>

<template>
  <div class="container">
    <div class="main-content">
      <div class="content-area">
        <PostCard 
          v-for="post in posts" 
          :key="post.id" 
          :post="post" 
        />
        
        <div class="pagination">
          <a href="#" class="page-link active">1</a>
          <a href="#" class="page-link">2</a>
          <a href="#" class="page-link">3</a>
          <a href="#" class="page-link">下一页 →</a>
        </div>
      </div>
      
      <Sidebar />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-content {
  display: flex;
  margin: 30px 0;
  gap: 30px;
}

.content-area {
  flex: 2;
}

.pagination {
  display: flex;
  gap: 10px;
  margin-top: 30px;
}

.page-link {
  padding: 8px 16px;
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  text-decoration: none;
  color: var(--text-color);
  transition: all 0.3s;

  &:hover,
  &.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
}

@media (max-width: 992px) {
  .main-content {
    flex-direction: column;
  }
}
</style>
