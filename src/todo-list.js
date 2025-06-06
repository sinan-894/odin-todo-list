
import { format,formatDistanceStrict } from "date-fns";


export const todayArray = []
export const tommarowArray = []
export const thisWeekArray = []

export function toDoList(title,discription,dueDate){
    let isTaskComplete = false;
    let isTaskImportant = false;
    const formatDate = ()=>(format(date, "yyyy-MM-dd"))
    return Object.assign({title,discription,dueDate,isTaskComplete,isTaskImportant,formatDate},
        creator(),adder())
}

export const projectList = {'Default':[{title:'hi',dueDate:'2025-5-5'},{title:'sdsds',dueDate:'2020-02-02'},{title:'today',dueDate:'2025-06-07'}]}

const creator = ()=>{
    const createProject = (projectName)=>{
        if(!(projectName in projectList)){
            projectList[projectName] = []
        }
    }

    return {createProject}
}

const adder = ()=>{
    const addToProjectList = (project,list)=>{
        projectList[project].push(list);
    }
    return {addToProjectList}
}

export function sortToDatesAndGetArrays(){
    const todayDate = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())

    

    const totalTaskArray = ()=>{
        const projects = Object.keys(projectList)
        let totalArray = []
        projects.forEach((project)=>{
            let list = projectList[project]
            totalArray = totalArray.concat(list)
        })

        return totalArray
    }

    const sortDatesToCatogory=()=>{
        console.log('days function caallled')
        console.log('sort function called!!!!!!!!!!!!')
        console.log(projectList)
        console.log(totalTaskArray())
        totalTaskArray().forEach((task)=>{
            let [year,month,date]  = task.dueDate.split('-')
            console.log(year,month,date)
            let dueDate = new Date(year,month-1,date)
            console.log(todayDate,dueDate)
            const dist = formatDistanceStrict(todayDate,dueDate)
            const [distNumber,distType] = dist.split(' ')
            console.log(task,distNumber,distType,'testing sorting')
            if (distNumber==1&&distType == 'day'){
                tommarowArray.push(task)
            }
            else if(distNumber==0){
                console.log('pushed to today')
                todayArray.push(task)
                console.log(todayArray)
            }
            else if(distNumber<=7&&distType == 'days'){
                thisWeekArray.push(task)
            }
            
        })
    }

    

    return {sortDatesToCatogory}
    
}

