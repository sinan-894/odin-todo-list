import { mainInterface } from "./main-interface";
// import { createTaskForm } from "./form";
import { displayProjectInMain } from "./main-interface";


export function display(){
    const htmlElements = mainInterface()
    // const formDisplay = createTaskForm()
    let mainDiv = null

    const setMainDiv = (tag)=>{
        mainDiv = tag
    }
    const initialLoad  = ()=>{
        document.body.appendChild(htmlElements.createInterface())
        htmlElements.addProjectsNameToSideBar()
        htmlElements.displayProjectInParent()
        
        
        
    }

    const displaySidebar=(addFormButton)=>{
        htmlElements.addProjectsNameToSideBar()
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
        addCreateFormButton()
    }

    const addCreateFormButton = ()=>{
        const addFormButton = htmlElements.createAddFormButton()
        modifyAddFormButton(addFormButton)
        mainDiv.appendChild(addFormButton)
    }

    const addFormToContentDiv = ()=>{
        cleanContentDiv()
        const form  = formDisplay.createForm()
        mainDiv.appendChild(form)
        modifyForm()
    }

    const cleanContentDiv = ()=>{
        mainDiv.innerHTML = ""
    }

    const modifyForm = ()=>{
        const submitButton = document.querySelector('.task-submit-button');
        submitButton.addEventListener('click',(event)=>{
            event.preventDefault()
            onSubmitButtonPress()
        })

    }

    const onSubmitButtonPress = ()=>{

        if (formDisplay.isFormValid()){
            formDisplay.getDataAndStore()
            cleanContentDiv()
            addProjectToContentDiv(formDisplay.getCurrentProject())
            displaySidebar()
            addCreateFormButton()

        }
    }

    return {initialLoad}
}


