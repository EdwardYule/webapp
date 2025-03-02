<template>
  <div class="dialog-overlay" v-if="modelValue" @click="closeDialog">
    <div class="dialog-content" @click.stop>
      <div class="dialog-header">
        <h2>个人信息设置</h2>
        <button class="close-button" @click="closeDialog">&times;</button>
      </div>
      <div class="dialog-body">
        <div class="sub-form">
          <div class="sub-form-item">
            <label for="age">年龄：</label>
            <input type="number" id="age" v-model="localProfile.age" min="0" max="150" />
          </div>
          <div class="sub-form-item">
            <label for="gender">性别：</label>
            <select id="gender" v-model="localProfile.gender">
              <option value="">请选择</option>
              <option value="male">男</option>
              <option value="female">女</option>
              <option value="other">其他</option>
            </select>
          </div>
          <div class="sub-form-item">
            <label for="occupation">职业：</label>
            <input type="text" id="occupation" v-model="localProfile.occupation" />
          </div>
          <div class="sub-form-item">
            <label for="education">学历：</label>
            <select id="education" v-model="localProfile.education">
              <option value="">请选择</option>
              <option value="highSchool">高中</option>
              <option value="bachelor">本科</option>
              <option value="master">硕士</option>
              <option value="phd">博士</option>
            </select>
          </div>
          <div class="sub-form-item">
            <label for="region">地域：</label>
            <input type="text" id="region" v-model="localProfile.region" />
          </div>
          <div class="sub-form-item">
            <label for="language">语言：</label>
            <input type="text" id="language" v-model="localProfile.language" placeholder="例如：中文、英语" />
          </div>
          <div class="sub-form-item">
            <label for="nationality">国别：</label>
            <input type="text" id="nationality" v-model="localProfile.nationality" />
          </div>
        </div>
      </div>
      <div class="dialog-footer">
        <button class="secondary-button" @click="closeDialog">取消</button>
        <button class="primary-button" @click="saveProfile">确定</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'

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
  name: 'ProfileDialog',
  props: {
    modelValue: {
      type: Boolean,
      required: true
    },
    profile: {
      type: Object as () => Profile,
      required: true
    }
  },
  emits: ['update:modelValue', 'update:profile'],
  setup(props, { emit }) {
    const localProfile = reactive<Profile>({...props.profile})

    watch(() => props.profile, (newProfile) => {
      Object.assign(localProfile, newProfile)
    })

    const closeDialog = () => {
      emit('update:modelValue', false)
    }

    const saveProfile = () => {
      emit('update:profile', {...localProfile})
      closeDialog()
    }

    return {
      localProfile,
      closeDialog,
      saveProfile
    }
  }
})
</script>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-content {
  background: white;
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
}

.dialog-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  padding: 0 8px;
}

.close-button:hover {
  color: #333;
}

.dialog-body {
  padding: 20px;
  overflow-y: auto;
}

.dialog-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.sub-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
}

.sub-form-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

label {
  font-weight: bold;
  color: #333;
}

input, select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  box-sizing: border-box;
}

select {
  background-color: white;
}

.primary-button, .secondary-button {
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  min-width: 80px;
}

.primary-button {
  background-color: #4CAF50;
  color: white;
  border: none;
}

.primary-button:hover {
  background-color: #45a049;
}

.secondary-button {
  background-color: white;
  color: #333;
  border: 1px solid #ddd;
}

.secondary-button:hover {
  background-color: #f5f5f5;
}
</style>