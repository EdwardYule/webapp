<template>
  <div class="home">
    <div class="header">
      <h1>提示词生成器</h1>
      <button class="profile-settings-button" @click="openProfileDialog" :title="hasProfileData ? '修改个人信息' : '设置个人信息'">
        <i class="fas fa-user-cog"></i>
        <span class="profile-dot" :class="{ 'has-data': hasProfileData }"></span>
      </button>
    </div>
    <div class="container">
      <!-- 使用表单组件 -->
      <UserForm @submit="handleSubmit" @update:formData="updateFormData" ref="userFormRef" />
    </div>
    <!-- 个人信息弹窗 -->
    <ProfileDialog
      v-model="showProfileDialog"
      v-model:profile="formData.profile"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, ref } from 'vue'
import UserForm from '@/components/UserForm.vue'
import ProfileDialog from '@/components/ProfileDialog.vue'

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
}

export default defineComponent({
  name: 'HomeView',
  components: {
    UserForm,
    ProfileDialog
  },
  setup() {
    const formData = reactive<FormData>({
      languageStyle: '',
      context: '',
      outputFormat: '',
      role: '',
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

    const hasProfileData = computed(() => {
      return Object.values(formData.profile).some(value => value !== '')
    })

    const hasAnyData = computed(() => {
      return formData.languageStyle || formData.context || formData.outputFormat || 
             formData.role || hasProfileData.value
    })

    const getLanguageStyleText = (style: string) => {
      const styles: Record<string, string> = {
        formal: '正式',
        casual: '随意',
        friendly: '友好',
        professional: '专业',
        humorous: '幽默'
      }
      return styles[style] || style
    }

    const getOutputFormatText = (format: string) => {
      const formats: Record<string, string> = {
        text: '普通文本',
        json: 'JSON格式',
        sql: 'SQL语句',
        markdown: 'Markdown格式',
        code: '代码格式'
      }
      return formats[format] || format
    }

    const getGenderText = (gender: string) => {
      const genders: Record<string, string> = {
        male: '男',
        female: '女',
        other: '其他'
      }
      return genders[gender] || gender
    }

    const getEducationText = (education: string) => {
      const educations: Record<string, string> = {
        highSchool: '高中',
        bachelor: '本科',
        master: '硕士',
        phd: '博士'
      }
      return educations[education] || education
    }

    const generatePrompt = () => {
      let prompt = ''

      // 角色设定
      if (formData.role) {
        prompt += `请你扮演一个${formData.role}。`
      }

      // 语言风格
      if (formData.languageStyle) {
        prompt += `使用${getLanguageStyleText(formData.languageStyle)}的语气。`
      }

      // 上下文
      if (formData.context) {
        prompt += `\n上下文：${formData.context}`
      }

      // 个人信息
      if (hasProfileData.value) {
        prompt += '\n我的情况是：'
        if (formData.profile.age) prompt += `${formData.profile.age}岁、`
        if (formData.profile.gender) prompt += `${getGenderText(formData.profile.gender)}性、`
        if (formData.profile.occupation) prompt += `${formData.profile.occupation}、`
        if (formData.profile.education) prompt += `${getEducationText(formData.profile.education)}学历、`
        if (formData.profile.region) prompt += `来自${formData.profile.region}、`
        if (formData.profile.language) prompt += `会${formData.profile.language}、`
        if (formData.profile.nationality) prompt += `${formData.profile.nationality}国籍`
        prompt = prompt.replace(/、$/, '')
      }

      // 输出格式
      if (formData.outputFormat) {
        prompt += `\n请用${getOutputFormatText(formData.outputFormat)}回复。`
      }

      return prompt.trim()
    }

    const updateFormData = (newData: FormData) => {
      Object.assign(formData, newData)
    }

    const handleSubmit = (data: FormData) => {
      console.log('生成的提示词：', generatePrompt())
    }

    const isCopied = ref(false)

    const copyPrompt = async () => {
      const prompt = generatePrompt()
      try {
        await navigator.clipboard.writeText(prompt)
        isCopied.value = true
        setTimeout(() => {
          isCopied.value = false
        }, 2000)
      } catch (err) {
        console.error('复制失败:', err)
      }
    }

    const showProfileDialog = ref(false)
    const userFormRef = ref()

    const openProfileDialog = () => {
      showProfileDialog.value = true
    }

    return {
      formData,
      hasProfileData,
      hasAnyData,
      updateFormData,
      handleSubmit,
      getLanguageStyleText,
      getOutputFormatText,
      getGenderText,
      getEducationText,
      generatePrompt,
      isCopied,
      copyPrompt,
      showProfileDialog,
      openProfileDialog,
      userFormRef
    }
  }
})
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.container {
  flex: 1;
  min-height: 0;
  min-width: 0;
  margin-top: 20px;
  height: calc(100% - 80px); /* 减去header和padding的高度 */
  overflow: hidden;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.header h1 {
  margin: 0;
}

.profile-settings-button {
  background: none;
  border: none;
  font-size: 24px;
  color: #666;
  cursor: pointer;
  padding: 8px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.3s;
}

.profile-settings-button:hover {
  background-color: #f0f0f0;
  color: #333;
}

.profile-dot {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #f44336;
}

.profile-dot.has-data {
  background-color: #4CAF50;
}
</style>
