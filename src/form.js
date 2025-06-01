
import { domHelper } from "./dom";
import { toDoList,projectList } from "./todo-list";
import { compareAsc } from "date-fns";
const dom= domHelper()    

const tags ={
    inputs:[
        createInputTextTag('title',['input-task','title','text'],true),
        createTextAreaTag('discription',['input-task','discription','text']),
        createInputDateTag('duedate',['input-task','due-date','date'],true),
    ]   

}

//code to create form
export function createTaskForm(){
    const tagArray = tags.inputs
    const createForm = (onSubmitButtonPress)=>{
        const form = dom.createTag('form','task-form')
        form.autocomplete = "off"
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

    return Object.assign({createForm},validator(),extractDataFromTheFormAndCreatObject())
}

const validator =()=>{
    const tagArray = tags.inputs
    const isFormValid = ()=>{
        const validationResultList = tagArray.map((tag)=>(tag.formValidate()))
        console.log(validationResultList.includes(false))
        if (validationResultList.includes(false)) return false
        return true
    }
    return {isFormValid}
}


function createInputTag(tagName,label,classes=[]){
    const inputTag = document.createElement(tagName);
    inputTag.id = label
    inputTag.autocomplete = "off"
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
    inputTag.value = " "

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



function extractDataFromTheFormAndCreatObject(){
    const tagArray = tags.inputs


    const getData = ()=>(tagArray.map((tag)=>(tag.getValue())))
    
    const  getDataAndStoreToProjectList=(project)=>{
        let [title,discription,dueDate] = getData()
        console.log(title,discription,dueDate,'sstyttytyt')
        const taskList = toDoList(title,discription,dueDate);
        console.log(taskList)
        taskList.addToProjectList(project,taskList);
        console.log(projectList)
    }

    return {getData,getDataAndStoreToProjectList}
}