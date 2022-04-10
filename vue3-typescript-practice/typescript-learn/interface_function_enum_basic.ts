/**
 * 接口 鸭子模型
 */
interface IPerson {
    readonly id: number,
    name: string,
    age?: number,
}
let cc: IPerson = {
    id: 1,
    name: "cc",
    age: 18
}

/**
 * 函数
 * @param x 
 * @param y 
 * @param z 
 * @returns 
 */
const add = (x: number, y: number, z?: number): number => {
    if (typeof z === 'number') {
        return x + y + z;
    } else {
        return x + y;
    }
}

// (x: number, y: number, z?: number) => number 是 遍历add2的类型，其中 => 不是 es6 中的箭头函数，而是函数的返回值类型
const add2: (x: number, y: number, z?: number) => number = add;

// 在接口中申明一个函数类型
interface ISum {
    (x: number, y: number, z?: number): number
}

const add3: ISum = add;

/**
 * 类型推论 type inference
 */

let str = "str";

/**
 * 联合类型 union types
 * 类型断言(as)：不是类型转换，而是明确变量具体类型
 */
let numberOrString : number | string;
function getLength(input: number | string): number{
    const str = input as string;
    if (str.length) {
        return str.length;
    } else {
        const number = input as number;
        return number.toString().length;
    }
}

// 类型守卫 type guard
function getLength2(input: string | number): number {
    if (typeof input === "string") {
        return input.length;
    } else {
        return input.toString().length;
    }
}

/**
 * 枚举 enum
 */
enum Direction {
    Up = 1,
    Down,
    Left,
    Right
}
console.log("Direction.Up ==> ", Direction.Up, "Direction[0] ==> ", Direction[1]);

// 常量枚举(可以提升性能，计算枚举不能用const)
const enum Direction2 {
    Up = "Up",
    Down = "Down",
    Left = "Left",
    Right = "Right"
}
if ("Up" === Direction2.Up) {
    console.log('upupuup')
}