<!-- HomeView Entry -->
<template>
  <component :is="currentView" />
</template>

<script lang="ts">
import { defineComponent, shallowRef, onMounted, onBeforeUnmount } from 'vue'
import HomeViewDesktop from './HomeView.desktop.vue'
import HomeViewMobile from './HomeView.mobile.vue'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const currentView = shallowRef(isMobile() ? HomeViewMobile : HomeViewDesktop)

    function isMobile() {
      return window.innerWidth <= 768
    }

    function handleResize() {
      currentView.value = isMobile() ? HomeViewMobile : HomeViewDesktop
    }

    onMounted(() => {
      window.addEventListener('resize', handleResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize)
    })

    return {
      currentView
    }
  }
})
</script>
