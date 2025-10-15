<script setup>
import { onMounted, ref } from 'vue'
import { useCategoryStore } from '@/store/category';
import Card from '@/components/common/Card.vue'

const categoryStore = useCategoryStore()
const categories = ref([])
onMounted(async () => {
  categories.value = await categoryStore.getAllCategory
})
</script>

<template>
  <Card title="文章分类">
    <ul class="category-list">
      <li v-for="category in categories" :key="category.name" class="category-item">
        <router-link :to="`/category/${category.category_id}`" class="category-link">
          <span>{{ category.name }}</span>
          <span class="category-count">{{ category.count }}</span>
        </router-link>
      </li>
    </ul>
  </Card>
</template>

<style lang="scss" scoped>
.category-list {
  list-style: none;
}

.category-item {
  margin-bottom: 10px;
}

.category-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: var(--primary-color);
  }
}

.category-count {
  background-color: var(--light-color);
  color: #666;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8em;
}

/* 夜间模式样式 */
.dark-mode .category-count {
  background-color: var(--light-color);
  color: var(--text-color);
}

.dark-mode .category-link {
  color: var(--text-color);
}

.dark-mode .category-link:hover {
  color: var(--primary-color);
}
</style>
