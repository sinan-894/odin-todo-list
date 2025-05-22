
import { format } from "date-fns";



export function toDoList(title,discription,dueDate){
    let isTaskComplete = false;
    let isTaskImportant = false;
    return Object.assign({},title,discription,dueDate,isTaskComplete,isTaskImportant,
        addListToProject,createProject,formatDate)
}

export const projectList = {'default':[]}

const createProject =(projectName)=>{
    projectList.projectName = []
}

const addListToProject = (project,list)=>{
    projectList.project.push(list);
}


function formatDate(date){
    return format(date, "yyyy-MM-dd");
}

