<template>
  <teleport to="body">
    <div class="message-container">
      <transition-group name="message" tag="div">
        <div
          v-for="message in messages"
          :key="message.id"
          :class="['message', `message-${message.type}`]"
        >
          <div class="message-icon">
            <span v-if="message.type === 'success'">✓</span>
            <span v-else-if="message.type === 'error'">✕</span>
            <span v-else-if="message.type === 'warning'">⚠</span>
            <span v-else>ℹ</span>
          </div>
          <div class="message-content">{{ message.content }}</div>
          <div class="message-close" @click="removeMessage(message.id)">×</div>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'

const messages = ref([])

const addMessage = (content, type = 'info', duration = 3000) => {
  const id = Date.now() + Math.random()
  const message = { id, content, type }
  
  messages.value.push(message)
  
  if (duration > 0) {
    setTimeout(() => {
      removeMessage(id)
    }, duration)
  }
  
  return id
}

const removeMessage = (id) => {
  const index = messages.value.findIndex(msg => msg.id === id)
  if (index > -1) {
    messages.value.splice(index, 1)
  }
}

defineExpose({
  addMessage,
  removeMessage
})
</script>

<style lang="scss" scoped>
.message-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  pointer-events: none;
}

.message {
  display: flex;
  align-items: center;
  min-width: 300px;
  max-width: 400px;
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
  pointer-events: auto;
  font-size: 14px;
  
  &-success {
    background: rgba(34, 197, 94, 0.9);
    color: white;
    border-left: 4px solid #16a34a;
  }
  
  &-error {
    background: rgba(239, 68, 68, 0.9);
    color: white;
    border-left: 4px solid #dc2626;
  }
  
  &-warning {
    background: rgba(245, 158, 11, 0.9);
    color: white;
    border-left: 4px solid #d97706;
  }
  
  &-info {
    background: rgba(59, 130, 246, 0.9);
    color: white;
    border-left: 4px solid #2563eb;
  }
}

.message-icon {
  margin-right: 12px;
  font-weight: bold;
  font-size: 16px;
}

.message-content {
  flex: 1;
  line-height: 1.4;
}

.message-close {
  margin-left: 12px;
  cursor: pointer;
  font-size: 18px;
  opacity: 0.7;
  transition: opacity 0.3s;
  
  &:hover {
    opacity: 1;
  }
}

.message-enter-active,
.message-leave-active {
  transition: all 0.3s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.message-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.message-move {
  transition: transform 0.3s ease;
}
</style>