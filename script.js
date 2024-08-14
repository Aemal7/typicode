const apiURL = 'https://jsonplaceholder.typicode.com/todos';

const todoList = document.getElementById('todo-list');
const form = document.getElementById('todo-form');

function loadTodos() {
  fetch(`${apiURL}?_limit=5`)
    .then((res) => res.json())
    .then((todos) => todos.forEach((todo) => createToDoInDOM(todo)));
}

function createToDoInDOM(todo) {
  const todoItem = document.createElement('div');
  todoItem.appendChild(document.createTextNode(todo.title));
  todoItem.classList.add('item');
  todoItem.setAttribute('data-item', todo.id);
  todo.completed && todoItem.classList.add('done');
  todoList.appendChild(todoItem);
}

function addNewItem(e) {
  e.preventDefault();
  const input = form.querySelector('#title');

  const newTodo = {
    title: input.value,
    completed: false,
  };

  fetch(apiURL, {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => createToDoInDOM(newTodo));
}

function onClickItem(e) {
  if (e.target.classList.contains('item')) {
    !e.target.classList.contains('done')
      ? toggleCompleted(e.target)
      : deleteItem(e.target);
  }
}

function toggleCompleted(todo) {
  fetch(`${apiURL}/${todo.dataset.item}`, {
    method: 'PUT',
    body: JSON.stringify({
      title: todo.innerText,
      completed: true,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => todo.classList.toggle('done'));
}

function deleteItem(todo) {
  fetch(`${apiURL}/${todo.dataset.item}`, {
    method: 'DELETE',
  })
    .then((res) => res.json())
    .then((data) => todo.remove());
}

document.addEventListener('DOMContentLoaded', loadTodos);
form.addEventListener('submit', addNewItem);
todoList.addEventListener('click', onClickItem);
