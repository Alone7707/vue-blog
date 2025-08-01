<script setup>
import { useStore } from '@/store'
const store = useStore()
const skills = [
  { name: 'JavaScript', level: 90 },
  { name: 'Vue.js', level: 85 },
  { name: 'Node.js', level: 80 },
  { name: '写作', level: 75 },
  { name: '摄影', level: 70 }
]

const timeline = [
  { year: '2024', event: '开始写作技术博客，分享学习心得' },
  { year: '2023', event: '转向全栈开发，深入学习前后端技术' },
  { year: '2022', event: '开始接触Vue.js，被其简洁优雅所吸引' },
  { year: '2021', event: '正式踏入软件开发行业' }
]

const aboutMe = {
  name: store.blogInfo.name,
  avatar: store.blogInfo.avatar,
  tag: store.blogInfo.tag,
  bio: store.blogInfo.introduce,
  mail: store.blogInfo.mail,
  github: store.blogInfo.github,
  wechat: store.blogInfo.wechat
}
</script>

<template>
  <div class="container">
    <div class="about-page">
      <div class="hero-section">
        <div class="hero-content">
          <img :src="aboutMe.avatar" :alt="aboutMe.name" class="hero-avatar">
          <div class="hero-text">
            <h1>关于我</h1>
            <p class="hero-subtitle">{{ aboutMe.tag }}</p>
            <p class="hero-description">{{ aboutMe.bio }}</p>
          </div>
        </div>
      </div>

      <div class="content-section">
        <div class="section">
          <h2>我的故事</h2>
          <p>
            从小就对计算机充满兴趣，大学学习计算机科学，毕业后投身软件开发行业。
            在工作中不断学习新技术，在生活中用心观察世界。我喜欢用代码解决问题，
            也喜欢用文字记录思考，用镜头捕捉美好。
          </p>
          <p>
            这个博客是我分享技术心得、生活感悟的地方。希望通过我的文字，
            能够给读者带来一些启发和思考。
          </p>
        </div>

        <div class="section">
          <h2>技能专长</h2>
          <div class="skills-grid">
            <div v-for="skill in skills" :key="skill.name" class="skill-item">
              <div class="skill-name">{{ skill.name }}</div>
              <div class="skill-bar">
                <div class="skill-progress" :style="{ width: skill.level + '%' }"></div>
              </div>
              <div class="skill-level">{{ skill.level }}%</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>成长轨迹</h2>
          <div class="timeline">
            <div v-for="item in timeline" :key="item.year" class="timeline-item">
              <div class="timeline-year">{{ item.year }}</div>
              <div class="timeline-content">{{ item.event }}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <h2>联系方式</h2>
          <div class="contact-info">
            <div class="contact-item">
              <span class="contact-label">邮箱：</span>
              <span>{{ aboutMe.mail }}</span>
            </div>
            <div class="contact-item">
              <span class="contact-label">GitHub：</span>
              <a :href="aboutMe.github" target="_blank">{{ aboutMe.github }}</a>
            </div>
            <div class="contact-item">
              <span class="contact-label">微信：</span>
              <span>{{ aboutMe.wechat }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-page {
  margin: 30px 0;
}

.hero-section {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 12px;
  padding: 60px 40px;
  margin-bottom: 40px;
  color: white;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 40px;
}

.hero-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255, 255, 255, 0.3);
}

.hero-text {
  flex: 1;

  h1 {
    font-size: 2.5em;
    margin-bottom: 10px;
  }
}

.hero-subtitle {
  font-size: 1.2em;
  margin-bottom: 20px;
  opacity: 0.9;
}

.hero-description {
  font-size: 1.1em;
  line-height: 1.6;
  opacity: 0.95;
}

.content-section {
  background-color: var(--card-background);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.section {
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }

  h2 {
    font-size: 1.8em;
    margin-bottom: 20px;
    color: var(--dark-color);
    border-bottom: 2px solid var(--primary-color);
    padding-bottom: 10px;
  }

  p {
    line-height: 1.8;
    margin-bottom: 15px;
    color: var(--text-color);
  }
}

.skills-grid {
  display: grid;
  gap: 20px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.skill-name {
  width: 100px;
  font-weight: 500;
}

.skill-bar {
  flex: 1;
  height: 8px;
  background-color: var(--light-color);
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  transition: width 0.8s ease;
}

.skill-level {
  width: 50px;
  text-align: right;
  font-size: 0.9em;
  color: var(--text-color);
}

.timeline {
  position: relative;
  padding-left: 30px;

  &::before {
    content: '';
    position: absolute;
    left: 15px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: var(--primary-color);
  }
}

.timeline-item {
  position: relative;
  margin-bottom: 25px;

  &::before {
    content: '';
    position: absolute;
    left: -37px;
    top: 5px;
    width: 12px;
    height: 12px;
    background-color: var(--primary-color);
    border-radius: 50%;
    border: 3px solid white;
    box-shadow: 0 0 0 2px var(--primary-color);
  }
}

.timeline-year {
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.timeline-content {
  color: var(--text-color);
  line-height: 1.6;
}

.contact-info {
  display: grid;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  a {
    color: var(--primary-color);
    text-decoration: none;
    transition: color 0.3s;

    &:hover {
      color: var(--secondary-color);
    }
  }
}

.contact-label {
  font-weight: 500;
  width: 80px;
  color: var(--dark-color);
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 20px;
  }

  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .hero-text h1 {
    font-size: 2em;
  }

  .content-section {
    padding: 20px;
  }

  .skill-item {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }

  .skill-name {
    width: auto;
  }

  .skill-level {
    width: auto;
    text-align: left;
  }
}
</style>