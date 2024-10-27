const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function addTodo(event) {
    event.preventDefault();
    if (todoInput.value.trim() === '') {
        alert('В тебе справді немає що робити,лінтяй!?');
        return;
    } else {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        saveLocalTodos({ text: todoInput.value, completed: false });

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
        todoInput.value = "";
    }
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("slide");

        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos")) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;
    if (!localStorage.getItem("todos")) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo.text || todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}
function deleteTodoAndRender(todo) {
    deleteTodo(todo);
    renderTodos();
}

function deleteTodo(todo) {
    let todos = loadLocalTodos();
    todos = todos.filter(t => t.text !== todo.text);
    saveTodos(todos);
}

function renderTodos() {
    const todoList = document.querySelector('.todo-list');
    todoList.innerHTML = '';
    getLocalTodos();
}

document.addEventListener("DOMContentLoaded", renderTodos);


function saveLocalTodos(todo) {
    let todos = loadLocalTodos();
    todos.push(todo);
    saveTodos(todos);
}

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadLocalTodos() {
    return localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
}

function getLocalTodos() {
    const todos = loadLocalTodos();
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        if (todo.completed) {
            todoDiv.classList.add("completed");
        }

        const newTodoElement = document.createElement("li");
        newTodoElement.innerText = todo.text;
        newTodoElement.classList.add("todo-item");
        todoDiv.appendChild(newTodoElement);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
        completedButton.classList.add("complete-btn");
        completedButton.onclick = () => toggleComplete(todo);
        todoDiv.appendChild(completedButton);

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        trashButton.onclick = () => deleteTodoAndRender(todo);
        todoDiv.appendChild(trashButton);

        document.querySelector('.todo-list').appendChild(todoDiv);
    });
}

function loadLocalTodos() {
    return localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];
}

function addTodo() {
    event.preventDefault();
    const todoInput = document.querySelector('.todo-input');
    const todoList = document.querySelector('.todo-list');

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = {
        text: todoInput.value,
        completed: false
    };

    const newTodoElement = document.createElement("li");
    newTodoElement.innerText = newTodo.text;
    newTodoElement.classList.add("todo-item");
    todoDiv.appendChild(newTodoElement);

    saveLocalTodos(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
    completedButton.classList.add("complete-btn");
    completedButton.onclick = () => toggleComplete(newTodo);
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    trashButton.onclick = () => deleteTodoAndRender(newTodo);
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = '';
}

function toggleComplete(todo) {
    const todos = loadLocalTodos();
    const index = todos.findIndex(t => t.text === todo.text);
    todos[index].completed = !todos[index].completed;
    saveTodos(todos);
    renderTodos();
}

document.addEventListener("DOMContentLoaded", getLocalTodos);

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.children[0].innerText;

    const indexToRemove = todos.indexOf(todoIndex);
    if (indexToRemove > -1) {
        todos.splice(indexToRemove, 1);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
}