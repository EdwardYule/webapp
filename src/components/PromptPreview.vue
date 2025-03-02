<template>
  <div class="preview-section">
    <h3>预览区域</h3>
    <div class="preview-content">
      <div v-if="formData" class="prompt-preview">
        <div v-if="formData.role" class="preview-item">
          <strong>角色：</strong>
          <span>{{ formData.role }}</span>
        </div>
        <div v-if="formData.languageStyle" class="preview-item">
          <strong>语言风格：</strong>
          <span>{{ formData.languageStyle }}</span>
        </div>
        <div v-if="formData.context" class="preview-item">
          <strong>上下文：</strong>
          <span>{{ formData.context }}</span>
        </div>
        <div v-if="formData.outputFormat" class="preview-item">
          <strong>输出格式：</strong>
          <span>{{ formData.outputFormat }}</span>
        </div>
        <div v-if="formData.question" class="preview-item">
          <strong>问题：</strong>
          <span>{{ formData.question }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

interface FormData {
  languageStyle: string
  context: string
  outputFormat: string
  role: string
  question: string
}

export default defineComponent({
  name: 'PromptPreview',
  props: {
    formData: {
      type: Object as PropType<FormData>,
      required: true
    }
  }
})
</script>

<style scoped>
.preview-section {
  flex: 1;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  height: 100%;
}

.preview-content {
  margin-top: 16px;
}

.prompt-preview {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preview-item {
  background-color: white;
  padding: 12px;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.preview-item strong {
  display: block;
  margin-bottom: 4px;
  color: #333;
}

.preview-item span {
  color: #666;
  line-height: 1.5;
}
</style>