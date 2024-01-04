import { Generator, Todo } from "./generator";

export interface ILoader {
    getTodo(): Promise<Array<Todo>>;
}

export class Loader implements Loader {
    private generator: Generator;

    constructor() {
        this.generator = new Generator();
    }

    async loadTodo(): Promise<Array<Todo>> {
        try {
            return await this.generator.genTodoList(5);
        } catch (error) {
            throw new Error(error);
        }
    }
}
