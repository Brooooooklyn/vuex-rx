<template>
  <ul v-if="repos.length">
    <li v-for="repo in repos" v-bind:key="repo.id">
      <a
        href={{ repo.html_url }}
        target='__blank'
      >
        {{ repo.full_name }}
      </a>
    <li>
  </ul>
  <p v-if="!repos.length">{{ user }} has no repos</p>
</template>
<script>
export default {
  props: ['repos', 'user']
}
</script>
