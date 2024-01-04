import { TodoPicker } from "./picker";

type Todo = {
    id: string;
    title: string;
};

async function loadModule() {
    try {
        const { Loader } = await import("loader/LoaderIndex");
        const loader = new Loader();
        const picker = new TodoPicker();

        const res: Todo[] = await loader.loadTodo();
        const index = picker.pick(3, res.length);

        for (const i of index) {
            const divElement = document.createElement("div");
            const { id, title } = res[i];

            divElement.textContent = `Task id:${id}, title: ${title}`;

            document.querySelector("#todo-list").appendChild(divElement);
        }
    } catch (error) {
        console.error(error);
    }
}

loadModule();
