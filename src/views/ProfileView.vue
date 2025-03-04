<template>
  <div class="profile-view">
    <div class="header">
      <h2>个人信息</h2>
    </div>
    
    <div class="profile-content">
      <div class="profile-info">
        <div class="info-item">
          <label>年龄</label>
          <span>{{ profile.age || '未设置' }}</span>
        </div>
        <div class="info-item">
          <label>性别</label>
          <span>{{ getGenderText(profile.gender) }}</span>
        </div>
        <div class="info-item">
          <label>职业</label>
          <span>{{ profile.occupation || '未设置' }}</span>
        </div>
        <div class="info-item">
          <label>学历</label>
          <span>{{ getEducationText(profile.education) }}</span>
        </div>
        <div class="info-item">
          <label>地域</label>
          <span>{{ profile.region || '未设置' }}</span>
        </div>
        <div class="info-item">
          <label>语言</label>
          <span>{{ profile.language || '未设置' }}</span>
        </div>
        <div class="info-item">
          <label>国籍</label>
          <span>{{ profile.nationality || '未设置' }}</span>
        </div>
      </div>
      
      <button class="edit-button" @click="openProfileDialog">
        <i class="fas fa-edit"></i>
        编辑资料
      </button>
    </div>

    <ProfileDialog
      v-model="showProfileDialog"
      v-model:profile="profile"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
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

export default defineComponent({
  name: 'ProfileView',
  components: {
    ProfileDialog
  },
  setup() {
    const showProfileDialog = ref(false)
    const profile = ref<Profile>({
      age: '',
      gender: '',
      occupation: '',
      education: '',
      region: '',
      language: '',
      nationality: ''
    })

    const getGenderText = (gender: string) => {
      const genders: Record<string, string> = {
        male: '男',
        female: '女',
        other: '其他'
      }
      return genders[gender] || '未设置'
    }

    const getEducationText = (education: string) => {
      const educations: Record<string, string> = {
        highSchool: '高中',
        bachelor: '本科',
        master: '硕士',
        phd: '博士'
      }
      return educations[education] || '未设置'
    }

    const openProfileDialog = () => {
      showProfileDialog.value = true
    }

    return {
      profile,
      showProfileDialog,
      getGenderText,
      getEducationText,
      openProfileDialog
    }
  }
})
</script>

<style scoped>
.profile-view {
  height: 100%;
  background-color: #f5f5f5;
}

.header {
  padding: 20px;
  background-color: #fff;
}

.header h2 {
  margin: 0;
  font-size: 20px;
  color: #333;
}

.profile-content {
  padding: 16px;
}

.profile-info {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
  border-bottom: none;
}

.info-item label {
  color: #666;
  font-size: 14px;
}

.info-item span {
  color: #333;
  font-size: 14px;
}

.edit-button {
  width: 100%;
  margin-top: 20px;
  padding: 14px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
}

.edit-button:active {
  background-color: #43A047;
}
</style>