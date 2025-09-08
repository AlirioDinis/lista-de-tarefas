const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Carregar tarefas do LocalStorage
document.addEventListener("DOMContentLoaded", loadTasks);

// Adicionar nova tarefa
addTaskBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  createTaskElement(taskText);

  saveTask(taskText); // salva no localStorage
  taskInput.value = "";
}

// Criar elemento da lista
function createTaskElement(taskText, completed = false) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (completed) li.classList.add("completed");

  // Marcar como concluída
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  // Botão remover
  const removeBtn = document.createElement("button");
  removeBtn.textContent = "X";
  removeBtn.style.background = "red";
  removeBtn.style.color = "white";
  removeBtn.style.border = "none";
  removeBtn.style.borderRadius = "4px";
  removeBtn.style.marginLeft = "10px";
  removeBtn.style.cursor = "pointer";

  removeBtn.addEventListener("click", () => {
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

// Salvar no LocalStorage
function saveTask(taskText) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Atualizar LocalStorage
function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("completed")
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Carregar tarefas salvas
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}