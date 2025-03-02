<template>
  <div class="layout-container">
    <!-- 左侧表单部分 -->
    <div class="form-section">
      <div class="form-container">
        <form @submit.prevent="handleSubmit" class="form">
          <!-- 语言风格 -->
          <div class="form-item">
            <label for="languageStyle">语言风格：</label>
            <select id="languageStyle" v-model="formData.languageStyle" required>
              <option value="">请选择语言风格</option>
              <option value="formal">正式</option>
              <option value="casual">随意</option>
              <option value="friendly">友好</option>
              <option value="professional">专业</option>
              <option value="humorous">幽默</option>
            </select>
            <div class="form-hint">选择对话的语言风格和语气</div>
          </div>

          <!-- 上下文 -->
          <div class="form-item">
            <label for="context">上下文：</label>
            <textarea 
              id="context" 
              v-model="formData.context" 
              rows="4"
              placeholder="例如：我们正在讨论一个技术问题，需要解决代码bug"
            ></textarea>
            <div class="form-hint">描述当前的对话场景或背景信息，这将帮助AI更好地理解和回应</div>
          </div>

          <!-- 输出格式 -->
          <div class="form-item">
            <label for="outputFormat">输出格式：</label>
            <select id="outputFormat" v-model="formData.outputFormat" required>
              <option value="">请选择输出格式</option>
              <option value="text">普通文本</option>
              <option value="json">JSON格式</option>
              <option value="sql">SQL语句</option>
              <option value="markdown">Markdown格式</option>
              <option value="code">代码格式</option>
            </select>
            <div class="form-hint">选择AI回复的格式类型</div>
          </div>

          <!-- 角色扮演 -->
          <div class="form-item">
            <label for="role">角色扮演：</label>
            <input 
              type="text" 
              id="role" 
              v-model="formData.role"
              placeholder="例如：资深程序员、产品经理、技术面试官"
            />
            <div class="form-hint">设定AI应该扮演什么角色来回答</div>
          </div>
        </form>
      </div>
    </div>

    <!-- 中间问题输入区域 -->
    <div class="question-section">
      <div class="question-container">
        <label for="question">输入问题：</label>
        <textarea 
          id="question" 
          v-model="formData.question" 
          rows="8"
          placeholder="在这里输入你想问AI的问题..."
          class="question-input"
        ></textarea>
        <div class="form-hint">输入你想要询问AI的具体问题</div>
      </div>
    </div>

    <!-- 右侧生成的提示词区域 -->
    <div class="prompt-section">
      <GeneratedPrompt :form-data="formData" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import GeneratedPrompt from './GeneratedPrompt.vue'

interface Profile {
  age: number | ''
  gender: string
  occupation: string
  education: string
  region: string
  language: string
  nationality: string
}

interface FormData {
  languageStyle: string
  context: string
  outputFormat: string
  role: string
  profile: Profile
  question: string
}

export default defineComponent({
  name: 'UserForm',
  components: {
    GeneratedPrompt
  },
  emits: ['update:formData', 'submit'],
  setup(props, { emit }) {
    const formData = reactive<FormData>({
      languageStyle: '',
      context: '',
      outputFormat: '',
      role: '',
      question: '',
      profile: {
        age: '',
        gender: '',
        occupation: '',
        education: '',
        region: '',
        language: '',
        nationality: ''
      }
    })

    watch(formData, (newValue) => {
      emit('update:formData', { ...newValue })
    }, { deep: true })

    const handleSubmit = () => {
      emit('submit', { ...formData })
    }

    return {
      formData,
      handleSubmit
    }
  }
})
</script>

<style scoped>
.layout-container {
  display: flex;
  gap: 20px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  min-height: 0;
  max-height: 100%;
  overflow: hidden;
}

.form-section {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.question-section {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}

.question-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.question-input {
  flex: 1;
  min-height: 200px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  line-height: 1.5;
  resize: none;
}

.form-container {
  flex: 1;
  overflow-y: auto;
  padding-right: 10px; /* 为滚动条预留空间 */
  max-width: 100%; /* 限制最大宽度 */
}

.form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-width: 0; /* 防止flex子项溢出 */
}

.button-container {
  padding-top: 20px;
  border-top: 1px solid #ddd;
  margin-top: 20px;
  background-color: #f5f5f5;
  width: 100%;
  box-sizing: border-box;
}

/* 自定义滚动条样式 */
.form-container::-webkit-scrollbar {
  width: 8px;
}

.form-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.form-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.form-container::-webkit-scrollbar-thumb:hover {
  background: #666;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-hint {
  font-size: 0.9em;
  color: #666;
  margin-top: 4px;
}

.sub-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;
}

.sub-form-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
  min-width: 0; /* 防止grid子项溢出 */
}

label {
  font-weight: bold;
}

input, textarea, select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
}

textarea {
  resize: vertical;
}

select {
  background-color: white;
}

button {
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  min-width: 200px;
}

button:hover {
  background-color: #45a049;
}

.prompt-section {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
}
</style>