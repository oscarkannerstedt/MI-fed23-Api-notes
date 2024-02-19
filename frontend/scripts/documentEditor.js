

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

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener('click', () => {
        saveDocument(id, documentName);
    });

    const editorContainer = document.getElementById('editor-container');
    editorContainer.parentElement.appendChild(saveButton);
}

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