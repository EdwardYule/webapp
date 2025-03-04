<template>
  <div class="chat-view">
    <MessageList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MessageList from '@/components/MessageList.vue'

export default defineComponent({
  name: 'ChatView',
  components: {
    MessageList
  }
})
</script>

<style scoped>
.chat-view {
  height: 100%;
}
</style>