import { getRandomInt } from "./utils";

interface ITodoPicker {
    pick(numberOfTodo: number, max: number): number[];
}

export class TodoPicker implements ITodoPicker {
    public pick(numberOfTodo: number, max: number): number[] {
        const res: number[] = [];

        while (numberOfTodo--) {
            res.push(getRandomInt(max));
        }

        return res;
    }
}
