<script setup lang="ts">
import { SButton } from '@/components/ui'
</script>

<template>
  <div id="credit-view">
    <div class="people">
      <h3>Develop</h3>
      <ul>
        <li>Seoly0 - Full Stack Web Developer</li>
        <ul>
          <li><a href="https://github.com/seoly0/hanghaeplus-coyukdae1">https://github.com/seoly0/hanghaeplus-coyukdae1</a></li>
        </ul>
      </ul>

      <h3>Special Thanks</h3>
      <ul>
        <li>
          Nomannic - A Most UnFamous Youtube / Twitch Creator
          <ul>
            <li>QA Test</li>
            <li>Listening Bull Shit</li>
          </ul>
        </li>
        <li>
          A2kuya - Leader And GameDesigner of "Team Seed" Indie Game Develop Team
          <ul>
            <li>Game Design ( not reflected )</li>
            <li>Listening Howling</li>
          </ul>
        </li>
        <li>
          Anasaka Yonmogi - Looking for a job
          <ul>
            <li>Suppling Chicken</li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="to-title-btn__container">
      <SButton :to="{ name: 'title' }">타이틀로</SButton>
    </div>
  </div>
</template>

<style scoped>
.people {
  width: fit-content;
  margin: 0 auto;
  padding-top: 2rem;
}
h3 {
  margin: 0;
  padding: 1rem 0;
}
ul {
  margin: 0 0 2rem;
}
.to-title-btn__container {
  display: flex;
  justify-content: center;
  align-items: center;
}
a,
a:visited {
  color: unset;
}
</style>
