import { getPath } from "../data/data.js"

const pathBar = document.querySelector('.path-bar')

export function renderPath(currentSelection){
    let path = 'file-explorer'
    if(currentSelection)    path = getPath(currentSelection.dataset.id)
    
    let pathArray = path.split('/')
    let pathHTML = ''

    pathArray.forEach((pathSegment, index) => {
        pathHTML += `<span>${pathSegment}</span>`
        if(index != pathArray.length - 1)   pathHTML += `<span> / </span>`
    })
    pathBar.innerHTML = pathHTML
}
