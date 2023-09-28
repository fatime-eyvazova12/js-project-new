window.addEventListener("DOMContentLoaded", function () {
  let swiper = document.getElementById("swiper");
  let image = document.getElementById("image");
  let prevBtn = document.getElementById("prev-btn");
  let nextBtn = document.getElementById("next-btn");

  let images = [
    "/src/images/eyfel.jpeg",
    "/src/images/isvechre.jpeg",
    "/src/images/maldiv.png",
    "/src/images/barcelona.jpeg",
  ];

  let firstIndex = 0;

  function Slider() {
    if (firstIndex < 0) {
      firstIndex = images.length - 1;
    } else if (firstIndex >= images.length) {
      firstIndex = 0;
    }
    image.src = images[firstIndex];
  }
  prevBtn.addEventListener("click", function () {
    firstIndex--;
    Slider();
  });
  nextBtn.addEventListener("click", function () {
    firstIndex++;
    Slider();
  });
  let autoPlay = setInterval(function () {
    firstIndex++;
    Slider();
  }, 2000);

  swiper.addEventListener("mouseover", function () {
    clearInterval(autoPlay);
  });

  swiper.addEventListener("mouseout", function () {
    autoPlay = setInterval(function () {
      firstIndex++;
      Slider();
    }, 2000);
  });
});

// Swiper 2

const swiper = new Swiper(".sample-slider", {
  loop: true,
  slidesPerView: 1,
  centeredSlides: true,
  spaceBetween: 20,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

window.addEventListener("DOMContentLoaded", function () {
  let tabs = document.querySelectorAll(".tab-elements div");
  let tabContents = document.querySelectorAll(".tab-content div");

  for (let tab of tabs) {
    tab.addEventListener("click", function () {
      let activeElement = document.querySelector(".active");
      activeElement.classList.remove("active");
      this.classList.add("active");

      let index = this.getAttribute("data-index");
      for (let content of tabContents) {
        if (content.getAttribute("data-index") == index) {
          content.classList.add("show");
        } else {
          content.classList.remove("show");
        }
      }
    });
  }
});

// Todo list app

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
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></li>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
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
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
