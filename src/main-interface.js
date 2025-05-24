import "./style.css"
import { domHelper } from "./dom";
import { projectList } from "./todo-list";
import buttonSvg from "./icons8-plus.svg"

const dom = domHelper()



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

    const addProjectsNameToSideBar = ()=>{
        const sideBar = document.querySelector('.sidebar-div')
        sideBar.innerHTML  = ""
        const projects = Object.keys(projectList);
        const projectsDisplayDiv = document.createElement("div");
        projectsDisplayDiv.classList.add('sidebar-project-list')
        projects.forEach((project)=>{
            let button =dom.createTag('button','project-button',projectsDisplayDiv,project)
        })

        dom.makeParent(sideBar,projectsDisplayDiv)
    }

    const displayProjectInParent = (project)=>{
        const parentDiv   = document.querySelector(".main-div");
        const projectDiv  = dom.createTag('div','project-div');
        const projectHeading = dom.createTag('h2','project-heading',projectDiv,project);
        const taskList = getProjectTaskDataIntoDiv(project);
        dom.makeParent(projectDiv,taskList)
        dom.makeParent(parentDiv,projectDiv)

    }


    const getProjectTaskDataIntoDiv = (project)=>{
        console.log(project)
        const taskList  = projectList[project];
        console.log(taskList)
        const taksListDiv = dom.createTag('div','task-list-div');
        taskList.forEach((task)=>{
            let taskDiv = dom.createTag('div','task-div',taksListDiv);
            let title = dom.createTag('h3','title-task', taskDiv, task.title)
            let dueDate = dom.createTag('h4','due-date', taskDiv,task.dueDate)
        })

        return taksListDiv
        
    }

    return {addProjectsNameToSideBar,displayProjectInParent}
}



