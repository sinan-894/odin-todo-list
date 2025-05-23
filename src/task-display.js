import "./style.css"
import buttonSvg from "./icons8-plus.svg"
import { projectList } from "./todo-list";
import { createTaskForm } from "./input-data";
import { domHelper } from "./dom";






export function mainInterface(){
    const dom = domHelper()
    const header = dom.createTag('div','header-div') 
    const sideBar =  dom.createTag('div','sidebar-div')
    const mainContent = dom.createTag('div','main-div') 
    const giveHeading = dom.createTag('h1','heading-todo',header,'TODO')
    const form  = createTaskForm(mainContent)
    
    const formDisplayButton = createFormDisplayButton(mainContent);
    formDisplayButton.addButton()

    const projectName = addProjectsName(mainContent)
    projectName.addProjectsNameToSideBar(sideBar)
    
    

    

    return Object.assign({},divContainer(header,sideBar,mainContent))

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

function mainContentDynamic(parentTag){
    const form  = createTaskForm(parentTag)
    const dom = domHelper()

    const cleanMainContentDiv = ()=>{
        const childrenArray = Array.from(parentTag.children)
        childrenArray.forEach((child)=>{
            parentTag.removeChild(child);
        })
    }

    return {dom,cleanMainContentDiv,form}
}



const createFormDisplayButton  = (parentTag)=>{
    const {dom,cleanMainContentDiv,form} = mainContentDynamic(parentTag)
    
    const addButton = ()=>{
        const button = dom.createTag('button','button-create-form',parentTag)
        button.addEventListener('click',onFormCreateButtonPress)
        addImageToButton(button)
        
    }

    const onFormCreateButtonPress = ()=>{
        cleanMainContentDiv()
        form.createForm()
    }

    
    const addImageToButton = (button)=>{
        const svgHandler = document.createElement('img');
        svgHandler.src = buttonSvg;
        button.appendChild(svgHandler)
    }

    return {addButton}
}



function addProjectsName(parentTag){
    const {dom,cleanMainContentDiv,form} = mainContentDynamic(parentTag)
    const formDisplayButton = createFormDisplayButton(parentTag);

    const addProjectsNameToSideBar = (sideBar)=>{
        const projects = Object.keys(projectList);
        const projectsDisplayDiv = document.createElement("div");
        projects.forEach((project)=>{
            let button =dom.createTag('button','project-button',projectsDisplayDiv,project)
            button.addEventListener('click',()=>{onProjectButtonPress(project)})
        })

        dom.makeParent(sideBar,projectsDisplayDiv)
    }

    const onProjectButtonPress = (project)=>{
        cleanMainContentDiv()
        displayProject(project)
        formDisplayButton.addButton()
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

    return {addProjectsNameToSideBar}
}