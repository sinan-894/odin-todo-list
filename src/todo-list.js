
import { format } from "date-fns";



export function toDoList(title,discription,dueDate){
    let isTaskComplete = false;
    let isTaskImportant = false;
    const formatDate = ()=>(format(date, "yyyy-MM-dd"))
    return Object.assign({title,discription,dueDate,isTaskComplete,isTaskImportant,formatDate},
        creator(),adder())
}

export const projectList = {'default':[]}

const creator = ()=>{
    const createProject = (projectName)=>{
        if(!(projectName in projectList)){
            projectList[projectName] = []
        }
    }

    return {createProject}
}

const adder = ()=>{
    const addListToProject = (project,list)=>{
        projectList[project].push(list);
    }
    return {addListToProject}
}

