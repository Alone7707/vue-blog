<template>
  <div class="custom-scrollbar" ref="scrollContainer">
    <div class="scroll-content" ref="scrollContent">
      <slot />
    </div>
    <div 
      v-show="showScrollbar" 
      class="scrollbar-track"
      @mousedown="onTrackClick"
    >
      <div 
        class="scrollbar-thumb"
        :style="thumbStyle"
        @mousedown="onThumbMouseDown"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const scrollContainer = ref()
const scrollContent = ref()
const showScrollbar = ref(false)
const scrollTop = ref(0)
const scrollHeight = ref(0)
const clientHeight = ref(0)
const isDragging = ref(false)

const thumbStyle = computed(() => {
  const thumbHeight = Math.max((clientHeight.value / scrollHeight.value) * clientHeight.value, 30)
  const thumbTop = (scrollTop.value / (scrollHeight.value - clientHeight.value)) * (clientHeight.value - thumbHeight)
  
  return {
    height: `${thumbHeight}px`,
    transform: `translateY(${thumbTop}px)`
  }
})

const updateScrollbar = () => {
  if (!scrollContent.value) return
  
  scrollTop.value = scrollContent.value.scrollTop
  scrollHeight.value = scrollContent.value.scrollHeight
  clientHeight.value = scrollContent.value.clientHeight
  showScrollbar.value = scrollHeight.value > clientHeight.value
}

const onScroll = () => {
  updateScrollbar()
}

const onThumbMouseDown = (e) => {
  isDragging.value = true
  const startY = e.clientY
  const startScrollTop = scrollTop.value
  
  const onMouseMove = (e) => {
    if (!isDragging.value) return
    
    const deltaY = e.clientY - startY
    const scrollRatio = deltaY / (clientHeight.value - thumbStyle.value.height)
    const newScrollTop = startScrollTop + scrollRatio * (scrollHeight.value - clientHeight.value)
    
    scrollContent.value.scrollTop = Math.max(0, Math.min(newScrollTop, scrollHeight.value - clientHeight.value))
  }
  
  const onMouseUp = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }
  
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

onMounted(() => {
  if (scrollContent.value) {
    scrollContent.value.addEventListener('scroll', onScroll)
    updateScrollbar()
  }
})

onUnmounted(() => {
  if (scrollContent.value) {
    scrollContent.value.removeEventListener('scroll', onScroll)
  }
})
</script>

<style lang="scss" scoped>
.custom-scrollbar {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.scroll-content {
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
  
  &::-webkit-scrollbar {
    display: none;
  }
}

.scrollbar-track {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 100%;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  .custom-scrollbar:hover & {
    opacity: 1;
  }
}

.scrollbar-thumb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
  
  &:active {
    background: rgba(0, 0, 0, 0.7);
  }
}
</style>