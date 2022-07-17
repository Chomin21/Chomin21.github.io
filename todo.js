const toDoForm = document.getElementById("todo-form");
const toDoList = document.getElementById("todo-list");
const toDoInput = toDoForm.querySelector("input");

const TODOS_KEY = "todos";

let toDos = [];

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event) {
  const li = event.currentTarget.parentElement; //버튼이 눌린 부모인 li를 찾아서 제거.
  li.remove();
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  saveToDos();
}

function paintToDo(newToDo) {
  const li = document.createElement("li");
  //li에 id부여
  const span = document.createElement("span");
  const button = document.createElement("button");
  const img = document.createElement("img");
  span.innerText = newToDo.text;
  li.appendChild(span);
  li.id = newToDo.id;
  img.src = "img/close.svg";
  button.appendChild(img);
  button.addEventListener("click", deleteToDo);
  li.appendChild(button);
  toDoList.appendChild(li);
}
function handleToDoSubmit(event) {
  event.preventDefault();
  const newTodo = toDoInput.value;
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  toDoInput.value = "";
  toDos.push(newTodoObj);
  paintToDo(newTodoObj);
  saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

const savedToDos = localStorage.getItem(TODOS_KEY);
// console.log(savedToDos); //string
if (savedToDos != null) {
  const parsedToDos = JSON.parse(savedToDos);
  toDos = parsedToDos; //localstorage에서 발견되는 것들을 모두 가져옴. 예전 것도 보관.
  parsedToDos.forEach(paintToDo);
}
