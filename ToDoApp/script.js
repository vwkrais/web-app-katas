// todos are stored in an array. todos are objects
//object keys: todo: string, done: bolean

//Input-Options:
let todoInputField = document.querySelector("#text-input");
const btnAdd = document.querySelector("#btn-add");
const btnAll = document.querySelector("#btn-all");
const btnDone = document.querySelector("#btn-done");
const btnOpen = document.querySelector("#btn-open");
const btnRemove = document.querySelector("#btn-remove");

//Data-storage:
let todoArrayOut = []; //todos form local storage
let filteredTodos = [];
const filterValue = Boolean;

// const changable locations on rendered page;
const list = document.querySelector("#todolist");

// =======add new todo to localStorage=======
btnAdd.addEventListener("click", () => addTodo());

//or if (event.keyCode === 13) = ist der keycode für enter)
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (todoInputField.value !== "") addTodo();
  }
});

function addTodo() {
  let todoArrayIn = todoArrayOut;
  const textTodo = todoInputField.value;
  const todo = { description: textTodo, done: false };
  todoArrayIn.push(todo);
  todoInputField.value = "";
  localStorage.setItem("todos", JSON.stringify(todoArrayIn));
  todoArrayOut = JSON.parse(localStorage.getItem("todos"));
  renderState(todoArrayOut);
}

btnAll.addEventListener("change", () => {
  renderState(todoArrayOut);
});

btnOpen.addEventListener("change", () => {
  filter(false);
  renderState(filteredTodos);
});

btnDone.addEventListener("change", () => {
  filter(true);
  renderState(filteredTodos);
});

btnRemove.addEventListener("click", () => {
  filter(false);
  localStorage.setItem("todos", JSON.stringify(filteredTodos));
  todoArrayOut = JSON.parse(localStorage.getItem("todos"));
  renderState(todoArrayOut);
  btnAll.checked = true;
});

//filterValue receive from Filterbutton Selection
function filter(filterValue) {
  filteredTodos = todoArrayOut.filter((todo) => todo.done === filterValue);
}

//======render Data with or without filter=====
//todos is Todo-Array to be rendered
function renderState(todos) {
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerText = todo.description;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.style.marginLeft = "10px";
    checkbox.checked = todo.done;
    if (todo.done === true) {
      li.style.textDecoration = "line-through";
    }
    checkbox.addEventListener("change", () => {
      if (todo.done === true) {
        todo.done = false;
      } else {
        todo.done = true;
      }
      localStorage.setItem("todos", JSON.stringify(todoArrayOut));
    });
    li.appendChild(checkbox);
    list.appendChild(li);
  });
}

if (localStorage.getItem("todos") !== null) {
  todoArrayOut = JSON.parse(localStorage.getItem("todos"));
  renderState(todoArrayOut);
}
