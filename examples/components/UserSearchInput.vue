<template>
  <input
    type='text'
    placeholder='Search for a GH user'
    defaultValue="defaultValue"
    v-on:keyup="onKeyup"
  />
</template>
<script>
export default {
  methods: {
    onKeyup(e) {
      this.onChange(e.target.value)
    }
  },
  props: ['defaultValue', 'onChange']
}
</script>
