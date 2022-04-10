function echo<T>(arg: T): T {
    return arg
}

function swap<T, U>(tuple: [T, U]) : [U, T]{
    return [tuple[1], tuple[0]]
}
const result = swap(["str", 123]);

/**
 * 约束泛型
 */
function echoWithArr<T>(arg: T[]): T[] {
    return arg;
}
echoWithArr([1, 3]); // 缺点：只能传入数组, 像 字符串，类数组对象无法传入

// 使用接口约束泛型，只要具有length属性就可以作为参数传入
interface IWithLength {
    length: number
}

function echoWidthLength<T extends IWithLength>(arg: T): T {
    return arg;
}
const str = echoWidthLength("str");
const obj = echoWidthLength({ length: 10, width: 100 });
const arr = echoWidthLength([1, 3, 4]);

/**
 * 在 类 中使用泛型
 */
class Queue<T> {
    private data = [];
    push(item: T) {
        return this.data.push(item);
    }

    pop(): T {
        return this.data.shift();
    }
}
const queue = new Queue<number>();
queue.push(1);
console.log(queue.pop().toFixed())

/**
 * 在 接口 中使用泛型
 */
interface keyPair<T, U> {
    key: T,
    value: U,
}
let kp1: keyPair<number, string> = { key: 1, value: "string" };
let kp2: keyPair<string, number> = { key: "str", value: 123 };
let kp3: number[] = [1, 2, 3];
let kp4: Array<number> = [1, 2, 3];