<template>
  <input
    type='text'
    placeholder='Search for a GH user'
    defaultValue="defaultValue"
    v-on:keyup="onChange"
  />
</template>
<script>
export default {
  props: ['defaultValue', 'onChange']
}
</script>
