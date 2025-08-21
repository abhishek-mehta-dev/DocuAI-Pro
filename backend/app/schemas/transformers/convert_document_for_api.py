from typing import Union, List
from app.db.models.document import Document


def convert_document_for_api(doc: Union[Document, dict]) -> dict:
    """Transform a single Document object into API-friendly format."""
    if doc is None:
        return None

    get_attr = lambda attr: getattr(doc, attr) if not isinstance(doc, dict) else doc.get(attr)

    return {
        "id": get_attr("id"),
        "filename": get_attr("filename"),
        "pages": get_attr("page_count"),
        "storedPath": get_attr("stored_path"),
        "faissPath": get_attr("faiss_path"),
        "createdAt": get_attr("created_at").isoformat() if get_attr("created_at") else None,
    }


def convert_documents_for_api(docs: List[Union[Document, dict]]) -> List[dict]:
    """Transform a list of Document objects into API-friendly format."""
    return [convert_document_for_api(doc) for doc in docs]
