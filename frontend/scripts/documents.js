
async function renderUserDocuments(userId) {
    const documents = await fetchUserDocuments(userId);
    const documentsContainer = document.getElementById('documents-container');
    documentsContainer.innerHTML = '';

    documents.forEach(doc => {
        
        const documentElement = document.createElement('div');
        documentElement.classList.add('document-box');

        const documentName = document.createElement('h3');
        documentName.textContent = doc.documentName;

        const createDate = document.createElement('p');
        createDate.textContent = `Created: ${new Date(doc.createDate).toLocaleDateString()}`;


        documentElement.append(documentName, createDate);
        documentsContainer.appendChild(documentElement);

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
        // Lägg till funktion för att redigera dokumentet
        console.log("Edit button clicked");
    });

    deleteDocumentButton.addEventListener("click", () => {
        // Lägg till funktion för att radera dokumentet
        console.log("Delete button clicked");
    });

    documentElement.append(documentName, documentContent, createDate, updateDate, editDocumentButton, deleteDocumentButton);
    documentsContainer.appendChild(documentElement);
}


async function fetchUserDocuments(userId) {
    try {
        // const response = await fetch(`http://localhost:3000/documents/${userId}`);
        const response = await fetch(`http://localhost:3000/documents`);
        if (!response.ok) {
            throw new Error("Failed to fetch user documents");
        }
        const data = await response.json();
        console.log("data", data);
        return data;
    } catch (err) {
        console.error("err", err);
        return;
    }
}



// fetchUserDocuments(1);




export {fetchUserDocuments, renderUserDocuments};