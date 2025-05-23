


export function domHelper(){
    const createTag = (tagName,classes=[],parent=false,value=false)=>{
        const tag = document.createElement(tagName)
        tag.classList.add(classes);
        if(value) tag.textContent = value;
        if(parent) makeParent(parent,tag)
        return tag
    }

    const makeParent = (parentTag,child)=>{
        parentTag.appendChild(child)
    }

    return {createTag,makeParent}
}