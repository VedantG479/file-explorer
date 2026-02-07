import { addFile, createFile, parentsList, renameFile } from "./data/data.js";
import { renderTree } from "./render/renderTree.js";

const treePanel = document.querySelector('.tree-panel')
const addFileButton = document.querySelector('.js-add-btn')
const addFolderButton = document.querySelector('.js-add-folder-btn')
const deleteFileButton = document.querySelector('.js-delete-btn')
const renameFileButton = document.querySelector('.js-rename-btn')

let currentSelection, treeLabelGettingRenamed
treePanel.innerHTML = renderTree(parentsList)

document.body.addEventListener('click', (e) => {
    let treeItem = e.target.closest('.tree-item')

    //clicked on item 
    if(treeItem){
        // - it is getting renamed
        if(treeItem.querySelector('.tree-label').classList.contains('renaming'))    return 

        // - something else is getting renamed or
        // - none is getting renamed
        if(currentSelection)    deselectCurrentSelection()
        selectCurrentSelection(treeItem)
    }
    else if(e.target === addFolderButton){  //clicked on add folder button
        e.stopPropagation()
        addToCurrentSelection('folder')
    }
    else if(e.target === addFileButton){    //clicked on add file button
        e.stopPropagation()
        addToCurrentSelection('file')
    }
    else if(e.target === deleteFileButton && currentSelection){     //clicked on delete button 
        console.log(`deleting file ${currentSelection}`)
    }
    else if(e.target === renameFileButton && currentSelection){     //clicked on rename button 
        e.stopPropagation()
        renameCurrentSelection()
    }
    else if(currentSelection)    deselectCurrentSelection() //clicked outside items and buttons
})

function addToCurrentSelection(newType){
    let currObjId 
    let newObjId = createFile(newType)

    if(currentSelection)    currObjId = currentSelection.dataset.id
    treePanel.innerHTML = addFile(currObjId)

    if(currentSelection)    deselectCurrentSelection()
    const newItem = document.querySelector(`.js-tree-item-${newObjId}`)
    selectCurrentSelection(newItem)
    renameCurrentSelection()
}

function renameCurrentSelection(){
    treeLabelGettingRenamed = currentSelection.querySelector('.tree-label')
    treeLabelGettingRenamed.classList.toggle('renaming')

    treeLabelGettingRenamed.addEventListener('keydown', (e) => {
        if(e.key === 'Enter' || e.key === 'Tab' || e.key == '/')    deselectCurrentSelection() 
    })

    document.addEventListener('click', (e) => {
        if(e.target.closest('.tree-label') == treeLabelGettingRenamed)  return
        deselectCurrentSelection()
    })
}

function doneRename(){
    if(!treeLabelGettingRenamed)  return
    treePanel.innerHTML = renameFile(currentSelection.dataset.id, treeLabelGettingRenamed.querySelector('.rename-input').value)
    treeLabelGettingRenamed.classList.toggle('renaming')
    treeLabelGettingRenamed = null
}

function selectCurrentSelection(currSelection){
    currentSelection = currSelection
    if(!currentSelection.classList.contains('selected'))    currentSelection.classList.add('selected')
    if(deleteFileButton.classList.contains('disabled'))     deleteFileButton.classList.remove('disabled')
    if(renameFileButton.classList.contains('disabled'))     renameFileButton.classList.remove('disabled')   
}

function deselectCurrentSelection(){
    doneRename()
    if(currentSelection && currentSelection.classList.contains('selected'))    currentSelection.classList.remove('selected')
    if(!deleteFileButton.classList.contains('disabled'))     deleteFileButton.classList.add('disabled')
    if(!renameFileButton.classList.contains('disabled'))     renameFileButton.classList.add('disabled') 
    currentSelection = null
}