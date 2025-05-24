import { compareAsc } from "date-fns";
import { toDoList } from "./todo-list";
import { projectList } from "./todo-list";
import { domHelper } from "./dom";
import { displayProject,createFormDisplayButton } from "./task-display";

const tags ={
    inputs:[
        createInputTextTag('title',['input-task','title','text'],true),
        createTextAreaTag('discription',['input-task','discription','text']),
        createInputDateTag('duedate',['input-task','due-date','date'],true),
        createInputTextTag('project',['input-task','project','text']),
    ]   

}

const dom = domHelper()


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


export function createTaskForm(parentTag){
    
    const tagArray = tags.inputs
    const form = dom.createTag('form','task-form')
    

    const createForm = ()=>{
        tagArray.forEach((tag)=>{
            form.appendChild(containInputTagIntoDivWithALabel(tag));
        });
    
        form.appendChild(createSubmitButton())
        parentTag.appendChild(form)
    }

    const containInputTagIntoDivWithALabel = (tag)=>{
        const containerDiv  = dom.createTag('div',tag.label+'-div')
        const labelTag = dom.createTag('label','label-task-form',containerDiv,tag.label)
        containerDiv.appendChild(tag.inputTag);
        
        return containerDiv
    
    }
    const createSubmitButton=()=>{
        const button = document.createElement('button');
        button.addEventListener('click',(event)=>{
            event.preventDefault();
            if (isformValid){
                const taskPage = displayTaskPage(parentTag)
                const formDisplayButton = createFormDisplayButton(parentTag);
                parentTag.removeChild(form)
                taskPage.display()
                formDisplayButton.addButton()

                
            }

            
        });
        button.textContent = 'submit'
        return button
    }

    const isformValid = ()=>{
        const dataArray = tagArray.map((tag)=>(tag.formValidate()))
            if (!(false in dataArray)){
                console.log('pass')
                return true
            }
            return false
    }

    return {createForm}
}


function displayTaskPage(parentTag){
    const tagArray = tags.inputs
    const data = extractDataFromTheFormAndCreatObject()
    
    const ourProject = displayProject(parentTag)
    
    const display = ()=>{
        data.getDataAndStore()
        const currentProject =data.getCurrentProject()
        ourProject.displayProjectInParent(currentProject)
        
    }

    
    const removeForm=()=>{
        parentTag.removeChild(form)
    }

    return {display}
}


function extractDataFromTheFormAndCreatObject(){
    const tagArray = tags.inputs
    let currentProject = 'Default'

    const  getDataAndStore=()=>{
        let [title,discription,dueDate,project] = tagArray.map((tag)=>(tag.getValue()))
        console.log(title,discription,dueDate,'sstyttytyt')
        const taskList = toDoList(title,discription,dueDate);
        console.log(taskList)
        taskList.createProject(project)
        taskList.addListToProject(project,taskList);
        console.log(projectList,'data')
        currentProject = project
    }

    const getCurrentProject = ()=>{
        return currentProject
    }

    return {getDataAndStore,getCurrentProject}
}

