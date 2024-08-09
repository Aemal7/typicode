const todoList = document.getElementById('todo-list');

function loadTodos() {
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
    .then((res) => res.json())
    .then((todos) => loadTodosToDOM(todos));
}

function loadTodosToDOM(todos) {
  todos.forEach((todo) => {
    createToDoInDOM(todo);
  });
}

function createToDoInDOM(todo) {
  const todoItem = document.createElement('div');
  todoItem.appendChild(document.createTextNode(todo.title));
  todo.completed && todoItem.classList.add('done');
  todoList.appendChild(todoItem);
}

document.addEventListener('DOMContentLoaded', loadTodos);
