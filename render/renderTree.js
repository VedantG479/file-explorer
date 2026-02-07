export function renderTree(objList, isChildren = false){
    let innerHTML = ''
    if(isChildren)  innerHTML += '<div class="tree-children">'

    objList.forEach((parent, index) => {
        const {id, name, type, childrens, extension} = parent
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
                        ${childrens.length > 0 ? renderTree(childrens, true) : ''}
                      </div>`
    })

    if(isChildren)  innerHTML += '</div>'
    return innerHTML
}

