import { renderSingleDocument, renderUserDocuments } from "./documents.js";

function showEditor(documentContent, id, documentName) {
    tinymce.init({
        selector: '#editor-container',
        height: 400,
        setup: function (editor) {
            editor.on('init', function () {
                editor.setContent(documentContent);
            });
        }
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
        saveDocument(id, documentName);
    });

    const goBackButton = document.createElement('button');
    goBackButton.textContent = 'Back';
    goBackButton.addEventListener('click', () => {
        removeEditor(buttonContainer);
    })

    buttonContainer.append(saveButton, goBackButton);

    const editorContainer = document.getElementById('editor-container');
    editorContainer.parentElement.append(buttonContainer);
}

function removeEditor(buttonContainer) {
    tinymce.remove('#editor-container');

    buttonContainer.remove();

    renderUserDocuments();
};

async function saveDocument(id, documentName, documentContent) {
    try {
        const documentContent = tinymce.get('editor-container').getContent();
        const cleanedContent = documentContent.replace(/<p>/g, '').replace(/<\/p>/g, '');

        await fetch(`http://localhost:3000/documents/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ documentName: documentName, documentContent: cleanedContent })
        });

        console.log('Document saved successfully!');
        } catch (err) {
            console.console.log("error saving document", err);
    }
}

export {showEditor};