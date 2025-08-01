<script setup>
const archives = [
  {
    year: '2024',
    months: [
      {
        month: '1月',
        posts: [
          { title: '探索人工智能的边界：从机器学习到深度思考', date: '2024-01-15', category: '技术思考' },
          { title: '城市漫步：发现身边的美丽', date: '2024-01-12', category: '生活随笔' },
          { title: 'Vue.js 3.0 实践心得', date: '2024-01-10', category: '技术思考' },
          { title: '咖啡馆里的思考时光', date: '2024-01-08', category: '生活随笔' },
          { title: '前端工程化的思考', date: '2024-01-05', category: '技术思考' },
          { title: '周末的慢生活', date: '2024-01-03', category: '生活随笔' },
          { title: '古镇里的时光', date: '2024-01-01', category: '旅行见闻' }
        ]
      }
    ]
  },
  {
    year: '2023',
    months: [
      {
        month: '12月',
        posts: [
          { title: '年终总结：技术成长与生活感悟', date: '2023-12-30', category: '生活随笔' },
          { title: 'React vs Vue：框架选择的思考', date: '2023-12-25', category: '技术思考' },
          { title: '冬日里的温暖时光', date: '2023-12-20', category: '生活随笔' },
          { title: '《深度工作》读后感', date: '2023-12-15', category: '读书笔记' }
        ]
      },
      {
        month: '11月',
        posts: [
          { title: '秋天的色彩', date: '2023-11-28', category: '旅行见闻' },
          { title: 'JavaScript 异步编程最佳实践', date: '2023-11-20', category: '技术思考' },
          { title: '《原则》中的人生智慧', date: '2023-11-15', category: '读书笔记' }
        ]
      }
    ]
  }
]

const totalPosts = archives.reduce((total, year) => {
  return total + year.months.reduce((yearTotal, month) => {
    return yearTotal + month.posts.length
  }, 0)
}, 0)
</script>

<template>
  <div class="container">
    <div class="archive-page">
      <div class="page-header">
        <h1>文章归档</h1>
        <p>按时间浏览所有文章，共 {{ totalPosts }} 篇</p>
      </div>

      <div class="archive-stats">
        <div class="stat-item">
          <div class="stat-number">{{ totalPosts }}</div>
          <div class="stat-label">总文章数</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ archives.length }}</div>
          <div class="stat-label">年份</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">{{ archives.reduce((total, year) => total + year.months.length, 0) }}</div>
          <div class="stat-label">月份</div>
        </div>
      </div>

      <div class="archive-timeline">
        <div v-for="yearData in archives" :key="yearData.year" class="year-section">
          <div class="year-header">
            <h2 class="year-title">{{ yearData.year }}</h2>
            <div class="year-count">
              {{ yearData.months.reduce((total, month) => total + month.posts.length, 0) }} 篇文章
            </div>
          </div>

          <div class="months-container">
            <div v-for="monthData in yearData.months" :key="monthData.month" class="month-section">
              <div class="month-header">
                <h3 class="month-title">{{ monthData.month }}</h3>
                <div class="month-count">{{ monthData.posts.length }} 篇</div>
              </div>

              <div class="posts-list">
                <div v-for="post in monthData.posts" :key="post.title" class="post-item">
                  <div class="post-date">{{ post.date.split('-')[2] }}</div>
                  <div class="post-content">
                    <a href="#" class="post-title">{{ post.title }}</a>
                    <span class="post-category">{{ post.category }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.archive-page {
  margin: 30px 0;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;

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

.archive-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 50px;
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2.5em;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-size: 0.9em;
}

.archive-timeline {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  overflow: hidden;
}

.year-section {
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }
}

.year-header {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 25px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.year-title {
  font-size: 1.8em;
  margin: 0;
}

.year-count {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 5px 15px;
  border-radius: 15px;
  font-size: 0.9em;
}

.months-container {
  padding: 0;
}

.month-section {
  border-bottom: 1px solid #f8f8f8;

  &:last-child {
    border-bottom: none;
  }
}

.month-header {
  background-color: #f8f9fa;
  padding: 20px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
}

.month-title {
  font-size: 1.3em;
  color: var(--dark-color);
  margin: 0;
}

.month-count {
  color: #666;
  font-size: 0.9em;
}

.posts-list {
  padding: 0 30px;
}

.post-item {
  display: flex;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f8f9fa;
    margin: 0 -30px;
    padding-left: 30px;
    padding-right: 30px;
  }
}

.post-date {
  width: 40px;
  height: 40px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.9em;
  margin-right: 20px;
  flex-shrink: 0;
}

.post-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-title {
  color: var(--text-color);
  text-decoration: none;
  font-size: 1.05em;
  transition: color 0.3s;

  &:hover {
    color: var(--primary-color);
  }
}

.post-category {
  background-color: var(--light-color);
  color: #666;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8em;
  margin-left: 15px;
}

/* 夜间模式样式 */
.dark-mode .archive-stats {
  background-color: #3f3f3f;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.dark-mode .stat-label {
  color: #aaa;
}

.dark-mode .archive-timeline {
  background-color: #3f3f3f;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.dark-mode .year-section {
  border-bottom: 1px solid var(--border-color);
}

.dark-mode .month-section {
  border-bottom: 1px solid var(--border-color);
}

.dark-mode .month-header {
  background-color: #34495e;
  border-bottom: 1px solid var(--border-color);
}

.dark-mode .month-title {
  color: var(--dark-color);
}

.dark-mode .month-count {
  color: var(--text-color);
}

.dark-mode .post-item {
  border-bottom: 1px solid var(--border-color);

  &:hover {
    background-color: #34495e;
  }
}

.dark-mode .post-content {
  color: var(--text-color);
}

.dark-mode .post-category {
  background-color: var(--light-color);
  color: var(--text-color);
}

@media (max-width: 768px) {
  .archive-stats {
    flex-direction: column;
    gap: 20px;
    padding: 20px;
  }

  .year-header,
  .month-header,
  .posts-list {
    padding-left: 20px;
    padding-right: 20px;
  }

  .year-header {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  .month-header {
    flex-direction: column;
    gap: 5px;
    text-align: center;
  }

  .post-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;

    &:hover {
      margin: 0 -20px;
      padding-left: 20px;
      padding-right: 20px;
    }
  }

  .post-content {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .post-category {
    margin-left: 0;
  }
}
</style>