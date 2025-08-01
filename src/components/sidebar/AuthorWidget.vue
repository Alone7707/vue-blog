<script setup>
import { useStore } from '@/store';
import Card from '@/components/common/Card.vue'

const store = useStore()
const author = {
  name: store.blogInfo.author,
  tag: store.blogInfo.tag,
  bio: store.blogInfo.introduce,
  avatar: store.blogInfo.avatar
}
</script>

<template>
  <Card title="关于作者">
    <div class="author-info">
      <img :src="author.avatar" :alt="author.name" class="author-avatar">
      <div class="author-details">
        <h4 class="author-name">{{ author.name }}</h4>
        <p class="author-bio">{{ author.tag }}</p>
        <p>{{ author.bio }}</p>
      </div>
    </div>
  </Card>
</template>

<style lang="scss" scoped>
.author-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.author-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
}

.author-name {
  font-size: 1.1em;
  margin-bottom: 5px;
  color: var(--dark-color);
}

.author-bio {
  color: var(--primary-color);
  font-size: 0.9em;
  margin-bottom: 10px;
}

.author-details p:last-child {
  font-size: 0.9em;
  line-height: 1.5;
  color: #666;
}

/* 夜间模式样式 */
.dark-mode .author-details p:last-child {
  color: #aaa;
}

.dark-mode .author-name {
  color: var(--dark-color);
}

.dark-mode .author-bio {
  color: var(--primary-color);
}
</style>