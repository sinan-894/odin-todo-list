import { createTaskForm } from "./input-data.js";
import { compareAsc } from "date-fns";

console.log('hello world');

document.body.appendChild(createTaskForm.createForm());
let j = new Date(2025,5,23)

let k = compareAsc(new Date(2025,5,23) , new Date(2025,5,23))


console.log(j)

console.log(j.getFullYear(),j.getMonth()+1,j.getDate())
console.log(k)

