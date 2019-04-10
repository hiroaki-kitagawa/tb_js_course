<template>
  <div id="app">
    <h1>
      My Todos
      <span class="info">({{ remaining.length }}/{{ todos.length }})</span>
    </h1>
    <ul>
      <ToDoItem v-for="todo in todos" :todo="todo" @delete="deleteTodo" />
    </ul>
    <form @submit.prevent="addTodo">
      <input type="text" v-model="newTodo">
      <input type="submit" value="Add">
    </form>
  </div>
</template>

<script>
import ToDoItem from './components/ToDoItem.vue'

export default {
  name: 'app',
  components: {
    ToDoItem
  },
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
  },
  computed: {
    remaining: function() {
      return this.todos.filter(function(todo) {
        return !todo.isDone;
      });
    }
  }
}
</script>

<style>
</style>
