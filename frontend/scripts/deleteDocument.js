

async function deleteDocument(id) {
    try {
        await fetch(`http://localhost:3000/documents/${id}`, {
            method: 'DELETE'
        })
        console.log("Document deleted");
        return true;
    } catch (err) {
        console.log("Error while deleting document", err);
        return false;
    }
}

export { deleteDocument };