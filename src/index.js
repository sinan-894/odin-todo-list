import { createTaskForm } from "./input-data.js";
import { compareAsc } from "date-fns";

import { toDoList,projectList } from "./todo-list.js";

import { mainInterface } from "./task-display.js";


const createDisplay = mainInterface()

document.body.appendChild(createDisplay.createInterface())





