import { parentObj } from "../data/data.js"

const treePanel = document.querySelector('.tree-panel')
const searchInput = document.querySelector('.search-input')

export function renderTree(){
    let innerHTML = helper(parentObj.children)
    treePanel.innerHTML = innerHTML

    const value = searchInput.value
    renderTreeElements(value)
}

searchInput.addEventListener('input', (e) => {
    const value = e.target.value
    renderTreeElements(value)
})

function renderTreeElements(text, obj = parentObj){
    for(const child of obj.children) {
        let treeItem = document.querySelector(`.js-tree-item-${child.id}`)
        let treeLabel = treeItem.querySelector('.tree-label')
        
        if(text && child.name.startsWith(text)) treeLabel.classList.add('search-match')
        else if(treeLabel.classList.contains('search-match'))    treeLabel.classList.remove('search-match')

        renderTreeElements(text, child)
    }
}

function helper(objList, isChildren = false){
    let innerHTML = ''
    if(isChildren)  innerHTML += '<div class="tree-children">'

    objList.forEach((parent, index) => {
        const {id, name, type, children, extension} = parent
        innerHTML += `<div class="tree-node ${index == objList.length - 1 ? 'last' : ''}">
                        <div class="tree-item js-tree-item-${id}" data-id="${id}">
                            <span class="tree-label">
                            <span class="icon ${type}"></span>
                            <span class="name">${name + extension}</span>
                            <input
                                class="rename-input"
                                type="text"
                                value="${name + extension}"
                            />
                            </span>
                        </div>
                        ${children.length > 0 ? helper(children, true) : ''}
                      </div>`
    })

    if(isChildren)  innerHTML += '</div>'
    return innerHTML
}

