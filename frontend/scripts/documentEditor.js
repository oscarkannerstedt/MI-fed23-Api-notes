import { renderSingleDocument, renderUserDocuments } from "./documents.js";


function showEditor(documentContent, id, documentName) {
    tinymce.init({
        selector: '#editor-container',
        height: 500,
        setup: function (editor) {
            editor.on('init', function () {
                editor.setContent(documentContent);
            });
        }
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Document';
    saveButton.classList.add('save-button');
    saveButton.addEventListener('click', () => {
        saveDocument(id, documentName);
    });

    const goBackButton = document.createElement('button');
    goBackButton.textContent = 'Go Back';
    goBackButton.classList.add('go-back-button');
    goBackButton.addEventListener('click', () => {
        removeEditor(buttonContainer);
    })

    buttonContainer.append(saveButton, goBackButton);

    const editorContainer = document.getElementById('editor-container');
    editorContainer.parentElement.append(buttonContainer);
}

function removeEditor(buttonContainer) {
    tinymce.get('editor-container').setContent('');
    tinymce.remove('#editor-container');

    buttonContainer.remove();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser.user.userId;
    renderUserDocuments(userId);
};

async function saveDocument(id, documentName, documentContent) {
    try {
        const documentContent = tinymce.get('editor-container').getContent({ format: 'text' });
        // const content = tinymce.get('editor-container').getContent();

        await fetch(`http://localhost:3000/documents/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ documentName: documentName, documentContent: documentContent })
        });

        console.log('Document saved successfully!');
        } catch (err) {
            console.console.log("error saving document", err);
    }
}

export {showEditor};