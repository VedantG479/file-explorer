import { renderTree } from "../render/renderTree.js"

let newObj

export function createFile(newType){
    newObj = {
      id: createId(),
      name: 'new',
      type: newType,
      childrens: [],
      extension: '',
      createdDate: Date.now(),
      modifiedDate: Date.now(),
      path: '/'
    }
    return newObj.id
}

export function addFile(addToObjId){
    let matchingObject = getMatchingObject(addToObjId)
    
    if(matchingObject && matchingObject.type == 'file')   matchingObject = getParentObject(matchingObject)

    if(matchingObject){
        matchingObject.childrens.push(newObj)
        newObj.path = matchingObject.path + matchingObject.name + '/'
    }

    if(newObj.path == '/')  parentsList.push(newObj)
    objectsList.push(newObj)
    return renderTree(parentsList)
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

    changePaths(matchingObject, matchingObject.path + firstName + '/')
    matchingObject.name = firstName
    matchingObject.extension = lastName
    
    console.log(parentsList)
    return renderTree(parentsList)
}   

export let parentsList = []
export let objectsList = []

export function getParentObject(object){
    let parent
    objectsList.forEach((obj) => {
        obj.childrens.forEach((children) => {
            if(children === object)    parent = obj    
        })
    }) 
    return parent
}

export function getMatchingObject(objId){
    let matchingObject
    objectsList.forEach(function(obj){
        if(obj.id == objId)    matchingObject = obj
    })
    return matchingObject
}

function changePaths(matchingObject, newPath){
    matchingObject.childrens.forEach((children) => {
        children.path = newPath
        changePaths(children, newPath + children.name + '/')
    })
}

function createId(){
    return Date.now()
}