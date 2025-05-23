import "./style.css"
import buttonSvg from "./icons8-plus.svg"



export function mainInterface(){
    const header = ()=>{
        const headerDiv = document.createElement('div');
        headerDiv.classList.add('header-div')
        const heading = document.createElement('h1')
        heading.classList.add('heading-todo')
        heading.textContent =  'TODO'
        headerDiv.appendChild(heading)
        return headerDiv
    }

    const sideBar = ()=>{
        const sideBarDiv = document.createElement('div');
        sideBarDiv.classList.add('sidebar-div');
        return sideBarDiv
    }

    const mainContent = ()=>{
        const mainDiv = document.createElement('div');
        mainDiv.classList.add('main-div');
        mainDiv.appendChild(addButton())
        return mainDiv
    }

    const addButton = ()=>{
        const button = document.createElement('button');
        const svgHandler = document.createElement('img');
        svgHandler.src = buttonSvg;
        button.appendChild(svgHandler)
        return button
    }

    return Object.assign({},divContainer(header(),sideBar(),mainContent()))

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
