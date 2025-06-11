import { mainInterface } from "./main-interface";
import {createProjectListManager,createLocalStorageManager } from "./todo-list";


export function display(){
    const htmlElements = mainInterface()
    const manageProjectList = createProjectListManager()
    const manageLocalStorage = createLocalStorageManager()
    let mainDiv = null

    const initialLoad  = ()=>{
        document.body.appendChild(htmlElements.createInterface())
        console.log(localStorage)
        manageLocalStorage.updateProjectList()
        manageProjectList.removeFinishedDates()
        htmlElements.addProjectsNameToSideBar()
        htmlElements.displayProjectInParent()

    }


    return {initialLoad}
}


