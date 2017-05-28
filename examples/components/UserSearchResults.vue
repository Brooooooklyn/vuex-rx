<template>
  <ul :style="{ opacity: loading ? 0.3 : 1 }">
    <li
      v-for="result in results"
      :key="result.id"
    >
      <router-link :to="`/repos/${result.login}`">
        {{ result.login }}
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['results', 'loading']
}
</script>
