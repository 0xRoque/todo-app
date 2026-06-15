// Selecionar elementos do DOM
const taskInput = document.querySelector("#task");
const btnAdd = document.querySelector("#btn-add");
const taskList = document.querySelector("#taskList");

// Event listener — quando o botão é clicado, adiciona a tarefa
btnAdd.addEventListener("click", async function () {
  const taskName = taskInput.value;
  const res = await fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: taskName }),
  });
  const newTask = await res.json();
  renderTask(newTask);
  taskInput.value = "";
});
taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    btnAdd.click();
  }
});

async function loadTasks() {
  const res = await fetch("http://localhost:3000/tasks");
  const data = await res.json();
  data.forEach((task) => renderTask(task));
}

// Responsabilidade: renderizar a tarefa no DOM
function renderTask(task) {
  let li = document.createElement("li"); // cria elemento li
  let btnDelete = document.createElement("button"); // cria botão de apagar

  // Toggle — marca/desmarca tarefa como concluída
  li.addEventListener("click", async function () {
    const completed = !task.completed;
    await fetch(`http://localhost:3000/tasks/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: completed }),
    });
    task.completed = completed;
    if (task.completed) {
      li.style.textDecoration = "line-through";
    } else {
      li.style.textDecoration = "none";
    }
  });

  // Delete — apaga a tarefa do array, localStorage e DOM
  btnDelete.addEventListener("click", async function () {
    await fetch(`http://localhost:3000/tasks/${task._id}`, {
      method: "DELETE",
    });
    li.remove(); // remove do DOM
  });

  li.textContent = task.title; // define o texto da tarefa
  if (task.completed) {
    li.style.textDecoration = "line-through";
  }
  taskList.prepend(li); // adiciona no início da lista
  btnDelete.textContent = "x"; // define o texto do botão
  li.appendChild(btnDelete); // adiciona o botão dentro do li
}

loadTasks();
