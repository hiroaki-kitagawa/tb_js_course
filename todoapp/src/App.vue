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
        { id: 2, text: 'ディレクティブをしる' }
      ],
      newTodo: ''
    }
  },
  methods: {
    addTodo: function() {
      const newId = Math.max.apply(null, this.todos.map(t => t.id)) + 1;
      this.todos.push({ id: newId, text: this.newTodo});
      this.newTodo = '';
    },
    deleteTodo: function(todo) {
      this.todos = this.todos.filter(item => item !== todo);
    },
  }
}
</script>

<style>
</style>
