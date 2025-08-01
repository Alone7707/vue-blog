<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: {
    type: Number,
    default: 1
  },
  pageSize: {
    type: Number,
    default: 10
  },
  total: {
    type: Number,
    required: true
  },
  maxVisible: {
    type: Number,
    default: 5
  }
})

const emit = defineEmits(['page-change'])

// 计算总页数
const totalPages = computed(() => Math.ceil(props.total / props.pageSize))

// 计算可见页码
const visiblePages = computed(() => {
  const { currentPage, maxVisible } = props
  const total = totalPages.value

  if (total <= maxVisible) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const half = Math.floor(maxVisible / 2)
  let start = Math.max(1, currentPage - half)
  let end = Math.min(total, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  // 避免与首尾页重复
  if (start <= 2) start = 3
  if (end >= total - 1) end = total - 2

  const pages = []
  for (let i = start; i <= end; i++) {
    if (i > 1 && i < total) {
      pages.push(i)
    }
  }

  return pages
})

// 是否显示第一页
const showFirstPage = computed(() => {
  return totalPages.value > 1 && !visiblePages.value.includes(1)
})

// 是否显示最后一页
const showLastPage = computed(() => {
  return totalPages.value > 1 && !visiblePages.value.includes(totalPages.value)
})

// 是否显示左侧省略号
const showLeftEllipsis = computed(() => {
  return visiblePages.value.length > 0 && visiblePages.value[0] > 2
})

// 是否显示右侧省略号
const showRightEllipsis = computed(() => {
  const pages = visiblePages.value
  return pages.length > 0 && pages[pages.length - 1] < totalPages.value - 1
})

// 切换页码
const changePage = (page) => {
  if (page !== props.currentPage && page >= 1 && page <= totalPages.value) {
    emit('page-change', page)
  }
}
</script>

<template>
  <div v-if="totalPages > 1" class="pagination">
    <!-- 上一页 -->
    <button v-if="currentPage > 1" @click="changePage(currentPage - 1)" class="page-btn">
      ← 上一页
    </button>

    <!-- 第一页 -->
    <button v-if="showFirstPage" @click="changePage(1)" :class="['page-btn', { active: currentPage === 1 }]">
      1
    </button>

    <!-- 左侧省略号 -->
    <span v-if="showLeftEllipsis" class="ellipsis">...</span>

    <!-- 页码按钮 -->
    <button v-for="page in visiblePages" :key="page" @click="changePage(page)"
      :class="['page-btn', { active: currentPage === page }]">
      {{ page }}
    </button>

    <!-- 右侧省略号 -->
    <span v-if="showRightEllipsis" class="ellipsis">...</span>

    <!-- 最后一页 -->
    <button v-if="showLastPage" @click="changePage(totalPages)"
      :class="['page-btn', { active: currentPage === totalPages }]">
      {{ totalPages }}
    </button>

    <!-- 下一页 -->
    <button v-if="currentPage < totalPages" @click="changePage(currentPage + 1)" class="page-btn">
      下一页 →
    </button>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-top: 30px;
  flex-wrap: wrap;
}

.page-btn {
  padding: 8px 12px;
  min-width: 36px;
  background-color: white;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--dark-text-color);
  cursor: pointer;
  transition: all 0.3s;
  font-size: 14px;

  &:hover {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }

  &.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

.ellipsis {
  padding: 8px 4px;
  color: var(--text-color);
  font-size: 14px;
}

@media (max-width: 768px) {
  .pagination {
    gap: 4px;
  }

  .page-btn {
    padding: 6px 8px;
    min-width: 32px;
    font-size: 12px;
  }
}
</style>