import { showEditor } from "./documentEditor.js";
import { renderUserDocuments } from "./documents.js";


function showEmpytEditor() {
    tinymce.init({
        selector: '#empty-editor-container',
        height: 500
    });

    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Document';
    saveButton.classList.add('save-button');
    saveButton.addEventListener('click', () => {
        submitDocument();
        console.log("Save button clicked");
    });

    const goBackButton = document.createElement('button');
    goBackButton.textContent = 'Go Back';
    goBackButton.classList.add('go-back-button');
    goBackButton.addEventListener('click', () => {
        goBack(buttonContainer);
        console.log("Back button clicked");
    });

    buttonContainer.append(saveButton, goBackButton);

    const editorContainer = document.getElementById('editor-container');
    editorContainer.parentElement.append(buttonContainer);
}

function createDocumentForm() {

    const documentsContainer = document.getElementById('documents-container');
    documentsContainer.innerHTML = '';

    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'document-name');
    nameLabel.textContent = 'Document Name:';

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.id = 'document-name';
    nameInput.setAttribute('name', 'document-name');

    const documentName = document.getElementById('document-name-container');
    documentName.append(nameLabel, nameInput);

    showEmpytEditor();
}

function goBack(buttonContainer) {
    const documentsContainer = document.getElementById('documents-container');
    documentsContainer.innerHTML = '';

    tinymce.remove('#empty-editor-container');

    buttonContainer.remove();

    const documentNameContainer = document.getElementById('document-name-container');
    documentNameContainer.remove();

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser.user.userId;
    renderUserDocuments(userId);
}

function submitDocument() {
    const documentsContainer = document.getElementById('documents-container');
    documentsContainer.innerHTML = '';

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const userId = storedUser.user.userId;

    const documentName = document.getElementById('document-name').value;
    const documentContent = tinymce.get('empty-editor-container').getContent({ format: 'text'});

    createDocument(userId, documentName, documentContent);
}

async function createDocument(userId, documentName, documentContent) {
    try {
    const response = await fetch('http://localhost:3000/documents', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: userId,
            documentName: documentName,
            documentContent: documentContent,
        })
    });

    const data = await response.json();
    console.log("data", data);
    renderUserDocuments(userId);
    } catch (err) {
        console.log("err", err);
    }
}

export { submitDocument, createDocumentForm};