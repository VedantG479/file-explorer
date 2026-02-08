import { getMatchingObject, parentObj } from "../data/data.js"

const previewPanel = document.querySelector('.js-preview-panel')

export function renderPreview(currentSelection){
    let matchingObject = parentObj, previewHTML

    if(currentSelection){
        matchingObject = getMatchingObject(currentSelection.dataset.id)

        let {name, type, extension, createdDate, modifiedDate, path} = matchingObject

        previewHTML =   `<div class="preview-header">
                            <span class="close-btn js-close-btn">✖</span>
                        </div>

                        <div class="preview-content">
                            <span class="preview-icon ${type}"></span>
                            <span class="preview-name">${name + extension}</span>

                            <div class="meta">
                                <div><span>Type:</span> ${type}</div>
                                <div><span>Extension:</span> ${extension}</div>
                                <div><span>Created:</span> ${createdDate}</div>
                                <div><span>Modified:</span> ${modifiedDate}</div>
                                <div><span>Path:</span> ${path}</div>
                            </div>

                            <div class="preview-footer">
                                <button class="action-btn small js-copy-btn">Copy Path</button>
                            </div>
                        </div>`
    }
    else{
        let {name, path} = matchingObject

        previewHTML =   `<div class="preview-header">
                            <span class="close-btn js-close-btn">✖</span>
                        </div>

                        <div class="preview-content">
                            <span class="preview-icon parent"></span>
                            <span class="preview-name">${name}</span>

                            <div class="meta">
                                <div><span>Path:</span> ${path}</div>
                            </div>

                            <div class="preview-footer">
                                <button class="action-btn small js-copy-btn">Copy Path</button>
                            </div>
                        </div>`
    }
    
    previewPanel.innerHTML = previewHTML
}