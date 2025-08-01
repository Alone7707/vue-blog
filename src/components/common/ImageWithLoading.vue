<template>
  <div class="image-container">
    <img 
      :src="src" 
      :alt="alt" 
      :class="classes" 
      @load="onImageLoad" 
      @error="onImageError" 
      v-bind="$attrs"
    >
    <div v-show="!imageLoaded" class="image-placeholder" :style="{ backgroundColor: placeholderColor }">
      <div class="loading-spinner"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 定义组件的props
const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  },
  classes: {
    type: [String, Object, Array],
    default: ''
  },
  placeholderColor: {
    type: String,
    default: 'var(--light-color)'
  },
  width: {
    type: [String, Number],
    default: '100%'
  },
  height: {
    type: [String, Number],
    default: 'auto'
  }
});

// 定义组件的emits
const emit = defineEmits(['load', 'error']);

// 定义响应式数据
const imageLoaded = ref(false);

// 图片加载完成的处理函数
const onImageLoad = (event) => {
  imageLoaded.value = true;
  // 传递原生事件
  emit('load', event);
};

// 图片加载失败的处理函数
const onImageError = (event) => {
  imageLoaded.value = true; // 即使加载失败也隐藏加载动画
  // 传递原生事件
  emit('error', event);
};
</script>

<style lang="scss" scoped>
.image-container {
  position: relative;
  overflow: hidden;
  width: v-bind(width);
  height: v-bind(height);
  
  &:hover img {
    transform: scale(1.05);
  }
}

.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  transition: transform 0.3s;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.loading-spinner {
  width: 30px;
  height: 30px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid var(--primary-color);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>