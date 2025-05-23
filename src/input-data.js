import { compareAsc } from "date-fns";
import { toDoList } from "./todo-list";
import { projectList } from "./todo-list";


export const createTaskForm=(parentTag)=>{
    const tagArray = [
        createInputTextTag('title',['input-task','title','text'],true),
        createTextAreaTag('discription',['input-task','discription','text']),
        createInputDateTag('duedate',['input-task','due-date','date'],true),
        createInputTextTag('project',['input-task','project','text']),
    ]
    const form = document.createElement('form');
    const createForm = ()=>{
        form.classList.add('task-form')
        tagArray.forEach((tag)=>{
            form.appendChild(containInputTagIntoDivWithALabel(tag));
        });
    
        form.appendChild(createSubmitButton())
        parentTag.appendChild(form)
    }

    const containInputTagIntoDivWithALabel = (tag)=>{
        const containerDiv = document.createElement('div');
        containerDiv.classList.add(tag.label+'-div');
        const labelTag = document.createElement('label');
        labelTag.for = tag.label;
        labelTag.textContent = tag.label;
        containerDiv.appendChild(labelTag);
        containerDiv.appendChild(tag.inputTag);
        
        return containerDiv
    
    }

    const createSubmitButton=()=>{
        const button = document.createElement('button');
        button.addEventListener('click',(event)=>{
            event.preventDefault();
            if (isformValid){
                
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

    const goToTheProjectTaskPage = ()=>{
        
    }

    
    const extractDataFromTheFormAndCreatObject =()=>{
        let [title,discription,dueDate,project] = tagArray.map((tag)=>(tag.getValue()))
        console.log(title,discription,dueDate,'sstyttytyt')
        const taskList = toDoList(title,discription,dueDate);
        console.log(taskList)
        taskList.createProject(project)
        taskList.addListToProject(project,taskList);
        console.log(projectList,'data')
    }


    const removeForm=()=>{
        parentTag.removeChild(form)
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




