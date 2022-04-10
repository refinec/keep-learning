/**
 * 类型别名 type alias (一种快捷方式)
 */
type PlusType = (x: number, y: number) => number;
let sum: PlusType;
type StringOrNumber = string | number;
let res: StringOrNumber = 2;

/**
 * 字面量 类型
 */
const yourName: "cc" = "cc";
const n: 1 = 1;
type Direction = "Up" | "Down" | "Left" | "Right";
let toWhere: Direction = 'Left';

/**
 * 交叉类型
 */
interface IName {
    name: string
}
type IPerson = IName & { age: number }
let you: IPerson = { name: 'cc', age: 18 }