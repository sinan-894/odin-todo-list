
import { toDoList } from "./todo-list";




export function extractDataFromTheFormAndCreatObject(){
    const tagArray = tags.inputs
    let currentProject = 'Default'

    const  getDataAndStore=()=>{
        let [title,discription,dueDate,project] = tagArray.map((tag)=>(tag.getValue()))
        console.log(title,discription,dueDate,'sstyttytyt')
        const taskList = toDoList(title,discription,dueDate);
        console.log(taskList)
        taskList.createProject(project)
        taskList.addListToProject(project,taskList);
        currentProject = project
    }

    const getCurrentProject = ()=>{
        return currentProject
    }

    return {getDataAndStore,getCurrentProject}
}