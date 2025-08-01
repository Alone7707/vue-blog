<script setup>
import PostCard from '@/components/blog/PostCard.vue'
import Sidebar from '@/components/sidebar/Sidebar.vue'
import Loading from '@/components/common/Loading.vue'
import Pagination from '@/components/common/Pagination.vue'
import { postList } from '@/api'
import { ref } from 'vue'

const postsParams = {
  pageNum: 1, // 默认从第一页开始
  pageSize: 5 // 每页显示5篇文章
}

const posts = {
  list: [],
  total: 0
}

const loading = ref(true)

const getData = (page) => {
  postsParams.pageNum = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
  loading.value = true
  postList(postsParams).then((res) => {
    const { data, code } = res
    if (code === 200) {
      posts.list = data.list
      posts.total = data.total
      // 滚动到顶部
    }
  }).catch((err) => {
    console.error('获取数据失败:', err)
  }).finally(() => {
    loading.value = false
  })
}

getData(1);
</script>

<template>
  <div class="container">
    <div class="main-content">
      <div class="content-area">
        <Loading v-if="loading" />
        <template v-else>
          <PostCard v-for="post in posts.list" :key="post.id" :post="post" />
        </template>

        <!-- <div class="pagination">
          <a href="#" class="page-link active">1</a>
          <a href="#" class="page-link">2</a>
          <a href="#" class="page-link">3</a>
          <a href="#" class="page-link">下一页 →</a>
        </div> -->
        <Pagination :total="posts.total" :pageSize="postsParams.pageSize" :currentPage="postsParams.pageNum"
          @page-change="getData" />
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
