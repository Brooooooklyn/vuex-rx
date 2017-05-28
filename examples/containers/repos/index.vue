<template>
  <p v-if="!reposByUser.length">loading...</p>
  <Repos v-else :repos="reposByUser" :user="user"></Repos>
</template>
<script src="./Repos.component.js"></script>