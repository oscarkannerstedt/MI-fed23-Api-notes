import { showEditor} from "./documentEditor.js";
import { deleteDocument } from "./deleteDocument.js";
import { submitDocument, createDocumentForm } from "./createDocument.js";


async function renderUserDocuments(userId) {
    const documents = await fetchUserDocuments(userId);
    const documentsContainer = document.getElementById('documents-container');
    documentsContainer.innerHTML = '';

    const createDocumentButton = document.createElement('button');
    createDocumentButton.classList.add('create-document-button');
    createDocumentButton.textContent = 'Create Document';

    createDocumentButton.addEventListener('click', () => {
        createDocumentForm();
        console.log("click on createDocumentButton");
    })

    documentsContainer.appendChild(createDocumentButton);

    documents.forEach(doc => {
        
        const documentElement = document.createElement('div');
        documentElement.classList.add('document-box');

        const documentName = document.createElement('h3');
        documentName.textContent = doc.documentName;

        const createDate = document.createElement('p');
        createDate.textContent = `Created: ${new Date(doc.createDate).toLocaleDateString()}`;


        documentElement.append(documentName, createDate);
        documentsContainer.append(documentElement);

        documentElement.addEventListener("click", () => {
            renderSingleDocument(doc);
        })
    });
}

function renderSingleDocument(doc) {
    const documentsContainer = document.getElementById('documents-container');
    documentsContainer.innerHTML = '';

    const documentElement = document.createElement('div');
    documentElement.classList.add('document');

    const documentName = document.createElement('h3');
    documentName.textContent = doc.documentName;

    const documentContent = document.createElement('p');
    documentContent.textContent = doc.documentContent;

    const createDate = document.createElement('p');
    createDate.textContent = `Created: ${new Date(doc.createDate).toLocaleDateString()}`;

    const updateDate = document.createElement('p');
    updateDate.textContent = `Updated: ${new Date(doc.updateDate).toLocaleDateString()}`;

    const editDocumentButton = document.createElement('button');
    editDocumentButton.classList.add('edit-button');
    editDocumentButton.textContent = 'Edit document';

    const deleteDocumentButton = document.createElement('button');
    deleteDocumentButton.classList.add('delete-button');
    deleteDocumentButton.textContent = 'Delete document';

    editDocumentButton.addEventListener("click", () => {
        documentElement.remove();
        showEditor(doc.documentContent, doc.id, doc.documentName);
        console.log("Edit button clicked");
    });

    deleteDocumentButton.addEventListener("click", () => {
        deleteDocument(doc.id)
        .then((deleted) => {
            if (deleted) {
                console.log("document deleted");
                renderUserDocuments(userId);
            }
        })
    });

    documentElement.append(documentName, documentContent, createDate, updateDate, editDocumentButton, deleteDocumentButton);
    documentsContainer.appendChild(documentElement);
}

async function fetchUserDocuments(userId) {
    try {
        const response = await fetch(`http://localhost:3000/documents/${userId}`);
        if (!response.ok) {
            throw new Error("Failed to fetch user documents");
        }
        const data = await response.json();
        console.log("data", data);
        return data;
    } catch (err) {
        console.log("err", err);
        return [];
    }
};


export {fetchUserDocuments, renderUserDocuments, renderSingleDocument, submitDocument};