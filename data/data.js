import { renderTree } from "../render/renderTree.js"

let newObj
export let parentObj = {
    id: createId(),
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
      createdDate: Date.now(),
      modifiedDate: Date.now(),
      path: '/file-explorer/'
    }
    return newObj.id
}

export function addFile(objId){
    let matchingObject = getMatchingObject(parentObj, objId)
    
    if(matchingObject && matchingObject.type == 'file')   matchingObject = getMatchingObject(parentObj, matchingObject.parent)

    if(matchingObject){
        matchingObject.children.push(newObj)
        newObj.path = matchingObject.path + matchingObject.name + '/'
        newObj.parent = matchingObject.id
    }
    else    parentObj.children.push(newObj)

    return renderTree(parentObj.children)
}

export function deleteFile(objId){
    let matchingObject = getMatchingObject(parentObj, objId)
    let parent = getMatchingObject(parentObj, matchingObject.parent)
    
    if(parent)  parent.children = parent.children.filter((child) => child != matchingObject)
    else    parentObj.children = parentObj.children.filter((child) => child != matchingObject)

    return renderTree(parentObj.children)
}

export function renameFile(objId, newName){
    let matchingObject = getMatchingObject(parentObj, objId)
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
    changePaths(matchingObject, matchingObject.path + firstName + '/')
    matchingObject.name = firstName
    matchingObject.extension = lastName
    
    return renderTree(parentObj.children)
}   

function getMatchingObject(obj, objId){
    for(const child of obj.children) {
        if(child.id == objId)  return child

        const found = getMatchingObject(child, objId)
        if(found)   return found
    }
    return null
}

function changePaths(matchingObject, newPath){
    matchingObject.children.forEach((children) => {
        children.path = newPath
        changePaths(children, newPath + children.name + '/')
    })
}

function createId(){
    return Date.now()
}