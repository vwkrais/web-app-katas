//URL of API:
const API_URL = "http://localhost:4730/todos";

//Input-Options:
let todoInputField = document.querySelector("#text-input");
const btnAdd = document.querySelector("#btn-add");
const btnAll = document.querySelector("#btn-all");
const btnDone = document.querySelector("#btn-done");
const btnOpen = document.querySelector("#btn-open");
const btnRemove = document.querySelector("#btn-remove");

// elements that change if page is rerendered:
const list = document.querySelector("#todolist");

//Data-storage:
let todoArrayOut = []; //todos form local storage
let todoArrayIn = [];
let filteredTodos = [];
const filterValue = Boolean;

function fromAPI() {
  fetch(API_URL)
    .then((response) => response.json())
    .then((todosFromAPI) => {
      todoArrayOut = todosFromAPI;
      console.log(todoArrayOut);
      renderState(todoArrayOut);
    });
  btnAll.checked = true;
}
// =======add new todo to localStorage by click or pressing enter=======

// todoArrayIn = todoArrayOut;
// const textTodo = todoInputField.value;
// const todo = { description: textTodo, done: false };
// todoArrayIn.push(todo);
// todoInputField.value = "";
// localStorage.setItem("todos", JSON.stringify(todoArrayIn));
// todoArrayOut = JSON.parse(localStorage.getItem("todos"));

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
  todoArrayOut.forEach((todo) => {
    if (todo.done === true) {
      fetch(`${API_URL}/${todo.id}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          fromAPI();
        });
    }
    btnAll.checked = true;
  });
});

// localStorage.setItem("todos", JSON.stringify(filteredTodos));
// todoArrayOut = JSON.parse(localStorage.getItem("todos"));

btnAdd.addEventListener("click", () => addTodo());

//or if (event.keyCode === 13) = ist der keycode für enter)
document.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (todoInputField.value !== "") addTodo();
  }
});

function addTodo() {
  const newTodo = {
    description: `${todoInputField.value}`,
    done: false,
  };
  fetch(API_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(newTodo),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      fromAPI();
    });
  todoInputField.value = "";
}
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
      fetch(`${API_URL}/${todo.id}`),
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(todo),
        }
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .then(() => fromAPI());
    });
    li.appendChild(checkbox);
    list.appendChild(li);
    // localStorage.setItem("todos", JSON.stringify(todoArrayOut));
    //
  });
}

fromAPI();
// if (localStorage.getItem("todos") !== null) {
//   todoArrayOut = JSON.parse(localStorage.getItem("todos"));
//   renderState(todoArrayOut);
// }
