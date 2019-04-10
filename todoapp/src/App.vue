<template>
  <div id="app">
    <ul>
      <li v-for="todo in todos">
        <span>{{ todo.text }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      todos: [
        { id: 1, text: 'dataを表示する' },
        { id: 2, text: 'ディレクティブをしる' },
        { id: 3, text: '追加テスト' }
      ],
    }
  }
}
</script>

<style>
</style>
