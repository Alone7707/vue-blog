<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  // 模拟提交
  setTimeout(() => {
    alert('消息已发送！感谢您的联系。')
    form.value = { name: '', email: '', subject: '', message: '' }
    isSubmitting.value = false
  }, 1000)
}

const contactMethods = [
  {
    icon: '📧',
    title: '邮箱',
    value: 'zhang.explore@example.com',
    description: '工作日24小时内回复'
  },
  {
    icon: '💬',
    title: '微信',
    value: 'zhang_explore',
    description: '扫码添加好友'
  },
  {
    icon: '🐙',
    title: 'GitHub',
    value: 'github.com/zhangexplore',
    description: '查看我的开源项目'
  },
  {
    icon: '📱',
    title: '微博',
    value: '@张探索',
    description: '关注我的日常动态'
  }
]

const faqs = [
  {
    question: '可以转载您的文章吗？',
    answer: '欢迎转载，请注明出处和作者信息即可。如果是商业用途，请提前联系我。'
  },
  {
    question: '是否接受技术咨询？',
    answer: '很乐意帮助解决技术问题，可以通过邮箱或微信联系我，简单问题免费解答。'
  },
  {
    question: '可以约稿吗？',
    answer: '欢迎约稿合作，请通过邮箱详细说明需求和合作方式。'
  },
  {
    question: '如何订阅您的博客？',
    answer: '目前可以通过RSS订阅，也可以关注我的社交媒体账号获取更新通知。'
  }
]
</script>

<template>
  <div class="container">
    <div class="contact-page">
      <div class="page-header">
        <h1>联系我</h1>
        <p>很高兴与您交流，期待听到您的声音</p>
      </div>

      <div class="contact-content">
        <div class="contact-form-section">
          <div class="form-container">
            <h2>发送消息</h2>
            <form @submit.prevent="submitForm" class="contact-form">
              <div class="form-row">
                <div class="form-group">
                  <label for="name">姓名 *</label>
                  <input 
                    type="text" 
                    id="name" 
                    v-model="form.name" 
                    required 
                    placeholder="请输入您的姓名"
                  >
                </div>
                <div class="form-group">
                  <label for="email">邮箱 *</label>
                  <input 
                    type="email" 
                    id="email" 
                    v-model="form.email" 
                    required 
                    placeholder="请输入您的邮箱"
                  >
                </div>
              </div>
              
              <div class="form-group">
                <label for="subject">主题 *</label>
                <input 
                  type="text" 
                  id="subject" 
                  v-model="form.subject" 
                  required 
                  placeholder="请输入消息主题"
                >
              </div>
              
              <div class="form-group">
                <label for="message">消息内容 *</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  required 
                  rows="6" 
                  placeholder="请输入您想说的话..."
                ></textarea>
              </div>
              
              <button type="submit" class="submit-btn" :disabled="isSubmitting">
                {{ isSubmitting ? '发送中...' : '发送消息' }}
              </button>
            </form>
          </div>
        </div>

        <div class="contact-info-section">
          <div class="contact-methods">
            <h2>联系方式</h2>
            <div class="methods-grid">
              <div v-for="method in contactMethods" :key="method.title" class="method-card">
                <div class="method-icon">{{ method.icon }}</div>
                <div class="method-content">
                  <h3 class="method-title">{{ method.title }}</h3>
                  <div class="method-value">{{ method.value }}</div>
                  <div class="method-description">{{ method.description }}</div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="faq-section">
            <h2>常见问题</h2>
            <div class="faq-list">
              <div v-for="faq in faqs" :key="faq.question" class="faq-item">
                <h3 class="faq-question">{{ faq.question }}</h3>
                <p class="faq-answer">{{ faq.answer }}</p>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-page {
  margin: 30px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;

  h1 {
    font-size: 2.5em;
    color: var(--dark-color);
    margin-bottom: 10px;
  }

  p {
    font-size: 1.1em;
    color: #666;
  }
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.form-container {
  background-color: white;
  padding: 40px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);

  h2 {
    color: var(--dark-color);
    margin-bottom: 30px;
    font-size: 1.8em;
  }
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 8px;
    font-weight: 500;
    color: var(--dark-color);
  }

  input,
  textarea {
    padding: 12px 16px;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 1em;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: var(--primary-color);
    }

    &::placeholder {
      color: #999;
    }
  }

  textarea {
    resize: vertical;
    min-height: 120px;
  }
}

.submit-btn {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 1.1em;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.contact-info-section {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.contact-methods,
.faq-section {
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);

  h2 {
    color: var(--dark-color);
    padding: 14px;
    margin-bottom: 25px;
    font-size: 1.5em;
  }
}

.methods-grid {
  display: grid;
  gap: 20px;
}

.method-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 12px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  transition: border-color 0.3s, transform 0.3s;

  &:hover {
    border-color: var(--primary-color);
    transform: translateY(-2px);
  }
}

.method-icon {
  font-size: 2em;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
  border-radius: 50%;
}

.method-content {
  flex: 1;
}

.method-title {
  font-size: 1.1em;
  color: var(--dark-color);
  margin-bottom: 5px;
}

.method-value {
  color: var(--primary-color);
  font-weight: 500;
  margin-bottom: 3px;
}

.method-description {
  font-size: 0.9em;
  color: #666;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 14px;
}

.faq-item {
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
}

.faq-question {
  color: var(--dark-color);
  font-size: 1.1em;
  margin-bottom: 10px;
}

.faq-answer {
  color: #555;
  line-height: 1.6;
}

/* 夜间模式样式 */
.dark-mode .form-container {
  background-color: #3f3f3f;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.dark-mode .page-header p {
  color: var(--text-color);
}

.dark-mode .form-group label {
  color: var(--dark-color);
}

.dark-mode .form-group input,
.dark-mode .form-group textarea {
  background-color: #34495e;
  border: 2px solid var(--border-color);
  color: var(--text-color);

  &::placeholder {
    color: #aaa;
  }
}

.dark-mode .contact-methods,
.dark-mode .faq-section {
  background-color: #3f3f3f;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.dark-mode .contact-methods h2,
.dark-mode .faq-section h2 {
  color: var(--dark-color);
}

.dark-mode .method-card {
  border: 1px solid var(--border-color);

  &:hover {
    border-color: var(--primary-color);
  }
}

.dark-mode .method-icon {
  background-color: #34495e;
}

.dark-mode .method-title {
  color: var(--dark-color);
}

.dark-mode .method-value {
  color: var(--primary-color);
}

.dark-mode .method-description {
  color: var(--text-color);
}

.dark-mode .faq-question {
  color: var(--dark-color);
}

.dark-mode .faq-answer {
  color: var(--text-color);
}

@media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .form-container {
    padding: 30px 20px;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-methods,
  .faq-section {
    padding: 25px 20px;
  }
}

@media (max-width: 576px) {
  .page-header h1 {
    font-size: 2em;
  }

  .method-card {
    flex-direction: column;
    text-align: center;
    gap: 10px;
  }
}
</style>