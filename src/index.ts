import { TodoCollection } from "./TodoCollection.js";

type HTMLElementOrNull = HTMLElement | null;
const todoCollection = new TodoCollection("Usuario");

const tareaInput = document.getElementById("tareaAñadida") as HTMLInputElement;
const addButton = document.getElementById("añadirTarea") as HTMLButtonElement;
const resultado = document.getElementById("resultado") as HTMLElement;

function renderTodoList(): void {
    const items = todoCollection.getTodoItems(false);
    resultado.innerHTML = items.length > 0
        ? items.map(item => `<p>
            <span>${item.id}: ${item.task}</span>
            <button onclick="markAsComplete(${item.id})">✔</button>
        </p>`).join("")
        : "No hay tareas pendientes";
}

addButton.addEventListener("click", (): void => {
    const taskText: string = tareaInput.value.trim();
    if (taskText) {
        todoCollection.addTodo(taskText);
        tareaInput.value = "";
        renderTodoList();
    }
});

(window as any).markAsComplete = (id: number): void => {
    todoCollection.markComplete(id, true);
    renderTodoList();
};

renderTodoList();
