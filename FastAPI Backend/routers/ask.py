from fastapi import APIRouter, Request
from pydantic import BaseModel
from generate import generate_answer  # new simplified version

ask_router = APIRouter()

class QuestionRequest(BaseModel):
    question: str
    language: str

@ask_router.post("/ask")
def ask_question(request: Request, body: QuestionRequest):
    answer = generate_answer(
        request.app.state.model_pipeline,
        body.question,
        body.language
    )
    return {"answer": answer}
