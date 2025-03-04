<template>
  <div class="message-container">
    <!-- 消息列表区域 -->
    <div class="message-list">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <div class="avatar">
          <i class="fas fa-user"></i>
        </div>
        <div class="message-content" @click="copyMessage(message.content)">
          {{ message.content }}
        </div>
      </div>
    </div>
    
    <!-- 复制成功提示 -->
    <div class="copy-toast" v-if="showCopyToast">
      已复制到剪贴板
    </div>
    
    <!-- 输入区域 -->
    <div class="input-area">
      <button class="action-button">
        <i class="fas fa-plus"></i>
      </button>
      <input 
        type="text" 
        v-model="inputMessage" 
        placeholder="输入内容..." 
        @keyup.enter="sendMessage"
      >
      <button class="send-button" @click="sendMessage" :disabled="!inputMessage.trim()">
        <i class="fas fa-paper-plane"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MessageList',
  setup() {
    const inputMessage = ref('')
    const messages = ref<{ content: string }[]>([])
    const showCopyToast = ref(false)

    const sendMessage = () => {
      if (inputMessage.value.trim()) {
        messages.value.push({ content: inputMessage.value })
        inputMessage.value = ''
      }
    }

    const copyMessage = async (content: string) => {
      try {
        await navigator.clipboard.writeText(content)
        showCopyToast.value = true
        setTimeout(() => {
          showCopyToast.value = false
        }, 2000)
      } catch (err) {
        console.error('复制失败:', err)
      }
    }

    return {
      inputMessage,
      messages,
      sendMessage,
      copyMessage,
      showCopyToast
    }
  }
})
</script>

<style scoped>
.message-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.message {
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
}

.message-content {
  background-color: #4CAF50;
  color: white;
  padding: 12px 16px;
  border-radius: 16px;
  border-bottom-right-radius: 4px;
  max-width: 70%;
  word-break: break-word;
  line-height: 1.4;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  order: 1;
  cursor: pointer;
  user-select: text;
  transition: opacity 0.2s;
}

.message-content:active {
  opacity: 0.8;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  order: 2;
}

.input-area {
  padding: 12px 16px;
  background-color: #fff;
  border-top: 1px solid #eee;
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-button {
  background: none;
  border: none;
  color: #666;
  padding: 8px;
  cursor: pointer;
}

input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  font-size: 16px;
}

.send-button {
  background: none;
  border: none;
  color: #4CAF50;
  padding: 8px;
  cursor: pointer;
}

.send-button:disabled {
  color: #ccc;
  cursor: not-allowed;
}

.copy-toast {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1000;
}
</style>