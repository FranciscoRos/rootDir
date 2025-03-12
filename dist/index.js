import { TodoCollection } from "./TodoCollection.js";
const todoCollection = new TodoCollection("Usuario");
const tareaInput = document.getElementById("tareaAñadida");
const addButton = document.getElementById("añadirTarea");
const resultado = document.getElementById("resultado");
function renderTodoList() {
    const items = todoCollection.getTodoItems(false);
    resultado.innerHTML = items.length > 0
        ? items.map(item => `<p>
            <span>${item.id}: ${item.task}</span>
            <button onclick="markAsComplete(${item.id})">✔</button>
        </p>`).join("")
        : "No hay tareas pendientes";
}
addButton.addEventListener("click", () => {
    const taskText = tareaInput.value.trim();
    if (taskText) {
        todoCollection.addTodo(taskText);
        tareaInput.value = "";
        renderTodoList();
    }
});
window.markAsComplete = (id) => {
    todoCollection.markComplete(id, true);
    renderTodoList();
};
renderTodoList();
