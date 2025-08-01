<script setup>
import AuthorWidget from './AuthorWidget.vue'
import CategoryWidget from './CategoryWidget.vue'
import TagCloudWidget from './TagCloudWidget.vue'
</script>

<template>
  <div class="sidebar">
    <slot name="catalogue"></slot>
    <AuthorWidget />
    <CategoryWidget />
    <TagCloudWidget />
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
}

@media (max-width: 992px) {
  .sidebar {
    margin-top: 30px;
  }
}
</style>