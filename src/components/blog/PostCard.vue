<script setup>
import { dateFormat } from '@/utils'
import { computed } from 'vue';

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = computed(() => {
  return dateFormat(props.post.created_at, 'yyyy-MM-dd HH:mm:ss')
})
</script>

<template>
  <article class="post-card">
    <router-link :to="`/post/${post.post_id}`" class="post-image-link">
      <img :src="post.cover" :alt="post.title" class="post-image">
    </router-link>    
    <div class="post-content">
      <h2 class="post-title">
        <router-link :to="`/post/${post.post_id}`">{{ post.title }}</router-link>
      </h2>
      <div class="post-meta">
        <span><i>📅</i> {{ formatDate }}</span>
        <span>
          <i>🏷️</i> 
          <template v-for="(tag, index) in post.tags" :key="tag">
            <router-link :to="`/tag/${tag.tag_id}`">{{ tag.name }}</router-link>
            <span v-if="index < post.tags.length - 1">, </span>
          </template>
        </span>
        <!-- <span><i>👁️</i> {{ post.views.toLocaleString() }}</span> -->
      </div>
      <p class="post-excerpt">{{ decodeURIComponent(post.excerpt) }}</p>
      <router-link :to="`/post/${post.post_id}`" class="read-more">阅读更多 →</router-link>
    </div>
  </article>
</template>

<style lang="scss" scoped>
.post-card {
  background-color: var(--card-background);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  overflow: hidden;
  transition: all 0.3s;
  margin-bottom: 20px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  }
}

.post-image-link {
  display: block;
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.05);
  }
}

.post-content {
  padding: 25px;
}

.post-title {
  margin-bottom: 15px;
  
  a {
    color: var(--dark-color);
    text-decoration: none;
    font-size: 1.3em;
    font-weight: 600;
    line-height: 1.4;
    
    &:hover {
      color: var(--primary-color);
    }
  }
}

.post-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 15px;
  font-size: 0.9em;
  color: #666;
  
  span {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.post-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
}

.post-card {
  .post-meta,
  .post-excerpt {
    color: var(--text-color);
  }
}

.read-more {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s;
  
  &:hover {
    color: var(--secondary-color);
  }
}

@media (max-width: 768px) {
  .post-content {
    padding: 20px;
  }
  
  .post-meta {
    flex-direction: column;
    gap: 8px;
  }
}
</style>
