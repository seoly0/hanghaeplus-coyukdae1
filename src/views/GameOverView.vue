<template>
  <div id="gameover-view">
    <div>
      <SButton :to="{ name: 'title' }">타이틀로</SButton>
      <SButton :to="{ name: 'stage' }">다시하기</SButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SButton } from '@/components/ui'
</script>
