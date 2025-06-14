import "./style.css"
import { domHelper } from "./dom";
import { projectList ,sortToDatesAndGetArrays,createProjectListManager,createLocalStorageManager} from "./todo-list";
import editImage from "./edit-svgrepo-com.svg"
import deleteImage from "./delete-svgrepo-com.svg"
import addImage from "./add-to-svgrepo-com.svg"
import { createDialog } from "./form";


const dom = domHelper()
const dialog = createDialog()
const daysCatogory  = sortToDatesAndGetArrays()
const manageProjectList = createProjectListManager()
const manageLocalStorage = createLocalStorageManager()



export function mainInterface(){
    //depended on : formDisplayButton,displayProject
    //exteded by : divCOntainer

    const header = dom.createTag('div','header-div') 
    const sideBar =  dom.createTag('div','sidebar-div')
    const mainContent = dom.createTag('div','main-div') 
    const giveHeading = dom.createTag('h1','heading-todo',header,'TODO')

    

    return Object.assign({},divContainer(header,sideBar,mainContent,dialog.tag),displayProject())

}

const divContainer = (...tags)=>{

    const createInterface = ()=>{
        const containerDiv = document.createElement('div');
        containerDiv.classList.add('container-div');
        tags.forEach((tag)=>{
            containerDiv.appendChild(tag)
        })

        return containerDiv
    }

    return {createInterface}
}

function displayProjectSidebar(updateCurrentProject,displayProjectInParent){

    const {giveButtonImage} = imageAdder()

    const addProjectsNameToSideBar = ()=>{
        const sideBar = document.querySelector('.sidebar-div')
        sideBar.innerHTML  = ""
        const projects = Object.keys(projectList);
        projects.splice(projects.indexOf('Inbox'),1)
        const projectsDisplayDiv = document.createElement("div");
        projectsDisplayDiv.classList.add('sidebar-project-list')
        createSidebarButton(projectsDisplayDiv,'Today')
        createSidebarButton(projectsDisplayDiv,'Tommarow')
        createSidebarButton(projectsDisplayDiv,'This Week')
        createSidebarButton(projectsDisplayDiv,'Inbox')
        const sidebarProjectHeading = dom.createTag('h2','sidebar-project-heading',projectsDisplayDiv,'Project')
        projects.forEach((project)=>{
            createSidebarButton(projectsDisplayDiv,project)
        })

        dom.makeParent(sideBar,projectsDisplayDiv)
        dom.makeParent(sideBar,addProjectContainer())

    }

    const createSidebarButton = (parent,name)=>{
        const button = dom.createTag('button','project-button',parent,name)
        button.addEventListener('click',()=>{
            updateCurrentProject(name)
            displayProjectInParent()
        })
    }
    //this will first conatin a button then a input field and enter button to input project name
    const addProjectContainer = ()=>{
        const container = document.createElement('div')
        container.classList.add('add-project-div')
        container.appendChild(addProjectButton(container))
        return container
        
    }

    const addProjectButton = (container)=>{
        const button = document.createElement('button')
        giveButtonImage(button,addImage)
        button.addEventListener('click',()=>{
            container.innerHTML = ""
            container.appendChild(addInputProject())

        })
        return button
    }

    const addInputProject = ()=>{
        const input  = document.createElement('input')
        input.type = 'text'
        input.addEventListener('keypress',(event)=>{
            if(event.key=='Enter'){
                if(input.value==''){
                    addProjectsNameToSideBar()
                }
                else if(!(input.value in projectList) && 
                !['Today','Tommarow','This Week'].includes(input.value)){
                    projectList[input.value] = []
                    addProjectsNameToSideBar()
                    manageLocalStorage.createProjectInLocalStorage(input.value)
                }
                
                else{
                    console.log('nothubg happend')
                    alert('project already exist');
                }
                
            }
        })
        return input
    }

    return {addProjectsNameToSideBar}
}

function displayProject(){
    let currentProject  = 'Inbox'
    const {getArray} = sortToDatesAndGetArrays()

    const updateCurrentProject = (project)=>{
        currentProject = project
    }

    const getCurrentProject = ()=>(currentProject)

    const displayProjectInParent = ()=>{
        if(currentProject=='Today'){
            const taskList  = manageProjectList.sortTaskList(daysCatogory.getTodayArray())
            display(taskList,false,false)
        }
        else if(currentProject=='Tommarow'){
            const taskList  = manageProjectList.sortTaskList(daysCatogory.getTommarrowArray())
            display(taskList,false,false)
        }
        else if(currentProject=='This Week'){
            const taskList  = manageProjectList.sortTaskList(daysCatogory.getThisWeekArray())
            display(taskList,false,false)
        }
        else if(currentProject=='Inbox'){
            console.log(projectList[currentProject],'dsdsds')
            const taskList  = manageProjectList.sortTaskList(projectList[currentProject])
            display(taskList,false)
        }
        else{
            const taskList  = manageProjectList.sortTaskList(projectList[currentProject])
            display(taskList)
        }
    }

    const display = (taskList,isCustomProject = true,isCatogory=true)=>{
        console.log('in parent')
        const parentDiv   = document.querySelector(".main-div");
        parentDiv.innerHTML = ""
        const projectDiv  = dom.createTag('div','project-div');
        const projectHeader = dom.createTag('div','project-header',projectDiv)
        const projectHeading = dom.createTag('h2','project-heading',projectHeader,currentProject);
        if(isCustomProject) dom.makeParent(projectHeader,deleteProjectButton())
        const taskListDiv = getProjectTaskDataIntoDiv(taskList);
        dom.makeParent(projectDiv,taskListDiv)
        if(isCatogory) dom.makeParent(projectDiv,addTaskContainer())
        dom.makeParent(parentDiv,projectDiv)
        
    }

    const {addProjectsNameToSideBar} = displayProjectSidebar(updateCurrentProject,displayProjectInParent)
    const {createDeleteTaskButton,addTaskContainer,createEditTaskButton,deleteProjectButton} = displayProjectButtonLogic(getCurrentProject,displayProjectInParent,addProjectsNameToSideBar)
    
    
    const getProjectTaskDataIntoDiv = (taskList)=>{
        console.log(taskList)
        const taskListDiv = dom.createTag('div','task-list-div');
        taskList.forEach((task)=>{
            let taskDiv = dom.createTag('div','task-div',taskListDiv);
            dom.makeParent(taskDiv,createIsCompleteInputCheckBox(task))
            let title = dom.createTag('h3','title-task', taskDiv, task.title)
            let dueDate = dom.createTag('h4','due-date', taskDiv,task.dueDate)
            dom.makeParent(taskDiv,createDeleteTaskButton(taskListDiv,taskDiv,task))
            dom.makeParent(taskDiv,createEditTaskButton(task,taskDiv))
        })

        return taskListDiv
    }

   

    const createIsCompleteInputCheckBox = (task)=>{
        const inputCheckBox = document.createElement('input');
        inputCheckBox.type = 'checkbox'
        inputCheckBox.checked = (task.isTaskComplete)?true:false
        inputCheckBox.addEventListener('click',()=>{
            if (inputCheckBox.checked) {
                console.log('Checkbox is checked');
                task.isTaskComplete = true
              } else {
                console.log('Checkbox is unchecked');
                task.isTaskComplete = false
              }

            console.log(projectList)
            
        })
    
        return inputCheckBox


    }

    return {currentProject,updateCurrentProject,displayProjectInParent,addProjectsNameToSideBar}
}

function displayProjectButtonLogic(getCurrentProject,displayProjectInMain,addProjectsNameToSideBar){

    const {modifyFormSubmitButtonText,onSubmitButtonPressForCreatingTask,onSubmitButtonPressForEditingTask} = mainDialog(getCurrentProject,displayProjectInMain)
    
    const {giveButtonImage} = imageAdder()
    
    const addTaskContainer = ()=>{
        const container = document.createElement('div');
        container.classList.add('add-task-container')
        const addTaskButton = document.createElement('button')
        giveButtonImage(addTaskButton,addImage);

        addTaskButton.addEventListener('click',()=>{
            modifyFormSubmitButtonText('create');
            dialog.show(onSubmitButtonPressForCreatingTask);
        })

        container.appendChild(addTaskButton)
        return container
    }

    const createEditTaskButton = (task)=>{
        const button = document.createElement('button');
        button.classList.add('edit-button')
        const onSubmit = onSubmitButtonPressForEditingTask(task)
        console.log(task.title,'pppp')
        button.addEventListener('click',()=>{
            modifyFormSubmitButtonText('edit');
            console.log(task.title,'ssss')
            dialog.show(onSubmit,true,task.title,task.discription,task.dueDate)
        })
        giveButtonImage(button,editImage)
        return button
        
    }

    const deleteProjectButton = ()=>{
        const button = document.createElement('button')
        giveButtonImage(button,deleteImage)
        button.classList.add('delete-project-button');
        button.addEventListener('click',()=>{
            console.log(getCurrentProject())
            delete projectList[getCurrentProject()]
            manageLocalStorage.removeProjectFromLocalStorage(getCurrentProject())
            console.log(projectList)
            document.querySelector('.main-div').innerHTML = ""
            addProjectsNameToSideBar()
        })
        
        return button
    }


    return Object.assign({addTaskContainer,createEditTaskButton,deleteProjectButton},deleteTask())
}

function mainDialog(getCurrentProject,displayProjectInMain){
    //depended on : formDisplayButton


    const modifyFormSubmitButtonText = text=>{
        const button = document.querySelector('.task-submit-button');
        button.textContent = text
    }



    const onSubmitButtonPressForCreatingTask = ()=>{

        dialog.getDataAndStoreToProjectList(getCurrentProject())
        manageLocalStorage.updateLocalStorage(getCurrentProject())
        displayProjectInMain()
       
}

    const onSubmitButtonPressForEditingTask = (task)=>{
        return ()=>{
            let [title,discription,dueDate] = dialog.getData()
            task.title = title
            task.discription = discription
            task.dueDate = dueDate
            manageLocalStorage.updateLocalStorage(manageProjectList.findProjectOftheTask(task))
            displayProjectInMain()
        }
    }

    

    return {modifyFormSubmitButtonText,onSubmitButtonPressForCreatingTask,onSubmitButtonPressForEditingTask}

    
}

function deleteTask(){
    const {giveButtonImage} = imageAdder()
    const createDeleteTaskButton = (parent,child,value)=>{
        const deleteTaskButton = document.createElement('button')
        giveButtonImage(deleteTaskButton,deleteImage)
        deleteTaskButton.addEventListener('click',()=>{
            console.log(projectList)
            parent.removeChild(child)
            removeFromProjectList(value)
            console.log(projectList)
        })

        return deleteTaskButton
    }

    const removeFromProjectList = (value)=>{
        const project = manageProjectList.findProjectOftheTask(value)
        projectList[project].splice(projectList[project].indexOf(value),1);
        manageLocalStorage.updateLocalStorage(project)
        
    }

    return {createDeleteTaskButton}

}

function imageAdder(){
    const giveButtonImage = (button,image)=>{
        const img = document.createElement('img')
        img.src = image
        button.appendChild(img)
    }
    return {giveButtonImage}
}




