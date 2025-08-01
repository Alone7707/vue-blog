<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'
import { useTagStore } from '@/store/tag'
import Card from '@/components/common/Card.vue'

const tagStore = useTagStore()
const tags = ref([])

const tagCloudRef = ref(null)
let scene, camera, renderer, group, raycaster, mouse
let animationId = null
let isHovered = false
let hoveredSprite = null

onMounted(async () => {
  tags.value = await tagStore.getAllTag
  initTagCloud()
  animate()
})

onUnmounted(() => {
  if (animationId) {
    cancelAnimationFrame(animationId)
  }
  if (renderer) {
    renderer.dispose()
  }
})

function initTagCloud() {
  const container = tagCloudRef.value
  const width = container.clientWidth
  const height = 300

  // 创建场景
  scene = new THREE.Scene()

  // 创建相机
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  camera.position.z = 200

  // 创建渲染器
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  })
  renderer.setSize(width, height)
  renderer.setClearColor(0x000000, 0)
  container.appendChild(renderer.domElement)

  // 创建射线投射器和鼠标向量
  raycaster = new THREE.Raycaster()
  mouse = new THREE.Vector2()

  // 创建标签组
  group = new THREE.Group()
  scene.add(group)

  // 创建标签
  createTags()

  // 添加鼠标事件
  container.addEventListener('mouseenter', () => {
    isHovered = true
  })

  container.addEventListener('mouseleave', () => {
    isHovered = false
    // 重置悬停状态
    if (hoveredSprite) {
      resetSpriteScale(hoveredSprite)
      hoveredSprite = null
    }
  })

  container.addEventListener('mousemove', onMouseMove)
  container.addEventListener('click', onMouseClick)
}

function createTags() {
  const radius = 100

  tags.value.forEach((tag, index) => {
    // 创建画布来绘制文字
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')

    // 增大画布尺寸提高清晰度
    canvas.width = 512
    canvas.height = 128

    // 绘制文字 - 增大字体
    context.fillStyle = '#3498db'
    context.font = 'bold 90px "Microsoft YaHei", Arial, sans-serif'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(tag.name, canvas.width / 2, canvas.height / 2)

    // 创建纹理
    const texture = new THREE.CanvasTexture(canvas)

    // 创建材质
    const material = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      opacity: 0.9
    })

    // 创建精灵 - 增大缩放
    const sprite = new THREE.Sprite(material)
    sprite.scale.set(80, 20, 1)

    // 球面分布
    const phi = Math.acos(-1 + (2 * index) / tags.value.length)
    const theta = Math.sqrt(tags.value.length * Math.PI) * phi

    sprite.position.x = radius * Math.cos(theta) * Math.sin(phi)
    sprite.position.y = radius * Math.sin(theta) * Math.sin(phi)
    sprite.position.z = radius * Math.cos(phi)

    // 添加标签数据
    sprite.userData = { tag, originalColor: '#3498db' }

    group.add(sprite)
  })
}

function animate() {
  animationId = requestAnimationFrame(animate)

  // 自动旋转（鼠标悬停时停止）
  if (!isHovered) {
    group.rotation.y += 0.005
    group.rotation.x += 0.002
  }

  // 标签始终面向相机
  group.children.forEach(sprite => {
    sprite.lookAt(camera.position)
  })

  renderer.render(scene, camera)
}

function onMouseMove(event) {
  const container = tagCloudRef.value
  const rect = container.getBoundingClientRect()

  // 计算鼠标位置
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  // 射线检测
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(group.children)

  // 重置之前悬停的标签
  if (hoveredSprite && !intersects.find(item => item.object === hoveredSprite)) {
    resetSpriteScale(hoveredSprite)
    hoveredSprite = null
    container.style.cursor = 'default'
  }

  // 处理新悬停的标签
  if (intersects.length > 0) {
    const sprite = intersects[0].object
    if (sprite !== hoveredSprite) {
      if (hoveredSprite) {
        resetSpriteScale(hoveredSprite)
      }
      hoveredSprite = sprite
      enlargeSprite(sprite)
      container.style.cursor = 'pointer'
    }
  }
}

function onMouseClick(event) {
  const container = tagCloudRef.value
  const rect = container.getBoundingClientRect()

  // 计算鼠标位置
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

  // 射线检测
  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(group.children)

  if (intersects.length > 0) {
    const sprite = intersects[0].object
    const tag = sprite.userData.tag

    // 触发点击事件 - 可以自定义处理逻辑
    console.log('点击了标签:', tag)

    // 这里可以添加路由跳转或其他逻辑
    // 例如：router.push(`/tag/${tag}`)

    // 添加点击动画效果
    animateClick(sprite)
  }
}

function enlargeSprite(sprite) {
  // 使用动画渐变放大到1.5倍，保持原色
  animateScale(sprite, { x: 80, y: 20 }, { x: 120, y: 30 }, 200)
}

function resetSpriteScale(sprite) {
  // 使用动画渐变缩小到原始大小
  animateScale(sprite, { x: sprite.scale.x, y: sprite.scale.y }, { x: 80, y: 20 }, 200)
}

function animateScale(sprite, fromScale, toScale, duration) {
  const startTime = Date.now()

  function update() {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    // 使用缓动函数实现平滑过渡
    const easeProgress = easeOutCubic(progress)

    // 插值计算当前缩放值
    const currentX = fromScale.x + (toScale.x - fromScale.x) * easeProgress
    const currentY = fromScale.y + (toScale.y - fromScale.y) * easeProgress

    sprite.scale.set(currentX, currentY, 1)

    // 如果动画未完成，继续下一帧
    if (progress < 1) {
      requestAnimationFrame(update)
    }
  }

  update()
}

function animateClick(sprite) {
  // 点击时的弹性动画效果
  const originalScale = { x: sprite.scale.x, y: sprite.scale.y }

  // 先快速缩小
  animateScale(sprite, originalScale,
    { x: originalScale.x * 0.8, y: originalScale.y * 0.8 }, 100)

  // 然后弹回原大小
  setTimeout(() => {
    animateScale(sprite,
      { x: originalScale.x * 0.8, y: originalScale.y * 0.8 },
      originalScale, 150)
  }, 100)
}

// 缓动函数 - 三次方缓出
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}
</script>

<template>
  <Card title="标签云">
    <div ref="tagCloudRef" class="tag-cloud-3d"></div>
  </Card>
</template>

<style lang="scss" scoped>
.sidebar-widget {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 25px;
  margin-bottom: 30px;
}

.widget-title {
  font-size: 1.2em;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
  color: var(--dark-color);
}

.tag-cloud-3d {
  width: 300px;
  height: 300px;
  position: relative;
  cursor: pointer;

  canvas {
    border-radius: 8px;
  }
}

/* 夜间模式样式 */
.dark-mode .sidebar-widget {
  background-color: #3f3f3f;
}

.dark-mode .widget-title {
  color: var(--dark-color);
}
</style>
