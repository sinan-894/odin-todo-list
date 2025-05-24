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

    const formDisplayButton   = createFormDisplayButton().create()
    mainContent.appendChild(formDisplayButton)
    return Object.assign({},divContainer(header,sideBar,mainContent),createFormDisplayButton,displayProjects)

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
    
    const create = ()=>{
        const button = dom.createTag('button','button-create-form')
        addImageToButton(button)
        return button
        
    }    
    const addImageToButton = (button)=>{
        const svgHandler = document.createElement('img');
        svgHandler.src = buttonSvg;
        button.appendChild(svgHandler)
    }

    return {create}
}

export function displayProjects(){
    //depended on : formDisplayButton

    const addProjectsNameToSideBar = ()=>{
        const sideBar = document.querySelector('.sidebar-div')
        const projects = Object.keys(projectList);
        const projectsDisplayDiv = document.createElement("div");
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
        const taksList  = projectList[project];
        const taksListDiv = dom.createTag('div','task-list-div');
        taksList.forEach((task)=>{
            let taskDiv = dom.createTag('div','task-div',taksListDiv);
            let title = dom.createTag('h3','title-task', taskDiv, task.title)
            let dueDate = dom.createTag('h4','due-date', taskDiv,task.dueDate)
        })

        return taksListDiv
        
    }

    return {addProjectsNameToSideBar,displayProjectInParent}
}

const tags ={
    inputs:[
        createInputTextTag('title',['input-task','title','text'],true),
        createTextAreaTag('discription',['input-task','discription','text']),
        createInputDateTag('duedate',['input-task','due-date','date'],true),
        createInputTextTag('project',['input-task','project','text']),
    ]   

}

//code to create form
export function createTaskForm(){
    //depends on :createFormDisplayButton,extractDataFromTheFormAndCreatObject,displayProject
    const tagArray = tags.inputs
    const createForm = (onSubmitButtonPress)=>{
        const form = dom.createTag('form','task-form')
        tagArray.forEach((tag)=>{
            console.log('looping')
            form.appendChild(containInputTagIntoDivWithALabel(tag));
        });
        const button  = dom.createTag('button','task-submit-button',form,'submit')
        return form
    }
    const containInputTagIntoDivWithALabel = (tag)=>{
        const containerDiv  = dom.createTag('div',tag.label+'-div')
        const labelTag = dom.createTag('label','label-task-form',containerDiv,tag.label)
        containerDiv.appendChild(tag.inputTag);
        
        return containerDiv
    
    }

    return {createForm}
}



function createInputTag(tagName,label,classes=[]){
    const inputTag = document.createElement(tagName);
    inputTag.id = label
    inputTag.classList.add(classes)

    const getValue = ()=>(inputTag.value)

    return {inputTag,label,getValue}
}

function createTextAreaTag(title,classes=[],isMandatory = false){
    const {inputTag,label,getValue} = createInputTag('textarea',title,classes)

    const formValidate = ()=>(true)

    return {inputTag,label,getValue,formValidate}
    
    }

function createInputTextTag(title,classes=[],isMandatory = false){
    const {inputTag,label,getValue} = createInputTag('input',title,classes)
    inputTag.type = 'text';

    const formValidate = ()=>{
        if (isMandatory && inputTag.value==''){
            alert('title cannot be empty')
            return false
        }
        return true
    }

    return {inputTag,label,getValue,formValidate}
}

function createInputDateTag(title,classes=[],isMandatory = false){
    const {inputTag,label,getValue} = createInputTag('input',title,classes)
    inputTag.type = 'date';

    const formValidate = ()=>{
        if(isMandatory && !inputTag.value){
            alert('enter a date')
            return false
        }
        const today = todayDate()
        const [year,month,date] = inputTag.value.split("-")
        const inputDate = new Date(year,month,date);

        if (compareAsc(today,inputDate)===1){
            alert('Date already finished')
            return false
        }
        return true
    }

    const todayDate = ()=>{
        let today  = new Date()
        return new Date(today.getFullYear(),today.getMonth()+1,today.getDate())
    }
    
    return {inputTag,label,getValue,formValidate}
}


