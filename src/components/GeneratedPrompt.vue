<template>
  <div class="generated-prompt-container">
    <label for="generatedPrompt">生成的提示词：</label>
    <textarea 
      id="generatedPrompt" 
      :value="generatedPrompt" 
      readonly
      rows="8"
      class="generated-prompt"
    ></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

interface FormData {
  languageStyle: string
  context: string
  outputFormat: string
  role: string
  question: string
}

export default defineComponent({
  name: 'GeneratedPrompt',
  props: {
    formData: {
      type: Object as () => FormData,
      required: true
    }
  },
  setup(props) {
    const generatedPrompt = computed(() => {
      const { languageStyle, context, outputFormat, role, question } = props.formData
      let prompt = ''

      // 添加角色信息
      if (role) {
        prompt += `请你扮演${role}的角色。\n\n`
      }

      // 添加上下文信息
      if (context) {
        prompt += `上下文：${context}\n\n`
      }

      // 添加语言风格
      if (languageStyle) {
        prompt += `请使用${languageStyle}的语气回答。\n\n`
      }

      // 添加输出格式要求
      if (outputFormat) {
        prompt += `请以${outputFormat}的格式回答。\n\n`
      }

      // 添加问题
      if (question) {
        prompt += `问题：${question}`
      }

      return prompt.trim()
    })

    return {
      generatedPrompt
    }
  }
})
</script>

<style scoped>
.generated-prompt-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
}

.generated-prompt {
  flex: 1;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  line-height: 1.5;
  resize: none;
  background-color: #f8f8f8;
}

label {
  font-weight: bold;
}
</style>