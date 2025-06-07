
import { compareAsc, format,formatDistanceStrict } from "date-fns";




export function toDoList(title,discription,dueDate){
    let isTaskComplete = false;
    let isTaskImportant = false;
    const formatDate = ()=>(format(date, "yyyy-MM-dd"))
    return Object.assign({title,discription,dueDate,isTaskComplete,isTaskImportant,formatDate},
        creator(),adder())
}

export const projectList = {'Default':[{title:'hi',dueDate:'2025-5-5'},{title:'sdsds',dueDate:'2020-02-02'},{title:'today',dueDate:'2025-06-08'}]}

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

function dateManager(){
    const todayDate = new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())
    
    

    const getInputDateForTask = (task) =>{
        const [year,month,date]  = task.dueDate.split('-')
        console.log(year,month,date)
        return  new Date(year,month-1,date)
    } 

    return {todayDate,getInputDateForTask}
}

export function sortToDatesAndGetArrays(){
    

    const {todayDate,getInputDateForTask} = dateManager()

    const getTotalTaskArray = ()=>{
        const projects = Object.keys(projectList)
        let totalArray = []
        projects.forEach((project)=>{
            let list = projectList[project]
            totalArray = totalArray.concat(list)
        })

        return totalArray
    }

    const getTodayArray = ()=>{
        return getTotalTaskArray().filter((task)=>{
            let [distNumber,distType] = getDateDistance(task).split(' ');
            return (distNumber==0)
            
        })
    }

    const getTommarrowArray = ()=>{
        return getTotalTaskArray().filter((task)=>{
            let [distNumber,distType] = getDateDistance(task).split(' ');
            
            return (distNumber==1&&distType == 'day')
            
        })
    }

    const getThisWeekArray = ()=>{
        return getTotalTaskArray().filter((task)=>{
            let [distNumber,distType] = getDateDistance(task).split(' ');
            return (distNumber<=7&&distType == 'days')
        })
    }

    const getDateDistance = (task)=>{
        const dueDate = getInputDateForTask(task)
        console.log(todayDate,dueDate)
        const dist = formatDistanceStrict(todayDate,dueDate)

        return dist
    }

    return {getTodayArray,getTommarrowArray,getThisWeekArray}
    
}

export function createProjectListManager(){
    const {todayDate,getInputDateForTask} = dateManager()
    
    const removeFinishedDates = ()=>{
        const projects = Object.keys(projectList)
        projects.forEach(project=>{
            let list =  projectList[project]
            projectList[project] = list.filter((task)=>{
                let dueDate = getInputDateForTask(task)
                if (compareAsc(todayDate,dueDate)===1){
                    return false
                }
                return true
            })
        })
    }

    const sortTaskList = (project)=>{
        projectList[project] = projectList[project].sort((a,b)=>{
            let dueDateA = getInputDateForTask(a);
            let duedateB = getInputDateForTask(b);
            return compareAsc(dueDateA,duedateB)
        })
    }
    
    return {removeFinishedDates,sortTaskList}
}