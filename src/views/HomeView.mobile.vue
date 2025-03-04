<!-- HomeView Mobile -->
<template>
  <div class="home-mobile" :style="{ height: containerHeight + 'px' }">
    <!-- 使用router-view替换条件渲染的内容 -->
    <div class="content">
      <router-view></router-view>
    </div>
    
    <!-- 底部标签栏 -->
    <div class="tab-bar">
      <div class="tab-item" :class="{ active: isCurrentRoute('') }" @click="navigateTo('')">
        <i class="fas fa-home"></i>
        <span>首页</span>
      </div>
      <div class="tab-item" :class="{ active: isCurrentRoute('presets') }" @click="navigateTo('presets')">
        <i class="fas fa-list-alt"></i>
        <span>预设</span>
      </div>
      <div class="tab-item" :class="{ active: isCurrentRoute('profile') }" @click="navigateTo('profile')">
        <i class="fas fa-user"></i>
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'HomeViewMobile',
  setup() {
    const router = useRouter()
    const route = useRoute()
    const containerHeight = ref(document.documentElement.clientHeight)

    const updateHeight = () => {
      containerHeight.value = document.documentElement.clientHeight
    }

    const navigateTo = (path: string) => {
      router.push('/' + path)
    }

    const isCurrentRoute = (path: string) => {
      return route.path === '/' + path
    }

    onMounted(() => {
      window.addEventListener('resize', updateHeight)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateHeight)
    })

    return {
      containerHeight,
      navigateTo,
      isCurrentRoute
    }
  }
})
</script>

<style scoped>
.home-mobile {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  overscroll-behavior: none;
  -webkit-overflow-scrolling: touch;
}

.content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.home-tab {
  height: 100%;
}

/* 标签栏样式 */
.tab-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 56px;
  background-color: #fff;
  border-top: 1px solid #eee;
}

.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #666;
  font-size: 12px;
  gap: 4px;
}

.tab-item i {
  font-size: 20px;
}

.tab-item.active {
  color: #4CAF50;
}

/* 标签页内容区域样式 */
.history-tab,
.mine-tab {
  height: 100%;
}

.preset-tab {
  height: 100%;
  position: relative;
}

.floating-button {
  position: fixed;
  right: 20px;
  bottom: 76px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #4CAF50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 100;
}

.floating-button i {
  font-size: 24px;
}
</style>