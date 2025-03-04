<template>
  <div class="presets-view">
    <PresetList />
    <div class="floating-button" @click="goToNewPreset">
      <i class="fas fa-plus"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import PresetList from '@/components/PresetList.vue'

export default defineComponent({
  name: 'PresetsView',
  components: {
    PresetList
  },
  setup() {
    const router = useRouter()

    const goToNewPreset = () => {
      router.push('/new-preset')
    }

    return {
      goToNewPreset
    }
  }
})
</script>

<style scoped>
.presets-view {
  height: 100%;
  position: relative;
}

.floating-button {
  position: fixed;
  right: 20px;
  bottom: 76px;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #4CAF50;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 100;
}

.floating-button i {
  font-size: 24px;
}
</style>