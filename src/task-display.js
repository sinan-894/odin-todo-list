import "./style.css"
import buttonSvg from "./icons8-plus.svg"
import { projectList } from "./todo-list";
import { createTaskForm } from "./input-data";
import { domHelper } from "./dom";


export function mainInterface(){
    const dom = domHelper()
    const header = ()=>{
        const headerDiv = document.createElement('div');
        headerDiv.classList.add('header-div')
        const heading = document.createElement('h1')
        heading.classList.add('heading-todo')
        heading.textContent =  'TODO'
        headerDiv.appendChild(heading)
        return headerDiv
    }

    const sideBar = ()=>{
        const sideBarDiv = document.createElement('div');
        sideBarDiv.classList.add('sidebar-div');
        sideBarDiv.appendChild(addProjectsNameToSideBar())
        return sideBarDiv
    }

    const mainContent = ()=>{
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('main-div');
        addButton(mainDiv)
        return mainDiv
    }

    const addButton = (parentTag)=>{
        const button = document.createElement('button');
        button.addEventListener('click',()=>{
            const form=createTaskForm(parentTag);
            form.createForm()
            parentTag.removeChild(button)
        })
        const svgHandler = document.createElement('img');
        svgHandler.src = buttonSvg;
        button.appendChild(svgHandler)
        parentTag.appendChild(button)
    }

    const addProjectsNameToSideBar = ()=>{
        const projects = Object.keys(projectList);
        const projectsDisplayDiv = document.createElement("div");
        projects.forEach((project)=>{
            let button  = document.createElement('button');
            button.addEventListener('click',()=>{onProjectButtonPress(project)})
            button.classList.add("project-button")
            button.textContent = project;
            projectsDisplayDiv.appendChild(button)
        })

        return projectsDisplayDiv
    }

    const onProjectButtonPress = (project)=>{
        displayProject(project)
    }

    const displayProject = (project)=>{
        const projectDiv  = dom.createTag('div','project-div');
        const projectHeading = dom.createTag('h2','project-heading',projectDiv,project);
        const taskList = getProjectTaksDataintoDiv(project);
        dom.makeParent(projectDiv,taskList)
        appendIntoMainContainer(projectDiv)

    }

    const appendIntoMainContainer = (projectDiv)=>{
        const parentDiv   = document.querySelector(".main-div");
        dom.makeParent(parentDiv,projectDiv)
    }

    const getProjectTaksDataintoDiv = (project)=>{
        console.log(project,'project')
        const taksList  = projectList[project];
        console.log()
        const taksListDiv = dom.createTag('div','task-list-div');
        taksList.forEach((task)=>{
            let taskDiv = dom.createTag('div','task-div',taksListDiv);
            let title = dom.createTag('h3','title-task', taskDiv, task.title)
            let dueDate = dom.createTag('h4','due-date', taskDiv,task.dueDate)
        })

        return taksListDiv
        
    }

    return Object.assign({},divContainer(header(),sideBar(),mainContent()))

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
