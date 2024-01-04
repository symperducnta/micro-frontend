import { faker } from "@faker-js/faker";
import { sleep } from "./utils";

export type Todo = {
    id: string;
    title: string;
};

const TodoTitle = [
    "Go to the Gym",
    "Research Tech",
    "Solve DSA Problems",
    "Log Work",
    "Design",
    "Hangout",
    "Play game",
    "Fix bug",
    "Go Jogging",
    "Chore",
    "Wash dish",
];

export class Generator {
    private createRandomTodo(): Todo {
        return {
            id: faker.string.uuid(),
            title: faker.helpers.arrayElement(TodoTitle),
        };
    }

    public async genTodoList(todoQty: number): Promise<Array<Todo>> {
        const res: Array<Todo> = [];

        while (todoQty--) {
            res.push(this.createRandomTodo());
        }

        await sleep(1000);

        return res;
    }
}
