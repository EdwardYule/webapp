<template>
  <div class="new-preset-mobile">
    <div class="header">
      <div class="back-button" @click="goBack">
        <i class="fas fa-arrow-left"></i>
      </div>
      <h1>新增预设</h1>
    </div>
    
    <div class="form-container">
      <div class="form-group">
        <label>预设名称</label>
        <input 
          type="text" 
          v-model="presetName"
          placeholder="给你的预设起个名字"
        >
      </div>

      <div class="form-group">
        <label>行业领域</label>
        <select v-model="industry">
          <option value="">请选择行业领域</option>
          <option v-for="item in industries" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>品牌调性</label>
        <select v-model="tone">
          <option value="">请选择品牌调性</option>
          <option v-for="item in tones" :key="item" :value="item">
            {{ item }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>目标受众</label>
        <input 
          type="text" 
          v-model="targetAudience"
          placeholder="描述你的目标受众"
        >
      </div>

      <div class="form-group">
        <label>核心诉求</label>
        <textarea 
          v-model="coreDemand"
          placeholder="描述你的核心诉求"
          rows="3"
        ></textarea>
      </div>

      <div class="form-group">
        <label>补充信息</label>
        <textarea 
          v-model="additionalInfo"
          placeholder="其他需要补充的信息"
          rows="3"
        ></textarea>
      </div>
    </div>

    <div class="action-bar">
      <button class="save-button" @click="savePreset">保存预设</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'NewPresetMobile',
  setup() {
    const router = useRouter()
    const presetName = ref('')
    const industry = ref('')
    const tone = ref('')
    const targetAudience = ref('')
    const coreDemand = ref('')
    const additionalInfo = ref('')

    const industries = [
      '电商',
      '教育',
      '金融',
      '医疗',
      '科技',
      '旅游',
      '餐饮',
      '其他'
    ]

    const tones = [
      '专业严谨',
      '轻松活泼',
      '高端大气',
      '亲切友好',
      '简约清新',
      '创新科技'
    ]

    const goBack = () => {
      router.back()
    }

    const savePreset = () => {
      if (!presetName.value) {
        alert('请输入预设名称')
        return
      }

      const preset = {
        id: Date.now(),
        name: presetName.value,
        industry: industry.value,
        tone: tone.value,
        targetAudience: targetAudience.value,
        coreDemand: coreDemand.value,
        additionalInfo: additionalInfo.value,
        createTime: new Date().toISOString()
      }

      // 从 localStorage 获取现有预设
      const existingPresets = JSON.parse(localStorage.getItem('presets') || '[]')
      
      // 添加新预设
      existingPresets.push(preset)
      
      // 保存回 localStorage
      localStorage.setItem('presets', JSON.stringify(existingPresets))

      // 返回预设列表页
      router.back()
    }

    return {
      presetName,
      industry,
      tone,
      targetAudience,
      coreDemand,
      additionalInfo,
      industries,
      tones,
      goBack,
      savePreset
    }
  }
})
</script>

<style scoped>
.new-preset-mobile {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
}

.header {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.back-button {
  padding: 8px;
  margin-right: 16px;
  cursor: pointer;
}

.header h1 {
  font-size: 18px;
  font-weight: 500;
  margin: 0;
}

.form-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.form-group {
  background-color: #fff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  background-color: #fff;
}

.form-group textarea {
  resize: none;
}

.action-bar {
  padding: 16px;
  background-color: #fff;
  border-top: 1px solid #eee;
}

.save-button {
  width: 100%;
  padding: 14px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.save-button:active {
  background-color: #43A047;
}
</style>