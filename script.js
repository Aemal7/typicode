const apiURL = 'https://jsonplaceholder.typicode.com/todos';

const todoList = document.getElementById('todo-list');

function loadTodos() {
  fetch(`${apiURL}?_limit=5`)
    .then((res) => res.json())
    .then((todos) => todos.forEach((todo) => createToDoInDOM(todo)));
}

function createToDoInDOM(todo) {
  const todoItem = document.createElement('div');
  todoItem.appendChild(document.createTextNode(todo.title));
  todoItem.setAttribute('data-item', todo.id);
  todo.completed && todoItem.classList.add('done');
  todoList.appendChild(todoItem);
}

document.addEventListener('DOMContentLoaded', loadTodos);
