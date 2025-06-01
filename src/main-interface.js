import "./style.css"
import { domHelper } from "./dom";
import { projectList } from "./todo-list";
import buttonSvg from "./icons8-plus.svg"
import { createTaskForm } from "./form";

const dom = domHelper()
const form = createTaskForm()


export function mainInterface(){
    //depended on : formDisplayButton,displayProject
    //exteded by : divCOntainer

    const header = dom.createTag('div','header-div') 
    const sideBar =  dom.createTag('div','sidebar-div')
    const mainContent = dom.createTag('div','main-div') 
    const giveHeading = dom.createTag('h1','heading-todo',header,'TODO')

    return Object.assign({},divContainer(header,sideBar,mainContent),createFormDisplayButton(),displayProjects())

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

export const createFormDisplayButton  = ()=>{
    
    const createAddFormButton = ()=>{
        const button = dom.createTag('button','button-create-form')
        addImageToButton(button)
        return button
        
    }    
    const addImageToButton = (button)=>{
        const svgHandler = document.createElement('img');
        svgHandler.src = buttonSvg;
        button.appendChild(svgHandler)
    }

    return {createAddFormButton}
}

export function displayProjects(){
    //depended on : formDisplayButton

    let currentProject  = 'Default'

    const addProjectsNameToSideBar = ()=>{
        const sideBar = document.querySelector('.sidebar-div')
        sideBar.innerHTML  = ""
        const projects = Object.keys(projectList);
        const projectsDisplayDiv = document.createElement("div");
        projectsDisplayDiv.classList.add('sidebar-project-list')
        projects.forEach((project)=>{
            let button = dom.createTag('button','project-button',projectsDisplayDiv,project)
            button.addEventListener('click',()=>{
                currentProject = project
                displayProjectInParent(project)
            })
        })

        dom.makeParent(sideBar,projectsDisplayDiv)
        dom.makeParent(sideBar,addProjectContainer())

    }
    //this will first conatin a button then a input field and enter button to input project name
    const addProjectContainer = ()=>{
        const container = document.createElement('div')
        container.appendChild(addProjectButton(container))
        return container
        
    }

    const addProjectButton = (container)=>{
        const button = document.createElement('button')
        button.textContent = 'add Project'
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
                projectList[input.value] = []
                addProjectsNameToSideBar()
            }
        })
        return input
    }

    const displayProjectInParent = ()=>{
        const parentDiv   = document.querySelector(".main-div");
        parentDiv.innerHTML = ""
        const projectDiv  = dom.createTag('div','project-div');
        const projectHeading = dom.createTag('h2','project-heading',projectDiv,currentProject);
        const taskList = getProjectTaskDataIntoDiv(currentProject);
        dom.makeParent(projectDiv,taskList)
        dom.makeParent(projectDiv,addTaskContainer())
        dom.makeParent(parentDiv,projectDiv)


    }

    const addTaskContainer = ()=>{
        const container = document.createElement('div');
        const addTaskButton = document.createElement('button')
        addTaskButton.textContent = 'add task'
        addTaskButton.addEventListener('click',()=>{
            container.innerHTML = ""
            container.appendChild(form.createForm())
            modifyFormSubmitButton(onSubmitButtonPressForCreatingTask)

        })
        container.appendChild(addTaskButton)
        return container
    }

    const modifyFormSubmitButton = (onSubmitButtonPress,update=null)=>{
        const submitButton = document.querySelector('.task-submit-button');
        submitButton.addEventListener('click',(event)=>{
            event.preventDefault()
            if (form.isFormValid()){
                onSubmitButtonPress(update)
            } 
        })

    }

    const onSubmitButtonPressForCreatingTask = ()=>{
        form.getDataAndStoreToProjectList(currentProject)
        displayProjectInParent(currentProject)
       
    }

    const onSubmitButtonPressForEditingTask = (task)=>{
        let [title,discription,dueDate] = form.getData()
        task.title = title
        task.discription = discription
        task.dueDate = dueDate
        displayProjectInParent()
    }


    const getProjectTaskDataIntoDiv = ()=>{
        console.log(currentProject)
        const taskList  = projectList[currentProject];
        console.log(taskList)
        const taskListDiv = dom.createTag('div','task-list-div');
        taskList.forEach((task)=>{
            let taskDiv = dom.createTag('div','task-div',taskListDiv);
            dom.makeParent(taskDiv,createIsCompleteInputCheckBox(task))
            let title = dom.createTag('h3','title-task', taskDiv, task.title)
            let dueDate = dom.createTag('h4','due-date', taskDiv,task.dueDate)
            dom.makeParent(taskDiv,createDeleteTaskButton(taskListDiv,taskDiv,taskList,task))
            dom.makeParent(taskDiv,editTaskButton(task,taskDiv))
        })

        return taskListDiv
        
    }

    const editTaskButton = (task,container)=>{
        const button = document.createElement('button');
        button.textContent = 'edit'
        button.addEventListener('click',()=>{
            container.innerHTML = ""
            container.appendChild(form.createForm())
            modifyFormSubmitButton(onSubmitButtonPressForEditingTask,task)
            

        })
        return button
        
    }

    const createIsCompleteInputCheckBox = (task)=>{
        const inputCheckBox = document.createElement('input');
        inputCheckBox.type = 'checkbox'
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

    const createDeleteTaskButton = (parent,child,list,value)=>{
        const deleteTaskButton = document.createElement('button')
        deleteTaskButton.textContent = 'delete'
        deleteTaskButton.addEventListener('click',()=>{
            console.log(projectList)
            parent.removeChild(child)
            removeFromList(list,value)
            console.log(projectList)
        })

        return deleteTaskButton
    }

    const removeFromList = (list,value)=>{
        
        let index = list.indexOf(value);
        if (index !== -1) {
            list.splice(index, 1);
        }
    }

    return {addProjectsNameToSideBar,displayProjectInParent}
}



