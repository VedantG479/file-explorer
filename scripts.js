import { addFile, createFile, deleteFile, renameFile } from "./data/data.js";
import { renderPath } from "./render/renderPath.js";
import { renderTree } from "./render/renderTree.js";

const addFileButton = document.querySelector('.js-add-btn')
const addFolderButton = document.querySelector('.js-add-folder-btn')
const deleteFileButton = document.querySelector('.js-delete-btn')
const renameFileButton = document.querySelector('.js-rename-btn')

let currentSelection, treeLabelGettingRenamed
renderTree()
renderPath(currentSelection)

document.body.addEventListener('click', (e) => {
    let target = e.target
    let treeItem = target.closest('.tree-item')

    //something was getting renamed - clicked outside it 
    if(treeLabelGettingRenamed && (!treeItem || !treeItem.querySelector('.tree-label').classList.contains('renaming'))) deselectCurrentSelection()

    //clicked on item 
    if(treeItem){
        // - it is getting renamed
        if(treeItem.querySelector('.tree-label').classList.contains('renaming'))    return 

        // - something else is getting renamed or
        // - none is getting renamed
        deselectCurrentSelection()
        selectCurrentSelection(treeItem)
    }
    else if(target === addFolderButton) addToCurrentSelection('folder')
    else if(target === addFileButton)   addToCurrentSelection('file')
    else if(target === deleteFileButton)    deleteCurrentSelection()
    else if(target === renameFileButton)    renameCurrentSelection()
    else if(currentSelection)    deselectCurrentSelection() 
})

function addToCurrentSelection(newType){
    let currObjId 
    let newObjId = createFile(newType)

    if(currentSelection)    currObjId = currentSelection.dataset.id
    addFile(currObjId)

    deselectCurrentSelection()
    const newItem = document.querySelector(`.js-tree-item-${newObjId}`)
    selectCurrentSelection(newItem)
    renameCurrentSelection()
}

function deleteCurrentSelection(){
    if(!currentSelection)   return
    deleteFile(currentSelection.dataset.id)
    deselectCurrentSelection()
}

function renameCurrentSelection(){
    if(!currentSelection)   return
    treeLabelGettingRenamed = currentSelection.querySelector('.tree-label')
    treeLabelGettingRenamed.classList.add('renaming')

    treeLabelGettingRenamed.addEventListener('keydown', handleRename)
}
function handleRename(e){
    if(e.key === 'Enter' || e.key === 'Tab' || e.key == '/')    deselectCurrentSelection() 
}

function selectCurrentSelection(currSelection){
    currentSelection = currSelection
    if(!currentSelection.classList.contains('selected'))    currentSelection.classList.add('selected')
    if(deleteFileButton.classList.contains('disabled'))     deleteFileButton.classList.remove('disabled')
    if(renameFileButton.classList.contains('disabled'))     renameFileButton.classList.remove('disabled')   
    renderPath(currentSelection)
}

function deselectCurrentSelection(){
    doneRename()
    if(currentSelection && currentSelection.classList.contains('selected'))    currentSelection.classList.remove('selected')
    if(!deleteFileButton.classList.contains('disabled'))     deleteFileButton.classList.add('disabled')
    if(!renameFileButton.classList.contains('disabled'))     renameFileButton.classList.add('disabled') 
    currentSelection = null
    renderPath(currentSelection)
}

function doneRename(){
    if(!treeLabelGettingRenamed)  return
    treeLabelGettingRenamed.removeEventListener('keydown', handleRename)
    renameFile(currentSelection.dataset.id, treeLabelGettingRenamed.querySelector('.rename-input').value)
    treeLabelGettingRenamed.classList.remove('renaming')
    treeLabelGettingRenamed = null
}