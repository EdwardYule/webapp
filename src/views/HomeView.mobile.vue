<!-- HomeView Mobile -->
<template>
  <div class="home-mobile" :style="{ height: containerHeight + 'px' }">
    <div class="content">
      <div v-if="currentTab === 'home'" class="home-tab">
        <MessageList />
      </div>
      <div v-else-if="currentTab === 'history'" class="history-tab">
        <!-- 历史记录内容将在这里重新设计 -->
      </div>
      <div v-else-if="currentTab === 'mine'" class="mine-tab">
        <!-- 个人中心内容将在这里重新设计 -->
      </div>
    </div>
    
    <!-- 底部标签栏 -->
    <div class="tab-bar">
      <div class="tab-item" :class="{ active: currentTab === 'home' }" @click="currentTab = 'home'">
        <i class="fas fa-home"></i>
        <span>首页</span>
      </div>
      <div class="tab-item" :class="{ active: currentTab === 'history' }" @click="currentTab = 'history'">
        <i class="fas fa-history"></i>
        <span>历史</span>
      </div>
      <div class="tab-item" :class="{ active: currentTab === 'mine' }" @click="currentTab = 'mine'">
        <i class="fas fa-user"></i>
        <span>我的</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted } from 'vue'
import MessageList from '@/components/MessageList.vue'

export default defineComponent({
  name: 'HomeViewMobile',
  components: {
    MessageList
  },
  setup() {
    const currentTab = ref('home')
    const containerHeight = ref(document.documentElement.clientHeight)

    const updateHeight = () => {
      containerHeight.value = document.documentElement.clientHeight
    }

    onMounted(() => {
      window.addEventListener('resize', updateHeight)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', updateHeight)
    })

    return {
      currentTab,
      containerHeight
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
</style>