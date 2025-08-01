let messageInstance = null

export const setMessageInstance = (instance) => {
  messageInstance = instance
}

export const message = {
  success(content, duration = 3000) {
    return messageInstance?.addMessage(content, 'success', duration)
  },
  
  error(content, duration = 3000) {
    return messageInstance?.addMessage(content, 'error', duration)
  },
  
  warning(content, duration = 3000) {
    return messageInstance?.addMessage(content, 'warning', duration)
  },
  
  info(content, duration = 3000) {
    return messageInstance?.addMessage(content, 'info', duration)
  },
  
  remove(id) {
    return messageInstance?.removeMessage(id)
  }
}

// 全局属性注册
export default {
  install(app) {
    app.config.globalProperties.$message = message
  }
}