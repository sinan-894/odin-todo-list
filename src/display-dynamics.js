import { mainInterface } from "./main-interface";
import { extractDataFromTheFormAndCreatObject } from "./input-data";
import { projectList } from "./todo-list";


export function display(){
    const htmlElements = mainInterface()
    let mainDiv = null

    const setMainDiv = (tag)=>{
        mainDiv = tag
    }
    const initialLoad  = ()=>{
        document.body.appendChild(htmlElements.createInterface())
        setMainDiv(document.querySelector(".main-div"))
        const addFormButton = htmlElements.createAddFormButton()
        mainDiv.appendChild(addFormButton)
        htmlElements.addProjectsNameToSideBar()
        modifyButtonsForEventHandling(addFormButton)
    }

    const modifyButtonsForEventHandling=(addFormButton)=>{
        modifyAddFormButton(addFormButton)
        modifySidebarProjectButtons()
    }   

    const modifySidebarProjectButtons=()=>{
        const containerDiv = document.querySelector('.sidebar-project-list');
        const projectButtonList = Array.from(containerDiv.children);
        projectButtonList.forEach((projectButton)=>{
            projectButton.addEventListener('click',()=>{addProjectToContentDiv(projectButton.textContent)})
        })
    }

    const modifyAddFormButton = (button)=>{
        button.addEventListener('click',addFormToContentDiv)
    }

    const addProjectToContentDiv=(project)=>{
        cleanContentDiv()
        htmlElements.displayProjectInParent(project)
        const addFormButton = htmlElements.createAddFormButton()
        modifyAddFormButton(addFormButton)
        mainDiv.appendChild(addFormButton)
    }

    const addFormToContentDiv = ()=>{
        cleanContentDiv()
        const form  = htmlElements.createForm()
        mainDiv.appendChild(form)
    }

    const cleanContentDiv = ()=>{
        mainDiv.innerHTML = ""
    }

    return {initialLoad}
}