import { renderTree } from "../render/renderTree.js"

let newObj
export let parentObj = JSON.parse(localStorage.getItem('parentObj')) || {
    id: createId(),
    name: 'file-explorer',
    children: [],
    path: '/'
}

export function createFile(newType){
    newObj = {
      id: createId(),
      name: 'new',
      type: newType,
      children: [],
      extension: '',
      parent: parentObj.id,
      createdDate: formatter.format(Date.now()),
      modifiedDate: formatter.format(Date.now()),
      path: '/file-explorer'
    }
    return newObj.id
}

export function addFile(objId){
    let matchingObject = getMatchingObject(objId)
    
    if(matchingObject && matchingObject.type == 'file')   matchingObject = getMatchingObject(matchingObject.parent)

    if(matchingObject){
        matchingObject.children.push(newObj)
        newObj.path = matchingObject.path + '/' + matchingObject.name 
        newObj.parent = matchingObject.id
    }
    else    parentObj.children.push(newObj)

    saveToStorage()
}

export function deleteFile(objId){
    let matchingObject = getMatchingObject(objId)
    let parent = getMatchingObject(matchingObject.parent)
    
    if(parent)  parent.children = parent.children.filter((child) => child != matchingObject)
    else    parentObj.children = parentObj.children.filter((child) => child != matchingObject)

    saveToStorage()
}

export function renameFile(objId, newName){
    let matchingObject = getMatchingObject(objId)
    const lastDotIndex = newName.lastIndexOf('.')
    
    let firstName, lastName
    if(matchingObject.type == 'folder' || lastDotIndex == -1){
        firstName = newName
        lastName = ''
    }
    else{
        firstName = newName.slice(0, lastDotIndex)
        lastName = newName.slice(lastDotIndex)
    }

    if(!firstName || !firstName.trim)   firstName = '_'
    changePaths(matchingObject, matchingObject.path + '/' + firstName)
    matchingObject.name = firstName
    matchingObject.extension = lastName
    matchingObject.modifiedDate = formatter.format(Date.now())
    
    saveToStorage()
} 

export function getPath(objId){
    let matchingObject = getMatchingObject(objId)
    return matchingObject.path
}

export function getMatchingObject(objId, obj = parentObj){
    for(const child of obj.children) {
        if(child.id == objId)  return child

        const found = getMatchingObject(objId, child)
        if(found)   return found
    }
    return null
}

function changePaths(matchingObject, newPath){
    matchingObject.children.forEach((children) => {
        children.path = newPath
        changePaths(children, newPath + '/' + children.name)
    })
}

function createId(){
    return Date.now()
}

function saveToStorage(){
    localStorage.setItem('parentObj', JSON.stringify(parentObj))
    renderTree()
}

const formatter = new Intl.DateTimeFormat('en-GB', { 
  day: 'numeric', 
  month: 'long', 
  year: 'numeric' 
})