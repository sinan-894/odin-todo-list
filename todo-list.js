

export function toDoList(title,discription,dueDate,dueTime){
    let isTaskComplete = false;
    let isTaskImportant = false;
    return Object.assign({},title,discription,dueDate,dueTime,isTaskComplete,isTaskImportant,
        addListToProject,createProject)
}

export const projectList = {'default':[]}

const createProject =(projectName)=>{
    projectList.projectName = []
}

const addListToProject = (project,list)=>{
    projectList.project.push(list);
}


function formatDate(date){
    //formating date
}

function formatTime(time){
    //formating Time
}