<template>
  <div class="preset-list">
    <div v-if="presets.length === 0" class="empty-state">
      <i class="fas fa-list-alt empty-icon"></i>
      <p>还没有预设，快去创建一个吧</p>
    </div>
    <div v-else class="preset-items">
      <div v-for="preset in presets" :key="preset.id" class="preset-item">
        <div class="preset-header">
          <h3>{{ preset.name }}</h3>
          <span class="industry-tag">{{ preset.industry }}</span>
        </div>
        <div class="preset-content">
          <div class="info-row">
            <label>品牌调性：</label>
            <span>{{ preset.tone }}</span>
          </div>
          <div class="info-row">
            <label>目标受众：</label>
            <span>{{ preset.targetAudience }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'

interface Preset {
  id: number
  name: string
  industry: string
  tone: string
  targetAudience: string
  coreDemand: string
  additionalInfo: string
  createTime: string
}

export default defineComponent({
  name: 'PresetList',
  setup() {
    const presets = ref<Preset[]>([])

    const loadPresets = () => {
      const savedPresets = localStorage.getItem('presets')
      if (savedPresets) {
        presets.value = JSON.parse(savedPresets)
      }
    }

    onMounted(() => {
      loadPresets()
      // 监听 localStorage 变化
      window.addEventListener('storage', loadPresets)
    })

    return {
      presets
    }
  }
})
</script>

<style scoped>
.preset-list {
  height: 100%;
  overflow-y: auto;
  padding: 16px;
  background-color: #f5f5f5;
}

.empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #999;
  padding: 32px;
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.preset-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preset-item {
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.preset-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.preset-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.industry-tag {
  font-size: 12px;
  padding: 4px 8px;
  background-color: #e8f5e9;
  color: #4caf50;
  border-radius: 4px;
}

.preset-content {
  font-size: 14px;
}

.info-row {
  margin-bottom: 8px;
  display: flex;
  gap: 8px;
}

.info-row label {
  color: #666;
}

.info-row span {
  color: #333;
  flex: 1;
}
</style>