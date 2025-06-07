
import { domHelper } from "./dom";
import { toDoList,projectList } from "./todo-list";
import { compareAsc } from "date-fns";


const dom= domHelper()   


//code to create form
function createTaskFormHandler(){


    
    const tagArray =[
        createInputTextTag('title',['input-task','title','text'],true),
        createTextAreaTag('discription',['input-task','discription','text']),
        createInputDateTag('duedate',['input-task','due-date','date'],true),
    ]

    

    const cleanFormValue = ()=>{
        tagArray.forEach(tag=>{
            tag.inputTag.value = ""
        })
    }

    const setFormValue = (...data)=>{
        console.log(title,discription,duedate,data)
        const arg = Array.from(arguments)
        tagArray.forEach((tag,i)=>{
            console.log(tag.inputTag)
            tag.inputTag.value = data[i]
        })
    }
    

    const createForm = ()=>{
        const form = dom.createTag('form','task-form')
        tagArray.forEach((tag)=>{
            console.log('looping')
            form.appendChild(containInputTagIntoDivWithALabel(tag));
        });

        dom.makeParent(form,createSubmitButton())
        dom.makeParent(form,createCancelButton())

        return form
    }

    let onSubmitPress = ()=>{
        alert('no event handling function given')
    }

    const createSubmitButton = ()=>{
        const submitButton = dom.createTag('button','task-submit-button',null,'submit')
        submitButton.addEventListener('click',(event)=>{
            event.preventDefault()
            if (isFormValid()){
                onSubmitPress()
                cleanFormValue()
                document.querySelector('dialog').close()
            } 
        })

        return submitButton
    }

    const createCancelButton = ()=>{
        const submitButton = dom.createTag('button','task-cancel-button',null,'cancel')
        submitButton.addEventListener('click',(event)=>{document.querySelector('dialog').close()})

        return submitButton
    }

    const modifyFormSubmitButtonEventHandler = (newEventFunction)=>{
        onSubmitPress = newEventFunction
    }

    

    const containInputTagIntoDivWithALabel = (tag)=>{
        const containerDiv  = dom.createTag('div',tag.label+'-div')
        const labelTag = dom.createTag('label','label-task-form',containerDiv,tag.label)
        labelTag.for = tag.label
        console.log(labelTag.for)
        containerDiv.appendChild(tag.inputTag);
        
        return containerDiv
    
    }

    const isFormValid = ()=>{
        const validationResultList = tagArray.map((tag)=>(tag.formValidate()))
        console.log(validationResultList.includes(false))
        if (validationResultList.includes(false)) return false
        return true
    }

    return Object.assign({createForm,modifyFormSubmitButtonEventHandler,setFormValue},extractDataFromTheFormAndCreatObject(tagArray))
}


export function createDialog(){

    const {
        createForm,modifyFormSubmitButtonEventHandler,setFormValue,
        getDataAndStoreToProjectList,getData
    } = createTaskFormHandler()

    const tag = document.createElement('dialog');
    tag.classList.add('form-dialog')
    tag.appendChild(createForm())

    const show = (onSubmitPress,isEdit = false,title=null,discription=null,dueDate=null)=>{
        modifyFormSubmitButtonEventHandler(onSubmitPress)
        if(isEdit){
            setFormValue(title,discription,dueDate)
        }
        tag.showModal()
    }
    
    return {tag,show,getDataAndStoreToProjectList,getData}

}




function createInputTag(tagName,label,classes=[]){
    const inputTag = document.createElement(tagName);
    inputTag.id = label
    inputTag.autocomplete = "off"
    classes.forEach((styleClass)=>{inputTag.classList.add(styleClass)})

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
        const inputDate = new Date(year,month-1,date);
        console.log('todays date',today)
        console.log('input date',inputDate)
        if (compareAsc(today,inputDate)===1){
            alert('Date already finished')
            return false
        }
        return true
    }

    const todayDate = ()=>{
        let today  = new Date()
        return new Date(today.getFullYear(),today.getMonth(),today.getDate())
    }
    
    return {inputTag,label,getValue,formValidate}
}



function extractDataFromTheFormAndCreatObject(tagArray){


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