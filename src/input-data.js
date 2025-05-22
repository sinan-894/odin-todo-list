


export function createForm(){
    const formDiv = document.createElement('form');
    
    const tagArray = [
        inputTagTask('input','title',['input-task','title','text'],'text'),
        inputTagTask('textarea','discription',['input-task','discription','text']),
        inputTagTask('input','duedate',['input-task','due-date','date'],'date'),
        inputTagTask('input','project',['input-task','project','text'],'text'),
    ]
    
    tagArray.forEach((tag)=>{
        formDiv.appendChild(containInputTagIntoDivWithALabel(tag));
    });

    formDiv.appendChild(createSubmitButton())

    return formDiv
}

function inputTagTask(tagName,label,classes=[],type=''){
    const inputTag = document.createElement(tagName);
    if (tagName=='input'){
        inputTag.type = type
    }
    inputTag.id = label
    inputTag.classList.add(classes)

    return {inputTag,label}
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
    // button.addEventListener('onclick',()=>{
    //     validateForm()
    //     extractDataFromTheFormAndCreatObject()
    // })
    button.textContent = 'submit'
    return button
}

const validateForm =()=>{
    //form validation
} 


const extractDataFromTheFormAndCreatObject =()=>{
    //data exctraction
}