import { TodoItem } from "./TodoItem";

type ItemCounts = {
    total: number;
    incomplete: number;
}

export class TodoCollection {
    private nextId: number = 1;
    private itemMap= new Map<number, TodoItem>();

    constructor(public userName: string, todoItems: TodoItem[] = []) {
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }

    addTodo(task: string): number {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));
        return this.nextId;
    }

    getTodoById(id: number) : TodoItem | undefined {
        return this.itemMap.get(id)  ;
    }

    getTodoItems(includeComplete: boolean): TodoItem[] {
        return [...this.itemMap.values()].filter(item => includeComplete || !item.complete);
    }

    markComplete(id: number, complete: boolean) {
        const todoItem = this.getTodoById(id);
        if (todoItem) {
            todoItem.complete = complete;
        }
    }

    removeComplete() {
        this.itemMap.forEach(item => {
            if (item.complete) {
                this.itemMap.delete(item.id);
            }
        })
    }

    getItemsCount(): ItemCounts {
        return {
            total: this.getTodoItems(true).length,
            incomplete: this.getTodoItems(false).length
        };
    }
}