<template>
  <li>
    <span>{{ todo.text }}</span>
    <span @click="deleteItem(todo)">[x]</span>
  </li>
</template>

<script>
  export default {
    name: "to-do-item",
    props: ['todo'],
    methods: {
      deleteItem(todo) {
        this.$emit('delete', todo)
      }
    }
  }
</script>

<style></style>
