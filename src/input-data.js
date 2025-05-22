import { compareAsc } from "date-fns";


export const createTaskForm=(()=>{
    const tagArray = [
        createInputTextTag('title',['input-task','title','text'],true),
        createTextAreaTag('discription',['input-task','discription','text']),
        createInputDateTag('duedate',['input-task','due-date','date'],true),
        createInputTextTag('project',['input-task','project','text']),
    ]
    const createForm = ()=>{
        const formDiv = document.createElement('form');
        formDiv.classList.add('task-form')
        tagArray.forEach((tag)=>{
            formDiv.appendChild(containInputTagIntoDivWithALabel(tag));
        });
    
        formDiv.appendChild(createSubmitButton())
    
        return formDiv
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
            tagArray.forEach((tag)=>{
                tag.formValidate()
            })
            event.preventDefault();
        });
        button.textContent = 'submit'
        return button
    }


    return {createForm}
    
})()

function createInputTag(tagName,label,classes=[]){
    const inputTag = document.createElement(tagName);
    inputTag.id = label
    inputTag.classList.add(classes)

    return {inputTag,label}
}

function createTextAreaTag(title,classes=[],isMandatory = false){
    const {inputTag,label} = createInputTag('textarea',title,classes)

    const formValidate = ()=>{console.log(inputTag.value)}

    return {inputTag,label,formValidate}
    
    }



function createInputTextTag(title,classes=[],isMandatory = false){
    const {inputTag,label} = createInputTag('input',title,classes)
    inputTag.type = 'text';

    const formValidate = ()=>{
        if (isMandatory && inputTag.value==''){
            alert('title cannot be empty')
        }
    }

    return {inputTag,label,formValidate}
}


function createInputDateTag(title,classes=[],isMandatory = false){
    const {inputTag,label} = createInputTag('input',title,classes)
    inputTag.type = 'date';

    const formValidate = ()=>{
        if(isMandatory && !inputTag.value){
            alert('enter a date')
        }
        const today = todayDate()
        const [year,month,date] = inputTag.value.split("-")
        const inputDate = new Date(year,month,date);

        if (compareAsc(today,inputDate)===1){
            alert('Date already finished')
        }
    }

    const todayDate = ()=>{
        let today  = new Date()
        return new Date(today.getFullYear(),today.getMonth()+1,today.getDate())
    }
    
    return {inputTag,label,formValidate}
}





const extractDataFromTheFormAndCreatObject =()=>{
    //data exctraction
}