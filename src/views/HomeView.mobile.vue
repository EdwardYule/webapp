<!-- HomeView Mobile -->
<template>
  <div class="home-mobile">
    <!-- 主要内容区域将在这里重新设计 -->
    <div class="content">
      <div v-if="currentTab === 'home'" class="home-tab">
        <!-- 首页内容将在这里重新设计 -->
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
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HomeViewMobile',
  setup() {
    const currentTab = ref('home')

    return {
      currentTab
    }
  }
})
</script>

<style scoped>
.home-mobile {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  overflow: auto;
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
.home-tab,
.history-tab,
.mine-tab {
  height: 100%;
}
</style>